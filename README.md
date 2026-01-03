# UGent Taiwnese Student Association (TSA) Survior Kit (台灣人的根特生存指南)

![Python](https://img.shields.io/badge/Python-3.11-blue?logo=python&logoColor=white)
![Gemini AI](https://img.shields.io/badge/AI-Gemini%20gemma%203-magenta?logo=google&logoColor=white)
![Google Sheets](https://img.shields.io/badge/Database-Google%20Sheets-green?logo=google-sheets&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/Deploy-GitHub%20Actions-2088FF?logo=github-actions&logoColor=white)
![Next.js](https://img.shields.io/badge/Frontend-Next.js-black?logo=next.js&logoColor=white)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=white)
![Status](https://img.shields.io/badge/Status-Beta-green)
![License](https://img.shields.io/badge/License-MIT-green)

> **「來自台灣的根特守護神」** 🌊
> 
> 剛到根特不知道超是要買什麼？突發罷工怕沒車搭？辦居留證卡關找不到攻略？
>
> 這是一個全自動化的數位生存系統，專為在根特渡海求學的台灣學子設計。目標是解決資訊散落在 FB 社團與 Line 群組的問題、或是隨著時代被深埋的血淚經驗；最終將「真正重要」的生存情報（市政新聞、紅色警戒、行政攻略）集中整合，期許他未來能像媽祖一樣，為在遠方打拼的遊子們點亮明燈。

## 🌍 The Ultimate Goal

本專案的終極目標為打造**「台灣人在根特的生存指南」**。

我們的目標是建立一個「在地化、自動化、社群化」的數位生態，用以協助：
* **新生落地**：讓剛到根特不到半年的新生，不再因為語言隔閡或資訊焦慮而無所適從。
* **老鳥傳承**：將歷屆學長姐分散在腦海與舊網站的「生存智慧」（銀行開戶、醫療資源）系統化留存。
* **社群互助**：創造一個低維護成本的平台，促進台灣社群在根特的資源流動。

最重要的是，本專案希望以**低維護成本 (Low Maintenance)** 與 **全自動化 (Fully Automated)** 的方式運作，最大程度減少後續學生會長交接及維運的技術負擔。

## 🗺️ Roadmap (發展藍圖)

本專案採用迭代開發，目前專注於後端情報系統的建置。

- [x] **Phase: 情報局 (Backend / Data)**
    - 建立自動化 RSS 爬蟲與資料擷取流程，解決資訊來源問題。
    - 串接 Gemini AI 進行語意分析、翻譯與雜訊過濾。
    - 部署 GitHub Actions 實現每日自動更新，無需人工介入。

- [ ] **Phase: 行動儀表板 (Frontend / PWA)**
    - [x] **新聞牆 (News Wall)**：成功串接 API，顯示每日市政新聞。
    - [x] **APP 架構重構**：確立底部導航 (Bottom Tab) 為核心交互：
        1. **🏠 首頁**：新聞流 + 紅色警戒 (置頂)。
        2. **🧭 指南**：生存攻略目錄 (初來乍到 / 日常生活 / 回台灣)。
        3. **🚀 傳送門**：整合外部工具 (SNCB, De Lijn) 與 SOS 求救按鈕。
    - [ ] **傳送門 (Portal)**：實作「防誤觸」的緊急求救介面，與實用 App 快速啟動器。
        1. [ ] **緊急求助**：Beta階段尚不實裝、建立守望相助名單中。
        2. [x] **App整合**：實用App快速啟動器。

- [ ] **Phase: 活體生存指南 (Content / Wiki)**
    - [x] 建置符合「使用者旅程」的三階段攻略：
        1. [x] **🌱 初來乍到**：從出發準備、辦居留證到銀行開戶。
        2. [x] **🚲 日常生活**：交通、醫療、超市與好康相報。
        3. [x] **👋 回台灣囉**：Model 8 離境手續教學。
    - [ ] **精選文章 (Featured)**：整合外部優質部落格/貼文連結 (取代自建論壇)。
    - [ ] 豐富Google Sheet資料庫

- [ ] **Phase: 在地社群地圖 (Community / Map)**
    - 整合學長姐認證的「美食地圖」與「亞洲超市」清單。
    - 開發「資源交換」板塊：提供安全的二手買賣、房屋短租或物品出借資訊流 (取代 FB 混亂的貼文)。


## ⚙️ 系統架構 (System Architecture)

為了實現「減少交接負擔」的目標，我們採用 **Serverless** 與 **NoSQL (Google Sheets)** 的輕量化架構，確保營運成本為 0。

**資料流向 (Data Flow)：**

1.  **資料源頭 (Hybrid Input)**：
    * 🤖 **自動化管道**：`[🐍 Python 爬蟲]` 每日抓取市政新聞與紅色警戒。
    * 🙌 **人工/靜態管道**：透過 `[Excel/CSV]` 一次性匯入舊網站攻略，或由幹部直接在 Google Sheets 上手動修訂（如美食清單、緊急電話）。
2.  **核心儲存**：匯整至 `[📊 Google Sheets]`，這不只是資料庫，也是我們的 CMS 後台。
3.  **API 轉換**：透過 App Script 將試算表轉換為 `[☁️ JSON API]`。
4.  **前端讀取**：`[📱 Next.js App]` 讀取 API 並進行渲染。
5.  **雲端部署**：程式碼託管於 `[🚀 Vercel]`，用戶透過手機瀏覽器存取。

> **設計核心**：下一屆會長若需修改公告或緊急通知，只需打開 Google Sheets 修改，App 端即會同步更新，無需觸碰程式碼。

### 🕵️‍♂️ 情報邏輯 (News Engine Details)

<details>
<summary><strong>點擊展開：查看 AI 如何分析與過濾新聞</strong></summary>
在上述的第一步驟 (Python 爬蟲) 中，我們實作了以下邏輯來確保資訊品質：

1. **智慧日期解析**
   結合規則引擎與 AI，無論荷蘭文格式如何變形 (如 `wo, 24 dec`)，都能精準還原為 `YYYY-MM-DD`。

2. **戰略情報分析 (Level 1-3)**
   AI 不只翻譯，還會擔任「情報官」，依據 `prompts/` 的指令進行分級：
   * 🔴 **Level 3 (紅色警戒)**：罷工、停收垃圾 (必讀，影響生活)。
   * 🟡 **Level 2 (黃色實用)**：活動、市集 (建議看)。
   * 🟢 **Level 1 (綠色雜訊)**：無關緊要的市政瑣事 (自動過濾或摺疊)。

3. **受眾快篩**
   自動標記新聞是針對 `Student` (學生)、`Resident` (居民) 還是 `All` (所有人)。

4. **全自動運維**
   透過 GitHub Actions 每日定時執行，完全不需要租用伺服器。

</details>


## 🤝 貢獻指南
歡迎所有 UGENT 的台灣同學一起維護！ 如果你發現有任何問題請來信告知或是開issue。

## 📜 License
MIT License. Will be free for all Taiwanese Student Associations.

## 🛠️ 開發者手冊 (Developer Manual)

<details>
<summary><strong>點擊展開：如何安裝、設定環境與部署</strong></summary>
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