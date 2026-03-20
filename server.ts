import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { GoogleGenAI, Modality } from "@google/genai";
import dotenv from "dotenv";

dotenv.config({ path: '.env.local' });

// If GOOGLE_APPLICATION_CREDENTIALS_JSON env var exists (Vercel),
// write it to a temp file and set GOOGLE_APPLICATION_CREDENTIALS
if (process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON && !process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  const tmpPath = '/tmp/gcp-sa-key.json';
  fs.writeFileSync(tmpPath, process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);
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

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || '3000');

  // CORS for frontend on different domain (Vercel)
  app.use((req, res, next) => {
    const origin = req.headers.origin || '';
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.sendStatus(200);
    next();
  });

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

  // Image generation endpoint using Vertex AI
  app.post("/api/generate-image", async (req, res) => {
    try {
      const { prompt } = req.body;
      if (!prompt) return res.status(400).json({ error: "prompt required" });

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
