import { Suspense, useEffect } from "react";
import { useLocation } from "react-router";
import { HeroSection } from "@/app/features/career/hero-section";
import { SkillsSection } from "@/app/features/career/skills-section";
import { ContentSection } from "@/app/features/career/content-section";
import { EducationSection } from "@/app/features/career/education-section";
import { TimelineSection } from "@/app/features/career/timeline-section";
import { CtaSection } from "@/app/features/career/cta-section";
import { Footer } from "@/app/components/footer";

/** Scroll to #section when arriving with a hash (e.g. /career#content from the workshop page). */
function useScrollToHash() {
  const { hash } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const id = decodeURIComponent(hash.slice(1));
    // Sections render after the hero; retry briefly until the target exists and layout has settled.
    let tries = 0;
    const timer = window.setInterval(() => {
      const el = document.getElementById(id);
      tries += 1;
      if (el) {
        el.scrollIntoView({ block: "start" });
        if (tries >= 3) window.clearInterval(timer);
      } else if (tries > 30) {
        window.clearInterval(timer);
      }
    }, 100);
    return () => window.clearInterval(timer);
  }, [hash]);
}

export default function Home() {
  useScrollToHash();

  return (
    <main id="main-content" className="w-full min-h-screen" style={{ background: "var(--p-bg-base)" }}>
      <HeroSection />
      <Suspense fallback={null}>
        <TimelineSection />
        <ContentSection />
        <EducationSection />
        <SkillsSection />
        <CtaSection />
      </Suspense>
      <Footer />
    </main>
  );
}
