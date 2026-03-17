import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  ChevronRight, 
  Star, 
  Map as MapIcon, 
  Trophy, 
  User as UserIcon,
  ChevronLeft,
  CheckCircle2,
  Lock,
  Volume2,
  Maximize,
  Settings as SettingsIcon,
  SkipForward,
  Info,
  Subtitles
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { GoogleGenAI } from "@google/genai";

// Mock Data for Story Arcs
const STORY_ARCS = [
  {
    id: 'arc1',
    title: { en: 'Ayodhya Kand', te: 'అయోధ్య కాండ', hi: 'अयोध्या कांड', ta: 'அயோத்தி காண்டம்' },
    chapters: [
      { id: 'c1', title: { en: 'Birth of Rama', te: 'రాముడి జననం', hi: 'राम का जन्म', ta: 'ராமரின் பிறப்பு' }, status: 'completed', stars: 3 },
      { id: 'c2', title: { en: 'Childhood Adventures', te: 'బాల్య సాహసాలు', hi: 'बचपन के कारनामे', ta: 'சிறுவயது சாகசங்கள்' }, status: 'completed', stars: 2 },
      { id: 'c3', title: { en: 'Vishwamitra’s Visit', te: 'విశ్వామిత్రుని రాక', hi: 'विश्वामित्र का आगमन', ta: 'விஸ்வாமித்திரரின் வருகை' }, status: 'unlocked', stars: 0 },
      { id: 'c4', title: { en: 'Sita Swayamvara', te: 'సీతా స్వయంవరం', hi: 'सीता स्वयंवर', ta: 'சீதா சுயம்வரம்' }, status: 'locked', stars: 0 },
    ]
  }
];

export default function LearningJourney() {
  const [activeTab, setActiveTab] = useState('map');
  const [selectedChapter, setSelectedChapter] = useState<any>(null);
  const { t } = useLanguage();

  return (
    <div className="h-full bg-[#0a0a0a] text-white flex flex-col">
      {/* Content Area */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {selectedChapter ? (
            <NetflixPlayer 
              chapter={selectedChapter} 
              onBack={() => setSelectedChapter(null)} 
            />
          ) : (
            <div className="max-w-7xl mx-auto p-6 md:p-12 space-y-12">
              {activeTab === 'map' && (
                <>
                  <HeroSection onSelectChapter={() => setSelectedChapter(STORY_ARCS[0].chapters[2])} />
                  <StoryMap onSelectChapter={setSelectedChapter} />
                </>
              )}
              {activeTab === 'rewards' && <RewardsView />}
              {activeTab === 'profile' && <ProfileView />}
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="h-20 bg-black/80 backdrop-blur-md border-t border-white/10 flex items-center justify-around px-4 pb-4 md:hidden">
        <NavButton active={activeTab === 'map'} onClick={() => setActiveTab('map')} icon={MapIcon} label={t('journey')} />
        <NavButton active={activeTab === 'rewards'} onClick={() => setActiveTab('rewards')} icon={Trophy} label={t('rewards')} />
        <NavButton active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} icon={UserIcon} label={t('profile')} />
      </div>

      <div className="hidden md:flex h-16 bg-black/80 backdrop-blur-md border-t border-white/10 items-center justify-center gap-12">
        <DesktopNavButton active={activeTab === 'map'} onClick={() => setActiveTab('map')} icon={MapIcon} label={t('journey')} />
        <DesktopNavButton active={activeTab === 'rewards'} onClick={() => setActiveTab('rewards')} icon={Trophy} label={t('rewards')} />
        <DesktopNavButton active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} icon={UserIcon} label={t('profile')} />
      </div>
    </div>
  );
}

function HeroSection({ onSelectChapter }: any) {
  const { t } = useLanguage();
  return (
    <div className="relative h-[60vh] rounded-[2.5rem] overflow-hidden group">
      <img 
        src="https://picsum.photos/seed/ramayana-hero/1920/1080" 
        className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-1000" 
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
      <div className="absolute bottom-12 left-12 max-w-2xl space-y-6">
        <div className="flex items-center gap-2 text-orange-500 font-bold uppercase tracking-[0.3em] text-sm">
          <Star className="w-4 h-4 fill-orange-500" />
          {t('featured')}
        </div>
        <h1 className="text-6xl font-black leading-tight">Ayodhya: The Golden Age</h1>
        <p className="text-xl text-gray-300 leading-relaxed">
          Embark on the epic journey of Prince Rama. Discover the values of truth, courage, and devotion in this beautifully animated series.
        </p>
        <div className="flex gap-4">
          <button 
            onClick={onSelectChapter}
            className="bg-white text-black px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-200 transition-all active:scale-95"
          >
            <Play className="fill-black w-5 h-5" />
            Play Now
          </button>
          <button className="bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-white/20 transition-all">
            <Info className="w-5 h-5" />
            More Info
          </button>
        </div>
      </div>
    </div>
  );
}

function NetflixPlayer({ chapter, onBack }: { chapter: any, onBack: () => void }) {
  const { t, language } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [aiSummary, setAiSummary] = useState('');
  const [loadingAi, setLoadingAi] = useState(false);
  const controlsTimeout = useRef<any>(null);

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeout.current) clearTimeout(controlsTimeout.current);
    controlsTimeout.current = setTimeout(() => setShowControls(false), 3000);
  };

  useEffect(() => {
    const fetchAiSummary = async () => {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        setAiSummary("AI features are currently unavailable (API Key missing).");
        return;
      }
      
      setLoadingAi(true);
      try {
        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: `Provide a short, kid-friendly summary and moral for the Ramayana chapter: "${chapter.title.en}" in ${language} language. Keep it under 50 words.`,
        });
        setAiSummary(response.text || '');
      } catch (e) {
        console.error(e);
        setAiSummary("Failed to load AI summary.");
      } finally {
        setLoadingAi(false);
      }
    };
    fetchAiSummary();
  }, [chapter, language]);

  return (
    <div 
      className="fixed inset-0 bg-black z-50 flex flex-col"
      onMouseMove={handleMouseMove}
    >
      {/* Video Background (Simulated) */}
      <div className="flex-1 relative overflow-hidden">
        <img 
          src={`https://picsum.photos/seed/${chapter.id}/1920/1080`} 
          className={`w-full h-full object-cover transition-opacity duration-1000 ${isPlaying ? 'opacity-100' : 'opacity-40'}`}
          referrerPolicy="no-referrer"
        />
        
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsPlaying(true)}
              className="w-24 h-24 bg-white text-black rounded-full flex items-center justify-center shadow-2xl"
            >
              <Play className="fill-black w-10 h-10 ml-1" />
            </motion.button>
          </div>
        )}

        {/* Overlays */}
        <AnimatePresence>
          {showControls && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60 flex flex-col justify-between p-8"
            >
              {/* Top Bar */}
              <div className="flex items-center justify-between">
                <button onClick={onBack} className="flex items-center gap-2 text-white/80 hover:text-white transition-all">
                  <ChevronLeft className="w-8 h-8" />
                  <span className="text-xl font-bold">{chapter.title[language] || chapter.title.en}</span>
                </button>
                <div className="flex gap-6">
                  <button className="text-white/80 hover:text-white"><Subtitles /></button>
                  <button className="text-white/80 hover:text-white"><SettingsIcon /></button>
                </div>
              </div>

              {/* Bottom Controls */}
              <div className="space-y-6">
                {/* Progress Bar */}
                <div className="h-1.5 bg-white/20 rounded-full overflow-hidden cursor-pointer group">
                  <div className="h-full w-1/3 bg-orange-600 group-hover:bg-orange-500 transition-all" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-8">
                    <button onClick={() => setIsPlaying(!isPlaying)}>
                      {isPlaying ? <Lock className="w-8 h-8" /> : <Play className="w-8 h-8 fill-white" />}
                    </button>
                    <button><SkipForward className="w-8 h-8 fill-white" /></button>
                    <div className="flex items-center gap-4 group">
                      <Volume2 className="w-6 h-6" />
                      <div className="w-24 h-1 bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full w-3/4 bg-white" />
                      </div>
                    </div>
                    <span className="text-sm font-medium text-white/60">12:45 / 24:00</span>
                  </div>
                  <button><Maximize className="w-6 h-6" /></button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Info Panel (Netflix Style) */}
      <div className="bg-[#0a0a0a] p-12 border-t border-white/10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-4">
              <span className="text-emerald-500 font-bold">98% Match</span>
              <span className="px-2 py-0.5 border border-white/40 text-xs rounded uppercase">7+</span>
              <span className="text-white/60">24m</span>
              <span className="px-1.5 py-0.5 bg-white/10 text-[10px] rounded font-bold">HD</span>
            </div>
            <h3 className="text-3xl font-black">{t('theStory')}</h3>
            <div className="text-xl text-gray-400 leading-relaxed min-h-[100px]">
              {loadingAi ? (
                <div className="animate-pulse space-y-2">
                  <div className="h-4 bg-white/10 rounded w-full" />
                  <div className="h-4 bg-white/10 rounded w-3/4" />
                </div>
              ) : (
                aiSummary || "Loading story details..."
              )}
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <span className="text-gray-500 text-sm">{t('moralValue')}:</span>
              <p className="text-lg font-bold text-orange-500">Truth, Courage, Devotion</p>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Cast:</span>
              <p className="text-sm text-gray-300">Rama, Sita, Lakshmana, Hanuman</p>
            </div>
            <button className="w-full bg-white text-black py-4 rounded-xl font-bold hover:bg-gray-200 transition-all">
              {t('startQuiz')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StoryMap({ onSelectChapter }: { onSelectChapter: (c: any) => void }) {
  const { t, language } = useLanguage();
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
      <div className="flex items-center gap-4">
        <h2 className="text-4xl font-black">{t('journey')}</h2>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {STORY_ARCS[0].chapters.map((chapter, idx) => (
          <motion.div 
            key={chapter.id}
            whileHover={{ y: -10 }}
            onClick={() => chapter.status !== 'locked' && onSelectChapter(chapter)}
            className={`group cursor-pointer relative ${chapter.status === 'locked' ? 'opacity-50 grayscale' : ''}`}
          >
            <div className="aspect-video rounded-2xl overflow-hidden mb-4 relative">
              <img 
                src={`https://picsum.photos/seed/${chapter.id}/400/225`} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all" />
              {chapter.status === 'locked' ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Lock className="w-8 h-8 text-white" />
                </div>
              ) : (
                <div className="absolute bottom-3 right-3 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                  <Play className="fill-white w-4 h-4 ml-0.5" />
                </div>
              )}
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg group-hover:text-orange-500 transition-all">
                  {chapter.title[language] || chapter.title.en}
                </h3>
                <p className="text-sm text-gray-500 uppercase tracking-widest font-bold">Chapter {idx + 1}</p>
              </div>
              {chapter.stars > 0 && (
                <div className="flex gap-0.5">
                  {[...Array(3)].map((_, i) => (
                    <Star key={i} className={`w-3 h-3 ${i < chapter.stars ? 'text-yellow-400 fill-yellow-400' : 'text-white/20'}`} />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function RewardsView() {
  const { t } = useLanguage();
  return (
    <div className="space-y-8">
      <h2 className="text-4xl font-black">{t('myCollection')}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="bg-white/5 p-6 rounded-[2rem] border border-white/10 text-center group hover:bg-white/10 transition-all">
            <div className={`w-20 h-20 mx-auto rounded-full mb-4 flex items-center justify-center ${i < 4 ? 'bg-orange-500/20 text-orange-500' : 'bg-white/5 text-white/20'}`}>
              <Trophy className="w-10 h-10" />
            </div>
            <p className="font-bold text-white">Badge {i}</p>
            <p className="text-[10px] text-gray-500 uppercase font-black mt-1">{i < 4 ? t('unlocked') : t('locked')}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProfileView() {
  const { t } = useLanguage();
  return (
    <div className="max-w-4xl mx-auto text-center space-y-12 py-12">
      <div className="relative inline-block">
        <div className="w-48 h-48 bg-orange-500/20 rounded-full mx-auto border-8 border-[#0a0a0a] shadow-2xl overflow-hidden ring-4 ring-orange-500/30">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Rama" alt="Avatar" />
        </div>
        <div className="absolute bottom-2 right-2 bg-emerald-500 text-white p-4 rounded-full shadow-2xl border-4 border-[#0a0a0a]">
          <Star className="w-6 h-6 fill-white" />
        </div>
      </div>
      <div>
        <h2 className="text-5xl font-black mb-2">Arjun</h2>
        <p className="text-orange-500 text-xl font-bold italic tracking-wide">Age 7 • Beginner Explorer</p>
      </div>
      <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
        <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10">
          <p className="text-4xl font-black mb-1">12</p>
          <p className="text-xs text-gray-500 uppercase font-black tracking-widest">{t('lessons')}</p>
        </div>
        <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10">
          <p className="text-4xl font-black mb-1">5</p>
          <p className="text-xs text-gray-500 uppercase font-black tracking-widest">{t('streak')}</p>
        </div>
        <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10">
          <p className="text-4xl font-black mb-1">340</p>
          <p className="text-xs text-gray-500 uppercase font-black tracking-widest">{t('stars')}</p>
        </div>
      </div>
    </div>
  );
}

function NavButton({ active, onClick, icon: Icon, label }: any) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all ${
        active ? 'text-orange-500' : 'text-gray-500'
      }`}
    >
      <Icon className={`w-6 h-6 ${active ? 'fill-orange-500/20' : ''}`} />
      <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
    </button>
  );
}

function DesktopNavButton({ active, onClick, icon: Icon, label }: any) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-2 px-8 py-2 rounded-full transition-all ${
        active ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'
      }`}
    >
      <Icon className={`w-5 h-5 ${active ? 'fill-white/20' : ''}`} />
      <span className="text-sm font-black uppercase tracking-widest">{label}</span>
    </button>
  );
}
