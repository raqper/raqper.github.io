import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { ScrollReveal } from "@/app/components/scroll-reveal";
import { CarouselArrow } from "@/app/components/shared/carousel-arrow";
import { useCarouselScroll } from "@/app/hooks/use-carousel-scroll";
import { contentItems, highlights, type ContentItem } from "@/app/data/content-items";
import {
  CONTENT_CAROUSEL_ARROW_STEP_FALLBACK,
  CONTENT_CAROUSEL_GAP_PX,
} from "@/app/features/career/content-carousel-layout";

const typeColors: Record<string, { bg: string; text: string; border: string }> = {
  livestream: { bg: "bg-[#b08828]/15", text: "text-[#d4a848]", border: "border-[#b08828]/30" },
  article: { bg: "bg-[#ede0a8]/10", text: "text-[#ede0a8]", border: "border-[#ede0a8]/20" },
  talk: { bg: "bg-[#2e1a6a]/20", text: "text-[#9b82e0]", border: "border-[#2e1a6a]/40" },
  workshop: { bg: "bg-[#2e1a6a]/20", text: "text-[#9b82e0]", border: "border-[#2e1a6a]/40" },
  meetup: { bg: "bg-[#2e1a6a]/20", text: "text-[#9b82e0]", border: "border-[#2e1a6a]/40" },
  course: { bg: "bg-[#b08828]/15", text: "text-[#d4a848]", border: "border-[#b08828]/30" },
  hackathon: { bg: "bg-[#7a2858]/20", text: "text-[#e080b0]", border: "border-[#7a2858]/40" },
  podcast: { bg: "bg-[#b08828]/15", text: "text-[#d4a848]", border: "border-[#b08828]/30" },
  roundtable: { bg: "bg-[#1a5a6a]/20", text: "text-[#6bc4d4]", border: "border-[#1a5a6a]/40" },
};

const CAROUSEL_ARROW_CLASS =
  "w-10 h-10 flex items-center justify-center rounded-full border text-[#ede0a8] hover:bg-[#2e1a6a]/20 disabled:opacity-40 disabled:pointer-events-none touch-manipulation";
const CAROUSEL_ARROW_STYLE = { borderColor: "rgba(46,26,106,0.5)", fontFamily: "var(--font-sans)" };

function CardItem({ item }: { item: ContentItem }) {
  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group bg-[#1c0048] rounded-xl overflow-hidden border border-[#2e1a6a] hover:border-[#2e1a6a]/60 transition-all duration-300 hover:shadow-[0_8px_40px_rgba(46,26,106,0.15)] flex h-full min-h-[320px] w-full flex-col"
    >
      <div className="relative h-[120px] shrink-0 overflow-hidden">
        <ImageWithFallback
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1c0048]/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
      <div className="flex flex-1 flex-col p-3">
        <div className="mb-2 flex min-w-0 items-center gap-2">
          <span
            className="min-w-0 truncate text-[13px] tracking-[-0.02em] text-white"
            style={{ fontFamily: "var(--font-sans)", fontWeight: 500 }}
          >
            {item.platform}
          </span>
          <span className="h-1 w-1 shrink-0 rounded-full bg-[#2e1a6a]" />
          <span
            className="shrink-0 text-[13px] tracking-[-0.02em] text-[#a89cc8]"
            style={{ fontFamily: "var(--font-sans)", fontWeight: 400 }}
          >
            {item.date}
          </span>
        </div>
        <h3
          className="mb-2 line-clamp-2 min-h-[40px] text-[13px] tracking-[-0.03em] text-[#edeaf5] transition-colors group-hover:text-[#d4c8e8]"
          style={{ fontFamily: "var(--font-expanded)", fontWeight: 600, lineHeight: "20px" }}
        >
          {item.title}
        </h3>
        <p
          className="line-clamp-3 min-h-[60px] flex-1 text-[13px] tracking-[-0.02em] text-white"
          style={{ fontFamily: "var(--font-sans)", fontWeight: 400, lineHeight: "20px" }}
        >
          {item.description}
        </p>
        <div className="mt-auto flex items-center gap-2 pt-3">
          <span
            className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold capitalize ${typeColors[item.type]?.bg ?? "bg-[#2e1a6a]/20"} ${typeColors[item.type]?.text ?? "text-[#9b82e0]"} ${typeColors[item.type]?.border ?? "border-[#2e1a6a]/40"}`}
            style={{ fontFamily: "var(--font-sans)", letterSpacing: "-0.01em" }}
          >
            {item.type}
          </span>
          <div className="flex-1" />
          <div className="flex shrink-0 items-center gap-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="text-[13px] tracking-[-0.02em] text-[#b08828]" style={{ fontFamily: "var(--font-sans)", fontWeight: 600 }}>
              View
            </span>
            <svg
              className="h-3.5 w-3.5 text-[#b08828] transition-transform group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
            </svg>
          </div>
        </div>
      </div>
    </a>
  );
}

export function ContentSection() {
  const { stripRef, atStart, atEnd, isDragging, scrollBy, scrollByRight, dragHandlers } = useCarouselScroll({
    arrowStepCardSelector: "[data-content-carousel-card]",
    arrowStepGapPx: CONTENT_CAROUSEL_GAP_PX,
    fallbackArrowStepPx: CONTENT_CAROUSEL_ARROW_STEP_FALLBACK,
  });

  const carouselNav = (
    <div className="flex shrink-0 basis-auto items-center gap-2" aria-label="Carousel navigation">
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
  );

  return (
    <section
      id="content"
      className="relative"
      style={{
        background: "linear-gradient(180deg, rgb(5 0 14) 0%, #0a001c 15%, #0f0028 40%, #0a001c 80%, rgb(5 0 14) 100%)",
      }}
    >
      <div className="absolute top-0 left-0 w-[500px] h-[500px] opacity-[0.05] pointer-events-none" style={{ background: "radial-gradient(circle, rgba(200,112,32,1) 0%, transparent 70%)" }} />
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] opacity-[0.04] pointer-events-none" style={{ background: "radial-gradient(circle, rgba(46,26,106,1) 0%, transparent 70%)" }} />
      <div className="absolute bottom-1/4 right-1/3 w-[350px] h-[280px] opacity-[0.025] pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(122,40,88,1) 0%, transparent 70%)" }} />

      <div className="relative flex flex-col">
        <ScrollReveal className="shrink-0" offsetY={30} duration={1.4}>
          <div className="pt-16 md:pt-24">
            <div className="px-6 md:px-10 pb-6">
              <div className="max-w-[1400px] mx-auto w-full">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-4">
                  <div className="flex min-w-0 flex-1 flex-col gap-6 md:gap-0">
                    <p
                      className="w-full text-[#a89cc8] tracking-[-0.05em] md:mb-4"
                      style={{ fontFamily: "var(--font-sans)", fontSize: "14px" }}
                    >
                      Content
                    </p>
                    <div className="flex items-start justify-between gap-4 md:contents">
                      <h2
                        className="min-w-0 flex-1 text-[#edeaf5] tracking-[-0.04em] md:mb-0"
                        style={{ fontFamily: "var(--font-expanded)", fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 700, lineHeight: 1.1 }}
                      >
                        Contributing to the design community
                      </h2>
                      <div className="md:hidden">{carouselNav}</div>
                    </div>
                    <p
                      className="mb-6 text-white tracking-[-0.02em] md:mt-8"
                      style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(14px, 1.2vw, 17px)", lineHeight: 1.55 }}
                    >
                      I speak and teach through talks, livestreams, and community events, believing knowledge-sharing is most valuable when it's a two-way exchange.
                    </p>
                  </div>
                  <div className="hidden md:flex">{carouselNav}</div>
                </div>

                <div style={{ marginLeft: "calc(-50vw + 50%)", marginRight: "calc(-50vw + 50%)" }}>
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
                    {contentItems.map((item) => (
                      <div
                        key={item.id}
                        data-content-carousel-card
                        className="flex w-[clamp(88px,calc((100vw_-_3.5rem_-_32px)_/_2.5),200px)] shrink-0 snap-start flex-col md:w-[clamp(200px,calc((100vw_-_10rem_-_80px)_/_5.5),318px)]"
                      >
                        <CardItem item={item} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Stats row */}
        <div className="shrink-0 px-6 md:px-10 pb-10 pt-8">
          <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t" style={{ borderColor: "rgba(46,26,106,0.25)" }}>
            {highlights.map((stat) => (
              <div key={stat.label}>
                <p className="text-[#edeaf5] tracking-[-0.04em]" style={{ fontFamily: "var(--font-expanded)", fontSize: "clamp(22px, 2vw, 28px)", fontWeight: 700, lineHeight: 1 }}>
                  {stat.value}
                </p>
                <p className="text-[#a89cc8] mt-2 tracking-[-0.02em]" style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 400 }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
