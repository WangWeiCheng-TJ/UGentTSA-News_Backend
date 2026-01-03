"use client";

import React from "react";
import { Home, BookOpen, MapPin, Menu } from "lucide-react";

// 定義導航項目
const tabs = [
  { id: "home", label: "首頁", icon: Home },
  { id: "guide", label: "指南", icon: BookOpen },
  { id: "map", label: "地圖", icon: MapPin },
  { id: "more", label: "更多", icon: Menu },
];

type BottomNavProps = {
  currentTab: string;
  onTabChange: (tabId: string) => void;
};

export default function BottomNav({ currentTab, onTabChange }: BottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-[env(safe-area-inset-bottom)] z-50">
      <div className="flex justify-around items-center h-16">
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