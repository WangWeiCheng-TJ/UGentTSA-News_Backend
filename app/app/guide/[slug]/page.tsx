import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, Calendar, User } from "lucide-react";

// Google Script API 網址 (維持你原本的)
const API_URL = "https://script.google.com/macros/s/AKfycbxwQDho31iu9GvwTiG3NeXbOZn1-9U60HY_2MzUkjp0hmYsZ2FnU8yw7UDQncV06Qf5/exec";

type SheetGuideArticle = {
  id: string;
  category: string;
  title: string;
  content: string;
  last_updated: string;
  author: string;
  tags: string;
};

async function getGuides(): Promise<SheetGuideArticle[]> {
  try {
    const res = await fetch(`${API_URL}?type=guide`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error("Fetch failed");
    return res.json();
  } catch (error) {
    console.error("Error fetching guides:", error);
    return [];
  }
}

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const guides = await getGuides();
  const article = guides.find((g) => g.id === slug);

  if (!article) return notFound();

  const tagsArray = article.tags ? article.tags.split(',') : [];

  // 🛠️ 新增：日期格式化小幫手
  // 把 "2025-01-26T23:00..." 切割成 "2025-01-26"
  const formatDate = (dateString: string) => {
    if (!dateString) return "未知日期";
    return dateString.split('T')[0]; 
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* 頂部導航 */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-10 px-4 py-3 flex items-center gap-3">
        <Link href="/?tab=guide" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft size={20} className="text-gray-600" />
        </Link>
        <span className="font-semibold text-gray-800 truncate">{article.title}</span>
      </div>

      <div className="max-w-2xl mx-auto px-5 py-8">
        {/* Tags */}
        {tagsArray.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tagsArray.map((tag, index) => (
              <span key={index} className="px-2 py-1 text-xs font-medium bg-blue-50 text-blue-600 rounded-md">
                #{tag.trim()}
              </span>
            ))}
          </div>
        )}

        {/* 標題與資訊 */}
        <div className="mb-8 space-y-4">
          <h1 className="text-3xl font-bold text-gray-900 leading-tight">
            {article.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1.5">
              <Calendar size={14} />
              {/* 👇 使用格式化後的日期 */}
              <span>{formatDate(article.last_updated)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <User size={14} />
              <span>{article.author}</span>
            </div>
          </div>
        </div>

        {/* Markdown 內容區 */}
        {/* prose: 啟用排版插件
            prose-lg: 字體加大
            prose-blue: 連結變成藍色
            prose-headings:text-gray-800: 強制標題顏色
            prose-ul:list-disc: 強制清單要有圓點
        */}
        <article className="prose prose-lg prose-blue max-w-none 
          prose-headings:font-bold prose-headings:text-gray-800 
          prose-p:text-gray-600 prose-li:text-gray-600">
          <ReactMarkdown>
            {/* 這裡確保 Google Sheets 的換行能被正確解析 */}
            {article.content.replace(/\\n/g, '\n')}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  );
}