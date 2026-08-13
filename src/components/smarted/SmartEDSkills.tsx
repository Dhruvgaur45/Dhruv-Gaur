import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  ShieldCheck, 
  Mic, 
  MessageSquare, 
  Megaphone, 
  Flame, 
  Network, 
  Clock, 
  Lightbulb, 
  HeartHandshake, 
  Users, 
  SlidersHorizontal 
} from 'lucide-react';

interface SkillItem {
  name: string;
  category: 'Interpersonal' | 'Leadership' | 'Strategic' | 'Execution';
  proficiency: number;
  description: string;
  icon: React.ReactNode;
}

const SKILLS_DATA: SkillItem[] = [
  {
    name: 'Leadership & Delegation',
    category: 'Leadership',
    proficiency: 95,
    description: 'Guiding student ambassadors and campus volunteers to execute high-impact learning initiatives seamlessly.',
    icon: <ShieldCheck className="w-5 h-5 text-indigo-500" />
  },
  {
    name: 'Public Speaking & Pitching',
    category: 'Interpersonal',
    proficiency: 92,
    description: 'Presenting SmartED educational offerings clearly in lecture halls, webinars, and orientation panels.',
    icon: <Mic className="w-5 h-5 text-purple-500" />
  },
  {
    name: 'Strategic Communication',
    category: 'Interpersonal',
    proficiency: 96,
    description: 'Delivering articulate, transparent communication between university student bodies and SmartED directors.',
    icon: <MessageSquare className="w-5 h-5 text-pink-500" />
  },
  {
    name: 'Brand Promotion & Positioning',
    category: 'Strategic',
    proficiency: 94,
    description: 'Establishing authentic brand resonance and building high trust around SmartED’s verified curriculum.',
    icon: <Flame className="w-5 h-5 text-amber-500" />
  },
  {
    name: 'Campus Marketing & Growth',
    category: 'Strategic',
    proficiency: 90,
    description: 'Executing data-aware digital and offline campaigns to maximize student event registrations.',
    icon: <Megaphone className="w-5 h-5 text-rose-500" />
  },
  {
    name: 'Ecosystem Networking',
    category: 'Interpersonal',
    proficiency: 95,
    description: 'Cultivating strong professional bonds with faculty members, club presidents, and academic leaders.',
    icon: <Network className="w-5 h-5 text-blue-500" />
  },
  {
    name: 'Time & Project Management',
    category: 'Execution',
    proficiency: 93,
    description: 'Balancing rigorous biotechnology coursework alongside active campus campaign timelines and deliverables.',
    icon: <Clock className="w-5 h-5 text-cyan-500" />
  },
  {
    name: 'Agile Problem Solving',
    category: 'Execution',
    proficiency: 94,
    description: 'Troubleshooting logistical hiccups during live workshops and resolving student inquiries promptly.',
    icon: <Lightbulb className="w-5 h-5 text-yellow-500" />
  },
  {
    name: 'Professional Ethics & Integrity',
    category: 'Leadership',
    proficiency: 98,
    description: 'Upholding strict data privacy, respectful representation, and authentic academic standards.',
    icon: <HeartHandshake className="w-5 h-5 text-emerald-500" />
  },
  {
    name: 'Cross-Functional Teamwork',
    category: 'Execution',
    proficiency: 96,
    description: 'Collaborating seamlessly with regional ambassador teams, graphic designers, and academic mentors.',
    icon: <Users className="w-5 h-5 text-teal-500" />
  }
];

export default function SmartEDSkills() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Leadership', 'Interpersonal', 'Strategic', 'Execution'];

  const filteredSkills = selectedCategory === 'All'
    ? SKILLS_DATA
    : SKILLS_DATA.filter(s => s.category === selectedCategory);

  return (
    <section id="skills" className="py-24 relative border-t border-zinc-200/60 dark:border-zinc-800/60">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Section Header & Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 font-mono text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Professional Competencies
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-zinc-900 dark:text-white tracking-tight">
              Skills Developed
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 font-sans text-sm sm:text-base max-w-2xl">
              An interactive proficiency dashboard highlighting core executive, interpersonal, and strategic capabilities honed through my Campus Ambassadorship.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-white dark:bg-zinc-900 text-indigo-600 dark:text-indigo-400 shadow-sm border border-zinc-200 dark:border-zinc-700'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSkills.map((skill, idx) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.04 }}
              className="p-6 rounded-3xl bg-white dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-lg transition-all space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                    {skill.icon}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-zinc-900 dark:text-white">
                      {skill.name}
                    </h3>
                    <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                      {skill.category}
                    </span>
                  </div>
                </div>

                <span className="text-base font-display font-black text-indigo-600 dark:text-indigo-400">
                  {skill.proficiency}%
                </span>
              </div>

              <p className="text-xs text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
                {skill.description}
              </p>

              {/* Progress Bar */}
              <div className="space-y-1 pt-1">
                <div className="w-full h-2 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.proficiency}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                    className="h-full rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
