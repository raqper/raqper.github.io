import { ScrollReveal } from "@/app/components/scroll-reveal";
import { CarouselArrow } from "@/app/components/shared/carousel-arrow";
import { useCarouselScroll } from "@/app/hooks/use-carousel-scroll";
import { milestones, type Milestone } from "@/app/data/timeline-data";

const CAROUSEL_ARROW_CLASS =
  "w-10 h-10 flex items-center justify-center rounded-full border text-[#ede0a8] hover:bg-[#2e1a6a]/20 disabled:opacity-40 disabled:pointer-events-none touch-manipulation";
const CAROUSEL_ARROW_STYLE = { borderColor: "rgba(46,26,106,0.5)", fontFamily: "var(--font-sans)" };

function MilestoneCard({ milestone }: { milestone: Milestone }) {
  return (
    <div className="bg-[#1c0048] rounded-xl p-3 md:p-5 border border-[#2e1a6a] hover:shadow-[0_4px_24px_rgba(46,26,106,0.12)] transition-all duration-300">
      <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
        <span
          className="text-[#edeaf5] tracking-[-0.05em]"
          style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(22px, 4vw, 28px)", fontWeight: 200 }}
        >
          {milestone.year}
        </span>
        <span
          role="tag"
          aria-label={`Type: ${milestone.type}`}
          className={`text-[10px] md:text-[11px] capitalize tracking-[-0.03em] px-2.5 py-1 rounded-full border ${
            milestone.type === "education"
              ? "bg-[#ede0a8]/10 text-[#ede0a8] border-[#ede0a8]/20"
              : "bg-[#b08828]/15 text-[#d4a848] border-[#b08828]/30"
          }`}
          style={{ fontFamily: "var(--font-sans)", fontWeight: 500, lineHeight: "1" }}
        >
          {milestone.type === "education" ? "Education" : "Work"}
        </span>
      </div>
      <h3
        className="text-[#edeaf5] tracking-[-0.03em] mb-1"
        style={{ fontFamily: "var(--font-expanded)", fontSize: "clamp(12px, 2.5vw, 14px)", fontWeight: 600, lineHeight: "20px" }}
      >
        {milestone.title}
      </h3>
      <p
        className="text-[#a89cc8] tracking-[-0.02em] mb-2 md:mb-3"
        style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(12px, 2.5vw, 14px)", fontWeight: 400, lineHeight: "20px" }}
      >
        {milestone.subtitle}
      </p>
      <p
        className="text-white tracking-[-0.02em] line-clamp-3 md:line-clamp-none"
        style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(12px, 2.5vw, 14px)", fontWeight: 400, lineHeight: "22px" }}
      >
        {milestone.description}
      </p>
    </div>
  );
}

export function TimelineSection() {
  const { stripRef, atStart, atEnd, isDragging, scrollBy, scrollByRight, dragHandlers } = useCarouselScroll();

  return (
    <section
      id="experience"
      className="relative"
      style={{ background: "rgb(5 0 14)" }}
    >
      <div
        className="absolute inset-x-0 top-0 bottom-0 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, rgb(5 0 14) 0%, #0a001c 15%, #0f0028 40%, #0a001c 80%, rgb(5 0 14) 100%)",
        }}
      />

      <div className="relative flex flex-col">
        <ScrollReveal className="shrink-0" offsetY={30} duration={1.4}>
          <div className="pt-16 md:pt-24">
            <div className="px-6 md:px-10">
              <div className="max-w-[1400px] mx-auto w-full">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <p
                      className="text-[#a89cc8] tracking-[-0.05em] mb-4"
                      style={{ fontFamily: "var(--font-sans)", fontSize: "14px" }}
                    >
                      Experience
                    </p>
                    <h2
                      className="text-[#edeaf5] tracking-[-0.04em]"
                      style={{ fontFamily: "var(--font-expanded)", fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 700, lineHeight: 1.1 }}
                    >
                      Scaling impact over time
                    </h2>
                    <p
                      className="text-white tracking-[-0.02em] mt-6 md:mt-8"
                      style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(14px, 1.2vw, 17px)", lineHeight: 1.55 }}
                    >
                      Since 2017, I've progressively expanded my scope, from designing interfaces to shaping how teams build, scale, and integrate AI into their workflows.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 basis-auto" aria-label="Carousel navigation">
                    <CarouselArrow
                      direction="left"
                      disabled={atStart}
                      onClick={scrollBy}
                      className={CAROUSEL_ARROW_CLASS}
                      style={CAROUSEL_ARROW_STYLE}
                    />
                    <CarouselArrow
                      direction="right"
                      disabled={atEnd}
                      onClick={scrollByRight}
                      className={CAROUSEL_ARROW_CLASS}
                      style={CAROUSEL_ARROW_STYLE}
                    />
                  </div>
                </div>

                <div className="pt-6" style={{ marginLeft: "calc(-50vw + 50%)", marginRight: "calc(-50vw + 50%)" }}>
                  <div
                    ref={stripRef}
                    className="flex gap-4 overflow-x-auto overflow-y-hidden pb-4 -mb-4 no-scrollbar snap-x snap-proximity"
                    style={{
                      scrollbarWidth: "none",
                      msOverflowStyle: "none",
                      paddingLeft: "max(24px, min(40px, 5.2vw), -660px + 48vw)",
                      paddingRight: "max(24px, min(40px, 5.2vw), calc((100vw - 1400px) / 2 + 40px))",
                      scrollPaddingInlineStart: "max(24px, min(40px, 5.2vw), -660px + 48vw)",
                      cursor: isDragging ? "grabbing" : "grab",
                      userSelect: "none",
                    }}
                    {...dragHandlers}
                    onMouseLeave={dragHandlers.onMouseUp}
                  >
                    {milestones.map((milestone) => (
                      <div
                        key={milestone.id}
                        className="shrink-0 snap-start"
                        style={{ width: "clamp(240px, 60vw, 380px)" }}
                      >
                        <MilestoneCard milestone={milestone} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <div className="px-6 md:px-10 pb-16" />
      </div>
    </section>
  );
}
