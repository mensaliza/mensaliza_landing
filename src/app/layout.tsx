import type { Metadata } from "next";
import { Geist, Geist_Mono, Lexend } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

import { Toaster } from "@/components/ui/sonner";

import "./globals.css";

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mensaliza.com.br"),
  title: "Mensaliza — Cobrança mensal automática via WhatsApp",
  description:
    "Organize assinantes, envie cobranças no dia certo pelo WhatsApp e aprove comprovantes — sem processar pagamentos.",
  openGraph: {
    title: "Mensaliza — Cobrança mensal automática via WhatsApp",
    description:
      "Organize assinantes, envie cobranças no dia certo pelo WhatsApp e aprove comprovantes — sem processar pagamentos.",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/og.jpeg",
        width: 1200,
        height: 630,
        alt: "Mensaliza — Cobrança mensal automática via WhatsApp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mensaliza — Cobrança mensal automática via WhatsApp",
    description:
      "Organize assinantes, envie cobranças no dia certo pelo WhatsApp e aprove comprovantes — sem processar pagamentos.",
    images: ["/og.jpeg"],
  },
  // Official Dark Reader opt-out — keeps the light-only landing intact
  other: {
    "darkreader-lock": "darkreader-lock",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${lexend.variable} ${geist.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#conteudo-principal"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:shadow-sm focus:outline-none focus:ring-3 focus:ring-ring/50"
        >
          Pular para o conteúdo
        </a>
        {children}
        <Toaster position="top-center" richColors={false} closeButton />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
