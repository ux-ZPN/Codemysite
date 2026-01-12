export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  priceStart: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  category: string;
  image: string;
  result: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  type: string;
  budget: string;
  message: string;
  status: 'New' | 'Contacted' | 'Closed';
  date: string;
}

export interface SiteContent {
  hero: {
    headline: string;
    subheadline: string;
    ctaText: string;
  };
  about: {
    title: string;
    text: string;
    stats: { label: string; value: string }[];
  };
  contact: {
    title: string;
    subtitle: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string;
  };
  brand: {
    primaryColor: string; // Tailwind class prefix e.g., 'indigo'
  };
}

export interface AppContextType {
  isAdmin: boolean;
  toggleAdmin: () => void;
  themeMode: 'light' | 'dark';
  toggleTheme: () => void;
  content: SiteContent;
  updateContent: (section: keyof SiteContent, data: any) => void;
  services: Service[];
  updateServices: (services: Service[]) => void;
  caseStudies: CaseStudy[];
  updateCaseStudies: (studies: CaseStudy[]) => void;
  testimonials: Testimonial[];
  leads: Lead[];
  addLead: (lead: Lead) => void;
  updateLeadStatus: (id: string, status: Lead['status']) => void;
}