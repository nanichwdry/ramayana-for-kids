import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { GoogleGenAI, Modality } from "@google/genai";
import dotenv from "dotenv";

dotenv.config({ path: '.env.local' });

// Write service account JSON to temp file for Vertex AI auth
const saJson = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON || process.env.GOOGLE_APPLICATION_CREDENTIALS || '';
if (saJson && saJson.includes('"type"')) {
  const tmpPath = '/tmp/gcp-sa-key.json';
  fs.writeFileSync(tmpPath, saJson);
  process.env.GOOGLE_APPLICATION_CREDENTIALS = tmpPath;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Gemini API client for text generation (story, quiz)
const gemini = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

// Vertex AI client for image generation only
const vertexAI = new GoogleGenAI({
  vertexai: true,
  project: process.env.GOOGLE_CLOUD_PROJECT || 'ramayana-for-kids-490602',
  location: process.env.GOOGLE_CLOUD_LOCATION || 'us-central1',
});

// In-memory cache for stories, quizzes, images
const cache = new Map<string, any>();

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || '3000');

  // CORS for frontend on different domain
  app.use((req, res, next) => {
    const origin = req.headers.origin || '';
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.sendStatus(200);
    next();
  });

  app.use(express.json());

  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  // Story generation using Gemini API key
  app.post("/api/generate-story", async (req, res) => {
    try {
      const { chapterTitle, language, moral } = req.body;
      if (!chapterTitle) return res.status(400).json({ error: "chapterTitle required" });

      const cacheKey = `story_${chapterTitle}_${language}`;
      if (cache.has(cacheKey)) return res.json({ pages: cache.get(cacheKey) });

      const langName = { en: 'English', te: 'Telugu', hi: 'Hindi', ta: 'Tamil' }[language as string] || 'English';
      const response = await gemini.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `You are a storyteller for children aged 5-10. Tell the Ramayana story chapter "${chapterTitle}" in ${langName}.
Split into exactly 4 short pages (separated by ---). Each page should be 2-3 sentences, simple and engaging for kids.
Include the moral lesson "${moral || ''}" on the last page. Use vivid but simple language. Do not use any markdown formatting.`,
      });

      const text = response.text || '';
      const pages = text.split('---').map((p: string) => p.trim()).filter((p: string) => p.length > 0);
      const result = pages.length > 0 ? pages : ["Story could not be generated."];
      cache.set(cacheKey, result);
      res.json({ pages: result });
    } catch (e: any) {
      console.error("Story generation error:", e.message);
      res.status(500).json({ error: e.message });
    }
  });

  // Quiz generation using Gemini API key
  app.post("/api/generate-quiz", async (req, res) => {
    try {
      const { chapterTitle, moral, language } = req.body;
      if (!chapterTitle) return res.status(400).json({ error: "chapterTitle required" });

      const cacheKey = `quiz_${chapterTitle}_${language}`;
      if (cache.has(cacheKey)) return res.json({ quiz: cache.get(cacheKey) });

      const langName = { en: 'English', te: 'Telugu', hi: 'Hindi', ta: 'Tamil' }[language as string] || 'English';
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
      cache.set(cacheKey, quiz);
      res.json({ quiz });
    } catch (e: any) {
      console.error("Quiz generation error:", e.message);
      res.status(500).json({ error: e.message });
    }
  });

  // Image generation using Vertex AI
  app.post("/api/generate-image", async (req, res) => {
    try {
      const { prompt } = req.body;
      if (!prompt) return res.status(400).json({ error: "prompt required" });

      const cacheKey = `img_${prompt.substring(0, 100)}`;
      if (cache.has(cacheKey)) return res.json({ image: cache.get(cacheKey) });

      const response = await vertexAI.models.generateContent({
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
          const imageData = `data:${mimeType};base64,${data}`;
          cache.set(cacheKey, imageData);
          return res.json({ image: imageData });
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
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
