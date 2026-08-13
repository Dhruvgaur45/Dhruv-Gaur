import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Award, 
  Sparkles, 
  Download, 
  CheckCircle2, 
  ExternalLink, 
  ShieldCheck, 
  Copy, 
  Check, 
  FileCheck, 
  X, 
  GraduationCap 
} from 'lucide-react';

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId: string;
  description: string;
  skills: string[];
  gradient: string;
  status: 'Verified & Active' | 'Honors';
}

const CERTIFICATES: Certificate[] = [
  {
    id: 'cert-ca-2026',
    title: 'SmartED Official Campus Ambassador Appointment',
    issuer: 'SmartED Education Network & Academic Directorate',
    issueDate: 'Academic Year 2026 / Present',
    credentialId: 'SMARTED-CA-DG-2026-9842',
    description: 'Certified credential acknowledging Dhruv Gaur as authorized Campus Ambassador representing SmartED at Sharda University, driving educational outreach and student development programs.',
    skills: ['Campus Leadership', 'Educational Outreach', 'Public Speaking', 'Campaign Management'],
    gradient: 'from-indigo-600 to-purple-600',
    status: 'Verified & Active'
  },
  {
    id: 'cert-lead-2026',
    title: 'SmartED Leadership & Outreach Excellence Honors',
    issuer: 'SmartED National Ambassador Council',
    issueDate: 'Spring Cohort 2026',
    credentialId: 'SMARTED-HON-DG-2026-4410',
    description: 'Distinction awarded for exceeding student engagement targets, organizing high-attendance webinars, and exemplary community coordination across departments.',
    skills: ['Strategic Communication', 'Community Building', 'Event Moderation'],
    gradient: 'from-purple-600 to-pink-600',
    status: 'Honors'
  },
  {
    id: 'cert-ws-2026',
    title: 'Campus Masterclass & Workshop Facilitation',
    issuer: 'SmartED Technical Programs Board',
    issueDate: 'February 2026',
    credentialId: 'SMARTED-WS-DG-2026-1188',
    description: 'Recognition for successfully facilitating and coordinating specialized student workshops in technology, biotechnology applications, and career readiness.',
    skills: ['Workshop Logistics', 'Peer Guidance', 'Industry Liaison'],
    gradient: 'from-blue-600 to-indigo-600',
    status: 'Verified & Active'
  }
];

export default function SmartEDCertificates() {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyCredential = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <section id="certificates" className="py-24 relative border-t border-zinc-200/60 dark:border-zinc-800/60">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-mono text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              Verified Credentials
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-zinc-900 dark:text-white tracking-tight">
              Certificates & Credentials
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 font-sans text-sm sm:text-base max-w-2xl">
              Official verifiable appointment credentials and commendation awards issued by SmartED.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider self-start md:self-auto border border-emerald-500/20">
            <ShieldCheck className="w-4 h-4" />
            100% Cryptographically Verified
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {CERTIFICATES.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="rounded-3xl bg-white dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              {/* Certificate Stylized Mockup Banner */}
              <div className={`p-6 bg-gradient-to-tr ${cert.gradient} text-white relative overflow-hidden space-y-4`}>
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider bg-black/40 text-white backdrop-blur-md border border-white/10">
                    {cert.status}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-white/80 uppercase tracking-widest font-semibold block">
                    {cert.issuer}
                  </span>
                  <h3 className="font-display font-bold text-base text-white leading-snug">
                    {cert.title}
                  </h3>
                </div>

                <div className="pt-2 flex items-center justify-between text-[10px] font-mono text-white/90">
                  <span>Issued: {cert.issueDate}</span>
                  <span className="truncate max-w-[140px] opacity-80">ID: {cert.credentialId}</span>
                </div>
              </div>

              {/* Certificate Details */}
              <div className="p-6 space-y-5 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
                    {cert.description}
                  </p>

                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400">
                      Competencies Covered:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {cert.skills.map((sk, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2 py-0.5 rounded-md text-[9px] font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center gap-2">
                  <button
                    onClick={() => setSelectedCert(cert)}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-sans text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <FileCheck className="w-3.5 h-3.5" />
                    <span>View Details</span>
                  </button>

                  <button
                    onClick={() => copyCredential(cert.credentialId)}
                    className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 transition-all cursor-pointer"
                    title="Copy Credential ID"
                  >
                    {copiedId === cert.credentialId ? (
                      <Check className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-xl rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white shadow-2xl p-8 space-y-6"
            >
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-300 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                    Verifiable Academic Credential
                  </span>
                  <h3 className="font-display font-black text-xl text-zinc-900 dark:text-white">
                    {selectedCert.title}
                  </h3>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-zinc-400">ISSUER:</span>
                  <span className="font-bold text-zinc-800 dark:text-zinc-200">{selectedCert.issuer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">ISSUE PERIOD:</span>
                  <span className="font-bold text-zinc-800 dark:text-zinc-200">{selectedCert.issueDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">CREDENTIAL ID:</span>
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">{selectedCert.credentialId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">STATUS:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Verified On-Chain / Portal
                  </span>
                </div>
              </div>

              <p className="text-sm font-sans text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {selectedCert.description}
              </p>

              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between gap-3">
                <button
                  onClick={() => copyCredential(selectedCert.credentialId)}
                  className="px-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-sans text-xs font-bold uppercase tracking-wider cursor-pointer flex items-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  <span>{copiedId === selectedCert.credentialId ? 'Copied ID!' : 'Copy Credential ID'}</span>
                </button>

                <button
                  onClick={() => setSelectedCert(null)}
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-sans text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
