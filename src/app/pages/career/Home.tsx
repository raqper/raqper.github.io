import { Suspense } from "react";
import { useScrollToHash } from "@/app/hooks/use-scroll-to-hash";
import { HeroSection } from "@/app/features/career/hero-section";
import { SkillsSection } from "@/app/features/career/skills-section";
import { ContentSection } from "@/app/features/career/content-section";
import { EducationSection } from "@/app/features/career/education-section";
import { TimelineSection } from "@/app/features/career/timeline-section";
import { CtaSection } from "@/app/features/career/cta-section";
import { WorkshopHighlight } from "@/app/features/career/workshop-highlight";
import { Footer } from "@/app/components/footer";

export default function Home() {
  useScrollToHash();

  return (
    <main id="main-content" className="w-full min-h-screen" style={{ background: "var(--p-bg-base)" }}>
      <HeroSection />
      <WorkshopHighlight />
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
