import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  Target, 
  Eye, 
  HeartHandshake, 
  TrendingUp, 
  ExternalLink, 
  CheckCircle2, 
  Sparkles, 
  GraduationCap, 
  Globe 
} from 'lucide-react';

export default function AboutSmartED() {
  const [activeTab, setActiveTab] = useState<'mission' | 'vision' | 'values' | 'impact'>('mission');

  const tabContent = {
    mission: {
      title: 'Our Mission',
      icon: <Target className="w-6 h-6 text-indigo-500" />,
      desc: 'To revolutionize modern educational paradigms by bridging academic knowledge with real-world industry competencies, giving every student equal access to high-caliber skills, verified credentials, and career-accelerating opportunities.',
      highlights: [
        'Accessible, industry-aligned tech & professional curricula',
        'Direct mentorship from seasoned practitioners and domain leaders',
        'Empowering campus-level innovation through decentralized student leadership'
      ]
    },
    vision: {
      title: 'Our Vision',
      icon: <Eye className="w-6 h-6 text-purple-500" />,
      desc: 'To build the world’s most interconnected student-centric educational network, where every learner possesses the practical tools, digital literacy, and collaborative community required to pioneer future breakthroughs in technology, biotechnology, and enterprise.',
      highlights: [
        'Global network of 500+ university chapters and ambassador cohorts',
        'Next-generation hands-on learning simulators and interactive bootcamps',
        'Fostering a sustainable culture of lifelong curiosity and interdisciplinary research'
      ]
    },
    values: {
      title: 'Core Values',
      icon: <HeartHandshake className="w-6 h-6 text-pink-500" />,
      desc: 'SmartED is grounded in student-first empathy, uncompromising academic integrity, continuous innovation, and inclusive collaborative growth.',
      highlights: [
        'Student-Centric Empathy: Prioritizing tangible student career outcomes',
        'Meritocracy & Inclusivity: Free & subsidized opportunities for curious minds',
        'Practical Excellence: 100% practical, project-based mastery over rote memorization'
      ]
    },
    impact: {
      title: 'Educational Impact',
      icon: <TrendingUp className="w-6 h-6 text-emerald-500" />,
      desc: 'SmartED has impacted tens of thousands of undergraduate and postgraduate students nationwide through certified masterclasses, hackathons, and placement readiness programs.',
      highlights: [
        '50,000+ active student learners across 120+ collegiate institutions',
        '85%+ reported enhancement in technical confidence & job readiness',
        'Over 250+ community-led hackathons, webinars, and skill bootcamps hosted'
      ]
    }
  };

  return (
    <section id="about" className="py-24 relative border-t border-zinc-200/60 dark:border-zinc-800/60">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-mono text-xs font-bold uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5" />
              Organization Profile
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-zinc-900 dark:text-white tracking-tight">
              About SmartED
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 font-sans text-sm sm:text-base max-w-2xl">
              SmartED is a pioneering educational organization committed to upskilling students, fostering student-driven communities, and preparing next-generation professionals for evolving global industries.
            </p>
          </div>

          <a
            href="https://smarted.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-sans text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity shadow-sm self-start md:self-auto"
          >
            <Globe className="w-4 h-4" />
            <span>Official Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Company Overview & Logo Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Logo Brand Showcase */}
          <div className="lg:col-span-4 rounded-3xl p-8 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-500/20 backdrop-blur-md flex flex-col items-center justify-center text-center space-y-6">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-indigo-600 to-purple-600 p-1 shadow-xl flex items-center justify-center">
              <div className="w-full h-full rounded-[22px] bg-white dark:bg-zinc-950 flex flex-col items-center justify-center p-2">
                <GraduationCap className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="font-display font-black text-2xl text-zinc-900 dark:text-white">
                SmartED
              </h3>
              <p className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                Educational Alliance
              </p>
            </div>

            <p className="text-xs text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
              Empowering higher education through verified certifications, experiential bootcamps, and nationwide campus leadership networks.
            </p>

            <div className="w-full pt-4 border-t border-indigo-500/20 flex items-center justify-around text-center">
              <div>
                <span className="block font-display font-black text-lg text-zinc-900 dark:text-white">120+</span>
                <span className="text-[10px] font-mono text-zinc-500 uppercase">Campuses</span>
              </div>
              <div className="w-px h-8 bg-indigo-500/20" />
              <div>
                <span className="block font-display font-black text-lg text-zinc-900 dark:text-white">50K+</span>
                <span className="text-[10px] font-mono text-zinc-500 uppercase">Learners</span>
              </div>
            </div>
          </div>

          {/* Interactive Pillars Tabs */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Tabs Navigation */}
            <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700">
              {(['mission', 'vision', 'values', 'impact'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 min-w-[120px] py-2.5 px-4 rounded-xl font-sans text-xs font-bold uppercase tracking-wider transition-all cursor-pointer text-center ${
                    activeTab === tab
                      ? 'bg-white dark:bg-zinc-900 text-indigo-600 dark:text-indigo-400 shadow-sm border border-zinc-200 dark:border-zinc-700'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content Display Card */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="p-8 rounded-3xl bg-white dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 shadow-lg space-y-6"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                  {tabContent[activeTab].icon}
                </div>
                <div>
                  <h3 className="font-display font-black text-xl text-zinc-900 dark:text-white">
                    {tabContent[activeTab].title}
                  </h3>
                  <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
                    SmartED Institutional Pillar
                  </span>
                </div>
              </div>

              <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 font-sans leading-relaxed">
                {tabContent[activeTab].desc}
              </p>

              <div className="space-y-2.5 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Key Deliverables & Focus Areas:
                </h4>
                {tabContent[activeTab].highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 font-sans">
                    <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}
