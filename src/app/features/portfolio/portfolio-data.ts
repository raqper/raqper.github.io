/* ─────────────────────────────────────────────────────────────
   portfolio-data.ts  -  Single source of truth for all portfolio content.

   HOW TO EDIT CONTENT
   • Find a use case by its `id` (e.g. "nos", "nokia") and edit inline.
   • Images: add an import at the top, then reference it in the use case.
   • Approach narrative supports paragraph breaks: use \n\n

   CARD MAP - what renders where
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
import nokiaBgImg from "@/assets/nokia-bg.png";
import manBgImg from "@/assets/man-bg.png";
import nokiaLogo from "@/assets/nokia.svg";
import manLogo from "@/assets/man.svg";
import nosLogo from "@/assets/nos.svg";

export { heroOrbImg };

export type UseCaseId = "nos" | "nokia" | "man";

/* ── Section types ───────────────────────────────────────── */

export interface UseCaseOverview {
  teamSetup: {
    caption: string; // ✓ rendered → "Team & Setup" column on Overview card
  };
  role: {
    summary: string; // ✓ rendered → "My role" column on Overview card
  };
  /** Optional one-liner shown below the title on Overview card */
  pitch?: string;
  /** Optional big-number stats (value + label) shown after Team & Setup, e.g. 65+ products, 58 teams */
  stats?: { value: string; label: string }[];
}

export interface PortfolioIntro {
  headline: string;
  subhead: string;
  pillars: { label: string; value: string }[];
  cases: { id: UseCaseId; label: string; role: string; hook: string; logo?: string }[];
}

export const portfolioIntro: PortfolioIntro = {
  headline: "I treat design systems as products.",
  subhead: "Since 2017, I've grown from focusing on product experiences to shaping design systems and processes with AI.",
  pillars: [
    { label: "At scale", value: "68 teams · 150+ designers · 8.3M+ component usages" },
    { label: "As a product", value: "Roadmaps, contribution models, ROI metrics" },
    { label: "AI-ready", value: "Structured tokens, MCP workflows, machine-readable docs" },
  ],
  cases: [
    { id: "nokia", label: "Nokia", role: "Design System Lead", hook: "", logo: nokiaLogo },
    { id: "man", label: "MAN", role: "Design Ops Lead", hook: "", logo: manLogo },
    { id: "nos", label: "NOS", role: "Senior Product Design", hook: "", logo: nosLogo },
  ],
};

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
  label?: string;       // ✓ optional override for section label (defaults to "Learnings")
  headline: string;     // ✓ rendered → bold heading on Learnings card (same style as Problem)
  reflection: string;   // ✓ rendered → body text on Learnings card
  aiAndTooling?: string; // ✓ rendered → optional tinted box labelled "AI & Tooling"
  stats?: { value: string; label: string }[];
  outcomes?: { title: string; description: string }[];
}

export interface UseCaseAiUsage {
  label: string;
  headline: string;
  framing: string;
  before: { duration: string; tools: string; steps: string[] };
  after: { duration: string; tools: string; steps: string[] };
  enablers: string[];
}

export interface UseCasePrototypeFlow {
  label: string;
  steps: {
    headline: string;
    framing: string;
    mediaId: string;
  }[];
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
  title: string;    // ✓ Overview card - large heading
  company: string;  // ✓ Overview card - small subtitle line (with year)
  year: string;     // ✓ Overview card - small subtitle line (with company)
  role: string;     // ✓ Overview card - accent-colour line below title
  bgImage?: string; // ✓ Overview card - full-bleed header image (optional)
  overviewLabel?: string;   // defaults to "Overview"
  problemLabel?: string;   // defaults to "Problem"
  approachLabel?: string;  // defaults to "Approach"
  impactLabel?: string;    // defaults to "Impact"
  overview: UseCaseOverview;
  problem: UseCaseProblem;
  approach: UseCaseApproach;
  impact: UseCaseImpact;
  learnings: UseCaseLearnings;
  aiUsage?: UseCaseAiUsage;
  prototypeFlow?: UseCasePrototypeFlow;
  featureInDetail?: UseCaseFeatureInDetail; // ✓ only if present - Feature in detail cards
}

/* ── Theme tokens ────────────────────────────────────────── */

export const chipActiveStyles: Record<UseCaseId, { bg: string; border: string; text: string }> = {
  nos: { bg: "rgba(212,168,72,0.12)", border: "rgba(212,168,72,0.25)", text: "#d4a848" },
  nokia: { bg: "rgba(166,205,255,0.12)", border: "rgba(166,205,255,0.25)", text: "#A6CDFF" },
  man: { bg: "rgba(228,0,69,0.12)", border: "rgba(228,0,69,0.25)", text: "#e40045" },
};

export const accents: Record<UseCaseId, string> = {
  nos: "#d4a848",
  nokia: "#A6CDFF",
  man: "#e40045",
};

export const gradients: Record<UseCaseId, string> = {
  nos: "linear-gradient(135deg, rgba(212,168,72,0.25) 0%, rgba(176,136,40,0.08) 60%, transparent 100%)",
  nokia: "linear-gradient(135deg, rgba(166,205,255,0.25) 0%, rgba(120,160,220,0.08) 60%, transparent 100%)",
  man: "linear-gradient(135deg, rgba(228,0,69,0.25) 0%, rgba(180,0,50,0.08) 60%, transparent 100%)",
};

/* ── Chip navigation ─────────────────────────────────────── */

export const useCaseChips: { id: UseCaseId; label: string }[] = [
  { id: "nokia", label: "Nokia" },
  { id: "man", label: "MAN" },
  { id: "nos", label: "NOS" },
];


/* ── Use case data ───────────────────────────────────────── */

export const allUseCases: UseCase[] = [
  // ── Nokia ─────────────────────────────────────
  {
    id: "nokia",
    title: "Nokia: Connecting UI",
    overviewLabel: "Nokia | Design System",
    company: "Telecom · B2B · desktop",
    year: "2024-Present",
    role: "Design System Lead",
    problemLabel: "Design System | Problem",
    approachLabel: "Design System | Approach",
    impactLabel: "Design System | Impact",
    bgImage: nokiaBgImg,
    overview: {
      teamSetup: {
        caption: "Me as Lead + 2-5 designers + 10 engineers",
      },
      role: {
        summary:
          "Owned the vision and roadmap for the next Nokia Design System generation, while keeping the existenting one.",
      },
      pitch: "",
      stats: [
        { value: "68", label: "product teams" },
        { value: "150+", label: "Figma full seats" },
        { value: "8.3M+", label: "component usages" },
      ],
    },
    problem: {
      headline:
        "We weren't a real source of truth.",
      framing:
        "Before I joined, the team suffered from a big rebrand, a Sketch → Figma migration, and design didn't work with engineering.\n1:1 sessions and a survey with ~50 participants showed me that:\n• We had too many global and component-specific design token variations, leading to confusion.\n• Figma libraries contained too many published components, making it hard to understand their usage.\n• Teams' local Figma and code libraries resembled our system, but weren't 100% original from our core.\n• Documentation was often hard to follow or lacked consistency, pushing teams toward DIY solutions.",
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
      framing:
        "We wanted to rebuild without disrupting the current generation (FreeForm), so products could migrate on their own schedule.",
      keyDecisions: [
        {
          decision: "New global and semantic design tokens",
          rationale:
            "Closer to the Nokia brand, easier to use, and already with AI in mind, we stopped at the semantic level: grouped by need, they style multiple components, defined together with engineering.",
        },
        {
          decision: "New Figma libraries",
          rationale:
            "We rebuilt our 3 main libraries, using appropriate Figma component specs, Figma Variables, Modes, Code Connect, etc., respecting our current code as much as possible.",
        },
        {
          decision: "New documentation",
          rationale:
            "Cursor skil produces consistent docs per component (description, usage, do's and don'ts, accessibility), centralized afterwards on Supernova.",
        },
        {
          decision: "Preparing for AI",
          rationale:
            "Creating AI boilerplates, starting with the new generation, as well as having solid and shared markdowns regarding our design and code, while giving learning sessions about AI and coding (what's a MCP, etc.)",
        },
      ],
    },
    impact: {
      summary: "Fewer design tokens. Better experience. More ready for AI.",
      reflection:
        "Component audits went from 3-4 weeks to 1-2 days. Designers and devs report moving faster with fewer token decisions per component.",
      signals: [
        { value: "−56%", label: "design tokens (2034 to 893)" },
        { value: "5", label: "pilot teams on Connect" },
        { value: "−68%", label: "avg token name length" },
        { value: "1-2 days", label: "component audit (was 3-4 weeks)" },
      ],
    },
    aiUsage: {
      label: "AI + Prototype",
      headline: "From plan to running UI, grounded in the real system.",
      framing:
        "A scheduling screen built with NDS components, not generic UI. Plan, iterate, and ship without leaving the design system.",
      before: {
        duration: "Days",
        tools: "Generic UI + manual specs",
        steps: [
          "Plan without real components",
          "Wireframe from scratch",
          "Reconcile tokens and handoff manually",
        ],
      },
      after: {
        duration: "Hours",
        tools: "NDS + Cursor + Figma MCP",
        steps: [
          "Plan against the live library",
          "Iterate in Cursor in seconds",
          "Push to Figma and run in the browser",
        ],
      },
      enablers: [
        "Semantic token names AI can read and reason about",
        "Markdown context files: DESIGN, TOKENS, COMPONENTS, PATTERNS",
        "Code Connect + Figma MCP linking components to code",
      ],
    },
    prototypeFlow: {
      label: "AI + Prototype",
      steps: [
        {
          headline: "Planned before any code.",
          framing:
            "Grounded in the actual NDS library, not generic UI, to design a scheduling screen.",
          mediaId: "nokia-media-ai-4",
        },
        {
          headline: "Feedback directly in Cursor. Adjusted in seconds.",
          framing: "One prompt, one pass, but multiple things corrected.",
          mediaId: "nokia-media-ai-6",
        },
        {
          headline: "Pushed to Figma. Every component connected to its code counterpart.",
          framing: "No guessing which component to use or which token it maps to.",
          mediaId: "nokia-media-ai-7",
        },
        {
          headline: "Final result, running in the browser.",
          framing:
            "Dark theme, semantic tokens, NDS components. Ready to hand off or iterate in Figma.",
          mediaId: "nokia-media-ai-8",
        },
      ],
    },
    learnings: {
      label: "Outcomes & Tradeoffs",
      headline: "What changed, and what didn't come for free.",
      reflection:
        "",
      stats: [
        { value: "5", label: "pilot teams already building on Connect" },
        { value: "2", label: "years support for FreeForm (obligated)" },
        { value: "3", label: "releases p/ year (paced by internal politics)" },
      ],
      outcomes: [
        {
          title: "Designers and devs report moving faster",
          description:
            "Fewer token decisions per component. Less drift between what's designed and what ships.",
        },
        {
          title: "Teams customize without breaking",
          description:
            "Overrides stay connected to the semantic layer: no detaching, no hard-coded values.",
        },
        {
          title: "The shared model takes adjustment",
          description:
            "Teams used to per-component control resist it at first. Takes advocacy, not just documentation.",
        },
      ],
    },
  },

  // ── MAN ───────────────────────────────────────
  {
    id: "man",
    title: "CRAFT Design System",
    overviewLabel: "MAN | Design Ops",
    company: "Automotive · B2B · desktop, mobile, HMI",
    year: "2022-2023",
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
        summary:
          "Owned CRAFT as a product: led the roadmap and business case with my manager, defined governance and contribution models, built Figma libraries and a tokens-to-code pipeline with engineering, and drove adoption across 50+ products.",
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
          rationale:
            "A design system without a contribution model becomes a bottleneck. Clear governance gave designers and developers a path to participate without creating noise for the core team, with adoption metrics tracked from day one.",
        },
        {
          decision: "Invested in tooling infrastructure",
          rationale:
            "Manual design-to-code handoff doesn't scale. A Style Dictionary and Storybook pipeline from tokens to production code kept CRAFT living in code, not just in Figma.",
        },
      ],
    },
    impact: {
      summary: "11 projects adopted CRAFT in year one, with measurable design efficiency gains.",
      signals: [
        { value: "11", label: "active projects < 1 year" },
        { value: "20+", label: "designers onboarded" },
        { value: "5 min", label: "button creation (from 30 to 60 min)" },
        { value: "3+", label: "design events" },
      ],
    },
    learnings: {
      headline: "A design system is not a design deliverable. It is an organisational change project.",
      reflection:
        "The library was the visible output. The real work was alignment, contribution processes, and advocacy. Teams adopt a system when it makes their work easier and someone invests in their success.",
      aiAndTooling:
        "CRAFT's roadmap included AI alongside Figma variables. Tokens, Storybook, and Style Dictionary are the same infrastructure that makes AI-assisted design-to-code reliable today.",
    },
  },

  // ── NOS ───────────────────────────────────────
  {
    id: "nos",
    title: "NOS App",
    overviewLabel: "NOS | Product Design",
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
        summary:
          "Led multi-brand design system evolution: base components with brand-level theming across 3 telecom brands, then applied the system in product work from research through shipped UI.",
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
      summary:
        "The multi-brand foundation enabled faster delivery across the 3 brands, and NOS Vantagens saw an engagement lift after post-launch.",
      signals: [
        { value: "3", label: "brands libraries in Figma < 6 months" },
        { value: "5", label: "users in testing" },
        { value: "21%", label: "engagement lift (NOS card)" },

      ],
    },
    featureInDetail: {
      title: "NOS Vantagens",
      subtitle: "Benefits section redesign · Full design process end-to-end",
      introLabel: "System in practice",
      roundsLabel: "System in practice",
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
      reflection:
        "Usability tests surfaced insights internal review missed: NOS card recognition, personalised content expectations, and activation feedback. Post-launch A/B testing made every decision defensible.",
      aiAndTooling:
        "The multi-brand base-component pattern anticipated Figma Modes. What took manual brand variants in 2021-2022 would now map cleanly to variables and conditional logic.",
    },
  },
];
