import type { NextConfig } from "next";

// 引入 PWA 套件
const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",       // 產生的檔案放到 public 資料夾
  cacheOnFrontEndNav: true, // 前端導航時也快取
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true, // 網路恢復時重新整理
  swcMinify: true,
  skipWaiting: true, // 下載完新版，立刻替換舊版
  disable: process.env.NODE_ENV === "development", // 開發模式下不啟用 PWA (不然很煩)
  workboxOptions: {
    disableDevLogs: true,
  },
});

const nextConfig: NextConfig = {
  // 你的其他設定 (如果有的話)
};

// 用 withPWA 把設定包起來
export default withPWA(nextConfig);