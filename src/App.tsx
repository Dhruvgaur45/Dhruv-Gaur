import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Wrench, 
  Code, 
  Shield, 
  Cloud, 
  Mail, 
  MapPin, 
  ArrowRight, 
  Linkedin, 
  Github, 
  Globe, 
  Check, 
  ChevronRight,
  Database,
  Activity,
  Dna,
  ArrowUp,
  FlaskConical,
  Award,
  RefreshCw
} from 'lucide-react';

// Data and components
import { SKILLS, CERTIFICATIONS, PROJECTS } from './data';
import { ContactSubmission, BiotechProject } from './types';
import DNASequencer from './components/DNASequencer';
import BioreactorMonitor from './components/BioreactorMonitor';
import LIMSTracker from './components/LIMSTracker';
import UpcomingPrototype from './components/UpcomingPrototype';

export default function App() {
  // Navigation & Scroll Tracking
  const [activeSection, setActiveSection] = useState('welcome');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Active Interactive Project Selection
  const [selectedProjectId, setSelectedProjectId] = useState('proj-sequencer');

  // Contact Form Submission States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Handle active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      // Toggle back to top button
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }

      const sections = ['welcome', 'intro', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll helper
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  // Submit Contact Form
  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);

    // Simulate database write delay
    setTimeout(() => {
      const newSubmission: ContactSubmission = {
        id: `sub-${Date.now()}`,
        name,
        email,
        message,
        timestamp: new Date().toISOString()
      };

      setSubmissions(prev => [newSubmission, ...prev]);
      setName('');
      setEmail('');
      setMessage('');
      setIsSubmitting(false);
      setShowSuccessToast(true);

      // Hide toast after 4s
      setTimeout(() => {
        setShowSuccessToast(false);
      }, 4000);
    }, 1200);
  };

  // Icon Resolver for Skills and Certs
  const renderIcon = (iconName: string, className: string = "w-5 h-5") => {
    switch (iconName) {
      case 'wrench': return <Wrench className={className} />;
      case 'code': return <Code className={className} />;
      case 'shield': return <Shield className={className} />;
      case 'cloud': return <Cloud className={className} />;
      case 'flask': return <FlaskConical className={className} />;
      case 'dna': return <Dna className={className} />;
      case 'terminal': return <Code className={className} />;
      case 'gauge': return <Database className={className} />;
      default: return <Wrench className={className} />;
    }
  };

  // Find active interactive project
  const currentProject = PROJECTS.find(p => p.id === selectedProjectId) || PROJECTS[0];

  return (
    <div className="min-h-screen bg-brand-bg text-[#1A1A1A] font-sans selection:bg-brand-accent/20 selection:text-brand-accent relative grid-bg">
      
      {/* Subtle paper-like warm background graphics */}
      <div className="absolute top-[8vh] left-[5%] opacity-[0.03] select-none pointer-events-none text-[#1A1A1A]">
        <h2 className="text-[180px] md:text-[280px] font-black leading-none tracking-tighter">01</h2>
      </div>

      {/* FIXED NAVIGATION HEADER */}
      <header className="fixed top-0 left-0 w-full z-55 bg-brand-bg/90 backdrop-blur-md border-b border-[#1A1A1A]/10 transition-all">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          
          {/* Logo brand */}
          <button 
            onClick={() => scrollTo('welcome')} 
            className="font-display font-black text-[#1A1A1A] text-base uppercase tracking-[0.2em] cursor-pointer hover:opacity-85 flex items-center gap-2"
          >
            <span className="w-2.5 h-2.5 bg-brand-accent inline-block"></span>
            THE CURATOR v2.4
          </button>

          {/* Links Center */}
          <nav className="hidden md:flex items-center gap-8 text-[11px] font-mono font-bold tracking-[0.2em] text-[#1A1A1A]/50 uppercase">
            {['welcome', 'intro', 'skills', 'projects', 'contact'].map((sect) => (
               <button
                 key={sect}
                 onClick={() => scrollTo(sect)}
                 className={`py-2 transition-all cursor-pointer relative ${
                   activeSection === sect ? 'text-brand-accent' : 'hover:text-[#1A1A1A]'
                 }`}
               >
                 {sect === 'welcome' ? 'Welcome' : sect === 'intro' ? 'Intro' : sect === 'skills' ? 'Skills' : sect === 'projects' ? 'Projects' : 'Contact'}
                 {activeSection === sect && (
                   <motion.span 
                     layoutId="activeNavIndicator"
                     className="absolute bottom-0 left-0 w-full h-[1.5px] bg-brand-accent"
                     transition={{ type: "spring", stiffness: 350, damping: 25 }}
                   />
                 )}
               </button>
            ))}
          </nav>

          {/* Call To Action Right */}
          <div>
            <button
              onClick={() => scrollTo('contact')}
              className="px-5 py-2.5 bg-[#1A1A1A] hover:bg-brand-accent text-white font-mono text-[10px] uppercase font-bold tracking-[0.15em] transition-all duration-300 flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              LET'S TALK <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1280px] mx-auto px-6 md:px-12 pt-20">
        
        {/* SECTION 1: HERO / WELCOME */}
        <section id="welcome" className="min-h-[85vh] flex flex-col justify-center py-16 relative">
          <div className="max-w-3xl space-y-8">
            
            {/* Availability Pill */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-[#1A1A1A]/10 text-[#1A1A1A] font-mono text-[9px] tracking-[0.25em] font-bold"
            >
              <span className="w-2 h-2 rounded-full bg-brand-accent"></span>
              EXCLUSIVE WORK IN PROGRESS
            </motion.div>
 
            {/* Display Headings */}
            <div className="space-y-4">
              <motion.h1 
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-serif italic text-5xl md:text-8xl font-black text-[#1A1A1A] tracking-tighter uppercase leading-[0.85]"
              >
                Dhruv <br className="sm:hidden" /><span className="not-italic text-brand-accent">Gaur.</span> <br />
                <span className="text-4xl md:text-6xl not-italic font-sans font-black tracking-tight leading-tighter block mt-4">Biomolecular Solutions.</span>
              </motion.h1>
 
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="font-sans text-brand-text-muted text-base md:text-lg max-w-2xl leading-relaxed font-normal"
              >
                Bridging the interface between tactile brutalist engineering structures and high-throughput biotechnology. Custom interactive pipelines engineered with modern biological workflows.
              </motion.p>
            </div>
 
            {/* Action buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-4"
            >
              <button
                onClick={() => scrollTo('projects')}
                className="bg-[#1A1A1A] hover:bg-brand-accent text-white font-mono font-bold text-xs tracking-widest px-8 py-4 transition-all cursor-pointer border border-[#1A1A1A] active:scale-95 duration-300"
              >
                ENGAGE PROTOTYPES
              </button>
              <button
                onClick={() => scrollTo('intro')}
                className="border border-[#1A1A1A]/20 hover:border-[#1A1A1A] bg-transparent text-[#1A1A1A] font-mono font-bold text-xs tracking-widest px-8 py-4 transition-all active:scale-95 cursor-pointer duration-300"
              >
                MUSEUM MANIFESTO
              </button>
            </motion.div>

          </div>
        </section>

        {/* SECTION 2: INTRO / PRECISION */}
        <section id="intro" className="py-24 border-t border-[#1A1A1A]/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
            
            {/* Heading left */}
            <div className="lg:col-span-5">
              <span className="bg-brand-accent text-white text-[9px] font-bold px-2 py-1 uppercase tracking-widest inline-block mb-3">Atelier Manifesto</span>
              <h2 className="font-serif text-3xl md:text-4xl font-black italic text-[#1A1A1A] tracking-tighter leading-none lg:max-w-xs uppercase">
                Tactile Brutalist Aesthetics.
              </h2>
            </div>
 
            {/* Paragraphs right */}
            <div className="lg:col-span-7 space-y-6 text-[#1A1A1A]/85 text-sm md:text-base leading-relaxed font-normal">
              <p>
                I am a biotechnology builder and interaction researcher who rejects complex clutter in favor of absolute spatial structure. Translating complex gene sequence datasets and IoT hardware diagnostics into bold, clear, high-contrast layouts.
              </p>
              <p>
                With a dual background in bioinformatics and fine-press publishing layouts, I build interfaces that restore gravity to the biotech ecosystem. Every block, border, and character is meticulously placed according to traditional print grid constraints.
              </p>
 
              {/* Stats Counters */}
              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-[#1A1A1A]/15">
                <div>
                  <p className="font-serif italic text-4xl font-black text-[#1A1A1A]">1+</p>
                  <p className="font-mono text-[10px] text-brand-text-muted tracking-[0.2em] mt-1 uppercase font-bold">YEARS OF RESEARCH</p>
                </div>
                <div>
                  <p className="font-serif italic text-4xl font-black text-[#1A1A1A]">5+</p>
                  <p className="font-mono text-[10px] text-brand-text-muted tracking-[0.2em] mt-1 uppercase font-bold">PIPELINES DEPLOYED</p>
                </div>
              </div>
            </div>
 
          </div>
        </section>

        {/* SECTION 3: CORE SKILLS */}
        <section id="skills" className="py-24 border-t border-[#1A1A1A]/10">
          <div className="space-y-12">
            
            {/* Header layout */}
            <div className="max-w-xl space-y-3">
              <span className="text-brand-accent text-[9px] font-bold tracking-widest uppercase block">Methodology Index</span>
              <h2 className="font-serif italic text-3xl font-black text-[#1A1A1A] uppercase tracking-tight">Core Skills</h2>
              <p className="text-sm text-brand-text-muted leading-relaxed font-normal">
                An indexical breakdown of structural core competencies leveraged across our lab pipelines.
              </p>
            </div>
 
            {/* Skills grid layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {SKILLS.map((skill, index) => (
                <motion.div
                  key={skill.id}
                  whileHover={{ y: -4, borderColor: '#1A1A1A' }}
                  className="bg-white p-8 rounded-none border border-[#1A1A1A]/10 flex flex-col justify-between space-y-6 transition-all duration-300"
                >
                  <div className="space-y-4">
                    {/* Icon Container */}
                    <div className="w-10 h-10 flex items-center justify-center bg-[#1A1A1A] text-white rounded-none">
                      {renderIcon(skill.iconName)}
                    </div>
                    {/* Title */}
                    <h3 className="font-sans text-base font-bold text-[#1A1A1A] tracking-tight py-1">
                      {skill.title}
                    </h3>
                    <p className="text-xs text-brand-text-muted leading-relaxed font-normal">
                      {skill.description}
                    </p>
                  </div>
 
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {skill.tags.map(tag => (
                      <span 
                        key={tag}
                        className="px-2.5 py-1 bg-brand-surface rounded-none text-[9px] font-mono font-bold text-[#1A1A1A] tracking-wider uppercase border border-[#1A1A1A]/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
 
          </div>
        </section>

        {/* SECTION 4: CERTIFICATIONS */}
        <section className="py-24 border-t border-[#1A1A1A]/10">
          <div className="space-y-12">
            
            {/* Header */}
            <div className="max-w-xl space-y-3">
              <span className="text-brand-accent text-[9px] font-bold tracking-widest uppercase block">Verified Accreditations</span>
              <h2 className="font-serif italic text-3xl font-black text-[#1A1A1A] tracking-tight uppercase">Certifications</h2>
              <p className="text-sm text-brand-text-muted leading-relaxed font-normal">
                Accreditations verifying high standards of analysis, execution accuracy, and structure.
              </p>
            </div>
 
            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {CERTIFICATIONS.map((cert) => (
                <div
                  key={cert.id}
                  className="bg-white p-6 rounded-none border border-[#1A1A1A]/10 flex items-start gap-4 hover:border-[#1A1A1A]/50 transition-all duration-300"
                >
                  <div className="w-9 h-9 flex items-center justify-center bg-[#1A1A1A] text-white shrink-0">
                    {renderIcon(cert.iconName, "w-4.5 h-4.5")}
                  </div>
                  <div className="space-y-1.5 min-w-0">
                    <h4 className="font-sans font-bold text-sm text-[#1A1A1A] truncate">{cert.title}</h4>
                    <p className="font-mono text-[9px] text-brand-accent tracking-[0.2em] font-bold uppercase">{cert.issuer}</p>
                    <p className="text-2xs text-brand-text-muted leading-relaxed font-normal">{cert.description}</p>
                  </div>
                </div>
              ))}
            </div>
 
          </div>
        </section>

        {/* SECTION 5: INTERACTIVE PROJECTS SHOWCASE */}
        <section id="projects" className="py-24 border-t border-[#1A1A1A]/10">
          <div className="space-y-12">
            
            {/* Custom Header with Project Metric summaries */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-xl space-y-3">
                <span className="font-mono text-2xs text-brand-accent tracking-widest font-bold">THE ATELIER DECK (LIVE ISSUES)</span>
                <h2 className="font-serif italic text-3xl font-black text-[#1A1A1A] uppercase tracking-tight">Technical Prototypes</h2>
                <p className="text-sm text-brand-text-muted leading-relaxed font-normal">
                  Real client-side models evaluating high-performance laboratory interface patterns. Select an issue to inspect details.
                </p>
              </div>
 
              {/* Sub-selectors */}
              <div className="flex flex-wrap gap-2.5">
                {PROJECTS.map((proj) => {
                  const isActive = selectedProjectId === proj.id;
                  return (
                    <button
                      key={proj.id}
                      onClick={() => setSelectedProjectId(proj.id)}
                      className={`px-4 py-2 text-xs font-mono border transition-all cursor-pointer flex items-center gap-2 rounded-none uppercase tracking-widest font-bold ${
                        isActive 
                          ? 'bg-brand-accent text-white border-transparent' 
                          : 'bg-white hover:bg-brand-surface text-brand-text border-[#1A1A1A]/15'
                      }`}
                    >
                      {renderIcon(proj.iconName, "w-3.5 h-3.5")}
                      {proj.id === 'proj-sequencer' ? 'SEQUENCE_MAP' : proj.id === 'proj-bioreactor' ? 'BIOREACTOR_IOT [UPCOMING]' : 'LIMS_PLATE_96 [UPCOMING]'}
                    </button>
                  );
                })}
              </div>
            </div>
 
            {/* Current Selected Project Brief info */}
            <div className="bg-white p-6 border border-[#1A1A1A]/10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center rounded-none shadow-sm">
              
              <div className="md:col-span-8 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[9px] bg-brand-accent text-white px-2 py-0.5 font-semibold tracking-wider uppercase">
                    {currentProject.tagline}
                  </span>
                  {currentProject.id === 'proj-sequencer' ? (
                    <span className="text-2xs font-mono text-emerald-600 font-bold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                      ACTIVE DECK STREAM
                    </span>
                  ) : (
                    <span className="text-2xs font-mono text-brand-accent font-bold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse"></span>
                      UPCOMING COMPILATION PIPELINE
                    </span>
                  )}
                </div>
                <h3 className="font-serif italic text-2xl font-black text-[#1A1A1A]">
                  {currentProject.title}
                </h3>
                <p className="text-xs text-brand-text-muted font-normal leading-relaxed max-w-2xl">
                  {currentProject.description} {currentProject.longDescription}
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {currentProject.tags.map(tag => (
                    <span key={tag} className="px-2.5 py-1 bg-brand-bg rounded-none text-[9px] font-mono text-brand-text font-bold uppercase border border-[#1A1A1A]/5">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
 
              <div className="md:col-span-4 bg-brand-bg p-5 rounded-none border border-[#1A1A1A]/10 flex flex-col justify-between h-full space-y-4">
                <div>
                  <span className="text-[9px] font-mono text-brand-text-muted block select-none uppercase tracking-widest font-bold">
                    PLATE SYSTEM ACCURACY RATING
                  </span>
                  <p className="text-lg font-bold text-brand-text font-serif italic mt-1 tracking-tight">
                    {currentProject.scientificMetric}
                  </p>
                </div>
                <div className="text-2xs font-mono text-[#1A1A1A]/60 leading-relaxed pt-2 border-t border-[#1A1A1A]/10">
                  Calculated automatically using mock sensor feedback channels.
                </div>
              </div>
 
            </div>

            {/* Interactive Dynamic Simulator Area */}
            <div className="mt-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedProjectId}
                  initial={{ opacity: 0, scale: 0.98, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: -10 }}
                  transition={{ duration: 0.4 }}
                >
                  {selectedProjectId === 'proj-sequencer' && (
                    <DNASequencer scientificMetric={currentProject.scientificMetric} />
                  )}
                  {selectedProjectId === 'proj-bioreactor' && (
                    <UpcomingPrototype projectId="proj-bioreactor" scientificMetric={currentProject.scientificMetric} />
                  )}
                  {selectedProjectId === 'proj-lims' && (
                    <UpcomingPrototype projectId="proj-lims" scientificMetric={currentProject.scientificMetric} />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </section>

        {/* SECTION 6: CONTACT & FORM */}
        <section id="contact" className="py-24 border-t border-[#1A1A1A]/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
            
            {/* Left side text and direct emails */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <span className="text-brand-accent text-[9px] font-bold tracking-widest uppercase block">Laboratory Inquiries</span>
                <h2 className="font-serif italic text-4xl md:text-5xl font-black text-[#1A1A1A] tracking-tighter uppercase leading-none">
                  Let’s Build<br />Something.
                </h2>
                <p className="text-sm text-brand-text-muted leading-relaxed font-normal max-w-sm">
                  We are open to strategic layout consultations, biotech interface engineering assignments, and custom sequence visualizations.
                </p>
              </div>
 
              {/* Direct Info cards */}
              <div className="space-y-4 max-w-sm">
                
                {/* Email link card */}
                <a 
                  href="mailto:dggaur385@gmail.com"
                  className="bg-white hover:bg-brand-surface p-4 rounded-none border border-[#1A1A1A]/10 flex items-center gap-4 transition-all group cursor-pointer"
                >
                  <div className="w-10 h-10 flex items-center justify-center bg-[#1A1A1A] text-white rounded-none transition-all">
                    <Mail className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <p className="text-[9px] font-mono text-brand-text-muted uppercase tracking-widest font-bold">SEND DIRECT EMAIL</p>
                    <p className="font-mono text-xs text-[#1A1A1A] font-bold mt-0.5 group-hover:text-brand-accent transition-colors">
                      dggaur385@gmail.com
                    </p>
                  </div>
                </a>
 
                {/* Location Card */}
                <div className="bg-white p-4 rounded-none border border-[#1A1A1A]/10 flex items-center gap-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-[#1A1A1A] text-white rounded-none">
                    <MapPin className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <p className="text-[9px] font-mono text-brand-text-muted uppercase tracking-widest font-bold">COORDINATES LOCATION</p>
                    <p className="font-mono text-xs text-[#1A1A1A] font-bold mt-0.5">
                      BULANDSHAHR / INDIA
                    </p>
                  </div>
                </div>
 
              </div>
            </div>
 
            {/* Right side interactive Form */}
            <div className="lg:col-span-7 bg-white p-8 rounded-none border border-[#1A1A1A]/10 relative overflow-hidden shadow-sm">
              
              <form onSubmit={handleSubmitContact} className="space-y-6">
                
                {/* Name */}
                <div className="space-y-1">
                  <label htmlFor="form-name" className="text-[9px] font-mono font-bold text-brand-text-muted tracking-[0.2em]">
                    NAME REGISTER
                  </label>
                  <input
                    type="text"
                    id="form-name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="E.g., Julianne Voss"
                    disabled={isSubmitting}
                    className="w-full bg-transparent border-b border-[#1A1A1A]/10 hover:border-[#1A1A1A]/30 focus:border-brand-accent text-sm text-[#1A1A1A] py-2 focus:outline-none transition-colors duration-200"
                  />
                </div>
 
                {/* Email */}
                <div className="space-y-1">
                  <label htmlFor="form-email" className="text-[9px] font-mono font-bold text-brand-text-muted tracking-[0.2em]">
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    id="form-email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    disabled={isSubmitting}
                    className="w-full bg-transparent border-b border-[#1A1A1A]/10 hover:border-[#1A1A1A]/30 focus:border-brand-accent text-sm text-[#1A1A1A] py-2 focus:outline-none transition-colors duration-200"
                  />
                </div>
 
                {/* Message */}
                <div className="space-y-1">
                  <label htmlFor="form-message" className="text-[9px] font-mono font-bold text-brand-text-muted tracking-[0.2em]">
                    MESSAGE RECORD
                  </label>
                  <textarea
                    id="form-message"
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe laboratory scope or blueprint requirements..."
                    disabled={isSubmitting}
                    className="w-full bg-transparent border-b border-[#1A1A1A]/10 hover:border-[#1A1A1A]/30 focus:border-brand-accent text-sm text-[#1A1A1A] py-2 focus:outline-none transition-colors duration-200 resize-none"
                  />
                </div>
 
                {/* Submit button */}
                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-brand-text-muted leading-tight max-w-xs">
                    Form compiles into local storage and prompts instant client verification checkpoints.
                  </span>
                  <button
                    type="submit"
                    disabled={isSubmitting || !name || !email || !message}
                    className="bg-[#1A1A1A] hover:bg-brand-accent disabled:bg-brand-surface disabled:text-[#1A1A1A]/30 text-white font-mono font-bold text-xs tracking-widest px-6 py-3 rounded-none transition-all active:scale-95 cursor-pointer flex items-center gap-1.5 shrink-0"
                  >
                    {isSubmitting ? (
                      <>
                        COMPILING...
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      </>
                    ) : (
                      <>
                        SEND MESSAGE
                      </>
                    )}
                  </button>
                </div>
              </form>
 
              {/* Submissions list visual logs (if any exist) */}
              {submissions.length > 0 && (
                <div className="mt-8 pt-6 border-t border-[#1A1A1A]/15 space-y-3">
                  <p className="text-[9px] font-mono font-bold text-brand-text-muted tracking-widest uppercase">
                    COMPILATION SUBMISSIONS CACHE LOGS
                  </p>
                  <div className="space-y-2 max-h-32 overflow-y-auto scrollbar-thin">
                    {submissions.map((sub) => (
                      <div key={sub.id} className="bg-brand-bg border border-[#1A1A1A]/10 p-2.5 rounded-none text-2xs font-mono flex justify-between items-start gap-3">
                        <div>
                          <p className="text-[#1A1A1A] font-bold">{sub.name} &lt;{sub.email}&gt;</p>
                          <p className="text-brand-text-muted mt-0.5 line-clamp-1">{sub.message}</p>
                        </div>
                        <span className="text-brand-accent text-[10px] font-bold shrink-0 select-none">✔ STAGE_200</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
 
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER SECTION */}
      <footer className="border-t border-[#1A1A1A]/10 bg-white/20 mt-12">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Logo brand */}
          <button 
            onClick={() => scrollTo('welcome')} 
            className="font-display font-black text-[#1A1A1A] text-base uppercase tracking-[0.2em] cursor-pointer hover:opacity-80 flex items-center gap-1.5"
          >
            <span className="w-2 h-2 bg-brand-accent inline-block"></span>
            THE CURATOR D.G.
          </button>
 
          {/* Nav socials center */}
          <div className="flex items-center gap-6 text-[10px] font-mono font-bold tracking-widest text-[#1A1A1A]/70">
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-brand-accent transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Linkedin className="w-3.5 h-3.5 text-brand-accent" /> LINKEDIN
            </a>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-brand-accent transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Github className="w-3.5 h-3.5 text-brand-accent" /> GITHUB
            </a>
            <a 
              href="https://dribbble.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-brand-accent transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-brand-accent" /> DRIBBBLE
            </a>
          </div>
 
          {/* Copyright Right */}
          <div className="text-[10px] font-mono text-brand-text-muted">
            © {new Date().getFullYear()} Dhruv Gaur. All rights reserved.
          </div>
 
        </div>
      </footer>

      {/* BACK TO TOP BUTTON */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 w-10 h-10 items-center justify-center flex bg-brand-accent text-brand-bg rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all cursor-pointer z-50 text-brand-bg font-bold border border-brand-accent/20"
            title="Scroll to top of screen"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* FLOAT SUCCESS TOAST NOTIFIER */}
      <AnimatePresence>
        {showSuccessToast && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.9 }}
            className="fixed bottom-6 left-6 z-55 bg-white border border-brand-accent text-brand-text p-4 rounded-none shadow-xl flex items-center gap-3.5 max-w-sm"
          >
            <div className="w-8 h-8 bg-brand-accent/20 text-brand-accent flex items-center justify-center shrink-0 border border-brand-accent/10">
              <Check className="w-5 h-5" />
            </div>
            <div>
              <p className="font-serif italic font-bold text-xs text-[#1A1A1A]">MESSAGE RECORDED</p>
              <p className="text-[11px] text-brand-text-muted mt-0.5 font-sans leading-tight">
                Your parameters were sent! Cache registers successfully configured.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
