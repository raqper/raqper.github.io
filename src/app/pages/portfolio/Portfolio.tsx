import { useState, useCallback, useRef } from "react";
import { Link } from "react-router";
import { PortfolioSection, type PortfolioChipState } from "@/app/features/portfolio/portfolio-section";
import { CtaSection } from "@/app/features/career/cta-section";
import { Footer } from "@/app/components/footer";
import { useCaseChips, chipActiveStyles } from "@/app/features/portfolio/portfolio-data";

export default function Portfolio() {
  const [chipState, setChipState] = useState<PortfolioChipState | null>(null);
  const progressBarNavRef = useRef<HTMLDivElement>(null);
  const handleChipStateChange = useCallback((state: PortfolioChipState) => {
    setChipState(state);
  }, []);

  return (
    <div className="w-full min-h-screen" style={{ background: "var(--p-bg-base)" }}>
      {/* Navigation — matches hero-section nav style */}
      <nav className="fixed top-0 left-0 right-0 z-50">
        {/* Backdrop blur */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(to bottom, rgba(12,0,36,0.85) 0%, rgba(12,0,36,0.4) 70%, transparent 100%)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
        />
        <div className="px-4 sm:px-6 md:px-10 py-4 md:py-6">
          <div className="max-w-[1400px] mx-auto w-full flex items-center justify-between gap-3">
            {/* Left — Back arrow + Portfolio title */}
            <div className="flex items-center gap-3 shrink-0">
              <Link
                to="/career"
                className="relative flex items-center justify-center rounded-full p-[7px] text-white hover:text-[#edeaf5] transition-colors duration-300"
                style={{
                  background: "rgba(46,26,106,0.25)",
                  border: "1px solid rgba(46,26,106,0.4)",
                }}
                aria-label="Back to home"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 12H5" />
                  <path d="m12 19-7-7 7-7" />
                </svg>
              </Link>
              <h2
                className="text-[#edeaf5] tracking-[-0.04em]"
                style={{ fontFamily: "var(--font-expanded)", fontSize: "clamp(18px, 2.5vw, 28px)", fontWeight: 700, lineHeight: 1.1 }}
              >
                Portfolio
              </h2>
            </div>

            {/* Right — Use case chips (scrollable on small screens) */}
            <div className="flex gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar">
              {useCaseChips.map((chip) => {
                const isActive = chipState?.activeChip === chip.id;
                const styles = chipActiveStyles[chip.id];
                return (
                  <button
                    key={chip.id}
                    onClick={() => chipState?.handleChipClick(chip.id)}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border transition-all duration-300 cursor-pointer shrink-0 whitespace-nowrap"
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "12px",
                      fontWeight: 500,
                      backgroundColor: isActive ? styles.bg : "transparent",
                      borderColor: isActive ? styles.border : "rgba(168,156,200,0.35)",
                      color: isActive ? styles.text : "#c4bade",
                    }}
                  >
                    {chip.label}
                  </button>
                );
              })}
            </div>
          </div>
          {/* Progress bar — aligned with nav content */}
          <div
            className="max-w-[1400px] mx-auto w-full mt-4 md:mt-6 h-px relative overflow-hidden"
            style={{ background: "rgba(46,26,106,0.4)" }}
          >
            <div
              ref={progressBarNavRef}
              className="absolute inset-y-0 left-0 w-full origin-left"
              style={{
                transform: "scaleX(0)",
                background: "linear-gradient(to right, #2e1a6a, #b08828, #ede0a8)",
              }}
            />
          </div>
        </div>
      </nav>

      <PortfolioSection onChipStateChange={handleChipStateChange} navProgressBarRef={progressBarNavRef} />
      <CtaSection variant="portfolio" />
      <Footer />
    </div>
  );
}
