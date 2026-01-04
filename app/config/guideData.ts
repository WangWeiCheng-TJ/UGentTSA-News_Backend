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
export const guideData: GuideCategory[] = [
  {
    category: "🌱 抵達安頓",
    // 目標：所有剛到根特的人 (不分身份)
    items: [
      { title: "行前文件準備", path: "/guide/departure-prep" },
      { title: "行李清單：To帶 or not to帶？", path: "/guide/departure-luggage" },
      { title: "交通：如何來到根特", path: "/guide/transport-to-ghent" },
      { title: "初次辦理居留證", path: "/guide/residence-permit" },
      { title: "住宿搜尋與簽約", path: "/guide/housing" },
      { title: "銀行開戶與保險", path: "/guide/banking" },
      { title: "電信與網路", path: "/guide/telecom" },
    ]
  },
  {
    category: "🏠 根特生活",
    // 目標：全體在根特台灣人 (通用資訊)
    items: [
      { title: "交通：市區公車與火車", path: "/guide/transport-city" },
      { title: "健保、家醫與醫療", path: "/guide/healthcare" },
      { title: "垃圾分類與回收指南", path: "/guide/waste-collection" }, // 建議新增
      { title: "超市攻略與省錢妙招", path: "/guide/supermarkets" },
      { title: "網購、包裹與退貨", path: "/guide/online-shopping" },
      { title: "變更地址 (Change of Address)", path: "/guide/change-address" },
      { title: "實用 App 清單", path: "/guide/apps" },
      { title: "好康優惠 (Deals)", path: "/guide/deals" },
    ]
  },
  {
    category: "🎓 校園專區",
    // 目標：專屬學生 (含在職生、博班)
    items: [
      { title: "UGent 學生系統手冊", path: "/guide/ugent-systems" },
      { title: "學生餐廳 (Resto) 資訊", path: "/guide/resto" },
      { title: "學生工作 (Student Job) 規定", path: "/guide/student-job" },
      { title: "延長學生居留證", path: "/guide/visa-extend" },
      { title: "ESN 學生組織", path: "/guide/esn" },
    ]
  },
  {
    category: "💼 職場轉換",
    // 目標：畢業生、求職者、上班族
    items: [
      { title: "找工作與實習資源", path: "/guide/job-search" },
      { title: "求職假 (Orientation Year)", path: "/guide/search-year" }, // 畢業生必看
      { title: "工作證辦理 (Single Permit)", path: "/guide/work-permit" },
      { title: "比利時報稅懶人包", path: "/guide/tax-return" },
      { title: "轉換身分行政手續", path: "/guide/change-status" },
    ]
  },
  {
    category: "✈️ 歸國手續",
    // 目標：結束階段的人
    items: [
      { title: "退租、除籍與關帳手續", path: "/guide/leaving-ghent" },
      { title: "學歷/工作證明文件驗證", path: "/guide/document-auth" },
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