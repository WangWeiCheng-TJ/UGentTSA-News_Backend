"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";

export default function KuaiKuaiPage() {
  const router = useRouter();
  
  // 狀態管理
  const [bugCount, setBugCount] = useState(0);
  const [isExpired, setIsExpired] = useState(false);
  const [expiryDate, setExpiryDate] = useState<Date | null>(null);

  // 1. 初始化讀取：從 localStorage 載入數據
  useEffect(() => {
    // 讀取 Bug 總數
    const savedBugCount = localStorage.getItem("kuaikuai_bug_count");
    if (savedBugCount) setBugCount(parseInt(savedBugCount, 10));

    // 讀取啟動日期 (如果沒有，就設為今天，代表這是一包新乖乖)
    let activationDateStr = localStorage.getItem("kuaikuai_activation_date");
    let activationDate: Date;

    if (!activationDateStr) {
      activationDate = new Date();
      localStorage.setItem("kuaikuai_activation_date", activationDate.toISOString());
    } else {
      activationDate = new Date(activationDateStr);
    }

    // 計算 6 個月後過期 (機房標準：過期乖乖不可留)
    const expire = new Date(activationDate);
    expire.setMonth(expire.getMonth() + 6);
    setExpiryDate(expire);

    const now = new Date();
    if (now > expire) {
      setIsExpired(true);
    }
  }, []);

  // 2. 當 bugCount 變動時，存入 localStorage
  useEffect(() => {
    if (bugCount > 0) {
      localStorage.setItem("kuaikuai_bug_count", bugCount.toString());
    }
  }, [bugCount]);

  // 點擊事件：消滅 Bug
  const handleTap = () => {
    if (isExpired) return; // 過期後防禦力歸零
    setBugCount(prev => prev + 1);
    
    // 震動與音效
    if (navigator.vibrate) navigator.vibrate(10);
    new Audio("/sounds/kuaikuai-shasha.mp3").play().catch(() => {});
  };

  // 續命邏輯：更換新乖乖
  const resetKuaiKuai = () => {
    const newDate = new Date();
    localStorage.setItem("kuaikuai_activation_date", newDate.toISOString());
    
    const expire = new Date(newDate);
    expire.setMonth(expire.getMonth() + 6);
    
    setExpiryDate(expire);
    setIsExpired(false);
    alert("已更換新鮮乖乖，機房防禦力恢復 100%！");
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-6 transition-colors duration-1000 
      ${isExpired ? "bg-stone-300" : "bg-green-50"}`}>
      
      <button onClick={() => router.back()} className="absolute top-6 left-6 p-2 rounded-full bg-white/50 shadow-sm z-50">
        <ChevronLeft size={24} className="text-stone-600" />
      </button>

      <div className="relative flex flex-col items-center">
        {/* 乖乖圖片主體 */}
        <div className="relative cursor-pointer" onClick={handleTap}>
          <img
            src="/imgs/kuaikuai-green.webp"
            className={`w-64 md:w-80 transition-all duration-700 active:scale-95
              ${isExpired ? "grayscale sepia brightness-50 blur-[1px]" : "drop-shadow-[0_20px_40px_rgba(34,197,94,0.3)]"}
            `}
            alt="乖乖"
          />
          
          {/* 過期標記 */}
          {isExpired && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-12 border-8 border-red-600/80 text-red-600/80 font-black text-5xl p-4 pointer-events-none whitespace-nowrap uppercase tracking-tighter">
              Expired
            </div>
          )}
        </div>

        {/* 飄字效果 */}
        {!isExpired && bugCount > 0 && (
          <div 
            key={bugCount} 
            className="absolute left-1/2 -translate-x-1/2 -top-20 text-green-600 font-black text-4xl animate-merit-float pointer-events-none whitespace-nowrap"
          >
            Bug -1 ✅
          </div>
        )}
      </div>

      {/* 數據看板 */}
      <div className="mt-12 text-center space-y-2">
        <p className={`text-sm font-mono font-bold ${isExpired ? "text-red-600 animate-pulse" : "text-green-700"}`}>
          {isExpired ? "CRITICAL: BUG SHIELD DOWN" : `TOTAL BUGS REMOVED: ${bugCount.toLocaleString()}`}
        </p>
        <p className="text-[10px] text-stone-400">
          有效期限至: {expiryDate?.toLocaleDateString()}
        </p>
      </div>

      {/* 更換按鈕 (續命) */}
      {isExpired && (
        <button 
          onClick={resetKuaiKuai}
          className="mt-8 flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-lg text-stone-700 font-bold text-sm hover:bg-stone-50 active:scale-95 transition-all"
        >
          <RefreshCw size={18} /> 更換新乖乖 (續命)
        </button>
      )}

      <style jsx>{`
        @keyframes merit-float {
          0% { transform: translate(-50%, 0) scale(1); opacity: 1; }
          100% { transform: translate(-50%, -150px) scale(1.5); opacity: 0; }
        }
        .animate-merit-float {
          animation: merit-float 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}