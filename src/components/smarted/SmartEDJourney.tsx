import React from 'react';
import { motion } from 'motion/react';
import { 
  Milestone, 
  Sparkles, 
  CheckCircle2, 
  Compass, 
  UserCheck, 
  BookOpenCheck, 
  GraduationCap, 
  Megaphone, 
  Activity, 
  TrendingUp, 
  Clock 
} from 'lucide-react';

interface JourneyStep {
  id: string;
  stage: string;
  title: string;
  period: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
  status: 'completed' | 'active' | 'upcoming';
}

const JOURNEY_STEPS: JourneyStep[] = [
  {
    id: 'step-1',
    stage: '1. Beginning',
    title: 'Discovering SmartED Vision',
    period: 'Early Stage',
    description: 'Encountered SmartED’s student empowerment mission. Recognized the immense need for bridging collegiate textbook concepts with modern technical certifications and mentorship within my academic circle.',
    icon: <Compass className="w-5 h-5 text-indigo-500" />,
    tags: ['Ideation', 'Curiosity', 'Community Need'],
    status: 'completed'
  },
  {
    id: 'step-2',
    stage: '2. Selection',
    title: 'Ambassador Application & Screening',
    period: 'Evaluation Phase',
    description: 'Submitted credentials, leadership portfolio, and proposal for campus outreach at Sharda University. Selected following a comprehensive evaluation of communication skills and student advocacy potential.',
    icon: <UserCheck className="w-5 h-5 text-purple-500" />,
    tags: ['Merit Selection', 'Leadership', 'Credential Review'],
    status: 'completed'
  },
  {
    id: 'step-3',
    stage: '3. Onboarding',
    title: 'Induction & Ambassador Network',
    period: 'Orientation',
    description: 'Completed official induction into the SmartED National Ambassador Network. Briefed on organizational roadmaps, digital tools, communication channels, and ethical representation standards.',
    icon: <GraduationCap className="w-5 h-5 text-pink-500" />,
    tags: ['National Induction', 'Toolkit', 'Compliance'],
    status: 'completed'
  },
  {
    id: 'step-4',
    stage: '4. Training',
    title: 'Strategic Outreach & Event Mastery',
    period: 'Skill Building',
    description: 'Underwent specialized workshops in digital campaign strategy, public speaking, webinar moderation, student counseling, and cross-departmental coordination.',
    icon: <BookOpenCheck className="w-5 h-5 text-blue-500" />,
    tags: ['Public Speaking', 'Campaign Planning', 'Moderation'],
    status: 'completed'
  },
  {
    id: 'step-5',
    stage: '5. Campaigns',
    title: 'Campus-Wide Upskilling Drives',
    period: 'Execution Phase',
    description: 'Launched multi-channel awareness campaigns connecting 500+ undergraduate students with certified masterclasses, subsidized tech bootcamps, and career mentoring panels.',
    icon: <Megaphone className="w-5 h-5 text-amber-500" />,
    tags: ['Awareness Drives', 'Registrations', 'Engagement'],
    status: 'completed'
  },
  {
    id: 'step-6',
    stage: '6. Current Activities',
    title: 'Active Liaison & Peer Guidance Hub',
    period: 'Ongoing (2026)',
    description: 'Serving as the primary on-ground student liaison. Moderating recurring webinars, facilitating cohort query sessions, and driving active participation in SmartED partner challenges.',
    icon: <Activity className="w-5 h-5 text-emerald-500" />,
    tags: ['Active Liaison', 'Peer Support', 'Live Events'],
    status: 'active'
  },
  {
    id: 'step-7',
    stage: '7. Future Growth',
    title: 'Regional Summits & Inter-University Alliances',
    period: 'Upcoming Horizon',
    description: 'Scaling SmartED presence across North India collegiate chapters, pioneering inter-collegiate hackathons, and establishing research scholarship sponsorships for aspiring student creators.',
    icon: <TrendingUp className="w-5 h-5 text-cyan-500" />,
    tags: ['Regional Expansion', 'Hackathons', 'Scholarships'],
    status: 'upcoming'
  }
];

export default function SmartEDJourney() {
  return (
    <section id="journey" className="py-24 relative border-t border-zinc-200/60 dark:border-zinc-800/60">
      <div className="max-w-5xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 font-mono text-xs font-bold uppercase tracking-wider">
            <Milestone className="w-3.5 h-3.5" />
            Progression Roadmap
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-zinc-900 dark:text-white tracking-tight">
            My Ambassador Journey
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 font-sans text-sm sm:text-base">
            From initial selection and structured training to leading large-scale campus campaigns and orchestrating peer learning drives.
          </p>
        </div>

        {/* Vertical Animated Timeline */}
        <div className="relative pl-6 md:pl-10 border-l-2 border-indigo-500/30 dark:border-indigo-500/20 space-y-10">
          {JOURNEY_STEPS.map((step, idx) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="relative group"
            >
              {/* Timeline Marker Node */}
              <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-zinc-900 border-4 border-indigo-600 shadow-md flex items-center justify-center">
                {step.status === 'active' && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                )}
              </div>

              {/* Journey Step Card */}
              <div className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 space-y-4 ${
                step.status === 'active'
                  ? 'bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent border-indigo-500/40 shadow-lg'
                  : 'bg-white dark:bg-zinc-900/80 border-zinc-200 dark:border-zinc-800 shadow-sm hover:border-indigo-500/30'
              }`}>
                
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                      {step.icon}
                    </div>
                    <div>
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block">
                        {step.stage}
                      </span>
                      <h3 className="font-display font-black text-lg sm:text-xl text-zinc-900 dark:text-white">
                        {step.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                      {step.period}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider ${
                      step.status === 'active'
                        ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/30'
                        : step.status === 'completed'
                        ? 'bg-indigo-500/10 text-indigo-600 border border-indigo-500/20'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 border border-zinc-300 dark:border-zinc-700'
                    }`}>
                      {step.status}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-zinc-600 dark:text-zinc-300 font-sans leading-relaxed">
                  {step.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
                  {step.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-lg text-[10px] font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700"
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
    </section>
  );
}
