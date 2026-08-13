import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Images, 
  Sparkles, 
  Award, 
  Calendar, 
  Users, 
  BookOpen, 
  Megaphone, 
  Trophy, 
  Eye, 
  X, 
  ExternalLink 
} from 'lucide-react';

interface GalleryItem {
  id: string;
  category: 'Certificates' | 'Photos' | 'Events' | 'Meetings' | 'Workshops' | 'Campaigns' | 'Achievements';
  title: string;
  subtitle: string;
  date: string;
  description: string;
  gradient: string;
  icon: React.ReactNode;
  tags: string[];
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g-cert-1',
    category: 'Certificates',
    title: 'SmartED Campus Ambassador Appointment',
    subtitle: 'Official Letter of Credential & Representation',
    date: '2026 Academic Year',
    description: 'Official appointment certificate authorizing Dhruv Gaur as the SmartED Campus Ambassador for Sharda University, leading campus outreach and student engagement.',
    gradient: 'from-indigo-600/30 via-purple-600/20 to-pink-600/20',
    icon: <Award className="w-8 h-8 text-indigo-400" />,
    tags: ['SmartED', 'Credential', 'Ambassador', 'Appointment']
  },
  {
    id: 'g-event-1',
    category: 'Events',
    title: 'Biotech & Computational Seminar Series',
    subtitle: 'Student Learning & Industry Readiness Panels',
    date: 'Quarterly Series',
    description: 'Promoting interactive seminars and webinars connecting undergraduate students with industry leaders, educational mentors, and technical roadmap experts.',
    gradient: 'from-purple-600/30 via-fuchsia-600/20 to-indigo-600/20',
    icon: <Calendar className="w-8 h-8 text-purple-400" />,
    tags: ['Webinars', 'Panels', 'Campus Life', 'Skill Building']
  },
  {
    id: 'g-camp-1',
    category: 'Campaigns',
    title: 'Skill-Up Campus Outreach Drive',
    subtitle: 'Peer Engagement & Resource Distribution Drive',
    date: 'Spring Drive',
    description: 'Digital and on-ground awareness campaigns informing student circles about subsidized certifications, open courses, and collaborative learning resources.',
    gradient: 'from-fuchsia-600/30 via-rose-600/20 to-purple-600/20',
    icon: <Megaphone className="w-8 h-8 text-fuchsia-400" />,
    tags: ['Outreach', 'Campaign', 'Digital Media', 'Advocacy']
  },
  {
    id: 'g-work-1',
    category: 'Workshops',
    title: 'Hands-on Technical & Career Bootcamps',
    subtitle: 'Practical Skills & Interactive Mentorship',
    date: 'Interactive Sessions',
    description: 'Facilitating student participation in high-impact bootcamps spanning computational methods, biotechnology applications, and professional communication.',
    gradient: 'from-blue-600/30 via-indigo-600/20 to-cyan-600/20',
    icon: <BookOpen className="w-8 h-8 text-blue-400" />,
    tags: ['Workshops', 'Hands-on', 'Mentorship', 'Career']
  },
  {
    id: 'g-meet-1',
    category: 'Meetings',
    title: 'Ambassador Council & Strategic Huddle',
    subtitle: 'National Ambassador Network Coordination',
    date: 'Monthly Synced',
    description: 'Strategic alignment meetings with SmartED leadership and fellow ambassadors to share campus feedback, brainstorm new campaigns, and refine student support.',
    gradient: 'from-amber-600/30 via-orange-600/20 to-indigo-600/20',
    icon: <Users className="w-8 h-8 text-amber-400" />,
    tags: ['Leadership', 'Council', 'Strategy', 'National']
  },
  {
    id: 'g-ach-1',
    category: 'Achievements',
    title: 'Top Engagement Ambassador Distinction',
    subtitle: 'Campus Impact & Outreach Commendation',
    date: 'Honorary Distinction',
    description: 'Commended for achieving top quartile student participation and organizing seamless educational webinars with over 500+ registered attendees.',
    gradient: 'from-emerald-600/30 via-teal-600/20 to-indigo-600/20',
    icon: <Trophy className="w-8 h-8 text-emerald-400" />,
    tags: ['Excellence', 'Recognition', 'High Engagement', 'Impact']
  }
];

export default function SmartEDGallery() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  const categories = ['All', 'Certificates', 'Events', 'Campaigns', 'Workshops', 'Meetings', 'Achievements'];

  const filteredItems = categoryFilter === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === categoryFilter);

  return (
    <section id="gallery" className="py-24 relative border-t border-zinc-200/60 dark:border-zinc-800/60">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 font-mono text-xs font-bold uppercase tracking-wider">
              <Images className="w-3.5 h-3.5" />
              Media Showcase & Proof
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-zinc-900 dark:text-white tracking-tight">
              Activity & Artifact Gallery
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 font-sans text-sm sm:text-base max-w-2xl">
              Visual artifacts, certificates, campaign showcases, and event highlights from my SmartED ambassadorship. Click any item for the lightbox viewer.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  categoryFilter === cat
                    ? 'bg-white dark:bg-zinc-900 text-indigo-600 dark:text-indigo-400 shadow-sm border border-zinc-200 dark:border-zinc-700'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              whileHover={{ y: -6 }}
              onClick={() => setSelectedItem(item)}
              className="group cursor-pointer rounded-3xl overflow-hidden bg-white dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 hover:border-indigo-500/50 transition-all duration-300 shadow-sm hover:shadow-2xl flex flex-col justify-between"
            >
              {/* Visual Banner */}
              <div className={`h-48 relative bg-gradient-to-br ${item.gradient} p-6 flex flex-col justify-between overflow-hidden border-b border-zinc-100 dark:border-zinc-800`}>
                <div className="flex justify-between items-start">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-black/40 text-white backdrop-blur-md border border-white/10">
                    {item.category}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <Eye className="w-4 h-4" />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 shadow-lg">
                    {item.icon}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-white/80 font-bold uppercase block tracking-wider">
                      {item.date}
                    </span>
                    <h4 className="text-sm font-bold text-white leading-snug drop-shadow-sm">
                      {item.title}
                    </h4>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <p className="text-xs text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed line-clamp-3">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                  {item.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded-lg text-[9px] font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700"
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

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-2xl rounded-3xl overflow-hidden border border-white/20 bg-zinc-950 text-white shadow-2xl space-y-6"
            >
              {/* Top Banner */}
              <div className={`p-8 bg-gradient-to-br ${selectedItem.gradient} relative border-b border-white/10`}>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 border border-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="space-y-2">
                  <span className="px-3 py-1 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider bg-black/40 text-white border border-white/15 inline-block">
                    {selectedItem.category}
                  </span>
                  <h3 className="font-display font-black text-2xl text-white">
                    {selectedItem.title}
                  </h3>
                  <p className="text-xs font-mono text-purple-300 tracking-wider uppercase font-semibold">
                    {selectedItem.subtitle} • {selectedItem.date}
                  </p>
                </div>
              </div>

              {/* Body */}
              <div className="p-8 pt-0 space-y-6">
                <div className="space-y-2">
                  <h4 className="font-mono text-[10px] text-purple-400 uppercase tracking-widest font-bold">
                    SPECIMEN OVERVIEW & CONTEXT
                  </h4>
                  <p className="text-sm font-sans text-zinc-300 leading-relaxed">
                    {selectedItem.description}
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-mono text-[10px] text-purple-400 uppercase tracking-widest font-bold">
                    RELEVANT TAGS
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-lg text-[10px] font-mono bg-white/5 border border-white/10 text-zinc-300"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span>REF ID: SMARTED-GAL-{selectedItem.id.toUpperCase()}</span>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-sans text-xs font-semibold cursor-pointer transition-colors"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
