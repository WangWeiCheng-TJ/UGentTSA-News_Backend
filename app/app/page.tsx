import React from "react";
import MainView, { NewsItem } from "@/components/MainView"; // 👈 關鍵：引入 MainView

// 設定 API URL
const API_URL =
  "https://script.google.com/macros/s/AKfycbxwQDho31iu9GvwTiG3NeXbOZn1-9U60HY_2MzUkjp0hmYsZ2FnU8yw7UDQncV06Qf5/exec";
// === Server Side Fetching (這是在伺服器跑的) ===
async function getNews() {
  try {
    // ✅ 恢復了 ISR 60秒更新！Vercel 伺服器會幫你擋流量，每分鐘才去煩 Google 一次
    const res = await fetch(API_URL, { next: { revalidate: 60 } });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
}

// === 主頁面 (Server Component) ===
// 這裡沒有 "use client"，所以它是伺服器組件
export default async function Home() {
  // 1. 在伺服器端抓好資料 (每60秒一次)
  const newsData: NewsItem[] = await getNews();

  // 2. 把抓到的資料 (newsData) 傳給負責顯示與互動的 MainView
  return (
    <main className="min-h-screen bg-gray-50 pb-24 text-gray-900">
      <MainView initialNewsData={newsData} />
    </main>
  );
}