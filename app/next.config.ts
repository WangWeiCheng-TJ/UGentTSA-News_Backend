import type { NextConfig } from "next";
import { execSync } from "child_process";

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

// 🔥 自動抓取 Git Commit Hash
let gitCommitHash = "dev";
try {
  // 嘗試抓取最新的 short hash (例如: a1b2c3d)
  gitCommitHash = execSync('git rev-parse --short HEAD').toString().trim();
} catch (e) {
  console.warn("無法抓取 Git Hash，可能未安裝 Git 或非 Git 倉庫");
}

// 🔥 抓取 package.json 的版本號 (例如: 1.0.0)
const packageJson = require('./package.json');

const nextConfig: NextConfig = {
  // 把抓到的資訊塞進環境變數，讓前端 (AboutModal) 讀得到
  env: {
    NEXT_PUBLIC_APP_VERSION: packageJson.version,
    NEXT_PUBLIC_GIT_HASH: gitCommitHash,
  },
};

export default withPWA(nextConfig);