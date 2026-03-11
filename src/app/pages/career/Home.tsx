import { HeroSection } from "@/app/features/career/hero-section";
import { SkillsSection } from "@/app/features/career/skills-section";
import { ContentSection } from "@/app/features/career/content-section";
import { TimelineSection } from "@/app/features/career/timeline-section";
import { CtaSection } from "@/app/features/career/cta-section";
import { Footer } from "@/app/components/footer";

export default function Home() {
  return (
    <div className="w-full min-h-screen" style={{ background: "var(--p-bg-base)" }}>
      <HeroSection />
      <TimelineSection />
      <ContentSection />
      <SkillsSection />
      <CtaSection />
      <Footer />
    </div>
  );
}
