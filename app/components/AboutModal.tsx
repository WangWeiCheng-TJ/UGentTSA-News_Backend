"use client";

import React from "react";
import Image from "next/image";
import { X, Github, Mail, Coffee, FileText } from "lucide-react";

type Props = {
  onClose: () => void;
};

export default function AboutModal({ onClose }: Props) {
  return (
    <div 
      className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-blue-600 p-6 text-center text-white relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 rounded-full p-1"
          >
            <X size={20} />
          </button>
          
          <div className="w-20 h-20 bg-white rounded-full mx-auto mb-3 shadow-lg relative overflow-hidden border-4 border-blue-500/30">
            <Image 
              src="/logo_v3.png" 
              alt="TSA Logo"
              fill
              className="object-cover" // 如果 Logo 是圓形滿版用 cover，如果是長方形怕被切用 contain
              sizes="80px"
            />
          </div>
          <h2 className="text-xl font-bold">根特生存指南</h2>
          <p className="text-blue-100 text-sm">UGent TSA Official App</p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          
          {/* 1. 開發團隊 */}
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
              The Team
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs">👨‍💻</div>
                <div>
                  <p className="text-sm font-bold text-gray-800">開發者</p>
                  <p className="text-xs text-gray-500">dr. Wei-Cheng Wang 王偉丞</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs">📝</div>
                <div>
                  <p className="text-sm font-bold text-gray-800">內容維護</p>
                  <p className="text-xs text-gray-500">UGent TSA 團隊</p>
                </div>
              </div>
            </div>
          </div>

          {/* 2. 聯絡與回饋 */}
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
              Contact & Feedback
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <a 
                href="mailto:ghent.tsa@gmail.com?cc=tienjiwang@gmail.com&subject=[TSA App] 意見回饋&body=你好，我想回報關於 App 的問題："
                className="flex flex-col items-center justify-center p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors border border-gray-100"
              >
                <Mail size={20} className="text-gray-600 mb-1" />
                <span className="text-xs font-medium text-gray-600">聯絡我們</span>
              </a>
              <a 
                href="https://docs.google.com/forms/d/e/1FAIpQLSdLGVjrp5DncfuCRb1P1AEPqNJU-vo8ALIfXfP1Zp8S5fbBBg/viewform?usp=header" // 建議放 Google Form 連結
                target="_blank"
                className="flex flex-col items-center justify-center p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors border border-gray-100"
              >
                <FileText size={20} className="text-gray-600 mb-1" />
                <span className="text-xs font-medium text-gray-600">回報問題(Google表單)</span>
              </a>
            </div>
          </div>

          {/* 3. 版本資訊 (這裡就是你的開發日誌) */}
          <div className="pt-4 border-t border-gray-100 text-center">
             <p className="text-xs text-gray-400 font-mono mb-1">Current Version: v1.0.0</p>
             <p className="text-[10px] text-gray-300">
               Last updated: 2026-01-03
             </p>
          </div>

        </div>
      </div>
    </div>
  );
}