import React from "react";
import Link from "next/link";
import { getGuides } from "@/lib/api"; // 👈 從剛剛建好的共用檔引入
import { ArrowLeft, Tag } from "lucide-react";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ tag: string }>;
};

export default async function TagPage({ params }: Props) {
  // 1. 解碼網址參數 (例如把 "%E9%8A%80%E8%A1%8C" 轉回 "銀行")
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);

  // 2. 抓全部資料
  const guides = await getGuides();

  // 3. 篩選資料 (只要 tags 欄位包含這個標籤的)
  const relatedGuides = guides.filter((g) => 
    g.tags && g.tags.includes(decodedTag)
  );

  // 如果完全沒這個標籤的資料，也可以選擇顯示 "查無資料" 的畫面
  if (relatedGuides.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center justify-center space-y-4">
        <p className="text-gray-500">找不到關於「{decodedTag}」的文章</p>
        <Link href="/?tab=guide" className="text-blue-600 hover:underline">
          回指南列表
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* 頂部導航 */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-10 px-4 py-3 flex items-center gap-3">
        <Link href="/?tab=guide" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft size={20} className="text-gray-600" />
        </Link>
        <div className="flex items-center gap-2 text-gray-800 font-semibold">
          <Tag size={18} className="text-blue-600" />
          <span>#{decodedTag}</span>
        </div>
      </div>

      {/* 文章列表 */}
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        <p className="text-sm text-gray-500 ml-1">
          找到 {relatedGuides.length} 篇相關文章：
        </p>

        {relatedGuides.map((guide) => (
          <Link 
            key={guide.id} 
            href={`/guide/${guide.id}`}
            className="block bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow active:scale-[0.98] transition-transform"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-1">
                  {guide.title}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {/* 取出文章前幾句話當簡介 */}
                  {guide.content.slice(0, 60).replace(/[#*]/g, '')}...
                </p>
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              {/* 顯示該文章的其他 Tag */}
              {guide.tags.split(',').slice(0, 3).map((t, i) => (
                <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                  #{t.trim()}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}