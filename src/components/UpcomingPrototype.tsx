import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cpu, 
  Terminal, 
  Sliders, 
  Zap, 
  Settings, 
  Grid, 
  Database,
  Check, 
  Eye, 
  Lock,
  RefreshCw,
  Bell,
  LineChart,
  Layers,
  FileJson
} from 'lucide-react';

interface UpcomingPrototypeProps {
  projectId: string;
  scientificMetric: string;
}

// ----------------- HIGH END TECH BACKGROUND GRAPHICS -----------------
function DraftBlueprintBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 700);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 500);

    const handleResize = () => {
      if (canvas && canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = canvas.parentElement.clientHeight;
      }
    };
    window.addEventListener('resize', handleResize);

    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Blueprint micro grids
      ctx.strokeStyle = 'rgba(57, 10, 185, 0.006)'; // ultra subtle violet blueprint tint
      ctx.lineWidth = 0.5;
      const step = 20;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. Concentric radar/spectrogram scopes in the bottom right corner
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.012)';
      ctx.lineWidth = 0.75;
      const centerX = width - 100;
      const centerY = height - 100;

      ctx.beginPath();
      ctx.arc(centerX, centerY, 60, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(centerX, centerY, 120, 0, Math.PI * 2);
      ctx.stroke();

      // Rotating radar line sweep
      angle += 0.005;
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.022)';
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(centerX + Math.cos(angle) * 140, centerY + Math.sin(angle) * 140);
      ctx.stroke();

      // Plot technical indicators
      ctx.fillStyle = 'rgba(59, 130, 246, 0.025)';
      ctx.font = '8px var(--font-mono, monospace)';
      ctx.fillText(`SWEEP_RADIAL_DEG: ${(angle * (180 / Math.PI) % 360).toFixed(1)}°`, centerX - 120, centerY + 135);
      ctx.fillText('DESIGN_SPEC: LEVEL_A_STABLE', 15, height - 15);

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
    />
  );
}

export default function UpcomingPrototype({ projectId, scientificMetric }: UpcomingPrototypeProps) {
  // Interactive Simulation states
  const [simulationActive, setSimulationActive] = useState(false);
  const [logMessages, setLogMessages] = useState<string[]>([]);
  const [simulationParameter, setSimulationParameter] = useState(20);
  const [registeredEmail, setRegisteredEmail] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [showNotificationCheck, setShowNotificationCheck] = useState(false);
  
  // Active layout view tab inside the preview block
  const [schemaTab, setSchemaTab] = useState<'schematics' | 'code' | 'specs'>('schematics');

  // Load parameter calibration and registered status on mount/change
  useEffect(() => {
    if (projectId === 'proj-sequencer') {
      setSimulationParameter(20);
    } else if (projectId === 'proj-bioreactor') {
      setSimulationParameter(250);
    } else {
      setSimulationParameter(8);
    }
    setSimulationActive(false);
    setLogMessages([]);

    const saved = localStorage.getItem(`upcoming_register_${projectId}`);
    if (saved) {
      setIsRegistered(true);
      setRegisteredEmail(saved);
    } else {
      setIsRegistered(false);
      setRegisteredEmail('');
    }
  }, [projectId]);

  // Handle register submission
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!registeredEmail || !registeredEmail.includes('@')) return;
    
    localStorage.setItem(`upcoming_register_${projectId}`, registeredEmail);
    setIsRegistered(true);
    setShowNotificationCheck(true);
    
    // Simulate log
    addLog(`[SYSTEM] Client access token generated for ${registeredEmail}`);
    addLog(`[REGISTRY] Registered successfully. Phase notification trigger set.`);
    
    setTimeout(() => {
      setShowNotificationCheck(false);
    }, 4000);
  };

  // Helper to add log messages
  const addLog = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogMessages(prev => [`[${timestamp}] ${msg}`, ...prev.slice(0, 5)]);
  };

  // Simulation run loop
  useEffect(() => {
    let interval: any;
    if (simulationActive) {
      if (projectId === 'proj-sequencer') {
        addLog(`[INIT] Booting ribosomal translation encoder streams...`);
      } else if (projectId === 'proj-bioreactor') {
        addLog(`[INIT] Starting IoT Serial MODBUS telemetry loop...`);
      } else {
        addLog(`[INIT] Initializing 96-Well SBS-Standard plate matrix parser...`);
      }
      
      interval = setInterval(() => {
        if (projectId === 'proj-sequencer') {
          const matchedGenomes = Math.floor(Math.random() * 12) + 8540;
          const gcPercentage = (52.4 + (Math.random() - 0.5) * 1.5).toFixed(2);
          const codonFreq = (0.23 + (Math.random() - 0.5) * 0.04).toFixed(3);
          const frames = ["+1", "+2", "+3", "-1", "-2", "-3"];
          const selectedFrame = frames[Math.floor(Math.random() * frames.length)];
          addLog(`[CODON] Frame: ${selectedFrame} | GC Skew: ${gcPercentage}% | Translated: ${matchedGenomes} bp | Frequency: ${codonFreq}`);
        } else if (projectId === 'proj-bioreactor') {
          const actualRPM = simulationParameter + Math.round((Math.random() - 0.5) * 6);
          const currentTemp = (37.0 + (Math.random() - 0.5) * 0.4).toFixed(2);
          const currentPH = (7.2 + (Math.random() - 0.5) * 0.05).toFixed(3);
          const do2 = (40.0 + (Math.random() - 0.5) * 3).toFixed(1);
          
          addLog(`[TELEMETRY] RPM: ${actualRPM} | Temp: ${currentTemp}°C | pH: ${currentPH} | dO₂: ${do2}%`);
        } else {
          const filledWells = Math.floor(Math.random() * 24) + 60;
          const integrityScore = (99.2 + Math.random() * 0.7).toFixed(2);
          const barcode = `BA-WELL-D${Math.floor(Math.random()*1000) + 9000}`;
          
          addLog(`[MATRIX] Read ${filledWells}/96 wells. Validation barcode: ${barcode} | Integrity: ${integrityScore}%`);
        }
      }, 1500);
    } else {
      setLogMessages([]);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [simulationActive, simulationParameter, projectId]);

  const toggleSimulation = () => {
    const nextState = !simulationActive;
    setSimulationActive(nextState);
    if (!nextState) {
      addLog(`[HALT] Live telemetry simulation suspended.`);
    }
  };

  // Generate mock JSON code preview based on state
  const getCodeSnippet = () => {
    if (projectId === 'proj-sequencer') {
      return `{
  "sequenceId": "NC_000001.11",
  "pipelineStage": "S1_UPCOMING",
  "nucleotideSource": "RibosomalTranslationRef",
  "parameters": {
    "targetLength": "6.4k_bp",
    "translationRateBps": ${simulationParameter},
    "codonOptimization": "StandardHumanExpress"
  },
  "flags": {
    "frameshiftFilter": true,
    "gcSkewCheck": "Active"
  }
}`;
    } else if (projectId === 'proj-bioreactor') {
      return `{
  "vesselId": "OMNIVESSEL-09B",
  "pipelineStage": "S2_UPCOMING",
  "hardwareModel": "BioReact-IoT-Board-v3.0",
  "sensors": {
    "phProbe": { "type": "OpticalGlass", "address": "0x4B", "calibration": 7.02 },
    "tempThermistor": { "type": "PT100", "baud": 9600 },
    "dissolvedOxygen": { "type": "Polarographic", "current": "41.4%" }
  },
  "actuators": {
    "acidPump": { "flowRateMl": "0.15/sec", "active": false },
    "agitationMotor": { "targetRPM": ${simulationParameter}, "load": "Optimal" }
  }
}`;
    } else {
      return `{
  "plateModel": "SBS-96-HighDensity-Assay",
  "pipelineStage": "S3_UPCOMING",
  "barcodeIndex": "MANIFEST_96W_2026",
  "matrix": {
    "columns": 12,
    "rows": 8,
    "type": "PCR_DILUTION_SERIES"
  },
  "automatedMetadata": {
    "barcodeVerify": true,
    "dilutionFactor": "1:${simulationParameter}x",
    "exportFormat": "StandardCSV"
  }
}`;
    }
  };

  return (
    <div className="bg-[#1A1A1A] text-white rounded-none border-2 border-[#1A1A1A] overflow-hidden shadow-2xl relative">
      <DraftBlueprintBackground />
      <div className="relative z-10 w-full h-full text-white">
        
        {/* HEADER BAR STATUS */}
      <div className="bg-[#1A1A1A] border-b border-white/10 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 bg-brand-accent rounded-full animate-pulse"></div>
          <div>
            <span className="font-mono text-[10px] text-white/40 block uppercase tracking-widest font-bold">UPCOMING PIPELINE WORK</span>
            <h4 className="font-serif italic text-lg font-black text-white uppercase tracking-tight">
              {projectId === 'proj-sequencer' && 'Prototype 01: NucleoWave Sequence Map'}
              {projectId === 'proj-bioreactor' && 'Prototype 02: OmniVessel IoT Telemetry'}
              {projectId === 'proj-lims' && 'Prototype 03: LIMS Plate Mapper 96'}
            </h4>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-brand-accent/20 text-brand-accent border border-brand-accent/35 px-2.5 py-1 text-[9px] font-mono tracking-widest font-bold uppercase">
            {projectId === 'proj-sequencer' && 'Phase: S1 (Genomic Splicing)'}
            {projectId === 'proj-bioreactor' && 'Phase: S2 (Atelier Control)'}
            {projectId === 'proj-lims' && 'Phase: S3 (Library Mapping)'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        
        {/* LEFT COLUMN: INTERACTIVE PIPELINE PREVIEW & MOCK SIMULATOR */}
        <div className="lg:col-span-8 p-6 lg:p-8 space-y-6 border-r border-white/10 bg-white/[0.02]">
          
          {/* Tabs for viewer */}
          <div className="flex border-b border-white/10">
            <button
              onClick={() => setSchemaTab('schematics')}
              className={`pb-3 px-4 text-xs font-mono tracking-widest uppercase transition-all relative cursor-pointer ${
                schemaTab === 'schematics' ? 'text-brand-accent font-bold' : 'text-white/50 hover:text-white'
              }`}
            >
              System Schematic
              {schemaTab === 'schematics' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-accent"></span>
              )}
            </button>
            <button
              onClick={() => setSchemaTab('code')}
              className={`pb-3 px-4 text-xs font-mono tracking-widest uppercase transition-all relative cursor-pointer ${
                schemaTab === 'code' ? 'text-brand-accent font-bold' : 'text-white/50 hover:text-white'
              }`}
            >
              Registry Schema
              {schemaTab === 'code' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-accent"></span>
              )}
            </button>
            <button
              onClick={() => setSchemaTab('specs')}
              className={`pb-3 px-4 text-xs font-mono tracking-widest uppercase transition-all relative cursor-pointer ${
                schemaTab === 'specs' ? 'text-brand-accent font-bold' : 'text-white/50 hover:text-white'
              }`}
            >
              Planned Specs
              {schemaTab === 'specs' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-accent"></span>
              )}
            </button>
          </div>

          {/* TAB CONTENTS */}
          <div className="min-h-[280px]">
            {schemaTab === 'schematics' && (
              <div className="space-y-4">
                <p className="text-xs text-white/75 leading-relaxed font-sans max-w-2xl">
                  {projectId === 'proj-sequencer' && 'Modeling raw genetic sequences as dynamic secondary structural folds. The upcoming sequence mapper module provides a highly graphic visualization of real-time codonic ribosomal splicing.'}
                  {projectId === 'proj-bioreactor' && 'Visualizing the scheduled micro-controller IO pins and real-time serial stream pathways. Launch the simulated sensor signal thread using the control parameters below.'}
                  {projectId === 'proj-lims' && 'A structural visualization of the upcoming SBS-standard 96-well grid. This block maps coordinate serializers used during automation batch allocations.'}
                </p>

                {/* SVG Visual Schema rendering */}
                <div className="bg-[#121212] border border-white/5 p-6 relative flex flex-col items-center justify-center overflow-hidden min-h-[180px]">
                  
                  {projectId === 'proj-sequencer' && (
                    /* DNA Helix Blueprint Sketch */
                    <div className="w-full max-w-lg flex flex-col items-center justify-center space-y-4 py-2">
                      <div className="relative w-48 h-32 border-2 border-dashed border-white/20 flex flex-col items-center justify-center">
                        <div className="absolute top-2 left-2 text-[8px] font-mono text-white/30">NUCLEOBASES: A, T, C, G</div>
                        
                        {/* Simple helix representation */}
                        <div className="flex items-center gap-2">
                          <span className="w-8 h-[2px] bg-brand-accent/50 block animate-pulse"></span>
                          <span className="text-xs font-mono font-bold text-white/60">A ==== T</span>
                          <span className="w-8 h-[2px] bg-brand-accent/50 block animate-pulse"></span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="w-8 h-[2px] bg-sky-500/50 block animate-pulse"></span>
                          <span className="text-xs font-mono font-bold text-white/60">C ==== G</span>
                          <span className="w-8 h-[2px] bg-sky-500/50 block animate-pulse"></span>
                        </div>
                        
                      </div>
                      <span className="text-[9px] font-mono text-white/40 select-none tracking-widest uppercase">SCHEMA: RIBOSOMAL CODON SPLICING INTERLINK</span>
                    </div>
                  )}

                  {projectId === 'proj-bioreactor' && (
                    /* Bioreactor Blueprint Sketch */
                    <div className="w-full max-w-lg flex flex-col items-center justify-center space-y-4 py-2">
                      <div className="relative w-48 h-32 border-2 border-dashed border-white/20 flex items-center justify-center">
                        <div className="absolute top-2 left-2 text-[8px] font-mono text-white/30">VESS-02 PORT STATUS: DISCONNECTED</div>
                        
                        {/* Bioreactor drawing */}
                        <div className="w-16 h-24 border border-brand-accent/40 rounded-b-xl flex flex-col justify-between p-2">
                          <div className="w-full h-1 bg-brand-accent/20"></div>
                          <div className={`w-full transition-all duration-300 ${simulationActive ? 'h-10 bg-brand-accent/30' : 'h-4 bg-brand-accent/10'} rounded-b-lg border-t border-brand-accent/30 flex items-center justify-center`}>
                            <span className="text-[7px] font-mono text-white/50">{simulationActive ? 'AGITATING' : 'IDLE'}</span>
                          </div>
                        </div>

                        {/* Arrows/sensors schematics */}
                        <div className="absolute -left-10 top-8 flex items-center gap-1">
                          <span className="text-[8px] font-mono text-white/40">pH PROBE</span>
                          <span className="w-6 h-[1px] bg-white/20"></span>
                        </div>
                        <div className="absolute -right-12 top-16 flex items-center gap-1">
                          <span className="w-6 h-[1px] bg-white/20"></span>
                          <span className="text-[8px] font-mono text-white/40">TEMP_PT100</span>
                        </div>
                        
                        {/* Agitation rod inside */}
                        <div className={`absolute top-2 w-[1px] h-16 bg-white/40 transition-transform origin-top ${simulationActive ? 'animate-spin' : ''}`} style={{ animationDuration: '1.2s' }}></div>
                      </div>
                      <span className="text-[9px] font-mono text-white/40 select-none tracking-widest uppercase">SCHEMA: IoT REACTOR CORE VESSEL FEEDBACK</span>
                    </div>
                  )}

                  {projectId === 'proj-lims' && (
                    /* 96-Well Matrix Blueprint Sketch */
                    <div className="w-full max-w-lg flex flex-col items-center justify-center space-y-4">
                      {/* Grid representation */}
                      <div className="grid grid-cols-12 gap-1.5 p-3 border border-white/10 bg-white/[0.01]">
                        {Array.from({ length: 48 }).map((_, i) => {
                          const isFilled = i % 5 !== 0 && i % 7 !== 0;
                          return (
                            <div 
                              key={i} 
                              className={`w-3 h-3 sm:w-4 sm:h-4 border transition-colors ${
                                isFilled 
                                  ? 'bg-brand-accent/35 border-brand-accent/60' 
                                  : 'bg-white/5 border-white/10'
                              } flex items-center justify-center`}
                            >
                              <span className="text-[6px] text-white/20 font-mono"></span>
                            </div>
                          );
                        })}
                      </div>
                      <span className="text-[9px] font-mono text-white/40 select-none tracking-widest uppercase">SCHEMA: 12 X 8 (96 WELLS) SBS PLATFORM ASSAY LAYOUT</span>
                    </div>
                  )}

                  {/* Absolute locked glass mask overlay for "Upcoming" elegance */}
                  <div className="absolute inset-0 bg-black/45 backdrop-blur-[3px] flex flex-col items-center justify-center p-4">
                    <div className="bg-[#1A1A1A] border border-white/10 p-5 max-w-xs text-center space-y-3">
                      <div className="w-10 h-10 bg-brand-accent/20 text-brand-accent flex items-center justify-center mx-auto border border-brand-accent/25">
                        <Lock className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <h5 className="font-mono text-[10px] font-extrabold uppercase tracking-widest text-brand-accent">SENSORY SIMULATOR INTERFACE</h5>
                        <p className="text-[11px] text-white/70 font-sans leading-relaxed mt-1">
                          Interactive controls will deploy in the upcoming batch release sequence.
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {schemaTab === 'code' && (
              <div className="space-y-4">
                <p className="text-xs text-white/75 leading-relaxed font-sans max-w-2xl">
                  Standard interface JSON registers representing the state structure being mapped on client pipelines.
                </p>
                <div className="bg-[#121212] border border-white/10 p-4 font-mono text-[11px] leading-relaxed text-white/90 overflow-x-auto select-all max-h-56 scrollbar-thin">
                  <pre>{getCodeSnippet()}</pre>
                </div>
              </div>
            )}

            {schemaTab === 'specs' && (
              <div className="space-y-4">
                <p className="text-xs text-white/75 leading-relaxed font-sans max-w-2xl">
                  Analytical objectives and design guidelines curated for this research iteration.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {projectId === 'proj-sequencer' && (
                    <>
                      <div className="bg-white/[0.02] border border-white/5 p-4 space-y-1.5">
                        <span className="text-[9px] font-mono text-brand-accent uppercase font-bold tracking-wider">SPECIFICATION A</span>
                        <h5 className="text-xs font-bold font-sans text-white">RIBOSOMAL DECODING LATENCY</h5>
                        <p className="text-2xs text-white/60 font-sans leading-relaxed">
                          Translating 3-character codon bases in millisecond frame indices with immediate peptide secondary shape projections.
                        </p>
                      </div>
                      <div className="bg-white/[0.02] border border-white/5 p-4 space-y-1.5">
                        <span className="text-[9px] font-mono text-brand-accent uppercase font-bold tracking-wider">SPECIFICATION B</span>
                        <h5 className="text-xs font-bold font-sans text-white">GC COEFF ANALYSIS ENTIRETY</h5>
                        <p className="text-2xs text-white/60 font-sans leading-relaxed">
                          Automated skew assessment thresholds designed to isolate DNA segment transitions and alert for sequence anomalies.
                        </p>
                      </div>
                    </>
                  )}
                  {projectId === 'proj-bioreactor' && (
                    <>
                      <div className="bg-white/[0.02] border border-white/5 p-4 space-y-1.5">
                        <span className="text-[9px] font-mono text-brand-accent uppercase font-bold tracking-wider">SPECIFICATION A</span>
                        <h5 className="text-xs font-bold font-sans text-white">MODBUS SERIAL CLOCK</h5>
                        <p className="text-2xs text-white/60 font-sans leading-relaxed">
                          9600 Baud asynchronous feedback loops polling glass electrodes and thermal sensors within 12ms accuracy thresholds.
                        </p>
                      </div>
                      <div className="bg-white/[0.02] border border-white/5 p-4 space-y-1.5">
                        <span className="text-[9px] font-mono text-brand-accent uppercase font-bold tracking-wider">SPECIFICATION B</span>
                        <h5 className="text-xs font-bold font-sans text-white">SPIKE PROTECTION TELEMETRY</h5>
                        <p className="text-2xs text-white/60 font-sans leading-relaxed">
                          Automated acid/base actuator state locks acting as biological circuit protection triggers to minimize cell mortality parameters.
                        </p>
                      </div>
                    </>
                  )}
                  {projectId === 'proj-lims' && (
                    <>
                      <div className="bg-white/[0.02] border border-white/5 p-4 space-y-1.5">
                        <span className="text-[9px] font-mono text-brand-accent uppercase font-bold tracking-wider">SPECIFICATION A</span>
                        <h5 className="text-xs font-bold font-sans text-white">COORD MAP ENTIRETY</h5>
                        <p className="text-2xs text-white/60 font-sans leading-relaxed">
                          Standard microplate rows [A-H] and columns [1-12] structured as quick accessible spatial data hashes for lightning CSV generation.
                        </p>
                      </div>
                      <div className="bg-white/[0.02] border border-white/5 p-4 space-y-1.5">
                        <span className="text-[9px] font-mono text-brand-accent uppercase font-bold tracking-wider">SPECIFICATION B</span>
                        <h5 className="text-xs font-bold font-sans text-white">DILUTION GRADIENT MATRIX</h5>
                        <p className="text-2xs text-white/60 font-sans leading-relaxed">
                          Automatic logarithmic layout curves rendering plate concentrations in highly scannable chromatic grid visuals.
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* SIMULATION THREAD CONTROLS */}
          <div className="pt-6 border-t border-white/10 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[9px] font-mono text-white/40 block uppercase tracking-widest font-bold">
                  {projectId === 'proj-sequencer' && 'MOCK NUCLEOBASES DECODE SPEED'}
                  {projectId === 'proj-bioreactor' && 'MOCK RPM CALIBRATION SLIDER'}
                  {projectId === 'proj-lims' && 'MOCK SERIAL DILUTION RATIO'}
                </span>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={projectId === 'proj-sequencer' ? 5 : projectId === 'proj-bioreactor' ? 50 : 2}
                    max={projectId === 'proj-sequencer' ? 80 : projectId === 'proj-bioreactor' ? 600 : 64}
                    value={simulationParameter}
                    onChange={(e) => setSimulationParameter(Number(e.target.value))}
                    disabled={!simulationActive}
                    className="w-40 accent-brand-accent disabled:opacity-30 cursor-pointer"
                  />
                  <span className="font-mono text-xs font-bold text-white bg-white/5 px-2 py-0.5 min-w-[50px] text-center">
                    {simulationParameter} {projectId === 'proj-sequencer' ? 'bp/sec' : projectId === 'proj-bioreactor' ? 'RPM' : 'x'}
                  </span>
                </div>
              </div>

              <button
                onClick={toggleSimulation}
                className={`px-5 py-2.5 font-mono text-xs tracking-widest font-bold uppercase cursor-pointer transition-all duration-300 flex items-center gap-1.5 ${
                  simulationActive 
                    ? 'bg-[#E5422B] hover:bg-[#C8341F] text-white' 
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                {simulationActive ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" /> SUSPEND TELEMETRY
                  </>
                ) : (
                  <>
                    <Terminal className="w-3.5 h-3.5" /> STAGE SIMULATION THREAD
                  </>
                )}
              </button>
            </div>

            {/* Simulated Stream Log outputs */}
            {simulationActive && (
              <div className="bg-black/40 border border-white/5 p-3 rounded-none font-mono text-[10px] text-white/60 space-y-1 max-h-24 overflow-y-auto">
                {logMessages.map((log, idx) => (
                  <p key={idx} className={idx === 0 ? 'text-brand-accent font-semibold' : ''}>{log}</p>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* RIGHT COLUMN: ACCESS FORM & SPECS SUMMARY */}
        <div className="lg:col-span-4 p-6 lg:p-8 flex flex-col justify-between space-y-8 bg-black/20">
          
          <div className="space-y-4">
            <span className="font-mono text-[9px] text-brand-accent uppercase tracking-wider font-extrabold block">
              ATELIER INDEX CHRONO
            </span>
            <h5 className="font-serif italic text-xl font-black text-white uppercase tracking-tight">
              Beta Access & Verification
            </h5>
            <p className="text-xs text-white/70 leading-relaxed font-sans">
              Enter email registration below to join our early iteration deployment list. You will receive cryptographic verification access keys for biological client diagnostics dashboards.
            </p>
          </div>

          {/* NOTIFICATION SUBSCRIPTION CARD */}
          <div className="p-5 border border-white/10 bg-white/[0.01] space-y-4">
            
            {isRegistered ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-emerald-400">
                  <div className="w-6 h-6 bg-emerald-500/15 border border-emerald-500/35 flex items-center justify-center rounded-none shadow-sm">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#22C55E]">
                    ACCESS REGISTERED
                  </span>
                </div>
                <p className="text-[11px] font-mono text-white/50 leading-tight">
                  Token: <span className="text-white font-bold text-[10px] block select-all bg-white/5 p-1 mt-1 text-center">BETA-S-{projectId.toUpperCase().replace('PROJ-', '')}-ACCESS</span>
                </p>
                <p className="text-2xs text-white/60 leading-relaxed font-sans">
                  Success check generated for <span className="text-brand-accent font-bold">{registeredEmail}</span>. Automated release notifier hook stands configured.
                </p>
                
                <button
                  onClick={() => {
                    localStorage.removeItem(`upcoming_register_${projectId}`);
                    setIsRegistered(false);
                    setRegisteredEmail('');
                  }}
                  className="text-white/40 hover:text-white font-mono text-[9px] uppercase tracking-wider block pt-1 hover:underline transition-colors"
                >
                  Clear Registered Credentials
                </button>
              </div>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4.5">
                <div className="space-y-1.5">
                  <label htmlFor="early-email" className="text-[9px] font-mono font-bold text-white/40 tracking-widest block">
                    CLIENT PROTOCOL EMAIL
                  </label>
                  <input
                    id="early-email"
                    type="email"
                    required
                    value={registeredEmail}
                    onChange={(e) => setRegisteredEmail(e.target.value)}
                    placeholder="laboratory@domain.com"
                    className="w-full bg-white/[0.04] border border-white/10 hover:border-white/30 focus:border-brand-accent text-xs p-2.5 focus:outline-none transition-colors duration-200 text-white rounded-none"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-[#1A1A1A] hover:bg-brand-accent text-white font-mono font-bold text-[11px] uppercase tracking-widest py-3 border border-white/20 hover:border-brand-accent transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <Bell className="w-3.5 h-3.5 text-brand-accent" /> REGISTER INCOMING LAB REPORT
                </button>
              </form>
            )}

          </div>

          {/* STAGE METRICS BOARD */}
          <div className="pt-4 border-t border-white/10 space-y-2 select-none">
            <div className="flex items-center justify-between text-[10px] font-mono font-bold text-white/30 uppercase">
              <span>PIPELINE BUILD STATE</span>
              <span className="text-brand-accent">
                {projectId === 'proj-sequencer' && '90% DECODED'}
                {projectId === 'proj-bioreactor' && '85% COMPLETE'}
                {projectId === 'proj-lims' && '60% SCHEMATIC'}
              </span>
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-none overflow-hidden">
              <div 
                className="h-full bg-brand-accent transition-all duration-1000" 
                style={{ 
                  width: projectId === 'proj-sequencer' ? '90%' : projectId === 'proj-bioreactor' ? '85%' : '60%' 
                }}
              ></div>
            </div>
          </div>

        </div>

      </div>

      {/* SUCCESS TOAST POPUP FOR REGISTRATION */}
      <AnimatePresence>
        {showNotificationCheck && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="absolute bottom-4 right-4 z-50 bg-white border border-[#1A1A1A]/10 text-[#1A1A1A] p-4 shadow-2xl rounded-none flex items-center gap-3 max-w-sm"
          >
            <div className="w-7 h-7 bg-brand-accent text-white flex items-center justify-center rounded-none shrink-0">
              <Check className="w-4 h-4" />
            </div>
            <div>
              <p className="font-serif italic font-extrabold text-xs text-[#1A1A1A]">REGISTRATION REVENUE SAVED</p>
              <p className="text-[10px] text-[#1A1A1A]/60 leading-tight font-sans mt-0.5">
                Your credentials have been securely registered to the early sequence log file.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>

    </div>
  );
}
