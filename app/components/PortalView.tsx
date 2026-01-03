"use client";

import React from "react";
import { 
  Train, 
  Bus, 
  ShoppingCart, 
  Store,
  QrCode, 
  Fingerprint,
  Utensils, 
  Info,
  Siren,      // 警報器
  PhoneOff,   // 掛失電話
  ShieldAlert // 證件掛失
} from "lucide-react";

// 定義資料結構
type AppLinks = {
  scheme: string; // 暴力啟動 (Deep Link)
  android: string; // Play Store
  ios: string;     // App Store
  web: string;     // 電腦版/備用官網
};

type LinkItem = {
  title: string;
  icon: React.ReactNode;
  desc?: string;
  links: AppLinks;
  isEmergency?: boolean; // 標記是否為緊急按鈕
};

type Section = {
  category: string;
  items: LinkItem[];
};

export default function PortalView() {
  
  // 📥 資料庫
  const linksData: Section[] = [
    // 🆘 1. 緊急救援 (視覺保留，功能鎖定)
    {
      category: "🆘 緊急救援 (尚未實裝)",
      items: [
        {
          title: "緊急報案 112",
          icon: <Siren size={24} className="text-white" />,
          desc: "警察、消防、救護",
          isEmergency: true,
          links: { scheme: "", android: "", ios: "", web: "" } // 空連結
        },
        {
          title: "Card Stop",
          icon: <PhoneOff size={24} className="text-red-600" />,
          desc: "掛失銀行卡",
          isEmergency: true,
          links: { scheme: "", android: "", ios: "", web: "" }
        },
        {
          title: "Doc Stop",
          icon: <ShieldAlert size={24} className="text-orange-600" />,
          desc: "掛失護照/ID",
          isEmergency: true,
          links: { scheme: "", android: "", ios: "", web: "" }
        }
      ]
    },
    // 📲 2. 數位神器
    {
      category: "📲 必備數位神器",
      items: [
        {
          title: "Payconiq",
          icon: <QrCode size={24} className="text-pink-600" />,
          desc: "掃QR code付款",
          links: {
            scheme: "pbyb://",
            android: "https://play.google.com/store/apps/details?id=mobi.intix.android",
            ios: "https://apps.apple.com/be/app/payconiq-by-bancontact/id1049475711",
            web: "https://www.payconiq.be/en"
          }
        },
        {
          title: "Itsme",
          icon: <Fingerprint size={24} className="text-orange-600" />,
          desc: "數位身分證",
          links: {
            scheme: "itsme://",
            android: "https://play.google.com/store/apps/details?id=be.bmid.itsme",
            ios: "https://apps.apple.com/be/app/itsme/id1189354248",
            web: "https://www.itsme-id.com/"
          }
        },
      ]
    },
    // 🚋 3. 交通
    {
      category: "🚋 交通出行",
      items: [
        {
          title: "SNCB (火車)",
          icon: <Train size={24} className="text-blue-600" />,
          desc: "查時刻、買車票",
          links: {
            scheme: "sncb://",
            android: "https://play.google.com/store/apps/details?id=be.sncb.mobile",
            ios: "https://apps.apple.com/be/app/sncb-international/id1256087965",
            web: "https://www.belgiantrain.be/"
          }
        },
        {
          title: "De Lijn (公車)",
          icon: <Bus size={24} className="text-yellow-500" />,
          desc: "公車、路面電車",
          links: {
            scheme: "delijn://",
            android: "https://play.google.com/store/apps/details?id=be.delijn.mobile.android.widget",
            ios: "https://apps.apple.com/be/app/de-lijn/id403016913",
            web: "https://www.delijn.be/"
          }
        },
      ]
    },
    // 🛒 4. 生活與省錢
    {
      category: "🛒 生活與省錢",
      items: [
        {
          title: "Too Good To Go",
          icon: <Utensils size={24} className="text-teal-600" />,
          desc: "減少浪費(i珍食)",
          links: {
            scheme: "tgtg://",
            android: "https://play.google.com/store/apps/details?id=com.app.tgtg",
            ios: "https://apps.apple.com/be/app/too-good-to-go-end-food-waste/id1060683933",
            web: "https://www.toogoodtogo.com/"
          }
        },
        {
          title: "Lidl Plus",
          icon: <ShoppingCart size={24} className="text-blue-700" />,
          desc: "折扣券 App",
          links: {
            scheme: "lidlplus://",
            android: "https://play.google.com/store/apps/details?id=com.lidl.eci.lidl.plus",
            ios: "https://apps.apple.com/be/app/lidl-plus/id1235061864",
            web: "https://www.lidl.be/"
          }
        },
        {
          title: "Albert Heijn",
          icon: <ShoppingCart size={24} className="text-cyan-500" />,
          desc: "荷蘭超市",
          links: {
            scheme: "ah://",
            android: "https://play.google.com/store/apps/details?id=com.ah.appie",
            ios: "https://apps.apple.com/be/app/albert-heijn-supermarkt/id381483863",
            web: "https://www.ah.be/"
          }
        },
        {
          title: "Okay (Xtra)",
          icon: <ShoppingCart size={24} className="text-red-500" />,
          desc: "便宜大碗",
          links: {
            scheme: "xtra://",
            android: "https://play.google.com/store/apps/details?id=be.colruyt.xtra",
            ios: "https://apps.apple.com/be/app/xtra/id1066060372",
            web: "https://www.okay.be/"
          }
        },
        {
          title: "Delhaize",
          icon: <Store size={24} className="text-red-600" />,
          desc: "生鮮超市",
          links: {
            scheme: "delhaize://",
            android: "https://play.google.com/store/apps/details?id=be.delhaize.my",
            ios: "https://apps.apple.com/be/app/my-delhaize/id483562366",
            web: "https://www.delhaize.be/"
          }
        },
        {
          title: "Action",
          icon: <Store size={24} className="text-blue-400" />,
          desc: "生活雜貨",
          links: {
            scheme: "action://",
            android: "https://play.google.com/store/apps/details?id=com.action.app",
            ios: "https://apps.apple.com/be/app/action/id1526978189",
            web: "https://www.action.com/nl-be/"
          }
        },
      ]
    }
  ];

  // 🚀 核心功能：智慧啟動器
  const handleSmartClick = (item: LinkItem) => {
    // 🔒 0. 如果是緊急按鈕 -> 攔截！不執行動作
    if (item.isEmergency) {
      alert(`🚧 【${item.title}】功能尚未開放\n(This feature is not yet implemented)`);
      return;
    }

    const { links } = item;
    
    // 1. 偵測環境
    const userAgent = navigator.userAgent || navigator.vendor;
    const isAndroid = /android/i.test(userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream;

    // 2. 電腦版 -> 開網頁
    if (!isAndroid && !isIOS) {
      window.open(links.web, '_blank');
      return;
    }

    // 3. 準備連結
    const fallbackStore = isAndroid ? links.android : links.ios;
    const start = Date.now();
    
    // 4. 暴力啟動
    window.location.href = links.scheme;

// 5. 延遲判斷 (加長到 2500ms)
    setTimeout(() => {
      // 關鍵修改：檢查頁面是否「被隱藏」了
      // 如果 App 成功開啟，瀏覽器通常會變成 'hidden' 狀態
      // 我們只在頁面「還看得到 (visible)」的時候才跳轉商店
      if (!document.hidden) {
        // 二次確認：用 confirm 讓使用者選擇，而不是強制跳轉 (體驗較好)
        const userWantsStore = confirm(
          `無法自動開啟 ${item.title} App。\n要前往商店下載嗎？`
        );
        if (userWantsStore) {
          window.location.href = fallbackStore;
        }
      }
    }, 2500);
  };

  return (
    <div className="flex flex-col items-center pb-24 bg-gray-50 min-h-screen">
      
      {/* Header */}
      <div className="w-full bg-white px-4 py-6 border-b border-gray-100 mb-4 shadow-sm sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-gray-900 text-center">🚀 任意門</h1>
        <p className="text-center text-xs text-gray-400 mt-1">常用工具 & App 速查</p>
      </div>

      {/* 提示區塊 */}
      <div className="w-full max-w-md px-4 mb-2">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 items-start">
          <Info className="text-blue-600 shrink-0 mt-0.5" size={18} />
          <div>
            <h3 className="text-xs font-bold text-blue-800 mb-1">
              使用小撇步
            </h3>
            <p className="text-[11px] text-blue-600 leading-relaxed">
              點擊按鈕將嘗試開啟手機 App。若未安裝，將自動跳轉至商店下載。
            </p>
          </div>
        </div>
      </div>

      {/* 按鈕列表 */}
      <div className="w-full max-w-md px-4 space-y-6 mt-4">
        {linksData.map((section, idx) => (
          <div key={idx}>
            <h2 className="text-sm font-bold text-gray-400 ml-1 mb-2 uppercase tracking-wider flex items-center gap-2">
              {section.category}
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {section.items.map((link, linkIdx) => (
                <button
                  key={linkIdx}
                  onClick={() => handleSmartClick(link)}
                  className={`p-4 rounded-xl border shadow-sm transition-all active:scale-95 flex flex-col items-center text-center gap-2 group cursor-pointer w-full
                    ${/* 視覺效果：緊急按鈕保持紅色，但無功能 */ 
                      link.isEmergency && link.title.includes("112")
                      ? "bg-red-500 border-red-600 shadow-red-200" 
                      : "bg-white border-gray-100 hover:shadow-md hover:border-blue-200"
                    }
                  `}
                >
                  <div className={`p-3 rounded-full transition-colors
                    ${/* 視覺效果：Icon 樣式 */
                      link.isEmergency && link.title.includes("112")
                      ? "bg-white/20 text-white" 
                      : "bg-gray-50 group-hover:bg-blue-50"
                    }
                  `}>
                    {link.icon}
                  </div>
                  <div>
                    <h3 className={`font-bold text-sm
                       ${link.isEmergency && link.title.includes("112") ? "text-white" : "text-gray-800"}
                    `}>
                      {link.title}
                    </h3>
                    <p className={`text-[10px] mt-1
                       ${link.isEmergency && link.title.includes("112") ? "text-red-100" : "text-gray-400"}
                    `}>
                      {link.desc}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}