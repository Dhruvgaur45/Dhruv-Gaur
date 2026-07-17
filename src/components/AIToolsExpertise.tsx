import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  Cpu, 
  Search, 
  Database, 
  Code, 
  Palette, 
  Clock, 
  Workflow, 
  CheckCircle2 
} from 'lucide-react';

export interface AITool {
  id: string;
  name: string;
  description: string;
  category: 'Research' | 'Productivity' | 'Design' | 'AI Development' | 'Coding' | 'Data Analysis' | 'Automation';
  logoColor: string;
  altText: string;
  logoSvg: React.ReactNode;
}

const TOOLS_DATA: AITool[] = [
  {
    id: 'notebooklm',
    name: 'NotebookLM',
    description: 'AI-powered research engine, document understanding, audio discussion synthesis, and source-grounded note generation.',
    category: 'Research',
    logoColor: 'from-teal-500/20 to-cyan-500/20 border-teal-500/30 text-teal-400',
    altText: 'NotebookLM logo',
    logoSvg: (
      <svg className="w-8 h-8" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="NotebookLM logo">
        <rect width="48" height="48" rx="12" fill="#0E1E25" />
        <path d="M12 34V14C12 11.7909 13.7909 10 16 10H24V38H16C13.7909 38 12 36.2091 12 34Z" fill="url(#notebooklm_left_grad)"/>
        <path d="M36 34V14C36 11.7909 34.2091 10 32 10H24V38H32C34.2091 38 36 36.2091 36 34Z" fill="url(#notebooklm_right_grad)"/>
        <line x1="24" y1="10" x2="24" y2="38" stroke="#0E1E25" strokeWidth="2.5" />
        <path d="M16 15H20M16 21H20M16 27H18" stroke="#E0F7FA" strokeWidth="2.2" strokeLinecap="round" opacity="0.9" />
        <path d="M28 15H32M28 21H32M28 27H30" stroke="#E0F7FA" strokeWidth="2.2" strokeLinecap="round" opacity="0.9" />
        <path d="M24 21L25.5 23L27.5 24L25.5 25L24 27L22.5 25L20.5 24L22.5 23L24 21Z" fill="#00E5FF" />
        <defs>
          <linearGradient id="notebooklm_left_grad" x1="12" y1="10" x2="24" y2="38" gradientUnits="userSpaceOnUse">
            <stop stopColor="#00E5FF"/>
            <stop offset="1" stopColor="#00ACC1"/>
          </linearGradient>
          <linearGradient id="notebooklm_right_grad" x1="24" y1="10" x2="36" y2="38" gradientUnits="userSpaceOnUse">
            <stop stopColor="#00ACC1"/>
            <stop offset="1" stopColor="#006064"/>
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    id: 'wisprflow',
    name: 'Wispr Flow AI',
    description: 'Dictation and lightning-fast voice-to-text productivity engine for seamless writing, research journals, and document notes.',
    category: 'Productivity',
    logoColor: 'from-fuchsia-500/20 to-purple-500/20 border-fuchsia-500/30 text-fuchsia-400',
    altText: 'Wispr Flow AI logo',
    logoSvg: (
      <svg className="w-8 h-8" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Wispr Flow AI logo">
        <rect width="48" height="48" rx="12" fill="#1C0F2D" />
        <circle cx="24" cy="24" r="16" fill="url(#wispr_bg)" opacity="0.1" />
        <path d="M10 24C13.5 15 17 33 20.5 24C24 15 27.5 33 31 24C34.5 15 38 33 41.5 24" stroke="url(#wispr_line_grad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="24" cy="24" r="4.5" fill="#FFFFFF" />
        <circle cx="24" cy="24" r="7" stroke="#EC4899" strokeWidth="1" opacity="0.6" />
        <defs>
          <linearGradient id="wispr_bg" x1="8" y1="8" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#EC4899"/>
            <stop offset="1" stopColor="#8B5CF6"/>
          </linearGradient>
          <linearGradient id="wispr_line_grad" x1="10" y1="24" x2="41.5" y2="24" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F472B6" />
            <stop offset="0.5" stopColor="#D946EF" />
            <stop offset="1" stopColor="#6366F1" />
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    id: 'googlestitch',
    name: 'Google Stitch',
    description: 'Advanced AI-powered design layout weaver and UI generator for prototyping gorgeous biomedical user interfaces.',
    category: 'Design',
    logoColor: 'from-blue-500/20 to-red-500/20 border-blue-500/30 text-blue-400',
    altText: 'Google Stitch logo',
    logoSvg: (
      <svg className="w-8 h-8" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Google Stitch logo">
        <rect width="48" height="48" rx="12" fill="#0C101B" />
        <rect x="8" y="8" width="32" height="32" rx="8" stroke="#4285F4" strokeWidth="2" strokeDasharray="4 4" />
        <path d="M14 14L34 34" stroke="#EA4335" strokeWidth="4.5" strokeLinecap="round" opacity="0.95"/>
        <path d="M34 14L14 34" stroke="#FBBC05" strokeWidth="4.5" strokeLinecap="round" opacity="0.95"/>
        <circle cx="24" cy="24" r="7" fill="#34A853" stroke="#FFFFFF" strokeWidth="2.2" />
        <path d="M21 24H27M24 21V27" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    id: 'googleaistudio',
    name: 'Google AI Studio',
    description: 'Rapid prototyping, parameter tuning, and server-side model test-bed implementation using Gemini 2.5 and 1.5 Pro models.',
    category: 'AI Development',
    logoColor: 'from-violet-500/20 to-indigo-500/20 border-violet-500/30 text-violet-400',
    altText: 'Google AI Studio logo',
    logoSvg: (
      <svg className="w-8 h-8" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Google AI Studio logo">
        <rect width="48" height="48" rx="12" fill="#09091A" />
        <polygon points="24,6 39,14.66 39,32.02 24,40.68 9,32.02 9,14.66" fill="#0F0F2D" stroke="url(#gemini_border)" strokeWidth="1.8" />
        <path d="M24 10C24 17.73 17.73 24 10 24C17.73 24 24 30.27 24 38C24 30.27 30.27 24 38 24C30.27 24 24 17.73 24 10Z" fill="url(#gemini_grad)" />
        <circle cx="24" cy="24" r="3" fill="#FFFFFF" />
        <defs>
          <linearGradient id="gemini_grad" x1="10" y1="10" x2="38" y2="38" gradientUnits="userSpaceOnUse">
            <stop stopColor="#00F2FE"/>
            <stop offset="0.5" stopColor="#C084FC"/>
            <stop offset="1" stopColor="#F472B6"/>
          </linearGradient>
          <linearGradient id="gemini_border" x1="9" y1="6" x2="39" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#00F2FE" />
            <stop offset="1" stopColor="#D946EF" />
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    id: 'claudeai',
    name: 'Claude AI',
    description: 'High-reasoning, code architecture structuring, complex mathematical formulations, and research paper reviews.',
    category: 'Coding',
    logoColor: 'from-amber-600/20 to-amber-700/20 border-amber-600/30 text-amber-500',
    altText: 'Claude AI logo',
    logoSvg: (
      <svg className="w-8 h-8" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Claude AI logo">
        <rect width="16" height="16" rx="4" fill="#1C140F" />
        <path fillRule="evenodd" clipRule="evenodd" d="M9.218 2h2.402L16 12.987h-2.402zM4.379 2h2.512l4.38 10.987H8.82l-.895-2.308h-4.58l-.896 2.307H0L4.38 2.001zm2.755 6.64L5.635 4.777 4.137 8.64z" fill="url(#claude_brand_grad)"/>
        <defs>
          <linearGradient id="claude_brand_grad" x1="0" y1="2" x2="16" y2="13" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F59E0B" />
            <stop offset="1" stopColor="#D97706" />
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    id: 'juliusai',
    name: 'Julius AI',
    description: 'Automated data science workspace, dataset trends exploration, spreadsheet mapping, and research visual analytics.',
    category: 'Data Analysis',
    logoColor: 'from-emerald-500/20 to-green-500/20 border-emerald-500/30 text-emerald-400',
    altText: 'Julius AI logo',
    logoSvg: (
      <svg className="w-8 h-8" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Julius AI logo">
        <rect width="48" height="48" rx="12" fill="#0C1F15" />
        <circle cx="24" cy="24" r="17" fill="url(#julius_grad)" opacity="0.12" />
        {/* Profile Silhouette of Julius Caesar facing left */}
        <path d="M30 14 C27 12, 23 13, 20 16 C18 18, 17 21, 17 24 C17 26, 18 28, 17 29 C16 30, 15 30, 14 31 L14 33 C16 33, 19 32, 21 34 C23 35, 25 36, 28 35 C31 34, 33 31, 33 27 C33 22, 32 16, 30 14 Z" fill="url(#julius_grad)" />
        {/* Detailed Leaf Laurels */}
        <path d="M21 16 C20 15, 18 16, 17 17 C16 18, 17 20, 18 20 C19 20, 20 19, 21 18 Z" fill="#34D399" />
        <path d="M23 19 C22 18, 20 19, 19 20 C18 21, 19 23, 20 23 C21 23, 22 22, 23 21 Z" fill="#34D399" />
        <path d="M25 22 C24 21, 22 22, 21 23 C20 24, 21 26, 22 26 C23 26, 24 25, 25 24 Z" fill="#34D399" />
        <path d="M27 25 C26 24, 24 25, 23 26 C22 27, 23 29, 24 29 C25 29, 26 28, 27 27 Z" fill="#34D399" />
        <circle cx="28" cy="21" r="1.5" fill="#FFFFFF" />
        <defs>
          <linearGradient id="julius_grad" x1="14" y1="12" x2="33" y2="35" gradientUnits="userSpaceOnUse">
            <stop stopColor="#34D399" />
            <stop offset="1" stopColor="#059669" />
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    description: 'Instant technical logic lookup, boilerplates formulation, regular expressions mapping, and creative workflow blueprints.',
    category: 'Productivity',
    logoColor: 'from-teal-600/20 to-emerald-600/20 border-teal-500/30 text-teal-400',
    altText: 'ChatGPT logo',
    logoSvg: (
      <svg className="w-8 h-8" viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ChatGPT logo">
        <rect width="320" height="320" rx="80" fill="#0B1A14" />
        <path d="m297.06 130.97c7.26-21.79 4.76-45.66-6.85-65.48-17.46-30.4-52.56-46.04-86.84-38.68-15.25-17.18-37.16-26.95-60.13-26.81-35.04-.08-66.13 22.48-76.91 55.82-22.51 4.61-41.94 18.7-53.31 38.67-17.59 30.32-13.58 68.54 9.92 94.54-7.26 21.79-4.76 45.66 6.85 65.48 17.46 30.4 52.56 46.04 86.84 38.68 15.24 17.18 37.16 26.95 60.13 26.8 35.06.09 66.16-22.49 76.94-55.86 22.51-4.61 41.94-18.7 53.31-38.67 17.57-30.32 13.55-68.51-9.94-94.51zm-120.28 168.11c-14.03.02-27.62-4.89-38.39-13.88.49-.26 1.34-.73 1.89-1.07l63.72-36.8c3.26-1.85 5.26-5.32 5.24-9.07v-89.83l26.93 15.55c.29.14.48.42.52.74v74.39c-.04 33.08-26.83 59.9-59.91 59.97zm-128.84-55.03c-7.03-12.14-9.56-26.37-7.15-40.18.47.28 1.3.79 1.89 1.13l63.72 36.8c3.23 1.89 7.23 1.89 10.47 0l77.79-44.92v31.1c.02.32-.13.63-.38.83l-64.41 37.19c-28.69 16.52-65.33 6.7-81.92-21.95zm-16.77-139.09c7-12.16 18.05-21.46 31.21-26.29 0 .55-.03 1.52-.03 2.2v73.61c-.02 3.74 1.98 7.21 5.23 9.06l77.79 44.91-26.93 15.55c-.27.18-.61.21-.91.08l-64.42-37.22c-28.63-16.58-38.45-53.21-21.95-81.89zm221.26 51.49-77.79-44.92 26.93-15.54c.27-.18.61-.21.91-.08l64.42 37.19c28.68 16.57 38.51 53.26 21.94 81.94-7.01 12.14-18.05 21.44-31.2 26.28v-75.81c.03-3.74-1.96-7.2-5.2-9.06zm26.8-40.34c-.47-.29-1.3-.79-1.89-1.13l-63.72-36.8c-3.23-1.89-7.23-1.89-10.47 0l-77.79 44.92v-31.1c-.02-.32.13-.63.38-.83l64.41-37.16c28.69-16.55 65.37-6.7 81.91 22 6.99 12.12 9.52 26.31 7.15 40.1zm-168.51 55.43-26.94-15.55c-.29-.14-.48-.42-.52-.74v-74.39c.02-33.12 26.89-59.96 60.01-59.94 14.01 0 27.57 4.92 38.34 13.88-.49.26-1.33.73-1.89 1.07l-63.72 36.8c-3.26 1.85-5.26 5.31-5.24 9.06l-.04 89.79zm14.63-31.54 34.65-20.01 34.65 20v40.01l-34.65 20-34.65-20z" fill="url(#chatgpt_brand_grad)"/>
        <defs>
          <linearGradient id="chatgpt_brand_grad" x1="10" y1="10" x2="310" y2="310" gradientUnits="userSpaceOnUse">
            <stop stopColor="#10B981" />
            <stop offset="1" stopColor="#34D399" />
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    id: 'comet',
    name: 'Comet',
    description: 'Sleek, context-aware AI browser companion for ultra-fast academic search, documentation tracking, and split-pane browsing.',
    category: 'Productivity',
    logoColor: 'from-cyan-500/20 to-blue-500/20 border-cyan-500/30 text-cyan-400',
    altText: 'Comet logo',
    logoSvg: (
      <svg className="w-8 h-8" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Comet logo">
        <rect width="48" height="48" rx="12" fill="#0D1627" />
        <path d="M38 10C30 18 14 34 8 40" stroke="url(#comet_tail_line)" strokeWidth="4" strokeLinecap="round" />
        <circle cx="38" cy="10" r="6" fill="#8B5CF6" />
        <circle cx="38" cy="10" r="2.5" fill="#22D3EE" />
        <path d="M26 14 C30 18, 34 26, 32 32" stroke="#22D3EE" strokeWidth="1.2" strokeLinecap="round" opacity="0.65" />
        <defs>
          <linearGradient id="comet_tail_line" x1="38" y1="10" x2="8" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#22D3EE"/>
            <stop offset="0.6" stopColor="#8B5CF6" />
            <stop offset="1" stopColor="transparent" stopOpacity="0"/>
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    id: 'n8n',
    name: 'n8n',
    description: 'No-code and fair-code microservice automation, multi-hop API routers, and cron-scheduled automated lab notifications.',
    category: 'Automation',
    logoColor: 'from-orange-500/20 to-red-500/20 border-orange-500/30 text-orange-400',
    altText: 'n8n logo',
    logoSvg: (
      <svg className="w-8 h-8" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="n8n logo">
        <rect width="48" height="48" rx="12" fill="#1C0F0A" />
        <circle cx="15" cy="16" r="4.5" fill="#FF6C37" />
        <circle cx="33" cy="16" r="4.5" fill="#FF6C37" />
        <circle cx="24" cy="32" r="4.5" fill="#FF6C37" />
        <path d="M15 16 H33 L24 32 Z" stroke="#FF6C37" strokeWidth="2.5" strokeLinejoin="round" opacity="0.3" />
        <path d="M15 16 C15 24, 21 28, 24 32" stroke="#FF6C37" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M33 16 C33 24, 27 28, 24 32" stroke="#FF6C37" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: 'openclaw',
    name: 'OpenClaw',
    description: 'Autonomous execution workflows, intelligent browser scraping controllers, and automated systems management loops.',
    category: 'Automation',
    logoColor: 'from-blue-600/20 to-cyan-600/20 border-blue-500/30 text-blue-400',
    altText: 'OpenClaw logo',
    logoSvg: (
      <svg className="w-8 h-8" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="OpenClaw logo">
        <rect width="48" height="48" rx="12" fill="#0C1425" />
        <rect x="10" y="10" width="28" height="28" rx="6" stroke="#2563EB" strokeWidth="2" opacity="0.25" />
        <path d="M16 18 C16 26, 20 30, 24 30 C28 30, 32 26, 32 18" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" />
        <path d="M20 22 C20 28, 22 34, 24 34" stroke="#60A5FA" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="24" cy="22" r="3.5" fill="#3B82F6" />
      </svg>
    )
  }
];

const CATEGORIES = [
  'All',
  'Research',
  'Productivity',
  'Design',
  'AI Development',
  'Coding',
  'Data Analysis',
  'Automation'
];

export default function AIToolsExpertise() {
  const [activeTab, setActiveTab] = useState<string>('All');

  const filteredTools = activeTab === 'All' 
    ? TOOLS_DATA 
    : TOOLS_DATA.filter(tool => tool.category === activeTab);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Research': return <Search className="w-3.5 h-3.5" />;
      case 'Productivity': return <Clock className="w-3.5 h-3.5" />;
      case 'Design': return <Palette className="w-3.5 h-3.5" />;
      case 'AI Development': return <Cpu className="w-3.5 h-3.5" />;
      case 'Coding': return <Code className="w-3.5 h-3.5" />;
      case 'Data Analysis': return <Database className="w-3.5 h-3.5" />;
      case 'Automation': return <Workflow className="w-3.5 h-3.5" />;
      default: return <Sparkles className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div id="ai_tools_container" className="space-y-16 w-full select-none relative">
      
      {/* Decorative vector background line effects */}
      <div className="absolute top-0 right-0 w-80 h-80 glow-radial opacity-40 pointer-events-none select-none z-0" />
      <div className="absolute bottom-0 left-0 w-80 h-80 glow-radial-green opacity-20 pointer-events-none select-none z-0" />

      {/* Header Info */}
      <div className="space-y-4 max-w-3xl relative z-10">
        <div className="flex items-center gap-2">
          <span className="h-[1px] w-8 bg-brand-accent/40" />
          <span className="text-brand-accent text-[9px] font-mono font-bold tracking-widest uppercase block">
            Systematic Acceleration
          </span>
          <span className="h-[1px] w-8 bg-brand-accent/40" />
        </div>
        <h2 className="font-serif italic text-4xl md:text-5xl font-black text-brand-text tracking-tighter uppercase leading-none">
          AI Tools <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-[#D946EF]">Expertise</span>.
        </h2>
        <p className="text-sm text-brand-text-muted leading-relaxed font-normal max-w-2xl font-sans">
          Hands-on experience with modern AI tools for research, automation, productivity, coding, data analysis, and digital innovation.
        </p>
      </div>

      {/* Category selector pill navigation */}
      <div className="flex flex-wrap items-center gap-2 py-1 max-w-full overflow-x-auto relative z-10 scrollbar-none border-b border-[#1A1A1A]/5 pb-4">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-4 py-1.5 text-[9px] font-sans uppercase tracking-wider rounded-full border transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
              activeTab === cat
                ? 'bg-brand-accent border-brand-accent text-brand-bg font-bold shadow-[0_0_12px_rgba(0,242,254,0.4)]'
                : 'bg-brand-surface-card border-white/5 text-brand-text-muted hover:text-brand-text hover:border-brand-accent/30'
            }`}
          >
            {cat !== 'All' && getCategoryIcon(cat)}
            <span>{cat}</span>
          </button>
        ))}
      </div>

      {/* 10 Responsive grid cards */}
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 relative z-10"
      >
        {filteredTools.map((tool, index) => (
          <motion.div
            key={tool.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="group flex flex-col justify-between glass-panel-cyan p-5 rounded-xl border border-white/8 relative overflow-hidden h-[240px] hover:border-brand-accent/40 hover:shadow-[0_8px_30px_rgb(0,242,254,0.06)] transition-all duration-300"
          >
            {/* Soft decorative glow background behind the card logo */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-brand-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            <div className="space-y-4">
              {/* Logo / Icon Container */}
              <div className="flex items-start justify-between">
                {/* 
                  Circular logo container with glassmorphism background, soft shadow, 
                  and a scale-up zoom animation when the card itself is hovered.
                */}
                <div 
                  className="w-14 h-14 rounded-full flex items-center justify-center bg-white/5 backdrop-blur-md border border-white/12 shadow-[0_8px_20px_rgba(0,0,0,0.3)] transition-all duration-300 group-hover:scale-110 group-hover:border-brand-accent/40 group-hover:shadow-[0_0_20px_rgba(0,242,254,0.25)] p-2.5 overflow-hidden select-none"
                  title={tool.altText}
                >
                  {tool.logoSvg}
                </div>
                
                {/* Visual Category Label Tag */}
                <span className="text-[8px] font-mono uppercase tracking-widest text-brand-text-muted/70 bg-brand-bg/40 border border-white/5 py-0.5 px-2 rounded">
                  {tool.category}
                </span>
              </div>

              {/* Tool description section */}
              <div className="space-y-1.5">
                <h4 className="font-sans font-bold text-sm text-brand-text group-hover:text-brand-accent transition-colors duration-200">
                  {tool.name}
                </h4>
                <p className="text-[11px] text-brand-text-muted leading-relaxed font-normal line-clamp-3">
                  {tool.description}
                </p>
              </div>
            </div>

            {/* Micro active layout arrow line indicator */}
            <div className="pt-2 flex items-center justify-between border-t border-white/5">
              <span className="text-[9px] font-mono text-brand-text-muted/60 group-hover:text-brand-accent/80 transition-colors duration-200 uppercase tracking-wider flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-brand-accent/60" /> Enabled
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-brand-accent/40 group-hover:bg-brand-accent group-hover:scale-125 transition-all duration-300" />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Trademark Legal Notice (Small professional note) */}
      <p className="text-[10px] text-brand-text-muted/50 font-mono tracking-wide max-w-xl">
        AI tool logos are used for identification and portfolio representation only. All trademarks belong to their respective owners.
      </p>

      {/* Highlight Box at bottom */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="glass-panel p-6 border-l-2 border-brand-accent rounded-xl flex flex-col md:flex-row items-center gap-5 justify-between relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-brand-accent/5 via-transparent to-[#D946EF]/5 opacity-60 pointer-events-none" />
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 rounded-full bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent shrink-0">
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
          <p className="text-xs text-brand-text font-medium leading-relaxed max-w-3xl">
            These tools help me combine biotechnology, data analytics, and AI-driven innovation to build smarter digital solutions, improve productivity, and support research-based problem solving.
          </p>
        </div>
        <div className="relative z-10 shrink-0">
          <div className="text-[8px] font-mono bg-brand-accent/10 border border-brand-accent/30 text-brand-accent px-3 py-1 uppercase rounded-full tracking-widest font-bold">
            Interactive Node Ready
          </div>
        </div>
      </motion.div>

    </div>
  );
}
