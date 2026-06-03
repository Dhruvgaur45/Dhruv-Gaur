import React, { useState, useEffect, useRef, useMemo } from 'react';
import * as d3 from 'd3';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Dna, 
  Cpu, 
  Orbit, 
  Search, 
  Layers, 
  Zap, 
  Sparkles, 
  Database, 
  FileText, 
  Radio, 
  Compass, 
  Activity,
  Award
} from 'lucide-react';

interface ResearchNode extends d3.SimulationNodeDatum {
  id: string;
  label: string;
  category: 'bioinformatics' | 'photonics';
  subCategory: string;
  value: number; // size/weight
  description: string;
  applications: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  status: 'Published' | 'Under Active Study' | 'Theoretical Frame';
  color: string;
}

const RESEARCH_DATA: ResearchNode[] = [
  // --- BIOINFORMATICS FIELDS ---
  {
    id: 'bio-genomics',
    label: 'High-Throughput Sequence Alignment',
    category: 'bioinformatics',
    subCategory: 'Genomics',
    value: 45,
    description: 'Developing high-speed algorithms to align short raw reads against human and microbial reference templates with high index precision.',
    applications: ['Variant Calling', 'Sanger Verification', 'Epigenetic Sequencing'],
    difficulty: 'Advanced',
    status: 'Published',
    color: '#10B981', // emerald
  },
  {
    id: 'bio-crispr',
    label: 'gRNA CRISPR Targeting & Off-Effects',
    category: 'bioinformatics',
    subCategory: 'Gene Editing',
    value: 50,
    description: 'Computational simulation of guide-RNA thermodynamic binding profiles to predict and eliminate mutagenic off-target cleavages inside mammalian cell lines.',
    applications: ['Cas9 Splicing', 'Base Editing Pipelines', 'Somatic Splicing'],
    difficulty: 'Advanced',
    status: 'Under Active Study',
    color: '#059669', // deep emerald
  },
  {
    id: 'bio-tumor',
    label: 'Cancer Transcriptomics',
    category: 'bioinformatics',
    subCategory: 'Oncology',
    value: 42,
    description: 'Deconvoluting complex tumor microenvironments using single-cell RNA sequencing (scRNA-seq) to detect drug-resistant sub-populations.',
    applications: ['Immune Checkpoint Profiling', 'Mutation Hotspots', 'Lineage Tracing'],
    difficulty: 'Advanced',
    status: 'Under Active Study',
    color: '#0D9488', // teal
  },
  {
    id: 'bio-folding',
    label: 'AI Protein Folding Simulations',
    category: 'bioinformatics',
    subCategory: 'Structural Biotech',
    value: 48,
    description: 'Using structural deep learning workflows to predict tertiary peptide conformations and optimize enzymatic stability inside industrial bioreactors.',
    applications: ['Enzyme Evolution', 'Binding Pocket Optimization', 'Thermostable Mutant Design'],
    difficulty: 'Intermediate',
    status: 'Theoretical Frame',
    color: '#0F766E', // dark teal
  },
  {
    id: 'bio-metagenome',
    label: 'Metagenomic Environment Parsing',
    category: 'bioinformatics',
    subCategory: 'Microbiome',
    value: 38,
    description: 'Reassembling complex microbial consortia genomes directly from raw soil and marine samples without pure culture pre-isolation.',
    applications: ['Novel Antibiotic Discovery', 'Bioremediation Strain Exploration', 'Symbiosis Mapping'],
    difficulty: 'Intermediate',
    status: 'Published',
    color: '#34D399', // soft green
  },
  {
    id: 'bio-bioreactor',
    label: 'Bioprocess Telemetry Analytics',
    category: 'bioinformatics',
    subCategory: 'Bioprocess',
    value: 36,
    description: 'Real-time statistical processing of closed-loop gas-transfer coefficients, oxygen levels, and PID dynamic tracking arrays during active fermentation runs.',
    applications: ['Sartorius Scale-Up Control', 'Metabolic Flux Analysis', 'Feed-Batch Optimization'],
    difficulty: 'Intermediate',
    status: 'Under Active Study',
    color: '#059669',
  },

  // --- PHOTONICS SEMICONDUCTOR FIELDS ---
  {
    id: 'phot-silicon',
    label: 'Silicon Photonic Integrated Circuits',
    category: 'photonics',
    subCategory: 'Semiconductor Fabrication',
    value: 52,
    description: 'Integrating micron-scale light-conducting waveguides, micro-rings, and lasers directly onto standard silicon wafers for high-speed computation.',
    applications: ['Co-Packaged Optics', 'Electro-optic Transceivers', 'AI Hardware Acceleration'],
    difficulty: 'Advanced',
    status: 'Under Active Study',
    color: '#6366F1', // indigo
  },
  {
    id: 'phot-resonator',
    label: 'Micro-ring Optical Resonators',
    category: 'photonics',
    subCategory: 'Semiconductor Fabrication',
    value: 44,
    description: 'Ultra-high-Q whispering gallery resonators designed to filter discrete optical wavelengths and execute immediate matrix-vector multiplications for light-speed inferences.',
    applications: ['Wavelength Selection', 'optical phase modulators', 'Low-Noise Comb Generators'],
    difficulty: 'Advanced',
    status: 'Published',
    color: '#4F46E5', // deep indigo
  },
  {
    id: 'phot-interconnect',
    label: 'Optical Interconnect Bandwidth Scaling',
    category: 'photonics',
    subCategory: 'Data Centers',
    value: 40,
    description: 'Replacing traditional resistive copper traces with noise-free, high-capacity light fibers to solve data bottlenecking inside hyper-scale high-performance cloud clusters.',
    applications: ['Ultra-Large Scale AI Clusters', 'Photonic Bus Routing', 'Zero-Heat Data Transfer'],
    difficulty: 'Intermediate',
    status: 'Published',
    color: '#3B82F6', // blue
  },
  {
    id: 'phot-wdm',
    label: 'Wavelength Division Multiplexing (WDM)',
    category: 'photonics',
    subCategory: 'Modulators',
    value: 46,
    description: 'Slicing absolute single laser beams into dozens of distinct operational colors inside a silicon die, multiplier bands transmitting independent parallel logs.',
    applications: ['Terabit Fiber Protocols', 'Parallel Photonic Shuttles', 'Multi-Carrier Optical Buses'],
    difficulty: 'Advanced',
    status: 'Theoretical Frame',
    color: '#8B5CF6', // purple
  },
  {
    id: 'phot-lasers',
    label: 'Indium Phosphide (InP) Laser Splicing',
    category: 'photonics',
    subCategory: 'Optoelectronics',
    value: 38,
    description: 'Mechanically bonding III-V semiconductor materials like Indium Phosphide directly to passive silicon oxide arrays for coherent light source integration.',
    applications: ['On-Chip Direct Lasers', 'Tunable Optical Carriers', 'Heterogeneous Integration'],
    difficulty: 'Advanced',
    status: 'Under Active Study',
    color: '#7C3AED', // deep purple
  },
  {
    id: 'phot-quantum',
    label: 'Photonic Quantum Computation',
    category: 'photonics',
    subCategory: 'Quantum Hardware',
    value: 45,
    description: 'Manipulating polarized indistinguishable single photons inside integrated silicon circuits to generate scalable entangled cluster states.',
    applications: ['Optical Quantum Gates', 'Coherent Quantum Routers', 'Noise-Tolerant Squeezed Light'],
    difficulty: 'Advanced',
    status: 'Theoretical Frame',
    color: '#4338CA', // dark indigo
  }
];

export default function ResearchMap() {
  const [activeCategory, setActiveCategory] = useState<'bioinformatics' | 'photonics'>('bioinformatics');
  const [selectedNode, setSelectedNode] = useState<ResearchNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<ResearchNode | null>(null);
  
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 400 });

  // Dynamically filtered nodes data
  const filteredNodes = useMemo(() => {
    return RESEARCH_DATA.filter(n => n.category === activeCategory).map(n => ({
      ...n,
      x: Math.random() * dimensions.width,
      y: Math.random() * dimensions.height
    })) as ResearchNode[];
  }, [activeCategory, dimensions.width, dimensions.height]);

  // Handle resizing
  useEffect(() => {
    const handleResize = () => {
      if (svgRef.current?.parentElement) {
        const { width } = svgRef.current.parentElement.getBoundingClientRect();
        // Maintain clean proportions
        setDimensions({
          width: Math.max(width, 320),
          height: width < 500 ? 300 : 400
        });
      }
    };

    window.addEventListener('resize', handleResize);
    // Initial size trigger
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Watch for category shift to reset selection to default node
  useEffect(() => {
    const firstNodeOfCategory = RESEARCH_DATA.find(n => n.category === activeCategory) || null;
    setSelectedNode(firstNodeOfCategory);
  }, [activeCategory]);

  // D3 Simulation setup and binding
  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const { width, height } = dimensions;

    // Clear previous simulation elements
    svg.selectAll('*').remove();

    // Deep copy of nodes to prevent mutation errors inside D3
    const nodes: ResearchNode[] = JSON.parse(JSON.stringify(filteredNodes));

    // Simulation settings
    const simulation = d3.forceSimulation<ResearchNode>(nodes)
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('charge', d3.forceManyBody().strength(-200))
      .force('collide', d3.forceCollide<ResearchNode>().radius(d => d.value + 12).iterations(3))
      .force('x', d3.forceX(width / 2).strength(0.08))
      .force('y', d3.forceY(height / 2).strength(0.08));

    // Paint Container Layouts
    const container = svg.append('g');

    // Add nodes grouped elements
    const nodeGroup = container.selectAll('.node-element')
      .data(nodes)
      .enter()
      .append('g')
      .attr('class', 'node-element cursor-pointer')
      .on('click', (event, d) => {
        // Match selection back to actual react nodes
        const originalNode = RESEARCH_DATA.find(original => original.id === d.id);
        if (originalNode) setSelectedNode(originalNode);
      })
      .on('mouseover', (event, d) => {
        const originalNode = RESEARCH_DATA.find(original => original.id === d.id);
        if (originalNode) setHoveredNode(originalNode);
      })
      .on('mouseout', () => {
        setHoveredNode(null);
      });

    // Draw delicate halo rings under nodes
    nodeGroup.append('circle')
      .attr('r', d => d.value + 8)
      .attr('fill', 'transparent')
      .attr('stroke', d => d.color)
      .attr('stroke-opacity', 0.2)
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '3,3');

    // Draw main colored circles
    nodeGroup.append('circle')
      .attr('r', d => d.value)
      .attr('fill', '#FAF9F5')
      .attr('stroke', d => d.color)
      .attr('stroke-width', 2.5)
      .attr('class', 'transition-colors duration-200 hover:opacity-95');

    // Add nested center core dot
    nodeGroup.append('circle')
      .attr('r', 4)
      .attr('fill', d => d.color);

    // Dynamic Text labels with fine clipping
    nodeGroup.append('text')
      .text(d => {
        const words = d.label.split(' ');
        return words[0] || '';
      })
      .attr('text-anchor', 'middle')
      .attr('dy', '-2px')
      .attr('font-size', '10px')
      .attr('font-weight', '700')
      .attr('fill', '#1A1A1A')
      .attr('font-family', 'sans-serif');

    nodeGroup.append('text')
      .text(d => {
        const words = d.label.split(' ');
        return words.slice(1).join(' ').substring(0, 12) + (words.slice(1).join(' ').length > 12 ? '..' : '');
      })
      .attr('text-anchor', 'middle')
      .attr('dy', '11px')
      .attr('font-size', '8px')
      .attr('font-weight', '500')
      .attr('fill', '#1A1A1A')
      .attr('opacity', 0.65)
      .attr('font-family', 'ui-monospace, monospace');

    // Render continuous dynamic force tick updates
    simulation.on('tick', () => {
      nodeGroup.attr('transform', d => {
        // Keep inside boundaries with cushion padding
        const r = d.value;
        const boundedX = Math.max(r + 15, Math.min(width - r - 15, d.x || 0));
        const boundedY = Math.max(r + 15, Math.min(height - r - 15, d.y || 0));
        return `translate(${boundedX}, ${boundedY})`;
      });
    });

    // Cleanup simulation on unmount or updates
    return () => {
      simulation.stop();
    };
  }, [filteredNodes, dimensions]);

  return (
    <div className="space-y-12">
      {/* SECTION HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4 max-w-xl">
          <div className="flex items-center gap-2 text-brand-accent text-[9px] font-mono tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-brand-accent inline-block animate-pulse" />
            Interactive Lab Sandbox
          </div>
          <h2 className="font-serif italic text-4xl font-black text-[#1A1A1A] tracking-tight uppercase">
            Scientific Research Map
          </h2>
          <p className="text-sm text-brand-text-muted leading-relaxed font-normal">
            Explore advanced clinical algorithms and micro-hardware structures. Switch between <strong>Bioinformatics</strong> (gene sequence grids) and <strong>Photonics Semiconductors</strong> (near light-speed silicon optical modulators) to explore critical vectors.
          </p>
        </div>

        {/* METRICS STAT CABINET */}
        <div className="bg-brand-surface border border-[#1A1A1A]/10 p-4 shrink-0 font-mono flex items-center justify-between gap-8 md:self-stretch">
          <div className="space-y-1 text-left">
            <span className="text-[8px] text-brand-text-muted tracking-widest block uppercase font-bold">RESEARCH FIELDS</span>
            <span className="text-2xl font-black text-[#1A1A1A] tracking-tight antialiased">02 <span className="text-xs font-semibold text-brand-text-muted">SECTORS</span></span>
          </div>
          <div className="h-8 w-[1px] bg-[#1A1A1A]/10" />
          <div className="space-y-1 text-left">
            <span className="text-[8px] text-brand-text-muted tracking-widest block uppercase font-bold">MAPPED VECTORS</span>
            <span className="text-2xl font-black text-brand-accent tracking-tight antialiased">12 <span className="text-xs font-semibold text-brand-text-muted">NODES</span></span>
          </div>
        </div>
      </div>

      {/* DUAL SELECTOR SWITCH BAR */}
      <div className="bg-[#FAF9F5] border border-[#1A1A1A]/10 p-5">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6">
          
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setActiveCategory('bioinformatics')}
              className={`py-2 px-4 font-mono text-[10px] tracking-wider uppercase font-black transition-all cursor-pointer flex items-center gap-2 border ${
                activeCategory === 'bioinformatics'
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                  : 'bg-white text-brand-text border-[#1A1A1A]/10 hover:border-emerald-600/30'
              }`}
            >
              <Dna className="w-4 h-4" />
              I. Bioinformatics & CRISPR
            </button>

            <button
              type="button"
              onClick={() => setActiveCategory('photonics')}
              className={`py-2 px-4 font-mono text-[10px] tracking-wider uppercase font-black transition-all cursor-pointer flex items-center gap-2 border ${
                activeCategory === 'photonics'
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                  : 'bg-white text-brand-text border-[#1A1A1A]/10 hover:border-indigo-600/30'
              }`}
            >
              <Cpu className="w-4 h-4" />
              II. Photonics Semiconductor
            </button>
          </div>

          <p className="text-[9px] font-mono text-brand-text-muted font-bold uppercase tracking-widest flex items-center gap-2">
            <Orbit className="w-3.5 h-3.5 text-brand-accent animate-spin" style={{ animationDuration: '10s' }} />
            Click bubbles in the layout to update technical logs
          </p>
        </div>
      </div>

      {/* DATA VISUALIZATION CANVAS ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* SVG PLOTTING FRAME (Col 1-7) */}
        <div className="lg:col-span-7 bg-white border border-[#1A1A1A]/10 p-4 md:p-6 shadow-xs flex flex-col justify-between relative overflow-hidden group">
          
          {/* Subtle background coordinate net lines to make it look lab-like */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1A1A1A12_1px,transparent_1px),linear-gradient(to_bottom,#1A1A1A12_1px,transparent_1px)] bg-[size:24px_24px] opacity-[0.25] pointer-events-none" />
          
          <div className="relative w-full overflow-hidden flex items-center justify-center">
            <svg
              ref={svgRef}
              width={dimensions.width}
              height={dimensions.height}
              className="relative z-10 select-none overflow-visible max-w-full"
            />
          </div>

          <div className="border-t border-[#1A1A1A]/10 pt-4 flex items-center justify-between font-mono text-[8.5px] uppercase text-brand-text-muted relative z-10">
            <div className="flex items-center gap-1.5 font-bold">
              <Zap className="w-3.5 h-3.5 text-brand-accent" />
              PHYSICAL PHYSICS DISCOVERY ACTIVE
            </div>
            {hoveredNode && (
              <div className="text-right text-[#1A1A1A] font-extrabold tracking-tight">
                Inspect: <span className="text-brand-accent">{hoveredNode.label}</span> ({hoveredNode.subCategory})
              </div>
            )}
          </div>
        </div>

        {/* LOG PANEL DESCRIPTION FILE (Col 8-12) */}
        <div className="lg:col-span-5">
          <AnimatePresence mode="wait">
            {selectedNode ? (
              <motion.div
                key={selectedNode.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white border-2 border-[#1A1A1A]/10 border-l-4 p-6 flex flex-col justify-between h-full shadow-md"
                style={{ borderLeftColor: selectedNode.color }}
              >
                <div className="space-y-5">
                  
                  {/* Category Status Bar */}
                  <div className="flex items-center justify-between gap-2 border-b border-[#1A1A1A]/5 pb-4">
                    <span className="text-[8px] font-mono tracking-widest uppercase px-2 py-0.5 border bg-brand-surface font-extrabold text-[#1a1a1a]">
                      {selectedNode.subCategory.toUpperCase()}
                    </span>
                    
                    <span className={`text-[8.5px] font-mono font-black border px-2 py-0.5 ${
                      selectedNode.status === 'Published' 
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-300/40' 
                        : selectedNode.status === 'Under Active Study'
                        ? 'bg-amber-50 text-amber-700 border-amber-300/40'
                        : 'bg-indigo-50 text-indigo-700 border-indigo-300/40'
                    }`}>
                      {selectedNode.status}
                    </span>
                  </div>

                  {/* Node Title */}
                  <div className="space-y-1.5 text-left">
                    <span className="text-[7.5px] font-mono text-brand-text-muted tracking-widest font-black uppercase">
                      RESEARCH TOPIC FIELD:
                    </span>
                    <h3 className="font-serif italic text-2xl font-black text-[#1A1A1A] leading-tight flex items-start gap-2">
                      {selectedNode.label}
                    </h3>
                  </div>

                  {/* Core abstract summary */}
                  <div className="space-y-1.5 text-left text-xs bg-brand-bg/40 p-4 border border-[#1A1A1A]/5 leading-relaxed font-normal">
                    <span className="text-[8px] font-mono text-brand-accent tracking-widest font-extrabold uppercase block mb-1">
                      ABSTRACT DESCRIPTION
                    </span>
                    "{selectedNode.description}"
                  </div>

                  {/* Difficulty Scale Level */}
                  <div className="flex items-center gap-4 text-[9px] font-mono text-brand-text-muted">
                    <span>
                      ENGINEERING COMPLEXITY: <strong className="text-[#1A1A1A] font-black">{selectedNode.difficulty}</strong>
                    </span>
                    <span>•</span>
                    <span>
                      CHIP VALUE WEIGHT: <strong className="text-[#1A1A1A] font-black">{selectedNode.value} U</strong>
                    </span>
                  </div>

                  {/* KEY APPLICATIONS SPECS */}
                  <div className="space-y-2 text-left pt-2">
                    <span className="font-mono text-[7.5px] font-black tracking-widest text-[#1A1A1A] uppercase block">
                      KEY LAB APPLICATIONS
                    </span>
                    <div className="grid grid-cols-1 gap-1.5">
                      {selectedNode.applications.map((app, index) => (
                        <div 
                          key={index} 
                          className="flex items-center gap-2 py-2 px-3 bg-brand-surface border border-[#1A1A1A]/8 font-mono text-[10px] font-semibold text-[#1A1A1A]"
                        >
                          <Activity className="w-3.5 h-3.5 shrink-0 text-brand-accent" />
                          <span>{app}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Footer seal indicators */}
                <div className="border-t border-[#1A1A1A]/10 mt-6 pt-4 flex items-center justify-between font-mono text-[8px] text-brand-text-muted uppercase">
                  <span>VECTOR_ID: <strong>{selectedNode.id.toUpperCase()}</strong></span>
                  <span className="flex items-center gap-1.5 text-brand-accent font-black">
                    <Award className="w-3.5 h-3.5" /> SECURE DOSSIER ENGAGED
                  </span>
                </div>
              </motion.div>
            ) : (
              <div className="bg-white border-2 border-dashed border-[#1A1A1A]/10 p-12 text-center h-full flex flex-col items-center justify-center space-y-3 font-mono">
                <Search className="w-8 h-8 text-brand-accent animate-pulse" />
                <p className="text-xs text-brand-text-muted font-bold uppercase tracking-wider">No Research Node Selected</p>
                <p className="text-[10px] text-brand-text-muted/70 max-w-xs mx-auto leading-relaxed">
                  Select any floating bubble node in the chart to inspect its molecular, algorithmic, or opto-electronic parameters.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
}
