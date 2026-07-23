import { accents, chipActiveStyles, portfolioIntro } from "./portfolio-data";
import type { UseCaseId } from "./portfolio-data";

const SHOW_INTRO_PILLARS = false;

export function IntroCard({ onCaseClick }: { onCaseClick?: (id: UseCaseId) => void }) {
  return (
    <div className="h-full flex flex-col items-center justify-center p-5 sm:p-6 md:p-8 lg:p-10 relative overflow-hidden min-h-0">
      <div
        className="absolute -top-20 -right-20 w-[350px] h-[350px] rounded-full opacity-30 blur-[90px] pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(166,205,255,0.4) 0%, rgba(228,0,69,0.25) 50%, rgba(212,168,72,0.3) 100%)",
        }}
      />
      <div className="relative z-10 w-full flex flex-col items-center justify-center gap-4 md:gap-6 text-center min-w-0 min-h-0">
        <div className="w-full">
          <h2
            className="font-['Space_Grotesk',sans-serif] text-[#edeaf5] tracking-[-0.04em]"
            style={{
              fontSize: "clamp(28px, 3.2vw, 44px)",
              fontWeight: 700,
              lineHeight: 1.1,
            }}
          >
            {portfolioIntro.headline}
          </h2>
          <p
            className="font-['TikTok_Sans',sans-serif] text-[#a89cc8] tracking-[-0.02em] mt-4"
            style={{
              fontSize: "clamp(16px, 1.6vw, 20px)",
              fontWeight: 400,
              lineHeight: 1.5,
            }}
          >
            {portfolioIntro.subhead}
          </p>
        </div>
        <div className="w-full flex flex-col md:flex-row items-stretch gap-3 md:gap-[12px]">
          {portfolioIntro.cases.map((item) => {
            const accent = accents[item.id];
            const chipStyle = chipActiveStyles[item.id];
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onCaseClick?.(item.id)}
                aria-label={`Jump to ${item.label} case study`}
                className="group rounded-xl px-3 py-4 md:py-5 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ede0a8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#130032]"
                style={{
                  flex: "1 1 0",
                  minWidth: 0,
                  minHeight: "auto",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  background: "rgba(46,26,106,0.25)",
                  border: `1px solid ${chipStyle.border}`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = chipStyle.bg;
                  e.currentTarget.style.borderColor = accent;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(46,26,106,0.25)";
                  e.currentTarget.style.borderColor = chipStyle.border;
                }}
              >
                <div className="mb-3 flex h-12 w-[80px] md:w-[108px] shrink-0 items-center justify-center">
                  {item.logo ? (
                    <img
                      src={item.logo}
                      alt=""
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <div
                      className="flex h-full w-full items-center justify-center rounded-md border border-dashed"
                      style={{
                        borderColor: `${accent}55`,
                        background: `${accent}12`,
                      }}
                      aria-hidden="true"
                    />
                  )}
                </div>
                <span
                  className="font-['Space_Grotesk',sans-serif] tracking-[-0.03em] block mb-2"
                  style={{
                    fontSize: "clamp(16px, 1.4vw, 20px)",
                    fontWeight: 700,
                    lineHeight: 1.2,
                    color: accent,
                  }}
                >
                  {item.role}
                </span>
                <p
                  className="font-['TikTok_Sans',sans-serif] text-white tracking-[-0.02em] m-0"
                  style={{ fontSize: "12px", fontWeight: 400, lineHeight: "18px" }}
                >
                  {item.hook}
                </p>
              </button>
            );
          })}
        </div>
        {SHOW_INTRO_PILLARS && (
        <div
          className="flex flex-col gap-2 pt-3 w-full"
          style={{ borderTop: "1px solid rgba(46,26,106,0.4)" }}
        >
          {portfolioIntro.pillars.map((pillar, i) => (
            <div
              key={i}
              className="rounded-xl px-4 py-3 text-center"
              style={{
                background: "rgba(46,26,106,0.35)",
                border: "1px solid rgba(46,26,106,0.5)",
              }}
            >
              <p
                className="font-['TikTok_Sans',sans-serif] tracking-[-0.02em] mb-1"
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "#d4a848",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {pillar.label}
              </p>
              <p
                className="font-['TikTok_Sans',sans-serif] text-white tracking-[-0.02em]"
                style={{ fontSize: "14px", fontWeight: 400, lineHeight: "22px" }}
              >
                {pillar.value}
              </p>
            </div>
          ))}
        </div>
        )}
      </div>
    </div>
  );
}
