"use client";

import React, { useState } from "react";
// 👇 引入剛剛拆出去的 Modal 和 工具函式
import NewsDetailModal, { getLevelStyle, NewsItem } from "./NewsDetailModal";

export default function NewsFeed({ newsData }: { newsData: NewsItem[] }) {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  // 排序與篩選邏輯 (維持你原本寫的，很棒！)
  const sortedNews = [...newsData].sort((a, b) => {
    return new Date(b.Date).getTime() - new Date(a.Date).getTime();
  });

  const recentNews = sortedNews.filter((item) => {
    const newsDate = new Date(item.Date);
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - 5);
    return newsDate >= cutoffDate;
  });

  const displayNews = recentNews.length > 0 ? recentNews : sortedNews.slice(0, 5);

  return (
    <>
      <div className="w-full space-y-4">
        {displayNews.map((news, index) => (
          <div
            key={index}
            onClick={() => setSelectedNews(news)}
            className="cursor-pointer block bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all active:scale-95"
          >
            <div className="flex justify-between items-start mb-2">
              {/* 這裡使用 import 進來的 getLevelStyle */}
              <span className={`text-xs font-bold px-2 py-1 rounded-md ${getLevelStyle(news.Level)}`}>
                {news.Level}
              </span>
              <div className="text-right">
                <span className="text-xs text-gray-400 block">{news.Date.split('T')[0]}</span>
                <span className="text-xs text-blue-500 font-medium">#{news.Topic}</span>
              </div>
            </div>

            <h3 className="text-lg font-bold text-gray-800 mb-1 leading-tight">
              {news.Title}
            </h3>
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

      {/* 👇 直接使用共用的 Modal */}
      {selectedNews && (
        <NewsDetailModal 
          news={selectedNews} 
          onClose={() => setSelectedNews(null)} 
        />
      )}
    </>
  );
}