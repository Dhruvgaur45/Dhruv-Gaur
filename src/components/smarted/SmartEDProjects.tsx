import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  FolderKanban, 
  Sparkles, 
  Calendar, 
  TrendingUp, 
  Award, 
  Image as ImageIcon, 
  Clock, 
  CheckCircle2, 
  PlusCircle, 
  ExternalLink 
} from 'lucide-react';

interface CampaignProject {
  id: string;
  name: string;
  category: string;
  duration: string;
  status: 'Active' | 'Completed' | 'Upcoming';
  description: string;
  outcome: string;
  hasCertificate: boolean;
  certificateRef?: string;
  gradient: string;
  tags: string[];
}

const CAMPAIGNS: CampaignProject[] = [
  {
    id: 'camp-1',
    name: 'SmartED Skill-Up 2026 Initiative',
    category: 'Campus Awareness',
    duration: '6 Weeks (Spring 2026)',
    status: 'Active',
    description: 'A university-wide student mobilization campaign across biotech, computer science, and engineering departments to introduce open certification tracks and industry mentorship.',
    outcome: '420+ Student Enrollments, 98% positive satisfaction, 15 collaborative study cohorts formed.',
    hasCertificate: true,
    certificateRef: 'SMARTED-CERT-SKILLUP-26',
    gradient: 'from-indigo-600/25 via-purple-600/15 to-transparent',
    tags: ['Student Outreach', 'Digital Bootcamps', 'Certification']
  },
  {
    id: 'camp-2',
    name: 'Industry Readiness & Resume Clinic',
    category: 'Career Development',
    duration: '3 Weeks Intensive',
    status: 'Completed',
    description: 'Organized interactive portfolio workshops and live resume critiques featuring senior industry mentors, helping students bridge academic CVs with modern hiring expectations.',
    outcome: '180+ CVs reviewed, 12 students shortlisted for premier summer apprenticeships.',
    hasCertificate: true,
    certificateRef: 'SMARTED-CERT-CAREER-26',
    gradient: 'from-purple-600/25 via-pink-600/15 to-transparent',
    tags: ['Career Mentorship', 'Placement Prep', 'Workshops']
  },
  {
    id: 'camp-3',
    name: 'Computational Tech in Modern Science Webinar',
    category: 'Technical Seminar',
    duration: '2 Day Symposium',
    status: 'Completed',
    description: 'Spearheaded promotional outreach and attendee coordination for a multi-speaker symposium highlighting computational tools, bioinformatics, and AI workflows.',
    outcome: '310+ live webinar attendees, 95% completion rate for interactive Q&A session.',
    hasCertificate: true,
    certificateRef: 'SMARTED-CERT-TECH-26',
    gradient: 'from-blue-600/25 via-indigo-600/15 to-transparent',
    tags: ['Webinar', 'Computational Bio', 'AI Tools']
  },
  {
    id: 'camp-4',
    name: 'Regional Hackathon & Student Innovation Summit',
    category: 'Future Flagship',
    duration: 'Q3 2026 (Scheduled)',
    status: 'Upcoming',
    description: 'Upcoming inter-collegiate hackathon and pitch contest connecting student builders from Delhi-NCR universities to prototype technology and healthcare solutions.',
    outcome: 'Targeting 50+ project teams and industry sponsorship pool.',
    hasCertificate: true,
    certificateRef: 'RESERVED-HACK-2026',
    gradient: 'from-emerald-600/25 via-teal-600/15 to-transparent',
    tags: ['Inter-Collegiate', 'Hackathon', 'Innovation']
  }
];

export default function SmartEDProjects() {
  const [filter, setFilter] = useState<'All' | 'Active' | 'Completed' | 'Upcoming'>('All');

  const filteredCampaigns = filter === 'All'
    ? CAMPAIGNS
    : CAMPAIGNS.filter(c => c.status === filter);

  return (
    <section id="projects" className="py-24 relative border-t border-zinc-200/60 dark:border-zinc-800/60">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-mono text-xs font-bold uppercase tracking-wider">
              <FolderKanban className="w-3.5 h-3.5" />
              Executions & Milestones
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-zinc-900 dark:text-white tracking-tight">
              Projects & Campaigns
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 font-sans text-sm sm:text-base max-w-2xl">
              High-impact promotional drives, student upskilling campaigns, and technical symposiums executed on campus.
            </p>
          </div>

          {/* Status Filters */}
          <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 self-start md:self-auto">
            {(['All', 'Active', 'Completed', 'Upcoming'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setFilter(st)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  filter === st
                    ? 'bg-white dark:bg-zinc-900 text-indigo-600 dark:text-indigo-400 shadow-sm border border-zinc-200 dark:border-zinc-700'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredCampaigns.map((camp, idx) => (
            <motion.div
              key={camp.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="rounded-3xl p-8 bg-white dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6 relative overflow-hidden group"
            >
              <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${camp.gradient}`} />

              <div className="space-y-5">
                
                {/* Top Badge & Duration */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${
                      camp.status === 'Active'
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                        : camp.status === 'Completed'
                        ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 border border-zinc-200 dark:border-zinc-700'
                    }`}>
                      {camp.status}
                    </span>
                    <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                      {camp.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-500">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{camp.duration}</span>
                  </div>
                </div>

                {/* Title & Description */}
                <div className="space-y-2">
                  <h3 className="font-display font-black text-xl text-zinc-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {camp.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 font-sans leading-relaxed">
                    {camp.description}
                  </p>
                </div>

                {/* Outcome Box */}
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-100 dark:border-zinc-700/60 space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5" />
                    Key Results & Impact
                  </span>
                  <p className="text-xs text-zinc-700 dark:text-zinc-300 font-sans font-medium">
                    {camp.outcome}
                  </p>
                </div>

              </div>

              {/* Tags & Footer */}
              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {camp.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-0.5 rounded-lg text-[10px] font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {camp.hasCertificate && (
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-indigo-600 dark:text-indigo-400 font-bold">
                    <Award className="w-3.5 h-3.5" />
                    <span>Verified Credential</span>
                  </div>
                )}
              </div>

            </motion.div>
          ))}

          {/* Placeholder for future projects */}
          <div className="rounded-3xl p-8 border-2 border-dashed border-zinc-300 dark:border-zinc-700 flex flex-col items-center justify-center text-center space-y-4 min-h-[260px] bg-zinc-50/50 dark:bg-zinc-900/30">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <PlusCircle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-display font-bold text-lg text-zinc-800 dark:text-zinc-200">
                Future Campaign Pipeline
              </h3>
              <p className="text-xs text-zinc-500 max-w-sm">
                Slots reserved for upcoming hackathons, campus drives, and regional educational summits currently in planning.
              </p>
            </div>
            <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
              Pipeline Active
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
