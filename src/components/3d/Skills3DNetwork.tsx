import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Activity, Sparkles, Filter, RefreshCw, Cpu, Layers } from 'lucide-react';

interface SkillNode3D {
  id: string;
  name: string;
  category: string;
  x: number;
  y: number;
  z: number;
  color: string;
  connections: string[];
}

interface Skills3DNetworkProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onSelectSkill?: (skillName: string) => void;
}

const SKILL_NODES: SkillNode3D[] = [
  // Bioinformatics & Genomics
  { id: 'bioperl', name: 'BioPerl & Biopython', category: 'Bioinformatics', x: -140, y: -60, z: 40, color: '#00F2FE', connections: ['blast', 'nextflow', 'r_bio'] },
  { id: 'blast', name: 'NCBI BLAST+', category: 'Bioinformatics', x: -80, y: -100, z: -20, color: '#00F2FE', connections: ['bioperl', 'fastx', 'samtools'] },
  { id: 'samtools', name: 'SAMtools & BCFtools', category: 'Bioinformatics', x: -120, y: 30, z: 80, color: '#00F2FE', connections: ['blast', 'fastx', 'genomics_ngs'] },
  { id: 'fastx', name: 'FASTX-Toolkit', category: 'Bioinformatics', x: -160, y: -10, z: -50, color: '#00F2FE', connections: ['samtools', 'blast'] },
  { id: 'genomics_ngs', name: 'NGS Pipeline Dev', category: 'Genomics', x: -40, y: -40, z: 120, color: '#10B981', connections: ['samtools', 'nextflow', 'crispr'] },
  { id: 'crispr', name: 'CRISPR Cas9 Design', category: 'Genomics', x: 20, y: -90, z: 60, color: '#10B981', connections: ['genomics_ngs', 'blast'] },
  { id: 'nextflow', name: 'Nextflow / Snakemake', category: 'Genomics', x: -60, y: 80, z: 30, color: '#10B981', connections: ['bioperl', 'genomics_ngs', 'python_core'] },

  // Programming & Computational Engineering
  { id: 'python_core', name: 'Python Systems', category: 'Programming', x: 70, y: -30, z: 20, color: '#3B82F6', connections: ['pytorch', 'r_bio', 'nextflow', 'ts_eng'] },
  { id: 'r_bio', name: 'R & Bioconductor', category: 'Programming', x: 10, y: 40, z: -80, color: '#3B82F6', connections: ['python_core', 'bioperl', 'pandas'] },
  { id: 'ts_eng', name: 'TypeScript / React', category: 'Programming', x: 120, y: -70, z: -30, color: '#3B82F6', connections: ['python_core', 'lims_arch'] },
  { id: 'cpp_opt', name: 'C++ Algorithmic Core', category: 'Programming', x: 140, y: 20, z: 70, color: '#3B82F6', connections: ['python_core', 'photonic'] },

  // AI & Data Analytics
  { id: 'pytorch', name: 'PyTorch / Bio-LLMs', category: 'AI & ML', x: 80, y: 90, z: 40, color: '#8B5CF6', connections: ['python_core', 'pandas', 'alphafold'] },
  { id: 'alphafold', name: 'AlphaFold & ESMFold', category: 'AI & ML', x: 150, y: 80, z: -60, color: '#8B5CF6', connections: ['pytorch', 'crispr'] },
  { id: 'pandas', name: 'Pandas / NumPy', category: 'Data Analytics', x: 0, y: 110, z: -30, color: '#F59E0B', connections: ['pytorch', 'r_bio'] },

  // Specialized Research & Lab Systems
  { id: 'photonic', name: 'Photonic Integrated ICs', category: 'Research', x: -100, y: 120, z: -60, color: '#EC4899', connections: ['cpp_opt', 'nextflow'] },
  { id: 'lims_arch', name: 'LIMS & Microplate IoT', category: 'Research', x: 160, y: -10, z: 90, color: '#EC4899', connections: ['ts_eng', 'python_core'] },
];

export default function Skills3DNetwork({
  selectedCategory,
  onSelectCategory,
  onSelectSkill,
}: Skills3DNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredNode, setHoveredNode] = useState<SkillNode3D | null>(null);
  const [autoRotate, setAutoRotate] = useState(true);

  // Rotation angles
  const rotRef = useRef({ rotX: 0.15, rotY: 0.3, isDragging: false, startX: 0, startY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number | null = null;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 700);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const handleResize = () => {
      if (canvas && canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = canvas.parentElement.clientHeight;
      }
    };
    window.addEventListener('resize', handleResize);

    // Mouse Dragging Interaction
    const handleMouseDown = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        rotRef.current.isDragging = true;
        rotRef.current.startX = e.clientX;
        rotRef.current.startY = e.clientY;
        setAutoRotate(false);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (rotRef.current.isDragging) {
        const dx = e.clientX - rotRef.current.startX;
        const dy = e.clientY - rotRef.current.startY;
        rotRef.current.rotY += dx * 0.006;
        rotRef.current.rotX += dy * 0.006;
        rotRef.current.startX = e.clientX;
        rotRef.current.startY = e.clientY;
      }

      // Check hover on projected nodes
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      let found: SkillNode3D | null = null;
      lastProjectedNodes.forEach(({ p2d, node }) => {
        const dist = Math.hypot(p2d.x - mouseX, p2d.y - mouseY);
        if (dist < 18 * p2d.scale) {
          found = node;
        }
      });
      setHoveredNode(found);
    };

    const handleMouseUp = () => {
      rotRef.current.isDragging = false;
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    let lastProjectedNodes: { p2d: { x: number; y: number; scale: number }; node: SkillNode3D }[] = [];
    const fov = 380;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (autoRotate) {
        rotRef.current.rotY += 0.003;
      }

      const cosY = Math.cos(rotRef.current.rotY);
      const sinY = Math.sin(rotRef.current.rotY);
      const cosX = Math.cos(rotRef.current.rotX);
      const sinX = Math.sin(rotRef.current.rotX);

      // Project all nodes
      const projected = SKILL_NODES.map((node) => {
        // Rotate around Y
        let x1 = node.x * cosY - node.z * sinY;
        let z1 = node.x * sinY + node.z * cosY;

        // Rotate around X
        let y2 = node.y * cosX - z1 * sinX;
        let z2 = node.y * sinX + z1 * cosX + 320; // push into distance

        const scale = fov / (fov + z2);
        const projX = x1 * scale + width / 2;
        const projY = y2 * scale + height / 2;

        return {
          p2d: { x: projX, y: projY, scale },
          node,
          rawZ: z2,
        };
      });

      lastProjectedNodes = projected;

      // Sort by Z for proper render order
      projected.sort((a, b) => b.rawZ - a.rawZ);

      const nodeMap = new Map(projected.map((p) => [p.node.id, p]));

      // 1. Draw Synaptic Connection Lines
      projected.forEach(({ p2d, node }) => {
        const isCurrentActive =
          selectedCategory === 'All' ||
          node.category.toLowerCase().includes(selectedCategory.toLowerCase());
        const isHovered = hoveredNode?.id === node.id;

        node.connections.forEach((targetId) => {
          const target = nodeMap.get(targetId);
          if (target) {
            const isConnectedToHover = isHovered || hoveredNode?.id === targetId;
            const isConnectedToActiveCategory =
              selectedCategory !== 'All' &&
              (node.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
                target.node.category.toLowerCase().includes(selectedCategory.toLowerCase()));

            ctx.beginPath();
            ctx.moveTo(p2d.x, p2d.y);
            ctx.lineTo(target.p2d.x, target.p2d.y);

            if (isConnectedToHover) {
              ctx.strokeStyle = 'rgba(0, 242, 254, 0.75)';
              ctx.lineWidth = 2.2;
            } else if (isConnectedToActiveCategory) {
              ctx.strokeStyle = 'rgba(16, 185, 129, 0.45)';
              ctx.lineWidth = 1.4;
            } else {
              ctx.strokeStyle = isCurrentActive
                ? 'rgba(13, 148, 136, 0.2)'
                : 'rgba(100, 116, 139, 0.08)';
              ctx.lineWidth = 0.8;
            }
            ctx.stroke();
          }
        });
      });

      // 2. Draw 3D Spherical Skill Nodes & Text
      projected.forEach(({ p2d, node }) => {
        const isMatchCategory =
          selectedCategory === 'All' ||
          node.category.toLowerCase().includes(selectedCategory.toLowerCase());
        const isHovered = hoveredNode?.id === node.id;
        const radius = Math.max(3, (isHovered ? 9 : 6.5) * p2d.scale);

        // Halo glow
        const glowRadius = radius * (isHovered ? 3.5 : 2.2);
        const glow = ctx.createRadialGradient(p2d.x, p2d.y, 0, p2d.x, p2d.y, glowRadius);
        glow.addColorStop(0, isMatchCategory ? node.color : 'rgba(148, 163, 184, 0.2)');
        glow.addColorStop(1, 'transparent');

        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(p2d.x, p2d.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // Solid Node Sphere
        ctx.fillStyle = isMatchCategory ? node.color : 'rgba(148, 163, 184, 0.4)';
        ctx.beginPath();
        ctx.arc(p2d.x, p2d.y, radius, 0, Math.PI * 2);
        ctx.fill();

        // Node Label
        const fontSize = Math.max(9, Math.round(11 * p2d.scale));
        ctx.font = `${isHovered ? 'bold ' : ''}${fontSize}px var(--font-mono, monospace)`;
        ctx.fillStyle = isHovered
          ? '#FFFFFF'
          : isMatchCategory
          ? 'rgba(255, 255, 255, 0.9)'
          : 'rgba(148, 163, 184, 0.4)';

        ctx.fillText(node.name, p2d.x + radius + 6, p2d.y + 4);
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [selectedCategory, hoveredNode, autoRotate]);

  return (
    <div className="relative w-full bg-[#0a0724]/90 dark:bg-[#03001C]/95 border border-[#00F2FE]/25 rounded-none overflow-hidden shadow-2xl p-4 my-6">
      {/* 3D Viewport Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10 relative z-10">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00F2FE] animate-ping" />
          <h4 className="text-xs font-mono font-bold tracking-widest text-[#00F2FE] uppercase flex items-center gap-2">
            <Cpu className="w-3.5 h-3.5" /> 3D BIOLOGICAL NETWORK ECOSYSTEM
          </h4>
        </div>

        {/* Quick Category Buttons & Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setAutoRotate((prev) => !prev)}
            className="px-2.5 py-1 text-[9px] font-mono tracking-wider border border-white/15 bg-white/5 hover:bg-white/10 text-white/80 transition-colors flex items-center gap-1 cursor-pointer"
            title="Toggle Continuous Rotation"
          >
            <RefreshCw className={`w-3 h-3 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
            {autoRotate ? 'AUTO-ORBIT' : 'LOCKED'}
          </button>
          <span className="text-[9px] font-mono text-white/50 hidden sm:inline">
            [Click + Drag to rotate 3D Space]
          </span>
        </div>
      </div>

      {/* Interactive 3D Canvas Area */}
      <div className="relative w-full h-[360px] sm:h-[420px] cursor-grab active:cursor-grabbing">
        <canvas ref={canvasRef} className="w-full h-full block" />

        {/* Hovered Skill HUD Overlay */}
        {hoveredNode && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="absolute bottom-3 left-3 bg-[#03001C]/90 border border-[#00F2FE]/40 p-3 text-white font-mono text-xs shadow-xl backdrop-blur-md max-w-xs z-20 pointer-events-none"
          >
            <div className="text-[9px] text-[#00F2FE] tracking-widest uppercase font-bold">
              NODE INSPECTOR // {hoveredNode.category}
            </div>
            <div className="text-sm font-bold mt-0.5 text-white">{hoveredNode.name}</div>
            <div className="text-[10px] text-white/60 mt-1">
              Connected pathways: {hoveredNode.connections.length} bio-computational nodes
            </div>
          </motion.div>
        )}
      </div>

      {/* Active Category Badges */}
      <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-2xs font-mono text-white/60">
        <div className="flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-[#10B981]" />
          <span>Active filter:</span>
          <span className="text-[#00F2FE] font-bold uppercase">{selectedCategory}</span>
        </div>
        <span className="text-white/40">16 Multidisciplinary Systems Interlinked</span>
      </div>
    </div>
  );
}
