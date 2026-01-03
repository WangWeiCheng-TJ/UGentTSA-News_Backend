"use client";

import React, { useState } from "react";
import BottomNav from "@/components/BottomNav";
import NewsFeed from "@/components/NewsFeed";
import NewsDetailModal from "@/components/NewsDetailModal";
// 引入剛剛建立的資料
import { guideData, appLinks } from "@/config/guideData"; 
import { 
  MapPin, 
  BookOpen, 
  ExternalLink, 
  Phone, 
  ChevronRight, 
  AlertTriangle, // 👈 補上這個
  Bell           // 👈 還有這個
} from "lucide-react";
import Link from "next/link";

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

// === 1. 指南頁面 (GuideView) ===
const GuideView = () => (
  <div className="flex flex-col w-full pb-24 px-4 pt-6 space-y-6">
    <div className="text-center space-y-2">
      <h2 className="text-2xl font-bold text-gray-800">生存指南 🧭</h2>
      <p className="text-gray-500 text-sm">從落地到離開的全攻略。</p>
    </div>

    <div className="space-y-6">
      {guideData.map((section, idx) => (
        <div key={idx} className="space-y-3">
          <h3 className="text-lg font-bold text-blue-600 flex items-center gap-2">
            <span className="w-1 h-5 bg-blue-600 rounded-full"></span>
            {section.category}
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {section.items.map((item, itemIdx) => (
              <Link 
                key={itemIdx} 
                href={item.path}
                className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100 active:scale-95 transition-transform hover:shadow-md"
              >
                <span className="text-gray-700 font-medium">{item.title}</span>
                <ChevronRight size={18} className="text-gray-400" />
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

// === 2. 傳送門頁面 (PortalView) ===
const PortalView = () => (
  <div className="flex flex-col w-full pb-24 px-4 pt-6 space-y-8">
    
    {/* 🚨 緊急求救區塊 */}
    <div className="bg-red-50 border border-red-100 rounded-2xl p-5 text-center space-y-3 shadow-sm">
      <h3 className="text-red-800 font-bold text-lg flex items-center justify-center gap-2">
        <Phone size={20} /> 緊急求救
      </h3>
      <p className="text-red-600 text-sm opacity-80">遇到緊急狀況 (救護車/消防/警察)</p>
      <a 
        href="tel:112" 
        className="block w-full bg-red-600 text-white font-bold py-3 rounded-xl shadow-md active:scale-95 transition-transform"
      >
        撥打 112
      </a>
    </div>

    {/* 🚀 外部 App 連結 */}
    <div className="space-y-4">
      <h3 className="text-gray-800 font-bold text-lg ml-1">根特生活必備 App</h3>
      <div className="grid grid-cols-2 gap-4">
        {appLinks.map((app, idx) => (
          <a
            key={idx}
            href={app.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-gray-100 shadow-sm active:scale-95 transition-transform hover:bg-gray-50"
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-2 ${app.color}`}>
              {app.icon}
            </div>
            <span className="text-gray-700 font-medium text-sm">{app.name}</span>
            <ExternalLink size={12} className="text-gray-400 mt-1" />
          </a>
        ))}
      </div>
    </div>
  </div>
);

// === 主介面組件 ===
// 👇👇👇 關鍵修改在這邊 👇👇👇
export default function MainView({ 
  initialNewsData, 
  initialTab = "home" // 1. 設定預設值為 home
}: { 
  initialNewsData: NewsItem[], 
  initialTab?: string // 2. 新增這個型別定義
}) {
  
  // 3. 使用 initialTab 來初始化狀態
  // 這樣當 URL 是 /?tab=guide 時，currentTab 就會變成 "guide"
  const [currentTab, setCurrentTab] = useState(initialTab);

  const [selectedAlert, setSelectedAlert] = useState<NewsItem | null>(null);

  // 1️⃣ 邏輯處理：把新聞分成三級
  // 注意：Google Sheets 抓下來的 Level 可能是數字或字串，建議轉字串比對比較保險
  const redAlerts = initialNewsData.filter(item => String(item.Level) === "3");
  const pinnedNews = initialNewsData.filter(item => String(item.Level) === "2");
  const normalNews = initialNewsData.filter(item => String(item.Level) === "1" || !item.Level); // Level 1 或沒填的
  
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* --- 1. 首頁 (News) --- */}
        {currentTab === "home" && (
          <div className="flex flex-col items-center py-8 px-4 pb-24">
             <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">🇧🇪 根特生存指南</h1>
              <div className="flex items-center justify-center gap-2 mt-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-xs text-gray-500">媽祖保佑中</span>
              </div>
            </div>
            <div className="w-full max-w-md px-4 space-y-6">
              {/* 🔴 Level 3: 紅色警戒區 (有資料才顯示) */}
              {redAlerts.length > 0 && (
                <div className="space-y-3">
                  {redAlerts.map((alert, idx) => (
                    <div key={idx} 
                    onClick={() => setSelectedAlert(alert)}
                    className="bg-red-500 text-white p-4 rounded-xl shadow-lg flex gap-3 animate-pulse cursor-pointer hover:shadow-md transition-all active:scale-95">
                      <AlertTriangle className="shrink-0" size={24} />
                      <div>
                        <h3 className="font-bold text-lg leading-tight">{alert.Title}</h3>
                        <p className="text-red-50 text-sm mt-1">{alert.Summary}</p>
                        {alert.Source_URL && (
                          <a href={alert.Source_URL} target="_blank" className="inline-block mt-2 text-xs bg-white/20 px-2 py-1 rounded hover:bg-white/30 transition">
                            查看詳情 →
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* 🟡 Level 2: 置頂消息區 (有資料才顯示) */}
              {pinnedNews.length > 0 && (
                <div className="space-y-2">
                  <h2 className="text-sm font-bold text-gray-400 ml-1 uppercase tracking-wider flex items-center gap-1">
                    <Bell size={14} /> Pinned Updates
                  </h2>
                  {pinnedNews.map((news, idx) => (
                    <div key={idx} 
                    onClick={() => setSelectedAlert(news)}
                    className="bg-blue-50 border border-blue-100 p-4 rounded-xl shadow-sm cursor-pointer hover:shadow-md hover:bg-blue-100/50 transition-all active:scale-95"
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="bg-blue-200 text-blue-700 text-[10px] px-2 py-0.5 rounded-full font-bold">
                          {news.Topic}
                        </span>
                        <span className="text-xs text-blue-400">{news.Date.split('T')[0]}</span>
                      </div>
                      <h3 className="font-bold text-gray-800 text-lg">{news.Title}</h3>
                      <p className="text-gray-600 text-sm mt-1 line-clamp-2">{news.Summary}</p>
                      {news.Action && (
                         <div className="mt-3 pt-3 border-t border-blue-100 text-blue-600 text-sm font-medium flex items-center gap-1">
                           {news.Action} <ChevronRight size={14} />
                         </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* ⚪ Level 1: 一般動態 (原本的 Feed) */}
              <div className="space-y-2">
                <h2 className="text-sm font-bold text-gray-400 ml-1 uppercase tracking-wider cursor-pointer hover:shadow-md transition-all active:scale-95">
                   Latest Feed
                </h2>
                {/* 這裡直接用原本的 NewsFeed，但只傳入一般新聞 */}
                <NewsFeed newsData={normalNews} />
              </div>

            </div>
          </div>
        )}

        {/* --- 2. 指南 (Guide) --- */}
        {currentTab === "guide" && <GuideView />}

        {/* --- 3. 傳送門 (Portal) --- */}
        {currentTab === "portal" && <PortalView />} 
      </div>

      <BottomNav currentTab={currentTab} onTabChange={setCurrentTab} />
      {/* 👇👇👇 就是這裡！放在最後面 👇👇👇 */}
      {selectedAlert && (
        <NewsDetailModal 
          news={selectedAlert} 
          onClose={() => setSelectedAlert(null)} 
        />
      )}

    </>
  );
}