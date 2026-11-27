import { Link } from "react-router";
import { getOpenCohorts, WORKSHOP_PATH, workshop } from "@/app/data/workshop-data";
import { FloatingShapesStyles, STARS, type StarName } from "@/app/features/workshop/floating-shapes";
import { DateTiles, PriceOffer, PromoTicker } from "@/app/features/workshop/promo-blocks";

const FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ede0a8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#14003a]";

type CornerStar = { name: StarName; className: string; drift: string; delay: string; rotate?: number };

// A small cluster in the card's right corner, behind the content.
const CORNER_STARS: CornerStar[] = [
  { name: "glassStar", className: "right-[-26px] top-[-30px] w-[130px] lg:w-[150px]", drift: "14s", delay: "0s", rotate: -8 },
  { name: "goldSparkle", className: "right-[118px] top-[10px] w-[38px]", drift: "10s", delay: "-3s", rotate: 12 },
  { name: "fluffyStar", className: "right-[40px] bottom-[-34px] w-[86px]", drift: "12s", delay: "-5s", rotate: 10 },
];

/**
 * Workshop campaign highlight on /career, between the hero and Experience:
 * the ticker band plus a compact card with the price, dates and CTAs.
 * Disappears once no dates are open.
 */
export function WorkshopHighlight() {
  if (getOpenCohorts().length === 0) return null;

  return (
    <section aria-labelledby="workshop-highlight-title" className="relative" style={{ background: "rgb(5 0 14)" }}>
      <FloatingShapesStyles />
      <PromoTicker />

      <div className="px-6 pt-8 pb-4 md:px-10 md:pt-10">
        <div className="mx-auto w-full max-w-[1400px]">
          <div
            className="relative overflow-hidden rounded-xl border border-[#b08828]/40 p-5 md:p-6 lg:px-8"
            style={{ background: "radial-gradient(120% 140% at 85% 30%, #2a0a5e 0%, #1c0048 45%, #14003a 100%)" }}
          >
            {/* Decorative corner stars, desktop only so they never sit on the text. */}
            <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[260px] xl:block" aria-hidden>
              {CORNER_STARS.map((star) => (
                <img
                  key={star.name}
                  src={STARS[star.name]}
                  alt=""
                  loading="lazy"
                  draggable={false}
                  className={`workshop-star workshop-drift absolute h-auto ${star.className}`}
                  style={{ ["--drift" as string]: star.drift, ["--delay" as string]: star.delay, rotate: `${star.rotate ?? 0}deg` }}
                />
              ))}
            </div>

            {/* One row from xl (1280px). Below that: text on top, then price, dates and CTAs in one row from md. */}
            <div className="relative z-[1] flex flex-col gap-5 xl:flex-row xl:items-center xl:gap-8 xl:pr-[160px]">
              {/* Text */}
              <div className="min-w-0 xl:flex-1">
                <p className="text-[#d4a848]" style={{ fontFamily: "var(--font-sans)", fontSize: "12px", lineHeight: "16px", fontWeight: 600 }}>
                  Live intensive workshop
                </p>
                <h2
                  id="workshop-highlight-title"
                  className="mt-1.5 text-[#edeaf5] [text-wrap:balance]"
                  style={{ fontFamily: "var(--font-expanded)", fontWeight: 600, letterSpacing: "-0.03em", fontSize: "clamp(20px, 1.8vw, 24px)", lineHeight: 1.2 }}
                >
                  {workshop.title}
                </h2>
                <p
                  className="mt-2 max-w-[520px] text-white/85 [text-wrap:pretty]"
                  style={{ fontFamily: "var(--font-sans)", fontSize: "14px", lineHeight: "20px", letterSpacing: "-0.01em" }}
                >
                  {/* Same short line as the promo card; the full promise lives on /workshop. */}
                  Vibe code real screens from a component library with Claude and Figma.
                </p>
              </div>

              <div className="flex flex-col gap-5 md:flex-row md:items-center md:gap-8 xl:shrink-0">
              {/* Price + dates, exactly as on /workshop */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
                <PriceOffer />
                <DateTiles />
              </div>

              {/* CTAs */}
              <div className="flex flex-row items-center gap-4 md:flex-col md:items-start md:gap-2">
                <Link
                  to={WORKSHOP_PATH}
                  className={`group inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-[#ede0a8] bg-[#ede0a8] px-5 py-2.5 text-[#0c0024] transition-all duration-300 hover:bg-transparent hover:text-[#ede0a8] ${FOCUS}`}
                  style={{ fontFamily: "var(--font-sans)", fontSize: "14px", lineHeight: "20px", fontWeight: 600 }}
                >
                  Get your ticket
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                  </svg>
                </Link>
                <Link
                  to={`${WORKSHOP_PATH}#program`}
                  className={`whitespace-nowrap rounded-sm px-1 text-white/85 underline-offset-4 transition-colors hover:text-white hover:underline ${FOCUS}`}
                  style={{ fontFamily: "var(--font-sans)", fontSize: "14px", lineHeight: "20px", fontWeight: 500 }}
                >
                  See the agenda
                </Link>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
