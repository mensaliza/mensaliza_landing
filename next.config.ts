import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/termos",
        destination: "/termos-de-uso",
        permanent: true,
      },
      {
        source: "/privacidade",
        destination: "/politicas-de-privacidade",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
