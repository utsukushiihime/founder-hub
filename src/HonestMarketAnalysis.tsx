import { useState } from 'react';

// HONEST MARKET ANALYSIS FOR AIVIATOR
// Clear separation: VERIFIED DATA vs ASSUMPTIONS

interface InputFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  suffix?: string;
  min?: number;
  max?: number;
  step?: number;
}

export default function HonestMarketAnalysis() {
  const [activeTab, setActiveTab] = useState('verified');
  const [assumptions, setAssumptions] = useState({
    currentUsers: 1000,
    conversionRate: 10,
    avgPrice: 75,
    monthlyGrowth: 15,
    churnRate: 5,
    schoolsPerQuarter: 5,
    studentsPerSchool: 100
  });

  // VERIFIED DATA - All sourced from FAA, news, competitor sites
  const verifiedData = {
    market: {
      totalPilots: 848770,
      certificatedPilots: 503275,
      cfis: 138127,
      certificatesIssued2023: 134057,
      studentCertsIssued2023: 69503,
      studentGrowthYoY: 24,
      source: 'FAA Civil Airmen Statistics, December 2024'
    },
    competitors: {
      logtenUsers: 120000,
      logtenBasicPrice: 79.99,
      logtenProPrice: 129.99,
      foreflightStartPrice: 99.99,
      foreflightExitValue: 10.55, // billions
      foreflightBuyer: 'Thoma Bravo',
      foreflightExitDate: 'November 2025',
      sources: [
        'Axis Intelligence (LogTen users)',
        'AirlineGeeks (LogTen pricing)',
        'ForeFlight.com (pricing)',
        'News sources (ForeFlight exit)'
      ]
    }
  };

  // Calculate projections based on assumptions
  const calculateProjections = () => {
    const months = 12;
    const projections = [];
    let users = assumptions.currentUsers;
    
    for (let i = 0; i <= months; i++) {
      const paidUsers = Math.round(users * (assumptions.conversionRate / 100));
      const mrr = paidUsers * (assumptions.avgPrice / 12);
      const arr = mrr * 12;
      
      projections.push({
        month: i,
        totalUsers: Math.round(users),
        paidUsers,
        mrr: Math.round(mrr),
        arr: Math.round(arr)
      });
      
      // Apply growth and churn for next month
      const newUsers = users * (assumptions.monthlyGrowth / 100);
      const churnedUsers = users * (assumptions.churnRate / 100);
      users = users + newUsers - churnedUsers;
    }
    return projections;
  };

  const projections = calculateProjections();
  const finalProjection = projections[projections.length - 1];

  const tabs = [
    { id: 'verified', label: 'Verified Data', icon: '✓' },
    { id: 'assumptions', label: 'Your Inputs', icon: '✏️' },
    { id: 'projections', label: 'Projections', icon: '📊' },
    { id: 'competitive', label: 'Competitive', icon: '⚔️' },
    { id: 'reality', label: 'Reality Check', icon: '⚠️' }
  ];

  const InputField = ({ label, value, onChange, suffix = '', min = 0, max = 100, step = 1 }: InputFieldProps) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="flex items-center gap-2">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="flex-1"
        />
        <span className="w-20 text-right font-mono text-sm">{value}{suffix}</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900">aiViator Market Analysis</h1>
          <p className="text-gray-600 mt-1">Honest separation of verified data vs. assumptions</p>
          <div className="mt-4 flex gap-2 flex-wrap">
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">✓ Green = Verified</span>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">⚠️ Yellow = Assumption</span>
            <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">✗ Red = Unknown</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          
          {/* VERIFIED DATA TAB */}
          {activeTab === 'verified' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm">✓</span>
                  US Pilot Market (FAA December 2024)
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { label: 'Total Pilots (incl. students)', value: verifiedData.market.totalPilots.toLocaleString() },
                    { label: 'Certificated Pilots', value: verifiedData.market.certificatedPilots.toLocaleString() },
                    { label: 'CFIs', value: verifiedData.market.cfis.toLocaleString() },
                    { label: 'Certificates Issued (2023)', value: verifiedData.market.certificatesIssued2023.toLocaleString() },
                    { label: 'Student Certs Issued (2023)', value: verifiedData.market.studentCertsIssued2023.toLocaleString() },
                    { label: 'Student Growth YoY', value: `+${verifiedData.market.studentGrowthYoY}%` }
                  ].map((item, i) => (
                    <div key={i} className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="text-2xl font-bold text-green-700">{item.value}</div>
                      <div className="text-sm text-green-600">{item.label}</div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">Source: {verifiedData.market.source}</p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm">✓</span>
                  Competitor Data (Verified)
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="font-bold text-green-800">LogTen Pro</h3>
                    <div className="mt-2 space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Users worldwide:</span>
                        <span className="font-mono">{verifiedData.competitors.logtenUsers.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Basic price:</span>
                        <span className="font-mono">${verifiedData.competitors.logtenBasicPrice}/yr</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Pro price:</span>
                        <span className="font-mono">${verifiedData.competitors.logtenProPrice}/yr</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="font-bold text-green-800">ForeFlight</h3>
                    <div className="mt-2 space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Exit value:</span>
                        <span className="font-mono">${verifiedData.competitors.foreflightExitValue}B</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Buyer:</span>
                        <span>{verifiedData.competitors.foreflightBuyer}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Starting price:</span>
                        <span className="font-mono">${verifiedData.competitors.foreflightStartPrice}/yr</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">Sources: {verifiedData.competitors.sources.join(', ')}</p>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="font-bold text-red-800 flex items-center gap-2">
                  <span>✗</span> Data We Don't Have (Unknown)
                </h3>
                <ul className="mt-2 text-sm text-red-700 space-y-1">
                  <li>• ForeFlight's total logbook users (only know total EFB users ~500K reported elsewhere)</li>
                  <li>• MyFlightBook's paying user count (free service)</li>
                  <li>• Actual market share percentages for any competitor</li>
                  <li>• Competitor churn rates or conversion rates</li>
                  <li>• Total addressable market for logbook-only products</li>
                </ul>
              </div>
            </div>
          )}

          {/* ASSUMPTIONS TAB */}
          {activeTab === 'assumptions' && (
            <div className="space-y-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <p className="text-yellow-800 font-medium">⚠️ These are YOUR inputs - adjust based on your actual data</p>
                <p className="text-yellow-700 text-sm mt-1">Any projection is only as good as these assumptions</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-bold text-gray-900">Current State</h3>
                  <InputField
                    label="Current Total Users"
                    value={assumptions.currentUsers}
                    onChange={(v) => setAssumptions({...assumptions, currentUsers: v})}
                    suffix=""
                    min={0}
                    max={10000}
                    step={100}
                  />
                  <InputField
                    label="Conversion Rate (free → paid)"
                    value={assumptions.conversionRate}
                    onChange={(v) => setAssumptions({...assumptions, conversionRate: v})}
                    suffix="%"
                    min={1}
                    max={50}
                  />
                  <InputField
                    label="Average Price per User"
                    value={assumptions.avgPrice}
                    onChange={(v) => setAssumptions({...assumptions, avgPrice: v})}
                    suffix="$/yr"
                    min={0}
                    max={200}
                    step={5}
                  />
                </div>
                <div className="space-y-4">
                  <h3 className="font-bold text-gray-900">Growth Assumptions</h3>
                  <InputField
                    label="Monthly User Growth Rate"
                    value={assumptions.monthlyGrowth}
                    onChange={(v) => setAssumptions({...assumptions, monthlyGrowth: v})}
                    suffix="%"
                    min={0}
                    max={50}
                  />
                  <InputField
                    label="Monthly Churn Rate"
                    value={assumptions.churnRate}
                    onChange={(v) => setAssumptions({...assumptions, churnRate: v})}
                    suffix="%"
                    min={0}
                    max={20}
                  />
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-bold text-gray-900 mb-4">B2B Assumptions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField
                    label="New Schools per Quarter"
                    value={assumptions.schoolsPerQuarter}
                    onChange={(v) => setAssumptions({...assumptions, schoolsPerQuarter: v})}
                    suffix=" schools"
                    min={0}
                    max={25}
                  />
                  <InputField
                    label="Average Students per School"
                    value={assumptions.studentsPerSchool}
                    onChange={(v) => setAssumptions({...assumptions, studentsPerSchool: v})}
                    suffix=" students"
                    min={10}
                    max={500}
                    step={10}
                  />
                </div>
              </div>

              <div className="bg-gray-100 rounded-lg p-4">
                <h4 className="font-medium text-gray-700">Current Assumptions Summary</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3 text-sm">
                  <div>
                    <div className="text-gray-500">Net Monthly Growth</div>
                    <div className="font-bold text-lg">{(assumptions.monthlyGrowth - assumptions.churnRate).toFixed(1)}%</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Current Paid Users</div>
                    <div className="font-bold text-lg">{Math.round(assumptions.currentUsers * assumptions.conversionRate / 100)}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Current MRR</div>
                    <div className="font-bold text-lg">${Math.round(assumptions.currentUsers * assumptions.conversionRate / 100 * assumptions.avgPrice / 12).toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">B2B Users/Year</div>
                    <div className="font-bold text-lg">{(assumptions.schoolsPerQuarter * 4 * assumptions.studentsPerSchool).toLocaleString()}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PROJECTIONS TAB */}
          {activeTab === 'projections' && (
            <div className="space-y-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800 font-medium">⚠️ These projections are based entirely on your assumptions</p>
                <p className="text-yellow-700 text-sm mt-1">They are NOT predictions - they show what happens IF your assumptions hold</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="text-sm text-blue-600">12-Month Users</div>
                  <div className="text-2xl font-bold text-blue-700">{finalProjection.totalUsers.toLocaleString()}</div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="text-sm text-blue-600">12-Month Paid</div>
                  <div className="text-2xl font-bold text-blue-700">{finalProjection.paidUsers.toLocaleString()}</div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="text-sm text-blue-600">12-Month MRR</div>
                  <div className="text-2xl font-bold text-blue-700">${finalProjection.mrr.toLocaleString()}</div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="text-sm text-blue-600">12-Month ARR</div>
                  <div className="text-2xl font-bold text-blue-700">${finalProjection.arr.toLocaleString()}</div>
                </div>
              </div>

              {/* Simple text-based projection table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Month</th>
                      <th className="text-right py-2">Total Users</th>
                      <th className="text-right py-2">Paid Users</th>
                      <th className="text-right py-2">MRR</th>
                      <th className="text-right py-2">ARR</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projections.filter((_, i) => i % 3 === 0 || i === projections.length - 1).map((p) => (
                      <tr key={p.month} className="border-b">
                        <td className="py-2">Month {p.month}</td>
                        <td className="text-right font-mono">{p.totalUsers.toLocaleString()}</td>
                        <td className="text-right font-mono">{p.paidUsers.toLocaleString()}</td>
                        <td className="text-right font-mono">${p.mrr.toLocaleString()}</td>
                        <td className="text-right font-mono">${p.arr.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-gray-100 rounded-lg p-4">
                <h4 className="font-medium text-gray-700 mb-2">Key Assumptions Driving This Projection:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Starting with {assumptions.currentUsers.toLocaleString()} users</li>
                  <li>• {assumptions.conversionRate}% convert to paid (${assumptions.avgPrice}/yr average)</li>
                  <li>• {assumptions.monthlyGrowth}% monthly growth, {assumptions.churnRate}% monthly churn</li>
                  <li>• Net monthly growth: {(assumptions.monthlyGrowth - assumptions.churnRate).toFixed(1)}%</li>
                </ul>
              </div>
            </div>
          )}

          {/* COMPETITIVE TAB */}
          {activeTab === 'competitive' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold">Pricing Comparison</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="text-left py-3 px-4">Product</th>
                      <th className="text-right py-3 px-4">Price/Year</th>
                      <th className="text-center py-3 px-4">Platform</th>
                      <th className="text-center py-3 px-4">Photo OCR</th>
                      <th className="text-center py-3 px-4">Data Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">ForeFlight (Basic+)</td>
                      <td className="text-right px-4 font-mono">$99.99+</td>
                      <td className="text-center px-4">iOS only</td>
                      <td className="text-center px-4">❌</td>
                      <td className="text-center px-4"><span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Verified</span></td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">LogTen Pro</td>
                      <td className="text-right px-4 font-mono">$129.99</td>
                      <td className="text-center px-4">Apple only</td>
                      <td className="text-center px-4">❌</td>
                      <td className="text-center px-4"><span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Verified</span></td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">MyFlightBook</td>
                      <td className="text-right px-4 font-mono">Free</td>
                      <td className="text-center px-4">All</td>
                      <td className="text-center px-4">❌</td>
                      <td className="text-center px-4"><span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Verified</span></td>
                    </tr>
                    <tr className="border-b bg-blue-50">
                      <td className="py-3 px-4 font-medium text-blue-700">aiViator (Pro)</td>
                      <td className="text-right px-4 font-mono text-blue-700">$?</td>
                      <td className="text-center px-4">All</td>
                      <td className="text-center px-4">✅</td>
                      <td className="text-center px-4"><span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs">You decide</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-bold text-green-800">✓ What We Know for Sure</h3>
                <ul className="mt-2 text-sm text-green-700 space-y-1">
                  <li>• LogTen has 120,000 users worldwide (verified)</li>
                  <li>• ForeFlight exited at $10.55B to PE (verified)</li>
                  <li>• No major competitor has AI photo OCR for logbooks</li>
                  <li>• ForeFlight and LogTen are iOS/Apple only</li>
                </ul>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="font-bold text-red-800">✗ What We Don't Know</h3>
                <ul className="mt-2 text-sm text-red-700 space-y-1">
                  <li>• ForeFlight's logbook-specific user count</li>
                  <li>• Actual market share percentages</li>
                  <li>• Whether pilots will pay for OCR as a feature</li>
                  <li>• Willingness to switch from existing solutions</li>
                  <li>• Whether ForeFlight's price will increase under PE ownership</li>
                </ul>
              </div>
            </div>
          )}

          {/* REALITY CHECK TAB */}
          {activeTab === 'reality' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold">Reality Check: Honest Assessment</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-bold text-green-800 mb-3">What's Real (Verified)</h3>
                  <ul className="text-sm text-green-700 space-y-2">
                    <li>✓ 848,770 US pilots need logbooks</li>
                    <li>✓ Student pilot growth +24% YoY</li>
                    <li>✓ ForeFlight sold for $10.55B (market validation)</li>
                    <li>✓ LogTen has 120K users at $80-130/yr</li>
                    <li>✓ No competitor has AI photo OCR</li>
                    <li>✓ ForeFlight/LogTen exclude Android users</li>
                  </ul>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="font-bold text-yellow-800 mb-3">Assumptions to Validate</h3>
                  <ul className="text-sm text-yellow-700 space-y-2">
                    <li>⚠️ Your current user count (need to verify)</li>
                    <li>⚠️ Conversion rates (measure actual)</li>
                    <li>⚠️ Growth rates (track over time)</li>
                    <li>⚠️ B2B school partnerships (count them)</li>
                    <li>⚠️ Price sensitivity testing needed</li>
                    <li>⚠️ Willingness to switch from ForeFlight</li>
                  </ul>
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="font-bold text-red-800 mb-3">Unknowns / Risks</h3>
                <ul className="text-sm text-red-700 space-y-2">
                  <li>✗ No verified data on total digital logbook market size</li>
                  <li>✗ Unknown: what % of pilots use digital vs paper</li>
                  <li>✗ Unknown: ForeFlight's future pricing strategy under PE</li>
                  <li>✗ Unknown: competitor response to new entrants</li>
                  <li>✗ Unknown: actual CAC for flight school partnerships</li>
                  <li>✗ Unknown: long-term retention rates in this market</li>
                </ul>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-bold text-blue-800 mb-3">What You Should Measure</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-medium text-blue-700">This Week:</h4>
                    <ul className="text-blue-600 mt-1 space-y-1">
                      <li>• Exact current user count</li>
                      <li>• Exact paid vs free breakdown</li>
                      <li>• Actual school partnership count</li>
                      <li>• Current MRR (real number)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-700">Next 30 Days:</h4>
                    <ul className="text-blue-600 mt-1 space-y-1">
                      <li>• Track daily signups</li>
                      <li>• Track conversions</li>
                      <li>• Track churn</li>
                      <li>• Survey: why users chose aiViator</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-bold text-gray-900 mb-3">Market Math (Honest Version)</h3>
                <div className="bg-gray-100 rounded-lg p-4 text-sm space-y-2">
                  <p><strong>Total potential market:</strong> 503,275 certificated pilots (FAA verified)</p>
                  <p><strong>If 20% use digital logbooks:</strong> ~100,000 potential users</p>
                  <p><strong>LogTen has:</strong> 120,000 users worldwide (includes non-US)</p>
                  <p><strong>At $100/yr average:</strong> $10M-12M total market (rough estimate)</p>
                  <p className="text-gray-500 italic mt-4">Note: These are rough estimates. We don't have verified data on digital logbook adoption rates.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-gray-500">
          <p>Analysis generated December 2025. Verified data cited with sources.</p>
          <p>Projections are models based on YOUR assumptions - not predictions.</p>
        </div>
      </div>
    </div>
  );
}
