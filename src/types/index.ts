// Blog Types
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
}

// Knowledge Base Types
export interface KnowledgeDocument {
  id: string;
  title: string;
  category: string;
  content: string;
  keywords: string[];
}

// Dashboard Types
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  stats: {
    posts: number;
    views: number;
    likes: number;
  };
}

export interface DashboardStats {
  totalVisits: number;
  uniqueUsers: number;
  bounceRate: number;
  avgSessionDuration: string;
  pageViews: number;
  conversionRate: number;
}

// API Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Chat Types
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Theme Types
export type Theme = 'light' | 'dark';
