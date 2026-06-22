import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Check, 
  Copy, 
  Cpu, 
  BookOpen, 
  Microscope, 
  Sliders, 
  Database,
  Terminal, 
  ArrowRight, 
  RefreshCw, 
  AlertTriangle,
  Flame,
  Binary,
  Layers,
  ChevronRight,
  TrendingUp,
  MapPin,
  Clock,
  ShieldCheck
} from 'lucide-react';

interface PipelineConsoleProps {
  projectId: string;
  scientificMetric: string;
}

export default function PipelineConsole({ projectId, scientificMetric }: PipelineConsoleProps) {
  // 1. NGS / RNA-seq Simulator States
  const [ngstStep, setNgstStep] = useState<'idle' | 'trimming' | 'aligning' | 'dge' | 'complete'>('idle');
  const [ngstProgress, setNgstProgress] = useState(0);
  const [ngstLogs, setNgstLogs] = useState<string[]>([]);
  const [selectedGene, setSelectedGene] = useState<string | null>(null);

  // 2. AI LinkedIn Post Creator States
  const [liTheme, setLiTheme] = useState('CRISPR-Cas9 Gene Editing');
  const [liTone, setLiTone] = useState('Academic & Scientific');
  const [isGeneratingLi, setIsGeneratingLi] = useState(false);
  const [generatedPost, setGeneratedPost] = useState('');
  const [postCopied, setPostCopied] = useState(false);

  // 3. Silicon Photonic Simulator States
  const [gbSize, setGbSize] = useState(65);

  // 4. Portfolio Architecture States
  const [selectedArchLayer, setSelectedArchLayer] = useState<'client' | 'server' | 'persistence'>('client');

  // 5. CivicAlert States
  const [alertCategory, setAlertCategory] = useState('Cryo-Leakage');
  const [alertSeverity, setAlertSeverity] = useState('CRITICAL');
  const [alertLocation, setAlertLocation] = useState('Zone B - Incubator Grid');
  const [civicQueue, setCivicQueue] = useState([
    { id: 'TKT-8902', cat: 'Thermal Spike', sev: 'URGENT', loc: 'Zone C - Sequencer Hall', priority: 85, time: '10 min ago' },
    { id: 'TKT-8905', cat: 'LIMS Latency', sev: 'NORMAL', loc: 'Database Core', priority: 45, time: '1 hour ago' },
  ]);

  // RESET state on project change
  useEffect(() => {
    setNgstStep('idle');
    setNgstProgress(0);
    setNgstLogs([]);
    setSelectedGene(null);
    setGeneratedPost('');
    setPostCopied(false);
  }, [projectId]);

  // NGS Simulator Runner
  const runNgsSimulation = () => {
    setNgstStep('trimming');
    setNgstProgress(10);
    setNgstLogs(['[INFO] Parsing FASTQ sequencer outputs (reads = 45M)...', '[INFO] Scanning base-call quality distribution scores...']);
    setSelectedGene(null);

    const stages = [
      { step: 'aligning' as const, progress: 40, log: '[SUCCESS] Adapter trimming completed. Q30 > 98%. Initiating STAR splice-aware genomic alignment...' },
      { step: 'dge' as const, progress: 75, log: '[SUCCESS] Alignment complete (Rate: 92.4%). Normalizing read counts via DESeq2 Wald-test matrices...' },
      { step: 'complete' as const, progress: 100, log: '[COMPLETE] Differential Gene Expression analysis executed successfully. Volcano distribution populated.' }
    ];

    stages.forEach((s, idx) => {
      setTimeout(() => {
        setNgstStep(s.step);
        setNgstProgress(s.progress);
        setNgstLogs(prev => [...prev, s.log]);
      }, (idx + 1) * 1500);
    });
  };

  // AI LinkedIn Generator
  const generateLiPost = () => {
    setIsGeneratingLi(true);
    setGeneratedPost('');
    setPostCopied(false);

    setTimeout(() => {
      let text = '';
      if (liTone === 'Academic & Scientific') {
        text = `🔬 RESEARCH BRIEF: Deep-dive analysis of ${liTheme}.\n\n` +
               `By implementing a hybrid bio-computational pipeline, we mapped high-throughput transcriptomic dataset characteristics to find crucial correlation variables. Our results align with primary structural pathway models:\n\n` +
               `🔹 Key finding: Q30 fidelity checks confirm expression differentials of p < 0.001.\n` +
               `🔹 Implications: Accelerates drug discovery processing bottlenecks by up to 15x.\n\n` +
               `Excited to see how high-bandwidth photonics and advanced genomics continue to converge at the intersection of biotechnology. Full repository and abstracts published in my research pipeline.\n\n` +
               `#Bioinformatics #ComputationalBiology #Genomics #BiotechInnovation`;
      } else if (liTone === 'Inspiring & Tech Enthusiast') {
        text = `💡 The future of health-tech starts when light meets biology!\n\n` +
               `Imagine analyzing entire mammalian DNA strands using silicon photonic waveguide arrays instead of electrical copper transistors. We are bridging the gap between high-performance computational hardware and complex cell-culture telemetry! 🚀\n\n` +
               `Today, I am launching a preview showcase of my latest pipeline integration covering ${liTheme}.\n\n` +
               `Let's accelerate clinical outcomes, reduce carbon server footprints, and design highly scalable medicine together.\n\n` +
               `#Biotech #DeepTech #SiliconPhotonics #AIinBiomedicine #GenomicAcceleration`;
      } else {
        text = `💼 Executive Summary: Strategic optimization in biotech infrastructures.\n\n` +
               `In clinical research and high-content screening, raw assay delays cost millions in computational pipeline drag. My work on ${liTheme} addresses these inefficiencies head-on:\n\n` +
               `✅ Solution: Fine-tuned LLMs coupled with automated LIMS plate synchronization matrices.\n` +
               `✅ Outcome: Near lock-step priority queueing with verified SLA response targets under 24 hours.\n\n` +
               `Read the interactive technical timeline inside down below!\n\n` +
               `#HealthcareOperations #BiotechEngineering #LIMSAutomation #Productivity`;
      }
      setGeneratedPost(text);
      setIsGeneratingLi(false);
    }, 1200);
  };

  // Copy Post helper
  const copyPostToClipboard = () => {
    navigator.clipboard.writeText(generatedPost);
    setPostCopied(true);
    setTimeout(() => setPostCopied(false), 2000);
  };

  // Civic Incident Creator
  const addCivicTicket = (e: React.FormEvent) => {
    e.preventDefault();
    const severityFactor = alertSeverity === 'CRITICAL' ? 30 : alertSeverity === 'URGENT' ? 20 : 10;
    const priority = Math.round(severityFactor + Math.random() * 60 + 10);
    const id = `Diagnostic-TKT-${Math.floor(1000 + Math.random() * 9000)}`;
    const newTkt = {
      id,
      cat: alertCategory,
      sev: alertSeverity,
      loc: alertLocation,
      priority,
      time: 'Just now'
    };
    setCivicQueue(prev => [newTkt, ...prev]);
  };

  const resolveTicket = (id: string) => {
    setCivicQueue(prev => prev.filter(t => t.id !== id));
  };


  return (
    <div className="bg-[#0A0B1A] border-2 border-[#1A1A1A] p-6 lg:p-8 space-y-6 rounded-none relative overflow-hidden shadow-2xl">
      {/* Bio design borders */}
      <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#8B5CF6] via-[#10B981] to-[#3B82F6]" />
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-[#2A2B3D]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-none bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Cpu className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#A78BFA] font-bold block">
              PIPELINE LABORATORY SIMULATOR
            </span>
            <h4 className="text-sm font-sans font-black text-white uppercase tracking-tight">
              Active Innovation Terminal Console
            </h4>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-[#111225] border border-[#2A2B3D] px-3.5 py-1.5 font-mono text-[10px] text-zinc-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          STABILIZED VERIFICATION: {scientificMetric}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* ==================== 1. NGS / RNA-SEQ LEARNING PROJECTS ==================== */}
        {projectId === 'ngs-learning' && (
          <motion.div 
            key="ngs"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            <div className="lg:col-span-5 space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-violet-500/15 border border-violet-500/30 text-xs font-mono text-violet-300 font-bold uppercase">
                  <Binary className="w-3.5 h-3.5" /> Stage 01 Alignment
                </div>
                <h5 className="text-lg font-bold text-white leading-tight">RNA-seq Differential Expression Simulator</h5>
                <p className="text-xs text-[#A39DBE] leading-relaxed">
                  FastQC raw read processing and transcript alignment mapping pipeline. Execute the molecular benchmark to model gene expressions on human chromosome replicates.
                </p>
              </div>

              <div className="space-y-2.5">
                <button
                  onClick={runNgsSimulation}
                  disabled={ngstStep !== 'idle' && ngstStep !== 'complete'}
                  className="w-full flex items-center justify-center gap-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-mono text-xs uppercase font-extrabold py-3.5 tracking-wider cursor-pointer shadow-lg hover:shadow-indigo-500/20 disabled:opacity-40 transition-all"
                >
                  <Play className="w-4 h-4 fill-current" />
                  {ngstStep === 'idle' ? 'LAUNCH RNA-SEQ PIPELINE' : ngstStep === 'complete' ? 'RUN PIPELINE AGAIN' : 'PROFILING SEQUENCE...'}
                </button>
                
                {ngstStep !== 'idle' && (
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-mono text-[#D946EF]">
                      <span>SEQUENCER PROCESS SYNC</span>
                      <span>{ngstProgress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#17182C] overflow-hidden border border-[#23243F]">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-violet-500 to-pink-500"
                        animate={{ width: `${ngstProgress}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Logs terminal */}
              {ngstLogs.length > 0 && (
                <div className="bg-[#050612] border border-[#1A1B30] p-3.5 font-mono text-[10px] leading-relaxed text-emerald-400 space-y-1.5 max-h-[170px] overflow-y-auto">
                  <div className="text-zinc-500 border-b border-[#1A1B30] pb-1 block uppercase">System Live Feed Logs:</div>
                  {ngstLogs.map((log, id) => (
                    <div key={id} className="flex gap-1.5 items-start">
                      <span className="text-zinc-600">&rarr;</span>
                      <span>{log}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="lg:col-span-7 bg-[#070817] border border-[#23243F] p-5 flex flex-col justify-between space-y-4">
              <div className="flex justify-between items-center pb-2.5 border-b border-[#1A1B30]">
                <span className="font-mono text-xs text-zinc-400">VOLCANO PLOT EXPRESSION VALUES (DESEQ2)</span>
                <span className="font-mono text-[9px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 border border-emerald-500/20 uppercase font-black">GRCh38 Align</span>
              </div>

              {ngstStep !== 'complete' ? (
                <div className="flex-1 flex flex-col items-center justify-center py-16 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full border-2 border-dashed border-violet-500/20 flex items-center justify-center text-zinc-500 animate-spin">
                    <RefreshCw className="w-5 h-5 text-indigo-400" />
                  </div>
                  <p className="font-mono text-2xs text-[#A39DBE] uppercase tracking-wider">
                    {ngstStep === 'idle' ? 'Awaiting Pipeline Execution Output' : 'Translating Splice Junctions...'}
                  </p>
                </div>
              ) : (
                <div className="flex-1 space-y-4">
                  {/* Fake Volcano Plot visual via Grid */}
                  <div className="h-44 border-l border-b border-[#23243F] relative flex items-end justify-between p-2">
                    <div className="absolute top-2 left-2 text-[8px] font-mono text-zinc-600 uppercase">log10 (p-value)</div>
                    <div className="absolute bottom-2 right-2 text-[8px] font-mono text-zinc-600 uppercase">log2 Fold Change</div>
                    
                    {/* Fold Change Zero Centerguideline */}
                    <div className="absolute bottom-0 left-[50%] top-0 w-px border-l border-dashed border-[#23243F]" />
                    
                    {/* Gene dots on scatter plot */}
                    <motion.button initial={{ scale: 0 }} animate={{ scale: 1 }} onClick={() => setSelectedGene('BRCA1')} className="absolute bottom-[80%] left-[20%] w-3 h-3 rounded-full bg-red-500/80 cursor-pointer hover:ring-2 hover:ring-white border border-white/20 shadow-lg shadow-red-500/50" />
                    <motion.button initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1 }} onClick={() => setSelectedGene('TP53')} className="absolute bottom-[65%] left-[30%] w-3 h-3 rounded-full bg-red-400/80 cursor-pointer hover:ring-2 hover:ring-white border border-white/20" />
                    <motion.button initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }} onClick={() => setSelectedGene('TNF')}  className="absolute bottom-[50%] left-[25%] w-2.5 h-2.5 rounded-full bg-orange-400/70 cursor-pointer hover:ring-2 hover:ring-white" />
                    <motion.button initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 }} onClick={() => setSelectedGene('MYC')}  className="absolute bottom-[85%] right-[20%] w-3.5 h-3.5 rounded-full bg-emerald-500/80 cursor-pointer hover:ring-2 hover:ring-white shadow-lg shadow-emerald-500/50" />
                    <motion.button initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4 }} onClick={() => setSelectedGene('EGFR')} className="absolute bottom-[72%] right-[28%] w-3 h-3 rounded-full bg-emerald-400/80 cursor-pointer hover:ring-2 hover:ring-white" />
                    
                    {/* Insignificant grey dots */}
                    <div className="absolute bottom-[15%] left-[45%] w-2 h-2 rounded-full bg-zinc-700/60" />
                    <div className="absolute bottom-[28%] left-[48%] w-1.5 h-1.5 rounded-full bg-zinc-700/60" />
                    <div className="absolute bottom-[22%] left-[55%] w-2 h-2 rounded-full bg-zinc-700/60" />
                    <div className="absolute bottom-[35%] left-[52%] w-1.5 h-1.5 rounded-full bg-zinc-700/60" />
                    <div className="absolute bottom-[08%] left-[40%] w-2 h-2 rounded-full bg-zinc-700/60" />
                  </div>
                  
                  {/* Details box */}
                  <div className="p-3 bg-[#111225] border border-[#23243F] text-xs space-y-1.5">
                    {!selectedGene ? (
                      <span className="text-zinc-500 font-mono text-2xs block uppercase text-center py-2">
                        &lsaquo; Click any colored gene node in Volcano Plot to inspect profile metrics &rsaquo;
                      </span>
                    ) : (
                      <>
                        <div className="flex justify-between items-center text-xs font-bold text-white">
                          <span className="font-mono text-indigo-300">Gene Target: {selectedGene}</span>
                          <span className={`${selectedGene === 'BRCA1' || selectedGene === 'TP53' || selectedGene === 'TNF' ? 'text-rose-400' : 'text-emerald-400'} uppercase text-[9px] font-mono`}>
                            {selectedGene === 'BRCA1' || selectedGene === 'TP53' || selectedGene === 'TNF' ? 'Down-Regulated (p < 0.0001)' : 'Up-Regulated (p < 0.00003)'}
                          </span>
                        </div>
                        <p className="text-[#A39DBE] text-[11px] leading-normal pt-1 border-t border-[#23243F]">
                          {selectedGene === 'BRCA1' && 'Breast Cancer gene 1 expression highly restricted. Linked to failure in clinical DNA homologous recombination repair mechanisms.'}
                          {selectedGene === 'TP53' && 'Tumor suppressor p53 depleted. Essential target checked in genomic drug-resistance screens.'}
                          {selectedGene === 'TNF' && 'Tumor necrosis cytokine gene expression inhibited, restricting inflammatory bioreactor proliferation.'}
                          {selectedGene === 'MYC' && 'Proto-oncogene transcription factor heavily elevated, demonstrating metabolic amplification in bio-samples.'}
                          {selectedGene === 'EGFR' && 'Epidermal growth factor receptor over-expressed, driving rapid cell expansion curves under analysis.'}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* ==================== 2. AI LINKEDIN POST CREATOR ==================== */}
        {projectId === 'linkedin-creator' && (
          <motion.div 
            key="linkedin"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            <div className="lg:col-span-5 space-y-4">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 text-xs font-mono text-[#C084FC] font-bold uppercase">
                  <Cpu className="w-3.5 h-3.5" /> Stage 03 Fine-Tuning
                </div>
                <h5 className="text-lg font-bold text-white leading-tight">Biotech-Tuned LLM Publisher</h5>
                <p className="text-xs text-[#A39DBE] leading-relaxed">
                  Synthesize highly technical, professional scientific summaries tuned for professional networking platforms. Adjust the focus parameters and tone profiles.
                </p>
              </div>

              {/* Selector Fields */}
              <div className="space-y-3.5 pt-1.5">
                <div className="space-y-1.5">
                  <label className="text-2xs font-mono text-zinc-500 uppercase tracking-widest block">GENOMICS FOCUS TOPIC</label>
                  <select 
                    value={liTheme}
                    onChange={(e) => setLiTheme(e.target.value)}
                    className="w-full bg-[#111225] border border-[#23243F] text-xs text-white p-2.5 font-mono focus:border-[#8B5CF6] focus:outline-none focus:ring-0 rounded-none cursor-pointer"
                  >
                    <option value="CRISPR-Cas9 Gene Editing Systems">CRISPR-Cas9 Gene Editing</option>
                    <option value="High-Throughput RNA-seq Sequencing">High-Throughput RNA-Seq</option>
                    <option value="Silicon Photonic Integrated Waveguides">Silicon Photonic DNA Accelerators</option>
                    <option value="IoT Bioreactor Vessel Telemetry">IoT Culture Vessel Controlling</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-2xs font-mono text-zinc-500 uppercase tracking-widest block">TONE DISPATCH SETTINGS</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Academic & Scientific', 'Inspiring & Tech Enthusiast', 'Executive Highlights'].map(tone => (
                      <button
                        key={tone}
                        onClick={() => setLiTone(tone)}
                        className={`p-2 border font-mono text-[9px] uppercase tracking-tight transition-all cursor-pointer text-center ${
                          liTone === tone 
                            ? 'bg-[#8B5CF6]/20 text-white border-[#8B5CF6]' 
                            : 'bg-[#111225] text-zinc-400 border-[#23243F] hover:bg-[#151733]'
                        }`}
                      >
                        {tone.split(' ')[0]}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={generateLiPost}
                  disabled={isGeneratingLi}
                  className="w-full flex items-center justify-center gap-2 bg-[#8B5CF6] hover:bg-[#7c4fe3] text-white font-mono text-xs uppercase font-extrabold py-3.5 tracking-wider cursor-pointer shadow-lg hover:shadow-purple-500/20 disabled:opacity-40 transition-all pt-3.5"
                >
                  {isGeneratingLi ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-current" />}
                  {isGeneratingLi ? 'TUNING POST VECTORS...' : 'SYNTHESIZE CONTENT UPDATE'}
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 bg-[#070817] border border-[#23243F] p-5 flex flex-col justify-between space-y-4">
              <div className="flex justify-between items-center pb-2.5 border-b border-[#1A1B30]">
                <span className="font-mono text-xs text-zinc-400">LLM REFINED POST PREVIEW (LINKEDIN BLUEPRINT)</span>
                <span className="font-mono text-[9px] bg-purple-500/10 text-purple-400 px-2 py-0.5 border border-purple-500/20 uppercase font-black">AI MODEL v0.96</span>
              </div>

              <div className="flex-1 bg-[#111225] border border-[#23243F] p-4 font-sans text-xs leading-relaxed text-zinc-300 min-h-[220px] relative">
                {isGeneratingLi ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#111225]/90 space-y-2">
                    <RefreshCw className="w-6 h-6 text-[#8B5CF6] animate-spin" />
                    <span className="font-mono text-2xs text-[#8B5CF6] uppercase tracking-widest">Fine-Tuning parameters vectors...</span>
                  </div>
                ) : null}

                {!generatedPost && !isGeneratingLi ? (
                  <div className="h-full flex flex-col items-center justify-center text-center text-zinc-500 py-12">
                    <Cpu className="w-8 h-8 text-zinc-700 mb-2 animate-bounce" />
                    <p className="font-mono text-2xs uppercase tracking-wider">Awaiting Vector Synthesis Dispatch</p>
                    <p className="text-[10px] text-zinc-600 mt-1">Select topic & tone parameters to create a professional LinkedIn post.</p>
                  </div>
                ) : (
                  <div className="whitespace-pre-line text-[11px] leading-relaxed max-h-[250px] overflow-y-auto pr-1">
                    {generatedPost}
                  </div>
                )}
              </div>

              {generatedPost && (
                <div className="flex justify-end pt-2">
                  <button
                    onClick={copyPostToClipboard}
                    className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-mono text-xs uppercase font-extrabold border border-zinc-700 tracking-wider transition-all cursor-pointer"
                  >
                    {postCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {postCopied ? 'COPIED TO CLIPBOARD!' : 'COPY DISPATCH BLUEPRINT'}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* ==================== 3. SILICON PHOTONIC GENOMIC ACCELERATOR ==================== */}
        {projectId === 'silicon-processors' && (
          <motion.div 
            key="silicon"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            <div className="lg:col-span-5 space-y-4">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-amber-500/15 border border-amber-500/30 text-xs font-mono text-[#FBBF24] font-bold uppercase">
                  <Microscope className="w-3.5 h-3.5" /> Stage 04 Refract Index
                </div>
                <h5 className="text-lg font-bold text-white leading-tight">Genomic Photonic Workload Optimizer</h5>
                <p className="text-xs text-[#A39DBE] leading-relaxed">
                  Compare theoretical alignments computed via standard copper electrical pipelines vs refractive lightwave arrays on silicon photonic chips. Adjust sequence dataset scale indices.
                </p>
              </div>

              {/* Slider Input */}
              <div className="space-y-3.5 pt-2">
                <div className="bg-[#111225] border border-[#23243F] p-4 space-y-2">
                  <div className="flex justify-between font-mono text-2xs uppercase tracking-wider text-zinc-400">
                    <span>Genomic Dataset File Size</span>
                    <span className="text-amber-400 font-bold">{gbSize} Gigabytes (GB)</span>
                  </div>
                  <input 
                    type="range"
                    min="5"
                    max="250"
                    value={gbSize}
                    onChange={(e) => setGbSize(Number(e.target.value))}
                    className="w-full text-amber-500 h-1.5 bg-[#050612] accent-amber-500 cursor-ew-resize border border-[#23243F]"
                  />
                  <span className="text-[10px] text-zinc-500 font-mono block">Simulates Smith-Waterman matrix calculation weights recursively.</span>
                </div>
              </div>

              {/* Stat block */}
              <div className="p-4 bg-[#111225] border border-[#23243F] grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[9px] font-mono text-zinc-500 block uppercase">Photon Bandwidth</span>
                  <p className="text-lg font-black font-mono text-amber-400">120 Tbps</p>
                </div>
                <div>
                  <span className="text-[9px] font-mono text-zinc-500 block uppercase">Theoretical Speedup</span>
                  <p className="text-lg font-black font-mono text-[#10B981]">15x Faster</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 bg-[#070817] border border-[#23243F] p-5 flex flex-col justify-between space-y-4">
              <div className="flex justify-between items-center pb-2.5 border-b border-[#1A1B30]">
                <span className="font-mono text-xs text-zinc-400">CHIP MICRO-LATENCY COMPILATION MODEL</span>
                <span className="font-mono text-[9px] bg-amber-500/10 text-amber-400 px-2 py-0.5 border border-amber-500/20 uppercase font-black">Waveguide Core</span>
              </div>

              {/* Comparison chart */}
              <div className="flex-1 space-y-5">
                <div className="space-y-2">
                  <div className="flex justify-between text-2xs font-mono text-zinc-400 uppercase">
                    <span>STANDARD COPPER PROCESSOR LATENCY</span>
                    <span className="text-red-400 font-bold font-mono">{(gbSize * 2.4).toFixed(1)} mins</span>
                  </div>
                  <div className="w-full h-4 bg-zinc-800 border border-zinc-700 relative">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-red-600 to-red-400"
                      animate={{ width: `${Math.min(100, (gbSize / 250) * 100)}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-2xs font-mono text-zinc-400 uppercase">
                    <span>SILICON PHONOTIC CO-PROCESSOR (PROPOSED)</span>
                    <span className="text-emerald-400 font-bold font-mono">{(gbSize * 0.16).toFixed(1)} mins</span>
                  </div>
                  <div className="w-full h-4 bg-zinc-800 border border-zinc-700 relative">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.3)]"
                      animate={{ width: `${Math.max(2, (gbSize / 250) * 100 * 0.08)}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                <div className="bg-[#111225] border border-[#23243F] p-3 text-xs flex items-start gap-3">
                  <div className="w-7 h-7 rounded-none bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0 mt-0.5">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-white block">Accredited Power Efficiency Delta</span>
                    <span className="text-[11px] text-zinc-400">
                      Processing dataset would save <strong className="text-emerald-400">{(gbSize * 1.8).toFixed(1)} kWh</strong> of carbon cloud energy. Thermal cooling overhead restricted by <strong className="text-emerald-400">92%</strong>.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ==================== 4. PORTFOLIO ARCHITECTURE LAYER ==================== */}
        {projectId === 'portfolio-web' && (
          <motion.div 
            key="portfolio-web"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            <div className="lg:col-span-5 space-y-4">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#10B981]/15 border border-[#10B981]/30 text-xs font-mono text-[#4ade80] font-bold uppercase">
                  <Layers className="w-3.5 h-3.5" /> Stage 05 Deployment
                </div>
                <h5 className="text-lg font-bold text-white leading-tight">Double-Helix Full Stack Blueprint</h5>
                <p className="text-xs text-[#A39DBE] leading-relaxed">
                  Interactive blueprint detailing structural routing, container deployments, local databases caching, and live API controllers.
                </p>
              </div>

              {/* Selector Buttons */}
              <div className="space-y-2 pt-1.5">
                <label className="text-2xs font-mono text-zinc-500 uppercase tracking-widest block">CHOOSE LAYER STACK</label>
                <div className="grid grid-cols-1 gap-2.5">
                  {[
                    { id: 'client', name: 'UI & Molecular Aesthetics', desc: 'Vite SPA structure, DNA shaders, physics frameworks' },
                    { id: 'server', name: 'Express API Pipelines (server.ts)', desc: 'Admin secret auth tokens, GitHub oauth exchanges' },
                    { id: 'persistence', name: 'LIMS & Cache Databases', desc: 'Complaint priorities queues, rate limiting systems' }
                  ].map(layer => (
                    <button
                      key={layer.id}
                      onClick={() => setSelectedArchLayer(layer.id as any)}
                      className={`p-3.5 border text-left transition-all cursor-pointer flex flex-col gap-1 rounded-none outline-none ${
                        selectedArchLayer === layer.id 
                          ? 'bg-[#10B981]/10 text-white border-[#10B981]/40' 
                          : 'bg-[#111225] text-zinc-400 border-[#23243F] hover:bg-[#151733]'
                      }`}
                    >
                      <span className="font-mono text-xs font-bold uppercase tracking-wide flex items-center gap-2">
                        {selectedArchLayer === layer.id && <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full animate-ping" />}
                        {layer.name}
                      </span>
                      <span className="text-[10px] text-zinc-500 font-sans leading-normal">{layer.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 bg-[#070817] border border-[#23243F] p-5 flex flex-col justify-between space-y-4">
              <div className="flex justify-between items-center pb-2.5 border-b border-[#1A1B30]">
                <span className="font-mono text-xs text-zinc-400">ACTIVE COMPILATION DIRECTORIES STRUCTURE</span>
                <span className="font-mono text-[9px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 border border-emerald-500/20 uppercase font-black">Architecture map</span>
              </div>

              {/* File details map */}
              <div className="flex-1 bg-[#111225] border border-[#23243F] p-4 font-mono text-[11px] leading-relaxed text-zinc-300 relative space-y-4">
                {selectedArchLayer === 'client' && (
                  <div className="space-y-3.5">
                    <div className="text-[#10B981] font-bold">CLIENT DIRECTORY INDEX: /src/components/</div>
                    <div className="space-y-2 border-l border-zinc-700/50 pl-3">
                      <div>
                        <strong className="text-white">&rarr; App.tsx:</strong>
                        <span className="text-zinc-400 block text-[10px] pl-4">State management hub, scroll-spies hooks, and popup managers.</span>
                      </div>
                      <div>
                        <strong className="text-white">&rarr; DNASequencer.tsx:</strong>
                        <span className="text-zinc-400 block text-[10px] pl-4">Interactive base-matching playground, reads codons translations.</span>
                      </div>
                      <div>
                        <strong className="text-white">&rarr; MicroscopeCellsBackground.tsx:</strong>
                        <span className="text-zinc-400 block text-[10px] pl-4">Real-time biological canvas drawing cancer cell line spikes.</span>
                      </div>
                    </div>
                  </div>
                )}

                {selectedArchLayer === 'server' && (
                  <div className="space-y-3.5">
                    <div className="text-[#10B981] font-bold font-mono">EXPRESS SECURED CONTROLLERS API: /server.ts</div>
                    <div className="space-y-2 border-l border-zinc-700/50 pl-3">
                      <div>
                        <strong className="text-white">&rarr; app.post("/api/admin/login"):</strong>
                        <span className="text-zinc-400 block text-[10px] pl-4">Validates ADMIN_SECRET tokens against local environment records safely.</span>
                      </div>
                      <div>
                        <strong className="text-white">&rarr; app.get("/api/github/sync"):</strong>
                        <span className="text-zinc-400 block text-[10px] pl-4">Syncs repository metrics. Exceeded limits 403 cache fallback logs.</span>
                      </div>
                      <div>
                        <strong className="text-white">&rarr; app.get("/api/admin/maintenance"):</strong>
                        <span className="text-zinc-400 block text-[10px] pl-4">Gives admin full app overrides, puts normal users on fallback screens.</span>
                      </div>
                    </div>
                  </div>
                )}

                {selectedArchLayer === 'persistence' && (
                  <div className="space-y-3.5">
                    <div className="text-[#10B981] font-bold">DATA SECTOR MANAGEMENT SCHEMAS: /server/adminDb.ts</div>
                    <div className="space-y-2 border-l border-zinc-700/50 pl-3">
                      <div>
                        <strong className="text-white">&rarr; data/tabs_control.json:</strong>
                        <span className="text-zinc-400 block text-[10px] pl-4">Active operational records for closed or re-opened tab gateways.</span>
                      </div>
                      <div>
                        <strong className="text-white">&rarr; localhost:3000 API Caching:</strong>
                        <span className="text-zinc-400 block text-[10px] pl-4">Secures contact submissions in high-contrast LocalStorage fail-safes.</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* ==================== 5. CIVICALERT PUBLIC COMPLAINT APP ==================== */}
        {projectId === 'civicalert-app' && (
          <motion.div 
            key="civicalert"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            <div className="lg:col-span-5 space-y-4">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-sky-500/15 border border-sky-500/30 text-xs font-mono text-sky-300 font-bold uppercase">
                  <AlertTriangle className="w-3.5 h-3.5" /> Stage 05 Civic Eng.
                </div>
                <h5 className="text-lg font-bold text-white leading-tight">High-Integrity Telemetry Logger</h5>
                <p className="text-xs text-[#A39DBE] leading-relaxed">
                  Citizens priority-score calculation queue. Input diagnostic laboratory alerts and watch the routing index score recalculate automatically.
                </p>
              </div>

              {/* Form Input Ticket */}
              <form onSubmit={addCivicTicket} className="space-y-3 pt-1 border-t border-[#2A2B3D]">
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block">Anomaly Category</label>
                    <select 
                      value={alertCategory} 
                      onChange={(e) => setAlertCategory(e.target.value)}
                      className="w-full bg-[#111225] border border-[#23243F] text-xs text-white p-2 font-mono"
                    >
                      <option value="Cryo-Leakage">Cryo-Leakage</option>
                      <option value="Biomass Spill">Biomass Spill</option>
                      <option value="Sequencer Sync Lag">Sync Lag</option>
                      <option value="Water Leak">Utility Damage</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block">Alert Level</label>
                    <select 
                      value={alertSeverity} 
                      onChange={(e) => setAlertSeverity(e.target.value)}
                      className="w-full bg-[#111225] border border-[#23243F] text-xs text-white p-2 font-mono"
                    >
                      <option value="CRITICAL">CRITICAL</option>
                      <option value="URGENT">URGENT</option>
                      <option value="NORMAL">NORMAL</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block">Incident Location Coordinates</label>
                  <input 
                    type="text" 
                    value={alertLocation} 
                    onChange={(e) => setAlertLocation(e.target.value)} 
                    className="w-full bg-[#111225] border border-[#23243F] text-xs text-white p-2.5 font-mono focus:border-sky-500 focus:outline-none"
                    placeholder="Enter coordinates..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-sky-600 hover:bg-sky-500 text-white font-mono text-xs uppercase font-extrabold py-3.5 tracking-wider cursor-pointer shadow-lg hover:shadow-sky-500/20 transition-all pt-3.5"
                >
                  DISPATCH INCIDENT REPORT
                </button>
              </form>
            </div>

            <div className="lg:col-span-7 bg-[#070817] border border-[#23243F] p-5 flex flex-col justify-between space-y-4">
              <div className="flex justify-between items-center pb-2.5 border-b border-[#1A1B30]">
                <span className="font-mono text-xs text-zinc-400">STATE DISPATCH EMERGENCY QUEUE TELEMETRY</span>
                <span className="font-mono text-[9px] bg-sky-500/10 text-sky-400 px-2 py-0.5 border border-sky-500/20 uppercase font-black">Live priority scan</span>
              </div>

              {/* Telemetry Queue list */}
              <div className="flex-1 space-y-2.5 max-h-[290px] overflow-y-auto pr-1">
                {civicQueue.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-zinc-600 font-mono text-2xs">
                    <ShieldCheck className="w-8 h-8 text-emerald-500 mb-1 animate-bounce" />
                    <span>ALL REGISTERED ALERTS STABILIZED</span>
                  </div>
                ) : (
                  civicQueue.map(tkt => (
                    <motion.div 
                      key={tkt.id} 
                      layout
                      initial={{ opacity: 0, x: -10 }} 
                      animate={{ opacity: 1, x: 0 }}
                      className="border border-[#23243F] bg-[#111225] p-3 flex justify-between items-center gap-4 hover:border-sky-500/50 transition-colors"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-xs font-bold text-white">{tkt.id}</span>
                          <span className={`text-[8px] font-mono px-1.5 py-0.5 uppercase ${
                            tkt.sev === 'CRITICAL' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : tkt.sev === 'URGENT' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-slate-500/10 text-slate-300'
                          }`}>
                            {tkt.sev}
                          </span>
                        </div>
                        <div className="text-[10px] text-zinc-400 font-mono">
                          {tkt.cat} &rarr; <span className="text-zinc-500">{tkt.loc}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <span className="text-[8px] font-mono text-zinc-500 block uppercase">Calc Priority</span>
                          <span className="text-xs font-bold font-mono text-sky-400">{tkt.priority} Index</span>
                        </div>
                        <button
                          onClick={() => resolveTicket(tkt.id)}
                          className="px-2.5 py-1.5 border border-emerald-500/30 hover:bg-emerald-500/20 text-emerald-400 font-mono text-[9px] uppercase tracking-wider transition-colors cursor-pointer"
                        >
                          Resolve
                        </button>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
