import { useEffect, useId, useRef, useState } from "react";
import { ArrowUpRight, Check, X } from "lucide-react";
import {
  extras,
  formatPrice,
  getRegisterState,
  LINKEDIN_URL,
  outcomes,
  readinessLine,
  requirementsLine,
  workshop,
} from "@/app/data/workshop-data";
import { PRETTY } from "./section-heading";

const OPEN_EVENT = "workshop:register";

/** Open the register sheet from anywhere on the page. */
export function openRegisterSheet() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

const INCLUDED = [...outcomes.map((o) => o.title), ...extras];

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
  const [agreed, setAgreed] = useState(false);
  const state = getRegisterState();
  const price = formatPrice(workshop.price);

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

  // Luma opens in a new tab, so the page (and this sheet) stay where they were.
  const continueToLuma = (e: React.FormEvent) => {
    e.preventDefault();
    if (workshop.registrationUrl && agreed) window.open(workshop.registrationUrl, "_blank", "noopener,noreferrer");
  };

  // Sold out: Luma runs the waitlist. Not open yet: LinkedIn is the only contact on the site.
  const fallback =
    state === "soldOut" && workshop.registrationUrl
      ? { href: workshop.registrationUrl, label: "Join the waitlist on Luma" }
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
              Your ticket · {workshop.dates}
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
          {/* Schedule + price */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
            <ul className="flex flex-col gap-1">
              {workshop.schedule.map((s) => (
                <li key={s.day} className="flex justify-between gap-6 sm:justify-start text-white/90" style={{ ...SANS, fontSize: "14px" }}>
                  <span className="sm:w-[96px]">{s.day}</span>
                  <span className="text-[#ede0a8] tabular-nums">
                    {s.time}
                    {s.note && <span className="ml-2 text-[#a89cc8]">{s.note}</span>}
                  </span>
                </li>
              ))}
              <li className="text-[#a89cc8]" style={{ ...SANS, fontSize: "12px" }}>
                {workshop.timezone} · {workshop.format}
              </li>
            </ul>
            <div className="sm:text-right">
              <p className="text-[#a89cc8]" style={{ ...SANS, fontSize: "12px" }}>
                Price
              </p>
              <p className="tracking-[-0.03em] text-[#ede0a8]" style={{ fontFamily: "var(--font-expanded)", fontSize: price ? "28px" : "16px", fontWeight: 700, lineHeight: 1.1 }}>
                {price ?? "Announced soon"}
              </p>
              <p className="text-[#a89cc8]" style={{ ...SANS, fontSize: "12px" }}>
                {workshop.seats} seats
              </p>
            </div>
          </div>

          {/* Included */}
          <div className="mt-5 border-t border-[#2e1a6a] pt-4">
            <p className="text-[#a89cc8]" style={{ ...SANS, fontSize: "13px" }}>
              What's included
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
            <form id="workshop-register-form" onSubmit={continueToLuma} className="mt-5 border-t border-[#2e1a6a] pt-4">
              <label className="flex cursor-pointer gap-3 rounded-lg border border-[#2e1a6a] bg-[#0a001c]/50 p-3.5 has-[:checked]:border-[#d4a848]/60">
                <input
                  type="checkbox"
                  required
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 h-5 w-5 shrink-0 accent-[#d4a848]"
                />
                <span className={`text-white/90 ${PRETTY}`} style={{ ...SANS, fontSize: "14px", lineHeight: 1.45 }}>
                  I meet the level and will have everything set up before the first session.{" "}
                  <span className="text-[#a89cc8]">
                    {readinessLine} {requirementsLine}
                  </span>
                </span>
              </label>

              <p className={`mt-3 text-[#a89cc8] ${PRETTY}`} style={{ ...SANS, fontSize: "12px", lineHeight: 1.5 }}>
                Luma asks for your email and the name to put on your certificate. Need an invoice? Email me after registering and
                I'll send you an official Portuguese invoice (recibo verde). {workshop.refundPolicy}
              </p>
            </form>
          ) : (
            <div className="mt-5 rounded-lg border border-[#b08828]/30 bg-[#b08828]/10 p-4">
              <p className="text-[#ede0a8]" style={{ ...SANS, fontSize: "15px", fontWeight: 600 }}>
                {state === "soldOut" ? "This cohort is full" : "Registration opens soon"}
              </p>
              <p className={`mt-1 text-white/85 ${PRETTY}`} style={{ ...SANS, fontSize: "14px", lineHeight: 1.5 }}>
                {state === "soldOut"
                  ? "Join the waitlist and you'll be the first to know when a seat frees up or the next cohort opens."
                  : "Registration opens here soon. Message me and I'll let you know first."}
              </p>
              <p className={`mt-3 text-[#a89cc8] ${PRETTY}`} style={{ ...SANS, fontSize: "13px", lineHeight: 1.5 }}>
                {requirementsLine}
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
                disabled={!agreed}
                className={`flex h-14 w-full items-center justify-center gap-2.5 rounded-full border border-[#ede0a8] bg-[#ede0a8] text-[#0c0024] transition-all duration-300 hover:shadow-[0_0_30px_rgba(237,224,168,0.2)] disabled:cursor-not-allowed disabled:border-[#2e1a6a] disabled:bg-[#2e1a6a]/60 disabled:text-white/50 disabled:shadow-none ${FOCUS}`}
                style={{ ...SANS, fontSize: "16px", fontWeight: 600 }}
              >
                {price ? `Continue to Luma · ${price}` : "Continue to Luma"}
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </button>
              <p className={`mt-2.5 text-center text-[#a89cc8] ${PRETTY}`} style={{ ...SANS, fontSize: "12px", lineHeight: 1.5 }}>
                {agreed ? "Opens Luma in a new tab · Secure checkout by Stripe" : "Tick the box above to continue"}
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
