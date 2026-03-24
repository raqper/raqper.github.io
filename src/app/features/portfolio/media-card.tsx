import { useState } from "react";
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
      className="relative flex items-center rounded-full p-[3px]"
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
            className="relative z-10 rounded-full px-2.5 py-1 transition-colors"
            style={{
              background: isActive ? "rgba(166,205,255,0.18)" : "transparent",
              fontFamily: "var(--font-sans)",
              fontSize: "11px",
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
    <div className="h-full w-full min-h-0 relative flex flex-col bg-black/40">
      <div
        className="z-10 flex shrink-0 items-center justify-between gap-3 p-3"
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
      <div className="flex-1 min-h-0 relative">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={`Nokia comparison screen ${screen}, ${version} tokens`}
            className="absolute inset-0 w-full h-full object-contain"
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
              Screen {screen} — {version === "new" ? "New tokens" : "Old tokens"}
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
      <video
        src={media.src}
        aria-label={mediaLabel}
        className="block max-w-full max-h-full w-auto h-auto"
        style={{ maxHeight: "clamp(420px, calc(100vh - 11rem), 720px)" }}
        controls
        playsInline
        preload="metadata"
      />
    );
  }

  if (media?.type === "youtube") {
    return (
      <div
        className="relative"
        style={{
          width: "clamp(854px, 85vw, 1280px)",
          height: "clamp(420px, calc(100vh - 11rem), 720px)",
        }}
      >
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
      <img
        src={media.src}
        alt={mediaLabel}
        loading="lazy"
        className="block max-w-full max-h-full w-auto h-auto"
        style={{ maxHeight: "clamp(420px, calc(100vh - 11rem), 720px)" }}
        draggable={false}
      />
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
