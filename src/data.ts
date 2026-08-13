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
    id: 'ngs-learning',
    title: 'NGS / RNA-seq Learning Projects',
    subtitle: 'Reference-Based Gene Expression Alignment Pipeline',
    description: 'Foundational Next-Generation Sequencing workflows mapping read counts, aligning reference transcriptomes, and running differential gene expression (DGE) pipelines.',
    longDescription: 'Implemented pre-processing sequence quality checks using FastQC, multi-threaded alignment via STAR against reference genomes, and detailed gene expression quantifications. Used R/DESeq2 for identifying key biological regulation pathways.',
    iconName: 'book',
    tagline: 'GENOMICS COMPILING',
    tags: ['RNA-seq', 'Next-Gen Sequencing', 'FastQC', 'DESeq2 Alignment', 'DGE analysis'],
    scientificMetric: 'Q30 Base Score Quality: >96.8%',
    lifecycle: 'Completed',
    stage: 1,
    githubUrl: 'https://github.com/Dhruvgaur45/Dhruv-Gaur',
    liveUrl: '#'
  },
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
    lifecycle: 'Stable',
    stage: 2,
    githubUrl: 'https://github.com/Dhruvgaur45/Dhruv-Gaur',
    liveUrl: '#'
  },
  {
    id: 'proj-patient-monitor',
    title: 'AI-Powered Patient Vital Monitor',
    subtitle: 'Intelligent Real-Time Anomaly Detection & Clinical Alerts',
    description: 'An AI-powered patient monitoring system that parses live physiological streams (ECG, SpO2, Heart Rate) to predict clinical deterioration.',
    longDescription: 'Processes continuous multi-channel patient vitals with light-weight LSTM recurrent neural network models to flag impending vasoactive crises. Features real-time visual streams and secure clinical telemetry feeds.',
    iconName: 'cpu',
    tagline: 'HEALTHCARE INNOVATION',
    tags: ['LSTM Recurrent Nets', 'Patient Vitals', 'Signal Processing', 'Predictive Alerting'],
    scientificMetric: 'Crisis Warning Lead Time: 45 min',
    lifecycle: 'Stable',
    stage: 2,
    githubUrl: 'https://github.com/Dhruvgaur45/Dhruv-Gaur',
    liveUrl: '#'
  },
  {
    id: 'linkedin-creator',
    title: 'AI LinkedIn Post Creator',
    subtitle: 'Large Language Model Fine-Turing for High-Integrity Biotech Content',
    description: 'An automated assistant tuned for biotech & AI research sharing. It generates high-integrity LinkedIn updates, research paper summaries, and technical post blueprints.',
    longDescription: 'Leverages fine-tuned generative AI modules to parse complex biotech, bioinformatics, or computer engineering abstracts into highly readable, structured, and search-optimized professional networking copy.',
    iconName: 'cpu',
    tagline: 'GENERATIVE AI MODEL',
    tags: ['Generative AI', 'LLM Fine-tuning', 'Scientific Copywriting', 'LinkedIn APIs'],
    scientificMetric: 'Research Summary Accuracy: 99.1%',
    lifecycle: 'Prototype',
    stage: 3,
    githubUrl: 'https://github.com/Dhruvgaur45/Dhruv-Gaur',
    liveUrl: '#'
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
    lifecycle: 'Beta',
    stage: 3,
    githubUrl: 'https://github.com/Dhruvgaur45/Dhruv-Gaur',
    liveUrl: '#'
  },
  {
    id: 'proj-civic-alert',
    title: 'Civic Bio-Alert & Safety Dispatch',
    subtitle: 'Automated Community Pathogen Alerting & Ticket Routing Node',
    description: 'A civic alert platform built to route waste-water bio-sentinel alarms and community environmental risk logs directly to municipal responders.',
    longDescription: 'Connects municipal environmental safety teams with live biosensor streams. Uses a queue system and a priority-based ticket engine to track environmental pathogen spikes and community welfare tickets.',
    iconName: 'shield',
    tagline: 'CIVIC SAFETY NODE',
    tags: ['Queue management', 'Bio-sentinels', 'Priority router', 'React-Leaflet Map'],
    scientificMetric: 'Mean Ticket Dispatch: <12 sec',
    lifecycle: 'Beta',
    stage: 3,
    githubUrl: 'https://github.com/Dhruvgaur45/Dhruv-Gaur',
    liveUrl: '#'
  },
  {
    id: 'silicon-processors',
    title: 'Silicon Photonic Genomic Accelerator',
    subtitle: 'Optimizing Bioinformatics Workloads on Silicon Photonic Integrated Processors',
    description: 'A framework for High-Performance Genomic Computing mapping high-throughput sequence alignment algorithms to electro-photonic hardware accelerators for near zero-latency execution.',
    longDescription: 'Presented at leading research forums. Designs a mathematical layout that processes FM-index text searches and Smith-Waterman sequence alignments using light refractive waveguide arrays instead of electrical copper transistors, maximizing bandwidth and minimizing thermal loss.',
    iconName: 'microscope',
    tagline: 'HARDWARE ACCELERATION',
    tags: ['Silicon Photonics', 'HPC Clusters', 'Genomic Compute', 'Smith-Waterman Alignment'],
    scientificMetric: 'Latency Reduction: 15x / Bandwidth Opt',
    lifecycle: 'Research',
    stage: 4,
    githubUrl: 'https://github.com/Dhruvgaur45/Dhruv-Gaur',
    liveUrl: '#'
  }
];
