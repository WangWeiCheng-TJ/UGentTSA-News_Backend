"use client";

import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TalismanPage() {
  const router = useRouter();
  const [isGlowing, setIsGlowing] = useState(false);
  const [msg, setMsg] = useState("");
  const [tapCount, setTapCount] = useState(0);

  const blessings = ["考試 20/20", "BUG 消除", "急急如律令", "小人退散", "Paper 必過", "綠燈常亮", "簽證秒過", "感情順利", "室友不雷"];

  const activate = () => {
    setIsGlowing(true);
    setTapCount(prev => prev + 1);
    
    // 隨機換一句台詞
    setMsg(blessings[Math.floor(Math.random() * blessings.length)]);
    
    // 震動回饋 (三次短震動更有法力感)
    if (navigator.vibrate) navigator.vibrate([30, 50, 30]);

    // 0.5秒後關閉金光
    setTimeout(() => setIsGlowing(false), 500);
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex flex-col items-center justify-center p-8 overflow-hidden touch-none select-none">
      
      {/* 返回按鈕 (設為半透明避免干擾視覺) */}
      <button 
        onClick={() => router.back()} 
        className="absolute top-6 left-6 p-4 text-stone-600 hover:text-stone-400 z-50"
      >
        <ChevronLeft size={28} />
      </button>

      <div className="relative flex flex-col items-center justify-center">
        
        {/* 符咒圖片主體 */}
        <div className="relative cursor-pointer group" onClick={activate}>
          <img
            src="/imgs/tao.webp"
            alt="Talisman"
            className={`
              w-64 md:w-80 transition-all duration-300 transform
              ${isGlowing ? "scale-105 brightness-125 saturate-150" : "scale-100"}
              /* 增加黃金色的外發光層 */
              ${isGlowing ? "drop-shadow-[0_0_40px_rgba(255,215,0,0.8)]" : "drop-shadow-xl"}
            `}
          />
          
          {/* 點擊時的瞬間白光閃爍 (法力發動特效) */}
          <div className={`
            absolute inset-0 bg-white rounded-full mix-blend-overlay transition-opacity duration-500 pointer-events-none
            ${isGlowing ? "opacity-30 scale-150 blur-xl" : "opacity-0 scale-100"}
          `}></div>
        </div>

        {/* 浮動的祝福語 (驚喜感：點了才出現，往上飄) */}
        {isGlowing && (
          <div 
            key={tapCount}
            className="absolute -top-16 text-yellow-400 font-black text-4xl tracking-widest animate-merit-float drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
            style={{ writingMode: 'vertical-rl' }} // 讓文字像符咒一樣直寫
          >
            {msg}
          </div>
        )}
      </div>

      <div className="mt-20 text-stone-600 text-[10px] tracking-[0.5em] animate-pulse uppercase">
        Tap to invoke
      </div>

      {/* 複用之前的飄字動畫 */}
      <style jsx>{`
        @keyframes merit-float {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translateY(-80px) scale(1.2); opacity: 0; }
        }
        .animate-merit-float {
          animation: merit-float 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}