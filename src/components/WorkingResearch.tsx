import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Layers, 
  Binary, 
  FileText, 
  Clock, 
  TrendingUp, 
  RefreshCw, 
  Plus, 
  HelpCircle, 
  CheckCircle, 
  ChevronRight, 
  Sparkles
} from 'lucide-react';

interface ResearchPaper {
  id: string;
  category: string;
  title: string;
  abstract: string;
  doi: string;
  status: 'Ongoing Active' | 'Upcoming' | 'Inactive' | 'Starting Soon';
  date: string;
  metrics: {
    label: string;
    value: string;
  }[];
}

interface WorkingResearchProps {
  isOwner: boolean;
  onTriggerAuth: (customMessage?: string) => void;
}

export default function WorkingResearch({ isOwner, onTriggerAuth }: WorkingResearchProps) {
  // Static papers mapping Dhruv's actual core research interests
  const [papers] = useState<ResearchPaper[]>([
    {
      id: 'paper-photonic',
      category: 'PHOTONIC COMPUTING & HPC INFRASTRUCTURE',
      title: 'Optimizing Bioinformatics Sequences on Silicon Photonic Integrated Processors',
      abstract: 'Analyzing micro-ring resonators and wave-guide routing layers to accelerate codon sequence matches. We demonstrate a simulated 400x throughput boost for dynamic programming alignment algorithms utilizing optoelectronic phase-shift arrays.',
      doi: 'DOI: 10.1107/ph.bioinf.2026.04',
      status: 'Starting Soon',
      date: 'May 2026',
      metrics: [
        { label: 'SIMULATED SPEEDUP', value: '382x' },
        { label: 'POWER CONSUMPTION', value: '4.2W / TFlop' },
        { label: 'ALIGNMENT LATENCY', value: '1.2ns' }
      ]
    },
    {
      id: 'paper-oncology',
      category: 'CANCER RESEARCH & BIOINFORMATICS',
      title: 'Deep Residual Neural Networks for Predictive Mutation Correlative Mapping in Colon Adenocarcinoma',
      abstract: '',
      doi: 'Awaiting DOI Indexation',
      status: 'Upcoming',
      date: '',
      metrics: []
    },
    {
      id: 'paper-bioreactor',
      category: 'BIOENGINEERING & IoT AUTOMATION',
      title: 'Standardizing Microfluidic Feedback Regimes in Mammalian Cell Cultures Under GLP Compliances',
      abstract: '',
      doi: 'Awaiting DOI Indexation',
      status: 'Upcoming',
      date: '',
      metrics: []
    }
  ]);

  const [selectedPaperId, setSelectedPaperId] = useState('paper-photonic');

  // Interactive Lab Notebook notes
  const [notes, setNotes] = useState<Array<{ id: string; datetime: string; message: string; author: string; hash: string }>>([
    {
      id: 'note-1',
      datetime: '2026-05-26 14:22:05',
      message: 'Initial modeling of the micro-ring resonator shows steady optical resonance at 1550nm wavelength. Power fluctuations stabilized at 30mW.',
      author: 'D. Gaur',
      hash: 'B8C1-A0E5'
    },
    {
      id: 'note-2',
      datetime: '2026-05-25 09:12:44',
      message: 'Extracted mutation indices from the reference genomes. S3 inserters mapped to standard SBS columns 3 and 7 automatically.',
      author: 'D. Gaur',
      hash: 'F0D3-E412'
    }
  ]);

  const [newNote, setNewNote] = useState('');
  const [activeTab, setActiveTab] = useState<'papers' | 'playground'>('papers');

  // Photonic Playground State Variables
  const [laserFreq, setLaserFreq] = useState(25); // GHz
  const [waferNode, setWaferNode] = useState(7); // nm
  const [sequenceLength, setSequenceLength] = useState(500); // Kbp
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [progress, setProgress] = useState(100);
  const [estimatedTflops, setEstimatedTflops] = useState(0);
  const [estimatedSpeedup, setEstimatedSpeedup] = useState(0);

  // Recalculate playground estimates dynamic calculations
  useEffect(() => {
    // Estimations based on semiconductor physics equations (mock model alignment)
    const tflops = Number(((laserFreq * (28 / waferNode) * 1.6) + (sequenceLength / 1200)).toFixed(2));
    const speedup = Number((tflops * 1.8 + 24).toFixed(1));
    setEstimatedTflops(tflops);
    setEstimatedSpeedup(speedup);
  }, [laserFreq, waferNode, sequenceLength]);

  const runPlaygroundSimulation = () => {
    if (simulationRunning) return;
    setSimulationRunning(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setSimulationRunning(false);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isOwner) {
      onTriggerAuth("Owner authentication is required to modify or publish to the Lab Notebook journal.");
      return;
    }
    if (!newNote.trim()) return;

    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const hexHash = Math.abs(newNote.split('').reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a; }, 0)).toString(16).toUpperCase().substring(0, 8);
    const splitHash = `${hexHash.substring(0, 4)}-${hexHash.substring(4, 8)}`;

    const freshNote = {
      id: `note-${Date.now()}`,
      datetime: timestamp,
      message: newNote,
      author: 'Dhruv Gaur (Owner 🧬)',
      hash: splitHash
    };

    setNotes([freshNote, ...notes]);
    setNewNote('');
  };

  const currentPaper = papers.find(p => p.id === selectedPaperId) || papers[0];

  return (
    <div className="space-y-12">
      {/* Header layout */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#1A1A1A]/10 pb-8">
        <div className="max-w-xl space-y-3">
          <span className="text-brand-accent text-[9px] font-bold tracking-widest uppercase block">Biotech Computational Lab</span>
          <h2 className="font-serif italic text-3xl font-black text-[#1A1A1A] uppercase tracking-tight">Working Research</h2>
          <p className="text-sm text-brand-text-muted leading-relaxed font-normal">
            Ongoing research vectors, optical computing simulations, oncology neural structures, and rigorous physical calculation blueprints.
          </p>
        </div>

        {/* View Toggle tabs */}
        <div className="flex border border-[#1A1A1A]/15 bg-white p-1 self-start md:self-end">
          <button
            onClick={() => setActiveTab('papers')}
            className={`px-4 py-2 font-mono text-[9px] tracking-widest uppercase font-black transition-all cursor-pointer ${
              activeTab === 'papers' 
                ? 'bg-[#1A1A1A] text-white' 
                : 'bg-transparent text-brand-text-muted hover:text-[#1A1A1A]'
            }`}
          >
            I. ACADEMIC ABSTRACTS
          </button>
          <button
            onClick={() => setActiveTab('playground')}
            className={`px-4 py-2 font-mono text-[9px] tracking-widest uppercase font-black transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'playground' 
                ? 'bg-[#1A1A1A] text-white' 
                : 'bg-transparent text-brand-text-muted hover:text-[#1A1A1A]'
            }`}
          >
            II. SIMULATION CO-PROCESSOR <Sparkles className="w-3 h-3 text-brand-accent" />
          </button>
        </div>
      </div>

      {activeTab === 'papers' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Navigation: Papers lists */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-[9px] font-mono tracking-widest font-extrabold text-brand-text-muted uppercase block mb-1">
              SELECT AN ACTIVE TOPICAL MANUSCRIPT
            </span>
            {papers.map((paper) => {
              const isSelected = selectedPaperId === paper.id;
              const isInactive = paper.status === 'Inactive';
              return (
                <button
                  key={paper.id}
                  disabled={isInactive}
                  onClick={() => !isInactive && setSelectedPaperId(paper.id)}
                  className={`w-full text-left p-5 border transition-all duration-300 relative group flex flex-col justify-between rounded-none bg-white ${
                    isInactive
                      ? 'opacity-40 cursor-not-allowed border-gray-250/20 bg-gray-50/20'
                      : isSelected 
                      ? 'border-[#1A1A1A] border-l-4 border-l-brand-accent shadow-sm cursor-pointer' 
                      : 'border-[#1A1A1A]/10 hover:border-[#1A1A1A]/30 cursor-pointer'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className={`font-mono text-[8px] tracking-widest font-bold block ${isInactive ? 'text-gray-400' : 'text-brand-accent'}`}>
                        {paper.category}
                      </span>
                      <span className={`text-[8px] font-mono font-black uppercase px-2 py-0.5 border ${
                        paper.status === 'Starting Soon'
                          ? 'border-[#D97706]/20 bg-[#D97706]/5 text-[#D97706]'
                          : paper.status === 'Ongoing Active' 
                          ? 'border-[#22C55E]/20 bg-[#22C55E]/5 text-[#16A34A]' 
                          : isInactive
                          ? 'border-gray-300/30 bg-gray-500/5 text-gray-400'
                          : 'border-[#1A1A1A]/20 bg-[#1A1A1A]/5 text-[#1A1A1A]'
                      }`}>
                        {paper.status}
                      </span>
                    </div>
                    <h4 className={`font-serif italic text-base font-black leading-tight transition-colors ${
                      isInactive ? 'text-gray-400' : 'text-[#1A1A1A] group-hover:text-brand-accent'
                    }`}>
                      {paper.title}
                    </h4>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#1A1A1A]/5 flex items-center justify-between text-[10px] font-mono text-brand-text-muted">
                    {paper.date ? (
                      <span>{paper.date}</span>
                    ) : (
                      <span className="text-brand-text-muted/40 italic">[NO DATE ASSIGNED]</span>
                    )}
                    {!isInactive ? (
                      <span className="flex items-center text-brand-accent font-bold">
                        INSPECT ABSTRACT <ChevronRight className="w-3 h-3 ml-0.5" />
                      </span>
                    ) : (
                      <span className="flex items-center text-gray-400 font-bold tracking-wider">
                        [INACTIVE / COMPILING]
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Area: Selected Paper Extended Specs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white p-6 md:p-8 border border-[#1A1A1A]/10 rounded-none shadow-sm space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 glow-radial select-none pointer-events-none opacity-60"></div>
              
              <div className="space-y-2">
                <span className="bg-[#1A1A1A] text-white text-[8px] font-mono tracking-widest px-2.5 py-1 uppercase font-bold inline-block">
                  {currentPaper.category}
                </span>
                <h3 className="font-serif italic text-2xl font-black text-[#1A1A1A] leading-tight">
                  {currentPaper.title}
                </h3>
                <div className="flex items-center gap-4 text-2xs font-mono text-brand-text-muted pt-1">
                  {currentPaper.date ? (
                    <>
                      <span>PUBLICATION DATE: <strong>{currentPaper.date}</strong></span>
                      <span>|</span>
                    </>
                  ) : null}
                  <span className="text-brand-accent select-all font-bold">{currentPaper.doi}</span>
                </div>
              </div>

              {/* Theoretical Abstract */}
              <div className="space-y-2 border-t border-b border-[#1A1A1A]/10 py-6">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-brand-accent" />
                  <span className="font-mono text-[9px] font-extrabold tracking-widest text-[#1A1A1A] uppercase">
                    ACADEMIC SYNOPSIS ABSTRACT
                  </span>
                </div>
                <p className="text-xs text-brand-text-muted leading-relaxed font-sans font-normal italic">
                  {currentPaper.abstract ? `"${currentPaper.abstract}"` : "Ongoing development block. The publication abstract has been set, but the manuscript contents are currently classified under peer review and active iteration pipelines."}
                </p>
              </div>

              {/* Research Metrics Board */}
              <div className="space-y-3">
                <span className="font-mono text-[9px] font-extrabold text-[#1A1A1A] tracking-widest block uppercase">
                  SIMULATED VALIDATION TELEMETRY METRICS
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {currentPaper.metrics && currentPaper.metrics.length > 0 ? (
                    currentPaper.metrics.map((m, idx) => (
                      <div key={idx} className="bg-brand-bg p-4 border border-[#1A1A1A]/5 rounded-none flex flex-col justify-between">
                        <span className="text-[8px] font-mono text-brand-text-muted uppercase tracking-wider font-semibold">
                          {m.label}
                        </span>
                        <p className="text-lg font-serif italic font-black text-[#1A1A1A] tracking-tight mt-1">
                          {m.value}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="sm:col-span-3 bg-brand-bg/50 p-6 border border-[#1A1A1A]/5 rounded-none text-center py-8">
                      <span className="font-mono text-3xs text-brand-text-muted/60 tracking-widest uppercase block font-black">
                        NO ACTIVE METRICS DATA RECOVERED
                      </span>
                      <p className="text-2xs text-brand-text-muted/50 mt-1 font-sans">
                        Dynamic validation telemetry metrics are set to acquire on next compiled sequencing batch loops.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Interactive LEDGER section: Note block */}
            <div className="bg-brand-surface p-6 border border-[#1A1A1A]/12 rounded-none space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Binary className="w-4.5 h-4.5 text-brand-accent animate-pulse" />
                  <h4 className="font-serif italic text-base font-black text-[#1A1A1A]">
                    Interactive Lab Notebook
                  </h4>
                </div>
                <span className="bg-white px-2.5 py-0.5 border border-[#1A1A1A]/10 font-mono text-[9px] font-bold text-brand-text-muted uppercase">
                  {notes.length} LEDGER ENTRIES RECORDED
                </span>
              </div>

              <form onSubmit={handleAddNote} className="flex gap-2.5">
                <input
                  type="text"
                  required
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder={isOwner ? "Record clinical observations, research hypotheses, or system notes..." : "🔐 ONLY OWNER CAN WRITE TO LAB JOURNAL. CLICK TO LOG IN..."}
                  onClick={() => {
                    if (!isOwner) {
                      onTriggerAuth("Owner authentication is required to modify or publish to the Lab Notebook journal.");
                    }
                  }}
                  className={`w-full bg-white border px-3.5 py-2 text-xs focus:outline-none focus:border-brand-accent placeholder:text-brand-text-muted/55 text-[#1A1A1A] font-mono rounded-none transition-all ${
                    !isOwner ? 'cursor-pointer hover:border-amber-400 bg-amber-50/5 border-amber-400/25' : 'border-[#1A1A1A]/10'
                  }`}
                />
                <button
                  type="submit"
                  className="bg-[#1A1A1A] hover:bg-brand-accent text-white px-5 py-2 font-mono text-[9px] font-black uppercase tracking-widest cursor-pointer transition-all duration-300 flex items-center gap-1.5 rounded-none shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" /> REGISTER NOTE
                </button>
              </form>

              {/* Notes chronological visual stream */}
              <div className="space-y-2.5 max-h-48 overflow-y-auto scrollbar-thin">
                <AnimatePresence>
                  {notes.map((n) => (
                    <motion.div
                      key={n.id}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="bg-white p-3.5 border border-[#1A1A1A]/8 rounded-none text-2xs font-mono space-y-1.5 shadow-sm"
                    >
                      <div className="flex items-center justify-between text-brand-text-muted text-[8px] font-bold border-b border-[#1A1A1A]/5 pb-1 uppercase tracking-wider">
                        <span className="text-brand-accent">STAMP // {n.datetime}</span>
                        <span>BY: {n.author}</span>
                        <span>SIGNATURE: <strong className="text-[#1A1A1A]">{n.hash}</strong></span>
                      </div>
                      <p className="text-[#1A1A1A]/95 leading-relaxed font-sans font-medium">
                        {n.message}
                      </p>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

          </div>

        </div>
      ) : (
        /* PLAYGROUND INTERACTIVE: Silicon Photonic Processing Hardware Spec Estimator */
        <div className="bg-white border border-[#1A1A1A]/10 p-6 md:p-8 rounded-none shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="bg-brand-accent/10 text-brand-accent text-[8px] font-mono tracking-widest px-2.5 py-1 uppercase font-bold inline-block border border-brand-accent/20">
                SILICON PHOTONIC CORE SIMULATOR
              </span>
              <h3 className="font-serif italic text-2xl font-black text-[#1A1A1A] tracking-tight uppercase leading-none">
                Interactive Co-Processor Estimator
              </h3>
              <p className="text-xs text-brand-text-muted leading-relaxed font-sans max-w-xl">
                Fine-tune your hardware packaging variables. This sandbox estimates floating point throughput dynamics and genome base matching speeds by modeling optical wave-guide phase shifts.
              </p>
            </div>

            {/* Variable Slider controls */}
            <div className="space-y-5 bg-brand-bg p-5 border border-[#1A1A1A]/5 rounded-none">
              <h4 className="font-mono text-[9px] font-black text-[#1A1A1A] tracking-wider uppercase border-b border-[#1A1A1A]/10 pb-2">
                CO-PROCESSOR PACKAGING CONTROLS
              </h4>
              
              {/* Laser Frequency */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-3xs font-mono font-bold text-brand-text-muted">
                  <span>LASER MODULATION FREQUENCY</span>
                  <span className="text-[#1A1A1A] bg-white border border-[#1A1A1A]/10 px-1.5 py-0.5">{laserFreq} GHz</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="100"
                  value={laserFreq}
                  onChange={(e) => setLaserFreq(Number(e.target.value))}
                  className="w-full accent-brand-accent cursor-pointer"
                />
              </div>

              {/* Wafer Node */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-3xs font-mono font-bold text-brand-text-muted">
                  <span>PHOTONIC NODE LITHOGRAPHY GATES</span>
                  <span className="text-[#1A1A1A] bg-white border border-[#1A1A1A]/10 px-1.5 py-0.5">{waferNode} nm</span>
                </div>
                <div className="flex gap-2">
                  {[28, 14, 7, 5, 3].map(node => (
                    <button
                      key={node}
                      type="button"
                      onClick={() => setWaferNode(node)}
                      className={`flex-1 py-1.5 font-mono text-[9px] font-bold border transition-all cursor-pointer ${
                        waferNode === node 
                          ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' 
                          : 'bg-white hover:bg-brand-surface border-[#1A1A1A]/10 text-brand-text-muted'
                      }`}
                    >
                      {node}NM
                    </button>
                  ))}
                </div>
              </div>

              {/* Sequence Batch target length */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-3xs font-mono font-bold text-brand-text-muted">
                  <span>SEQUENCE BATCH CHUNK SIZE</span>
                  <span className="text-[#1A1A1A] bg-white border border-[#1A1A1A]/10 px-1.5 py-0.5">{sequenceLength} Kbp</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="1500"
                  step="50"
                  value={sequenceLength}
                  onChange={(e) => setSequenceLength(Number(e.target.value))}
                  className="w-full accent-brand-accent cursor-pointer"
                />
              </div>

            </div>

            {/* Simulation progress or trigger button */}
            <div className="space-y-2.5">
              <button
                onClick={runPlaygroundSimulation}
                disabled={simulationRunning}
                className="w-full bg-[#1A1A1A] hover:bg-brand-accent disabled:bg-brand-surface disabled:text-[#1A1A1A]/20 hover:border-transparent text-white font-mono font-bold text-[10px] uppercase tracking-widest py-3 border border-white/20 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                {simulationRunning ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" /> SIMULATING PHASE SHIFT CHANNELS...
                  </>
                ) : (
                  <>
                    <TrendingUp className="w-3.5 h-3.5" /> RE-COMPILE CO-PROCESSOR ब्लू-प्रिंट
                  </>
                )}
              </button>

              {/* Mini visual log feed */}
              <div className="bg-brand-bg border border-[#1A1A1A]/10 p-3 h-14 font-mono text-[9px] flex items-center justify-between">
                <div className="space-y-0.5 text-brand-text-muted">
                  <span>[INTEGRITY] Opto-thermal phase drift lock.</span>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                    <span className="font-bold text-emerald-700">STATUS: CORE RESONANCE STABLE</span>
                  </div>
                </div>
                <div className="text-right text-[10px] font-black text-brand-accent uppercase tracking-widest">
                  Wavelength: 1550nm
                </div>
              </div>
            </div>

          </div>

          {/* Right Area: Math Calculation Specs Dashboard */}
          <div className="lg:col-span-5 bg-brand-bg border border-[#1A1A1A]/10 p-6 flex flex-col justify-between space-y-6 relative overflow-hidden">
            <div className="space-y-4">
              <span className="font-mono text-[8px] text-brand-text-muted block uppercase tracking-widest font-extrabold pb-2 border-b border-[#1A1A1A]/10">
                CALCULATED CORE DISPATCH
              </span>
              
              {/* Output metric 1 */}
              <div>
                <span className="text-[8px] font-mono text-brand-text-muted block uppercase font-bold tracking-wider">
                  ESTIMATED THROUGHPUT CAPACITY
                </span>
                <p className="text-3xl md:text-4xl font-serif italic font-black text-brand-accent tracking-tighter mt-1">
                  {estimatedTflops} <span className="text-xs not-italic font-mono text-[#1A1A1A]/60 block sm:inline">TFLOPS (Optical Rate)</span>
                </p>
                <div className="w-full bg-[#1A1A1A]/10 h-1 rounded-none mt-2 overflow-hidden">
                  <div 
                    className="h-full bg-brand-accent transition-all duration-300"
                    style={{ width: `${Math.min((estimatedTflops / 180) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Output metric 2 */}
              <div className="pt-2">
                <span className="text-[8px] font-mono text-brand-text-muted block uppercase font-bold tracking-wider">
                  SIMULATED COMPRESSION SPEEDUP
                </span>
                <p className="text-2xl md:text-3xl font-serif italic font-black text-[#1A1A1A] tracking-tighter mt-1">
                  +{estimatedSpeedup}x <span className="text-2xs not-italic font-mono text-brand-text-muted">against theoretical CPU layers</span>
                </p>
              </div>

              {/* Output metric 3 */}
              <div className="pt-2 border-t border-[#1A1A1A]/10">
                <span className="text-[8px] font-mono text-brand-text-muted block uppercase font-bold tracking-wider">
                  ALIGNMENT ACCURACY (RESIDUAL GAP)
                </span>
                <div className="flex items-center gap-1.5 mt-1">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span className="font-mono text-xs font-extrabold text-[#1A1A1A]">99.99981% Precision Score</span>
                </div>
              </div>
            </div>

            <div className="bg-white/50 border border-[#1A1A1A]/8 p-4 font-mono text-[9px] text-brand-text-muted leading-relaxed">
              <p className="font-bold text-[#1A1A1A] mb-1">📐 MATHEMATICAL CO-EFFICIENT BLUEPRINT</p>
              Latency &alpha; (WaferGate &times; Waveform length) / Laser Modulation. Optoelectronic phase array index calculated recursively.
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
