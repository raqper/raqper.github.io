import { accents, gradients } from "./portfolio-data";
import type { UseCase } from "./portfolio-data";

export function ProblemCard({ uc }: { uc: UseCase }) {
  const accent = accents[uc.id];
  const grad = gradients[uc.id];
  const framingParts = uc.problem.framing.split("\n• ");
  const hasIntro = framingParts.length > 1;
  const intro = hasIntro ? framingParts[0] : null;
  const bullets = hasIntro ? framingParts.slice(1) : null;
  const survey = uc.problem.survey;
  const isSwapWizard = uc.id === "swap-wizard";
  const isNokia = uc.id === "nokia";

  return (
    <div className="h-full flex flex-col p-8 md:p-10 min-h-0 overflow-y-auto">
      <span
        className="font-['TikTok_Sans',sans-serif] tracking-[-0.03em] mb-6 shrink-0"
        style={{ fontSize: "12px", fontWeight: 500, color: accent }}
      >
        {uc.problemLabel ?? "Problem"}
      </span>
      <h3
        className="font-['Space_Grotesk',sans-serif] text-[#edeaf5] tracking-[-0.03em] mb-5 shrink-0"
        style={{ fontSize: "20px", fontWeight: 600, lineHeight: 1.3 }}
      >
        {uc.problem.headline}
      </h3>
      {hasIntro && bullets ? (
        <>
          <p
            className="font-['TikTok_Sans',sans-serif] text-white tracking-[-0.02em] mb-4 shrink-0"
            style={{ fontSize: "16px", fontWeight: 400, lineHeight: "26px" }}
          >
            {intro}
          </p>
          <ul className="space-y-2 shrink-0">
            {bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full mt-[10px] shrink-0" style={{ background: accent }} />
                <span
                  className="font-['TikTok_Sans',sans-serif] text-white tracking-[-0.02em]"
                  style={{ fontSize: "16px", fontWeight: 400, lineHeight: "26px" }}
                >
                  {b}
                </span>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p
          className="font-['TikTok_Sans',sans-serif] text-white tracking-[-0.02em] shrink-0"
          style={{ fontSize: "16px", fontWeight: 400, lineHeight: "26px" }}
        >
          {uc.problem.framing}
        </p>
      )}
      {isSwapWizard && (
        <>
          <span
            className="font-['TikTok_Sans',sans-serif] tracking-[-0.03em] mt-8 mb-4 block shrink-0"
            style={{ fontSize: "12px", fontWeight: 500, color: accent }}
          >
            {uc.approachLabel ?? "Approach"}
          </span>
          <h3
            className="font-['Space_Grotesk',sans-serif] text-[#edeaf5] tracking-[-0.03em] mb-4 shrink-0"
            style={{ fontSize: "clamp(16px, 1.6vw, 20px)", fontWeight: 600, lineHeight: 1.3 }}
          >
            {uc.approach.headline}
          </h3>
          <p
            className="font-['TikTok_Sans',sans-serif] text-white tracking-[-0.02em] mb-8 shrink-0"
            style={{ fontSize: "14px", fontWeight: 400, lineHeight: "22px", whiteSpace: "pre-line" }}
          >
            {uc.approach.framing}
          </p>
          <div className="flex flex-col gap-5 shrink-0">
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
            <div className="flex flex-col gap-4 mt-6 shrink-0">
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
        </>
      )}
      {survey && (
        <div
          className="mt-6 shrink-0 rounded-xl overflow-hidden flex"
          style={{ border: `1px solid ${accent}15` }}
        >
          <div
            className="flex-1 p-5 flex flex-col"
            style={{ background: `${accent}08` }}
          >
            <p
              className="font-['TikTok_Sans',sans-serif] text-[#edeaf5] tracking-[-0.02em]"
              style={{ fontSize: "13px", fontWeight: 600, lineHeight: "16px" }}
            >
              {survey.satisfactionQuestion}
            </p>
            <div className={isNokia ? "flex items-baseline gap-3 mt-3" : "mt-3"}>
              <p
                className="font-['Space_Grotesk',sans-serif] tracking-[-0.04em] shrink-0"
                style={{ fontSize: "clamp(32px, 3vw, 42px)", fontWeight: 700, lineHeight: 1, color: accent }}
              >
                {survey.npsScore}
              </p>
              {(survey.scoreLabel ?? "NPS®") && (
                <p
                  className={`font-['TikTok_Sans',sans-serif] tracking-[-0.02em] ${isNokia ? "shrink-0" : "mt-1"}`}
                  style={{ fontSize: "12px", fontWeight: 500, lineHeight: "14px", color: "#ffffff" }}
                >
                  {survey.scoreLabel ?? "NPS®"}
                </p>
              )}
            </div>
            <p
              className="font-['TikTok_Sans',sans-serif] text-[#a89cc8] tracking-[-0.02em] mt-3"
              style={{ fontSize: "12px", fontWeight: 400, lineHeight: "16px" }}
            >
              {survey.sentiment}
            </p>
            {survey.sourceNote && (
              <p
                className="font-['TikTok_Sans',sans-serif] tracking-[-0.02em] mt-auto pt-3"
                style={{ fontSize: "11px", fontWeight: 400, lineHeight: "14px", color: accent }}
              >
                *{survey.sourceNote}
              </p>
            )}
          </div>
          <div className="w-px self-stretch" style={{ background: `${accent}15` }} />
          <div
            className="flex-1 p-5 flex flex-col"
            style={{ background: `${accent}05` }}
          >
            <p
              className="font-['TikTok_Sans',sans-serif] text-[#edeaf5] tracking-[-0.02em] mb-4"
              style={{ fontSize: "13px", fontWeight: 600, lineHeight: "16px" }}
            >
              {survey.customizeQuestion}
            </p>
            <div className="flex flex-col gap-4 mt-auto">
              {survey.customizeOptions.map((opt, i) => (
                <div key={i} className="flex flex-col gap-0.5">
                  <p
                    className="font-['Space_Grotesk',sans-serif] tracking-[-0.04em]"
                    style={{ fontSize: "clamp(28px, 2.5vw, 36px)", fontWeight: 700, lineHeight: 1, color: accent }}
                  >
                    {opt.percent}%
                  </p>
                  <p
                    className="font-['TikTok_Sans',sans-serif] text-[#a89cc8] tracking-[-0.02em]"
                    style={{ fontSize: "12px", fontWeight: 400, lineHeight: "16px" }}
                  >
                    "{opt.label}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
