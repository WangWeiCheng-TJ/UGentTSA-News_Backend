import React from 'react';

// 模擬新聞資料 (之後會接上 Google Sheets)
const mockNews = [
  {
    id: 1,
    date: '2024-01-03',
    title: 'De Lijn 司機突發性罷工',
    summary: '根特市中心公車與電車服務全面中斷，建議改騎腳踏車。預計持續至今日晚間。',
    level: 3, // 3=紅色警戒
    tag: '交通'
  },
  {
    id: 2,
    date: '2024-01-02',
    title: 'Korenmarkt 周末二手市集',
    summary: '本周六日在市中心廣場舉辦大型古著市集，憑學生證可享攤位折扣。',
    level: 2, // 2=黃色實用
    tag: '活動'
  },
  {
    id: 3,
    date: '2024-01-01',
    title: '垃圾回收規則變更',
    summary: '從下個月開始，PMD 藍色袋子可以丟更多種類的塑膠包裝了。',
    level: 1, // 1=綠色通知
    tag: '市政'
  }
];

// 等級顏色對照表
const getLevelColor = (level: number) => {
  switch (level) {
    case 3: return 'bg-red-100 text-red-800 border-red-200';
    case 2: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    default: return 'bg-green-100 text-green-800 border-green-200';
  }
};

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 pb-10">
      {/* 頂部導航列 */}
      <nav className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800">
            🇧🇪 根特生存指南
          </h1>
          <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-500">
            Beta
          </span>
        </div>
      </nav>

      {/* 新聞列表區 */}
      <div className="max-w-md mx-auto px-4 mt-6 space-y-4">
        <div className="text-sm text-gray-500 mb-2 pl-1">最新情報 (Demo)</div>
        
        {mockNews.map((news) => (
          <article 
            key={news.id} 
            className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 transition-all active:scale-95"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-0.5 rounded border ${getLevelColor(news.level)}`}>
                  Lv.{news.level}
                </span>
                <span className="text-xs text-gray-400 font-mono">
                  {news.date}
                </span>
              </div>
              <span className="text-xs text-gray-400">#{news.tag}</span>
            </div>
            
            <h2 className="text-lg font-bold text-gray-800 mb-2 leading-tight">
              {news.title}
            </h2>
            
            <p className="text-gray-600 text-sm leading-relaxed">
              {news.summary}
            </p>
          </article>
        ))}
      </div>

      {/* 底部 Footer */}
      <footer className="mt-12 text-center text-xs text-gray-400 pb-8">
        <p>UGent TSA</p>
        <p className="mt-1">Built with Next.js & Python</p>
      </footer>
    </main>
  );
}