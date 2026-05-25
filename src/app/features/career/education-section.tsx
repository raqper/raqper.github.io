import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { ScrollReveal } from "@/app/components/scroll-reveal";
import { educationOfferings, type ContentItem } from "@/app/data/content-items";

const LIVE_COHORT_BADGE =
  "inline-flex items-center rounded-full border border-[#b08828]/30 bg-[#b08828]/15 px-1.5 py-0.5 text-[9px] font-semibold text-[#d4a848] md:px-2.5 md:py-1 md:text-[11px]";
const LANG_BADGE =
  "inline-flex items-center rounded-full border border-[#2e1a6a]/40 bg-[#2e1a6a]/20 px-1.5 py-0.5 text-[9px] font-semibold text-[#9b82e0] md:px-2.5 md:py-1 md:text-[11px]";

function EducationCard({ item }: { item: ContentItem }) {
  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full min-h-0 flex-col overflow-hidden rounded-xl border border-[#2e1a6a] bg-[#1c0048] transition-all duration-300 hover:border-[#2e1a6a]/60 hover:shadow-[0_8px_40px_rgba(46,26,106,0.15)] md:flex-row md:items-stretch"
    >
      {/* Mobile: image on top; md+: ~1/3 card width, left column */}
      <div className="relative aspect-[5/3] w-full shrink-0 overflow-hidden sm:aspect-[16/10] md:aspect-auto md:h-auto md:min-h-[200px] md:w-1/3 md:max-w-none md:shrink-0">
        <ImageWithFallback
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1c0048]/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:bg-gradient-to-r" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col p-2.5 sm:p-3 md:p-5">
        <div className="mb-1.5 flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[10px] tracking-[-0.02em] sm:mb-2 sm:gap-x-2 sm:text-[12px] md:text-[13px]">
          <span className="truncate font-medium text-white" style={{ fontFamily: "var(--font-sans)" }}>
            {item.platform}
          </span>
          <span className="h-1 w-1 shrink-0 rounded-full bg-[#2e1a6a]" aria-hidden />
          <span className="min-w-0 shrink text-[#a89cc8] sm:shrink-0" style={{ fontFamily: "var(--font-sans)", fontWeight: 400 }}>
            <span className="line-clamp-1 sm:line-clamp-none">{item.date}</span>
          </span>
        </div>
        <h3
          className="mb-1.5 line-clamp-2 text-[11px] leading-snug text-[#edeaf5] transition-colors group-hover:text-[#d4c8e8] sm:mb-2 sm:text-[13px] sm:leading-tight md:text-[clamp(14px,1.35vw,17px)] md:leading-[1.25]"
          style={{
            fontFamily: "var(--font-expanded)",
            fontWeight: 600,
            letterSpacing: "-0.03em",
          }}
        >
          {item.title}
        </h3>
        <p
          className="line-clamp-3 flex-1 text-[10px] leading-snug tracking-[-0.02em] text-white sm:line-clamp-2 sm:text-[12px] sm:leading-5 md:text-[13px]"
          style={{ fontFamily: "var(--font-sans)", fontWeight: 400 }}
        >
          {item.description}
        </p>
        <div className="mt-2 flex min-w-0 flex-col gap-2 sm:mt-3 sm:flex-row sm:flex-wrap sm:items-center md:mt-4">
          <div className="flex min-w-0 flex-wrap gap-1 sm:gap-2">
            <span className={LIVE_COHORT_BADGE} style={{ fontFamily: "var(--font-sans)", letterSpacing: "-0.01em" }}>
              Live cohort
            </span>
            <span className={LANG_BADGE} style={{ fontFamily: "var(--font-sans)", letterSpacing: "-0.01em" }}>
              Portuguese
            </span>
          </div>
          <div className="flex min-w-0 items-center gap-1 sm:ml-auto sm:shrink-0">
            <span
              className="truncate text-[10px] font-semibold tracking-[-0.02em] text-[#b08828] sm:text-[11px] md:text-[13px]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              View on TheStarter
            </span>
            <svg
              className="h-3 w-3 shrink-0 text-[#b08828] transition-transform group-hover:translate-x-0.5 sm:h-3.5 sm:w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
              aria-hidden
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
            </svg>
          </div>
        </div>
      </div>
    </a>
  );
}

export function EducationSection() {
  return (
    <section
      id="education"
      className="relative border-t"
      style={{
        borderColor: "rgba(46,26,106,0.25)",
        background: "linear-gradient(180deg, rgb(5 0 14) 0%, #0a001c 20%, #0f0028 55%, #0a001c 100%)",
      }}
    >
      <div
        className="pointer-events-none absolute top-0 left-0 h-[420px] w-[420px] opacity-[0.045]"
        style={{ background: "radial-gradient(circle, rgba(46,26,106,1) 0%, transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute right-0 bottom-0 h-[320px] w-[380px] opacity-[0.04]"
        style={{ background: "radial-gradient(circle, rgba(176,136,40,0.85) 0%, transparent 70%)" }}
      />

      <div className="relative">
        <ScrollReveal className="shrink-0" offsetY={30} duration={1.4}>
          <div className="px-6 pt-16 pb-10 md:px-10 md:pt-24 md:pb-14">
            <div className="mx-auto w-full max-w-[1400px]">
              <p
                className="mb-4 text-[#a89cc8] tracking-[-0.05em]"
                style={{ fontFamily: "var(--font-sans)", fontSize: "14px" }}
              >
                Teaching
              </p>
              <h2
                className="text-[#edeaf5] tracking-[-0.04em]"
                style={{
                  fontFamily: "var(--font-expanded)",
                  fontSize: "clamp(28px, 3.5vw, 48px)",
                  fontWeight: 700,
                  lineHeight: 1.1,
                }}
              >
                Educating future designers
              </h2>
              <p
                className="mt-6 mb-10 w-full max-w-none text-white tracking-[-0.02em] md:mt-8 md:mb-12"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "clamp(14px, 1.2vw, 17px)",
                  lineHeight: 1.55,
                }}
              >
                Currently I teach 2 design systems online courses (in Portuguese), in Complete and Advanced formats. More teaching content is planned [coming soon!].
              </p>

              <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-6 lg:gap-8">
                {educationOfferings.map((item) => (
                  <EducationCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
