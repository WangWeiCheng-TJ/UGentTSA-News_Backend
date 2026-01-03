import React from "react";
import NewsFeed from "@/components/NewsFeed"; // 引入剛剛做的組件

// 設定 API URL
const API_URL =
  "https://script.google.com/macros/s/AKfycbxwQDho31iu9GvwTiG3NeXbOZn1-9U60HY_2MzUkjp0hmYsZ2FnU8yw7UDQncV06Qf5/exec";

async function getNews() {
  try {
    // 記得這裡是 ISR 60秒更新
    const res = await fetch(API_URL, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error("Failed");
    return res.json();
  } catch (error) {
    return [];
  }
}

export default async function Home() {
  const newsData = await getNews();

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      {/* 標題區 */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          🇧🇪 根特生存指南
        </h1>
        <span className="inline-block bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">
          Live Data
        </span>
      </div>

      <div className="w-full max-w-md">
         <h2 className="text-sm font-medium text-gray-500 mb-4 ml-1">
          最新情報
        </h2>
        
        {/* 如果沒資料 */}
        {newsData.length === 0 && (
          <div className="text-center text-gray-400 py-10">
            載入中或無資料... 🐢
          </div>
        )}

        {/* 這裡我們不自己跑迴圈，而是交給 NewsFeed 組件處理 */}
        <NewsFeed newsData={newsData} />
      </div>

      {/* 頁尾 */}
      <footer className="mt-12 text-center pb-8">
        <p className="text-xs text-gray-400">UGent TSA x Ghent Land God 🏮</p>
      </footer>
    </main>
  );
}