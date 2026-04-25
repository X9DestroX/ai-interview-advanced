"use client";

import { useLiveAPI } from "@/hooks/use-live-api";
import { Avatar } from "./avatar";
import { Mic, MicOff, PhoneOff, Play, Settings } from "lucide-react";
import { useEffect, useRef } from "react";
import { motion } from "motion/react";

export function InterviewRoom() {
  const { isConnected, isSpeaking, startSession, endSession, transcriptions, videoStream } = useLiveAPI();
  const scrollRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);


  // Auto-scroll transcriptions
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [transcriptions]);
  
  // Connect video stream
  useEffect(() => {
    if (videoRef.current && videoStream) {
      videoRef.current.srcObject = videoStream;
    }
  }, [videoStream]);


  const latestAIResponse = [...transcriptions].reverse().find(t => t.source === 'model')?.text || "";

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-300 font-sans flex flex-col overflow-hidden select-none h-screen">
      {/* Top Header */}
      <header className="h-16 px-8 flex items-center justify-between border-b border-zinc-800/50 bg-[#0a0a0a] flex-shrink-0">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-black rounded-sm"></div>
          </div>
          <span className="font-medium tracking-tight text-white">Cognition AI Interview</span>
        </div>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-red-500 animate-pulse' : 'bg-zinc-600'}`}></div>
            <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
              {isConnected ? 'Rec · Active' : 'Offline'}
            </span>
          </div>
          <div className="h-4 w-[1px] bg-zinc-800"></div>
          <button className="text-xs font-medium text-zinc-400 hover:text-white transition-colors">Settings</button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex p-6 gap-6 overflow-hidden min-h-0">
        {/* AI Avatar Area (Left) */}
        <section className="flex-[3] relative bg-[#0a0a0a] rounded-3xl border border-zinc-800 overflow-hidden flex items-center justify-center">
          
          <Avatar isSpeaking={isSpeaking} isConnected={isConnected} />

          {/* Voice-to-Text Overlay (Live Captioning) */}
          {latestAIResponse && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-3/4 bg-black/60 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-2xl z-20">
              <div className="flex items-start space-x-4">
                <div className="mt-1 text-[10px] font-bold text-cyan-400 tracking-tighter uppercase px-1.5 py-0.5 border border-cyan-400/50 rounded flex-shrink-0">
                  AI
                </div>
                <p className="text-lg font-medium leading-relaxed text-white">
                  "{latestAIResponse}"
                </p>
              </div>
            </div>
          )}
        </section>

        {/* Side Panel (Right) */}
        <aside className="flex-[1.2] flex flex-col space-y-6 overflow-hidden">
          {/* Candidate Preview */}
          <div className="h-48 bg-[#0a0a0a] rounded-2xl border border-zinc-800 relative overflow-hidden flex-shrink-0">
            {videoStream ? (
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                muted 
                className="w-full h-full object-cover" 
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-zinc-600 text-sm">Camera Offline</span>
              </div>
            )}
            <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/40 rounded-md text-[10px] text-white backdrop-blur-sm z-10">
              You (Candidate)
            </div>
          </div>


          {/* Interview Flow & Transcript */}
          <div className="flex-1 bg-[#0a0a0a] rounded-2xl border border-zinc-800 flex flex-col p-4 overflow-hidden">
            <h3 className="text-[10px] uppercase font-bold tracking-[0.2em] text-zinc-500 mb-4 flex-shrink-0">Live Transcript</h3>
            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto pr-2">
              {transcriptions.length === 0 ? (
                <div className="h-full flex flex-col justify-center items-center text-center space-y-4 px-4 opacity-50">
                  <Mic className="w-6 h-6 text-zinc-600" />
                  <p className="text-xs text-zinc-500">Awaiting audio input...</p>
                </div>
              ) : (
                transcriptions.map((t, idx) => {
                  const isAI = t.source === 'model';
                  return (
                    <div key={idx} className="space-y-1">
                      <p className={`text-[10px] font-bold ${isAI ? 'text-cyan-500' : 'text-zinc-500'}`}>
                         {isAI ? 'ARIS (AI)' : 'USER'}
                      </p>
                      <p className={`text-sm text-zinc-300 leading-snug ${isAI ? 'bg-cyan-500/5 border-l-2 border-cyan-500/50 pl-2 py-1' : ''}`}>
                        {t.text}
                      </p>
                    </div>
                  );
                })
              )}
              {isSpeaking && transcriptions[transcriptions.length - 1]?.source !== 'model' && (
                <div className="space-y-1 opacity-50">
                   <p className="text-[10px] font-bold text-zinc-600">LISTENING...</p>
                   <div className="flex space-x-1 py-1">
                     <motion.div className="w-1 h-1 bg-zinc-600 rounded-full" animate={{ y: [0, -2, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0 }} />
                     <motion.div className="w-1 h-1 bg-zinc-600 rounded-full" animate={{ y: [0, -2, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} />
                     <motion.div className="w-1 h-1 bg-zinc-600 rounded-full" animate={{ y: [0, -2, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} />
                   </div>
                </div>
              )}
            </div>
          </div>
        </aside>
      </main>

      {/* Bottom Control Bar */}
      <footer className="h-20 border-t border-zinc-800 bg-[#0a0a0a] px-8 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center space-x-3">
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full border-2 border-black bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-white z-10">JD</div>
            <div className="w-8 h-8 rounded-full border-2 border-black bg-cyan-600 flex items-center justify-center text-[10px] font-bold text-white z-0">AI</div>
          </div>
          <div className="text-xs font-medium">
            <p className="text-white">Engineering Interview</p>
            <p className="text-zinc-500">Senior Backend Specialist</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-3 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors border border-zinc-700">
            <svg className="w-5 h-5 text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
          </button>
          <button className="p-3 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors border border-zinc-700">
            <svg className="w-5 h-5 text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
          </button>
          {!isConnected ? (
             <button 
               onClick={startSession}
               className="px-8 py-2.5 rounded-full bg-cyan-600/10 border border-cyan-600/40 text-cyan-500 text-xs font-bold uppercase tracking-wider hover:bg-cyan-600 hover:text-white transition-all content-center flex"
             >
               Join Interview
             </button>
          ) : (
             <button 
               onClick={endSession}
               className="px-8 py-2.5 rounded-full bg-red-600/10 border border-red-600/40 text-red-500 text-xs font-bold uppercase tracking-wider hover:bg-red-600 hover:text-white transition-all content-center flex"
             >
               End Interview
             </button>
          )}
        </div>

        <div className="w-48 h-2 bg-zinc-800 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-cyan-500" 
            initial={{ width: "0%" }}
            animate={{ width: isConnected ? "75%" : "0%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </div>
      </footer>
    </div>
  );
}
