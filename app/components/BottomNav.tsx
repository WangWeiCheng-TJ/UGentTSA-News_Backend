"use client";

import React from "react";
// 引入 Bug 圖示
import { Home, BookOpen, Rocket, Bug } from "lucide-react";

// === 修改 1：改成 4 個 Tab (加入回報) ===
const tabs = [
  { id: "home", label: "首頁", icon: Home },
  { id: "guide", label: "指南", icon: BookOpen },
  { id: "portal", label: "傳送門", icon: Rocket },
  { id: "report", label: "回報", icon: Bug }, // 👈 新增這顆
];

type BottomNavProps = {
  currentTab: string;
  onTabChange: (tabId: string) => void;
  onReportClick: () => void; // 👈 修改 2：新增這個 callback
};

export default function BottomNav({ currentTab, onTabChange, onReportClick }: BottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-[env(safe-area-inset-bottom)] z-50">
      
      {/* 修改 3：grid-cols-3 改成 grid-cols-4 讓四顆平分 */}
      <div className="grid grid-cols-4 h-16">
        
        {tabs.map((tab) => {
          const Icon = tab.icon;
          // Report 按鈕永遠不會是 "Active" (因為它只是彈窗，不切換頁面)
          const isReport = tab.id === "report";
          const isActive = currentTab === tab.id && !isReport;
          
          return (
            <button
              key={tab.id}
              onClick={() => {
                // 👇 關鍵邏輯：如果是回報，執行 onReportClick；否則切換分頁
                if (isReport) {
                  onReportClick();
                } else {
                  onTabChange(tab.id);
                }
              }}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors duration-200 ${
                isActive 
                  ? "text-blue-600" 
                  : "text-gray-400 hover:text-gray-600 active:text-gray-500"
              }`}
            >
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className={`text-[10px] font-medium ${isActive ? "font-bold" : ""}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}