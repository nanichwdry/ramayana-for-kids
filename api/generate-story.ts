import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';

const gemini = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { chapterTitle, language, moral } = req.body;
    if (!chapterTitle) return res.status(400).json({ error: 'chapterTitle required' });

    const langName = { en: 'English', te: 'Telugu', hi: 'Hindi', ta: 'Tamil' }[language as string] || 'English';
    const response = await gemini.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are a storyteller for children aged 5-10. Tell the Ramayana story chapter "${chapterTitle}" in ${langName}.
Split into exactly 4 short pages (separated by ---). Each page should be 2-3 sentences, simple and engaging for kids.
Include the moral lesson "${moral || ''}" on the last page. Use vivid but simple language. Do not use any markdown formatting.`,
    });

    const text = response.text || '';
    const pages = text.split('---').map(p => p.trim()).filter(p => p.length > 0);
    res.json({ pages: pages.length > 0 ? pages : ['Story could not be generated.'] });
  } catch (e: any) {
    console.error('Story generation error:', e.message);
    res.status(500).json({ error: e.message });
  }
}
