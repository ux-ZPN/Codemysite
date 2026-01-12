import React, { useState } from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import { 
  Menu, 
  X, 
  ChevronRight, 
  Code, 
  Layout, 
  PenTool, 
  Search, 
  CheckCircle,
  ArrowRight,
  Shield,
  Zap,
  Globe,
  Video,
  Palette,
  Sun,
  Moon,
  PaintBucket,
  Users,
  Trophy,
  Target
} from 'lucide-react';
import AdminDashboard from './components/AdminDashboard';
import { Lead } from './types';

// --- Reusable UI Components ---

const Button: React.FC<{ 
  children: React.ReactNode; 
  variant?: 'primary' | 'secondary' | 'outline'; 
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}> = ({ children, variant = 'primary', className = '', onClick, type = "button" }) => {
  const { content } = useAppContext();
  const primaryColor = content.brand.primaryColor;
  
  // Construct dynamic class names based on brand color
  const baseStyle = "group relative overflow-hidden inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-950 active:scale-95";
  
  const variants = {
    primary: `bg-${primaryColor}-600 text-white shadow-lg shadow-${primaryColor}-500/20 hover:shadow-${primaryColor}-500/40 hover:-translate-y-0.5`,
    secondary: "bg-white text-slate-900 border border-slate-200 shadow-sm hover:bg-slate-50 hover:-translate-y-0.5 dark:bg-slate-100 dark:text-slate-900",
    outline: "border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-white text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-transparent",
  };

  return (
    <button 
      type={type}
      className={`${baseStyle} ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      {/* Shine effect overlay */}
      {variant === 'primary' && (
        <div className="absolute inset-0 -translate-x-full group-hover:animate-shine bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />
      )}
      <span className="relative z-20 flex items-center">{children}</span>
    </button>
  );
};

// --- Helper Components ---

const LoginModal = ({ isOpen, onClose, onLogin }: { isOpen: boolean; onClose: () => void; onLogin: () => void }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-2xl max-w-sm w-full border border-slate-200 dark:border-slate-800 transform transition-all scale-100">
        <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Admin Access</h3>
        <p className="text-sm text-slate-500 mb-6">Enter your secure credential to access the CMS.</p>
        <form onSubmit={(e) => {
          e.preventDefault();
          if (password === "realroop") {
            onLogin();
          } else {
            setError(true);
          }
        }}>
          <input
            autoFocus
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white placeholder:text-slate-400"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(false);
            }}
          />
          {error && <p className="text-red-500 text-xs mb-4">Incorrect password. Please try again.</p>}
          <div className="flex gap-3 mt-4">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">Cancel</button>
            <button type="submit" className="flex-1 px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/20">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- Page Sections ---

const Navbar = () => {
  const { updateContent, content, themeMode, toggleTheme } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { primaryColor } = content.brand;

  const themes = ['indigo', 'violet', 'cyan', 'rose', 'emerald', 'amber'];

  const cycleThemeColor = () => {
    const currentIndex = themes.indexOf(primaryColor);
    const nextIndex = (currentIndex + 1) % themes.length;
    updateContent('brand', { primaryColor: themes[nextIndex] });
  };

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="fixed w-full z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span className={`font-black text-2xl tracking-tighter text-${primaryColor}-600 dark:text-white transition-colors`}>
              &lt;/&gt;
            </span>
            <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white transition-colors">
              Code My Site
            </span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-6">
              {['Services', 'Work', 'About'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  onClick={(e) => handleScroll(e, item.toLowerCase())}
                  className={`text-slate-600 dark:text-slate-300 hover:text-${primaryColor}-600 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors relative group`}
                >
                  {item}
                  <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-${primaryColor}-500 transition-all duration-300 group-hover:w-full`}></span>
                </a>
              ))}

              <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-2"></div>
              
              {/* Theme Color Cycler */}
              <button 
                onClick={cycleThemeColor}
                className={`p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-${primaryColor}-500 transition-all duration-300`}
                title="Change Brand Color"
              >
                <PaintBucket size={20} />
              </button>

              {/* Dark/Light Slider Toggle */}
              <button 
                onClick={toggleTheme}
                className="relative inline-flex h-8 w-16 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 bg-slate-200 dark:bg-slate-700"
              >
                <span className="sr-only">Use setting</span>
                <span className="flex items-center justify-center h-full w-full absolute left-0 top-0 text-[10px] font-bold gap-4 pointer-events-none">
                  <Sun size={12} className="text-amber-500" />
                  <Moon size={12} className="text-indigo-400" />
                </span>
                <span
                  aria-hidden="true"
                  className={`${themeMode === 'dark' ? 'translate-x-8' : 'translate-x-0'}
                    pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out flex items-center justify-center`}
                >
                   {themeMode === 'dark' ? <Moon size={14} className="text-slate-900" /> : <Sun size={14} className="text-amber-500" />}
                </span>
              </button>

              <Button variant="primary" className="py-2 px-4 text-sm" onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})}>
                Book a Call
              </Button>
            </div>
          </div>

          <div className="-mr-2 flex md:hidden items-center gap-4">
             {/* Mobile Theme Toggle */}
             <button 
                onClick={toggleTheme}
                className={`p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400`}
              >
                {themeMode === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white p-2">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
             {['Services', 'Work', 'About'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  onClick={(e) => handleScroll(e, item.toLowerCase())}
                  className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  {item}
                </a>
              ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  const { content } = useAppContext();
  const { headline, subheadline, ctaText } = content.hero;
  const { primaryColor } = content.brand;

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Dynamic Background Gradient */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-${primaryColor}-500/20 dark:bg-${primaryColor}-600/20 blur-[120px] rounded-full -z-10 transition-colors duration-700 ease-in-out`} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-sm mb-8 animate-fade-in-up hover:border-slate-300 dark:hover:border-slate-700 transition-colors cursor-default shadow-sm dark:shadow-none">
          <span className={`w-2 h-2 rounded-full bg-${primaryColor}-500 animate-pulse`}></span>
          Accepting new projects for Q4
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-8 leading-tight max-w-5xl mx-auto drop-shadow-sm dark:drop-shadow-2xl transition-colors">
          {headline}
        </h1>
        
        <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed transition-colors">
          {subheadline}
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})} className="text-lg px-8 py-4">
            {ctaText} <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
          </Button>
          <Button variant="outline" className="text-lg px-8 py-4" onClick={() => document.getElementById('work')?.scrollIntoView({behavior: 'smooth'})}>
            View Case Studies
          </Button>
        </div>

        {/* Social Proof Strip */}
        <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800/50 flex flex-wrap justify-center gap-8 opacity-60 dark:opacity-50 grayscale transition-all duration-300 hover:grayscale-0 hover:opacity-100">
            {['TechStart', 'NovaSoft', 'GlobalBank', 'FutureScale'].map(brand => (
              <span key={brand} className="text-xl font-bold text-slate-400 dark:text-slate-500 font-mono tracking-widest hover:text-slate-900 dark:hover:text-white transition-all duration-300 cursor-default">{brand}</span>
            ))}
        </div>
      </div>
    </section>
  );
};

const AboutSection = () => {
  const { content } = useAppContext();
  const { title, text, stats } = content.about;
  const { primaryColor } = content.brand;

  const icons = [Users, Trophy, Target];

  return (
    <section id="about" className="py-24 bg-white dark:bg-slate-950 transition-colors duration-500 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-${primaryColor}-50 dark:bg-${primaryColor}-900/20 text-${primaryColor}-600 dark:text-${primaryColor}-400 text-sm font-medium mb-6`}>
              Who We Are
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
              {title}
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed whitespace-pre-wrap">
              {text}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})}>
                Let's Work Together
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {stats.map((stat, index) => {
              const Icon = icons[index % icons.length];
              return (
                <div key={index} className={`p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 ${index === 2 ? 'sm:col-span-2' : ''} hover:border-${primaryColor}-500/30 transition-colors`}>
                  <div className={`w-12 h-12 rounded-lg bg-${primaryColor}-100 dark:bg-${primaryColor}-900/30 text-${primaryColor}-600 dark:text-${primaryColor}-400 flex items-center justify-center mb-4`}>
                    <Icon size={24} />
                  </div>
                  <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{stat.value}</div>
                  <div className="text-slate-500 dark:text-slate-400 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

const ServicesSection = () => {
  const { services, content } = useAppContext();
  const { primaryColor } = content.brand;

  const getIcon = (iconName: string) => {
    switch(iconName) {
      case 'code': return <Code size={32} />;
      case 'layout': return <Layout size={32} />;
      case 'pen-tool': return <PenTool size={32} />;
      case 'search': return <Search size={32} />;
      case 'video': return <Video size={32} />;
      case 'palette': return <Palette size={32} />;
      default: return <Code size={32} />;
    }
  };

  return (
    <section id="services" className="py-24 bg-slate-50 dark:bg-slate-950 relative transition-colors duration-500">
       <div className={`absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-${primaryColor}-500/20 to-transparent`}></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Our Expertise</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Comprehensive creative and technical solutions designed for growth.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div key={service.id} className={`group p-8 bg-white dark:bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-${primaryColor}-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl dark:hover:shadow-none hover:bg-slate-50 dark:hover:bg-slate-900`}
            >
              <div className={`w-14 h-14 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center mb-6 text-${primaryColor}-600 dark:text-${primaryColor}-500 group-hover:text-white group-hover:bg-${primaryColor}-600 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-sm`}>
                {getIcon(service.icon)}
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{service.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">{service.description}</p>
              <div className={`flex items-center text-sm font-semibold text-slate-500 dark:text-slate-300 group-hover:text-${primaryColor}-600 dark:group-hover:text-${primaryColor}-400 transition-colors`}>
                Starts at {service.priceStart} <ChevronRight size={16} className="ml-1 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CaseStudiesSection = () => {
  const { caseStudies, content } = useAppContext();
  const { primaryColor } = content.brand;

  return (
    <section id="work" className="py-24 bg-white dark:bg-slate-900/30 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Selected Work</h2>
            <p className="text-slate-600 dark:text-slate-400">Results that speak for themselves.</p>
          </div>
          <Button variant="outline" className="mt-4 md:mt-0">View All Projects</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {caseStudies.map((study) => (
            <div key={study.id} className="group relative overflow-hidden rounded-2xl cursor-pointer shadow-lg dark:shadow-none hover:shadow-xl transition-shadow">
              <img src={study.image} alt={study.title} className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100"></div>
              
              {/* Overlay Content */}
              <div className="absolute bottom-0 left-0 p-8 w-full translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className={`inline-block px-3 py-1 rounded-full bg-${primaryColor}-600/90 dark:bg-${primaryColor}-600/20 border border-${primaryColor}-500/30 text-white dark:text-${primaryColor}-300 text-xs font-bold uppercase tracking-wider mb-3 backdrop-blur-md shadow-sm`}>
                  {study.category}
                </span>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-white transition-colors">{study.title}</h3>
                <div className="flex items-center gap-2 text-white/90">
                  <Zap size={16} className={`text-${primaryColor}-400 fill-current`} />
                  <span className="font-medium">{study.result}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  const { content, addLead } = useAppContext();
  const { primaryColor } = content.brand;
  
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    type: 'Web Development',
    budget: '$10k - $25k',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newLead: Lead = {
      id: Math.random().toString(36).substr(2, 9),
      ...formState,
      status: 'New',
      date: new Date().toISOString()
    };
    addLead(newLead);
    setSubmitted(true);
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormState({ name: '', email: '', type: 'Web Development', budget: '$10k - $25k', message: '' });
    }, 5000);
  };

  return (
    <section id="contact" className="py-24 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 relative overflow-hidden transition-colors duration-500">
      {/* Decorative Blur */}
      <div className={`absolute top-0 right-0 w-[500px] h-[500px] bg-${primaryColor}-500/10 dark:bg-${primaryColor}-900/10 blur-[120px] rounded-full pointer-events-none`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">{content.contact.title}</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">{content.contact.subtitle}</p>
            
            <div className="space-y-6">
              {[
                { icon: Shield, text: "Non-Disclosure Agreement (NDA) included" },
                { icon: CheckCircle, text: "100% Ownership of Code & Design" },
                { icon: Globe, text: "Global Remote Team (24/7 Support)" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 text-slate-600 dark:text-slate-300 group hover:text-slate-900 dark:hover:text-white transition-colors">
                  <div className={`p-2 rounded-lg bg-slate-100 dark:bg-slate-900 group-hover:bg-${primaryColor}-500/20 transition-colors`}>
                    <item.icon className={`text-${primaryColor}-600 dark:text-${primaryColor}-500`} size={24} />
                  </div>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-none">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 animate-fade-in-up">
                <div className={`w-20 h-20 bg-${primaryColor}-500/20 text-${primaryColor}-600 dark:text-${primaryColor}-500 rounded-full flex items-center justify-center mb-6`}>
                  <CheckCircle size={40} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Message Received</h3>
                <p className="text-slate-600 dark:text-slate-400">We'll be in touch within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">Name</label>
                  <input 
                    required
                    type="text" 
                    value={formState.name}
                    onChange={e => setFormState({...formState, name: e.target.value})}
                    className={`w-full bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-${primaryColor}-500 transition-colors`}
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">Email</label>
                  <input 
                    required
                    type="email" 
                    value={formState.email}
                    onChange={e => setFormState({...formState, email: e.target.value})}
                    className={`w-full bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-${primaryColor}-500 transition-colors`}
                    placeholder="jane@company.com"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                     <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">Service</label>
                     <select 
                      value={formState.type}
                      onChange={e => setFormState({...formState, type: e.target.value})}
                      className={`w-full bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-${primaryColor}-500 transition-colors appearance-none`}
                     >
                       <option>Web Development</option>
                       <option>UI/UX Design</option>
                       <option>Graphic Design</option>
                       <option>Video Editing</option>
                     </select>
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">Budget</label>
                     <select 
                      value={formState.budget}
                      onChange={e => setFormState({...formState, budget: e.target.value})}
                      className={`w-full bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-${primaryColor}-500 transition-colors appearance-none`}
                     >
                       <option>$5k - $10k</option>
                       <option>$10k - $25k</option>
                       <option>$25k - $50k</option>
                       <option>$50k+</option>
                     </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">Project Details</label>
                  <textarea 
                    required
                    value={formState.message}
                    onChange={e => setFormState({...formState, message: e.target.value})}
                    rows={4}
                    className={`w-full bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-${primaryColor}-500 transition-colors`}
                    placeholder="Tell us about your goals..."
                  />
                </div>
                <Button type="submit" className="w-full">Submit Request</Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const { toggleAdmin } = useAppContext();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoginOpen(false);
    toggleAdmin();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onLogin={handleLoginSuccess} 
      />
      <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 pt-16 pb-8 transition-colors duration-500 relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <span className="font-black text-xl tracking-tighter text-indigo-600 dark:text-white transition-colors">
                  &lt;/&gt;
                </span>
                <span className="font-bold text-lg text-slate-900 dark:text-white">Code My Site</span>
              </div>
              <p className="text-slate-500 text-sm">Building the digital future for ambitious brands.</p>
            </div>
            <div>
              <h4 className="text-slate-900 dark:text-white font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li><a href="#services" className="hover:text-indigo-600 dark:hover:text-white">Web Development</a></li>
                <li><a href="#services" className="hover:text-indigo-600 dark:hover:text-white">UI/UX Design</a></li>
                <li><a href="#services" className="hover:text-indigo-600 dark:hover:text-white">Video Editing</a></li>
                <li><a href="#services" className="hover:text-indigo-600 dark:hover:text-white">Graphic Design</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-slate-900 dark:text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li><a href="#about" className="hover:text-indigo-600 dark:hover:text-white">About</a></li>
                <li><a href="#contact" className="hover:text-indigo-600 dark:hover:text-white">Careers</a></li>
                <li><a href="#contact" className="hover:text-indigo-600 dark:hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-slate-900 dark:text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li><a href="#" className="hover:text-indigo-600 dark:hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-indigo-600 dark:hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="text-center pt-8 border-t border-slate-200 dark:border-slate-900 text-slate-500 text-sm flex flex-col items-center gap-4">
            <span>&copy; {new Date().getFullYear()} Code My Site Agency. All rights reserved.</span>
            <button 
              onClick={() => setIsLoginOpen(true)}
              className="text-xs text-slate-400 dark:text-slate-600 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors px-4 py-2 cursor-pointer font-medium border border-transparent hover:border-slate-200 dark:hover:border-slate-800 rounded outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Admin Access
            </button>
          </div>
        </div>
      </footer>
    </>
  );
};

// --- Main Layout ---

const LandingPage = () => {
  const { content } = useAppContext();
  const { primaryColor } = content.brand;

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950 transition-colors duration-500">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <ServicesSection />
        <CaseStudiesSection />
        <AboutSection />
        <section className="py-24 bg-white dark:bg-slate-950 text-center relative transition-colors duration-500">
           {/* Subtle background glow */}
           <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-100 dark:via-slate-900/50 to-transparent pointer-events-none"></div>
          <div className="max-w-4xl mx-auto px-6 relative z-10">
             <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12">What Clients Say</h2>
             <div className="grid md:grid-cols-2 gap-8">
               {/* Simplified mapping for layout context */}
               {[0, 1].map(i => (
                 <div key={i} className="bg-slate-50 dark:bg-slate-900/50 backdrop-blur p-8 rounded-xl text-left border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-600 transition-colors duration-300 shadow-sm dark:shadow-none">
                    <p className="text-slate-700 dark:text-slate-300 mb-6 text-lg italic">"Simply the best development team I have worked with. They understand business goals."</p>
                    <div className="flex items-center gap-4">
                       <div className={`w-10 h-10 bg-gradient-to-br from-${primaryColor}-100 to-${primaryColor}-200 dark:from-slate-700 dark:to-slate-800 rounded-full`}></div>
                       <div>
                         <div className="text-slate-900 dark:text-white font-bold">Client Name</div>
                         <div className="text-slate-500 dark:text-slate-500 text-sm">CEO, TechCompany</div>
                       </div>
                    </div>
                 </div>
               ))}
             </div>
          </div>
        </section>
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

const AppContent = () => {
  const { isAdmin } = useAppContext();
  return isAdmin ? <AdminDashboard /> : <LandingPage />;
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;