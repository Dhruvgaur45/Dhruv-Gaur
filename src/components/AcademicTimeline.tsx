import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  Briefcase, 
  Award, 
  Flag, 
  ChevronRight, 
  X, 
  Linkedin, 
  MapPin, 
  Sparkles, 
  BookOpen, 
  Clock, 
  Tag, 
  GitBranch, 
  ExternalLink,
  ChevronDown,
  Activity,
  Heart
} from 'lucide-react';

interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  category: 'science' | 'leadership' | 'code';
  date: string;
  location: string;
  description: string;
  tags: string[];
  stats: { label: string; value: string }[];
  activeLink?: { label: string; url: string; icon: React.ReactNode };
}

interface AcademicTimelineProps {
  isOpen: boolean;
  onClose: () => void;
  linkedinUrl: string;
}

export default function AcademicTimeline({ isOpen, onClose, linkedinUrl }: AcademicTimelineProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'science' | 'leadership' | 'code'>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [expandedEventId, setExpandedEventId] = useState<string | null>('evt-current');

  const events: TimelineEvent[] = [
    {
      id: 'evt-current',
      year: '2026',
      title: 'Current Positioning & Vision',
      subtitle: 'Biotechnology, data-driven research & student leadership focus',
      category: 'science',
      date: '2026 - PRESENT',
      location: 'BIOTECHNOLOGY AND IT INTERFACES',
      description: 'Main profile alignments center on Biotechnology, implementing data-driven research workflows, expanding student leadership actions, expanding high-relevance professional networking, and sourcing competitive lab internships and career placement opportunities.',
      tags: ['Biotechnology', 'Data Research', 'Student Leadership', 'Career Strategy'],
      stats: [
        { label: 'DOMINANT FOCUS', value: 'Biotech & Data Analytics' },
        { label: 'NETWORKING', value: 'LinkedIn Outreach' },
        { label: 'TARGET ROLES', value: 'Internships & Careers' }
      ],
      activeLink: {
        label: 'CONNECT ON LINKEDIN',
        url: linkedinUrl,
        icon: <Linkedin className="w-3.5 h-3.5" />
      }
    },
    {
      id: 'evt-skills',
      year: '2026',
      title: 'Interdisciplinary Skill Expansion',
      subtitle: 'Combining Biotechnology with Data Analytics & AI',
      category: 'code',
      date: '2026',
      location: 'COMPUTATIONAL BIOLOGY STACK',
      description: 'Successfully integrated core Biotechnology learning paths with computer science disciplines, specifically focused on Data Analytics, practical AI tools, and general research/innovation interests. Initiated building a recruiter-ready web and online portfolio presence.',
      tags: ['Data Analytics', 'AI tools', 'Biotech Research', 'Personal Brand'],
      stats: [
        { label: 'SKILL MATRICES', value: 'Biotech + Data Sci' },
        { label: 'BIO-AI UTILITIES', value: 'AI Prompts & NLP' },
        { label: 'BRAND POSITION', value: 'Recruiter-Friendly' }
      ]
    },
    {
      id: 'evt-leadership',
      year: '2026',
      title: 'Leadership & Community Outreach',
      subtitle: 'Civic active associations and local technical groups',
      category: 'leadership',
      date: '2026',
      location: 'PATRIOTIC ALLIANCE SYSTEMS',
      description: 'Became associated with recognized programs such as the Patriotic Youth Ambassador initiative, cultivating leadership habits, healthcare advocacy, and youth development. Actively associated with Google Developer Groups (GDG) and innovation-leaning student hackathons.',
      tags: ['Youth Ambassador', 'GDG Forums', 'Civic Action', 'Innovation Events'],
      stats: [
        { label: 'COMMUNITY GRADE', value: 'Patriotic Ambassador' },
        { label: 'TECH NETWORKS', value: 'GDG Student Forums' },
        { label: 'RECOGNITIONS', value: 'Social Leadership' }
      ]
    },
    {
      id: 'evt-linkedin',
      year: '2025',
      title: 'Early LinkedIn & Credentials Portfolio',
      subtitle: 'Laying professional bricks and certificates',
      category: 'code',
      date: '2025',
      location: 'VERIFIED CREDENTIALLING PORTALS',
      description: 'Initiated professional digital networking on LinkedIn by cataloging accomplishments, sharing academic student events, and making high-relevance posts. Secured verified certifications in Data Analytics, automated AI/ML fundamentals, and core Biotechnology courses.',
      tags: ['Data Analytics', 'AI-ML Basics', 'Biotech Credentials', 'LinkedIn Growth'],
      stats: [
        { label: 'DATA ANALYTICS', value: 'Industry Certified' },
        { label: 'COMPUTATIONAL AI', value: 'ML Foundations Cert' },
        { label: 'NETWORKING INDEX', value: 'Active Communications' }
      ]
    },
    {
      id: 'evt-undergrad',
      year: '2025',
      title: 'Undergraduate B.Tech Phase',
      subtitle: 'Enrolling in B.Tech in Biotechnology program',
      category: 'science',
      date: '2025 - PRESENT',
      location: 'ACADEMIC LAB DEPARTMENTS',
      description: 'Commenced B.Tech in Biotechnology studies, establishing a durable framework in molecular sciences and digital computational labs. Began proactively constructing a student portfolio through community workshops and specialized educational certifications.',
      tags: ['B.Tech Biotechnology', 'Hands-on Labs', 'Workshop Series', 'Professional Presence'],
      stats: [
        { label: 'ACADEMIC PATH', value: 'B.Tech Undergrad' },
        { label: 'DISCIPLINE', value: 'Biotechnology' },
        { label: 'PROFESSIONAL BASE', value: 'Community Certifications' }
      ]
    },
    {
      id: 'evt-school',
      year: 'school',
      title: 'Schooling Phase & Foundational Interests',
      subtitle: 'First triggers of scientific and leadership pursuits',
      category: 'leadership',
      date: 'EARLY EDUCATION',
      location: 'PRE-UNIVERSITY INSTITUTIONS',
      description: 'Nurtured robust foundational interests in primary sciences, biology fields, and active student-body leadership activities. Took part in collaborative high school student forums, community campaigns, and ambassador-style volunteer delegations.',
      tags: ['Biology Interests', 'Leadership Habits', 'Student Campaigns', 'Ambassador Missions'],
      stats: [
        { label: 'PRIMARY DOMAIN', value: 'General Science' },
        { label: 'EXTRA-CURRICULAR', value: 'Community Missions' },
        { label: 'FOUNDATIONS', value: 'Ambassador Projects' }
      ]
    }
  ];

  const years = ['all', '2026', '2025', 'school'];

  const filteredEvents = events.filter(e => {
    const categoryMatches = selectedCategory === 'all' || e.category === selectedCategory;
    const yearMatches = selectedYear === 'all' || e.year === selectedYear;
    return categoryMatches && yearMatches;
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-[#F2F6F4] text-[#112F24] overflow-hidden flex flex-col md:flex-row font-sans">
      
      {/* LEFT SIDEBAR: PROFILE & CONTROLS */}
      <div className="w-full md:w-[360px] bg-[#E5EEFA] border-r border-[#112F24]/12 flex flex-col justify-between p-6 md:p-8 select-none shrink-0 overflow-y-auto">
        <div className="space-y-6 md:space-y-8">
          
          {/* Back button & Tag */}
          <div className="flex items-center justify-between">
            <button 
              onClick={onClose}
              className="flex items-center gap-1 bg-[#112F24] hover:bg-[#10B981] text-white px-3 py-1.5 font-mono text-[9px] uppercase tracking-widest font-black transition-all cursor-pointer shadow-sm active:translate-x-0.5 active:translate-y-0.5 rounded-none"
            >
              <X className="w-3.5 h-3.5" /> BACK TO LAB
            </button>
            <div className="font-mono text-[8px] font-black text-white bg-[#10B981] px-2 py-0.5 uppercase tracking-wider">
              EST. YEAR 2025 - present
            </div>
          </div>

          {/* User Bio Card */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-1.5 text-[#10B981]">
              <Activity className="w-4 h-4 animate-pulse" />
              <span className="font-mono text-[9px] font-bold uppercase tracking-widest">PROPRIETARY DOSSIER CHRONOLOGY</span>
            </div>
            
            <h1 className="font-serif italic text-3xl font-black tracking-tight leading-none text-[#112F24]">
              Dhruv Gaur.
            </h1>
            
            <p className="text-xs text-[#4B6F62] leading-relaxed font-sans font-medium text-justify">
              Tracing the intersection of silicon-integrated photolight processor research, metabolic biosensor automation, and certified leadership roles as a committed nationwide <strong className="text-[#112F24] font-bold">Patriotic Youth Ambassador</strong>.
            </p>

            {/* Quick Profile Summary tags */}
            <div className="bg-[#F2F6F4] p-3 border border-[#112F24]/10 rounded-none space-y-1.5 font-mono text-[9px] text-[#112F24] leading-normal font-bold">
              <div className="flex justify-between">
                <span className="text-[#4B6F62]">DISCIPLINE:</span>
                <span>BIOTECHNOLOGY / BIO-IT</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#4B6F62]">ACTIVE TENURE:</span>
                <span className="text-[#10B981]">2026 - PRESENT ACTIVE</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#4B6F62]">AMBASSADORE SHIP:</span>
                <span className="text-[#10B981]">PATRIOTIC INDUCTION</span>
              </div>
            </div>
          </div>

          {/* CATEGORY SELECTOR BUTTONS */}
          <div className="space-y-3">
            <span className="font-mono text-[9px] font-extrabold tracking-widest text-[#4B6F62] uppercase block">
              FILTER ROADMAP CATEGORY
            </span>
            <div className="flex flex-col gap-1.5">
              {[
                { id: 'all', label: 'I. COMPLETE CHRONOLOGY', icon: <GitBranch className="w-3.5 h-3.5 text-[#10B981]" /> },
                { id: 'science', label: 'II. SCIENCE & MANUSCRIPTS', icon: <BookOpen className="w-3.5 h-3.5 text-blue-500" /> },
                { id: 'leadership', label: 'III. CIVIC LEADERSHIP', icon: <Flag className="w-3.5 h-3.5 text-[#FF9933]" /> },
                { id: 'code', label: 'IV. SOFTWARE SYSTEMS', icon: <Briefcase className="w-3.5 h-3.5 text-[#112F24]" /> }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id as any);
                    setExpandedEventId(null);
                  }}
                  className={`w-full text-left p-2.5 font-mono text-[9px] font-bold tracking-widest uppercase transition-all duration-200 border flex items-center justify-between cursor-pointer rounded-none bg-white ${
                    selectedCategory === cat.id 
                      ? 'bg-[#112F24] border-[#112F24] text-white shadow-sm' 
                      : 'border-[#112F24]/10 hover:border-[#112F24]/30 text-[#112F24]'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {cat.icon}
                    {cat.label}
                  </span>
                  {selectedCategory === cat.id && <ChevronRight className="w-3.5 h-3.5 text-[#10B981]" />}
                </button>
              ))}
            </div>
          </div>

          {/* TEMPORAL CHRONOLOGY JUMPS */}
          <div className="space-y-2.5">
            <span className="font-mono text-[9px] font-extrabold tracking-widest text-[#4B6F62] uppercase block">
              CHRONOLOGY YEAR DIAL
            </span>
            <div className="grid grid-cols-3 gap-1.5">
              {years.map(y => (
                <button
                  key={y}
                  onClick={() => {
                    setSelectedYear(y);
                    setExpandedEventId(null);
                  }}
                  className={`py-1.5 font-mono text-[9px] font-bold transition-all border cursor-pointer rounded-none text-center uppercase ${
                    selectedYear === y 
                      ? 'bg-[#112F24] border-[#112F24] text-white font-black' 
                      : 'bg-white hover:bg-[#F2F6F4] border-[#112F24]/10 text-[#4B6F62]'
                  }`}
                >
                  {y === 'all' ? 'ALL YEARS' : y === 'school' ? 'SCHOOL YEARS' : y}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* PROFILE CONTACT LINKEDIN FOOTER CARD */}
        <div className="pt-6 border-t border-[#112F24]/12 flex flex-col items-center gap-3 mt-6 sm:mt-0">
          <div className="flex items-center gap-1 bg-[#10B981]/15 px-3 py-1 font-mono text-[8px] font-black text-[#10B981] uppercase tracking-wider border border-[#10B981]/15">
            <Heart className="w-2.5 h-2.5 animate-pulse" /> VERIFIED LINKEDIN DOSSIER
          </div>
          
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#1A1A1A] hover:bg-[#10B981] text-white text-center font-mono uppercase font-black tracking-widest py-3 text-[10px] border border-[#112F24] shadow-[4px_4px_0px_0px_#10B981] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all block cursor-pointer"
          >
            <span className="flex items-center justify-center gap-2">
              <Linkedin className="w-3.5 h-3.5 shrink-0" /> CONNECT DHRUV GAUR <ExternalLink className="w-3 h-3 text-white/50" />
            </span>
          </a>
        </div>

      </div>

      {/* RIGHT SIDEBAR: THE DETAILED TIMELINE TRAIL */}
      <div className="flex-1 overflow-y-auto grid-bg p-6 md:p-12 space-y-6 select-text max-h-[calc(100vh-140px)] md:max-h-screen">
        
        {/* Academic Header and Title Summary */}
        <div className="space-y-2 max-w-2xl border-b border-[#112F24]/10 pb-6">
          <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest font-black text-[#112F24]">
            <Calendar className="w-4 h-4 text-[#10B981]" />
            <span>BIO-COMPUTATIONAL DEVELOPMENT CHRONICLE</span>
          </div>
          <h2 className="font-serif italic font-black text-3xl md:text-4xl text-[#112F24] uppercase tracking-tight">
            Academic & Civic Timeline.
          </h2>
          <p className="text-xs text-[#4B6F62] font-medium leading-relaxed">
            Chronological log spanning software-hardware integrations, mammalian feedback research, optical codon processing breakthroughs, and Patriotic Youth Ambassador service campaigns.
          </p>
        </div>

        {/* EMPTY SEARCH CHECKPOINT STATE */}
        {filteredEvents.length === 0 ? (
          <div className="bg-white border border-[#112F24]/12 p-12 text-center max-w-2xl space-y-3 shadow-sm">
            <Clock className="w-8 h-8 text-[#4B6F62]/40 mx-auto animate-spin" />
            <span className="font-mono text-[9px] font-black text-[#112F24] tracking-widest block uppercase">
              NO COMPILED TIMELINE DATA MATCHED FILTER
            </span>
            <p className="text-[11px] text-[#4B6F62] font-sans max-w-md mx-auto leading-normal">
              No chronology landmarks fit the selected category filter (<strong className="text-[#112F24]">{selectedCategory}</strong>) or selected year dial (<strong className="text-[#112F24]">{selectedYear}</strong>).
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedYear('all');
              }}
              className="mt-2 bg-[#112F24] text-white font-mono uppercase text-[9px] px-4 py-2 font-black tracking-wider cursor-pointer hover:bg-[#10B981] transition-colors"
            >
              CLEAR TIMELINE FILTERS
            </button>
          </div>
        ) : (
          /* CORE INTERACTIVE TIMELINE PATH */
          <div className="max-w-2xl space-y-5 relative pl-4 sm:pl-6 border-l-2 border-[#112F24]/10 pt-2 pb-8">
            
            <AnimatePresence mode="popLayout">
              {filteredEvents.map((evt, idx) => {
                const isExpanded = expandedEventId === evt.id;
                
                // Set custom highlight tags based on category
                let cardAccent = 'border-l-[#10B981]';
                let tagColor = 'text-[#10B981] bg-[#10B981]/5 border-[#10B981]/15';
                let iconBlock = <BookOpen className="w-3.5 h-3.5 text-[#10B981]" />;

                if (evt.category === 'leadership') {
                  cardAccent = 'border-l-[#FF9933]';
                  tagColor = 'text-[#FF9933] bg-[#FF9933]/5 border-[#FF9933]/15';
                  iconBlock = <Flag className="w-3.5 h-3.5 text-[#FF9933]" />;
                } else if (evt.category === 'code') {
                  cardAccent = 'border-l-[#112F24]';
                  tagColor = 'text-[#112F24] bg-[#112F24]/5 border-[#112F24]/12';
                  iconBlock = <Briefcase className="w-3.5 h-3.5 text-[#112F24]" />;
                }

                return (
                  <motion.div
                    key={evt.id}
                    layout="position"
                    initial={{ opacity: 0, x: -15, y: 10 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    exit={{ opacity: 0, x: 15 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className={`bg-white border border-[#112F24]/10 border-l-4 ${cardAccent} p-5 select-text relative shadow-sm hover:shadow-md transition-all group`}
                  >
                    
                    {/* Pulsing state marker circle floating on border line */}
                    <div className="absolute -left-[27px] sm:-left-[35px] top-6 w-3 h-3 bg-white border-2 border-[#112F24] rounded-full flex items-center justify-center shrink-0 z-10">
                      <span className={`w-1 h-1 rounded-full ${
                        evt.category === 'leadership' ? 'bg-[#FF9933]' : evt.category === 'science' ? 'bg-[#10B981]' : 'bg-[#112F24]'
                      }`}></span>
                    </div>

                    {/* Timeline Event node layout */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-[#112F24]/5 pb-2.5 mb-2.5">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5 md:gap-2 flex-wrap">
                          <span className="font-mono text-[9px] font-black text-[#112F24] bg-[#112F24]/5 px-2 py-0.5 border border-[#112F24]/10">
                            {evt.year === 'school' ? 'FOUNDATIONS' : `YEAR ${evt.year}`}
                          </span>
                          <span className={`font-mono text-[8px] font-black uppercase px-2 py-0.5 border ${tagColor} flex items-center gap-1`}>
                            {iconBlock}
                            {evt.category === 'science' ? 'Research & Science' : evt.category === 'leadership' ? 'Civic & Ambassador' : 'Engineering & Dev'}
                          </span>
                        </div>
                        <h3 className="font-serif italic font-black text-lg md:text-xl text-[#112F24] leading-tight mt-1 group-hover:text-[#10B981] transition-colors">
                          {evt.title}
                        </h3>
                      </div>
                      
                      {/* Technical Date marker */}
                      <span className="font-mono text-[9px] text-[#4B6F62] self-start sm:self-center font-bold tracking-widest shrink-0 uppercase">
                        {evt.date}
                      </span>
                    </div>

                    {/* Quick subtitle locator */}
                    <div className="flex items-center gap-1.5 font-mono text-[9px] text-[#4B6F62] font-semibold mb-3">
                      <MapPin className="w-3.5 h-3.5 text-[#10B981]" />
                      <span>{evt.subtitle}</span>
                      <span>•</span>
                      <span className="text-[#112F24]/50">{evt.location}</span>
                    </div>

                    {/* Event Description */}
                    <p className="text-xs text-[#4B6F62] leading-relaxed font-sans font-medium text-justify mb-4">
                      {evt.description}
                    </p>

                    {/* Interactive statistics and tags drawer area (toggleable or auto expanded) */}
                    <div className="space-y-4">
                      
                      {/* Collapse trigger bar */}
                      <button
                        onClick={() => setExpandedEventId(isExpanded ? null : evt.id)}
                        className="flex items-center justify-between w-full font-mono text-[8px] font-black uppercase tracking-widest text-[#112F24] bg-[#F2F6F4]/60 hover:bg-[#F2F6F4] px-3 py-1.5 border border-[#112F24]/8 cursor-pointer"
                      >
                        <span>{isExpanded ? '⊞ CLOSE DETAILED BLUEPRINT SPECS' : '⊟ EXPAND TECH TELEMETRY METRICS'}</span>
                        <ChevronDown className={`w-3 h-3 text-[#10B981] transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden space-y-4"
                          >
                            {/* Tags bubble stack */}
                            <div className="flex flex-wrap gap-1.5 border-t border-[#112F24]/5 pt-3">
                              {evt.tags.map(tag => (
                                <span key={tag} className="font-mono text-[8px] font-bold text-[#112F24]/70 bg-[#F2F6F4] border border-[#112F24]/5 px-2 py-0.5 rounded-none flex items-center gap-1">
                                  <Tag className="w-2.5 h-2.5 text-[#10B981]" />
                                  {tag.toUpperCase()}
                                </span>
                              ))}
                            </div>

                            {/* Core stats block */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              {evt.stats.map((st, sIdx) => (
                                <div key={sIdx} className="bg-[#E5EEFA]/30 p-3 border border-[#112F24]/5 rounded-none">
                                  <span className="text-[8px] font-mono text-[#4B6F62] tracking-wider uppercase block font-semibold leading-none mb-1">
                                    {st.label}
                                  </span>
                                  <span className="font-serif italic font-black text-sm text-[#112F24] leading-none block">
                                    {st.value}
                                  </span>
                                </div>
                              ))}
                            </div>

                            {/* Optional link button */}
                            {evt.activeLink && (
                              <div className="pt-2">
                                <a
                                  href={evt.activeLink.url}
                                  onClick={(e) => {
                                    // If it's an internal link, scroll to it and close the timeline
                                    if (evt.activeLink?.url.startsWith('#')) {
                                      e.preventDefault();
                                      onClose();
                                      setTimeout(() => {
                                        const hash = evt.activeLink?.url.substring(1) || '';
                                        const el = document.getElementById(hash);
                                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                                      }, 300);
                                    }
                                  }}
                                  className="inline-flex items-center gap-1.5 bg-[#112F24] hover:bg-[#10B981] text-white font-mono text-[8px] font-black uppercase tracking-widest px-4 py-2 hover:shadow-sm cursor-pointer transition-colors"
                                >
                                  {evt.activeLink.icon}
                                  <span>{evt.activeLink.label}</span>
                                  <ChevronRight className="w-3 h-3 text-white/50" />
                                </a>
                              </div>
                            )}

                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                  </motion.div>
                );
              })}
            </AnimatePresence>

          </div>
        )}

        {/* Closing Academic Seal Signature */}
        <div className="border-t border-[#112F24]/10 pt-8 pb-4 max-w-2xl flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left text-[#4B6F62] font-mono text-[9px] font-bold">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-[#FF9933] shrink-0" />
            <span>ENDORSED BY NATIONAL YOUTH ALLIANCE FOR LEADERSHIP</span>
          </div>
          <div>
            <span>BULANDSHAHR BIOTECH DIV. STATUS: SECURE</span>
          </div>
        </div>

      </div>

    </div>
  );
}
