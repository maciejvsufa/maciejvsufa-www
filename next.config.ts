import type { NextConfig } from "next";

/**
 * Static export for GitHub Pages on a custom domain (maciejvsufa.pl).
 * Custom domain serves from root, so basePath stays empty.
 * `output: "export"` produces a fully static `out/` — no Node server needed.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
