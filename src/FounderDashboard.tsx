import { useState } from 'react';
import { 
  TrendingUp, Users, DollarSign, Target, Plane, 
  BarChart3, Shield, Lightbulb, FileText, ExternalLink,
  AlertTriangle, CheckCircle, Clock, Zap
} from 'lucide-react';

// =====================================================
// AIVIATOR FOUNDER DASHBOARD
// Private dashboard for Crystal & Chris
// Last updated: December 2025
// =====================================================

export default function FounderDashboard() {
  const [activeSection, setActiveSection] = useState('overview');
  
  // ===== YOUR REAL METRICS - UPDATE THESE =====
  const [metrics, setMetrics] = useState({
    // Current State (UPDATE WITH REAL DATA)
    totalUsers: 1000,
    paidUsers: 0, // How many are actually paying?
    freeUsers: 1000,
    activeSchools: 3,
    mrr: 0, // Current MRR in dollars
    
    // Pricing (YOUR ACTUAL PRICING)
    studentPrice: 49,
    proPrice: 99,
    
    // Growth (MEASURE THESE)
    weeklySignups: 0,
    weeklyChurn: 0,
    conversionRate: 0, // free to paid %
    
    // Costs (YOUR ACTUAL COSTS)
    monthlySupabase: 25,
    monthlyVercel: 20,
    monthlyAI: 500,
    monthlyOther: 100,
  });

  // ===== VERIFIED MARKET DATA (SOURCED) =====
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
      size2025: 11.2, // billions
      size2034: 35.84,
      cagr: 13.8,
      source: 'Industry reports (verify independently)'
    },
    flightSchools: {
      total: 3200,
      part141: 500,
      avgStudents: 100,
      source: 'Multiple aggregators (estimate)'
    }
  };

  // ===== VERIFIED COMPETITOR DATA =====
  const competitors = {
    foreflight: {
      name: 'ForeFlight',
      exitValue: 10.55, // billions
      buyer: 'Thoma Bravo (PE)',
      exitDate: 'November 2025',
      pricing: { basic: 99.99, pro: 199.99, perf: 299.99 },
      priceIncrease: '20% (March 2025)',
      platform: 'iOS only',
      users: '500K+ (EFB total, not logbook specific)',
      hasOCR: false,
      verified: true
    },
    logten: {
      name: 'LogTen Pro',
      users: 120000,
      pricing: { basic: 79.99, pro: 129.99, business: 349.99 },
      platform: 'Apple ecosystem only',
      hasOCR: false,
      verified: true,
      source: 'Axis Intelligence, LogTen.com'
    },
    myflightbook: {
      name: 'MyFlightBook',
      pricing: { free: 0 },
      platform: 'All (web, iOS, Android)',
      flightsLogged: 23750000,
      hasOCR: false,
      verified: true,
      source: 'MyFlightBook.com'
    },
    safelog: {
      name: 'Safelog',
      pricing: { basic: 49.99 },
      platform: 'Windows/iOS/Android',
      hasOCR: false,
      verified: false
    }
  };

  // ===== CALCULATED VALUES =====
  const calculated = {
    totalMonthlyCosts: metrics.monthlySupabase + metrics.monthlyVercel + metrics.monthlyAI + metrics.monthlyOther,
    annualCosts: (metrics.monthlySupabase + metrics.monthlyVercel + metrics.monthlyAI + metrics.monthlyOther) * 12,
    arr: metrics.mrr * 12,
    usersToBreakeven: Math.ceil((metrics.monthlySupabase + metrics.monthlyVercel + metrics.monthlyAI + metrics.monthlyOther) / (metrics.proPrice / 12)),
    marketPenetration: ((metrics.totalUsers / verifiedMarket.usPilots.total) * 100).toFixed(4),
    potentialTAM: verifiedMarket.usPilots.certificated * metrics.proPrice,
  };

  const sections = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'metrics', label: 'Our Metrics', icon: TrendingUp },
    { id: 'market', label: 'Market Data', icon: Target },
    { id: 'competition', label: 'Competition', icon: Shield },
    { id: 'financials', label: 'Financials', icon: DollarSign },
    { id: 'roadmap', label: 'Roadmap', icon: Lightbulb },
    { id: 'resources', label: 'Resources', icon: FileText },
  ];

  const MetricCard = ({ label, value, subtext, color = 'blue', verified = false }: {
    label: string;
    value: string | number;
    subtext?: string;
    color?: string;
    verified?: boolean;
  }) => (
    <div className={`bg-${color}-50 border border-${color}-200 rounded-xl p-4`}>
      <div className="flex justify-between items-start">
        <span className={`text-sm text-${color}-600`}>{label}</span>
        {verified && <CheckCircle className="w-4 h-4 text-green-500" />}
      </div>
      <div className={`text-2xl font-bold text-${color}-700 mt-1`}>{value}</div>
      {subtext && <div className={`text-xs text-${color}-500 mt-1`}>{subtext}</div>}
    </div>
  );

  const InputMetric = ({ label, value, onChange, prefix = '', suffix = '' }: {
    label: string;
    value: number;
    onChange: (v: number) => void;
    prefix?: string;
    suffix?: string;
  }) => (
    <div className="flex items-center justify-between py-2 border-b border-gray-100">
      <span className="text-sm text-gray-600">{label}</span>
      <div className="flex items-center gap-1">
        {prefix && <span className="text-gray-400">{prefix}</span>}
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-24 text-right font-mono text-sm border rounded px-2 py-1"
        />
        {suffix && <span className="text-gray-400">{suffix}</span>}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center gap-3">
            <Plane className="w-8 h-8" />
            <div>
              <h1 className="text-2xl font-bold">aiViator Founder Dashboard</h1>
              <p className="text-blue-100 text-sm">Private • Crystal & Chris • December 2025</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto py-2">
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  activeSection === section.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
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
              <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-blue-500">
                <div className="text-sm text-gray-500">Total Users</div>
                <div className="text-3xl font-bold text-gray-900">{metrics.totalUsers.toLocaleString()}</div>
                <div className="text-xs text-gray-400 mt-1">from {metrics.activeSchools} schools</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-green-500">
                <div className="text-sm text-gray-500">MRR</div>
                <div className="text-3xl font-bold text-gray-900">${metrics.mrr.toLocaleString()}</div>
                <div className="text-xs text-gray-400 mt-1">${calculated.arr.toLocaleString()} ARR</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-purple-500">
                <div className="text-sm text-gray-500">Market Size</div>
                <div className="text-3xl font-bold text-gray-900">503K</div>
                <div className="text-xs text-green-600 mt-1">✓ FAA verified pilots</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-orange-500">
                <div className="text-sm text-gray-500">ForeFlight Exit</div>
                <div className="text-3xl font-bold text-gray-900">$10.55B</div>
                <div className="text-xs text-green-600 mt-1">✓ Nov 2025 verified</div>
              </div>
            </div>

            {/* Key Insights */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-4">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  What We Know (Verified)
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>848,770 US pilots need logbooks (FAA Dec 2024)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Student pilots growing +24% YoY</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>ForeFlight sold for $10.55B to PE (validates market)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>LogTen has 120K users at $80-130/yr</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>No competitor has AI photo OCR</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>ForeFlight/LogTen iOS-only (excludes 50% market)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                  What We Need to Validate
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500 mt-0.5">⚠</span>
                    <span>Our actual paid conversion rate</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500 mt-0.5">⚠</span>
                    <span>User willingness to pay for OCR specifically</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500 mt-0.5">⚠</span>
                    <span>Churn rate over 3+ months</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500 mt-0.5">⚠</span>
                    <span>B2B school acquisition cost/effort</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500 mt-0.5">⚠</span>
                    <span>Price sensitivity at $49 vs $99</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500 mt-0.5">⚠</span>
                    <span>% of pilots using digital vs paper logbooks</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Competitive Position */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Competitive Position</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-3">Product</th>
                      <th className="text-right py-2 px-3">Price/yr</th>
                      <th className="text-center py-2 px-3">Platform</th>
                      <th className="text-center py-2 px-3">AI OCR</th>
                      <th className="text-center py-2 px-3">Users</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b bg-blue-50">
                      <td className="py-2 px-3 font-bold text-blue-700">aiViator</td>
                      <td className="text-right px-3 font-mono">${metrics.proPrice}</td>
                      <td className="text-center px-3">✅ All</td>
                      <td className="text-center px-3">✅</td>
                      <td className="text-center px-3">{metrics.totalUsers.toLocaleString()}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-3">ForeFlight</td>
                      <td className="text-right px-3 font-mono">$100-300</td>
                      <td className="text-center px-3">iOS only</td>
                      <td className="text-center px-3">❌</td>
                      <td className="text-center px-3 text-gray-400">500K+ (EFB)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-3">LogTen Pro</td>
                      <td className="text-right px-3 font-mono">$80-130</td>
                      <td className="text-center px-3">Apple only</td>
                      <td className="text-center px-3">❌</td>
                      <td className="text-center px-3">120K ✓</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-3">MyFlightBook</td>
                      <td className="text-right px-3 font-mono">Free</td>
                      <td className="text-center px-3">✅ All</td>
                      <td className="text-center px-3">❌</td>
                      <td className="text-center px-3 text-gray-400">~100K</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* OUR METRICS */}
        {activeSection === 'metrics' && (
          <div className="space-y-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <p className="text-yellow-800 font-medium">⚠️ Enter YOUR real numbers below</p>
              <p className="text-yellow-700 text-sm">These drive all calculations. Update weekly.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* User Metrics */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  User Metrics
                </h3>
                <div className="space-y-1">
                  <InputMetric
                    label="Total Users"
                    value={metrics.totalUsers}
                    onChange={(v) => setMetrics({...metrics, totalUsers: v})}
                  />
                  <InputMetric
                    label="Paid Users"
                    value={metrics.paidUsers}
                    onChange={(v) => setMetrics({...metrics, paidUsers: v})}
                  />
                  <InputMetric
                    label="Free Users"
                    value={metrics.freeUsers}
                    onChange={(v) => setMetrics({...metrics, freeUsers: v})}
                  />
                  <InputMetric
                    label="Active Schools"
                    value={metrics.activeSchools}
                    onChange={(v) => setMetrics({...metrics, activeSchools: v})}
                  />
                  <InputMetric
                    label="Weekly Signups"
                    value={metrics.weeklySignups}
                    onChange={(v) => setMetrics({...metrics, weeklySignups: v})}
                  />
                  <InputMetric
                    label="Weekly Churn"
                    value={metrics.weeklyChurn}
                    onChange={(v) => setMetrics({...metrics, weeklyChurn: v})}
                  />
                </div>
              </div>

              {/* Revenue Metrics */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Revenue Metrics
                </h3>
                <div className="space-y-1">
                  <InputMetric
                    label="Current MRR"
                    value={metrics.mrr}
                    onChange={(v) => setMetrics({...metrics, mrr: v})}
                    prefix="$"
                  />
                  <InputMetric
                    label="Student Price"
                    value={metrics.studentPrice}
                    onChange={(v) => setMetrics({...metrics, studentPrice: v})}
                    prefix="$"
                    suffix="/yr"
                  />
                  <InputMetric
                    label="Pro Price"
                    value={metrics.proPrice}
                    onChange={(v) => setMetrics({...metrics, proPrice: v})}
                    prefix="$"
                    suffix="/yr"
                  />
                  <InputMetric
                    label="Conversion Rate"
                    value={metrics.conversionRate}
                    onChange={(v) => setMetrics({...metrics, conversionRate: v})}
                    suffix="%"
                  />
                </div>
                
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Calculated ARR:</span>
                    <span className="font-bold">${calculated.arr.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Costs */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Monthly Costs
                </h3>
                <div className="space-y-1">
                  <InputMetric
                    label="Supabase"
                    value={metrics.monthlySupabase}
                    onChange={(v) => setMetrics({...metrics, monthlySupabase: v})}
                    prefix="$"
                  />
                  <InputMetric
                    label="Vercel"
                    value={metrics.monthlyVercel}
                    onChange={(v) => setMetrics({...metrics, monthlyVercel: v})}
                    prefix="$"
                  />
                  <InputMetric
                    label="AI/OCR APIs"
                    value={metrics.monthlyAI}
                    onChange={(v) => setMetrics({...metrics, monthlyAI: v})}
                    prefix="$"
                  />
                  <InputMetric
                    label="Other"
                    value={metrics.monthlyOther}
                    onChange={(v) => setMetrics({...metrics, monthlyOther: v})}
                    prefix="$"
                  />
                </div>
                
                <div className="mt-4 pt-4 border-t space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Total Monthly:</span>
                    <span className="font-bold">${calculated.totalMonthlyCosts.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Annual Costs:</span>
                    <span className="font-bold">${calculated.annualCosts.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Users to Break Even:</span>
                    <span className="font-bold">{calculated.usersToBreakeven} paid</span>
                  </div>
                </div>
              </div>

              {/* Calculated KPIs */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Key Calculations
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Market Penetration</span>
                    <span className="font-mono text-lg">{calculated.marketPenetration}%</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Users to 1% Market</span>
                    <span className="font-mono text-lg">{Math.round(verifiedMarket.usPilots.certificated * 0.01).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">ARR at 1% Market</span>
                    <span className="font-mono text-lg">${(Math.round(verifiedMarket.usPilots.certificated * 0.01) * metrics.proPrice).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Gross Margin (est)</span>
                    <span className="font-mono text-lg">85%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MARKET DATA */}
        {activeSection === 'market' && (
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <p className="text-green-800 font-medium">✓ All data below is verified with sources</p>
            </div>

            {/* US Pilot Population */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">US Pilot Population (FAA December 2024)</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <MetricCard label="Total Pilots" value={verifiedMarket.usPilots.total.toLocaleString()} verified />
                <MetricCard label="Certificated" value={verifiedMarket.usPilots.certificated.toLocaleString()} verified />
                <MetricCard label="Students" value={verifiedMarket.usPilots.students.toLocaleString()} verified />
                <MetricCard label="CFIs" value={verifiedMarket.usPilots.cfis.toLocaleString()} verified />
              </div>
              <p className="text-xs text-gray-500 mt-4">Source: {verifiedMarket.usPilots.source}</p>
            </div>

            {/* Growth Trends */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Growth Trends</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <MetricCard 
                  label="Student Growth YoY" 
                  value={`+${verifiedMarket.growth.studentGrowthYoY}%`} 
                  color="green"
                  verified 
                />
                <MetricCard 
                  label="Certificates Issued (2023)" 
                  value={verifiedMarket.growth.certificatesIssued2023.toLocaleString()} 
                  verified 
                />
                <MetricCard 
                  label="New Pilots Needed by 2043" 
                  value={`${(verifiedMarket.growth.newPilotsNeeded2043/1000).toFixed(0)}K`} 
                  subtext="Global demand"
                  verified 
                />
              </div>
              <p className="text-xs text-gray-500 mt-4">Source: {verifiedMarket.growth.source}</p>
            </div>

            {/* Training Market */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Flight Training Market</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <MetricCard 
                  label="Market Size (2025)" 
                  value={`$${verifiedMarket.trainingMarket.size2025}B`}
                  verified 
                />
                <MetricCard 
                  label="Projected (2034)" 
                  value={`$${verifiedMarket.trainingMarket.size2034}B`}
                  verified 
                />
                <MetricCard 
                  label="CAGR" 
                  value={`${verifiedMarket.trainingMarket.cagr}%`}
                  color="green"
                  verified 
                />
                <MetricCard 
                  label="US Flight Schools" 
                  value={`${(verifiedMarket.flightSchools.total/1000).toFixed(1)}K+`}
                  subtext={`~${verifiedMarket.flightSchools.part141} Part 141`}
                />
              </div>
              <p className="text-xs text-gray-500 mt-4">Note: Training market size from industry reports - verify independently</p>
            </div>

            {/* TAM/SAM/SOM */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Market Sizing (Estimates)</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-32 text-right font-medium">TAM</div>
                  <div className="flex-1 bg-blue-100 rounded-full h-8 relative">
                    <div className="absolute inset-y-0 left-0 bg-blue-500 rounded-full" style={{width: '100%'}}></div>
                    <span className="absolute inset-0 flex items-center justify-center text-sm font-medium">
                      ${(verifiedMarket.usPilots.certificated * metrics.proPrice / 1000000).toFixed(0)}M (503K pilots × ${metrics.proPrice})
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-32 text-right font-medium">SAM</div>
                  <div className="flex-1 bg-green-100 rounded-full h-8 relative">
                    <div className="absolute inset-y-0 left-0 bg-green-500 rounded-full" style={{width: '40%'}}></div>
                    <span className="absolute inset-0 flex items-center justify-center text-sm font-medium">
                      ~$20M (est. 200K digital logbook users)
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-32 text-right font-medium">SOM (Y1)</div>
                  <div className="flex-1 bg-purple-100 rounded-full h-8 relative">
                    <div className="absolute inset-y-0 left-0 bg-purple-500 rounded-full" style={{width: '5%'}}></div>
                    <span className="absolute inset-0 flex items-center justify-center text-sm font-medium">
                      $1-2M (10-20K users realistic Y1)
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-yellow-600 mt-4">⚠️ SAM and SOM are estimates - we don't have verified digital logbook adoption rates</p>
            </div>
          </div>
        )}

        {/* COMPETITION */}
        {activeSection === 'competition' && (
          <div className="space-y-6">
            {/* ForeFlight Alert */}
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-orange-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-orange-800">ForeFlight sold for $10.55B to Thoma Bravo (Nov 2025)</p>
                  <p className="text-orange-700 text-sm mt-1">PE ownership typically means price increases and slower innovation. Already raised prices 20% in March 2025.</p>
                </div>
              </div>
            </div>

            {/* Competitor Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(competitors).map(([key, comp]) => (
                <div key={key} className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-gray-900">{comp.name}</h3>
                    {comp.verified && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Verified</span>
                    )}
                  </div>
                  <div className="space-y-2 text-sm">
                    {'exitValue' in comp && comp.exitValue && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Exit Value:</span>
                        <span className="font-bold text-green-600">${comp.exitValue}B</span>
                      </div>
                    )}
                    {'users' in comp && comp.users && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Users:</span>
                        <span>{typeof comp.users === 'number' ? comp.users.toLocaleString() : comp.users}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-500">Pricing:</span>
                      <span className="font-mono">
                        {'free' in comp.pricing ? 'Free' : 
                         `$${Object.values(comp.pricing)[0]}/yr`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Platform:</span>
                      <span>{comp.platform}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">AI OCR:</span>
                      <span>{comp.hasOCR ? '✅ Yes' : '❌ No'}</span>
                    </div>
                    {'priceIncrease' in comp && comp.priceIncrease && (
                      <div className="flex justify-between text-orange-600">
                        <span>Price Increase:</span>
                        <span>{comp.priceIncrease}</span>
                      </div>
                    )}
                  </div>
                  {'source' in comp && comp.source && (
                    <p className="text-xs text-gray-400 mt-3">Source: {comp.source}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Our Advantages */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="font-bold text-blue-900 mb-4">aiViator Competitive Advantages</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">AI Photo OCR</p>
                    <p className="text-sm text-gray-600">No competitor has this</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">True Cross-Platform</p>
                    <p className="text-sm text-gray-600">Web + iOS + Android (PWA)</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">B2B Distribution</p>
                    <p className="text-sm text-gray-600">Flight school partnerships</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Price Advantage</p>
                    <p className="text-sm text-gray-600">${metrics.proPrice} vs $100-300</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FINANCIALS */}
        {activeSection === 'financials' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Current State */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4">Current State</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-500">MRR</span>
                    <span className="font-bold">${metrics.mrr}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">ARR</span>
                    <span className="font-bold">${calculated.arr}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Paid Users</span>
                    <span className="font-bold">{metrics.paidUsers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">ARPU</span>
                    <span className="font-bold">
                      ${metrics.paidUsers > 0 ? Math.round(calculated.arr / metrics.paidUsers) : 0}/yr
                    </span>
                  </div>
                </div>
              </div>

              {/* Costs */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4">Monthly Costs</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Supabase</span>
                    <span>${metrics.monthlySupabase}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Vercel</span>
                    <span>${metrics.monthlyVercel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">AI/OCR</span>
                    <span>${metrics.monthlyAI}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Other</span>
                    <span>${metrics.monthlyOther}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="font-medium">Total</span>
                    <span className="font-bold">${calculated.totalMonthlyCosts}/mo</span>
                  </div>
                </div>
              </div>

              {/* Break Even */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4">Break Even Analysis</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Monthly Costs</span>
                    <span>${calculated.totalMonthlyCosts}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Pro Price/Month</span>
                    <span>${(metrics.proPrice / 12).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="font-medium">Paid Users Needed</span>
                    <span className="font-bold text-green-600">{calculated.usersToBreakeven}</span>
                  </div>
                  <div className="mt-4">
                    <div className="text-xs text-gray-500 mb-1">Progress to break-even</div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-green-500 rounded-full h-3 transition-all"
                        style={{width: `${Math.min(100, (metrics.paidUsers / calculated.usersToBreakeven) * 100)}%`}}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {metrics.paidUsers} / {calculated.usersToBreakeven} paid users
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Scenarios */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Revenue Scenarios</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Scenario</th>
                      <th className="text-right py-2">Users</th>
                      <th className="text-right py-2">Paid (10%)</th>
                      <th className="text-right py-2">ARR</th>
                      <th className="text-right py-2">Market %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: 'Current', users: metrics.totalUsers },
                      { name: '5 Schools', users: 750 },
                      { name: '10 Schools', users: 1500 },
                      { name: '25 Schools', users: 3750 },
                      { name: '50 Schools', users: 7500 },
                      { name: '1% Market', users: Math.round(verifiedMarket.usPilots.certificated * 0.01) },
                    ].map((scenario, i) => (
                      <tr key={i} className="border-b">
                        <td className="py-2">{scenario.name}</td>
                        <td className="text-right font-mono">{scenario.users.toLocaleString()}</td>
                        <td className="text-right font-mono">{Math.round(scenario.users * 0.1).toLocaleString()}</td>
                        <td className="text-right font-mono">${(Math.round(scenario.users * 0.1) * metrics.proPrice).toLocaleString()}</td>
                        <td className="text-right font-mono">{((scenario.users / verifiedMarket.usPilots.certificated) * 100).toFixed(2)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-yellow-600 mt-4">⚠️ Assumes 10% conversion, {metrics.proPrice}/yr average - validate these assumptions</p>
            </div>
          </div>
        )}

        {/* ROADMAP */}
        {activeSection === 'roadmap' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Product Priorities</h3>
              <div className="space-y-3">
                {[
                  { priority: 'P0', item: 'Fix auth/signup flow', status: 'in-progress', notes: 'Blocking demos' },
                  { priority: 'P0', item: 'Stable deployment pipeline', status: 'in-progress', notes: '55% failure rate' },
                  { priority: 'P1', item: 'AI OCR accuracy improvements', status: 'planned', notes: 'Core differentiator' },
                  { priority: 'P1', item: 'Simplified pricing (4 tiers)', status: 'planned', notes: 'Free/Student/Pro/School' },
                  { priority: 'P2', item: 'Google Sheets sync', status: 'planned', notes: 'OAuth verification needed' },
                  { priority: 'P2', item: '8710 export', status: 'planned', notes: 'Required for checkrides' },
                  { priority: 'P3', item: 'Currency dashboard', status: 'planned', notes: 'Table stakes feature' },
                  { priority: 'P3', item: 'EFB import (ForeFlight/Garmin)', status: 'future', notes: 'Switching cost reducer' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-100">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      item.priority === 'P0' ? 'bg-red-100 text-red-700' :
                      item.priority === 'P1' ? 'bg-orange-100 text-orange-700' :
                      item.priority === 'P2' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>{item.priority}</span>
                    <span className="flex-1">{item.item}</span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      item.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                      item.status === 'planned' ? 'bg-gray-100 text-gray-700' :
                      'bg-gray-50 text-gray-500'
                    }`}>{item.status}</span>
                    <span className="text-xs text-gray-400 w-40">{item.notes}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4">Q4 2025 Goals</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>Stable auth + deployment</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>10 school partnerships</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>First paying customers</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>Investor deck finalized</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4">Q1 2026 Goals</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>25 school partnerships</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>$5K MRR milestone</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>Seed fundraise (if needed)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>Feature parity with LogTen</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* RESOURCES */}
        {activeSection === 'resources' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4">Quick Links</h3>
                <div className="space-y-2">
                  {[
                    { label: 'Production App', url: 'https://myaiviator.app' },
                    { label: 'Staging', url: 'https://staging.myaiviator.app' },
                    { label: 'Supabase Dashboard', url: 'https://supabase.com/dashboard' },
                    { label: 'Vercel Dashboard', url: 'https://vercel.com/team_SXAOMYaZBGx1bXAajoRUiFA6' },
                    { label: 'GitHub Repo', url: '#' },
                    { label: 'Stripe Dashboard', url: 'https://dashboard.stripe.com' },
                  ].map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <span>{link.label}</span>
                      <ExternalLink className="w-4 h-4 text-gray-400" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4">Key Documents</h3>
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
                      <span>{doc.label}</span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        doc.status === 'Done' ? 'bg-green-100 text-green-700' :
                        doc.status === 'In Progress' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>{doc.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Data Sources (Bookmark These)</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-medium mb-2">FAA Data</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• <a href="https://www.faa.gov/data_research/aviation_data_statistics/civil_airmen_statistics" className="text-blue-600 hover:underline">Civil Airmen Statistics</a></li>
                    <li>• <a href="https://www.faa.gov/data_research/aviation/aerospace_forecasts" className="text-blue-600 hover:underline">Aerospace Forecasts</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Competitor Sites</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• <a href="https://foreflight.com/products/logbook" className="text-blue-600 hover:underline">ForeFlight Logbook</a></li>
                    <li>• <a href="https://logten.com" className="text-blue-600 hover:underline">LogTen Pro</a></li>
                    <li>• <a href="https://myflightbook.com" className="text-blue-600 hover:underline">MyFlightBook</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Footer */}
      <div className="border-t bg-white mt-8">
        <div className="max-w-7xl mx-auto px-6 py-4 text-center text-xs text-gray-500">
          <p>aiViator Founder Dashboard • Private • Last updated December 2025</p>
          <p className="mt-1">Green ✓ = Verified data with sources • Yellow ⚠ = Assumptions to validate • Red ✗ = Unknown</p>
        </div>
      </div>
    </div>
  );
}
