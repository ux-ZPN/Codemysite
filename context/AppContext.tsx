import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  AppContextType, 
  SiteContent, 
  Service, 
  CaseStudy, 
  Testimonial, 
  Lead 
} from '../types';
import { 
  INITIAL_CONTENT, 
  INITIAL_SERVICES, 
  INITIAL_CASE_STUDIES, 
  INITIAL_TESTIMONIALS, 
  MOCK_LEADS 
} from '../constants';

const AppContext = createContext<AppContextType | undefined>(undefined);

// --- Backend Persistence Helper ---
// This acts as a database connection, retrieving data from local storage
// or falling back to initial seed data if the database is empty.
const loadState = <T,>(key: string, fallback: T): T => {
  if (typeof window === 'undefined') return fallback;
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch (e) {
    console.warn(`Error loading ${key} from database`, e);
    return fallback;
  }
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Session State (Temporary)
  const [isAdmin, setIsAdmin] = useState(false);

  // Database State (Persisted)
  // These hooks initialize state from the local persistence layer
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>(() => loadState('cms_theme', 'dark'));
  const [content, setContent] = useState<SiteContent>(() => loadState('cms_content', INITIAL_CONTENT));
  const [services, setServices] = useState<Service[]>(() => loadState('cms_services', INITIAL_SERVICES));
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>(() => loadState('cms_cases', INITIAL_CASE_STUDIES));
  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => loadState('cms_testimonials', INITIAL_TESTIMONIALS));
  const [leads, setLeads] = useState<Lead[]>(() => loadState('cms_leads', MOCK_LEADS));

  // --- Database Transactions ---
  // These effects essentially "write" changes to the database whenever state changes.
  
  useEffect(() => localStorage.setItem('cms_theme', JSON.stringify(themeMode)), [themeMode]);
  useEffect(() => localStorage.setItem('cms_content', JSON.stringify(content)), [content]);
  useEffect(() => localStorage.setItem('cms_services', JSON.stringify(services)), [services]);
  useEffect(() => localStorage.setItem('cms_cases', JSON.stringify(caseStudies)), [caseStudies]);
  useEffect(() => localStorage.setItem('cms_testimonials', JSON.stringify(testimonials)), [testimonials]);
  useEffect(() => localStorage.setItem('cms_leads', JSON.stringify(leads)), [leads]);

  // UI Side Effects
  useEffect(() => {
    const root = window.document.documentElement;
    if (themeMode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [themeMode]);

  // SEO Injection Side Effect
  useEffect(() => {
    document.title = content.seo.metaTitle;
    
    // Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', content.seo.metaDescription);

    // Meta Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', "keywords");
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', content.seo.metaKeywords);

  }, [content.seo]);

  const toggleAdmin = () => setIsAdmin(prev => !prev);
  const toggleTheme = () => setThemeMode(prev => prev === 'dark' ? 'light' : 'dark');

  const updateContent = (section: keyof SiteContent, data: any) => {
    setContent(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
  };

  const updateServices = (newServices: Service[]) => setServices(newServices);
  const updateCaseStudies = (newStudies: CaseStudy[]) => setCaseStudies(newStudies);

  const addLead = (lead: Lead) => {
    setLeads(prev => [lead, ...prev]);
  };

  const updateLeadStatus = (id: string, status: Lead['status']) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
  };

  return (
    <AppContext.Provider value={{
      isAdmin,
      toggleAdmin,
      themeMode,
      toggleTheme,
      content,
      updateContent,
      services,
      updateServices,
      caseStudies,
      updateCaseStudies,
      testimonials,
      leads,
      addLead,
      updateLeadStatus
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};