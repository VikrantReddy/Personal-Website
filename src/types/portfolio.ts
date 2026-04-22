// src/types/portfolio.ts

export interface Stat {
  label: string;
  value: string;
}

export interface Bio {
  name: string;
  title: string;
  tagline: string;
  stats: Stat[];
}

export interface Project {
  title: string;
  description: string;
  tech: string[];
  metrics: string[];
  icon: string; // Store as string, render with Lucide
  color: string;
}

export interface Skill {
  name: string;
  category: string;
  level: number; // 0-100
}

export interface ServiceItem {
  responseTime: string;
  consultationNote: string;
}

export interface Contact {
  services: string[]; // List of what you can help with
  serviceInfo: ServiceItem;
}

export interface PortfolioData {
  bio: Bio;
  projects: Project[];
  skills: Skill[];
  contact: Contact;
}

export type ChatMessage = {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: Date;
  contentType: 'text' | 'projects' | 'skills' | 'contact' | 'bio' | 'fallback';
  data?: any;
  error?: boolean;
};
