import React from "react";

// 定義新聞的資料格式 (對應你的 Google Sheet 欄位)
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

// 設定你的 Google Apps Script 網址 (請確認這是最新佈署的版本)
const API_URL =
  "https://script.google.com/macros/s/AKfycbxwQDho31iu9GvwTiG3NeXbOZn1-9U60HY_2MzUkjp0hmYsZ2FnU8yw7UDQncV06Qf5/exec";

// 這是 Next.js 的新功能：直接在 Server Component 裡面拿資料
async function getNews() {
  try {
    // next: { revalidate: 0 } 代表「不要快取」，每次重新整理都抓最新的
    const res = await fetch(API_URL, { next: { revalidate: 0 } });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
}

export default async function Home() {
  // 1. 在伺服器端抓取資料
  const newsData: NewsItem[] = await getNews();

  // 2. 顏色判斷邏輯
  const getLevelStyle = (level: string) => {
    if (level?.includes("Lv.3")) return "bg-red-100 text-red-800 border-red-200";
    if (level?.includes("Lv.2")) return "bg-yellow-100 text-yellow-800 border-yellow-200";
    return "bg-green-100 text-green-800 border-green-200";
  };

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

      {/* 新聞列表區 */}
      <div className="w-full max-w-md space-y-4">
        <h2 className="text-sm font-medium text-gray-500 mb-4 ml-1">
          最新情報 (從 Google Sheet 讀取)
        </h2>

        {/* 如果沒資料顯示的畫面 */}
        {newsData.length === 0 && (
          <div className="text-center text-gray-400 py-10">
            目前沒有新聞，或是讀取失敗... 🐢
          </div>
        )}

        {/* 跑迴圈把每一則新聞印出來 */}
        {newsData.map((news, index) => (
          <a
            key={index}
            href={news.Source_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow active:scale-95"
          >
            <div className="flex justify-between items-start mb-2">
              {/* 左上角：等級標籤 */}
              <span
                className={`text-xs font-bold px-2 py-1 rounded-md ${getLevelStyle(
                  news.Level
                )}`}
              >
                {news.Level}
              </span>
              {/* 右上角：受眾與日期 */}
              <div className="text-right">
                <span className="text-xs text-gray-400 block">{news.Date}</span>
                <span className="text-xs text-blue-500 font-medium">
                  #{news.Topic}
                </span>
              </div>
            </div>

            {/* 中間：標題與內容 */}
            <h3 className="text-lg font-bold text-gray-800 mb-1 leading-tight">
              {news.Title}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2">{news.Summary}</p>

            {/* 下方：行動呼籲 */}
            {news.Action && (
              <div className="mt-3 pt-3 border-t border-gray-50 flex justify-between items-center">
                <span className="text-xs text-gray-400">建議行動：</span>
                <span className="text-xs font-bold text-gray-700 bg-gray-50 px-2 py-1 rounded">
                  {news.Action}
                </span>
              </div>
            )}
          </a>
        ))}
      </div>

      {/* 頁尾 */}
      <footer className="mt-12 text-center">
        <p className="text-xs text-gray-400">
          UGent TSA x Ghent Land God 🏮
        </p>
        <p className="text-[10px] text-gray-300 mt-1">
          Built with Next.js & Google Sheets
        </p>
      </footer>
    </main>
  );
}