// 1. 定義資料型別 (Type Definitions)
// 這樣做的好處是，以後如果要加新欄位 (例如 icon)，全站都會知道

export type GuideItem = {
  title: string;
  path: string;
};

export type GuideCategory = {
  category: string;
  items: GuideItem[];
};

export type AppLink = {
  name: string;
  url: string;
  icon: string;
  color: string;
};

// 2. 指南選單資料 (Sidebar/Menu Data)
// 這裡就是你剛剛提供的資料，我已經幫你加上型別宣告了
export const guideData: GuideCategory[] = [
  {
    category: "🌱 初來乍到 (Arrival)",
    items: [
      { title: "行前文件準備", path: "/guide/departure-prep" },
      { title: "To帶 or not to帶(tbd)", path: "/guide/departure-luggage" },
      { title: "如何來根特", path: "/guide/transport-to-ghent" },
      { title: "居留證篇", path: "/guide/residence-permit" },
      { title: "住宿篇", path: "/guide/housing" },
      { title: "電信與網路(tbd)", path: "/guide/telecom" },
      { title: "銀行開戶", path: "/guide/banking" },
      { title: "ESN 學生組織(tbd)", path: "/guide/esn" }
    ]
  },
  {
    category: "🚲 日常生活 (Daily Life)",
    items: [
      { title: "延長居留", path: "/guide/visa-extend" },
      { title: "變更地址", path: "/guide/change-address" },
      { title: "好康相報 (tbd)", path: "/guide/deals" },
      { title: "交通篇 (tbd)", path: "/guide/transport-city" },
      { title: "健保與醫療 (tbd)", path: "/guide/healthcare" },
      { title: "網購與包裹 (tbd)", path: "/guide/online-shopping" },
      { title: "超市攻略 (tbd)", path: "/guide/supermarkets" },
      { title: "實用 App 清單 ", path: "/guide/apps" },
      { title: "其他行政手續 (tbd)", path: "/guide/documents" },      
    ]
  },
  {
    category: "👋 回台灣囉 (Departure)",
    items: [
      { title: "必要手續 (tbd)", path: "/guide/leaving-ghent" }
    ]
  }
];

// // 3. 傳送門 APP 連結 (Portal Data)
// // 這是 MainView 裡面的 "PortalView" 會用到的，記得要保留喔！
// export const appLinks: AppLink[] = [
//   { name: "SNCB 火車", url: "https://www.belgiantrain.be/", icon: "🚆", color: "bg-blue-100 text-blue-600" },
//   { name: "De Lijn 公車", url: "https://www.delijn.be/", icon: "🚌", color: "bg-yellow-100 text-yellow-600" },
//   { name: "Xtra (Colruyt)", url: "https://xtra.colruytgroup.be/", icon: "🛒", color: "bg-red-100 text-red-600" },
//   { name: "Joyn 集點", url: "https://www.joyn.be/", icon: "🎁", color: "bg-orange-100 text-orange-600" },
// ];