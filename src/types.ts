export interface Skill {
  id: string;
  category: string;
  title: string;
  description: string;
  iconName: 'wrench' | 'code' | 'shield' | 'database' | 'cpu' | 'beaker' | 'flask' | 'test-tube';
  tags: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  provider: string;
  description: string;
  iconName: 'shield' | 'cloud' | 'flask';
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
}

export interface BiotechProject {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  iconName: string;
  tagline: string;
  tags: string[];
  scientificMetric: string;
  interactiveType: 'sequencer' | 'bioreactor' | 'structure' | 'lims';
}

export interface DNASequencingData {
  sequence: string;
  gcContent: number;
  aminoAcids: string[];
  mutationsCount: number;
}

export interface BioreactorState {
  ph: number;
  temperature: number; // in Celsius
  dissolvedO2: number; // in %
  agitation: number; // in RPM
  cellDensity: number; // g/L
  status: 'optimal' | 'warning' | 'critical' | 'calibrating';
}
