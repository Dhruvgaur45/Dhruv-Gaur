import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  CalendarCheck, 
  Sparkles, 
  Clock, 
  MapPin, 
  Users, 
  Video, 
  Trophy, 
  GraduationCap, 
  BookOpen, 
  CheckCircle2 
} from 'lucide-react';

interface CampusEvent {
  id: string;
  title: string;
  type: 'Webinar' | 'Seminar' | 'Campus Drive' | 'Competition' | 'Training Session';
  status: 'Upcoming' | 'Completed';
  date: string;
  location: string;
  attendees: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
}

const EVENTS_DATA: CampusEvent[] = [
  {
    id: 'ev-1',
    title: 'Biotech & Data Analytics in Modern Research',
    type: 'Webinar',
    status: 'Completed',
    date: 'February 2026',
    location: 'Virtual Broadcast & Live Q&A',
    attendees: '240+ Participants',
    description: 'Organized a specialized online session demonstrating how computational pipelines intersect with biotechnology breakthroughs and experimental data analysis.',
    icon: <Video className="w-5 h-5 text-indigo-500" />,
    tags: ['Webinar', 'Data Science', 'Biotech']
  },
  {
    id: 'ev-2',
    title: 'SmartED Campus Ambassador Leadership Summit',
    type: 'Training Session',
    status: 'Completed',
    date: 'January 2026',
    location: 'National Ambassador Cohort Hub',
    attendees: '60+ Ambassadors',
    description: 'Participated in executive strategy training covering student engagement metrics, event management logistics, and high-impact digital messaging.',
    icon: <GraduationCap className="w-5 h-5 text-purple-500" />,
    tags: ['Leadership', 'Ambassadors', 'Executive']
  },
  {
    id: 'ev-3',
    title: 'Spring Campus Upskilling & Certification Drive',
    type: 'Campus Drive',
    status: 'Completed',
    date: 'March 2026',
    location: 'Sharda University Main Quad',
    attendees: '380+ Students',
    description: 'On-ground awareness drive introducing undergraduate cohorts to subsidized certification tracks and personalized career advisory sessions.',
    icon: <Users className="w-5 h-5 text-pink-500" />,
    tags: ['Campus Drive', 'Admissions', 'Certifications']
  },
  {
    id: 'ev-4',
    title: 'Inter-Department Industry Career Seminar',
    type: 'Seminar',
    status: 'Upcoming',
    date: 'Scheduled Q3 2026',
    location: 'Auditorium Hall B',
    attendees: '400+ Expected',
    description: 'Invited industry keynote speakers to discuss placement benchmarks, portfolio creation, and early career trajectory planning for STEM students.',
    icon: <BookOpen className="w-5 h-5 text-amber-500" />,
    tags: ['Seminar', 'Career', 'Guest Keynote']
  },
  {
    id: 'ev-5',
    title: 'SmartED Regional Student Innovation Challenge',
    type: 'Competition',
    status: 'Upcoming',
    date: 'Scheduled Late 2026',
    location: 'Hybrid / North India Chapters',
    attendees: '50+ Teams',
    description: 'A multi-campus hackathon where student teams develop prototypes tackling real-world challenges in education technology, sustainability, and life sciences.',
    icon: <Trophy className="w-5 h-5 text-emerald-500" />,
    tags: ['Hackathon', 'Competition', 'Prizes']
  }
];

export default function SmartEDEvents() {
  const [filter, setFilter] = useState<'All' | 'Upcoming' | 'Completed'>('All');

  const filteredEvents = filter === 'All'
    ? EVENTS_DATA
    : EVENTS_DATA.filter(e => e.status === filter);

  return (
    <section id="events" className="py-24 relative border-t border-zinc-200/60 dark:border-zinc-800/60">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-mono text-xs font-bold uppercase tracking-wider">
              <CalendarCheck className="w-3.5 h-3.5" />
              Event Calendar & Timeline
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-zinc-900 dark:text-white tracking-tight">
              Events & Masterclasses
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 font-sans text-sm sm:text-base max-w-2xl">
              Chronological log of campus webinars, leadership bootcamps, student drives, and upcoming innovation competitions.
            </p>
          </div>

          {/* Filter */}
          <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 self-start md:self-auto">
            {(['All', 'Upcoming', 'Completed'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  filter === tab
                    ? 'bg-white dark:bg-zinc-900 text-indigo-600 dark:text-indigo-400 shadow-sm border border-zinc-200 dark:border-zinc-700'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((ev, idx) => (
            <motion.div
              key={ev.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              className="p-7 rounded-3xl bg-white dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                
                {/* Event Type & Status */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                      {ev.icon}
                    </div>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                      {ev.type}
                    </span>
                  </div>

                  <span className={`px-2.5 py-1 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider ${
                    ev.status === 'Completed'
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                      : 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30'
                  }`}>
                    {ev.status}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-display font-bold text-base sm:text-lg text-zinc-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {ev.title}
                  </h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
                    {ev.description}
                  </p>
                </div>

                {/* Metadata details */}
                <div className="space-y-1.5 pt-2 border-t border-zinc-100 dark:border-zinc-800 text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-indigo-500" />
                    <span>{ev.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-purple-500" />
                    <span>{ev.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-pink-500" />
                    <span>{ev.attendees}</span>
                  </div>
                </div>

              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                {ev.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2.5 py-0.5 rounded-lg text-[9px] font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
