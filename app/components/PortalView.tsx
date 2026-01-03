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
  Siren,
  PhoneOff,
  ShieldAlert,
  Download // 👈 記得引入這個 icon
} from "lucide-react";

// 定義資料結構
type AppLinks = {
  scheme: string; // iOS 用的 Scheme (例如 itsme://)
  packageId: string; // Android 用的 Package ID (例如 be.bmid.itsme)
  iosStoreId: string; // iOS App Store ID (備用)
  web: string; // 電腦版
};

type LinkItem = {
  title: string;
  icon: React.ReactNode;
  desc?: string;
  links: AppLinks;
  isEmergency?: boolean;
};

type Section = {
  category: string;
  items: LinkItem[];
};

export default function PortalView() {
  
  // 📥 資料庫：這裡補上了 packageId
  const linksData: Section[] = [
    {
      category: "🆘 緊急救援 (尚未實裝)",
      items: [
        {
          title: "緊急報案 112",
          icon: <Siren size={24} className="text-white" />,
          desc: "警察、消防、救護",
          isEmergency: true,
          links: { scheme: "", packageId: "", iosStoreId: "", web: "" }
        },
        {
          title: "Card Stop",
          icon: <PhoneOff size={24} className="text-red-600" />,
          desc: "掛失銀行卡",
          isEmergency: true,
          links: { scheme: "", packageId: "", iosStoreId: "", web: "" }
        },
        {
          title: "Doc Stop",
          icon: <ShieldAlert size={24} className="text-orange-600" />,
          desc: "掛失護照/ID",
          isEmergency: true,
          links: { scheme: "", packageId: "", iosStoreId: "", web: "" }
        }
      ]
    },
    {
      category: "📲 必備數位神器",
      items: [
        {
          title: "Payconiq",
          icon: <QrCode size={24} className="text-pink-600" />,
          desc: "掃QR code付款",
          links: {
            scheme: "pbyb://",
            packageId: "mobi.intix.android",
            iosStoreId: "id1049475711",
            web: "https://www.payconiq.be/en"
          }
        },
        {
          title: "Itsme",
          icon: <Fingerprint size={24} className="text-orange-600" />,
          desc: "數位身分證",
          links: {
            scheme: "itsme://",
            packageId: "be.bmid.itsme",
            iosStoreId: "id1189354248",
            web: "https://www.itsme-id.com/"
          }
        },
      ]
    },
    {
      category: "🚋 交通出行",
      items: [
        {
          title: "SNCB (火車)",
          icon: <Train size={24} className="text-blue-600" />,
          desc: "查時刻、買車票",
          links: {
            scheme: "sncb://",
            packageId: "be.sncb.mobile",
            iosStoreId: "id1256087965",
            web: "https://www.belgiantrain.be/"
          }
        },
        {
          title: "De Lijn (公車)",
          icon: <Bus size={24} className="text-yellow-500" />,
          desc: "公車、路面電車",
          links: {
            scheme: "delijn://",
            packageId: "be.delijn.mobile.android.widget",
            iosStoreId: "id403016913",
            web: "https://www.delijn.be/"
          }
        },
      ]
    },
    {
      category: "🛒 生活與省錢",
      items: [
        {
          title: "Too Good To Go",
          icon: <Utensils size={24} className="text-teal-600" />,
          desc: "減少浪費(i珍食)",
          links: {
            scheme: "tgtg://",
            packageId: "com.app.tgtg",
            iosStoreId: "id1060683933",
            web: "https://www.toogoodtogo.com/"
          }
        },
        {
          title: "Lidl Plus",
          icon: <ShoppingCart size={24} className="text-blue-700" />,
          desc: "折扣券 App",
          links: {
            scheme: "lidlplus://",
            packageId: "com.lidl.eci.lidl.plus",
            iosStoreId: "id1235061864",
            web: "https://www.lidl.be/"
          }
        },
        {
          title: "Albert Heijn",
          icon: <ShoppingCart size={24} className="text-cyan-500" />,
          desc: "荷蘭超市",
          links: {
            scheme: "ah://",
            packageId: "com.ah.appie",
            iosStoreId: "id381483863",
            web: "https://www.ah.be/"
          }
        },
        {
          title: "Okay (Xtra)",
          icon: <ShoppingCart size={24} className="text-red-500" />,
          desc: "便宜大碗",
          links: {
            scheme: "xtra://",
            packageId: "be.colruyt.xtra",
            iosStoreId: "id1066060372",
            web: "https://www.okay.be/"
          }
        },
        {
          title: "Delhaize",
          icon: <Store size={24} className="text-red-600" />,
          desc: "生鮮超市",
          links: {
            scheme: "delhaize://",
            packageId: "be.delhaize.my",
            iosStoreId: "id483562366",
            web: "https://www.delhaize.be/"
          }
        },
        {
          title: "Action",
          icon: <Store size={24} className="text-blue-400" />,
          desc: "生活雜貨",
          links: {
            scheme: "action://",
            packageId: "com.action.app",
            iosStoreId: "id1526978189",
            web: "https://www.action.com/nl-be/"
          }
        },
      ]
    }
  ];

  // 🚀 核心功能：使用 Android Intent 與 iOS Scheme
  const handleSmartClick = (item: LinkItem, mode: 'open' | 'download') => {
    if (item.isEmergency) {
      alert(`🚧 【${item.title}】功能尚未開放...`);
      return;
    }

    const { links } = item;
    const userAgent = navigator.userAgent || navigator.vendor;
    const isAndroid = /android/i.test(userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream;

    // 0. 電腦版 -> 一律開網頁
    if (!isAndroid && !isIOS) {
      window.open(links.web, '_blank');
      return;
    }

    // 1. 如果使用者明確點擊了「下載」按鈕
    if (mode === 'download') {
      const storeUrl = isAndroid 
        ? `https://play.google.com/store/apps/details?id=${links.packageId}`
        : `https://apps.apple.com/be/app/${links.iosStoreId}`;
      window.location.href = storeUrl;
      return;
    }

    // 2. 安卓流派 (Android Intent) - 業界標準做法
    // 格式：intent://<scheme>#Intent;scheme=<scheme>;package=<packageId>;S.browser_fallback_url=<storeUrl>;end
    // 效果：有裝->開App，沒裝->去商店。OS 自己判斷，不用 JS。
    if (isAndroid) {
      // 移除 scheme 結尾的 :// (例如 itsme:// 變成 itsme)
      const cleanScheme = links.scheme.replace('://', '');
      const intentUrl = `intent://${cleanScheme}#Intent;scheme=${cleanScheme};package=${links.packageId};S.browser_fallback_url=https://play.google.com/store/apps/details?id=${links.packageId};end`;
      
      window.location.href = intentUrl;
      return;
    }

    // 3. 蘋果流派 (iOS Scheme)
    // 移除所有自動偵測，直接嘗試開啟。失敗就算了，讓使用者自己點下載。
    if (isIOS) {
      window.location.href = links.scheme;
    }
  };

  return (
    <div className="flex flex-col items-center pb-24 bg-gray-50 min-h-screen">
      
      {/* Header */}
      <div className="w-full bg-white px-4 py-6 border-b border-gray-100 mb-4 shadow-sm sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-gray-900 text-center">🚀 任意門</h1>
        <p className="text-center text-xs text-gray-400 mt-1">
          點擊卡片開啟 App，若無反應請點角落下載
        </p>
      </div>

      {/* 提示區塊 */}
      <div className="w-full max-w-md px-4 mb-2">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 items-start">
          <Info className="text-blue-600 shrink-0 mt-0.5" size={18} />
          <div>
            <h3 className="text-xs font-bold text-blue-800 mb-1">
              Android 用戶免煩惱
            </h3>
            <p className="text-[11px] text-blue-600 leading-relaxed">
              Android 系統會自動偵測並導向。iOS 若點擊無反應，請按卡片右上角的下載圖示。
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
                <div key={linkIdx} className="relative group">
                  
                  {/* 主要按鈕 (開啟 App) */}
                  <button
                    onClick={() => handleSmartClick(link, 'open')}
                    className={`p-4 rounded-xl border shadow-sm transition-all active:scale-95 flex flex-col items-center text-center gap-2 cursor-pointer w-full h-full
                      ${link.isEmergency && link.title.includes("112")
                        ? "bg-red-500 border-red-600 shadow-red-200" 
                        : "bg-white border-gray-100 hover:shadow-md hover:border-blue-200"
                      }
                    `}
                  >
                    <div className={`p-3 rounded-full transition-colors
                      ${link.isEmergency && link.title.includes("112")
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

                  {/* 右上角下載小按鈕 (緊急按鈕不顯示) */}
                  {!link.isEmergency && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // 防止觸發大按鈕
                        handleSmartClick(link, 'download');
                      }}
                      className="absolute top-2 right-2 p-1.5 bg-gray-100 rounded-full text-gray-400 hover:bg-blue-100 hover:text-blue-600 transition-colors z-10"
                      title="去商店下載"
                    >
                      <Download size={14} />
                    </button>
                  )}
                  
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}