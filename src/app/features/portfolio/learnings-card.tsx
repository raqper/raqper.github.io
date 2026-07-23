import { accents, gradients } from "./portfolio-data";
import type { UseCase } from "./portfolio-data";

function SimpleLearnings({ uc, accent, grad }: { uc: UseCase; accent: string; grad: string }) {
  return (
    <>
      <h3
        className="font-['Space_Grotesk',sans-serif] text-[#edeaf5] tracking-[-0.03em] relative z-10 mb-4 shrink-0"
        style={{ fontSize: "clamp(18px, 1.8vw, 24px)", fontWeight: 600, lineHeight: 1.3 }}
      >
        {uc.learnings.headline}
      </h3>
      <p
        className="font-['TikTok_Sans',sans-serif] text-white tracking-[-0.02em] relative z-10 shrink-0"
        style={{ fontSize: "14px", fontWeight: 400, lineHeight: "22px", whiteSpace: "pre-line" }}
      >
        {uc.learnings.reflection}
      </p>
      {uc.learnings.aiAndTooling && (
        <div
          className="rounded-xl p-4 mt-6 relative z-10 shrink-0"
          style={{ background: grad, border: `1px solid ${accent}20` }}
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
            AI & Tooling
          </p>
          <p
            className="font-['TikTok_Sans',sans-serif] text-white tracking-[-0.02em]"
            style={{ fontSize: "14px", fontWeight: 400, lineHeight: "22px", whiteSpace: "pre-line" }}
          >
            {uc.learnings.aiAndTooling}
          </p>
        </div>
      )}
    </>
  );
}

function OutcomesLearnings({ uc, accent }: { uc: UseCase; accent: string }) {
  const { learnings } = uc;
  const stats = learnings.stats ?? [];
  const outcomes = learnings.outcomes ?? [];

  return (
    <div className="flex flex-col gap-6 h-full min-h-0 relative z-10">
      <div className="w-full shrink-0">
        <h3
          className="font-['Space_Grotesk',sans-serif] text-[#edeaf5] tracking-[-0.03em] w-full"
          style={{ fontSize: "clamp(20px, 2vw, 28px)", fontWeight: 600, lineHeight: 1.25 }}
        >
          {learnings.headline}
        </h3>
        <p
          className="font-['TikTok_Sans',sans-serif] text-white tracking-[-0.02em] mt-4 w-full"
          style={{ fontSize: "14px", fontWeight: 400, lineHeight: "22px" }}
        >
          {learnings.reflection}
        </p>
      </div>

      <div className="flex flex-col gap-3 w-full min-w-0 min-h-0 overflow-y-auto">
        {stats.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 shrink-0">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="rounded-xl p-3 flex flex-col"
                style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${accent}15` }}
              >
                <span
                  className="font-['Space_Grotesk',sans-serif] tracking-[-0.04em]"
                  style={{ fontSize: "clamp(24px, 2.5vw, 32px)", fontWeight: 700, lineHeight: 1, color: accent }}
                >
                  {stat.value}
                </span>
                <span
                  className="font-['TikTok_Sans',sans-serif] tracking-[-0.02em] mt-1"
                  style={{ fontSize: "11px", fontWeight: 400, lineHeight: "14px", color: "#a89cc8" }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        )}
        {outcomes.map((outcome, i) => (
          <div
            key={i}
            className="rounded-xl p-3 shrink-0"
            style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${accent}15` }}
          >
            <p
              className="font-['TikTok_Sans',sans-serif] tracking-[-0.02em] mb-1"
              style={{ fontSize: "13px", fontWeight: 600, lineHeight: "18px", color: accent }}
            >
              {outcome.title}
            </p>
            <p
              className="font-['TikTok_Sans',sans-serif] text-[#a89cc8] tracking-[-0.02em]"
              style={{ fontSize: "12px", fontWeight: 400, lineHeight: "18px" }}
            >
              {outcome.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function LearningsCard({ uc }: { uc: UseCase }) {
  const accent = accents[uc.id];
  const grad = gradients[uc.id];
  const isRich = (uc.learnings.outcomes?.length ?? 0) > 0;

  return (
    <div className="h-full flex flex-col p-5 sm:p-6 md:p-8 lg:p-10 relative overflow-hidden">
      <div
        className="absolute -bottom-20 -right-20 w-[400px] h-[400px] rounded-full opacity-20 blur-[100px] pointer-events-none"
        style={{ background: accent }}
      />
      <span
        className="font-['TikTok_Sans',sans-serif] tracking-[-0.03em] mb-6 relative z-10 shrink-0"
        style={{ fontSize: "12px", fontWeight: 500, color: accent }}
      >
        {uc.learnings.label ?? "Learnings"}
      </span>
      {isRich ? (
        <OutcomesLearnings uc={uc} accent={accent} />
      ) : (
        <SimpleLearnings uc={uc} accent={accent} grad={grad} />
      )}
    </div>
  );
}
