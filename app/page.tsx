import type { Metadata } from "next";
import { HomePage } from "@/components/home-page";
import { content } from "@/lib/content";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
    languages: { pl: "/", en: "/en/", "x-default": "/" },
  },
};

export default function Home() {
  return <HomePage t={content.pl} />;
}
