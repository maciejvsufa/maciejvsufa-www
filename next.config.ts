import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Static export for GitHub Pages on a custom domain (maciejvsufa.pl).
 * Custom domain serves from root, so basePath stays empty.
 * `output: "export"` produces a fully static `out/` — no Node server needed.
 * turbopack.root trzyma dev server w tym katalogu — inaczej Next bierze
 * package-lock.json z katalogu użytkownika i strona pada przy starcie.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  turbopack: {
    root: path.dirname(fileURLToPath(import.meta.url)),
  },
};

export default nextConfig;
