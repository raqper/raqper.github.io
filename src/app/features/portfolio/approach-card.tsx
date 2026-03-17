import { accents, gradients } from "./portfolio-data";
import type { UseCase } from "./portfolio-data";

export function ApproachCard({ uc }: { uc: UseCase }) {
  const accent = accents[uc.id];
  const grad = gradients[uc.id];
  return (
    <div className="h-full flex flex-col p-8 md:p-10">
      <div className="flex items-center justify-between w-full mb-4">
        <span
          className="font-['TikTok_Sans',sans-serif] tracking-[-0.03em]"
          style={{ fontSize: "12px", fontWeight: 500, color: accent }}
        >
          {uc.approachLabel ?? "Approach"}
        </span>
      </div>
      <h3
        className="font-['Space_Grotesk',sans-serif] text-[#edeaf5] tracking-[-0.03em] mb-4"
        style={{ fontSize: "clamp(16px, 1.6vw, 20px)", fontWeight: 600, lineHeight: 1.3 }}
      >
        {uc.approach.headline}
      </h3>
      <p
        className="font-['TikTok_Sans',sans-serif] text-white tracking-[-0.02em] mb-8"
        style={{ fontSize: "14px", fontWeight: 400, lineHeight: "22px", whiteSpace: "pre-line" }}
      >
        {uc.approach.framing}
      </p>
      <div className="flex flex-col gap-5">
        {uc.approach.keyDecisions.map((kd, i) => (
          <div key={i} className="flex gap-4">
            <span
              className="font-['Space_Grotesk',sans-serif] shrink-0 mt-0.5"
              style={{ fontSize: "16px", fontWeight: 700, lineHeight: 1, color: accent, opacity: 0.5 }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <p
                className="font-['TikTok_Sans',sans-serif] text-[#edeaf5] tracking-[-0.02em] mb-1"
                style={{ fontSize: "14px", fontWeight: 700, lineHeight: "22px" }}
              >
                {kd.decision}
              </p>
              <p
                className="font-['TikTok_Sans',sans-serif] text-[#a89cc8] tracking-[-0.02em]"
                style={{ fontSize: "14px", fontWeight: 400, lineHeight: "22px" }}
              >
                {kd.rationale}
              </p>
            </div>
          </div>
        ))}
      </div>
      {uc.approach.validation && uc.approach.validation.length > 0 && (
        <div className="flex flex-col gap-4 mt-6">
          {uc.approach.validation.map((v, i) => (
            <div
              key={i}
              className="rounded-xl p-4"
              style={{ background: grad, border: `1px solid ${accent}20` }}
            >
              <p
                className="font-['TikTok_Sans',sans-serif] tracking-[-0.02em] mb-1"
                style={{ fontSize: "11px", fontWeight: 600, color: accent, textTransform: "uppercase", letterSpacing: "0.05em" }}
              >
                {v.method}
              </p>
              <p
                className="font-['TikTok_Sans',sans-serif] text-white tracking-[-0.02em]"
                style={{ fontSize: "14px", fontWeight: 400, lineHeight: "22px" }}
              >
                {v.insight}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
