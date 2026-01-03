"use client";

import React from "react";
// 引入 Rocket (火箭) 代表傳送門，若喜歡別的也可以換 LayoutGrid
import { Home, BookOpen, Rocket } from "lucide-react";

// === 修改這裡：改成 3 個 Tab ===
const tabs = [
  { id: "home", label: "首頁", icon: Home },
  { id: "guide", label: "指南", icon: BookOpen },
  { id: "portal", label: "傳送門", icon: Rocket }, 
];

type BottomNavProps = {
  currentTab: string;
  onTabChange: (tabId: string) => void;
};

export default function BottomNav({ currentTab, onTabChange }: BottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-[env(safe-area-inset-bottom)] z-50">
      {/* grid-cols-3 讓三個按鈕平分寬度 */}
      <div className="grid grid-cols-3 h-16">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
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