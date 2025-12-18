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
  potentialLoadTime: string; // Thời gian tải sau khi tối ưu
  potentialPageSize: string; // Dung lượng sau khi tối ưu
  savingsPercentage: number; // Phần trăm tiết kiệm được
  
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