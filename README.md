# 🇧🇪 UGentTSA News Backend (根特生存指南 - 情報局)

![Python](https://img.shields.io/badge/Python-3.11-blue?logo=python&logoColor=white)
![Gemini AI](https://img.shields.io/badge/AI-Gemini%201.5%20Flash-magenta?logo=google&logoColor=white)
![Google Sheets](https://img.shields.io/badge/Database-Google%20Sheets-green?logo=google-sheets&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/Deploy-GitHub%20Actions-2088FF?logo=github-actions&logoColor=white)

> **「來自台灣的根特土地公」** 🏮
> 這是一個全自動化的新聞情報系統，專為在根特生活的台灣留學生設計。它每天早上會自動抓取市政新聞，利用 AI 進行過濾、分級、翻譯，並將「真正重要」的資訊推送到資料庫中。

## 🌍 The Grand Master Plan (終極願景)

本專案是 **Ghent Survival Kit (根特生存指南)** 的第一階段核心引擎。我們的目標是打造一個「在地化、自動化、社群化」的數位生存系統。

- [x] **Phase 1: 自動化情報局 (Current)** - 建立資料流，由 AI 自動抓取並分析新聞。
- [ ] **Phase 2: 行動儀表板** - 建立 React PWA 前端，讓同學能秒開查詢 (Next Step)。
- [ ] **Phase 3: 活體知識庫** - 加入 QA 論壇與糾錯機制。
- [ ] **Phase 4: 空間生存地圖** - 整合地圖資訊 (亞洲超市、資源回收點)。

## ⚙️ 系統架構 (System Architecture)

使用 **Serverless** 與 **NoSQL (Google Sheets)** 架構(維護成本因素)。

[🐍 Python 爬蟲] -> (寫入資料) -> [📊 Google Sheets] -> (透過 App Script 變成 API)-> [☁️ JSON API]-> (讀取資料)-> [📱 Next.js 前端 App] -> (部署上線) -> [🚀 Vercel 雲端] ->  [👤 你的手機/電腦]

## ✨ 核心功能
1.  **智慧日期解析**：結合規則引擎與 AI，無論荷蘭文格式如何變形 (如 `wo, 24 dec`)，都能精準還原為 `YYYY-MM-DD`。
2.  **戰略情報分析**：AI 不只翻譯，還會擔任「情報官」，分析出：
    * **🔴 Level 3 (紅色警戒)**：罷工、停收垃圾 (必讀)。
    * **🟡 Level 2 (黃色實用)**：活動、市集 (建議看)。
    * **🟢 Level 1 (綠色雜訊)**：無關緊要的市政瑣事 (過濾)。
3.  **受眾快篩**：自動標記新聞是針對 `Student` (學生)、`Resident` (居民) 還是 `All` (所有人)。
4.  **全自動運維**：透過 GitHub Actions 每日定時執行，完全不需要租用伺服器。

<details>
<summary>如何改動</summary>
## 🚀 如何開始 (Installation)

如果你想在本地端開發或測試：

### 1. 環境準備
確保安裝 **Python 3.11** (推薦) 或 3.9+。

下載專案
```
git clone https://github.com/WangWeiCheng/UGentTSA-News_Backend.git
cd UGentTSA-News_Backend
```

安裝必要套件
```pip install -r requirements.txt```

### 2. 設定金鑰 (.env)
在專案根目錄建立 .env 檔案，填入以下資訊：
```
GOOGLE_API_KEY=你的_Gemini_API_Key
MODEL_NAME=你要使用的model
```
關於可以使用的model請參考 [Google AI Studio Rate Limit](https://aistudio.google.com/usage?tab=rate-limit)

## 🤖 GitHub Actions 自動化部署
本專案已設定好 CI/CD，推送到 main 分支即自動部署。

### 設定 Secrets
為了讓 GitHub Actions 能存取 AI 和 Google Sheets，請到 Repo 的 Settings > Secrets and variables > Actions 新增兩個 Secrets：
```
GOOGLE_API_KEY: 你的 Gemini API Key。
G_SHEET_JSON: 將 googlesheetapi.json 檔案內的文字全選複製並貼上。
```

### 排程時間
目前設定為 UTC 06:00 執行 (daily_news.yml)。<br>
比利時冬天 (CET)：早上 07:00<br>
比利時夏天 (CEST)：早上 08:00<br>

## 📂 專案結構與設定
daily_news_agent.py: 核心爬蟲與 AI 串接邏輯。<br>
prompts/: AI 的「大腦」設定檔，可直接用中文修改指令。<br>
date_parser.txt: 教 AI 怎麼看懂 RSS 的亂碼日期。<br>
news_analysis.txt: 教 AI 怎麼像「土地公」一樣分析新聞重要性。<br>
.github/workflows/daily_news.yml: 自動化排程設定檔。<br>

</details>

## 🤝 貢獻指南
歡迎所有 UGENT 的台灣同學一起維護！ 如果你發現 AI 分類不準，請直接修改 prompts/news_analysis.txt 並發送 Pull Request。

## 📜 License
MIT License. Free for all Taiwanese Student Associations.
