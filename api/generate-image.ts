import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI, Modality } from '@google/genai';
import { setupCredentials } from './_setup';

setupCredentials();

const vertexAI = new GoogleGenAI({
  vertexai: true,
  project: process.env.GOOGLE_CLOUD_PROJECT || 'ramayana-for-kids-490602',
  location: process.env.GOOGLE_CLOUD_LOCATION || 'us-central1',
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: 'prompt required' });

    const response = await vertexAI.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: [{
        role: 'user',
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
    console.error('Image generation error:', e.message);
    res.status(500).json({ error: e.message });
  }
}
