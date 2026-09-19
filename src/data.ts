
import { SatelliteCard, FeatureItem, PriceTier, TeamMember, SynthesisParams } from './types';

export const INITIAL_SATELLITES: SatelliteCard[] = [
  {
    id: 'satellite-pcb',
    title: 'PCB Designing Architecture',
    subtitle: 'High Speed Circuit Design',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    status: 'OPTIMIZED',
    xOffset: -380,
    yOffset: -180,
    metric: 'Gerber Export Ready',
    category: 'PCB DESIGN'
  },
  {
    id: 'satellite-web',
    title: 'Premium Website Systems',
    subtitle: 'Modern UI & Interactive Motion',
    imageUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80',
    status: 'STABLE',
    xOffset: 380,
    yOffset: -160,
    metric: '99% Lighthouse Score',
    category: 'WEB REVOLUTION'
  },
  {
    id: 'satellite-app',
    title: 'App Development Pipeline',
    subtitle: 'Cross-platform Mobile Frameworks',
    imageUrl: 'https://images.unsplash.com/photo-1613909207039-6b173b755cc1?auto=format&fit=crop&w=800&q=80',
    status: 'ACTIVE',
    xOffset: -340,
    yOffset: 160,
    metric: 'Native Performance',
    category: 'MOBILE APPS'
  },
  {
    id: 'satellite-iot',
    title: 'IoT System Integrations',
    subtitle: 'Microcontroller Code & Sensor Mesh',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    status: 'DECODED',
    xOffset: 340,
    yOffset: 180,
    metric: 'ESP32/Arduino Calibrated',
    category: 'IOT HARDWARE'
  }
];

export const WHY_CHOOSE_US: FeatureItem[] = [
  {
    id: 'why-1',
    title: 'Affordable Pricing',
    description: 'Bespoke technology engineered at highly competitive rates, specifically customized for student budgets and startup parameters.',
    iconName: 'BadgePercent'
  },
  {
    id: 'why-2',
    title: 'Quality Work',
    description: 'Uncompromising engineering standards, pristine UI layouts, and strictly formatted source code with solid documentation.',
    iconName: 'Sparkles'
  },
  {
    id: 'why-3',
    title: 'Fast Delivery',
    description: 'Highly agile schedules ensure rapidly prototyped electronics and digital interfaces built exactly to your timelines.',
    iconName: 'Orbit'
  },
  {
    id: 'why-4',
    title: 'Student Friendly',
    description: 'Comprehensive explanations, block diagrams, and deployment guides perfect for university practical work and academic submissions.',
    iconName: 'GraduationCap'
  },
  {
    id: 'why-5',
    title: 'Premium Solutions',
    description: 'Leveraging top-tier design patterns, fast frameworks, and robust electronics routing for exceptional commercial projects.',
    iconName: 'Cpu'
  }
];

export interface DotProjectsPriceTier {
  id: string;
  name: string;
  priceLabel: string;
  priceType: '₹' | 'Starts';
  description: string;
  features: string[];
  isPopular?: boolean;
  badge?: string;
}

export const PRICING_PLANS_DOT: DotProjectsPriceTier[] = [
  {
    id: 'plan-starter',
    name: 'Custom IoT Code Plan',
    priceLabel: '₹399+',
    priceType: '₹',
    description: 'Perfect for students and minimal prototype needs requiring custom sensor routines and electronic calibration.',
    features: [
      'Custom IoT Code Making (ESP32/ESP8266/Arduino)',
      'Basic Hardware & Circuit Connection Schematics',
      'Fast Delivery (Typical 24-48 hours)',
      'Academic/Thesis presentation-ready source files'
    ]
  },
  {
    id: 'plan-prof',
    name: 'Website Plan',
    priceLabel: 'Starting ₹1299',
    priceType: 'Starts',
    description: 'Our most sought-after Tier for businesses seeking a pristine, modern web representation with exceptional design.',
    features: [
      'Premium Website Development',
      'Modern glassmorphism UI & micro-interactive layouts',
      'Fully Responsive Layout (Desktop, Tablet, Mobile)',
      'SEO & Performance integration with support',
      'Clean source code deployment documentation'
    ],
    isPopular: true,
    badge: 'MOST POPULAR'
  },
  {
    id: 'plan-advanced',
    name: 'App Plan',
    priceLabel: 'Starting ₹1699',
    priceType: 'Starts',
    description: 'Engineered for robust startups demanding high-performance Android & iOS companion applications.',
    features: [
      'Native-feel App Development',
      'Custom Features & Complex API Handshakes',
      'Highly Optimized Performance & Security Lattices',
      'State-aware persistent memory integration',
      'Interactive admin configuration dashboards'
    ]
  },
  {
    id: 'plan-pcb',
    name: 'Custom PCB Plan',
    priceLabel: 'Starting ₹499',
    priceType: 'Starts',
    description: 'Comprehensive hardware engineering for electronics makers and product manufacturers.',
    features: [
      'High Fidelity PCB Designing',
      '2-Layer to Multi-Layer Circuit Schematics Layout',
      'Professional output ready for fabrication (Gerber/BOM)',
      'Design Rules Checked (DRC) for error-free production',
      'Electronic Component optimization tips'
    ]
  }
];

export const TEAM_MEMBERS_DOT: TeamMember[] = [
  {
    id: 'member-dotdvn',
    name: 'DOTDVN',
    role: 'FOUNDER & CEO // LEAD DEVELOPER & OWNER // EVERYTHING',
    imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
    quote: 'I design custom circuit boards, write efficient firmware, build high-fidelity web apps, and craft responsive systems. DotByte Systems is a single-source technology ecosystem engineered of raw digital creation at student-friendly rates.',
    details: [
      'CEO, Founder, and Sole Owner of DotByte Systems',
      'Lead Engineer: Complete Frontend, Backend, Embedded IoT, & Cross-Platform Apps',
      'Personalized technical advisor & custom project support lead'
    ]
  }
];

export const DEFAULT_PARAMS: SynthesisParams = {
  neuralDensity: 74,
  temperature: 0.78,
  epochs: 180,
  harmonicRatio: 1.618,
  renderPreset: 'chroma'
};
