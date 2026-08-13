import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, 
  Linkedin, 
  Instagram, 
  Globe, 
  Send, 
  CheckCircle2, 
  Copy, 
  Check, 
  ExternalLink, 
  MessageSquare, 
  Sparkles,
  MapPin,
  Clock,
  GraduationCap,
  Building2,
  Users
} from 'lucide-react';

interface ContactFormData {
  name: string;
  email: string;
  university: string;
  category: string;
  message: string;
}

export default function SmartEDContact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    university: '',
    category: 'Campus Workshop Request',
    message: ''
  });

  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEmail(id);
    setTimeout(() => setCopiedEmail(null), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      // Store in local storage
      try {
        const saved = JSON.parse(localStorage.getItem('smarted_contact_inquiries') || '[]');
        saved.push({
          ...formData,
          id: `inq-${Date.now()}`,
          timestamp: new Date().toISOString()
        });
        localStorage.setItem('smarted_contact_inquiries', JSON.stringify(saved));
      } catch (e) {
        console.error(e);
      }
      setFormData({
        name: '',
        email: '',
        university: '',
        category: 'Campus Workshop Request',
        message: ''
      });
    }, 900);
  };

  return (
    <section id="contact" className="py-24 relative border-t border-zinc-200/60 dark:border-zinc-800/60 bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-mono text-xs font-bold uppercase tracking-wider">
            <Mail className="w-3.5 h-3.5" />
            Get In Touch
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-zinc-900 dark:text-white tracking-tight">
            Connect With SmartED
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 font-sans text-sm sm:text-base leading-relaxed">
            Have questions about upcoming masterclasses, university chapter partnerships, or student certifications? Reach out directly to the Campus Ambassador desk.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Links & Info */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Ambassador Card */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-700 text-white shadow-xl space-y-6 relative overflow-hidden">
              <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-indigo-200 text-xs font-mono font-bold uppercase tracking-widest">
                  <GraduationCap className="w-4 h-4" />
                  Campus Ambassador Desk
                </div>
                <h3 className="font-display font-black text-2xl tracking-tight">
                  Dhruv Gaur
                </h3>
                <p className="text-indigo-100 text-xs font-sans leading-relaxed">
                  Official SmartED Representative & Biotechnology Student Researcher driving technology education initiatives.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-xs text-indigo-100/90 font-sans">
                  <Building2 className="w-4 h-4 text-indigo-300 shrink-0" />
                  <span>Sharda University • Uttar Pradesh, India</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-indigo-100/90 font-sans">
                  <Clock className="w-4 h-4 text-indigo-300 shrink-0" />
                  <span>Response Time: Typically within 24 Hours</span>
                </div>
              </div>

              {/* Direct email pill */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => copyToClipboard('dggaur385@gmail.com', 'ambassador-email')}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/20 text-xs font-mono font-bold transition-all"
                >
                  <span className="truncate">dggaur385@gmail.com</span>
                  {copiedEmail === 'ambassador-email' ? (
                    <span className="flex items-center gap-1 text-emerald-300 text-[10px]">
                      <Check className="w-3.5 h-3.5" /> COPIED
                    </span>
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-white/70" />
                  )}
                </button>
              </div>
            </div>

            {/* Official Channels Grid */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-wider px-1">
                Official Channels & Handles
              </h4>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/dhruv-gaur-21147a285"
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-indigo-500 flex items-center justify-between group transition-all"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-display font-bold text-sm text-zinc-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      LinkedIn Network
                    </h5>
                    <p className="text-[11px] text-zinc-500 font-sans">
                      Connect for academic and ambassador collaboration
                    </p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-zinc-400 group-hover:text-indigo-600 transition-colors" />
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/dhruvgau_r/"
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-pink-500 flex items-center justify-between group transition-all"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-600 dark:text-pink-400 flex items-center justify-center">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-display font-bold text-sm text-zinc-900 dark:text-white group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                      Instagram Updates
                    </h5>
                    <p className="text-[11px] text-zinc-500 font-sans">
                      Campus stories, event coverage & live reels
                    </p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-zinc-400 group-hover:text-pink-600 transition-colors" />
              </a>

              {/* SmartED HQ */}
              <a
                href="https://smarted.org"
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-purple-500 flex items-center justify-between group transition-all"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-display font-bold text-sm text-zinc-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      SmartED Official Portal
                    </h5>
                    <p className="text-[11px] text-zinc-500 font-sans">
                      Explore global programs, curriculum, and leadership
                    </p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-zinc-400 group-hover:text-purple-600 transition-colors" />
              </a>
            </div>

          </div>

          {/* Right Column: Inquiry Submission Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl space-y-8">
              
              <div className="space-y-2 border-b border-zinc-100 dark:border-zinc-800 pb-6">
                <h3 className="font-display font-bold text-xl sm:text-2xl text-zinc-900 dark:text-white">
                  Send an Inquiry / Collaboration Request
                </h3>
                <p className="text-xs sm:text-sm text-zinc-500 font-sans">
                  Fill out the details below to request workshop facilitation, campus speaker sessions, or certification access.
                </p>
              </div>

              {isSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="font-display font-bold text-lg text-emerald-800 dark:text-emerald-300">
                      Inquiry Dispatched Successfully!
                    </h4>
                    <p className="text-xs text-emerald-700 dark:text-emerald-400 max-w-md mx-auto font-sans leading-relaxed">
                      Thank you for connecting with the SmartED Ambassador desk. Dhruv will review your inquiry and follow up shortly.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsSuccess(false)}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-xs font-bold transition-colors"
                  >
                    SEND ANOTHER MESSAGE
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="space-y-2">
                      <label className="text-xs font-mono font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="e.g., Ananya Sharma"
                        className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label className="text-xs font-mono font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="ananya@university.edu"
                        className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Institution */}
                    <div className="space-y-2">
                      <label className="text-xs font-mono font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
                        College / University
                      </label>
                      <input
                        type="text"
                        value={formData.university}
                        onChange={(e) => setFormData(prev => ({ ...prev, university: e.target.value }))}
                        placeholder="e.g., Sharda University / Delhi University / IIT"
                        className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>

                    {/* Inquiry Category */}
                    <div className="space-y-2">
                      <label className="text-xs font-mono font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
                        Inquiry Purpose
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
                      >
                        <option value="Campus Workshop Request">Campus Workshop Request</option>
                        <option value="Student Certification Guidance">Student Certification Guidance</option>
                        <option value="Event Collaboration & Sponsorship">Event Collaboration & Sponsorship</option>
                        <option value="Speaker / Masterclass Invitation">Speaker / Masterclass Invitation</option>
                        <option value="Ambassador Role Questions">Ambassador Role Questions</option>
                        <option value="General Query">General Query</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
                      Message & Agenda Details *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      placeholder="Please describe your event dates, topic interest, expected student count, or inquiry..."
                      className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting || !formData.name || !formData.email || !formData.message}
                    className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:opacity-95 text-white font-display font-bold text-sm tracking-wide shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>DISPATCHING INQUIRY...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>SUBMIT MESSAGE TO AMBASSADOR</span>
                      </>
                    )}
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
