import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, Calendar, User } from "lucide-react";
// 👇 改從這裡引入，程式碼變乾淨了！
import { getGuides } from "@/lib/api"; 

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  
  // 使用共用函式
  const guides = await getGuides();
  const article = guides.find((g) => g.id === slug);

  if (!article) return notFound();

  // 日期格式化
  const formatDate = (dateString: string) => {
    if (!dateString) return "未知日期";
    return dateString.split('T')[0]; 
  };

  const tagsArray = article.tags ? article.tags.split(',') : [];

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* 頂部導航 (不變) */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-10 px-4 py-3 flex items-center gap-3">
        <Link href="/?tab=guide" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft size={20} className="text-gray-600" />
        </Link>
        <span className="font-semibold text-gray-800 truncate">{article.title}</span>
      </div>

      <div className="max-w-2xl mx-auto px-5 py-8">
        
        {/* 👇👇👇 重點修改：Tags 變成連結 👇👇👇 */}
        {tagsArray.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tagsArray.map((tag, index) => (
              <Link 
                key={index} 
                // 這裡會連到我們剛剛做的 Step 2 頁面
                href={`/guide/tag/${tag.trim()}`}
                className="px-2 py-1 text-xs font-medium bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
              >
                #{tag.trim()}
              </Link>
            ))}
          </div>
        )}

        {/* 標題與內文 (不變) */}
        <div className="mb-8 space-y-4">
          <h1 className="text-3xl font-bold text-gray-900 leading-tight">
            {article.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1.5">
              <Calendar size={14} />
              <span>{formatDate(article.last_updated)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <User size={14} />
              <span>{article.author}</span>
            </div>
          </div>
        </div>

        <article className="prose prose-lg prose-blue max-w-none prose-headings:font-bold prose-headings:text-gray-800 prose-p:text-gray-600 prose-li:text-gray-600">
          <ReactMarkdown>
            {article.content.replace(/\\n/g, '\n')}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  );
}