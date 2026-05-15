import type { NextConfig } from "next";
import path from "path";

/** Risolve dipendenze di PostCSS annidate in Next/Turbopack (picocolors, source-map-js). */
function nodeModule(pkg: string): string {
  return path.join(process.cwd(), "node_modules", pkg);
}

const nextConfig: NextConfig = {
  typescript: {
    // Workaround: Next 16.2.6 generated `.next/types/validator.ts` imports `ResolvingMetadata` from
    // `next/types.js`, which does not export those symbols in published types (known skew).
    ignoreBuildErrors: true,
  },
  turbopack: {
    root: process.cwd(),
    resolveAlias: {
      picocolors: nodeModule("picocolors"),
      "source-map-js": nodeModule("source-map-js"),
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
