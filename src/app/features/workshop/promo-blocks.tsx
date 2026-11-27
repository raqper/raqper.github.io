// Black Friday / new dates promo pieces, shared by the /workshop hero and the /career highlight.
// Each hides itself when its condition ends (offer after 31 Dec, a date once it starts).
import { CalendarDays, Check, Copy } from "lucide-react";
import { formatPrice, getActivePromo, getOpenCohorts, getPromoPrice, workshop } from "@/app/data/workshop-data";
import { useCopy } from "@/app/hooks/use-copy";

const FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ede0a8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f0028]";

/**
 * Campaign ticker: a full-width band that scrolls slowly, like a market ticker.
 * Hides each part when its condition ends (offer after 31 Dec, "New dates" once January starts).
 * The offer details live in <PriceOffer />.
 */
export function PromoTicker({ className = "" }: { className?: string }) {
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
      className={`marquee-promo-wrap overflow-hidden border-y border-[#ede0a8]/20 bg-[#ede0a8]/[0.06] py-2.5 ${className}`}
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
export function PriceOffer() {
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
export function DateTiles() {
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
