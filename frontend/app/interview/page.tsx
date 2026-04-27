"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function InterviewPage() {
  const router = useRouter()
  
  // --- States for Interactivity ---
  const [activeTab, setActiveTab] = useState<'overview' | 'transcript'>('overview')
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)

  // --- Handlers ---
  const handleEndInterview = () => {
    // Navigate back to analytics or dashboard
    router.push('/analytics')
  }

  const handleDetailsClick = () => {
    alert("Opening Interview Details & Job Description...")
    // You could also open a modal here
  }

  return (
    <div className="w-full h-screen bg-[#F8FAFC] overflow-hidden flex flex-col font-sans">
      
      {/* Top Bar */}
      <header className="h-14 bg-white border-b flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-2">
          <img src="/logo.jpeg" alt="Logo" width={28} height={28} className="rounded" />
          <span className="font-bold text-slate-800 tracking-tight">Labdox</span>
        </div>
        <h2 className="text-sm font-bold text-slate-700">Frontend Developer Interview</h2>
        <div className="flex items-center gap-3">
          <div className="bg-slate-900 text-white px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> 12:34
          </div>
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-[10px] font-bold">
             AT
          </div>
        </div>
      </header>

      {/* Recording Banner */}
      <div className="h-10 bg-[#E2E8F0]/50 border-b flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-red-500 text-xs">🔴</span>
          <p className="text-[10px] text-slate-600 font-bold uppercase tracking-wider">
            THIS INTERVIEW IS BEING RECORDED
          </p>
        </div>
        <button className="text-slate-400 hover:text-slate-600">✕</button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT: Video & Controls */}
        <div className="flex-1 flex flex-col p-6 gap-6 relative">
          
          {/* Question Box */}
          <div className="bg-slate-700/90 backdrop-blur-md text-white rounded-xl py-4 px-8 self-center shadow-xl max-w-2xl border border-white/10 z-10">
            <p className="text-sm font-medium text-center opacity-90">
              "Can you explain how you would approach debugging a production issue?"
            </p>
          </div>

          {/* Video Grid */}
          <div className="flex-1 grid grid-cols-2 gap-6 min-h-0">
            {/* AI Interviewer */}
            <div className="bg-[#0F172A] rounded-[2rem] overflow-hidden relative shadow-2xl flex flex-col items-center justify-center border border-slate-800">
              <div className="absolute top-5 left-5 bg-blue-600/20 backdrop-blur-md border border-blue-500/30 text-blue-400 px-3 py-1.5 rounded-lg text-[10px] font-black tracking-widest flex items-center gap-2">
                <span className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center text-white text-[8px]">🤖</span>
                LABDOX AI
              </div>
              {/* Replace with your Robot Icon Image */}
              <div className="text-8xl">🤖</div> 
              <p className="absolute bottom-5 left-5 text-white/30 text-[10px] font-bold uppercase tracking-widest">Interviewer</p>
            </div>

            {/* Candidate (You) */}
            <div className="bg-[#1E293B] rounded-[2rem] overflow-hidden relative shadow-2xl flex flex-col items-center justify-center border border-slate-700">
              <div className="absolute top-5 left-5 bg-green-500/20 backdrop-blur-md border border-green-500/30 text-green-400 px-3 py-1.5 rounded-lg text-[10px] font-black tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                LIVE
              </div>
              {/* Replace with your Human Icon Image */}
              <div className="text-8xl">👨‍💼</div>
              <p className="absolute bottom-5 left-5 text-white/30 text-[10px] font-bold uppercase tracking-widest">You</p>
            </div>
          </div>

          {/* Bottom Control Dock */}
          <div className="flex items-center justify-center gap-4 py-4">
             <div className="bg-slate-900/90 backdrop-blur-md p-2 rounded-3xl flex items-center gap-2 border border-slate-700 shadow-2xl">
                <button 
                  onClick={() => setIsMuted(!isMuted)}
                  className={`w-12 h-12 rounded-2xl flex flex-col items-center justify-center transition-all ${isMuted ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}
                >
                  <span className="text-lg">{isMuted ? '🔇' : '🎤'}</span>
                  <span className="text-[8px] font-bold mt-0.5">MUTE</span>
                </button>
                <button 
                  onClick={() => setIsVideoOff(!isVideoOff)}
                  className={`w-12 h-12 rounded-2xl flex flex-col items-center justify-center transition-all ${isVideoOff ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}
                >
                  <span className="text-lg">{isVideoOff ? '🚫' : '📹'}</span>
                  <span className="text-[8px] font-bold mt-0.5">VIDEO</span>
                </button>
                <button className="w-12 h-12 rounded-2xl bg-slate-700 text-white flex flex-col items-center justify-center hover:bg-slate-600 transition-colors">
                  <span className="text-lg">📤</span>
                  <span className="text-[8px] font-bold mt-0.5">SHARE</span>
                </button>
                <div className="h-8 w-[1px] bg-slate-700 mx-2" />
                <button 
                  onClick={handleEndInterview}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 h-12 rounded-2xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-red-500/20 active:scale-95 transition-all"
                >
                  End Interview
                </button>
             </div>
          </div>
        </div>

        {/* RIGHT: Progress Panel */}
        <aside className="w-80 bg-white border-l flex flex-col shrink-0 shadow-[-10px_0_15px_rgba(0,0,0,0.02)]">
          {/* Progress Header */}
          <div className="p-6 border-b">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Progress</p>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-slate-800">75% Complete</h3>
                <p className="text-xs text-slate-500">Step 3 of 4</p>
              </div>
              <div className="relative w-14 h-14">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-slate-100" />
                  <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray="150" strokeDashoffset="37" className="text-blue-500" strokeLinecap="round" />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-slate-700">3/4</span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b text-[10px] font-bold uppercase tracking-widest">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`flex-1 py-4 border-b-2 transition-all ${activeTab === 'overview' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400'}`}
            >
              Overview
            </button>
            <button 
              onClick={() => setActiveTab('transcript')}
              className={`flex-1 py-4 border-b-2 transition-all ${activeTab === 'transcript' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400'}`}
            >
              Transcript
            </button>
          </div>

          {/* Content Area (Changes based on Tab) */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === 'overview' ? (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-2 duration-300">
                <section>
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-[10px] font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Competencies
                    </p>
                    <span className="text-green-500 text-xs font-bold">✓</span>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-xs text-slate-600 font-medium">
                      <span className="text-blue-500">•</span> React Fundamentals
                    </li>
                    <li className="flex items-center gap-3 text-xs text-slate-600 font-medium">
                      <span className="text-blue-500">•</span> State Management
                    </li>
                  </ul>
                </section>

                <section>
                  <p className="text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-4">Active Task</p>
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-center">
                    <p className="text-xs text-slate-600 font-medium">System Design & Debugging</p>
                  </div>
                </section>
              </div>
            ) : (
              <div className="space-y-4 animate-in fade-in slide-in-from-left-2 duration-300">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live Transcript</p>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-blue-600 uppercase">AI Interviewer</p>
                    <p className="text-xs text-slate-600 bg-blue-50 p-3 rounded-lg rounded-tl-none">
                      "Can you explain how you would approach debugging a production issue?"
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase text-right">You</p>
                    <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg rounded-tr-none">
                      "I'd start by reproducing the issue in a staging environment and checking the logs..."
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Action */}
          <div className="p-6 border-t">
            <button 
              onClick={handleDetailsClick}
              className="w-full bg-[#94A3B8]/10 hover:bg-[#94A3B8]/20 text-slate-600 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all active:scale-[0.98]"
            >
              Interview Details
            </button>
          </div>
        </aside>
      </div>
    </div>
  )
}