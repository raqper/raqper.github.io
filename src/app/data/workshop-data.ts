// ─────────────────────────────────────────────────────────────────────────────
// workshop-data.ts
// Single source of truth for the /workshop page (December 2026 edition).
// Course content mirrors "Course Plan v4 | December edition" in Notion.
//
// Values marked TODO are placeholders until confirmed:
//   - dates, price, registrationUrl (Stripe Payment Link), language, refund policy
// While registrationUrl is null the page shows a "register interest" button
// that links to LinkedIn instead of a checkout.
// ─────────────────────────────────────────────────────────────────────────────

export const WORKSHOP_PATH = "/workshop";

export const LINKEDIN_URL = "https://www.linkedin.com/in/raqper/";

export const workshop = {
  title: "AI for designers: from prompt to product",
  shortTitle: "AI for designers",
  promise:
    "In three days you take one design system from Figma tokens to a GitHub repository, then build a real screen on top of it with Claude.",
  /** TODO: replace with the confirmed dates, e.g. "11–13 December 2026". */
  dates: "December 2026",
  datesConfirmed: false,
  schedule: [
    { day: "Friday", time: "17:00–20:00" },
    { day: "Saturday", time: "09:00–12:30" },
    { day: "Sunday", time: "09:00–12:30" },
  ],
  timezone: "Lisbon time (WET)",
  format: "live online on Google Meet",
  /** TODO: confirm the teaching language. */
  language: "English",
  hours: 10,
  days: 3,
  seats: 15,
  /** TODO: set the price in euros, e.g. 290. null hides the price. */
  price: null as number | null,
  currency: "EUR",
  /** TODO: paste the live Stripe Payment Link here. null shows "register interest". */
  registrationUrl: null as string | null,
  /** Set to true when the Payment Link limit is reached. */
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

export type RegisterAction = {
  label: string;
  href: string;
  external: boolean;
  /** Short note shown next to or under the button. */
  note: string;
};

/** What the Register button does, based on the current sales state. */
export function getRegisterAction(): RegisterAction {
  const price = formatPrice(workshop.price);
  if (workshop.soldOut) {
    return {
      label: "Join the waitlist",
      href: LINKEDIN_URL,
      external: true,
      note: "This cohort is full. Message me on LinkedIn to hear about the next one.",
    };
  }
  if (workshop.registrationUrl) {
    return {
      label: price ? `Register · ${price}` : "Register",
      href: workshop.registrationUrl,
      external: false,
      note: `Secure checkout by Stripe. Maximum ${workshop.seats} seats.`,
    };
  }
  return {
    label: "Register interest",
    href: LINKEDIN_URL,
    external: true,
    note: "Registration opens soon. Message me on LinkedIn to get a seat reminder.",
  };
}

export const stats = [
  { value: String(workshop.days), label: "Live sessions" },
  { value: String(workshop.hours), label: "Hours together" },
  { value: "8", label: "Steps, setup to vibe coding" },
  { value: String(workshop.seats), label: "Seats maximum" },
];

export const steps = [
  { id: "01", title: "Set up your workspace", body: "Claude, Figma MCP and your project folder, ready before Day 1.", day: "Before Day 1" },
  { id: "02", title: "Design tokens", body: "Global, Semantic and Component tokens, named so people and AI can read them.", day: "Day 1" },
  { id: "03", title: "Components", body: "Build a component with variants and states, bound to your tokens.", day: "Day 2" },
  { id: "04", title: "Documentation", body: "Generate TOKENS.md and COMPONENT.md from your real Figma file.", day: "Day 2" },
  { id: "05", title: "Figma to code", body: "Turn components into React. Variables become code tokens, variants become props.", day: "Day 2" },
  { id: "06", title: "Storybook", body: "A living catalogue of your coded components.", day: "Day 2" },
  { id: "07", title: "GitHub", body: "Publish your design system so other people, and AI, can use it.", day: "Day 3" },
  { id: "08", title: "Vibe coding", body: "Build a real screen with Claude, using only your components and tokens.", day: "Day 3" },
];

export type ProgramBlock = { time: string; title: string; detail: string; isBreak?: boolean };
export type ProgramDay = { id: string; label: string; title: string; when: string; blocks: ProgramBlock[]; stretch: string };

export const program: ProgramDay[] = [
  {
    id: "day-1",
    label: "Day 1",
    title: "Make it AI-ready",
    when: "Friday 17:00–20:00",
    blocks: [
      { time: "17:00", title: "Welcome", detail: "Live demo of where you'll be on Sunday: a screen built on the finished system." },
      { time: "17:15", title: "AI basics", detail: "LLM, prompt, context window, agent, MCP, hallucination, AI tokens vs design tokens." },
      { time: "17:40", title: "Setup check", detail: "Claude Code opens and Figma MCP answers a question about your copy of the library." },
      { time: "17:55", title: "CLAUDE.md", detail: "What a Markdown file is; write one about you and one for the project." },
      { time: "18:15", title: "Break", detail: "", isBreak: true },
      { time: "18:30", title: "Token architecture", detail: "Global, Semantic, Component; naming; Light and Dark modes; trace one token in Figma." },
      { time: "18:55", title: "Prompt template", detail: "Role, context, task, constraints, format, example." },
      { time: "19:05", title: "Hands-on: tokens", detail: "With Claude, add a colour ramp to Global, map it to Semantic, check names and aliases." },
      { time: "19:55", title: "Exit ticket", detail: "One thing Claude got wrong, one rule that fixed it." },
    ],
    stretch: "Add the new ramp to Dark mode too.",
  },
  {
    id: "day-2",
    label: "Day 2",
    title: "Make it real",
    when: "Saturday 09:00–12:30",
    blocks: [
      { time: "09:00", title: "Recap", detail: "Common issues from Friday." },
      { time: "09:10", title: "Component basics", detail: "Anatomy, variants vs properties, the six states." },
      { time: "09:30", title: "Hands-on: component", detail: "Claude writes the spec; you build a Quantity Stepper in Figma with existing variables." },
      { time: "10:15", title: "Docs", detail: "Claude generates TOKENS.md and COMPONENT.md from your file, with when to use and when to avoid." },
      { time: "10:40", title: "Break", detail: "", isBreak: true },
      { time: "10:55", title: "Code basics", detail: "Terminal, folder, Node.js, npm, package.json, localhost, React component, props." },
      { time: "11:20", title: "Hands-on: Figma to React", detail: "Claude turns Button and ProductCard into React components that match Figma." },
      { time: "12:05", title: "Storybook", detail: "One story per variant, with Controls and Autodocs." },
    ],
    stretch: "Code the Quantity Stepper too.",
  },
  {
    id: "day-3",
    label: "Day 3",
    title: "Ship it and build with it",
    when: "Sunday 09:00–12:30",
    blocks: [
      { time: "09:00", title: "Recap", detail: "What you have so far." },
      { time: "09:10", title: "Audit loop", detail: "Audit, prioritise, fix, update docs, re-audit; check every AI finding before acting on it." },
      { time: "09:45", title: "Git basics", detail: "Repository, commit, push, remote, .gitignore, secrets; saving vs committing." },
      { time: "10:05", title: "Hands-on: publish", detail: "README, coding rules in CLAUDE.md, commit and push to GitHub." },
      { time: "10:35", title: "Break", detail: "", isBreak: true },
      { time: "10:50", title: "Vibe coding", detail: "Claude reads your docs and builds an order screen using only your components and tokens." },
      { time: "11:40", title: "Showcase", detail: "90-second demos." },
      { time: "12:05", title: "Wrap-up", detail: "Governance, next steps, Q&A." },
    ],
    stretch: "Open a pull request, or compare your vibe-coded screen with Figma and list the differences.",
  },
];

export const audience = {
  fit: [
    "You're a junior or mid-level designer who knows Figma basics.",
    "You've tried AI chat tools but never connected AI to Figma or code.",
    "Words like terminal, Node.js or repository make you hesitate.",
    "You want a portfolio-ready design system on GitHub, not just notes.",
  ],
  requirements: [
    "Figma Professional plan or above, with the desktop app.",
    "Claude Pro plan or above, with Claude Desktop (Claude Code runs there).",
    "A free GitHub account.",
    "A laptop where you can install software (Git and Node.js).",
    "Code fundamentals help (HTML, CSS, Git) but are not required.",
  ],
  note: "Figma and Claude plans are your own subscriptions and are not included in the price. A step-by-step setup guide is sent after you register.",
};

export const takeaways = [
  { title: "Your Figma library", body: "Your copy of the practice design system, extended with your own tokens and component." },
  { title: "AI-ready docs", body: "TOKENS.md and COMPONENT.md that people and AI can read." },
  { title: "React components", body: "Coded components that match Figma, shown in Storybook." },
  { title: "A GitHub repository", body: "Your design system, published and ready to show in your portfolio." },
  { title: "A vibe-coded screen", body: "One real screen built with Claude on your own system." },
  { title: "The checklist", body: "The 8-step workflow to repeat on any project, plus a certificate of participation." },
];

export const glossary = [
  { term: "LLM", meaning: "The model behind Claude: it predicts text from what you give it." },
  { term: "Prompt", meaning: "Your instruction to the AI." },
  { term: "Agent", meaning: "AI that can take actions, like reading files or editing Figma." },
  { term: "MCP", meaning: "The connector that lets Claude read and edit Figma." },
  { term: "Markdown", meaning: "A plain-text file with simple formatting that AI reads well." },
  { term: "Design token", meaning: "A named design decision, like a colour or a spacing." },
  { term: "Terminal", meaning: "A window where you type commands instead of clicking." },
  { term: "Node.js", meaning: "The program that runs the project on your laptop." },
  { term: "localhost", meaning: "Your own laptop acting as a website." },
  { term: "Git", meaning: "Saves snapshots of your project so you can go back." },
  { term: "Commit / push", meaning: "Save a snapshot / upload it to GitHub." },
  { term: "Storybook", meaning: "A catalogue of your coded components." },
];

export const faq = [
  {
    q: "Do I need to know how to code?",
    a: "No. Code fundamentals help, but every term is explained the first time you need it, and Claude does the typing. You'll learn what each step does and why.",
  },
  {
    q: "Which brand do we practise on?",
    a: "A practice design system modelled on a brand everyone knows, so you can focus on the workflow instead of inventing a brand. It is an unofficial educational exercise.",
  },
  {
    q: "How do I join the sessions?",
    a: "All three sessions are live on Google Meet. You'll receive a calendar invitation with the link about a week before the start, and a reminder the day before.",
  },
  {
    q: "How can I pay?",
    a: "Checkout is handled by Stripe: card, Apple Pay, Google Pay, MB WAY and Multibanco.",
  },
  {
    q: "Will I get an invoice?",
    a: "Yes. Add your NIF or company tax ID at checkout and your invoice will include it. Invoices are sent within 5 working days of payment.",
  },
  {
    q: "Do I get a certificate?",
    a: "Yes. Everyone who attends at least two of the three sessions receives a certificate of participation by email.",
  },
  {
    q: "What if I can't make one session?",
    a: "Each hands-on block has a ready-made checkpoint you can catch up from, so you won't be left behind.",
  },
  {
    q: "What happens to my data?",
    a: "Your name, email and tax ID are used only to run the workshop and issue your invoice. Payments are processed by Stripe; card details never reach me.",
  },
];
