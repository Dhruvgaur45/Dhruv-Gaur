import React from 'react';
import { motion } from 'motion/react';
import { Dna, Sparkles } from 'lucide-react';

interface Section3DTransitionProps {
  label?: string;
  code?: string;
}

export default function Section3DTransition({ label, code }: Section3DTransitionProps) {
  return (
    <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 py-8 flex items-center justify-between pointer-events-none select-none opacity-30 dark:opacity-50">
      <div className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00F2FE] animate-ping" />
        <div className="h-[1px] w-16 sm:w-32 bg-gradient-to-r from-[#00F2FE] to-transparent" />
      </div>
      {label && (
        <div className="flex items-center gap-2 text-[9px] font-mono tracking-widest text-[#00F2FE] uppercase font-bold">
          <Dna className="w-3 h-3" />
          <span>{label}</span>
          {code && <span className="text-white/40">[{code}]</span>}
        </div>
      )}
      <div className="flex items-center gap-2">
        <div className="h-[1px] w-16 sm:w-32 bg-gradient-to-l from-[#10B981] to-transparent" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
      </div>
    </div>
  );
}
