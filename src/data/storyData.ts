// src/data/storyData.ts
import { Language } from "../translations";

export interface LocalizedText {
  en: string;
  te: string;
  hi: string;
  ta: string;
}

export interface Chapter {
  id: string;
  title: LocalizedText;
  moral: LocalizedText;
  tone: string;
  scenes: number;
  status: "completed" | "unlocked" | "locked";
  stars: number;
}

export interface StoryArc {
  id: string;
  title: LocalizedText;
  theme: string;
  color: string;
  chapters: Chapter[];
}

const chapters: Chapter[] = [
  // Arc 1: Bala Kanda
  { id: "c1", title: { en: "The Birth of Rama", te: "రాముడి జననం", hi: "राम का जन्म", ta: "ராமரின் பிறப்பு" }, moral: { en: "Righteous beginnings lead to a great destiny.", te: "ధర్మబద్ధమైన ఆరంభాలు గొప్ప గమ్యానికి దారితీస్తాయి", hi: "धर्मी शुरुआतें एक महान भाग्य की ओर ले जाती हैं", ta: "நேர்மையான தொடக்கங்கள் ஒரு பெரிய தலைவிதிக்கு வழிவகுக்கும்" }, tone: "Joyful, Divine", scenes: 3, status: "completed", stars: 3 },
  { id: "c2", title: { en: "Vishwamitra's Request", te: "విశ్వామిత్రుని అభ్యర్థన", hi: "विश्वामित्र का अनुरोध", ta: "விஸ்வாமித்திரரின் கோரிக்கை" }, moral: { en: "Heed the call of duty and respect your elders.", te: "విధి పిలుపును విని, పెద్దలను గౌరవించండి", hi: "कर्तव्य की पुकार पर ध्यान दें और अपने बड़ों का सम्मान करें", ta: "கடமையின் அழைப்பைக் கேட்டு பெரியவர்களை மதிக்கவும்" }, tone: "Serious, Respectful", scenes: 4, status: "completed", stars: 2 },
  { id: "c3", title: { en: "Slaying of Tataka", te: "తాటక వధ", hi: "ताड़का का वध", ta: "தாடகையின் வதம்" }, moral: { en: "Courage is facing evil to protect the innocent.", te: "నిరపరాధులను రక్షించడానికి చెడును ఎదుర్కోవడమే ధైర్యం", hi: "साहस निर्दोषों की रक्षा के लिए बुराई का सामना करना है", ta: "அப்பாவிக்களைக் காக்க தீமையை எதிர்கொள்வதே தைரியம்" }, tone: "Action, Brave", scenes: 5, status: "unlocked", stars: 0 },
  { id: "c4", title: { en: "Liberation of Ahalya", te: "అహల్య విముక్తి", hi: "अहल्या की मुक्ति", ta: "அகலிகையின் விடுதலை" }, moral: { en: "Compassion and forgiveness can undo curses.", te: "కరుణ మరియు క్షమ శాపాలను రద్దు చేయగలవు", hi: "करुणा और क्षमा श्राप को भी समाप्त कर सकती है", ta: "கருணையும் மன்னிப்பும் சாபங்களை நீக்கும்" }, tone: "Mystical, Forgiving", scenes: 3, status: "locked", stars: 0 },
  { id: "c5", title: { en: "The Siva Dhanush", te: "శివ ధనుస్సు", hi: "शिव धनुष", ta: "சிவதனுசு" }, moral: { en: "True strength is matched with grace and worthiness.", te: "నిజమైన బలం దయ మరియు యోగ్యతతో సరిపోలుతుంది", hi: "सच्ची ताकत अनुग्रह और योग्यता के साथ मेल खाती है", ta: "உண்மையான வலிமை கருணை மற்றும் தகுதியுடன் பொருந்துகிறது" }, tone: "Suspenseful, Powerful", scenes: 4, status: "locked", stars: 0 },
  { id: "c6", title: { en: "Sita's Swayamvara", te: "సీతా స్వయంవరం", hi: "सीता स्वयंवर", ta: "சீதையின் சுயம்வரம்" }, moral: { en: "Destiny unites those who are meant to be.", te: "విధి ఉండవలసిన వారిని కలుపుతుంది", hi: "भाग्य उन लोगों को मिलाता है जो एक साथ रहने के लिए बने हैं", ta: "விதி ஒன்று சேர வேண்டியவர்களை ஒன்றிணைக்கிறது" }, tone: "Celebratory, Romantic", scenes: 5, status: "locked", stars: 0 },
  { id: "c7", title: { en: "Parasurama's Challenge", te: "పరశురాముని సవాలు", hi: "परशुराम की चुनौती", ta: "பரசுராமரின் சவால்" }, moral: { en: "Humility must accompany great power.", te: "గొప్ప శక్తితో పాటు వినయం కూడా ఉండాలి", hi: "महान शक्ति के साथ विनम्रता होनी चाहिए", ta: "பெரும் சக்திக்கு அடக்கமும் வேண்டும்" }, tone: "Tense, Dramatic", scenes: 3, status: "locked", stars: 0 },
  
  // Arc 2: Ayodhya Kanda
  { id: "c8", title: { en: "Promise to Kaikeyi", te: "కైకేయికి ఇచ్చిన మాట", hi: "कैकेयी से वादा", ta: "கைகேயிக்கு வாக்கு" }, moral: { en: "The burden of keeping a promise.", te: "వాగ్దానాన్ని నిలబెట్టుకోవాల్సిన భారం", hi: "वादा निभाने का बोझ।", ta: "வாக்குறுதியைக் காப்பாற்றும் சுமை" }, tone: "Sorrowful, Tense", scenes: 4, status: "locked", stars: 0 },
  { id: "c9", title: { en: "Rama's Exile", te: "రాముని వనవాసం", hi: "राम का वनवास", ta: "ராமர் வனவாசம்" }, moral: { en: "Acceptance of duty, no matter how difficult.", te: "ఎంత కష్టమైనా విధిని అంగీకరించడం", hi: "कर्तव्य की स्वीकृति, चाहे कितनी भी कठिन क्यों न हो", ta: "எவ்வளவு கடினமாக இருந்தாலும் கடமையை ஏற்றுக்கொள்வது" }, tone: "Heartbreaking, Resolute", scenes: 5, status: "locked", stars: 0 },
  { id: "c10", title: { en: "Grief of Dasharatha", te: "దశరథుని దుఃఖం", hi: "दशरथ का शोक", ta: "தசரதனின் துக்கம்" }, moral: { en: "Actions driven by attachment can lead to sorrow.", te: "అనుబంధంతో నడిచే చర్యలు దుఃఖానికి దారితీస్తాయి", hi: "लगाव से प्रेरित कार्य दुःख का कारण बन सकते हैं", ta: "பற்றுதலால் உந்தப்படும் செயல்கள் துக்கத்திற்கு வழிவகுக்கும்" }, tone: "Tragic, Somber", scenes: 3, status: "locked", stars: 0 },
  { id: "c11", title: { en: "Bharata's Devotion", te: "భరతుని భక్తి", hi: "भरत की भक्ति", ta: "பரதனின் பக்தி" }, moral: { en: "True loyalty is upholding righteousness.", te: "నిజమైన విధేయత ధర్మాన్ని నిలబెట్టడమే", hi: "सच्ची निष्ठा धर्म को बनाए रखना है", ta: "உண்மையான விசுவாசம் நீதியைக் காப்பது" }, tone: "Loyal, Righteous", scenes: 4, status: "locked", stars: 0 },
  { id: "c12", title: { en: "The Padukas of Rama", te: "రాముని పాదుకలు", hi: "राम की पादुका", ta: "ராமரின் பாதுகைகள்" }, moral: { en: "A symbol can be as powerful as a king.", te: "ఒక చిహ్నం రాజు అంత శక్తివంతమైనది కాగలదు", hi: "एक प्रतीक राजा के समान शक्तिशाली हो सकता है", ta: "ஒரு சின்னம் ஒரு ராஜாவைப் போல சக்திவாய்ந்ததாக இருக்க முடியும்" }, tone: "Hopeful, Symbolic", scenes: 3, status: "locked", stars: 0 },

  // Arc 3: Aranya Kanda
  { id: "c13", title: { en: "Life in the Forest", te: "అడవిలో జీవితం", hi: "जंगल में जीवन", ta: "காட்டில் வாழ்க்கை" }, moral: { en: "Find peace and simplicity in nature.", te: "ప్రకృతిలో శాంతి మరియు సరళతను కనుగొనండి", hi: "प्रकृति में शांति और सरलता पाएं", ta: "இயற்கையில் அமைதியையும் எளிமையையும் காணுங்கள்" }, tone: "Peaceful, Natural", scenes: 5, status: "locked", stars: 0 },
  { id: "c14", title: { en: "Surpanakha's Encounter", te: "శూర్పణఖతో சந்திப்பு", hi: "शूर्पणखा से भेंट", ta: "சூர்ப்பநகையின் சந்திப்பு" }, moral: { en: "Jealousy and vanity lead to one's downfall.", te: "అసూయ మరియు అహంకారం ఒకరి పతనానికి దారితీస్తాయి", hi: "ईर्ष्या और घमंड व्यक्ति के पतन का कारण बनते हैं", ta: "பொறாமையும் கர்வமும் ஒருவரின் வீழ்ச்சிக்கு வழிவகுக்கும்" }, tone: "Dramatic, Confrontational", scenes: 4, status: "locked", stars: 0 },
  { id: "c15", title: { en: "The Golden Deer", te: "బంగారు జింక", hi: "सुनहरा हिरण", ta: "தங்க மான்" }, moral: { en: "Appearances can be deceptive.", te: "தோற்றాలు మోసపూరితంగా ఉంటాయి", hi: "दिखावा भ्रामक हो सकता है", ta: "தோற்றங்கள் ஏமாற்றக்கூடியவை" }, tone: "Deceptive, Tense", scenes: 3, status: "locked", stars: 0 },
  { id: "c16", title: { en: "Abduction of Sita", te: "సీతాపహరణం", hi: "सीता का अपहरण", ta: "சீதை கடத்தல்" }, moral: { en: "The grave consequences of deceit and desire.", te: "మోసం మరియు కోరికల యొక్క తీవ్ర పరిణామాలు", hi: "धोखे और इच्छा के गंभीर परिणाम", ta: "வஞ்சகம் மற்றும் ஆசையின் கடுமையான விளைவுகள்" }, tone: "Tragic, Helpless", scenes: 5, status: "locked", stars: 0 },
  { id: "c17", title: { en: "Jatayu's Sacrifice", te: "జటాయువు త్యాగం", hi: "जटायु का बलिदान", ta: "ஜடாயுவின் தியாகம்" }, moral: { en: "Courage means fighting for what is right, even if you lose.", te: "ధైర్యం అంటే ఓడిపోయినా సరైన దాని కోసం పోరాడటం", hi: "साहस का अर्थ है जो सही है उसके लिए लड़ना, भले ही आप हार जाएं", ta: "தோல்வியுற்றாலும் சரியானவற்றுக்காகப் போராடுவதே தைரியம்" }, tone: "Heroic, Sad", scenes: 4, status: "locked", stars: 0 },
  { id: "c18", title: { en: "Kabandha's Story", te: "కబంధుని కథ", hi: "कबंध की कहानी", ta: "கபந்தனின் கதை" }, moral: { en: "Help can come from unexpected places.", te: "సహాయం ఊహించని ప్రదేశాల నుండి రావచ్చు", hi: "मदद अप्रत्याशित जगहों से आ सकती है", ta: "உதவி எதிர்பாராத இடங்களிலிருந்து வரலாம்" }, tone: "Mysterious, Hopeful", scenes: 3, status: "locked", stars: 0 },
  
  // Arc 4: Kishkindha Kanda
  { id: "c19", title: { en: "Meeting Hanuman", te: "హనుమంతుని కలవడం", hi: "हनुमान से भेंट", ta: "ஹனுமனை சந்தித்தல்" }, moral: { en: "True devotion recognizes divinity.", te: "నిజమైన భక్తి దైవత్వాన్ని గుర్తిస్తుంది", hi: "सच्ची भक्ति दिव्यता को पहचानती है", ta: "உண்மையான பக்தி தெய்வீகத்தை அங்கீகரிக்கிறது" }, tone: "Hopeful, Divine", scenes: 4, status: "locked", stars: 0 },
  { id: "c20", title: { en: "The Pact with Sugriva", te: "సుగ్రీవునితో ఒప్పందం", hi: "सुग्रीव के साथ समझौता", ta: "சுக்ரீவனுடன் ஒப்பந்தம்" }, moral: { en: "Alliances built on trust lead to success.", te: "నమ్మకంపై నిర్మించిన పొత్తులు విజయానికి దారితీస్తాయి", hi: "विश्वास पर बने गठबंधन सफलता की ओर ले जाते हैं", ta: "நம்பிக்கையின் மீது கட்டமைக்கப்பட்ட கூட்டணிகள் வெற்றிக்கு வழிவகுக்கும்" }, tone: "Strategic, Hopeful", scenes: 3, status: "locked", stars: 0 },
  { id: "c21", title: { en: "The Slaying of Vali", te: "వాలి వధ", hi: "बालि का वध", ta: "வாலியின் வதம்" }, moral: { en: "Complex moral decisions in the path of dharma.", te: "ధర్మ మార్గంలో సంక్లిష్ట నైతిక నిర్ణయాలు", hi: "धर्म के मार्ग में जटिल नैतिक निर्णय", ta: "தர்மத்தின் பாதையில் சிக்கலான தார்மீக முடிவுகள்" }, tone: "Controversial, Dramatic", scenes: 5, status: "locked", stars: 0 },
  { id: "c22", title: { en: "The Search for Sita", te: "సీత కోసం వెతుకుట", hi: "सीता की खोज", ta: "சீதையைத் தேடுதல்" }, moral: { en: "Perseverance in the face of despair.", te: "నిరాశలో కూడా పట్టుదల", hi: "निराशा के बावजूद दृढ़ता", ta: "விரக்தியின் முகத்தில் விடாமுயற்சி" }, tone: "Determined, Expansive", scenes: 4, status: "locked", stars: 0 },
  { id: "c23", title: { en: "Jambavan's Wisdom", te: "జాంబవంతుని జ్ఞానం", hi: "जाम्बवान का ज्ञान", ta: "ஜாம்பவானின் ஞானம்" }, moral: { en: "Remember your hidden strengths.", te: "మీ దాగి ఉన్న బలాలను గుర్తుంచుకోండి", hi: "अपनी छिपी शक्तियों को याद रखें", ta: "உங்கள் மறைக்கப்பட்ட பலங்களை நினைவில் கொள்ளுங்கள்" }, tone: "Inspirational, Wise", scenes: 3, status: "locked", stars: 0 },

  // Arc 5: Sundara Kanda
  { id: "c24", title: { en: "Hanuman Leaps the Ocean", te: "హనుమంతుడు సముద్రం దాటడం", hi: "हनुमान का सागर लांघना", ta: "ஹனுமான் கடலைத் தாண்டுதல்" }, moral: { en: "Faith and devotion can achieve the impossible.", te: "విశ్వాసం మరియు భక్తి అసాధ్యాన్ని సాధించగలవు", hi: "विश्वास और भक्ति असंभव को भी संभव कर सकती है", ta: "நம்பிக்கையும் பக்தியும் சாத்தியமற்றதைச் சாத்தியமாக்கும்" }, tone: "Miraculous, Heroic", scenes: 5, status: "locked", stars: 0 },
  { id: "c25", title: { en: "Finding Sita in Lanka", te: "లంకలో సీతను కనుగొనడం", hi: "लंका में सीता को ढूंढना", ta: "இலங்கையில் சீதையைக் கண்டுபிடித்தல்" }, moral: { en: "Hope persists even in the darkest of places.", te: "చీకటి ప్రదేశాలలో కూడా ఆశ ఉంటుంది", hi: "सबसे अंधेरी जगहों में भी आशा बनी रहती है", ta: "இருண்ட இடங்களிலும் நம்பிக்கை நிலைத்திருக்கிறது" }, tone: "Emotional, Hopeful", scenes: 4, status: "locked", stars: 0 },
  { id: "c26", title: { en: "Hanuman's Message", te: "హనుమంతుని సందేశం", hi: "हनुमान का संदेश", ta: "ஹனுமனின் செய்தி" }, moral: { en: "A messenger of hope can bring immense strength.", te: "ఆశ యొక్క దూత అపారమైన బలాన్ని తీసుకురాగలడు", hi: "आशा का दूत अपार शक्ति ला सकता है", ta: "நம்பிக்கையின் தூதர் மகத்தான பலத்தைக் கொண்டு வர முடியும்" }, tone: "Reassuring, Gentle", scenes: 3, status: "locked", stars: 0 },
  { id: "c27", title: { en: "Lanka in Flames", te: "లంకా దహనం", hi: "लंका दहन", ta: "இலங்கை தகனம்" }, moral: { en: "Arrogance invites destruction.", te: "అహంకారం వినాశనాన్ని ఆహ్వానిస్తుంది", hi: "अहंकार विनाश को आमंत्रित करता है", ta: "ஆணவம் அழிவை அழைக்கிறது" }, tone: "Action, Warning", scenes: 5, status: "locked", stars: 0 },
  { id: "c28", title: { en: "Return to Rama", te: "రాముని వద్దకు తిరిగి రాక", hi: "राम के पास वापसी", ta: "ராமரிடம் திரும்புதல்" }, moral: { en: "Good news brings renewed vigor for the fight ahead.", te: "శుభవార్త రాబోయే పోరాటానికి కొత్త శక్తిని ఇస్తుంది", hi: "अच्छी खबर आगे की लड़ाई के लिए नई ताकत लाती है", ta: "நற்செய்தி வரவிருக்கும் போராட்டத்திற்குப் புதிய பலத்தைத் தருகிறது" }, tone: "Triumphant, Eager", scenes: 3, status: "locked", stars: 0 },

  // Arc 6: Yuddha Kanda
  { id: "c29", title: { en: "Building the Bridge", te: "సేతు నిర్మాణం", hi: "सेतु निर्माण", ta: "பாலம் கட்டுதல்" }, moral: { en: "Unity and devotion can overcome any obstacle.", te: "ఐక్యత మరియు భక్తి ఏ అడ్డంకినైనా అధిగమించగలవు", hi: "एकता और भक्ति किसी भी बाधा को पार कर सकती है", ta: "ஒற்றுமையும் பக்தியும் எந்தத் தடையையும் கடக்க முடியும்" }, tone: "Inspirational, Collaborative", scenes: 5, status: "locked", stars: 0 },
  { id: "c30", title: { en: "Vibhishana Joins Rama", te: "విభీషణుడు రామునితో చేరడం", hi: "विभीषण का राम से मिलना", ta: "விபீஷணன் ராமருடன் சேருதல்" }, moral: { en: "Choose the path of righteousness, even against your own kin.", te: "మీ సొంత బంధువులకు వ్యతిరేకంగా అయినా, ధర్మ మార్గాన్ని ఎంచుకోండి", hi: "धर्म का मार्ग चुनें, भले ही वह आपके अपने परिजनों के विरुद्ध हो", ta: "உங்கள் உறவினர்களுக்கு எதிராக இருந்தாலும், தர்மத்தின் பாதையைத் தேர்ந்தெடுங்கள்" }, tone: "Righteous, Strategic", scenes: 3, status: "locked", stars: 0 },
  { id: "c31", title: { en: "The Battle Begins", te: "యుద్ధం ప్రారంభం", hi: "युद्ध का आरम्भ", ta: "போர் தொடங்குகிறது" }, moral: { en: "The ultimate confrontation between good and evil.", te: "మంచి మరియు చెడుల మధ్య అంతిమ ఘర్షణ", hi: "अच्छाई और बुराई के बीच अंतिम टकराव", ta: "நன்மைக்கும் தீமைக்கும் இடையிலான இறுதி மோதல்" }, tone: "Epic, Intense", scenes: 5, status: "locked", stars: 0 },
  { id: "c32", title: { en: "Indrajit's Illusions", te: "ఇంద్రజిత్తు మాయలు", hi: "इंद्रजीत का मायाजाल", ta: "இந்திரஜித்தின் மாயைகள்" }, moral: { en: "Persevere through deception and trickery.", te: "మోసం మరియు కుయుక్తుల ద్వారా పట్టుదలతో ఉండండి", hi: "धोखे और छल के माध्यम से दृढ़ रहें", ta: "வஞ்சகம் மற்றும் தந்திரத்தின் மூலம் விடாமுயற்சியுடன் இருங்கள்" }, tone: "Mystical, Tense", scenes: 4, status: "locked", stars: 0 },
  { id: "c33", title: { en: "Lakshmana is Wounded", te: "లక్ష్మణుడు గాయపడటం", hi: "लक्ष्मण का घायल होना", ta: "லட்சுமணன் காயம்" }, moral: { en: "The power of selfless love and sacrifice.", te: "నిస్వార్థ ప్రేమ మరియు త్యాగం యొక్క శక్తి", hi: "निस्वार्थ प्रेम और बलिदान की शक्ति", ta: "சுயநலமற்ற அன்பு மற்றும் தியாகத்தின் சக்தி" }, tone: "Desperate, Emotional", scenes: 4, status: "locked", stars: 0 },
  { id: "c34", title: { en: "Hanuman and Sanjeevani", te: "హనుమంతుడు మరియు సంజీవని", hi: "हनुमान और संजीवनी", ta: "ஹனுமான் மற்றும் சஞ்சீவனி" }, moral: { en: "Devotion can move mountains to save a life.", te: "భక్తి ఒక ప్రాణాన్ని కాపాడటానికి పర్వతాలను కదిలించగలదు", hi: "भक्ति एक जीवन बचाने के लिए पहाड़ भी हिला सकती है", ta: "பக்தி ஒரு உயிரைக் காப்பாற்ற மலைகளையும் நகர்த்தும்" }, tone: "Miraculous, Devotional", scenes: 3, status: "locked", stars: 0 },
  { id: "c35", title: { en: "The Fall of Kumbhakarna", te: "కుంభకర్ణుని పతనం", hi: "कुम्भकर्ण का पतन", ta: "கும்பகர்ணனின் வீழ்ச்சி" }, moral: { en: "Even the mighty fall when on the wrong side.", te: "తప్పుడు పక్షాన ఉన్నప్పుడు శక్తివంతులు కూడా పడిపోతారు", hi: "गलत पक्ष में होने पर शक्तिशाली भी गिर जाते हैं", ta: "தவறான பக்கத்தில் இருக்கும்போது வலிமையானவர்களும் வீழ்ச்சியடைவார்கள்" }, tone: "Epic, Tragic", scenes: 4, status: "locked", stars: 0 },
  { id: "c36", title: { en: "The Final Battle", te: "అంతిమ యుద్ధం", hi: "अंतिम युद्ध", ta: "இறுதிப் போர்" }, moral: { en: "Righteousness will always triumph over evil.", te: "ధర్మం ఎల్లప్పుడూ చెడుపై విజయం సాధిస్తుంది", hi: "धर्म की हमेशा अधर्म पर विजय होती है", ta: "தர்மம் எப்போதும் தீமையை வெல்லும்" }, tone: "Climactic, Triumphant", scenes: 5, status: "locked", stars: 0 },
  { id: "c37", title: { en: "Ravana is Defeated", te: "రావణుడు ఓడిపోయాడు", hi: "रावण का वध", ta: "ராவணன் தோற்கடிக்கப்பட்டான்" }, moral: { en: "The end of arrogance and the victory of dharma.", te: "అహంకారం యొక్క ముగింపు మరియు ధర్మం యొక్క విజయం", hi: "अहंकार का अंत और धर्म की विजय", ta: "ஆணவத்தின் முடிவு மற்றும் தர்மத்தின் வெற்றி" }, tone: "Victorious, Somber", scenes: 5, status: "locked", stars: 0 },

  // Arc 7: Uttara Kanda
  { id: "c38", title: { en: "The Agni Pariksha", te: "అగ్ని పరీక్ష", hi: "अग्नि परीक्षा", ta: "அக்னி பரீட்சை" }, moral: { en: "Proving one's purity in the face of doubt.", te: "సందేహాల మధ్య తన స్వచ్ఛతను నిరూపించుకోవడం", hi: "संदेह के सामने अपनी पवित्रता साबित करना", ta: "சந்தேகத்தின் முகத்தில் ஒருவரின் தூய்மையை நிரூபித்தல்" }, tone: "Painful, Controversial", scenes: 4, status: "locked", stars: 0 },
  { id: "c39", title: { en: "Return to Ayodhya", te: "అయోధ్యకు తిరిగి రాక", hi: "अयोध्या वापसी", ta: "அயோத்திக்கு திரும்புதல்" }, moral: { en: "The rightful king returns to his kingdom.", te: "సరైన రాజు తన రాజ్యానికి తిరిగి వస్తాడు", hi: "सच्चा राजा अपने राज्य में लौटता है", ta: "சரியான ராஜா தனது ராஜ்யத்திற்குத் திரும்புகிறார்" }, tone: "Joyous, Celebratory", scenes: 5, status: "locked", stars: 0 },
  { id: "c40", title: { en: "Rama Rajya", te: "రామరాజ్యం", hi: "राम राज्य", ta: "ராம ராஜ்ஜியம்" }, moral: { en: "An era of perfect governance, peace, and prosperity.", te: "సంపూర్ణ పాలన, శాంతి మరియు శ్రేయస్సు యొక్క శకం", hi: "एक आदर्श शासन, शांति और समृद्धि का युग", ta: "ஒரு சரியான ஆட்சி, அமைதி மற்றும் செழிப்பின் சகாப்தம்" }, tone: "Idealistic, Peaceful", scenes: 3, status: "locked", stars: 0 },
  { id: "c41", title: { en: "The Banishment of Sita", te: "సీత వనవాసం", hi: "सीता का त्याग", ta: "சீதையை நாடு கடத்துதல்" }, moral: { en: "A ruler's duty versus personal love.", te: "రాజు కర్తవ్యం వర్సెస్ వ్యక్తిగత ప్రేమ", hi: "एक शासक का कर्तव्य बनाम व्यक्तिगत प्रेम", ta: "ஒரு ஆட்சியாளரின் கடமை மற்றும் தனிப்பட்ட அன்பு" }, tone: "Tragic, Heartbreaking", scenes: 4, status: "locked", stars: 0 },
  { id: "c42", title: { en: "Birth of Luv and Kush", te: "లవకుశుల జననం", hi: "लव और कुश का जन्म", ta: "லவன் மற்றும் குசனின் பிறப்பு" }, moral: { en: "Life continues and finds a way.", te: "జీవితం కొనసాగుతుంది మరియు ఒక మార్గాన్ని కనుగొంటుంది", hi: "जीवन चलता रहता है और एक रास्ता खोज लेता है", ta: "வாழ்க்கை தொடர்கிறது மற்றும் ஒரு வழியைக் காண்கிறது" }, tone: "Hopeful, New Beginnings", scenes: 3, status: "locked", stars: 0 },
  { id: "c43", title: { en: "Ashwamedha Yagna", te: "అశ్వమేధ యాగం", hi: "अश्वमेध यज्ञ", ta: "அஸ்வமேத யாகம்" }, moral: { en: "The assertion of a king's sovereignty.", te: "ఒక రాజు యొక్క సార్వభౌమాధికారాన్ని నొక్కి చెప్పడం", hi: "एक राजा की संप्रभुता का दावा", ta: "ஒரு ராஜாவின் இறையாண்மையை உறுதிப்படுத்துதல்" }, tone: "Grandiose, Royal", scenes: 4, status: "locked", stars: 0 },
  { id: "c44", title: { en: "Luv and Kush Sing the Ramayana", te: "లవకుశులు రామాయణ గానం", hi: "लव और कुश का रामायण गायन", ta: "லவன் மற்றும் குசன் ராமாயணத்தைப் பாடுதல்" }, moral: { en: "The story lives on through the next generation.", te: "కథ తదుపరి తరం ద్వారా జీవిస్తుంది", hi: "कहानी अगली पीढ़ी के माध्यम से जीवित रहती है", ta: "கதை அடுத்த தலைமுறை மூலம் வாழ்கிறது" }, tone: "Emotional, Nostalgic", scenes: 5, status: "locked", stars: 0 },
  { id: "c45", title: { en: "Sita's Final Return", te: "సీత చివరిగా తిరిగి రావడం", hi: "सीता की अंतिम वापसी", ta: "சீதையின் இறுதித் திரும்புதல்" }, moral: { en: "Returning to Mother Earth, her final rest.", te: "భూమి తల్లి వద్దకు తిరిగి రావడం, ఆమె చివరి విశ్రాంతి", hi: "धरती माता के पास वापसी, उनका अंतिम विश्राम", ta: "பூமித் தாயிடம் திரும்புதல், அவளது இறுதி ஓய்வு" }, tone: "Bittersweet, Spiritual", scenes: 3, status: "locked", stars: 0 },
  { id: "c46", title: { en: "Rama's Departure", te: "రాముని నిష్క్రమణ", hi: "राम का प्रस्थान", ta: "ராமரின் புறப்பாடு" }, moral: { en: "The completion of an avatar's purpose on Earth.", te: "భూమిపై ఒక అవతారం యొక్క ఉద్దేశ్యం పూర్తి కావడం", hi: "पृथ्वी पर एक अवतार के उद्देश्य की पूर्ति", ta: "பூமியில் ஒரு அவதாரத்தின் நோக்கத்தை நிறைவு செய்தல்" }, tone: "Peaceful, Transcendent", scenes: 3, status: "locked", stars: 0 },
  // Padding to 52
  { id: "c47", title: { en: "Hanuman's Promise", te: "హనుమంతుని వాగ్దానం", hi: "हनुमान का वचन", ta: "ஹனுமனின் வாக்குறுதி" }, moral: { en: "Devotion is eternal.", te: "భక్తి శాశ్వతమైనది", hi: "भक्ति शाश्वत है", ta: "பக்தி நித்தியமானது" }, tone: "Eternal, Devotional", scenes: 3, status: "locked", stars: 0 },
  { id: "c48", title: { en: "The Wisdom of Valmiki", te: "వాల్మీకి జ్ఞానం", hi: "वाल्मीकि का ज्ञान", ta: "வால்மீகியின் ஞானம்" }, moral: { en: "The story is the greatest teacher.", te: "కథే గొప్ప గురువు", hi: "कहानी ही सबसे बड़ी शिक्षक है", ta: "கதையே சிறந்த ஆசிரியர்" }, tone: "Wise, Reflective", scenes: 3, status: "locked", stars: 0 },
  { id: "c49", title: { en: "Legacy of the Ikshvakus", te: "ఇక్ష్వాకుల వారసత్వం", hi: "इक्ष्वाकुओं की विरासत", ta: "இக்ஷ்வாகுக்களின் மரபு" }, moral: { en: "A lineage of dharma.", te: "ఒక ధర్మ వంశం", hi: "धर्म की एक वंशावली", ta: "தர்மத்தின் ஒரு பரம்பரை" }, tone: "Historical, Grand", scenes: 3, status: "locked", stars: 0 },
  { id: "c50", title: { en: "The Power of Mantra", te: "మంత్ర శక్తి", hi: "मंत्र की शक्ति", ta: "மந்திரத்தின் சக்தி" }, moral: { en: "Sound has divine power.", te: "శబ్దానికి దైవిక శక్తి ఉంది", hi: "ध्वनि में दिव्य शक्ति है", ta: "சத்தத்திற்கு தெய்வீக சக்தி உண்டு" }, tone: "Spiritual, Powerful", scenes: 3, status: "locked", stars: 0 },
  { id: "c51", title: { en: "The Four Brothers", te: "నలుగురు సోదరులు", hi: "चार भाई", ta: "நான்கு சகோதரர்கள்" }, moral: { en: "Brotherhood is a fortress.", te: "సోదరత్వం ఒక కోట", hi: "भाईचारा एक किला है", ta: "சகோதரத்துவம் ஒரு கோட்டை" }, tone: "United, Strong", scenes: 3, status: "locked", stars: 0 },
  { id: "c52", title: { en: "The Eternal Epic", te: "శాశ్వత ఇతిహాసం", hi: "शाश्वत महाकाव्य", ta: "நித்திய காவியம்" }, moral: { en: "The Ramayana lives forever.", te: "రామాయణం శాశ్వతంగా నిలిచి ఉంటుంది", hi: "रामायण हमेशा जीवित रहती है", ta: "ராமாயணம் என்றென்றும் வாழ்கிறது" }, tone: "Timeless, Concluding", scenes: 3, status: "locked", stars: 0 },
];

export const storyArcs: StoryArc[] = [
  {
    id: "arc1",
    title: { en: "Bala Kanda - The Beginning", te: "బాల కాండ - ప్రారంభం", hi: "बाल कांड - शुरुआत", ta: "பால காண்டம் - ஆரம்பம்" },
    theme: "Childhood, Education, and Divine Purpose",
    color: "#fb923c", // orange-400
    chapters: chapters.slice(0, 7),
  },
  {
    id: "arc2",
    title: { en: "Ayodhya Kanda - The Exile", te: "అయోధ్య కాండ - వనవాసం", hi: "अयोध्या कांड - वनवास", ta: "அயோத்தியா காண்டம் - வனவாசம்" },
    theme: "Dharma, Sacrifice, and Family Conflict",
    color: "#f87171", // red-400
    chapters: chapters.slice(7, 12),
  },
  {
    id: "arc3",
    title: { en: "Aranya Kanda - The Forest Life", te: "అరణ్య కాండ - అటవీ జీవితం", hi: "अरण्य कांड - वन जीवन", ta: "ஆரண்ய காண்டம் - வன வாழ்க்கை" },
    theme: "Simplicity, Danger, and Abduction",
    color: "#4ade80", // green-400
    chapters: chapters.slice(12, 18),
  },
  {
    id: "arc4",
    title: { en: "Kishkindha Kanda - The Alliance", te: "కిష్కింధ కాండ - మైత్రి", hi: "किष्किंधा कांड - गठबंधन", ta: "கிஷ்கிந்தா காண்டம் - கூட்டணி" },
    theme: "Friendship, Strategy, and the Search",
    color: "#a78bfa", // violet-400
    chapters: chapters.slice(18, 23),
  },
  {
    id: "arc5",
    title: { en: "Sundara Kanda - The Beautiful Chapter", te: "సుందర కాండ - అందమైన అధ్యాయం", hi: "सुंदर कांड - सुंदर अध्याय", ta: "சுந்தர காண்டம் - அழகான அத்தியாயம்" },
    theme: "Devotion, Hope, and Miracles",
    color: "#38bdf8", // lightBlue-400
    chapters: chapters.slice(23, 28),
  },
  {
    id: "arc6",
    title: { en: "Yuddha Kanda - The Great War", te: "యుద్ధ కాండ - గొప్ప యుద్ధం", hi: "युद्ध कांड - महान युद्ध", ta: "யுத்த காண்டம் - பெரும் போர்" },
    theme: "Courage, Battle, and the Triumph of Good",
    color: "#facc15", // yellow-400
    chapters: chapters.slice(28, 37),
  },
  {
    id: "arc7",
    title: { en: "Uttara Kanda - The Epilogue", te: "ఉత్తర కాండ - ముగింపు", hi: "उत्तर कांड - उपसंहार", ta: "உத்தர காண்டம் - முடிவுரை" },
    theme: "Legacy, Justice, and Finality",
    color: "#c084fc", // purple-400
    chapters: chapters.slice(37, 52),
  },
];

export const allChapters: Chapter[] = chapters;

export const chapterById: Record<string, Chapter> = chapters.reduce((acc, chapter) => {
  acc[chapter.id] = chapter;
  return acc;
}, {} as Record<string, Chapter>);

export const getChapterById = (id: string): Chapter | undefined => chapterById[id];

export const getAllChapters = (): Chapter[] => allChapters;

export const getArcByChapterId = (chapterId: string): StoryArc | undefined => {
  return storyArcs.find(arc => arc.chapters.some(chap => chap.id === chapterId));
};

export const resolveText = (localizedText: LocalizedText, lang: Language): string => {
  return localizedText[lang] || localizedText.en;
};
