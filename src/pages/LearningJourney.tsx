import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Star, 
  Map as MapIcon, 
  Trophy, 
  User as UserIcon,
  Users,
  ChevronLeft,
  Lock,
  Volume2,
  Pause,
  Info,
  ChevronRight,
  Gamepad2
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { Language } from '../translations';

import { storyArcs, Chapter, getArcByChapterId, resolveText } from '../data/storyData';
import { characters, CharacterProfile } from '../data/characters';

const API_BASE = import.meta.env.VITE_API_URL || '';
const HERO_IMAGE = '/group-illustration.png';
const FALLBACK_IMAGE = '/group-illustration.png';

export default function LearningJourney() {
  const [activeTab, setActiveTab] = useState('map');
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const { t, language, setLanguage } = useLanguage();

  const firstUnlockedChapter = storyArcs.flatMap(arc => arc.chapters).find(c => c.status === 'unlocked');

  const langOptions: { value: Language; label: string }[] = [
    { value: 'en', label: '🇬🇧 EN' },
    { value: 'te', label: '🇮🇳 తె' },
    { value: 'hi', label: '🇮🇳 हि' },
    { value: 'ta', label: '🇮🇳 த' },
  ];

  return (
    <div className="h-full bg-[#0a0a0a] text-white flex flex-col">
      <div className="flex-1 overflow-y-auto min-h-0">
        <AnimatePresence mode="wait">
          {selectedChapter ? (
            <StoryPlayer chapter={selectedChapter} onBack={() => setSelectedChapter(null)} />
          ) : (
            <div className="max-w-7xl mx-auto p-3 sm:p-6 md:p-12 space-y-6 md:space-y-12 pb-24">
              {/* Language selector bar */}
              <div className="flex justify-end">
                <div className="flex items-center gap-1 bg-white/10 rounded-full p-1">
                  {langOptions.map(l => (
                    <button key={l.value} onClick={() => setLanguage(l.value)}
                      className={`px-3 py-1.5 rounded-full text-sm font-bold transition-all ${
                        language === l.value ? 'bg-orange-500 text-white' : 'text-white/60 hover:text-white'
                      }`}>
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>
              {activeTab === 'map' && (
                <>
                  <HeroSection onSelectChapter={() => firstUnlockedChapter && setSelectedChapter(firstUnlockedChapter)} />
                  <StoryMap onSelectChapter={setSelectedChapter} />
                </>
              )}
              {activeTab === 'characters' && <CharactersView />}
              {activeTab === 'games' && <GamesView />}
              {activeTab === 'rewards' && <RewardsView />}
              {activeTab === 'profile' && <ProfileView />}
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Nav */}
      <div className="h-20 bg-black/80 backdrop-blur-md border-t border-white/10 flex items-center justify-around px-4 pb-4 md:hidden">
        <NavButton active={activeTab === 'map'} onClick={() => setActiveTab('map')} icon={MapIcon} label={t('journey')} />
        <NavButton active={activeTab === 'characters'} onClick={() => setActiveTab('characters')} icon={Users} label={t('characters')} />
        <NavButton active={activeTab === 'games'} onClick={() => setActiveTab('games')} icon={Gamepad2} label="Games" />
        <NavButton active={activeTab === 'rewards'} onClick={() => setActiveTab('rewards')} icon={Trophy} label={t('rewards')} />
        <NavButton active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} icon={UserIcon} label={t('profile')} />
      </div>

      {/* Desktop Nav */}
      <div className="hidden md:flex h-16 bg-black/80 backdrop-blur-md border-t border-white/10 items-center justify-center gap-12">
        <DesktopNavButton active={activeTab === 'map'} onClick={() => setActiveTab('map')} icon={MapIcon} label={t('journey')} />
        <DesktopNavButton active={activeTab === 'characters'} onClick={() => setActiveTab('characters')} icon={Users} label={t('characters')} />
        <DesktopNavButton active={activeTab === 'games'} onClick={() => setActiveTab('games')} icon={Gamepad2} label="Games" />
        <DesktopNavButton active={activeTab === 'rewards'} onClick={() => setActiveTab('rewards')} icon={Trophy} label={t('rewards')} />
        <DesktopNavButton active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} icon={UserIcon} label={t('profile')} />
      </div>
    </div>
  );
}

function HeroSection({ onSelectChapter }: { onSelectChapter: () => void }) {
  const { t } = useLanguage();
  return (
    <div className="relative h-[40vh] sm:h-[60vh] rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden group bg-gradient-to-br from-orange-900 to-amber-950">
      <img
        src={HERO_IMAGE}
        alt="Ramayana Characters Illustration"
        className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-1000"
        onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE; }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
      <div className="absolute bottom-4 left-4 sm:bottom-12 sm:left-12 max-w-2xl space-y-2 sm:space-y-6">
        <div className="flex items-center gap-2 text-orange-500 font-bold uppercase tracking-[0.3em] text-xs sm:text-sm">
          <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-orange-500" />
          {t('featured')}
        </div>
        <h1 className="text-2xl sm:text-4xl xl:text-6xl font-black leading-tight">🏹 Ramayana: The Epic Journey</h1>
        <p className="text-sm sm:text-xl text-gray-300 leading-relaxed hidden sm:block">
          Join Prince Rama on his legendary adventure! Learn about truth, courage, devotion, and the triumph of good over evil.
        </p>
        <div className="flex gap-2 sm:gap-4">
          <button
            onClick={onSelectChapter}
            className="bg-orange-500 text-white px-4 py-2 sm:px-8 sm:py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-orange-600 transition-all active:scale-95 text-sm sm:text-base"
          >
            <Play className="fill-white w-4 h-4 sm:w-5 sm:h-5" />
            Continue Story
          </button>
          <button className="bg-white/10 backdrop-blur-md text-white px-4 py-2 sm:px-8 sm:py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-white/20 transition-all text-sm sm:text-base">
            <Info className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">About Ramayana</span>
            <span className="sm:hidden">About</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function StoryPlayer({ chapter, onBack }: { chapter: Chapter, onBack: () => void }) {
  const { t, language, setLanguage } = useLanguage();
  const [storyPages, setStoryPages] = useState<string[]>([]);
  const [pageSvgs, setPageSvgs] = useState<Record<number, string>>({});
  const [svgLoading, setSvgLoading] = useState<Record<number, boolean>>({});
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isReading, setIsReading] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);

  const generateSvg = async (pageIndex: number, pageText: string) => {
    if (pageSvgs[pageIndex] || svgLoading[pageIndex]) return;
    setSvgLoading(prev => ({ ...prev, [pageIndex]: true }));
    try {
      const res = await fetch(`${API_BASE}/api/generate-image`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: `A child-friendly illustration for a Ramayana story page: "${pageText}"` }),
      });
      const data = await res.json();
      if (data.image) {
        setPageSvgs(prev => ({ ...prev, [pageIndex]: data.image }));
      }
    } catch (e) {
      console.error('Image generation failed:', e);
    } finally {
      setSvgLoading(prev => ({ ...prev, [pageIndex]: false }));
    }
  };

  useEffect(() => {
    const fetchStory = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/api/generate-story`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chapterTitle: chapter.title.en,
            language,
            moral: chapter.moral.en,
          }),
        });
        const data = await res.json();
        const pages = data.pages && data.pages.length > 0 ? data.pages : ['Story could not be loaded. Please try again.'];
        setStoryPages(pages);
        if (pages.length > 0) generateSvg(0, pages[0]);
      } catch (e) {
        console.error('Story fetch error:', e);
        setStoryPages(['Failed to load story. Please check your connection and try again.']);
      } finally {
        setLoading(false);
      }
    };
    fetchStory();
    return () => { speechSynthesis.cancel(); };
  }, [chapter, language]);

  useEffect(() => {
    if (storyPages.length === 0) return;
    generateSvg(currentPage, storyPages[currentPage]);
  }, [currentPage, storyPages]);

  const readAloud = () => {
    if (isReading) {
      speechSynthesis.cancel();
      setIsReading(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(storyPages[currentPage]);
    const langMap: Record<string, string> = { en: 'en-US', te: 'te-IN', hi: 'hi-IN', ta: 'ta-IN' };
    utterance.lang = langMap[language] || 'en-US';
    utterance.rate = 0.85;
    utterance.onend = () => setIsReading(false);
    utteranceRef.current = utterance;
    setIsReading(true);
    speechSynthesis.speak(utterance);
  };

  const goToPage = (dir: number) => {
    speechSynthesis.cancel();
    setIsReading(false);
    setCurrentPage(p => Math.max(0, Math.min(storyPages.length - 1, p + dir)));
  };

  const currentArc = getArcByChapterId(chapter.id);
  const currentSvg = pageSvgs[currentPage];
  const isLastPage = !loading && currentPage === storyPages.length - 1;

  if (showQuiz) {
    return <QuizView chapter={chapter} onBack={() => setShowQuiz(false)} onDone={onBack} />;
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-[#0a0a0a] z-50 flex flex-col"
    >
      <div className="flex items-center justify-between p-4 border-b border-white/10 gap-2">
        <button onClick={onBack} className="flex items-center gap-2 text-white/80 hover:text-white transition-all shrink-0">
          <ChevronLeft className="w-6 h-6" />
          <span className="font-bold hidden sm:inline">{t('back')}</span>
        </button>
        <h2 className="text-lg font-black truncate" style={{color: currentArc?.color || '#fb923c'}}>
          {resolveText(chapter.title, language)}
        </h2>
        <div className="flex items-center gap-2 shrink-0">
          <select value={language} onChange={e => { setLanguage(e.target.value as Language); }}
            className="bg-white/10 text-white text-sm rounded-lg px-2 py-1.5 focus:outline-none cursor-pointer">
            <option value="en" className="text-black">English</option>
            <option value="te" className="text-black">తెలుగు</option>
            <option value="hi" className="text-black">हिन्दी</option>
            <option value="ta" className="text-black">தமிழ்</option>
          </select>

        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        <div className="lg:w-1/2 h-64 lg:h-auto relative bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
          <AnimatePresence mode="wait">
            {currentSvg ? (
              <motion.div key={`img-${currentPage}`} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }} className="w-full h-full flex items-center justify-center p-4">
                <img src={currentSvg} className="w-full h-full object-contain rounded-2xl" alt="Story illustration" />
              </motion.div>
            ) : (
              <motion.div key="fallback" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full relative flex items-center justify-center"
                  style={{ background: `radial-gradient(circle, ${currentArc?.color}33, transparent 70%)`}}>
                <img src={FALLBACK_IMAGE} className="w-2/3 h-2/3 object-contain opacity-20"
                  onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE; }}
                />
              </motion.div>
            )}
          </AnimatePresence>
          {svgLoading[currentPage] && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
               <div className="text-center space-y-3">
                <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-orange-400 text-sm font-bold">🎨 Creating illustration...</p>
              </div>
            </div>
          )}
        </div>

        <div className="lg:w-1/2 flex flex-col p-4 sm:p-8 lg:p-12 overflow-y-auto">
          {loading ? (
             <div className="space-y-4 animate-pulse">
              <div className="h-4 bg-white/10 rounded w-full" />
              <div className="h-4 bg-white/10 rounded w-5/6" />
              <div className="h-4 bg-white/10 rounded w-4/6" />
              <p className="mt-4 text-sm" style={{color: currentArc?.color || '#fb923c'}}>✨ Generating story with AI...</p>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div key={currentPage} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                className="space-y-8">
                <p className="text-xs font-black uppercase tracking-widest" style={{color: currentArc?.color || '#fb923c'}}>
                  Page {currentPage + 1} of {storyPages.length}
                </p>
                <p className="text-base sm:text-2xl lg:text-3xl text-gray-200 leading-relaxed font-medium">
                  {storyPages[currentPage]}
                </p>
                {currentPage === storyPages.length - 1 && chapter.moral && (
                  <div className="rounded-2xl p-6" style={{background: `${currentArc?.color}1A`, border: `1px solid ${currentArc?.color}4D`}}>
                    <p className="font-bold flex items-center gap-2" style={{color: currentArc?.color || '#fb923c'}}>
                      <Star className="w-5 h-5" style={{fill: currentArc?.color || '#fb923c'}} />
                      {t('moralValue')}: {resolveText(chapter.moral, language)}
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          )}

          {!loading && (
            <>
            <div className="flex items-center justify-between mt-4 sm:mt-12 gap-2">
              <button onClick={() => goToPage(-1)} disabled={currentPage === 0}
                className="flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-sm sm:text-base">
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" /> <span className="hidden sm:inline">Previous</span><span className="sm:hidden">Prev</span>
              </button>
              <button onClick={readAloud}
                className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 rounded-xl transition-all text-sm sm:text-base ${isReading ? 'text-white' : 'bg-white/10 hover:bg-white/20'}`}
                style={isReading ? {backgroundColor: currentArc?.color || '#fb923c'} : {}}
              >
                {isReading ? <Pause className="w-4 h-4 sm:w-5 sm:h-5" /> : <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />}
                {isReading ? 'Stop' : <span><span className="hidden sm:inline">Read Aloud</span><span className="sm:hidden">Read</span></span>}
              </button>
              <button onClick={() => goToPage(1)} disabled={currentPage === storyPages.length - 1}
                className="flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed transition-all font-bold text-sm sm:text-base"
                style={{backgroundColor: currentArc?.color || '#fb923c'}}
              >
                Next <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
            {isLastPage && (
              <div className="flex justify-center mt-6">
                <button onClick={() => setShowQuiz(true)}
                  className="px-8 py-4 rounded-xl font-black text-lg flex items-center gap-3 bg-emerald-500 hover:bg-emerald-600 transition-all active:scale-95">
                  🧠 Take the Quiz!
                </button>
              </div>
            )}
          </>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function StoryMap({ onSelectChapter }: { onSelectChapter: (c: Chapter) => void }) {
  const { t, language } = useLanguage();
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 sm:space-y-12">
      {storyArcs.map(arc => (
        <div key={arc.id} className="space-y-4 sm:space-y-8">
           <div className="flex items-center gap-4">
            <h2 className="text-xl sm:text-3xl font-black" style={{color: arc.color}}>{resolveText(arc.title, language)}</h2>
            <div className="h-px flex-1" style={{background: `linear-gradient(to right, ${arc.color}55, transparent)`}} />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {arc.chapters.map((chapter, idx) => (
              <motion.div key={chapter.id} whileHover={{ y: -10 }}
                onClick={() => chapter.status !== 'locked' && onSelectChapter(chapter)}
                className={`group cursor-pointer relative ${chapter.status === 'locked' ? 'opacity-50 grayscale' : ''}`}
              >
                <div className="aspect-video rounded-2xl overflow-hidden mb-4 relative" style={{backgroundColor: `${arc.color}20`}}>
                  <div className="w-full h-full flex items-center justify-center">
                    <img src={FALLBACK_IMAGE} alt="Chapter fallback" className="w-2/3 h-2/3 object-contain opacity-20" />
                  </div>
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all" />
                  {chapter.status === 'locked' ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Lock className="w-8 h-8 text-white" />
                    </div>
                  ) : chapter.status === 'completed' ? (
                    <div className="absolute top-3 right-3 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      ✓ {t('completed')}
                    </div>
                  ) : (
                    <div className="absolute bottom-3 right-3 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                         style={{backgroundColor: `${arc.color}CC`, backdropFilter: 'blur(10px)'}}>
                      <Play className="fill-white w-4 h-4 ml-0.5" />
                    </div>
                  )}
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg transition-all" style={{color: chapter.status !== 'locked' ? (arc.color) : 'inherit'}} >
                      {resolveText(chapter.title, language)}
                    </h3>
                    <p className="text-sm text-gray-500 uppercase tracking-widest font-bold">Chapter {chapter.id.substring(1)}</p>
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
        </div>
      ))}
    </motion.div>
  );
}

function CharactersView() {
  const { t, language } = useLanguage();
  const [selected, setSelected] = useState<CharacterProfile | null>(null);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 sm:space-y-12">
      <div className="flex items-center gap-4">
        <h2 className="text-2xl sm:text-4xl font-black">{t('characterProfiles')}</h2>
        <span className="bg-orange-500 text-white text-sm font-black px-3 py-1 rounded-full">{characters.length}</span>
        <div className="h-px flex-1 bg-white/10" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
        {characters.map(char => (
          <CharacterCard key={char.id} character={char} onClick={() => setSelected(char)} />
        ))}
      </div>
      <AnimatePresence>
        {selected && <CharacterDetail character={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </motion.div>
  );
}

function CharacterDetail({ character, onClose }: { character: CharacterProfile; onClose: () => void }) {
  const { language } = useLanguage();
  const cardColor = character.colorPalette[0] || '#fb923c';
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
        className="bg-[#141414] rounded-[2rem] border border-white/10 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="relative h-64 rounded-t-[2rem] overflow-hidden" style={{ background: `linear-gradient(135deg, ${cardColor}33, ${cardColor}11)` }}>
          {!imgError ? (
            <img src={character.image} alt={character.name.en}
              className="w-full h-full object-contain"
              onError={() => setImgError(true)} />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-8xl">{character.emoji}</div>
          )}
          <button onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/80 transition-all">
            ✕
          </button>
        </div>

        <div className="p-8 space-y-6">
          <div>
            <h2 className="text-3xl font-black" style={{ color: cardColor }}>
              {resolveText(character.name, language)}
            </h2>
            <p className="text-gray-400 italic mt-1">{character.role}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DetailBlock label="Personality" value={character.personality} color={cardColor} />
            <DetailBlock label="Appearance" value={character.appearance} color={cardColor} />
            <DetailBlock label="Voice Tone" value={character.voiceTone} color={cardColor} />
            <DetailBlock label="Skin Color" value={character.skinColor} color={cardColor} />
          </div>

          {character.accessories.length > 0 && (
            <div>
              <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: cardColor }}>Accessories</p>
              <div className="flex flex-wrap gap-2">
                {character.accessories.map((a, i) => (
                  <span key={i} className="px-3 py-1 rounded-full text-sm bg-white/10 text-gray-300">{a}</span>
                ))}
              </div>
            </div>
          )}

          {Object.keys(character.costume).length > 0 && (
            <div>
              <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: cardColor }}>Costumes</p>
              <div className="space-y-2">
                {Object.entries(character.costume).map(([key, val]) => val && (
                  <div key={key} className="flex gap-2">
                    <span className="text-xs font-bold uppercase text-gray-500 w-16 shrink-0">{key}</span>
                    <span className="text-sm text-gray-300">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="rounded-2xl p-5" style={{ background: `${cardColor}15`, border: `1px solid ${cardColor}30` }}>
            <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: cardColor }}>🌟 Fun Fact for Kids</p>
            <p className="text-gray-200 leading-relaxed">{character.childFriendlyNotes}</p>
          </div>

          <div className="flex justify-center gap-2">
            {character.colorPalette.map((c, i) => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-white/20" style={{ backgroundColor: c }} />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function DetailBlock({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="bg-white/5 rounded-xl p-4">
      <p className="text-xs font-black uppercase tracking-widest mb-1" style={{ color }}>{label}</p>
      <p className="text-sm text-gray-300">{value}</p>
    </div>
  );
}

function CharacterCard({ character, onClick }: { character: CharacterProfile; onClick: () => void }) {
  const { language } = useLanguage();
  const cardColor = character.colorPalette[0] || '#ffffff';
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div 
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      onClick={onClick}
      className="bg-white/5 p-3 sm:p-6 rounded-[1.5rem] sm:rounded-[2rem] border border-white/10 flex flex-col items-center text-center group cursor-pointer hover:bg-white/10 transition-colors"
    >
      <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full mb-3 sm:mb-4 flex items-center justify-center overflow-hidden transition-all duration-300"
           style={{ backgroundColor: `${cardColor}20`, boxShadow: `0 0 20px ${cardColor}30` }}>
        {!imgError ? (
          <img src={character.image} alt={character.name.en}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)} />
        ) : (
          <span className="text-4xl sm:text-5xl">{character.emoji}</span>
        )}
      </div>
      <h3 className="text-base sm:text-2xl font-bold" style={{ color: cardColor }}>
        {resolveText(character.name, language)}
      </h3>
      <p className="text-sm text-gray-400 italic mb-4">{character.role}</p>
      <p className="text-gray-300 text-sm">{character.personality}</p>
    </motion.div>
  );
}


function RewardsView() {
  const { t } = useLanguage();
  const badges = [
    { name: '🏹 Archer', unlocked: true },
    { name: '📖 Scholar', unlocked: true },
    { name: '🙏 Devotee', unlocked: true },
    { name: '🐒 Hanuman Fan', unlocked: false },
    { name: '👑 Prince', unlocked: false },
    { name: '⭐ Hero', unlocked: false },
  ];
  return (
    <div className="space-y-4 sm:space-y-8">
      <h2 className="text-2xl sm:text-4xl font-black">{t('myCollection')}</h2>
      <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-6">
        {badges.map((b, i) => (
          <div key={i} className="bg-white/5 p-3 sm:p-6 rounded-[1.5rem] sm:rounded-[2rem] border border-white/10 text-center group hover:bg-white/10 transition-all">
            <div className={`w-14 h-14 sm:w-20 sm:h-20 mx-auto rounded-full mb-2 sm:mb-4 flex items-center justify-center text-2xl sm:text-3xl ${b.unlocked ? 'bg-orange-500/20' : 'bg-white/5 opacity-40'}`}>
              {b.name.split(' ')[0]}
            </div>
            <p className="font-bold text-white text-sm">{b.name.split(' ').slice(1).join(' ')}</p>
            <p className="text-[10px] text-gray-500 uppercase font-black mt-1">{b.unlocked ? t('unlocked') : t('locked')}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProfileView() {
  const { t } = useLanguage();
  return (
    <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-12 py-6 sm:py-12">
      <div className="relative inline-block">
        <div className="w-32 h-32 sm:w-48 sm:h-48 bg-orange-500/20 rounded-full mx-auto border-8 border-[#0a0a0a] shadow-2xl overflow-hidden ring-4 ring-orange-500/30 flex items-center justify-center text-6xl sm:text-8xl">
          🏹
        </div>
      </div>
      <div>
        <h2 className="text-3xl sm:text-5xl font-black mb-2">Young Explorer</h2>
        <p className="text-orange-500 text-base sm:text-xl font-bold italic tracking-wide">Bala Kanda • Beginner</p>
      </div>
      <div className="grid grid-cols-3 gap-3 sm:gap-8 max-w-2xl mx-auto">
        <div className="bg-white/5 p-4 sm:p-8 rounded-[1.5rem] sm:rounded-[2.5rem] border border-white/10">
          <p className="text-2xl sm:text-4xl font-black mb-1">2</p>
          <p className="text-xs text-gray-500 uppercase font-black tracking-widest">{t('lessons')}</p>
        </div>
        <div className="bg-white/5 p-4 sm:p-8 rounded-[1.5rem] sm:rounded-[2.5rem] border border-white/10">
          <p className="text-2xl sm:text-4xl font-black mb-1">5</p>
          <p className="text-xs text-gray-500 uppercase font-black tracking-widest">{t('streak')}</p>
        </div>
        <div className="bg-white/5 p-4 sm:p-8 rounded-[1.5rem] sm:rounded-[2.5rem] border border-white/10">
          <p className="text-2xl sm:text-4xl font-black mb-1">⭐ 5</p>
          <p className="text-xs text-gray-500 uppercase font-black tracking-widest">{t('stars')}</p>
        </div>
      </div>
    </div>
  );
}

interface QuizQuestion { question: string; options: string[]; correct: number; }

function QuizView({ chapter, onBack, onDone }: { chapter: Chapter; onBack: () => void; onDone: () => void }) {
  const { language } = useLanguage();
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [finished, setFinished] = useState(false);
  const arcColor = getArcByChapterId(chapter.id)?.color || '#fb923c';

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/api/generate-quiz`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chapterTitle: chapter.title.en, moral: chapter.moral.en, language }),
        });
        const data = await res.json();
        if (data.quiz?.length) setQuestions(data.quiz);
        else setQuestions([{ question: 'Quiz could not be loaded.', options: [], correct: -1 }]);
      } catch { setQuestions([{ question: 'Quiz failed to load.', options: [], correct: -1 }]); }
      finally { setLoading(false); }
    })();
  }, [chapter, language]);

  const handleAnswer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === questions[current].correct) setScore(s => s + 1);
    setTimeout(() => {
      if (current + 1 < questions.length) {
        setCurrent(c => c + 1);
        setSelected(null);
      } else {
        setFinished(true);
      }
    }, 1200);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-[#0a0a0a] z-50 flex flex-col items-center justify-center p-4 sm:p-8">
      {loading ? (
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-orange-400 font-bold">🧠 Generating quiz...</p>
        </div>
      ) : finished ? (
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center space-y-4 sm:space-y-8 max-w-md">
          <div className="text-6xl sm:text-8xl">{score === questions.length ? '🌟' : score >= questions.length / 2 ? '🎉' : '💪'}</div>
          <h2 className="text-2xl sm:text-4xl font-black">Quiz Complete!</h2>
          <p className="text-lg sm:text-2xl">You got <span style={{ color: arcColor }} className="font-black">{score}/{questions.length}</span> correct!</p>
          <div className="flex gap-2 justify-center">
            {[...Array(questions.length)].map((_, i) => (
              <Star key={i} className={`w-8 h-8 ${i < score ? 'text-yellow-400 fill-yellow-400' : 'text-white/20'}`} />
            ))}
          </div>
          <div className="flex gap-4 justify-center">
            <button onClick={onBack} className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 font-bold">Back to Story</button>
            <button onClick={onDone} className="px-6 py-3 rounded-xl font-bold" style={{ backgroundColor: arcColor }}>Done</button>
          </div>
        </motion.div>
      ) : (
        <div className="max-w-xl w-full space-y-4 sm:space-y-8">
          <div className="flex items-center justify-between">
            <button onClick={onBack} className="text-white/60 hover:text-white flex items-center gap-2">
              <ChevronLeft className="w-5 h-5" /> Back
            </button>
            <p className="text-sm font-black uppercase tracking-widest" style={{ color: arcColor }}>
              Question {current + 1} of {questions.length}
            </p>
          </div>
          <h3 className="text-lg sm:text-2xl font-bold text-gray-100 leading-relaxed">{questions[current].question}</h3>
          <div className="space-y-3">
            {questions[current].options.map((opt, idx) => {
              let bg = 'bg-white/10 hover:bg-white/20';
              if (selected !== null) {
                if (idx === questions[current].correct) bg = 'bg-emerald-500/30 border-emerald-500';
                else if (idx === selected) bg = 'bg-red-500/30 border-red-500';
                else bg = 'bg-white/5 opacity-50';
              }
              return (
                <motion.button key={idx} whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(idx)}
                  className={`w-full text-left px-6 py-4 rounded-xl border border-white/10 font-medium transition-all ${bg}`}>
                  <span className="font-black mr-3" style={{ color: arcColor }}>{String.fromCharCode(65 + idx)}.</span>
                  {opt}
                </motion.button>
              );
            })}
          </div>
          <div className="flex gap-1 justify-center">
            {questions.map((_, i) => (
              <div key={i} className={`w-3 h-3 rounded-full ${i === current ? 'scale-125' : ''}`}
                style={{ backgroundColor: i < current ? arcColor : i === current ? arcColor : '#333' }} />
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}

function GamesView() {
  const [activeGame, setActiveGame] = useState<string | null>(null);

  if (activeGame === 'match') return <MatchGame onBack={() => setActiveGame(null)} />;
  if (activeGame === 'scramble') return <WordScramble onBack={() => setActiveGame(null)} />;

  const games = [
    { id: 'match', emoji: '🃏', title: 'Character Match', desc: 'Match characters to their descriptions!', color: '#fb923c' },
    { id: 'scramble', emoji: '🔤', title: 'Word Scramble', desc: 'Unscramble Ramayana character names!', color: '#4ade80' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 sm:space-y-12">
      <div className="flex items-center gap-4">
        <h2 className="text-2xl sm:text-4xl font-black">🎮 Fun Activities</h2>
        <div className="h-px flex-1 bg-white/10" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {games.map(g => (
          <motion.div key={g.id} whileHover={{ y: -6 }}
            onClick={() => setActiveGame(g.id)}
            className="bg-white/5 p-5 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] border border-white/10 cursor-pointer hover:bg-white/10 transition-all text-center space-y-3 sm:space-y-4">
            <div className="text-4xl sm:text-6xl">{g.emoji}</div>
            <h3 className="text-xl sm:text-2xl font-black" style={{ color: g.color }}>{g.title}</h3>
            <p className="text-gray-400">{g.desc}</p>
            <button className="px-6 py-2 rounded-full font-bold text-sm" style={{ backgroundColor: g.color }}>Play Now</button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function MatchGame({ onBack }: { onBack: () => void }) {
  const pairs = characters.slice(0, 8).map(c => ({ id: c.id, name: c.name.en, role: c.role, emoji: c.emoji, image: c.image }));
  const [shuffledRoles] = useState(() => [...pairs].sort(() => Math.random() - 0.5));
  const [selectedChar, setSelectedChar] = useState<string | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [wrong, setWrong] = useState<string | null>(null);

  const handleRoleClick = (charId: string) => {
    if (!selectedChar || matched.has(charId)) return;
    if (selectedChar === charId) {
      setMatched(prev => new Set([...prev, charId]));
      setSelectedChar(null);
    } else {
      setWrong(charId);
      setTimeout(() => { setWrong(null); setSelectedChar(null); }, 800);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 sm:space-y-8">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="text-white/60 hover:text-white flex items-center gap-2">
          <ChevronLeft className="w-5 h-5" /> Back
        </button>
        <h2 className="text-xl sm:text-3xl font-black">🃏 Character Match</h2>
        <span className="bg-orange-500 text-white text-sm font-black px-3 py-1 rounded-full">{matched.size}/{pairs.length}</span>
      </div>
      {matched.size === pairs.length ? (
        <div className="text-center space-y-6 py-8 sm:py-12">
          <div className="text-6xl sm:text-8xl">🎉</div>
          <h3 className="text-2xl sm:text-3xl font-black">All Matched!</h3>
          <button onClick={onBack} className="px-8 py-3 rounded-xl bg-orange-500 font-bold">Play Again</button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:gap-8">
          <div className="space-y-3">
            <p className="text-xs font-black uppercase tracking-widest text-orange-400 mb-4">Characters</p>
            {pairs.map(p => (
              <button key={p.id} onClick={() => !matched.has(p.id) && setSelectedChar(p.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-all text-left ${
                  matched.has(p.id) ? 'bg-emerald-500/20 border-emerald-500/50 opacity-60' :
                  selectedChar === p.id ? 'bg-orange-500/20 border-orange-500' : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}>
                <span className="text-2xl">{p.emoji}</span>
                <span className="font-bold">{p.name}</span>
              </button>
            ))}
          </div>
          <div className="space-y-3">
            <p className="text-xs font-black uppercase tracking-widest text-blue-400 mb-4">Roles</p>
            {shuffledRoles.map(p => (
              <button key={`r-${p.id}`} onClick={() => handleRoleClick(p.id)}
                className={`w-full px-4 py-3 rounded-xl border transition-all text-left text-sm ${
                  matched.has(p.id) ? 'bg-emerald-500/20 border-emerald-500/50 opacity-60' :
                  wrong === p.id ? 'bg-red-500/20 border-red-500 animate-pulse' : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}>
                {p.role}
              </button>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}

function WordScramble({ onBack }: { onBack: () => void }) {
  const words = characters.slice(0, 8).map(c => c.name.en.toUpperCase());
  const [currentIdx, setCurrentIdx] = useState(0);
  const [scrambled, setScrambled] = useState('');
  const [guess, setGuess] = useState('');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (currentIdx < words.length) {
      const w = words[currentIdx];
      setScrambled(w.split('').sort(() => Math.random() - 0.5).join(''));
      setGuess('');
      setFeedback(null);
    }
  }, [currentIdx]);

  const checkAnswer = () => {
    if (guess.toUpperCase() === words[currentIdx]) {
      setFeedback('correct');
      setScore(s => s + 1);
    } else {
      setFeedback('wrong');
    }
    setTimeout(() => {
      if (currentIdx + 1 < words.length) setCurrentIdx(i => i + 1);
      else setDone(true);
    }, 1000);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 sm:space-y-8">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="text-white/60 hover:text-white flex items-center gap-2">
          <ChevronLeft className="w-5 h-5" /> Back
        </button>
        <h2 className="text-xl sm:text-3xl font-black">🔤 Word Scramble</h2>
      </div>
      {done ? (
        <div className="text-center space-y-6 py-8 sm:py-12">
          <div className="text-6xl sm:text-8xl">{score >= words.length / 2 ? '🌟' : '💪'}</div>
          <h3 className="text-2xl sm:text-3xl font-black">Score: {score}/{words.length}</h3>
          <button onClick={() => { setCurrentIdx(0); setScore(0); setDone(false); }}
            className="px-8 py-3 rounded-xl bg-emerald-500 font-bold">Play Again</button>
        </div>
      ) : (
        <div className="max-w-md mx-auto text-center space-y-8">
          <p className="text-sm text-gray-400">{currentIdx + 1} of {words.length}</p>
          <div className="flex justify-center gap-2">
            {scrambled.split('').map((ch, i) => (
              <span key={i} className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-2xl font-black text-orange-400">{ch}</span>
            ))}
          </div>
          <input value={guess} onChange={e => setGuess(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && guess && checkAnswer()}
            placeholder="Type the name..."
            className={`w-full px-6 py-4 rounded-xl bg-white/10 border text-center text-xl font-bold focus:outline-none ${
              feedback === 'correct' ? 'border-emerald-500 text-emerald-400' :
              feedback === 'wrong' ? 'border-red-500 text-red-400' : 'border-white/20 text-white'
            }`} />
          <button onClick={checkAnswer} disabled={!guess}
            className="px-8 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 font-bold disabled:opacity-30 transition-all">Check</button>
          {feedback === 'wrong' && <p className="text-red-400 text-sm">It was: {words[currentIdx]}</p>}
        </div>
      )}
    </motion.div>
  );
}

function NavButton({ active, onClick, icon: Icon, label }: any) {
  return (
    <button onClick={onClick}
      className={`flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all ${active ? 'text-orange-500' : 'text-gray-500'}`}
    >
      <Icon className={`w-6 h-6 ${active ? 'fill-orange-500/20' : ''}`} />
      <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
    </button>
  );
}

function DesktopNavButton({ active, onClick, icon: Icon, label }: any) {
  return (
    <button onClick={onClick}
      className={`flex items-center gap-2 px-8 py-2 rounded-full transition-all ${active ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'}`}
    >
      <Icon className={`w-5 h-5 ${active ? 'fill-white/20' : ''}`} />
      <span className="text-sm font-black uppercase tracking-widest">{label}</span>
    </button>
  );
}
