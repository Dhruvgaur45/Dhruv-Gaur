import React from 'react';
import { motion } from 'motion/react';
import { 
  Trophy, 
  Sparkles, 
  Award, 
  Star, 
  TrendingUp, 
  Users, 
  CheckCircle2, 
  ShieldCheck, 
  PlusCircle 
} from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  category: string;
  period: string;
  metric: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
}

const ACHIEVEMENTS_DATA: Achievement[] = [
  {
    id: 'ach-1',
    title: 'Official Campus Ambassador Appointment',
    category: 'Institutional Role',
    period: '2026 Academic Year',
    metric: 'Selected for Sharda University',
    description: 'Formally appointed by SmartED to spearhead student engagement, organize educational drives, and advocate for skill-building programs across university cohorts.',
    icon: <ShieldCheck className="w-6 h-6 text-indigo-500" />,
    gradient: 'from-indigo-500/20 via-purple-500/10 to-transparent'
  },
  {
    id: 'ach-2',
    title: 'Leadership & Student Coordination Honors',
    category: 'Executive Recognition',
    period: 'Spring 2026',
    metric: '98% Positive Feedback',
    description: 'Recognized for exemplary leadership in student coordination, webinar moderation, and connecting undergraduate peers with industry mentors.',
    icon: <Trophy className="w-6 h-6 text-purple-500" />,
    gradient: 'from-purple-500/20 via-pink-500/10 to-transparent'
  },
  {
    id: 'ach-3',
    title: '500+ Student Cohort Mobilization',
    category: 'Outreach Milestone',
    period: 'Q1-Q2 2026',
    metric: '500+ Active Students',
    description: 'Successfully reached and onboarded over 500 collegiate students into SmartED open learning bootcamps and verifiable credential tracks.',
    icon: <Users className="w-6 h-6 text-pink-500" />,
    gradient: 'from-pink-500/20 via-rose-500/10 to-transparent'
  },
  {
    id: 'ach-4',
    title: 'High-Impact Webinar Moderation Citation',
    category: 'Event Execution',
    period: 'February 2026',
    metric: '350+ Live Attendees',
    description: 'Commended by guest industry panelists for smooth moderation, intelligent panel Q&A facilitation, and high audience retention rate throughout the session.',
    icon: <Star className="w-6 h-6 text-amber-500" />,
    gradient: 'from-amber-500/20 via-orange-500/10 to-transparent'
  },
  {
    id: 'ach-5',
    title: 'Community Contribution & Advocacy Star',
    category: 'Community Building',
    period: 'Ongoing 2026',
    metric: 'Top Quartile Ambassador',
    description: 'Consistently ranked among the top contributing student ambassadors across regional university chapters for proactive mentorship and peer support.',
    icon: <Award className="w-6 h-6 text-emerald-500" />,
    gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent'
  }
];

export default function SmartEDAchievements() {
  return (
    <section id="achievements" className="py-24 relative border-t border-zinc-200/60 dark:border-zinc-800/60">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-mono text-xs font-bold uppercase tracking-wider">
            <Trophy className="w-3.5 h-3.5" />
            Key Milestones & Honors
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-zinc-900 dark:text-white tracking-tight">
            Achievements & Recognition
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 font-sans text-sm sm:text-base max-w-2xl">
            Key honors, milestone accomplishments, and leadership distinctions earned during my SmartED Ambassadorship tenure.
          </p>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACHIEVEMENTS_DATA.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              whileHover={{ y: -4 }}
              className="p-7 rounded-3xl bg-white dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 hover:border-indigo-500/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6 relative overflow-hidden group"
            >
              <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${item.gradient}`} />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-mono text-zinc-400 font-semibold">
                    {item.period}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                    {item.category}
                  </span>
                  <h3 className="font-display font-black text-lg text-zinc-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                  {item.metric}
                </span>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>
            </motion.div>
          ))}

          {/* Reserved Future Achievement Slot */}
          <div className="p-7 rounded-3xl border-2 border-dashed border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-900/30 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <PlusCircle className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400">
                  Future Horizon
                </span>
                <h3 className="font-display font-bold text-lg text-zinc-800 dark:text-zinc-200">
                  Upcoming Regional Distinctions
                </h3>
                <p className="text-xs text-zinc-500 font-sans leading-relaxed">
                  Reserved for upcoming inter-collegiate hackathon mentorship awards and regional campus leadership summits.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 text-[11px] font-mono text-zinc-400">
              TARGET: Q4 2026
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
