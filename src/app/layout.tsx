import { Geist, Geist_Mono } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { MetaPixel } from "@/components/analytics/meta-pixel";
import { JsonLd } from "@/components/seo/json-ld";
import { Toaster } from "@/components/ui/sonner";
import { getGtmId } from "@/lib/gtm-config";
import { getMetaPixelId } from "@/lib/meta-pixel-config";
import { buildLayoutJsonLd, buildRootMetadata } from "@/lib/seo";

import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = buildRootMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gtmId = getGtmId();
  const metaPixelId = getMetaPixelId();

  return (
    <html
      lang="pt-BR"
      className={`${geist.variable} ${geistMono.variable} h-full antialiased`}
    >
      {gtmId && <GoogleTagManager gtmId={gtmId} />}
      <body className="flex min-h-full flex-col">
        <JsonLd data={buildLayoutJsonLd()} />
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
        {metaPixelId && <MetaPixel pixelId={metaPixelId} />}
      </body>
    </html>
  );
}
