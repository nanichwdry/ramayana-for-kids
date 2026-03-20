import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI, Modality } from "@google/genai";
import dotenv from "dotenv";

dotenv.config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Gemini client for text generation
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

  app.use(express.json());

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Story generation endpoint using Gemini
  app.post("/api/generate-story", async (req, res) => {
    try {
      const { chapterTitle, language, moral } = req.body;
      if (!chapterTitle) return res.status(400).json({ error: "chapterTitle required" });

      const langName = { en: 'English', te: 'Telugu', hi: 'Hindi', ta: 'Tamil' }[language] || 'English';
      const response = await gemini.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `You are a storyteller for children aged 5-10. Tell the Ramayana story chapter "${chapterTitle}" in ${langName}.
Split into exactly 4 short pages (separated by ---). Each page should be 2-3 sentences, simple and engaging for kids.
Include the moral lesson "${moral || ''}" on the last page. Use vivid but simple language. Do not use any markdown formatting.`,
      });

      const text = response.text || '';
      const pages = text.split('---').map((p: string) => p.trim()).filter((p: string) => p.length > 0);
      res.json({ pages: pages.length > 0 ? pages : ["Story could not be generated."] });
    } catch (e: any) {
      console.error("Story generation error:", e.message);
      res.status(500).json({ error: e.message });
    }
  });

  // Quiz generation endpoint
  app.post("/api/generate-quiz", async (req, res) => {
    try {
      const { chapterTitle, moral, language } = req.body;
      if (!chapterTitle) return res.status(400).json({ error: "chapterTitle required" });

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
      res.json({ quiz });
    } catch (e: any) {
      console.error("Quiz generation error:", e.message);
      res.status(500).json({ error: e.message });
    }
  });

  // Text-to-speech endpoint using Gemini Live API
  app.post("/api/tts", async (req, res) => {
    try {
      const { text, voice } = req.body;
      if (!text) return res.status(400).json({ error: "text required" });

      const audioChunks: Buffer[] = [];
      let resolveResponse!: () => void;
      let rejectResponse!: (e: any) => void;

      const responseComplete = new Promise<void>((resolve, reject) => {
        resolveResponse = resolve;
        rejectResponse = reject;
      });

      const session = await gemini.live.connect({
        model: 'gemini-2.0-flash-live-001',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: voice || 'Kore' }
            }
          }
        },
        callbacks: {
          onmessage: (msg: any) => {
            const parts = msg.serverContent?.modelTurn?.parts || [];
            for (const part of parts) {
              if (part.inlineData?.data) {
                audioChunks.push(Buffer.from(part.inlineData.data, 'base64'));
              }
            }
            if (msg.serverContent?.turnComplete) {
              resolveResponse();
            }
          },
          onerror: (e: any) => rejectResponse(e),
          onclose: () => resolveResponse(),
        }
      });

      await session.sendClientContent({
        turns: [{ role: 'user', parts: [{ text }] }],
        turnComplete: true
      });

      await responseComplete;
      session.close();

      if (audioChunks.length === 0) {
        return res.status(500).json({ error: "No audio generated" });
      }

      // Concatenate PCM16 chunks and convert to WAV (24kHz)
      const pcm = Buffer.concat(audioChunks);
      const wav = pcmToWav(pcm, 24000);
      res.set('Content-Type', 'audio/wav');
      return res.send(wav);
    } catch (e: any) {
      console.error("TTS error:", e.message);
      res.status(500).json({ error: e.message });
    }
  });

  // Image generation endpoint using Gemini API
  app.post("/api/generate-image", async (req, res) => {
    try {
      const { prompt } = req.body;
      if (!prompt) return res.status(400).json({ error: "prompt required" });

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
          return res.json({ image: `data:${mimeType};base64,${data}` });
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
