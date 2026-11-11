import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

/** Shown after Stripe redirects back with ?registered=1. */
export function RegisteredBanner() {
  const [params, setParams] = useSearchParams();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (params.get("registered") === "1") setVisible(true);
  }, [params]);

  if (!visible) return null;

  const dismiss = () => {
    setVisible(false);
    const next = new URLSearchParams(params);
    next.delete("registered");
    setParams(next, { replace: true });
  };

  return (
    <div className="fixed inset-x-0 top-4 z-50 px-4 md:px-10" role="status" aria-live="polite">
      <div
        className="max-w-[1400px] mx-auto flex items-start gap-4 rounded-xl border border-[#b08828]/40 px-5 py-4 shadow-[0_8px_40px_rgba(0,0,0,0.4)]"
        style={{ background: "#1c0048" }}
      >
        <div className="flex-1">
          <p className="text-[#ede0a8] tracking-[-0.02em]" style={{ fontFamily: "var(--font-sans)", fontSize: "16px", fontWeight: 600 }}>
            You're in. Thank you!
          </p>
          <p className="mt-1 text-white/90 tracking-[-0.02em]" style={{ fontFamily: "var(--font-sans)", fontSize: "14px", lineHeight: 1.5 }}>
            Check your email for the Stripe receipt. Your invoice follows within 5 working days, and the setup guide and
            Google Meet invitation arrive before the workshop.
          </p>
        </div>
        <button
          type="button"
          onClick={dismiss}
          className="shrink-0 text-[#a89cc8] hover:text-white transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ede0a8]"
          aria-label="Dismiss"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
