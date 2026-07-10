import { accents, gradients } from "./portfolio-data";
import type { UseCase } from "./portfolio-data";

export function AiUsageCard({ uc }: { uc: UseCase }) {
  const accent = accents[uc.id];
  const grad = gradients[uc.id];
  const ai = uc.aiUsage;
  if (!ai) return null;

  const phaseBlock = (
    label: string,
    duration: string,
    tools: string,
    steps: string[],
    highlighted: boolean,
  ) => (
    <div
      className="flex-1 min-w-0 rounded-xl p-3"
      style={{
        background: highlighted ? grad : "rgba(255,255,255,0.04)",
        border: `1px solid ${highlighted ? `${accent}30` : "rgba(255,255,255,0.08)"}`,
      }}
    >
      <p
        className="font-['TikTok_Sans',sans-serif] tracking-[-0.02em] mb-1"
        style={{
          fontSize: "11px",
          fontWeight: 600,
          color: highlighted ? accent : "#a89cc8",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        {label}
      </p>
      <p
        className="font-['Space_Grotesk',sans-serif] tracking-[-0.03em] mb-0.5"
        style={{ fontSize: "clamp(20px, 2vw, 26px)", fontWeight: 700, lineHeight: 1, color: accent }}
      >
        {duration}
      </p>
      <p
        className="font-['TikTok_Sans',sans-serif] tracking-[-0.02em] mb-2"
        style={{ fontSize: "12px", fontWeight: 500, color: "#a89cc8" }}
      >
        {tools}
      </p>
      <ul className="flex flex-col gap-1">
        {steps.map((step, i) => (
          <li
            key={i}
            className="font-['TikTok_Sans',sans-serif] text-white tracking-[-0.02em] pl-3 relative"
            style={{ fontSize: "12px", fontWeight: 400, lineHeight: "18px" }}
          >
            <span
              className="absolute left-0 top-[7px] w-1 h-1 rounded-full"
              style={{ background: highlighted ? accent : "#635c8c" }}
            />
            {step}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="h-full flex flex-col p-8 md:p-10 overflow-y-auto">
      <span
        className="font-['TikTok_Sans',sans-serif] tracking-[-0.03em] mb-3 shrink-0"
        style={{ fontSize: "12px", fontWeight: 500, color: accent }}
      >
        {ai.label}
      </span>
      <h3
        className="font-['Space_Grotesk',sans-serif] text-[#edeaf5] tracking-[-0.03em] mb-2 shrink-0"
        style={{ fontSize: "clamp(18px, 1.8vw, 24px)", fontWeight: 600, lineHeight: 1.3 }}
      >
        {ai.headline}
      </h3>
      <p
        className="font-['TikTok_Sans',sans-serif] text-[#a89cc8] tracking-[-0.02em] mb-5 shrink-0"
        style={{ fontSize: "14px", fontWeight: 400, lineHeight: "22px" }}
      >
        {ai.framing}
      </p>

      <div className="flex gap-3 mb-5 shrink-0">
        {phaseBlock("First time", ai.before.duration, ai.before.tools, ai.before.steps, false)}
        {phaseBlock("Now", ai.after.duration, ai.after.tools, ai.after.steps, true)}
      </div>

      <div
        className="rounded-xl p-4 shrink-0"
        style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${accent}15` }}
      >
        <p
          className="font-['TikTok_Sans',sans-serif] tracking-[-0.02em] mb-2"
          style={{
            fontSize: "11px",
            fontWeight: 600,
            color: accent,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          What makes it work
        </p>
        <ul className="flex flex-col gap-1.5">
          {ai.enablers.map((item, i) => (
            <li
              key={i}
              className="font-['TikTok_Sans',sans-serif] text-white tracking-[-0.02em] pl-3 relative"
              style={{ fontSize: "13px", fontWeight: 400, lineHeight: "20px" }}
            >
              <span
                className="absolute left-0 top-[8px] w-1 h-1 rounded-full"
                style={{ background: accent }}
              />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
