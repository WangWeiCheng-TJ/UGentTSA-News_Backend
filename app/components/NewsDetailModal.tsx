"use client";

import React from "react";

// 定義跟 MainView 一樣的型別，方便共用
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

type Props = {
  news: NewsItem;
  onClose: () => void;
};

// 🛠️ 把這個好用的工具函式 export 出去，讓大家都能用
export const getLevelStyle = (level: string | number) => {
  const levelStr = String(level);
  if (levelStr === "3" || levelStr.includes("Lv.3")) {
    return "bg-red-100 text-red-800 border-red-200";
  }
  if (levelStr === "2" || levelStr.includes("Lv.2")) {
    return "bg-yellow-100 text-yellow-800 border-yellow-200";
  }
  return "bg-green-100 text-green-800 border-green-200";
};

// 這是你原本寫好的 Modal，原封不動搬過來
export default function NewsDetailModal({ news, onClose }: Props) {
  return (
    <div 
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 視窗頭部 */}
        <div className="sticky top-0 bg-white/95 backdrop-blur border-b p-4 flex justify-between items-center z-10">
          <span className={`text-xs font-bold px-2 py-1 rounded-md ${getLevelStyle(news.Level)}`}>
            {news.Level}
          </span>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* 視窗內容 */}
        <div className="p-6">
          <div className="mb-4">
             <span className="text-sm text-blue-600 font-medium mr-2">#{news.Topic}</span>
             <span className="text-sm text-gray-400">{news.Date.split('T')[0]}</span>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{news.Title}</h2>
          
          <div className="prose prose-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
            {news.Summary}
          </div>

          {news.Action && (
             <div className="mt-6 bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                <p className="text-xs text-yellow-600 font-bold uppercase mb-1">建議行動</p>
                <p className="text-sm text-gray-800 font-medium">{news.Action}</p>
             </div>
          )}
        </div>

        {/* 視窗底部按鈕 */}
        <div className="p-4 border-t bg-gray-50 rounded-b-2xl sticky bottom-0">
          <a
            href={news.Source_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-lg shadow-blue-200"
          >
            閱讀原文 / 詳細資訊 🔗
          </a>
        </div>
      </div>
    </div>
  );
}