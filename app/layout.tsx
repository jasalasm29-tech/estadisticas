import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

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
        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
