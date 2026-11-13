// ─────────────────────────────────────────────────────────────────────────────
// workshop-data.ts
// Single source of truth for the /workshop page (December 2026 edition).
// Course content mirrors "Course Plan v5 | December edition" in Notion.
//
// Registration runs on Luma (registrationUrl). Luma handles the Stripe checkout,
// the waitlist, the Google Meet link and the reminders. Every Register button on
// the page opens the in-page register sheet first (schedule, price, requirements
// checkbox), and the sheet sends people on to Luma.
//
// Luma registration questions to keep in sync with this page:
//   - "Name for your certificate" (required)
//   - "Have you built components with variants and variables in Figma?"
//
// Still TODO: student count for the instructor bio.
// ─────────────────────────────────────────────────────────────────────────────

export const WORKSHOP_PATH = "/workshop";

export const LINKEDIN_URL = "https://www.linkedin.com/in/raqper/";

export const workshop = {
  title: "AI for designers: from prompt to product",
  shortTitle: "AI for designers",
  promise:
    "In three live sessions you take one design system from Figma tokens to a GitHub repository, then build a real screen on top of it with Claude.",
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
  price: 300 as number | null,
  currency: "EUR",
  /** Luma event. null shows "Registration opens soon". */
  registrationUrl: "https://luma.com/1smnd2n6" as string | null,
  refundPolicy: "Full refund up to 7 days before the first session.",
  /** Set to true when the Luma event is full: the sheet then sends people to the Luma waitlist. */
  soldOut: false,
  tools: ["Claude", "Figma", "Code"],
} as const;

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

/** Label for every Register button; the button itself always opens the register sheet. */
export function getRegisterLabel(): string {
  const price = formatPrice(workshop.price);
  switch (getRegisterState()) {
    case "soldOut":
      return "Join the waitlist";
    case "open":
      return price ? `Register · ${price}` : "Register";
    default:
      return "Register";
  }
}

/** Short note shown next to or under the Register button. */
export function getRegisterNote(): string {
  switch (getRegisterState()) {
    case "soldOut":
      return "This cohort is full. Join the waitlist on Luma to hear when a seat frees up.";
    case "open":
      return `Checkout and the Meet link via Luma. Maximum ${workshop.seats} seats.`;
    default:
      return `Registration opens soon. Maximum ${workshop.seats} seats.`;
  }
}

/** Short facts shown as a strip under the hero. */
export const facts = [
  { label: "Dates", value: workshop.shortDates },
  { label: "Format", value: `${workshop.sessions} sessions · ${workshop.hours} h` },
  { label: "Price", value: formatPrice(workshop.price) ?? "Announced soon" },
  { label: "Group", value: `Max. ${workshop.seats} people` },
];

export const personas = [
  {
    title: "You design in Figma, but AI feels out of reach",
    body: "You've used chat tools, but never connected AI to your files or your design system.",
  },
  {
    title: "You've never shipped code",
    body: "Terminal, Git, React: you learn just enough to use them, step by step, while Claude does most of the typing.",
  },
  {
    title: "You want proof, not notes",
    body: "You leave with a real project on GitHub that you can show in your portfolio.",
  },
];

/** The entry bar: what people must already know. Mirrors the Luma registration question. */
export const readinessLine =
  "You're ready if you can build a component with variants and use variables in Figma. You don't need to know how to code.";

export const requirementsLine =
  "You'll need your own Figma Professional and Claude Pro plans (roughly €40 a month together, and you can cancel after the workshop), a free GitHub account and a laptop where you can install software. Setting everything up before the first session is your responsibility, and the setup guide walks you through it.";

export const outcomes = [
  { title: "A proper Figma library for AI", body: "Tokens and components built so AI can read them." },
  { title: "Docs AI understands", body: "Clear documentation generated from your own file." },
  { title: "Coded components", body: "React components that match Figma, in Storybook." },
  { title: "A screen from your vibe coding", body: "Built with Claude on your system, published on GitHub." },
];

/** Attendee-only extras, listed in the register sheet. */
export const extras = ["Setup guide and catch-up checkpoints", "End-to-end checklist", "Session recordings", "Certificate of participation"];

export type Day = { id: string; label: string; title: string; when: string; bullets: string[]; handsOn?: string };

export const days: Day[] = [
  {
    id: "day-1",
    label: "01",
    title: "Make it AI-ready",
    when: "Fri 11 Dec · 18:00–20:00",
    bullets: [
      "See the finished result, then AI basics in plain English",
      "Write the CLAUDE.md that keeps AI on-system",
      "Add a colour ramp to your Figma tokens with Claude",
    ],
    handsOn: "1 h hands-on",
  },
  {
    id: "day-2",
    label: "02",
    title: "Make it real",
    when: "Sat 12 Dec · 09:00–12:30",
    bullets: [
      "Build a component from a spec Claude writes",
      "Generate docs AI can read",
      "Turn Figma components into React and Storybook",
    ],
    handsOn: "2 h 15 hands-on",
  },
  {
    id: "day-3",
    label: "03",
    title: "Ship it and build with it",
    when: "Sun 13 Dec · 09:00–12:30",
    bullets: ["Audit and fix your system with AI", "Publish it on GitHub", "Vibe code a screen with only your components"],
    handsOn: "2 h 25 hands-on",
  },
];

export const formatCallout = "Live sessions · Q&A every day · Recordings afterwards · Certificate of participation";

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
    q: "How do the sessions work?",
    a: "Three live sessions on Google Meet: Friday evening, then Saturday and Sunday morning, with short breaks. Each one mixes short demos with practice and ends with Q&A. Luma sends the Meet link and reminders, and it's the same link for every session.",
  },
  {
    q: "Are the sessions recorded?",
    a: "Yes. Recordings are shared with attendees after the sessions, so you can rewatch any step.",
  },
  {
    q: "Can I use a company laptop or Windows?",
    a: "Yes, as long as you can install software on it. Setting up your laptop and accounts before the first session is your responsibility. The setup guide walks you through every step, and live time is for building, not troubleshooting.",
  },
  {
    q: "What if I miss a session or fall behind?",
    a: "Every hands-on block has a ready-made checkpoint you can pick up from, and the recordings cover anything you missed.",
  },
  {
    q: "How do I pay, and will I get an invoice?",
    a: "Registration and payment run on Luma, with secure Stripe checkout. If you need an invoice with your NIF or company tax ID, message me through Luma after registering and I'll issue it.",
  },
  {
    q: "Do I get a certificate?",
    a: "Yes. Everyone who attends at least two of the three sessions receives a certificate of participation, with a link you can add to your LinkedIn profile. Luma asks for the name to put on it when you register.",
  },
];
