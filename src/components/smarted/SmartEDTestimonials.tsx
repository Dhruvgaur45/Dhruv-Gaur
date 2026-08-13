import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquareQuote, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  Quote, 
  Star, 
  UserCheck, 
  GraduationCap 
} from 'lucide-react';

interface Testimonial {
  id: string;
  role: string;
  name: string;
  title: string;
  institution: string;
  quote: string;
  category: 'Mentor Feedback' | 'Faculty Endorsement' | 'Peer Review' | 'SmartED Team';
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    role: 'Academic Advisor',
    name: 'Dr. R. Sharma',
    title: 'Senior Academic Advisor & Mentor',
    institution: 'Biotechnology & Life Sciences Directorate',
    quote: 'Dhruv’s proactive leadership and clear articulation have significantly boosted student participation in SmartED initiatives. He seamlessly bridges difficult scientific concepts with accessible peer learning.',
    category: 'Faculty Endorsement'
  },
  {
    id: 'test-2',
    role: 'SmartED Outreach Lead',
    name: 'SmartED National Team',
    title: 'Ambassador Program Directorate',
    institution: 'SmartED Education Network',
    quote: 'An outstanding Campus Ambassador who consistently delivers with enthusiasm, high organizational discipline, and authentic student advocacy. Dhruv sets a great benchmark for campus outreach.',
    category: 'SmartED Team'
  },
  {
    id: 'test-3',
    role: 'Peer & Cohort Member',
    name: 'A. Patel',
    title: 'Biotechnology Undergraduate Student',
    institution: 'Sharda University',
    quote: 'Thanks to Dhruv’s guidance and webinars, I enrolled in my first computational biology masterclass through SmartED. His support during the registration and project phase was invaluable.',
    category: 'Peer Review'
  },
  {
    id: 'test-4',
    role: 'Faculty Coordinator',
    name: 'Prof. K. Verma',
    title: 'Department of Biotechnology',
    institution: 'Faculty of Life Sciences',
    quote: 'Dhruv demonstrates exceptional maturity in coordinating multi-departmental seminars and connecting undergraduate cohorts with verified industrial skill platforms.',
    category: 'Mentor Feedback'
  }
];

export default function SmartEDTestimonials() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="testimonials" className="py-24 relative border-t border-zinc-200/60 dark:border-zinc-800/60">
      <div className="max-w-5xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-mono text-xs font-bold uppercase tracking-wider">
            <MessageSquareQuote className="w-3.5 h-3.5" />
            Endorsements & Feedback
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-zinc-900 dark:text-white tracking-tight">
            Testimonials & Endorsements
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 font-sans text-sm sm:text-base">
            Feedback from academic mentors, university faculty, peer students, and the SmartED leadership team.
          </p>
        </div>

        {/* Carousel Card */}
        <div className="relative">
          <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 shadow-xl relative overflow-hidden space-y-8">
            
            {/* Top Row: Category & Stars */}
            <div className="flex items-center justify-between">
              <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                {TESTIMONIALS[currentIndex].category}
              </span>
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
            </div>

            {/* Quote Body */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <p className="font-sans text-lg sm:text-xl text-zinc-800 dark:text-zinc-200 leading-relaxed font-medium italic">
                  "{TESTIMONIALS[currentIndex].quote}"
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 p-0.5 flex items-center justify-center">
                    <div className="w-full h-full rounded-[14px] bg-white dark:bg-zinc-950 flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-base text-zinc-900 dark:text-white">
                      {TESTIMONIALS[currentIndex].name}
                    </h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 font-sans">
                      {TESTIMONIALS[currentIndex].title} • <span className="text-indigo-600 dark:text-indigo-400">{TESTIMONIALS[currentIndex].institution}</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Bottom Nav Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center gap-1.5">
                {TESTIMONIALS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      currentIndex === idx
                        ? 'w-6 bg-indigo-600 dark:bg-indigo-400'
                        : 'w-2 bg-zinc-200 dark:bg-zinc-700'
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={prevTestimonial}
                  className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-all cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
