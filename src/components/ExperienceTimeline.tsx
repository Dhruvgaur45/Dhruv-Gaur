import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Briefcase, 
  Building2, 
  Calendar, 
  MapPin, 
  ChevronRight, 
  Sparkles, 
  Activity, 
  GraduationCap, 
  Flag, 
  Award, 
  Clock, 
  Compass, 
  Tag, 
  Layers
} from 'lucide-react';

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  duration: string;
  periodText: string;
  location: string;
  type: 'professional' | 'academic' | 'volunteering' | 'schooling';
  badge: string;
  description: string;
  skillsAcquired: string[];
  keyHighlights: string[];
}

const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: 'exp-techfest-iitb',
    company: 'Techfest, IIT Bombay',
    role: 'Campus Ambassador',
    duration: 'June 2026 – Present',
    periodText: 'Currently Active',
    location: 'IIT Bombay, Mumbai, India',
    type: 'professional',
    badge: 'Campus Leadership / Student Ambassador',
    description: 'Serving as a Campus Ambassador for Techfest, IIT Bombay, representing and promoting one of Asia’s leading science and technology festivals. Supporting student outreach, event promotion, community engagement, and communication of Techfest opportunities within the university network.',
    skillsAcquired: ['Campus Branding', 'Digital Outreach', 'Event Promotion', 'Community Engagement', 'Leadership Communication'],
    keyHighlights: [
      'Promote Techfest events, competitions, workshops, and initiatives among students.',
      'Increase student awareness and participation through digital outreach and campus networking.',
      'Share official announcements and registration opportunities.',
      'Connect interested students with relevant Techfest programs.',
      'Support the promotion of innovation, science, technology, and entrepreneurship.',
      'Represent Techfest professionally within the university community.'
    ]
  },
  {
    id: 'exp-veterans-india',
    company: 'Veterans India',
    role: 'PATRIOTIC YOUTH AMBASSADOR',
    duration: 'May 2026 - Present (2 months)',
    periodText: 'Present Alignment',
    location: 'National Council, India',
    type: 'professional',
    badge: 'National Representative Commission',
    description: 'Honored to receive the Patriotic Youth Ambassador certificate. Grateful for this recognition and motivated to continue contributing toward youth leadership, innovation, and community impact. This achievement reminds me that real growth comes from taking initiative, learning continuously, and working with purpose. Looking forward to exploring more opportunities where technology, leadership, and social impact can come together. A big thank you to everyone who has supported and inspired me throughout this journey. ✨',
    skillsAcquired: ['Youth Leadership', 'Civic Mobilization', 'Healthcare Advocacy', 'Social Communication'],
    keyHighlights: [
      'Commissioned National Patriotic Youth Ambassador supporting youth empowerment.',
      'Active advocacy linking healthcare science with regional veteran welfare initiatives.',
      'Fostering interdisciplinary technology solutions for community impact.'
    ]
  },
  {
    id: 'exp-iit-delhi',
    company: 'Indian Institute of Technology, Delhi',
    role: 'Volunteer',
    duration: 'February 2026 - March 2026 (2 months)',
    periodText: 'Academic Volunteering',
    location: 'New Delhi, India',
    type: 'volunteering',
    badge: 'Deep Tech Colloquium Volunteer',
    description: 'Contributed to coordination and administrative hosting support for exclusive Photonics and Computational Biology masterclasses under IIT Delhi faculty including Prof. Deepak Jain. Engaged with attendees around advanced light-guided silicon micro-resonators and algorithms.',
    skillsAcquired: ['Research Administration', 'Public Presentation', 'Bioinformatics Alignment', 'Team Collaboration'],
    keyHighlights: [
      'Facilitated registration and operational metrics for photonic-processor workshops.',
      'Engaged intimately with computational semiconductor and hardware researchers.',
      'Assisted in coordination of biomedical data-sharing guidelines.'
    ]
  },
  {
    id: 'exp-rcb-visitor',
    company: 'Regional Centre for Biotechnology (RCB)',
    role: 'Visitor Developer',
    duration: 'February 2026 - February 2026 (1 month)',
    periodText: 'Exploratory Research Visit',
    location: 'NCR Biotech Science Cluster, India',
    type: 'volunteering',
    badge: 'Scientific Facility Visitor',
    description: 'Conducted a dedicated exploratory research visit to the National Hub to inspect state-of-the-art biological science setups, including molecular imaging suites, cell bioreactor controllers, and molecular simulation clusters.',
    skillsAcquired: ['Advanced Diagnostics Systems', 'High-Throughput Assays', 'Bioprocess Architecture', 'Academic Networking'],
    keyHighlights: [
      'Examined modern high-speed thermal cyclers & automated chromatography setups.',
      'Attended advanced bio-computational research orientation briefs.',
      'Analyzed experimental pipelines for biological sensor design.'
    ]
  },
  {
    id: 'exp-sharda-uni',
    company: 'Sharda University',
    role: 'Undergraduate Student (B.Tech Biotechnology)',
    duration: 'August 2025 - Present (11 months)',
    periodText: 'B.Tech Tenure',
    location: 'Greater Noida, India',
    type: 'academic',
    badge: 'Academic B.Tech Undergrad',
    description: 'Experienced in academic research activities, biotechnology internships, workshops, conferences, and interdisciplinary projects involving bioinformatics, oncology research, and industrial bioprocess engineering. Skilled in analytical thinking, research communication, teamwork, and problem-solving, with certifications in quantitative research, data analytics, and engineering simulations. Dedicated to continuous learning and contributing to impactful innovations in biotechnology, healthcare, and scientific research while building a career focused on advanced biotech solutions and global research opportunities.',
    skillsAcquired: ['Bioinformatics Algorithms', 'Oncology Analytics', 'Mass-Transfer Balance', 'Bioprocess Scales'],
    keyHighlights: [
      'Pursuing full B.Tech curriculum targeting the interface of biology and digital code.',
      'Maintained consistent lab involvement in DNA gene extraction and mapping.',
      'Active developer of real-time sensor dashboards for bioreactive vessels.'
    ]
  },
  {
    id: 'exp-school-12',
    company: 'Higher Secondary Academy',
    role: 'Student (Science Medical Stream - Class 12th)',
    duration: 'Completed in 2025',
    periodText: 'Class 12th Milestone',
    location: 'Bilingual Core Institution',
    type: 'schooling',
    badge: 'Pre-University High Distinction',
    description: 'Completed Class 12th in 2025 with Science (Medical) stream. Developed a strong academic foundation in Biology, Chemistry, and Physics along with analytical, research, and problem-solving skills. Participated in academic projects, laboratory practicals, presentations, and science-related activities that enhanced teamwork, communication, and scientific understanding. Demonstrated dedication, discipline, and consistency throughout higher secondary education with a keen interest in biotechnology and healthcare sciences.',
    skillsAcquired: ['Organic Synthesis', 'Cell Biological Systems', 'Experimental Methodologies', 'Scientific Communication'],
    keyHighlights: [
      'Secured excellent grades across advanced medical science subjects.',
      'Conducted high school thesis presentation on clinical biochemistry vectors.',
      'Elected team leader for chemistry laboratory practical groups.'
    ]
  },
  {
    id: 'exp-school-10',
    company: 'Secondary School',
    role: 'Student (Science & Mathematics - Class 10th)',
    duration: 'Completed in 2023',
    periodText: 'Class 10th Graduation',
    location: 'Foundational Academy',
    type: 'schooling',
    badge: 'Secondary School Certification',
    description: 'Completed Class 10th in 2023, studying core subjects including Science, Mathematics, Social Science, Hindi, and English. Built a strong academic foundation with excellent analytical, communication, and problem-solving abilities. Actively participated in classroom activities, assignments, presentations, and team-based projects that enhanced leadership, discipline, and teamwork skills. Developed a keen interest in science and technology along with effective time management and learning capabilities during secondary education.',
    skillsAcquired: ['Quantitative Mathematics', 'Basic Environmental Science', 'Public Declamation', 'Time Management'],
    keyHighlights: [
      'Graduated with strong cumulative academic performance.',
      'Participated in environmental-science state olympiad activities.',
      'Coordinated school level inter-house debate and research projects.'
    ]
  },
  {
    id: 'exp-student-routine',
    company: 'Ongoing Educational Stack',
    role: 'Student Journey',
    duration: '2011 - Present (15 years)',
    periodText: 'Cumulative Timeline',
    location: 'Continuous Academic Path',
    type: 'schooling',
    badge: '15-Year Continuous Academic Focus',
    description: 'Experienced in 15 years of uninterrupted educational and cognitive development. Established highly dependable discipline, structured problem solving, scientific reporting, and rigorous study schedules that paved the clear pathway to present-day Biotechnology engineering research pursuits.',
    skillsAcquired: ['Systematic Study Rhythms', 'Scholastic Ethics', 'Intellectual Curiosity', 'Scientific Writing Foundations'],
    keyHighlights: [
      'Maintained decade-long high participation rates in collaborative academic endeavors.',
      'Continuously advanced reading comprehension across microbiology, genetics, and code.',
      'Cultivated bilingual capabilities and strong research presentation profiles.'
    ]
  }
];

export default function ExperienceTimeline() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'professional' | 'academic' | 'volunteering' | 'schooling'>('all');
  const [expandedId, setExpandedId] = useState<string | null>('exp-techfest-iitb');

  const filteredItems = EXPERIENCE_DATA.filter(item => {
    return activeFilter === 'all' || item.type === activeFilter;
  });

  const getColorsByType = (type: string) => {
    switch (type) {
      case 'professional':
        return {
          bg: 'bg-amber-500/5 text-amber-700 border-amber-500/20',
          dot: 'bg-amber-600',
          border: 'border-l-amber-500'
        };
      case 'academic':
        return {
          bg: 'bg-emerald-500/5 text-emerald-700 border-emerald-500/20',
          dot: 'bg-emerald-600',
          border: 'border-l-emerald-500'
        };
      case 'volunteering':
        return {
          bg: 'bg-blue-500/5 text-blue-700 border-blue-500/20',
          dot: 'bg-blue-600',
          border: 'border-l-blue-500'
        };
      case 'schooling':
        return {
          bg: 'bg-purple-500/5 text-purple-700 border-purple-500/20',
          dot: 'bg-purple-600',
          border: 'border-l-purple-500'
        };
      default:
        return {
          bg: 'bg-slate-500/5 text-slate-700 border-slate-500/20',
          dot: 'bg-slate-600',
          border: 'border-l-slate-500'
        };
    }
  };

  return (
    <div className="space-y-12">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4 max-w-xl">
          <div className="flex items-center gap-2 text-brand-accent text-[9px] font-mono tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-brand-accent inline-block animate-pulse" />
            WORK EXPERIENCE & STUDENT STACK
          </div>
          <h2 className="font-serif italic text-4xl font-black text-[#1A1A1A] tracking-tight uppercase">
            Experiences & Internships
          </h2>
          <p className="text-sm text-brand-text-muted leading-relaxed font-normal">
            A comprehensive chronological ledger of clinical volunteering, national leadership commissions, advanced biotech visitor status, and continuous 15-year developmental academic paths.
          </p>
        </div>

        {/* CUMULATIVE METRIC PANEL */}
        <div className="bg-brand-surface border border-[#1A1A1A]/10 p-4 shrink-0 font-mono flex items-center justify-between gap-8 md:self-stretch">
          <div className="space-y-1 text-left">
            <span className="text-[8px] text-brand-text-muted tracking-widest block uppercase font-bold">TOTAL TENURE</span>
            <span className="text-2xl font-black text-[#1A1A1A] tracking-tight">15 <span className="text-xs font-semibold text-brand-text-muted">YEARS</span></span>
          </div>
          <div className="h-8 w-[1px] bg-[#1A1A1A]/10" />
          <div className="space-y-1 text-left">
            <span className="text-[8px] text-brand-text-muted tracking-widest block uppercase font-bold">COMMITTED STATIONS</span>
            <span className="text-2xl font-black text-brand-accent tracking-tight">8 <span className="text-xs font-semibold text-brand-text-muted">PLACES</span></span>
          </div>
        </div>
      </div>

      {/* FILTER CONTROL TAB PILL BAR */}
      <div className="bg-[#FAF9F5] border border-[#1A1A1A]/10 p-5 space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'FULL DOSSIER' },
              { id: 'professional', label: 'I. AMBASSADOR & WORK' },
              { id: 'academic', label: 'II. UNDERGRAD ACADEMICS' },
              { id: 'volunteering', label: 'III. LAB VOLUNTEERING' },
              { id: 'schooling', label: 'IV. SCHOOLING & FOUNDATIONS' }
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveFilter(tab.id as any);
                  setExpandedId(null);
                }}
                className={`py-1.5 px-3.5 font-sans text-[9px] tracking-wider uppercase font-black transition-all cursor-pointer border ${
                  activeFilter === tab.id
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                    : 'bg-white text-brand-text-muted border-[#1A1A1A]/10 hover:border-[#1A1A1A]/30 hover:text-[#1A1A1A]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="font-mono text-[8px] text-brand-text-muted tracking-widest font-bold uppercase hidden lg:block">
            ACTIVE LEVEL • SECURE CHRONO MATRIX
          </div>
        </div>
      </div>

      {/* CHRONOLOGICAL TIMELINE VERTICAL PATH */}
      <div className="relative pl-6 md:pl-8 border-l-2 border-[#1A1A1A]/10 space-y-12 py-3">
        
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, index) => {
            const isExpanded = expandedId === item.id;
            const style = getColorsByType(item.type);

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -15, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className={`border-2 border-l-4 ${style.border} p-6 relative transition-all group duration-300
                  ${item.id === 'exp-techfest-iitb'
                    ? 'bg-gradient-to-br from-amber-500/[0.03] via-white/95 to-blue-500/[0.03] border-amber-500/30 hover:border-amber-500/50 shadow-[0_4px_25px_rgba(217,119,6,0.06)] hover:shadow-[0_12px_40px_rgba(217,119,6,0.12)] hover:-translate-y-1'
                    : 'bg-white border-[#1A1A1A]/10 hover:border-[#1A1A1A]/30 shadow-xs hover:-translate-y-0.5'
                  }`}
              >
                {/* TIMELINE POINT CIRCLE DETECTOR */}
                <div className={`absolute -left-[33px] md:-left-[41px] top-7 w-4.5 h-4.5 rounded-full bg-[#FAFAF9] border-2 p-0.5 z-10 shadow-xs flex items-center justify-center transition-all duration-300 ${
                  item.id === 'exp-techfest-iitb'
                    ? 'border-[#D97706] group-hover:scale-125'
                    : 'border-[#1A1A1A]'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${style.dot} ${item.id === 'exp-techfest-iitb' ? 'animate-ping' : 'animate-pulse'}`} />
                </div>

                {/* CARD BODY CONTENT */}
                <div className="space-y-4">
                  {/* Category Stamp & Time Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1A1A1A]/5 pb-3">
                    <div className="space-y-1 text-left">
                      <div className="flex items-center gap-2">
                        <span className={`text-[8px] font-mono tracking-widest uppercase px-2 py-0.5 border ${style.bg}`}>
                          {item.badge}
                        </span>
                        
                        <span className="font-mono text-[8.5px] font-medium text-brand-text-muted uppercase">
                          {item.periodText}
                        </span>
                      </div>
                      
                      <h3 className="font-sans font-black text-lg text-[#1A1A1A] leading-tight group-hover:text-brand-accent transition-colors duration-200 flex items-center gap-2">
                        {item.id === 'exp-techfest-iitb' && (
                          <Award className="w-5 h-5 text-amber-600 shrink-0" />
                        )}
                        {item.role}
                      </h3>
                    </div>

                    <div className="flex items-center gap-1.5 p-1.5 bg-brand-surface border border-[#1A1A1A]/5 self-start sm:self-center">
                      <Clock className="w-3.5 h-3.5 text-brand-accent" />
                      <span className="font-mono text-[9px] font-black text-[#1A1A1A] tracking-wider leading-none">
                        {item.duration}
                      </span>
                    </div>
                  </div>

                  {/* Company & Location Metadata Banner */}
                  <div className="flex flex-wrap items-center gap-4 text-[10px] font-mono text-[#1A1A1A]/70 font-semibold">
                    <span className="flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-brand-accent" />
                      <strong>{item.company}</strong>
                    </span>
                    <span className="text-[#1A1A1A]/20">•</span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-brand-accent" />
                      {item.location}
                    </span>
                  </div>

                  {/* Complete Description statement */}
                  <p className="text-xs text-brand-text-muted leading-relaxed font-normal text-justify">
                    {item.description}
                  </p>

                  {/* INTERACTIVE TOGGLE ZONE DETAILED SPECS */}
                  <div className="space-y-4">
                    <button
                      type="button"
                      onClick={() => setExpandedId(isExpanded ? null : item.id)}
                      className="flex items-center justify-between w-full font-mono text-[8px] font-black uppercase tracking-widest text-[#1A1A1A] bg-[#FAF9F5] hover:bg-[#FAF9F5]/90 px-3.5 py-2 border border-[#1A1A1A]/10 cursor-pointer"
                    >
                      <span className="flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-brand-accent" />
                        {isExpanded ? '⊞ HIDE TECHNICAL LOG' : '⊟ VIEW KEY HIGHLIGHTS & SKILLS'}
                      </span>
                      <ChevronRight className={`w-3.5 h-3.5 text-brand-accent transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} />
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden space-y-4 pt-1"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 border-t border-[#1A1A1A]/5 pt-3">
                            
                            {/* Skills Tag block (Col 5) */}
                            <div className="md:col-span-5 space-y-2">
                              <span className="font-mono text-[7.5px] font-black tracking-widest text-brand-text-muted uppercase block">
                                SPECIALIZATION ACQUIRED
                              </span>
                              <div className="flex flex-wrap gap-1">
                                {item.skillsAcquired.map(skill => (
                                  <span 
                                    key={skill}
                                    className="px-2 py-0.5 text-[8.5px] font-mono tracking-wide bg-brand-surface border border-[#1A1A1A]/8 text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors duration-150"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Detailed bullet Highlights (Col 7) */}
                            <div className="md:col-span-7 space-y-2">
                              <span className="font-mono text-[7.5px] font-black tracking-widest text-brand-text-muted uppercase block">
                                CRITICAL LOG ACHIEVEMENTS
                              </span>
                              <ul className="space-y-1.5 text-2xs text-brand-text leading-relaxed font-sans font-medium">
                                {item.keyHighlights.map((high, hIdx) => (
                                  <li key={hIdx} className="flex items-start gap-2 text-justify">
                                    <Sparkles className="w-3 h-3 text-brand-accent shrink-0 mt-0.5" />
                                    <span>{high}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </AnimatePresence>

      </div>

    </div>
  );
}
