import { SiteContent, Service, CaseStudy, Testimonial, Lead } from './types';

export const INITIAL_CONTENT: SiteContent = {
  hero: {
    headline: "We Build Digital Empires.",
    subheadline: "Code My Site is a premium agency tailored for brands that refuse to blend in. We combine conversion strategy with bleeding-edge development.",
    ctaText: "Start Your Project",
  },
  about: {
    title: "Not Just Another Agency",
    text: "We are a collective of senior strategists, developers, and designers. We don't just write code; we architect user experiences that drive revenue. Our methodology is rooted in data, speed, and aesthetic precision.",
    stats: [
      { label: "Projects Delivered", value: "150+" },
      { label: "Revenue Generated", value: "$50M+" },
      { label: "Client Retention", value: "98%" },
    ],
  },
  contact: {
    title: "Ready to Scale?",
    subtitle: "Tell us about your project. We accept a limited number of new clients per quarter.",
  },
  seo: {
    metaTitle: "Code My Site | Premium Web Development Agency",
    metaDescription: "Top-tier web development and design agency focused on lead generation and conversion.",
    metaKeywords: "web development, digital agency, ui/ux design, react, next.js, seo, video editing, graphic design",
  },
  brand: {
    primaryColor: "indigo",
  },
};

export const INITIAL_SERVICES: Service[] = [
  {
    id: '1',
    title: 'High-End Web Development',
    description: 'Bespoke React, Next.js, and WebGL experiences built for speed, SEO, and scalability.',
    icon: 'code',
    priceStart: '$5k+',
  },
  {
    id: '2',
    title: 'UI/UX & Product Design',
    description: 'User-centric interfaces with pixel-perfect aesthetics that guide behavior and retention.',
    icon: 'layout',
    priceStart: '$3k+',
  },
  {
    id: '3',
    title: 'Professional Video Editing',
    description: 'Cinematic storytelling, motion graphics, and post-production for high-impact social content.',
    icon: 'video',
    priceStart: '$1.5k+',
  },
  {
    id: '4',
    title: 'Premium Graphic Design',
    description: 'Brand identity, marketing assets, and visual systems that command authority.',
    icon: 'palette',
    priceStart: '$2k+',
  },
];

export const INITIAL_CASE_STUDIES: CaseStudy[] = [
  {
    id: '1',
    title: 'FinTech Dashboard Overhaul',
    category: 'SaaS Development',
    image: 'https://picsum.photos/800/600?random=1',
    result: '+240% User Engagement',
  },
  {
    id: '2',
    title: 'Luxury Fashion E-comm',
    category: 'E-Commerce',
    image: 'https://picsum.photos/800/600?random=2',
    result: '$2M Revenue in Q1',
  },
  {
    id: '3',
    title: 'Real Estate Platform',
    category: 'Web App',
    image: 'https://picsum.photos/800/600?random=3',
    result: '40% Faster Load Time',
  },
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    role: 'CMO',
    company: 'TechFlow',
    content: "Code My Site transformed our online presence. The new site isn't just beautiful; it's a lead generation machine.",
    avatar: 'https://picsum.photos/100/100?random=10',
  },
  {
    id: '2',
    name: 'Marcus Thorne',
    role: 'Founder',
    company: 'Apex Ventures',
    content: "Professional, fast, and technically superior. They understood our brand voice immediately.",
    avatar: 'https://picsum.photos/100/100?random=11',
  },
];

export const MOCK_LEADS: Lead[] = [
  {
    id: 'l-1',
    name: 'John Doe',
    email: 'john@example.com',
    type: 'Web Development',
    budget: '$10k - $25k',
    message: 'Looking for a complete rebrand and site build.',
    status: 'New',
    date: '2023-10-25',
  },
  {
    id: 'l-2',
    name: 'Alice Smith',
    email: 'alice@startup.io',
    type: 'Design',
    budget: '$5k - $10k',
    message: 'Need a UI kit for our mobile app.',
    status: 'Contacted',
    date: '2023-10-24',
  },
];