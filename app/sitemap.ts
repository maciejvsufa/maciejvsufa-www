import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${site.url}/`, lastModified: now, priority: 1 },
    { url: `${site.url}/en/`, lastModified: now, priority: 0.9 },
    { url: `${site.url}/portfolio/`, lastModified: now, priority: 0.9 },
    { url: `${site.url}/en/portfolio/`, lastModified: now, priority: 0.7 },
    { url: `${site.url}/cv/`, lastModified: now, priority: 0.6 },
  ];
}
