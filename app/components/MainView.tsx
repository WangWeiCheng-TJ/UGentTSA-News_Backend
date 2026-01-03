"use client";

import React, { useState } from "react";
import BottomNav from "@/components/BottomNav";
import NewsFeed from "@/components/NewsFeed";
import { MapPin, BookOpen, Construction } from "lucide-react";

// === 定義資料型態 ===
export type NewsItem = {
  Date: string;
  Level: string;
  Audience: string;
  Topic: string;
  Title: string;
  Summary: string;
  Action: string;
  Source_URL: string;
};

// === 子頁面組件 ===
const GuideView = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 space-y-4">
    <div className="bg-blue-50 p-4 rounded-full">
      <BookOpen size={48} className="text-blue-500" />
    </div>
    <h2 className="text-xl font-bold text-gray-800">生存指南資料庫</h2>
    <p className="text-gray-500 max-w-xs">
      這裡將整合舊網站的攻略，包含居留證辦理、銀行開戶與生活撇步。
    </p>
    <div className="px-4 py-2 bg-yellow-100 text-yellow-800 text-sm rounded-lg border border-yellow-200">
      🚧 資料搬運中，敬請期待
    </div>
  </div>
);

const MapView = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 space-y-4">
    <div className="bg-green-50 p-4 rounded-full">
      <MapPin size={48} className="text-green-500" />
    </div>
    <h2 className="text-xl font-bold text-gray-800">根特好店地圖</h2>
    <p className="text-gray-500 max-w-xs">
      整合學長姐推薦的餐廳、亞超與二手店清單，點擊可直接導航。
    </p>
    <button className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold shadow-lg shadow-blue-200 active:scale-95 transition-transform">
      + 推薦好店 (Coming Soon)
    </button>
  </div>
);

const MoreView = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 space-y-4">
    <div className="bg-gray-100 p-4 rounded-full">
      <Construction size={48} className="text-gray-500" />
    </div>
    <h2 className="text-xl font-bold text-gray-800">更多功能</h2>
    <p className="text-gray-500 max-w-xs">
      包含 Google 帳號登入、設定與緊急求救系統。
    </p>
  </div>
);

// === 主介面組件 (Client Component) ===
export default function MainView({ initialNewsData }: { initialNewsData: NewsItem[] }) {
  const [currentTab, setCurrentTab] = useState("home");
  // 這裡我們直接使用從 Server 傳過來的 initialNewsData，不需要再 fetch 了
  
  return (
    <>
      {/* 根據 currentTab 顯示對應的畫面 */}
      
      {/* --- 首頁 (Dashboard) --- */}
      {currentTab === "home" && (
        <div className="flex flex-col items-center py-8 px-4">
           {/* 標題區 */}
           <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">🇧🇪 根特生存指南</h1>
            <div className="flex items-center justify-center gap-2 mt-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-xs text-gray-500">系統運作正常</span>
            </div>
          </div>
          
          {/* 新聞列表 */}
          <div className="w-full max-w-md">
             <h2 className="text-sm font-bold text-gray-400 mb-3 ml-1 uppercase tracking-wider">
              Latest Updates
            </h2>
            
            <NewsFeed newsData={initialNewsData} />
          </div>
        </div>
      )}

      {/* --- 其他分頁 --- */}
      {currentTab === "guide" && <GuideView />}
      {currentTab === "map" && <MapView />}
      {currentTab === "more" && <MoreView />}

      {/* 底部導覽列 */}
      <BottomNav currentTab={currentTab} onTabChange={setCurrentTab} />
    </>
  );
}