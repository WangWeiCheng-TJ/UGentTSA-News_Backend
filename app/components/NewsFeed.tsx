"use client"; // 👈 這行很重要，代表這是會在瀏覽器執行的互動組件

import React, { useState } from "react";

// 定義資料型態
type NewsItem = {
  Date: string;
  Level: string;
  Audience: string;
  Topic: string;
  Title: string;
  Summary: string;
  Action: string;
  Source_URL: string;
};

// 輔助函式：取得顏色樣式
const getLevelStyle = (level: string) => {
  if (level?.includes("Lv.3")) return "bg-red-100 text-red-800 border-red-200";
  if (level?.includes("Lv.2")) return "bg-yellow-100 text-yellow-800 border-yellow-200";
  return "bg-green-100 text-green-800 border-green-200";
};

export default function NewsFeed({ newsData }: { newsData: NewsItem[] }) {
  // 這裡是用來記錄「現在選中了哪一則新聞」，如果是 null 代表沒選
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  return (
    <>
      {/* === 新聞列表區 (卡片) === */}
      <div className="w-full max-w-md space-y-4">
        {newsData.map((news, index) => (
          <div
            key={index}
            onClick={() => setSelectedNews(news)} // 👈 點擊後，不跳轉，而是把這則新聞存起來
            className="cursor-pointer block bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all active:scale-95"
          >
            <div className="flex justify-between items-start mb-2">
              <span className={`text-xs font-bold px-2 py-1 rounded-md ${getLevelStyle(news.Level)}`}>
                {news.Level}
              </span>
              <div className="text-right">
                <span className="text-xs text-gray-400 block">{news.Date}</span>
                <span className="text-xs text-blue-500 font-medium">#{news.Topic}</span>
              </div>
            </div>

            <h3 className="text-lg font-bold text-gray-800 mb-1 leading-tight">
              {news.Title}
            </h3>
            {/* line-clamp-2 代表超過兩行就變 ... */}
            <p className="text-sm text-gray-600 line-clamp-2">{news.Summary}</p>

            {news.Action && (
              <div className="mt-3 pt-3 border-t border-gray-50 flex justify-between items-center">
                <span className="text-xs text-gray-400">建議行動：</span>
                <span className="text-xs font-bold text-gray-700 bg-gray-50 px-2 py-1 rounded">
                  {news.Action}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* === 詳情視窗 (Modal / Popup) === */}
      {selectedNews && (
        <div 
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setSelectedNews(null)} // 點擊背景關閉
        >
          {/* 視窗本體 */}
          <div 
            className="bg-white rounded-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()} // 點擊內容不關閉
          >
            {/* 視窗頭部 */}
            <div className="sticky top-0 bg-white/95 backdrop-blur border-b p-4 flex justify-between items-center">
              <span className={`text-xs font-bold px-2 py-1 rounded-md ${getLevelStyle(selectedNews.Level)}`}>
                {selectedNews.Level}
              </span>
              <button 
                onClick={() => setSelectedNews(null)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200"
              >
                ✕
              </button>
            </div>

            {/* 視窗內容 */}
            <div className="p-6">
              <div className="mb-4">
                 <span className="text-sm text-blue-600 font-medium mr-2">#{selectedNews.Topic}</span>
                 <span className="text-sm text-gray-400">{selectedNews.Date}</span>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{selectedNews.Title}</h2>
              
              <div className="prose prose-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                {selectedNews.Summary}
              </div>

              {selectedNews.Action && (
                 <div className="mt-6 bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                    <p className="text-xs text-yellow-600 font-bold uppercase mb-1">建議行動</p>
                    <p className="text-sm text-gray-800 font-medium">{selectedNews.Action}</p>
                 </div>
              )}
            </div>

            {/* 視窗底部按鈕 */}
            <div className="p-4 border-t bg-gray-50 rounded-b-2xl sticky bottom-0">
              <a
                href={selectedNews.Source_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-lg shadow-blue-200"
              >
                閱讀原文 / 詳細資訊 🔗
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}