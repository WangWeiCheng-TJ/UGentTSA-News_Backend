// config/guideContent.ts

// 這是單篇文章的資料結構
export type GuideArticle = {
  title: string;
  content: string; // 這裡是 Markdown 內容
  updated: string;
  author: string;
};

// 這裡模擬資料庫，Key 是網址的 slug (例如 /guide/banking)
export const guideContentDatabase: Record<string, GuideArticle> = {
  "banking": {
    title: "銀行開戶攻略 (KBC/Argenta)",
    updated: "2025-01-27",
    author: "第10屆會長",
    content: `
## 為什麼需要開戶？
在比利時生活，擁有一張 Bancontact 卡是必須的...

## 推薦銀行
* **KBC**: APP 最好用，根特分行多。
* **Argenta**: 免費，但服務據點較少。

## 攜帶文件
1. 護照
2. 租屋合約 (證明地址)
3. 入學證明
    `
  },
  "residence-permit": {
    title: "居留證辦理攻略",
    updated: "2024-12-20",
    author: "老鳥 A",
    content: `
## 預約市政廳
請務必提前一個月上網預約...

## 報到當天
請不要遲到，帶好所有文件正本。
    `
  }
};