import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings, 
  Briefcase, 
  Wand2, 
  Check, 
  Palette,
  LogOut
} from 'lucide-react';
import { generateSiteCopy, isGeminiConfigured } from '../services/geminiService';

const AdminDashboard: React.FC = () => {
  const { 
    content, 
    updateContent, 
    leads, 
    updateLeadStatus, 
    toggleAdmin
  } = useAppContext();
  
  const [activeTab, setActiveTab] = useState<'overview' | 'content' | 'services' | 'leads' | 'settings'>('overview');
  const [isGenerating, setIsGenerating] = useState(false);

  // --- AI Generator Helper ---
  const handleAiGenerate = async (field: string, prompt: string, sectionContext: string) => {
    if (!isGeminiConfigured()) {
      alert("Gemini API Key not found in environment variables.");
      return;
    }
    setIsGenerating(true);
    const newText = await generateSiteCopy(prompt, sectionContext);
    setIsGenerating(false);
    
    // Basic mapping for demo purposes
    if (field === 'heroHeadline') updateContent('hero', { headline: newText });
    if (field === 'heroSub') updateContent('hero', { subheadline: newText });
    if (field === 'aboutText') updateContent('about', { text: newText });
  };

  // --- Sub-components for Tabs ---

  const LeadsTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold dark:text-white text-slate-800 mb-4">Lead Management</h2>
      <div className="overflow-x-auto bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
        <table className="w-full text-left text-sm text-slate-500 dark:text-slate-400">
          <thead className="bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 uppercase font-semibold">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Budget</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                <td className="px-6 py-4 font-medium dark:text-white text-slate-900">{lead.name}</td>
                <td className="px-6 py-4">{lead.email}</td>
                <td className="px-6 py-4">{lead.type}</td>
                <td className="px-6 py-4">{lead.budget}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    lead.status === 'New' ? 'bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-400' :
                    lead.status === 'Contacted' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-400' :
                    'bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-400'
                  }`}>
                    {lead.status}
                  </span>
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <button onClick={() => updateLeadStatus(lead.id, 'Contacted')} className="p-1 hover:text-yellow-500 dark:hover:text-yellow-400" title="Mark Contacted"><Settings size={16} /></button>
                  <button onClick={() => updateLeadStatus(lead.id, 'Closed')} className="p-1 hover:text-green-500 dark:hover:text-green-400" title="Mark Closed"><Check size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const ContentTab = () => (
    <div className="space-y-8 max-w-4xl">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-xl font-bold dark:text-white text-slate-800 mb-4 flex items-center gap-2">
          <FileText size={20} className={`text-${content.brand.primaryColor}-500`} /> Hero Section
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Headline</label>
            <div className="flex gap-2">
              <input 
                value={content.hero.headline} 
                onChange={(e) => updateContent('hero', { headline: e.target.value })}
                className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-4 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
              />
              <button 
                onClick={() => handleAiGenerate('heroHeadline', "Rewrite this headline to be more punchy and authoritative.", content.hero.headline)}
                className={`bg-${content.brand.primaryColor}-600 hover:bg-${content.brand.primaryColor}-700 text-white px-3 py-2 rounded flex items-center gap-1 transition`}
                disabled={isGenerating}
              >
                <Wand2 size={16} /> {isGenerating ? '...' : 'AI'}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Subheadline</label>
            <div className="flex gap-2">
              <textarea 
                value={content.hero.subheadline} 
                onChange={(e) => updateContent('hero', { subheadline: e.target.value })}
                className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-4 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 h-24"
              />
              <button 
                onClick={() => handleAiGenerate('heroSub', "Rewrite this to be more persuasive and focus on ROI.", content.hero.subheadline)}
                className={`bg-${content.brand.primaryColor}-600 hover:bg-${content.brand.primaryColor}-700 text-white px-3 py-2 rounded h-10 flex items-center gap-1 transition`}
                disabled={isGenerating}
              >
                <Wand2 size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-xl font-bold dark:text-white text-slate-800 mb-4 flex items-center gap-2">
          <Briefcase size={20} className={`text-${content.brand.primaryColor}-500`} /> About Section
        </h3>
        <div>
          <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Main Text</label>
          <div className="flex gap-2">
            <textarea 
              value={content.about.text} 
              onChange={(e) => updateContent('about', { text: e.target.value })}
              className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-4 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 h-32"
            />
             <button 
                onClick={() => handleAiGenerate('aboutText', "Rewrite to sound more professional and experienced.", content.about.text)}
                className={`bg-${content.brand.primaryColor}-600 hover:bg-${content.brand.primaryColor}-700 text-white px-3 py-2 rounded h-10 flex items-center gap-1 transition`}
                disabled={isGenerating}
              >
                <Wand2 size={16} />
              </button>
          </div>
        </div>
      </div>
    </div>
  );

  const SettingsTab = () => (
    <div className="space-y-6 max-w-2xl">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-xl font-bold dark:text-white text-slate-800 mb-4 flex items-center gap-2">
          <Palette size={20} className={`text-${content.brand.primaryColor}-500`} /> Branding
        </h3>
        <div className="grid grid-cols-4 gap-4">
          {['indigo', 'blue', 'emerald', 'violet', 'rose', 'orange'].map((color) => (
            <button
              key={color}
              onClick={() => updateContent('brand', { primaryColor: color })}
              className={`h-12 rounded-lg border-2 ${content.brand.primaryColor === color ? 'border-slate-900 dark:border-white' : 'border-transparent'} flex items-center justify-center capitalize font-medium`}
              style={{ backgroundColor: `var(--color-${color}-600)` }} 
            >
               <div className={`w-full h-full rounded opacity-80 bg-${color}-600`}></div>
            </button>
          ))}
        </div>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Current Theme Color: <span className="text-slate-900 dark:text-white capitalize">{content.brand.primaryColor}</span></p>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-xl font-bold dark:text-white text-slate-800 mb-4">SEO Configuration</h3>
        <div className="space-y-4">
           <div>
            <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Meta Title</label>
            <input 
              value={content.seo.metaTitle} 
              onChange={(e) => updateContent('seo', { metaTitle: e.target.value })}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-4 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
           <div>
            <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Meta Description</label>
            <textarea 
              value={content.seo.metaDescription} 
              onChange={(e) => updateContent('seo', { metaDescription: e.target.value })}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-4 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 h-24"
            />
          </div>
           <div>
            <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Meta Keywords</label>
            <input 
              value={content.seo.metaKeywords} 
              onChange={(e) => updateContent('seo', { metaKeywords: e.target.value })}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-4 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
              placeholder="comma, separated, keywords"
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 flex font-sans transition-colors duration-300">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hidden md:flex flex-col">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
          <h1 className="text-xl font-bold dark:text-white text-slate-900 tracking-tight flex items-center gap-2">
            <span className="text-2xl font-black tracking-tighter text-indigo-600 dark:text-indigo-400">&lt;/&gt;</span> CMS
          </h1>
          <p className="text-xs text-slate-500 mt-1">v2.4.0 • Connected</p>
        </div>
        <nav className="flex-1 p-4 space-y-2 flex flex-col">
          {[
            { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
            { id: 'leads', icon: Users, label: 'Leads & CRM' },
            { id: 'content', icon: FileText, label: 'Page Content' },
            { id: 'settings', icon: Settings, label: 'Settings & SEO' },
          ].map((item) => (
             <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                activeTab === item.id 
                  ? `bg-${content.brand.primaryColor}-500/10 text-${content.brand.primaryColor}-600 dark:text-${content.brand.primaryColor}-400 border border-${content.brand.primaryColor}-500/20` 
                  : 'hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-500 dark:text-slate-400'
              }`}
            >
              <item.icon size={18} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}

          <div className="mt-auto pt-4 border-t border-slate-200 dark:border-slate-800">
             <button
              onClick={toggleAdmin}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-md transition-colors hover:bg-red-50 dark:hover:bg-red-900/10 text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400"
            >
              <LogOut size={18} />
              <span className="font-medium">Back to Site</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-16 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 bg-white/80 dark:bg-slate-950/50 backdrop-blur sticky top-0 z-10">
          <h2 className="text-lg font-semibold dark:text-white text-slate-900 capitalize">{activeTab}</h2>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-500 dark:text-slate-400">Admin Mode Active</span>
          </div>
        </header>

        <div className="p-8">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="text-slate-500 dark:text-slate-400 mb-2">Total Leads</div>
                <div className="text-4xl font-bold dark:text-white text-slate-900">{leads.length}</div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="text-slate-500 dark:text-slate-400 mb-2">Pending Inquiries</div>
                <div className={`text-4xl font-bold text-${content.brand.primaryColor}-500`}>{leads.filter(l => l.status === 'New').length}</div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="text-slate-500 dark:text-slate-400 mb-2">Conversion Rate</div>
                <div className="text-4xl font-bold text-emerald-500 dark:text-emerald-400">4.2%</div>
              </div>
            </div>
          )}

          {activeTab === 'leads' && <LeadsTab />}
          {activeTab === 'content' && <ContentTab />}
          {activeTab === 'settings' && <SettingsTab />}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;