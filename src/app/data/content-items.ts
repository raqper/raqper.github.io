// ─────────────────────────────────────────────────────────────────────────────
// content-items.ts
// All content/events data for the Career page Content section.
// Sorted reverse-chronologically (newest → oldest).
// ─────────────────────────────────────────────────────────────────────────────

import idsHackathon from "@/assets/ids-hackathon.png";
import makeAThonLisbon from "@/assets/make-a-thon-lisbon.png";
import hatchConference2025 from "@/assets/hatch-conference-2025.png";
import idsMeetupLisbon from "@/assets/ids-meetup-lisbon.png";
import designLeadershipDinner from "@/assets/design-leadership-dinner.png";
import fofLayers2024 from "@/assets/fof-layers-2024.png";
import configWatchParty2024 from "@/assets/config-watch-party-2024.png";
import designopsAssemblyFof from "@/assets/designops-assembly-fof.png";
import figmaVariablesArticle from "@/assets/figma-variables-article.png";
import fofLayers2023 from "@/assets/fof-layers-2023.png";
import vwdsDesignDay from "@/assets/vwds-design-day.png";
import thestarterDsAdvanced from "@/assets/thestarter-ds-advanced.png";
import thestarterDsComplete from "@/assets/thestarter-ds-complete.png";

export type ContentType =
  | "livestream"
  | "article"
  | "talk"
  | "workshop"
  | "meetup"
  | "podcast"
  | "course"
  | "hackathon"
  | "roundtable";

export type ContentTag =
  | "Design Systems"
  | "Figma"
  | "DesignOps"
  | "Design Leadership"
  | "UX/UI"
  | "Community"
  | "Friends of Figma"
  | "Into Design Systems"
  | "Hatch Conference"
  | "The Starter"
  | "Inspect & Reflect"
  | "Volkswagen"
  | "Config"
  | "AI"
  | "Teaching";

export type ContentRole = "speaker" | "organiser" | "attendee" | "instructor" | "panelist" | "teacher";

export interface ContentItem {
  id: string;
  type: ContentType;
  role: ContentRole[];
  title: string;
  description: string;
  image: string;
  platform: string;
  date: string;
  /** ISO date string for sorting, e.g. "2023-05-01" */
  dateISO: string;
  link: string;
  tags: ContentTag[];
  /** Optional secondary link (e.g. a YouTube recording of an in-person event) */
  videoLink?: string;
}

// ─── YouTube thumbnail helper ─────────────────────────────────────────────────
const ytThumb = (videoId: string) =>
  `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
/** HQ fallback when maxresdefault is missing (e.g. older videos) */
const ytThumbHq = (videoId: string) =>
  `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

// ─────────────────────────────────────────────────────────────────────────────

export const contentItems: ContentItem[] = [
  // ── Courses ───────────────────────────────────────────────────────────────

  {
    id: "35",
    type: "course",
    role: ["teacher"],
    title: "Design Systems [Complete]",
    description:
      "Learn the design stages for building a Design System and the business and engineering challenges involved (in Portuguese).",
    image: thestarterDsComplete,
    platform: "TheStarter",
    date: "8 weeks · online",
    dateISO: "2026-01-01",
    link: "https://www.thestarter.io/productdesign/design-systems-os-fundamentos-do-design-em-escala-thestarter",
    tags: ["Design Systems", "The Starter", "Teaching"],
  },

  {
    id: "34",
    type: "course",
    role: ["teacher"],
    title: "Design Systems [Advanced]",
    description:
      "Define scalable strategies and processes to create a culture of using a design system in your company (in Portuguese).",
    image: thestarterDsAdvanced,
    platform: "TheStarter",
    date: "4 weeks · online",
    dateISO: "2023-01-01",
    link: "https://www.thestarter.io/design-systems-implementacao-em-escala-thestarter",
    tags: ["Design Systems", "The Starter", "Teaching"],
  },

  // ── 2026 ──────────────────────────────────────────────────────────────────

  {
    id: "33",
    type: "hackathon",
    role: ["speaker"],
    title: "Swap Wizard: 1st Place 🥇",
    description:
      "Built a Figma plugin that auto-matches and swaps component libraries in under 48 hours.",
    image: idsHackathon,
    platform: "Into Design Systems",
    date: "Feb 2026",
    dateISO: "2026-02-13",
    link: "https://www.linkedin.com/posts/raqper_intodesignsystems-ids-idshackathon-activity-7426555698559217666-6jr5",
    tags: ["Design Systems", "Into Design Systems", "AI", "Figma"],
  },

  // ── 2025 ──────────────────────────────────────────────────────────────────

  {
    id: "32",
    type: "meetup",
    role: ["organiser", "speaker"],
    title: "Make-a-thon of things",
    description:
      "Hands-on evening at LACS Anjos exploring Figma Make — participants built functional prototypes.",
    image: makeAThonLisbon,
    platform: "Friends of Figma",
    date: "Oct 2025",
    dateISO: "2025-10-24",
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7394412125856800768/",
    tags: ["Figma", "Friends of Figma", "AI", "Community"],
  },

  {
    id: "30",
    type: "roundtable",
    role: ["panelist"],
    title: "Challenges aligning business, design and development",
    description:
      "DesignOps and systems thinking strategies for aligning cross-functional teams.",
    image: hatchConference2025,
    platform: "Hatch Conference",
    date: "Sep 2025",
    dateISO: "2025-09-10",
    link: "https://www.linkedin.com/posts/raqper_hatchconference-designops-designleadership-activity-7373634322907508738-y-HI?utm_source=share&utm_medium=member_desktop&rcm=ACoAACEpVHcB-W5ZP0ik5kA4gbl6Vqi_UDIpQjY",
    tags: ["DesignOps", "Design Leadership", "Hatch Conference"],
  },

  {
    id: "31",
    type: "talk",
    role: ["speaker"],
    title: "Advocating design systems at scale: from frustration to adoption",
    description:
      "Strategies for driving cross-team buy-in and overcoming resistance to design systems.",
    image: ytThumb("dYdwBuskh7A"),
    platform: "UX Time Conference",
    date: "Aug 2025",
    dateISO: "2025-08-30",
    link: "https://www.youtube.com/watch?v=dYdwBuskh7A&t=132s",
    tags: ["Design Systems", "Design Leadership", "Community"],
    videoLink: "https://www.youtube.com/watch?v=dYdwBuskh7A",
  },

  {
    id: "29",
    type: "livestream",
    role: ["speaker"],
    title: "Wise Design System",
    description:
      "Deconstructing components, tokens and documentation with the Wise design team.",
    image: ytThumb("YSWG98qiwJg"),
    platform: "Inspect & Reflect",
    date: "Jun 2025",
    dateISO: "2025-06-01",
    link: "https://www.youtube.com/watch?v=YSWG98qiwJg",
    tags: ["Design Systems", "Inspect & Reflect"],
    videoLink: "https://www.youtube.com/watch?v=YSWG98qiwJg",
  },

  {
    id: "28",
    type: "meetup",
    role: ["organiser", "speaker"],
    title: "First meetup in Lisbon",
    description:
      "First Portugal event at Nagarro — an evening connecting design systems practitioners.",
    image: idsMeetupLisbon,
    platform: "Into Design Systems",
    date: "Mar 2025",
    dateISO: "2025-03-27",
    link: "https://youtube.com/live/s3P4EgZ9VW8?si=JTplsuZ7Wehebu1f",
    tags: ["Design Systems", "Into Design Systems", "Community"],
    videoLink: "https://www.youtube.com/watch?v=s3P4EgZ9VW8",
  },

  {
    id: "26",
    type: "livestream",
    role: ["organiser", "speaker"],
    title: "Unboxing Design Systems Ep 6: Salesforce",
    description:
      "How Lightning powers enterprise-scale products with robust tokens and accessibility patterns.",
    image: ytThumb("4HS3UMhdQdk"),
    platform: "Friends of Figma",
    date: "Feb 2025",
    dateISO: "2025-02-13",
    link: "https://www.youtube.com/live/4HS3UMhdQdk?si=46EqCVUg-MkRneaa",
    tags: ["Design Systems", "Figma", "Friends of Figma", "Community"],
    videoLink: "https://www.youtube.com/watch?v=4HS3UMhdQdk",
  },

  {
    id: "25",
    type: "livestream",
    role: ["speaker"],
    title: "IBM Carbon Design System",
    description:
      "Deconstructing Carbon's architecture, token model and component patterns.",
    image: ytThumb("y78Sn5YSymo"),
    platform: "Inspect & Reflect",
    date: "Jan 2025",
    dateISO: "2025-01-15",
    link: "https://www.youtube.com/watch?v=y78Sn5YSymo",
    tags: ["Design Systems", "Inspect & Reflect"],
    videoLink: "https://www.youtube.com/watch?v=y78Sn5YSymo",
  },

  // ── 2024 ──────────────────────────────────────────────────────────────────

  {
    id: "24",
    type: "podcast",
    role: ["speaker"],
    title: "You don't have to depend on tools",
    description:
      "Exploring the role of a Lead UX Designer in enterprise design systems.",
    image: ytThumb("fjKw4365TBw"),
    platform: "The Design System Guide",
    date: "Dec 2024",
    dateISO: "2024-12-01",
    link: "https://www.youtube.com/watch?v=fjKw4365TBw",
    tags: ["Design Systems", "Community"],
    videoLink: "https://www.youtube.com/watch?v=fjKw4365TBw",
  },

  {
    id: "23",
    type: "talk",
    role: ["attendee"],
    title: "Design Leadership dinner",
    description:
      "Reflecting on the evolving role of design leads and the future of the profession.",
    image: designLeadershipDinner,
    platform: "Hatch Conference",
    date: "Sep 2024",
    dateISO: "2024-09-20",
    link: "https://www.linkedin.com/posts/damianmartone_an-amazing-night-reflecting-on-design-leadership-ugcPost-7247830368400084995-ntxv",
    tags: ["Design Leadership", "Community", "Hatch Conference"],
  },

  {
    id: "22",
    type: "talk",
    role: ["organiser", "speaker"],
    title: "FoF Layers Portugal 2024",
    description:
      "Flagship conference with 200+ in-person and 1,000+ online attendees.",
    image: fofLayers2024,
    platform: "Friends of Figma",
    date: "Sep 2024",
    dateISO: "2024-09-01",
    link: "https://www.youtube.com/live/Rk8NvZMZp30?si=liITLO4ZvmAt-8Z9&t=9952",
    tags: ["Design Systems", "Figma", "Friends of Figma", "Community", "Design Leadership"],
  },

  {
    id: "21",
    type: "livestream",
    role: ["instructor"],
    title: "Micro-Learning: Design Systems 101",
    description:
      "Foundational concepts for early-career designers entering the design systems space.",
    image: ytThumb("k64gyrJNOJE"),
    platform: "TheStarter",
    date: "Aug 2024",
    dateISO: "2024-08-01",
    link: "https://www.youtube.com/watch?v=k64gyrJNOJE",
    tags: ["Design Systems", "The Starter"],
    videoLink: "https://www.youtube.com/watch?v=k64gyrJNOJE",
  },

  {
    id: "20",
    type: "meetup",
    role: ["organiser"],
    title: "Figma Config 2024 Watch Party at Bliss Applications",
    description:
      "Watch party at Bliss Applications' Beach House in Oeiras with the local community.",
    image: configWatchParty2024,
    platform: "Friends of Figma",
    date: "Jun 2024",
    dateISO: "2024-06-26",
    link: "https://www.linkedin.com/posts/bliss-applications_config-watch-party-lisbon-2024-ugcPost-7209500249898340353-RUf_",
    tags: ["Figma", "Config", "Community", "Friends of Figma"],
  },

  {
    id: "19",
    type: "talk",
    role: ["speaker"],
    title: "Online career meetup",
    description:
      "200+ practitioners discussing career paths, team structures and design systems practice.",
    image: ytThumb("wgezbiCcUIg"),
    platform: "Into Design Systems",
    date: "Mar 2024",
    dateISO: "2024-03-20",
    link: "https://www.youtube.com/watch?v=wgezbiCcUIg",
    tags: ["Design Systems", "Into Design Systems", "Community"],
  },

  {
    id: "18",
    type: "meetup",
    role: ["panelist"],
    title: "DesignOps Assembly meets Friends of Figma",
    description:
      "Exploring how practitioners navigate Product Design, Design Systems and DesignOps.",
    image: designopsAssemblyFof,
    platform: "DesignOps Assembly",
    date: "Mar 2024",
    dateISO: "2024-03-01",
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7169416808435703809/",
    tags: ["DesignOps", "Friends of Figma", "Community", "Design Systems"],
  },

  {
    id: "17",
    type: "livestream",
    role: ["speaker"],
    title: "How to use Figma Variables in your design system",
    description:
      "How Figma Variables connect to design tokens and power scalable theming in production.",
    image: ytThumb("2U2kWiEYBDw"),
    platform: "Supernova",
    date: "Feb 2024",
    dateISO: "2024-02-01",
    link: "https://www.youtube.com/watch?v=2U2kWiEYBDw",
    tags: ["Design Systems", "Figma"],
  },

  {
    id: "16",
    type: "livestream",
    role: ["organiser", "speaker"],
    title: "Unboxing Design Systems Ep. 5: Gitlab",
    description:
      "How Pajamas enables open-source collaboration with clear tokens and developer-first docs.",
    image: ytThumb("Wdwf3AhpBaw"),
    platform: "Friends of Figma",
    date: "Jan 2024",
    dateISO: "2024-01-24",
    link: "https://www.youtube.com/watch?v=Wdwf3AhpBaw",
    tags: ["Design Systems", "Figma", "Friends of Figma", "Community"],
  },

  // ── 2023 ──────────────────────────────────────────────────────────────────

  {
    id: "15",
    type: "article",
    role: ["speaker"],
    title: "Differences between Figma variables and design tokens",
    description:
      "Breaking down how Figma variables and design tokens fit into cross-platform pipelines.",
    image: figmaVariablesArticle,
    platform: "Supernova",
    date: "Dec 2023",
    dateISO: "2023-12-01",
    link: "https://www.supernova.io/blog/understanding-the-differences-between-figma-variables-and-design-tokens?utm_source=linkedin&utm_medium=social&utm_campaign=ds_partner",
    tags: ["Design Systems", "Figma"],
  },

  {
    id: "13",
    type: "talk",
    role: ["speaker"],
    title: "Navigating design systems with Figma's Config 2023 updates",
    description:
      "Most impactful Config 2023 announcements and how they reshape design system practice.",
    image: ytThumb("JxWfKjPW7Z0"),
    platform: "Friends of Figma",
    date: "Oct 2023",
    dateISO: "2023-10-15",
    link: "https://www.youtube.com/watch?v=JxWfKjPW7Z0",
    tags: ["Design Systems", "Figma", "Friends of Figma", "Config"],
    videoLink: "https://www.youtube.com/watch?v=JxWfKjPW7Z0",
  },

  {
    id: "12",
    type: "talk",
    role: ["speaker"],
    title: "Connecting design and code: unifying your design system",
    description:
      "Bridging design and engineering through a unified, shared design system.",
    image: ytThumbHq("ZiDqUKy7ExQ"),
    platform: "Friends of Figma",
    date: "Oct 2023",
    dateISO: "2023-10-01",
    link: "https://www.youtube.com/watch?v=ZiDqUKy7ExQ",
    tags: ["Design Systems", "Figma", "Friends of Figma"],
    videoLink: "https://www.youtube.com/watch?v=ZiDqUKy7ExQ",
  },

  {
    id: "11",
    type: "talk",
    role: ["organiser", "speaker"],
    title: "FoF Layers Portugal 2023",
    description:
      "First hybrid conference in Lisbon, Porto and online covering design systems and Figma tooling.",
    image: fofLayers2023,
    platform: "Friends of Figma",
    date: "Sep 2023",
    dateISO: "2023-09-25",
    link: "https://www.linkedin.com/posts/raqper_figma-foflayers-fofportugal-activity-7114588086679875584-G6oe?utm_source=share&utm_medium=member_desktop&rcm=ACoAACEpVHcB-W5ZP0ik5kA4gbl6Vqi_UDIpQjY",
    tags: ["Design Systems", "Figma", "Friends of Figma", "Community", "Design Leadership"],
  },

  {
    id: "10",
    type: "talk",
    role: ["organiser"],
    title: "Design Day",
    description:
      "Full day of talks and workshops for product designers, engineers and managers.",
    image: vwdsDesignDay,
    platform: "Volkswagen Group Digital Solutions",
    date: "Aug 2023",
    dateISO: "2023-08-01",
    link: "https://www.linkedin.com/posts/raqper_vwds-volkswagendigitalsolutions-volkswagen-activity-7083119632277979136-2HJy",
    tags: ["Design Systems", "Volkswagen", "Design Leadership"],
  },

  {
    id: "09",
    type: "livestream",
    role: ["organiser", "speaker"],
    title: "Unboxing Design Systems Ep. 4: Apple",
    description:
      "Human Interface Guidelines and how Apple's platform patterns shape consistent experiences.",
    image: ytThumb("JORXM6YVYYQ"),
    platform: "Friends of Figma Portugal",
    date: "Jul 2023",
    dateISO: "2023-07-25",
    link: "https://www.youtube.com/watch?v=JORXM6YVYYQ",
    tags: ["Design Systems", "Figma", "Friends of Figma", "Community"],
  },

  {
    id: "06",
    type: "livestream",
    role: ["organiser", "speaker"],
    title: "Unboxing Design Systems Ep. 3: Google",
    description:
      "Material Design's cross-platform approach to motion, elevation and adaptive layouts.",
    image: ytThumb("yKmyuJv6UJc"),
    platform: "Friends of Figma",
    date: "May 2023",
    dateISO: "2023-05-30",
    link: "https://www.youtube.com/watch?v=yKmyuJv6UJc",
    tags: ["Design Systems", "Figma", "Friends of Figma", "Community"],
  },

  {
    id: "04",
    type: "livestream",
    role: ["organiser", "speaker"],
    title: "Unboxing Design Systems Ep. 2: Atlassian",
    description:
      "Atlassian Design System's token architecture and patterns for team collaboration tools.",
    image: ytThumb("gcD-zsKhHxA"),
    platform: "Friends of Figma",
    date: "Apr 2023",
    dateISO: "2023-04-04",
    link: "https://www.youtube.com/watch?v=gcD-zsKhHxA",
    tags: ["Design Systems", "Figma", "Friends of Figma", "Community"],
  },

  {
    id: "03",
    type: "livestream",
    role: ["organiser", "speaker"],
    title: "Unboxing Design Systems Ep. 1: Uber",
    description:
      "Base Web's open-source React components and how Uber scales theming across products.",
    image: ytThumb("ogL_oowkZVU"),
    platform: "Friends of Figma",
    date: "Feb 2023",
    dateISO: "2023-02-15",
    link: "https://www.youtube.com/watch?v=ogL_oowkZVU",
    tags: ["Design Systems", "Figma", "Friends of Figma", "Community"],
  },

  // ── 2022 ──────────────────────────────────────────────────────────────────

  {
    id: "01",
    type: "talk",
    role: ["speaker"],
    title: "Inovação, criatividade e design",
    description:
      "Celebrating women in tech through innovation, creativity and the role of design.",
    image: ytThumb("2nOegVj9Dlg"),
    platform: "Extraordinary Women in Tech",
    date: "Jul 2022",
    dateISO: "2022-07-15",
    link: "https://www.youtube.com/watch?v=2nOegVj9Dlg",
    tags: ["Design Leadership", "Community", "UX/UI"],
    videoLink: "https://www.youtube.com/watch?v=2nOegVj9Dlg",
  },
];

// ─── Updated highlights stat (auto-count) ────────────────────────────────────
export const highlights = [
  { value: "9", label: "Years in Design" },
  { value: "4", label: "Industries" },
  { value: "30+", label: "Design events" },
  { value: "3", label: "Cats (Proud cat lady 😻)" },
];
