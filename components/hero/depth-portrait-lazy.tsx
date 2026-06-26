"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { isSmallScreen } from "@/lib/browser";

const DepthPortrait = dynamic(
  () => import("@/components/hero/depth-portrait").then((m) => m.DepthPortrait),
  { ssr: false },
);

/**
 * Montuje portret 2.5D (three.js) tylko na desktopie, gdy przeglądarka jest
 * bezczynna. Na mobile nie ładuje three.js — hero pokazuje statyczne zdjęcie.
 */
export function DepthPortraitLazy({
  color = "/portrait-cutout.png",
  depth = "/portrait-depth.png",
}: {
  color?: string;
  depth?: string;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (isSmallScreen()) return;
    const w = window as Window &
      typeof globalThis & {
        requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
        cancelIdleCallback?: (id: number) => void;
      };
    let id: number;
    if (w.requestIdleCallback) {
      id = w.requestIdleCallback(() => setReady(true), { timeout: 1500 });
      return () => w.cancelIdleCallback?.(id);
    }
    id = window.setTimeout(() => setReady(true), 200);
    return () => window.clearTimeout(id);
  }, []);

  if (!ready) return null;
  return (
    <div className="absolute inset-0 z-[1] animate-[fieldIn_0.9s_ease] [animation-fill-mode:both] max-[720px]:hidden">
      <DepthPortrait color={color} depth={depth} />
    </div>
  );
}
