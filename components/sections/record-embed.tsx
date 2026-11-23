"use client";

import { useState } from "react";
import { reelLinks } from "@/lib/reels";

/** Kadr z filmu (oczy otwarte, napis z rolki). Odtwarzacz YouTube wchodzi dopiero po kliknięciu. */
export function RecordEmbed({ title }: { title: string }) {
  const [play, setPlay] = useState(false);
  return (
    <div className="yt-frame">
      {play ? (
        <iframe
          src={`${reelLinks.recordEmbed}?autoplay=1&rel=0`}
          title={title}
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <button type="button" className="yt-poster" onClick={() => setPlay(true)}>
          <img src="/portfolio/rekord-18-11.webp" alt={title} width={720} height={1280} />
          <span className="yt-play" aria-hidden="true">
            <i />
          </span>
        </button>
      )}
    </div>
  );
}
