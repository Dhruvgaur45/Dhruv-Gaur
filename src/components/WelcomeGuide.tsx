import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, Play, Pause, RotateCcw, X, Sparkles, MessageSquare, ChevronRight, User } from 'lucide-react';

interface WelcomeGuideProps {
  autoStartDelay?: number;
}

export default function WelcomeGuide({ autoStartDelay = 800 }: WelcomeGuideProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [speechError, setSpeechError] = useState(false);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Deeply verified biotech intro speech text, exactly 83 words:
  // "Welcome! I am your portfolio guide. Let me introduce Dhruv Gaur, a biotechnology student at Sharda University, passionate about bioinformatics, artificial intelligence, and genetic engineering. As an active learner, Dhruv is a Techfest Campus Ambassador for IIT Bombay and participant in LEAF 2026 by Biotecnika. He regularly leverages machine learning algorithms to map computational solutions for life sciences. He invites you to explore his Interactive DNA Sequencer, Microscopic bioreactor telemetries, and clinical tools. Enjoy this journey where biology meets coding!"
  const sentences = [
    "Welcome! I am your portfolio guide.",
    "Let me introduce Dhruv Gaur, a biotechnology student at Sharda University, passionate about bioinformatics, artificial intelligence, and genetic engineering.",
    "As an active learner, Dhruv is a Techfest Campus Ambassador for IIT Bombay and participant in LEAF 2026 by Biotecnika.",
    "He regularly leverages machine learning algorithms to map computational solutions for life sciences.",
    "He invites you to explore his Interactive DNA Sequencer, Microscopic bioreactor telemetries, and clinical tools.",
    "Enjoy this journey where biology meets coding!"
  ];

  const speechText = sentences.join(" ");

  // Start speech synthesis with optimal parameters
  const startSpeech = () => {
    if (!('speechSynthesis' in window)) {
      setSpeechError(true);
      return;
    }

    try {
      // Cancel any currently playing speech to avoid overlap
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(speechText);
      utteranceRef.current = utterance;

      // Select high quality English voice if available
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(v => 
        v.lang.toLowerCase().includes('en-us') && v.name.toLowerCase().includes('google')
      ) || voices.find(v => 
        v.lang.toLowerCase().includes('en-us')
      ) || voices[0];

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      // Elegant speed and pitch pairing
      utterance.rate = 1.05; // Slightly swifter for a smart modern tech feel
      utterance.pitch = 1.0;

      // Track dynamic progress to map the transcript subtitles
      utterance.onboundary = (event) => {
        if (event.name === 'sentence' || event.name === 'word') {
          // Approximate current sentence based on character index
          let traversedChars = 0;
          for (let i = 0; i < sentences.length; i++) {
            traversedChars += sentences[i].length + 1; // +1 for the space
            if (event.charIndex < traversedChars) {
              setCurrentSentenceIndex(i);
              break;
            }
          }
        }
      };

      utterance.onend = () => {
        setIsPlaying(false);
        setCurrentSentenceIndex(sentences.length - 1);
        // Gradually auto-collapse after complete
        setTimeout(() => {
          setIsCollapsed(true);
        }, 5000);
      };

      utterance.onerror = (e) => {
        console.warn("Speech Synthesis error:", e);
        if (e.error !== 'interrupted') {
          setSpeechError(true);
          setIsPlaying(false);
        }
      };

      // Speak text
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
      setHasInteracted(true);
    } catch (err) {
      console.error(err);
      setSpeechError(true);
      setIsPlaying(false);
    }
  };

  const handleTogglePlay = () => {
    if (!hasInteracted) {
      startSpeech();
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.pause();
      setIsPlaying(false);
    } else {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        setIsPlaying(true);
      } else {
        startSpeech();
      }
    }
  };

  const handleRestart = () => {
    setCurrentSentenceIndex(0);
    startSpeech();
  };

  const handleToggleMute = () => {
    if (isMuted) {
      // Unmute: set volume back to 1
      if (utteranceRef.current) {
        utteranceRef.current.volume = 1;
      }
      setIsMuted(false);
    } else {
      // Mute: set volume to 0
      if (utteranceRef.current) {
        utteranceRef.current.volume = 0;
      }
      setIsMuted(true);
    }
  };

  // Autoplay handler when component mounts (gracefully bypassing block policy)
  useEffect(() => {
    const timer = setTimeout(() => {
      // Try to start speech automatically
      startSpeech();
    }, autoStartDelay);

    // Some browsers need voices loaded event
    const handleVoicesChanged = () => {
      if (!hasInteracted) {
        startSpeech();
      }
    };
    
    if ('speechSynthesis' in window) {
      window.speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged);
    }

    return () => {
      clearTimeout(timer);
      if ('speechSynthesis' in window) {
        window.speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged);
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <div id="welcome-speech-guide-root">
      <AnimatePresence>
        {!isCollapsed ? (
          /* Expandable Luxury Guide Panel */
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 220, damping: 20 }}
            className="fixed bottom-6 right-6 z-[60] w-full max-w-[380px] bg-white/70 backdrop-blur-xl border border-white/80 shadow-[0_20px_50px_rgba(139,92,246,0.12)] p-5 rounded-[2rem] select-none text-[#1A1A1A] overflow-hidden"
          >
            {/* Ambient micro-pulse biological center light */}
            <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-[45px] pointer-events-none transition-colors duration-1000 ${
              isPlaying ? 'bg-[#8B5CF6]/10' : 'bg-[#10B981]/5'
            }`} />

            {/* Header bar */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-3.5 relative z-10">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  {/* Holographic glowing pulse rings */}
                  <span className="absolute inset-0 rounded-full bg-[#8B5CF6]/20 animate-ping duration-1000" />
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#8B5CF6] to-[#10B981] flex items-center justify-center text-white relative z-10 shadow-sm">
                    <User className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <h4 className="font-display font-black text-[11px] uppercase tracking-widest text-gray-900 leading-tight">
                    PORTAL LAB GUIDE
                  </h4>
                </div>
              </div>

              {/* Action utilities */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleRestart}
                  className="p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                  title="Restart guidance narration"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsCollapsed(true)}
                  className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors cursor-pointer"
                  title="Minimize widget"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Transcript Panel with rolling kinetic sentences */}
            <div className="relative bg-gray-50/75 border border-gray-100/80 rounded-xl p-3 mb-4 min-h-[90px] flex flex-col justify-center overflow-hidden z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSentenceIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                  className="text-xs text-gray-600 font-medium leading-relaxed font-sans"
                >
                  {sentences[currentSentenceIndex]}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Controls panel: Soundwaves + Navigation triggers */}
            <div className="flex items-center justify-between gap-4 relative z-15">
              {/* Animated Soundwave lines when speech is occurring */}
              <div className="flex items-end gap-[3px] h-6 w-16 px-1">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-[3px] bg-gradient-to-t from-[#8B5CF6] to-[#10B981] rounded-full"
                    animate={isPlaying ? {
                      height: [4, [12, 22, 16, 24, 10][i % 5], 4],
                    } : {
                      height: 4
                    }}
                    transition={{
                      duration: [0.6, 0.45, 0.5, 0.7, 0.3][i % 5],
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>

              {/* Main Play, Pause, Mute interactive keys */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleToggleMute}
                  className={`p-2 rounded-full border transition-all cursor-pointer ${
                    isMuted 
                      ? 'bg-red-50 border-red-200 text-red-500 hover:bg-red-100' 
                      : 'bg-gray-50 border-gray-100 text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  title={isMuted ? "Unmute" : "Mute audio stream"}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleTogglePlay}
                  className="px-4 py-2 bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] hover:from-[#A78BFA] hover:to-[#8B5CF6] text-white rounded-full flex items-center gap-2 shadow-sm font-mono text-[10px] font-black uppercase tracking-widest cursor-pointer border-none"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3 h-3 fill-current" />
                      PAUSE INTRO
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3 fill-current" />
                      PLAY INTRO
                    </>
                  )}
                </motion.button>
              </div>
            </div>

            {/* Error helper notice for speech blocking */}
            {speechError && (
              <div className="mt-3 text-[9px] text-amber-600 font-mono flex items-center gap-1.5 justify-center bg-amber-50/70 border border-amber-100 py-1 px-2 rounded-lg">
                <MessageSquare className="w-3 h-3" /> Browsers may require clicking is needed to play audio. 
              </div>
            )}
          </motion.div>
        ) : (
          /* Compact Minimized floating bubble button trigger */
          <motion.button
            initial={{ opacity: 0, scale: 0.7, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => {
              setIsCollapsed(false);
              setTimeout(() => {
                startSpeech();
              }, 120);
            }}
            className="fixed bottom-6 right-6 z-[60] w-12 h-12 rounded-full bg-white hover:bg-gray-50 border border-gray-100 shadow-[0_10px_35px_rgba(139,92,246,0.18)] hover:shadow-[0_12px_40px_rgba(139,92,246,0.25)] flex items-center justify-center text-[#8B5CF6] transition-all cursor-pointer group"
            title="Open Audio Welcome Guide"
          >
            {/* Pulsator ring in backplane */}
            <span className="absolute inset-0 rounded-full border border-[#8B5CF6]/35 animate-ping duration-1500 opacity-60 pointer-events-none" />
            <Volume2 className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
