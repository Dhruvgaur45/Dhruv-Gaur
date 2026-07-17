import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles, Compass, AlertCircle } from 'lucide-react';
import Logo from './Logo';

interface WelcomeAnimationProps {
  onComplete: () => void;
}

export default function WelcomeAnimation({ onComplete }: WelcomeAnimationProps) {
  const [secondsRemaining, setSecondsRemaining] = useState(10);
  const totalSeconds = 10;
  const onCompleteRef = useRef(onComplete);

  // Keep ref up to date
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Handle skip action with session storage save
  const handleSkip = () => {
    try {
      sessionStorage.setItem('hasSeenWelcome', 'true');
    } catch {
      // Storage unavailable helper
    }
    document.body.style.overflow = '';
    onCompleteRef.current();
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    // Timer countdown
    const countdownTimer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(countdownTimer);
          setTimeout(() => {
            handleSkip();
          }, 100);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(countdownTimer);
      document.body.style.overflow = '';
    };
  }, []);

  // Compute percentage progress for SVG indicator
  const progressRatio = secondsRemaining / totalSeconds;
  const strokeDashoffset = 113 * (1 - progressRatio); // circumference of r=18 is ~113

  // Background floating cellular elements
  const floatingCells = [
    { id: 1, x: "15%", y: "20%", size: 60, delay: 0, speed: 8 },
    { id: 2, x: "85%", y: "25%", size: 45, delay: 1, speed: 10 },
    { id: 3, x: "75%", y: "80%", size: 70, delay: 2, speed: 12 },
    { id: 4, x: "20%", y: "75%", size: 50, delay: 3, speed: 9 },
    { id: 5, x: "50%", y: "15%", size: 40, delay: 0.5, speed: 11 },
  ];

  return (
    <div 
      className="fixed inset-0 z-[9999] bg-[#03001C] flex flex-col items-center justify-between p-6 sm:p-10 md:p-14 overflow-hidden select-none font-sans text-white"
      id="welcome-splash-root"
    >
      {/* Dynamic Luminous Gradient Backdrops */}
      <div className="absolute top-[15%] left-[10%] w-[350px] h-[350px] bg-[#00F2FE]/[0.12] rounded-full blur-[110px] pointer-events-none animate-pulse duration-[8000ms]" />
      <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] bg-[#39FF14]/[0.08] rounded-full blur-[130px] pointer-events-none animate-pulse duration-[9000ms]" />
      <div className="absolute top-[45%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#00F2FE]/[0.06] rounded-full blur-[140px] pointer-events-none" />

      {/* Floating Microcellular Biotech Nodes */}
      {floatingCells.map((cell) => (
        <motion.div
          key={cell.id}
          className="absolute rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-[2px] shadow-[0_4px_12px_rgba(0,242,254,0.05)] flex items-center justify-center pointer-events-none"
          style={{
            left: cell.x,
            top: cell.y,
            width: cell.size,
            height: cell.size,
          }}
          animate={{
            y: [0, -18, 0],
            scale: [1, 1.05, 1],
            rotate: [0, 15, 0]
          }}
          transition={{
            duration: cell.speed,
            repeat: Infinity,
            delay: cell.delay,
            ease: "easeInOut"
          }}
        >
          {/* Inner ring to look like standard biotech cells under lens */}
          <div className="w-1/2 h-1/2 rounded-full border border-[#39FF14]/15 bg-gradient-to-tr from-[#39FF14]/5 to-transparent flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-[#00F2FE]/20" />
          </div>
        </motion.div>
      ))}

      {/* Tech grid mesh subtle styling overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[linear-gradient(to_right,#00F2FE_1px,transparent_1px),linear-gradient(to_bottom,#00F2FE_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* TOP HEADER: Countdown & Skip Action */}
      <div className="w-full max-w-5xl flex items-center justify-between z-20">
        {/* Portal Telemetry State Description */}
        <div className="flex items-center gap-2 bg-[#0A0724]/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 shadow-lg">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#39FF14] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#39FF14]"></span>
          </span>
          <span className="font-mono text-[9px] tracking-widest text-[#8E9BB0] font-black uppercase">
            SECURE ACCESS DESK
          </span>
        </div>

        {/* Skip action with modern radial timer circle */}
        <button
          onClick={handleSkip}
          className="group flex items-center gap-3 bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 pl-4 pr-3.5 py-2 rounded-full backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_20px_rgba(0,242,254,0.15)] text-white transition-all duration-300 cursor-pointer active:scale-95"
          id="skip-welcome-animation"
        >
          <span className="font-mono text-[10px] md:text-[11px] font-black uppercase tracking-[0.15em] transition-transform duration-300 group-hover:-translate-x-0.5">
            SKIP INTRO
          </span>

          <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white/5 group-hover:bg-white/10 shadow-sm transition-all duration-300">
            {/* Countdown SVG Circle Progress */}
            <svg className="w-full h-full -rotate-90">
              <circle
                cx="16"
                cy="16"
                r="13"
                className="stroke-white/10"
                strokeWidth="2.5"
                fill="transparent"
              />
              <motion.circle
                cx="16"
                cy="16"
                r="13"
                className="stroke-[#00F2FE]"
                strokeWidth="2.5"
                fill="transparent"
                strokeDasharray="81.68" // 2 * PI * r (circumference)
                animate={{ strokeDashoffset: [81.68, 0] }}
                transition={{ duration: totalSeconds, ease: "linear" }}
              />
            </svg>
            <span className="absolute font-mono text-[10px] font-black text-[#00F2FE] group-hover:text-white leading-none">
              {secondsRemaining}
            </span>
          </div>
        </button>
      </div>

      {/* MAIN CENTER PIECE: Centered Brand, Logo, & Luxury UI */}
      <div className="flex flex-col items-center justify-center flex-grow w-full max-w-xl text-center z-10 py-10">
        
        {/* Frosted Luxury Container with Double Ring */}
        <motion.div
          initial={{ opacity: 0, y: 15, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full p-8 md:p-12 rounded-[2.5rem] bg-[#0A0724]/45 backdrop-blur-2xl border border-white/10 shadow-[0_24px_70px_rgba(0,242,254,0.06)] overflow-hidden"
        >
          {/* Inner ambient glowing core behind logo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#00F2FE]/5 rounded-full blur-[40px] pointer-events-none" />

          {/* Styled Animated Rings around logo to emphasize biotechnology */}
          <div className="relative flex items-center justify-center w-40 h-40 mx-auto mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-dashed border-[#00F2FE]/20"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[10px] rounded-full border border-[#39FF14]/25"
            />
            
            {/* SVG Logo mark (DNA Emblem) centered inside */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              className="relative z-10 flex items-center justify-center w-28 h-28 bg-[#03001C]/80 backdrop-blur-md rounded-full shadow-[0_8px_30px_rgba(0,242,254,0.12)] border border-white/10"
            >
              <Logo variant="mark-only" size={75} />
            </motion.div>
          </div>

          {/* Title Pairing */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="space-y-3"
          >
            <h1 className="font-display text-3xl md:text-4xl font-extrabold tracking-[0.2em] uppercase bg-gradient-to-r from-white via-cyan-400 to-white bg-clip-text text-transparent px-2 leading-none">
              DHRUV GAUR
            </h1>
            
            <div className="flex items-center justify-center gap-3">
              <div className="h-[1px] w-6 bg-gradient-to-r from-transparent to-[#00F2FE]" />
              <p className="text-[#39FF14] font-mono text-[10px] md:text-[11px] font-black uppercase tracking-[0.38em] whitespace-nowrap">
                BIOTECHNOLOGY PORTFOLIO
              </p>
              <div className="h-[1px] w-6 bg-gradient-to-l from-transparent to-[#00F2FE]" />
            </div>
          </motion.div>

          {/* Luxury Welcome Description Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-6 text-xs md:text-sm text-[#8E9BB0] font-medium leading-relaxed max-w-sm mx-auto"
          >
            Welcome to the interface of clinical engineering, bioinformatics sequencing, & high-precision laboratory telemetry diagnostics.
          </motion.div>

          {/* Interactive Entry Pulse Line */}
          <div className="mt-8 flex justify-center">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F2FE] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00F2FE]"></span>
            </span>
          </div>

        </motion.div>
      </div>

      {/* FOOTER: Portal Metadata & copyright details */}
      <div className="w-full max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4 z-20 pt-6 border-t border-white/5">
        <span className="font-mono text-[9px] tracking-widest text-[#8E9BB0] uppercase">
          © {new Date().getFullYear()} DHRUV GAUR • ALL RIGHTS RESERVED
        </span>
        <div className="flex items-center gap-4 text-[9px] font-mono text-white/40">
          <span className="flex items-center gap-1.5"><Sparkles className="w-3 h-3 text-[#39FF14]" /> BIOLOGICAL SYNAPSE GRID</span>
          <span className="h-2 w-[1px] bg-white/10" />
          <span>STABLE PROTOCOL 1.0</span>
        </div>
      </div>
    </div>
  );
}
