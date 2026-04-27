"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { mockCandidates } from "@/lib/mockData"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  LineChart, Line, ResponsiveContainer, Legend
} from "recharts"

export default function AnalyticsPage() {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(true)

  // --- DATA LOGIC ---
  
  // Bar chart data — candidate scores
  const barData = mockCandidates.map(c => ({
    name: c.name.split(" ")[0],
    score: c.scores.total,
  }))

  // Radar chart data — average competency scores
  const radarData = [
    {
      subject: "Communication",
      value: Math.round(mockCandidates.reduce((sum, c) => sum + c.scores.communication, 0) / mockCandidates.length)
    },
    {
      subject: "Confidence",
      value: Math.round(mockCandidates.reduce((sum, c) => sum + c.scores.confidence, 0) / mockCandidates.length)
    },
    {
      subject: "Clarity",
      value: Math.round(mockCandidates.reduce((sum, c) => sum + c.scores.clarity, 0) / mockCandidates.length)
    },
    {
      subject: "Relevance",
      value: Math.round(mockCandidates.reduce((sum, c) => sum + c.scores.relevance, 0) / mockCandidates.length)
    },
  ]

  // Line chart data — interview activity
  const lineData = [
    { week: "Mon", interviews: 4 },
    { week: "Tue", interviews: 7 },
    { week: "Wed", interviews: 5 },
    { week: "Thu", interviews: 10 },
    { week: "Fri", interviews: 8 },
    { week: "Sat", interviews: 12 },
    { week: "Sun", interviews: 6 },
  ]

  const totalInterviews = 1284 // Hardcoded to match your design image
  const avgScore = 78.4
  const topRole = "Eng Lead"

  return (
    <div className="flex h-screen bg-[#F3F4F6] font-sans overflow-hidden">
      
      {/* Sidebar */}
      <aside className="w-48 min-w-[192px] h-screen bg-[#1a2b4a] text-white flex flex-col justify-between py-6 px-3 shrink-0">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-2 px-2">
            <img src="/logo.jpeg" alt="logo" width={32} height={32} className="rounded-lg shrink-0" />
            <div>
              <h1 className="text-sm font-bold leading-tight uppercase tracking-tight">Labdox AI</h1>
              <p className="text-[9px] text-blue-300 leading-tight">INTERVIEW INTELLIGENCE</p>
            </div>
          </div>

          <nav className="flex flex-col gap-1 text-sm">
            <div 
              onClick={() => router.push("/dashboard")} 
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 cursor-pointer transition-colors"
            >
              <span>📊</span> Dashboard
            </div>
            <div 
              onClick={() => router.push("/candidates")} 
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 cursor-pointer transition-colors"
            >
              <span>👥</span> Candidates
            </div>
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-blue-600 text-white cursor-pointer font-medium shadow-md shadow-blue-900/20">
              <span>📈</span> Analytics
            </div>
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 cursor-pointer transition-colors">
              <span>⚙️</span> Settings
            </div>
          </nav>
        </div>

        <div className="flex items-center gap-2 px-2 py-3 rounded-lg bg-white/5 border border-white/5">
          <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center text-sm font-bold shrink-0">A</div>
          <div className="min-w-0">
            <p className="text-sm font-medium truncate">Alex Thompson</p>
            <p className="text-[10px] text-gray-400 truncate uppercase tracking-wider">Admin Access</p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Header */}
        <header className="w-full h-16 bg-white border-b flex items-center justify-between px-8 shrink-0">
          <h2 className="text-xl font-bold text-gray-800">Analytics & Insights</h2>
          <div className="flex items-center gap-4">
            <select className="border border-gray-200 rounded-lg px-4 py-1.5 text-sm text-gray-600 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer">
              <option>Filter by Role: All Roles</option>
              <option>Frontend Developer</option>
              <option>Backend Developer</option>
            </select>
            <span className="text-gray-400 cursor-pointer hover:text-gray-600 text-xl">🔔</span>
            <span className="text-gray-400 cursor-pointer hover:text-gray-600 text-xl">❓</span>
          </div>
        </header>

        {/* Scrollable Dashboard Grid */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          
          {/* Top KPI Cards */}
          <section className="grid grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Interviews Conducted</p>
              <h3 className="text-3xl font-bold text-gray-800">1,284</h3>
              <p className="text-green-500 text-xs font-bold mt-2 flex items-center gap-1">↗ +12% <span className="text-gray-400 font-normal">vs last month</span></p>
              <div className="absolute top-4 right-4 w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-xl">📹</div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Average Candidate Score</p>
              <h3 className="text-3xl font-bold text-gray-800">78.4 <span className="text-lg text-gray-300">/100</span></h3>
              <p className="text-gray-400 text-xs mt-2">Stable baseline this quarter</p>
              <div className="absolute top-4 right-4 w-10 h-10 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center text-xl">⭐</div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Top Performing Role</p>
              <h3 className="text-3xl font-bold text-gray-800">Eng Lead</h3>
              <p className="text-gray-400 text-xs mt-2">Based on 86 interviews</p>
              <div className="absolute top-4 right-4 w-10 h-10 bg-yellow-50 text-yellow-600 rounded-xl flex items-center justify-center text-xl">🏆</div>
            </div>
          </section>

          {/* Middle Charts Row */}
          <section className="grid grid-cols-12 gap-6">
            {/* Bar Chart */}
            <div className="col-span-7 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h4 className="font-bold text-gray-700">Score Comparison</h4>
                <span className="text-gray-300 cursor-pointer hover:text-gray-500 italic font-serif">•••</span>
              </div>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={barData}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                  <Tooltip 
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} 
                  />
                  <Bar dataKey="score" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Radar Chart */}
            <div className="col-span-5 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col">
              <h4 className="font-bold text-gray-700 mb-2">Average Competency Scores</h4>
              <div className="flex-1 min-h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData} outerRadius="70%">
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#64748b', fontWeight: 600 }} />
                    <Radar 
                      dataKey="value" 
                      stroke="#3b82f6" 
                      fill="#3b82f6" 
                      fillOpacity={0.5} 
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-2">
                <div className="bg-blue-50 p-2.5 rounded-xl border border-blue-100">
                  <p className="text-[9px] text-blue-500 font-bold uppercase">Highest</p>
                  <p className="text-xs font-bold text-blue-800">Confidence (92%)</p>
                </div>
                <div className="bg-orange-50 p-2.5 rounded-xl border border-orange-100">
                  <p className="text-[9px] text-orange-500 font-bold uppercase">Improvement</p>
                  <p className="text-xs font-bold text-orange-800">Clarity (64%)</p>
                </div>
              </div>
            </div>
          </section>

          {/* Bottom Grid: Line Chart + Efficiency + AI */}
          <section className="grid grid-cols-12 gap-6 pb-8">
            {/* Line Chart */}
            <div className="col-span-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h4 className="font-bold text-gray-700">Interview Activity Over Time</h4>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider mt-1">Weekly volume of assessments</p>
                </div>
                <div className="flex bg-gray-100 p-1 rounded-lg text-[10px] font-bold">
                  <button className="px-4 py-1.5 bg-white text-blue-600 rounded-md shadow-sm">Weekly</button>
                  <button className="px-4 py-1.5 text-gray-400 hover:text-gray-600">Monthly</button>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={lineData}>
                  <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="interviews" 
                    stroke="#3b82f6" 
                    strokeWidth={4} 
                    dot={{ r: 0 }} 
                    activeDot={{ r: 6, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Efficiency Card & Predictive Insight */}
            <div className="col-span-4 flex flex-col gap-6">
              {/* Hiring Efficiency */}
              <div className="flex-1 bg-[#0F172A] rounded-2xl p-6 shadow-lg shadow-slate-200 flex flex-col justify-between text-white">
                <div>
                  <p className="text-blue-400 text-[10px] font-bold uppercase tracking-widest">Hiring Efficiency</p>
                  <h4 className="text-4xl font-bold mt-2">2.4 <span className="text-sm font-normal text-slate-400 italic">days</span></h4>
                  <p className="text-slate-400 text-[10px] mt-2">Avg time-to-insight per candidate</p>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mt-4">
                  <div className="w-3/4 h-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
                </div>
              </div>

              {/* AI Predictive Insight */}
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 shadow-lg border border-blue-400/30 text-white relative overflow-hidden group">
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">✨</span>
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">AI Predictive Insight</p>
                  </div>
                  <p className="text-xs leading-relaxed opacity-90">
                    Scores are expected to <span className="font-bold underline decoration-blue-300">rise by 15%</span> next month based on new screening criteria.
                  </p>
                </div>
                {/* Decorative background circle */}
                <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all duration-500"></div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Floating Widgets */}
      <div className="fixed bottom-6 right-6 flex flex-col items-end gap-3 z-50">
        <div className={`flex flex-col gap-3 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] origin-bottom ${
          isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-10 pointer-events-none'
        }`}>
          <div 
          onClick={() => router.push("/interview")}
          className="w-20 h-20 bg-[#0F172A] rounded-2xl border-2 border-blue-500/50 flex flex-col items-center justify-center gap-1 shadow-2xl backdrop-blur-md">
            <div className="text-2xl animate-bounce-slow">🤖</div>
            <p className="text-white text-[8px] font-bold uppercase tracking-tighter opacity-70">AI INTERVIEWER</p>
          </div>

          <div className="w-20 h-20 bg-[#0F172A] rounded-2xl border-2 border-blue-500/50 flex flex-col items-center justify-center gap-1 shadow-2xl relative overflow-hidden backdrop-blur-md">
            <div className="absolute top-2 left-2 flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
              <span className="text-red-400 text-[8px] font-black">REC</span>
            </div>
            <div className="text-2xl">👤</div>
            <p className="text-white text-[8px] font-bold uppercase tracking-tighter opacity-70">YOU</p>
          </div>
        </div>

        <button 
          onClick={() => setIsVisible(!isVisible)}
          className="w-12 h-12 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl flex items-center justify-center shadow-xl transition-all active:scale-95 border border-blue-400 group"
        >
          {isVisible ? (
            <span className="text-xl group-hover:rotate-90 transition-transform">✕</span> 
          ) : (
            <span className="text-xl group-hover:scale-110 transition-transform">📹</span>
          )}
        </button>
      </div>
    </div>
  )
}