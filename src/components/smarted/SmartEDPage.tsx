import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { 
  ArrowLeft, 
  BookOpen, 
  Sparkles, 
  Sun, 
  Moon, 
  ArrowUp, 
  Menu, 
  X, 
  GraduationCap, 
  ExternalLink,
  Award,
  Layers,
  ChevronRight,
  Send,
  Heart,
  Globe
} from 'lucide-react';

// Sub-components
import SmartEDHero from './SmartEDHero';
import AboutSmartED from './AboutSmartED';
import SmartEDJourney from './SmartEDJourney';
import SmartEDResponsibilities from './SmartEDResponsibilities';
import SmartEDSkills from './SmartEDSkills';
import SmartEDProjects from './SmartEDProjects';
import SmartEDEvents from './SmartEDEvents';
import SmartEDGallery from './SmartEDGallery';
import SmartEDCertificates from './SmartEDCertificates';
import SmartEDAchievements from './SmartEDAchievements';
import SmartEDStats from './SmartEDStats';
import SmartEDTestimonials from './SmartEDTestimonials';
import SmartEDFutureGoals from './SmartEDFutureGoals';
import SmartEDContact from './SmartEDContact';

interface SmartEDPageProps {
  onBackToPortfolio: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

const NAV_LINKS = [
  { id: 'hero', label: 'Overview' },
  { id: 'about', label: 'About' },
  { id: 'journey', label: 'Journey' },
  { id: 'responsibilities', label: 'Role & Scope' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Campaigns' },
  { id: 'events', label: 'Events' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'achievements', label: 'Impact' },
  { id: 'stats', label: 'Metrics' },
  { id: 'testimonials', label: 'Endorsements' },
  { id: 'goals', label: 'Vision' },
  { id: 'contact', label: 'Connect' }
];

export default function SmartEDPage({ onBackToPortfolio, theme, onToggleTheme }: SmartEDPageProps) {
  const [activeNav, setActiveNav] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Scroll Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Track scroll position for header highlight and scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }

      // Check current section
      const sections = NAV_LINKS.map(n => document.getElementById(n.id));
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec && sec.offsetTop <= scrollPos) {
          setActiveNav(NAV_LINKS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const elem = document.getElementById(id);
    if (elem) {
      const offsetTop = elem.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFC] dark:bg-[#090814] text-zinc-900 dark:text-zinc-100 transition-colors duration-300 font-sans relative selection:bg-indigo-500 selection:text-white">
      
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 left-10 w-[600px] h-[600px] bg-pink-500/8 rounded-full blur-[140px]" />
      </div>

      {/* FIXED STANDALONE TOP NAVIGATION */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white/85 dark:bg-[#090814]/85 backdrop-blur-xl border-b border-zinc-200/80 dark:border-zinc-800/80 transition-all">
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 origin-left"
          style={{ scaleX }}
        />

        <div className="max-w-7xl mx-auto px-6 h-16 md:h-18 flex items-center justify-between">
          
          {/* Brand & Back Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={onBackToPortfolio}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-xs font-mono font-bold text-zinc-700 dark:text-zinc-200 transition-all border border-zinc-200/60 dark:border-zinc-700 group cursor-pointer"
              title="Return to Dhruv Gaur Portfolio Homepage"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span>PORTFOLIO</span>
            </button>

            <div className="h-4 w-px bg-zinc-300 dark:bg-zinc-700 hidden sm:block" />

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
                <BookOpen className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-black text-sm tracking-tight text-zinc-900 dark:text-white flex items-center gap-1.5">
                  SmartED <span className="text-[10px] font-mono font-normal text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-1.5 py-0.2 rounded border border-indigo-500/20">PORTAL</span>
                </span>
                <span className="text-[9px] font-mono text-zinc-500 dark:text-zinc-400 hidden sm:inline">
                  Dhruv Gaur • Campus Ambassador
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
            {NAV_LINKS.slice(0, 10).map((link) => {
              const isActive = activeNav === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    isActive 
                      ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 font-black' 
                      : 'hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2.5">
            {/* Theme switch */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800/90 text-zinc-700 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>

            {/* Contact quick jump */}
            <button
              onClick={() => scrollToSection('contact')}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 text-white font-mono text-xs font-bold shadow-md shadow-indigo-500/20 transition-all cursor-pointer"
            >
              <span>CONNECT</span>
              <Send className="w-3 h-3" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800 lg:hidden text-zinc-700 dark:text-zinc-300 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Slideout Nav */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 px-6 py-4 space-y-2 overflow-hidden shadow-xl"
            >
              <div className="grid grid-cols-2 gap-2 text-xs font-mono font-bold">
                {NAV_LINKS.map(link => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className={`text-left px-3 py-2 rounded-xl transition-colors ${
                      activeNav === link.id
                        ? 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400'
                        : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
              </div>

              <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                <button
                  onClick={onBackToPortfolio}
                  className="flex items-center gap-2 text-xs font-mono font-bold text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Return to Portfolio
                </button>
                <a
                  href="https://smarted.org"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-[11px] font-mono text-indigo-600 dark:text-indigo-400"
                >
                  <span>Official Website</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* MAIN PAGE CONTENT STREAM */}
      <main className="relative z-10 pt-16 md:pt-18 space-y-4">
        
        {/* Section 1: Hero */}
        <SmartEDHero 
          onExploreClick={() => scrollToSection('about')}
          onContactClick={() => scrollToSection('contact')}
        />

        {/* Section 2: About SmartED */}
        <AboutSmartED />

        {/* Section 3: Journey & Milestones */}
        <SmartEDJourney />

        {/* Section 4: 10 Responsibilities */}
        <SmartEDResponsibilities />

        {/* Section 5: Skills Developed */}
        <SmartEDSkills />

        {/* Section 6: Projects & Campaigns */}
        <SmartEDProjects />

        {/* Section 7: Events & Masterclasses */}
        <SmartEDEvents />

        {/* Section 8: Photo & Certificate Gallery with Lightbox */}
        <SmartEDGallery />

        {/* Section 9: Dedicated Certificates Showcase */}
        <SmartEDCertificates />

        {/* Section 10: Recognition & Achievements */}
        <SmartEDAchievements />

        {/* Section 11: Real-time Statistics Dashboard */}
        <SmartEDStats />

        {/* Section 12: Testimonials & Endorsements */}
        <SmartEDTestimonials />

        {/* Section 13: Future Goals & Roadmap */}
        <SmartEDFutureGoals />

        {/* Section 14: Contact SmartED */}
        <SmartEDContact />

      </main>

      {/* STANDALONE SMARTED FOOTER */}
      <footer className="relative z-10 border-t border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-md py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-zinc-200/60 dark:border-zinc-800/60">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-black text-xl text-zinc-900 dark:text-white">
                    SmartED Campus Ambassador Portfolio
                  </h3>
                  <p className="text-xs text-zinc-500 font-mono">
                    Representative: Dhruv Gaur • Sharda University Chapter
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={onBackToPortfolio}
                className="px-5 py-2.5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-mono text-xs font-bold hover:opacity-90 transition-opacity flex items-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                RETURN TO MAIN PORTFOLIO
              </button>

              <a
                href="https://smarted.org"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 font-mono text-xs font-bold hover:bg-indigo-500/20 transition-colors flex items-center gap-2"
              >
                <Globe className="w-4 h-4" />
                SMARTED.ORG
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500 dark:text-zinc-400">
            <div>
              © 2026 SmartED Campus Ambassador Initiative. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1"
              >
                <ArrowUp className="w-3.5 h-3.5" /> BACK TO TOP
              </button>
            </div>
          </div>

        </div>
      </footer>

      {/* Floating Quick Action: Back to Top & Back to Portfolio */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-6 right-6 z-40 flex flex-col gap-2.5"
          >
            <button
              onClick={onBackToPortfolio}
              className="p-3.5 rounded-full bg-zinc-900/90 dark:bg-white/90 text-white dark:text-zinc-900 shadow-xl backdrop-blur-md hover:scale-105 transition-transform flex items-center justify-center cursor-pointer border border-white/20"
              title="Return to Main Portfolio"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="p-3.5 rounded-full bg-indigo-600 text-white shadow-xl shadow-indigo-500/30 hover:scale-105 transition-transform flex items-center justify-center cursor-pointer"
              title="Scroll to top of page"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
