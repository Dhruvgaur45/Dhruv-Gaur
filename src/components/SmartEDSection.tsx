import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  GraduationCap,
  BookOpen,
  Sparkles,
  Award,
  Users,
  Megaphone,
  Network,
  MessageSquare,
  Mic,
  Calendar,
  Clock,
  Lightbulb,
  Shield,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  ArrowRight,
  Send,
  Eye,
  X,
  ExternalLink,
  Target,
  Globe2,
  Building,
  Layers,
  Compass,
  Star
} from 'lucide-react';

interface GalleryItem {
  id: string;
  category: 'Certificates' | 'Events' | 'Campaigns' | 'Workshops' | 'Campus Activities';
  title: string;
  subtitle: string;
  date: string;
  description: string;
  tags: string[];
  gradient: string;
  icon: React.ReactNode;
}

const GALLERY_DATA: GalleryItem[] = [
  {
    id: 'gal-cert',
    category: 'Certificates',
    title: 'SmartED Campus Ambassador Appointment',
    subtitle: 'Official Letter of Credential & Representation',
    date: 'Present / 2026',
    description: 'Formal appointment and verification as Campus Ambassador representing SmartED across academic initiatives, student empowerment drives, and learning bootcamps.',
    tags: ['SmartED', 'Credential', 'Ambassador', 'Leadership'],
    gradient: 'from-indigo-600/30 via-purple-600/20 to-pink-600/20',
    icon: <Award className="w-8 h-8 text-indigo-400" />
  },
  {
    id: 'gal-events',
    category: 'Events',
    title: 'University Educational Seminars',
    subtitle: 'Student Learning & Industry Readiness Panels',
    date: 'Quarterly Series',
    description: 'Promoting interactive seminars and webinars that connect undergraduate students with industry leaders, educational mentors, and technical roadmap experts.',
    tags: ['Webinars', 'Panels', 'Campus Life', 'Skill Building'],
    gradient: 'from-purple-600/30 via-fuchsia-600/20 to-indigo-600/20',
    icon: <Calendar className="w-8 h-8 text-purple-400" />
  },
  {
    id: 'gal-campaigns',
    category: 'Campaigns',
    title: 'SmartED Skill Up 2026 Initiative',
    subtitle: 'Peer Engagement & Resource Distribution Drive',
    date: 'Campus-wide Campaign',
    description: 'Digital and on-ground awareness campaigns informing student circles about subsidized certifications, open courses, and collaborative learning resources.',
    tags: ['Outreach', 'Campaign', 'Digital Media', 'Advocacy'],
    gradient: 'from-fuchsia-600/30 via-rose-600/20 to-purple-600/20',
    icon: <Megaphone className="w-8 h-8 text-fuchsia-400" />
  },
  {
    id: 'gal-workshops',
    category: 'Workshops',
    title: 'Hands-on Technical & Career Bootcamps',
    subtitle: 'Practical Skills & Interactive Mentorship',
    date: 'Interactive Sessions',
    description: 'Facilitating student participation in high-impact workshops spanning software development, biotechnology applications, and professional communication.',
    tags: ['Workshops', 'Hands-on', 'Mentorship', 'Career'],
    gradient: 'from-blue-600/30 via-indigo-600/20 to-cyan-600/20',
    icon: <BookOpen className="w-8 h-8 text-blue-400" />
  },
  {
    id: 'gal-activities',
    category: 'Campus Activities',
    title: 'Peer Orientation & Resource Clinics',
    subtitle: 'Community Building & Student Guidance',
    date: 'Ongoing Campus Hub',
    description: 'Connecting student cohorts directly with SmartED educational advisors, answering inquiries, and fostering a supportive, ambition-driven student network.',
    tags: ['Community', 'Peer Support', 'Student Hub', 'Engagement'],
    gradient: 'from-emerald-600/30 via-teal-600/20 to-indigo-600/20',
    icon: <Users className="w-8 h-8 text-emerald-400" />
  }
];

export default function SmartEDSection() {
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryItem | null>(null);
  const [completedGoals, setCompletedGoals] = useState<{ [key: string]: boolean }>({
    'goal-1': true,
    'goal-2': true,
    'goal-3': true,
    'goal-4': true,
    'goal-5': false,
    'goal-6': false
  });

  const toggleGoal = (id: string) => {
    setCompletedGoals(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  const responsibilities = [
    {
      title: 'Student Outreach',
      desc: 'Promote SmartED initiatives among students across multiple university departments.',
      icon: <Megaphone className="w-6 h-6 text-indigo-500" />,
      tag: 'Awareness'
    },
    {
      title: 'Community Building',
      desc: 'Connect students with educational opportunities, mentorship groups, and shared resources.',
      icon: <Users className="w-6 h-6 text-purple-500" />,
      tag: 'Ecosystem'
    },
    {
      title: 'Event Promotion',
      desc: 'Support webinars, workshops, and campaigns to maximize active student participation.',
      icon: <Calendar className="w-6 h-6 text-pink-500" />,
      tag: 'Promotion'
    },
    {
      title: 'Leadership',
      desc: 'Represent SmartED professionally on campus, championing quality education and growth.',
      icon: <Shield className="w-6 h-6 text-blue-500" />,
      tag: 'Ambassadorship'
    },
    {
      title: 'Communication',
      desc: 'Act as a bridge between students and SmartED to deliver timely updates and feedback.',
      icon: <MessageSquare className="w-6 h-6 text-emerald-500" />,
      tag: 'Liaison'
    },
    {
      title: 'Professional Growth',
      desc: 'Develop leadership and organizational skills through active project execution and networking.',
      icon: <TrendingUp className="w-6 h-6 text-amber-500" />,
      tag: 'Development'
    }
  ];

  const skills = [
    { name: 'Leadership', icon: <Shield className="w-4 h-4 text-indigo-400" /> },
    { name: 'Public Speaking', icon: <Mic className="w-4 h-4 text-purple-400" /> },
    { name: 'Communication', icon: <MessageSquare className="w-4 h-4 text-pink-400" /> },
    { name: 'Networking', icon: <Network className="w-4 h-4 text-cyan-400" /> },
    { name: 'Event Management', icon: <Calendar className="w-4 h-4 text-blue-400" /> },
    { name: 'Team Collaboration', icon: <Users className="w-4 h-4 text-emerald-400" /> },
    { name: 'Marketing', icon: <Megaphone className="w-4 h-4 text-amber-400" /> },
    { name: 'Campus Engagement', icon: <GraduationCap className="w-4 h-4 text-indigo-400" /> },
    { name: 'Problem Solving', icon: <Lightbulb className="w-4 h-4 text-yellow-400" /> },
    { name: 'Time Management', icon: <Clock className="w-4 h-4 text-rose-400" /> }
  ];

  const impactStats = [
    { label: 'Programs Promoted', value: '15+', sub: 'Campus campaigns & workshops' },
    { label: 'Student Engagement', value: '500+', sub: 'Direct peers & attendees reached' },
    { label: 'Events Supported', value: '12+', sub: 'Webinars, drives & meetups' },
    { label: 'Community Growth', value: '98%', sub: 'Positive student response rate' },
    { label: 'Leadership Experience', value: 'Active', sub: 'Current role appointment' }
  ];

  const goals = [
    { id: 'goal-1', text: 'Expand student outreach' },
    { id: 'goal-2', text: 'Organize educational events' },
    { id: 'goal-3', text: 'Increase campus engagement' },
    { id: 'goal-4', text: 'Develop leadership' },
    { id: 'goal-5', text: 'Build meaningful collaborations' },
    { id: 'goal-6', text: 'Support innovative learning initiatives' }
  ];

  return (
    <div className="space-y-20 relative">
      {/* Background Decorative Gradients */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-purple-500/[0.07] via-indigo-500/[0.08] to-pink-500/[0.07] blur-[120px] pointer-events-none -z-10 rounded-full" />

      <div className="space-y-20">

        {/* ----------------- SECTION 1: HERO ----------------- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl p-8 md:p-14 overflow-hidden border border-[#8B5CF6]/30 bg-gradient-to-br from-[#151130]/95 via-[#0F0C23]/95 to-[#1A1438]/95 shadow-[0_8px_32px_rgba(139,92,246,0.15)] text-white"
        >
          {/* Subtle Grid / Pattern overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(#8B5CF6_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-6">
              {/* Premium Current Position Badge */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8B5CF6]/20 border border-[#A78BFA]/40 text-[#E9D5FF] font-mono text-[10px] font-bold uppercase tracking-widest backdrop-blur-md shadow-[0_0_15px_rgba(139,92,246,0.2)]">
                  <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse" />
                  CURRENT POSITION
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/80 font-mono text-[9.5px] uppercase tracking-wider">
                  <Building className="w-3.5 h-3.5 text-[#A78BFA]" />
                  SMARTED AMBASSADOR NETWORK
                </div>
              </div>

              {/* Title & Subtitle */}
              <div className="space-y-3">
                <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
                  Campus Ambassador at{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D946EF] via-[#A78BFA] to-[#6366F1] drop-shadow-[0_0_20px_rgba(217,70,239,0.3)]">
                    SmartED
                  </span>
                </h1>
                <p className="font-sans text-base sm:text-lg text-[#D1D5DB] leading-relaxed max-w-2xl font-normal">
                  Empowering students through education, leadership, innovation, and community engagement.
                </p>
              </div>

              {/* Quick Key Highlights Chips */}
              <div className="flex flex-wrap gap-2.5 pt-2">
                {[
                  { label: 'Campus Outreach', icon: <Megaphone className="w-3.5 h-3.5 text-[#D946EF]" /> },
                  { label: 'Student Empowerment', icon: <GraduationCap className="w-3.5 h-3.5 text-[#A78BFA]" /> },
                  { label: 'Academic Innovation', icon: <Sparkles className="w-3.5 h-3.5 text-[#38BDF8]" /> }
                ].map((chip, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/90 text-xs font-mono font-medium backdrop-blur-sm hover:border-[#8B5CF6]/50 transition-colors"
                  >
                    {chip.icon}
                    <span>{chip.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Animated Glassmorphism Illustration */}
            <div className="lg:col-span-4 flex justify-center">
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-3xl p-6 bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/20 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.37)] flex flex-col items-center justify-center text-center space-y-3 group"
              >
                {/* Ambient glowing orb inside */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-[#8B5CF6]/20 via-[#D946EF]/20 to-transparent blur-xl group-hover:scale-110 transition-transform duration-500" />
                
                <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#6366F1] to-[#D946EF] p-0.5 shadow-[0_0_25px_rgba(139,92,246,0.5)] flex items-center justify-center">
                  <div className="w-full h-full rounded-[14px] bg-[#120D2C] flex items-center justify-center">
                    <GraduationCap className="w-10 h-10 text-[#E9D5FF] group-hover:rotate-12 transition-transform duration-300" />
                  </div>
                </div>

                <div className="relative space-y-1">
                  <h3 className="font-display font-bold text-sm text-white tracking-wide uppercase">
                    SmartED Ambassador
                  </h3>
                  <p className="font-mono text-[10px] text-[#A78BFA] tracking-wider font-semibold">
                    SHARDA UNIVERSITY CHAPTER
                  </p>
                </div>

                <div className="relative inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10B981]/20 border border-[#10B981]/40 text-[#6EE7B7] text-[9px] font-mono font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping" />
                  ACTIVE ROLE
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>


        {/* ----------------- SECTION 2: ABOUT MY ROLE ----------------- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl p-8 md:p-10 border border-brand-border bg-brand-surface-card relative shadow-xs"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-brand-border">
            <div className="space-y-1">
              <span className="text-brand-accent text-[10px] font-mono font-bold tracking-widest uppercase block">
                Overview & Purpose
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-black text-brand-text tracking-tight">
                About My Role
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-brand-text-muted">
              <Compass className="w-4 h-4 text-brand-accent" />
              <span>COMMUNITY PILLAR & STUDENT LIAISON</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <p className="font-sans text-sm sm:text-base text-brand-text leading-relaxed font-normal text-justify">
                As a Campus Ambassador at SmartED, I actively represent the organization within my academic community by promoting educational initiatives, connecting students with valuable learning opportunities, and encouraging participation in skill development programs. This role enables me to strengthen my leadership, communication, networking, and event management skills while contributing to a positive learning ecosystem.
              </p>
              <div className="p-4 rounded-xl bg-brand-surface border border-brand-border flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
                <p className="text-xs font-sans text-brand-text-muted leading-relaxed">
                  Working closely with university students, academic departments, and educational mentors to bridge theoretical classroom curricula with real-world industry competencies and certifications.
                </p>
              </div>
            </div>

            <div className="lg:col-span-4 grid grid-cols-1 gap-3">
              {[
                { title: 'Student Connection', desc: 'Direct liaison for educational opportunities', icon: <Users className="w-4 h-4 text-indigo-500" /> },
                { title: 'Skill Development', desc: 'Advocating industry-aligned bootcamps', icon: <Target className="w-4 h-4 text-purple-500" /> },
                { title: 'Community Growth', desc: 'Fostering peer collaboration & networks', icon: <Globe2 className="w-4 h-4 text-emerald-500" /> }
              ].map((pill, i) => (
                <div key={i} className="p-3.5 rounded-xl border border-brand-border bg-white/40 dark:bg-black/20 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-brand-surface border border-brand-border shrink-0">
                    {pill.icon}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-brand-text">{pill.title}</h4>
                    <p className="text-[10px] text-brand-text-muted leading-tight">{pill.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>


        {/* ----------------- SECTION 3: RESPONSIBILITIES ----------------- */}
        <div className="space-y-8">
          <div className="space-y-2">
            <span className="text-brand-accent text-[10px] font-mono font-bold tracking-widest uppercase block">
              Core Deliverables
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-black text-brand-text tracking-tight">
              Ambassador Responsibilities
            </h2>
            <p className="text-xs sm:text-sm text-brand-text-muted max-w-2xl font-normal">
              Structured operational objectives driving student engagement, campaign execution, and cross-campus outreach.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {responsibilities.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ y: -4 }}
                className="rounded-2xl p-6 border border-brand-border bg-brand-surface-card hover:border-brand-accent/50 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between space-y-4 group relative overflow-hidden"
              >
                {/* Top subtle highlight */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-brand-surface border border-brand-border flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider bg-brand-surface border border-brand-border text-brand-text-muted">
                      {item.tag}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="font-sans font-bold text-base text-brand-text group-hover:text-brand-accent transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-brand-text-muted leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-brand-border flex items-center justify-between text-[10px] font-mono text-brand-text-muted">
                  <span>OBJECTIVE #{idx + 1}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-brand-accent group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>


        {/* ----------------- SECTION 4: SKILLS DEVELOPED ----------------- */}
        <div className="space-y-8">
          <div className="space-y-2">
            <span className="text-brand-accent text-[10px] font-mono font-bold tracking-widest uppercase block">
              Professional Competencies
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-black text-brand-text tracking-tight">
              Skills Developed
            </h2>
            <p className="text-xs sm:text-sm text-brand-text-muted max-w-2xl font-normal">
              Practical interpersonal, organizational, and executive capabilities honed through campus ambassadorship.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
            {skills.map((skill, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.04 }}
                whileHover={{ scale: 1.04, y: -2 }}
                className="p-3.5 rounded-xl border border-brand-border bg-brand-surface-card hover:bg-brand-surface hover:border-brand-accent/40 text-brand-text transition-all duration-200 cursor-default flex items-center gap-3 shadow-xs"
              >
                <div className="p-2 rounded-lg bg-brand-surface border border-brand-border shrink-0">
                  {skill.icon}
                </div>
                <span className="font-sans text-xs font-semibold tracking-tight text-brand-text truncate">
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>


        {/* ----------------- SECTION 5: IMPACT (PROFESSIONAL DEVELOPMENT) ----------------- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl p-8 md:p-12 border border-[#8B5CF6]/20 bg-gradient-to-br from-[#151130] via-[#0F0C23] to-[#1E1540] text-white shadow-xl space-y-8"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B5CF6]/20 text-[#A78BFA] font-mono text-[9px] uppercase font-bold tracking-widest">
                <TrendingUp className="w-3.5 h-3.5" />
                METRICS & SCALE
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-black text-white tracking-tight">
                Professional Development & Impact
              </h2>
              <p className="text-xs sm:text-sm text-[#A39DBE] max-w-xl">
                Continuous quantitative progress and milestones across university initiatives and student network expansion.
              </p>
            </div>
            <div className="font-mono text-[10px] text-[#A78BFA] uppercase tracking-wider bg-white/5 px-3 py-1.5 rounded-lg border border-white/10 self-start md:self-auto">
              Real-time Program Metrics
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {impactStats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#8B5CF6]/50 transition-all duration-300 space-y-2 text-center flex flex-col justify-center"
              >
                <div className="font-display font-black text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#D946EF] via-[#A78BFA] to-[#6366F1]">
                  {stat.value}
                </div>
                <h4 className="font-sans font-bold text-xs text-white tracking-tight">
                  {stat.label}
                </h4>
                <p className="text-[10px] text-[#A39DBE] font-mono leading-tight">
                  {stat.sub}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>


        {/* ----------------- SECTION 6: GALLERY ----------------- */}
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-brand-accent text-[10px] font-mono font-bold tracking-widest uppercase block">
                Visual Proof & Media
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-black text-brand-text tracking-tight">
                Activity Gallery & Specimens
              </h2>
              <p className="text-xs sm:text-sm text-brand-text-muted max-w-2xl font-normal">
                Click any specimen below to open the detailed full-resolution lightbox viewer.
              </p>
            </div>
            <span className="text-[10px] font-mono text-brand-text-muted font-bold uppercase tracking-wider">
              {GALLERY_DATA.length} GALLERY VECTORS AVAILABLE
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {GALLERY_DATA.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                whileHover={{ y: -5 }}
                onClick={() => setSelectedGalleryItem(item)}
                className="group cursor-pointer rounded-2xl overflow-hidden border border-brand-border bg-brand-surface-card hover:border-brand-accent/50 transition-all duration-300 shadow-xs hover:shadow-lg flex flex-col justify-between"
              >
                {/* Visual Header / Mockup Banner */}
                <div className={`h-44 relative bg-gradient-to-br ${item.gradient} p-6 flex flex-col justify-between overflow-hidden border-b border-brand-border`}>
                  <div className="flex justify-between items-start">
                    <span className="px-2.5 py-1 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider bg-black/40 text-white backdrop-blur-md border border-white/10">
                      {item.category}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <Eye className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 shadow-lg">
                      {item.icon}
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-white/80 font-bold uppercase block tracking-wider">
                        {item.date}
                      </span>
                      <h4 className="text-sm font-bold text-white leading-snug drop-shadow-sm">
                        {item.title}
                      </h4>
                    </div>
                  </div>
                </div>

                {/* Card Info Details */}
                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <p className="text-xs text-brand-text-muted leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-brand-border">
                    {item.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded text-[9px] font-mono bg-brand-surface border border-brand-border text-brand-text-muted"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>


        {/* ----------------- SECTION 7: ACHIEVEMENTS TIMELINE ----------------- */}
        <div className="space-y-8">
          <div className="space-y-2">
            <span className="text-brand-accent text-[10px] font-mono font-bold tracking-widest uppercase block">
              Historical Milestones
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-black text-brand-text tracking-tight">
              SmartED Milestones & Roadmap
            </h2>
          </div>

          <div className="relative pl-6 md:pl-10 border-l-2 border-brand-accent/30 space-y-8">
            {/* Milestone 1: Current */}
            <div className="relative group">
              {/* Pulsing Node */}
              <div className="absolute -left-[31px] md:-left-[47px] top-1 w-4 h-4 rounded-full bg-brand-accent border-4 border-brand-bg shadow-sm flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              </div>

              <div className="rounded-2xl p-6 border border-brand-accent/30 bg-gradient-to-br from-indigo-500/[0.04] via-brand-surface-card to-purple-500/[0.04] shadow-xs space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-600 border border-indigo-500/20">
                      CURRENT ROLE
                    </span>
                    <span className="text-[10px] font-mono text-brand-text-muted font-bold">
                      PRESENT (2026)
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-brand-accent">
                    ACTIVE APPOINTMENT
                  </span>
                </div>

                <h3 className="font-sans font-bold text-lg text-brand-text">
                  Campus Ambassador at SmartED
                </h3>
                <p className="text-xs text-brand-text-muted leading-relaxed">
                  Representing SmartED while promoting educational excellence and student engagement. Coordinating university-wide learning drives, supporting technical workshops, and building student community channels.
                </p>
              </div>
            </div>

            {/* Milestone 2: Future Roadmap */}
            <div className="relative opacity-85 group">
              <div className="absolute -left-[31px] md:-left-[47px] top-1 w-4 h-4 rounded-full bg-brand-border border-4 border-brand-bg shadow-sm" />

              <div className="rounded-2xl p-6 border border-brand-border bg-brand-surface-card space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider bg-brand-surface text-brand-text-muted border border-brand-border">
                    UPCOMING ROADMAP
                  </span>
                  <span className="text-[10px] font-mono text-brand-text-muted">
                    SCHEDULED 2026
                  </span>
                </div>
                <h3 className="font-sans font-bold text-base text-brand-text">
                  Regional Outreach Summits & Cross-Chapter Hackathons
                </h3>
                <p className="text-xs text-brand-text-muted leading-relaxed">
                  Expanding partnership networks across North India university hubs, organizing inter-collegiate hackathons, and facilitating student research sponsorships.
                </p>
              </div>
            </div>
          </div>
        </div>


        {/* ----------------- SECTION 8: FUTURE GOALS ----------------- */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-brand-accent text-[10px] font-mono font-bold tracking-widest uppercase block">
              Strategic Vision
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-black text-brand-text tracking-tight">
              Future Goals
            </h2>
            <p className="text-xs sm:text-sm text-brand-text-muted max-w-2xl font-normal">
              Actionable strategic priorities for expanding student engagement, learning accessibility, and leadership impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {goals.map((goal) => {
              const isChecked = completedGoals[goal.id];
              return (
                <motion.div
                  key={goal.id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => toggleGoal(goal.id)}
                  className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between select-none shadow-xs ${
                    isChecked
                      ? 'bg-indigo-500/[0.06] border-indigo-500/30 text-brand-text'
                      : 'bg-brand-surface-card border-brand-border text-brand-text-muted hover:border-brand-accent/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                      isChecked ? 'bg-indigo-600 text-white' : 'bg-brand-surface border border-brand-border text-brand-text-muted'
                    }`}>
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold font-sans">
                      {goal.text}
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-indigo-500">
                    {isChecked ? 'ACTIVE' : 'TARGET'}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>


        {/* ----------------- SECTION 9: CTA ----------------- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl p-8 md:p-12 border border-[#8B5CF6]/30 bg-gradient-to-br from-[#151130] via-[#0F0C23] to-[#1A1438] text-white text-center space-y-6 shadow-xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(#8B5CF6_1px,transparent_1px)] [background-size:20px_20px] opacity-15 pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B5CF6]/20 text-[#A78BFA] font-mono text-[9px] uppercase font-bold tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              SHARED MISSION
            </div>

            <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
              Growing with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D946EF] via-[#A78BFA] to-[#6366F1]">
                SmartED
              </span>
            </h2>

            <p className="font-sans text-sm sm:text-base text-[#D1D5DB] leading-relaxed">
              Committed to empowering students, promoting educational innovation, and creating opportunities for lifelong learning.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('experience')}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] text-white font-sans text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:shadow-[0_0_30px_rgba(217,70,239,0.6)] transition-all cursor-pointer flex items-center gap-2"
              >
                <span>View Portfolio</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('contact')}
                className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white font-sans text-xs font-bold uppercase tracking-wider backdrop-blur-md transition-all cursor-pointer flex items-center gap-2"
              >
                <Send className="w-4 h-4 text-[#A78BFA]" />
                <span>Contact Me</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

      </div>

      {/* ----------------- LIGHTBOX MODAL ----------------- */}
      <AnimatePresence>
        {selectedGalleryItem && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-2xl rounded-3xl overflow-hidden border border-white/20 bg-[#120E2C] text-white shadow-2xl space-y-6"
            >
              {/* Modal Top Header with gradient banner */}
              <div className={`p-8 bg-gradient-to-br ${selectedGalleryItem.gradient} relative border-b border-white/10`}>
                <button
                  onClick={() => setSelectedGalleryItem(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 border border-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
                  aria-label="Close Lightbox"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="space-y-3">
                  <span className="px-3 py-1 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider bg-black/40 text-white border border-white/15 inline-block">
                    {selectedGalleryItem.category}
                  </span>
                  <h3 className="font-display font-black text-2xl text-white">
                    {selectedGalleryItem.title}
                  </h3>
                  <p className="text-xs font-mono text-[#A78BFA] tracking-wider uppercase font-semibold">
                    {selectedGalleryItem.subtitle} • {selectedGalleryItem.date}
                  </p>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-8 pt-0 space-y-6">
                <div className="space-y-2">
                  <h4 className="font-mono text-[10px] text-[#A78BFA] uppercase tracking-widest font-bold">
                    SPECIMEN DESCRIPTION
                  </h4>
                  <p className="text-sm font-sans text-zinc-300 leading-relaxed">
                    {selectedGalleryItem.description}
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-mono text-[10px] text-[#A78BFA] uppercase tracking-widest font-bold">
                    ASSOCIATED KEYWORDS
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedGalleryItem.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-lg text-[10px] font-mono bg-white/5 border border-white/10 text-zinc-300"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span>RECORD REF: SMARTED-SPEC-{selectedGalleryItem.id.toUpperCase()}</span>
                  <button
                    onClick={() => setSelectedGalleryItem(null)}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-sans text-xs font-semibold cursor-pointer transition-colors"
                  >
                    Close Specimen
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
