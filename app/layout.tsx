import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
// Poppins solo en titulares y wordmark (ver brand/BRAND.md §4).
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-poppins",
});

const ADSENSE_ID = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID ?? "";

export const metadata: Metadata = {
  title: {
    default: "Prisma 137 · Convertimos ruido deportivo en señal estadística",
    template: "%s · Prisma 137",
  },
  description:
    "Prisma 137 es una plataforma de análisis estadístico deportivo: probabilidad, valor esperado y gestión de riesgo sobre datos reales.",
  keywords: [
    "análisis deportivo",
    "estadística deportiva",
    "valor esperado",
    "ROI",
    "bankroll",
    "Prisma 137",
  ],
  icons: { icon: "/favicon.svg" },
  openGraph: {
    type: "website",
    locale: "es_CL",
    siteName: "Prisma 137",
    title: "Prisma 137 · Convertimos ruido deportivo en señal estadística",
    description:
      "Probabilidad, valor esperado y gestión de riesgo sobre datos reales de fútbol.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning className={`${inter.variable} ${poppins.variable}`}>
      <body className="flex min-h-screen flex-col bg-cream-50 text-ink">
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
