"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

// 引入元件
import BottomNav from "@/components/BottomNav";
import NewsFeed from "@/components/NewsFeed";
import NewsDetailModal from "@/components/NewsDetailModal";
import PortalView from "@/components/PortalView";
import AboutModal from "@/components/AboutModal";
import ReportModal from "@/components/ReportModal";
import { guideData } from "@/config/guideData"; 

// 引入圖示
import { 
  ChevronRight, 
  AlertTriangle, 
  Bell, 
  Info,
  Mail,     // 聯絡按鈕用
  FileText  // 回報表單用
} from "lucide-react";

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

// === 子組件: 指南頁面 (GuideView) ===
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
          {/* 響應式 Grid: 手機單欄，電腦雙欄 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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

// === 主組件: MainView ===
export default function MainView({ 
  initialNewsData, 
  initialTab = "home" 
}: { 
  initialNewsData: NewsItem[], 
  initialTab?: string 
}) {
  
  // --- 狀態管理 ---
  const [currentTab, setCurrentTab] = useState(initialTab);
  const [selectedAlert, setSelectedAlert] = useState<NewsItem | null>(null); // 控制新聞詳情彈窗
  const [showAbout, setShowAbout] = useState(false); // 控制關於本站彈窗
  const [showReport, setShowReport] = useState(false);

  // --- 記憶分頁功能 (localStorage) ---
  useEffect(() => {
    if (initialTab === "home") {
      const savedTab = localStorage.getItem("tsa_active_tab");
      if (savedTab) {
        setCurrentTab(savedTab);
      }
    } else {
      localStorage.setItem("tsa_active_tab", initialTab);
    }
  }, [initialTab]); 

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
    localStorage.setItem("tsa_active_tab", tab);
  };

  // --- 新聞資料分級處理 ---
  // Level 3: 紅色警戒 (緊急)
  const redAlerts = initialNewsData.filter(item => String(item.Level) === "3");
  // Level 2: 藍色置頂 (重要)
  const pinnedNews = initialNewsData.filter(item => String(item.Level) === "2");
  // Level 1: 一般動態
  const normalNews = initialNewsData.filter(item => String(item.Level) === "1" || !item.Level);
  
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center">
      
      {/* --- 1. Header (只在首頁顯示) --- */}
      {currentTab === "home" && (
        <div className="w-full bg-white border-b border-gray-100 shadow-sm sticky top-0 z-30">
           {/* 限制 Header 寬度與 Main 一致 */}
           <div className="w-full md:max-w-2xl mx-auto px-4 py-3 flex justify-between items-center">
              {/* 左邊：Logo */}
              <div className="w-9 h-9 relative flex-shrink-0 overflow-hidden rounded-full border border-gray-100 shadow-sm">
                <Image 
                  src="/logo_v3.png" 
                  alt="TSA Logo"
                  fill
                  className="object-cover"
                  sizes="36px"
                />
              </div>

              {/* 中間：標題 */}
              <div className="text-center">
                <h1 className="text-xl font-bold text-gray-900">根特生存指南</h1>
                <div className="flex items-center justify-center gap-2 mt-0.5">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-[10px] text-gray-500">媽祖保佑中</span>
                </div>
              </div>

              {/* 右邊：About 按鈕 (包含免責、版本、GitHub) */}
              <button 
                onClick={() => setShowAbout(true)}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
              >
                <Info size={20} />
              </button>
           </div>
        </div>
      )}

      {/* --- 2. 主要內容區塊 (響應式寬度 md:max-w-2xl) --- */}
      <main className="w-full md:max-w-2xl bg-white min-h-screen shadow-lg relative flex flex-col transition-all duration-300">
        
        {/* === HOME 分頁 === */}
        {currentTab === "home" && (
          <div className="flex flex-col py-6 px-4 pb-24 flex-1">
            
            <div className="space-y-6">
              {/* 🔴 Level 3: 紅色警戒區 */}
              {redAlerts.length > 0 && (
                <div className="space-y-3">
                  {redAlerts.map((alert, idx) => (
                    <div key={idx} 
                      onClick={() => setSelectedAlert(alert)}
                      className="bg-red-500 text-white p-4 rounded-xl shadow-lg flex gap-3 animate-pulse cursor-pointer hover:shadow-md transition-all active:scale-95"
                    >
                      <AlertTriangle className="shrink-0" size={24} />
                      <div>
                        <h3 className="font-bold text-lg leading-tight">{alert.Title}</h3>
                        <p className="text-red-50 text-sm mt-1">{alert.Summary}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* 🟡 Level 2: 置頂消息區 */}
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

              {/* ⚪ Level 1: 一般動態 */}
              <div className="space-y-2">
                <h2 className="text-sm font-bold text-gray-400 ml-1 uppercase tracking-wider">Latest Feed</h2>
                <NewsFeed newsData={normalNews} />
              </div>
            </div>


            {/* 簡單 Footer (版權宣告) */}
            <div className="mt-8 pt-6 border-t border-gray-100 text-center pb-4 text-[10px] text-gray-300">
              © 2026 UGent TSA. All rights reserved.
            </div>

          </div>
        )}

        {/* === 其他分頁 (Guide / Portal) === */}
        {currentTab === "guide" && <GuideView />}
        {currentTab === "portal" && <PortalView />} 
      
      </main>

      {/* --- 3. 底部導航 --- */}
      <BottomNav 
        currentTab={currentTab} 
        onTabChange={handleTabChange} 
        onReportClick={() => setShowReport(true)} // 👈 這裡把開關接上去！
      />

      {/* --- 4. 彈窗組件 --- */}
      
      {/* 關於本站 */}
      {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}
      
      {/* 回報彈窗 (綁定 showReport) */}
      {showReport && <ReportModal onClose={() => setShowReport(false)} />}

      {/* 新聞詳情 */}
      {selectedAlert && (
        <NewsDetailModal 
          news={selectedAlert} 
          onClose={() => setSelectedAlert(null)} 
        />
      )}

    </div>
  );
}