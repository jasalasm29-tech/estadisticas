import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const ADSENSE_ID = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID ?? "";

export const metadata: Metadata = {
  title: "PRISM · Transforma datos en decisiones inteligentes",
  description:
    "PRISM es una plataforma de análisis deportivo y recomendaciones de apuestas inteligentes basada en datos.",
  keywords: ["apuestas", "análisis deportivo", "ROI", "bankroll", "PRISM"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning className={inter.variable}>
      <body className="min-h-screen flex flex-col bg-[#F8FAFC] text-gray-900">
        {/* Script de Google AdSense (solo si hay client ID configurado) */}
        {ADSENSE_ID && (
          <Script
            id="adsbygoogle-init"
            async
            strategy="afterInteractive"
            crossOrigin="anonymous"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
          />
        )}
        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
