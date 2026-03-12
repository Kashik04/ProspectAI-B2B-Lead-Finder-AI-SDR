import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  LayoutDashboard,
  Search,
  Users,
  Bot,
  BarChart2,
  Settings,
  ChevronLeft,
  ChevronRight,
  Bell,
  Moon,
  Sun,
  User,
  LogOut,
  Zap,
  Mail,
  Eye,
  EyeOff,
  MoreVertical,
  Download,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  Activity,
  Send,
  Building,
  Target,
  Cpu,
  Lightbulb,
  X,
  Copy,
  Check,
  ExternalLink,
  Trash2,
  Linkedin,
  Filter,
  RefreshCw,
  Globe,
  PieChart as PieChartIcon,
  ChevronDown,
  AlertTriangle,
  Menu
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

// --- DEMO DATA ---
const LEADS_DATA = [
  {
    id: 1,
    name: "Sarah Johnson",
    initials: "SJ",
    color: "#6366F1",
    company: "GrowthStack",
    domain: "growthstack.io",
    role: "Head of Marketing",
    email: "sarah@growthstack.io",
    linkedin: "linkedin.com/in/sarahjohnson",
    location: "USA",
    flag: "🇺🇸",
    size: "50-200",
    industry: "SaaS",
    status: "Hot",
    score: 94,
    stage: "New",
    notes: ""
  },
  {
    id: 2,
    name: "Rahul Mehta",
    initials: "RM",
    color: "#10B981",
    company: "FinEdge",
    domain: "finedge.ai",
    role: "Sales Director",
    email: "rahul@finedge.ai",
    linkedin: "linkedin.com/in/rahulmehta",
    location: "India",
    flag: "🇮🇳",
    size: "200-1000",
    industry: "Fintech",
    status: "Warm",
    score: 78,
    stage: "Contacted",
    notes: ""
  },
  {
    id: 3,
    name: "Emily Carter",
    initials: "EC",
    color: "#F59E0B",
    company: "ScaleFlow",
    domain: "scaleflow.com",
    role: "Founder",
    email: "emily@scaleflow.com",
    linkedin: "linkedin.com/in/emilycarter",
    location: "UK",
    flag: "🇬🇧",
    size: "10-50",
    industry: "E-commerce",
    status: "Hot",
    score: 91,
    stage: "Replied",
    notes: ""
  },
  {
    id: 4,
    name: "Daniel Lee",
    initials: "DL",
    color: "#3B82F6",
    company: "MarketPulse",
    domain: "marketpulse.io",
    role: "Growth Manager",
    email: "daniel@marketpulse.io",
    linkedin: "linkedin.com/in/daniellee",
    location: "Canada",
    flag: "🇨🇦",
    size: "50-200",
    industry: "Marketing",
    status: "Cold",
    score: 62,
    stage: "Contacted",
    notes: ""
  },
  {
    id: 5,
    name: "Priya Sharma",
    initials: "PS",
    color: "#EC4899",
    company: "AdNova",
    domain: "adnova.ai",
    role: "VP Sales",
    email: "priya@adnova.ai",
    linkedin: "linkedin.com/in/priyasharma",
    location: "India",
    flag: "🇮🇳",
    size: "200-1000",
    industry: "Marketing",
    status: "Warm",
    score: 85,
    stage: "New",
    notes: ""
  }
];

const leadGrowth = [
  { day: "Mon", leads: 12 }, { day: "Tue", leads: 19 },
  { day: "Wed", leads: 15 }, { day: "Thu", leads: 28 },
  { day: "Fri", leads: 22 }, { day: "Sat", leads: 31 },
  { day: "Sun", leads: 27 }
];

const industryData = [
  { name: "SaaS", value: 35, color: "#6366F1" },
  { name: "Fintech", value: 25, color: "#10B981" },
  { name: "E-com", value: 20, color: "#F59E0B" },
  { name: "Health", value: 20, color: "#3B82F6" }
];

const outreachData = [
  { day: "Mon", sent: 4 }, { day: "Tue", sent: 7 },
  { day: "Wed", sent: 5 }, { day: "Thu", sent: 9 },
  { day: "Fri", sent: 6 }, { day: "Sat", sent: 8 },
  { day: "Sun", sent: 7 }
];

const replyData = [
  { day: "Mon", rate: 12 }, { day: "Tue", rate: 15 },
  { day: "Wed", rate: 11 }, { day: "Thu", rate: 18 },
  { day: "Fri", rate: 16 }, { day: "Sat", rate: 22 },
  { day: "Sun", rate: 18 }
];

const INDUSTRY_TECH = {
  SaaS: ["HubSpot", "Salesforce", "Slack"],
  Fintech: ["Stripe", "Plaid", "Intercom"],
  "E-commerce": ["Shopify", "Klaviyo", "Gorgias"],
  Marketing: ["Marketo", "Semrush", "Hotjar"],
  Healthcare: ["Salesforce", "Zendesk", "Zoom"]
};

const INDUSTRY_PAIN = {
  SaaS: [
    "Scaling customer acquisition cost",
    "Reducing churn rate",
    "Improving trial-to-paid conversion"
  ],
  Fintech: [
    "Regulatory compliance overhead",
    "User trust and security concerns",
    "High customer acquisition costs"
  ],
  "E-commerce": [
    "Cart abandonment rates",
    "Customer retention",
    "Inventory management at scale"
  ],
  Marketing: [
    "Proving ROI to stakeholders",
    "Lead quality vs quantity balance",
    "Marketing and sales alignment"
  ],
  Healthcare: [
    "Patient data privacy compliance",
    "System integration complexity",
    "Staff adoption of new tools"
  ]
};

const ROLE_CONTACTS = {
  "Head of Marketing": ["CMO", "Growth Manager", "Demand Gen Lead"],
  "Sales Director": ["VP Sales", "Account Executive", "SDR Manager"],
  "Founder": ["Co-Founder", "CTO", "Head of Product"],
  "Growth Manager": ["Head of Growth", "Marketing Manager", "CEO"],
  "VP Sales": ["CRO", "Sales Director", "Account Executive"]
};

const OUTREACH_TIPS = {
  "Head of Marketing": "Reference their recent campaigns. Marketing leaders respond to data-backed openers and campaign performance angles.",
  "Sales Director": "Lead with pipeline metrics. Sales directors respond to ROI and quota attainment.",
  "Founder": "Keep it extremely short. Founders are busy — one clear value statement only.",
  "Growth Manager": "Mention growth benchmarks. Numbers get growth managers attention fast.",
  "VP Sales": "Focus on team efficiency and quota metrics. Reference their company growth stage."
};

// --- TEMPLATES ---
function generateColdEmail(lead: any) {
  const templates = [
    {
      subject: `Quick idea for ${lead.company}'s lead pipeline`,
      body: `Hi ${lead.name.split(' ')[0]},

I came across ${lead.company} and noticed you're doing impressive work in the ${lead.industry} space.

We built ProspectAI to help ${lead.industry} companies like yours identify high-quality prospects and automate personalized outreach — so your team spends less time closing.

Teams similar to ${lead.company} have seen 3x more qualified leads within 30 days.

Would you be open to a quick 10-minute call this week?

Best,
Sales Team`
    },
    {
      subject: `${lead.company} + ProspectAI`,
      body: `Hi ${lead.name.split(' ')[0]},

As ${lead.role} at ${lead.company}, I imagine finding the right prospects is a constant challenge.

ProspectAI uses AI to find decision makers at your ideal companies, enrich their contact info, and generate personalized outreach — all in one platform.

Would a 10-min demo be worth your time?

Best,
Sales Team`
    },
    {
      subject: `Helping ${lead.company} find more qualified leads`,
      body: `Hi ${lead.name.split(' ')[0]},

Quick question — how much time does your team spend on manual prospecting each week?

ProspectAI automates lead discovery for ${lead.industry} companies, helping teams reclaim hours while increasing qualified pipeline.

Happy to show you a 10-min demo.

Best,
Sales Team`
    }
  ];
  return templates[Math.floor(Math.random() * templates.length)];
}

function generateLinkedIn(lead: any) {
  const msgs = [
    `Hi ${lead.name.split(' ')[0]}, I came across ${lead.company} and love what you're building in ${lead.industry}. Would love to connect and share how we help similar teams scale outreach with AI.`, 
    `Hey ${lead.name.split(' ')[0]}, your work at ${lead.company} caught my attention. Think you'd find our AI prospecting approach interesting. Worth connecting?`, 
    `Hi ${lead.name.split(' ')[0]}, I help ${lead.industry} companies automate B2B outreach using AI. ${lead.company} seems like a great fit. Would love to connect!`
  ];
  return {
    subject: null,
    body: msgs[Math.floor(Math.random() * msgs.length)]
  };
}

function generateFollowUp(lead: any) {
  const templates = [
    {
      subject: `Following up — ${lead.company}`,
      body: `Hi ${lead.name.split(' ')[0]},

Just following up on my previous note. I know things get busy — totally understand.

${lead.industry} teams using ProspectAI are seeing 40% more replies from cold outreach within the first month.

If now isn't the right time, happy to reconnect next quarter.

Best,
Sales Team`
    },
    {
      subject: `Last note — quick value for ${lead.company}`,
      body: `Hi ${lead.name.split(' ')[0]},

Last follow-up, I promise.

ProspectAI helps ${lead.industry} teams cut prospecting time by 70% while increasing qualified leads.

If there's interest, a 10-min call is all it takes.

Best,
Sales Team`
    }
  ];
  return templates[Math.floor(Math.random() * templates.length)];
}

// --- STYLES ---
const GlobalStyles = () => (
  <style dangerouslySetInnerHTML={{ __html: `
    :root {
      --bg: #0A0A0F;
      --surface: #13131F;
      --sidebar: #0D0D1A;
      --border: #1E1E30;
      --primary: #6366F1;
      --secondary: #10B981;
      --hot: #EF4444;
      --warm: #F59E0B;
      --cold: #3B82F6;
      --text: #F8FAFC;
      --body: #CBD5E1;
      --muted: #94A3B8;
      --card-shadow: 0 8px 32px rgba(0,0,0,0.3);
    }

    .light-mode {
      --bg: #F1F5F9;
      --surface: #FFFFFF;
      --sidebar: #F8FAFC;
      --border: #E2E8F0;
      --primary: #6366F1;
      --secondary: #10B981;
      --text: #0F172A;
      --body: #334155;
      --muted: #64748B;
      --card-shadow: 0 4px 12px rgba(0,0,0,0.05);
    }

    body {
      background-color: var(--bg);
      color: var(--body);
      font-family: 'DM Sans', sans-serif;
      margin: 0;
      padding: 0;
      overflow-x: hidden;
      transition: background-color 0.3s ease;
    }

    h1, h2, h3, h4, h5, h6 {
      font-family: 'Sora', sans-serif;
      color: var(--text);
    }

    .glass {
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
    }

    .skeleton {
      background: linear-gradient(90deg, var(--border) 25%, #2A2A40 50%, var(--border) 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
      border-radius: 8px;
    }

    @keyframes shimmer {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }

    @keyframes pageEnter {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes toastEnter {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes rowEnter {
      from { opacity: 0; transform: translateX(-8px); }
      to { opacity: 1; transform: translateX(0); }
    }

    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
    }

    @keyframes pulse-soft {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
    }

    .page-enter {
      animation: pageEnter 400ms ease forwards;
    }

    .row-stagger {
      animation: rowEnter 300ms ease forwards;
    }

    .toast-enter {
      animation: toastEnter 300ms ease forwards;
    }

    .hover-scale {
      transition: all 200ms ease;
    }
    .hover-scale:hover {
      transform: scale(1.02);
    }
    .hover-scale:active {
      transform: scale(0.98);
    }

    .card-hover {
      transition: all 200ms ease;
    }
    .card-hover:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 32px rgba(99,102,241,0.15);
    }

    ::-webkit-scrollbar {
      width: 6px;
    }
    ::-webkit-scrollbar-track {
      background: transparent;
    }
    ::-webkit-scrollbar-thumb {
      background: var(--border);
      border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: var(--muted);
    }
  ` }} />
);

// --- COMPONENTS ---

const Toast = ({ message, type, onClose }: any) => {
  const icons: any = {
    success: <Check className="w-5 h-5 text-emerald-500" />,
    error: <X className="w-5 h-5 text-rose-500" />,
    info: <Bot className="w-5 h-5 text-indigo-500" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-500" />
  };

  const bgColors: any = {
    success: 'bg-emerald-500/10 border-emerald-500/20',
    error: 'bg-rose-500/10 border-rose-500/20',
    info: 'bg-indigo-500/10 border-indigo-500/20',
    warning: 'bg-amber-500/10 border-amber-500/20'
  };

  return (
    <div className={`toast-enter flex items-center gap-3 p-4 rounded-xl border glass shadow-2xl min-w-[300px] ${bgColors[type] || bgColors.info}`}>
      {icons[type] || icons.info}
      <span className="text-sm font-medium flex-1">{message}</span>
      <button onClick={onClose} className="hover:opacity-70 transition-opacity">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

const CountUp = ({ end, duration = 1500 }: { end: number, duration?: number }) => {  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration]);

  return <>{count.toLocaleString()}</>;
};

// --- MAIN APP ---

export default function App() {
  // State
  const [currentPage, setCurrentPage] = useState<string>("landing");
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [panelOpen, setPanelOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [toasts, setToasts] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<number>(3);
  const [leads, setLeads] = useState<any[]>(LEADS_DATA);
  const [isEnriching, setIsEnriching] = useState<boolean>(false);
  const [enrichmentProgress, setEnrichmentProgress] = useState<number>(0);
  const [showEnrichmentModal, setShowEnrichmentModal] = useState<boolean>(false);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState<boolean>(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState<boolean>(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState<boolean>(false);
  const [showAddLeadModal, setShowAddLeadModal] = useState<boolean>(false);
  const modalOpen = showEnrichmentModal || showAddLeadModal;
  const setModalOpen = (val: boolean) => {
    if (!val) {
      setShowEnrichmentModal(false);
      setShowAddLeadModal(false);
    }
  };
  const [finderLoading, setFinderLoading] = useState<boolean>(false);
  const [finderProgress, setFinderProgress] = useState<number>(0);
  const [outreachTab, setOutreachTab] = useState<string>("email");
  const [accentColor, setAccentColor] = useState<string>("#6366F1");
  const [activeSettingsTab, setActiveSettingsTab] = useState<string>("profile");

  // Close mobile menu on page change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [currentPage]);

  // Toast Function
  const showToast = (message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9) + Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  // Search Results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return leads.filter(l => 
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.role.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, leads]);

  // Derived Values
  const metrics = {
    totalLeads: 120,
    newToday: 12,
    emailsSent: 34,
    responseRate: 18
  };

  const statusCounts = {
    Hot: leads.filter(l => l.status === 'Hot').length,
    Warm: leads.filter(l => l.status === 'Warm').length,
    Cold: leads.filter(l => l.status === 'Cold').length
  };

  // Handlers
  const handleLeadClick = (lead: any) => {
    setSelectedLead(lead);
    setPanelOpen(true);
    showToast(`Viewing ${lead.name}'s profile`, 'info');
  };

  const handleEnrich = (lead: any) => {
    setSelectedLead(lead);
    setShowEnrichmentModal(true);
    setIsEnriching(true);
    setEnrichmentProgress(0);
  };

  const handleOutreachNavigate = (lead: any) => {
    setSelectedLead(lead);
    setCurrentPage("outreach");
    setPanelOpen(false);
    setShowEnrichmentModal(false);
  };

  const handleExportCSV = () => {
    const headers = "Name,Company,Role,Email,LinkedIn,Location,Size,Status,Score\n";
    const rows = leads.map(l => `${l.name},${l.company},${l.role},${l.email},${l.linkedin},${l.location},${l.size},${l.status},${l.score}`).join("\n");
    const csvContent = "data:text/csv;charset=utf-8," + headers + rows;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "prospectai-leads.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`${leads.length} leads exported`, 'success');
  };

  // Effects
  useEffect(() => {
    if (isEnriching) {
      const interval = setInterval(() => {
        setEnrichmentProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsEnriching(false);
            showToast(`AI enrichment complete for ${selectedLead?.company}`, 'success');
            return 100;
          }
          return prev + 2;
        });
      }, 40);
      return () => clearInterval(interval);
    }
  }, [isEnriching, selectedLead]);

  useEffect(() => {
    if (finderLoading) {
      setFinderProgress(0);
      const startTime = Date.now();
      const duration = 1500; // 1.5 seconds

      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(100, (elapsed / duration) * 100);
        
        setFinderProgress(progress);

        if (elapsed >= duration) {
          clearInterval(interval);
          setFinderLoading(false);
          setFinderProgress(100);
        }
      }, 16); // ~60fps

      return () => clearInterval(interval);
    }
  }, [finderLoading]);

  // Click Outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowNotificationDropdown(false);
      setShowProfileDropdown(false);
      setShowSearchDropdown(false);
    };
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  // --- SUB-COMPONENTS ---

  const Sidebar = () => {
    const navItems = [
      { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
      { id: 'finder', label: 'Lead Finder', icon: <Search size={20} /> },
      { id: 'leads', label: 'My Leads', icon: <Users size={20} /> },
      { id: 'outreach', label: 'AI Outreach', icon: <Bot size={20} /> },
      { id: 'analytics', label: 'Analytics', icon: <BarChart2 size={20} /> },
      { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
    ];

    return (
      <>
        {/* Mobile Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-[95] lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
        
        <aside 
          className={`fixed left-0 top-0 h-screen bg-[var(--sidebar)] border-r border-[var(--border)] glass z-[100] transition-transform duration-300 w-[240px] 
            ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4 flex flex-col h-full">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/20">
                  <Zap className="text-white fill-white" size={24} />
                </div>
                <div>
                  <h1 className="font-bold text-lg leading-none text-[var(--text)]">ProspectAI</h1>
                  <p className="text-[10px] text-[var(--muted)] font-medium mt-1 uppercase tracking-wider">AI Sales Intel</p>
                </div>
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="lg:hidden p-2 text-[var(--muted)] hover:text-[var(--text)] transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="space-y-1.5 flex-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id);
                    if (item.id === 'outreach' && !selectedLead) setSelectedLead(leads[0]);
                  }}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all group relative ${currentPage === item.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : `text-[var(--text)] ${darkMode ? 'hover:bg-indigo-500/10' : 'hover:bg-[#EEF2FF]'} hover:text-[var(--primary)]`}`}
                >
                  <span className="shrink-0">{item.icon}</span>
                  <span className="font-medium text-sm">{item.label}</span>
                </button>
              ))}
            </nav>

            <div className="mt-auto pt-6 border-t border-[var(--border)] flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold shrink-0">AS</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate text-[var(--text)]">Arjun Singh</p>
                <span className="text-[10px] bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded-full font-bold">PRO PLAN</span>
              </div>
            </div>
          </div>
        </aside>
      </>
    );
  };

  const Navbar = () => {
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    return (
      <header 
        className="fixed top-0 right-0 h-16 bg-[var(--surface)] border-b border-[var(--border)] z-[200] transition-all duration-300 left-0 lg:left-[240px]"
      >
        <div className="h-full px-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-[var(--muted)] hover:text-[var(--text)] transition-colors"
            >
              <Menu size={20} />
            </button>
            <h2 className="text-base md:text-[18px] font-bold capitalize text-[var(--text)] truncate max-w-[120px] md:max-w-none px-0 lg:pl-6">{currentPage.replace('-', ' ')}</h2>
          </div>

          <div className="relative group mx-4 flex-1 max-w-md hidden md:block">
            <div className={`absolute left-3 top-1/2 -translate-y-1/2 ${darkMode ? 'text-[var(--muted)]' : 'text-[#475569]'} group-focus-within:text-[var(--primary)] transition-colors`}>
              <Search size={18} />
            </div>
            <input 
              type="text" 
              placeholder="Search leads..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchDropdown(true);
              }}
              onFocus={() => setShowSearchDropdown(true)}
              onClick={(e) => e.stopPropagation()}
              className="w-full bg-[var(--surface)] border border-[var(--border)] rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-all text-[var(--text)]"
            />
            {showSearchDropdown && searchResults.length > 0 && (
              <div 
                className="fixed mt-2 w-full max-w-[448px] bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow-2xl overflow-hidden z-[9999]"
                onClick={(e) => e.stopPropagation()}
              >
                {searchResults.map(lead => (
                  <button 
                    key={lead.id}
                    onClick={() => {
                      handleLeadClick(lead);
                      setShowSearchDropdown(false);
                      setSearchQuery("");
                    }}
                    className="w-full flex items-center gap-3 p-3 hover:bg-indigo-500/5 transition-colors border-b border-[var(--border)] last:border-0"
                  >
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ backgroundColor: lead.color }}>{lead.initials}</div>
                    <div className="text-left">
                      <p className="text-sm font-bold text-[var(--text)]">{lead.name}</p>
                      <p className="text-xs text-[var(--muted)]">{lead.company}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className={`flex items-center gap-2 md:gap-4 ${darkMode ? 'text-[var(--muted)]' : 'text-[#475569]'}`}>
            <button 
              className="md:hidden w-10 h-10 rounded-xl hover:bg-[var(--border)] flex items-center justify-center transition-colors"
              onClick={() => setIsSearchVisible(!isSearchVisible)}
            >
              <Search size={20} />
            </button>

            <div className="relative">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowNotificationDropdown(!showNotificationDropdown);
                }}
                className="w-10 h-10 rounded-xl hover:bg-[var(--border)] flex items-center justify-center relative transition-colors"
              >
                <Bell size={20} />
                {notifications > 0 && (
                  <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-[var(--bg)]"></span>
                )}
              </button>
              {showNotificationDropdown && (
                <div 
                  className="fixed top-16 right-4 md:right-20 w-[calc(100vw-32px)] md:w-80 bg-[var(--surface)] border border-[var(--border)] rounded-2xl shadow-2xl overflow-hidden z-[9999]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-4 border-b border-[var(--border)] flex items-center justify-between">
                    <h3 className="font-bold text-[var(--text)]">Notifications</h3>
                    <span className="text-[10px] font-bold text-indigo-500 uppercase">3 New</span>
                  </div>
                  <div className="max-h-[300px] overflow-y-auto">
                    {[ 
                      { icon: '🟢', text: 'Sarah Johnson matched filters', time: '2m ago' },
                      { icon: '🟣', text: 'AI outreach sent to Rahul', time: '15m ago' },
                      { icon: '🔵', text: '3 new SaaS leads available', time: '1h ago' },
                    ].map((item, i) => (
                      <div key={i} className="p-4 hover:bg-indigo-500/5 border-b border-[var(--border)] last:border-0 cursor-pointer transition-colors">
                        <div className="flex gap-3">
                          <span className="text-lg">{item.icon}</span>
                          <div>
                            <p className="text-sm text-[var(--text)]">{item.text}</p>
                            <p className="text-xs text-[var(--muted)] mt-1">{item.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="w-10 h-10 rounded-xl hover:bg-[var(--border)] flex items-center justify-center transition-colors"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <div className="relative">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowProfileDropdown(!showProfileDropdown);
                }}
                className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center text-white font-bold hover:scale-105 transition-transform"
              >
                AS
              </button>
              {showProfileDropdown && (
                <div 
                  className="fixed top-16 right-4 md:right-6 w-56 bg-[var(--surface)] border border-[var(--border)] rounded-2xl shadow-2xl overflow-hidden z-[9999]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-4 border-b border-[var(--border)]">
                    <p className="font-bold text-sm text-[var(--text)]">Arjun Singh</p>
                    <p className="text-xs text-[var(--muted)] truncate">arjun@prospectai.io</p>
                  </div>
                  <div className="p-2">
                    <button 
                      onClick={() => {
                        setCurrentPage('settings');
                        setShowProfileDropdown(false);
                      }}
                      className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-indigo-500/5 text-sm transition-colors text-[var(--text)]"
                    > 
                      <Settings size={16} /> Settings 
                    </button>
                    <button 
                      onClick={() => {
                        showToast("Signed out successfully", "success");
                        setShowProfileDropdown(false);
                        setCurrentPage("landing");
                      }}
                      className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-rose-500/5 text-rose-500 text-sm transition-colors"
                    >
                      <LogOut size={16} /> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    );
  };

  const LeadDetailPanel = () => {
    if (!selectedLead) return null;

    const leadInfo = selectedLead;

    return (
      <>
        {panelOpen && (
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[299]"
            style={{ top: '64px' }}
            onClick={() => setPanelOpen(false)}
          />
        )}
        <div 
          className={`fixed top-16 right-0 h-[calc(100vh-64px)] w-full sm:w-[420px] bg-[var(--surface)] border-l border-[var(--border)] shadow-2xl z-[300] transition-transform duration-300 overflow-y-auto ${panelOpen ? 'translate-x-0' : 'translate-x-full'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative">
            <button 
              onClick={() => setPanelOpen(false)}
              className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white z-10 transition-colors"
            >
              <X size={20} />
            </button>

            <div 
              className="p-8 pb-12 text-center relative overflow-hidden"
              style={{ background: `linear-gradient(135deg, ${leadInfo.color}dd, ${leadInfo.color}88)` }}
            >
              <div className="absolute inset-0 bg-grid-white/10 opacity-20"></div>
              <div className="w-24 h-24 rounded-full border-4 border-white/30 mx-auto flex items-center justify-center text-4xl font-bold text-white shadow-2xl relative z-10">
                {leadInfo.initials}
              </div>
              <h3 className="text-2xl font-bold text-white mt-4 relative z-10">{leadInfo.name}</h3>
              <p className="text-white/80 font-medium relative z-10">{leadInfo.role} @ {leadInfo.company}</p>
              <div className="mt-2 flex items-center justify-center gap-2 text-white/70 text-sm relative z-10">
                <span>{leadInfo.flag} {leadInfo.location}</span>
                <span>•</span>
                <span>{leadInfo.size} employees</span>
              </div>
            </div>

            <div className="p-6 -mt-6 bg-[var(--surface)] rounded-t-3xl relative z-20 space-y-8">
              <div className="flex items-center justify-around bg-[var(--bg)] p-4 rounded-2xl border border-[var(--border)] shadow-inner">
                <div className="text-center">
                  <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${leadInfo.status === 'Hot' ? 'bg-rose-500/20 text-rose-500 border-rose-500/20' : leadInfo.status === 'Warm' ? 'bg-amber-500/20 text-amber-500 border-amber-500/20' : 'bg-blue-500/20 text-blue-500 border-blue-500/20'}`}>
                    {leadInfo.status}
                  </span>
                  <p className="text-[10px] text-[var(--muted)] mt-1 uppercase font-bold">Status</p>
                </div>
                <div className="w-px h-8 bg-[var(--border)]"></div>
                <div className="text-center">
                  <div className="flex items-center gap-1">
                    <div className="w-12 h-12 rounded-full border-2 flex items-center justify-center text-lg font-bold" style={{ borderColor: leadInfo.score > 85 ? '#10B981' : leadInfo.score > 70 ? '#F59E0B' : '#EF4444' }}>
                      {leadInfo.score}
                    </div>
                  </div>
                  <p className="text-[10px] text-[var(--muted)] mt-1 uppercase font-bold">AI Score</p>
                </div>
              </div>

              <section>
                <h4 className="text-xs font-bold uppercase text-[var(--muted)] tracking-widest mb-4 flex items-center gap-2">
                  <Mail size={14} className="text-indigo-500" /> Contact Information
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-[var(--bg)] rounded-xl border border-[var(--border)] group">
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] text-[var(--muted)] uppercase font-bold">Email</p>
                      <p className="text-sm truncate font-medium">{leadInfo.email}</p>
                    </div>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(leadInfo.email);
                        showToast("Email copied to clipboard", "success");
                      }}
                      className="p-2 hover:bg-[var(--border)] rounded-lg transition-colors group-hover:text-indigo-500"
                    >
                      <Copy size={16} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-[var(--bg)] rounded-xl border border-[var(--border)] group">
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] text-[var(--muted)] uppercase font-bold">LinkedIn</p>
                      <p className="text-sm truncate font-medium">{leadInfo.linkedin}</p>
                    </div>
                    <button className="p-2 hover:bg-[var(--border)] rounded-lg transition-colors group-hover:text-indigo-500">
                      <ExternalLink size={16} />
                    </button>
                  </div>
                </div>
              </section>

              <section>
                <h4 className="text-xs font-bold uppercase text-[var(--muted)] tracking-widest mb-4 flex items-center gap-2">
                  <Building size={14} className="text-indigo-500" /> Company Insights
                </h4>
                <div className="p-4 bg-[var(--bg)] rounded-xl border border-[var(--border)]">
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-bold">{leadInfo.company}</p>
                    <span className="text-[10px] font-bold bg-indigo-500/10 text-indigo-500 px-2 py-1 rounded-lg uppercase">{leadInfo.industry}</span>
                  </div>
                  <p className="text-sm text-[var(--muted)] leading-relaxed">
                    {leadInfo.company} is a leading {leadInfo.industry} firm focused on innovation. They are currently scaling their operations and looking for efficient ways to improve their {leadInfo.role.toLowerCase()} processes.
                  </p>
                  <div className="mt-4 pt-4 border-t border-[var(--border)] flex items-center justify-between text-xs font-medium text-[var(--muted)]">
                    <span className="flex items-center gap-1"><Globe size={12} /> {leadInfo.domain}</span>
                    <span className="flex items-center gap-1"><Users size={12} /> {leadInfo.size} employees</span>
                  </div>
                </div>
              </section>

              <section>
                <h4 className="text-xs font-bold uppercase text-[var(--muted)] tracking-widest mb-4 flex items-center gap-2">
                  <TrendingUp size={14} className="text-indigo-500" /> Lead Lifecycle
                </h4>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    {['Hot', 'Warm', 'Cold'].map(s => (
                      <button 
                        key={s}
                        onClick={() => {
                          const updated = leads.map(l => l.id === leadInfo.id ? { ...l, status: s } : l);
                          setLeads(updated);
                          setSelectedLead({ ...leadInfo, status: s });
                          showToast(`Status updated to ${s}`, "success");
                        }}
                        className={`flex-1 py-2 px-3 rounded-xl border text-sm font-bold transition-all ${leadInfo.status === s ? 
                          (s === 'Hot' ? 'bg-rose-500 text-white border-rose-500' : s === 'Warm' ? 'bg-amber-500 text-white border-amber-500' : 'bg-blue-500 text-white border-blue-500') : 
                          'bg-[var(--bg)] border-[var(--border)] text-[var(--muted)] hover:border-indigo-500/50'}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                  
                  <div className="relative group">
                    <select 
                      value={leadInfo.stage}
                      onChange={(e) => {
                        const s = e.target.value;
                        const updated = leads.map(l => l.id === leadInfo.id ? { ...l, stage: s } : l);
                        setLeads(updated);
                        setSelectedLead({ ...leadInfo, stage: s });
                        showToast(`Stage updated to ${s}`, "success");
                      }}
                      className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl py-3 px-4 text-sm font-medium focus:outline-none focus:border-indigo-500 appearance-none"
                    >
                      <option value="New">New Lead</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Replied">Replied</option>
                      <option value="Closed">Closed</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--muted)]">
                      <ChevronDown size={16} />
                    </div>
                  </div>

                  <textarea 
                    placeholder="Add private notes about this prospect..."
                    className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl p-4 text-sm focus:outline-none focus:border-indigo-500 min-h-[100px] resize-none"
                    value={leadInfo.notes || ""}
                    onChange={(e) => {
                      const notes = e.target.value;
                      const updated = leads.map(l => l.id === leadInfo.id ? { ...l, notes } : l);
                      setLeads(updated);
                      setSelectedLead({ ...leadInfo, notes });
                    }}
                  />
                </div>
              </section>

              <div className="sticky bottom-0 bg-[var(--surface)] pt-4 pb-8 space-y-3">
                <button 
                  onClick={() => handleEnrich(leadInfo)}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-indigo-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Zap size={18} className="fill-white" /> Run AI Enrichment
                </button>
                <button 
                  onClick={() => handleOutreachNavigate(leadInfo)}
                  className="w-full py-3 border border-emerald-500/50 text-emerald-500 hover:bg-emerald-500/10 rounded-xl font-bold flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Bot size={18} /> Generate Outreach
                </button>
                <button 
                  onClick={() => {
                    if (window.confirm("Are you sure you want to remove this lead?")) {
                      setLeads(leads.filter(l => l.id !== leadInfo.id));
                      setPanelOpen(false);
                      showToast("Lead removed", "success");
                    }
                  }}
                  className="w-full py-2 text-rose-500 text-xs font-bold hover:underline"
                >
                  Remove Lead
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const EnrichmentModal = () => {
    if (!showEnrichmentModal || !selectedLead) return null;

    const lead = selectedLead;
    const techStack = INDUSTRY_TECH[lead.industry as keyof typeof INDUSTRY_TECH] || INDUSTRY_TECH.SaaS;
    const painPoints = INDUSTRY_PAIN[lead.industry as keyof typeof INDUSTRY_PAIN] || INDUSTRY_PAIN.SaaS;
    const contacts = ROLE_CONTACTS[lead.role as keyof typeof ROLE_CONTACTS] || ROLE_CONTACTS.Founder;
    const tip = OUTREACH_TIPS[lead.role as keyof typeof OUTREACH_TIPS] || OUTREACH_TIPS.Founder;

    const statusTexts = [
      "Scanning company database...",
      "Analyzing decision makers...",
      "Detecting tech stack...",
      "Identifying pain points...",
      "Generating insights..."
    ];
    const statusIdx = Math.min(Math.floor((enrichmentProgress / 100) * statusTexts.length), statusTexts.length - 1);

    return (
      <div className="fixed inset-0 z-[500] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/70 glass" onClick={() => !isEnriching && setShowEnrichmentModal(false)} />
        
        <div className="relative w-full max-w-2xl bg-[var(--surface)] border border-[var(--border)] rounded-2xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col z-[501]">
          {isEnriching ? (
            <div className="p-12 text-center space-y-8">
              <div className="w-20 h-20 bg-indigo-500/20 rounded-2xl flex items-center justify-center mx-auto relative overflow-hidden">
                <Zap className="text-indigo-500 fill-indigo-500 animate-bounce" size={40} />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/20 to-transparent animate-pulse" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Analyzing {lead.company}...</h3>
                <p className="text-[var(--muted)] animate-pulse font-medium">{statusTexts[statusIdx]}</p>
              </div>
              <div className="w-full h-3 bg-[var(--bg)] border border-[var(--border)] rounded-full overflow-hidden max-w-sm mx-auto shadow-inner">
                <div 
                  className="h-full bg-indigo-600 transition-all duration-300 shadow-[0_0_20px_rgba(99,102,241,0.5)]"
                  style={{ width: `${enrichmentProgress}%` }}
                />
              </div>
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto opacity-40">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="h-20 skeleton" />
                ))}
              </div>
            </div>
          ) : (
            <>
              <div className="p-6 border-b border-[var(--border)] flex items-center justify-between sticky top-0 bg-[var(--surface)] z-10">
                <div>
                  <h3 className="text-xl font-bold flex items-center gap-2">AI Enrichment Complete <Check className="text-emerald-500" size={20} /></h3>
                  <p className="text-sm text-[var(--muted)]">{lead.company} • {lead.industry}</p>
                </div>
                <button onClick={() => setShowEnrichmentModal(false)} className="p-2 hover:bg-[var(--border)] rounded-xl transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 overflow-y-auto space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-[var(--bg)] border-l-4 border-indigo-500 rounded-r-xl space-y-2 card-hover page-enter" style={{ animationDelay: '100ms' }}>
                    <h4 className="text-xs font-bold uppercase text-indigo-500 flex items-center gap-2"><Building size={14} /> Company Summary</h4>
                    <p className="text-sm leading-relaxed text-[var(--muted)]">
                      {lead.company} is a fast-growing {lead.industry} company helping businesses scale their operations. Based in {lead.location} with {lead.size} employees, they are focused on optimizing their {lead.role.toLowerCase()} efficiency.
                    </p>
                  </div>

                  <div className="p-4 bg-[var(--bg)] border-l-4 border-emerald-500 rounded-r-xl space-y-2 card-hover page-enter" style={{ animationDelay: '200ms' }}>
                    <h4 className="text-xs font-bold uppercase text-emerald-500 flex items-center gap-2"><Mail size={14} /> Email Pattern</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-mono">first@{lead.domain}</span>
                        <button 
                          onClick={() => {
                            navigator.clipboard.writeText(`first@${lead.domain}`);
                            showToast("Pattern copied", "success");
                          }}
                          className="text-emerald-500 hover:scale-110 transition-transform"
                        >
                          <Copy size={14} />
                        </button>
                      </div>
                      <div className="w-full h-1.5 bg-black/20 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: '87%' }} />
                      </div>
                      <p className="text-[10px] text-[var(--muted)] font-bold uppercase">87% Confidence Rate</p>
                    </div>
                  </div>

                  <div className="p-4 bg-[var(--bg)] border-l-4 border-purple-500 rounded-r-xl space-y-3 card-hover page-enter" style={{ animationDelay: '300ms' }}>
                    <h4 className="text-xs font-bold uppercase text-purple-500 flex items-center gap-2"><Users size={14} /> Target Contacts</h4>
                    <div className="flex flex-wrap gap-2">
                      {contacts.map(c => (
                        <span key={c} className="text-[10px] font-bold bg-purple-500/10 text-purple-500 px-2.5 py-1 rounded-full">{c}</span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-[var(--bg)] border-l-4 border-orange-500 rounded-r-xl space-y-3 card-hover page-enter" style={{ animationDelay: '400ms' }}>
                    <h4 className="text-xs font-bold uppercase text-orange-500 flex items-center gap-2"><Cpu size={14} /> Likely Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {techStack.map((t, idx) => (
                        <span key={t} className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${idx === 0 ? 'bg-indigo-500/10 text-indigo-500' : idx === 1 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-[var(--bg)] border-l-4 border-rose-500 rounded-r-xl space-y-2 card-hover page-enter" style={{ animationDelay: '500ms' }}>
                    <h4 className="text-xs font-bold uppercase text-rose-500 flex items-center gap-2"><Target size={14} /> Key Pain Points</h4>
                    <ul className="space-y-1.5">
                      {painPoints.map(p => (
                        <li key={p} className="text-xs text-[var(--muted)] flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1 shrink-0" /> {p}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl space-y-2 card-hover page-enter" style={{ animationDelay: '600ms' }}>
                    <h4 className="text-xs font-bold uppercase text-amber-500 flex items-center gap-2"><Lightbulb size={14} /> AI Outreach Tip</h4>
                    <p className="text-xs text-amber-600/90 dark:text-amber-400/90 italic leading-relaxed">
                      "{tip}"
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-[var(--border)] bg-[var(--bg)]/50 flex flex-wrap gap-3">
                <button 
                  onClick={() => handleEnrich(lead)}
                  className="flex-1 py-3 bg-[var(--surface)] border border-[var(--border)] hover:border-indigo-500/50 text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <RefreshCw size={16} /> Re-analyze
                </button>
                <button 
                  onClick={() => handleOutreachNavigate(lead)}
                  className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20"
                >
                  <Bot size={16} /> Generate Outreach
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  const PageWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="page-enter space-y-6">
      {children}
    </div>
  );

  // --- PAGES ---

  const LandingPage = () => {
    return (
      <div className="fixed inset-0 z-[1000] bg-[var(--bg)] overflow-y-auto selection:bg-indigo-500 selection:text-white">
        {/* Background Animation */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-5%] w-[400px] h-[400px] bg-indigo-600/15 rounded-full blur-[80px]" style={{ animation: 'float 8s ease-in-out infinite' }} />
          <div className="absolute bottom-[10%] right-[-5%] w-[300px] h-[300px] bg-purple-600/15 rounded-full blur-[80px]" style={{ animation: 'float 6s ease-in-out infinite 1s' }} />
          <div className="absolute top-[40%] right-[10%] w-[200px] h-[200px] bg-emerald-600/10 rounded-full blur-[80px]" style={{ animation: 'float 10s ease-in-out infinite 2s' }} />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-12">
          {/* Header */}
          <nav className="flex items-center justify-between mb-16 md:mb-24 py-4 px-5 md:px-0 md:py-4 gap-4">
            <div className="flex items-center gap-2 shrink-0">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <Zap className="text-white fill-white w-5 h-5 md:w-6 md:h-6" />
              </div>
              <span className="font-bold text-base md:text-xl tracking-tight text-[var(--text)]">ProspectAI</span>
            </div>
            <div className="flex items-center gap-3 md:gap-6 shrink-0">
              <button 
                onClick={() => setCurrentPage("signin")}
                className="text-[13px] md:text-sm font-bold hover:text-indigo-500 transition-colors px-3 py-2 md:px-0 md:py-0"
              >
                Sign In
              </button>
              <button 
                onClick={() => setCurrentPage("signin")}
                className="px-3.5 py-2 md:px-5 md:py-2.5 bg-indigo-600 text-white rounded-xl text-[13px] md:text-sm font-bold shadow-xl shadow-indigo-600/20 hover:scale-105 transition-all whitespace-nowrap"
              >
                Get Started Free
              </button>
            </div>
          </nav>

          {/* Hero */}
          <div className="text-center max-w-3xl mx-auto mb-32">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 text-xs font-bold uppercase tracking-widest mb-8">
              <TrendingUp size={14} /> Trusted by 500+ Sales Teams
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-8">
              Find High-Quality B2B Leads and 
              <span className="block mt-2 bg-gradient-to-r from-indigo-500 via-emerald-500 to-indigo-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-[shimmer_5s_linear_infinite]">
                Automate Outreach with AI
              </span>
            </h1>
            <p className="text-lg md:text-xl text-[var(--muted)] mb-12 max-w-2xl mx-auto leading-relaxed">
              ProspectAI helps sales teams discover ideal companies, enrich contact info, and generate personalized outreach messages in seconds.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => setCurrentPage("signin")}
                className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg shadow-2xl shadow-indigo-600/30 hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                Start Finding Leads <ChevronRight size={20} />
              </button>
              <button 
                onClick={() => setCurrentPage("dashboard")}
                className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-indigo-500/30 text-indigo-500 hover:bg-indigo-500/5 rounded-2xl font-bold text-lg transition-all"
              >
                View Dashboard
              </button>
            </div>

            {/* Social Proof */}
            <div className="mt-16 flex flex-col items-center gap-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-[var(--bg)] bg-indigo-500/20 flex items-center justify-center text-[10px] font-bold ring-2 ring-indigo-500/10">
                    {String.fromCharCode(64 + i)}S
                  </div>
                ))}
              </div>
              <p className="text-sm text-[var(--muted)] font-medium">Join 500+ sales teams already using ProspectAI</p>
            </div>
          </div>

          {/* Floating Visual */}
          <div className="relative mb-40">
            <div className="absolute inset-0 bg-indigo-500/10 blur-[120px] rounded-full" />
            <div className="relative bg-[var(--surface)] border border-[var(--border)] rounded-3xl shadow-[0_32px_80px_rgba(0,0,0,0.5)] overflow-hidden rotate-[-2deg] transition-transform hover:rotate-0 duration-700">
              <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold">Pipeline Overview</h3>
                    <div className="flex gap-2">
                      <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse delay-75" />
                      <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse delay-150" />
                    </div>
                  </div>
                  <div className="h-48 w-full bg-indigo-500/5 rounded-2xl border border-indigo-500/10 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 flex items-end">
                      <svg viewBox="0 0 400 100" className="w-full h-24 text-indigo-500/20" preserveAspectRatio="none">
                        <path d="M0,80 C100,20 200,60 300,30 L400,90 L400,100 L0,100 Z" fill="currentColor" />
                      </svg>
                      <svg viewBox="0 0 400 100" className="w-full h-24 text-indigo-500 absolute bottom-0" preserveAspectRatio="none">
                        <path d="M0,80 C100,20 200,60 300,30 L400,90" fill="none" stroke="currentColor" strokeWidth="2" />
                      </svg>
                    </div>
                    <div className="relative text-center">
                      <p className="text-xs text-[var(--muted)] uppercase tracking-widest font-bold">Lead Velocity</p>
                      <p className="text-2xl font-bold">+128%</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="p-6 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 text-center">
                    <p className="text-xs text-emerald-500 uppercase font-bold tracking-widest mb-1">Response Rate</p>
                    <p className="text-4xl font-extrabold text-emerald-500">18.4%</p>
                    <div className="mt-4 flex items-center justify-center gap-1 text-[10px] text-emerald-500/70 font-bold">
                      <ArrowUpRight size={12} /> 4.2% since yesterday
                    </div>
                  </div>
                  <div className="p-6 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 text-center">
                    <p className="text-xs text-indigo-500 uppercase font-bold tracking-widest mb-1">Total Leads</p>
                    <p className="text-4xl font-extrabold text-indigo-500">1,240</p>
                    <div className="mt-4 flex items-center justify-center gap-1 text-[10px] text-indigo-500/70 font-bold">
                      <Plus size={12} /> 12 matched today
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="text-center mb-40">
            <h2 className="text-3xl md:text-5xl font-bold mb-16">Everything you need to close more deals</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[ 
                { icon: <Search />, title: "AI Lead Finder", desc: "Discover decision makers using intelligent industry and role filters" },
                { icon: <Zap />, title: "AI Enrichment", desc: "Instantly enrich leads with company insights, tech stack, and pain points" },
                { icon: <Bot />, title: "AI Outreach", desc: "Generate personalized cold emails and LinkedIn messages tailored to each lead" },
                { icon: <BarChart2 />, title: "Analytics", desc: "Track pipeline performance and outreach ROI with real-time charts" },
              ].map((f, i) => (
                <div key={i} className="p-8 bg-[var(--surface)] border border-[var(--border)] rounded-3xl text-left card-hover group">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 mb-6 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                    {f.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-3">{f.title}</h3>
                  <p className="text-[var(--muted)] text-sm leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Steps */}
          <div className="text-center mb-40">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <div className="flex-1 max-w-xs p-8 rounded-3xl bg-indigo-500/5 border border-indigo-500/10">
                <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold mx-auto mb-4">1</div>
                <h4 className="font-bold mb-2">Search</h4>
                <p className="text-xs text-[var(--muted)]">Filter 100M+ prospects to find your ideal buyer</p>
              </div>
              <ChevronRight className="rotate-90 md:rotate-0 text-[var(--muted)] opacity-30" />
              <div className="flex-1 max-w-xs p-8 rounded-3xl bg-indigo-500/5 border border-indigo-500/10">
                <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold mx-auto mb-4">2</div>
                <h4 className="font-bold mb-2">Enrich</h4>
                <p className="text-xs text-[var(--muted)]">Get AI-driven insights on every lead instantly</p>
              </div>
              <ChevronRight className="rotate-90 md:rotate-0 text-[var(--muted)] opacity-30" />
              <div className="flex-1 max-w-xs p-8 rounded-3xl bg-indigo-500/5 border border-indigo-500/10">
                <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold mx-auto mb-4">3</div>
                <h4 className="font-bold mb-2">Outreach</h4>
                <p className="text-xs text-[var(--muted)]">Launch personalized campaigns that get replies</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="p-12 md:p-20 rounded-[40px] bg-gradient-to-br from-indigo-600 to-purple-700 text-center text-white relative overflow-hidden shadow-3xl">
            <div className="absolute inset-0 bg-grid-white/10 opacity-20" />
            <h2 className="text-3xl md:text-5xl font-bold mb-6 relative z-10">Ready to 10x your pipeline?</h2>
            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-xl mx-auto relative z-10">Start finding your next high-value customers today with AI-powered sales intelligence.</p>
            <button 
              onClick={() => setCurrentPage("dashboard")}
              className="px-10 py-5 bg-white text-indigo-600 rounded-2xl font-bold text-lg shadow-2xl hover:scale-105 transition-all relative z-10"
            >
              Get Started Free →
            </button>
            <p className="mt-6 text-white/60 text-sm relative z-10 font-medium tracking-wide uppercase">No credit card required</p>
          </div>
        </div>
      </div>
    );
  };

  const SignInPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setCurrentPage("dashboard");
        showToast("Welcome back! 👋", "success");
      }, 800);
    };

    return (
      <div className="fixed inset-0 z-[1000] bg-[var(--bg)] flex items-center justify-center overflow-y-auto p-6">
        {/* Background Animation (Same as landing) */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden bg-[radial-gradient(circle_at_center,#1E1B4B_0%,#0A0A0F_100%)]">
          <div className="absolute top-[-10%] left-[-5%] w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px]" style={{ animation: 'float 8s ease-in-out infinite' }} />
          <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px]" style={{ animation: 'float 6s ease-in-out infinite' }} />
        </div>

        <div className="relative w-full max-w-[420px] page-enter">
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[32px] p-8 shadow-2xl shadow-black/50">
            <div className="text-center mb-8">
              <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-600/30 mx-auto mb-6">
                <Zap className="text-white fill-white" size={28} />
              </div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">Welcome Back</h2>
              <p className="text-[var(--muted)] font-medium">Sign in to your account</p>
            </div>

            <form onSubmit={handleSignIn} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-[var(--muted)] tracking-widest px-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)]" size={18} />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl py-3.5 pl-12 pr-4 text-sm font-medium focus:outline-none focus:border-indigo-500 transition-all text-[var(--text)]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between px-1">
                  <label className="text-[10px] font-bold uppercase text-[var(--muted)] tracking-widest">Password</label>
                  <button 
                    type="button"
                    onClick={() => showToast("Password reset link sent to your email", "info")}
                    className="text-[10px] font-bold uppercase text-indigo-500 hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)]">
                    <div className="w-4.5 h-4.5 border-2 border-[var(--muted)] rounded flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-[var(--muted)] rounded-full" />
                    </div>
                  </div>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl py-3.5 pl-12 pr-12 text-sm font-medium focus:outline-none focus:border-indigo-500 transition-all text-[var(--text)]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--muted)] hover:text-white transition-colors p-1"
                  >
                    {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 px-1">
                <input 
                  type="checkbox" 
                  id="remember" 
                  defaultChecked
                  className="w-4 h-4 rounded border-[var(--border)] bg-[var(--bg)] text-indigo-600 focus:ring-indigo-500" 
                />
                <label htmlFor="remember" className="text-sm font-medium text-[var(--muted)]">Remember me</label>
              </div>

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-xl shadow-indigo-600/30 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <RefreshCw className="animate-spin" size={20} />
                ) : (
                  "Sign In"
                )}
              </button>

              <div className="relative flex items-center py-4">
                <div className="flex-grow border-t border-[var(--border)]"></div>
                <span className="flex-shrink mx-4 text-xs font-bold text-[var(--muted)] uppercase tracking-widest">or</span>
                <div className="flex-grow border-t border-[var(--border)]"></div>
              </div>

              <button 
                type="button"
                onClick={() => {
                  setIsLoading(true);
                  setTimeout(() => {
                    setIsLoading(false);
                    setCurrentPage("dashboard");
                    showToast("Welcome back! 👋", "success");
                  }, 800);
                }}
                className="w-full py-3.5 bg-transparent border border-[var(--border)] hover:bg-[var(--bg)] rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-3 text-[var(--text)]"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Continue with Google
              </button>
            </form>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm font-medium text-[var(--muted)]">
              Don't have an account?{" "}
              <button 
                onClick={() => setCurrentPage("landing")}
                className="text-indigo-500 font-bold hover:underline"
              >
                Get Started Free
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  };

  const DashboardPage = () => {
    return (
      <PageWrapper>
        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {[ 
            { label: "Total Leads", val: metrics.totalLeads, icon: <Users />, trend: "+12%", color: "indigo" },
            { label: "New Today", val: metrics.newToday, icon: <TrendingUp />, trend: "+4%", color: "emerald" },
            { label: "Emails Sent", val: metrics.emailsSent, icon: <Send />, trend: "+18%", color: "purple" },
            { label: "Response Rate", val: metrics.responseRate, icon: <Activity />, trend: "+2%", color: "amber", suffix: "%" },
          ].map((m, i) => (
            <div key={i} className="bg-[var(--surface)] border border-[var(--border)] p-5 lg:p-6 rounded-2xl card-hover flex items-center gap-4 lg:gap-5 w-full mb-3 md:mb-0">
              <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-2xl flex items-center justify-center shadow-lg shrink-0 ${ 
                m.color === 'indigo' ? 'bg-indigo-500/10 text-indigo-500' : 
                m.color === 'emerald' ? 'bg-emerald-500/10 text-emerald-500' : 
                m.color === 'purple' ? 'bg-purple-500/10 text-purple-500' : 
                'bg-amber-500/10 text-amber-500'
              }`}>
                {m.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className={`text-[10px] lg:text-xs font-bold ${darkMode ? 'text-[var(--muted)]' : 'text-[#475569]'} uppercase tracking-widest truncate`}>{m.label}</p>
                  <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full shrink-0">{m.trend}</span>
                </div>
                <h3 className="text-2xl lg:text-3xl font-extrabold tracking-tight">
                  <CountUp end={m.val} />{m.suffix}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[var(--surface)] border border-[var(--border)] p-4 lg:p-6 rounded-2xl shadow-sm">
            <h3 className="text-base lg:text-lg font-bold mb-6 flex items-center justify-between">
              Lead Growth – Last 7 Days
              <span className="text-[10px] font-medium text-[var(--muted)] px-3 py-1 bg-[var(--bg)] border border-[var(--border)] rounded-full">Weekly View</span>
            </h3>
            <div className="h-[250px] lg:h-72 w-full min-h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={leadGrowth}>
                  <defs>
                    <linearGradient id="leadGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 10 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 10 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px' }}
                    labelStyle={{ color: 'var(--text)' }}
                    itemStyle={{ color: 'var(--text)' }}
                  />
                  <Area type="monotone" dataKey="leads" stroke="#6366F1" strokeWidth={3} fillOpacity={1} fill="url(#leadGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-[var(--surface)] border border-[var(--border)] p-4 lg:p-6 rounded-2xl shadow-sm">
            <h3 className="text-base lg:text-lg font-bold mb-6 flex items-center justify-between">
              Leads by Industry
              <PieChartIcon size={20} className="text-[var(--muted)]" />
            </h3>
            <div className="h-[250px] lg:h-72 w-full min-h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={industryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={8}
                    dataKey="value"
                    animationDuration={1500}
                  >
                    {industryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px' }}
                    labelStyle={{ color: 'var(--text)' }}
                    itemStyle={{ color: 'var(--text)' }}
                  />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '10px', fontWeight: 'bold' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Activity & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-sm flex flex-col">
            <div className="p-4 lg:p-6 border-b border-[var(--border)] flex items-center justify-between">
              <h3 className="font-bold flex items-center gap-2">Recent Activity</h3>
              <button className="text-xs font-bold text-indigo-500 hover:underline">View All</button>
            </div>
            <div className="flex-1">
              {[ 
                { dot: 'bg-emerald-500', text: 'Sarah Johnson added via Lead Finder', time: '2m ago' },
                { dot: 'bg-purple-500', text: 'AI email generated for Rahul Mehta', time: '15m ago' },
                { dot: 'bg-indigo-500', text: 'Outreach sent to Emily Carter', time: '1h ago' },
                { dot: 'bg-amber-500', text: 'Daniel Lee moved to Warm', time: '2h ago' },
                { dot: 'bg-emerald-500', text: 'Priya Sharma enriched by AI', time: '3h ago' },
              ].map((act, i) => (
                <div key={i} className="flex items-center gap-4 p-4 border-b border-[var(--border)] last:border-0 hover:bg-indigo-500/5 transition-colors cursor-pointer group">
                  <div className={`w-2.5 h-2.5 rounded-full ${act.dot} shrink-0 shadow-lg shadow-${act.dot}/30`} />
                  <p className="text-sm flex-1 font-medium group-hover:text-indigo-500 transition-colors">{act.text}</p>
                  <span className="text-[10px] text-[var(--muted)] font-bold bg-[var(--bg)] px-2 py-1 rounded-full uppercase tracking-tighter shrink-0">{act.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[var(--surface)] border border-[var(--border)] p-4 lg:p-6 rounded-2xl shadow-sm">
              <h3 className="font-bold mb-6">Quick Actions</h3>
              <div className="grid grid-cols-1 gap-3">
                <button 
                  onClick={() => setCurrentPage("finder")}
                  className="w-full flex items-center justify-between p-4 bg-[var(--bg)] border border-[var(--border)] rounded-xl hover:border-indigo-500 hover:bg-indigo-500/5 transition-all group text-left"
                >
                  <div className="flex items-center gap-3">
                    <Search className="text-indigo-500" size={20} />
                    <span className="font-bold text-sm">Find New Leads</span>
                  </div>
                  <ChevronRight size={16} className="text-[var(--muted)] group-hover:translate-x-1 transition-transform shrink-0" />
                </button>
                <button 
                  onClick={() => {
                    if (!selectedLead) setSelectedLead(leads[0]);
                    setCurrentPage("outreach");
                  }}
                  className="w-full flex items-center justify-between p-4 bg-[var(--bg)] border border-[var(--border)] rounded-xl hover:border-indigo-500 hover:bg-indigo-500/5 transition-all group text-left"
                >
                  <div className="flex items-center gap-3">
                    <Bot className="text-purple-500" size={20} />
                    <span className="font-bold text-sm">Generate Outreach</span>
                  </div>
                  <ChevronRight size={16} className="text-[var(--muted)] group-hover:translate-x-1 transition-transform shrink-0" />
                </button>
                <button 
                  onClick={() => setCurrentPage("analytics")}
                  className="w-full flex items-center justify-between p-4 bg-[var(--bg)] border border-[var(--border)] rounded-xl hover:border-indigo-500 hover:bg-indigo-500/5 transition-all group text-left"
                >
                  <div className="flex items-center gap-3">
                    <BarChart2 className="text-emerald-500" size={20} />
                    <span className="font-bold text-sm">View Analytics</span>
                  </div>
                  <ChevronRight size={16} className="text-[var(--muted)] group-hover:translate-x-1 transition-transform shrink-0" />
                </button>
              </div>
            </div>

            <div className="bg-[var(--surface)] border border-[var(--border)] p-4 lg:p-6 rounded-2xl shadow-sm">
              <h3 className="font-bold mb-4 flex items-center justify-between">
                Pipeline Status
                <span className="text-[10px] uppercase font-bold text-[var(--muted)] tracking-widest">Across 120 Leads</span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[ 
                  { label: 'New', count: 8, color: 'indigo' },
                  { label: 'Sent', count: 5, color: 'amber' },
                  { label: 'Reply', count: 3, color: 'emerald' },
                  { label: 'Closed', count: 2, color: 'slate' },
                ].map((p, i) => (
                  <div key={i} className="bg-[var(--bg)] border border-[var(--border)] p-3 rounded-xl text-center">
                    <p className="text-lg font-extrabold" style={{ color: p.color === 'indigo' ? '#6366F1' : p.color === 'amber' ? '#F59E0B' : p.color === 'emerald' ? '#10B981' : '#94A3B8' }}>{p.count}</p>
                    <p className="text-[10px] uppercase font-bold text-[var(--muted)]">{p.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
    );
  };

    const FinderPage = () => {
    const [industry, setIndustry] = useState("All Industries");
    const [companySize, setCompanySize] = useState("All Sizes");
    const [location, setLocation] = useState("All Locations");

    const handleFilterChange = (setter: (val: string) => void, val: string) => {
      setter(val);
      setFinderLoading(true);
    };

    const selectStyle: React.CSSProperties = {
      background: '#13131F',
      color: '#F8FAFC',
      border: '1px solid #1E1E30',
      borderRadius: '10px',
      padding: '10px 16px',
      width: '100%',
      cursor: 'pointer',
      appearance: 'none',
      fontSize: '14px',
      fontWeight: '500',
      zIndex: 9999,
      position: 'relative',
      pointerEvents: 'all'
    };

    const containerStyle = "space-y-2 group w-full relative";

    return (
      <PageWrapper>
        <header>
          <h2 className="text-3xl font-bold tracking-tight">Find Your Next Customer</h2>
          <p className="text-[var(--muted)] mt-1 font-medium">AI-powered filters to discover your ideal decision makers from 100M+ profiles</p>
        </header>

        <div className="bg-[var(--surface)] border border-[var(--border)] p-6 rounded-3xl shadow-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className={containerStyle}>
              <label htmlFor="industry-select" className="text-xs font-bold uppercase text-[var(--muted)] tracking-widest px-1 cursor-pointer">Industry</label>
              <div className="relative">
                <select 
                  id="industry-select"
                  value={industry}
                  style={selectStyle}
                  onChange={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    handleFilterChange(setIndustry, e.target.value);
                  }}
                  className="focus:outline-none focus:border-indigo-500"
                >
                  <option value="All Industries">All Industries</option>
                  <option value="SaaS">SaaS</option>
                  <option value="Fintech">Fintech</option>
                  <option value="E-commerce">E-commerce</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Marketing">Marketing</option>
                  <option value="EdTech">EdTech</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-[#F8FAFC] pointer-events-none" size={16} />
              </div>
            </div>

            <div className={containerStyle}>
              <label htmlFor="size-select" className="text-xs font-bold uppercase text-[var(--muted)] tracking-widest px-1 cursor-pointer">Company Size</label>
              <div className="relative">
                <select 
                  id="size-select"
                  value={companySize}
                  style={selectStyle}
                  onChange={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    handleFilterChange(setCompanySize, e.target.value);
                  }}
                  className="focus:outline-none focus:border-indigo-500"
                >
                  <option value="All Sizes">All Sizes</option>
                  <option value="1-10">1-10</option>
                  <option value="10-50">10-50</option>
                  <option value="50-200">50-200</option>
                  <option value="200-1000">200-1000</option>
                  <option value="1000+">1000+</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-[#F8FAFC] pointer-events-none" size={16} />
              </div>
            </div>

            <div className={containerStyle}>
              <label htmlFor="location-select" className="text-xs font-bold uppercase text-[var(--muted)] tracking-widest px-1 cursor-pointer">Location</label>
              <div className="relative">
                <select 
                  id="location-select"
                  value={location}
                  style={selectStyle}
                  onChange={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    handleFilterChange(setLocation, e.target.value);
                  }}
                  className="focus:outline-none focus:border-indigo-500"
                >
                  <option value="All Locations">All Locations</option>
                  <option value="USA">USA</option>
                  <option value="India">India</option>
                  <option value="UK">UK</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                  <option value="Remote">Remote</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-[#F8FAFC] pointer-events-none" size={16} />
              </div>
            </div>

            <div className="flex items-end">
              <button 
                onClick={() => setFinderLoading(true)}
                className="w-full h-[46px] bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Search size={18} /> Find Leads
              </button>
            </div>
          </div>
        </div>

        {finderLoading ? (
          <div className="space-y-4 py-8">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <Bot className="text-indigo-500 animate-bounce" size={24} />
                <h3 className="font-bold text-lg">🤖 AI scanning 10,000+ companies...</h3>
              </div>
              <span className="text-indigo-500 font-bold">{Math.floor(finderProgress)}%</span>
            </div>
            <div className="w-full h-2 bg-[var(--surface)] border border-[var(--border)] rounded-full overflow-hidden">
              <div className="h-full bg-indigo-600 transition-all duration-300" style={{ width: `${finderProgress}%` }} />
            </div>
            <div className="grid grid-cols-1 gap-4 pt-4">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="h-20 skeleton" style={{ animationDelay: `${i * 150}ms` }} />
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 bg-indigo-500/5 border border-indigo-500/10 p-4 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-500/20 flex items-center justify-center text-indigo-500">
                  <Bot size={20} />
                </div>
                <div>
                  <h4 className="font-bold">AI Search Complete</h4>
                  <p className="text-xs text-[var(--muted)]">✨ Showing 5 best-matched leads based on your criteria</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-indigo-500 bg-indigo-500/10 px-3 py-1.5 rounded-full border border-indigo-500/20">5 Found</span>
                <span className="text-xs font-bold text-rose-500 bg-rose-500/10 px-3 py-1.5 rounded-full border border-rose-500/20">3 Hot</span>
                <span className="text-xs font-bold text-amber-500 bg-amber-500/10 px-3 py-1.5 rounded-full border border-amber-500/20">2 Warm</span>
              </div>
            </div>
            <LeadsTable />
          </div>
        )}
      </PageWrapper>
    );
  };

  const LeadsTable = ({ filter = "" }: { filter?: string }) => {
    const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' } | null>(null);
    const [currentPageTable, setCurrentPageTable] = useState(1);

    const filteredLeads = useMemo(() => {
      let result = leads.filter(l => 
        l.name.toLowerCase().includes(filter.toLowerCase()) ||
        l.company.toLowerCase().includes(filter.toLowerCase()) ||
        l.role.toLowerCase().includes(filter.toLowerCase())
      );

      if (sortConfig) {
        result.sort((a, b) => {
          if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
          if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
          return 0;
        });
      }
      return result;
    }, [leads, filter, sortConfig]);

    const requestSort = (key: string) => {
      let direction: 'asc' | 'desc' = 'asc';
      if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
        direction = 'desc';
      }
      setSortConfig({ key, direction });
    };

    return (
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl overflow-hidden shadow-sm flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--bg)]/50 border-b border-[var(--border)]">
                <th className="p-4 text-xs font-bold uppercase text-[var(--muted)] tracking-widest w-12">#</th>
                <th 
                  className="p-4 text-xs font-bold uppercase text-[var(--muted)] tracking-widest cursor-pointer hover:text-indigo-500 transition-colors"
                  onClick={() => requestSort('name')}
                >
                  <div className="flex items-center gap-2">Name {sortConfig?.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</div>
                </th>
                <th 
                  className="p-4 text-xs font-bold uppercase text-[var(--muted)] tracking-widest cursor-pointer hover:text-indigo-500 transition-colors"
                  onClick={() => requestSort('company')}
                >
                  <div className="flex items-center gap-2">Company {sortConfig?.key === 'company' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</div>
                </th>
                <th className="p-4 text-xs font-bold uppercase text-[var(--muted)] tracking-widest">Role</th>
                <th className="p-4 text-xs font-bold uppercase text-[var(--muted)] tracking-widest">Location</th>
                <th className="p-4 text-xs font-bold uppercase text-[var(--muted)] tracking-widest text-center">Size</th>
                <th className="p-4 text-xs font-bold uppercase text-[var(--muted)] tracking-widest text-center">Status</th>
                <th className="p-4 text-xs font-bold uppercase text-[var(--muted)] tracking-widest text-center">Score</th>
                <th className="p-4 text-xs font-bold uppercase text-[var(--muted)] tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead, i) => (
                <tr 
                  key={lead.id} 
                  className="border-b border-[var(--border)] last:border-0 hover:bg-indigo-500/[0.02] transition-colors group cursor-pointer"
                  style={{ animation: 'rowEnter 300ms ease forwards', animationDelay: `${i * 80}ms`, opacity: 0 }}
                  onClick={() => handleLeadClick(lead)}
                >
                  <td className="p-4 text-xs font-bold text-[var(--muted)]">{i + 1}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white shrink-0 shadow-lg shadow-black/10 group-hover:scale-110 transition-transform" style={{ backgroundColor: lead.color }}>
                        {lead.initials}
                      </div>
                      <span className="font-bold text-sm whitespace-nowrap">{lead.name}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold group-hover:text-indigo-500 transition-colors">{lead.company}</span>
                      <span className="text-[10px] text-[var(--muted)] font-bold uppercase truncate max-w-[100px]">{lead.domain}</span>
                    </div>
                  </td>
                  <td className="p-4 text-sm font-medium whitespace-nowrap">{lead.role}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-1.5 whitespace-nowrap">
                      <span className="text-sm">{lead.flag}</span>
                      <span className="text-sm font-medium">{lead.location}</span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <span className="text-[10px] font-bold bg-[var(--bg)] border border-[var(--border)] text-[var(--muted)] px-2 py-1 rounded-lg">
                      {lead.size}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <span className={`text-[10px] font-bold px-3 py-1 rounded-full border ${lead.status === 'Hot' ? 'bg-rose-500/20 text-rose-500 border-rose-500/20' : lead.status === 'Warm' ? 'bg-amber-500/20 text-amber-500 border-amber-500/20' : 'bg-blue-500/20 text-blue-500 border-blue-500/20'}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="p-4 w-24">
                    <div className="flex flex-col items-center gap-1">
                      <span className={`text-xs font-bold ${lead.score > 85 ? 'text-emerald-500' : lead.score > 70 ? 'text-amber-500' : 'text-rose-500'}`}>{lead.score}</span>
                      <div className="w-full h-1 bg-[var(--bg)] rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${lead.score > 85 ? 'bg-emerald-500' : lead.score > 70 ? 'bg-amber-500' : 'bg-rose-500'}`} style={{ width: `${lead.score}%` }} />
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleLeadClick(lead); }}
                        className="p-2 hover:bg-indigo-500/10 text-[var(--muted)] hover:text-indigo-500 rounded-lg transition-all"
                        title="View Profile"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleEnrich(lead); }}
                        className="p-2 hover:bg-indigo-500/10 text-[var(--muted)] hover:text-indigo-500 rounded-lg transition-all"
                        title="Run AI Enrichment"
                      >
                        <Zap size={16} />
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleOutreachNavigate(lead); }}
                        className="p-2 hover:bg-indigo-500/10 text-[var(--muted)] hover:text-indigo-500 rounded-lg transition-all"
                        title="AI Outreach"
                      >
                        <Mail size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-[var(--border)] bg-[var(--bg)]/30 flex items-center justify-between">
          <p className="text-xs text-[var(--muted)] font-bold uppercase tracking-wider">Showing 1-5 of 5 leads</p>
          <div className="flex gap-2">
            <button className="p-2 rounded-lg border border-[var(--border)] opacity-50 cursor-not-allowed"><ChevronLeft size={16} /></button>
            <button className="p-2 rounded-lg border border-[var(--border)] opacity-50 cursor-not-allowed"><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>
    );
  };

  const LeadsPage = () => {
    return (
      <PageWrapper>
        <header className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-bold tracking-tight">My Leads</h2>
            <span className="px-3 py-1 bg-indigo-500/10 text-indigo-500 text-xs font-bold rounded-full border border-indigo-500/20">{leads.length}</span>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" size={16} />
              <input 
                type="text" 
                placeholder="Search leads..."
                className="w-full bg-[var(--surface)] border border-[var(--border)] rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-indigo-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button 
              onClick={handleExportCSV}
              className="p-2.5 border border-[var(--border)] hover:bg-[var(--border)] rounded-xl transition-colors"
              title="Export CSV"
            >
              <Download size={18} />
            </button>
            <button 
              onClick={() => setShowAddLeadModal(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white p-2.5 rounded-xl flex items-center gap-2 font-bold shadow-lg shadow-indigo-600/20 transition-all hover:scale-105"
            >
              <Plus size={18} /> <span className="hidden sm:inline">Add Lead</span>
            </button>
          </div>
        </header>

        <LeadsTable filter={searchQuery} />

        {/* Add Lead Modal */}
        {showAddLeadModal && (
          <div className="fixed inset-0 z-[500] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 glass" onClick={() => setShowAddLeadModal(false)} />
            <div className="relative w-full max-w-lg bg-[var(--surface)] border border-[var(--border)] rounded-3xl shadow-2xl p-8 z-[501] page-enter">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold">Add New Lead</h3>
                <button onClick={() => setShowAddLeadModal(false)} className="p-2 hover:bg-[var(--border)] rounded-full transition-colors"><X size={20} /></button>
              </div>
              
              <form 
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const name = formData.get('name') as string;
                  const company = formData.get('company') as string;
                  const newLead = {
                    id: leads.length > 0 ? Math.max(...leads.map(l => l.id)) + 1 : 1,
                    name,
                    company,
                    initials: name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
                    color: '#6366F1',
                    domain: (formData.get('company') as string).toLowerCase().replace(/\s+/g, '') + '.io',
                    role: formData.get('role'),
                    email: formData.get('email'),
                    location: formData.get('location'),
                    flag: '📍',
                    size: formData.get('size'),
                    industry: formData.get('industry'),
                    status: formData.get('status'),
                    score: 75,
                    stage: 'New'
                  };
                  setLeads([...leads, newLead]);
                  setShowAddLeadModal(false);
                  showToast(`Lead ${name} added successfully`, 'success');
                }}
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase text-[var(--muted)] tracking-widest px-1">Full Name</label>
                    <input name="name" required placeholder="John Doe" className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-indigo-500" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase text-[var(--muted)] tracking-widest px-1">Company</label>
                    <input name="company" required placeholder="Acme Inc" className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-indigo-500" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase text-[var(--muted)] tracking-widest px-1">Role</label>
                    <input name="role" required placeholder="VP of Sales" className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-indigo-500" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase text-[var(--muted)] tracking-widest px-1">Email</label>
                    <input name="email" type="email" required placeholder="john@acme.com" className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-indigo-500" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase text-[var(--muted)] tracking-widest px-1">Industry</label>
                    <select name="industry" className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-indigo-500 appearance-none">
                      <option>SaaS</option>
                      <option>Fintech</option>
                      <option>E-commerce</option>
                      <option>Marketing</option>
                      <option>Healthcare</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase text-[var(--muted)] tracking-widest px-1">Status</label>
                    <select name="status" className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-indigo-500 appearance-none">
                      <option>Hot</option>
                      <option>Warm</option>
                      <option>Cold</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <button type="button" onClick={() => setShowAddLeadModal(false)} className="flex-1 py-3 border border-[var(--border)] text-sm font-bold rounded-xl hover:bg-[var(--bg)] transition-colors">Cancel</button>
                  <button type="submit" className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl shadow-lg shadow-indigo-600/20 transition-all">Add Lead</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </PageWrapper>
    );
  };

  const OutreachPage = () => {
    const [isGenerating, setIsGenerating] = useState(false);
    const [messageContent, setMessageContent] = useState<any>(null);
    const [isEditing, setIsEditing] = useState(false);

    const lead = selectedLead || leads[0];

    useEffect(() => {
      if (lead) {
        let content;
        if (outreachTab === 'email') content = generateColdEmail(lead);
        else if (outreachTab === 'linkedin') content = generateLinkedIn(lead);
        else content = generateFollowUp(lead);
        setMessageContent(content);
      }
    }, [lead, outreachTab]);

    const handleGenerateNew = () => {
      setIsGenerating(true);
      setTimeout(() => {
        let content;
        if (outreachTab === 'email') content = generateColdEmail(lead);
        else if (outreachTab === 'linkedin') content = generateLinkedIn(lead);
        else content = generateFollowUp(lead);
        setMessageContent(content);
        setIsGenerating(false);
        showToast("New variation generated", "success");
      }, 1500);
    };

    return (
      <PageWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl overflow-hidden shadow-sm flex flex-col max-h-[calc(100vh-140px)]">
            <div className="p-6 border-b border-[var(--border)] bg-[var(--bg)]/30">
              <h3 className="font-bold flex items-center gap-2">Select Lead</h3>
            </div>
            <div className="flex-1 overflow-y-auto">
              {leads.map(l => (
                <button 
                  key={l.id}
                  onClick={() => setSelectedLead(l)}
                  className={`w-full flex items-center gap-3 p-4 border-b border-[var(--border)] last:border-0 transition-all ${selectedLead?.id === l.id ? 'bg-indigo-600/10 border-l-4 border-l-indigo-600' : 'hover:bg-indigo-500/5'}`}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ backgroundColor: l.color }}>{l.initials}</div>
                  <div className="text-left min-w-0">
                    <p className={`text-sm font-bold truncate ${selectedLead?.id === l.id ? 'text-indigo-500' : ''}`}>{l.name}</p>
                    <p className="text-[10px] text-[var(--muted)] font-bold uppercase truncate">{l.company}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl overflow-hidden shadow-sm">
              <div className="p-6 border-b border-[var(--border)] flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-500/10 text-indigo-500 rounded-xl flex items-center justify-center">
                    <Bot size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold">AI Outreach Generator</h3>
                    <p className="text-xs text-indigo-500 font-bold uppercase">Target: {lead.name} @ {lead.company}</p>
                  </div>
                </div>
                <div className="flex p-1 bg-[var(--bg)] border border-[var(--border)] rounded-xl overflow-hidden">
                  {[ 
                    { id: 'email', icon: <Mail size={14} />, label: 'Cold Email' },
                    { id: 'linkedin', icon: <Linkedin size={14} />, label: 'LinkedIn' },
                    { id: 'followup', icon: <RefreshCw size={14} />, label: 'Follow-up' },
                  ].map(tab => (
                    <button 
                      key={tab.id}
                      onClick={() => { setOutreachTab(tab.id); setIsEditing(false); }}
                      className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all ${outreachTab === tab.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-[var(--muted)] hover:text-indigo-500'}`}
                    >
                      {tab.icon} {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-8">
                {isGenerating ? (
                  <div className="space-y-6 animate-pulse">
                    <div className="h-4 w-32 skeleton" />
                    <div className="h-6 w-3/4 skeleton" />
                    <div className="space-y-3 pt-6">
                      <div className="h-4 w-full skeleton" />
                      <div className="h-4 w-full skeleton" />
                      <div className="h-4 w-5/6 skeleton" />
                      <div className="h-4 w-full skeleton" />
                    </div>
                    <div className="flex items-center gap-2 text-indigo-500 font-bold text-sm pt-8">
                      <RefreshCw size={18} className="animate-spin" /> Writing personalized message...
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {outreachTab !== 'linkedin' && (
                      <div className="flex items-center gap-3 p-3 bg-[var(--bg)] rounded-xl border border-[var(--border)] group">
                        <span className="text-xs font-bold text-[var(--muted)] uppercase tracking-widest w-16">Subject:</span>
                        <span className="text-sm font-bold flex-1">{messageContent?.subject}</span>
                        <button 
                          onClick={() => {
                            navigator.clipboard.writeText(messageContent?.subject);
                            showToast("Subject copied", "success");
                          }}
                          className="p-1.5 hover:bg-[var(--border)] rounded-lg text-[var(--muted)] hover:text-indigo-500"
                        >
                          <Copy size={16} />
                        </button>
                      </div>
                    )}

                    <div className="relative group">
                      {isEditing ? (
                        <textarea 
                          className="w-full bg-[var(--bg)] border border-indigo-500/50 rounded-2xl p-6 text-sm leading-relaxed min-h-[300px] focus:outline-none"
                          value={messageContent?.body}
                          onChange={(e) => setMessageContent({ ...messageContent, body: e.target.value })}
                        />
                      ) : (
                        <div className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-2xl p-6 text-sm leading-relaxed min-h-[300px] whitespace-pre-wrap">
                          {messageContent?.body}
                        </div>
                      )}
                      <div className="absolute bottom-4 right-4 text-[10px] font-bold text-[var(--muted)] uppercase">
                        {messageContent?.body.split(/\s+/).length} Words
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[var(--border)]">
                      <div className="flex gap-2">
                        <button 
                          onClick={handleGenerateNew}
                          className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl shadow-lg shadow-indigo-600/20 transition-all flex items-center gap-2"
                        >
                          <RefreshCw size={16} /> Generate New Variation
                        </button>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => {
                            navigator.clipboard.writeText(messageContent?.body);
                            showToast("Message copied to clipboard", "success");
                          }}
                          className="flex items-center gap-2 px-6 py-2.5 border border-[var(--border)] hover:bg-[var(--border)] text-sm font-bold rounded-xl transition-all"
                        >
                          <Copy size={16} /> Copy
                        </button>
                        <button 
                          onClick={() => setIsEditing(!isEditing)}
                          className="flex items-center gap-2 px-6 py-2.5 border border-[var(--border)] hover:bg-[var(--border)] text-sm font-bold rounded-xl transition-all"
                        >
                          <Check className={isEditing ? 'text-indigo-500' : 'hidden'} /> {isEditing ? 'Save' : 'Edit'}
                        </button>
                        <button 
                          onClick={() => showToast(`Outreach sent to ${lead.name}!`, "success")}
                          className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl shadow-lg shadow-emerald-600/20 transition-all"
                        >
                          <Send size={16} /> Send Outreach
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 bg-amber-500/5 border border-amber-500/20 rounded-3xl flex items-start gap-4 page-enter" style={{ animationDelay: '400ms' }}>
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-500 shrink-0">
                <Lightbulb size={24} />
              </div>
              <div>
                <h4 className="font-bold text-amber-600 dark:text-amber-400 mb-1">AI Outreach Tip for {lead.role}</h4>
                <p className="text-sm text-amber-600/80 dark:text-amber-400/80 italic leading-relaxed">
                  "{OUTREACH_TIPS[lead.role as keyof typeof OUTREACH_TIPS] || OUTREACH_TIPS.Founder}"
                </p>
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
    );
  };

  const AnalyticsPage = () => {
    return (
      <PageWrapper>
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-2">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Analytics & Pipeline</h2>
            <p className="text-sm md:text-base text-[var(--muted)] font-medium">Real-time performance metrics and outreach ROI</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[var(--surface)] border border-[var(--border)] rounded-xl text-xs font-bold uppercase tracking-widest hover:border-indigo-500 transition-all">Last 7 Days <ChevronDown size={14} /></button>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {[ 
            { label: 'Open Rate', val: '45%', icon: <Eye />, trend: '+5.4%', color: '#3B82F6' },
            { label: 'Reply Rate', val: '18%', icon: <Mail />, trend: '+2.1%', color: '#10B981' },
            { label: 'Meeting Rate', val: '8%', icon: <Users />, trend: '+1.2%', color: '#8B5CF6' },
            { label: 'Close Rate', val: '3%', icon: <Zap />, trend: '+0.5%', color: '#F59E0B' },
          ].map((kpi, i) => (
            <div key={i} className="bg-[var(--surface)] border border-[var(--border)] p-5 lg:p-6 rounded-2xl card-hover">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${kpi.color}15`, color: kpi.color }}>{kpi.icon}</div>
                <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">{kpi.trend}</span>
              </div>
              <h4 className="text-[10px] uppercase font-bold text-[var(--muted)] tracking-widest">{kpi.label}</h4>
              <p className="text-2xl lg:text-3xl font-extrabold mt-1">{kpi.val}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[var(--surface)] border border-[var(--border)] p-4 lg:p-6 rounded-3xl shadow-sm">
            <h3 className="font-bold mb-6">Outreach Sent Per Day</h3>
            <div className="h-64 min-h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={outreachData}>
                  <defs>
                    <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366F1" stopOpacity={1}/>
                      <stop offset="100%" stopColor="#6366F1" stopOpacity={0.6}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 10 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 10 }} />
                  <Tooltip 
                    cursor={{ fill: 'rgba(99,102,241,0.05)' }} 
                    contentStyle={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px' }}
                    labelStyle={{ color: 'var(--text)' }}
                    itemStyle={{ color: 'var(--text)' }}
                  />
                  <Bar dataKey="sent" fill="url(#barGrad)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-[var(--surface)] border border-[var(--border)] p-4 lg:p-6 rounded-3xl shadow-sm">
            <h3 className="font-bold mb-6">Reply Rate Trend (%)</h3>
            <div className="h-64 min-h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={replyData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 10 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 10 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px' }}
                    labelStyle={{ color: 'var(--text)' }}
                    itemStyle={{ color: 'var(--text)' }}
                  />
                  <Line type="monotone" dataKey="rate" stroke="#10B981" strokeWidth={3} dot={{ r: 4, fill: '#10B981', strokeWidth: 0 }} activeDot={{ r: 6, strokeWidth: 0 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-[var(--surface)] border border-[var(--border)] p-4 lg:p-6 rounded-3xl shadow-sm">
            <h3 className="font-bold mb-6">Leads by Industry</h3>
            <div className="h-64 min-h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[{name:"SaaS",count:42},{name:"Fintech",count:30},{name:"E-com",count:24},{name:"Health",count:24}]} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: 'var(--text)', fontSize: 10, fontWeight: 'bold' }} width={70} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px' }}
                    labelStyle={{ color: 'var(--text)' }}
                    itemStyle={{ color: 'var(--text)' }}
                  />
                  <Bar dataKey="count" fill="#6366F1" radius={[0, 6, 6, 0]} barSize={24} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-[var(--surface)] border border-[var(--border)] p-4 lg:p-6 rounded-3xl shadow-sm">
            <h3 className="font-bold mb-6">Pipeline Growth</h3>
            <div className="h-64 min-h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={[{week:"W1",total:20},{week:"W2",total:35},{week:"W3",total:58},{week:"W4",total:85},{week:"W5",total:120}]}>
                  <defs>
                    <linearGradient id="pipeGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                  <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 10 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 10 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px' }}
                    labelStyle={{ color: 'var(--text)' }}
                    itemStyle={{ color: 'var(--text)' }}
                  />
                  <Area type="monotone" dataKey="total" stroke="#8B5CF6" strokeWidth={3} fill="url(#pipeGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Kanban */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold">Sales Pipeline</h3>
          <div className="flex flex-col lg:flex-row gap-6 overflow-x-auto pb-6 -mx-4 px-4 lg:mx-0 lg:px-0 no-scrollbar">
            {[ 
              { id: 'New', label: 'New', color: 'indigo', leads: leads.filter(l => l.stage === 'New') },
              { id: 'Contacted', label: 'Contacted', color: 'amber', leads: leads.filter(l => l.stage === 'Contacted') },
              { id: 'Replied', label: 'Replied', color: 'emerald', leads: leads.filter(l => l.stage === 'Replied') },
              { id: 'Closed', label: 'Closed', color: 'slate', leads: leads.filter(l => l.stage === 'Closed').concat([{ id: 99, name: 'Alex Wong', company: 'TechBridge', status: 'Hot', closed: true }]) },
            ].map(col => (
              <div key={col.id} className="w-full sm:w-[320px] lg:flex-1 min-w-[280px] bg-[var(--surface)] border border-[var(--border)] rounded-3xl flex flex-col max-h-[600px] shrink-0">
                <div className={`p-4 border-b-2 border-${col.color}-500 flex items-center justify-between`}>
                  <h4 className="font-bold flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full bg-${col.color}-500`} /> {col.label}
                  </h4>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-md bg-${col.color}-500/10 text-${col.color}-500`}>{col.leads.length}</span>
                </div>
                <div className="p-4 space-y-4 overflow-y-auto">
                  {col.leads.map((l: any) => (
                    <div key={l.id} className="bg-[var(--bg)] border border-[var(--border)] p-4 rounded-2xl card-hover group cursor-pointer" onClick={() => !l.closed && handleLeadClick(l)}>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl flex items-center justify-center text-[10px] font-bold text-white shadow-lg" style={{ backgroundColor: l.color || '#64748B' }}>
                            {l.initials || l.name.split(' ').map((n: string) => n[0]).join('')}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-bold truncate max-w-[120px]">{l.name}</p>
                            <p className="text-[10px] text-[var(--muted)] font-bold uppercase truncate max-w-[100px]">{l.company}</p>
                          </div>
                        </div>
                        {l.closed ? (
                          <span className="text-[8px] font-bold bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full border border-emerald-500/20 whitespace-nowrap">$2,400 Closed</span>
                        ) : (
                          <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full border ${l.status === 'Hot' ? 'bg-rose-500/10 text-rose-500 border-rose-500/10' : l.status === 'Warm' ? 'bg-amber-500/10 text-amber-500 border-amber-500/10' : 'bg-blue-500/10 text-blue-500 border-blue-500/10'}`}>
                            {l.status}
                          </span>
                        )}
                      </div>
                      {!l.closed && (
                        <button className="w-full mt-2 py-1.5 bg-indigo-500/5 border border-indigo-500/10 hover:border-indigo-500 text-[10px] font-bold text-indigo-500 rounded-lg flex items-center justify-center gap-1 transition-all">
                          View <ArrowUpRight size={10} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </PageWrapper>
    );
  };

  const SettingsPage = () => {
    return (
      <PageWrapper>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[32px] overflow-hidden shadow-sm">
          <div className="flex border-b border-[var(--border)] overflow-x-auto no-scrollbar scroll-smooth">
            {['profile', 'notifications', 'appearance', 'about'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveSettingsTab(tab)}
                className={`px-6 md:px-8 py-4 md:py-5 text-xs md:text-sm font-bold capitalize transition-all relative whitespace-nowrap ${activeSettingsTab === tab ? 'text-indigo-500' : 'text-[var(--muted)] hover:text-indigo-500'}`}
              >
                {tab}
                {activeSettingsTab === tab && <div className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-500" />}
              </button>
            ))}
          </div>

          <div className="p-4 md:p-8">
            {activeSettingsTab === 'profile' && (
              <div className="max-w-2xl space-y-8 md:space-y-10">
                <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-indigo-500 flex items-center justify-center text-2xl md:text-3xl font-bold text-white shadow-2xl shadow-indigo-500/30 shrink-0">AS</div>
                  <div className="space-y-2">
                    <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-indigo-600/20">Change Avatar</button>
                    <p className="text-[10px] md:text-xs text-[var(--muted)] font-medium">JPG, GIF or PNG. Max size of 800K</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {[ 
                    { label: 'Full Name', val: 'Arjun Singh' },
                    { label: 'Email Address', val: 'arjun@prospectai.io' },
                    { label: 'Company', val: 'ProspectAI' },
                    { label: 'Role', val: 'Sales Manager' },
                    { label: 'Phone Number', val: '+91 98765 43210' },
                    { label: 'Timezone', val: '(GMT+05:30) Mumbai, Kolkata' },
                  ].map((field, i) => (
                    <div key={i} className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase text-[var(--muted)] tracking-widest px-1">{field.label}</label>
                      <input defaultValue={field.val} className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl py-3 px-4 text-sm font-medium focus:outline-none focus:border-indigo-500" />
                    </div>
                  ))}
                </div>

                <div className="pt-4 md:pt-6">
                  <button onClick={() => showToast("Settings saved!", "success")} className="w-full sm:w-auto px-10 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-xl shadow-indigo-600/20 transition-all hover:scale-105 active:scale-95">Save Changes</button>
                </div>
              </div>
            )}

            {activeSettingsTab === 'notifications' && (
              <div className="max-w-2xl space-y-4 md:space-y-6">
                <h3 className="text-xl font-bold mb-6 md:mb-8">Notification Preferences</h3>
                {[ 
                  { icon: <Search size={20} />, label: 'New lead match alerts', desc: 'When a new lead matches your AI filters' },
                  { icon: <Send size={20} />, label: 'Outreach delivery confirmations', desc: 'Confirmations when outreach is successfully sent' },
                  { icon: <BarChart2 size={20} />, label: 'Weekly performance digest', desc: 'A summary of your teams outreach ROI' },
                  { icon: <Zap size={20} />, label: 'AI enrichment complete', desc: 'Notifications when bulk enrichment finishes' },
                  { icon: <Activity size={20} />, label: 'Pipeline stage changes', desc: 'When leads move between pipeline stages' },
                ].map((row, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-[var(--bg)] border border-[var(--border)] rounded-2xl group hover:border-indigo-500/50 transition-all gap-4">
                    <div className="flex items-center gap-3 md:gap-4 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center shrink-0 group-hover:bg-indigo-500 group-hover:text-white transition-all">{row.icon}</div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold truncate">{row.label}</p>
                        <p className="text-[10px] md:text-xs text-[var(--muted)] truncate">{row.desc}</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-10 md:w-11 h-5 md:h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 md:after:h-5 after:w-4 md:after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            )}

            {activeSettingsTab === 'appearance' && (
              <div className="max-w-2xl space-y-8 md:space-y-10">
                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold uppercase text-[var(--muted)] tracking-widest px-1">Theme Mode</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => setDarkMode(true)}
                      className={`p-4 md:p-6 rounded-2xl border transition-all text-center space-y-2 md:space-y-3 ${darkMode ? 'bg-indigo-600/10 border-indigo-500' : 'bg-[var(--bg)] border-[var(--border)] hover:border-indigo-500/50'}`}
                    >
                      <Moon className={`mx-auto w-6 h-6 md:w-8 md:h-8 ${darkMode ? 'text-indigo-500' : 'text-[var(--muted)]'}`} />
                      <p className={`text-xs md:text-sm font-bold ${darkMode ? 'text-indigo-500' : 'text-[var(--muted)]'}`}>Dark Mode</p>
                    </button>
                    <button 
                      onClick={() => setDarkMode(false)}
                      className={`p-4 md:p-6 rounded-2xl border transition-all text-center space-y-2 md:space-y-3 ${!darkMode ? 'bg-indigo-600/10 border-indigo-500' : 'bg-[var(--bg)] border-[var(--border)] hover:border-indigo-500/50'}`}
                    >
                      <Sun className={`mx-auto w-6 h-6 md:w-8 md:h-8 ${!darkMode ? 'text-indigo-500' : 'text-[var(--muted)]'}`} />
                      <p className={`text-xs md:text-sm font-bold ${!darkMode ? 'text-indigo-500' : 'text-[var(--muted)]'}`}>Light Mode</p>
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold uppercase text-[var(--muted)] tracking-widest px-1">Accent Color</h4>
                  <div className="flex flex-wrap gap-3 md:gap-4 justify-center sm:justify-start">
                    {['#6366F1', '#8B5CF6', '#3B82F6', '#10B981', '#F59E0B', '#EC4899'].map(color => (
                      <button 
                        key={color} 
                        onClick={() => setAccentColor(color)}
                        className={`w-10 h-10 rounded-full border-4 shadow-lg transition-transform hover:scale-110 flex items-center justify-center ${accentColor === color ? 'border-white ring-2 ring-indigo-500 ring-offset-2' : 'border-transparent'}`}
                        style={{ backgroundColor: color }}
                      >
                        {accentColor === color && <Check className="text-white" size={16} />}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold uppercase text-[var(--muted)] tracking-widest px-1">Preview</h4>
                  <div className="p-4 md:p-6 bg-[var(--bg)] border border-[var(--border)] rounded-2xl md:rounded-3xl" style={{ borderLeft: `4px solid ${accentColor}` }}>
                    <h5 className="font-bold mb-2">Sample Lead Card</h5>
                    <p className="text-xs md:text-sm text-[var(--muted)]">This is how your lead cards and highlights will appear with the current theme settings.</p>
                    <button className="mt-4 px-4 py-2 text-[10px] md:text-xs font-bold text-white rounded-lg shadow-lg" style={{ backgroundColor: accentColor }}>Action Button</button>
                  </div>
                </div>
              </div>
            )}

            {activeSettingsTab === 'about' && (
              <div className="text-center py-8 md:py-12 space-y-6 md:space-y-8 max-w-xl mx-auto">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-indigo-600 rounded-3xl flex items-center justify-center mx-auto shadow-3xl shadow-indigo-600/40 relative">
                  <Zap className="text-white fill-white w-8 h-8 md:w-12 md:h-12" />
                  <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white text-[8px] md:text-[10px] font-bold px-2 py-1 rounded-full border-2 border-[var(--surface)]">v1.0.0</div>
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-extrabold mb-4">ProspectAI</h3>
                  <p className="text-sm md:text-base text-[var(--muted)] leading-relaxed font-medium px-4">
                    The world's most advanced B2B sales intelligence platform. 
                    Built with React, Tailwind CSS, and next-generation AI 
                    to help sales teams find and close more deals.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 px-4">
                  {[ 
                    'AI Lead Discovery', 'Smart Enrichment', 'Outreach Generation', 'Pipeline Analytics', 'CSV Export', 'Kanban Board'
                  ].map(f => (
                    <div key={f} className="flex items-center gap-3 p-3 bg-indigo-500/5 border border-indigo-500/10 rounded-xl text-[10px] md:text-xs font-bold">
                      <Check className="text-emerald-500 shrink-0" size={14} /> {f}
                    </div>
                  ))}
                </div>
                <div className="pt-6 md:pt-8 border-t border-[var(--border)]">
                  <p className="text-[10px] text-[var(--muted)] uppercase font-bold tracking-widest">Designed for Production Environments</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </PageWrapper>
    );
  };

  // Render
  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark' : 'light-mode'}`}>
      <GlobalStyles />
      
      {currentPage === "landing" ? (
        <LandingPage />
      ) : currentPage === "signin" ? (
        <SignInPage />
      ) : (
        <>
          <Sidebar />
          <Navbar />
          
          <main 
            className="transition-all duration-300 min-h-[calc(100vh-64px)] p-4 lg:p-6 ml-0 lg:ml-[240px] mt-16"
          >
            {currentPage === "dashboard" && <DashboardPage />}
            {currentPage === "finder" && <FinderPage />}
            {currentPage === "leads" && <LeadsPage />}
            {currentPage === "outreach" && <OutreachPage />}
            {currentPage === "analytics" && <AnalyticsPage />}
            {currentPage === "settings" && <SettingsPage />}
          </main>

          <LeadDetailPanel />
          <EnrichmentModal />
        </>
      )}

      {/* Toast System */}
      <div className="fixed bottom-6 right-6 z-[600] flex flex-col gap-3">
        {toasts.map(toast => (
          <Toast 
            key={toast.id} 
            message={toast.message} 
            type={toast.type} 
            onClose={() => setToasts(prev => prev.filter(t => t.id !== toast.id))} 
          />
        ))}
      </div>
    </div>
  );
}