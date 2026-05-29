import React from 'react';
import { motion } from 'motion/react';

interface CellItem {
  id: number;
  shape: 'mitochondrion' | 'mitosis' | 'chloroplast' | 'bacterium' | 'vesicle' | 'amoeba' | 'flagellate';
  x: string; // horizontal start %
  y: string; // vertical start %
  scale: number;
  rotation: number;
  opacity: number;
  blur: string;
  duration: number;
  driftX: number;
  driftY: number;
  pulseSpeed: number;
  color: string;
}

// Organic biological shapes represented as inline SVGs
const MitochondrionShape = ({ color }: { color: string }) => (
  <svg viewBox="0 0 100 60" className="w-full h-full drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]">
    {/* Outer membrane */}
    <ellipse cx="50" cy="30" rx="45" ry="25" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="3 2" />
    <ellipse cx="50" cy="30" rx="42" ry="22" fill={`${color}05`} stroke={color} strokeWidth="1" />
    {/* Cristae outer-inner fold loops */}
    <path
      d="M15,30 C20,15 25,15 25,30 C25,45 30,45 35,30 C40,15 45,15 45,30 C45,45 50,45 55,30 C60,15 65,15 65,30 C65,45 70,45 75,30 C80,15 85,30 85,30"
      fill="none"
      stroke={color}
      strokeWidth="1.2"
    />
    <circle cx="28" cy="22" r="1.5" fill={color} opacity="0.6" />
    <circle cx="48" cy="38" r="1" fill={color} opacity="0.6" />
    <circle cx="68" cy="24" r="1.5" fill={color} opacity="0.6" />
  </svg>
);

const MitosisShape = ({ color }: { color: string }) => (
  <svg viewBox="0 0 120 70" className="w-full h-full drop-shadow-[0_0_10px_rgba(16,185,129,0.4)]">
    {/* Constricted/pinched outer membrane during late cytokinesis */}
    <path
      d="M15,35 C15,15 45,12 55,25 C58,30 62,30 65,25 C75,12 105,15 105,35 C105,55 75,58 65,45 C62,40 58,40 55,45 C45,58 15,55 15,35 Z"
      fill={`${color}08`}
      stroke={color}
      strokeWidth="1.5"
    />
    {/* Chromosomes pulling apart */}
    <g stroke={color} strokeWidth="2" strokeLinecap="round" fill="none">
      {/* Left aster and chromatids */}
      <path d="M30,30 L25,25 M30,35 L24,38 M32,32 L36,22 M33,35 L38,40" />
      <circle cx="22" cy="33" r="1" fill={color} />
      {/* Right aster and chromatids */}
      <path d="M90,30 L95,25 M90,35 L96,38 M88,32 L84,22 M87,35 L82,40" />
      <circle cx="98" cy="33" r="1" fill={color} />
    </g>
    {/* Spindle apparatus threads */}
    <path
      d="M25,32 C45,22 75,22 95,32 M25,32 C45,35 75,35 95,32 M25,32 C45,45 75,45 95,32"
      fill="none"
      stroke={color}
      strokeWidth="0.5"
      strokeDasharray="1 3"
      opacity="0.5"
    />
  </svg>
);

const ChloroplastShape = ({ color }: { color: string }) => (
  <svg viewBox="0 0 90 90" className="w-full h-full drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]">
    <circle cx="45" cy="45" r="40" fill="none" stroke={color} strokeWidth="1.5" />
    <circle cx="45" cy="45" r="37" fill={`${color}03`} stroke={color} strokeWidth="0.75" strokeDasharray="4 2" />
    {/* Thylakoid grana stacks */}
    <g fill={`${color}20`} stroke={color} strokeWidth="1">
      <rect x="25" y="25" width="12" height="4" rx="1" />
      <rect x="25" y="31" width="12" height="4" rx="1" />
      <rect x="25" y="37" width="12" height="4" rx="1" />
      <line x1="31" y1="23" x2="31" y2="43" stroke={color} strokeWidth="0.5" />

      <rect x="50" y="30" width="14" height="4" rx="1" />
      <rect x="50" y="36" width="14" height="4" rx="1" />
      <rect x="50" y="42" width="14" height="4" rx="1" />
      <rect x="50" y="48" width="14" height="4" rx="1" />
      <line x1="57" y1="28" x2="57" y2="54" stroke={color} strokeWidth="0.5" />

      <rect x="33" y="52" width="12" height="4" rx="1" />
      <rect x="33" y="58" width="12" height="4" rx="1" />
      <line x1="39" y1="50" x2="39" y2="64" stroke={color} strokeWidth="0.5" />
    </g>
    {/* Stroma connections */}
    <path d="M31,31 Q45,35 57,36 M39,55 Q49,45 57,48" fill="none" stroke={color} strokeWidth="0.5" opacity="0.7" />
  </svg>
);

const BacteriumShape = ({ color }: { color: string }) => (
  <svg viewBox="0 0 100 50" className="w-full h-full drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]">
    {/* Rod shape capsule */}
    <rect x="15" y="15" width="50" height="20" rx="10" fill={`${color}05`} stroke={color} strokeWidth="1.5" />
    {/* Flagella lash waves */}
    <path
      d="M65,25 Q75,20 80,27 T95,24"
      fill="none"
      stroke={color}
      strokeWidth="1"
      strokeLinecap="round"
      opacity="0.8"
    />
    <path
      d="M65,22 Q72,15 78,20 T92,15"
      fill="none"
      stroke={color}
      strokeWidth="0.75"
      strokeLinecap="round"
      opacity="0.5"
    />
    {/* Nucleoid DNA scribble inside */}
    <path
      d="M20,25 C25,20 28,30 32,23 C36,28 40,20 44,25 C48,22 52,28 58,23"
      fill="none"
      stroke={color}
      strokeWidth="0.8"
      opacity="0.8"
    />
    {/* Cell wall pili lines */}
    <line x1="20" y1="15" x2="18" y2="11" stroke={color} strokeWidth="0.5" />
    <line x1="30" y1="15" x2="29" y2="11" stroke={color} strokeWidth="0.5" />
    <line x1="40" y1="15" x2="39" y2="11" stroke={color} strokeWidth="0.5" />
    <line x1="50" y1="15" x2="49" y2="11" stroke={color} strokeWidth="0.5" />
    <line x1="20" y1="35" x2="18" y2="39" stroke={color} strokeWidth="0.5" />
    <line x1="30" y1="35" x2="29" y2="39" stroke={color} strokeWidth="0.5" />
    <line x1="40" y1="35" x2="39" y2="39" stroke={color} strokeWidth="0.5" />
    <line x1="50" y1="35" x2="49" y2="39" stroke={color} strokeWidth="0.5" />
  </svg>
);

const VesicleShape = ({ color }: { color: string }) => (
  <svg viewBox="0 0 60 60" className="w-full h-full drop-shadow-[0_0_12px_rgba(16,185,129,0.5)]">
    {/* Concentric lipid bilayer sphere */}
    <circle cx="30" cy="30" r="26" fill="none" stroke={color} strokeWidth="1" strokeDasharray="3 3" />
    <circle cx="30" cy="30" r="22" fill={`${color}08`} stroke={color} strokeWidth="1.5" />
    <circle cx="30" cy="30" r="14" fill={`${color}12`} stroke={color} strokeWidth="0.75" />
    <circle cx="30" cy="30" r="4" fill={color} opacity="0.8" />
  </svg>
);

const AmoebaShape = ({ color }: { color: string }) => (
  <svg viewBox="0 0 90 90" className="w-full h-full drop-shadow-[0_0_8px_rgba(16,185,129,0.25)]">
    {/* Irregular pseudopod shape */}
    <path
      d="M45,15 C58,12 68,22 65,35 C78,39 82,55 70,68 C58,74 42,82 28,70 C15,62 12,45 22,35 C20,21 32,18 45,15 Z"
      fill={`${color}04`}
      stroke={color}
      strokeWidth="1.5"
    />
    <circle cx="36" cy="42" r="8" fill="none" stroke={color} strokeWidth="0.8" strokeDasharray="2 1" />
    <circle cx="36" cy="42" r="3" fill={color} opacity="0.5" />
    {/* Small food vacuoles */}
    <circle cx="55" cy="32" r="2.5" fill={color} opacity="0.6" />
    <circle cx="48" cy="58" r="4" fill={`${color}20`} stroke={color} strokeWidth="0.5" />
    <circle cx="28" cy="54" r="2" fill={color} opacity="0.4" />
  </svg>
);

const FlagellateShape = ({ color }: { color: string }) => (
  <svg viewBox="0 0 100 60" className="w-full h-full drop-shadow-[0_0_8px_rgba(59,130,246,0.3)]">
    {/* Pear-shaped cell body */}
    <path
      d="M15,30 C22,12 55,18 68,30 C55,42 22,48 15,30 Z"
      fill={`${color}05`}
      stroke={color}
      strokeWidth="1.5"
    />
    {/* Nucleus */}
    <circle cx="48" cy="30" r="6" fill={`${color}15`} stroke={color} strokeWidth="0.75" />
    <circle cx="48" cy="30" r="1.5" fill={color} />
    {/* Long fine flagellum whip threads */}
    <path
      d="M15,30 Q5,25 0,38"
      fill="none"
      stroke={color}
      strokeWidth="0.75"
      strokeLinecap="round"
      opacity="0.7"
    />
    <path
      d="M68,30 C80,30 85,25 90,35 T100,30"
      fill="none"
      stroke={color}
      strokeWidth="1"
      strokeLinecap="round"
      opacity="0.8"
    />
  </svg>
);

// Pre-defined list of micro elements representing multi-layered depth of field
const CELLS_DATA: CellItem[] = [
  // Layer 1 - Deep background (Small, low opacity, low blur, slow movement)
  { id: 1, shape: 'mitochondrion', x: '10%', y: '15%', scale: 0.5, rotation: 35, opacity: 0.08, blur: 'blur(0.5px)', duration: 42, driftX: 30, driftY: -15, pulseSpeed: 6, color: '#10B981' },
  { id: 2, shape: 'chloroplast', x: '82%', y: '8%', scale: 0.45, rotation: 110, opacity: 0.06, blur: 'blur(0px)', duration: 50, driftX: -20, driftY: 20, pulseSpeed: 8, color: '#10B981' },
  { id: 3, shape: 'vesicle', x: '55%', y: '28%', scale: 0.4, rotation: 0, opacity: 0.1, blur: 'blur(0.5px)', duration: 34, driftX: 15, driftY: 25, pulseSpeed: 4, color: '#3B82F6' },
  { id: 4, shape: 'bacterium', x: '3%', y: '72%', scale: 0.55, rotation: 220, opacity: 0.07, blur: 'blur(0.5px)', duration: 46, driftX: 35, driftY: -10, pulseSpeed: 7, color: '#10B981' },
  { id: 5, shape: 'amoeba', x: '88%', y: '68%', scale: 0.5, rotation: 45, opacity: 0.06, blur: 'blur(0px)', duration: 55, driftX: -25, driftY: -20, pulseSpeed: 9, color: '#10B981' },

  // Layer 2 - Medium ground (Standard scale, interactive focal plane)
  { id: 6, shape: 'mitosis', x: '25%', y: '45%', scale: 0.9, rotation: -15, opacity: 0.12, blur: 'blur(1.2px)', duration: 28, driftX: -40, driftY: 30, pulseSpeed: 4.5, color: '#10B981' },
  { id: 7, shape: 'mitochondrion', x: '72%', y: '38%', scale: 0.8, rotation: 140, opacity: 0.15, blur: 'blur(1px)', duration: 32, driftX: 20, driftY: -45, pulseSpeed: 5, color: '#10B981' },
  { id: 8, shape: 'flagellate', x: '80%', y: '85%', scale: 0.85, rotation: 70, opacity: 0.1, blur: 'blur(1px)', duration: 36, driftX: -30, driftY: -30, pulseSpeed: 5.5, color: '#3B82F6' },
  { id: 9, shape: 'chloroplast', x: '45%', y: '80%', scale: 0.75, rotation: 15, opacity: 0.11, blur: 'blur(1.5px)', duration: 38, driftX: 25, driftY: 15, pulseSpeed: 6.5, color: '#10B981' },
  { id: 10, shape: 'vesicle', x: '12%', y: '90%', scale: 0.65, rotation: 0, opacity: 0.14, blur: 'blur(0.8px)', duration: 30, driftX: 18, driftY: -22, pulseSpeed: 3.5, color: '#10B981' },

  // Layer 3 - Foreground (Large, highly blurred, drifting past the camera lens rapidly)
  { id: 11, shape: 'amoeba', x: '5%', y: '30%', scale: 1.8, rotation: 190, opacity: 0.05, blur: 'blur(4px)', duration: 22, driftX: 60, driftY: 40, pulseSpeed: 5, color: '#10B981' },
  { id: 12, shape: 'mitochondrion', x: '65%', y: '75%', scale: 1.7, rotation: 85, opacity: 0.04, blur: 'blur(5px)', duration: 25, driftX: -50, driftY: -50, pulseSpeed: 6, color: '#10B981' }
];

export default function MicroscopeCellsBackground() {
  const getShape = (shape: string, color: string) => {
    switch (shape) {
      case 'mitochondrion': return <MitochondrionShape color={color} />;
      case 'mitosis': return <MitosisShape color={color} />;
      case 'chloroplast': return <ChloroplastShape color={color} />;
      case 'bacterium': return <BacteriumShape color={color} />;
      case 'vesicle': return <VesicleShape color={color} />;
      case 'amoeba': return <AmoebaShape color={color} />;
      case 'flagellate': return <FlagellateShape color={color} />;
      default: return <VesicleShape color={color} />;
    }
  };

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none z-0">
      {/* ----------------- MICROSCOPIC SIGHT LENSES (PHOTOREALISTIC SCIENTIFIC DISCS) ----------------- */}
      
      {/* Lens 1: Fluorophore cellular scan (near top-right) */}
      <div className="absolute top-[18vh] right-[3%] md:right-[8%] w-[220px] h-[220px] md:w-[350px] md:h-[350px] select-none pointer-events-none opacity-[0.08] md:opacity-[0.14] transition-all duration-700 hover:opacity-[0.22] z-0">
        <div className="relative w-full h-full rounded-full border border-emerald-500/10 p-1.5 overflow-hidden flex items-center justify-center">
          {/* Rotating HUD circle scale ticks */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[1px] border border-dashed border-emerald-500/15 rounded-full"
          />
          {/* Inner crop image */}
          <div className="w-full h-full rounded-full overflow-hidden relative">
            <img 
              src="/src/assets/images/cellular_hero_banner_1780065823241.png"
              alt="Cellular fluorescent scan slide"
              className="w-full h-full object-cover scale-110 saturate-[0.7] brightness-[0.7]"
              referrerPolicy="no-referrer"
            />
            {/* Blending vignette overlay */}
            <div className="absolute inset-0 bg-radial-gradient opacity-60" style={{ background: 'radial-gradient(circle, transparent 40%, #ededeb 100%)', mixBlendMode: 'multiply' }} />
          </div>
          {/* HUD Overlay Labels */}
          <div className="absolute inset-4 flex flex-col justify-between p-1.5 text-[7px] md:text-[8px] font-mono text-[#10B981]/50 leading-none">
            <div className="flex justify-between items-start">
              <span>PRE_SCAN: FLUOR_X01</span>
              <span>MAG: 12,000X</span>
            </div>
            <div className="flex justify-between items-end">
              <span>GFP_EMERALD_DYE</span>
              <span>COORDS: X844_Y120</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lens 2: GFP Petri Agar Culture Scan (mid-left behind Research/Skills) */}
      <div className="absolute top-[168vh] -left-[10%] md:-left-[4%] w-[250px] h-[250px] md:w-[380px] md:h-[380px] select-none pointer-events-none opacity-[0.07] md:opacity-[0.12] transition-all duration-700 hover:opacity-[0.20] z-0">
        <div className="relative w-full h-full rounded-full border border-emerald-500/10 p-1.5 overflow-hidden flex items-center justify-center">
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 65, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[1px] border border-dashed border-emerald-500/15 rounded-full"
          />
          <div className="w-full h-full rounded-full overflow-hidden relative">
            <img 
              src="/src/assets/images/petri_dish_culture_1780065844731.png"
              alt="Cell culture petri microscopy scan"
              className="w-full h-full object-cover scale-110 saturate-[0.7] brightness-[0.7]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-radial-gradient opacity-60" style={{ background: 'radial-gradient(circle, transparent 40%, #ededeb 100%)', mixBlendMode: 'multiply' }} />
          </div>
          <div className="absolute inset-4 flex flex-col justify-between p-1.5 text-[7px] md:text-[8px] font-mono text-[#10B981]/50 leading-none">
            <div className="flex justify-between items-start">
              <span>PLATE_SCAN: SEC_D7</span>
              <span>MAG: 4,000X</span>
            </div>
            <div className="flex justify-between items-end">
              <span>VIABILITY: 98.4%</span>
              <span>COORDS: X120_Y984</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lens 3: Double Helix Macromolecule (near bottom-right behind contact) */}
      <div className="absolute top-[282vh] right-[2%] md:right-[6%] w-[240px] h-[240px] md:w-[360px] md:h-[360px] select-none pointer-events-none opacity-[0.08] md:opacity-[0.13] transition-all duration-700 hover:opacity-[0.21] z-0">
        <div className="relative w-full h-full rounded-full border border-emerald-500/10 p-1.5 overflow-hidden flex items-center justify-center">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 75, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[1px] border border-dashed border-emerald-500/15 rounded-full"
          />
          <div className="w-full h-full rounded-full overflow-hidden relative">
            <img 
              src="/src/assets/images/dna_double_helix_1780065864560.png"
              alt="DNA scanning visualization"
              className="w-full h-full object-cover scale-110 saturate-[0.7] brightness-[0.7]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-radial-gradient opacity-60" style={{ background: 'radial-gradient(circle, transparent 40%, #ededeb 100%)', mixBlendMode: 'multiply' }} />
          </div>
          <div className="absolute inset-4 flex flex-col justify-between p-1.5 text-[7px] md:text-[8px] font-mono text-[#10B981]/50 leading-none">
            <div className="flex justify-between items-start">
              <span>HELIX_SCAN: DET_03</span>
              <span>MAG: 45,000X</span>
            </div>
            <div className="flex justify-between items-end">
              <span>REPLICON_MATRIX</span>
              <span>COORDS: X442_Y302</span>
            </div>
          </div>
        </div>
      </div>

      {CELLS_DATA.map((cell) => {
        // Base width of elements
        const baseWidth = cell.scale * 100;

        return (
          <motion.div
            key={cell.id}
            initial={{ 
              x: `calc(${cell.x} + 0px)`, 
              y: `calc(${cell.y} + 0px)`, 
              rotate: cell.rotation,
              opacity: cell.opacity
            }}
            animate={{
              x: [
                `calc(${cell.x} - 0px)`,
                `calc(${cell.x} + ${cell.driftX}px)`,
                `calc(${cell.x} - ${cell.driftX / 2}px)`,
                `calc(${cell.x} - 0px)`
              ],
              y: [
                `calc(${cell.y} - 0px)`,
                `calc(${cell.y} + ${cell.driftY}px)`,
                `calc(${cell.y} + ${cell.driftY / 3}px)`,
                `calc(${cell.y} - 0px)`
              ],
              rotate: [
                cell.rotation,
                cell.rotation + 45,
                cell.rotation - 30,
                cell.rotation
              ],
              scale: [
                1,
                1.04,
                0.97,
                1
              ]
            }}
            transition={{
              duration: cell.duration,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              position: 'absolute',
              width: `${baseWidth}px`,
              height: `${baseWidth * 0.75}px`,
              filter: cell.blur,
              willChange: 'transform',
            }}
          >
            {/* Inner pulsing respiration layer */}
            <motion.div
              animate={{
                opacity: [0.75, 1, 0.75],
                scale: [0.97, 1.03, 0.97],
              }}
              transition={{
                duration: cell.pulseSpeed,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-full h-full"
            >
              {getShape(cell.shape, cell.color)}
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
