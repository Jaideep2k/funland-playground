import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // WebP only: AVIF encodes far slower on first request, which would stall the intro loader.
    formats: ["image/webp"],
    qualities: [75, 85],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  poweredByHeader: false,
  // Local builds on a busy machine can cap the page-data workers, e.g. `NEXT_BUILD_CPUS=2 npm run build`.
  ...(process.env.NEXT_BUILD_CPUS ? { experimental: { cpus: Number(process.env.NEXT_BUILD_CPUS) } } : {}),
  // Keep every old WordPress address working so bookmarks, QR codes and Google results still land.
  async redirects() {
    return [
      { source: "/private-parties-2", destination: "/private-parties", permanent: true },
      { source: "/home", destination: "/", permanent: true },
      { source: "/feed", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
