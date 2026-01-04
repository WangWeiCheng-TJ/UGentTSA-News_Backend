import Link from 'next/link';

const FaithMysteryPage = () => {
  const mysteries = [
    { id: 'muyu', img: '/images/mystery-1.webp' }, // 可能是個木頭紋路
    { id: 'wheel', img: '/images/mystery-2.webp' }, // 可能是個螺旋圖騰
    { id: 'talisman', img: '/images/mystery-3.webp' }, // 可能是張黃色舊紙
    { id: 'kuaikuai', img: '/imgs/kuaikuai-green.webp' } // 可能是個綠色方塊
  ];

  return (
    <div className="min-h-screen bg-stone-900 flex flex-col items-center justify-center p-8">
      <div className="grid grid-cols-2 gap-6 w-full max-w-sm">
        {mysteries.map((item) => (
          <Link href={`/guide/faith/${item.id}`} key={item.id}
            className="aspect-square bg-stone-800 rounded-3xl overflow-hidden border border-stone-700 active:scale-90 transition-all shadow-2xl flex items-center justify-center group"
          >
            {/* 只有圖片，沒有文字 */}
            <img 
              src={item.img} 
              className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
              alt="?" 
            />
          </Link>
        ))}
      </div>
      <p className="mt-12 text-stone-600 text-[10px] tracking-[0.2em]">TOUCH TO EXPLORE</p>
    </div>
  );
};