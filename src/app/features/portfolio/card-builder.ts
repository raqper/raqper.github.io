// ─────────────────────────────────────────────────────────────────────────────
// card-builder.ts — Card definitions and build logic for portfolio section.
// ─────────────────────────────────────────────────────────────────────────────

import type { UseCaseId } from "./portfolio-data";
import { allUseCases } from "./portfolio-data";

export type CardType = "overview" | "problem" | "approach" | "impact" | "media" | "fidIntro" | "fidRounds";

export interface CardDef {
  type: CardType;
  useCaseId: UseCaseId;
  id: string;
}

const HIDDEN_MEDIA_IDS = new Set([
  "swap-wizard-media-approach-2",
  "swap-wizard-media-fidRound1",
  "nokia-media-approach",
  "nokia-media-approach-3",
  "man-media-approach-3",
  "man-media-approach-5",
  "nos-media-approach-2",
  "nos-media-fidDetail-2",
  "nos-media-fidDetail-3",
]);

function pushMedia(cards: CardDef[], useCaseId: UseCaseId, id: string) {
  if (!HIDDEN_MEDIA_IDS.has(id)) {
    cards.push({ type: "media", useCaseId, id });
  }
}

export function buildCards(): CardDef[] {
  const cards: CardDef[] = [];
  const mainTypes: CardType[] = ["overview", "problem", "approach", "impact"];
  for (const uc of allUseCases) {
    const deferImpactLearnings = uc.id === "swap-wizard" || uc.id === "nos";
    for (const t of mainTypes) {
      if (t === "impact" && uc.id !== "swap-wizard" && uc.id !== "man" && uc.id !== "nos") {
        pushMedia(cards, uc.id, `${uc.id}-media-pre-impact-2`);
      }
      if (deferImpactLearnings && t === "impact") continue;
      if (t === "approach" && uc.id === "swap-wizard") continue;
      cards.push({ type: t, useCaseId: uc.id, id: `${uc.id}-${t}` });
      if (t !== "overview" && t !== "impact") {
        if (!(t === "problem" && (uc.id === "swap-wizard" || uc.id === "nokia" || uc.id === "man" || uc.id === "nos"))) {
          pushMedia(cards, uc.id, `${uc.id}-media-${t}`);
        }
        if (t === "approach") {
          pushMedia(cards, uc.id, `${uc.id}-media-approach-2`);
          if (uc.id === "nokia" || uc.id === "man") {
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
    if (uc.id === "swap-wizard") {
      pushMedia(cards, uc.id, `${uc.id}-media-approach`);
      cards.push({ type: "media", useCaseId: uc.id, id: `${uc.id}-media-post-overview` });
    }
    if (uc.featureInDetail) {
      cards.push({ type: "fidIntro", useCaseId: uc.id, id: `${uc.id}-fidIntro` });
      if (uc.featureInDetail.rounds.length > 0 && uc.id !== "swap-wizard") {
        cards.push({ type: "fidRounds", useCaseId: uc.id, id: `${uc.id}-fidRounds` });
        if (uc.id !== "nos") {
          pushMedia(cards, uc.id, `${uc.id}-media-fidRounds`);
          pushMedia(cards, uc.id, `${uc.id}-media-fidRound1`);
        }
      }
      if (uc.id !== "nos" && uc.id !== "swap-wizard") {
        cards.push({ type: "media", useCaseId: uc.id, id: `${uc.id}-media-fidIntro` });
      }
      if (uc.id === "nos") {
        pushMedia(cards, uc.id, `${uc.id}-media-fidDetail-1`);
        pushMedia(cards, uc.id, `${uc.id}-media-fidDetail-2`);
        pushMedia(cards, uc.id, `${uc.id}-media-fidDetail-3`);
        pushMedia(cards, uc.id, `${uc.id}-media-fidDetail-4`);
        pushMedia(cards, uc.id, `${uc.id}-media-fidDetail-5`);
      }
    }
    if (uc.id === "swap-wizard") {
      pushMedia(cards, uc.id, `${uc.id}-media-fidRounds`);
      pushMedia(cards, uc.id, `${uc.id}-media-fidIntro`);
    }
    if (deferImpactLearnings) {
      cards.push({ type: "impact", useCaseId: uc.id, id: `${uc.id}-impact` });
    }
  }
  return cards;
}

export const ALL_CARDS = buildCards();
