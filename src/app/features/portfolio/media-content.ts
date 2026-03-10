// ─────────────────────────────────────────────────────────────────────────────
// media-content.ts — Asset imports and MEDIA_CONTENT map for portfolio cards.
// ─────────────────────────────────────────────────────────────────────────────

import swapWizardProblemImg from "@/assets/swap-wizard-problem.png";
import swapWizardApproachGif from "@/assets/swap-wizard-approach.gif";
import swapWizardApproach2Video from "@/assets/swap-wizard-approach-2.mp4";
import swapWizardPitchVideo from "@/assets/swap-wizard-pitch-winners.mov";
import swapWizardFidIntroGif from "@/assets/swap-wizard-fid-intro.gif";
import swapWizardFidRound1Video from "@/assets/swap-wizard-fid-round1.mp4";
import swapWizardFidRoundsGif from "@/assets/swap-wizard-fid-rounds.gif";

import nokia1Img from "@/assets/nokia-approach-1.png";
import nokia2Img from "@/assets/nokia-approach-2.png";
// import nokia3Video from "@/assets/nokia-approach-3.gif";
import nokia4Video from "@/assets/nokia-approach-4.png";
import nokia5Video from "@/assets/nokia-approach-5.png";

import man1Img from "@/assets/man-approach-1.png";
import man2Video from "@/assets/man-approach-2.gif";
import man3Img from "@/assets/man-approach-3.png";
import man4Img from "@/assets/man-approach-3.png";
import man5Img from "@/assets/man-approach-5.png";

import nos1Img from "@/assets/nos-approach-1.png";
import nos2Img from "@/assets/nos-approach-2.png";
import nos3Img from "@/assets/nos-approach-3.png";

import nosDetail1 from "@/assets/nos-fid-detail-1.png";
import nosDetail2 from "@/assets/nos-fid-detail-2.png";
import nosDetail3 from "@/assets/nos-fid-detail-3.png";
import nosDetail4 from "@/assets/nos-fid-detail-4.png";
import nosDetail5Video from "@/assets/nos-fid-detail-5.gif";

export type MediaEntry =
  | { type: "youtube"; src: string }
  | { type: "image"; src: string }
  | { type: "video"; src: string };

export const MEDIA_CONTENT: Record<string, MediaEntry> = {
  "swap-wizard-media-post-overview": { type: "video", src: swapWizardPitchVideo },
  "swap-wizard-media-fidIntro": { type: "image", src: swapWizardFidIntroGif },
  "swap-wizard-media-fidRound1": { type: "video", src: swapWizardFidRound1Video },
  "swap-wizard-media-fidRounds": { type: "image", src: swapWizardFidRoundsGif },
  "swap-wizard-media-problem": { type: "image", src: swapWizardProblemImg },
  "swap-wizard-media-approach": { type: "image", src: swapWizardApproachGif },
  "swap-wizard-media-approach-2": { type: "video", src: swapWizardApproach2Video },
  "nokia-media-approach": { type: "image", src: nokia1Img },
  "nokia-media-approach-2": { type: "image", src: nokia2Img },
  // "nokia-media-approach-3": { type: "image", src: nokia3Video },
  "nokia-media-approach-4": { type: "image", src: nokia4Video },
  "nokia-media-approach-5": { type: "image", src: nokia5Video },
  "man-media-approach": { type: "image", src: man1Img },
  "man-media-approach-2": { type: "image", src: man2Video },
  "man-media-approach-3": { type: "image", src: man3Img },
  "man-media-approach-4": { type: "image", src: man4Img },
  "man-media-approach-5": { type: "image", src: man5Img },
  "nos-media-approach": { type: "image", src: nos1Img },
  "nos-media-approach-2": { type: "image", src: nos2Img },
  "nos-media-approach-3": { type: "image", src: nos3Img },
  "nos-media-fidDetail-1": { type: "image", src: nosDetail1 },
  "nos-media-fidDetail-2": { type: "image", src: nosDetail2 },
  "nos-media-fidDetail-3": { type: "image", src: nosDetail3 },
  "nos-media-fidDetail-4": { type: "image", src: nosDetail4 },
  "nos-media-fidDetail-5": { type: "image", src: nosDetail5Video },
};
