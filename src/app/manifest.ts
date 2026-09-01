import type { MetadataRoute } from "next";

import { BRAND_THEME_COLOR, SITE_NAME } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME,
    description:
      "Organize assinantes, envie cobranças no dia certo pelo WhatsApp e aprove comprovantes — sem processar pagamentos.",
    lang: "pt-BR",
    start_url: "/",
    display: "standalone",
    background_color: "#fafafa",
    theme_color: BRAND_THEME_COLOR,
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
