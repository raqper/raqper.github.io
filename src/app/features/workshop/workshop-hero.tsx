import { motion } from "motion/react";
import { Link } from "react-router";
import { stats, workshop } from "@/app/data/workshop-data";
import { HeroShapes } from "./floating-shapes";
import { RegisterButton, RegisterNote } from "./register-button";

const EASE = [0.25, 0.1, 0.25, 1] as const;

const NAV_ITEMS = [
  { id: "steps", label: "The 8 steps" },
  { id: "program", label: "Programme" },
  { id: "for-you", label: "Is it for you" },
  { id: "faq", label: "FAQ" },
];

function scrollToId(id: string) {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.getElementById(id)?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
}

const FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ede0a8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f0028]";

function WorkshopNav() {
  return (
    <nav className="absolute top-0 left-0 right-0 z-20 px-6 md:px-10 py-6" aria-label="Workshop">
      <div className="max-w-[1400px] mx-auto w-full flex items-center justify-between gap-4">
        <Link
          to="/career"
          className={`inline-flex items-center gap-2 rounded-full px-3.5 py-[5px] text-[#ede0a8] transition-colors hover:text-white ${FOCUS}`}
          style={{
            background: "rgba(46,26,106,0.25)",
            border: "1px solid rgba(46,26,106,0.4)",
            fontFamily: "var(--font-sans)",
            fontSize: "12px",
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

export function WorkshopHero() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: "rgb(5 0 14)" }}
    >
      <WorkshopNav />

      <motion.div
        className="relative min-h-screen flex flex-col"
        initial={{ opacity: 0, filter: "blur(18px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 2.8, ease: EASE }}
      >
        <HeroShapes />

        {/* Soft brand glows, as on the career hero */}
        <div className="absolute inset-0 z-[1] pointer-events-none" aria-hidden>
          <div
            className="absolute bottom-1/4 left-0 w-[320px] h-[320px] opacity-[0.08]"
            style={{ background: "radial-gradient(circle, rgba(176,136,40,0.8) 0%, transparent 70%)" }}
          />
        </div>

        <div className="relative z-10 px-6 md:px-10 flex-1 flex flex-col justify-center pt-28 pb-16">
          <div className="max-w-[1400px] mx-auto w-full my-auto">
            <motion.div
              className="w-full md:max-w-[62%]"
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2.4, ease: EASE, delay: 0.3 }}
            >
              <p
                className="text-[#edeaf5] tracking-[-0.03em] mb-4"
                style={{ fontFamily: "var(--font-expanded)", fontSize: "clamp(14px, 1.6vw, 22px)", fontWeight: 700, lineHeight: 1.2 }}
              >
                Live online workshop · {workshop.dates}
              </p>
              <h1
                className="text-white tracking-[-0.04em]"
                style={{ fontFamily: "var(--font-expanded)", fontSize: "clamp(34px, 5.2vw, 86px)", fontWeight: 300, lineHeight: 1.05 }}
              >
                AI for designers:{" "}
                <br className="hidden sm:block" />
                from prompt to product.
              </h1>
              <p
                className="text-white tracking-[-0.02em] mt-6 w-full max-w-[640px]"
                style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(14px, 1.15vw, 17px)", fontWeight: 400, lineHeight: 1.7 }}
              >
                {workshop.promise} Made for junior and mid-level designers taking their first real steps with AI.
              </p>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-4">
                {workshop.tools.map((item, index, arr) => (
                  <span key={item} className="contents">
                    <span className="text-white shrink-0 tracking-[-0.02em]" style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 700 }}>
                      {item}
                    </span>
                    {index < arr.length - 1 && (
                      <span className="text-white/40 shrink-0" style={{ fontFamily: "var(--font-sans)", fontSize: "13px" }} aria-hidden>
                        ◇
                      </span>
                    )}
                  </span>
                ))}
              </div>

              <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4">
                <RegisterButton />
                <a
                  href="#program"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToId("program");
                  }}
                  className={`inline-flex items-center justify-center rounded-full px-8 py-4 text-white/90 hover:text-white border border-[#2e1a6a] hover:border-[#9b82e0]/60 transition-colors ${FOCUS}`}
                  style={{ fontFamily: "var(--font-sans)", fontSize: "16px", fontWeight: 500 }}
                >
                  See the programme
                </a>
              </div>
              <RegisterNote className="mt-4 max-w-[520px]" />
            </motion.div>

            {/* Stats row */}
            <dl className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 border-t border-[#2e1a6a] pt-8 md:max-w-[62%]">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd
                    className="text-[#ede0a8] tracking-[-0.04em]"
                    style={{ fontFamily: "var(--font-expanded)", fontSize: "clamp(28px, 3vw, 44px)", fontWeight: 300, lineHeight: 1 }}
                  >
                    {s.value}
                  </dd>
                  <dd
                    className="mt-2 text-[#a89cc8] tracking-[-0.02em]"
                    style={{ fontFamily: "var(--font-sans)", fontSize: "13px", lineHeight: 1.4 }}
                    aria-hidden
                  >
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
