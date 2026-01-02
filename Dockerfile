# 使用輕量級的 Python 映像檔
FROM python:3.11-slim

# 設定工作目錄
WORKDIR /app

# 安裝系統依賴 (如果有需要的話，目前你的專案單純，可能不需要)
# RUN apt-get update && apt-get install -y gcc

# 複製需求文件並安裝依賴
# Docker 還是需要這份清單才知道要裝什麼套件
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# 複製所有程式碼到容器內
COPY . .

# 設定環境變數 (讓 Python 輸出不被緩衝，即時顯示 Log)
ENV PYTHONUNBUFFERED=1

# 預設執行的指令
CMD ["python", "daily_news_agent.py"]