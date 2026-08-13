import React from 'react';
import { motion } from 'motion/react';
import { 
  BarChart3, 
  Sparkles, 
  Users, 
  Megaphone, 
  CalendarCheck, 
  Award, 
  Clock, 
  FolderKanban, 
  TrendingUp, 
  Share2 
} from 'lucide-react';

interface MetricItem {
  id: string;
  label: string;
  value: string;
  numeric: number;
  suffix: string;
  growth: string;
  icon: React.ReactNode;
  color: string;
}

const STATS_DATA: MetricItem[] = [
  {
    id: 'm-1',
    label: 'Students Reached',
    value: '1,250+',
    numeric: 1250,
    suffix: '+',
    growth: '+45% MoM',
    icon: <Users className="w-5 h-5 text-indigo-500" />,
    color: 'text-indigo-600 dark:text-indigo-400'
  },
  {
    id: 'm-2',
    label: 'Campaigns Completed',
    value: '18+',
    numeric: 18,
    suffix: '+',
    growth: '100% Target Met',
    icon: <Megaphone className="w-5 h-5 text-purple-500" />,
    color: 'text-purple-600 dark:text-purple-400'
  },
  {
    id: 'm-3',
    label: 'Events & Webinars Supported',
    value: '14+',
    numeric: 14,
    suffix: '+',
    growth: 'High Retention',
    icon: <CalendarCheck className="w-5 h-5 text-pink-500" />,
    color: 'text-pink-600 dark:text-pink-400'
  },
  {
    id: 'm-4',
    label: 'Certificates Earned',
    value: '5+',
    numeric: 5,
    suffix: '+',
    growth: 'Verified Credentials',
    icon: <Award className="w-5 h-5 text-amber-500" />,
    color: 'text-amber-600 dark:text-amber-400'
  },
  {
    id: 'm-5',
    label: 'Hours Contributed',
    value: '280+',
    numeric: 280,
    suffix: ' hrs',
    growth: 'Campus & Online',
    icon: <Clock className="w-5 h-5 text-blue-500" />,
    color: 'text-blue-600 dark:text-blue-400'
  },
  {
    id: 'm-6',
    label: 'Projects & Drives Led',
    value: '8+',
    numeric: 8,
    suffix: '+',
    growth: 'Multi-Department',
    icon: <FolderKanban className="w-5 h-5 text-cyan-500" />,
    color: 'text-cyan-600 dark:text-cyan-400'
  },
  {
    id: 'm-7',
    label: 'Student Network Size',
    value: '1,600+',
    numeric: 1600,
    suffix: '+',
    growth: 'LinkedIn & Broadcasts',
    icon: <Share2 className="w-5 h-5 text-teal-500" />,
    color: 'text-teal-600 dark:text-teal-400'
  },
  {
    id: 'm-8',
    label: 'Community Satisfaction',
    value: '98%',
    numeric: 98,
    suffix: '%',
    growth: '5-Star Feedback',
    icon: <TrendingUp className="w-5 h-5 text-emerald-500" />,
    color: 'text-emerald-600 dark:text-emerald-400'
  }
];

export default function SmartEDStats() {
  return (
    <section id="statistics" className="py-24 relative border-t border-zinc-200/60 dark:border-zinc-800/60">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 font-mono text-xs font-bold uppercase tracking-wider">
            <BarChart3 className="w-3.5 h-3.5" />
            Quantifiable Impact
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-zinc-900 dark:text-white tracking-tight">
            Statistics Dashboard
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 font-sans text-sm sm:text-base max-w-2xl">
            Real-world performance metrics measuring student outreach scale, campaign frequency, and community growth.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS_DATA.map((stat, idx) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.04 }}
              className="p-6 rounded-3xl bg-white dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all duration-300 space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                  {stat.icon}
                </div>
                <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  {stat.growth}
                </span>
              </div>

              <div className="space-y-1">
                <span className={`block font-display font-black text-3xl sm:text-4xl tracking-tight ${stat.color}`}>
                  {stat.value}
                </span>
                <p className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
