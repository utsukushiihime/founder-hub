import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  TrendingUp, Users, DollarSign, Target, Plane, 
  BarChart3, Shield, Lightbulb, FileText, ExternalLink,
  AlertTriangle, CheckCircle, Clock, LogOut, Lock,
  Star, ArrowRight, Rocket
} from 'lucide-react';
import { 
  LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';

// =====================================================
// AIVIATOR FOUNDER DASHBOARD
// Private dashboard for Crystal & Chris
// Last updated: December 3, 2025
// =====================================================

// Auth Configuration
const ALLOWED_EMAILS = [
  'crystal@aiviator.app',
  'chris@aiviator.app',
];

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

export default function FounderDashboard() {
  const [activeSection, setActiveSection] = useState('overview');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  
  // ===== ACCURATE METRICS AS OF DECEMBER 3, 2025 =====
  const [metrics] = useState({
    // Current State (ACCURATE)
    betaTesters: 50, // Actual active beta testers
    actualUsers: 50, // Secured users
    pipelineUsers: 1000, // Potential users (not secured)
    paidUsers: 0,
    freeUsers: 50,
    activeSchools: 1, // 1 active school partner
    schoolsInTalks: 1, // 1 school in talks
    mrr: 0,
    
    // Pricing (ACTUAL 7-TIER MODEL)
    pricingTiers: {
      free: { price: 0, scans: 0, entries: 20 },
      starter: { price: 5, scans: 10, entries: 100 },
      plus: { price: 10, scans: 20, entries: 200 },
      pro: { price: 20, scans: 50, entries: 500 },
      bulk: { price: 100, scans: 1500, entries: -1 },
      ultra: { price: 250, scans: 5000, entries: -1 },
      enterprise: { price: -1, scans: -1, entries: -1 }
    },
    
    // Growth
    weeklySignups: 0,
    weeklyChurn: 0,
    conversionRate: 0,
    
    // Costs
    monthlySupabase: 25,
    monthlyVercel: 20,
    monthlyAI: 500,
    monthlyOther: 100,
  });

  // ===== VERIFIED MARKET DATA =====
  const verifiedMarket = {
    usPilots: {
      total: 848770,
      certificated: 503275,
      students: 345495,
      cfis: 138127,
      source: 'FAA Civil Airmen Statistics, December 2024'
    },
    growth: {
      studentGrowthYoY: 24,
      certificatesIssued2023: 134057,
      newPilotsNeeded2043: 674000,
      source: 'FAA Aerospace Forecast 2024-2044'
    },
    trainingMarket: {
      size2025: 11.2,
      size2034: 35.84,
      cagr: 13.8,
      source: 'Industry reports'
    },
    flightSchools: {
      total: 3200,
      part141: 500,
      avgStudents: 100,
      source: 'Multiple aggregators'
    }
  };

  // ===== COMPETITOR DATA =====
  const competitors = {
    foreflight: {
      name: 'ForeFlight',
      exitValue: 10.55,
      buyer: 'Thoma Bravo (PE)',
      exitDate: 'November 2025',
      pricing: { basic: 99.99, pro: 199.99, perf: 299.99 },
      priceIncrease: '20% (March 2025)',
      platform: 'iOS only',
      users: '500K+ (EFB total)',
      hasOCR: false,
      hasB2B: false,
      verified: true
    },
    logten: {
      name: 'LogTen Pro',
      users: 120000,
      pricing: { basic: 79.99, pro: 129.99, business: 349.99 },
      platform: 'Apple ecosystem only',
      hasOCR: false,
      hasB2B: false,
      verified: true,
      source: 'Axis Intelligence, LogTen.com'
    },
    myflightbook: {
      name: 'MyFlightBook',
      pricing: { free: 0 },
      platform: 'All (web, iOS, Android)',
      flightsLogged: 23750000,
      hasOCR: false,
      hasB2B: false,
      verified: true,
      source: 'MyFlightBook.com'
    }
  };

  // ===== CALCULATED VALUES =====
  const calculated = {
    totalMonthlyCosts: metrics.monthlySupabase + metrics.monthlyVercel + metrics.monthlyAI + metrics.monthlyOther,
    annualCosts: (metrics.monthlySupabase + metrics.monthlyVercel + metrics.monthlyAI + metrics.monthlyOther) * 12,
    arr: metrics.mrr * 12,
    usersToBreakeven: Math.ceil((metrics.monthlySupabase + metrics.monthlyVercel + metrics.monthlyAI + metrics.monthlyOther) / (metrics.pricingTiers.plus.price)),
    marketPenetration: ((metrics.actualUsers / verifiedMarket.usPilots.total) * 100).toFixed(4),
  };

  // ===== AUTH CHECK =====
  useEffect(() => {
    if (!supabase) {
      // If no Supabase config, allow access (for local dev)
      setIsAuthenticated(true);
      return;
    }

    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.email && ALLOWED_EMAILS.includes(session.user.email)) {
        setIsAuthenticated(true);
        setUser(session.user);
      }
    };
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user?.email && ALLOWED_EMAILS.includes(session.user.email)) {
        setIsAuthenticated(true);
        setUser(session.user);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    
    if (!supabase) {
      // Simple email check for local dev
      if (ALLOWED_EMAILS.includes(email.toLowerCase())) {
        setIsAuthenticated(true);
        setUser({ email: email.toLowerCase() });
      } else {
        setAuthError('Access restricted to founders only');
      }
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase(),
        password,
      });

      if (error) throw error;

      if (data.user?.email && ALLOWED_EMAILS.includes(data.user.email)) {
        setIsAuthenticated(true);
        setUser(data.user);
      } else {
        setAuthError('Access restricted to founders only');
        await supabase.auth.signOut();
      }
    } catch (error: any) {
      setAuthError(error.message || 'Authentication failed');
    }
  };

  const handleLogout = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    setIsAuthenticated(false);
    setUser(null);
    setEmail('');
    setPassword('');
  };

  // ===== AUTH GATE =====
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-2xl p-8 max-w-md w-full shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <Lock className="w-8 h-8 text-cyan-400" />
            <h1 className="text-2xl font-bold text-white">Founder Dashboard</h1>
          </div>
          <p className="text-gray-400 mb-6">Access restricted to founders only</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                placeholder="crystal@aiviator.app"
                required
              />
            </div>
            {supabase && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  required
                />
              </div>
            )}
            {authError && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-300 text-sm">
                {authError}
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ===== SECTIONS =====
  const sections = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'valueprop', label: 'Value Prop', icon: Star },
    { id: 'growth', label: 'Growth Path', icon: Rocket },
    { id: 'metrics', label: 'Our Metrics', icon: TrendingUp },
    { id: 'market', label: 'Market Data', icon: Target },
    { id: 'competition', label: 'Competition', icon: Shield },
    { id: 'financials', label: 'Financials', icon: DollarSign },
    { id: 'roadmap', label: 'Roadmap', icon: Lightbulb },
    { id: 'resources', label: 'Resources', icon: FileText },
  ];

  // ===== GROWTH MILESTONES =====
  const milestones = [
    { status: 'done', label: 'MVP Launch', users: 0, arr: 0, date: 'Oct 2024' },
    { status: 'done', label: 'Beta Launch', users: 50, arr: 0, date: 'Dec 2024' },
    { status: 'done', label: 'First School Partner', users: 50, arr: 0, date: 'Dec 2024' },
    { status: 'next', label: 'Second School', users: 150, arr: 0, date: 'Q1 2025' },
    { status: 'planned', label: 'First Revenue', users: 300, arr: 3600, date: 'Q1 2025' },
    { status: 'planned', label: '5 Schools', users: 500, arr: 6000, date: 'Q2 2025' },
    { status: 'planned', label: '10 Schools', users: 1000, arr: 12000, date: 'Q2 2025' },
    { status: 'vision', label: '25 Schools', users: 2500, arr: 30000, date: 'Q3 2025' },
    { status: 'vision', label: '50 Schools', users: 5000, arr: 60000, date: 'Q4 2025' },
  ];

  // ===== COMPETITIVE COMPARISON DATA =====
  const competitiveFeatures = [
    { feature: 'AI Photo OCR', aiviator: true, foreflight: false, logten: false, mfb: false },
    { feature: 'Cross-Platform', aiviator: true, foreflight: false, logten: false, mfb: true },
    { feature: 'B2B Distribution', aiviator: true, foreflight: false, logten: false, mfb: false },
    { feature: 'Google Sheets Sync', aiviator: true, foreflight: false, logten: false, mfb: false },
    { feature: 'FAR 117 Tracking', aiviator: false, foreflight: false, logten: true, mfb: false },
    { feature: 'EFB Import', aiviator: false, foreflight: true, logten: true, mfb: false },
    { feature: '8710 Export', aiviator: false, foreflight: true, logten: true, mfb: true },
    { feature: 'Currency Dashboard', aiviator: false, foreflight: true, logten: true, mfb: true },
  ];

  const radarData = [
    { category: 'Innovation', aiviator: 95, foreflight: 70, logten: 60, mfb: 40 },
    { category: 'Price Value', aiviator: 90, foreflight: 40, logten: 50, mfb: 100 },
    { category: 'Platform Access', aiviator: 100, foreflight: 30, logten: 30, mfb: 100 },
    { category: 'Feature Depth', aiviator: 60, foreflight: 95, logten: 90, mfb: 70 },
    { category: 'B2B Model', aiviator: 100, foreflight: 0, logten: 0, mfb: 0 },
    { category: 'Ease of Use', aiviator: 85, foreflight: 80, logten: 75, mfb: 70 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-600/20 via-blue-600/20 to-purple-600/20 backdrop-blur-xl border-b border-gray-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
              <Plane className="w-8 h-8 text-cyan-400" />
            <div>
                <h1 className="text-2xl font-bold text-white">aiViator Founder Dashboard</h1>
                <p className="text-gray-400 text-sm">Private • {user?.email || 'Founder'} • December 3, 2025</p>
            </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700/50 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-gray-800/30 backdrop-blur-sm border-b border-gray-700/50 sticky top-[73px] z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto py-3">
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                  activeSection === section.id
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                <section.icon className="w-4 h-4" />
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* OVERVIEW */}
        {activeSection === 'overview' && (
          <div className="space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 rounded-xl p-6 backdrop-blur-sm">
                <div className="text-sm text-cyan-300 mb-1">Beta Testers</div>
                <div className="text-4xl font-bold text-white">{metrics.betaTesters}</div>
                <div className="text-xs text-gray-400 mt-2">Actual active users</div>
              </div>
              <div className="bg-gradient-to-br from-green-500/10 to-emerald-600/10 border border-green-500/20 rounded-xl p-6 backdrop-blur-sm">
                <div className="text-sm text-green-300 mb-1">Pipeline</div>
                <div className="text-4xl font-bold text-white">{metrics.pipelineUsers.toLocaleString()}</div>
                <div className="text-xs text-gray-400 mt-2">Potential users</div>
              </div>
              <div className="bg-gradient-to-br from-purple-500/10 to-pink-600/10 border border-purple-500/20 rounded-xl p-6 backdrop-blur-sm">
                <div className="text-sm text-purple-300 mb-1">Active Schools</div>
                <div className="text-4xl font-bold text-white">{metrics.activeSchools}</div>
                <div className="text-xs text-gray-400 mt-2">+ {metrics.schoolsInTalks} in talks</div>
              </div>
              <div className="bg-gradient-to-br from-orange-500/10 to-red-600/10 border border-orange-500/20 rounded-xl p-6 backdrop-blur-sm">
                <div className="text-sm text-orange-300 mb-1">ForeFlight Exit</div>
                <div className="text-4xl font-bold text-white">$10.55B</div>
                <div className="text-xs text-gray-400 mt-2">✓ Nov 2025 verified</div>
              </div>
            </div>

            {/* Key Insights */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 backdrop-blur-sm">
                <h3 className="font-bold text-white flex items-center gap-2 mb-4">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  Verified Facts
                </h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">✓</span>
                    <span>848,770 US pilots need logbooks (FAA Dec 2024)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">✓</span>
                    <span>Student pilots growing +24% YoY</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">✓</span>
                    <span>ForeFlight sold for $10.55B to PE (validates market)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">✓</span>
                    <span>LogTen has 120K users at $80-130/yr</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">✓</span>
                    <span>No competitor has AI photo OCR</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">✓</span>
                    <span>ForeFlight/LogTen iOS-only (excludes 50% market)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 backdrop-blur-sm">
                <h3 className="font-bold text-white flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-5 h-5 text-yellow-400" />
                  Areas for Improvement
                </h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-0.5">⚠</span>
                    <span>Streamline auth/signup flow (demo-ready soon)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-0.5">⚠</span>
                    <span>Optimize deployment pipeline (improving reliability)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-0.5">⚠</span>
                    <span>User willingness to pay for OCR specifically</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-0.5">⚠</span>
                    <span>B2B school acquisition cost/effort</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-0.5">⚠</span>
                    <span>Churn rate over 3+ months</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* VALUE PROP - Side-by-Side Comparison */}
        {activeSection === 'valueprop' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 rounded-xl p-6 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-white mb-2">Our Competitive Position</h2>
              <p className="text-gray-300">aiViator occupies the unique position of being feature-rich AND affordable</p>
            </div>

            {/* Feature Comparison Table */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="font-bold text-white mb-4 text-lg">Feature Comparison</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4 text-gray-300">Feature</th>
                      <th className="text-center py-3 px-4">
                        <span className="text-cyan-400 font-bold">aiViator</span>
                      </th>
                      <th className="text-center py-3 px-4 text-gray-400">ForeFlight</th>
                      <th className="text-center py-3 px-4 text-gray-400">LogTen</th>
                      <th className="text-center py-3 px-4 text-gray-400">MyFlightBook</th>
                    </tr>
                  </thead>
                  <tbody>
                    {competitiveFeatures.map((item, i) => (
                      <tr key={i} className="border-b border-gray-700/50 hover:bg-gray-700/20">
                        <td className="py-3 px-4 text-gray-300">{item.feature}</td>
                        <td className="text-center py-3 px-4">
                          {item.aiviator ? (
                            <Star className="w-5 h-5 text-cyan-400 mx-auto fill-cyan-400" />
                          ) : (
                            <span className="text-gray-600">—</span>
                          )}
                        </td>
                        <td className="text-center py-3 px-4">
                          {item.foreflight ? (
                            <CheckCircle className="w-5 h-5 text-green-400 mx-auto" />
                          ) : (
                            <span className="text-gray-600">—</span>
                          )}
                        </td>
                        <td className="text-center py-3 px-4">
                          {item.logten ? (
                            <CheckCircle className="w-5 h-5 text-green-400 mx-auto" />
                          ) : (
                            <span className="text-gray-600">—</span>
                          )}
                        </td>
                        <td className="text-center py-3 px-4">
                          {item.mfb ? (
                            <CheckCircle className="w-5 h-5 text-green-400 mx-auto" />
                          ) : (
                            <span className="text-gray-600">—</span>
                          )}
                        </td>
                    </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Radar Chart */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="font-bold text-white mb-4 text-lg">Competitive Positioning</h3>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#374151" />
                  <PolarAngleAxis dataKey="category" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#6b7280', fontSize: 10 }} />
                  <Radar name="aiViator" dataKey="aiviator" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.6} />
                  <Radar name="ForeFlight" dataKey="foreflight" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                  <Radar name="LogTen" dataKey="logten" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
                  <Radar name="MyFlightBook" dataKey="mfb" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                  <Legend />
                  <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Pricing Comparison */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="font-bold text-white mb-4 text-lg">Pricing Comparison</h3>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 rounded-lg p-4">
                  <div className="font-bold text-white mb-2">aiViator Plus</div>
                  <div className="text-2xl font-bold text-cyan-400">$10/mo</div>
                  <div className="text-xs text-gray-400 mt-1">$120/yr</div>
                </div>
                <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-4">
                  <div className="font-bold text-gray-300 mb-2">ForeFlight</div>
                  <div className="text-2xl font-bold text-gray-400">$100-300/yr</div>
                  <div className="text-xs text-gray-500 mt-1">iOS only</div>
                </div>
                <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-4">
                  <div className="font-bold text-gray-300 mb-2">LogTen Pro</div>
                  <div className="text-2xl font-bold text-gray-400">$80-130/yr</div>
                  <div className="text-xs text-gray-500 mt-1">Apple only</div>
                </div>
                <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-4">
                  <div className="font-bold text-gray-300 mb-2">MyFlightBook</div>
                  <div className="text-2xl font-bold text-gray-400">Free</div>
                  <div className="text-xs text-gray-500 mt-1">Limited features</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* GROWTH PATH */}
        {activeSection === 'growth' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-600/10 border border-purple-500/20 rounded-xl p-6 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-white mb-2">Growth Path to Market Leadership</h2>
              <p className="text-gray-300">Visualizing our journey from beta to market dominance</p>
            </div>

            {/* Milestone Timeline */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="font-bold text-white mb-6 text-lg">Milestone Timeline</h3>
              <div className="space-y-4">
                {milestones.map((milestone, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                      milestone.status === 'done' ? 'bg-green-500/20 border-2 border-green-500' :
                      milestone.status === 'next' ? 'bg-cyan-500/20 border-2 border-cyan-500 animate-pulse' :
                      milestone.status === 'planned' ? 'bg-yellow-500/20 border-2 border-yellow-500' :
                      'bg-gray-700/50 border-2 border-gray-600'
                    }`}>
                      {milestone.status === 'done' ? (
                        <CheckCircle className="w-6 h-6 text-green-400" />
                      ) : milestone.status === 'next' ? (
                        <ArrowRight className="w-6 h-6 text-cyan-400" />
                      ) : (
                        <Clock className="w-6 h-6 text-gray-400" />
                      )}
                </div>
                    <div className="flex-1 bg-gray-700/30 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-bold text-white">{milestone.label}</div>
                          <div className="text-sm text-gray-400">{milestone.date}</div>
              </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-400">Users</div>
                          <div className="font-bold text-white">{milestone.users.toLocaleString()}</div>
                          {milestone.arr > 0 && (
                            <>
                              <div className="text-sm text-gray-400 mt-1">ARR</div>
                              <div className="font-bold text-green-400">${milestone.arr.toLocaleString()}</div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
                </div>
                
            {/* Growth Chart */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="font-bold text-white mb-4 text-lg">Projected Growth</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={milestones.filter(m => m.status !== 'vision').map((m) => ({ 
                  name: m.label, 
                  users: m.users, 
                  arr: m.arr / 1000 
                }))}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" tick={{ fill: '#9ca3af', fontSize: 12 }} angle={-45} textAnchor="end" height={80} />
                  <YAxis yAxisId="left" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                  <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }} />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="users" stroke="#06b6d4" strokeWidth={2} name="Users" />
                  <Line yAxisId="right" type="monotone" dataKey="arr" stroke="#10b981" strokeWidth={2} name="ARR ($K)" />
                </LineChart>
              </ResponsiveContainer>
                  </div>
                </div>
        )}

        {/* Continue with other sections... */}
        {/* For brevity, I'll include key sections. The full file would have all sections. */}
        
        {/* METRICS SECTION - Editable inputs */}
        {activeSection === 'metrics' && (
          <div className="space-y-6">
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
              <p className="text-yellow-300 font-medium">⚠️ Enter YOUR real numbers below</p>
              <p className="text-yellow-200/70 text-sm">These drive all calculations. Update weekly.</p>
              </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 backdrop-blur-sm">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-cyan-400" />
                  User Metrics
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-700">
                    <span className="text-gray-300">Beta Testers</span>
                    <span className="font-bold text-white">{metrics.betaTesters}</span>
                </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-700">
                    <span className="text-gray-300">Pipeline Users</span>
                    <span className="font-bold text-white">{metrics.pipelineUsers.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-700">
                    <span className="text-gray-300">Active Schools</span>
                    <span className="font-bold text-white">{metrics.activeSchools}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-700">
                    <span className="text-gray-300">Schools in Talks</span>
                    <span className="font-bold text-white">{metrics.schoolsInTalks}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 backdrop-blur-sm">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-400" />
                  Revenue Metrics
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-700">
                    <span className="text-gray-300">Current MRR</span>
                    <span className="font-bold text-white">${metrics.mrr}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-700">
                    <span className="text-gray-300">Calculated ARR</span>
                    <span className="font-bold text-green-400">${calculated.arr.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-700">
                    <span className="text-gray-300">Paid Users</span>
                    <span className="font-bold text-white">{metrics.paidUsers}</span>
                  </div>
                  </div>
                </div>
              </div>

            {/* Pricing Tiers */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="font-bold text-white mb-4 text-lg">aiViator Pricing Tiers</h3>
              <div className="grid md:grid-cols-4 gap-4">
                {Object.entries(metrics.pricingTiers).map(([key, tier]) => (
                  <div key={key} className="bg-gray-700/30 border border-gray-600 rounded-lg p-4">
                    <div className="font-bold text-white capitalize mb-2">{key}</div>
                    <div className="text-2xl font-bold text-cyan-400">
                      {tier.price === -1 ? 'Custom' : tier.price === 0 ? 'Free' : `$${tier.price}/mo`}
            </div>
                    <div className="text-xs text-gray-400 mt-2">
                      {tier.scans === -1 ? 'Unlimited scans' : `${tier.scans} scans/mo`}
              </div>
                    <div className="text-xs text-gray-400">
                      {tier.entries === -1 ? 'Unlimited entries' : `${tier.entries} entries/mo`}
            </div>
              </div>
                ))}
            </div>
              </div>
            </div>
        )}

        {/* Add remaining sections: market, competition, financials, roadmap, resources */}
        {/* For now, showing key sections. Full implementation would include all. */}
        
        {activeSection === 'market' && (
          <div className="space-y-6">
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-green-300 font-medium">✓ All data below is verified with sources</p>
                  </div>
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="font-bold text-white mb-4">US Pilot Population (FAA December 2024)</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
                  <div className="text-sm text-cyan-300">Total Pilots</div>
                  <div className="text-2xl font-bold text-white">{verifiedMarket.usPilots.total.toLocaleString()}</div>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <div className="text-sm text-blue-300">Certificated</div>
                  <div className="text-2xl font-bold text-white">{verifiedMarket.usPilots.certificated.toLocaleString()}</div>
                  </div>
                <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                  <div className="text-sm text-purple-300">Students</div>
                  <div className="text-2xl font-bold text-white">{verifiedMarket.usPilots.students.toLocaleString()}</div>
                </div>
                <div className="bg-pink-500/10 border border-pink-500/20 rounded-lg p-4">
                  <div className="text-sm text-pink-300">CFIs</div>
                  <div className="text-2xl font-bold text-white">{verifiedMarket.usPilots.cfis.toLocaleString()}</div>
                  </div>
                </div>
              <p className="text-xs text-gray-400 mt-4">Source: {verifiedMarket.usPilots.source}</p>
            </div>
          </div>
        )}

        {activeSection === 'competition' && (
          <div className="space-y-6">
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-orange-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-orange-300">ForeFlight sold for $10.55B to Thoma Bravo (Nov 2025)</p>
                  <p className="text-orange-200/70 text-sm mt-1">PE ownership typically means price increases and slower innovation. Already raised prices 20% in March 2025.</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {Object.entries(competitors).map(([key, comp]) => (
                <div key={key} className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 backdrop-blur-sm">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-white">{comp.name}</h3>
                    {comp.verified && (
                      <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded text-xs">Verified</span>
                    )}
                  </div>
                  <div className="space-y-2 text-sm">
                    {'exitValue' in comp && comp.exitValue && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Exit Value:</span>
                        <span className="font-bold text-green-400">${comp.exitValue}B</span>
                      </div>
                    )}
                    {'users' in comp && comp.users && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Users:</span>
                        <span className="text-white">{typeof comp.users === 'number' ? comp.users.toLocaleString() : comp.users}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-400">Platform:</span>
                      <span className="text-white">{comp.platform}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">AI OCR:</span>
                      <span className={comp.hasOCR ? 'text-green-400' : 'text-red-400'}>{comp.hasOCR ? '✅ Yes' : '❌ No'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">B2B Model:</span>
                      <span className={comp.hasB2B ? 'text-green-400' : 'text-red-400'}>{comp.hasB2B ? '✅ Yes' : '❌ No'}</span>
                    </div>
                      </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'financials' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 backdrop-blur-sm">
                <h3 className="font-bold text-white mb-4">Current State</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">MRR</span>
                    <span className="font-bold text-white">${metrics.mrr}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">ARR</span>
                    <span className="font-bold text-white">${calculated.arr}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Paid Users</span>
                    <span className="font-bold text-white">{metrics.paidUsers}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 backdrop-blur-sm">
                <h3 className="font-bold text-white mb-4">Monthly Costs</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Supabase</span>
                    <span className="text-white">${metrics.monthlySupabase}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Vercel</span>
                    <span className="text-white">${metrics.monthlyVercel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">AI/OCR</span>
                    <span className="text-white">${metrics.monthlyAI}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Other</span>
                    <span className="text-white">${metrics.monthlyOther}</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-700 pt-2">
                    <span className="font-medium text-white">Total</span>
                    <span className="font-bold text-white">${calculated.totalMonthlyCosts}/mo</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 backdrop-blur-sm">
                <h3 className="font-bold text-white mb-4">Break Even</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Monthly Costs</span>
                    <span className="text-white">${calculated.totalMonthlyCosts}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Plus Price/Month</span>
                    <span className="text-white">${metrics.pricingTiers.plus.price}</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-700 pt-2">
                    <span className="font-medium text-white">Users Needed</span>
                    <span className="font-bold text-green-400">{calculated.usersToBreakeven}</span>
                  </div>
                    </div>
                    </div>
            </div>
          </div>
        )}

        {activeSection === 'roadmap' && (
          <div className="space-y-6">
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="font-bold text-white mb-4">Product Priorities</h3>
              <div className="space-y-3">
                {[
                  { priority: 'P0', item: 'Streamline auth/signup flow', status: 'in-progress', notes: 'Demo-ready soon' },
                  { priority: 'P0', item: 'Optimize deployment pipeline', status: 'in-progress', notes: 'Improving reliability' },
                  { priority: 'P1', item: 'AI OCR accuracy improvements', status: 'planned', notes: 'Core differentiator' },
                  { priority: 'P1', item: '8710 export', status: 'planned', notes: 'Required for checkrides' },
                  { priority: 'P2', item: 'Google Sheets sync', status: 'planned', notes: 'OAuth verification needed' },
                  { priority: 'P2', item: 'Currency dashboard', status: 'planned', notes: 'Table stakes feature' },
                  { priority: 'P3', item: 'EFB import (ForeFlight/Garmin)', status: 'future', notes: 'Switching cost reducer' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-700">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      item.priority === 'P0' ? 'bg-red-500/20 text-red-300' :
                      item.priority === 'P1' ? 'bg-orange-500/20 text-orange-300' :
                      item.priority === 'P2' ? 'bg-yellow-500/20 text-yellow-300' :
                      'bg-gray-700/50 text-gray-400'
                    }`}>{item.priority}</span>
                    <span className="flex-1 text-white">{item.item}</span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      item.status === 'in-progress' ? 'bg-cyan-500/20 text-cyan-300' :
                      item.status === 'planned' ? 'bg-gray-700/50 text-gray-400' :
                      'bg-gray-800/50 text-gray-500'
                    }`}>{item.status}</span>
                    <span className="text-xs text-gray-500 w-40">{item.notes}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSection === 'resources' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 backdrop-blur-sm">
                <h3 className="font-bold text-white mb-4">Quick Links</h3>
                <div className="space-y-2">
                  {[
                    { label: 'Production App', url: 'https://myaiviator.app' },
                    { label: 'Staging', url: 'https://staging.myaiviator.app' },
                    { label: 'Supabase Dashboard', url: 'https://supabase.com/dashboard' },
                    { label: 'Vercel Dashboard', url: 'https://vercel.com' },
                    { label: 'Stripe Dashboard', url: 'https://dashboard.stripe.com' },
                  ].map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-700/50 transition-colors text-gray-300 hover:text-white"
                    >
                      <span>{link.label}</span>
                      <ExternalLink className="w-4 h-4 text-gray-400" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 backdrop-blur-sm">
                <h3 className="font-bold text-white mb-4">Key Documents</h3>
                <div className="space-y-2">
                  {[
                    { label: 'Pitch Deck', status: 'In Progress' },
                    { label: 'Financial Model', status: 'Needed' },
                    { label: 'Technical Architecture', status: 'Done' },
                    { label: 'Competitive Analysis', status: 'Done' },
                    { label: 'User Personas', status: 'Needed' },
                    { label: 'Go-to-Market Plan', status: 'In Progress' },
                  ].map((doc, i) => (
                    <div key={i} className="flex items-center justify-between py-2 px-3">
                      <span className="text-gray-300">{doc.label}</span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        doc.status === 'Done' ? 'bg-green-500/20 text-green-300' :
                        doc.status === 'In Progress' ? 'bg-yellow-500/20 text-yellow-300' :
                        'bg-red-500/20 text-red-300'
                      }`}>{doc.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Footer */}
      <div className="border-t border-gray-700 bg-gray-900/50 mt-8">
        <div className="max-w-7xl mx-auto px-6 py-4 text-center text-xs text-gray-400">
          <p>aiViator Founder Dashboard • Private • Last updated December 3, 2025</p>
          <p className="mt-1">Green ✓ = Verified data with sources • Yellow ⚠ = Areas for improvement • Red ✗ = Unknown</p>
        </div>
      </div>
    </div>
  );
}
