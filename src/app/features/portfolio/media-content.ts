// ─────────────────────────────────────────────────────────────────────────────
// media-content.ts - Asset imports and MEDIA_CONTENT map for portfolio cards.
// ─────────────────────────────────────────────────────────────────────────────

import nokia1Img from "@/assets/nokia-uc-1.png";
import nokia2Img from "@/assets/nokia-uc-2.png";
import nokia3Img from "@/assets/nokia-uc-3.png";
import nokia4Img from "@/assets/nokia-uc-4.png";
import nokia5Img from "@/assets/nokia-approach-5.png";
import nokiaUc5Gif from "@/assets/nokia-uc-5.gif";
import nokiaProblemAudit from "@/assets/nokia-problem-audit.png";
import nokiaFidIntro from "@/assets/nokia-fid-intro.png";
import nokiaFidDetail1 from "@/assets/nokia-fid-detail-1.png";
import nokiaFidDetail2 from "@/assets/nokia-fid-detail-2.png";
import nokiaFidDetail3 from "@/assets/nokia-fid-detail-3.png";
import nokiaFidDetail4 from "@/assets/nokia-fid-detail-4.png";
import nokiaFidDetail5 from "@/assets/nokia-fid-detail-5.png";

import ai1Video from "@/assets/ai-1.mp4";
import ai4Video from "@/assets/ai-4.mp4";
import ai6Img from "@/assets/ai-6.png";
import ai7Video from "@/assets/ai-7.mp4";
import ai8Img from "@/assets/ai-8.png";

import man1Img from "@/assets/man-approach-1.png";
import man2Video from "@/assets/man-approach-2.gif";
import man3Img from "@/assets/man-approach-3.png";
import man4Img from "@/assets/man-approach-4.png";
import man5Img from "@/assets/man-approach-5.png";

import nos1Img from "@/assets/nos-approach-1.png";
import nos2Img from "@/assets/nos-approach-2.png";
import nos3Img from "@/assets/nos-approach-3.png";

import nosDetail1 from "@/assets/nos-fid-detail-1.png";
import nosDetail2 from "@/assets/nos-fid-detail-2.png";
import nosDetail3 from "@/assets/nos-fid-detail-3.png";
import nosDetail3_1Gif from "@/assets/nos-fid-detail-3_1.gif";
import nosDetail4 from "@/assets/nos-fid-detail-4.png";
import nosDetail5Video from "@/assets/nos-fid-detail-5.gif";

export type MediaEntry =
  | { type: "youtube"; src: string; caption?: string; autoplay?: boolean }
  | { type: "image"; src: string; caption?: string; autoplay?: boolean }
  | { type: "video"; src: string; caption?: string; autoplay?: boolean };

export const MEDIA_CONTENT: Record<string, MediaEntry> = {
  "nokia-media-problem": { type: "image", src: nokiaProblemAudit },
  "nokia-media-approach": { type: "image", src: nokia1Img },
  "nokia-media-approach-2": { type: "image", src: nokia2Img },
  "nokia-media-approach-3": { type: "image", src: nokia3Img },
  "nokia-media-approach-4": { type: "image", src: nokia4Img },
  "nokia-media-uc-5": { type: "image", src: nokiaUc5Gif },
  "nokia-media-approach-5": { type: "image", src: nokia5Img },
  "nokia-media-fidIntro": { type: "image", src: nokiaFidIntro },
  "nokia-media-fidDetail-1": { type: "image", src: nokiaFidDetail1 },
  "nokia-media-fidDetail-2": { type: "image", src: nokiaFidDetail2 },
  "nokia-media-fidDetail-3": { type: "image", src: nokiaFidDetail3 },
  "nokia-media-fidDetail-4": { type: "image", src: nokiaFidDetail4 },
  "nokia-media-fidDetail-5": { type: "image", src: nokiaFidDetail5 },
  "nokia-media-ai-1": {
    type: "video",
    src: ai1Video,
    caption: "Mapping 154 components across 3 libraries",
    autoplay: true,
  },
  "nokia-media-ai-4": {
    type: "video",
    src: ai4Video,
    autoplay: true,
  },
  "nokia-media-ai-6": { type: "image", src: ai6Img },
  "nokia-media-ai-7": { type: "video", src: ai7Video, autoplay: true },
  "nokia-media-ai-8": { type: "image", src: ai8Img },
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
  "nos-media-fidDetail-3-1": { type: "image", src: nosDetail3_1Gif },
  "nos-media-fidDetail-4": { type: "image", src: nosDetail4 },
  "nos-media-fidDetail-5": { type: "image", src: nosDetail5Video },
};
