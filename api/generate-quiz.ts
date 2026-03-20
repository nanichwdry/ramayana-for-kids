import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';

const gemini = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { chapterTitle, moral, language } = req.body;
    if (!chapterTitle) return res.status(400).json({ error: 'chapterTitle required' });

    const langName = { en: 'English', te: 'Telugu', hi: 'Hindi', ta: 'Tamil' }[language as string] || 'English';
    const response = await gemini.models.generateContent({
      model: 'gemini-2.5-flash',
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
    console.error('Quiz generation error:', e.message);
    res.status(500).json({ error: e.message });
  }
}
