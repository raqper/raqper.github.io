import { accents, gradients } from "./portfolio-data";
import type { UseCase } from "./portfolio-data";

export function OverviewCard({ uc }: { uc: UseCase }) {
  const accent = accents[uc.id];
  return (
    <div className="h-full flex flex-col justify-between p-8 md:p-10 relative overflow-hidden">
      {uc.bgImage ? (
        <>
          <img
            src={uc.bgImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-top select-none pointer-events-none"
            draggable={false}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, #130030 0%, #130030dd 35%, #13003099 55%, transparent 100%)",
            }}
          />
        </>
      ) : (
        <div
          className="absolute -top-20 -right-20 w-[300px] h-[300px] rounded-full opacity-40 blur-[80px]"
          style={{ background: accent }}
        />
      )}
      <div className="relative z-10">
        <span
          className="font-['TikTok_Sans',sans-serif] tracking-[-0.03em]"
          style={{ fontSize: "16px", fontWeight: 500, color: accent }}
        >
          {uc.overviewLabel ?? "Overview"}
        </span>
      </div>
      <div className="flex-1 flex flex-col justify-end relative z-10">
        <p
          className="font-['TikTok_Sans',sans-serif] text-white tracking-[-0.02em]"
          style={{ fontSize: "13px", fontWeight: 600, lineHeight: "18px" }}
        >
          {uc.company} · {uc.year}
        </p>
        <h3
          className="font-['Space_Grotesk',sans-serif] text-[#edeaf5] tracking-[-0.04em] mt-2"
          style={{
            fontSize: "clamp(32px, 3.5vw, 48px)",
            fontWeight: 700,
            lineHeight: 1.05,
          }}
        >
          {uc.title}
        </h3>
        <div
          className="flex flex-col gap-5 mt-6 pt-6"
          style={{ borderTop: "1px solid rgba(46,26,106,0.4)" }}
        >
          <div>
            <h4
              className="font-['Space_Grotesk',sans-serif] text-[#edeaf5] tracking-[-0.03em] mb-2"
              style={{ fontSize: "18px", fontWeight: 600, lineHeight: 1.3 }}
            >
              My role
            </h4>
            <p
              className="font-['TikTok_Sans',sans-serif] tracking-[-0.02em] mt-1 mb-2"
              style={{ fontSize: "14px", fontWeight: 500, lineHeight: "20px", color: "#ffffff" }}
            >
              {uc.role}
            </p>
            <p
              className="font-['TikTok_Sans',sans-serif] text-[#a89cc8] tracking-[-0.02em]"
              style={{ fontSize: "14px", fontWeight: 400, lineHeight: "20px" }}
            >
              {uc.overview.role.summary}
            </p>
          </div>
          <div>
            <h4
              className="font-['Space_Grotesk',sans-serif] text-[#edeaf5] tracking-[-0.03em] mb-2"
              style={{ fontSize: "18px", fontWeight: 600, lineHeight: 1.3 }}
            >
              Team & Setup
            </h4>
            <p
              className="font-['TikTok_Sans',sans-serif] text-[#a89cc8] tracking-[-0.02em]"
              style={{ fontSize: "14px", fontWeight: 400, lineHeight: "20px" }}
            >
              {uc.overview.teamSetup.caption}
            </p>
            {uc.overview.stats && uc.overview.stats.length > 0 && (
              <div className="flex flex-wrap gap-x-10 gap-y-3 mt-4">
                {uc.overview.stats.map((stat, i) => (
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
        </div>
      </div>
    </div>
  );
}
