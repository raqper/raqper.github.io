import { accents } from "./portfolio-data";
import type { UseCase } from "./portfolio-data";

export function FIDLabel({ accent, label }: { accent: string; label?: string }) {
  return (
    <span
      className="font-['TikTok_Sans',sans-serif] tracking-[-0.03em] mb-3 block"
      style={{ fontSize: "12px", fontWeight: 500, color: accent }}
    >
      {label ?? "Feature in detail"}
    </span>
  );
}

export function FIDIntroCard({ uc }: { uc: UseCase }) {
  const accent = accents[uc.id];
  const fid = uc.featureInDetail;
  if (!fid) return null;

  const isSwapWizard = uc.id === "swap-wizard";

  const roundBlock = (round: typeof fid.rounds[0], roundLabel: string) => (
    <div className="flex flex-col gap-2">
      <h3
        className="font-['Space_Grotesk',sans-serif] text-[#edeaf5] tracking-[-0.03em]"
        style={{ fontSize: "clamp(16px, 1.6vw, 20px)", fontWeight: 600, lineHeight: 1.3 }}
      >
        {roundLabel}
      </h3>
      <p
        className="font-['TikTok_Sans',sans-serif] text-white tracking-[-0.02em]"
        style={{ fontSize: "14px", fontWeight: 400, lineHeight: "22px", whiteSpace: "pre-line" }}
      >
        {round.goal}
      </p>
      <div className="flex flex-col gap-2">
        {round.phases.map((phase, i) => (
          <div key={i} className="flex gap-3">
            <span
              className="font-['Space_Grotesk',sans-serif] shrink-0 mt-0.5"
              style={{ fontSize: "16px", fontWeight: 700, lineHeight: 1, color: accent, opacity: 0.5 }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <p
                className="font-['TikTok_Sans',sans-serif] text-[#edeaf5] tracking-[-0.02em] mb-0.5"
                style={{ fontSize: "14px", fontWeight: 700, lineHeight: "20px" }}
              >
                {phase.mode}
              </p>
              <p
                className="font-['TikTok_Sans',sans-serif] text-[#a89cc8] tracking-[-0.02em]"
                style={{ fontSize: "14px", fontWeight: 400, lineHeight: "20px" }}
              >
                {phase.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <p
        className="font-['TikTok_Sans',sans-serif] text-white tracking-[-0.02em]"
        style={{ fontSize: "14px", fontWeight: 400, lineHeight: "22px" }}
      >
        {round.outcome}
      </p>
    </div>
  );

  return (
    <div className="h-full flex flex-col p-8 md:p-10 overflow-y-auto">
      <FIDLabel accent={accent} label={fid.introLabel} />
      <h3
        className="font-['Space_Grotesk',sans-serif] text-[#edeaf5] tracking-[-0.03em] mb-5"
        style={{ fontSize: "clamp(24px, 2.5vw, 32px)", fontWeight: 600, lineHeight: 1.3 }}
      >
        {fid.title}
      </h3>
      <p
        className="font-['TikTok_Sans',sans-serif] text-white tracking-[-0.02em]"
        style={{ fontSize: "20px", fontWeight: 400, lineHeight: "32px" }}
      >
        {fid.context}
      </p>
      {isSwapWizard && fid.rounds.length >= 2 ? (
        <div className="flex flex-col gap-4 mt-6">
          {roundBlock(fid.rounds[0], fid.rounds[0].label)}
          <div
            className="shrink-0 h-px w-full"
            style={{ background: "rgba(255,255,255,0.08)" }}
          />
          {roundBlock(fid.rounds[1], fid.rounds[1].label)}
        </div>
      ) : (
        fid.reflection && (
          <p
            className="font-['TikTok_Sans',sans-serif] text-[#a89cc8] tracking-[-0.02em] mt-6"
            style={{ fontSize: "16px", fontWeight: 400, lineHeight: "26px" }}
          >
            {fid.reflection}
          </p>
        )
      )}
    </div>
  );
}

export function FIDRoundsCard({ uc }: { uc: UseCase }) {
  const accent = accents[uc.id];
  const fid = uc.featureInDetail;
  if (!fid || fid.rounds.length < 2) return null;

  const hideOutcome = uc.id === "swap-wizard";
  const round1 = fid.rounds[0];
  const round2 = fid.rounds[1];

  const roundBlock = (round: typeof round1, roundLabel: string) => (
    <div className="flex flex-col gap-2">
      <h3
        className="font-['Space_Grotesk',sans-serif] text-[#edeaf5] tracking-[-0.03em]"
        style={{ fontSize: "clamp(16px, 1.6vw, 20px)", fontWeight: 600, lineHeight: 1.3 }}
      >
        {roundLabel}
      </h3>
      <p
        className="font-['TikTok_Sans',sans-serif] text-white tracking-[-0.02em]"
        style={{ fontSize: "14px", fontWeight: 400, lineHeight: "22px", whiteSpace: "pre-line" }}
      >
        {round.goal}
      </p>
      <div className="flex flex-col gap-2">
        {round.phases.map((phase, i) => (
          <div key={i} className="flex gap-3">
            <span
              className="font-['Space_Grotesk',sans-serif] shrink-0 mt-0.5"
              style={{ fontSize: "16px", fontWeight: 700, lineHeight: 1, color: accent, opacity: 0.5 }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <p
                className="font-['TikTok_Sans',sans-serif] text-[#edeaf5] tracking-[-0.02em] mb-0.5"
                style={{ fontSize: "14px", fontWeight: 700, lineHeight: "20px" }}
              >
                {phase.mode}
              </p>
              <p
                className="font-['TikTok_Sans',sans-serif] text-[#a89cc8] tracking-[-0.02em]"
                style={{ fontSize: "14px", fontWeight: 400, lineHeight: "20px" }}
              >
                {phase.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      {!hideOutcome && (
        <p
          className="font-['TikTok_Sans',sans-serif] text-white tracking-[-0.02em]"
          style={{ fontSize: "14px", fontWeight: 400, lineHeight: "22px" }}
        >
          {round.outcome}
        </p>
      )}
    </div>
  );

  const isNos = uc.id === "nos";

  return (
    <div
      className={`h-full flex flex-col p-8 md:p-10 ${isNos ? "overflow-hidden" : "overflow-y-auto"}`}
    >
      <FIDLabel accent={accent} label={fid.roundsLabel} />
      <div className="flex flex-col gap-4 mt-2">
        {roundBlock(round1, round1.label)}
        <div
          className="shrink-0 h-px w-full"
          style={{ background: "rgba(255,255,255,0.08)" }}
        />
        {roundBlock(round2, round2.label)}
      </div>
    </div>
  );
}
