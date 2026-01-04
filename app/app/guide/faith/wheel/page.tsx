"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function WheelPage() {
  const router = useRouter();
  const [speed, setSpeed] = useState(10); // 秒數，越高越慢

  const spin = () => {
    setSpeed(prev => Math.max(0.1, prev * 0.5)); // 每次點擊加速（秒數減半）
  };

  // 阻尼效果：每秒自動變慢
  useEffect(() => {
    const timer = setInterval(() => {
      setSpeed(prev => Math.min(10, prev * 1.1));
    }, 500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col items-center justify-center overflow-hidden">
      <button onClick={() => router.back()} className="absolute top-6 left-6 p-4 text-stone-400 z-50">
        <ChevronLeft size={28} />
      </button>

      <div className="relative group" onClick={spin}>
        {/* 轉軸 */}
        <div className="absolute top-[-40px] left-1/2 -translate-x-1/2 w-3 h-[calc(100%+80px)] bg-stone-400 rounded-full -z-10 shadow-inner"></div>
        
        {/* 經輪主體 */}
        <div 
          className="w-40 h-80 bg-[#8b4513] border-y-8 border-yellow-600 shadow-2xl relative overflow-hidden flex flex-col justify-around py-4"
          style={{ 
            animation: `wheel-spin ${speed}s linear infinite`,
            boxShadow: "inset 10px 0 20px rgba(0,0,0,0.5), inset -10px 0 20px rgba(0,0,0,0.5)"
          }}
        >
          {["唵", "嘛", "呢", "叭", "咪", "吽"].map((char, i) => (
            <span key={i} className="text-yellow-500 text-3xl font-serif text-center select-none">{char}</span>
          ))}
        </div>
      </div>

      <p className="mt-20 text-stone-400 text-xs tracking-widest animate-pulse">
        {speed < 1 ? "FAST SPINNING: KARMA CLEARING" : "TAP TO SPIN"}
      </p>

      <style jsx global>{`
        @keyframes wheel-spin {
          from { transform: perspective(1000px) rotateY(0deg); }
          to { transform: perspective(1000px) rotateY(360deg); }
        }
      `}</style>
    </div>
  );
}