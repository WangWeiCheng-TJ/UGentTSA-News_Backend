"use client";

import React from "react";
import Image from "next/image";
import { X, Mail, FileText, AlertCircle, GitCommit, ExternalLink } from "lucide-react"; // 引入 AlertCircle

type Props = {
  onClose: () => void;
};

export default function AboutModal({ onClose }: Props) {
  // 從環境變數讀取 (我們剛剛在 next.config.ts 設定的)
  const version = process.env.NEXT_PUBLIC_APP_VERSION || "1.0.0";
  const commitHash = process.env.NEXT_PUBLIC_GIT_HASH || "dev";
  
  // 請換成你的 GitHub 網址
  const githubRepoUrl = "https://github.com/WangWeiCheng-TJ/UGentTSA-SurviorKit";

  return (
    <div 
      className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 text-center text-white relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 rounded-full p-1 transition-colors"
          >
            <X size={20} />
          </button>
          
          <div className="w-20 h-20 bg-white rounded-full mx-auto mb-3 shadow-lg relative overflow-hidden border-4 border-blue-400/30">
            <Image 
              src="/logo_v3.png" 
              alt="TSA Logo"
              fill
              className="object-cover"
              sizes="80px"
            />
          </div>
          <h2 className="text-xl font-bold tracking-tight">根特生存指南</h2>
          <p className="text-blue-100 text-sm opacity-90">UGent TSA App (beta)</p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto"> {/* 如果內容太長可以捲動 */}
          
          {/* 1. 開發團隊 */}
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
              The Team
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-lg border border-gray-100/50">
                <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-xs">👨‍💻</div>
                <div>
                  <p className="text-sm font-bold text-gray-800">開發者</p>
                  <p className="text-xs text-gray-500">王偉丞</p>
                </div>
              </div>
             <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-lg border border-gray-100/50">
                <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-xs">👨‍💻</div>
                <div>
                  <p className="text-sm font-bold text-gray-800">內容提供</p>
                  <p className="text-xs text-gray-500">王偉丞、林經緯、蘇盟慧、羅傑、眾多前輩們</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-lg border border-gray-100/50">
                <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-xs">📝</div>
                <div>
                  <p className="text-sm font-bold text-gray-800">內容維護</p>
                  <p className="text-xs text-gray-500">UGent TSA 團隊</p>
                </div>
              </div>
            </div>
          </div>

          {/* 3. 免責聲明 (新增這段) */}
          <div className="bg-orange-50 p-3 rounded-lg border border-orange-100">
             <div className="flex gap-2 items-start">
               <AlertCircle size={14} className="text-orange-400 shrink-0 mt-0.5" />
               <div className="space-y-1">
                 <h4 className="text-xs font-bold text-orange-800">免責聲明 Disclaimer</h4>
                 <p className="text-[10px] text-orange-700/80 leading-relaxed">
                   本站資訊僅供參考，不代表官方立場。行政法規與即時資訊請以比利時官方公告為準。
                 </p>
               </div>
             </div>
          </div>

          {/* 3. 自動版本資訊 */}
          <div className="pt-4 border-t border-gray-100 flex flex-col items-center gap-2">
             <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-xs font-mono text-gray-500">
               <span>v{version}</span>
               <span className="text-gray-300">|</span>
               <a 
                 href={`${githubRepoUrl}/commit/${commitHash}`}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="flex items-center gap-1 hover:text-blue-600 hover:underline transition-colors"
                 title="查看 GitHub Commit"
               >
                 <GitCommit size={12} />
                 {commitHash}
                 <ExternalLink size={10} />
               </a>
             </div>
             <p className="text-[10px] text-gray-300">
               Build auto-generated from Git
             </p>
          </div>

        </div>
      </div>
    </div>
  );
}