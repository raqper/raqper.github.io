/* ─────────────────────────────────────────────────────────────
   portfolio-data.ts  —  Single source of truth for all portfolio content.

   HOW TO EDIT CONTENT
   • Find a use case by its `id` (e.g. "nos", "nokia") and edit inline.
   • Images: add an import at the top, then reference it in the use case.
   • Approach narrative supports paragraph breaks: use \n\n

   CARD MAP — what renders where
   ┌──────────────┬────────────────────────────────────────────────────────┐
   │ Card         │ Fields rendered                                        │
   ├──────────────┼────────────────────────────────────────────────────────┤
   │ Overview     │ company · year · title · role (accent line)            │
   │              │ overview.teamSetup.caption  →  "Team & Setup" column   │
   │              │ overview.role.summary     →  "My role" column          │
   │              │ bgImage (optional header background)                   │
   ├──────────────┼────────────────────────────────────────────────────────┤
   │ Problem      │ problem.headline · problem.framing                     │
   ├──────────────┼────────────────────────────────────────────────────────┤
   │ Approach     │ approach.headline · approach.framing (supports \n\n)   │
   │              │ approach.keyDecisions[].decision + .rationale          │
   │              │ approach.validation[].method + .insight (optional)     │
   ├──────────────┼────────────────────────────────────────────────────────┤
   │ Impact       │ impact.summary (bold) · impact.signals[]               │
   ├──────────────┼────────────────────────────────────────────────────────┤
   │ Learnings    │ learnings.headline · learnings.reflection              │
   │              │ learnings.aiAndTooling (optional highlighted box)       │
   ├──────────────┼────────────────────────────────────────────────────────┤
   │ Media        │ placeholder after each section (image/gif/video)       │
   ├──────────────┼────────────────────────────────────────────────────────┤
   │ Feature in   │ featureInDetail.title · .context                       │
   │ detail (SW)  │ rounds[].label · .goal · .outcome                     │
   │              │ rounds[].phases[].mode · .description                 │
   │              │ featureInDetail.reflection                            │
   └──────────────┴────────────────────────────────────────────────────────┘

   HOW TO ADD A NEW USE CASE
   1. Add its id to UseCaseId
   2. Add accent/gradient/chip styles to chipActiveStyles, accents, gradients
   3. Add a chip entry to `useCaseChips`
   4. Add a UseCase object to `allUseCases`
───────────────────────────────────────────────────────────── */

import heroOrbImg from "@/assets/hero-orb.png";
import nosBgImg from "@/assets/nos-bg.png";
import swapWizardBgImg from "@/assets/swap-wizard-bg.png";
import nokiaBgImg from "@/assets/nokia-bg.png";
import manBgImg from "@/assets/man-bg.png";

export { heroOrbImg };

export type UseCaseId = "nos" | "nokia" | "swap-wizard" | "man";

/* ── Section types ───────────────────────────────────────── */

export interface UseCaseOverview {
  teamSetup: {
    caption: string; // ✓ rendered → "Team & Setup" column on Overview card
  };
  role: {
    summary: string; // ✓ rendered → "My role" column on Overview card
  };
  /** Optional big-number stats (value + label) shown after Team & Setup, e.g. 65+ products, 58 teams */
  stats?: { value: string; label: string }[];
}

export interface UseCaseProblem {
  headline: string; // ✓ rendered → large heading on Problem card
  framing: string;  // ✓ rendered → body text on Problem card
  survey?: {
    // ✓ optional survey results block (rendered as text on Problem card)
    satisfactionQuestion: string;
    npsScore: number;
    scoreLabel?: string;
    sentiment: string;
    sourceNote?: string;
    customizeQuestion: string;
    customizeOptions: { label: string; percent: number }[];
  };
}

export interface UseCaseApproach {
  headline: string; // ✓ rendered → large heading on Approach card
  framing: string;  // ✓ rendered → body text on Approach card (supports \n\n)
  keyDecisions: {
    decision: string;  // ✓ rendered → numbered item title
    rationale: string; // ✓ rendered → numbered item subtitle
  }[];
  validation?: {
    method: string;  // ✓ rendered → label (uppercase, accent colour)
    insight: string; // ✓ rendered → body text in tinted box
  }[];
}

export interface UseCaseImpact {
  summary: string;      // ✓ rendered → large quote-weight text on Impact card
  reflection?: string;  // ✓ rendered → body text below summary (optional)
  /** Stat-style bullets: big number + label (same look as overview stats / Problem NPS) */
  signals?: { value: string; label: string }[];
}

export interface UseCaseLearnings {
  headline: string;     // ✓ rendered → bold heading on Learnings card (same style as Problem)
  reflection: string;   // ✓ rendered → body text on Learnings card
  aiAndTooling?: string; // ✓ rendered → optional tinted box labelled "AI & Tooling"
}

export interface UseCaseFeatureInDetail {
  title: string;
  subtitle: string;
  context: string;
  introLabel?: string;   // defaults to "Feature in detail"
  roundsLabel?: string;  // defaults to "Feature in detail"
  rounds: {
    label: string;
    goal: string;
    phases: {
      mode: string;
      description: string;
    }[];
    outcome: string;
  }[];
  reflection: string;
}

/* ── Top-level use case ──────────────────────────────────── */

export interface UseCase {
  id: UseCaseId;
  title: string;    // ✓ Overview card — large heading
  company: string;  // ✓ Overview card — small subtitle line (with year)
  year: string;     // ✓ Overview card — small subtitle line (with company)
  role: string;     // ✓ Overview card — accent-colour line below title
  bgImage?: string; // ✓ Overview card — full-bleed header image (optional)
  overviewLabel?: string;   // defaults to "Overview"
  problemLabel?: string;   // defaults to "Problem"
  approachLabel?: string;  // defaults to "Approach"
  impactLabel?: string;    // defaults to "Impact"
  overview: UseCaseOverview;
  problem: UseCaseProblem;
  approach: UseCaseApproach;
  impact: UseCaseImpact;
  learnings: UseCaseLearnings;
  featureInDetail?: UseCaseFeatureInDetail; // ✓ only if present — Feature in detail cards
}

/* ── Theme tokens ────────────────────────────────────────── */

export const chipActiveStyles: Record<UseCaseId, { bg: string; border: string; text: string }> = {
  nos: { bg: "rgba(212,168,72,0.12)", border: "rgba(212,168,72,0.25)", text: "#d4a848" },
  nokia: { bg: "rgba(166,205,255,0.12)", border: "rgba(166,205,255,0.25)", text: "#A6CDFF" },
  "swap-wizard": { bg: "rgba(246,80,9,0.12)", border: "rgba(246,80,9,0.25)", text: "#F65009" },
  man: { bg: "rgba(228,0,69,0.12)", border: "rgba(228,0,69,0.25)", text: "#e40045" },
};

export const accents: Record<UseCaseId, string> = {
  nos: "#d4a848",
  nokia: "#A6CDFF",
  "swap-wizard": "#F65009",
  man: "#e40045",
};

export const gradients: Record<UseCaseId, string> = {
  nos: "linear-gradient(135deg, rgba(212,168,72,0.25) 0%, rgba(176,136,40,0.08) 60%, transparent 100%)",
  nokia: "linear-gradient(135deg, rgba(166,205,255,0.25) 0%, rgba(120,160,220,0.08) 60%, transparent 100%)",
  "swap-wizard": "linear-gradient(135deg, rgba(246,80,9,0.25) 0%, rgba(200,60,0,0.08) 60%, transparent 100%)",
  man: "linear-gradient(135deg, rgba(228,0,69,0.25) 0%, rgba(180,0,50,0.08) 60%, transparent 100%)",
};

/* ── Chip navigation ─────────────────────────────────────── */

export const useCaseChips: { id: UseCaseId; label: string }[] = [
  { id: "swap-wizard", label: "Swap Wizard" },
  { id: "nokia", label: "Nokia" },
  { id: "man", label: "MAN" },
  { id: "nos", label: "NOS" },
];


/* ── Use case data ───────────────────────────────────────── */

export const allUseCases: UseCase[] = [
  // ── Swap Wizard ───────────────────────────────
  {
    id: "swap-wizard",
    title: "Swap Wizard",
    overviewLabel: "Figma Plugin + Vibe Coding",
    company: "Into Design Systems (Hackathon)",
    year: "2026",
    role: "Driver, Contributor, Speaker",
    bgImage: swapWizardBgImg,
    overview: {
      teamSetup: {
        caption: "Me + 9 designers (juniors to seniors)",
      },
      role: {
        summary: "Founded a 10-person team to solve a persistent design system migration problem, shipping a production Figma plugin in 48 hours and pitching it live to 200+ attendees.",
      },
      stats: [
        { value: "48", label: "hours" },
        { value: "26", label: "Teams competing" },
        { value: "150+", label: "designers competing" },
      ],
    },
    problem: {
      headline: "When you want to swap libraries, the current Figma feature only works when components have exact name matches.",
      framing: "Without matching names, designers swap by hand, file by file. For teams managing migrations across dozens of files, it's overwhelming.",
    },
    approach: {
      headline: "We operated like a focused product team: problem framed, backlog prioritised, working async across time zones.",
      framing: "We used Figma for design thinking and visual assets, Cursor for plugin development, GitHub for the code repository, and Lovable for the landing page. We used what we knew best and moved fast.",
      keyDecisions: [
        {
          decision: "Kicked off with a live call and clear roles",
          rationale: "Introduced ourselves, aligned on interests, and divided responsibilities within the first hour.",
        },
        {
          decision: "Planning in FigJam",
          rationale: "Backlog, kanban, feature voting, all in one place, with decisions documented while we talked via Discord.",
        },
        {
          decision: "Structured testing rounds before launch",
          rationale: "Controlled test files surfaced edge cases early: issues with nested components, cross-library mismatches, etc.",
        },
      ],
    },
    impact: {
      summary: "AI gives leverage, but strategy is the force behind it.",
      reflection: "The quality of the output tracked directly with the clarity of the brief. The time constraint created focus, and that focus created quality. Ask mode → Plan mode → Agent mode seems to be a proper workflow for better AI-assisted development results.",
      signals: [
        { value: "1st", label: "place (audience + jury)" },
        { value: "48h", label: "plugin shipped" },
        { value: "1", label: "conference speaker" },
        { value: "200+", label: "attendees at pitch" },
      ],
    },
    learnings: {
      headline: "A well-framed problem is the most powerful AI prompt.",
      reflection: "Leading a distributed team through 48 hours confirmed something I now apply to every project: ambiguity in the brief produces ambiguity in the output, whether you are directing people or an AI model. The constraint forced decisions that a longer timeline would have delayed. I now front-load structure deliberately, even under pressure. The experience also reinforced that shipping something real and fast builds more credibility than a polished concept. The live audience vote was the clearest signal that the problem we solved actually mattered.",
    },
    featureInDetail: {
      title: "Multi-select swap",
      subtitle: "First post-hackathon feature · Cursor AI-assisted workflow",
      introLabel: "Vibe Coding",
      roundsLabel: "Vibe Coding",
      context: "Currently people can't choose which elements they want to swap, and sometimes you don't want to swap all the elements. Used Figjam and Cursor.",
      rounds: [
        {
          label: "Round 1",
          goal: "",
          phases: [
            {
              mode: "Plan Mode",
              description: "Described the feature intent and attached a quick FigJam sketch.",
            },
            {
              mode: "Ask Mode",
              description: "Started with group-level checkboxes only, a simpler scope to validate the approach before going deeper.",
            },
            {
              mode: "Agent + Debug Mode",
              description: "Agent implemented state, wiring, and styling. Debug Mode resolved a TypeScript config error without losing context.",
            },
          ],
          outcome: "",
        },
        {
          label: "Round 2",
          goal: "",
          phases: [
            {
              mode: "Plan Mode",
              description: "Asked for all UI refinements needed before starting implementation.",
            },
            {
              mode: "Agent Mode",
              description: "Executed implementation against the defined scope.",
            },
          ],
          outcome: "",
        },
      ],
      reflection: "Round 1 used speed to learn the problem. Round 2 used that learning to build correctly. Plan before Ask before Agent meant every phase built on a clearer foundation. This is the workflow I bring to AI-assisted development.",
    },
  },

  // ── Nokia ─────────────────────────────────────
  {
    id: "nokia",
    title: "Connect",
    overviewLabel: "Design System",
    company: "Telecom · B2B · desktop",
    year: "2024–Present",
    role: "Lead Designer",
    problemLabel: "Design System | Problem",
    approachLabel: "Design System | Approach",
    impactLabel: "Design System | Impact",
    bgImage: nokiaBgImg,
    overview: {
      teamSetup: {
        caption: "Me as Lead + 2–5 junior to mid-level designers + 10 engineers",
      },
      role: {
        summary: "Shaped and executed a new design system era as Lead, remaking design tokens, Figma libraries, documentation, and governance processes, while mentoring designers and planning roadmaps.",
      },
      stats: [
        { value: "65+", label: "products" },
        { value: "58", label: "teams" },
        { value: "82", label: "designers + engineers" },
      ],
    },
    problem: {
      headline: "Teams weren't connected: each team was using the design system in its own way.",
      framing: "1:1 sessions and a survey with ~50 participants showed that:\n• We had too many global and component-specific design token variations, leading to confusion.\n• Figma libraries contained too many published components, making it hard to understand their usage.\n• Teams' local Figma and code libraries resembled our system, but weren't 100% original from our core.\n• Documentation was often hard to follow or lacked consistency, pushing teams toward DIY solutions.",
      survey: {
        satisfactionQuestion: "How satisfied are you with the current Figma assets?",
        npsScore: -12,
        sentiment: "Indicates more detractors than promoters. Overall negative sentiment.",
        customizeQuestion: "Do you customize components' look & feel?",
        customizeOptions: [
          { label: "I use the predefined theme", percent: 48 },
          { label: "I use tokens to customize", percent: 52 },
        ],
      },
    },
    approach: {
      headline: "We built a new theme in parallel: Connect.",
      framing: "We wanted to rebuild without disrupting, so products could migrate to on their own schedule, following a migration plan.",
      keyDecisions: [
        {
          decision: "New global and semantic design tokens",
          rationale: "Closer to the Nokia brand, easier to use, and already with AI in mind, we stopped at the semantic level: grouped by need, they style multiple components."
        },
        {
          decision: "New Figma libraries",
          rationale: "We rebuild our 3 main libraries, using appropriate Figma component specs, Figma Variables, Modes, Code Connect, etc., respecting our current code as much as possible.",
        },
        {
          decision: "New documentation",
          rationale: "Copilot prompt template produces consistent docs per component (description, usage, do's and don'ts, accessibility).",
        },
        {
          decision: "Preparing for AI",
          rationale: "Currently, we cannot use AI with or within Figma due to compliance reasons. In the meantime, we are preparing to scale: prompt guidelines, learning sessions, templates, etc.",
        },
      ],
    },
    impact: {
      summary: "A whole new generation hoping for teams to connected once again, ready for AI.",
      reflection: "Stopping at semantic tokens made the system easier to maintain and easier in the future for AI to reason about: a well-organised design system amplifies AI, but a messy one exposes every weakness.",
      signals: [
        { value: "23%", label: "fewer tokens" },
        { value: "95%", label: "new design tokens in code" },
        { value: "86.5%", label: "libraries built in Figma < 1 year" },
      ],
    },
    learnings: {
      headline: "Stopping at semantic tokens made the system easier to maintain, easier for engineers, and easier in the future for AI to reason about.",
      reflection: "The Figma-to-code exploration showed that ambiguity in structure hurt AI output more than the model or the prompt. A well-organised system amplifies AI, but a messy one exposes every weakness.",
    },
  },

  // ── MAN ───────────────────────────────────────
  {
    id: "man",
    title: "CRAFT Design System",
    overviewLabel: "Design System",
    company: "Automotive · B2B · desktop, mobile, HMI",
    year: "2022–2023",
    role: "Design Ops",
    problemLabel: "Design System | Problem",
    approachLabel: "Design System | Approach",
    impactLabel: "Design System | Impact",
    bgImage: manBgImg,
    overview: {
      teamSetup: {
        caption: "Me as Lead + 1 junior designer + 2 engineers",
      },
      role: {
        summary: "I drove CRAFT Design System: led the roadmap with my manager, worked closely with engineering, created the visual identity, structure, business case, and Figma libraries, defined work processes, and mentored designers.",
      },
      stats: [
        { value: "50+", label: "products" },
        { value: "20+", label: "teams" },
        { value: "25+", label: "designers" },
      ],
    },
    problem: {
      headline: "Every product team was reinventing the wheel, and the wheel kept coming out different.",
      framing: "There was no design system, and design had no seat at the table: MAN had low design maturity, where UX was not seen as a priority. Teams worked in silos, and design efforts were inconsistent.",
      survey: {
        satisfactionQuestion: "Projects using CRAFT in the first year",
        npsScore: 11,
        scoreLabel: "",
        sentiment: "projects",
        sourceNote: "",
        customizeQuestion: "Key results",
        customizeOptions: [
          { label: "Time saved per button vs. without CRAFT", percent: 92 },
          { label: "Project adoption target achieved", percent: 110 },
        ],
      },
    },
    approach: {
      headline: "Built CRAFT from the ground up.",
      framing: "The business case secured leadership buy-in and defined success with efficiency and velocity, not just design quality. From there, we audit real usage and only build what products needed, establishing the foundations to live beyond any one team.",
      keyDecisions: [
        {
          decision: "Build a business case",
          rationale: "Design systems fail when they're treated as a design team deliverable rather than a business investment and being recognized as a living product.",
        },
        {
          decision: "Audited before building",
          rationale: "Building components that didn't reflect what products actually needed would have created a system that teams ignored. Auditing usage first and validating proposals with designers meant CRAFT was useful from day one.",
        },
        {
          decision: "Defined design ops process",
          rationale: "A design system without a contribution model becomes a bottleneck. This gave designers and developers a clear path to participate without creating noise for the core team.",
        },
        {
          decision: "Invested in tooling infrastructure",
          rationale: "Manual design-to-code handoff doesn't scale. Establishing a pipeline from design tokens to production code early ensured that CRAFT was a living system.",
        },
      ],
    },
    impact: {
      summary: "Design operations is critical for properly supporting design inside large companies.",
      signals: [
        { value: "11", label: "active projects < 1 year" },
        { value: "20+", label: "designers onboarded" },
       /* { value: "5 min", label: "button creation (from 30–60 min)" }, */
        { value: "3+", label: "design events" },
      ],
    },
    learnings: {
      headline: "A design system is not a design deliverable. It is an organisational change project.",
      reflection: "The component library was the visible output, but the real work was stakeholder alignment, contribution processes, onboarding, and advocacy. Teams do not adopt a system because it exists. They adopt it because it makes their work easier, and because someone invested in their success with it. The three design events, the contribution process, and the onboarding programme were as important as the components themselves.",
      aiAndTooling: "The long-term roadmap explicitly included AI integration as a future track, alongside Figma variables and Figma Make exploration. The tooling choices made during CRAFT's build (structured tokens, documented components, a pipeline from design to code) were made with future AI-readiness in mind, even before AI tooling for design systems was mature. The infrastructure built for CRAFT (tokens, Storybook, Style Dictionary) is the same infrastructure that makes AI-assisted design-to-code reliable.",
    },
  },

  // ── NOS ───────────────────────────────────────
  {
    id: "nos",
    title: "NOS App",
    overviewLabel: "Design System + Product (Mobile)",
    company: "Telecom · B2C + B2B · desktop, mobile",
    year: "2021-2022",
    role: "Product Designer",
    problemLabel: "Design System | Problem",
    approachLabel: "Design System | Approach",
    impactLabel: "Design System + Product | Impact",
    bgImage: nosBgImg,
    overview: {
      teamSetup: {
        caption: "Me as product designer",
      },
      role: {
        summary: "Maintained and led the evolution of a multi-brand design system while developing features, owning the full design process end-to-end, from research through final UI, integrating and creating components.",
      },
      stats: [
        { value: "5", label: "products" },
        { value: "10+", label: "teams" },
        { value: "25~", label: "designers + engineers" },
      ],
    },
    problem: {
      headline: "Three brands, multiple platforms, and decentralised squads with no shared architecture to hold it together.",
      framing: "NOS operates 3 brands (NOS, WTF, WOO) across multiple platforms and technologies: Salesforce, Outsystems, Adobe Experience Manager, Bitrise, and others. The core design team worked in decentralised squads with no single source of truth. There was no unified component architecture to keep them aligned.",
    },
    approach: {
      headline: "I first audited what existed across brands before building anything new.",
      framing: "We ran multiple design inventories across brands, gathered the team to validate proposals, and documented all decisions.",
      keyDecisions: [
        {
          decision: "Recreated the base components in new Figma libraries",
          rationale: "A single skeleton component shared as base for each brand libraries, themed with their look and feel: one source of truth, many expressions.",
        },
        {
          decision: "Mapped the engineering frameworks",
          rationale: "Mapped components to Salesforce, Outsystems, Adobe Experience Manager, and Bitrise so design and code stayed aligned across the stack.",
        },
        {
          decision: "Documented all of my work on Notion",
          rationale: "All processes and decisions recorded in one place so squads could contribute and onboard without losing context.",
        },
      ],
    },
    impact: {
      summary: "The multi-brand foundation enabled faster delivery across the 3 brands, and NOS Vantagens saw a engagement lift after post-launch.",
      signals: [
        { value: "3", label: "brands libraries in Figma < 6 months" },
        { value: "5", label: "users in testing" },
        { value: "21%", label: "engagement lift (NOS card)" },

      ],
    },
    featureInDetail: {
      title: "NOS Vantagens",
      subtitle: "Benefits section redesign · Full design process end-to-end",
      introLabel: "Product | Problem",
      roundsLabel: "Product | Approach",
      context: "The NOS card was buried deep inside the app.",
      rounds: [
        {
          label: "Research",
          goal: "Understand the existing interaction patterns and validate design direction before moving to high-fidelity.",
          phases: [
            {
              mode: "Feature definition",
              description: "I collaborated with the PO, IT Architect, and product team to scope the work.",
            },
            {
              mode: "Benchmark",
              description: "Ran competitor benchmarks to identify navigation patterns that worked.",
            },
            {
              mode: "Low + High wireframes",
              description: "Built quick wireframes to establish the structure before moving to final UI.",
            },
          ],
          outcome: "",
        },
        {
          label: "Testing",
          goal: "Validate the redesigned information hierarchy and NOS card visibility with real users.",
          phases: [
            {
              mode: "Usability testing",
              description: "Built an prototype and ran remote moderated usability tests with 5 users (based on 2 personas, 12-question script, ~40-minute sessions).",
            },
            {
              mode: "Results",
              description: "Key insights: users expected personalised highlights; difficulty recognising the NOS card initially but found it intuitive once discovered; lacked information about card usage limits; expected benefits tailored to their interests.",
            },
            {
              mode: "Improvements",
              description: "The final iteration redesigned the homepage to prioritise high-value content with the NOS card instantly visible, and consolidated the Offers section into a structured tab with vertical lists, filters, and sorting options.",
            },
          ],
          outcome: "",
        },
      ],
      reflection: "This card is used for perks like cinema tickets and discounts, and it was buried deep inside the app. NOS Vantagens, the benefits section, was mixed multiple benefit types with no clear hierarchy, so users couldn't discover key features.",
    },
    learnings: {
      headline: "Data beats opinions. Not as a cliché, but as a working practice.",
      reflection: "This project reinforced that data beats opinions. Not as a cliché, but as a working practice. The usability tests with real users surfaced insights that the team wouldn't have found through internal review alone: the NOS card recognition issue, the expectation for personalised content, and the need for better activation feedback all came directly from watching users interact with the prototype. Weekly A/B testing post-launch created a feedback loop that made every design decision defensible. It also showed that shipping fast builds credibility: the first month's 21% engagement lift was what unlocked the longer-term investment in the system.",
      aiAndTooling: "The 2025 retrospective notes on the Figma slides highlight how the tooling landscape has evolved since this project. The interactive prototype built for usability testing would now be easier to create using Figma variables and conditional logic. The multi-brand theming architecture (base components with brand-level overrides) could now be handled more efficiently using Figma's Modes feature. These weren't available in 2021–2022, which makes the architectural decisions made at the time (base component to brand variants) even more notable: the pattern anticipated where the tooling was heading.",
    },
  },
];
