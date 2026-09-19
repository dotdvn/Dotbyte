
export interface SatelliteCard {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  status: string;
  xOffset: number; 
  yOffset: number;
  metric: string;
  category: string;
  sizeMultiplier?: number;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface PriceTier {
  id: string;
  name: string;
  badge?: string;
  priceMonthly: number;
  priceAnnually: number;
  description: string;
  features: string[];
  isPopular: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  quote: string;
  details: string[];
}

export interface SynthesisParams {
  neuralDensity: number;
  temperature: number;
  epochs: number;
  harmonicRatio: number;
  renderPreset: 'chroma' | 'vector' | 'spectral';
}
