import React from 'react';
import { motion } from 'motion/react';
import { 
  Megaphone, 
  Shield, 
  Building2, 
  BookOpen, 
  Users, 
  Network, 
  Calendar, 
  FileText, 
  Headphones, 
  Sparkles, 
  ArrowUpRight 
} from 'lucide-react';

interface Responsibility {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  badge: string;
}

const RESPONSIBILITIES: Responsibility[] = [
  {
    id: 'resp-1',
    title: 'Student Outreach',
    category: 'Engagement',
    description: 'Actively introducing SmartED’s educational catalog, cert programs, and interactive tools to students across multiple university departments.',
    icon: <Megaphone className="w-6 h-6 text-indigo-500" />,
    color: 'from-indigo-500/20 via-indigo-500/5 to-transparent',
    badge: 'Campus Liaison'
  },
  {
    id: 'resp-2',
    title: 'Brand Representation',
    category: 'Advocacy',
    description: 'Serving as the trusted campus face of SmartED, maintaining high professional standards and upholding educational integrity at all forums.',
    icon: <Shield className="w-6 h-6 text-purple-500" />,
    color: 'from-purple-500/20 via-purple-500/5 to-transparent',
    badge: 'Official Face'
  },
  {
    id: 'resp-3',
    title: 'Campus Promotion',
    category: 'Marketing',
    description: 'Coordinating physical noticeboard posters, college society outreach, and digital announcements for upcoming workshops and registration dates.',
    icon: <Building2 className="w-6 h-6 text-pink-500" />,
    color: 'from-pink-500/20 via-pink-500/5 to-transparent',
    badge: 'Multi-Channel'
  },
  {
    id: 'resp-4',
    title: 'Educational Campaigns',
    category: 'Initiatives',
    description: 'Spearheading targeted campaigns on computational skills, career readiness, and specialized biotechnology bootcamps for student cohorts.',
    icon: <BookOpen className="w-6 h-6 text-blue-500" />,
    color: 'from-blue-500/20 via-blue-500/5 to-transparent',
    badge: 'Curricula'
  },
  {
    id: 'resp-5',
    title: 'Leadership & Mentorship',
    category: 'Mentoring',
    description: 'Inspiring peers to invest in verifiable competencies, answering curriculum inquiries, and guiding younger batches through learning paths.',
    icon: <Sparkles className="w-6 h-6 text-amber-500" />,
    color: 'from-amber-500/20 via-amber-500/5 to-transparent',
    badge: 'Peer Guide'
  },
  {
    id: 'resp-6',
    title: 'Community Building',
    category: 'Ecosystem',
    description: 'Creating peer study circles and virtual discussion rooms where students share learning milestones, project repos, and career tips.',
    icon: <Users className="w-6 h-6 text-emerald-500" />,
    color: 'from-emerald-500/20 via-emerald-500/5 to-transparent',
    badge: 'Study Circles'
  },
  {
    id: 'resp-7',
    title: 'Networking & Alliances',
    category: 'Partnerships',
    description: 'Connecting university clubs, departmental student heads, and faculty coordinators with SmartED’s guest lecturers and educators.',
    icon: <Network className="w-6 h-6 text-cyan-500" />,
    color: 'from-cyan-500/20 via-cyan-500/5 to-transparent',
    badge: 'Institutional'
  },
  {
    id: 'resp-8',
    title: 'Workshop Promotion',
    category: 'Operations',
    description: 'Driving registrations for hands-on technical masterclasses, ensuring high attendance, and gathering attendee feedback for optimization.',
    icon: <Calendar className="w-6 h-6 text-rose-500" />,
    color: 'from-rose-500/20 via-rose-500/5 to-transparent',
    badge: 'Masterclasses'
  },
  {
    id: 'resp-9',
    title: 'Content Creation',
    category: 'Media',
    description: 'Authoring concise infographics, bite-sized learning recaps, event promos, and FAQ walkthroughs shared across student broadcast groups.',
    icon: <FileText className="w-6 h-6 text-violet-500" />,
    color: 'from-violet-500/20 via-violet-500/5 to-transparent',
    badge: 'Digital Assets'
  },
  {
    id: 'resp-10',
    title: 'Event Support & Moderation',
    category: 'Logistics',
    description: 'Co-hosting live webinars, introducing keynote speakers, organizing attendee Q&A panels, and delivering smooth virtual event execution.',
    icon: <Headphones className="w-6 h-6 text-teal-500" />,
    color: 'from-teal-500/20 via-teal-500/5 to-transparent',
    badge: 'Live Moderation'
  }
];

export default function SmartEDResponsibilities() {
  return (
    <section id="responsibilities" className="py-24 relative border-t border-zinc-200/60 dark:border-zinc-800/60">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Section Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-mono text-xs font-bold uppercase tracking-wider">
            <Shield className="w-3.5 h-3.5" />
            Executive Mandate
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-zinc-900 dark:text-white tracking-tight">
            My Responsibilities
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 font-sans text-sm sm:text-base max-w-2xl">
            A comprehensive overview of key operational, promotional, and leadership functions delivered as Campus Ambassador.
          </p>
        </div>

        {/* Responsibilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {RESPONSIBILITIES.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              whileHover={{ y: -4 }}
              className="p-7 rounded-3xl bg-white dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 hover:border-indigo-500/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6 group relative overflow-hidden"
            >
              {/* Subtle top gradient glow on hover */}
              <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-100 transition-opacity`} />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                    {item.badge}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                    {item.category}
                  </span>
                  <h3 className="font-display font-black text-lg text-zinc-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <span>RESPONSIBILITY #{idx + 1}</span>
                <ArrowUpRight className="w-4 h-4 text-indigo-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
