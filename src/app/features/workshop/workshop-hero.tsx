import { motion } from "motion/react";
import { Link } from "react-router";
import { facts, heroEyebrow, toolsNote, workshop } from "@/app/data/workshop-data";
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

        <div className="relative z-10 px-5 md:px-10 flex-1 flex flex-col md:justify-center pt-[228px] pb-12 md:pt-28 md:pb-16">
          <div className="max-w-[1400px] mx-auto w-full md:my-auto">
            <motion.div
              className="w-full md:max-w-[68%] lg:max-w-[60%]"
              initial={{ opacity: 0, y: -24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: EASE, delay: 0.15 }}
            >
              <p
                className="text-[#edeaf5] tracking-[-0.03em] mb-3 md:mb-4"
                style={{ fontFamily: "var(--font-expanded)", fontSize: "clamp(14px, 1.6vw, 22px)", fontWeight: 700, lineHeight: 1.2 }}
              >
                {heroEyebrow}
              </p>
              <h1
                className="text-white tracking-[-0.04em]"
                style={{ fontFamily: "var(--font-expanded)", fontSize: "clamp(36px, 5.2vw, 86px)", fontWeight: 300, lineHeight: 1.05 }}
              >
                AI for designers:{" "}
                <br className="hidden sm:block" />
                from prompt to product.
              </h1>
              <p
                className="text-white tracking-[-0.02em] mt-5 md:mt-6 w-full max-w-[600px]"
                style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(15px, 1.15vw, 17px)", fontWeight: 400, lineHeight: 1.6 }}
              >
                {workshop.heroLead}
              </p>

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
            <dl className="mt-10 md:mt-16 lg:mt-20 flex flex-wrap gap-2 lg:flex lg:w-fit lg:gap-0 lg:border-t lg:border-[#2e1a6a] lg:pt-6">
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
