export interface ResourceItem {
  name: string;
  sizeKb: number;
  color: string;
  [key: string]: any;
}

export interface Opportunity {
  title: string;
  description: string;
  savings: string;
  severity: 'high' | 'medium' | 'low';
}

export interface CodeSuggestion {
  title: string;
  language: string;
  code: string;
  description: string;
}

export interface SocialPreview {
  title: string;
  description: string;
  image: string; // URL giả lập hoặc mô tả
  siteName: string;
}

export interface SecurityAudit {
  score: number;
  https: boolean;
  issues: string[];
}

export interface HiHiRank {
  tier: 'S' | 'A' | 'B' | 'C' | 'D' | 'F';
  name: string; // Ví dụ: "Thánh Tốc Độ"
  emoji: string;
  quote: string; // Câu nhận xét hài hước
}

export interface WebAuditResult {
  performanceScore: number;
  accessibilityScore: number;
  bestPracticesScore: number;
  seoScore: number;
  
  // Core Web Vitals
  estimatedLoadTime: string;
  fcp: string; 
  lcp: string; 
  cls: string; 
  carbonFootprint: string; 
  
  // Data measurements
  transferSize: string; 
  resourcesSize: string; 
  totalPageSize: string; 
  
  // New: Potential / Optimized Metrics (AI prediction)
  potentialLoadTime: string; 
  potentialPageSize: string; 
  savingsPercentage: number; 
  
  // New Features
  hihiRank: HiHiRank;
  socialPreview: SocialPreview;
  security: SecurityAudit;

  resourceBreakdown: ResourceItem[];
  opportunities: Opportunity[];
  codeSuggestions: CodeSuggestion[];
  techStack: string[];
  summary: string;
}

export enum LoadingState {
  IDLE,
  ANALYZING,
  COMPLETE,
  ERROR
}