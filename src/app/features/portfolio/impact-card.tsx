import { accents } from "./portfolio-data";
import type { UseCase } from "./portfolio-data";

export function ImpactCard({ uc }: { uc: UseCase }) {
  const accent = accents[uc.id];
  return (
    <div className="h-full flex flex-col p-8 md:p-10 relative overflow-hidden">
      <div
        className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full opacity-20 blur-[100px]"
        style={{ background: accent }}
      />
      <span
        className="font-['TikTok_Sans',sans-serif] tracking-[-0.03em] mb-8 relative z-10"
        style={{ fontSize: "12px", fontWeight: 500, color: accent }}
      >
        {uc.impactLabel ?? "Impact"}
      </span>
      <p
        className="font-['Space_Grotesk',sans-serif] text-[#edeaf5] tracking-[-0.03em] relative z-10 mb-4"
        style={{ fontSize: "clamp(24px, 2.5vw, 32px)", fontWeight: 600, lineHeight: 1.5 }}
      >
        {uc.impact.summary}
      </p>
      {uc.impact.reflection && (
        <p
          className="font-['TikTok_Sans',sans-serif] text-white tracking-[-0.02em] relative z-10 mb-8"
          style={{ fontSize: "20px", fontWeight: 400, lineHeight: "32px" }}
        >
          {uc.impact.reflection}
        </p>
      )}
      {uc.impact.signals && uc.impact.signals.length > 0 && (
        <div className="flex flex-wrap gap-x-10 gap-y-3 relative z-10">
          {uc.impact.signals.map((stat, i) => (
            <div key={i} className="flex flex-col items-start">
              <span
                className="font-['Space_Grotesk',sans-serif] tracking-[-0.04em]"
                style={{ fontSize: "clamp(32px, 3vw, 42px)", fontWeight: 700, lineHeight: 1, color: accent }}
              >
                {stat.value}
              </span>
              <span
                className="font-['TikTok_Sans',sans-serif] tracking-[-0.02em] mt-0.5"
                style={{ fontSize: "12px", fontWeight: 500, lineHeight: "14px", color: "#ffffff" }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
