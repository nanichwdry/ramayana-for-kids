import express from "express";
import cors from "cors";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI, Modality } from "@google/genai";
import dotenv from "dotenv";
import admin from "firebase-admin";

dotenv.config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    projectId: 'ramayana-for-kids',
    storageBucket: 'ramayana-for-kids.firebasestorage.app',
  });
}
const firestore = admin.firestore();
const bucket = admin.storage().bucket();

// Gemini client
const gemini = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

// Vertex AI client for image generation
const vertexAI = new GoogleGenAI({
  vertexai: true,
  project: 'ramayana-for-kids-490602',
  location: 'us-central1',
});

function pcmToWav(pcm: Buffer, sampleRate: number): Buffer {
  const header = Buffer.alloc(44);
  const numChannels = 1;
  const bitsPerSample = 16;
  const byteRate = sampleRate * numChannels * bitsPerSample / 8;
  const blockAlign = numChannels * bitsPerSample / 8;
  header.write('RIFF', 0);
  header.writeUInt32LE(36 + pcm.length, 4);
  header.write('WAVE', 8);
  header.write('fmt ', 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20);
  header.writeUInt16LE(numChannels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(byteRate, 28);
  header.writeUInt16LE(blockAlign, 32);
  header.writeUInt16LE(bitsPerSample, 34);
  header.write('data', 36);
  header.writeUInt32LE(pcm.length, 40);
  return Buffer.concat([header, pcm]);
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors({
    origin: ['https://ramayana-for-kids.vercel.app', 'http://localhost:3000', 'http://localhost:5173'],
  }));
  app.use(express.json({ limit: '10mb' }));

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Story generation — check Firestore first, generate & save if missing
  app.post("/api/generate-story", async (req, res) => {
    try {
      const { chapterTitle, language, moral } = req.body;
      if (!chapterTitle) return res.status(400).json({ error: "chapterTitle required" });

      const storyKey = `${chapterTitle.replace(/[^a-zA-Z0-9]/g, '_')}_${language}`;
      const docRef = firestore.collection('stories').doc(storyKey);
      const doc = await docRef.get();

      if (doc.exists) {
        console.log(`Story cache hit: ${storyKey}`);
        return res.json({ pages: doc.data()!.pages });
      }

      console.log(`Story cache miss: ${storyKey}, generating...`);
      const langName = { en: 'English', te: 'Telugu', hi: 'Hindi', ta: 'Tamil' }[language] || 'English';
      const response = await gemini.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `You are a storyteller for children aged 5-10. Tell the Ramayana story chapter "${chapterTitle}" in ${langName}.
Split into exactly 4 short pages (separated by ---). Each page should be 2-3 sentences, simple and engaging for kids.
Include the moral lesson "${moral || ''}" on the last page. Use vivid but simple language. Do not use any markdown formatting.`,
      });

      const text = response.text || '';
      const pages = text.split('---').map((p: string) => p.trim()).filter((p: string) => p.length > 0);
      const result = pages.length > 0 ? pages : ["Story could not be generated."];

      await docRef.set({ pages: result, chapterTitle, language, createdAt: admin.firestore.FieldValue.serverTimestamp() });
      console.log(`Story saved: ${storyKey}`);

      res.json({ pages: result });
    } catch (e: any) {
      console.error("Story generation error:", e.message);
      res.status(500).json({ error: e.message });
    }
  });

  // Quiz generation
  app.post("/api/generate-quiz", async (req, res) => {
    try {
      const { chapterTitle, moral, language } = req.body;
      if (!chapterTitle) return res.status(400).json({ error: "chapterTitle required" });

      const quizKey = `quiz_${chapterTitle.replace(/[^a-zA-Z0-9]/g, '_')}_${language}`;
      const docRef = firestore.collection('quizzes').doc(quizKey);
      const doc = await docRef.get();

      if (doc.exists) {
        console.log(`Quiz cache hit: ${quizKey}`);
        return res.json({ quiz: doc.data()!.quiz });
      }

      const langName = { en: 'English', te: 'Telugu', hi: 'Hindi', ta: 'Tamil' }[language] || 'English';
      const response = await gemini.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Generate exactly 4 multiple-choice quiz questions for children aged 5-10 about the Ramayana chapter "${chapterTitle}" with moral "${moral || ''}".
Respond in ${langName}. Return ONLY valid JSON array, no markdown:
[{"question":"...","options":["A","B","C","D"],"correct":0}]
correct is the 0-based index. Keep questions simple and fun for kids.`,
      });

      let text = (response.text || '').trim();
      text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const quiz = JSON.parse(text);

      await docRef.set({ quiz, chapterTitle, language, createdAt: admin.firestore.FieldValue.serverTimestamp() });
      console.log(`Quiz saved: ${quizKey}`);

      res.json({ quiz });
    } catch (e: any) {
      console.error("Quiz generation error:", e.message);
      res.status(500).json({ error: e.message });
    }
  });

  // TTS endpoint
  app.post("/api/tts", async (req, res) => {
    try {
      const { text, voice } = req.body;
      if (!text) return res.status(400).json({ error: "text required" });

      const response = await gemini.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ role: "user", parts: [{ text }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: voice || 'Kore' }
            }
          }
        },
      });

      const parts = response.candidates?.[0]?.content?.parts || [];
      for (const part of parts) {
        if ((part as any).inlineData?.data) {
          const { data } = (part as any).inlineData;
          const pcm = Buffer.from(data, 'base64');
          const wav = pcmToWav(pcm, 24000);
          res.set('Content-Type', 'audio/wav');
          return res.send(wav);
        }
      }
      res.status(500).json({ error: "No audio generated" });
    } catch (e: any) {
      console.error("TTS error:", e.message);
      res.status(500).json({ error: e.message });
    }
  });

  // Image generation — check Firebase Storage first, generate & save if missing
  app.post("/api/generate-image", async (req, res) => {
    try {
      const { prompt, chapterId, pageIndex } = req.body;
      if (!prompt) return res.status(400).json({ error: "prompt required" });

      const imageKey = chapterId && pageIndex !== undefined
        ? `${chapterId}_page${pageIndex}`
        : `img_${Buffer.from(prompt.substring(0, 100)).toString('base64url')}`;

      // Check Firestore for cached image URL
      const docRef = firestore.collection('story_images').doc(imageKey);
      const doc = await docRef.get();

      if (doc.exists && doc.data()!.url) {
        console.log(`Image cache hit: ${imageKey}`);
        return res.json({ image: doc.data()!.url });
      }

      console.log(`Image cache miss: ${imageKey}, generating...`);
      const response = await gemini.models.generateContent({
        model: "gemini-2.5-flash-image",
        contents: [{
          role: "user",
          parts: [{
            text: `Create a 2D animated Ramayana scene for children.
${prompt}
Soft storybook style, child-friendly, warm colors, cinematic composition, 16:9.`,
          }],
        }],
        config: {
          responseModalities: [Modality.TEXT, Modality.IMAGE],
        },
      });

      const parts = response.candidates?.[0]?.content?.parts || [];
      for (const part of parts) {
        if ((part as any).inlineData?.data) {
          const { mimeType, data } = (part as any).inlineData;
          const buffer = Buffer.from(data, 'base64');

          // Upload to Firebase Storage
          const filePath = `story-images/${imageKey}.png`;
          const file = bucket.file(filePath);
          await file.save(buffer, { contentType: mimeType || 'image/png', public: true });
          const publicUrl = `https://storage.googleapis.com/${bucket.name}/${filePath}`;

          // Save URL to Firestore
          await docRef.set({ url: publicUrl, prompt: prompt.substring(0, 200), createdAt: admin.firestore.FieldValue.serverTimestamp() });
          console.log(`Image saved: ${imageKey}`);

          return res.json({ image: publicUrl });
        }
      }
      res.json({ image: null });
    } catch (e: any) {
      console.error("Image generation error:", e.message);
      res.status(500).json({ error: e.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
