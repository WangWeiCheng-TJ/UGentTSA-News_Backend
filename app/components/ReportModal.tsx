"use client";

import React from "react";
import { X, Mail, FileText, AlertTriangle } from "lucide-react"; // 記得引入這些 icon

type Props = {
  onClose: () => void;
};

export default function ReportModal({ onClose }: Props) {
  return (
    <div 
      className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* 1. Header: 標題與關閉按鈕 */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900">聯絡與回報</h3>
            <p className="text-sm text-gray-500 mt-1">
              有任何建議或發現 Bug？歡迎告訴我們！
            </p>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* 2. Body: 把你的按鈕區塊搬過來 (微調了 margin) */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          
          {/* A. 聯絡 Email */}
          <a 
            href="mailto:ghent.tsa@gmail.com?subject=[TSA App] 聯絡事項"
            className="bg-gray-50 border border-gray-100 p-4 rounded-xl flex flex-col items-center justify-center gap-2 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-all active:scale-95 text-center group"
          >
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-400 shadow-sm group-hover:text-blue-600 transition-colors">
              <Mail size={20} />
            </div>
            <div>
              <div className="font-bold text-gray-700 text-xs group-hover:text-blue-700">聯絡我們</div>
              <div className="text-[10px] text-gray-400">Email Contact</div>
            </div>
          </a>

          {/* B. Google Form 回報 */}
          <a 
            href="https://docs.google.com/forms/d/e/1FAIpQLSdLGVjrp5DncfuCRb1P1AEPqNJU-vo8ALIfXfP1Zp8S5fbBBg/viewform?usp=header"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-50 border border-gray-100 p-4 rounded-xl flex flex-col items-center justify-center gap-2 hover:bg-green-50 hover:border-green-200 hover:text-green-600 transition-all active:scale-95 text-center group"
          >
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-400 shadow-sm group-hover:text-green-600 transition-colors">
              <FileText size={20} />
            </div>
            <div>
              <div className="font-bold text-gray-700 text-xs group-hover:text-green-700">問題回報</div>
              <div className="text-[10px] text-gray-400">Google Form</div>
            </div>
          </a>

        </div>

        {/* 3. Footer: 緊急提醒 (保留這個比較貼心) */}
        <div className="bg-orange-50 p-3 rounded-lg border border-orange-100 flex gap-3 items-start">
          <AlertTriangle size={16} className="text-orange-500 shrink-0 mt-0.5" />
          <p className="text-xs text-orange-700/80 leading-relaxed">
            若發生<strong>緊急狀況 (如 112、Card Stop)</strong>，請直接使用電話撥打，勿依賴此表單。
          </p>
        </div>

      </div>
    </div>
  );
}