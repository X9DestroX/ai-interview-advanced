"use client"
import { useState } from "react"
import { mockCandidates } from "@/lib/mockData"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const router = useRouter()
  const [filter, setFilter] = useState("")

  const filtered = mockCandidates.filter(c =>
    c.role.toLowerCase().includes(filter.toLowerCase()) ||
    c.name.toLowerCase().includes(filter.toLowerCase())
  )
  const [isVisible, setIsVisible]=useState(true);
  return (
    <div className="flex h-screen bg-[#F3F4F6] overflow-hidden">

      {/* Sidebar */}
      <div className="w-48 min-w-[192px] h-screen bg-[#1a2b4a] text-white 
      flex flex-col justify-between py-6 px-3 shrink-0">
        
        <div className="flex flex-col gap-8">
          {/* Logo */}
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

          {/* Nav */}
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

        {/* User */}
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
        <div className="w-full h-16 bg-white border-b flex items-center 
        justify-between px-6 shrink-0">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-gray-800">Candidates</h2>
            <span className="bg-blue-100 text-blue-600 text-xs font-medium
            px-2 py-1 rounded-full">1,284 total</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 border border-gray-200
            rounded-lg px-3 py-2 bg-gray-50">
              <span className="text-gray-400">🔍</span>
              <input
                className="text-sm focus:outline-none bg-transparent w-40"
                placeholder="Search candidates..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
            </div>
            <span className="text-gray-400 cursor-pointer text-lg">🔔</span>
            <span className="text-gray-400 cursor-pointer text-lg">❓</span>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8">

          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[
              { label: "New Applications", value: "124",
                change: "+12%", color: "text-green-500" },
              { label: "Interviews Today", value: "18",
                change: "Busy", color: "text-orange-400" },
              { label: "Avg. Score", value: "84%",
                change: "Top 10%", color: "text-blue-500" },
              { label: "Time to Hire", value: "14d",
                change: "-2d", color: "text-green-500" },
            ].map((stat, i) => (
              <div key={i} className="bg-white rounded-xl px-5 py-4
              shadow-sm border border-gray-100">
                <p className="text-xs text-gray-400 mb-2">{stat.label}</p>
                <div className="flex items-end gap-2">
                  <p className="text-2xl font-bold text-gray-800">
                    {stat.value}
                  </p>
                  <p className={`text-xs mb-1 font-medium ${stat.color}`}>
                    {stat.change}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Table Card — equal spacing from all sides */}
          <div className="bg-white rounded-2xl shadow-sm border
          border-gray-100 overflow-hidden">

            {/* Filters Row */}
            <div className="flex items-center justify-between px-6 py-4
            border-b border-gray-100">
              <div className="flex gap-6">
                <button className="text-sm font-semibold text-gray-800
                border-b-2 border-blue-600 pb-1">
                  All Roles
                </button>
                <button className="text-sm text-gray-400
                hover:text-gray-700 pb-1">
                  Status
                </button>
              </div>
              <button className="bg-blue-600 text-white text-sm px-4 py-2
              rounded-lg hover:bg-blue-700 transition font-medium">
                + Invite Candidate
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto px-4">
              <table className="w-full text-sm">
                <thead className="text-gray-500 border-b border-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium
                    text-xs tracking-wide">CANDIDATE NAME</th>
                    <th className="px-4 py-3 text-left font-medium
                    text-xs tracking-wide">ROLE APPLIED</th>
                    <th className="px-4 py-3 text-left font-medium
                    text-xs tracking-wide">DATE</th>
                    <th className="px-4 py-3 text-left font-medium
                    text-xs tracking-wide">TOTAL SCORE</th>
                    <th className="px-4 py-3 text-left font-medium
                    text-xs tracking-wide">STATUS</th>
                    <th className="px-4 py-3 text-left font-medium
                    text-xs tracking-wide">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map(candidate => (
                    <tr key={candidate.id}
                    className="hover:bg-gray-50 transition">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-blue-100
                          flex items-center justify-center text-blue-700
                          font-bold text-sm shrink-0">
                            {candidate.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">
                              {candidate.name}
                            </p>
                            <p className="text-xs text-gray-400">
                              {candidate.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-gray-500">
                        {candidate.role}
                      </td>
                      <td className="px-4 py-4 text-gray-500">
                        {candidate.date}
                      </td>
                      <td className="px-4 py-4">
                        <span className="font-bold text-blue-600">
                          {candidate.scores.total}/40
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs
                        font-medium ${candidate.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : candidate.status === "Failed"
                          ? "bg-red-100 text-red-600"
                          : "bg-yellow-100 text-yellow-700"}`}>
                          {candidate.status}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <button
                          onClick={() =>
                            router.push(`/dashboard/${candidate.id}`)}
                          className="text-blue-500 hover:underline text-sm
                          font-medium">
                          View Report →
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-6 py-4
            border-t border-gray-100">
              <p className="text-sm text-gray-400">
                Showing {filtered.length} of 1,284 candidates
              </p>
              <div className="flex gap-2">
                <button className="px-4 py-2 text-sm border border-gray-200
                rounded-lg hover:bg-gray-50 text-gray-600">
                  Previous
                </button>
                <button className="px-4 py-2 text-sm border border-gray-200
                rounded-lg hover:bg-gray-50 text-gray-600">
                  Next
                </button>
              </div>
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