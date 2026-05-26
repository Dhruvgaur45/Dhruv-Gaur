import React, { useState, useMemo } from 'react';
import { Dna, RefreshCw, AlertTriangle, Cpu, HelpCircle, CheckCircle } from 'lucide-react';

interface DNASequencerProps {
  scientificMetric: string;
}

// Sample gene sequences
const SAMPLES = [
  {
    name: "Human Insulin (INS)",
    sequence: "ATGGCCCTGTGGATGCGCCTCCTGCCCCTGCTGGCGCTGCTGGCCCTCTGGGGACCTGACCCAGCCGCAGCCTTTGTGAACCAACACCTGTGCGGCTCACACCTGGTGGAAGCTCTCTACCTAGTGTGCGGGGAACGAGGCTTCTTCTACACACCCAAGACCCGCCGGGAGGCAGAGGACCTGCAGGGTGAGCCAACCGCCCATTGCTGCTCAG",
    description: "Partial Homo sapiens insulin (INS) gene coding sequence."
  },
  {
    name: "Green Fluorescent Protein (GFP)",
    sequence: "ATGAGTAAAGGAGAAGAACTTTTCACTGGAGTTGTCCCAATTCTTGTTGAATTAGATGGTGATGTTAATGGGCACAAATTTTCTGTCAGTGGAGAGGGTGAAGGTGATGCAACATACGGAAAACTTACCCTTAAATTTATTTGCACTACTGGAAAACTACCTGTTCCATGGCCAACACTTGTCACTACTTTCTCTTATGGTGTTCAATGCTTTT",
    description: "Aequorea victoria jellyfish green fluorescent protein gene for bio-tagging."
  },
  {
    name: "SARS-CoV-2 Spike Gene (Partial)",
    sequence: "ATGTTTGTTTTTCTTGTTTTATTGCCACTAGTCTCTAGTCAGTGTGTTAATCTTACAACCAGAACTCAATTACCCCCTGCATACACTAATTCTTTCACACGTGGTGTTTATTACCCTGACAAAGTTTTCAGATCCTCAGTTTTACATTCAACTCAGGACTTGTTCTTACCTTTCTTTTCCAATGTTACTTGGTTCCATGCTATACATGTCTCT",
    description: "Spike glycoprotein sequence responsible for cell attachment."
  }
];

// Codon to Amino Acid lookup
const CODON_MAP: Record<string, string> = {
  ATG: 'Met', TGG: 'Trp',
  TTT: 'Phe', TTC: 'Phe', TTA: 'Leu', TTG: 'Leu',
  CTT: 'Leu', CTC: 'Leu', CTA: 'Leu', CTG: 'Leu',
  ATT: 'Ile', ATC: 'Ile', ATA: 'Ile',
  GTT: 'Val', GTC: 'Val', GTA: 'Val', GTG: 'Val',
  TCT: 'Ser', TCC: 'Ser', TCA: 'Ser', TCG: 'Ser',
  CCT: 'Pro', CCC: 'Pro', CCA: 'Pro', CCG: 'Pro',
  ACT: 'Thr', ACC: 'Thr', ACA: 'Thr', ACG: 'Thr',
  GCT: 'Ala', GCC: 'Ala', GCA: 'Ala', GCG: 'Ala',
  TAT: 'Tyr', TAC: 'Tyr', TAA: 'STOP', TAG: 'STOP',
  CAT: 'His', CAC: 'His', CAA: 'Gln', CAG: 'Gln',
  AAT: 'Asn', AAC: 'Asn', AAA: 'Lys', AAG: 'Lys',
  GAT: 'Asp', GAC: 'Asp', GAA: 'Glu', GAG: 'Glu',
  TGT: 'Cys', TGC: 'Cys', TGA: 'STOP',
  CGT: 'Arg', CGC: 'Arg', CGA: 'Arg', CGG: 'Arg',
  AGT: 'Ser', AGC: 'Ser', AGA: 'Arg', AGG: 'Arg',
  GGT: 'Gly', GGC: 'Gly', GGA: 'Gly', GGG: 'Gly'
};

export default function DNASequencer({ scientificMetric }: DNASequencerProps) {
  const [selectedSample, setSelectedSample] = useState(0);
  const [sequence, setSequence] = useState(SAMPLES[0].sequence);
  const [editMode, setEditMode] = useState(false);
  const [customInput, setCustomInput] = useState('');
  const [mutationIndex, setMutationIndex] = useState<number | null>(null);

  // Parse and sanitize sequence - only allow ATCG
  const cleanedSequence = useMemo(() => {
    return sequence.toUpperCase().replace(/[^ATCG]/g, '');
  }, [sequence]);

  // Statistics
  const stats = useMemo(() => {
    const len = cleanedSequence.length;
    if (len === 0) return { gcContent: 0, aCount: 0, tCount: 0, cCount: 0, gCount: 0, codons: [] };

    let a = 0, t = 0, c = 0, g = 0;
    for (let char of cleanedSequence) {
      if (char === 'A') a++;
      if (char === 'T') t++;
      if (char === 'C') c++;
      if (char === 'G') g++;
    }

    const gcContent = ((c + g) / len) * 100;

    // Split into codons (groups of 3)
    const codons: string[] = [];
    for (let i = 0; i < len; i += 3) {
      if (i + 3 <= len) {
        codons.push(cleanedSequence.substring(i, i + 3));
      }
    }

    return {
      gcContent,
      aCount: a,
      tCount: t,
      cCount: c,
      gCount: g,
      codons
    };
  }, [cleanedSequence]);

  // Translate codons to Amino Acids list
  const aminoAcidsList = useMemo(() => {
    return stats.codons.map(codon => {
      return {
        codon,
        aa: CODON_MAP[codon] || '???'
      };
    });
  }, [stats.codons]);

  const handleSelectSample = (index: number) => {
    setSelectedSample(index);
    setSequence(SAMPLES[index].sequence);
    setEditMode(false);
    setMutationIndex(null);
  };

  const handleMutateBase = (index: number) => {
    const BASES = ['A', 'T', 'C', 'G'];
    const currentBase = cleanedSequence[index];
    const currentIndex = BASES.indexOf(currentBase);
    const nextIndex = (currentIndex + 1) % BASES.length;
    const nextBase = BASES[nextIndex];

    const updatedSeq = cleanedSequence.substring(0, index) + nextBase + cleanedSequence.substring(index + 1);
    setSequence(updatedSeq);
    setMutationIndex(index);

    // Dynamic reset highlight after 1.5s
    setTimeout(() => {
      setMutationIndex(null);
    }, 1500);
  };

  const handleApplyCustom = () => {
    const sanitized = customInput.toUpperCase().replace(/[^ATCG]/g, '');
    if (sanitized.length < 9) {
      alert("Please enter a valid DNA sequence containing at least 9 base pairs (A, T, C, G).");
      return;
    }
    setSequence(sanitized);
    setEditMode(false);
    setMutationIndex(null);
  };

  return (
    <div className="bg-brand-surface rounded-xl border border-brand-border overflow-hidden shadow-2xl">
      {/* Header bar */}
      <div className="bg-brand-surface-card px-5 py-4 border-b border-brand-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 items-center justify-center flex bg-brand-accent/15 rounded text-brand-accent border border-brand-accent/25">
            <Dna className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h4 className="font-display font-semibold text-brand-text tracking-wide text-sm">NUCLEOWAVE GENOMICS ANALYZER v1.0</h4>
            <p className="text-xs text-brand-text-muted font-mono">{scientificMetric}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          {SAMPLES.map((s, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectSample(idx)}
              className={`px-3 py-1.5 rounded-sm font-mono transition-all ${
                selectedSample === idx && !editMode 
                  ? 'bg-brand-accent text-brand-bg font-semibold' 
                  : 'bg-brand-bg/50 text-brand-text hover:bg-brand-bg md:border border-brand-border/40 hover:border-brand-accent/30'
              }`}
            >
              {idx === 0 ? 'INS' : idx === 1 ? 'GFP' : 'CV2'}
            </button>
          ))}
          <button
            onClick={() => {
              setEditMode(true);
              setCustomInput(cleanedSequence);
            }}
            className={`px-3 py-1.5 rounded-sm font-mono transition-all ${
              editMode 
                ? 'bg-amber-400 text-brand-bg font-semibold' 
                : 'bg-brand-bg/50 text-brand-text hover:bg-brand-bg md:border border-brand-border/40 hover:border-amber-400/30'
            }`}
          >
            CUSTOM_EDIT
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Sample Description or Input area */}
        {editMode ? (
          <div className="bg-brand-bg/80 p-4 rounded-lg border border-amber-400/20 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-amber-400 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" /> INPUT SEQUENCING REGISTER
              </span>
              <span className="text-2xs font-mono text-brand-text-muted">A,T,C,G characters allowed</span>
            </div>
            <textarea
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value.toUpperCase().replace(/[^ATCG]/g, ''))}
              placeholder="Enter ATCG code stream..."
              rows={4}
              className="w-full bg-brand-surface border border-brand-border rounded p-3 text-brand-accent font-mono text-sm tracking-wider focus:outline-none focus:ring-1 focus:ring-amber-400"
            />
            <div className="flex justify-end gap-2 text-xs font-mono">
              <button 
                onClick={() => setEditMode(false)}
                className="px-4 py-2 hover:bg-brand-surface text-brand-text rounded transition-all"
              >
                CANCEL
              </button>
              <button 
                onClick={handleApplyCustom}
                className="px-4 py-2 bg-amber-400 text-brand-bg font-semibold rounded hover:bg-amber-300 transition-all shadow-md shadow-amber-400/10"
              >
                COMPILE SEQUENCE
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-brand-bg/50 p-4 rounded-lg border border-brand-border/80">
            <h5 className="text-brand-text font-semibold text-xs font-mono flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
              ACTIVE STRAND: {SAMPLES[selectedSample].name}
            </h5>
            <p className="text-xs text-brand-text-muted mt-1 leading-relaxed">
              {SAMPLES[selectedSample].description}
            </p>
          </div>
        )}

        {/* GC Analysis Charts and ratios */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-brand-bg p-4 rounded-lg border border-brand-border flex flex-col justify-between">
            <span className="text-2xs font-mono text-brand-text-muted select-none">SEQ_LENGTH</span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-display font-semibold text-brand-text">{cleanedSequence.length}</span>
              <span className="text-xs font-mono text-brand-text-muted">bp</span>
            </div>
            <div className="mt-2 text-2xs font-mono text-brand-accent/70">
              Double stranded map
            </div>
          </div>

          <div className="bg-brand-bg/40 p-4 rounded-lg border border-brand-border flex flex-col justify-between">
            <span className="text-2xs font-mono text-brand-text-muted select-none">GC_CONTENT</span>
            <div className="mt-2">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-display font-medium text-brand-accent">{stats.gcContent.toFixed(1)}</span>
                <span className="text-xs font-mono text-brand-accent">%</span>
              </div>
              <div className="w-full bg-brand-border h-1.5 rounded-full mt-2 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${
                    stats.gcContent > 60 ? 'bg-indigo-400' : stats.gcContent < 40 ? 'bg-amber-400' : 'bg-emerald-400'
                  }`} 
                  style={{ width: `${stats.gcContent}%` }}
                />
              </div>
            </div>
          </div>

          <div className="bg-brand-bg/40 p-4 rounded-lg border border-brand-border flex flex-col justify-between md:col-span-2">
            <span className="text-2xs font-mono text-brand-text-muted select-none">NUCLEOTIDE_DISTRIBUTION RATIO</span>
            <div className="mt-2 grid grid-cols-4 gap-2 text-center font-mono text-xs">
              <div className="bg-brand-surface p-1.5 rounded border border-brand-border/50">
                <p className="text-[10px] text-red-500 font-bold">A</p>
                <p className="font-bold text-brand-text mt-0.5">{stats.aCount}</p>
              </div>
              <div className="bg-brand-surface p-1.5 rounded border border-brand-border/50">
                <p className="text-[10px] text-sky-600 font-bold">T</p>
                <p className="font-bold text-brand-text mt-0.5">{stats.tCount}</p>
              </div>
              <div className="bg-brand-surface p-1.5 rounded border border-brand-border/50">
                <p className="text-[10px] text-amber-600 font-bold">C</p>
                <p className="font-bold text-brand-text mt-0.5">{stats.cCount}</p>
              </div>
              <div className="bg-brand-surface p-1.5 rounded border border-brand-border/50">
                <p className="text-[10px] text-emerald-600 font-bold">G</p>
                <p className="font-bold text-brand-text mt-0.5">{stats.gCount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sequence Base-Pair Map Grid */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-brand-text-muted flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" /> CHROMATOGRAM SEQUINCING REGISTER (3' - 5')
            </span>
            <span className="font-mono text-2xs text-brand-accent italic">Click bases to induce point mutations</span>
          </div>
          <div className="bg-brand-bg/60 rounded-lg border border-brand-border/80 p-4 h-48 overflow-y-auto font-mono scrollbar-thin">
            <div className="flex flex-wrap gap-1.5">
              {cleanedSequence.split('').map((base, idx) => {
                let colorClass = 'bg-brand-surface text-brand-text border-brand-border';
                if (base === 'A') colorClass = 'bg-red-500/15 text-red-700 border-red-500/30';
                if (base === 'T') colorClass = 'bg-sky-500/15 text-sky-700 border-sky-500/30';
                if (base === 'C') colorClass = 'bg-amber-500/15 text-amber-700 border-amber-500/30';
                if (base === 'G') colorClass = 'bg-emerald-500/15 text-emerald-700 border-emerald-500/30';

                const isMutatedNow = mutationIndex === idx;

                return (
                  <button
                    key={idx}
                    onClick={() => handleMutateBase(idx)}
                    className={`w-7 h-7 flex items-center justify-center text-xs font-semibold rounded border transition-all duration-300 cursor-pointer ${colorClass} ${
                      isMutatedNow ? 'scale-125 ring-2 ring-brand-accent z-10 spin-once' : 'hover:scale-110 active:scale-95'
                    }`}
                    title={`Position ${idx + 1}: Click to mutate`}
                  >
                    {base}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Translation: Peptide Chain Assembly */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-mono text-brand-text-muted flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-brand-accent" /> RIBOSOMAL PEPTIDE CODON MAP (mRNA TRANSLATION)
            </span>
            <span className="font-mono text-[10px] text-brand-text-muted bg-brand-bg px-2 py-0.5 rounded">
              {stats.codons.length} Amino Acids Translated
            </span>
          </div>
          <div className="bg-brand-bg/40 rounded-lg border border-brand-border p-4 h-32 overflow-x-auto whitespace-nowrap scrollbar-thin">
            <div className="inline-flex gap-2">
              {aminoAcidsList.slice(0, 42).map((item, idx) => {
                const isStop = item.aa === 'STOP';
                const isStart = item.aa === 'Met';
                return (
                  <div 
                    key={idx} 
                    className={`inline-flex flex-col items-center justify-between p-2 rounded-md border w-14 h-20 font-mono transition-all duration-300 ${
                      isStop 
                        ? 'bg-red-50 border-red-300 text-red-600' 
                        : isStart 
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-600' 
                        : 'bg-brand-surface border-brand-border/80 text-brand-text-muted'
                    }`}
                  >
                    <span className="text-[10px] text-brand-text-muted">#{idx + 1}</span>
                    <span className="text-xs font-bold text-brand-text">{item.codon}</span>
                    <span className={`text-[10px] font-bold ${isStop ? 'text-red-600 animate-pulse' : isStart ? 'text-emerald-600' : 'text-brand-accent'}`}>
                      {item.aa}
                    </span>
                  </div>
                );
              })}
              {aminoAcidsList.length > 42 && (
                <div className="inline-flex items-center justify-center px-4 rounded-md border border-dashed border-brand-border bg-brand-surface/20 w-16 h-20 text-xs font-mono text-brand-text-muted text-center leading-tight">
                  +{aminoAcidsList.length - 42}<br/>more
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
