// ─────────────────────────────────────────────────────────────────────────────
// workshop-data.ts
// Single source of truth for the /workshop page (December 2026 edition).
// Course content mirrors "Course Plan v5 | December edition" in Notion, but the
// public agenda is kept deliberately high level.
//
// Registration runs on Luma (registrationUrl). Luma handles the Stripe checkout,
// the waitlist, the Google Meet link and the reminders. Every "Get your ticket"
// button on the page opens the in-page register sheet first (schedule, price,
// requirements checkbox), and the sheet sends people on to Luma.
//
// Luma registration questions to keep in sync with this page:
//   - "Name for your certificate" (required)
//   - "Have you built components with variants and variables in Figma?"
//
// Recordings are temporary: the sessions are recorded on a Google Workspace
// Business Standard trial and shared until `recordingsUntil`, then deleted when
// the trial ends. Change the date in one place (workshop.recordingsUntil).
// The certificate is a personal thank-you from Raquel, not an accredited
// qualification: never call it "verified", "official" or "accredited".
//
// Still TODO: student count for the instructor bio.
// ─────────────────────────────────────────────────────────────────────────────

export const WORKSHOP_PATH = "/workshop";

export const LINKEDIN_URL = "https://www.linkedin.com/in/raqper/";

export const workshop = {
  title: "AI for designers: from prompt to product",
  shortTitle: "AI for designers",
  /** Short pitch: homepage card and meta description. */
  promise:
    "In three live sessions you go from your first prompt to vibe coding real screens from a component library, published on GitHub, with Claude and Figma.",
  /** Hero lead on /workshop. */
  heroLead:
    "Three live sessions to go from your first prompt to vibe coding real screens from a component library with Claude and Figma, and publishing them on GitHub. Made for junior and mid-level designers.",
  dates: "11–13 December 2026",
  shortDates: "11–13 Dec",
  schedule: [
    { day: "Fri 11 Dec", time: "18:00–20:00" },
    { day: "Sat 12 Dec", time: "09:00–12:30" },
    { day: "Sun 13 Dec", time: "09:00–12:30" },
  ] as { day: string; time: string; note?: string }[],
  timezone: "Lisbon time (WET)",
  format: "live online on Google Meet",
  language: "English",
  hours: 9,
  sessions: 3,
  seats: 15,
  /** Price in euros, one price for everyone. null hides the price. */
  price: 275 as number | null,
  currency: "EUR",
  /** Luma event. null shows "Registration opens soon". */
  registrationUrl: "https://luma.com/1smnd2n6" as string | null,
  refundPolicy: "Full refund up to 7 days before the first session.",
  /** Last day the session recordings can be watched (the Workspace trial ends the day after). */
  recordingsUntil: "Tue 22 Dec",
  /** Set to true when the Luma event is full: the sheet then sends people to the Luma waitlist. */
  soldOut: false,
  tools: ["Claude", "Figma", "Code"],
} as const;

/** Hero eyebrow on /workshop. */
export const heroEyebrow = "Intensive online workshop";

export function formatPrice(price: number | null): string | null {
  if (price === null) return null;
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: workshop.currency,
    maximumFractionDigits: 0,
  }).format(price);
}

export type RegisterState = "open" | "soon" | "soldOut";

export function getRegisterState(): RegisterState {
  if (!workshop.registrationUrl) return "soon";
  if (workshop.soldOut) return "soldOut";
  return "open";
}

/** Label for every register button; the button itself always opens the register sheet. */
export function getRegisterLabel(): string {
  switch (getRegisterState()) {
    case "soldOut":
      return "Join the waitlist";
    case "open":
      return "Get your ticket";
    default:
      return "Register";
  }
}

/** Short note shown next to or under the register button. null shows nothing. */
export function getRegisterNote(): string | null {
  switch (getRegisterState()) {
    case "soldOut":
      return "This cohort is full. Join the waitlist on Luma to hear when a seat frees up.";
    case "open":
      return null;
    default:
      return `Registration opens soon. ${workshop.seats} seats.`;
  }
}

/** Paid plans people buy themselves. Shown with an asterisk wherever tools are listed. */
export const toolsNote = `*Figma Professional and Claude Pro are paid plans, bought separately and not included in the ${
  formatPrice(workshop.price) ?? "workshop"
} price.`;

/** Short facts shown as a strip under the hero. */
export const facts = [
  { label: "Dates", value: workshop.shortDates },
  { label: "Format", value: `${workshop.sessions} sessions · ${workshop.hours} h` },
  { label: "Price", value: formatPrice(workshop.price) ?? "Announced soon" },
  { label: "Group", value: `${workshop.seats} seats` },
  { label: "Tools", value: "Figma Pro, Claude Pro and GitHub*" },
];

export const personas = [
  {
    title: "You know AI is important but you still only use Figma",
    body: "You've tried chat tools, but never connected AI to your own files. You want one workflow you trust, not random prompts.",
  },
  {
    title: "Code still feels like too much, even with AI",
    body: "Terminal, Git, React: you learn just enough to use them, step by step. Claude does most of the typing.",
  },
  {
    title: "You want something real to show",
    body: "You leave with your own project on GitHub and screens you generated from a library. It's ready for your portfolio.",
  },
];

/** The entry bar: what people must already know. Mirrors the Luma registration question. */
export const readiness = [
  "You can build a component with variants in Figma",
  "You use variables in Figma",
  "You don't need to know how to code",
];

/** Who this workshop is not a fit for. Sets expectations before people register. */
export const notForYou = [
  "You're already advanced and want to go deeper into agentic work",
  "Friday evening and weekend mornings in Lisbon time don't work in your time zone",
  "You're not comfortable following a workshop in English",
  "You can't join live and only want to watch recordings",
  "You're expecting a very high-level or highly complex experience",
];

/** What people must bring. Items ending in * are paid plans (see requirementsNote). */
export const requirements = [
  "A Figma Professional plan*",
  "A Claude Pro plan*",
  "A free GitHub account",
  "A laptop where you can install software",
  "Everything set up before day 1, using the pre-workshop prep",
];

export const requirementsNote =
  "*Paid plans, priced by each provider and varying by country, not included in the workshop price. You can cancel them after the workshop.";

/** One-sentence versions for the register sheet checkbox. */
export const readinessLine =
  "You can build components with variants and use variables in Figma. You don't need to know how to code.";
export const requirementsLine =
  "You'll have Figma Professional and Claude Pro (paid separately), a free GitHub account and a laptop where you can install software, all set up before day 1.";

export const outcomes = [
  { title: "A proper Figma library for AI", body: "Tokens and components built so AI can read them." },
  { title: "Docs AI understands", body: "Clear documentation generated from your own file." },
  { title: "Coded components", body: "React components that match Figma, in Storybook." },
  { title: "A screen from your vibe coding", body: "Built with Claude on your system, published on GitHub." },
];

/** Attendee-only extras, listed in the register sheet. */
export const extras = [
  "Pre-workshop prep, a week before",
  "Checkpoints to catch up if you fall behind",
  `Session recordings, available until ${workshop.recordingsUntil}`,
  "End-to-end checklist",
  "A personal certificate of participation",
];

/** Self-paced prep, shown as a full-width card above the days. */
export const prep = {
  label: "Before day 1",
  title: "Pre-workshop prep",
  when: "Available from Fri 4 Dec",
  body: "A self-paced setup guide that opens at least a week before the first session, so you have time to install and connect everything calmly.",
  bullets: [
    "Set up your accounts and tools",
    "Connect Claude to Figma and GitHub",
    "Run a quick self-check, so day 1 starts with everyone ready",
  ],
};

export type Day = { id: string; label: string; title: string; when: string; bullets: string[] };

export const days: Day[] = [
  {
    id: "day-1",
    label: "01",
    title: "Welcome and the AI basics",
    when: "Fri 11 Dec · 18:00–20:00",
    bullets: [
      "Introductions and what you want to get out of it",
      "The vocabulary you'll use all weekend, in plain English",
      "Preparing your Figma library for AI",
    ],
  },
  {
    id: "day-2",
    label: "02",
    title: "From Figma to code",
    when: "Sat 12 Dec · 09:00–12:30",
    bullets: ["Working with Claude on components and documentation", "Bringing your library into code"],
  },
  {
    id: "day-3",
    label: "03",
    title: "Ship it and vibe code",
    when: "Sun 13 Dec · 09:00–12:30",
    bullets: ["Reviewing and publishing your project on GitHub", "Generating screens from your library"],
  },
];

/** Small format notes under the agenda. */
export const formatNotes = [
  "Live on Google Meet",
  "Q&A in every session",
  `Recordings until ${workshop.recordingsUntil}`,
`Small group, ${workshop.seats} seats`];

export const instructor = {
  name: "Raquel Pereira",
  // TODO: add the number of students taught once confirmed.
  bio: "Designer since 2017, focused on AI-ready design systems. I teach design systems and AI courses, most recently AI for Design Tokens & Components at Projector, and I speak at Friends of Figma and Into Design Systems events. This workshop is the workflow I use every day.",
};

export const faq = [
  {
    q: "Do I need to know how to code?",
    a: "No. Every new concept is explained when you need it, and Claude does most of the typing. You do need Figma basics: components, variants and variables.",
  },
  {
    q: "What do I need before the first session?",
    a: "Figma Professional and Claude Pro are paid plans you buy yourself (prices vary by country, and you can cancel after the workshop). They aren't included in the workshop price. You also need a free GitHub account and a laptop where you can install software. The pre-workshop prep opens at least a week before, by Fri 4 Dec, and setting everything up before day 1 is your responsibility.",
  },
  {
    q: "How do the sessions work?",
    a: "Three live sessions on Google Meet: Friday evening, then Saturday and Sunday morning, with short breaks. Each one mixes short demos with practice and has time for Q&A. Luma sends the Meet link and reminders, and it's the same link for every session.",
  },
  {
    q: "What happens after I register?",
    a: `Luma emails your ticket straight away. The pre-workshop prep opens by Fri 4 Dec, so you have a week to set up calmly. Two days before the first session, Luma sends the Google Meet link (the same link for all three sessions) and reminders follow. After the workshop you get the session recordings until ${workshop.recordingsUntil}, and your certificate of participation.`,
  },
  {
    q: "Are the sessions recorded?",
    a: `Yes, for a short time. I record each session on Google Meet and share the recordings with attendees until ${workshop.recordingsUntil}, then they're deleted. They're there to help you revisit a step, not to replace joining live: the workshop is hands-on, so plan to join all three sessions.`,
  },
  {
    q: "What if I miss a session or fall behind?",
    a: `Every practice block has a ready-made checkpoint you can pick up from, so you can rejoin at the next step. If you miss part of a session, the recording helps you catch up until ${workshop.recordingsUntil}.`,
  },
  {
    q: "Can I use a company laptop or Windows?",
    a: "Yes, as long as you can install software on it. The pre-workshop prep walks you through every step, so live time is for building, not troubleshooting.",
  },
  {
    q: "How do I pay, and can I get an invoice?",
    a: "Registration and payment run on Luma, with secure Stripe checkout. If you need an invoice, email me after registering and I'll send you an official Portuguese invoice (recibo verde).",
  },
  {
    q: "What's the refund policy?",
    a: workshop.refundPolicy,
  },
  {
    q: "Is this an accredited course? Do I get a certificate?",
    a: "It's an independent workshop I run myself, not a school or an accredited course. As a thank you, everyone who attends at least two of the three sessions gets a personal certificate of participation from me. You're welcome to share it, and the experience, on LinkedIn.",
  },
];
