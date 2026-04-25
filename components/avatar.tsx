import { motion } from 'motion/react';
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface AvatarProps {
  isSpeaking: boolean;
  isConnected: boolean;
  className?: string;
}

export function Avatar({ isSpeaking, isConnected, className }: AvatarProps) {
  return (
    <div className={cn("relative", className)}>
      {/* Glow effect */}
      <div className={cn(
        "absolute inset-0 bg-cyan-500/20 blur-[80px] rounded-full transition-opacity duration-1000",
        isConnected ? "opacity-100" : "opacity-30"
      )}></div>
      
      {/* Main Avatar Circle */}
      <div className="relative w-48 h-48 rounded-full border border-cyan-500/30 flex items-center justify-center bg-black">
        {/* Dashed spinning border */}
        <div className={cn(
          "absolute w-40 h-40 rounded-full border-2 border-dashed border-cyan-500/40",
          isConnected && "animate-[spin_10s_linear_infinite]"
        )}></div>
        
        {/* Inner gradient blur */}
        <div className={cn(
          "absolute w-24 h-24 rounded-full bg-gradient-to-tr from-cyan-600 to-blue-400 blur-xl transition-opacity duration-500",
          isConnected ? "opacity-80" : "opacity-20",
          isSpeaking && "animate-[pulse_2s_infinite]"
        )}></div>
        
        {/* Voice visualizer bars */}
        {isConnected && (
          <div className="absolute flex space-x-1 items-center justify-center h-12">
            <motion.div 
              className="w-1.5 bg-white rounded-full" 
              animate={{ height: isSpeaking ? ["24px", "40px", "16px", "24px"] : "12px" }}
              transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
            />
            <motion.div 
              className="w-1.5 bg-white rounded-full" 
              animate={{ height: isSpeaking ? ["40px", "16px", "32px", "40px"] : "16px" }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
            />
            <motion.div 
              className="w-1.5 bg-white rounded-full" 
              animate={{ height: isSpeaking ? ["32px", "48px", "24px", "32px"] : "12px" }}
              transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
            />
          </div>
        )}
      </div>

      {!isConnected && (
        <div className="absolute inset-0 z-20 flex items-center justify-center rounded-full">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest bg-black/80 backdrop-blur-sm border border-zinc-800 px-3 py-1 rounded-full">
            Offline
          </span>
        </div>
      )}
    </div>
  );
}
