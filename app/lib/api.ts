// lib/api.ts

// 這裡填入你的 Google Script API 網址 (指南專用那個，或是有判斷 type 的那個)
const API_URL = "https://script.google.com/macros/s/AKfycbxwQDho31iu9GvwTiG3NeXbOZn1-9U60HY_2MzUkjp0hmYsZ2FnU8yw7UDQncV06Qf5/exec"; 

export type SheetGuideArticle = {
  id: string;
  category: string;
  title: string;
  content: string;
  last_updated: string;
  author: string;
  tags: string;
};

// 共用的抓取函式
export async function getGuides(): Promise<SheetGuideArticle[]> {
  try {
    // 記得確認你的 Script 是否需要 ?type=guide
    const res = await fetch(`${API_URL}?type=guide`, { 
      next: { revalidate: 60 } 
    });
    if (!res.ok) throw new Error("Fetch failed");
    return res.json();
  } catch (error) {
    console.error("Error fetching guides:", error);
    return [];
  }
}