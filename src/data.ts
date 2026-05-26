import { Skill, Certification, BiotechProject } from './types';

export const SKILLS: Skill[] = [
  {
    id: 'biotech-ux',
    category: 'Biotechnology Design',
    title: 'Biotech UI/UX Design',
    description: 'Crafting specialized interfaces for laboratory information systems, genomic data visualization, and clinical trial platforms.',
    iconName: 'wrench',
    tags: ['Data Viz', 'LIMS', 'Genomic Design']
  },
  {
    id: 'scifrontend',
    category: 'Software Development',
    title: 'Scientific Frontend',
    description: 'Building performant web applications for analyzing complex biological datasets and research automation tools.',
    iconName: 'code',
    tags: ['React', 'D3.js', 'Bio-Informatics']
  },
  {
    id: 'labarch',
    category: 'Infrastructure',
    title: 'Lab Systems Architecture',
    description: 'Designing scalable digital ecosystems that bridge the gap between bench research and digital discovery.',
    iconName: 'shield',
    tags: ['Research Ops', 'Scalable Data', 'Lab-to-Cloud']
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'google-ux',
    title: 'Google UX Design',
    issuer: 'Professional Certificate',
    provider: 'Coursera',
    description: 'End-to-end UX process including research, wireframing, and high-fidelity prototyping.',
    iconName: 'shield'
  },
  {
    id: 'aws-cloud',
    title: 'AWS Cloud Practitioner',
    issuer: 'Certified Associate',
    provider: 'Amazon Web Services',
    description: 'Foundational understanding of cloud infrastructure, security, and scalable systems.',
    iconName: 'cloud'
  },
  {
    id: 'bioinfo-spec',
    title: 'Bioinformatics Specialization',
    issuer: 'UCSD / Coursera',
    provider: 'University of California, San Diego',
    description: 'Computational methods for analyzing biological data and genomic sequence mapping.',
    iconName: 'flask'
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
    interactiveType: 'sequencer'
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
    interactiveType: 'bioreactor'
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
    interactiveType: 'lims'
  }
];
