import { useState } from 'react';
import { 
  TrendingUp, Users, DollarSign, Target, Plane, 
  BarChart3, Shield, FileText, ExternalLink,
  AlertTriangle, CheckCircle, Clock, Zap, Globe,
  Building2, Sparkles, Activity
} from 'lucide-react';
import { 
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart as RechartsPieChart, Pie, Cell
} from 'recharts';

export default function FounderDashboard() {
  const [activeSection, setActiveSection] = useState('overview');
  
  const [metrics, setMetrics] = useState({
    totalUsers: 1000,
    paidUsers: 0,
    freeUsers: 1000,
    activeSchools: 3,
    mrr: 0,
    studentPrice: 49,
    proPrice: 99,
    weeklySignups: 0,
    weeklyChurn: 0,
    conversionRate: 0,
    monthlySupabase: 25,
    monthlyVercel: 20,
    monthlyAI: 500,
    monthlyOther: 100,
  });

  const verifiedMarket = {
    pilots: {
      total: 848770, certificated: 503275, students: 345495,
      private: 161000, commercial: 103000, atp: 175000, cfis: 138127,
      certificatesIssued2023: 134057, studentCertsIssued2023: 69503,
      studentGrowthYoY: 24, newPilotsNeeded2043: 674000,
    },
    training: {
      marketSize2024: 9.84, marketSize2025: 11.2, marketSize2034: 35.84,
      cagr: 13.8, flightSchools: 3200, part141Schools: 500, avgStudentsPerSchool: 100,
    }
  };

  const competitors = [
    { name: 'ForeFlight', logo: '✈️', type: 'EFB + Logbook', exitValue: 10.55, buyer: 'Thoma Bravo (PE)',
      users: '500K+', pricing: { basic: 119.99, pro: 239.99, perf: 359.99 }, priceIncrease: '+20% Mar 2025',
      platform: 'iOS only', hasOCR: false, hasCrossPlatform: false, threat: 'high', color: '#3B82F6',
      strengths: ['Market leader', 'Jeppesen charts', 'Brand recognition'],
      gaps: ['iOS only', 'PE = price hikes', 'No photo OCR'], verified: true },
    { name: 'LogTen Pro', logo: '📘', type: 'Dedicated Logbook', users: 120000,
      pricing: { basic: 79.99, pro: 129.99 }, platform: 'Apple only',
      hasOCR: false, hasCrossPlatform: false, threat: 'high', color: '#8B5CF6',
      strengths: ['Professional features', 'Airline integrations', '10+ years'],
      gaps: ['Apple only', 'No Android/web', 'No OCR'], verified: true },
    { name: 'MyFlightBook', logo: '📗', type: 'Free Logbook', users: 100000,
      flightsLogged: 23750000, pricing: { free: 0 }, platform: 'All',
      hasOCR: false, hasCrossPlatform: true, threat: 'medium', color: '#10B981',
      strengths: ['Free forever', 'Cross-platform', 'Open source'],
      gaps: ['Dated UI', 'Minimal features', 'Hobby project'], verified: true },
    { name: 'Safelog', logo: '📕', type: 'Dedicated Logbook',
      pricing: { basic: 49.99 }, platform: 'Win/iOS/Android',
      hasOCR: false, hasCrossPlatform: true, threat: 'low', color: '#EF4444',
      strengths: ['Windows support', 'Affordable'],
      gaps: ['Outdated', 'Limited features'], verified: false },
    { name: 'aiViator', logo: '🚀', type: 'AI-Powered Logbook', users: metrics.totalUsers,
      pricing: { student: metrics.studentPrice, pro: metrics.proPrice }, platform: 'All (PWA)',
      hasOCR: true, hasCrossPlatform: true, threat: 'us', color: '#06B6D4',
      strengths: ['AI Photo OCR (unique)', 'B2B distribution', 'Cross-platform', 'Price advantage'],
      gaps: ['Building awareness', 'Scaling team'], verified: true },
  ];

  const marketGrowthData = [
    { year: '2024', market: 9.84 }, { year: '2025', market: 11.2 },
    { year: '2026', market: 12.7 }, { year: '2028', market: 16.5 },
    { year: '2030', market: 21.4 }, { year: '2034', market: 35.8 },
  ];

  const b2bScenarios = [
    { schools: 3, students: 450, arr: 22050, label: 'Current' },
    { schools: 10, students: 1500, arr: 73500, label: 'Q2 2026' },
    { schools: 25, students: 3750, arr: 183750, label: 'Q4 2026' },
    { schools: 50, students: 7500, arr: 367500, label: '2027' },
    { schools: 100, students: 15000, arr: 735000, label: '2028' },
  ];

  const featureMatrix = [
    { feature: 'AI Photo OCR', aiviator: true, foreflight: false, logten: false, mfb: false, unique: true },
    { feature: 'Cross-Platform', aiviator: true, foreflight: false, logten: false, mfb: true, unique: false },
    { feature: 'B2B Flight School Model', aiviator: true, foreflight: false, logten: false, mfb: false, unique: true },
    { feature: 'Google Sheets Sync', aiviator: true, foreflight: false, logten: false, mfb: false, unique: true },
    { feature: 'Under $100/year', aiviator: true, foreflight: false, logten: true, mfb: true, unique: false },
    { feature: '8710 Export', aiviator: true, foreflight: true, logten: true, mfb: true, unique: false },
    { feature: 'Currency Tracking', aiviator: true, foreflight: true, logten: true, mfb: true, unique: false },
    { feature: 'Digital Endorsements', aiviator: true, foreflight: true, logten: false, mfb: true, unique: false },
  ];

  const calculated = {
    totalMonthlyCosts: metrics.monthlySupabase + metrics.monthlyVercel + metrics.monthlyAI + metrics.monthlyOther,
    arr: metrics.mrr * 12,
    usersToBreakeven: Math.ceil((metrics.monthlySupabase + metrics.monthlyVercel + metrics.monthlyAI + metrics.monthlyOther) / (metrics.proPrice / 12)),
    marketPenetration: ((metrics.totalUsers / verifiedMarket.pilots.total) * 100).toFixed(4),
  };

  const sections = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'market', label: 'Market Intel', icon: Globe },
    { id: 'competition', label: 'Competition', icon: Shield },
    { id: 'metrics', label: 'Our Metrics', icon: Activity },
    { id: 'b2b', label: 'B2B Strategy', icon: Building2 },
    { id: 'financials', label: 'Financials', icon: DollarSign },
    { id: 'roadmap', label: 'Roadmap', icon: Target },
    { id: 'resources', label: 'Resources', icon: FileText },
  ];

  const COLORS = ['#06B6D4', '#8B5CF6', '#10B981', '#F59E0B'];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-900 to-cyan-900/30 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                <Plane className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  aiViator Founder Hub
                </h1>
                <p className="text-gray-500 text-sm">Market Intelligence - Strategy - Metrics</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium">
                Private
              </span>
              <span className="px-3 py-1 rounded-full bg-gray-800 text-gray-400 text-xs">Dec 2025</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-gray-900/50 border-b border-gray-800 sticky top-0 z-10 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto py-3">
            {sections.map(section => (
              <button key={section.id} onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                  activeSection === section.id ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'}`}>
                <section.icon className="w-4 h-4" />{section.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* OVERVIEW */}
        {activeSection === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 rounded-2xl p-5 border border-cyan-500/20">
                <div className="flex items-center gap-2 text-cyan-400 text-sm mb-2">
                  <Users className="w-4 h-4" />Total Users
                </div>
                <div className="text-3xl font-bold text-white">{metrics.totalUsers.toLocaleString()}</div>
                <div className="text-xs text-gray-500 mt-1">from {metrics.activeSchools} schools</div>
              </div>
              <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 rounded-2xl p-5 border border-green-500/20">
                <div className="flex items-center gap-2 text-green-400 text-sm mb-2">
                  <DollarSign className="w-4 h-4" />MRR
                </div>
                <div className="text-3xl font-bold text-white">${metrics.mrr.toLocaleString()}</div>
                <div className="text-xs text-gray-500 mt-1">${calculated.arr.toLocaleString()} ARR</div>
              </div>
              <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 rounded-2xl p-5 border border-purple-500/20">
                <div className="flex items-center gap-2 text-purple-400 text-sm mb-2">
                  <Target className="w-4 h-4" />TAM (US Pilots)
                </div>
                <div className="text-3xl font-bold text-white">503K</div>
                <div className="text-xs text-gray-500 mt-1">FAA Verified</div>
              </div>
              <div className="bg-gradient-to-br from-orange-500/10 to-orange-500/5 rounded-2xl p-5 border border-orange-500/20">
                <div className="flex items-center gap-2 text-orange-400 text-sm mb-2">
                  <Sparkles className="w-4 h-4" />ForeFlight Exit
                </div>
                <div className="text-3xl font-bold text-white">$10.55B</div>
                <div className="text-xs text-gray-500 mt-1">Nov 2025</div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
                <h3 className="font-bold text-white flex items-center gap-2 mb-4">
                  <CheckCircle className="w-5 h-5 text-green-500" />Verified Facts
                </h3>
                <ul className="space-y-2 text-sm">
                  {['848,770 US pilots (FAA Dec 2024)', 'Student pilots +24% YoY', 'ForeFlight sold for $10.55B to PE',
                    'LogTen: 120K users at $80-130/yr', 'No competitor has AI photo OCR', 'ForeFlight/LogTen iOS-only',
                    '674K new pilots needed by 2043', 'Training market: $11.2B to $35.8B'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-300">
                      <span className="text-green-500">✓</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
                <h3 className="font-bold text-white flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />To Validate
                </h3>
                <ul className="space-y-2 text-sm">
                  {['Our actual conversion rate', 'Willingness to pay for OCR', 'Long-term churn rate',
                    'B2B acquisition cost/effort', 'Price sensitivity ($49 vs $99)', '% pilots using digital logbooks'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-300">
                      <span className="text-yellow-500">⚠</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
                <h3 className="font-bold text-white flex items-center gap-2 mb-4">
                  <Zap className="w-5 h-5 text-cyan-500" />Our Advantages
                </h3>
                <ul className="space-y-2 text-sm">
                  {[{ t: 'AI Photo OCR', n: 'Unique' }, { t: 'True Cross-Platform', n: 'Web+iOS+Android' },
                    { t: 'B2B Distribution', n: '$0 CAC' }, { t: '60% Cheaper', n: '$99 vs $240' },
                    { t: 'Modern Stack', n: 'Fast iteration' }, { t: 'Flight School Focus', n: 'Underserved' }
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-cyan-500">★</span>
                      <span className="text-gray-200">{item.t}</span>
                      <span className="text-gray-500 text-xs">{item.n}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
              <h3 className="font-bold text-white mb-6">Competitive Snapshot</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="text-left py-3 px-4 text-gray-400">Product</th>
                      <th className="text-right py-3 px-4 text-gray-400">Price/yr</th>
                      <th className="text-center py-3 px-4 text-gray-400">Platform</th>
                      <th className="text-center py-3 px-4 text-gray-400">AI OCR</th>
                      <th className="text-center py-3 px-4 text-gray-400">Users</th>
                      <th className="text-center py-3 px-4 text-gray-400">Threat</th>
                    </tr>
                  </thead>
                  <tbody>
                    {competitors.map((c, i) => (
                      <tr key={i} className={`border-b border-gray-800/50 ${c.name === 'aiViator' ? 'bg-cyan-500/5' : ''}`}>
                        <td className="py-3 px-4"><span className="mr-2">{c.logo}</span>
                          <span className={c.name === 'aiViator' ? 'text-cyan-400 font-medium' : 'text-gray-200'}>{c.name}</span>
                        </td>
                        <td className="text-right px-4 font-mono text-gray-300">
                          {'free' in c.pricing ? 'Free' : `$${Object.values(c.pricing)[0]}`}
                        </td>
                        <td className="text-center px-4">
                          {c.hasCrossPlatform ? <span className="text-green-400">All</span> : <span className="text-gray-500">{c.platform}</span>}
                        </td>
                        <td className="text-center px-4">{c.hasOCR ? <span className="text-green-400">✓</span> : <span className="text-gray-600">✗</span>}</td>
                        <td className="text-center px-4 text-gray-400">{typeof c.users === 'number' ? c.users.toLocaleString() : c.users || '—'}</td>
                        <td className="text-center px-4">
                          <span className={`px-2 py-1 rounded text-xs ${
                            c.threat === 'us' ? 'bg-cyan-500/20 text-cyan-400' :
                            c.threat === 'high' ? 'bg-red-500/20 text-red-400' :
                            c.threat === 'medium' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-gray-700 text-gray-400'}`}>
                            {c.threat === 'us' ? '🚀 Us' : c.threat}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* MARKET INTEL */}
        {activeSection === 'market' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-2xl p-6 border border-purple-500/20">
              <div className="flex items-center gap-3 mb-2">
                <Globe className="w-6 h-6 text-purple-400" />
                <h2 className="text-xl font-bold text-white">US Aviation Market Intelligence</h2>
              </div>
              <p className="text-gray-400">All data verified from FAA Civil Airmen Statistics (December 2024)</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-cyan-400" />US Pilot Population
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { l: 'Total (incl. students)', v: verifiedMarket.pilots.total },
                    { l: 'Certificated', v: verifiedMarket.pilots.certificated },
                    { l: 'Student Pilots', v: verifiedMarket.pilots.students },
                    { l: 'Private', v: verifiedMarket.pilots.private },
                    { l: 'Commercial', v: verifiedMarket.pilots.commercial },
                    { l: 'ATP', v: verifiedMarket.pilots.atp },
                    { l: 'CFIs', v: verifiedMarket.pilots.cfis },
                    { l: 'New Certs 2023', v: verifiedMarket.pilots.certificatesIssued2023 },
                  ].map((item, i) => (
                    <div key={i} className="bg-gray-800/50 rounded-lg p-3">
                      <div className="text-lg font-bold text-white">{item.v.toLocaleString()}</div>
                      <div className="text-xs text-gray-400">{item.l}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 text-xs text-green-400 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />FAA Civil Airmen Statistics, Dec 2024
                </div>
              </div>

              <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
                <h3 className="font-bold text-white mb-4">Pilot Distribution</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <RechartsPieChart>
                    <Pie data={[
                      { name: 'Students', value: verifiedMarket.pilots.students },
                      { name: 'Private', value: verifiedMarket.pilots.private },
                      { name: 'Commercial', value: verifiedMarket.pilots.commercial },
                      { name: 'ATP', value: verifiedMarket.pilots.atp },
                    ]} cx="50%" cy="50%" innerRadius={50} outerRadius={90} paddingAngle={2} dataKey="value">
                      {COLORS.map((color, index) => (<Cell key={index} fill={color} />))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }} />
                  </RechartsPieChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap gap-3 justify-center mt-2">
                  {['Students', 'Private', 'Commercial', 'ATP'].map((n, i) => (
                    <div key={i} className="flex items-center gap-1 text-xs text-gray-400">
                      <div className="w-2 h-2 rounded" style={{ backgroundColor: COLORS[i] }}></div>{n}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-400" />Growth Indicators
                </h3>
                <div className="space-y-3">
                  {[
                    { l: 'Student Pilot Growth (YoY)', v: '+24%', c: 'green' },
                    { l: 'New Pilots Needed (2043)', v: '674K', c: 'cyan' },
                    { l: 'Training Market CAGR', v: '13.8%', c: 'purple' },
                  ].map((item, i) => (
                    <div key={i} className={`bg-${item.c}-500/10 rounded-lg p-4 border border-${item.c}-500/20`}>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">{item.l}</span>
                        <span className={`text-2xl font-bold text-${item.c}-400`}>{item.v}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
                <h3 className="font-bold text-white mb-4">Training Market Growth</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={marketGrowthData}>
                    <defs>
                      <linearGradient id="mktGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#06B6D4" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="year" stroke="#9CA3AF" fontSize={11} />
                    <YAxis stroke="#9CA3AF" fontSize={11} tickFormatter={(v) => `$${v}B`} />
                    <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
                      formatter={(value: number) => [`$${value}B`, 'Market']} />
                    <Area type="monotone" dataKey="market" stroke="#06B6D4" fill="url(#mktGrad)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
                <div className="text-xs text-gray-500 mt-2 text-center">$9.84B (2024) → $35.84B (2034)</div>
              </div>
            </div>

            <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
              <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-orange-400" />Flight School Market
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { l: 'US Flight Schools', v: '3,200+' },
                  { l: 'Part 141 Certified', v: '~500' },
                  { l: 'Avg Students/School', v: '100' },
                  { l: 'Active Students', v: '345K' },
                ].map((item, i) => (
                  <div key={i} className="bg-gray-800/50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-white">{item.v}</div>
                    <div className="text-xs text-gray-400">{item.l}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                <p className="text-cyan-400 text-sm">
                  <strong>B2B Insight:</strong> 100 school partnerships × 100 students = 10,000 users with $0 CAC
                </p>
              </div>
            </div>
          </div>
        )}

        {/* COMPETITION */}
        {activeSection === 'competition' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl p-6 border border-orange-500/30">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-8 h-8 text-orange-400 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-white">ForeFlight Acquired: $10.55B to Thoma Bravo</h3>
                  <p className="text-gray-300 mt-2">PE ownership = price extraction. Already +20% in March 2025. Opportunity for lower-cost alternatives.</p>
                  <div className="flex gap-3 mt-4">
                    <span className="px-3 py-1 bg-orange-500/20 rounded-full text-orange-400 text-sm">Nov 2025</span>
                    <span className="px-3 py-1 bg-red-500/20 rounded-full text-red-400 text-sm">+20% Price Hike</span>
                    <span className="px-3 py-1 bg-green-500/20 rounded-full text-green-400 text-sm flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />Verified
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {competitors.map((c, i) => (
                <div key={i} className={`bg-gray-900/50 rounded-2xl p-6 border ${c.name === 'aiViator' ? 'border-cyan-500/50 bg-cyan-500/5' : 'border-gray-800'}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{c.logo}</span>
                      <div>
                        <h3 className={`font-bold ${c.name === 'aiViator' ? 'text-cyan-400' : 'text-white'}`}>{c.name}</h3>
                        <p className="text-xs text-gray-500">{c.type}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs ${
                      c.threat === 'us' ? 'bg-cyan-500/20 text-cyan-400' :
                      c.threat === 'high' ? 'bg-red-500/20 text-red-400' :
                      c.threat === 'medium' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-gray-700 text-gray-400'}`}>
                      {c.threat === 'us' ? '🚀' : c.threat}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm">
                    {'exitValue' in c && <div className="flex justify-between"><span className="text-gray-500">Exit</span><span className="text-green-400 font-bold">${c.exitValue}B</span></div>}
                    {c.users && <div className="flex justify-between"><span className="text-gray-500">Users</span><span className="text-gray-300">{typeof c.users === 'number' ? c.users.toLocaleString() : c.users}</span></div>}
                    <div className="flex justify-between"><span className="text-gray-500">Price</span><span className="text-gray-300 font-mono">{'free' in c.pricing ? 'Free' : `$${Object.values(c.pricing)[0]}/yr`}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Platform</span><span className={c.hasCrossPlatform ? 'text-green-400' : 'text-gray-400'}>{c.platform}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">AI OCR</span><span>{c.hasOCR ? <span className="text-green-400">✓</span> : <span className="text-gray-600">✗</span>}</span></div>
                    {'priceIncrease' in c && <div className="flex justify-between text-orange-400"><span>Price Hike</span><span>{c.priceIncrease}</span></div>}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-800 space-y-2">
                    <div className="flex flex-wrap gap-1">
                      {c.strengths.slice(0, 2).map((s, j) => (<span key={j} className="px-2 py-0.5 bg-green-500/10 text-green-400 rounded text-xs">{s}</span>))}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {c.gaps.slice(0, 2).map((w, j) => (<span key={j} className="px-2 py-0.5 bg-orange-500/10 text-orange-400 rounded text-xs">{w}</span>))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
              <h3 className="font-bold text-white mb-4">Feature Matrix</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="text-left py-3 px-4 text-gray-400">Feature</th>
                      <th className="text-center py-3 px-4 text-cyan-400">aiViator</th>
                      <th className="text-center py-3 px-4 text-gray-400">ForeFlight</th>
                      <th className="text-center py-3 px-4 text-gray-400">LogTen</th>
                      <th className="text-center py-3 px-4 text-gray-400">MFB</th>
                      <th className="text-center py-3 px-4 text-gray-400">Unique?</th>
                    </tr>
                  </thead>
                  <tbody>
                    {featureMatrix.map((r, i) => (
                      <tr key={i} className="border-b border-gray-800/50">
                        <td className="py-2 px-4 text-gray-300">{r.feature}</td>
                        <td className="text-center px-4">{r.aiviator ? <span className="text-green-400">✓</span> : <span className="text-gray-600">✗</span>}</td>
                        <td className="text-center px-4">{r.foreflight ? <span className="text-green-400">✓</span> : <span className="text-gray-600">✗</span>}</td>
                        <td className="text-center px-4">{r.logten ? <span className="text-green-400">✓</span> : <span className="text-gray-600">✗</span>}</td>
                        <td className="text-center px-4">{r.mfb ? <span className="text-green-400">✓</span> : <span className="text-gray-600">✗</span>}</td>
                        <td className="text-center px-4">{r.unique ? <span className="text-cyan-400 font-bold">★</span> : <span className="text-gray-600">—</span>}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
              <h3 className="font-bold text-white mb-4">Pricing Comparison</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={[
                  { name: 'aiViator Pro', price: metrics.proPrice, fill: '#06B6D4' },
                  { name: 'LogTen Basic', price: 79.99, fill: '#8B5CF6' },
                  { name: 'LogTen Pro', price: 129.99, fill: '#8B5CF6' },
                  { name: 'FF Basic', price: 119.99, fill: '#3B82F6' },
                  { name: 'FF Pro', price: 239.99, fill: '#3B82F6' },
                  { name: 'FF Perf', price: 359.99, fill: '#3B82F6' },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9CA3AF" fontSize={10} angle={-30} textAnchor="end" height={60} />
                  <YAxis stroke="#9CA3AF" fontSize={11} tickFormatter={(v) => `$${v}`} />
                  <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
                    formatter={(value: number) => [`$${value}/yr`, 'Price']} />
                  <Bar dataKey="price" radius={[4, 4, 0, 0]}>
                    {[0,1,2,3,4,5].map(i => <Cell key={i} fill={i === 0 ? '#06B6D4' : i < 3 ? '#8B5CF6' : '#3B82F6'} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 grid md:grid-cols-3 gap-4">
                <div className="bg-cyan-500/10 rounded-lg p-4 border border-cyan-500/20 text-center">
                  <div className="text-2xl font-bold text-cyan-400">59%</div>
                  <div className="text-xs text-gray-400">Cheaper than FF Pro</div>
                </div>
                <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/20 text-center">
                  <div className="text-2xl font-bold text-green-400">$141</div>
                  <div className="text-xs text-gray-400">Annual savings</div>
                </div>
                <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20 text-center">
                  <div className="text-2xl font-bold text-purple-400">4</div>
                  <div className="text-xs text-gray-400">Unique features</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* METRICS */}
        {activeSection === 'metrics' && (
          <div className="space-y-8">
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-500" />
                <span className="text-yellow-400 font-medium">Enter your real numbers — calculations update automatically</span>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2"><Users className="w-5 h-5 text-cyan-400" />Users</h3>
                <div className="space-y-4">
                  {[
                    { l: 'Total Users', k: 'totalUsers', v: metrics.totalUsers, max: 50000 },
                    { l: 'Paid Users', k: 'paidUsers', v: metrics.paidUsers, max: 10000 },
                    { l: 'Active Schools', k: 'activeSchools', v: metrics.activeSchools, max: 100 },
                  ].map((item) => (
                    <div key={item.k} className="space-y-1">
                      <div className="flex justify-between text-sm"><span className="text-gray-400">{item.l}</span><span className="text-white font-mono">{item.v.toLocaleString()}</span></div>
                      <input type="range" min={0} max={item.max} value={item.v}
                        onChange={(e) => setMetrics({...metrics, [item.k]: Number(e.target.value)})}
                        className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-cyan-500" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2"><DollarSign className="w-5 h-5 text-green-400" />Revenue</h3>
                <div className="space-y-4">
                  {[
                    { l: 'MRR', k: 'mrr', v: metrics.mrr, max: 50000, p: '$' },
                    { l: 'Pro Price/yr', k: 'proPrice', v: metrics.proPrice, max: 200, p: '$' },
                    { l: 'Conversion %', k: 'conversionRate', v: metrics.conversionRate, max: 50, s: '%' },
                  ].map((item) => (
                    <div key={item.k} className="space-y-1">
                      <div className="flex justify-between text-sm"><span className="text-gray-400">{item.l}</span><span className="text-white font-mono">{item.p || ''}{item.v}{item.s || ''}</span></div>
                      <input type="range" min={0} max={item.max} value={item.v}
                        onChange={(e) => setMetrics({...metrics, [item.k]: Number(e.target.value)})}
                        className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-green-500" />
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-800">
                  <div className="flex justify-between"><span className="text-gray-400">ARR</span><span className="text-xl font-bold text-green-400">${calculated.arr.toLocaleString()}</span></div>
                </div>
              </div>
              <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2"><BarChart3 className="w-5 h-5 text-orange-400" />Costs/mo</h3>
                <div className="space-y-4">
                  {[
                    { l: 'Supabase', k: 'monthlySupabase', v: metrics.monthlySupabase, max: 500 },
                    { l: 'Vercel', k: 'monthlyVercel', v: metrics.monthlyVercel, max: 200 },
                    { l: 'AI/OCR', k: 'monthlyAI', v: metrics.monthlyAI, max: 2000 },
                    { l: 'Other', k: 'monthlyOther', v: metrics.monthlyOther, max: 500 },
                  ].map((item) => (
                    <div key={item.k} className="space-y-1">
                      <div className="flex justify-between text-sm"><span className="text-gray-400">{item.l}</span><span className="text-white font-mono">${item.v}</span></div>
                      <input type="range" min={0} max={item.max} value={item.v}
                        onChange={(e) => setMetrics({...metrics, [item.k]: Number(e.target.value)})}
                        className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-orange-500" />
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-800 space-y-2">
                  <div className="flex justify-between"><span className="text-gray-400">Total</span><span className="text-white font-mono">${calculated.totalMonthlyCosts}/mo</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Break-even</span><span className="text-orange-400 font-bold">{calculated.usersToBreakeven} paid</span></div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { l: 'Market Penetration', v: `${calculated.marketPenetration}%` },
                { l: 'vs LogTen Users', v: `${((metrics.totalUsers / 120000) * 100).toFixed(1)}%` },
                { l: 'Users to 1% Market', v: Math.round(verifiedMarket.pilots.certificated * 0.01).toLocaleString() },
                { l: 'ARR at 1% (10% paid)', v: `$${((Math.round(verifiedMarket.pilots.certificated * 0.01) * 0.1 * metrics.proPrice) / 1000).toFixed(0)}K` },
              ].map((item, i) => (
                <div key={i} className="bg-gray-900/50 rounded-xl p-4 border border-gray-800">
                  <div className="text-gray-400 text-sm">{item.l}</div>
                  <div className="text-2xl font-bold text-white">{item.v}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* B2B */}
        {activeSection === 'b2b' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-green-500/10 to-cyan-500/10 rounded-2xl p-6 border border-green-500/20">
              <h2 className="text-xl font-bold text-white flex items-center gap-3"><Building2 className="w-6 h-6 text-green-400" />B2B Flight School Strategy</h2>
              <p className="text-gray-400 mt-2">Schools provide distribution with $0 CAC. Each partnership = 50-200 students with 12-24mo retention.</p>
            </div>
            <div className="grid md:grid-cols-4 gap-4">
              {[
                { l: 'Active Schools', v: metrics.activeSchools },
                { l: 'Total Users', v: metrics.totalUsers.toLocaleString() },
                { l: 'Avg Users/School', v: Math.round(metrics.totalUsers / metrics.activeSchools) },
                { l: 'CAC', v: '$0', c: 'green' },
              ].map((item, i) => (
                <div key={i} className="bg-gray-900/50 rounded-xl p-5 border border-gray-800">
                  <div className="text-gray-400 text-sm">{item.l}</div>
                  <div className={`text-3xl font-bold ${item.c ? `text-${item.c}-400` : 'text-white'}`}>{item.v}</div>
                </div>
              ))}
            </div>
            <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
              <h3 className="font-bold text-white mb-6">B2B Growth Scenarios</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={b2bScenarios}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="label" stroke="#9CA3AF" fontSize={11} />
                  <YAxis stroke="#9CA3AF" fontSize={11} tickFormatter={(v) => `$${v/1000}K`} />
                  <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
                    formatter={(value: number) => [`$${value.toLocaleString()}`, 'ARR']} />
                  <Bar dataKey="arr" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-gray-800">
                    <th className="text-left py-2 text-gray-400">Milestone</th>
                    <th className="text-right py-2 text-gray-400">Schools</th>
                    <th className="text-right py-2 text-gray-400">Students</th>
                    <th className="text-right py-2 text-gray-400">Paid (10%)</th>
                    <th className="text-right py-2 text-gray-400">ARR</th>
                  </tr></thead>
                  <tbody>
                    {b2bScenarios.map((s, i) => (
                      <tr key={i} className="border-b border-gray-800/50">
                        <td className="py-2 text-gray-300">{s.label}</td>
                        <td className="text-right text-white">{s.schools}</td>
                        <td className="text-right text-white">{s.students.toLocaleString()}</td>
                        <td className="text-right text-white">{Math.round(s.students * 0.1)}</td>
                        <td className="text-right text-green-400 font-mono">${s.arr.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 text-xs text-yellow-500 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />Assumes 150 students/school, 10% conversion, $49/yr blended
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
                <h3 className="font-bold text-white mb-4">Why B2B Works</h3>
                <div className="space-y-3">
                  {[
                    { i: DollarSign, t: 'Zero CAC', d: 'School provides users' },
                    { i: Users, t: 'Bulk Onboarding', d: '50-200 users/deal' },
                    { i: Clock, t: 'Built-in Retention', d: '12-24mo programs' },
                    { i: TrendingUp, t: 'Network Effect', d: 'CFIs recommend to all' },
                  ].map((item, j) => (
                    <div key={j} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                        <item.i className="w-4 h-4 text-cyan-400" />
                      </div>
                      <div><div className="text-white font-medium">{item.t}</div><div className="text-gray-500 text-sm">{item.d}</div></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
                <h3 className="font-bold text-white mb-4">Target Schools</h3>
                <div className="space-y-3">
                  {[
                    { l: 'Part 141 Schools', v: '~500 (high volume)' },
                    { l: 'Part 61 Schools', v: '~2,700 (smaller)' },
                    { l: 'University Programs', v: '~200 (large cohorts)' },
                  ].map((item, j) => (
                    <div key={j} className="flex justify-between py-2 border-b border-gray-800">
                      <span className="text-gray-300">{item.l}</span><span className="text-white">{item.v}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                  <p className="text-sm text-cyan-400"><strong>100 schools</strong> = 15K users = $150K+ ARR potential</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FINANCIALS */}
        {activeSection === 'financials' && (
          <div className="space-y-8">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
                <h3 className="font-bold text-white mb-4">Current State</h3>
                <div className="space-y-3">
                  {[
                    { l: 'MRR', v: `$${metrics.mrr}` },
                    { l: 'ARR', v: `$${calculated.arr}` },
                    { l: 'Paid Users', v: metrics.paidUsers },
                    { l: 'ARPU', v: `$${metrics.paidUsers > 0 ? Math.round(calculated.arr / metrics.paidUsers) : 0}/yr` },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between py-2 border-b border-gray-800">
                      <span className="text-gray-400">{item.l}</span><span className="text-white font-mono">{item.v}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
                <h3 className="font-bold text-white mb-4">Monthly Costs</h3>
                <div className="space-y-3">
                  {[
                    { l: 'Supabase', v: metrics.monthlySupabase },
                    { l: 'Vercel', v: metrics.monthlyVercel },
                    { l: 'AI/OCR', v: metrics.monthlyAI },
                    { l: 'Other', v: metrics.monthlyOther },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between py-2 border-b border-gray-800">
                      <span className="text-gray-400">{item.l}</span><span className="text-white font-mono">${item.v}</span>
                    </div>
                  ))}
                  <div className="flex justify-between py-2">
                    <span className="text-white font-medium">Total</span>
                    <span className="text-orange-400 font-bold">${calculated.totalMonthlyCosts}/mo</span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
                <h3 className="font-bold text-white mb-4">Break-Even</h3>
                <div className="text-center py-4">
                  <div className="text-5xl font-bold text-cyan-400">{calculated.usersToBreakeven}</div>
                  <div className="text-gray-400 mt-1">paid users needed</div>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-4 mt-4">
                  <div className="bg-gradient-to-r from-cyan-500 to-green-500 rounded-full h-4 transition-all"
                    style={{width: `${Math.min(100, (metrics.paidUsers / calculated.usersToBreakeven) * 100)}%`}}></div>
                </div>
                <div className="text-center text-sm text-gray-400 mt-2">
                  {metrics.paidUsers} / {calculated.usersToBreakeven} ({((metrics.paidUsers / calculated.usersToBreakeven) * 100).toFixed(0)}%)
                </div>
              </div>
            </div>

            <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
              <h3 className="font-bold text-white mb-6">Revenue Scenarios</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-gray-800">
                    <th className="text-left py-3 text-gray-400">Scenario</th>
                    <th className="text-right py-3 text-gray-400">Users</th>
                    <th className="text-right py-3 text-gray-400">Paid (10%)</th>
                    <th className="text-right py-3 text-gray-400">ARR</th>
                    <th className="text-right py-3 text-gray-400">Market %</th>
                  </tr></thead>
                  <tbody>
                    {[
                      { n: 'Current', u: metrics.totalUsers },
                      { n: '10 Schools', u: 1500 },
                      { n: '25 Schools', u: 3750 },
                      { n: '50 Schools', u: 7500 },
                      { n: '100 Schools', u: 15000 },
                      { n: '0.5% Market', u: Math.round(verifiedMarket.pilots.certificated * 0.005) },
                      { n: '1% Market', u: Math.round(verifiedMarket.pilots.certificated * 0.01) },
                    ].map((s, i) => {
                      const paid = Math.round(s.u * 0.1);
                      const arr = paid * metrics.proPrice;
                      return (
                        <tr key={i} className="border-b border-gray-800/50">
                          <td className="py-3 text-gray-300">{s.n}</td>
                          <td className="text-right font-mono text-white">{s.u.toLocaleString()}</td>
                          <td className="text-right font-mono text-white">{paid.toLocaleString()}</td>
                          <td className="text-right font-mono text-green-400">${arr.toLocaleString()}</td>
                          <td className="text-right text-gray-400">{((s.u / verifiedMarket.pilots.certificated) * 100).toFixed(2)}%</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
              <h3 className="font-bold text-white mb-6">Unit Economics (Estimates)</h3>
              <div className="grid md:grid-cols-4 gap-4">
                {[
                  { l: 'CAC (B2B)', v: '$0', n: 'School provides', c: 'green' },
                  { l: 'LTV (3yr)', v: `$${metrics.proPrice * 3}`, n: '3yr × price', c: 'cyan' },
                  { l: 'LTV:CAC', v: '∞', n: 'B2B model', c: 'purple' },
                  { l: 'Gross Margin', v: '~85%', n: 'Estimate', c: 'orange' },
                ].map((item, i) => (
                  <div key={i} className={`bg-${item.c}-500/10 rounded-xl p-4 border border-${item.c}-500/20`}>
                    <div className="text-2xl font-bold text-white">{item.v}</div>
                    <div className="text-sm text-gray-300">{item.l}</div>
                    <div className="text-xs text-gray-500 mt-1">{item.n}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-xs text-yellow-500 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />These are estimates — actual LTV, churn need measurement
              </div>
            </div>
          </div>
        )}

        {/* ROADMAP */}
        {activeSection === 'roadmap' && (
          <div className="space-y-8">
            <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
              <h3 className="font-bold text-white mb-6">Product Priorities</h3>
              <div className="space-y-2">
                {[
                  { p: 'P0', item: 'Streamline auth/signup flow', status: 'in-progress', notes: 'Demo-ready soon' },
                  { p: 'P0', item: 'Optimize deployment pipeline', status: 'in-progress', notes: 'Improving reliability' },
                  { p: 'P1', item: 'AI OCR accuracy improvements', status: 'planned', notes: 'Core differentiator' },
                  { p: 'P1', item: 'Simplified pricing (4 tiers)', status: 'planned', notes: 'Free/Student/Pro/School' },
                  { p: 'P1', item: 'Currency dashboard', status: 'planned', notes: 'Table stakes' },
                  { p: 'P2', item: 'Google Sheets sync', status: 'planned', notes: 'OAuth verification needed' },
                  { p: 'P2', item: '8710 export', status: 'planned', notes: 'Required for checkrides' },
                  { p: 'P2', item: 'Digital endorsements', status: 'planned', notes: 'AC 61-65H templates' },
                  { p: 'P3', item: 'FAR 117 duty tracking', status: 'future', notes: 'Pro pilots' },
                  { p: 'P3', item: 'EFB import (ForeFlight/Garmin)', status: 'future', notes: 'Reduce switching cost' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 py-3 px-4 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-colors">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      item.p === 'P0' ? 'bg-red-500/20 text-red-400' :
                      item.p === 'P1' ? 'bg-orange-500/20 text-orange-400' :
                      item.p === 'P2' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-gray-700 text-gray-400'}`}>{item.p}</span>
                    <span className="flex-1 text-gray-200">{item.item}</span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      item.status === 'in-progress' ? 'bg-blue-500/20 text-blue-400' :
                      item.status === 'planned' ? 'bg-gray-700 text-gray-400' : 'bg-gray-800 text-gray-500'}`}>{item.status}</span>
                    <span className="text-xs text-gray-500 w-36 text-right">{item.notes}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2"><Target className="w-5 h-5 text-cyan-400" />Q4 2025 Goals</h3>
                <div className="space-y-3">
                  {['Stable auth + deployment', '10 school partnerships', 'First paying customers', 'Investor deck finalized', 'Currency dashboard live'].map((g, i) => (
                    <div key={i} className="flex items-center gap-2 text-gray-300"><div className="w-2 h-2 rounded-full bg-cyan-500"></div>{g}</div>
                  ))}
                </div>
              </div>
              <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2"><Target className="w-5 h-5 text-purple-400" />Q1 2026 Goals</h3>
                <div className="space-y-3">
                  {['25 school partnerships', '$5K MRR milestone', 'Seed fundraise (if needed)', 'Feature parity with LogTen', 'Google OAuth verified'].map((g, i) => (
                    <div key={i} className="flex items-center gap-2 text-gray-300"><div className="w-2 h-2 rounded-full bg-purple-500"></div>{g}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* RESOURCES */}
        {activeSection === 'resources' && (
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
                <h3 className="font-bold text-white mb-4">Quick Links</h3>
                <div className="space-y-2">
                  {[
                    { l: 'Production App', u: 'https://myaiviator.app' },
                    { l: 'Staging', u: 'https://staging.myaiviator.app' },
                    { l: 'Supabase Dashboard', u: 'https://supabase.com/dashboard' },
                    { l: 'Vercel Dashboard', u: 'https://vercel.com' },
                    { l: 'Stripe Dashboard', u: 'https://dashboard.stripe.com' },
                  ].map((link, i) => (
                    <a key={i} href={link.u} target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-between py-3 px-4 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-colors text-gray-300 hover:text-white">
                      <span>{link.l}</span><ExternalLink className="w-4 h-4 text-gray-500" />
                    </a>
                  ))}
                </div>
              </div>
              <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
                <h3 className="font-bold text-white mb-4">Data Sources</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm text-cyan-400 mb-2">FAA Data</h4>
                    <div className="space-y-1 text-sm">
                      <a href="https://www.faa.gov/data_research/aviation_data_statistics/civil_airmen_statistics" className="block text-gray-400 hover:text-white">→ Civil Airmen Statistics</a>
                      <a href="https://www.faa.gov/data_research/aviation/aerospace_forecasts" className="block text-gray-400 hover:text-white">→ Aerospace Forecasts</a>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm text-cyan-400 mb-2">Competitors</h4>
                    <div className="space-y-1 text-sm">
                      <a href="https://foreflight.com" className="block text-gray-400 hover:text-white">→ ForeFlight</a>
                      <a href="https://logten.com" className="block text-gray-400 hover:text-white">→ LogTen Pro</a>
                      <a href="https://myflightbook.com" className="block text-gray-400 hover:text-white">→ MyFlightBook</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
              <h3 className="font-bold text-white mb-4">Key Documents</h3>
              <div className="grid md:grid-cols-3 gap-3">
                {[
                  { n: 'Pitch Deck', s: 'In Progress' },
                  { n: 'Financial Model', s: 'Next Up' },
                  { n: 'Technical Architecture', s: 'Done' },
                  { n: 'Competitive Analysis', s: 'Done' },
                  { n: 'User Personas', s: 'Next Up' },
                  { n: 'Go-to-Market Plan', s: 'In Progress' },
                ].map((doc, i) => (
                  <div key={i} className="flex items-center justify-between py-3 px-4 rounded-lg bg-gray-800/30">
                    <span className="text-gray-300">{doc.n}</span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      doc.s === 'Done' ? 'bg-green-500/20 text-green-400' :
                      doc.s === 'In Progress' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-blue-500/20 text-blue-400'}`}>{doc.s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-800 bg-gray-900/50 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-2"><Plane className="w-4 h-4" />aiViator Founder Hub • Private</div>
            <div className="flex gap-6">
              <span><span className="text-green-400">✓</span> Verified</span>
              <span><span className="text-yellow-400">⚠</span> Assumption</span>
              <span><span className="text-red-400">✗</span> Unknown</span>
            </div>
            <span>December 2025</span>
          </div>
        </div>
      </div>
    </div>
  );
}
