// Documentation types
export interface DocSection {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  order: number;
}

export interface DocArticle {
  id: string;
  sectionId: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  tags: string[];
  readTime: number;
  createdAt: string;
  updatedAt: string;
  order: number;
}

export interface DocChunk {
  id: string;
  articleId: string;
  content: string;
  embedding?: number[];
  metadata: {
    title: string;
    section: string;
    position: number;
  };
}

// AI Chat types
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  sources?: DocSource[];
}

export interface DocSource {
  articleId: string;
  articleTitle: string;
  sectionTitle: string;
  excerpt: string;
  relevanceScore: number;
}

export interface ChatSession {
  id: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

// Search types
export interface SearchResult {
  article: DocArticle;
  section: DocSection;
  highlights: string[];
  score: number;
}

// Navigation types
export interface NavItem {
  title: string;
  href: string;
  icon?: string;
  children?: NavItem[];
  isActive?: boolean;
  isExpanded?: boolean;
}

export interface Breadcrumb {
  label: string;
  href: string;
}

// Theme types
export type Theme = 'light' | 'dark' | 'system';

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Rate limiting types
export interface RateLimitInfo {
  remaining: number;
  limit: number;
  resetTime: Date;
}
