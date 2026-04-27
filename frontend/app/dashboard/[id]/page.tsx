"use client"
import { useParams, useRouter } from "next/navigation"
import { mockCandidates } from "@/lib/mockData"
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, 
ResponsiveContainer } from "recharts"
import { useState } from "react"

export default function CandidateDetailPage() {
  const params = useParams()
  const router = useRouter()
  const candidate = mockCandidates.find(c => c.id === params.id)

  if (!candidate) return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-gray-500">Candidate not found</p>
    </div>
  )

  const radarData = [
    { subject: "Communication", value: candidate.scores.communication },
    { subject: "Confidence", value: candidate.scores.confidence },
    { subject: "Clarity", value: candidate.scores.clarity },
    { subject: "Relevance", value: candidate.scores.relevance },
  ]
  const [isVisible, setIsVisible]=useState(true);
  return (
    <div className="flex h-screen bg-[#F3F4F6] overflow-hidden">

      {/* Sidebar */}
      <div className="w-48 min-w-[192px] h-screen bg-[#1a2b4a] text-white
      flex flex-col justify-between py-6 px-3 shrink-0">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-2 px-2">
            <img src="/logo.jpeg" alt="logo" width={36} height={36}
            className="rounded-lg shrink-0" />
            <div>
              <h1 className="text-sm font-bold leading-tight">Labdox</h1>
              <p className="text-[10px] text-blue-300 leading-tight">
                AI INTERVIEW PLATFORM
              </p>
            </div>
          </div>
          <nav className="flex flex-col gap-1 text-sm">
            <p className="flex items-center gap-2 px-3 py-2.5 rounded-lg
            text-gray-400 hover:text-white hover:bg-white/10 cursor-pointer">
              <span>📊</span> Dashboard
            </p>
            <p className="flex items-center gap-2 px-3 py-2.5 rounded-lg
            bg-blue-600 text-white cursor-pointer font-medium">
              <span>👥</span> Candidates
            </p>
            <p className="flex items-center gap-2 px-3 py-2.5 rounded-lg
            text-gray-400 hover:text-white hover:bg-white/10 cursor-pointer"
            onClick={() => router.push("/analytics")}>
              <span>📈</span> Analytics
            </p>
            <p className="flex items-center gap-2 px-3 py-2.5 rounded-lg
            text-gray-400 hover:text-white hover:bg-white/10 cursor-pointer">
              <span>⚙️</span> Settings
            </p>
          </nav>
        </div>
        <div className="flex items-center gap-2 px-2 py-3 rounded-lg
        bg-white/10">
          <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center
          justify-center text-sm font-bold shrink-0">A</div>
          <div className="min-w-0">
            <p className="text-sm font-medium truncate">Alex Rivers</p>
            <p className="text-xs text-gray-400 truncate">Hiring Manager</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">

        {/* Header */}
        <div className="w-full h-10 bg-white border-b flex items-center
        justify-between px-6 shrink-0">
          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-2 text-gray-500 
            hover:text-gray-800 transition text-sm font-medium">
            ← Back to Dashboard
          </button>
          <button className="text-sm text-red-400 hover:underline">
            Logout
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8">

          {/* Candidate Info */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              {candidate.name}
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              {candidate.role} • {candidate.date}
            </p>
          </div>

          {/* Score Cards */}
          <div className="grid grid-cols-4 gap-4 mb-4 ">
            {[
              { label: "Communication", 
                score: candidate.scores.communication },
              { label: "Confidence", 
                score: candidate.scores.confidence },
              { label: "Clarity", 
                score: candidate.scores.clarity },
              { label: "Relevance", 
                score: candidate.scores.relevance },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-5 shadow-sm
              border border-gray-100 text-center">
                <p className="text-xs text-gray-400 mb-2">{item.label}</p>
                <p className="text-4xl font-bold text-blue-600">
                  {item.score}
                </p>
                <p className="text-xs text-gray-400 mt-1">out of 10</p>
              </div>
            ))}
          </div>

          {/* Charts + Video Row */}
          <div className="grid grid-cols-2 gap-4 mb-4">

            {/* Radar Chart */}
            <div className="bg-white rounded-xl p-6 shadow-sm
            border border-gray-100">
              <h3 className="font-bold text-gray-700 mb-4 h-[10px]">
                Competency Radar
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" 
                  tick={{ fontSize: 12 }} />
                  <Radar dataKey="value" fill="#3b82f6" 
                  fillOpacity={0.5} stroke="#3b82f6" />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Video Player */}
            <div className="bg-white rounded-xl p-6 shadow-sm
            border border-gray-100">
              <h3 className="font-bold text-gray-700 mb-4">
                Interview Recording
              </h3>
              {candidate.videoUrl ? (
                <video
                  src={candidate.videoUrl}
                  controls
                  className="w-full rounded-lg"
                />
              ) : (
                <div className="w-full h-48 bg-gray-100 rounded-lg
                flex items-center justify-center">
                  <p className="text-gray-400 text-sm">
                    No recording available
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Strengths & Weaknesses */}
          <div className="grid grid-cols-2 gap-4">

            {/* Strengths */}
            <div className="bg-white rounded-xl p-6 shadow-sm
            border border-gray-100">
              <h3 className="font-bold text-green-600 mb-3">
                ✅ Strengths
              </h3>
              {candidate.strengths.map((s, i) => (
                <div key={i} className="flex items-start gap-2 mb-2">
                  <span className="text-green-500 mt-0.5">•</span>
                  <p className="text-sm text-gray-700">{s}</p>
                </div>
              ))}
            </div>

            {/* Weaknesses */}
            <div className="bg-white rounded-xl p-6 shadow-sm
            border border-gray-100">
              <h3 className="font-bold text-red-500 mb-3">
                ⚠️ Weaknesses
              </h3>
              {candidate.weaknesses.map((w, i) => (
                <div key={i} className="flex items-start gap-2 mb-2">
                  <span className="text-red-400 mt-0.5">•</span>
                  <p className="text-sm text-gray-700">{w}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* Floating Widgets — smaller size */}
      <div className="fixed bottom-4 right-4 flex flex-col items-end gap-2 z-50">
        
        {/* Collapsible Container */}
        <div className={`flex flex-col gap-2 transition-all duration-300 ease-in-out origin-bottom ${
          isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-10 pointer-events-none'
        }`}>
          
          {/* AI Avatar Box */}
          <div 
          onClick={() => router.push("/interview")}
          className="w-24 h-24 bg-[#0F172A] rounded-xl border-2 border-blue-500 flex flex-col items-center justify-center gap-1 shadow-lg">
            <div className="w-10 h-10 rounded-full border-2 border-blue-400 flex items-center justify-center text-xl">🤖</div>
            <p className="text-white text-[10px] font-medium uppercase tracking-tighter">AI Interviewer</p>
          </div>

          {/* Camera Box */}
          <div className="w-24 h-24 bg-[#0F172A] rounded-xl border-2 border-blue-500 flex flex-col items-center justify-center gap-1 shadow-lg relative overflow-hidden">
            <div className="absolute top-1.5 left-1.5 flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
              <span className="text-red-400 text-[9px] font-bold">REC</span>
            </div>
            <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-green-400"></div>
            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-xl">👤</div>
            <p className="text-white text-[10px] font-medium uppercase tracking-tighter">You</p>
          </div>
        </div>

        {/* Collapse Toggle Button */}
        <button 
          onClick={() => setIsVisible(!isVisible)}
          className="w-10 h-10 bg-blue-600 hover:bg-blue-500 text-white rounded-full flex items-center justify-center shadow-xl transition-transform active:scale-90 border-2 border-blue-400"
        >
          {isVisible ? (
            <span className="text-lg">✕</span> 
          ) : (
            <span className="text-lg">📹</span>
          )}
        </button>

        </div>
      </div>
  )
}