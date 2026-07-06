import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Maciej V. Sufa — AI Process & Automation",
    short_name: "Maciej V. Sufa",
    description: "Usprawniam i automatyzuję procesy w firmach z AI.",
    start_url: "/",
    display: "browser",
    background_color: "#08080a",
    theme_color: "#08080a",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
