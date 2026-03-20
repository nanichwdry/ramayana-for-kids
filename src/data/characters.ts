// src/data/characters.ts
import { LocalizedText } from "./storyData";

export interface CharacterCostume {
  royal?: string;
  forest?: string;
  battle?: string;
  saint?: string;
}

export interface CharacterProfile {
  id: string;
  name: LocalizedText;
  role: string;
  personality: string;
  appearance: string;
  costume: CharacterCostume;
  accessories: string[];
  skinColor: string;
  colorPalette: string[];
  voiceTone: string;
  emoji: string;
  childFriendlyNotes: string;
  image: string;
}

export const characters: CharacterProfile[] = [
  {
    id: "char_rama",
    name: { en: "Rama", te: "రాముడు", hi: "राम", ta: "ராமர்" },
    role: "The Hero, Prince of Ayodhya",
    personality: "Righteous, Calm, Courageous, Compassionate",
    appearance: "Tall, graceful, with a divine blue-tinged skin, and gentle eyes.",
    costume: {
      royal: "Elegant silk dhoti, a crown, and royal jewelry.",
      forest: "Simple saffron robes made of bark and cloth, matted hair.",
      battle: "Armor over his robes, bow and quiver on his back.",
    },
    accessories: ["Siva Dhanush (Bow of Siva)", "Quiver of inexhaustible arrows"],
    skinColor: "Azure Blue",
    colorPalette: ["#3b82f6", "#d97706", "#fde047"], // blue, orange, yellow
    voiceTone: "Calm, authoritative, yet gentle.",
    emoji: "🏹",
    childFriendlyNotes: "Always does the right thing, even when it is hard. He is the perfect son, brother, and husband.",
    image: "/characters/char_rama.png"
  },
  {
    id: "char_sita",
    name: { en: "Sita", te: "సీత", hi: "सीता", ta: "சீதை" },
    role: "The Heroine, Princess of Mithila",
    personality: "Devoted, Strong-willed, Pure, Kind",
    appearance: "Radiantly beautiful, with golden skin and a serene smile.",
    costume: {
      royal: "Elaborate saree and jewels, often in shades of gold and red.",
      forest: "Simple, elegant saree, minimal jewelry.",
    },
    accessories: [" চূড়ামণি (Chudamani - crest jewel)", "Flower garlands"],
    skinColor: "Golden",
    colorPalette: ["#f59e0b", "#ef4444", "#fefce8"], // amber, red, ivory
    voiceTone: "Melodious, gentle, and firm when needed.",
    emoji: "🌸",
    childFriendlyNotes: "Loves nature and is very brave. She is an incarnation of Goddess Lakshmi.",
    image: "/characters/char_sita.png"
  },
  {
    id: "char_lakshmana",
    name: { en: "Lakshmana", te: "లక్ష్మణుడు", hi: "लक्ष्मण", ta: "லட்சுமணன்" },
    role: "Rama's Devoted Younger Brother",
    personality: "Fiercely Loyal, Quick-tempered, Selfless, Protective",
    appearance: "Fair-skinned, well-built, with a sharp and alert expression.",
    costume: {
      royal: "Silk dhoti and angavastra, princely ornaments.",
      forest: "Simple bark and cloth robes, always ready with his bow.",
      battle: "Light armor, focused and ready for combat.",
    },
    accessories: ["Bow and arrows"],
    skinColor: "Fair",
    colorPalette: ["#dc2626", "#f8fafc", "#6b7280"], // red, white, gray
    voiceTone: "Sharp, energetic, and full of conviction.",
    emoji: "🛡️",
    childFriendlyNotes: "He always protects Rama and Sita. He did not sleep for 14 years to keep them safe!",
    image: "/characters/char_lakshmana.png"
  },
  {
    id: "char_hanuman",
    name: { en: "Hanuman", te: "హనుమంతుడు", hi: "हनुमान", ta: "ஹனுமான்" },
    role: "The Devoted Vanara, Son of Vayu",
    personality: "Devout, Powerful, Humble, Wise, Playful",
    appearance: "Large and muscular Vanara (monkey-like being) with golden fur.",
    costume: {
      battle: "Often depicted with a simple loincloth (kaupina).",
    },
    accessories: ["Gada (Mace)"],
    skinColor: "Golden Fur",
    colorPalette: ["#f97316", "#a16207", "#fef3c7"], // orange, gold, beige
    voiceTone: "Deep, resonant, and filled with devotion.",
    emoji: "🐒",
    childFriendlyNotes: "Super strong and can fly! He is Rama's biggest helper and can change his size.",
    image: "/characters/char_hanuman.png"
  },
  {
    id: "char_ravana",
    name: { en: "Ravana", te: "రావణుడు", hi: "रावण", ta: "ராவணன்" },
    role: "The Antagonist, King of Lanka",
    personality: "Arrogant, Intelligent, Powerful, Vain",
    appearance: "Imposing figure with ten heads and twenty arms, dark complexion.",
    costume: {
      royal: "Extravagant royal robes, a massive crown on his main head, heavy gold jewelry.",
      battle: "Golden armor, wielding various divine weapons.",
    },
    accessories: ["Chandrahasa (divine sword)", "Veena (musical instrument)"],
    skinColor: "Dark",
    colorPalette: ["#5b21b6", "#000000", "#ffd700"], // deep purple, black, gold
    voiceTone: "Loud, booming, and arrogant.",
    emoji: "👑",
    childFriendlyNotes: "He is the super-strong bad guy who makes a big mistake because of his pride.",
    image: "/characters/char_ravana.png"
  },
  {
    id: "char_dasharatha",
    name: { en: "Dasharatha", te: "దశరథుడు", hi: "दशरथ", ta: "தசரதன்" },
    role: "King of Ayodhya, Rama's Father",
    personality: "Noble, Kind, but bound by his word",
    appearance: "Elderly, with a regal beard, and a sorrowful but kind face.",
    costume: {
      royal: "King's robes, a grand crown, and many jewels.",
    },
    accessories: ["Royal Scepter"],
    skinColor: "Fair",
    colorPalette: ["#fafaf9", "#ca8a04", "#78350f"], // white, gold, brown
    voiceTone: "Kingly, gentle, often filled with emotion.",
    emoji: "👑",
    childFriendlyNotes: "He loves all his sons very much. He had to make a very hard choice.",
    image: "/characters/char_dasharatha.png"
  },
  {
    id: "char_kaikeyi",
    name: { en: "Kaikeyi", te: "కైకేయి", hi: "कैकेयी", ta: "கைகேயி" },
    role: "Dasharatha's Youngest Queen",
    personality: "Initially loving, later insecure and manipulative",
    appearance: "Beautiful and proud, with sharp features.",
    costume: {
      royal: "Rich sarees and jewelry, befitting a queen.",
    },
    accessories: ["Her two boons (promises) from the king"],
    skinColor: "Fair",
    colorPalette: ["#7e22ce", "#a21caf", "#fdf4ff"], // purple, fuchsia, light pink
    voiceTone: "Sweet, but can become sharp and demanding.",
    emoji: "🐍",
    childFriendlyNotes: "She loved Rama a lot, but was tricked into making a bad wish.",
    image: "/characters/char_kaikeyi.png"
  },
  {
    id: "char_bharata",
    name: { en: "Bharata", te: "భరతుడు", hi: "भरत", ta: "பரதன்" },
    role: "Rama's younger brother, son of Kaikeyi",
    personality: "Righteous, Devoted, Humble",
    appearance: "Resembles Rama, with a noble and sincere expression.",
    costume: {
      royal: "Princely attire.",
      saint: "Simple hermit clothes while ruling as a regent.",
    },
    accessories: ["Rama's Padukas (sandals)"],
    skinColor: "Fair",
    colorPalette: ["#7c2d12", "#fed7aa", "#f0f9ff"], // dark orange, peach, sky blue
    voiceTone: "Humble, sincere, and full of integrity.",
    emoji: "🙏",
    childFriendlyNotes: "He was a great brother who ruled the kingdom for Rama, but never sat on the throne.",
    image: "/characters/char_bharata.png"
  },
  {
    id: "char_shatrughna",
    name: { en: "Shatrughna", te: "శత్రుఘ్నుడు", hi: "शत्रुघ्न", ta: "சத்ருக்னன்" },
    role: "Rama's youngest brother, Lakshmana's twin",
    personality: "Quiet, Loyal, Follows his brothers",
    appearance: "Similar to his twin Lakshmana.",
    costume: { royal: "Princely attire." },
    accessories: ["Sword"],
    skinColor: "Fair",
    colorPalette: ["#1d4ed8", "#eff6ff", "#9ca3af"], // blue, light blue, gray
    voiceTone: "Reserved and thoughtful.",
    emoji: "⚔️",
    childFriendlyNotes: "He is Lakshmana's twin and is always ready to help his family.",
    image: "/characters/char_shatrughna.png"
  },
  {
    id: "char_kausalya",
    name: { en: "Kausalya", te: "కౌసల్య", hi: "कौशल्या", ta: "கௌசல்யா" },
    role: "Dasharatha's Eldest Queen, Rama's Mother",
    personality: "Kind, Patient, Dignified",
    appearance: "A graceful, elderly queen with a loving smile.",
    costume: { royal: "Simple and elegant queenly sarees." },
    accessories: [],
    skinColor: "Fair",
    colorPalette: ["#fefce8", "#facc15", "#e11d48"], // ivory, yellow, rose
    voiceTone: "Warm, motherly, and soft-spoken.",
    emoji: "👩‍👦",
    childFriendlyNotes: "She is Rama's mother and is the main queen of Ayodhya.",
    image: "/characters/char_kausalya.png"
  },
  {
    id: "char_sumitra",
    name: { en: "Sumitra", te: "సుమిత్ర", hi: "सुमित्रा", ta: "சுமித்திரை" },
    role: "Dasharatha's Queen, Mother of Lakshmana & Shatrughna",
    personality: "Wise, Selfless, Understanding",
    appearance: "A calm and wise-looking queen.",
    costume: { royal: "Elegant queenly sarees." },
    accessories: [],
    skinColor: "Fair",
    colorPalette: ["#e0e7ff", "#6366f1", "#a5b4fc"], // lavender, indigo, light indigo
    voiceTone: "Calm, wise, and encouraging.",
    emoji: "👩‍👧‍👦",
    childFriendlyNotes: "She is the mother of the twins, Lakshmana and Shatrughna.",
    image: "/characters/char_sumitra.png"
  },
  {
    id: "char_vishwamitra",
    name: { en: "Vishwamitra", te: "విశ్వామిత్రుడు", hi: "विश्वामित्र", ta: "விஸ்வாமித்திரர்" },
    role: "A Great Sage (Rishi), Rama's Guru",
    personality: "Powerful, Intense, Wise",
    appearance: "Tall, powerful sage with a long white beard and glowing eyes.",
    costume: { saint: "Saffron robes, carries a staff and water pot." },
    accessories: ["Brahmadanda (holy staff)", "Kamandalu (water pot)"],
    skinColor: "Tanned from meditation",
    colorPalette: ["#ea580c", "#422006", "#fef3c7"], // deep orange, brown, beige
    voiceTone: "Powerful, commanding, and full of ancient wisdom.",
    emoji: "🧘‍♂️",
    childFriendlyNotes: "A super-powerful wise man who was once a king. He teaches Rama many magical things.",
    image: "/characters/char_vishwamitra.png"
  },
  {
    id: "char_sugriva",
    name: { en: "Sugriva", te: "సుగ్రీవుడు", hi: "सुग्रीव", ta: "சுக்ரீவன்" },
    role: "King of the Vanaras in Kishkindha",
    personality: "Fearful but later loyal and helpful",
    appearance: "A large Vanara, similar to his brother Vali.",
    costume: { royal: "Wears a crown and some ornaments after becoming king." },
    accessories: [],
    skinColor: "Brown fur",
    colorPalette: ["#ca8a04", "#78350f", "#fef9c3"], // gold, brown, light yellow
    voiceTone: "Initially nervous, later more confident and kingly.",
    emoji: "🤝",
    childFriendlyNotes: "He is the king of the monkey kingdom and becomes great friends with Rama.",
    image: "/characters/char_sugriva.png"
  },
  {
    id: "char_vali",
    name: { en: "Vali", te: "వాలి", hi: "बालि", ta: "வாலி" },
    role: "Sugriva's Powerful Brother",
    personality: "Extremely Powerful, Arrogant, Proud",
    appearance: "A massive, muscular Vanara with an imposing presence.",
    costume: {},
    accessories: ["A divine necklace that gives him immense power"],
    skinColor: "Darker brown fur",
    colorPalette: ["#44403c", "#a1a1aa", "#fde68a"], // stone, zinc, khaki
    voiceTone: "Booming, proud, and dismissive.",
    emoji: "💪",
    childFriendlyNotes: "He was Sugriva's brother and was the strongest monkey in the world.",
    image: "/characters/char_vali.png"
  },
  {
    id: "char_jatayu",
    name: { en: "Jatayu", te: "జటాయువు", hi: "जटायु", ta: "ஜடாயு" },
    role: "A Divine Eagle, Friend of Dasharatha",
    personality: "Brave, Noble, Devoted",
    appearance: "A giant, ancient eagle with massive wings.",
    costume: {},
    accessories: [],
    skinColor: "Brown and white feathers",
    colorPalette: ["#78350f", "#f7fafc", "#ef4444"], // brown, white, red
    voiceTone: "Noble, screeching, and courageous.",
    emoji: "🦅",
    childFriendlyNotes: "A giant, brave bird who tried to save Sita from Ravana.",
    image: "/characters/char_jatayu.png"
  },
  {
    id: "char_indrajit",
    name: { en: "Indrajit", te: "ఇంద్రజిత్తు", hi: "इंद्रजीत", ta: "இந்திரஜித்" },
    role: "Ravana's Son, A Mighty Warrior",
    personality: "Powerful, Master of Illusions, Dutiful",
    appearance: "A young, powerful warrior with a determined look.",
    costume: { battle: "Dark, magical armor." },
    accessories: ["Brahmastra and other celestial weapons"],
    skinColor: "Dark",
    colorPalette: ["#1e293b", "#0f172a", "#64748b"], // slate, dark slate, cool gray
    voiceTone: "Confident, powerful, and skilled.",
    emoji: "⚡",
    childFriendlyNotes: "Ravana's son, who could become invisible and was a very powerful fighter.",
    image: "/characters/char_indrajit.png"
  },
];

export const characterById: Record<string, CharacterProfile> = characters.reduce((acc, char) => {
  acc[char.id] = char;
  return acc;
}, {} as Record<string, CharacterProfile>);
