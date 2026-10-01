export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  description: string;
  iconName: string;
  features: string[];
  deliverables: string;
  badge?: string;
}

export interface DemoProject {
  id: string;
  route: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
  badge: string;
  accentColor: string;
  techStack: string[];
  metrics: string;
  features: string[];
  demoType: 'ecommerce' | 'restaurant' | 'business' | 'booking';
}

export interface SkillCategory {
  title: string;
  skills: { name: string; level: number; category: string; icon?: string }[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  duration: string;
  grade: string;
  description: string;
  highlights: string[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
}

export interface AchievementItem {
  title: string;
  organization: string;
  year: string;
  description: string;
  category: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  priceBDT: number;
  popular?: boolean;
  idealFor: string;
  timeline: string;
  features: { name: string; included: boolean; note?: string }[];
}

export interface Testimonial {
  id: string;
  quote: string;
  clientName: string;
  clientRole: string;
  businessName: string;
  location: string;
  rating: number;
  projectType: string;
  metric: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  message: string;
  createdAt: string;
}
