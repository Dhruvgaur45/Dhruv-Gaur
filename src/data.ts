import { Skill, Certification, BiotechProject } from './types';

export const SKILLS: Skill[] = [
  {
    id: 'ai-advanced-computing',
    category: 'AI & Advanced Computing',
    title: 'AI Infrastructure & Advanced Computing',
    description: 'Engineering intelligent software stacks, high-performance compute clusters, neural architecture parameters, and state-of-the-art semiconductor photonic processor layouts.',
    iconName: 'cpu',
    tags: [
      'Generative AI',
      'Artificial Intelligence (AI)',
      'Neural Networks',
      'Machine Learning Fundamentals',
      'AI Infrastructure',
      'High Performance Computing (HPC)',
      'Optical Computing',
      'Photonic Computing',
      'Photonics Processors',
      'Semiconductor Process Technology',
      'Data Center Technologies',
      'Emerging Technologies',
      'Python (Programming Language)',
      'HTML',
      'AutoCAD'
    ]
  },
  {
    id: 'biotech-healthcare',
    category: 'Biotechnology & Healthcare',
    title: 'Biomolecular Engineering & Life Sciences',
    description: 'Investigating complex biological systems, cancer genetics pathways, molecular biology sequences, cell line culture environments, and target therapeutic medicine.',
    iconName: 'flask',
    tags: [
      'Biotechnology',
      'Bioinformatics',
      'Bioengineering',
      'Medicine',
      'Cancer Research',
      'Biomedical Research',
      'Biomedical Applications',
      'Molecular Biology',
      'Cell Biology',
      'Biology',
      'Biochemistry',
      'Cell Culture',
      'Human Physiology Knowledge',
      'Understanding of Healthcare Sciences',
      'Life Sciences',
      'Environmental Science',
      'Biology Fundamentals'
    ]
  },
  {
    id: 'research-lab-ops',
    category: 'Research & Laboratory Operations',
    title: 'Laboratory Techniques & Precise Data Analytics',
    description: 'Designing high-accuracy PCR dilutions, microplate layout indices, clinical raw data calculators, and cross-functional quality control frameworks conforming to GLP.',
    iconName: 'wrench',
    tags: [
      'Laboratory Techniques',
      'Laboratory Skills',
      'Good Laboratory Practice (GLP)',
      'Data Analysis',
      'Biostatistics',
      'Analytical Skills',
      'Scientific Calculations',
      'Research Skills',
      'Research & Analysis',
      'Cross-Functional Analysis',
      'Engineering'
    ]
  },
  {
    id: 'leadership-academia',
    category: 'Leadership & Academic Programs',
    title: 'Interdisciplinary Instruction & Program Management',
    description: 'Driving complex academic research workflows and multi-stakeholder project milestones with structured communication mechanisms and pedagogical methods.',
    iconName: 'shield',
    tags: [
      'Team Leadership',
      'Project Management',
      'Leadership',
      'Public Speaking',
      'Group Discussion',
      'Documentation Skills',
      'Presentation Skills',
      'Scientific Presentation',
      'Interdisciplinary Teaching',
      'Higher Education',
      'Mathematics Education',
      'Research-Based Learning Approach',
      'Problem Solving',
      'Time Management',
      'Disciplinaries',
      'Social Sciences',
      'English',
      'French',
      'Hindi'
    ]
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'google-ai-fluency',
    title: 'AI Fluency for Students',
    issuer: 'Google Certifications',
    provider: 'Google AI Academy',
    description: 'Accreditation verifying 4D AI Fluency, foundational prompt design, and deploying puzzle / game ecosystems powered by Gemini models.',
    iconName: 'shield'
  },
  {
    id: 'sharda-research',
    title: 'Academic Bio-Research Excellence',
    issuer: 'Professional Presentation & Methodologies',
    provider: 'Sharda University, Greater Noida',
    description: 'Academic studies and biomedical research skills across molecular biology, biochemistry, GLP bench operations, and scientific presentations.',
    iconName: 'flask'
  },
  {
    id: 'google-ux',
    title: 'Google UX Design',
    issuer: 'Professional Certificate',
    provider: 'Coursera',
    description: 'Computational user research, responsive vector blueprinting, high-density plate-planning wireframes, and design interaction principles.',
    iconName: 'shield'
  }
];

export const PROJECTS: BiotechProject[] = [
  {
    id: 'proj-sequencer',
    title: 'NucleoWave Sequence Map',
    subtitle: 'DNA / mRNA Sequence Real-Time Translation & GC Analyzer',
    description: 'Interactive computational biology interface that translates codonic tables, calculates GC skew coefficients, and flags genetic insertion mutations.',
    longDescription: 'A high-throughput sequence mapping interface that models custom genetic fragments. It allows quick mutation tracking and provides dynamic visualizations of ribosomal translation steps.',
    iconName: 'dna',
    tagline: 'GENOMICS ANALYSIS',
    tags: ['Codon translation', 'GC Skew', 'Mutation flags', 'Interactive base map'],
    scientificMetric: 'Ribosomal Translation Rate: 20 bases/sec',
    interactiveType: 'sequencer',
    lifecycle: 'Stable'
  },
  {
    id: 'proj-bioreactor',
    title: 'OmniVessel IoT Telemetry',
    subtitle: 'Automated Bioreactor Culture Vessel Control Interface',
    description: 'An interactive physical computing dashboard visualizing real-time vessel states, pH spikes, agitation setpoint controls, and critical telemetry warning systems.',
    longDescription: 'A custom IoT control board visualizing critical bioreactor parameters. It helps lab operators maintain microbial or mammalian cell lines within strict optimal curves via precise actuation triggers.',
    iconName: 'terminal',
    tagline: 'PROCESS ENGINEERING',
    tags: ['PID setpoints', 'Real-time telemetry', 'Anomalous event logs', 'SVG visualizers'],
    scientificMetric: 'Culture Viability Index: 98.4%',
    interactiveType: 'bioreactor',
    lifecycle: 'Beta'
  },
  {
    id: 'proj-lims',
    title: 'LIMS Plate Mapper 96',
    subtitle: '96-Well Plate Storage Assay Grid & Sample Chain-of-Custody',
    description: 'Dynamic assay visualizer displaying well dilutions, temperature safety gradients, sample barcodes, and high-content screening plate mapping.',
    longDescription: 'High-density microplate software used to catalog PCR mixtures, barcode batches, and manage cold-room storage shelf indices recursively.',
    iconName: 'gauge',
    tagline: 'LAB AUTOMATION',
    tags: ['96-Well layouts', 'Assay dilutions', 'Barcode validation', 'Interactive CSV Export'],
    scientificMetric: 'Assay Precision: CV < 2.3%',
    interactiveType: 'lims',
    lifecycle: 'Alpha'
  }
];
