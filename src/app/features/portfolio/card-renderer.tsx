import { allUseCases, type UseCaseId } from "./portfolio-data";
import { OverviewCard } from "./overview-card";
import { ProblemCard } from "./problem-card";
import { ApproachCard } from "./approach-card";
import { ImpactCard } from "./impact-card";
import { LearningsCard } from "./learnings-card";
import { IntroCard } from "./intro-card";
import { MediaPlaceholderCard, NokiaBeforeAfterCard } from "./media-card";
import { FIDIntroCard, FIDRoundsCard } from "./fid-cards";
import { AiUsageCard } from "./ai-usage-card";
import { PrototypeFlowStepCard } from "./prototype-flow-step-card";
import { ALL_CARDS, type CardDef } from "./card-builder";

export { ALL_CARDS };

const useCaseById = new Map(allUseCases.map((useCase) => [useCase.id, useCase]));

export function CardRenderer({
  card,
  onCaseClick,
}: {
  card: CardDef;
  onCaseClick?: (id: UseCaseId) => void;
}) {
  if (card.type === "intro") {
    return <IntroCard onCaseClick={onCaseClick} />;
  }
  const uc = useCaseById.get(card.useCaseId)!;
  switch (card.type) {
    case "overview":
      return <OverviewCard uc={uc} />;
    case "problem":
      return <ProblemCard uc={uc} />;
    case "approach":
      return <ApproachCard uc={uc} />;
    case "impact":
      return <ImpactCard uc={uc} />;
    case "learnings":
      return <LearningsCard uc={uc} />;
    case "aiUsage":
      return <AiUsageCard uc={uc} />;
    case "prototypeFlowStep":
      return <PrototypeFlowStepCard uc={uc} card={card} />;
    case "media":
      if (card.id === "nokia-media-pre-impact-2") return <NokiaBeforeAfterCard />;
      return <MediaPlaceholderCard uc={uc} card={card} />;
    case "fidIntro":
      return <FIDIntroCard uc={uc} />;
    case "fidRounds":
      return <FIDRoundsCard uc={uc} />;
  }
}
