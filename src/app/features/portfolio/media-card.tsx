import { useEffect, useRef, useState, type CSSProperties } from "react";
import { accents } from "./portfolio-data";
import type { UseCase } from "./portfolio-data";
import type { CardDef } from "./card-builder";
import { MEDIA_CONTENT } from "./media-content";
import nokiaScreen1Old from "@/assets/1-FF.png";
import nokiaScreen1New from "@/assets/1-Connect.png";
import nokiaScreen2Old from "@/assets/2-FF.png";
import nokiaScreen2New from "@/assets/2-Connect.png";

const NOKIA_ACCENT = "#A6CDFF";
const NOKIA_COMPARISON_IMAGES: Record<"1" | "2", Record<"new" | "old", string>> = {
  "1": { new: nokiaScreen1New, old: nokiaScreen1Old },
  "2": { new: nokiaScreen2New, old: nokiaScreen2Old },
};

function formatMediaLabel(cardId: string): string {
  return cardId
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function AutoplayVideo({
  src,
  label,
  autoplay = false,
  className = "block max-w-full max-h-full w-auto h-auto object-contain object-center mx-auto",
  style,
}: {
  src: string;
  label: string;
  autoplay?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!autoplay) return;
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.45 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [autoplay]);

  return (
    <video
      ref={videoRef}
      src={src}
      aria-label={label}
      className={`${className} max-w-full max-h-[min(50vh,400px)] md:max-h-[clamp(440px,calc(100vh-9.5rem),760px)] object-contain object-center mx-auto`}
      style={style}
      controls
      autoPlay={autoplay}
      muted={autoplay}
      playsInline
      preload="metadata"
    />
  );
}

export { AutoplayVideo };

export function SegmentedControl<T extends string | number>({
  options,
  value,
  onChange,
  accentColor,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  accentColor: string;
}) {
  return (
    <div
      className="relative flex w-auto shrink-0 items-center rounded-full p-[3px]"
      style={{
        background: "rgba(46,26,106,0.25)",
        border: "1px solid rgba(46,26,106,0.4)",
      }}
    >
      {options.map((opt) => {
        const isActive = value === opt.value;
        return (
          <button
            key={String(opt.value)}
            type="button"
            className="relative z-10 rounded-full px-2 py-1 sm:px-2.5 transition-colors"
            style={{
              background: isActive ? "rgba(166,205,255,0.18)" : "transparent",
              fontFamily: "var(--font-sans)",
              fontSize: "10px",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              color: isActive ? accentColor : "#635c8c",
            }}
            onClick={() => onChange(opt.value)}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

export function NokiaBeforeAfterCard() {
  const [screen, setScreen] = useState<1 | 2>(1);
  const [version, setVersion] = useState<"new" | "old">("new");
  const imageSrc = NOKIA_COMPARISON_IMAGES[String(screen)]?.[version];

  return (
    <div className="flex h-full w-full min-h-0 flex-col bg-black/40">
      <div
        className="z-10 flex shrink-0 flex-row flex-nowrap items-center justify-between gap-1.5 px-2 py-2.5 sm:gap-2 sm:p-3"
        style={{
          background: "rgba(12,0,36,0.6)",
          backdropFilter: "blur(8px)",
          borderBottom: "1px solid rgba(166,205,255,0.15)",
        }}
      >
        <SegmentedControl
          options={[
            { value: "old", label: "Old tokens" },
            { value: "new", label: "New tokens" },
          ]}
          value={version}
          onChange={(v) => setVersion(v)}
          accentColor={NOKIA_ACCENT}
        />
        <SegmentedControl
          options={[
            { value: 1, label: "Screen 1" },
            { value: 2, label: "Screen 2" },
          ]}
          value={screen}
          onChange={(v) => setScreen(v)}
          accentColor={NOKIA_ACCENT}
        />
      </div>
      <div className="relative min-h-[260px] w-full flex-1">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={`Nokia comparison screen ${screen}, ${version === "new" ? "Connect theme" : "FreeForm theme"}`}
            className="h-full w-full object-contain object-center"
            draggable={false}
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center border-2 border-dashed"
            style={{
              borderColor: `${NOKIA_ACCENT}40`,
              background: `${NOKIA_ACCENT}08`,
            }}
          >
            <p
              className="font-['TikTok_Sans',sans-serif] text-center tracking-[-0.02em]"
              style={{ fontSize: "14px", fontWeight: 500, color: `${NOKIA_ACCENT}cc` }}
            >
              Screen {screen}, {version === "new" ? "New tokens" : "Old tokens"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export function MediaPlaceholderCard({ uc, card }: { uc: UseCase; card: CardDef }) {
  const accent = accents[uc.id];
  const media = MEDIA_CONTENT[card.id];
  const mediaLabel = `${uc.title} ${formatMediaLabel(card.id)}`;

  if (media?.type === "video") {
    return (
      <div className="flex flex-col gap-3 w-full h-full max-h-full">
        {media.caption && (
          <p
            className="font-['TikTok_Sans',sans-serif] tracking-[-0.02em] shrink-0 px-1 text-center"
            style={{ fontSize: "14px", fontWeight: 500, lineHeight: "20px", color: accent }}
          >
            {media.caption}
          </p>
        )}
        <div className="flex flex-1 items-center justify-center w-full min-h-0">
          <AutoplayVideo
            src={media.src}
            label={media.caption ?? mediaLabel}
            autoplay={media.autoplay}
          />
        </div>
      </div>
    );
  }

  if (media?.type === "youtube") {
    return (
      <div className="relative w-full aspect-video">
        <iframe
          src={media.src}
          title={mediaLabel}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    );
  }

  if (media?.type === "image") {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <img
          src={media.src}
          alt={mediaLabel}
          loading="lazy"
          className="block max-w-full max-h-[min(50vh,400px)] md:max-h-[clamp(440px,calc(100vh-9.5rem),760px)] w-auto h-auto object-contain object-center mx-auto"
          draggable={false}
        />
      </div>
    );
  }

  return (
    <div
      className="h-full w-full min-h-0 flex items-center justify-center border-2 border-dashed box-border"
      style={{ borderColor: `${accent}40`, background: `${accent}08` }}
    >
      <p
        className="font-['TikTok_Sans',sans-serif] text-center tracking-[-0.02em]"
        style={{ fontSize: "14px", fontWeight: 500, color: `${accent}cc` }}
      >
        Media placeholder
      </p>
    </div>
  );
}
