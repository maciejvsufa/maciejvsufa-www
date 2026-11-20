import { reelLinks } from "@/lib/reels";

/** Osadzony rekord z 18.11. Bez autoplay — dźwięk startuje dopiero po kliknięciu. */
export function RecordEmbed({ title }: { title: string }) {
  return (
    <div className="yt-frame">
      <iframe
        src={reelLinks.recordEmbed}
        title={title}
        loading="lazy"
        allow="clipboard-write; encrypted-media; picture-in-picture; web-share"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}
