import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Award, 
  Calendar, 
  FileText, 
  Terminal, 
  Code, 
  Cpu, 
  Dna, 
  Shield, 
  Clock, 
  Search, 
  Eye, 
  X, 
  CheckCircle2, 
  Globe, 
  Sparkles, 
  ArrowRight,
  BookOpen,
  ChevronRight,
  Bookmark,
  Activity,
  Heart
} from 'lucide-react';

export interface CertItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  displayDate: string;
  category: 'ai' | 'biotech' | 'leadership' | 'forums' | 'other';
  description: string;
  skillsGained: string[];
  notes: string;
  credentialId?: string;
  type: 'Verification' | 'Participation' | 'Workshop' | 'Letter' | 'Official';
  specimenType: 
    | 'genomics-poster' 
    | 'microsoft-build' 
    | 'android-gdg' 
    | 'google-analytics' 
    | 'veterans' 
    | 'veterans-poster' 
    | 'iit-optical' 
    | 'google-io' 
    | 'cancer-bio' 
    | 'sharda-bio' 
    | 'crispr' 
    | 'sharda-drones' 
    | 'ai-agents' 
    | 'french';
}

const CERT_DATA: CertItem[] = [
  {
    id: 'cert-genomics-poster',
    title: 'Poster Abstract Presentation Acceptance',
    issuer: 'Genomics India Conference 2026 (GIC2026)',
    date: '2026-09-02',
    displayDate: 'September 2-3, 2026',
    category: 'biotech',
    description: 'Underwent peer review for research contribution mapping sequence alignment parameters on ultra-fast light processors.',
    skillsGained: ['Bioinformatics Algorithms', 'Photonic Computing', 'Genomic Compute Mapping', 'Academic Poster Writing'],
    notes: 'Abstract Accepted: "Optimizing Bioinformatics Workloads on Silicon Photonic Integrated Processors: A Framework for High-Performance Genomic Computing". To be presented live in Bengaluru.',
    credentialId: 'Poster-GIC2026-BioPhotonics',
    type: 'Letter',
    specimenType: 'genomics-poster'
  },
  {
    id: 'cert-microsoft-build',
    title: 'Microsoft Build 2026 Virtual Attendant Pass',
    issuer: 'Microsoft Corporation',
    date: '2026-06-02',
    displayDate: 'June 2-3, 2026',
    category: 'ai',
    description: 'Digital registration and access confirmation for the premier global developer conference showcasing automated agentic pipelines, Azure infrastructure, and .NET compilations.',
    skillsGained: ['Azure Platform', 'Enterprise Cloud Architectures', 'LLM Deployment', 'Developer APIs'],
    notes: 'Official registration identifier 1778837316517001mqB5. Attended deep-dive technical keynotes and live developer workshops virtually.',
    credentialId: '1778837316517001mqB5',
    type: 'Official',
    specimenType: 'microsoft-build'
  },
  {
    id: 'cert-android-gdg',
    title: 'Hands-on Workshop: Building Your First Android App',
    issuer: 'GDG on Campus',
    date: '2026-05-30',
    displayDate: 'May 30, 2026',
    category: 'forums',
    description: 'Intense micro-workshop hosted by the Google Developer Group at Trinity College of Engineering and Research, Pune.',
    skillsGained: ['Android SDK', 'Java/Kotlin Essentials', 'Mobile State Management', 'Adaptive Layouts'],
    notes: 'Built a responsive local application implementing custom input forms, lifecycle observers, and localized performance testing cascades in Android Studio.',
    credentialId: 'GDG-TCER-AND-20260530',
    type: 'Workshop',
    specimenType: 'android-gdg'
  },
  {
    id: 'cert-google-analytics',
    title: 'Google Analytics Certification',
    issuer: 'Google Analytics Academy',
    date: '2026-05-26',
    displayDate: 'May 26, 2026',
    category: 'forums',
    description: 'Official credential verifying proficiency in Google Analytics 4 (GA4) configuration, event-based data streams, cohort evaluations, and custom report designs.',
    skillsGained: ['Web Analytics', 'GA4 Conversions', 'User Journey Tracking', 'E-commerce Tagging'],
    notes: 'Authorized qualification valid until May 26, 2027. Demonstrates data-centric capabilities in website marketing, visitor funnel diagnostics, and event taxonomy.',
    credentialId: '183459676',
    type: 'Verification',
    specimenType: 'google-analytics'
  },
  {
    id: 'cert-veterans-membership',
    title: 'Patriotic Youth Ambassador (VPRF) Induction',
    issuer: 'Veterans India Council',
    date: '2026-05-25',
    displayDate: 'May 25, 2026',
    category: 'leadership',
    description: 'Awarded formal lifetime membership to the Volunteer Patriotic Reserve Force (VPRF) under the ex-servicemen national framework.',
    skillsGained: ['Youth Empowerment', 'Civic Leadership', 'National Social Welfare', 'Discipline & Seva principles'],
    notes: 'Officially signed by Dr. Binay Kumar Mishra, Founder & President. Inducted as Patriotic Youth Ambassador representing Uttar Pradesh under registered ID YAID-56825.',
    credentialId: 'VPRF-56825',
    type: 'Verification',
    specimenType: 'veterans'
  },
  {
    id: 'cert-veterans-poster',
    title: 'Official Ambassador Executive Commissioning',
    issuer: 'Veterans India Organization',
    date: '2026-05-25',
    displayDate: 'May 25, 2026',
    category: 'leadership',
    description: 'National military-backed commissioning poster recognition commemorating public youth initiatives and veterans healthcare awareness.',
    skillsGained: ['Advocacy Strategy', 'Public Coordination', 'Strategic Communication', 'Empowerment Drives'],
    notes: 'National drive to build a stronger and united India through structured local youth camps, welfare initiatives, and patriotic community engagement programs.',
    credentialId: 'YAID-56825-POSTER',
    type: 'Official',
    specimenType: 'veterans-poster'
  },
  {
    id: 'cert-iit-optical',
    title: 'Invited Guest: Photonics Processors Masterclass',
    issuer: 'Optics & Photonics Centre, IIT Delhi',
    date: '2026-05-24',
    displayDate: 'May 24, 2026',
    category: 'ai',
    description: 'Invined candidate for an executive deep-tech masterclass led by Prof. Deepak Jain regarding light-based AI infra systems.',
    skillsGained: ['Photonic Silicon ICs', 'Wavelength Division Multiplexing', 'AI Inferences Scaling', 'Optical Wave-Guides'],
    notes: 'Covers physical semiconductor integration limits and how micro-ring optical resonators scale matrix multiplications with near zero heat dispersion.',
    credentialId: 'IITD-CEP-PHOTON-2026',
    type: 'Letter',
    specimenType: 'iit-optical'
  },
  {
    id: 'cert-google-io',
    title: 'Google I/O 2026 Attendance confirmation',
    issuer: 'Google Developer Relations',
    date: '2026-05-19',
    displayDate: 'May 19-20, 2026',
    category: 'forums',
    description: 'Registered virtual developer attendant at the global flagship conference outlining cutting-edge developments in multi-modal LLMs (Gemini 1.5/2.0) and web capabilities.',
    skillsGained: ['Multi-Modal API Implementations', 'WASM Web Compute', 'Framer Motion & Web Optimization'],
    notes: 'Passionate participant mapping live API pipelines, tracking advanced web rendering trends, and engaging in multi-modal generative workshops.',
    credentialId: 'GoogleIO-24431-2026',
    type: 'Official',
    specimenType: 'google-io'
  },
  {
    id: 'cert-cancer-bio',
    title: 'Bioinformatics in Cancer Research Certification',
    issuer: 'eDC IIT Delhi & Edufabrica',
    date: '2026-02-28',
    displayDate: 'Feb 28 - March 01, 2026',
    category: 'biotech',
    description: 'Intense offline hands-on training program focused on utilizing computational algorithms to decode tumor microenvironments and mutation hotspots.',
    skillsGained: ['Cancer Gene Diagnostics', 'Mutation Frequency Pipelines', 'High-Throughput Sequence Aligners', 'Variant Calling (VCF)'],
    notes: 'Successfully mapped clinical oncology datasets on Unix consoles to pinpoint tumor suppressor insertion-deletion mutations. Conducted in association with eDC, IIT Delhi.',
    credentialId: 'EDU-IITD-BICR2801020260055',
    type: 'Participation',
    specimenType: 'cancer-bio'
  },
  {
    id: 'cert-sharda-bio',
    title: 'Industrial Bioprocess Engineering Masterclass',
    issuer: 'Sharda School of Bioscience & Technology',
    date: '2026-02-20',
    displayDate: 'February 20, 2026',
    category: 'biotech',
    description: 'Professional development seminar covering closed-loop scale-up, bioreactive gas transfer coefficients, and microbial bioreactor telemetry metrics.',
    skillsGained: ['Oxygen Dissolving Rates (kLa)', 'Closed-Loop PID Tuning', 'Sartorius Telemetry Controls', 'Good Laboratory Practice (GLP)'],
    notes: 'Gained key theoretical models detailing mass balances inside stirred tank vessels and automated fed-batch metabolic tracking variables.',
    credentialId: 'SU-IIC-MIN-2026-0220',
    type: 'Participation',
    specimenType: 'sharda-bio'
  },
  {
    id: 'cert-crispr',
    title: '3-Day CRISPR & Gene Editing Workshop',
    issuer: 'Eduvea in association with Skill India',
    date: '2026-02-17',
    displayDate: 'February 17-19, 2026',
    category: 'biotech',
    description: 'Intense short-course covering CRISPR-Cas9 mechanics, multiplex guide-RNA sequences, target off-effects, and genetic splicing loops.',
    skillsGained: ['Cas9 Splicing Pathways', 'Guide RNA Design', 'Homology-Directed Repair', 'Vector Engineering'],
    notes: 'Designed gRNA cascades targeting standard mutations, evaluating thermodynamic stability indexes and biological cleavage probabilities.',
    credentialId: 'EDUVEA-CB-FEB-009',
    type: 'Workshop',
    specimenType: 'crispr'
  },
  {
    id: 'cert-sharda-drones',
    title: 'Hands-on Workshop on Drones and Robotics',
    issuer: 'Sharda School of Engineering & Science',
    date: '2025-09-19',
    displayDate: 'September 19-22, 2025',
    category: 'other',
    description: '4-day intensive physical and engineering workshop constructing multi-rotor UAV mechanics and micro-controller autopilot assemblies.',
    skillsGained: ['Aerodynamic Lift Calibrations', 'Microcontrollers (Arduino/ESP)', 'PWM Sensor Fusion', 'Robotics Kinematics'],
    notes: 'Assembled, flash-programmed, and test-flew autonomous drone modules featuring real-time gyroscopic PID stabilizer loops.',
    credentialId: 'SU-DS-ROB-19092025',
    type: 'Workshop',
    specimenType: 'sharda-drones'
  },
  {
    id: 'cert-ai-agents',
    title: '5-Day Google AI Agents Course Confirmation',
    issuer: 'Google Developer Studio & Vibe Coding',
    date: '2025-06-15',
    displayDate: 'June 15-19, 2025',
    category: 'ai',
    description: 'Certified registration and attendance pass for Google\'s intensive training on compiling multi-agentic workflows, LLM tools use, and rapid vibe coding paradigms.',
    skillsGained: ['Agentic Backchannel Loops', 'Function Calling APIs', 'AI Studio Prototyping', 'Gemini SDK Integrations'],
    notes: 'Vibe coded adaptive, sovereign LLM agents demonstrating dynamic tool triggers and robust backchannel data validations.',
    credentialId: 'Google-Vibe-AI-Agents-2025',
    type: 'Official',
    specimenType: 'ai-agents'
  },
  {
    id: 'cert-french-olympiad',
    title: 'French Olympiad National Qualification',
    issuer: 'Embassy of France / DPS Bulandshahr',
    date: '2017-11-15',
    displayDate: 'Autumn 2017',
    category: 'other',
    description: 'Early academic bilingual distinction entering French language grammar, pronunciation matrices, and cultural comprehension.',
    skillsGained: ['Bilingual Lexicon', 'Intercultural Dynamics', 'Competitive Academic Adaptability'],
    notes: 'Recognized at Delhi Public School, Bulandshahr, in cooperation with Institut Français, Embassy of Tunisia, and Langers Education.',
    credentialId: 'FR-OLYMPIAD-2017-ELEMENTARY',
    type: 'Participation',
    specimenType: 'french'
  }
];

export default function CertificationCollection() {
  const [filter, setFilter] = useState<'all' | 'ai' | 'biotech' | 'leadership' | 'forums' | 'other'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCert, setSelectedCert] = useState<CertItem | null>(null);

  // Filter & Search Logic
  const filteredCerts = CERT_DATA.filter(cert => {
    const matchesFilter = filter === 'all' || cert.category === filter;
    const matchesSearch = 
      cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.skillsGained.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      cert.notes.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getCategoryColor = (cat: string) => {
    switch(cat) {
      case 'ai': return 'bg-[#3B82F6]/5 md:bg-[#3B82F6]/10 text-[#2563EB] border-[#3B82F6]/20';
      case 'biotech': return 'bg-[#10B981]/5 md:bg-[#10B981]/10 text-[#059669] border-[#10B981]/20';
      case 'leadership': return 'bg-[#D97706]/5 md:bg-[#D97706]/10 text-[#B45309] border-[#D97706]/20';
      case 'forums': return 'bg-purple-500/5 text-purple-700 border-purple-500/25';
      default: return 'bg-gray-500/5 text-gray-700 border-gray-500/25';
    }
  };

  const getIconForCategory = (cat: string) => {
    switch(cat) {
      case 'ai': return <Cpu className="w-4 h-4" />;
      case 'biotech': return <Dna className="w-4 h-4" />;
      case 'leadership': return <Shield className="w-4 h-4" />;
      case 'forums': return <Globe className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-12">
      {/* SECTION HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4 max-w-xl">
          <div className="flex items-center gap-2 text-brand-accent text-[9px] font-mono tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-brand-accent inline-block animate-pulse" />
            VPRF & Academic Dossier
          </div>
          <h2 className="font-serif italic text-4xl font-black text-[#1A1A1A] tracking-tight uppercase">
            Certification Collection
          </h2>
          <p className="text-sm text-brand-text-muted leading-relaxed font-normal">
            An interactive timeline of 14 professional credentials, academic workshops, virtual conferences, and social ambassadorship milestones. Complete with skills matrices and full replica document specimens.
          </p>
        </div>

        {/* METRICS COUNT widget */}
        <div className="bg-brand-surface border border-[#1A1A1A]/10 p-4 shrink-0 font-mono flex items-center justify-between gap-8 md:self-stretch">
          <div className="space-y-1 text-left">
            <span className="text-[8px] text-brand-text-muted tracking-widest block uppercase font-bold">TOTAL PORTFOLIOS</span>
            <span className="text-2xl font-black text-[#1A1A1A] tracking-tight antialiased">14 <span className="text-xs font-semibold text-brand-text-muted">FILES</span></span>
          </div>
          <div className="h-8 w-[1px] bg-[#1A1A1A]/10" />
          <div className="space-y-1 text-left">
            <span className="text-[8px] text-brand-text-muted tracking-widest block uppercase font-bold">VERIFIED SKILLS</span>
            <span className="text-2xl font-black text-brand-accent tracking-tight antialiased">50+ <span className="text-xs font-semibold text-brand-text-muted">TAGS</span></span>
          </div>
        </div>
      </div>

      {/* FILTER CONTROLS & SEARCH (Unfloated, solid inline tabs as requested) */}
      <div className="bg-[#FAF9F5] border border-[#1A1A1A]/10 p-5 space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Timeline Tab segmented selector */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'ALL CREDENTIALS' },
              { id: 'ai', label: 'AI & CLOUD' },
              { id: 'biotech', label: 'BIOTECH & CRISPR' },
              { id: 'leadership', label: 'LEADERSHIP / VPRF' },
              { id: 'forums', label: 'GOOGLE / DEVELOPER' },
              { id: 'other', label: 'OTHER WORKSHOPS' }
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id as any)}
                className={`py-1.5 px-3.5 font-mono text-[9px] tracking-wider uppercase font-black transition-all cursor-pointer border ${
                  filter === tab.id
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                    : 'bg-white text-brand-text-muted border-[#1A1A1A]/10 hover:border-[#1A1A1A]/30 hover:text-[#1A1A1A]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative md:max-w-xs w-full">
            <input
              type="text"
              placeholder="Search parameters, technologies, skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-[#1A1A1A]/15 text-xs font-mono text-[#1A1A1A] focus:outline-hidden focus:border-brand-accent placeholder-[#1A1A1A]/30"
            />
            <Search className="w-3.5 h-3.5 text-[#1A1A1A]/35 absolute left-3 top-3" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2 px-1 text-brand-accent hover:text-[#1A1A1A] top-2 font-mono text-xs font-bold"
              >
                ×
              </button>
            )}
          </div>
        </div>
      </div>

      {/* CHRONOLOGICAL TIMELINE AREA */}
      <div className="relative">
        {/* Continuous background vertical thread line */}
        <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-[2px] bg-[#1A1A1A]/10 -translate-x-[1px] pointer-events-none" />

        <div className="space-y-12">
          {filteredCerts.length > 0 ? (
            filteredCerts.map((cert, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.45 }}
                  className={`relative flex flex-col md:flex-row items-stretch gap-8 ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* CENTRAL CIRCLE TIMELINE POINT */}
                  <div className="absolute left-6 md:left-1/2 top-8 w-5 h-5 rounded-full bg-[#FAFAF9] border-2 border-brand-accent p-0.5 z-10 -translate-x-[10px] shadow-xs shrink-0 pointer-events-none">
                    <div className="w-full h-full rounded-full bg-brand-accent animate-pulse" />
                  </div>

                  {/* LEFT OR RIGHT CONTENT SIDE (CARDS) */}
                  <div className="w-full md:w-[46%] pl-12 md:pl-0">
                    <div className="bg-white border-2 border-[#1A1A1A]/10 hover:border-[#1A1A1A]/50 transition-all duration-300 p-6 shadow-xs relative group flex flex-col justify-between h-full hover:shadow-md">
                      
                      {/* Floating Category tag inside card */}
                      <div className="flex items-center gap-2 justify-between mb-4">
                        <span className={`text-[8px] font-mono tracking-widest uppercase px-2 py-0.5 border ${getCategoryColor(cert.category)}`}>
                          {cert.category === 'ai' ? 'AI & COMPUTING' : cert.category === 'biotech' ? 'BIOTECHNOLOGY' : cert.category === 'leadership' ? 'VPRF LEADERSHIP' : cert.category === 'forums' ? 'GOOGLE FORUMS' : 'WORKSHOP'}
                        </span>
                        
                        <div className="flex items-center gap-1.5 text-brand-text-muted text-[10px] font-mono leading-none">
                          <Clock className="w-3.5 h-3.5 text-brand-accent" />
                          <span className="font-bold">{cert.displayDate}</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="space-y-1">
                          <span className="text-[7.5px] font-mono text-brand-accent tracking-widest font-black uppercase inline-block pr-2">
                            {cert.issuer}
                          </span>
                          <h3 className="font-sans font-bold text-base text-[#1A1A1A] leading-tight group-hover:text-brand-accent transition-colors duration-200">
                            {cert.title}
                          </h3>
                        </div>

                        <p className="text-xs text-brand-text-muted leading-relaxed font-normal">
                          {cert.description}
                        </p>

                        {/* STUDENT NOTES */}
                        <div className="p-3 bg-brand-bg/45 border-l-2 border-brand-accent/50 text-2xs italic text-brand-text leading-relaxed font-mono font-medium">
                          <span className="font-black text-[#1A1A1A] uppercase not-italic tracking-wider text-[8px] block mb-1">STUDENT LOG:</span>
                          "{cert.notes}"
                        </div>

                        {/* SKILLS ACQUIRED TAGS */}
                        <div className="space-y-1.5 pt-2">
                          <p className="text-[7.5px] font-mono text-brand-text-muted tracking-widest font-extrabold uppercase">SKILLS ACQUIRED:</p>
                          <div className="flex flex-wrap gap-1">
                            {cert.skillsGained.map(skill => (
                              <span 
                                key={skill}
                                className="px-2 py-0.5 text-[8.5px] font-mono tracking-wide bg-brand-surface border border-[#1A1A1A]/8 text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors duration-150"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* ACTIONS BAR */}
                      <div className="border-t border-[#1A1A1A]/10 mt-5 pt-4 flex items-center justify-between">
                        <span className="font-mono text-[8px] text-brand-text-muted font-bold tracking-widest uppercase">
                          ID: <span className="text-[#1A1A1A] font-extrabold">{cert.credentialId || 'PENDING'}</span>
                        </span>

                        <button
                          type="button"
                          onClick={() => setSelectedCert(cert)}
                          className="px-3 py-1.5 bg-[#1A1A1A] hover:bg-brand-accent text-white font-mono text-[8.5px] uppercase font-black tracking-widest transition-all cursor-pointer flex items-center gap-1.5 active:scale-95"
                        >
                          <Eye className="w-3 h-3" /> PREVIEW SPECIMEN
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* EMPTY OTHER SIDE TO ALIGN CHRONO */}
                  <div className="hidden md:block w-[46%]" />
                </motion.div>
              );
            })
          ) : (
            <div className="bg-white border border-[#1A1A1A]/10 p-12 text-center max-w-md mx-auto space-y-3 font-mono">
              <FileText className="w-10 h-10 text-brand-accent mx-auto animate-pulse" />
              <p className="text-xs text-brand-text-muted font-bold tracking-wider upper-case uppercase">No certificates found matching criteria.</p>
              <button
                type="button"
                onClick={() => { setFilter('all'); setSearchQuery(''); }}
                className="text-[9px] px-3 py-1.5 bg-[#1A1A1A] text-white font-black tracking-widest hover:bg-brand-accent cursor-pointer transition-colors"
              >
                RESET FILTERS
              </button>
            </div>
          )}
        </div>
      </div>

      {/* -------------------- HIGH-FIDELITY DIGITAL SPECIMEN MODAL -------------------- */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-brand-bg/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white border-2 border-[#1A1A1A] shadow-2xl rounded-none w-full max-w-4xl max-h-[90vh] overflow-y-auto relative p-6 md:p-10"
            >
              {/* Close Button top-right */}
              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 w-9 h-9 bg-[#1A1A1A] cursor-pointer hover:bg-brand-accent text-white flex items-center justify-center transition-all duration-200 shadow-md border border-white/10 z-[130]"
              >
                <X className="w-5 h-5" />
              </button>

              {/* MODAL GRID SPECIMEN & DESCRIPTION */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* 1. HIGH-FIDELITY DOCUMENT PREVIEW CANVAS (Col 1-7) */}
                <div className="lg:col-span-7 flex flex-col items-center">
                  <div className="w-full bg-[#F4F2EB] border-[6px] border-double border-[#A78BFA] p-1 shadow-inner relative overflow-hidden select-none select-none max-w-lg aspect-[11/8] flex flex-col justify-between">
                    
                    {/* OPTION 1: VETERANS AMBASSADOR MEMBERSHIP */}
                    {selectedCert.specimenType === 'veterans' && (
                      <div className="p-4 md:p-6 w-full h-full border-2 border-amber-800/10 bg-white relative flex flex-col justify-between" style={{ fontFamily: 'Georgia, serif' }}>
                        {/* Corners ornaments */}
                        <div className="absolute top-1 left-1 w-6 h-6 border-t-2 border-l-2 border-amber-800/20" />
                        <div className="absolute top-1 right-1 w-6 h-6 border-t-2 border-r-2 border-amber-800/20" />
                        <div className="absolute bottom-1 left-1 w-6 h-6 border-b-2 border-l-2 border-amber-800/20" />
                        <div className="absolute bottom-1 right-1 w-6 h-6 border-b-2 border-r-2 border-amber-800/20" />

                        {/* National Logo Seal */}
                        <div className="flex flex-col items-center text-center space-y-1">
                          <div className="w-10 h-10 border border-[#1A1A1A]/10 rounded-full bg-orange-50 p-1 flex items-center justify-center text-orange-600 font-bold leading-none font-sans text-[7.5px] uppercase relative">
                            <span className="text-[7px]">VPRF</span>
                            <div className="absolute inset-0 border border-green-700/20 rounded-full m-0.5" />
                          </div>
                          <span className="text-[10px] font-black text-[#1A1A1A] tracking-wider uppercase font-sans">VETERANS INDIA</span>
                          <span className="text-[5.5px] text-brand-text-muted font-bold font-sans tracking-widest block uppercase">(A National Patriotic Organisation Led by Ex-servicemen)</span>
                        </div>

                        <div className="text-center space-y-2 my-2">
                          <h4 className="text-xl font-bold italic text-amber-900 leading-none">Certificate of Membership</h4>
                          <p className="text-[6.5px] text-[#4B6F62] font-semibold tracking-widest font-sans uppercase">VOLUNTEER PATRIOTIC RESERVE FORCE (VPRF)</p>
                          
                          <div className="h-[1px] bg-amber-800/15 w-2/3 mx-auto mt-1" />
                          <h5 className="text-xs font-serif font-black tracking-wider text-red-600 uppercase mt-1">PATRIOTIC YOUTH AMBASSADOR</h5>
                          <div className="h-[1px] bg-amber-800/15 w-2/3 mx-auto mb-1" />

                          <p className="text-[7px] text-brand-text-muted italic">This certificate is proudly awarded to</p>
                          <p className="text-sm font-bold text-amber-950 font-serif leading-none tracking-tight">Dhruv Gaur S/O Vinay Kumar Sharma</p>
                          
                          <p className="text-[7px] text-brand-text-muted w-11/12 mx-auto leading-relaxed mt-1 font-sans">
                            has been inducted as a <strong>Patriotic Youth Ambassador</strong> in VPRF to uphold the ideals of Rashtrabhakti, Seva, and Sankalp, and contribute to Nation Building with Dedication and Discipline.
                          </p>
                        </div>

                        {/* Footer Details */}
                        <div className="flex justify-between items-end font-sans text-[6.5px] text-brand-text-muted uppercase font-bold px-2 pt-2 border-t border-amber-800/10">
                          <div className="space-y-0.5 text-left">
                            <div>ID NO.: <span className="text-[#1A1A1A] font-black">56825</span></div>
                            <div>PLACE: <span className="text-[#1A1A1A] font-black">UTTAR PRADESH</span></div>
                          </div>
                          <div className="flex flex-col items-center space-y-1">
                            <span className="font-mono text-[7px] italic text-amber-950 px-1 border-b border-[#1A1A1A]/40 pb-0.5 leading-none">May 25, 2026</span>
                            <span>ISSUED ON DATE</span>
                          </div>
                          <div className="text-center space-y-0.5 min-w-[70px]">
                            <span className="font-serif italic text-amber-900 block leading-none font-bold">Dr. B. K. Mishra</span>
                            <div className="h-[1px] bg-[#1A1A1A]/30 w-full" />
                            <span>FOUNDER PRESIDENT</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* OPTION 2: VETERANS POSTER */}
                    {selectedCert.specimenType === 'veterans-poster' && (
                      <div className="w-full h-full bg-gradient-to-br from-amber-950 to-emerald-950 text-white p-4 relative flex flex-col justify-between font-sans">
                        {/* Glowing orange circle representation */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-amber-500/15 rounded-full blur-xl pointer-events-none" />
                        
                        <div className="flex justify-between items-start border-b border-white/10 pb-1.5 z-10">
                          <div className="flex items-center gap-1.5">
                            <div className="w-5 h-5 bg-orange-600 rounded-full flex items-center justify-center text-[6px] font-black">YAID</div>
                            <div className="text-left font-mono">
                              <div className="text-[6px] font-bold text-white/50">OFFICER YAID</div>
                              <div className="text-[7.5px] font-extrabold text-orange-400">56825</div>
                            </div>
                          </div>
                          <div className="text-right font-mono">
                            <div className="text-[6.5px] font-black text-emerald-400 tracking-wider">VETERANS INDIA</div>
                            <div className="text-[5px] text-white/40 tracking-widest">HONOR * SERVICE * NATION</div>
                          </div>
                        </div>

                        {/* Middle Poster Text */}
                        <div className="text-center space-y-1 z-10 py-1.5">
                          <div className="text-[7px] tracking-widest text-[#10B981] font-bold uppercase">NATIONALLY COMMISSIONED APPOINTMENT</div>
                          <h4 className="text-xl font-extrabold tracking-tight leading-none text-white font-sans uppercase">
                            PATRIOTIC <span className="text-orange-400 font-black">= YOUTH =</span> AMBASSADOR
                          </h4>
                          <p className="text-[7.5px] text-white/80 max-w-sm mx-auto leading-relaxed pt-1">
                            In recognition of unwavering commitment to the nation, dedication to youth empowerment, and passion for honoring veterans' sacrifices.
                          </p>
                        </div>

                        {/* Four pillars graphics */}
                        <div className="grid grid-cols-4 gap-1 pt-1 border-t border-white/5 z-10">
                          {[
                            { title: "HONOR", desc: "VETERANS" },
                            { title: "EMPOWER", desc: "YOUTH" },
                            { title: "BUILD", desc: "AWARENESS" },
                            { title: "STRENGTHEN", desc: "THE NATION" }
                          ].map((col, i) => (
                            <div key={i} className="bg-white/5 p-1 text-center font-sans">
                              <span className="text-[6.5px] font-extrabold text-orange-400 block tracking-tight">{col.title}</span>
                              <span className="text-[5.5px] font-semibold text-white/60 block">{col.desc}</span>
                            </div>
                          ))}
                        </div>

                        <div className="text-center font-mono text-[7px] text-emerald-400/80 font-bold tracking-widest uppercase mt-1">
                          #ProudToServeTheNation * MAY 2026
                        </div>
                      </div>
                    )}

                    {/* OPTION 3: GENOMICS INDIA CONFERENCE POSTER */}
                    {selectedCert.specimenType === 'genomics-poster' && (
                      <div className="p-4 md:p-6 w-full h-full bg-slate-900 text-white relative flex flex-col justify-between font-sans">
                        {/* Biology background details */}
                        <div className="absolute right-2 bottom-6 w-24 h-24 stroke-[#10B981]/15 leading-none pointer-events-none text-emerald-500/10">
                          <Dna className="w-full h-full" />
                        </div>

                        <div className="flex justify-between items-start border-b border-white/10 pb-2">
                          <div className="flex flex-col text-left">
                            <span className="text-[12px] font-serif font-black tracking-tight text-emerald-400">Genomics India</span>
                            <span className="text-[6px] text-white/50 tracking-widest uppercase">CONFERENCE 2026 (GIC2026)</span>
                          </div>
                          <span className="text-[7px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 font-bold uppercase tracking-widest">
                            ABSTRACT ACCEPTANCE LETTER
                          </span>
                        </div>

                        <div className="space-y-1.5 my-2 text-left text-[8px] leading-relaxed">
                          <p className="font-bold text-white/60">Dear Author Dhruv Gaur,</p>
                          <p className="text-white/80">
                            We are pleased to inform you that your poster abstract entitled:
                          </p>
                          <div className="p-1 px-2.5 bg-white/5 border-l-2 border-emerald-400 text-[7px] italic font-semibold text-white tracking-wide font-mono">
                            "Optimizing Bioinformatics Workloads on Silicon Photonic Integrated Processors: A Framework for High-Performance Genomic Computing"
                          </div>
                          <p className="text-white/80 text-[7px]">
                            has been <strong>accepted</strong> for poster presentation at the Genomics India Conference 2026 on 2nd - 3rd September 2026, held at the Dr. Babu Rajendra Prasad International Convention Centre, Bengaluru.
                          </p>
                        </div>

                        {/* Award & footer */}
                        <div className="flex justify-between items-end text-[6.5px] border-t border-white/5 pt-1.5 font-mono text-white/50">
                          <span>REGISTRATION VALIDATED</span>
                          <span className="text-emerald-400 font-extrabold">BEST POSTER AWARD COMPETING</span>
                          <span>TEAM GENOMICS INDIA</span>
                        </div>
                      </div>
                    )}

                    {/* OPTION 4: MICROSOFT BUILD */}
                    {selectedCert.specimenType === 'microsoft-build' && (
                      <div className="p-4 md:p-6 w-full h-full bg-[#050012] text-white relative flex flex-col justify-between font-sans">
                        {/* Cyber grid and colored bars */}
                        <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-blue-900/40 via-purple-900/30 to-transparent pointer-events-none" />
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-1">
                            <div className="grid grid-cols-2 gap-0.5">
                              <div className="w-1.5 h-1.5 bg-red-500" />
                              <div className="w-1.5 h-1.5 bg-green-500" />
                              <div className="w-1.5 h-1.5 bg-blue-500" />
                              <div className="w-1.5 h-1.5 bg-yellow-500" />
                            </div>
                            <span className="text-[9px] font-extrabold text-white tracking-widest uppercase">Microsoft</span>
                          </div>
                          <span className="text-[7.5px] font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 uppercase tracking-widest font-black">
                            BUILD 2026 DIGITAL
                          </span>
                        </div>

                        <div className="my-2 space-y-1.5 text-center">
                          <span className="text-[12px] font-black text-cyan-400 block tracking-wider uppercase font-sans">YOU'RE IN!</span>
                          <div className="h-[1px] bg-white/10 w-1/3 mx-auto" />
                          <p className="text-[8px] text-white/70">Virtual access and developer sandbox pass granted for:</p>
                          <p className="text-sm font-bold tracking-tight text-white font-mono leading-none">DHRUV GAUR</p>
                          <p className="text-[7px] text-cyan-400/80 font-mono">dhruvgaur385@gmail.com</p>
                        </div>

                        <div className="flex justify-between items-end text-[6.5px] border-t border-white/10 pt-2 font-mono text-white/50">
                          <div className="text-left leading-tight">
                            <div>REGISTRATION NUMBER:</div>
                            <div className="text-white font-bold text-[7.5px]">1778837316517001mqB5</div>
                          </div>
                          <div className="text-right leading-tight">
                            <div>DATE STAMP:</div>
                            <div className="text-white font-bold text-[7.5px]">JUNE 2-3, 2026</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* OPTION 5: GOOGLE ANALYTICS CERTIFIED */}
                    {selectedCert.specimenType === 'google-analytics' && (
                      <div className="p-4 md:p-6 w-full h-full bg-white text-[#1A1A1A] relative flex flex-col justify-between font-sans border-2 border-slate-200">
                        <div className="flex justify-between items-start">
                          {/* Google Analytics stylized circular badge */}
                          <div className="flex items-center gap-1.5">
                            <div className="w-8 h-8 rounded-full border border-[#FAF9F5] bg-slate-50 flex items-center justify-center p-1 font-extrabold text-[8px] text-orange-500 leading-none relative">
                              <span className="text-[6.5px] tracking-tight text-sans font-black">GA4</span>
                              <div className="absolute inset-0 border border-orange-500/15 rounded-full m-0.5 animate-spin" style={{ animationDuration: '40s' }} />
                            </div>
                            <div className="text-left">
                              <span className="text-[7px] block font-extrabold text-slate-400 font-mono tracking-wider">CERTIFICATE AUTHORIZED</span>
                              <span className="text-[9px] font-black text-[#1A1A1A] leading-none uppercase">GOOGLE ANALYTICS</span>
                            </div>
                          </div>
                          
                          <div className="w-10 h-10 border border-[#1A1A1A]/10 bg-[#FAF9F5] p-0.5 flex flex-col justify-between pointer-events-none select-none shrink-0" title="QR Checksum Representation">
                            <div className="grid grid-cols-4 gap-0.5 h-full w-full">
                              {Array.from({ length: 16 }).map((_, i) => (
                                <div key={i} className={`w-full h-full ${((i * 7 + 13) % 5 === 0 || i % 3 === 0) ? 'bg-[#1A1A1A]' : 'bg-transparent'}`} />
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="text-center space-y-1.5 my-3">
                          <p className="text-[7.5px] text-slate-500 italic">This acknowledges that</p>
                          <h4 className="text-lg font-serif font-black text-slate-900 leading-none tracking-tight">Dhruv Gaur</h4>
                          <p className="text-[8px] text-slate-600 max-w-sm mx-auto leading-relaxed">
                            has successfully completed and is certified in the professional requirements of
                          </p>
                          <p className="text-xs font-bold text-emerald-600 font-mono tracking-wider uppercase">Google Analytics Certification</p>
                        </div>

                        <div className="flex justify-between items-end text-[6.5px] text-slate-400 font-mono border-t border-slate-100 pt-2 uppercase">
                          <div className="text-left leading-tight">
                            <div>ISSUE DATE: <span className="text-slate-800 font-bold">MAY 26, 2026</span></div>
                            <div>EXPIRY: <span className="text-slate-800 font-bold">MAY 26, 2027</span></div>
                          </div>
                          <span className="text-slate-800 font-bold">CERT ID: 183459676</span>
                        </div>
                      </div>
                    )}

                    {/* OPTION 6: IIT DELHI MASTERCLASS */}
                    {selectedCert.specimenType === 'iit-optical' && (
                      <div className="p-4 md:p-6 w-full h-full bg-white text-[#1A1A1A] relative flex flex-col justify-between border border-slate-300 font-sans">
                        <div className="flex justify-between items-start border-b border-[#1A1A1A]/10 pb-2">
                          <div className="flex items-center gap-1.5 text-left">
                            <div className="w-6 h-6 rounded-full border border-[#1A1A1A]/20 bg-slate-100 p-0.5 flex items-center justify-center font-bold text-[5px] text-[#112F24]">IITD</div>
                            <div className="flex flex-col">
                              <span className="text-[8px] font-extrabold text-[#112F24] uppercase">IIT DELHI</span>
                              <span className="text-[5px] text-brand-text-muted font-bold tracking-widest leading-none">INDIAN INSTITUTE OF TECHNOLOGY</span>
                            </div>
                          </div>
                          <span className="text-[6.5px] font-mono text-[#D97706] bg-[#D97706]/10 px-2 py-0.5 font-bold uppercase tracking-widest">
                            MASTERCLASS INVITATIONAL
                          </span>
                        </div>

                        <div className="space-y-1.5 my-2.5 text-left text-[7.5px] leading-relaxed select-none">
                          <p className="font-bold text-slate-700">Dear Dhruv Gaur,</p>
                          <p className="text-slate-600">
                            We invite you to participate in an exclusive CEP masterclass:
                          </p>
                          <p className="font-mono text-[8px] font-black text-[#112F24] bg-slate-50 p-1 border-l-2 border-[#112F24]">
                            Photonics Processors: The Future of AI Infrastructure
                          </p>
                          <div className="grid grid-cols-2 gap-2 text-[6.5px] text-slate-500 font-mono bg-[#FAFAF9] p-1 select-none">
                            <div>SPEAKER: <span className="text-slate-800 font-bold">Prof. Deepak Jain</span></div>
                            <div>AFFILIATION: <span className="text-slate-800 font-bold">Optics & Photonics Centre</span></div>
                            <div>DATE: <span className="text-slate-800 font-bold">May 24, 2026</span></div>
                            <div>MODE: <span className="text-slate-800 font-bold">Live Online</span></div>
                          </div>
                          
                          {/* Simulation redacted details (blacked lines) */}
                          <div className="space-y-0.5 mt-1 pointer-events-none">
                            <div className="h-1 bg-slate-800/85 w-11/12 rounded-xs" />
                            <div className="h-1 bg-slate-800/85 w-5/6 rounded-xs" />
                          </div>
                        </div>

                        <div className="flex justify-between items-end text-[6px] text-brand-text-muted pt-1 border-t border-[#1A1A1A]/5">
                          <span>REGISTRATION CONFIRMED</span>
                          <span className="font-bold text-[#112F24]">CEP CENTRE, IIT DELHI</span>
                        </div>
                      </div>
                    )}

                    {/* OPTION 7: CANCER BIOINFORMATICS */}
                    {selectedCert.specimenType === 'cancer-bio' && (
                      <div className="p-4 md:p-6 w-full h-full bg-[#FAFAF6] text-[#1A1A1A] relative flex flex-col justify-between border border-amber-900/10 font-sans">
                        <div className="flex justify-between items-start border-b border-amber-800/20 pb-1.5">
                          <span className="text-[9px] font-black tracking-tight text-amber-900 font-serif">EDU FABRICA & eDC IIT DELHI</span>
                          <span className="text-[6px] font-mono text-emerald-600 bg-emerald-500/10 px-1.5 py-0.5 font-bold uppercase tracking-widest">
                            CERTIFICATE OF COMPLETION
                          </span>
                        </div>

                        <div className="text-center space-y-1.5 my-2">
                          <p className="text-[6.5px] text-amber-800 italic uppercase">proudly presented to</p>
                          <h4 className="text-sm font-black font-serif text-slate-900 tracking-tight leading-none uppercase">Dhruv Gaur</h4>
                          <p className="text-[7.5px] text-slate-600 width-11/12 mx-auto leading-relaxed">
                            for successful participation in the 2-day offline intensive training program detailing:
                          </p>
                          <p className="text-[8.5px] font-mono font-bold text-teal-800 bg-teal-50 border border-teal-600/15 p-1">
                            Bioinformatics in Cancer Research
                          </p>
                        </div>

                        <div className="flex justify-between items-end text-[6.5px] text-slate-400 font-mono border-t border-amber-800/10 pt-1.5">
                          <span>DATE: <span className="text-slate-800 font-bold">28 FEB - 01 MAR 2026</span></span>
                          <span className="text-amber-900 font-extrabold uppercase">ID: BICR28010260055</span>
                        </div>
                      </div>
                    )}

                    {/* FALLBACK/OTHER SPECIMENS SIMULATOR GIVEN REPETITION LIMITS */}
                    {!['veterans', 'veterans-poster', 'genomics-poster', 'microsoft-build', 'google-analytics', 'iit-optical', 'cancer-bio'].includes(selectedCert.specimenType) && (
                      <div className="p-4 md:p-6 w-full h-full bg-white text-[#1A1A1A] relative flex flex-col justify-between border-4 border-slate-100 font-sans">
                        <div className="flex justify-between items-start border-b border-[#1A1A1A]/10 pb-2">
                          <div className="flex items-center gap-1.5">
                            <Award className="w-5 h-5 text-brand-accent" />
                            <div className="text-left font-mono">
                              <span className="text-[5.5px] text-brand-text-muted block font-extrabold uppercase leading-none">VERIFIED PORTFOLIO ACCREDITATION</span>
                              <span className="text-[7.5px] font-black tracking-wider uppercase">{selectedCert.issuer}</span>
                            </div>
                          </div>
                          <span className="text-[6.5px] font-mono text-brand-accent bg-brand-accent/10 px-2 py-0.5 font-bold uppercase tracking-widest rounded-none">
                            {selectedCert.type}
                          </span>
                        </div>

                        <div className="text-center space-y-2 my-2 select-none">
                          <span className="text-[6.5px] text-brand-text-muted italic block">This is to certify that</span>
                          <h4 className="text-sm font-serif font-black tracking-tight text-slate-900 leading-none">Dhruv Gaur</h4>
                          <span className="text-[6.5px] text-brand-text-muted block">has successfully completed the workshop / course on:</span>
                          <h5 className="text-[9.5px] font-mono font-black text-brand-accent bg-brand-surface p-1.5 border border-[#1A1A1A]/5 tracking-wide leading-tight">
                            {selectedCert.title}
                          </h5>
                          
                          {selectedCert.credentialId && (
                            <div className="text-[6.5px] text-brand-text-muted font-mono leading-none pt-1">
                              VERIFICATION CODE: <strong className="text-brand-text">{selectedCert.credentialId}</strong>
                            </div>
                          )}
                        </div>

                        <div className="flex justify-between items-end text-[6.5px] font-mono text-slate-400 border-t border-slate-100 pt-2 uppercase">
                          <span>ACADEMIC DATE: <span className="text-brand-text font-bold">{selectedCert.displayDate}</span></span>
                          <span className="text-brand-accent font-black uppercase">SIGNED IN DENSE VERIFICATION</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <span className="text-[9px] font-mono text-brand-text-muted mt-3 text-center tracking-wider leading-none select-none">
                    ▲ STYLIZED VIRTUAL REPLICA DOCUMENT SPECIMEN (HIGH COMPLIANCE)
                  </span>
                </div>

                {/* 2. SPECIMEN METADATA & ACCOMPLISHMENT DETAILS (Col 8-12) */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="space-y-1.5">
                    <span className="text-brand-accent text-[9px] font-mono font-bold tracking-widest uppercase block border-b border-brand-accent/20 pb-1">
                      {selectedCert.type} DETAILS
                    </span>
                    <h3 className="font-serif italic text-2xl font-black text-[#1A1A1A] leading-tight">
                      {selectedCert.title}
                    </h3>
                    <p className="font-mono text-[9px] text-[#1A1A1A]/60 font-bold uppercase">
                      ISSUED BY: <span className="text-brand-accent">{selectedCert.issuer}</span>
                    </p>
                  </div>

                  {/* Summary List parameters */}
                  <div className="space-y-4 bg-brand-surface border border-[#1A1A1A]/10 p-4 font-mono text-xs">
                    <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-left select-none">
                      <div>
                        <span className="text-[7.5px] text-brand-text-muted block font-extrabold uppercase">ACCREDITATION DATE</span>
                        <span className="font-bold text-[#1A1A1A] text-[10.5px] leading-tight">{selectedCert.displayDate}</span>
                      </div>
                      <div>
                        <span className="text-[7.5px] text-brand-text-muted block font-extrabold uppercase">VERIFICATION STATUS</span>
                        <span className="font-extrabold text-[#10B981] text-[10.5px] flex items-center gap-1 leading-none">
                          <CheckCircle2 className="w-3.5 h-3.5 inline shrink-0" /> VERIFIED
                        </span>
                      </div>
                      <div>
                        <span className="text-[7.5px] text-brand-text-muted block font-extrabold uppercase">CATEGORY SEGMENT</span>
                        <span className="font-bold text-[#1A1A1A] text-[10px] leading-tight uppercase">{selectedCert.category} STACK</span>
                      </div>
                      <div>
                        <span className="text-[7.5px] text-brand-text-muted block font-extrabold uppercase">CREDENTIAL RECORD</span>
                        <span className="font-bold text-[#1A1A1A] text-[9.5px] leading-none truncate block">{selectedCert.credentialId || 'VOLUNTEER LOG'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Detailed paragraph with Notes */}
                  <div className="space-y-2">
                    <h4 className="text-[9.5px] font-mono font-black text-[#1A1A1A] uppercase tracking-widest leading-none pt-1">
                      SYLLABUS & ANALYSIS METADATA:
                    </h4>
                    <p className="text-xs text-brand-text leading-relaxed font-normal">
                      {selectedCert.description}
                    </p>
                  </div>

                  {/* Student journal logs highlight */}
                  <div className="bg-[#FAF9F5] border-l-2 border-brand-accent p-4 space-y-2 font-mono">
                    <h5 className="text-[8.5px] font-black text-[#1A1A1A] uppercase tracking-widest leading-none">STUDENT DIARY EXCERPT:</h5>
                    <p className="text-2xs italic text-brand-text leading-relaxed">
                      "{selectedCert.notes}"
                    </p>
                  </div>

                  {/* Skills summary block inside modal */}
                  <div className="space-y-2">
                    <h5 className="text-[8.5px] font-mono font-black text-brand-text-muted uppercase tracking-widest leading-none">VERIFIED EXPERTISE AREAS:</h5>
                    <div className="flex flex-wrap gap-1">
                      {selectedCert.skillsGained.map((skill, index) => (
                        <span
                          key={index}
                          className="px-2.5 py-1 text-[9px] font-mono tracking-wide bg-[#1A1A1A] text-white"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#1A1A1A]/10 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setSelectedCert(null)}
                      className="px-4 py-2 hover:bg-[#1A1A1A]/5 text-[#1A1A1A] font-mono text-[9px] uppercase font-bold tracking-widest transition-all cursor-pointer border border-[#1A1A1A]/20 hover:border-[#1A1A1A]"
                    >
                      CLOSE DOSSIER
                    </button>
                  </div>

                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
