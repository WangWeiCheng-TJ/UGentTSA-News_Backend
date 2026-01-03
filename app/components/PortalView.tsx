// components/PortalView.tsx
"use client";

import React from "react";
import { 
  Train, 
  Bus, 
  Landmark, 
  CreditCard,
  ShoppingCart, 
  Store,
  ExternalLink 
} from "lucide-react";

type LinkItem = {
  title: string;
  url: string;
  icon: React.ReactNode;
  desc?: string;
};

type Section = {
  category: string;
  items: LinkItem[];
};

export default function PortalView() {
  const linksData: Section[] = [
    {
      category: "🚋 交通出行",
      items: [
        {
          title: "SNCB (火車)",
          url: "https://www.belgiantrain.be/en",
          icon: <Train size={24} className="text-blue-600" />,
          desc: "查時刻、買車票"
        },
        {
          title: "De Lijn (公車)",
          url: "https://www.delijn.be/en/",
          icon: <Bus size={24} className="text-yellow-500" />,
          desc: "公車、路面電車"
        },
      ]
    },
    {
      category: "💰 銀行與金融",
      items: [
        {
          title: "KBC / KBC Brussels",
          url: "https://www.kbcbrussels.be/en/private-persons.html",
          icon: <Landmark size={24} className="text-blue-500" />,
          desc: "網銀登入 / 預約"
        },
        {
          title: "ING Belgium",
          url: "https://www.ing.be/en/retail",
          icon: <CreditCard size={24} className="text-orange-500" />,
          desc: "橘色獅子銀行"
        },
      ]
    },
    {
      category: "🛒 超市與採購",
      items: [
        {
          title: "Albert Heijn",
          url: "https://www.ah.be/",
          icon: <ShoppingCart size={24} className="text-cyan-500" />,
          desc: "荷蘭超市 (AH)"
        },
        {
          title: "Delhaize",
          url: "https://www.delhaize.be/en",
          icon: <Store size={24} className="text-red-600" />,
          desc: "獅子超市"
        },
        {
          title: "OKay / Colruyt",
          url: "https://www.okay.be/",
          icon: <ShoppingCart size={24} className="text-red-500" />,
          desc: "便宜大碗首選"
        },
        {
          title: "Action",
          url: "https://www.action.com/nl-be/",
          icon: <Store size={24} className="text-blue-400" />,
          desc: "生活雜貨 (超便宜)"
        }
      ]
    }
  ];

  return (
    <div className="flex flex-col items-center pb-24 bg-gray-50 min-h-screen">
      <div className="w-full bg-white px-4 py-6 border-b border-gray-100 mb-4 shadow-sm sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-gray-900 text-center">🚀 任意門</h1>
        <p className="text-center text-xs text-gray-400 mt-1">常用連結速查</p>
      </div>

      <div className="w-full max-w-md px-4 space-y-6">
        {linksData.map((section, idx) => (
          <div key={idx}>
            <h2 className="text-sm font-bold text-gray-400 ml-1 mb-2 uppercase tracking-wider">
              {section.category}
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {section.items.map((link, linkIdx) => (
                <a
                  key={linkIdx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all active:scale-95 flex flex-col items-center text-center gap-2 group"
                >
                  <div className="p-3 bg-gray-50 rounded-full group-hover:bg-blue-50 transition-colors">
                    {link.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-sm">{link.title}</h3>
                    {link.desc && <p className="text-[10px] text-gray-400 mt-1">{link.desc}</p>}
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}