// ─────────────────────────────────────────────────────────────────────────────
// card-builder.ts - Card definitions and build logic for portfolio section.
// ─────────────────────────────────────────────────────────────────────────────

import type { UseCaseId } from "./portfolio-data";
import { allUseCases } from "./portfolio-data";

export type CardType = "intro" | "overview" | "problem" | "approach" | "impact" | "learnings" | "media" | "fidIntro" | "fidRounds" | "aiUsage" | "prototypeFlowStep";

export interface CardDef {
  type: CardType;
  useCaseId: UseCaseId;
  id: string;
}

const HIDDEN_CARD_IDS = new Set([
  "nokia-fidIntro",
]);

const HIDDEN_MEDIA_IDS = new Set([
  "nos-media-approach-2",
  "nokia-media-problem",
  "nokia-media-approach",
  "nokia-media-approach-4",
  "nokia-media-approach-5",
  "nokia-media-fidIntro",
  "nokia-media-fidDetail-1",
  "nokia-media-fidDetail-2",
  "nokia-media-fidDetail-3",
  "nokia-media-fidDetail-4",
  "nokia-media-fidDetail-5",
  "nokia-media-ai-1",
]);

function pushMedia(cards: CardDef[], useCaseId: UseCaseId, id: string) {
  if (!HIDDEN_MEDIA_IDS.has(id)) {
    cards.push({ type: "media", useCaseId, id });
  }
}

export function buildCards(): CardDef[] {
  const cards: CardDef[] = [
    { type: "intro", useCaseId: "nokia", id: "portfolio-intro" },
  ];
  const mainTypes: CardType[] = ["overview", "problem", "approach", "impact"];
  for (const uc of allUseCases) {
    const deferImpact = uc.id === "nos" || uc.id === "nokia";
    for (const t of mainTypes) {
      if (t === "impact" && uc.id !== "man" && uc.id !== "nos" && uc.id !== "nokia") {
        pushMedia(cards, uc.id, `${uc.id}-media-pre-impact-2`);
      }
      if (deferImpact && t === "impact") continue;
      cards.push({ type: t, useCaseId: uc.id, id: `${uc.id}-${t}` });
      if (t !== "overview" && t !== "impact") {
        if (!(t === "problem" && (uc.id === "man" || uc.id === "nos"))) {
          pushMedia(cards, uc.id, `${uc.id}-media-${t}`);
        }
        if (t === "approach") {
          pushMedia(cards, uc.id, `${uc.id}-media-approach-2`);
          if (uc.id === "nokia") {
            pushMedia(cards, uc.id, `${uc.id}-media-approach-3`);
            pushMedia(cards, uc.id, `${uc.id}-media-approach-4`);
            pushMedia(cards, uc.id, `${uc.id}-media-uc-5`);
            pushMedia(cards, uc.id, `${uc.id}-media-pre-impact-2`);
            pushMedia(cards, uc.id, `${uc.id}-media-approach-5`);
          } else if (uc.id === "man") {
            pushMedia(cards, uc.id, `${uc.id}-media-approach-3`);
            pushMedia(cards, uc.id, `${uc.id}-media-approach-4`);
            pushMedia(cards, uc.id, `${uc.id}-media-approach-5`);
          }
          if (uc.id === "nos") {
            pushMedia(cards, uc.id, `${uc.id}-media-approach-3`);
          }
        }
      }
    }
    if (uc.featureInDetail && uc.id !== "nokia") {
      const fidIntroId = `${uc.id}-fidIntro`;
      if (!HIDDEN_CARD_IDS.has(fidIntroId)) {
        cards.push({ type: "fidIntro", useCaseId: uc.id, id: fidIntroId });
      }
      pushMedia(cards, uc.id, `${uc.id}-media-fidIntro`);
      if (uc.featureInDetail.rounds.length > 0) {
        cards.push({ type: "fidRounds", useCaseId: uc.id, id: `${uc.id}-fidRounds` });
        if (uc.id === "nos") {
          pushMedia(cards, uc.id, `${uc.id}-media-fidDetail-1`);
          pushMedia(cards, uc.id, `${uc.id}-media-fidDetail-2`);
          pushMedia(cards, uc.id, `${uc.id}-media-fidDetail-3`);
          pushMedia(cards, uc.id, `${uc.id}-media-fidDetail-3-1`);
          pushMedia(cards, uc.id, `${uc.id}-media-fidDetail-4`);
          pushMedia(cards, uc.id, `${uc.id}-media-fidDetail-5`);
        }
      }
    }
    if (deferImpact) {
      cards.push({ type: "impact", useCaseId: uc.id, id: `${uc.id}-impact` });
    }
    if (uc.aiUsage) {
      cards.push({ type: "aiUsage", useCaseId: uc.id, id: `${uc.id}-aiUsage` });
    }
    if (uc.prototypeFlow) {
      uc.prototypeFlow.steps.forEach((_, i) => {
        cards.push({
          type: "prototypeFlowStep",
          useCaseId: uc.id,
          id: `${uc.id}-prototypeFlow-${i}`,
        });
      });
    }
    cards.push({ type: "learnings", useCaseId: uc.id, id: `${uc.id}-learnings` });
  }
  return cards;
}

export const ALL_CARDS = buildCards();
