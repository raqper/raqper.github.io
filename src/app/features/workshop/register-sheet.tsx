import { useEffect, useId, useRef } from "react";
import { Link } from "react-router";
import { ArrowUpRight, Check, Copy, X } from "lucide-react";
import {
  extras,
  formatPrice,
  getActivePromo,
  getCheckoutUrl,
  getOpenCohorts,
  getPromoPrice,
  getRegisterState,
  LINKEDIN_URL,
  outcomes,
  TERMS_PATH,
  workshop,
} from "@/app/data/workshop-data";
import { useCopy } from "@/app/hooks/use-copy";
import { PRETTY } from "./section-heading";

const OPEN_EVENT = "workshop:register";

/** Open the register sheet from anywhere on the page. */
export function openRegisterSheet() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

// "At the end" list: what people build plus what they keep afterwards (the prep happens before, so it stays on the page).
const INCLUDED = [...outcomes.map((o) => o.title), ...extras.filter((e) => !e.startsWith("Pre-workshop prep"))];

const FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ede0a8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#130032]";

const SANS = { fontFamily: "var(--font-sans)" } as const;

/**
 * The register step, rendered once by the page. Bottom sheet on phones, centred dialog from md.
 * Uses the native <dialog> for focus trapping, Esc to close and focus return.
 */
export function RegisterSheet() {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const state = getRegisterState();
  const fullPrice = formatPrice(workshop.price);
  const active = getActivePromo();
  const promoPrice = formatPrice(getPromoPrice());
  // The price people actually pay right now.
  const price = promoPrice ?? fullPrice;
  const openCohorts = getOpenCohorts();
  const { copied, copy } = useCopy();
  const copyCode = () => {
    if (active) void copy(active.code);
  };

  useEffect(() => {
    const open = () => {
      const dialog = ref.current;
      if (!dialog || dialog.open) return;
      dialog.showModal();
      document.documentElement.style.overflow = "hidden";
    };
    window.addEventListener(OPEN_EVENT, open);
    return () => window.removeEventListener(OPEN_EVENT, open);
  }, []);

  const close = () => ref.current?.close();
  const onClose = () => {
    document.documentElement.style.overflow = "";
  };

  // Stripe Checkout opens in a new tab, so the page (and this sheet) stay where they were.
  // Stripe asks for the dates, the country (EU-only dropdown) and the NIF/VAT number.
  // While the offer runs, the promo code is already applied (prefilled_promo_code).
  const continueToCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    const url = getCheckoutUrl();
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  // Sold out or not open yet: LinkedIn is the waitlist and the way to get notified.
  const fallback =
    state === "soldOut"
      ? { href: LINKEDIN_URL, label: "Message me on LinkedIn to join the waitlist" }
      : { href: LINKEDIN_URL, label: "Message me on LinkedIn to get notified" };

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onClose={onClose}
      // Click on the backdrop (the dialog element itself, outside the panel) closes it.
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
      className="workshop-sheet m-0 mt-auto h-fit max-h-[92dvh] w-full max-w-full overflow-visible bg-transparent p-0 backdrop:bg-[rgba(5,0,14,0.75)] backdrop:backdrop-blur-sm md:m-auto md:max-w-[600px]"
    >
      <style>{`
        @keyframes workshopSheetIn { from { transform: translateY(24px); opacity: 0; } to { transform: none; opacity: 1; } }
        .workshop-sheet[open] > div { animation: workshopSheetIn 0.32s cubic-bezier(0.25, 0.1, 0.25, 1); }
        @media (prefers-reduced-motion: reduce) { .workshop-sheet[open] > div { animation: none; } }
      `}</style>
      <div
        className="relative flex max-h-[92dvh] flex-col overflow-hidden rounded-t-2xl border border-b-0 border-[#2e1a6a] text-[#edeaf5] shadow-[0_-12px_60px_rgba(0,0,0,0.5)] md:max-h-[88dvh] md:rounded-2xl md:border-b"
        style={{ background: "linear-gradient(180deg, #1c0048 0%, #130032 100%)" }}
      >
        {/* Grab handle (mobile affordance only). */}
        <div className="flex justify-center pt-2.5 md:hidden" aria-hidden>
          <span className="h-1 w-10 rounded-full bg-white/20" />
        </div>

        <div className="flex items-start justify-between gap-4 px-5 pt-3 md:px-8 md:pt-7">
          <div>
            <p className="text-[#a89cc8] tracking-[-0.05em]" style={{ ...SANS, fontSize: "13px" }}>
              {openCohorts.length > 1 ? "Your ticket · choose your dates at checkout" : `Your ticket · ${openCohorts[0]?.dates ?? ""}`}
            </p>
            <h2
              id={titleId}
              className="mt-1 tracking-[-0.03em] [text-wrap:balance]"
              style={{ fontFamily: "var(--font-expanded)", fontSize: "clamp(20px, 2.2vw, 26px)", fontWeight: 700, lineHeight: 1.15 }}
            >
              {workshop.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className={`-mr-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[#a89cc8] transition-colors hover:bg-white/5 hover:text-white ${FOCUS}`}
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>

        <div className="mt-4 flex-1 overflow-y-auto overscroll-contain px-5 pb-4 md:px-8">
          {/* Dates (one block per open cohort) + price */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_auto] sm:items-start">
            <div className="flex flex-col gap-3">
              {openCohorts.map((c) => (
                <div key={c.id}>
                  <p className="flex items-center gap-2 whitespace-nowrap text-white" style={{ ...SANS, fontSize: "14px", fontWeight: 600 }}>
                    {c.dates}
                    {c.isNew && (
                      <span className="rounded-full bg-[#9b82e0]/25 px-2 py-0.5 text-[#d4c8f5]" style={{ fontSize: "11px", fontWeight: 600 }}>
                        New
                      </span>
                    )}
                  </p>
                  <ul className="mt-1 flex flex-col gap-0.5">
                    {c.schedule.map((session) => (
                      <li key={session.day} className="flex justify-between gap-6 sm:justify-start text-white/85" style={{ ...SANS, fontSize: "13.5px" }}>
                        <span className="sm:w-[96px]">{session.day}</span>
                        <span className="whitespace-nowrap text-[#ede0a8] tabular-nums">{session.time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <p className="text-[#a89cc8]" style={{ ...SANS, fontSize: "12px" }}>
                {workshop.timezone} · {workshop.format}
              </p>
            </div>
            <div className="sm:max-w-[210px] sm:text-right">
              <p className="text-[#a89cc8]" style={{ ...SANS, fontSize: "12px" }}>
                Price
              </p>
              <p className="tracking-[-0.03em] text-[#ede0a8]" style={{ fontFamily: "var(--font-expanded)", fontSize: price ? "28px" : "16px", fontWeight: 700, lineHeight: 1.1 }}>
                {promoPrice && (
                  <s className="mr-2 text-[#a89cc8]" style={{ fontSize: "18px", fontWeight: 500 }}>
                    <span className="sr-only">was </span>
                    {fullPrice}
                  </s>
                )}
                {price ?? "Announced soon"}
              </p>
              <p className="text-[#a89cc8]" style={{ ...SANS, fontSize: "12px" }}>
                {price ? workshop.priceNote : ""}
              </p>
              {active && promoPrice && (
                <div className="mt-2 flex flex-col gap-1 sm:items-end">
                  <button
                    type="button"
                    onClick={copyCode}
                    className={`inline-flex w-fit items-center gap-1.5 rounded-full border border-dashed border-[#ede0a8]/60 px-3 py-1 text-[#ede0a8] transition-colors hover:bg-[#ede0a8]/10 ${FOCUS}`}
                    style={{ ...SANS, fontSize: "13px", fontWeight: 700, letterSpacing: "0.03em" }}
                    aria-label={`Copy the code ${active.code}`}
                  >
                    {active.code}
                    {copied ? <Check className="h-3.5 w-3.5" aria-hidden /> : <Copy className="h-3.5 w-3.5" aria-hidden />}
                  </button>
                  <p className="text-[#a89cc8]" style={{ ...SANS, fontSize: "11.5px", lineHeight: 1.4 }} aria-live="polite">
                    {copied ? "Copied" : `Already applied at checkout${openCohorts.length > 1 ? " · valid on both dates" : ""} · until ${active.endsLabel}`}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Included */}
          <div className="mt-5 border-t border-[#2e1a6a] pt-4">
            <p className="text-[#a89cc8]" style={{ ...SANS, fontSize: "13px" }}>
              What you will get at the end
            </p>
            <ul className="mt-2 grid grid-cols-1 gap-x-5 gap-y-1.5 sm:grid-cols-2">
              {INCLUDED.map((item) => (
                <li key={item} className="flex gap-2 text-white/90" style={{ ...SANS, fontSize: "14px", lineHeight: 1.4 }}>
                  <Check className="mt-[2px] h-4 w-4 shrink-0 text-[#d4a848]" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {state === "open" ? (
            <form id="workshop-register-form" onSubmit={continueToCheckout} className="mt-5 border-t border-[#2e1a6a] pt-4">
              <p
                className={`rounded-lg border border-[#2e1a6a] bg-[#0a001c]/50 p-3.5 text-white/90 ${PRETTY}`}
                style={{ ...SANS, fontSize: "14px", lineHeight: 1.45 }}
              >
                Open to people living in the European Union only.
              </p>

              <p className={`mt-3 text-[#a89cc8] ${PRETTY}`} style={{ ...SANS, fontSize: "12px", lineHeight: 1.5 }}>
                At checkout you choose your dates. Stripe also asks for your name, email, country and, if you'd like an invoice, your NIF or VAT number. Email me and
                I'll send you the official Portuguese invoice (recibo verde). {workshop.refundPolicy} By booking you agree to the{" "}
                <Link to={TERMS_PATH} target="_blank" className="text-[#ede0a8] underline underline-offset-2">
                  workshop terms
                </Link>
                .
              </p>
            </form>
          ) : (
            <div className="mt-5 rounded-lg border border-[#b08828]/30 bg-[#b08828]/10 p-4">
              <p className="text-[#ede0a8]" style={{ ...SANS, fontSize: "15px", fontWeight: 600 }}>
                {state === "soldOut" ? "This workshop is full" : "Registration opens soon"}
              </p>
              <p className={`mt-1 text-white/85 ${PRETTY}`} style={{ ...SANS, fontSize: "14px", lineHeight: 1.5 }}>
                {state === "soldOut"
                  ? "Join the waitlist and you'll be the first to know when a seat frees up or new dates open."
                  : "Registration opens here soon. Message me and I'll let you know first."}
              </p>
            </div>
          )}
        </div>

        {/* Sticky footer: the one primary action. */}
        <div
          className="border-t border-[#2e1a6a] px-5 pt-4 md:px-8 md:pb-6"
          style={{ paddingBottom: "max(16px, env(safe-area-inset-bottom))", background: "rgba(19,0,50,0.95)" }}
        >
          {state === "open" ? (
            <>
              <button
                type="submit"
                form="workshop-register-form"
                className={`flex h-14 w-full items-center justify-center gap-2.5 rounded-full border border-[#ede0a8] bg-[#ede0a8] text-[#0c0024] transition-all duration-300 hover:shadow-[0_0_30px_rgba(237,224,168,0.2)] disabled:cursor-not-allowed disabled:border-[#2e1a6a] disabled:bg-[#2e1a6a]/60 disabled:text-white/50 disabled:shadow-none ${FOCUS}`}
                style={{ ...SANS, fontSize: "16px", fontWeight: 600 }}
              >
                {price ? `Book · ${price}` : "Book"}
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </button>
              <p className={`mt-2.5 text-center text-[#a89cc8] ${PRETTY}`} style={{ ...SANS, fontSize: "12px", lineHeight: 1.5 }}>
                Opens secure Stripe checkout in a new tab
              </p>
            </>
          ) : (
            <a
              href={fallback.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex h-14 w-full items-center justify-center rounded-full border border-[#ede0a8] bg-[#ede0a8] text-[#0c0024] transition-all duration-300 hover:shadow-[0_0_30px_rgba(237,224,168,0.2)] ${FOCUS}`}
              style={{ ...SANS, fontSize: "16px", fontWeight: 600 }}
            >
              {fallback.label}
            </a>
          )}
        </div>
      </div>
    </dialog>
  );
}
