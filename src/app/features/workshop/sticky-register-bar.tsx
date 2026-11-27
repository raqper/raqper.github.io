import { useEffect, useState } from "react";
import { getDatesLabel, workshop } from "@/app/data/workshop-data";
import { RegisterButton } from "./register-button";

/** Mobile-only bottom bar with the Register button, shown between the hero and the final CTA. */
export function StickyRegisterBar() {
  const [heroVisible, setHeroVisible] = useState(true);
  const [ctaVisible, setCtaVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    const cta = document.getElementById("register");
    const observers: IntersectionObserver[] = [];
    if (hero) {
      const o = new IntersectionObserver(([e]) => setHeroVisible(e.isIntersecting), { threshold: 0.05 });
      o.observe(hero);
      observers.push(o);
    }
    if (cta) {
      const o = new IntersectionObserver(([e]) => setCtaVisible(e.isIntersecting), { threshold: 0.1 });
      o.observe(cta);
      observers.push(o);
    }
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const show = !heroVisible && !ctaVisible;

  return (
    <div
      className={`md:hidden fixed inset-x-0 bottom-0 z-40 transition-transform duration-300 ${show ? "translate-y-0" : "translate-y-full"}`}
      aria-hidden={!show}
      {...(!show ? { inert: "" } : {})}
    >
      <div
        className="flex items-center justify-between gap-3 border-t border-[#2e1a6a] px-4 py-3"
        style={{ background: "rgba(10,0,28,0.92)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}
      >
        <div className="min-w-0">
          <p className="truncate text-[#edeaf5] tracking-[-0.02em]" style={{ fontFamily: "var(--font-sans)", fontSize: "14px", fontWeight: 600 }}>
            {workshop.shortTitle}
          </p>
          <p className="truncate text-[#a89cc8]" style={{ fontFamily: "var(--font-sans)", fontSize: "12px" }}>
            {getDatesLabel()}
          </p>
        </div>
        <RegisterButton size="sm" />
      </div>
    </div>
  );
}
