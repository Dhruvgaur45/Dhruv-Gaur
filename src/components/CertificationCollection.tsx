import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import TiltCard3D from './3d/TiltCard3D';
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

  // State to hold custom base64-encoded uploaded certificate images
  const [customCertImages, setCustomCertImages] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('db_custom_cert_images');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // State to decide whether to view original image or high-fidelity stylized replica
  const [specimenMode, setSpecimenMode] = useState<'replica' | 'original'>('original');
  const [originalImgError, setOriginalImgError] = useState(false);

  // Sync custom files from database server on component mount
  React.useEffect(() => {
    fetch('/api/custom-certs')
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('Server archive unresponsive');
      })
      .then(serverCerts => {
        if (serverCerts && typeof serverCerts === 'object') {
          setCustomCertImages(prev => {
            const merged = { ...prev, ...serverCerts };
            try {
              localStorage.setItem('db_custom_cert_images', JSON.stringify(merged));
            } catch (err) {
              console.error('Local preservation state sync mismatch', err);
            }
            return merged;
          });
        }
      })
      .catch(err => {
        console.warn('Backend custom certificate fetch error: UI running on active storage', err);
      });
  }, []);

  const handleSelectCert = (cert: CertItem) => {
    setSelectedCert(cert);
    setOriginalImgError(false);
    setSpecimenMode('original');
  };

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
                className={`py-1.5 px-3.5 font-sans text-[9px] tracking-wider uppercase font-black transition-all cursor-pointer border ${
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
                    <TiltCard3D maxTilt={7} specular={true} glowColor="#8B5CF6">
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
                            onClick={() => handleSelectCert(cert)}
                            className="px-3 py-1.5 bg-[#1A1A1A] hover:bg-brand-accent text-white font-mono text-[8.5px] uppercase font-black tracking-widest transition-all cursor-pointer flex items-center gap-1.5 active:scale-95"
                          >
                            <Eye className="w-3 h-3" /> PREVIEW SPECIMEN
                          </button>
                        </div>
                      </div>
                    </TiltCard3D>
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
                <div className="lg:col-span-7 flex flex-col items-center w-full">
                  {/* Mode Toggle Tabs above the document box */}
                  <div className="flex gap-2 mb-3 bg-[#FAF9F5] border border-[#1A1A1A]/10 p-1 w-full max-w-lg select-none">
                    <button
                      type="button"
                      onClick={() => setSpecimenMode('original')}
                      className={`flex-1 py-1.5 px-2 text-center font-mono text-[9px] tracking-wider uppercase font-black cursor-pointer transition-all border ${
                        specimenMode === 'original'
                          ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                          : 'bg-white text-brand-text-muted border-transparent hover:border-[#1A1A1A]/10 hover:text-[#1A1A1A]'
                      }`}
                    >
                      [ ORIGINAL DOCUMENT ]
                    </button>
                    <button
                      type="button"
                      onClick={() => setSpecimenMode('replica')}
                      className={`flex-1 py-1.5 px-2 text-center font-mono text-[9px] tracking-wider uppercase font-black cursor-pointer transition-all border ${
                        specimenMode === 'replica'
                          ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                          : 'bg-white text-brand-text-muted border-transparent hover:border-[#1A1A1A]/10 hover:text-[#1A1A1A]'
                      }`}
                    >
                      [ HIGH-FIDELITY REPLICA ]
                    </button>
                  </div>

                  <div className="w-full bg-[#F4F2EB] border-[6px] border-double border-[#A78BFA] p-1 shadow-inner relative overflow-hidden select-none max-w-lg aspect-[11/8] flex flex-col justify-between">
                    
                    {specimenMode === 'original' ? (
                      /* ORIGINAL IMAGE PREVIEW */
                      <div className="w-full h-full relative flex flex-col items-center justify-center bg-zinc-900 border border-slate-300">
                        {(customCertImages[selectedCert.id] || !originalImgError) ? (
                          <img
                            src={customCertImages[selectedCert.id] || `/src/assets/images/${selectedCert.id}.png`}
                            alt={selectedCert.title}
                            referrerPolicy="no-referrer"
                            className="max-w-full max-h-full object-contain pointer-events-auto"
                            onError={() => {
                              if (!customCertImages[selectedCert.id]) {
                                setOriginalImgError(true);
                                setSpecimenMode('replica');
                              }
                            }}
                          />
                        ) : (
                          <div className="text-center p-6 text-slate-400 font-mono text-[10px] space-y-2">
                            <FileText className="w-8 h-8 text-slate-600 mx-auto" />
                            <p>No original file found at `/src/assets/images/{selectedCert.id}.png`</p>
                            <p className="text-[8px] text-slate-500">Please upload your direct credential below.</p>
                          </div>
                        )}
                      </div>
                    ) : (
                      /* REPLICA MODE */
                      <>
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

                    {/* OPTION 8: GDG ANDROID WORKSHOP */}
                    {selectedCert.specimenType === 'android-gdg' && (
                      <div className="p-4 md:p-5 w-full h-full bg-white text-slate-800 relative flex flex-col justify-between border border-slate-200 font-sans">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-slate-50 rounded-full blur-2xl pointer-events-none" />
                        
                        {/* Header Logos */}
                        <div className="flex justify-between items-start border-b border-slate-100 pb-1 z-10 select-none">
                          <div className="flex items-center gap-1.5">
                            <div className="flex items-center gap-0.5 text-[#4285F4] font-black text-[10px]">
                              <span>&lt;</span>
                              <span className="text-[#EA4335]">&gt;</span>
                              <span className="text-[#34A853] ml-1 font-sans text-[8.5px] tracking-tight uppercase">GDG on Campus</span>
                            </div>
                          </div>
                          <span className="text-[5.5px] font-mono font-bold text-slate-400 text-right leading-tight">
                            Trinity College of Engineering<br />and Research - Pune, India
                          </span>
                        </div>

                        {/* Title Section */}
                        <div className="text-center space-y-1 my-1 z-10 select-none">
                          <h4 className="text-[12px] font-bold tracking-widest text-[#4285F4] uppercase font-mono">CERTIFICATE OF PARTICIPATION</h4>
                          <p className="text-[6px] text-slate-400 italic">This is to certify that</p>
                          <h5 className="text-sm font-black text-slate-900 border-b border-dotted border-slate-200 pb-0.5 w-1/2 mx-auto leading-none">Dhruv Gaur</h5>
                          <p className="text-[6.5px] text-slate-500 leading-tight w-11/12 mx-auto">
                            has successfully attended the workshop organized by <strong>GDG on Campus Trinity College of Engineering and Research</strong> on the topic:
                          </p>
                          <p className="text-[8px] font-bold font-mono text-[#0F9D58] bg-[#0F9D58]/5 p-1 border border-[#0F9D58]/10 max-w-xs mx-auto leading-tight">
                            Hands-on Workshop: Building Your First Android app
                          </p>
                        </div>

                        {/* Footer Signatures */}
                        <div className="flex justify-between items-end text-[5.5px] text-slate-400 font-mono border-t border-slate-100 pt-1 z-10 select-none uppercase">
                          <div className="text-center w-[70px]">
                            <span className="text-slate-805 font-bold block italic font-serif leading-none">Clynit</span>
                            <div className="h-[0.5px] bg-slate-300 my-0.5" />
                            <span>GDG OC LEAD</span>
                          </div>
                          <div className="flex flex-col items-center">
                            <span className="text-slate-800 font-bold text-[6px]">30th Of May 2026</span>
                            <span>DATE OF SESSION</span>
                          </div>
                          <div className="text-center w-[70px]">
                            <span className="text-slate-805 font-bold block italic font-serif leading-none font-bold">Gucoias</span>
                            <div className="h-[0.5px] bg-slate-300 my-0.5" />
                            <span>FACULTY ADVISOR</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* OPTION 9: GOOGLE I/O BADGE */}
                    {selectedCert.specimenType === 'google-io' && (
                      <div className="p-4 md:p-5 w-full h-full bg-[#FAFAFA] text-slate-900 relative flex flex-col justify-between font-sans border border-slate-200 overflow-hidden">
                        {/* Modern Google Color Ribbon Waves on bottom margin */}
                        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#F4B400] z-20" />
                        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-[#4285F4]/10 rounded-full blur-xl pointer-events-none" />
                        <div className="absolute -top-8 -right-8 w-32 h-32 bg-[#FFD043]/10 rounded-full blur-xl pointer-events-none" />

                        {/* Header */}
                        <div className="flex justify-between items-center z-10">
                          <div className="flex items-center gap-1 font-bold text-[10px] uppercase text-[#4285F4] tracking-wide">
                            <span className="text-slate-900 font-black">Google</span> I/O <span className="text-[7px] text-slate-400 font-mono">2026</span>
                          </div>
                          <span className="text-[6px] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.5 font-bold uppercase tracking-widest rounded-none">
                            #GoogleIO2026
                          </span>
                        </div>

                        {/* Main Title Banner */}
                        <div className="my-1 text-left space-y-0.5 z-10 pl-2">
                          <h4 className="text-[15px] font-black tracking-tighter text-slate-950 leading-tight">
                            I'm attending <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#F4B400]">Google I/O 2026</span>
                          </h4>
                          <p className="text-[6.5px] text-slate-500 max-w-xs uppercase font-mono tracking-wider leading-none">
                            The future is building. Let's build it together.
                          </p>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-2 gap-2 bg-white/80 backdrop-blur-xs border border-slate-100 p-1.5 text-[6px] font-mono text-slate-500 z-10 select-none">
                          <div className="space-y-0.5 border-r border-slate-100">
                            <div className="text-slate-400 font-bold uppercase">DATE & SCHEDULE:</div>
                            <div className="text-slate-800 font-bold uppercase text-[7px]">19th & 20th May 2026</div>
                            <div className="text-slate-500 leading-none">Virtually Streaming Live</div>
                          </div>
                          <div className="space-y-0.5 pl-2">
                            <div className="text-slate-400 font-bold uppercase">FOCUS SEGMENT:</div>
                            <div className="text-[#4285F4] font-bold text-[7px]" style={{ fontSize: '6.5px' }}>INTELLIGENT AGENTS</div>
                            <div className="text-slate-500 leading-none">Learning. Inspiring. Building</div>
                          </div>
                        </div>

                        {/* Footer Code Accent */}
                        <div className="flex justify-between items-center text-[5.5px] font-mono text-slate-400 pt-1 border-t border-slate-100 z-10 leading-none">
                          <span className="text-left font-black tracking-widest text-[#4285F4]">&lt;/&gt; CREATE THE NEXT WITH GOOGLE</span>
                          <span>REGISTRATION CONFIRMED</span>
                        </div>
                      </div>
                    )}

                    {/* OPTION 10: SHARDA BIOPROCESS EXPERT LECTURES */}
                    {selectedCert.specimenType === 'sharda-bio' && (
                      <div className="p-4 md:p-5 w-full h-full bg-[#FAF9F5] text-slate-800 relative flex flex-col justify-between border-[5px] border-double border-amber-950/20 font-sans">
                        {/* Double thin corner brackets */}
                        <div className="absolute top-1 left-1 w-4 h-4 border-t border-l border-amber-950/40" />
                        <div className="absolute top-1 right-1 w-4 h-4 border-t border-r border-amber-950/40" />
                        <div className="absolute bottom-1 left-1 w-4 h-4 border-b border-l border-amber-950/40" />
                        <div className="absolute bottom-1 right-1 w-4 h-4 border-b border-r border-amber-950/40" />

                        {/* Joint Header logos */}
                        <div className="flex justify-between items-start border-b border-amber-950/10 pb-0.5 select-none">
                          <div className="text-left font-serif leading-none min-w-[120px]">
                            <span className="text-[7.5px] font-extrabold text-amber-950 tracking-wider block leading-none">SHARDA UNIVERSITY</span>
                            <span className="text-[4.5px] text-slate-400 block tracking-widest font-sans uppercase">BEYOND BOUNDARIES</span>
                          </div>
                          <div className="text-right leading-none max-w-[120px]">
                            <span className="text-[6.5px] font-bold text-red-700 block uppercase leading-none">INSTITUTION'S INNOVATION COUNCIL</span>
                            <span className="text-[3.5px] text-slate-400 block uppercase tracking-tight leading-none">(Ministry of Education Initiative)</span>
                          </div>
                        </div>

                        {/* Main certificate presentation */}
                        <div className="text-center space-y-1 my-1 select-none">
                          <h4 className="text-[12px] font-black font-serif text-amber-900 uppercase tracking-widest">CERTIFICATE OF APPRECIATION</h4>
                          <p className="text-[5.5px] uppercase tracking-wider text-slate-400 italic">This certificate is awarded to</p>
                          <h5 className="text-[13px] font-serif font-black tracking-tight text-slate-900 border-b border-amber-950/20 w-1/2 mx-auto leading-none pb-0.5">Dhruv gaur.</h5>
                          <p className="text-[6.25px] w-11/12 mx-auto leading-relaxed text-slate-600 font-serif pt-1">
                            has successfully participated in the Expert Lectures on <strong>"Industrial Bioprocess Engineering"</strong> held on 20th February 2026 organized by Department of Biotechnology, Sharda School of Bioscience and Technology, Sharda University, Greater Noida, Uttar Pradesh.
                          </p>
                        </div>

                        {/* Signatures */}
                        <div className="flex justify-between items-end text-[4.5px] text-slate-400 font-mono border-t border-amber-950/10 pt-1 select-none">
                          <div className="text-center w-[65px] leading-tight">
                            <span className="text-slate-800 font-bold block font-serif text-[5.5px]">Dr. Ajay K. Chauhan</span>
                            <span className="text-slate-400 text-[4px] block">Assistant Professor</span>
                            <span className="text-slate-400 text-[3.5px] block font-semibold">Sharda University</span>
                          </div>
                          <div className="text-center w-[65px] leading-tight">
                            <span className="text-slate-800 font-bold block font-serif text-[5.5px]">Dr. K. N. Baruah</span>
                            <span className="text-slate-400 text-[4px] block">Assistant Professor</span>
                            <span className="text-slate-405 text-[3.5px] block font-semibold">Sharda University</span>
                          </div>
                          <div className="text-center w-[65px] leading-tight">
                            <span className="text-slate-800 font-bold block font-serif text-[5.5px]">Dr. Amit Kumar</span>
                            <span className="text-slate-400 text-[4px] block">Assistant Professor</span>
                            <span className="text-slate-405 text-[3.5px] block font-semibold">Sharda University</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* OPTION 11: EDUVEA CRISPR CRISPR & GENE EDITING */}
                    {selectedCert.specimenType === 'crispr' && (
                      <div className="p-4 md:p-5 w-full h-full bg-white text-slate-800 relative flex flex-col justify-between border-[4px] border-indigo-950/10 font-sans">
                        {/* Laurel representation */}
                        <div className="absolute top-4 bottom-4 left-2 w-3 border-l border-indigo-900/10 flex flex-col justify-between text-[4.5px] font-mono text-indigo-900/40 items-center pointer-events-none leading-none">
                          <span>❈</span><span>❈</span><span>❈</span><span>❈</span><span>❈</span><span>❈</span><span>❈</span><span>❈</span>
                        </div>
                        <div className="absolute top-4 bottom-4 right-2 w-3 border-r border-indigo-900/10 flex flex-col justify-between text-[4.5px] font-mono text-indigo-900/40 items-center pointer-events-none leading-none">
                          <span>❈</span><span>❈</span><span>❈</span><span>❈</span><span>❈</span><span>❈</span><span>❈</span><span>❈</span>
                        </div>

                        {/* Top logo */}
                        <div className="flex flex-col items-center text-center space-y-0.5 select-none">
                          <span className="text-[11px] font-black tracking-widest text-white uppercase font-mono bg-slate-950 px-2 py-0.5">EDUVEA</span>
                          <span className="text-[4px] tracking-widest text-[#4f46e5] uppercase font-mono font-extrabold leading-none">AN ISO 9001:2015 CERTIFIED BRAND</span>
                        </div>

                        {/* Content */}
                        <div className="text-center space-y-1 my-1 select-none">
                          <h4 className="text-[10.5px] font-bold tracking-wider text-indigo-950 uppercase font-mono">CERTIFICATE OF COMPLETION</h4>
                          <span className="text-[5.5px] text-slate-400 italic block leading-none">This certificate is awarded to</span>
                          <h5 className="text-[14px] font-bold text-slate-950 leading-none py-0.5 tracking-tight uppercase">DHRUV GAUR</h5>
                          <p className="text-[6.5px] leading-relaxed text-slate-600 w-11/12 mx-auto pt-0.5">
                            In recognition of the successful completion of the 3-Days Online Workshop on <strong className="text-indigo-950 uppercase font-mono">CRISPR AND GENE EDITING</strong> conducted from February 17th to 19th, organised by EDUVEA.
                          </p>
                        </div>

                        {/* Bottom Seals and signatures */}
                        <div className="flex justify-between items-end border-t border-slate-100 pt-1 select-none uppercase">
                          <div className="text-center w-[50px] text-[4.5px] font-mono font-bold text-slate-400 leading-none">
                            <span className="text-slate-800 font-bold block text-[5px] italic font-serif leading-none leading-none">Udita</span>
                            <div className="h-[0.5px] bg-slate-200 my-0.5" />
                            <span>UDITA<br />DIRECTOR</span>
                          </div>
                          
                          {/* Sponsoring logos list representative */}
                          <div className="flex items-center gap-1">
                            <div className="px-1 border border-indigo-900/10 text-[3.5px] font-bold text-indigo-900 font-mono scale-90 rounded-xs leading-none">Skill India</div>
                            <div className="w-4 h-4 rounded-full border border-purple-900/20 bg-purple-50 p-0.5 flex flex-col items-center justify-center text-[3.5px] text-purple-900 font-bold leading-none scale-90 relative">
                              <span>ISO</span>
                            </div>
                            <div className="px-1 bg-sky-50 border border-sky-400/20 text-[3.5px] font-bold text-sky-900 font-mono scale-90 rounded-xs leading-none">MSME</div>
                          </div>

                          <div className="text-center w-[50px] text-[4.5px] font-mono font-bold text-slate-400 leading-none">
                            <span className="text-slate-800 font-bold block text-[5px] italic font-serif leading-none">Anupama</span>
                            <div className="h-[0.5px] bg-slate-200 my-0.5" />
                            <span>ANUPAMA<br />HEAD</span>
                          </div>
                        </div>

                        <div className="text-center text-[4.5px] text-indigo-900/60 font-mono font-extrabold uppercase mt-0.5 leading-none">
                          CERTIFICATE ID NO: EDUVEA-CB-FEB-009
                        </div>
                      </div>
                    )}

                    {/* OPTION 12: SHARDA DRONES AND ROBOTICS TRAINING WORKSHOP */}
                    {selectedCert.specimenType === 'sharda-drones' && (
                      <div className="p-0 w-full h-full bg-[#1e293b] text-[#1A1A1A] relative flex flex-col justify-between font-sans border border-slate-200 overflow-hidden">
                        {/* Sharda diagonal background blocks */}
                        <div className="absolute top-0 left-0 w-[45%] h-full bg-[#0284c7] -skew-x-12 -translate-x-8 shadow-lg z-0" />
                        <div className="absolute top-0 right-0 w-[55%] h-full bg-[#FAF9F5] z-0" />
                        <div className="absolute top-0 left-[41%] w-1.5 h-full bg-[#e11d48] -skew-x-12 z-10" />

                        <div className="p-4 md:p-5 w-full h-full relative z-10 flex flex-col justify-between leading-none font-sans">
                          {/* Symmetrical header logos */}
                          <div className="flex justify-between items-start select-none">
                            <div className="text-left max-w-[100px]">
                              <span className="text-[6px] font-serif font-black tracking-wider text-white block leading-none">SHARDA UNIVERSITY</span>
                              <span className="text-[4px] text-cyan-200 block tracking-widest font-sans uppercase">Beyond Boundaries</span>
                            </div>
                            <div className="text-right max-w-[110px]">
                              <span className="text-[5px] font-bold text-slate-700 block uppercase leading-none">INSTITUTION'S INNOVATION COUNCIL</span>
                              <span className="text-[3.5px] text-slate-400 block uppercase font-mono font-bold tracking-tighter leading-none">(MINISTRY OF EDUCATION INITIATIVE)</span>
                            </div>
                          </div>

                          {/* Event Header Banner */}
                          <div className="text-center my-1 space-y-1 select-none">
                            <div className="bg-[#e11d48] text-white py-0.5 px-3 text-[7px] font-mono tracking-widest uppercase font-black rounded-xs shadow-xs inline-block leading-none">
                              HANDS ON - WORKSHOP ON DRONES AND ROBOTICS
                            </div>
                            <h4 className="text-[11px] font-bold text-cyan-900 font-serif leading-none tracking-tight pt-1">CERTIFICATE OF COMPLETION</h4>
                            <p className="text-[5.5px] text-slate-400 italic uppercase">This certificate is awarded to</p>
                            <h5 className="text-[13px] font-black font-serif text-[#1e293b] leading-none">Dhruv Gaur</h5>
                          </div>

                          {/* Detail summary */}
                          <div className="text-center select-none pt-0.5">
                            <p className="text-[6.5px] text-slate-600 leading-relaxed font-sans w-11/12 mx-auto">
                              In recognition of their active participation in the <strong>"Drones and Robotics Training Workshop"</strong> organized by Sharda University, Greater Noida, held from 19th to 22nd September 2025.
                            </p>
                          </div>

                          {/* Symmetrical Signatures */}
                          <div className="flex justify-between items-end text-[4.5px] text-slate-400 font-mono border-t border-slate-200 pt-1">
                            <div className="text-center w-[60px] leading-tight">
                              <span className="text-slate-100 font-bold block font-serif text-[5px]">DEAN</span>
                              <div className="h-[0.5px] bg-sky-200/50 my-0.5" />
                              <span className="text-sky-200 font-semibold block">SCHOOL OF ENG</span>
                            </div>
                            <div className="text-center">
                              <span className="text-slate-800 font-black text-[5px]">SEPTEMBER 2025</span>
                              <span className="text-slate-400 block">DATES VALUE</span>
                            </div>
                            <div className="text-center w-[60px] leading-tight">
                              <span className="text-slate-800 font-bold block font-serif text-[5px] leading-none">HEAD OF DEPT</span>
                              <div className="h-[0.5px] bg-slate-300 my-0.5" />
                              <span className="text-slate-400 font-semibold block">BIOTECH</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* OPTION 13: 5-DAY AI AGENTS INTENSIVE BADGE */}
                    {selectedCert.specimenType === 'ai-agents' && (
                      <div className="p-4 md:p-5 w-full h-full bg-[#020617] text-white relative flex flex-col justify-between font-sans border border-slate-800 overflow-hidden">
                        {/* High tech neon matrix theme */}
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/30 via-slate-950 to-slate-950 pointer-events-none z-0" />
                        <div className="absolute top-1/2 right-4 -translate-y-1/2 w-16 h-16 bg-[#3b82f6]/10 border border-[#3b82f6]/20 flex flex-col justify-center items-center rounded-lg rotate-12 z-0 pointer-events-none select-none">
                          <Terminal className="w-6 h-6 text-[#3b82f6] animate-pulse" />
                        </div>

                        {/* Top banner */}
                        <div className="flex justify-between items-center z-10 select-none">
                          <span className="text-[6.5px] font-mono tracking-widest text-[#3b82f6] uppercase font-black">EXCITED TO ANNOUNCE!</span>
                          <span className="text-[5.5px] font-mono text-cyan-400 border border-cyan-500/30 px-1.5 py-0.5 rounded-xs leading-none">OFFICIAL PART</span>
                        </div>

                        {/* Certificate Main details */}
                        <div className="text-center my-0.5 select-none z-10 space-y-0.5">
                          <h4 className="text-[12px] font-black tracking-tight leading-snug font-sans text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 uppercase">
                            5-Day AI Agents:<br />Intensive Vibe Coding Course
                          </h4>
                          <div className="text-[#3b82f6] text-[7.5px] font-semibold tracking-wider font-mono uppercase bg-blue-950/40 py-0.5 px-3 rounded-full border border-blue-500/10 inline-block leading-none">
                            With Google
                          </div>
                          
                          <p className="text-[6.5px] text-slate-400">Awarded for active exploration to candidate</p>
                          <h5 className="text-[13px] font-black font-mono tracking-wide text-white leading-none">Dhruv Gaur</h5>
                          <p className="text-[6.5px] text-slate-500 leading-none">JUNE 15 to JUNE 19, 2025</p>
                        </div>

                        {/* Key achievements */}
                        <div className="grid grid-cols-4 gap-1 select-none text-center bg-slate-950/60 p-1 border border-slate-900 z-10">
                          {[
                            { title: "VIBE CODING INDUCTION" },
                            { title: "BUILD AI AGENTS" },
                            { title: "POWERED BY GOOGLE" },
                            { title: "FUTURE EXPANSION" }
                          ].map((b, i) => (
                            <div key={i} className="rounded-xs leading-none p-0.5 border border-slate-900">
                              <span className="text-[5.5px] font-mono text-cyan-400 leading-none block uppercase font-bold tracking-tighter">{b.title}</span>
                            </div>
                          ))}
                        </div>

                        {/* Footer decorative text */}
                        <div className="text-center text-[5.5px] italic text-[#3b82f6] font-mono select-none z-10 pt-1 border-t border-slate-900 uppercase">
                          "Learn. Code. Build. Automate. The AI Future is Vibe. ♡"
                        </div>
                      </div>
                    )}

                    {/* OPTION 14: FRENCH OLYMPIAD 2017 CERTIFICATE */}
                    {selectedCert.specimenType === 'french' && (
                      <div className="p-4 md:p-5 w-full h-full bg-white relative flex flex-col justify-between font-sans border border-slate-200 overflow-hidden">
                        {/* Elegant Tricolor Background Columns */}
                        <div className="absolute top-0 bottom-0 left-0 w-1/3 bg-blue-900/10 pointer-events-none z-0" />
                        <div className="absolute top-0 bottom-0 right-0 w-1/3 bg-red-650/10 pointer-events-none z-0" style={{ backgroundColor: 'rgba(239, 68, 68, 0.08)' }} />
                        
                        {/* Symmetrical outline of France watermark */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 bg-slate-100 opacity-20 pointer-events-none rounded-full blur-xs z-0" />

                        {/* Header card info */}
                        <div className="flex justify-between items-start pb-1 border-b border-slate-100 z-10 select-none">
                          <h4 className="text-[12px] font-black tracking-tight text-blue-900 font-serif uppercase leading-none">French Olympiad <span className="text-red-700">2017</span></h4>
                          <span className="text-[6px] font-mono text-slate-400 tracking-wider">Certificat de participation</span>
                        </div>

                        {/* Certificate core details */}
                        <div className="text-center space-y-1 my-1.5 z-10 select-none leading-none">
                          <p className="text-[5.5px] italic text-slate-400 font-serif uppercase leading-none">Ce certificat est accordé à</p>
                          <h5 className="text-[13px] font-bold font-serif text-slate-850 leading-none">Dhruv Gaur</h5>
                          
                          <div className="grid grid-cols-2 gap-1.5 max-w-xs mx-auto py-1 font-mono text-[5.5px] text-slate-500 bg-white/40 border border-slate-200/50 p-1">
                            <div>CLASSE: <span className="text-slate-800 font-black">ELEMENTARY</span></div>
                            <div className="truncate">ÉCOLE: <span className="text-slate-800 font-bold text-[5.5px]">DPS, BULANDSHAHR</span></div>
                          </div>

                          <p className="text-[6.25px] text-slate-600 font-serif leading-relaxed w-11/12 mx-auto pt-1 leading-normal text-center">
                            pour sa participation au premier tour du concours national <strong className="text-blue-950 font-sans tracking-wide">French Olympiad 2017</strong>.
                          </p>
                        </div>

                        {/* Collaborating logos representation */}
                        <div className="flex justify-between items-end border-t border-slate-100 pt-1 z-10 select-none">
                          <div className="text-[4px] font-bold text-slate-400 tracking-tighter uppercase min-w-[50px] leading-tight">
                            ORGANIZED BY <br /><span className="text-slate-800">E&B Education & Beyond</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-[4px] font-mono text-slate-300">
                            <span className="px-1 border border-slate-200 text-blue-950 font-semibold">INSTITUT FRANÇAIS</span>
                            <span className="px-1 bg-red-50 text-red-800 font-bold text-[3px] border border-red-100">EMBASSY OF TUNISIA</span>
                            <span className="text-slate-900 font-serif font-black underline">Langers</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* FALLBACK/OTHER SPECIMENS SIMULATOR GIVEN REPETITION LIMITS */}
                    {!['veterans', 'veterans-poster', 'genomics-poster', 'microsoft-build', 'google-analytics', 'iit-optical', 'cancer-bio', 'android-gdg', 'google-io', 'sharda-bio', 'crispr', 'sharda-drones', 'ai-agents', 'french'].includes(selectedCert.specimenType) && (
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
                      </>
                    )}
                  </div>

                  <span className="text-[9px] font-mono text-brand-text-muted mt-3 text-center tracking-wider leading-none select-none">
                    {specimenMode === 'original' 
                      ? "▲ AUTHENTIC CREDENTIAL DOCUMENTATION IMAGING RECORD"
                      : "▲ STYLIZED VIRTUAL REPLICA DOCUMENT SPECIMEN (HIGH COMPLIANCE)"}
                  </span>

                  {/* Dynamic interactive upload box inside modal */}
                  <div className="mt-4 w-full max-w-lg bg-[#FAFAF9] border border-[#1A1A1A]/10 p-4 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-[9px] select-none">
                    <div className="text-left text-brand-text-muted leading-relaxed max-w-xs">
                      <span className="font-extrabold text-[#1A1A1A] block uppercase tracking-wider mb-0.5">UPLOAD ORIGINAL CERTIFICATE</span>
                      Attach your original image (PNG, JPG, or JPEG) to display your actual certificate in this slot.
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="px-3.5 py-2 bg-brand-accent hover:bg-brand-accent/90 text-white font-black tracking-widest uppercase cursor-pointer transition-colors border border-[#1A1A1A]/10 flex items-center gap-1.5 shrink-0 select-none">
                        <FileText className="w-3.5 h-3.5" />
                        CHOOSE DOCUMENT
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (event) => {
                                const base64 = event.target?.result as string;
                                if (base64) {
                                  const updated = {
                                    ...customCertImages,
                                    [selectedCert.id]: base64
                                  };
                                  setCustomCertImages(updated);
                                  localStorage.setItem('db_custom_cert_images', JSON.stringify(updated));
                                  setSpecimenMode('original');
                                  setOriginalImgError(false);

                                  // Persistent backup to Express Backend
                                  fetch('/api/custom-certs', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ id: selectedCert.id, base64 })
                                  })
                                  .then(res => res.json())
                                  .then(data => {
                                    console.log('[Dossier Sync] Persistent backup synced successfully to server:', data);
                                  })
                                  .catch(err => {
                                    console.error('[Dossier Sync] Server-side backup failed:', err);
                                  });
                                }
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </label>
                      {customCertImages[selectedCert.id] && (
                        <button
                          type="button"
                          onClick={() => {
                            const updated = { ...customCertImages };
                            delete updated[selectedCert.id];
                            setCustomCertImages(updated);
                            localStorage.setItem('db_custom_cert_images', JSON.stringify(updated));
                            setOriginalImgError(false);
                            setSpecimenMode('replica');

                            // Delete permanent entry on server
                            fetch(`/api/custom-certs/${selectedCert.id}`, {
                              method: 'DELETE'
                            })
                            .then(res => res.json())
                            .then(data => {
                              console.log('[Dossier Sync] Persistent image deleted successfully from server:', data);
                            })
                            .catch(err => {
                              console.error('[Dossier Sync] Server-side deletion failed:', err);
                            });
                          }}
                          className="px-2.5 py-2 bg-[#DC2626] hover:bg-red-700 text-white font-black tracking-widest uppercase cursor-pointer transition-colors border border-[#1A1A1A]/5"
                        >
                          RESET
                        </button>
                      )}
                    </div>
                  </div>
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
