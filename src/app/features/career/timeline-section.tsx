import { useRef, useEffect, useState, useCallback } from "react";
import { ScrollReveal } from "@/app/components/scroll-reveal";
import { milestones, type Milestone } from "@/app/data/timeline-data";

function MilestoneCard({ milestone }: { milestone: Milestone }) {
  return (
    <div className="bg-[#1c0048] rounded-xl p-5 border border-[#2e1a6a] hover:shadow-[0_4px_24px_rgba(46,26,106,0.12)] transition-all duration-300">
      <div className="flex items-center gap-3 mb-3">
        <span
          className="text-[#edeaf5] tracking-[-0.05em]"
          style={{ fontFamily: "var(--font-sans)", fontSize: "28px", fontWeight: 200 }}
        >
          {milestone.year}
        </span>
        <span
          role="tag"
          aria-label={`Type: ${milestone.type}`}
          className={`capitalize tracking-[-0.03em] px-2.5 py-1 rounded-full border ${
            milestone.type === "education"
              ? "bg-[#ede0a8]/10 text-[#ede0a8] border-[#ede0a8]/20"
              : "bg-[#b08828]/15 text-[#d4a848] border-[#b08828]/30"
          }`}
          style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 500, lineHeight: "1" }}
        >
          {milestone.type}
        </span>
      </div>
      <h3
        className="text-[#edeaf5] tracking-[-0.03em] mb-1"
        style={{ fontFamily: "var(--font-expanded)", fontSize: "14px", fontWeight: 600, lineHeight: "20px" }}
      >
        {milestone.title}
      </h3>
      <p
        className="text-[#a89cc8] tracking-[-0.02em] mb-3"
        style={{ fontFamily: "var(--font-sans)", fontSize: "14px", fontWeight: 400, lineHeight: "20px" }}
      >
        {milestone.subtitle}
      </p>
      <p
        className="text-white tracking-[-0.02em]"
        style={{ fontFamily: "var(--font-sans)", fontSize: "14px", fontWeight: 400, lineHeight: "22px" }}
      >
        {milestone.description}
      </p>
    </div>
  );
}

export function TimelineSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const timelineLineRef = useRef<HTMLDivElement>(null);
  const [extraScroll, setExtraScroll] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const recalculate = useCallback(() => {
    if (!trackRef.current || isMobile) return;
    const totalWidth = trackRef.current.scrollWidth;
    const viewportWidth = window.innerWidth;
    const overflow = Math.max(0, totalWidth - viewportWidth + 200);
    setExtraScroll(overflow);
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      setExtraScroll(0);
      return;
    }
    recalculate();
    window.addEventListener("resize", recalculate);
    return () => window.removeEventListener("resize", recalculate);
  }, [recalculate, isMobile]);

  useEffect(() => {
    if (isMobile) return;
    const onScroll = () => {
      if (!sectionRef.current || !trackRef.current || extraScroll <= 0) return;
      const { top } = sectionRef.current.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -top / extraScroll));
      trackRef.current.style.transform = `translateX(${-progress * extraScroll}px)`;
      if (timelineLineRef.current) {
        timelineLineRef.current.style.transform = `scaleX(${progress})`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [extraScroll, isMobile]);

  const sectionHeight = !isMobile && extraScroll > 0
    ? `${window.innerHeight + extraScroll}px`
    : "auto";

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative"
      style={{
        background: "rgb(5 0 14)",
        height: sectionHeight,
      }}
    >
      {/* Gradient overlay */}
      <div
        className="absolute inset-x-0 top-0 bottom-0 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, rgb(5 0 14) 0%, #0a001c 15%, #0f0028 40%, #0a001c 80%, rgb(5 0 14) 100%)",
        }}
      />
      {/* Warm amber glow — mid section */}
      <div
        className="absolute top-1/3 right-1/4 w-[500px] h-[400px] opacity-[0.03] pointer-events-none z-[1]"
        style={{ background: "radial-gradient(ellipse, rgba(200,112,32,1) 0%, transparent 70%)" }}
      />
      {/* Rose glow — lower section */}
      <div
        className="absolute bottom-1/4 left-1/3 w-[400px] h-[300px] opacity-[0.025] pointer-events-none z-[1]"
        style={{ background: "radial-gradient(ellipse, rgba(122,40,88,1) 0%, transparent 70%)" }}
      />

      <div className={`${!isMobile && extraScroll > 0 ? "sticky top-0 h-screen" : ""} overflow-hidden flex flex-col`}>
        {/* Section Header */}
        <ScrollReveal className="px-6 md:px-10 pt-16 md:pt-24 shrink-0" offsetY={30} duration={1.4}>
          <div className="max-w-[1400px] mx-auto w-full">
          <p
            className="text-[#a89cc8] tracking-[-0.05em] mb-4"
            style={{ fontFamily: "var(--font-sans)", fontSize: "14px" }}
          >
            Experience
          </p>
          <h2
            className="text-[#edeaf5] tracking-[-0.04em]"
            style={{ fontFamily: "var(--font-expanded)", fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 700, lineHeight: 1.1 }}
          >
            Scaling impact over time
          </h2>
          <p
            className="text-white tracking-[-0.02em] mt-4"
            style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(14px, 1.2vw, 17px)", lineHeight: 1.55 }}
          >
            Since 2017, I've progressively expanded my scope, from designing interfaces to shaping how teams build, scale, and integrate AI into their workflows.
          </p>
          </div>
        </ScrollReveal>

        {/* Mobile: vertical stack */}
        {isMobile && (
          <div className="px-6 pt-10 pb-16"><div className="max-w-[1400px] mx-auto w-full flex flex-col gap-4">
            {milestones.map((milestone) => (
              <ScrollReveal key={milestone.id} delay={0.05} duration={1.0} offsetY={24} blur={6}>
                <MilestoneCard milestone={milestone} />
              </ScrollReveal>
            ))}
          </div></div>
        )}

        {/* Desktop: horizontal scroll-jacking */}
        {!isMobile && (
          <ScrollReveal className="flex-1 flex flex-col justify-center overflow-hidden relative" delay={0.25} offsetY={0} blur={12} duration={1.6}>
            {/* Timeline rail */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-6">
              <div className="h-px bg-[#2e1a6a] w-full relative">
                <div
                  ref={timelineLineRef}
                  className="absolute inset-y-0 left-0 w-full origin-left"
                  style={{ transform: "scaleX(0)", background: "linear-gradient(to right, #2e1a6a, #b08828, #ede0a8)" }}
                />
              </div>
            </div>
            {/* Cards track */}
            <div
              ref={trackRef}
              className="flex gap-0 will-change-transform relative pt-[40px]"
              style={{ paddingLeft: "max(1.5rem, calc((100vw - 1400px) / 2 + 2.5rem))", paddingRight: "40vw" }}
            >
              {milestones.map((milestone) => (
                <div key={milestone.id} className="shrink-0 w-[340px] lg:w-[380px] relative flex flex-col pr-6">
                  <MilestoneCard milestone={milestone} />
                </div>
              ))}
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
