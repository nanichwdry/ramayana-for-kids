import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config({ path: ".env.local" });

const vertexAI = new GoogleGenAI({
  vertexai: true,
  project: "ramayana-for-kids-490602",
  location: "us-central1",
});

const OUTPUT_DIR = path.join(process.cwd(), "public", "characters");

const characterPrompts: { id: string; prompt: string }[] = [
  { id: "char_rama", prompt: "2D animated character portrait of Prince Rama from Indian epic Ramayana, young prince with blue-tinged skin, holding a golden bow, royal crown, saffron robes, gentle kind eyes, divine aura, child-friendly Disney storybook style, soft warm colors, simple gradient background" },
  { id: "char_sita", prompt: "2D animated character portrait of Princess Sita from Indian epic Ramayana, beautiful princess with golden skin, elegant red and gold saree, flower garlands, serene smile, child-friendly Disney storybook style, soft warm colors, simple gradient background" },
  { id: "char_lakshmana", prompt: "2D animated character portrait of Prince Lakshmana from Indian epic Ramayana, young warrior prince, fair skin, alert expression, bow and arrows, princely attire, child-friendly Disney storybook style, soft warm colors, simple gradient background" },
  { id: "char_hanuman", prompt: "2D animated character portrait of Hanuman from Indian epic Ramayana, golden-furred monkey deity, muscular, carrying a mace, devotional expression, child-friendly Disney storybook style, soft warm colors, simple gradient background" },
  { id: "char_ravana", prompt: "2D animated character portrait of Ravana from Indian epic Ramayana, ten-headed demon king, golden crown and royal robes, imposing but not scary, child-friendly Disney storybook style, soft warm colors, simple gradient background" },
  { id: "char_dasharatha", prompt: "2D animated character portrait of King Dasharatha from Indian epic Ramayana, elderly king with white beard, grand crown and royal robes, kind face, child-friendly Disney storybook style, soft warm colors, simple gradient background" },
  { id: "char_kaikeyi", prompt: "2D animated character portrait of Queen Kaikeyi from Indian epic Ramayana, beautiful proud queen, purple saree and royal jewelry, child-friendly Disney storybook style, soft warm colors, simple gradient background" },
  { id: "char_bharata", prompt: "2D animated character portrait of Prince Bharata from Indian epic Ramayana, noble young prince, humble expression, holding golden sandals, simple hermit clothes, child-friendly Disney storybook style, soft warm colors, simple gradient background" },
  { id: "char_shatrughna", prompt: "2D animated character portrait of Prince Shatrughna from Indian epic Ramayana, young prince warrior, quiet reserved expression, sword, blue princely attire, child-friendly Disney storybook style, soft warm colors, simple gradient background" },
  { id: "char_kausalya", prompt: "2D animated character portrait of Queen Kausalya from Indian epic Ramayana, graceful elderly queen, loving motherly smile, ivory and gold saree, child-friendly Disney storybook style, soft warm colors, simple gradient background" },
  { id: "char_sumitra", prompt: "2D animated character portrait of Queen Sumitra from Indian epic Ramayana, calm wise queen, gentle expression, lavender saree, child-friendly Disney storybook style, soft warm colors, simple gradient background" },
  { id: "char_vishwamitra", prompt: "2D animated character portrait of Sage Vishwamitra from Indian epic Ramayana, powerful ancient sage, long white beard, saffron robes, holy staff, child-friendly Disney storybook style, soft warm colors, simple gradient background" },
  { id: "char_sugriva", prompt: "2D animated character portrait of Sugriva from Indian epic Ramayana, monkey king, brown fur, small crown and ornaments, friendly expression, child-friendly Disney storybook style, soft warm colors, simple gradient background" },
  { id: "char_vali", prompt: "2D animated character portrait of Vali from Indian epic Ramayana, powerful monkey warrior, darker brown fur, muscular, divine necklace, proud expression, child-friendly Disney storybook style, soft warm colors, simple gradient background" },
  { id: "char_jatayu", prompt: "2D animated character portrait of Jatayu from Indian epic Ramayana, giant divine eagle, massive brown and white wings, noble brave expression, child-friendly Disney storybook style, soft warm colors, simple gradient background" },
  { id: "char_indrajit", prompt: "2D animated character portrait of Indrajit from Indian epic Ramayana, young demon warrior, dark armor, confident stance, child-friendly Disney storybook style, not scary, soft warm colors, simple gradient background" },
];

async function generateImage(id: string, prompt: string): Promise<boolean> {
  const filePath = path.join(OUTPUT_DIR, `${id}.png`);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${id} already exists, skipping`);
    return true;
  }

  console.log(`🎨 Generating ${id}...`);
  try {
    const response = await vertexAI.models.generateImages({
      model: "imagen-3.0-generate-002",
      prompt,
      config: { numberOfImages: 1 },
    });

    const img = response.generatedImages?.[0]?.image;
    if (img?.imageBytes) {
      const buffer = Buffer.from(img.imageBytes, "base64");
      fs.writeFileSync(filePath, buffer);
      console.log(`✅ ${id} saved (${(buffer.length / 1024).toFixed(0)}KB)`);
      return true;
    }
    console.log(`⚠️ ${id} - no image in response`);
    return false;
  } catch (e: any) {
    console.error(`❌ ${id} failed:`, e.message?.substring(0, 200));
    return false;
  }
}

async function main() {
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  console.log(`\nGenerating ${characterPrompts.length} character images with Vertex AI Imagen 3...\n`);

  for (const { id, prompt } of characterPrompts) {
    let success = await generateImage(id, prompt);
    if (!success) {
      console.log(`⏳ Retrying ${id} in 10s...`);
      await new Promise(r => setTimeout(r, 10000));
      await generateImage(id, prompt);
    }
    await new Promise(r => setTimeout(r, 8000));
  }

  console.log("\n🎉 Done! Check public/characters/");
}

main();
