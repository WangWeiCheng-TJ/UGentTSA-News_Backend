"use client";

import React, { useState, useEffect } from "react"; // 👈 引入 useEffect
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function MuyuPage() {
  const router = useRouter();
  
  // 1. 初始化 state (預設 0)
  const [count, setCount] = useState(0);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  // 2. 生命週期：組件掛載時，從本地端讀取數值
  useEffect(() => {
    const savedCount = localStorage.getItem("muyu_count");
    if (savedCount) {
      setCount(parseInt(savedCount, 10));
    }
  }, []);

  // 3. 生命週期：當 count 改變時，自動存入本地端
  useEffect(() => {
    // 只有當 count 大於 0 才存入，避免初始化時蓋掉舊資料
    if (count > 0) {
      localStorage.setItem("muyu_count", count.toString());
    }
  }, [count]);

  const handleTap = (e: React.MouseEvent | React.TouchEvent) => {
    if (e.type === 'touchstart') e.preventDefault();
    
    setCount(prev => prev + 1);
    
    const audio = new Audio("/sounds/muyu.mp3");
    audio.play().catch(() => {});
    
    if (navigator.vibrate) navigator.vibrate(15);

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const id = Date.now();
    setRipples(prev => [...prev, { id, x: clientX, y: clientY }]);
    
    setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 800);
  };

  return (
    <div className="min-h-screen bg-stone-900 flex flex-col items-center justify-center overflow-hidden touch-none select-none">
      
      <button 
        onClick={() => router.back()} 
        className="absolute top-6 left-6 p-4 text-stone-500 hover:text-stone-300 transition-colors z-50"
      >
        <ChevronLeft size={28} />
      </button>

      {/* 這裡會顯示儲存後的累積功德 */}
      <div className="text-stone-600 font-mono text-5xl mb-12 opacity-50 tracking-tighter">
        {count.toLocaleString()}
      </div>

      <div className="relative cursor-pointer">
        <img
          src="/imgs/muyu.webp"
          onMouseDown={handleTap}
          onTouchStart={handleTap}
          className="w-64 h-64 md:w-80 md:h-80 object-contain transition-transform active:scale-95 duration-75 drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          alt="Muyu"
        />
      </div>

      {ripples.map(r => (
        <span 
          key={r.id} 
          className="fixed pointer-events-none text-stone-400 font-black text-4xl animate-merit-float" 
          style={{ left: r.x, top: r.y }}
        >
          功德 +1
        </span>
      ))}

      <style jsx>{`
        @keyframes merit-float {
          0% { transform: translate(-50%, 0) scale(1); opacity: 1; }
          100% { transform: translate(-50%, -120px) scale(1.2); opacity: 0; }
        }
        .animate-merit-float { 
          animation: merit-float 0.8s ease-out forwards; 
          position: fixed; 
          white-space: nowrap;
        }
      `}</style>
    </div>
  );
}