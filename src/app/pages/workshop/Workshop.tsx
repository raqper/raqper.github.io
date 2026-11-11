import { Suspense, useEffect } from "react";
import { Footer } from "@/app/components/footer";
import { CtaSection } from "@/app/features/career/cta-section";
import { AudienceSection } from "@/app/features/workshop/audience-section";
import { FaqSection } from "@/app/features/workshop/faq-section";
import { FloatingShapesStyles } from "@/app/features/workshop/floating-shapes";
import { InstructorSection } from "@/app/features/workshop/instructor-section";
import { ProgramSection } from "@/app/features/workshop/program-section";
import { RegisteredBanner } from "@/app/features/workshop/registered-banner";
import { StepsSection } from "@/app/features/workshop/steps-section";
import { TakeawaysSection } from "@/app/features/workshop/takeaways-section";
import { WorkshopHero } from "@/app/features/workshop/workshop-hero";
import { workshop } from "@/app/data/workshop-data";

const PAGE_TITLE = `${workshop.title} · Workshop by Raquel Pereira`;
const PAGE_DESCRIPTION = `${workshop.promise} A live online workshop for junior and mid-level designers.`;

/** Swap document title and description while this route is mounted. */
function usePageMeta() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = PAGE_TITLE;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousDescription = description?.content;
    if (description) description.content = PAGE_DESCRIPTION;
    return () => {
      document.title = previousTitle;
      if (description && previousDescription !== undefined) description.content = previousDescription;
    };
  }, []);
}

export default function Workshop() {
  usePageMeta();

  return (
    <main id="main-content" className="w-full min-h-screen overflow-x-hidden" style={{ background: "var(--p-bg-base)" }}>
      <FloatingShapesStyles />
      <RegisteredBanner />
      <WorkshopHero />
      <Suspense fallback={null}>
        <StepsSection />
        <ProgramSection />
        <AudienceSection />
        <TakeawaysSection />
        <InstructorSection />
        <FaqSection />
        <CtaSection variant="workshop" />
      </Suspense>
      <Footer />
    </main>
  );
}
