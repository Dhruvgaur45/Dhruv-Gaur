import React from 'react';
import { motion } from 'motion/react';
import { 
  GraduationCap, 
  Sparkles, 
  Award, 
  Building, 
  ArrowRight, 
  Send, 
  Globe2, 
  ShieldCheck, 
  Users, 
  BookOpen 
} from 'lucide-react';
import TiltCard3D from '../3d/TiltCard3D';
import MagneticButton3D from '../3d/MagneticButton3D';

interface SmartEDHeroProps {
  onExploreClick?: () => void;
  onContactClick?: () => void;
}

export default function SmartEDHero({ onExploreClick, onContactClick }: SmartEDHeroProps) {
  const handleExplore = () => {
    if (onExploreClick) {
      onExploreClick();
    } else {
      const el = document.getElementById('about');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContact = () => {
    if (onContactClick) {
      onContactClick();
    } else {
      const el = document.getElementById('contact');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <section id="hero" className="relative pt-32 pb-20 md:py-36 overflow-hidden">
      {/* Animated Education Geometric Background */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Soft background glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-gradient-to-tr from-indigo-600/15 via-purple-600/15 to-pink-600/15 blur-[140px] rounded-full" />
        <div className="absolute top-10 right-10 w-96 h-96 bg-blue-500/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-500/10 blur-[100px] rounded-full" />

        {/* Floating animated education nodes */}
        <motion.div
          animate={{ y: [0, -18, 0], rotate: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
          className="absolute top-20 left-[10%] hidden md:flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white/70 dark:bg-black/40 backdrop-blur-md border border-indigo-500/20 shadow-lg"
        >
          <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold">
            <BookOpen className="w-4 h-4" />
          </div>
          <span className="text-xs font-mono font-semibold text-zinc-700 dark:text-zinc-300">
            Education 4.0
          </span>
        </motion.div>

        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 8.5, ease: "easeInOut", delay: 1 }}
          className="absolute top-36 right-[12%] hidden md:flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white/70 dark:bg-black/40 backdrop-blur-md border border-purple-500/20 shadow-lg"
        >
          <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center font-bold">
            <Users className="w-4 h-4" />
          </div>
          <span className="text-xs font-mono font-semibold text-zinc-700 dark:text-zinc-300">
            500+ Peers Reached
          </span>
        </motion.div>

        <motion.div
          animate={{ y: [0, -14, 0], rotate: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 6.2, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-24 right-[18%] hidden lg:flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white/70 dark:bg-black/40 backdrop-blur-md border border-pink-500/20 shadow-lg"
        >
          <div className="w-8 h-8 rounded-xl bg-pink-500/10 text-pink-500 flex items-center justify-center font-bold">
            <Award className="w-4 h-4" />
          </div>
          <span className="text-xs font-mono font-semibold text-zinc-700 dark:text-zinc-300">
            Verified Ambassador
          </span>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 space-y-8 text-left"
          >
            {/* Status Badges */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                Current Position
              </div>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 border border-indigo-500/30 text-indigo-700 dark:text-indigo-300 font-mono text-xs uppercase tracking-wide">
                <Building className="w-3.5 h-3.5 text-indigo-500" />
                Sharda University Chapter
              </div>
            </div>

            {/* Main Titles */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-sm md:text-base font-mono font-bold text-indigo-600 dark:text-indigo-400 tracking-wider uppercase">
                <Sparkles className="w-4 h-4" />
                Official Representation & Leadership
              </div>
              <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-zinc-900 dark:text-white tracking-tight leading-[1.1]">
                Campus Ambassador{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 drop-shadow-sm">
                  SmartED
                </span>
              </h1>
              <p className="font-sans text-lg sm:text-xl text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal max-w-2xl">
                Empowering students through education, innovation, leadership, and community engagement. Bridging academic curiosity with practical career-accelerating opportunities.
              </p>
            </div>

            {/* Quick Hero CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleExplore}
                className="px-7 py-3.5 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-sans text-xs sm:text-sm font-bold uppercase tracking-wider shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all cursor-pointer flex items-center gap-2.5"
              >
                <span>Explore Journey & Impact</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleContact}
                className="px-6 py-3.5 rounded-full bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700/80 border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 font-sans text-xs sm:text-sm font-bold uppercase tracking-wider backdrop-blur-md transition-all cursor-pointer flex items-center gap-2"
              >
                <Send className="w-4 h-4 text-indigo-500" />
                <span>Ambassador Connect</span>
              </motion.button>
            </div>

            {/* Highlights Bar */}
            <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 grid grid-cols-3 gap-4">
              <div>
                <span className="block font-display font-black text-2xl sm:text-3xl text-zinc-900 dark:text-white">
                  1,250+
                </span>
                <span className="text-[11px] font-mono uppercase text-zinc-500 dark:text-zinc-400">
                  Students Reached
                </span>
              </div>
              <div>
                <span className="block font-display font-black text-2xl sm:text-3xl text-indigo-600 dark:text-indigo-400">
                  18+
                </span>
                <span className="text-[11px] font-mono uppercase text-zinc-500 dark:text-zinc-400">
                  Campaigns Run
                </span>
              </div>
              <div>
                <span className="block font-display font-black text-2xl sm:text-3xl text-purple-600 dark:text-purple-400">
                  100%
                </span>
                <span className="text-[11px] font-mono uppercase text-zinc-500 dark:text-zinc-400">
                  Verified Credential
                </span>
              </div>
            </div>
          </motion.div>

          {/* Hero Right 3D Visual Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center"
          >
            <TiltCard3D maxTilt={9} specular={true} glowColor="#8B5CF6">
              <div className="relative w-full max-w-md">
                {/* Glowing gradient background ring */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl blur-lg opacity-40 animate-pulse" />

                <div className="relative rounded-3xl p-8 bg-white/80 dark:bg-zinc-900/90 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 shadow-2xl space-y-6">
                  
                  {/* Visual Top Badge */}
                  <div className="flex items-center justify-between pb-6 border-b border-zinc-100 dark:border-zinc-800">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 p-0.5 shadow-md flex items-center justify-center">
                        <div className="w-full h-full rounded-[14px] bg-white dark:bg-zinc-950 flex items-center justify-center">
                          <GraduationCap className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-base text-zinc-900 dark:text-white leading-tight">
                          SmartED Ambassador
                        </h3>
                        <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                          Official Academic Liaison
                        </p>
                      </div>
                    </div>

                    <span className="px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 text-[10px] font-mono font-bold">
                      2026 ACTIVE
                    </span>
                  </div>

                  {/* Card Core Highlights */}
                  <div className="space-y-3.5">
                    <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700/50 flex items-start gap-3">
                      <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-zinc-900 dark:text-white">
                          Official Campus Representation
                        </h4>
                        <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                          Authorized student liaison for academic workshops, educational seminars, and skill bootcamps.
                        </p>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700/50 flex items-start gap-3">
                      <Globe2 className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-zinc-900 dark:text-white">
                          Ecosystem & Community Outreach
                        </h4>
                        <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                          Connecting undergraduate peers with industry mentors, webinars, and certified learning resources.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Verification Footer */}
                  <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs font-mono text-zinc-500 dark:text-zinc-400">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      Credential Verified
                    </span>
                    <span className="text-indigo-600 dark:text-indigo-400 font-bold">
                      ID: SMARTED-CA-2026
                    </span>
                  </div>

                </div>
              </div>
            </TiltCard3D>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
