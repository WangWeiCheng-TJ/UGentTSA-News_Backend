import type { Metadata, Viewport } from "next"; // 👈 引入 Viewport
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ 建議：把跟視窗縮放有關的設定搬到這裡 (PWA 必備)
export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1, // 禁止縮放，更像原生 App
  userScalable: false,
};

export const metadata: Metadata = {
  title: "根特生存指南 | UGent TSA",
  description: "比利時根特台灣留學生互助與生存資訊",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "根特指南",
  },
  // formatDetection 留在這裡沒問題
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}