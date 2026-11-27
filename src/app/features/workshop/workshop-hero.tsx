import { motion } from "motion/react";
import { Link } from "react-router";
import { CalendarDays, Check, Copy } from "lucide-react";
import {
  facts,
  formatPrice,
  getActivePromo,
  getOpenCohorts,
  getPromoPrice,
  heroEyebrow,
  toolsNote,
  workshop,
} from "@/app/data/workshop-data";
import { useCopy } from "@/app/hooks/use-copy";
import { HeroStars } from "./floating-shapes";
import { RegisterButton, RegisterNote } from "./register-button";

const EASE = [0.25, 0.1, 0.25, 1] as const;

const BLUR_INTRO = typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches;

const NAV_ITEMS = [
  { id: "for-you", label: "For you" },
  { id: "program", label: "Agenda" },
  { id: "faq", label: "FAQ" },
];

export function scrollToId(id: string) {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.getElementById(id)?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
}

const FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ede0a8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f0028]";

function WorkshopNav() {
  return (
    <nav className="absolute top-0 left-0 right-0 z-20 px-5 md:px-10 py-5 md:py-6" aria-label="Workshop">
      <div className="max-w-[1400px] mx-auto w-full flex items-center justify-between gap-4">
        <Link
          to="/career"
          className={`inline-flex min-h-[40px] items-center gap-2 rounded-full px-4 text-[#ede0a8] transition-colors hover:text-white ${FOCUS}`}
          style={{
            background: "rgba(46,26,106,0.25)",
            border: "1px solid rgba(46,26,106,0.4)",
            fontFamily: "var(--font-sans)",
            fontSize: "13px",
            fontWeight: 500,
            letterSpacing: "-0.02em",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M19 12H5" />
            <path d="m12 19-7-7 7-7" />
          </svg>
          Career
        </Link>
        <div className="flex items-center gap-6">
          <div className="hidden lg:flex gap-6 items-center">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId(item.id);
                }}
                className={`text-white/90 tracking-[-0.03em] hover:text-[#edeaf5] transition-colors rounded-sm ${FOCUS}`}
                style={{ fontFamily: "var(--font-sans)", fontSize: "14px" }}
              >
                {item.label}
              </a>
            ))}
          </div>
          <RegisterButton size="sm" variant="ghost" />
        </div>
      </div>
    </nav>
  );
}

/**
 * Campaign ticker above the eyebrow: a full-width band that scrolls slowly, like a market ticker.
 * Hides each part when its condition ends (offer after 31 Dec, "New dates" once January starts).
 * The offer details live in <PriceOffer />.
 */
function PromoTicker() {
  const active = getActivePromo();
  const newDates = getOpenCohorts().find((c) => c.isNew) ?? null;
  if (!active && !newDates) return null;

  const spoken = [
    active ? `${active.name}: ${active.percentOff}% off until ${active.endsLabel}.` : "",
    newDates ? `New dates: ${newDates.shortDates}.` : "",
  ]
    .filter(Boolean)
    .join(" ");

  const Sparkle = () => (
    <span aria-hidden className="text-[#d4a848]" style={{ fontSize: "14px" }}>
      ✦
    </span>
  );

  // Each message sits in one chip: label ✶ value.
  const Chip = ({ label, value }: { label: string; value: string }) => (
    <span
      className="inline-flex items-center gap-2 rounded-full bg-[#ede0a8] px-3.5 py-0.5 text-[#0c0024]"
      style={{ fontSize: "13px", lineHeight: "20px", fontWeight: 600 }}
    >
      {label}
      <span aria-hidden className="text-[#b08828]">
        ✶
      </span>
      {value}
    </span>
  );

  // One group; repeated 4× per half, two halves, so translateX(-50%) loops seamlessly on any screen.
  const group = (key: string) => (
    <div key={key} className="flex shrink-0 items-center gap-6 pr-6">
      {active && (
        <>
          <Chip label={active.name} value={`${active.percentOff}%`} />
          <Sparkle />
        </>
      )}
      {newDates && (
        <>
          {/* Plain text, not a chip: only the offer gets the yellow chip. */}
          <span className="inline-flex items-center gap-2">
            New dates
            <span aria-hidden className="text-[#d4a848]">
              ✶
            </span>
            {`${newDates.shortDates} ${newDates.startsAt.slice(0, 4)}`}
          </span>
          <Sparkle />
        </>
      )}
    </div>
  );
  const half = (h: string) => [0, 1, 2, 3].map((i) => group(`${h}-${i}`));

  return (
    <div
      className="marquee-promo-wrap relative left-1/2 mb-6 w-screen -translate-x-1/2 overflow-hidden border-y border-[#ede0a8]/20 bg-[#ede0a8]/[0.06] py-2.5 md:mb-8"
      style={{
        maskImage: "linear-gradient(90deg, transparent 0, #000 8%, #000 92%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(90deg, transparent 0, #000 8%, #000 92%, transparent 100%)",
      }}
    >
      <p className="sr-only">{spoken}</p>
      <div
        aria-hidden
        className="marquee-promo-track flex w-max items-center text-[#ede0a8] whitespace-nowrap"
        style={{ fontFamily: "var(--font-sans)", fontSize: "15px", lineHeight: "22px", fontWeight: 500, letterSpacing: "-0.01em" }}
      >
        {half("a")}
        {half("b")}
      </div>
    </div>
  );
}

/** Marketplace-style price, beside the date tiles, while the offer runs. */
function PriceOffer() {
  const active = getActivePromo();
  const promoPrice = formatPrice(getPromoPrice());
  const fullPrice = formatPrice(workshop.price);
  const { copied, copy } = useCopy();
  if (!active || !promoPrice) return null;
  return (
    <div
      className="grid w-full grid-cols-[auto_auto] content-center items-center justify-start gap-x-3 gap-y-2 rounded-2xl border border-[#ede0a8]/30 bg-[#ede0a8]/[0.08] px-5 py-4 sm:w-fit"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      {/* Row 1: old price | new price */}
      <s className="self-end text-[#7a7390]" style={{ fontSize: "31px", lineHeight: "36px", fontWeight: 300, textDecorationThickness: "1.5px", letterSpacing: "-0.02em" }}>
        <span className="sr-only">Was </span>
        {fullPrice}
      </s>
      <span
        className="text-[#ede0a8]"
        style={{ fontFamily: "var(--font-expanded)", fontSize: "48px", lineHeight: 1, fontWeight: 600, letterSpacing: "-0.04em" }}
      >
        <span className="sr-only">now </span>
        {promoPrice}
      </span>
      {/* Row 2: end date | code, aligned under the new price */}
      <span className="whitespace-nowrap text-[#a89cc8]" style={{ fontSize: "12px", lineHeight: "16px", fontWeight: 700 }}>
        Until {active.endsLabel}
      </span>
      <button
        type="button"
        onClick={() => void copy(active.code)}
        aria-label={`Copy the code ${active.code}`}
        className={`inline-flex w-full items-center justify-center gap-1.5 rounded-md border border-dashed border-[#ede0a8]/60 px-2 py-0.5 text-[#ede0a8] transition-colors duration-300 hover:bg-[#ede0a8]/10 active:translate-y-px ${FOCUS}`}
        style={{ fontSize: "12px", lineHeight: "16px", fontWeight: 600, letterSpacing: "0.04em" }}
      >
        {active.code}
        {copied ? <Check className="h-3.5 w-3.5" aria-hidden /> : <Copy className="h-3.5 w-3.5" aria-hidden />}
        <span className="sr-only" aria-live="polite">
          {copied ? "Copied" : ""}
        </span>
      </button>
    </div>
  );
}

/** The open dates as compact calendar tiles, stacked beside the price box (newest first). */
function DateTiles() {
  const open = getOpenCohorts();
  if (!open.length) return null;
  return (
    <ul aria-label="Dates" className="flex flex-col gap-2" style={{ fontFamily: "var(--font-sans)" }}>
      {open.map((c) => (
        <li
          key={c.id}
          className="flex flex-1 items-center gap-3 rounded-xl border border-[#9b82e0]/40 bg-[#9b82e0]/10 px-3 py-2"
        >
          <CalendarDays className="h-5 w-5 shrink-0 text-[#c9b8ff]" aria-hidden />
          <span className="flex flex-col">
            <span className="flex items-center gap-2 whitespace-nowrap text-white" style={{ fontSize: "14px", lineHeight: "20px", fontWeight: 600 }}>
              {c.shortDates}
              {c.isNew && (
                <span className="rounded-full bg-[#c9b8ff] px-2 text-[#0c0024]" style={{ fontSize: "12px", lineHeight: "16px", fontWeight: 600 }}>
                  New
                </span>
              )}
            </span>
            <span className="whitespace-nowrap text-[#a89cc8]" style={{ fontSize: "12px", lineHeight: "16px" }}>
              {c.schedule.map((s) => s.day.split(" ")[0]).join(", ")} · GMT
            </span>
          </span>
        </li>
      ))}
    </ul>
  );
}

export function WorkshopHero() {
  return (
    <section id="top" className="relative flex flex-col overflow-hidden md:min-h-screen" style={{ background: "rgb(5 0 14)" }}>
      <WorkshopNav />

      <motion.div
        className="relative flex flex-col md:min-h-screen"
        style={{ background: "rgb(5 0 14)" }}
        // Blur-in only on wider screens: on phones a blurred, fading hero reads as an empty page.
        initial={BLUR_INTRO ? { opacity: 0, filter: "blur(14px)" } : { opacity: 0 }}
        animate={BLUR_INTRO ? { opacity: 1, filter: "blur(0px)" } : { opacity: 1 }}
        transition={{ duration: BLUR_INTRO ? 1.4 : 0.6, ease: EASE }}
      >
        <HeroStars />

        <div className="absolute inset-0 z-[1] pointer-events-none" aria-hidden>
          <div
            className="absolute bottom-1/4 left-0 w-[320px] h-[320px] opacity-[0.08]"
            style={{ background: "radial-gradient(circle, rgba(176,136,40,0.8) 0%, transparent 70%)" }}
          />
        </div>

        <div className="relative z-10 px-5 md:px-10 flex-1 flex flex-col md:justify-center pt-[228px] pb-12 md:pt-20 md:pb-16">
          {/* Sits right under the nav; the headline block below stays centred in the remaining space. */}
          <PromoTicker />
          <div className="max-w-[1400px] mx-auto w-full md:my-auto">
            <motion.div
              className="w-full md:max-w-[68%] lg:max-w-[60%]"
              initial={{ opacity: 0, y: -24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: EASE, delay: 0.15 }}
            >
              <p
                className="text-[#edeaf5] tracking-[-0.03em] mb-3 md:mb-4"
                style={{ fontFamily: "var(--font-expanded)", fontSize: "clamp(13px, 1.45vw, 20px)", fontWeight: 700, lineHeight: 1.2 }}
              >
                {heroEyebrow}
              </p>
              <h1
                className="text-white tracking-[-0.04em]"
                style={{ fontFamily: "var(--font-expanded)", fontSize: "clamp(33px, 4.7vw, 78px)", fontWeight: 300, lineHeight: 1.05 }}
              >
                AI for designers:{" "}
                <br className="hidden sm:block" />
                from prompt to product.
              </h1>
              <p
                className="text-white tracking-[-0.02em] mt-5 md:mt-6 w-full max-w-[560px] lg:max-w-[700px] [text-wrap:pretty]"
                style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(14px, 0.9vw, 14.5px)", fontWeight: 400, lineHeight: "22px" }}
              >
                {workshop.heroLead}
              </p>

              {/* Price and dates side by side, so the dates stay in the first viewport. */}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-stretch">
                <PriceOffer />
                <DateTiles />
              </div>

              <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                <RegisterButton className="w-full sm:w-auto" />
                <a
                  href="#program"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToId("program");
                  }}
                  className={`inline-flex min-h-[44px] whitespace-nowrap items-center justify-center rounded-full sm:px-8 sm:py-4 text-white/85 hover:text-white sm:border sm:border-[#2e1a6a] sm:hover:border-[#9b82e0]/60 transition-colors ${FOCUS}`}
                  style={{ fontFamily: "var(--font-sans)", fontSize: "15px", fontWeight: 500 }}
                >
                  See the agenda
                </a>
              </div>
              <RegisterNote className="hidden sm:block mt-4 max-w-[520px]" />
            </motion.div>

            {/* Fact strip */}
            <dl className="mt-8 md:mt-10 lg:mt-12 flex flex-wrap gap-2 lg:flex lg:w-fit lg:gap-0 lg:border-t lg:border-[#2e1a6a] lg:pt-6">
              {facts.map((f, i) => (
                <div
                  key={f.label}
                  className={`rounded-full border border-[#2e1a6a] bg-[#1c0048]/50 px-3.5 py-2 lg:rounded-none lg:border-0 lg:bg-transparent lg:px-5 lg:py-0 ${
                    i === 0 ? "lg:pl-0" : "lg:border-l lg:border-[#2e1a6a]"
                  }`}
                >
                  <dt className="hidden lg:block text-[#a89cc8] tracking-[-0.02em] text-[12px] lg:text-[11.5px]" style={{ fontFamily: "var(--font-sans)" }}>
                    {f.label}
                  </dt>
                  <dd
                    className="text-[#ede0a8] tracking-[-0.02em] lg:mt-1 text-[14px] lg:text-[13px]"
                    style={{ fontFamily: "var(--font-sans)", fontWeight: 600 }}
                  >
                    <span className="sr-only lg:hidden">{f.label}: </span>
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 lg:mt-4 max-w-[640px] text-[#a89cc8] tracking-[-0.02em]" style={{ fontFamily: "var(--font-sans)", fontSize: "12px", lineHeight: 1.5 }}>
              {toolsNote}
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
