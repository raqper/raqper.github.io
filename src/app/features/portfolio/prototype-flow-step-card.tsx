import { accents } from "./portfolio-data";
import type { UseCase } from "./portfolio-data";
import type { CardDef } from "./card-builder";
import { MEDIA_CONTENT } from "./media-content";
import { AutoplayVideo } from "./media-card";

const LEFT_COL_WIDTH = "200px";
const FLOW_MEDIA_BG = "#1c0048";
const FLOW_TEXT_COL_BG = "#130038";

function parseStepIndex(cardId: string): number {
  const match = cardId.match(/-prototypeFlow-(\d+)$/);
  return match ? Number(match[1]) : 0;
}

export function PrototypeFlowStepCard({ uc, card }: { uc: UseCase; card: CardDef }) {
  const accent = accents[uc.id];
  const flow = uc.prototypeFlow;
  if (!flow) return null;

  const step = flow.steps[parseStepIndex(card.id)];
  if (!step) return null;

  const media = MEDIA_CONTENT[step.mediaId];
  const mediaLabel = step.headline;

  return (
    <div
      className="h-full overflow-hidden grid grid-cols-1 md:grid-cols-[var(--flow-text-col)_1fr]"
      style={{ ["--flow-text-col" as string]: LEFT_COL_WIDTH }}
    >
      <div
        className="flex flex-col items-start justify-start min-w-0 min-h-0 p-5 sm:p-6 md:pt-8 md:pl-8 md:pr-4 md:pb-6"
        style={{ background: FLOW_MEDIA_BG }}
      >
        <span
          className="font-['TikTok_Sans',sans-serif] tracking-[-0.03em] mb-3 shrink-0"
          style={{ fontSize: "12px", fontWeight: 500, color: accent }}
        >
          {flow.label}
        </span>
        <h3
          className="font-['Space_Grotesk',sans-serif] text-[#edeaf5] tracking-[-0.03em] mb-3 text-left"
          style={{ fontSize: "clamp(16px, 1.6vw, 22px)", fontWeight: 600, lineHeight: 1.3 }}
        >
          {step.headline}
        </h3>
        <p
          className="font-['TikTok_Sans',sans-serif] text-[#a89cc8] tracking-[-0.02em] text-left"
          style={{ fontSize: "13px", fontWeight: 400, lineHeight: "20px" }}
        >
          {step.framing}
        </p>
      </div>

      <div className="relative min-w-0 min-h-[220px] md:min-h-0 h-full" style={{ background: FLOW_TEXT_COL_BG }}>
        {media?.type === "video" && (
          <AutoplayVideo
            src={media.src}
            label={mediaLabel}
            autoplay={media.autoplay}
            className="absolute inset-0 w-full h-full object-contain object-center"
            style={{ maxHeight: "none" }}
          />
        )}
        {media?.type === "image" && (
          <img
            src={media.src}
            alt={mediaLabel}
            className="absolute inset-0 w-full h-full object-contain object-center"
            draggable={false}
          />
        )}
      </div>
    </div>
  );
}
