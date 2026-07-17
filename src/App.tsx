import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, Variants } from 'motion/react';
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
  RefreshCw,
  Cpu,
  Search,
  Sliders,
  Clock,
  Flag,
  Calendar,
  Users,
  Terminal,
  Lock,
  Unlock,
  Trash2,
  Copy,
  Key,
  BookOpen,
  Microscope,
  AlertTriangle,
  Workflow,
  Sun,
  Moon,
  X
} from 'lucide-react';

// Data and components
import { SKILLS, CERTIFICATIONS } from './data';
import { ContactSubmission } from './types';
import WorkingResearch from './components/WorkingResearch';
import Logo from './components/Logo';
import MaintenancePage from './components/MaintenancePage';
import AcademicTimeline from './components/AcademicTimeline';
import CertificationCollection from './components/CertificationCollection';
import ExperienceTimeline from './components/ExperienceTimeline';
import ResearchMap from './components/ResearchMap';
import MicroscopeCellsBackground from './components/MicroscopeCellsBackground';
import BioDataVizBackground from './components/BioDataVizBackground';
import BiotechScheduler from './components/BiotechScheduler';
import AIToolsExpertise from './components/AIToolsExpertise';
import { HeroScene } from './components/HeroScene';
import WelcomeAnimation from './components/WelcomeAnimation';
import WelcomeGuide from './components/WelcomeGuide';
import AdminPortal from './components/AdminPortal';
import PipelineConsole from './components/PipelineConsole';

// Framer Motion variants for core skills tag staggering
const tagContainerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03
    }
  }
};

const tagItemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85, y: 5 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 380,
      damping: 24
    }
  }
};

export default function App() {
  // Scroll progress for beautiful top scanner line
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Welcome Loading Animation State
  const [showWelcome, setShowWelcome] = useState(() => {
    try {
      return sessionStorage.getItem('hasSeenWelcome') !== 'true';
    } catch {
      return true;
    }
  });

  // Navigation & Scroll Tracking
  const [activeSection, setActiveSection] = useState('welcome');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Initialize light/dark theme, defaulting to light mode as requested
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('app_theme');
      if (saved === 'dark') return 'dark';
      return 'light'; // default to light theme
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    if (theme === 'dark') {
      window.document.documentElement.classList.add('dark');
      window.document.documentElement.classList.remove('light');
    } else {
      window.document.documentElement.classList.add('light');
      window.document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('app_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Contact Form Submission States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Dynamic Skill Filter & Search
  const [selectedSkillCategory, setSelectedSkillCategory] = useState('All');
  const [skillSearch, setSkillSearch] = useState('');
  
  // Copyright Notice Modal State
  const [showCopyrightModal, setShowCopyrightModal] = useState(true);

  // Floating Achievement Badge State
  const [isFloatingDismissed, setIsFloatingDismissed] = useState(false);
  const [isFloatingHovered, setIsFloatingHovered] = useState(false);

  // Patriotic Youth Ambassador Modal State
  const [showAmbassadorModal, setShowAmbassadorModal] = useState(false);

  // Google Developer Community Pre-organizer Modal State
  const [showGDGModal, setShowGDGModal] = useState(false);

  // Academic Timeline Page State
  const [showTimelinePage, setShowTimelinePage] = useState(false);

  // Maintenance Page State
  const [isMaintenanceActive, setIsMaintenanceActive] = useState(false);
  const [showAdminPortal, setShowAdminPortal] = useState(false);
  const [systemStatus, setSystemStatus] = useState<any>(null);

  const fetchSystemStatus = async () => {
    try {
      const offset = localStorage.getItem('virtual_time_offset') || '0';
      const clientTime = new Date(Date.now() + parseInt(offset, 10)).toISOString();
      const res = await fetch(`/api/admin/status?clientTime=${encodeURIComponent(clientTime)}`);
      if (res.ok) {
        const data = await res.json();
        setSystemStatus(data);
      }
    } catch (err) {
      console.error("Failed to load systems gateway parameters:", err);
    }
  };

  useEffect(() => {
    fetchSystemStatus();
  }, []);

  const SectionGateWrapper = ({ 
    id, 
    name, 
    children 
  }: { 
    id: string; 
    name: string; 
    children: React.ReactNode 
  }) => {
    const tabConfig = systemStatus?.tabs?.find((t: any) => t.id === id);
    const isClosed = tabConfig?.status === "Temporarily Closed";

    if (isClosed) {
      return (
        <div className="border border-[#1A1A1A]/10 bg-[#FAF9F5] p-8 md:p-12 text-center space-y-4 my-8 select-none relative overflow-hidden max-w-4xl mx-auto rounded-none">
          <div className="absolute inset-0 bg-[radial-gradient(#1A1A1A_1.5px,transparent_1.5px)] [background-size:20px_20px] opacity-[0.02] pointer-events-none" />
          <div className="mx-auto w-12 h-12 bg-[#1A1A1A]/5 border border-[#1A1A1A]/10 flex items-center justify-center rounded-none text-brand-accent">
            <Wrench className="w-5 h-5 animate-pulse text-amber-600" />
          </div>
          <div className="max-w-md mx-auto space-y-2">
            <h3 className="font-serif italic font-black text-xl uppercase tracking-tight text-neutral-800">
              {name} Section Temporarily Closed
            </h3>
            <p className="text-[10px] text-neutral-500 font-mono uppercase tracking-widest font-semibold text-amber-700/80">
              Biotech Lab Rework Active
            </p>
            <p className="text-xs text-neutral-600 leading-relaxed font-sans max-w-sm mx-auto">
              {tabConfig.message || "This section is temporarily unavailable due to rework. Please check again later."}
            </p>
            {tabConfig.reason && (
              <div className="text-[9px] uppercase font-mono text-zinc-100 bg-amber-600/90 py-1 px-2.5 inline-block font-bold mt-1">
                Reason: {tabConfig.reason}
              </div>
            )}
            {tabConfig.endTime && (
              <div className="text-[9.5px] font-mono text-zinc-400 mt-2">
                Estimated Restoration: {new Date(tabConfig.endTime).toLocaleString()}
              </div>
            )}
          </div>
        </div>
      );
    }

    return <>{children}</>;
  };

  // Owner Authentication States
  const [isOwner, setIsOwner] = useState<boolean>(() => {
    return localStorage.getItem('is_owner_authorized') === 'true';
  });
  const [showOwnerModal, setShowOwnerModal] = useState<boolean>(false);
  const [authEmail, setAuthEmail] = useState<string>('');
  const [authPasscode, setAuthPasscode] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');
  const [securityPin, setSecurityPin] = useState<string>(() => {
    return localStorage.getItem('owner_security_pin') || 'dggaur2026';
  });
  const [pinChangeSuccess, setPinChangeSuccess] = useState<string>('');
  const [pinChangeError, setPinChangeError] = useState<string>('');
  const [newPinInput, setNewPinInput] = useState<string>('');

  // Owner Floating Inbox States
  const [isInboxExpanded, setIsInboxExpanded] = useState<boolean>(false);
  const [inboxSearch, setInboxSearch] = useState<string>('');

  // IST clock tracking
  const [currTime, setCurrTime] = useState(new Date());

  // Interactive Microscopic Feed Sample Slides
  const microscopeSlides = [
    {
      id: 'gfp-cells',
      name: "CELL_GFP_402",
      type: "Green Fluorescent Protein Expression",
      mag: "15,000X",
      stretches: "3.4nm/turn helix",
      focus: "98.4%",
      aperture: "f/1.4",
      microns: "12µm",
      description: "Active expression of bioluminescent markers inside cytoplasm. Organelles visible under high resolution scanning electron microscopy.",
      url: "/src/assets/images/cellular_hero_banner_1780065823241.png"
    },
    {
      id: 'mitosis-cell',
      name: "CELL_DIV_880",
      type: "Cytoplasmic Membranes Division",
      mag: "25,000X",
      stretches: "Chromatid pull asters",
      focus: "99.1%",
      aperture: "f/1.8",
      microns: "8µm",
      description: "Microscope slide capturing late-phase mitosis cytokinesis, cellular cleavage, and cytoplasmic fibers with fluorescent green contrast wash.",
      url: "/src/assets/images/petri_dish_culture_1780065844731.png"
    },
    {
      id: 'dna-assembly',
      name: "NAN_DNA_911",
      type: "DNA Nanotechnology Helix Matrix",
      mag: "45,000X",
      stretches: "Hydrogen base h-bonds",
      focus: "97.8%",
      aperture: "f/1.2",
      microns: "3.4nm",
      description: "Self-assembling synthetic DNA strands with fluorescent-dyed adenines and thymines forming complete crystalline molecular links.",
      url: "/src/assets/images/dna_double_helix_1780065864560.png"
    }
  ];

  const [activeSlideIdx, setActiveSlideIdx] = useState(0);
  const [microContrast, setMicroContrast] = useState<number>(100);
  const [scanLinesActive, setScanLinesActive] = useState<boolean>(true);


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Handle active section on scroll
  // Handle scroll-spy and back-to-top
  useEffect(() => {
    const handleScroll = () => {
      // Toggle back to top button
      setShowScrollTop(window.scrollY > 400);
    };

    const sections = ['welcome', 'intro', 'skills', 'experience', 'certifications', 'research', 'research_map', 'ai_tools', 'planner', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.2, rootMargin: '-120px 0px -20% 0px' }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  // Control background scroll when copyright modal is open
  useEffect(() => {
    if (showCopyrightModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showCopyrightModal]);

  // Fetch existing submissions from server or local storage on mount
  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await fetch('/api/contact');
        if (res.ok) {
          const data = await res.json();
          setSubmissions(data);
          localStorage.setItem('cached_submissions', JSON.stringify(data));
        } else {
          throw new Error('Server returned non-200 status');
        }
      } catch (err) {
        console.warn('Could not contact message API server; loading local database cache:', err);
        const saved = localStorage.getItem('cached_submissions');
        if (saved) {
          try {
            setSubmissions(JSON.parse(saved));
          } catch {
            setSubmissions([]);
          }
        }
      }
    };
    fetchSubmissions();
  }, []);

  // Smooth scroll helper
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  // Submit Contact Form
  const handleSubmitContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);

    const submissionPayload = { name, email, message };

    try {
      // 1. Post records to Express API server (preserves files on server)
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionPayload),
      });

      let savedSubmission;
      if (res.ok) {
        const responseData = await res.json();
        savedSubmission = responseData.submission;
      } else {
        throw new Error('Backend returned error saving submission');
      }

      // Add to local state & localStorage backup
      setSubmissions(prev => {
        const updated = [savedSubmission, ...prev];
        localStorage.setItem('cached_submissions', JSON.stringify(updated));
        return updated;
      });

      // Show success toast
      setShowSuccessToast(true);

      // Clear form fields
      setName('');
      setEmail('');
      setMessage('');

      // Hide toast after 4s
      setTimeout(() => {
        setShowSuccessToast(false);
      }, 4000);

    } catch (err) {
      console.error('API submission failed, using local fallback:', err);
      
      // Fallback: Record locally in browser
      const localSubmission: ContactSubmission = {
        id: `sub-local-${Date.now()}`,
        name,
        email,
        message,
        timestamp: new Date().toISOString()
      };

      setSubmissions(prev => {
        const updated = [localSubmission, ...prev];
        localStorage.setItem('cached_submissions', JSON.stringify(updated));
        return updated;
      });

      setShowSuccessToast(true);

      setName('');
      setEmail('');
      setMessage('');

      setTimeout(() => {
        setShowSuccessToast(false);
      }, 4000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete message record helper (runs on server or falls back to client cache)
  const handleDeleteSubmission = async (id: string) => {
    try {
      const res = await fetch(`/api/contact/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setSubmissions(prev => {
          const updated = prev.filter(sub => sub.id !== id);
          localStorage.setItem('cached_submissions', JSON.stringify(updated));
          return updated;
        });
      } else {
        throw new Error('Server returned error status on delete');
      }
    } catch (err) {
      console.warn('API delete failed, implementing cache fallback removal:', err);
      setSubmissions(prev => {
        const updated = prev.filter(sub => sub.id !== id);
        localStorage.setItem('cached_submissions', JSON.stringify(updated));
        return updated;
      });
    }
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
      case 'cpu': return <Cpu className={className} />;
      case 'terminal': return <Code className={className} />;
      case 'gauge': return <Database className={className} />;
      case 'book':
      case 'book-open': return <BookOpen className={className} />;
      case 'microscope': return <Microscope className={className} />;
      case 'globe': return <Globe className={className} />;
      case 'alert-triangle': return <AlertTriangle className={className} />;
      case 'workflow': return <Workflow className={className} />;
      default: return <Wrench className={className} />;
    }
  };



  if (showAdminPortal) {
    return (
      <AdminPortal 
        onClose={() => setShowAdminPortal(false)} 
        onStatusChange={fetchSystemStatus} 
      />
    );
  }

  if (systemStatus?.maintenance?.enabled) {
    return (
      <MaintenancePage 
        onBypass={() => {}} 
        customMessage={systemStatus.maintenance.customMessage} 
        reason={systemStatus.maintenance.reason} 
        endTime={systemStatus.maintenance.endTime} 
        onTimerEnd={fetchSystemStatus}
      />
    );
  }

  if (isMaintenanceActive) {
    return <MaintenancePage onBypass={() => setIsMaintenanceActive(false)} />;
  }

  if (showTimelinePage) {
    return (
      <AcademicTimeline 
        isOpen={showTimelinePage} 
        onClose={() => setShowTimelinePage(false)} 
        linkedinUrl="https://www.linkedin.com/in/dhruv-gaur-85ab12384"
      />
    );
  }

  return (
    <div className="min-h-screen bg-brand-bg text-[#1A1A1A] font-sans selection:bg-brand-accent/20 selection:text-brand-accent relative grid-bg overflow-x-hidden">
      
      {/* ----------------- INTRO WELCOME ANIMATION SPLASH SYSTEM ----------------- */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            key="welcome-loader"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0, 
              y: -40,
              filter: "blur(12px)",
              transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
            }}
            className="fixed inset-0 z-[9999]"
          >
            <WelcomeAnimation onComplete={() => setShowWelcome(false)} />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* ----------------- INTERACTIVE VOICE WELCOME GUIDE ----------------- */}
      {!showWelcome && <WelcomeGuide />}
      
      {/* ----------------- INTERACTIVE MICROSCOPIC FLOATING CELLS Backplane ----------------- */}
      <MicroscopeCellsBackground />
      <BioDataVizBackground />

      {/* ----------------- LABORATORY LASER INTENSITY SCAN LINE (DEEP BACKPLANE) ----------------- */}
      {/* Laser scan line removed to resolve auto-movement loops */}

      {/* ----------------- LABORATORY BIOMINERAL PULSING RADIAL ACCENTS ----------------- */}
      <div className="absolute top-[25vh] left-[20%] w-[350px] h-[350px] bg-[#10B981]/[0.03] rounded-full blur-[80px] pointer-events-none z-0 select-none lg:animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute top-[160vh] right-[15%] w-[450px] h-[450px] bg-[#3B82F6]/[0.025] rounded-full blur-[100px] pointer-events-none z-0 select-none lg:animate-pulse" style={{ animationDuration: '12s' }} />
      <div className="absolute bottom-[80vh] left-[10%] w-[380px] h-[380px] bg-[#10B981]/[0.02] rounded-full blur-[90px] pointer-events-none z-0 select-none lg:animate-pulse" style={{ animationDuration: '10s' }} />

      {/* ----------------- BIOLOGICAL BACKGROUND FIGURES ----------------- */}
      {/* Fig A: DNA Transcription Double Helix blueprint in Hero region */}
      <div className="hidden md:block absolute top-[12vh] right-[2%] md:right-[5%] w-[260px] md:w-[420px] h-auto select-none pointer-events-none opacity-[0.065] md:opacity-[0.085] text-brand-accent transition-all duration-300 z-0">
        <svg className="w-full h-auto" viewBox="0 0 200 600" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="20" y1="50" x2="180" y2="50" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
          <line x1="100" y1="20" x2="100" y2="580" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5 5" />
          <text x="50%" y="40" textAnchor="middle" fill="currentColor" className="font-mono text-[7px] font-black tracking-widest uppercase">HELIX MAIN TRANSCRIPTION AXIS [3.4nm/TURN]</text>
          
          <path 
            d="M50,100 C150,150 150,200 50,250 C-50,300 -50,350 50,400 C150,450 150,500 50,550" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5"
            strokeDasharray="8 4"
          />
          <path 
            d="M150,100 C50,150 50,200 150,250 C250,300 250,350 150,400 C50,450 50,500 150,550" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeDasharray="4 4"
          />
          
          <line x1="68" y1="120" x2="132" y2="120" stroke="currentColor" strokeWidth="1.2" />
          <circle 
            cx="68" cy="120" r="3" 
            fill="currentColor" 
          />
          <circle cx="132" cy="120" r="3" fill="none" stroke="currentColor" />
          <text x="80" y="116" fill="currentColor" className="font-mono text-[6.5px]">A == T [H2]</text>
          
          <line x1="90" y1="175" x2="110" y2="175" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="90" cy="175" r="3" fill="none" stroke="currentColor" />
          <circle 
            cx="110" cy="175" r="3" 
            fill="currentColor" 
          />
          <text x="94" y="171" fill="currentColor" className="font-mono text-[6px]">C ≡ G [H3]</text>
 
          <line x1="68" y1="230" x2="132" y2="230" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="68" cy="230" r="3" fill="none" stroke="currentColor" />
          <circle 
            cx="132" cy="230" r="3" 
            fill="currentColor" 
          />
          <text x="80" y="226" fill="currentColor" className="font-mono text-[6.5px]">G ≡ C [H3]</text>
 
          <line x1="68" y1="370" x2="132" y2="370" stroke="currentColor" strokeWidth="1.2" />
          <circle 
            cx="68" cy="370" r="3" 
            fill="currentColor" 
          />
          <circle cx="132" cy="370" r="3" fill="none" stroke="currentColor" />
          <text x="80" y="366" fill="currentColor" className="font-mono text-[6.5px]">T == A [H2]</text>
 
          <line x1="90" y1="425" x2="110" y2="425" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="90" cy="425" r="3" fill="currentColor" />
          <circle cx="110" cy="425" r="3" fill="currentColor" />
 
          <line x1="68" y1="480" x2="132" y2="480" stroke="currentColor" strokeWidth="1.2" />
          <text x="80" y="476" fill="currentColor" className="font-mono text-[6.5px]">A == T [H2]</text>
 
          <path d="M20,100 L15,100 M20,200 L15,200 M20,300 L15,300 M20,400 L15,400 M20,500 L15,500" stroke="currentColor" strokeWidth="1" />
          <text x="5" y="103" fill="currentColor" className="font-mono text-[6px]">5' CAP</text>
          <text x="5" y="503" fill="currentColor" className="font-mono text-[6px]">3' POLY-A</text>
        </svg>
      </div>
 
      {/* Fig B: Adenine-Thymine Molecular bond structure down the page */}
      <div className="absolute top-[90vh] left-[1%] md:left-[3%] w-[250px] md:w-[380px] h-auto select-none pointer-events-none opacity-[0.065] md:opacity-[0.085] text-brand-text-muted transition-all duration-300 z-0">
        <svg className="w-full h-auto" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <motion.path 
            d="M120,80 L160,60 L200,80 L200,130 L160,150 L120,130 Z" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.2" 
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
          <path d="M126,86 L158,68 L194,86 M194,124 L160,141" fill="none" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 2" />
          <path d="M200,80 L235,95 L220,135 L200,130" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <motion.path 
            d="M290,100 L325,80 L360,100 L360,150 L325,170 L290,150 Z" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.2"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: 0.3, ease: "easeOut" }}
          />
          
          <line x1="200" y1="100" x2="290" y2="100" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" />
          <text x="245" y="94" fill="currentColor" className="font-mono text-[6.5px]" textAnchor="middle">N-H...O H-BOND</text>
          
          <line x1="200" y1="130" x2="290" y2="130" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" />
          <text x="245" y="124" fill="currentColor" className="font-mono text-[6.5px]" textAnchor="middle">N...H-N H-BOND</text>
 
          <circle cx="120" cy="80" r="5.5" fill="var(--color-brand-bg)" stroke="currentColor" strokeWidth="1" />
          <text x="120" y="82" fill="currentColor" className="font-mono text-[6.5px] font-black" textAnchor="middle">N</text>
 
          <circle cx="160" cy="60" r="5.5" fill="var(--color-brand-bg)" stroke="currentColor" strokeWidth="1" />
          <text x="160" y="62" fill="currentColor" className="font-mono text-[6.5px] font-black" textAnchor="middle">C</text>
 
          <circle cx="200" cy="80" r="5.5" fill="var(--color-brand-bg)" stroke="currentColor" strokeWidth="1" />
          <text x="200" y="82" fill="currentColor" className="font-mono text-[6.5px] font-black" textAnchor="middle">N</text>
 
          <circle cx="235" cy="95" r="5.5" fill="var(--color-brand-bg)" stroke="currentColor" strokeWidth="1" />
          <text x="235" y="97" fill="currentColor" className="font-mono text-[6.5px] font-black" textAnchor="middle">C</text>
 
          <circle cx="325" cy="80" r="5.5" fill="var(--color-brand-bg)" stroke="currentColor" strokeWidth="1" />
          <text x="325" y="82" fill="currentColor" className="font-mono text-[6.5px] font-black" textAnchor="middle">O</text>
 
          <text x="100" y="180" fill="currentColor" className="font-mono text-[8px] font-black tracking-widest uppercase">H-BOND CO-EFFICIENTS</text>
          <text x="100" y="192" fill="currentColor" className="font-mono text-[6.5px] text-brand-text-muted">[ADENINE] BASE REPLICATIVE NODE</text>
          <text x="100" y="204" fill="currentColor" className="font-mono text-[6.5px] text-brand-text-muted">[THYMINE] MOLECULAR SYSTEM WEIGHT 126.11</text>
          
          <rect x="50" y="30" width="300" height="190" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
        </svg>
      </div>
 
      {/* Fig C: Microfluidic organism sorting circuit or flow assays */}
      <div className="absolute top-[230vh] right-[1%] md:right-[3%] w-[250px] md:w-[360px] h-auto select-none pointer-events-none opacity-[0.06] md:opacity-[0.08] text-brand-accent transition-all duration-300 z-0">
        <svg className="w-full h-auto" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="150" cy="150" r="110" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
          <circle 
            cx="150" 
            cy="150" 
            r="90" 
            stroke="currentColor" 
            strokeWidth="1" 
          />
          
          <path d="M40,150 L260,150" stroke="currentColor" strokeWidth="1" />
          <path d="M150,40 L150,260" stroke="currentColor" strokeWidth="1" />
          <path d="M72,72 L228,228" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 2" />
          <path d="M72,228 L228,72" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 2" />
          
          <circle cx="150" cy="150" r="14" fill="var(--color-brand-bg)" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="150" cy="150" r="10" fill="currentColor" opacity="0.15" />
          <text x="150" y="153" fill="currentColor" className="font-mono text-[7px] font-black" textAnchor="middle">C1</text>
          
          <circle cx="80" cy="80" r="10" fill="var(--color-brand-bg)" stroke="currentColor" strokeWidth="1" />
          <circle cx="80" cy="80" r="6" fill="currentColor" opacity="0.1" />
          <circle cx="220" cy="220" r="12" fill="var(--color-brand-bg)" stroke="currentColor" strokeWidth="1" />
          
          <path 
            d="M180,70 L210,60 L240,75 L255,105" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1" 
            strokeDasharray="4 2"
          />
          <circle cx="180" cy="70" r="3.5" fill="currentColor" />
          <circle cx="210" cy="60" r="3.5" fill="currentColor" />
          <circle cx="240" cy="75" r="3.5" fill="currentColor" />
          <circle cx="255" cy="105" r="3.5" fill="currentColor" />
 
          <text x="180" y="52" fill="currentColor" className="font-mono text-[6px]">PEPTIDE_CHAIN_X5</text>
          <text x="50" y="275" fill="currentColor" className="font-mono text-[6.5px] uppercase font-bold tracking-widest">MICROFLUIDIC CHIP [μM CHANNEL ASPECT]</text>
        </svg>
      </div>
 
      {/* Fig D: Biological macromolecule / Chloroplast grid diagram close to contacts */}
      <div className="absolute top-[340vh] left-[2%] md:left-[4%] w-[240px] md:w-[350px] h-auto select-none pointer-events-none opacity-[0.055] md:opacity-[0.075] text-brand-text-muted transition-all duration-300 z-0">
        <svg className="w-full h-auto" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="25" y="25" width="250" height="250" rx="15" stroke="currentColor" strokeWidth="1" />
          {/* Internal chloroplast / plant cell cell wall patterns */}
          <path d="M40,40 L260,260 M40,260 L260,40" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
          {/* Ribosome / cellular organelles drafting */}
          <g 
            transform="translate(150, 150)"
          >
            <rect x="-40" y="-40" width="80" height="80" rx="40" fill="none" stroke="currentColor" strokeWidth="1.2" />
            <polygon points="0,-35 30,15 -30,15" stroke="currentColor" strokeWidth="1" fill="none" />
            <circle cx="0" cy="0" r="15" stroke="currentColor" strokeWidth="1" strokeDasharray="2 1" />
            <circle cx="0" cy="-35" r="4" fill="currentColor" />
            <circle cx="30" cy="15" r="4" fill="currentColor" />
            <circle cx="-30" cy="15" r="4" fill="currentColor" />
          </g>
          <text x="35" y="245" fill="currentColor" className="font-mono text-[6.5px]">CHLOROPLAST RE-ENTRY MAP</text>
          <text x="35" y="255" fill="currentColor" className="font-mono text-[5.5px] uppercase tracking-wider text-brand-text-muted/70">REF: DHRUV_GAUR_PLANT_PHYSIOLOGY</text>
        </svg>
      </div>
      {/* ----------------- END OF BIOLOGICAL GRAPHICS ----------------- */}
      
      {/* Subtle paper-like warm background graphics */}
      <div className="absolute top-[8vh] left-[5%] opacity-[0.02] select-none pointer-events-none text-[#1A1A1A]">
        <h2 className="text-[180px] md:text-[280px] font-black leading-none tracking-tighter">01</h2>
      </div>

      {/* FIXED NAVIGATION HEADER */}
      <header className="fixed top-0 left-0 w-full z-55 ui-glass border-b border-white/20 transition-all">
        {/* Dynamic high contrast scrolling progress scanline */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-accent to-[#D946EF] origin-left z-55"
          style={{ scaleX }}
        />
        <div className="max-w-[1360px] mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* Logo brand */}
          <button 
            onClick={() => scrollTo('welcome')} 
            className="cursor-pointer hover:opacity-85 transition-opacity duration-200 flex items-center font-display font-bold text-lg text-brand-text"
          >
            Dhruv Gaur
          </button>

          {/* Links Center */}
          <nav className="hidden lg:flex items-center h-full gap-6 xl:gap-8 text-[11px] font-sans font-semibold text-brand-text-muted uppercase tracking-wider">
            {['welcome', 'intro', 'skills', 'experience', 'certifications', 'research', 'research_map', 'ai_tools', 'planner', 'contact', 'admin'].map((sect) => (
                <button
                  key={sect}
                  onClick={() => sect === 'admin' ? setShowAdminPortal(true) : scrollTo(sect)}
                  className={`relative flex items-center h-full transition-all duration-300 cursor-pointer ${
                    activeSection === sect ? 'text-brand-accent' : 'hover:text-brand-text'
                  }`}
                >                
                  <span className="relative z-10">
                    {sect === 'welcome' ? 'Welcome' : sect === 'intro' ? 'Intro' : sect === 'skills' ? 'Skills' : sect === 'experience' ? 'Experience' : sect === 'research' ? 'Research' : sect === 'research_map' ? 'Map' : sect === 'certifications' ? 'Certs' : sect === 'ai_tools' ? 'AI Tools' : sect === 'planner' ? 'Planner' : sect === 'admin' ? 'Admin' : 'Contact'}
                  </span>
                  {activeSection === sect && (
                    <motion.span 
                       layoutId="activeNavIndicator"
                      className="absolute -bottom-[2px] left-0 w-full h-[3px] bg-brand-accent rounded-full shadow-[0_0_8px_rgba(139,92,246,0.5)]"
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    />
                  )}
                </button>
            ))}
          </nav>

          {/* CTA Right & Theme Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-brand-border bg-brand-surface-card hover:bg-brand-surface text-brand-accent transition-all duration-300 flex items-center justify-center cursor-pointer"
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              id="theme-toggle-btn"
            >
              {theme === 'light' ? <Moon size={15} /> : <Sun size={15} />}
            </button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollTo('contact')}
              className="px-5 py-2 bg-brand-accent text-white font-display text-[11px] uppercase font-bold tracking-wider transition-all rounded-full cursor-pointer"
            >
              LET'S TALK
            </motion.button>
          </div>
        </div>
      </header>

      <main className="max-w-[1280px] mx-auto px-6 md:px-12 pt-20">
        
        {/* SECTION 1: HERO / WELCOME */}
        <section id="welcome" className="min-h-screen flex flex-col justify-center py-16 relative">
          <div className="absolute inset-0 z-0 select-none pointer-events-none">
            <HeroScene />
          </div>
          <div className="max-w-3xl space-y-8 relative z-10">
            
            {/* Availability Pill */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#151130]/80 border border-[#8B5CF6]/30 text-white rounded-full font-mono text-[9px] tracking-[0.25em] font-semibold backdrop-blur-sm shadow-[0_0_15px_rgba(139,92,246,0.15)]"
            >
              <span className="w-2 h-2 rounded-full bg-[#A78BFA] animate-pulse"></span>
              RECRUITER PORTAL • ACTIVE FAANG PIPELINE
            </motion.div>
  
            {/* Display Headings */}
            <div className="space-y-4">
              <motion.h1 
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-display text-5xl md:text-8xl font-black text-white tracking-tighter uppercase leading-[0.85] drop-shadow-2xl"
              >
                Dhruv <br className="sm:hidden" /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D946EF] via-[#8B5CF6] to-[#6366F1]">Gaur.</span> <br />
                <span className="text-3xl md:text-5xl font-sans font-extrabold tracking-tight leading-tighter block mt-4 text-[#A78BFA]">Biotechnology & AI Innovator.</span>
              </motion.h1>
  
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="font-sans text-[#A39DBE] text-base md:text-lg max-w-2xl leading-relaxed font-normal bg-[#0F0C23]/30 backdrop-blur-sm p-4 rounded-xl"
              >
                Biotechnology enthusiast bridging the gap between Bioinformatics, Genomics, and AI. Architecting high-throughput biological sequencing pipelines and real-time research dashboards.
              </motion.p>
            </div>
  
            {/* Action buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-4"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollTo('skills')}
                className="bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] hover:from-[#A78BFA] hover:to-[#8B5CF6] text-white font-display font-bold text-xs tracking-widest px-8 py-4 transition-all cursor-pointer border-none shadow-[0_4px_20px_rgba(139,92,246,0.3)] hover:shadow-[0_4px_25px_rgba(139,92,246,0.45)] duration-300"
              >
                EXPLORE SKILLS
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, y: -2, borderColor: '#A78BFA' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollTo('intro')}
                className="border border-[#8B5CF6]/30 hover:border-[#A78BFA] bg-[#0F0C23]/50 text-white font-display font-bold text-xs tracking-widest px-8 py-4 transition-all hover:bg-[#8B5CF6]/10 cursor-pointer duration-300 backdrop-blur-sm"
              >
                ENGINEERING PROFILE
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* SECTION 2: INTRO / PRECISION */}
        <motion.section 
          id="intro" 
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="py-24 border-t border-[#8B5CF6]/20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
            
            {/* Heading left */}
            <div className="lg:col-span-12 xl:col-span-5 space-y-4">
              <span className="bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] text-white text-[9px] font-mono tracking-widest font-black px-3 py-1.5 uppercase inline-block shadow-[0_0_12px_rgba(139,92,246,0.25)] rounded">Recruiter-Optimized</span>
              <h2 className="font-display text-4xl md:text-5xl font-black text-white tracking-tighter leading-none uppercase">
                ENGINEERING <br />PROFILE.
              </h2>
            </div>
 
            {/* Paragraphs right */}
            <div className="lg:col-span-12 xl:col-span-7 space-y-6 text-[#A39DBE] text-sm md:text-base leading-relaxed font-normal">
              <p>
                Currently pursuing a Bachelor of Technology in Biotechnology at Sharda University, I engineer high-end computational tools and software pipelines. Merging extensive academic investigations with high-fidelity React and Node.js solutions, my profile supports enterprise operations, fast-paced teams, and highly quantitative product suites.
              </p>
              <p>
                Having earned key Google Accreditations across UX Design research principles and generative AI prompting, I translate complex biological parameters and industrial processes into high-availability interactive dashboards. Recruiter-friendly pipeline structures focus on high reliability, robust testing, and smooth user micro-interactions.
              </p>
 
              {/* Stats Counters */}
              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-[#8B5CF6]/15">
                <div>
                  <p className="font-sans font-black text-5xl text-transparent bg-clip-text bg-gradient-to-r from-[#D946EF] via-[#8B5CF6] to-[#6366F1] drop-shadow-[0_0_15px_rgba(139,92,246,0.2)]">10+</p>
                  <p className="font-mono text-[9px] text-[#A39DBE] tracking-[0.2em] mt-1.5 uppercase font-bold">MONTHS ACADEMIC WORK</p>
                </div>
                <div>
                  <p className="font-sans font-black text-5xl text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] drop-shadow-[0_0_15px_rgba(99,102,241,0.2)]">100%</p>
                  <p className="font-mono text-[9px] text-[#A39DBE] tracking-[0.2em] mt-1.5 uppercase font-bold">PRODUCTION READINESS</p>
                </div>
              </div>
            </div>
 
          </div>
        </motion.section>

        {/* SECTION 3: CORE SKILLS */}
        <motion.section 
          id="skills" 
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="py-24 border-t border-[#8B5CF6]/20"
        >
          <div className="space-y-12">
            
            {/* Header layout */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-xl space-y-3">
                <span className="text-brand-accent text-[9px] font-mono tracking-widest uppercase block font-bold">Technical Matrix</span>
                <h2 className="font-display text-4xl font-black text-white uppercase tracking-tight">Core Competencies</h2>
                <p className="text-sm text-[#A39DBE] leading-relaxed font-normal">
                  Expertise and focus categories across AI infrastructure, biochemical computational stacks, and enterprise project leadership systems.
                </p>
              </div>
              <div className="flex items-center gap-3 self-start md:self-end font-mono text-[9px] font-bold tracking-wider text-[#A78BFA] uppercase bg-[#0F0C23] border border-[#8B5CF6]/25 px-4 py-2 select-none shadow-[0_0_10px_rgba(139,92,246,0.1)]">
                <span className="w-2 h-2 rounded-full bg-[#8B5CF6] animate-pulse"></span>
                {SKILLS.reduce((acc, curr) => acc + curr.tags.length, 0)} Active Engineering Targets Integrated
              </div>
            </div>

            {/* Filter and Search Layout Controls */}
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 bg-brand-surface p-4 border border-[#1A1A1A]/10">
              {/* Category selector */}
              <div className="flex flex-wrap gap-1.5">
                {['All', 'AI & Advanced Computing', 'Biotechnology & Healthcare', 'Research & Lab Operations', 'Leadership & Academia'].map((cat) => {
                  const isActive = selectedSkillCategory === cat;
                  return (
                    <motion.button
                      key={cat}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setSelectedSkillCategory(cat)}
                      className={`px-3 py-1.5 text-[9px] font-mono tracking-widest uppercase border transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#1A1A1A] border-[#1A1A1A] text-white font-extrabold'
                          : 'bg-white border-[#1A1A1A]/10 text-brand-text-muted hover:border-[#1A1A1A]/30 hover:text-[#1A1A1A]'
                      }`}
                    >
                      {cat === 'All' ? 'ALL SYSTEM ARCHITECTURES' : cat}
                    </motion.button>
                  );
                })}
              </div>

              {/* Live search box */}
              <div className="relative max-w-xs w-full">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-text-muted bg-transparent pointer-events-none">
                  <Search className="w-3.5 h-3.5 opacity-55" />
                </div>
                <input
                  type="text"
                  value={skillSearch}
                  onChange={(e) => setSkillSearch(e.target.value)}
                  placeholder="FILTER SPECIALIZED SKILLS..."
                  className="w-full bg-white border border-[#1A1A1A]/10 focus:border-brand-accent text-[10px] font-mono pl-9 pr-12 py-2.5 focus:outline-none placeholder:text-brand-text-muted/40 text-[#1A1A1A] rounded-none shadow-sm"
                />
                {skillSearch && (
                  <button 
                    onClick={() => setSkillSearch('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[8px] text-brand-accent hover:underline cursor-pointer font-bold"
                  >
                    CLEAR
                  </button>
                )}
              </div>
            </div>
 
            {/* Skills dynamic grid layout */}
            {(() => {
              const filteredSkills = SKILLS.filter(skill => {
                const matchesCategory = selectedSkillCategory === 'All' || 
                  skill.category === selectedSkillCategory ||
                  (selectedSkillCategory === 'Research & Lab Operations' && skill.category === 'Research & Laboratory Operations') ||
                  (selectedSkillCategory === 'Leadership & Academia' && skill.category === 'Leadership & Academic Programs');
                
                const matchesSearch = !skillSearch.trim() || 
                  skill.title.toLowerCase().includes(skillSearch.toLowerCase()) ||
                  skill.description.toLowerCase().includes(skillSearch.toLowerCase()) ||
                  skill.tags.some(t => t.toLowerCase().includes(skillSearch.toLowerCase()));
                
                return matchesCategory && matchesSearch;
              });

              if (filteredSkills.length === 0) {
                return (
                  <div className="bg-brand-surface p-12 text-center border-2 border-dashed border-[#1A1A1A]/15 space-y-3">
                    <Sliders className="w-8 h-8 text-brand-accent/50 mx-auto" />
                    <div>
                      <p className="font-mono text-xs font-black text-[#1A1A1A] uppercase tracking-wider">No Skills Aligned With Query</p>
                      <p className="text-2xs text-brand-text-muted font-sans mt-0.5">Try altering your search filters or clear the active query string.</p>
                    </div>
                  </div>
                );
              }

              return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredSkills.map((skill) => (
                    <motion.div
                      key={skill.id}
                      layout
                      whileHover={{ 
                        y: -4, 
                      }}
                      transition={{ type: "spring", stiffness: 280, damping: 18 }}
                      className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-sm border border-white/50 p-6 md:p-8 flex flex-col justify-between space-y-6 transition-all duration-300"
                    >
                      <div className="space-y-4">
                        {/* Icon Container - iOS Style */}
                        <div className="w-12 h-12 flex items-center justify-center bg-brand-accent/10 text-brand-accent rounded-2xl">
                          {renderIcon(skill.iconName, "w-6 h-6")}
                        </div>
                        {/* Title */}
                        <div>
                          <span className="font-mono text-[10px] text-brand-accent block uppercase font-bold tracking-widest">{skill.category}</span>
                          <h3 className="font-sans text-lg font-bold text-brand-text tracking-tight mt-1">
                            {skill.title}
                          </h3>
                        </div>
                        <p className="text-xs text-brand-text-muted leading-relaxed font-normal">
                          {skill.description}
                        </p>
                      </div>
     
                      {/* Tags */}
                      <motion.div 
                        key={`${skill.id}-${selectedSkillCategory}-${skillSearch}`}
                        variants={tagContainerVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-wrap gap-2 pt-4 border-t border-brand-border"
                      >
                        {skill.tags.map(tag => {
                          const isMatched = skillSearch && tag.toLowerCase().includes(skillSearch.toLowerCase());
                          return (
                            <motion.span 
                              key={tag}
                              variants={tagItemVariants}
                              className={`px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase border transition-all duration-200 ${
                                isMatched 
                                  ? 'bg-brand-accent text-white border-brand-accent font-bold shadow-sm' 
                                  : 'bg-white/50 text-brand-text-muted border-brand-border font-medium'
                              }`}
                            >
                              {tag}
                            </motion.span>
                          );
                        })}
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              );
            })()}
 
          </div>
        </motion.section>

        {/* SECTION: EXPERIENCE TIMELINE */}
        <motion.section 
          id="experience"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="py-24 border-t border-[#1A1A1A]/10"
        >
          <ExperienceTimeline />
        </motion.section>

        {/* SECTION 4: CERTIFICATION COLLECTION */}
        <motion.section 
          id="certifications"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="py-24 border-t border-[#1A1A1A]/10"
        >
          <CertificationCollection />
        </motion.section>

        {/* SECTION: WORKING RESEARCH */}
        <motion.section 
          id="research" 
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="py-24 border-t border-[#1A1A1A]/10"
        >
          <WorkingResearch 
            isOwner={isOwner} 
            onTriggerAuth={(customMessage) => {
              if (customMessage) {
                setAuthError(customMessage);
              }
              setShowOwnerModal(true);
            }} 
          />
        </motion.section>

        {/* SECTION: RESEARCH MAP D3 DESIGN */}
        <motion.section 
          id="research_map" 
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="py-24 border-t border-[#1A1A1A]/10"
        >
          <ResearchMap />
        </motion.section>

        {/* SECTION 5.3: AI TOOLS EXPERTISE */}
        <motion.section
          id="ai_tools"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="py-24 border-t border-[#1A1A1A]/10"
        >
          <SectionGateWrapper id="ai_tools" name="AI Tools Expertise">
            <AIToolsExpertise />
          </SectionGateWrapper>
        </motion.section>

        {/* SECTION 5.5: BIOTECH GOOGLE CALENDAR PLANNER & SCHEDULER */}
        <motion.section
          id="planner"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="py-24 border-t border-[#1A1A1A]/10"
        >
          <SectionGateWrapper id="planner" name="Lab Planner">
            <BiotechScheduler />
          </SectionGateWrapper>
        </motion.section>

        {/* SECTION 6: CONTACT & FORM */}
        <motion.section 
          id="contact" 
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="py-24 border-t border-[#1A1A1A]/10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
            
            {/* Left side text and direct emails */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <span className="text-brand-accent text-[9px] font-bold tracking-widest uppercase block">Laboratory Inquiries</span>
                <h2 className="font-serif italic text-4xl md:text-5xl font-black text-[#1A1A1A] tracking-tighter uppercase leading-none">
                  Contact Me.
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

              {/* OWNER ONLY CONTACT INBOX SUBMISSIONS VIEW */}
              {isOwner && (
                <div className="mt-8 pt-6 border-t-2 border-[#1A1A1A] space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Database className="w-4 h-4 text-[#10B981]" />
                      <h4 className="font-serif italic text-base font-black text-[#1A1A1A] uppercase">
                        SECURE INBOX SUBMISSIONS ({submissions.length})
                      </h4>
                    </div>
                    <span className="bg-[#10B981]/15 text-[#0F766E] border border-[#10B981]/25 px-2 py-0.5 text-[8px] font-mono tracking-widest font-bold">
                      DECRYPTED OWNER SESSION
                    </span>
                  </div>

                  <div className="space-y-3.5 max-h-80 overflow-y-auto pr-1 scrollbar-thin">
                    {submissions.length === 0 ? (
                      <p className="text-2xs font-mono text-brand-text-muted/60 italic text-center py-4 bg-brand-bg/50 border border-dashed border-[#1A1A1A]/10">
                        No submissions recorded in database logs yet.
                      </p>
                    ) : (
                      submissions.map((sub) => (
                        <div key={sub.id} className="bg-brand-bg/85 p-3.5 border border-[#1A1A1A]/8 relative shadow-sm">
                          <div className="flex justify-between items-center mb-1.5 border-b border-[#1A1A1A]/5 pb-1 text-[9px] font-mono">
                            <span className="font-bold text-[#10B981]">{sub.name} &lt;{sub.email}&gt;</span>
                            <span className="text-[#1A1A1A]/40">{new Date(sub.timestamp || '').toLocaleString()}</span>
                          </div>
                          <p className="text-xs text-[#1A1A1A]/85 whitespace-pre-wrap leading-relaxed font-sans">
                            {sub.message}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
 
            </div>
          </div>
        </motion.section>

      </main>

      {/* FOOTER SECTION */}
      <footer className="border-t border-[#1A1A1A]/10 bg-white/20 mt-12">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Logo brand */}
          <button 
            onClick={() => scrollTo('welcome')} 
            className="cursor-pointer hover:opacity-80 transition-opacity duration-200"
          >
            <Logo variant="horizontal" size={38} />
          </button>
 
          {/* Nav socials center */}
          <div className="flex items-center gap-6 text-[10px] font-mono font-bold tracking-widest text-[#1A1A1A]/70">
            <a 
              href="https://www.linkedin.com/in/dhruv-gaur-85ab12384" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-brand-accent transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Linkedin className="w-3.5 h-3.5 text-brand-accent" /> LINKEDIN
            </a>
            <a 
              href="https://github.com/Dhruvgaur45/Dhruv-Gaur" 
              target="_blank"  
              rel="noopener noreferrer" 
              className="hover:text-brand-accent transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Github className="w-3.5 h-3.5 text-brand-accent" /> GITHUB
            </a>
          </div>
 
          {/* Copyright Right */}
          <div className="text-[10px] font-mono text-brand-text-muted flex items-center gap-3">
            <span>© {new Date().getFullYear()} Dhruv Gaur. All rights reserved.</span>
            <span className="text-brand-accent font-bold px-1.5 py-0.5 rounded bg-brand-accent/5 border border-brand-accent/10">V1.0</span>
            <span className="text-[#1A1A1A]/20">|</span>
            <button 
              onClick={() => setShowCopyrightModal(true)} 
              className="text-brand-accent hover:underline font-bold uppercase tracking-wider cursor-pointer"
            >
              Copyright Notice
            </button>
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

      {/* FLOATING LIMS MAINTENANCE PORTAL BUTTON */}
      <div className="fixed bottom-20 right-6 z-50 flex flex-col items-end">
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          whileHover={{ 
            scale: 1.05,
            borderColor: '#10B981',
            boxShadow: '0 8px 24px -4px rgba(16, 185, 129, 0.25)' 
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            if (isOwner) {
              setIsMaintenanceActive(true);
            } else {
              setAuthError("LIMS maintenance triggers require verified owner credentials. Please authenticate.");
              setShowOwnerModal(true);
            }
          }}
          className="flex items-center gap-2 px-3.5 h-10 bg-[#112F24]/95 hover:bg-[#1A4234] border border-[#10B981]/40 text-[#86EFAC] font-mono text-[9px] sm:text-xs uppercase tracking-wider font-extrabold transition-all cursor-pointer shadow-lg rounded-none relative overflow-hidden"
          title="Access Biotech LIMS Maintenance Dashboard"
        >
          {/* Subtle bio-pulse background dots */}
          <span className="absolute inset-0 bg-[radial-gradient(#10B981_1px,transparent_1px)] [background-size:8px_8px] opacity-10 pointer-events-none" />
          
          <Wrench className="w-3.5 h-3.5 text-[#10B981] animate-spin" style={{ animationDuration: '6s' }} />
          <span className="relative">MAINTENANCE PORTAL</span>
          <span className="relative h-1.5 w-1.5 flex shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#10B981]"></span>
          </span>
        </motion.button>
      </div>

      {/* FLOATING PATRIOTIC YOUTH AMBASSADOR BUTTON */}
      <div className="fixed bottom-[136px] right-6 z-50 flex flex-col items-end">
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          whileHover={{ 
            scale: 1.05,
            borderColor: '#3B82F6',
            boxShadow: '0 8px 24px -4px rgba(59, 130, 246, 0.25)' 
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAmbassadorModal(true)}
          className="flex items-center gap-2 px-3.5 h-10 bg-white hover:bg-slate-50 border border-[#3B82F6]/30 text-brand-text font-mono text-[9px] sm:text-xs uppercase tracking-wider font-extrabold transition-all cursor-pointer shadow-lg rounded-none relative overflow-hidden"
          title="View Youth Ambassador Credential"
        >
          {/* Subtle patriotic tricolor top accent border */}
          <div className="absolute top-0 left-0 w-full h-[3px] flex">
            <span className="h-full w-1/3 bg-[#FF9933]" />
            <span className="h-full w-1/3 bg-[#FFFFFF] border-y border-[#FF9933]/15" />
            <span className="h-full w-1/3 bg-[#128807]" />
          </div>
          
          <Flag className="w-3.5 h-3.5 text-[#3B82F6]" />
          <span className="relative pt-[2px]">YOUTH AMBASSADOR</span>
          <span className="relative h-1.5 w-1.5 flex shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3B82F6] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#3B82F6]"></span>
          </span>
        </motion.button>
      </div>

      {/* FLOATING OWNER SECURE ACCESS BUTTON */}
      <div className="fixed bottom-[304px] right-6 z-50 flex flex-col items-end">
        {isOwner ? (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            whileHover={{ 
              scale: 1.05,
              borderColor: '#10B981',
              boxShadow: '0 8px 24px -4px rgba(16, 185, 129, 0.25)' 
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              localStorage.removeItem('is_owner_authorized');
              setIsOwner(false);
            }}
            className="flex items-center gap-2 px-3.5 h-10 bg-white hover:bg-emerald-50/10 border border-[#10B981]/50 text-[#112F24] font-mono text-[9px] sm:text-xs uppercase tracking-wider font-extrabold transition-all cursor-pointer shadow-lg rounded-none relative overflow-hidden"
            title="Sign out of owner active controls"
          >
            {/* Subtle bio-pulse background dots */}
            <span className="absolute inset-0 bg-[radial-gradient(#10B981_1px,transparent_1px)] [background-size:8px_8px] opacity-10 pointer-events-none" />
            
            {/* Emerald active accent top banner stripe */}
            <div className="absolute top-0 left-0 w-full h-[3px] bg-[#10B981]" />
            
            <Unlock className="w-3.5 h-3.5 text-[#10B981]" />
            <span className="relative pt-[2px]">OWNER: ACTIVE (LOGOUT)</span>
            <span className="relative h-1.5 w-1.5 flex shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#10B981]"></span>
            </span>
          </motion.button>
        ) : (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            whileHover={{ 
              scale: 1.05,
              borderColor: '#D97706',
              boxShadow: '0 8px 24px -4px rgba(217, 119, 6, 0.25)' 
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setAuthError('');
              setShowOwnerModal(true);
            }}
            className="flex items-center gap-2 px-3.5 h-10 bg-white hover:bg-amber-50/10 border border-[#D97706]/40 text-amber-850 font-mono text-[9px] sm:text-xs uppercase tracking-wider font-bold transition-all cursor-pointer shadow-lg rounded-none relative overflow-hidden animate-pulse"
            title="Authenticate credentials to unlock owner mode"
          >
            {/* Subtle alert status background */}
            <span className="absolute inset-0 bg-[radial-gradient(#D97706_1px,transparent_1px)] [background-size:8px_8px] opacity-10 pointer-events-none" />
            
            {/* Amber warning top banner stripe */}
            <div className="absolute top-0 left-0 w-full h-[3px] bg-[#D97706]" />
            
            <Lock className="w-3.5 h-3.5 text-[#D97706]" />
            <span className="relative pt-[2px]">GUEST VIEW (LOCK)</span>
            <span className="relative h-1.5 w-1.5 flex shrink-0">
              <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-[#D97706] opacity-60"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#D97706]"></span>
            </span>
          </motion.button>
        )}
      </div>

      {/* FLOATING GOOGLE DEVELOPER COMMUNITY BUTTON */}
      <div className="fixed bottom-[248px] right-6 z-50 flex flex-col items-end">
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          whileHover={{ 
            scale: 1.05,
            borderColor: '#4285F4',
            boxShadow: '0 8px 24px -4px rgba(66, 133, 244, 0.25)' 
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowGDGModal(true)}
          className="flex items-center gap-2 px-3.5 h-10 bg-white hover:bg-blue-50/10 border border-[#4285F4]/35 text-brand-text font-mono text-[9px] sm:text-xs uppercase tracking-wider font-extrabold transition-all cursor-pointer shadow-lg rounded-none relative overflow-hidden"
          title="View Google Developer Community Organization Details"
        >
          {/* Subtle logo glow background */}
          <span className="absolute inset-0 bg-[radial-gradient(#4285F4_1px,transparent_1px)] [background-size:8px_8px] opacity-5 pointer-events-none" />
          
          {/* Google colors stripe banner */}
          <div className="absolute top-0 left-0 w-full h-[3px] flex">
            <span className="h-full w-1/4 bg-[#4285F4]" />
            <span className="h-full w-1/4 bg-[#EA4335]" />
            <span className="h-full w-1/4 bg-[#FBBC05]" />
            <span className="h-full w-1/4 bg-[#34A853]" />
          </div>
          
          <Users className="w-3.5 h-3.5 text-[#4285F4]" />
          <span className="relative pt-[2px]">GDG PRE-ORGANIZER</span>
          <span className="relative h-1.5 w-1.5 flex shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4285F4] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#4285F4]"></span>
          </span>
        </motion.button>
      </div>

      {/* FLOATING ACADEMIC TIMELINE BUTTON */}
      <div className="fixed bottom-[192px] right-6 z-50 flex flex-col items-end">
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          whileHover={{ 
            scale: 1.05,
            borderColor: '#10B981',
            boxShadow: '0 8px 24px -4px rgba(16, 185, 129, 0.25)' 
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowTimelinePage(true)}
          className="flex items-center gap-2 px-3.5 h-10 bg-white hover:bg-emerald-50/10 border border-[#10B981]/35 text-brand-text font-mono text-[9px] sm:text-xs uppercase tracking-wider font-extrabold transition-all cursor-pointer shadow-lg rounded-none relative overflow-hidden"
          title="View Academic & Civic Timeline"
        >
          {/* Subtle calendar glow background */}
          <span className="absolute inset-0 bg-[radial-gradient(#10B981_1px,transparent_1px)] [background-size:8px_8px] opacity-5 pointer-events-none" />
          
          <Calendar className="w-3.5 h-3.5 text-[#10B981]" />
          <span className="relative pt-[2px]">ACADEMIC TIMELINE</span>
          <span className="relative h-1.5 w-1.5 flex shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#10B981]"></span>
          </span>
        </motion.button>
      </div>


      {/* FLOATING SECURE MESSAGES TRIGGER BADGE */}
      {!isInboxExpanded && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ 
            scale: 1.05, 
            borderColor: isOwner ? '#10B981' : '#D97706',
            boxShadow: isOwner ? '0 8px 24px -4px rgba(16, 185, 129, 0.3)' : '0 8px 24px -4px rgba(217, 119, 6, 0.25)'
          }}
          className={`fixed bottom-24 left-6 z-[49] flex items-center gap-2 px-3.5 h-10 bg-[#1A1A1A]/95 text-white border ${
            isOwner ? 'border-[#10B981]' : 'border-zinc-700'
          } font-mono text-[10px] sm:text-xs uppercase tracking-wider font-extrabold shadow-lg rounded-none cursor-pointer`}
          onClick={() => setIsInboxExpanded(true)}
        >
          <span className="relative flex h-2 w-2 shrink-0">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isOwner ? 'bg-[#10B981]' : 'bg-[#D97706]'}`}></span>
            <span className={`relative inline-flex rounded-full h-2 w-2 ${isOwner ? 'bg-[#10B981]' : 'bg-[#D97706]'}`}></span>
          </span>
          <span className="relative font-bold">
            📬 {isOwner ? `INBOX LOGS (${submissions.length} RECS)` : 'SECURE INBOX'}
          </span>
          <span className="text-[9px] text-zinc-500 font-normal">
            [CLICK]
          </span>
        </motion.div>
      )}

      {/* FLOATING DRAGGABLE SECURE MESSAGES PANEL */}
      <AnimatePresence>
        {isInboxExpanded && (
          <motion.div
            initial={{ opacity: 0, x: -30, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -30, scale: 0.95 }}
            transition={{ type: "spring", duration: 0.5 }}
            drag
            dragMomentum={false}
            dragElastic={0.1}
            className={`fixed bottom-24 left-6 z-[49] max-w-[420px] w-[calc(100vw-3rem)] bg-[#1A1A1A]/98 backdrop-blur-md border-2 ${
              isOwner ? 'border-[#10B981] shadow-[0_12px_36px_rgba(16,185,129,0.3)]' : 'border-[#D97706] shadow-[0_12px_36px_rgba(217,119,6,0.25)]'
            } text-white p-4 font-mono select-none rounded-none cursor-grab active:cursor-grabbing overflow-hidden flex flex-col gap-2`}
            style={{ touchAction: 'none' }}
          >
            {/* Warning top border strip and drag grip */}
            <div className={`absolute top-0 left-0 w-full h-[6px] ${isOwner ? 'bg-[#10B981]' : 'bg-[#D97706]'} flex items-center justify-center gap-1`}>
              <span className="w-1.5 h-[2px] bg-white/50" />
              <span className="w-1.5 h-[2px] bg-white/50" />
              <span className="w-1.5 h-[2px] bg-white/50" />
            </div>

            {/* Title headers */}
            <div className="flex items-center justify-between gap-2 mt-1 border-b border-zinc-800 pb-2">
              <div className="flex items-center gap-2 font-bold text-[10px] tracking-[0.2em] uppercase">
                <Database className={`w-3.5 h-3.5 ${isOwner ? 'text-[#10B981]' : 'text-[#D97706]'}`} />
                <span>MESSAGE ARCHIVES</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-[8px] px-1.5 py-0.5 tracking-wider font-extrabold uppercase ${
                  isOwner ? 'bg-[#10B981]/20 text-[#10B981]' : 'bg-[#D97706]/20 text-[#D97706]'
                }`}>
                  {isOwner ? 'DECRYPTED' : 'SEALED'}
                </span>
                <button
                  onClick={() => setIsInboxExpanded(false)}
                  className="text-[9px] hover:underline text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  [MINIMIZE]
                </button>
              </div>
            </div>

            {/* Main content body */}
            {!isOwner ? (
              /* LOCKED SCREEN - REQUIRES PORT KEY ADDR LOG */
              <div className="py-4 px-2 space-y-4 text-center">
                <div className="mx-auto w-12 h-12 bg-[#D97706]/10 border border-[#D97706]/30 flex items-center justify-center rounded-none text-[#D97706]">
                  <Lock className="w-6 h-6 animate-pulse" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif italic text-xs font-black text-white tracking-wide uppercase">
                    ENCRYPTED OWNER TERMINAL
                  </h4>
                  <p className="text-[10px] text-zinc-400 leading-normal font-sans px-4">
                    Secure communications, email records, and visitor inquiries are cryptographically archived. Owner keys are required to decrypt this node.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setAuthError("Owner key authorized credentials required.");
                    setShowOwnerModal(true);
                  }}
                  className="w-full bg-[#D97706] hover:bg-[#D97706]/90 text-black font-semibold text-[10px] py-2 px-3 tracking-wider uppercase transition-colors rounded-none font-mono cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Unlock className="w-3.5 h-3.5" />
                  <span>AUTHORIZE SECURE NODE</span>
                </button>
              </div>
            ) : (
              /* UNLOCKED SCREEN - LOGS AND SEARCH ENGINE */
              <div className="space-y-3 flex flex-col h-full">
                {/* Search / Filter bar */}
                <div className="relative">
                  <span className="absolute inset-y-0 left-2.5 flex items-center pointer-events-none text-zinc-500">
                    <Search className="w-3 h-3" />
                  </span>
                  <input
                    type="text"
                    placeholder="FILTER BY SENDER NAME, EMAIL, WORDS..."
                    value={inboxSearch}
                    onChange={(e) => setInboxSearch(e.target.value)}
                    className="w-full bg-[#112F24]/30 text-[#86EFAC] text-[9px] border border-[#10B981]/30 focus:border-[#10B981] p-2 pl-7 uppercase tracking-wider focus:outline-none placeholder-zinc-500 font-mono"
                  />
                </div>

                {/* Messages Listing scroll panel */}
                <div className="space-y-2 max-h-[240px] overflow-y-auto pr-1 scrollbar-thin">
                  {submissions.filter(sub => {
                    const q = inboxSearch.toLowerCase();
                    return (
                      (sub.name || '').toLowerCase().includes(q) ||
                      (sub.email || '').toLowerCase().includes(q) ||
                      (sub.message || '').toLowerCase().includes(q)
                    );
                  }).length === 0 ? (
                    <div className="text-center py-8 border border-dashed border-zinc-800 text-zinc-500 text-[10px] uppercase">
                      No matching encrypted records found.
                    </div>
                  ) : (
                    submissions
                      .filter(sub => {
                        const q = inboxSearch.toLowerCase();
                        return (
                          (sub.name || '').toLowerCase().includes(q) ||
                          (sub.email || '').toLowerCase().includes(q) ||
                          (sub.message || '').toLowerCase().includes(q)
                        );
                      })
                      .map((sub) => (
                        <div 
                          key={sub.id} 
                          className="bg-[#112F24]/10 border border-[#10B981]/15 p-2.5 relative flex flex-col gap-1 text-left"
                        >
                          <div className="flex justify-between items-start gap-2 text-[9px]">
                            <span className="font-extrabold text-[#10B981] truncate max-w-[180px]">
                              {sub.name}
                            </span>
                            <span className="text-zinc-500 text-[8px] shrink-0 font-light">
                              {new Date(sub.timestamp || '').toLocaleDateString('en-US', { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                          
                          <div className="text-[8px] text-zinc-400 font-serif lowercase italic -mt-0.5 border-b border-zinc-800/20 pb-1">
                            {sub.email}
                          </div>

                          <p className="text-[10px] text-zinc-300 whitespace-pre-wrap leading-relaxed font-sans mt-1">
                            {sub.message}
                          </p>

                          <div className="flex gap-2 justify-end mt-2 pt-1 border-t border-zinc-800/40 text-[8px]">
                            {/* Copy button */}
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(`From: ${sub.name} <${sub.email}>\nMessage: ${sub.message}`);
                              }}
                              className="text-zinc-400 hover:text-[#10B981] flex items-center gap-1 cursor-pointer"
                              title="Copy raw record"
                            >
                              <Copy className="w-2.5 h-2.5" />
                              <span>COPY</span>
                            </button>

                            {/* Reply button */}
                            <a
                              href={`mailto:${sub.email}?subject=Re:%20Portfolio%20Inquiry`}
                              className="text-zinc-400 hover:text-[#10B981] flex items-center gap-1 cursor-pointer"
                            >
                              <Mail className="w-2.5 h-2.5" />
                              <span>REPLY</span>
                            </a>

                            {/* Delete Button */}
                            <button
                              onClick={() => handleDeleteSubmission(sub.id)}
                              className="text-red-400 hover:text-red-500 flex items-center gap-1 cursor-pointer"
                              title="Purge record"
                            >
                              <Trash2 className="w-2.5 h-2.5" />
                              <span>DELETE</span>
                            </button>
                          </div>
                        </div>
                      ))
                  )}
                </div>

                {/* Change PIN section inside active session */}
                <div className="border-t border-zinc-800/80 pt-2.5 pb-1 space-y-2">
                  <div className="flex justify-between items-center text-[7.5px] text-zinc-400 font-mono font-bold uppercase tracking-wider">
                    <span className="flex items-center gap-1">
                      <Key className="w-2.5 h-2.5 text-[#10B981]" />
                      SECURITY PASSKEY INTERFACE
                    </span>
                    <span className="text-[#10B981]">ACTIVE PIN: {securityPin}</span>
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="ENTER NEW PIN..."
                      value={newPinInput}
                      onChange={(e) => setNewPinInput(e.target.value)}
                      className="flex-1 bg-zinc-900 border border-zinc-700 text-[9px] px-2 py-1.5 focus:outline-none focus:border-[#10B981] placeholder-zinc-600 font-mono text-white"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const trimmed = newPinInput.trim();
                        if (trimmed.length < 4) {
                          setPinChangeError('PIN must be at least 4 characters');
                          setPinChangeSuccess('');
                        } else {
                          localStorage.setItem('owner_security_pin', trimmed);
                          setSecurityPin(trimmed);
                          setPinChangeSuccess('Security PIN updated successfully!');
                          setPinChangeError('');
                          setNewPinInput('');
                          setTimeout(() => setPinChangeSuccess(''), 4000);
                        }
                      }}
                      className="bg-[#10B981] hover:bg-[#10B981]/90 text-black font-extrabold text-[8px] px-2 py-1.5 uppercase transition-all duration-150 rounded-none font-mono cursor-pointer"
                    >
                      UPDATE
                    </button>
                  </div>

                  {pinChangeSuccess && (
                    <div className="text-[7.5px] text-emerald-400 font-mono font-black uppercase">
                      ✓ {pinChangeSuccess}
                    </div>
                  )}
                  {pinChangeError && (
                    <div className="text-[7.5px] text-red-400 font-mono font-black uppercase">
                      ⚠️ {pinChangeError}
                    </div>
                  )}

                  <span className="text-[6.5px] text-zinc-500 uppercase leading-none block">
                    Updating the PIN writes directly to LocalStorage. Original fallbacks ('dggaur2026' and 'admin') remain active as redundant key fail-safes.
                  </span>
                </div>

                {/* Footer status line inside the expanded box */}
                <div className="flex items-center justify-between text-[8px] text-zinc-500 pt-1 border-t border-zinc-800">
                  <span>FILESYSTEM DECRYPTED // OK</span>
                  <button
                    onClick={() => {
                      localStorage.removeItem('is_owner_authorized');
                      setIsOwner(false);
                    }}
                    className="text-red-400 hover:underline cursor-pointer uppercase"
                  >
                    🔒 RELOCK DECODEVAULT
                  </button>
                </div>
              </div>
            )}
          </motion.div>
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

      {/* COPYRIGHT NOTICE DIALOG */}
      <AnimatePresence>
        {showCopyrightModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 overflow-hidden">
            {/* Backdrop cover with blur and fade */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCopyrightModal(false)}
              className="absolute inset-0 bg-[#1A1A1A]/85 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Dialog Content Container with spring transition */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
              className="relative bg-brand-bg text-[#1A1A1A] w-full max-w-2xl border-2 border-[#1A1A1A] shadow-[8px_8px_0px_0px_#10B981] flex flex-col max-h-[90vh] z-10"
            >
              {/* Header block strip */}
              <div className="border-b-2 border-[#1A1A1A] bg-white px-6 py-4 flex items-center justify-between select-none">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-brand-accent animate-pulse shrink-0"></span>
                  <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#1A1A1A]">
                    Interactive Legal Registry
                  </span>
                </div>
                <span className="text-[9px] font-mono font-black uppercase text-brand-accent px-2 py-0.5 border border-brand-accent/20 bg-brand-accent/5">
                  SECURE PROTOCOL
                </span>
              </div>

              {/* Body terms content scrollable info */}
              <div className="px-6 py-6 overflow-y-auto font-sans text-xs leading-relaxed text-[#1A1A1A]/85 divide-y divide-[#1A1A1A]/10 max-h-[calc(90vh-140px)]">
                <div className="pb-5">
                  <h3 className="font-serif italic font-black text-2xl md:text-3xl tracking-tight text-[#1A1A1A] uppercase mb-1">
                    Copyright Notice
                  </h3>
                  <div className="font-mono text-[9px] text-[#1A1A1A]/50 tracking-wider mb-5 uppercase">
                    REGULATION DOCUMENT REF: DG-2026-CR
                  </div>

                  <div className="p-4 bg-brand-surface border border-[#1A1A1A]/12 mb-5 text-[11px] font-mono leading-normal text-[#1A1A1A] font-bold">
                    © {new Date().getFullYear()} Dhruv Gaur. All rights reserved.
                  </div>

                  <p className="mb-1 text-justify">
                    The materials and information provided on this website are intended solely for personal, informational, and non-commercial use unless otherwise stated. Any unauthorized reproduction, modification, distribution, transmission, republication, display, performance, storage, or exploitation of the content in any form or by any means without prior written permission from <strong className="text-[#1A1A1A] font-semibold">Dhruv Gaur</strong> is strictly prohibited.
                  </p>
                </div>

                <div className="py-5">
                  <h4 className="font-mono font-black text-[10px] tracking-widest text-brand-accent uppercase mb-3">
                    STRICT RESTRICTIONS:
                  </h4>
                  <p className="mb-3 text-[11px] text-[#1A1A1A]/70">
                    Users of this domain are explicitly prohibited from performing any of the following activities:
                  </p>
                  
                  <div className="space-y-2 mt-2">
                    {[
                      "Copy, duplicate, or republish website materials",
                      "Use website content for commercial purposes",
                      "Modify or create derivative works from the website’s content",
                      "Reverse engineer, decompile, or misuse any website software or systems",
                      "Use the website’s branding, logos, or visual identity without authorization"
                    ].map((item, id) => (
                      <div key={id} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 bg-brand-accent mt-[6px] shrink-0"></span>
                        <span className="text-xs text-[#1A1A1A] font-medium leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="py-5 space-y-4 text-justify">
                  <p>
                    All trademarks, service marks, logos, and brand names displayed on this website are the property of their respective owners. Unauthorized use of any intellectual property may violate copyright laws, trademark laws, privacy laws, and communication regulations.
                  </p>

                  <p>
                    While every effort is made to ensure the accuracy and reliability of the information presented on this website, <strong className="text-[#1A1A1A] font-semibold">Dhruv Gaur</strong> makes no guarantees regarding completeness, accuracy, or reliability. The website owner reserves the right to modify, update, or remove content at any time without prior notice.
                  </p>

                  <p className="p-3 bg-[#10B981]/5 border border-[#10B981]/15 text-[11px] font-sans font-medium text-brand-accent leading-normal rounded-none">
                    By accessing and using this website, you acknowledge and agree to comply with all applicable copyright and intellectual property regulations associated with the use of this platform.
                  </p>
                </div>
              </div>

              {/* Action confirm button box */}
              <div className="bg-white border-t-2 border-[#1A1A1A] p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-[9px] font-mono text-[#1A1A1A]/40 tracking-wider">
                  SESSION ESTABLISHED // ACCESS GRANTED
                </span>
                
                <button 
                  onClick={() => setShowCopyrightModal(false)}
                  className="w-full sm:w-auto bg-[#1A1A1A] hover:bg-brand-accent text-white font-mono uppercase font-black tracking-[0.15em] px-8 py-3 text-xs border border-[#1A1A1A] shadow-[4px_4px_0px_0px_#10B981] transition-all duration-300 hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] cursor-pointer text-center"
                >
                  I AGREE & CONTINUE
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* OWNER SECURITY VERIFICATION DIALOG */}
      <AnimatePresence>
        {showOwnerModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-6 overflow-hidden">
            {/* Backdrop cover with blur and fade */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setShowOwnerModal(false);
                setAuthError('');
              }}
              className="absolute inset-0 bg-[#1A1A1A]/85 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Dialog Content Container with spring transition */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
              className="relative bg-brand-bg text-[#1A1A1A] w-full max-w-md border-2 border-[#1A1A1A] shadow-[8px_8px_0px_0px_#10B981] flex flex-col z-10 rounded-none overflow-hidden"
            >
              {/* Header block strip */}
              <div className="border-b-2 border-[#1A1A1A] bg-white px-6 py-4 flex items-center justify-between select-none">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-amber-500 animate-ping rounded-full shrink-0"></span>
                  <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#1A1A1A] flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5 text-amber-500" />
                    OWNER ACCESS PRIVILEGES
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setShowOwnerModal(false);
                    setAuthError('');
                  }}
                  className="text-xs font-mono font-bold text-[#1A1A1A]/60 hover:text-[#1A1A1A] hover:underline"
                >
                  [CLOSE]
                </button>
              </div>

              {/* Body Form */}
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  const enteredPasscode = authPasscode.trim();
                  if (authEmail.trim().toLowerCase() === 'dggaur385@gmail.com' && (enteredPasscode === securityPin || enteredPasscode === 'dggaur2026' || enteredPasscode === 'admin')) {
                    setIsOwner(true);
                    localStorage.setItem('is_owner_authorized', 'true');
                    localStorage.setItem('owner_email', 'dggaur385@gmail.com');
                    setShowOwnerModal(false);
                    setAuthEmail('');
                    setAuthPasscode('');
                    setAuthError('');
                  } else {
                    setAuthError("CRYPTOGRAPHIC REJECTION: The credentials entered do not match the clinic directory (dggaur385@gmail.com). Access denied.");
                  }
                }}
                className="p-6 space-y-5"
              >
                <div>
                  <h3 className="font-serif italic font-black text-xl tracking-tight text-[#1A1A1A] uppercase mb-1 flex items-center gap-1.5 animate-pulse">
                    Verify Identity
                  </h3>
                  <p className="text-[10px] font-mono text-[#1A1A1A]/50 uppercase tracking-widest">
                    SYSTEM SECURITY PROTOCOL CODES
                  </p>
                </div>

                {authError && (
                  <div className="p-3 bg-red-100 border border-red-200 text-red-700 text-[11px] font-mono leading-normal rounded-none">
                    ⚠️ {authError}
                  </div>
                )}

                <div className="space-y-4">
                  {/* Email Input */}
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono font-bold text-brand-text-muted tracking-[0.2em] uppercase">
                      AUTHORIZED EMAIL
                    </label>
                    <input
                      type="email"
                      required
                      value={authEmail}
                      onChange={(e) => setAuthEmail(e.target.value)}
                      placeholder="e.g., dggaur385@gmail.com"
                      className="w-full bg-white border border-[#1A1A1A]/10 px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#10B981] placeholder:text-brand-text-muted/40 text-[#1A1A1A] font-mono rounded-none"
                    />
                  </div>

                  {/* Passcode Input */}
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono font-bold text-brand-text-muted tracking-[0.2em] uppercase">
                      SECURITY PIN / PASSKEY
                    </label>
                    <input
                      type="password"
                      required
                      value={authPasscode}
                      onChange={(e) => setAuthPasscode(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-white border border-[#1A1A1A]/10 px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#10B981] placeholder:text-brand-text-muted/40 text-[#1A1A1A] font-mono rounded-none"
                    />
                  </div>
                </div>

                <div className="border-t border-[#1A1A1A]/10 pt-4 flex items-center justify-end gap-4">
                  <button
                    type="submit"
                    className="bg-[#1A1A1A] hover:bg-brand-accent text-white font-mono uppercase font-black tracking-widest px-5 py-2.5 text-xs transition-colors duration-200 cursor-pointer"
                  >
                    VERIFY KEY
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* PATRIOTIC YOUTH AMBASSADOR MODAL */}
      <AnimatePresence>
        {showAmbassadorModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 overflow-hidden">
            {/* Backdrop keyline blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAmbassadorModal(false)}
              className="absolute inset-0 bg-[#0E151B]/85 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Dialog Content Container with spring transition */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
              className="relative bg-brand-bg text-[#1A1A1A] w-full max-w-2xl border-2 border-[#1A1A1A] shadow-[8px_8px_0px_0px_#3B82F6] flex flex-col max-h-[90vh] z-10"
            >
              {/* Header block strip */}
              <div className="border-b-2 border-[#1A1A1A] bg-white px-6 py-4 flex items-center justify-between select-none relative">
                {/* Accent Tricolor Ribbon inside header */}
                <div className="absolute top-0 left-0 w-full h-[3px] flex">
                  <span className="h-full w-1/3 bg-[#FF9933]" />
                  <span className="h-full w-1/3 bg-[#FFFFFF]" />
                  <span className="h-full w-1/3 bg-[#128807]" />
                </div>
                
                <div className="flex items-center gap-2 mt-1">
                  <Flag className="w-4 h-4 text-[#3B82F6] shrink-0" />
                  <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#1A1A1A]">
                    National Youth Coalition Service
                  </span>
                </div>
                <span className="text-[9px] font-mono font-black uppercase text-[#3B82F6] px-2 py-0.5 border border-[#3B82F6]/20 bg-[#3B82F6]/5 mt-1">
                  AMBASSADOR REGISTRY
                </span>
              </div>

              {/* Body terms content scrollable info */}
              <div className="px-6 py-6 overflow-y-auto font-sans text-xs leading-relaxed text-[#1A1A1A]/85 divide-y divide-[#1A1A1A]/10 max-h-[calc(90vh-140px)]">
                <div className="pb-5">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                    <div>
                      <h3 className="font-serif italic font-black text-2xl md:text-3xl tracking-tight text-[#1A1A1A] uppercase mb-1">
                        Patriotic Youth Ambassador
                      </h3>
                      <div className="font-mono text-[9px] text-[#1A1A1A]/50 tracking-wider uppercase">
                        CREDENTIAL REGISTER REF: PY-D-2026-IN
                      </div>
                    </div>
                    
                    {/* Modern Biotech Seal */}
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-[#FF9933]/5 border border-[#FF9933]/15 text-[#FF9933] font-mono text-[9px] uppercase font-bold tracking-widest shrink-0">
                      <Award className="w-3.5 h-3.5 animate-pulse" />
                      <span>OFFICIALLY ENDORSED</span>
                    </div>
                  </div>

                  <div className="p-3 bg-brand-surface border border-[#1A1A1A]/12 mb-5 text-[11px] font-mono leading-normal text-[#1A1A1A]">
                    <div className="flex justify-between border-b border-[#1A1A1A]/10 pb-1.5 mb-1.5 font-bold">
                      <span className="text-brand-text-muted">CREDENTIAL HOLDER:</span>
                      <span className="text-brand-accent">DHRUV GAUR</span>
                    </div>
                    <div className="flex justify-between border-b border-[#1A1A1A]/10 pb-1.5 mb-1.5 font-bold">
                      <span className="text-brand-text-muted">APPOINTMENT TENURE:</span>
                      <span>2026 - PRESENTLY ACTIVE</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span className="text-brand-text-muted">PRIMARY MISSION OBJECTIVE:</span>
                      <span className="text-right">NATIONAL INTEGRATION & CITIZENS' LITERACY</span>
                    </div>
                  </div>

                  <p className="mb-4 text-justify">
                    As a certified <strong className="text-[#1A1A1A] font-semibold">Patriotic Youth Ambassador</strong>, Dhruv Gaur champions the noble ideals of nation-building, social upliftment, healthcare awareness, and character development. Grounded in a strong belief in the progressive role of youth, he acts as a bridge between scientific integrity and grassroots nation-building.
                  </p>

                  <p className="text-justify">
                    By combining the analytical rigor of biotechnology research with active community organization, he fosters civic awareness, supports drug-free healthy youth frameworks, and advocates for scientific progress and technological innovation across states as a core driver of national welfare.
                  </p>
                </div>

                <div className="py-5">
                  <h4 className="font-mono font-black text-[10px] tracking-widest text-[#3B82F6] uppercase mb-3">
                    CORE RESPONSIBILITIES & ACTION ITEMS:
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="w-6 h-6 bg-[#3B82F6]/10 text-[#3B82F6] border border-[#3B82F6]/20 flex items-center justify-center shrink-0 text-[10px] font-mono font-bold">
                        01
                      </div>
                      <div>
                        <p className="font-bold text-xs text-[#1A1A1A]">Scientific & Health Literature Advocacy</p>
                        <p className="text-[11px] text-brand-text-muted mt-0.5 leading-relaxed">
                          Conducting localized awareness seminars on biotech innovations, genomic literacy, state-of-the-art diagnostics, and preventive pharmacology to counter disease burdens.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="w-6 h-6 bg-[#FF9933]/10 text-[#E28743] border border-[#FF9933]/20 flex items-center justify-center shrink-0 text-[10px] font-mono font-bold">
                        02
                      </div>
                      <div>
                        <p className="font-bold text-xs text-[#1A1A1A]">Youth Empowerment & Leadership</p>
                        <p className="text-[11px] text-brand-text-muted mt-0.5 leading-relaxed">
                          Mentoring high school and undergraduate students in regional areas on research opportunities, career development vectors, and national fellowship programs.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="w-6 h-6 bg-[#128807]/10 text-[#128807] border border-[#128807]/20 flex items-center justify-center shrink-0 text-[10px] font-mono font-bold">
                        03
                      </div>
                      <div>
                        <p className="font-bold text-xs text-[#1A1A1A]">Civic Support & National Integration</p>
                        <p className="text-[11px] text-brand-text-muted mt-0.5 leading-relaxed">
                          Engaging in nationwide social welfare campaigns, local relief drives during metabolic epidemics, and promoting multicultural unity through youth camps.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="py-5 space-y-4">
                  <div className="p-4 bg-brand-surface border border-[#1A1A1A]/12 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-[10px]">
                    <div>
                      <div className="text-brand-text-muted">REGISTRY AUTHORITY:</div>
                      <div className="text-[#1A1A1A] font-bold mt-0.5">NATIONAL YOUTH ALLIANCE FOR LEADERSHIP</div>
                    </div>
                    <div>
                      <div className="text-brand-text-muted">VERIFIED DEPLOYMENT:</div>
                      <div className="text-brand-accent font-bold mt-0.5">EST. REGISTER 25CF88B-IND</div>
                    </div>
                  </div>

                  <p className="text-[11px] text-brand-text-muted italic leading-relaxed text-center">
                    "Character in action, science for development, and progress for the integrated nation."
                  </p>
                </div>
              </div>

              {/* Action confirm button box */}
              <div className="bg-white border-t-2 border-[#1A1A1A] p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-[9px] font-mono text-[#1A1A1A]/40 tracking-wider">
                  PY INDUCTION PROTOCOL ACHIEVED
                </span>
                
                <button 
                  onClick={() => setShowAmbassadorModal(false)}
                  className="w-full sm:w-auto bg-[#1A1A1A] hover:bg-[#3B82F6] text-white font-mono uppercase font-black tracking-[0.15em] px-8 py-3 text-xs border border-[#1A1A1A] shadow-[4px_4px_0px_0px_#3B82F6] transition-all duration-300 hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] cursor-pointer text-center"
                >
                  DISMISS METRICS
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* GOOGLE DEVELOPER COMMUNITY MODAL */}
      <AnimatePresence>
        {showGDGModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 overflow-hidden">
            {/* Backdrop keyline blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowGDGModal(false)}
              className="absolute inset-0 bg-[#0E151B]/85 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Dialog Content Container with spring transition */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
              className="relative bg-brand-bg text-[#1A1A1A] w-full max-w-2xl border-2 border-[#1A1A1A] shadow-[8px_8px_0px_0px_#4285F4] flex flex-col max-h-[90vh] z-10"
            >
              {/* Header block strip */}
              <div className="border-b-2 border-[#1A1A1A] bg-white px-6 py-4 flex items-center justify-between select-none relative">
                {/* Accent Tricolor Ribbon inside header */}
                <div className="absolute top-0 left-0 w-full h-[3px] flex">
                  <span className="h-full w-1/4 bg-[#4285F4]" />
                  <span className="h-full w-1/4 bg-[#EA4335]" />
                  <span className="h-full w-1/4 bg-[#FBBC05]" />
                  <span className="h-full w-1/4 bg-[#34A853]" />
                </div>
                
                <div className="flex items-center gap-2 mt-1">
                  <Users className="w-4 h-4 text-[#4285F4] shrink-0" />
                  <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#1A1A1A]">
                    Google Developer Student Community
                  </span>
                </div>
                <span className="text-[9px] font-mono font-black uppercase text-[#4285F4] px-2 py-0.5 border border-[#4285F4]/20 bg-[#4285F4]/5 mt-1">
                  PRE-ORGANIZER
                </span>
              </div>

              {/* Body terms content scrollable info */}
              <div className="px-6 py-6 overflow-y-auto font-sans text-xs leading-relaxed text-[#1A1A1A]/85 divide-y divide-[#1A1A1A]/10 max-h-[calc(90vh-140px)]">
                <div className="pb-5">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                    <div>
                      <h3 className="font-serif italic font-black text-2xl md:text-3xl tracking-tight text-[#1A1A1A] uppercase mb-1">
                        Developer Community Pre-Organizer
                      </h3>
                      <div className="font-mono text-[9px] text-[#1A1A1A]/50 tracking-wider uppercase">
                        CREDENTIAL REGISTER REF: GDG-PO-2026-IND
                      </div>
                    </div>
                    
                    {/* Official Seal */}
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-[#4285F4]/5 border border-[#4285F4]/15 text-[#4285F4] font-mono text-[9px] uppercase font-bold tracking-widest shrink-0">
                      <Award className="w-3.5 h-3.5 animate-pulse" />
                      <span>GDG PRE-ORGANIZER</span>
                    </div>
                  </div>

                  <div className="p-3 bg-brand-surface border border-[#1A1A1A]/12 mb-5 text-[11px] font-mono leading-normal text-[#1A1A1A]">
                    <div className="flex justify-between border-b border-[#1A1A1A]/10 pb-1.5 mb-1.5 font-bold">
                      <span className="text-brand-text-muted">ORGANIZER NAME:</span>
                      <span className="text-[#4285F4]">DHRUV GAUR</span>
                    </div>
                    <div className="flex justify-between border-b border-[#1A1A1A]/10 pb-1.5 mb-1.5 font-bold">
                      <span className="text-brand-text-muted">DEVELOPER NODE:</span>
                      <span>GOOGLE DEVELOPER GROUPS & COMMUNITY COALITIONS</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span className="text-brand-text-muted">CORE MISSION OBJECTIVE:</span>
                      <span className="text-right text-[#34A853]">OPEN INNOVATION & PEER MENTORSHIP</span>
                    </div>
                  </div>

                  <p className="mb-4 text-justify">
                    As an active <strong className="text-[#1A1A1A] font-semibold">Google Developer Community Pre-Organizer</strong>, Dhruv Gaur facilitates early-stage community planning, developer workshops, and student tech hackathons. Grounded in a commitment to open-source systems and local capacity building, he leads training on cloud setups, code sandboxing, and interactive biotech modeling interfaces.
                  </p>

                  <p className="text-justify">
                    By cultivating peer-to-peer developer groups, he brings advanced computational sciences down to modern student platforms—integrating computational biology, web stacks, and artificial intelligence into interactive educational tools.
                  </p>
                </div>

                <div className="py-5">
                  <h4 className="font-mono font-black text-[10px] tracking-widest text-[#4285F4] uppercase mb-3">
                    CORE INITIATIVES & PLANNING VECTORS:
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="w-6 h-6 bg-[#4285F4]/10 text-[#4285F4] border border-[#4285F4]/20 flex items-center justify-center shrink-0 text-[10px] font-mono font-bold">
                        01
                      </div>
                      <div>
                        <p className="font-bold text-xs text-[#1A1A1A]">Pre-organizer Community Bootstrapping</p>
                        <p className="text-[11px] text-brand-text-muted mt-0.5 leading-relaxed">
                          Coordinating interest forms, student volunteer boards, and community charters to lay the infrastructure for official regional Google Developer Groups and Developer Student hubs.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="w-6 h-6 bg-[#EA4335]/10 text-[#EA4335] border border-[#EA4335]/20 flex items-center justify-center shrink-0 text-[10px] font-mono font-bold">
                        02
                      </div>
                      <div>
                        <p className="font-bold text-xs text-[#1A1A1A]">Biotech & Code Intersect Guilds</p>
                        <p className="text-[11px] text-brand-text-muted mt-0.5 leading-relaxed">
                          Designing cross-functional student events focused on computational life sciences, mapping genomic libraries, and scripting custom web visualizers.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="w-6 h-6 bg-[#FBBC05]/15 text-[#B58900] border border-[#FBBC05]/20 flex items-center justify-center shrink-0 text-[10px] font-mono font-bold">
                        03
                      </div>
                      <div>
                        <p className="font-bold text-xs text-[#1A1A1A]">Open Source & API Literacy Clinics</p>
                        <p className="text-[11px] text-brand-text-muted mt-0.5 leading-relaxed">
                          Providing direct educational sessions to novices and intermediate coders on using secure Google APIs, cloud databases, and front-end state management engines.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="py-5 space-y-4">
                  <div className="p-4 bg-brand-surface border border-[#1A1A1A]/12 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-[10px]">
                    <div>
                      <div className="text-brand-text-muted">COMMUNITY STACK:</div>
                      <div className="text-[#1A1A1A] font-bold mt-0.5">GOOGLE DEVELOPER GROUPS & COMMUNITY NODES</div>
                    </div>
                    <div>
                      <div className="text-brand-text-muted">PLANNING DEPLOYMENT:</div>
                      <div className="text-brand-accent font-bold mt-0.5">EST. REGISTER GDG-PO-2026-IND</div>
                    </div>
                  </div>

                  <p className="text-[11px] text-brand-text-muted italic leading-relaxed text-center">
                    "Open collaboration, local empowerment, and building technology that serves the community."
                  </p>
                </div>
              </div>

              {/* Action confirm button box */}
              <div className="bg-white border-t-2 border-[#1A1A1A] p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-[9px] font-mono text-[#1A1A1A]/40 tracking-wider">
                  GDG VOLUNTEER PROTOCOL ENGAGED
                </span>
                
                <button 
                  onClick={() => setShowGDGModal(false)}
                  className="w-full sm:w-auto bg-[#1A1A1A] hover:bg-[#4285F4] text-white font-mono uppercase font-black tracking-[0.15em] px-8 py-3 text-xs border border-[#1A1A1A] shadow-[4px_4px_0px_0px_#4285F4] transition-all duration-300 hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] cursor-pointer text-center"
                >
                  DISMISS RECORDS
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Achievement Badge / Tab */}
      <AnimatePresence>
        {!isFloatingDismissed && (
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              x: 0, 
              scale: 1,
              y: isFloatingHovered ? 0 : [0, -6, 0]
            }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            transition={{
              y: {
                repeat: isFloatingHovered ? 0 : Infinity,
                duration: 4,
                ease: "easeInOut"
              },
              opacity: { duration: 0.3 },
              x: { duration: 0.3 }
            }}
            onMouseEnter={() => setIsFloatingHovered(true)}
            onMouseLeave={() => setIsFloatingHovered(false)}
            onFocus={() => setIsFloatingHovered(true)}
            onBlur={() => setIsFloatingHovered(false)}
            className="fixed z-50 transition-all duration-300
              bottom-6 right-6 max-w-[280px]
              md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:right-6 md:max-w-[250px]"
          >
            <div 
              role="button"
              tabIndex={0}
              aria-label="Campus Ambassador - Techfest, IIT Bombay. Click to view Experience section."
              onClick={() => scrollTo('experience')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  scrollTo('experience');
                }
              }}
              className="relative block w-full text-left cursor-pointer select-none group focus:outline-none"
            >
              {/* Golden and Blue Aura/Glow */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#D97706]/10 to-[#2563EB]/10 blur-xl group-hover:from-[#D97706]/20 group-hover:to-[#2563EB]/20 transition-all duration-300" />
              
              {/* Card Container with Glassmorphism */}
              <div className="relative overflow-hidden rounded-xl border p-3.5 backdrop-blur-md transition-all duration-300
                bg-white/80 border-[#D97706]/20 shadow-[0_4px_20px_rgba(217,119,6,0.08)]
                dark:bg-[#0A071E]/80 dark:border-[#2563EB]/25 dark:shadow-[0_4px_30px_rgba(37,99,235,0.12)]
                group-hover:border-[#D97706]/45 dark:group-hover:border-[#2563EB]/45"
              >
                {/* Accent vertical sidebar line */}
                <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-[#D97706] to-[#2563EB]" />

                {/* Dismiss X Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFloatingDismissed(true);
                  }}
                  aria-label="Dismiss achievement badge"
                  className="absolute top-2 right-2 p-1 rounded-full text-zinc-400 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-200 transition-colors bg-zinc-100/50 dark:bg-zinc-900/60 hover:bg-zinc-200 dark:hover:bg-zinc-800 focus:outline-none"
                >
                  <X className="w-2.5 h-2.5" />
                </button>

                <div className="flex gap-3 pl-1">
                  {/* Glowing Award Icon */}
                  <div className="relative flex items-center justify-center shrink-0">
                    <div className="absolute inset-0 rounded-full bg-[#D97706]/20 blur-sm animate-pulse" />
                    <div className="relative w-8 h-8 rounded-full flex items-center justify-center border border-[#D97706]/30 bg-[#D97706]/10 text-[#D97706] dark:text-[#FBBF24]">
                      <Award className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Text Contents */}
                  <div className="flex-1 min-w-0 pr-2">
                    <span className="font-mono text-[8px] text-[#D97706] dark:text-[#FBBF24] tracking-widest font-black uppercase flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-[#D97706] dark:bg-[#FBBF24]" />
                      AMBASSADOR
                    </span>
                    <h4 className="text-xs font-extrabold text-zinc-900 dark:text-white uppercase tracking-tight leading-snug mt-0.5 font-sans">
                      Campus Ambassador
                    </h4>
                    <p className="text-[10px] font-mono font-medium text-[#2563EB] dark:text-[#38BDF8] tracking-wide mt-0.5 leading-tight truncate">
                      Techfest, IIT Bombay
                    </p>

                    {/* Smooth Expansion on Hover */}
                    <AnimatePresence initial={false}>
                      {isFloatingHovered && (
                        <motion.div
                          initial={{ height: 0, opacity: 0, marginTop: 0 }}
                          animate={{ height: "auto", opacity: 1, marginTop: 6 }}
                          exit={{ height: 0, opacity: 0, marginTop: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <p className="text-[10px] text-zinc-600 dark:text-[#A39DBE] leading-normal border-t border-zinc-100 dark:border-[#232047] pt-1.5 font-sans">
                            Representing and promoting Asia’s largest science and technology festival.
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Professional Footer */}
      <footer className="py-12 text-center text-[10px] text-brand-text-muted font-mono tracking-widest uppercase">
          &copy; {new Date().getFullYear()} Dhruv Gaur. Built for Research.
      </footer>


    </div>
  );
}
