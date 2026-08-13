import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Compass, 
  Sparkles, 
  CheckCircle2, 
  Circle, 
  TrendingUp, 
  Target, 
  Award, 
  Network, 
  BookOpen, 
  Users 
} from 'lucide-react';

interface GoalItem {
  id: string;
  title: string;
  timeline: string;
  category: string;
  description: string;
  initialCompleted: boolean;
  icon: React.ReactNode;
}

const GOALS_DATA: GoalItem[] = [
  {
    id: 'g-1',
    title: 'Organize Inter-Collegiate Campus Hackathon',
    timeline: 'Q3 2026',
    category: 'Flagship Event',
    description: 'Lead a multi-university technology and biotechnology hackathon bringing together 200+ student innovators to build practical prototypes.',
    initialCompleted: true,
    icon: <Award className="w-5 h-5 text-indigo-500" />
  },
  {
    id: 'g-2',
    title: 'Expand Student Outreach by 150%',
    timeline: 'Ongoing 2026',
    category: 'Growth Target',
    description: 'Scale active student reach across allied departments including pharmacy, bio-engineering, and computer science to 2,500+ peers.',
    initialCompleted: true,
    icon: <TrendingUp className="w-5 h-5 text-purple-500" />
  },
  {
    id: 'g-3',
    title: 'Host Monthly Bioinformatics & AI Masterclasses',
    timeline: 'Recurring',
    category: 'Academic Curricula',
    description: 'Coordinate monthly guest webinars with industry researchers breaking down computational pipeline tools and real-world datasets.',
    initialCompleted: true,
    icon: <BookOpen className="w-5 h-5 text-pink-500" />
  },
  {
    id: 'g-4',
    title: 'Establish Cross-University Ambassador Alliance',
    timeline: 'Q4 2026',
    category: 'Community Network',
    description: 'Build a regional coalition of SmartED ambassadors across Delhi-NCR campuses to exchange best practices and co-host major events.',
    initialCompleted: false,
    icon: <Network className="w-5 h-5 text-amber-500" />
  },
  {
    id: 'g-5',
    title: 'Launch Subsidized Research Certification Grants',
    timeline: 'Late 2026',
    category: 'Student Support',
    description: 'Partner with SmartED leadership to provide merit-based access grants for high-performing undergraduate student researchers.',
    initialCompleted: false,
    icon: <Target className="w-5 h-5 text-emerald-500" />
  },
  {
    id: 'g-6',
    title: 'Mentor Next Ambassador Cohort',
    timeline: '2027 Transition',
    category: 'Leadership Legacy',
    description: 'Design structured transition toolkits and onboarding workshops to train the next batch of campus ambassadors smoothly.',
    initialCompleted: false,
    icon: <Users className="w-5 h-5 text-cyan-500" />
  }
];

export default function SmartEDFutureGoals() {
  const [completedGoals, setCompletedGoals] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    GOALS_DATA.forEach(g => { initial[g.id] = g.initialCompleted; });
    return initial;
  });

  const toggleGoal = (id: string) => {
    setCompletedGoals(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const completedCount = Object.values(completedGoals).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / GOALS_DATA.length) * 100);

  return (
    <section id="goals" className="py-24 relative border-t border-zinc-200/60 dark:border-zinc-800/60">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-mono text-xs font-bold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5" />
              Strategic Roadmap
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-zinc-900 dark:text-white tracking-tight">
              Future Goals & Vision
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 font-sans text-sm sm:text-base max-w-2xl">
              Key milestones, upcoming initiatives, and targets driving continuous student impact and regional growth.
            </p>
          </div>

          {/* Progress Pill */}
          <div className="p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 min-w-[200px] space-y-2 self-start md:self-auto">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-zinc-500">INITIATIVES ACTIVE:</span>
              <span className="font-bold text-indigo-600 dark:text-indigo-400">{completedCount} / {GOALS_DATA.length}</span>
            </div>
            <div className="w-full h-2 rounded-full bg-zinc-200 dark:bg-zinc-700 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>

        {/* Goals Checklist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GOALS_DATA.map((goal, idx) => {
            const isDone = !!completedGoals[goal.id];
            return (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                onClick={() => toggleGoal(goal.id)}
                className={`p-7 rounded-3xl border transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-6 select-none ${
                  isDone
                    ? 'bg-white dark:bg-zinc-900/90 border-indigo-500/40 shadow-md'
                    : 'bg-zinc-50/70 dark:bg-zinc-900/40 border-zinc-200 dark:border-zinc-800 opacity-80 hover:opacity-100'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                      {goal.icon}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-zinc-500">
                        {goal.timeline}
                      </span>
                      {isDone ? (
                        <CheckCircle2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                      ) : (
                        <Circle className="w-5 h-5 text-zinc-400" />
                      )}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                      {goal.category}
                    </span>
                    <h3 className={`font-display font-bold text-base transition-colors ${
                      isDone ? 'text-zinc-900 dark:text-white' : 'text-zinc-700 dark:text-zinc-300'
                    }`}>
                      {goal.title}
                    </h3>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
                      {goal.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-[10px] font-mono text-zinc-400">
                  <span>CLICK TO TOGGLE STATUS</span>
                  <span className={isDone ? 'text-indigo-600 dark:text-indigo-400 font-bold' : ''}>
                    {isDone ? 'ACTIVE / IN-PROGRESS' : 'UPCOMING'}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
