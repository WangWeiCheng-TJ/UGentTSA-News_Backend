import React from "react";
import Link from "next/link";

// 定義神秘項目的型別
interface MysteryItem {
  id: string;
  img: string;
  emoji: string;
}

export default function FaithMysteryPage() {
  const mysteries: MysteryItem[] = [
    { id: 'muyu', img: '/imgs/mystery-1.webp', emoji: '🙏' },
    { id: 'wheel', img: '/imgs/mystery-2.webp', emoji: '🌀' },
    { id: 'talisman', img: '/imgs/mystery-3.webp', emoji: '🕯️' },
    { id: 'kuaikuai', img: '/imgs/mystery-4.webp', emoji: '🟢' }
  ];

  return (
    <div className="min-h-screen bg-stone-900 flex flex-col items-center justify-center p-8">
      <div className="text-center mb-12">
        <h2 className="text-stone-500 text-xs tracking-[0.3em] uppercase">Mental Health Center</h2>
        <div className="h-px w-8 bg-stone-800 mx-auto mt-4"></div>
      </div>

      <div className="grid grid-cols-2 gap-6 w-full max-w-sm">
        {mysteries.map((item) => (
          <Link 
            href={`/guide/faith/${item.id}`} 
            key={item.id}
            className="aspect-square bg-stone-800/50 rounded-3xl overflow-hidden border border-stone-800 active:scale-95 transition-all shadow-2xl flex items-center justify-center group relative"
          >
            {/* 提示 Emoji - 平時透明度低，Hover 或觸碰時變亮 */}
            <span className="text-4xl z-10 opacity-40 group-hover:opacity-100 transition-opacity">
              {item.emoji}
            </span>
            
            {/* 背景圖 (Future Work: 你之後可以換成神秘感十足的圖片) */}
            <div className="absolute inset-0 bg-gradient-to-br from-stone-800 to-black opacity-50"></div>
          </Link>
        ))}
      </div>

      <p className="mt-16 text-stone-700 text-[10px] tracking-[0.4em] font-light">
        BELIEVE IN SOMETHING
      </p>

      {/* 返回上一頁的簡單按鈕 */}
      <Link 
        href="/guide" 
        className="mt-8 text-stone-500 text-xs hover:text-stone-300 transition-colors"
      >
        ← Back to Reality
      </Link>
    </div>
  );
}