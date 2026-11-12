// ─────────────────────────────────────────────────────────────────────────────
// workshop-data.ts
// Single source of truth for the /workshop page (December 2026 edition).
// Course content mirrors "Course Plan v4 | December edition" in Notion.
//
// Values marked TODO are placeholders until confirmed:
//   - dates, price, registrationUrl (Stripe Payment Link), language, refund policy,
//     contactEmail, testimonials
//
// Registration flow: every Register button opens the in-page register sheet
// (features/workshop/register-sheet.tsx). The sheet's "Pay securely" button sends
// people to the Stripe Payment Link below. While registrationUrl is null the sheet
// shows "Registration opens soon" instead of a pay button.
//
// Stripe Payment Link checklist (Stripe dashboard → Payment links → New):
//   1. Product "AI for designers: from prompt to product (December 2026)", one-time price in EUR.
//   2. Options → "Limit the number of payments" = seats (15).
//   3. Payment methods: card, Apple Pay, Google Pay, MB WAY, Multibanco.
//   4. Collect customer name + email; "Allow customers to add a tax ID" (NIF / company VAT).
//   5. Custom fields: "Name for your certificate" (text, required).
//   6. Consent checkbox (custom field, dropdown Yes/No): "Publish my certificate with my
//      name on raqper.github.io so I can add it to LinkedIn".
//   7. After payment → "Don't show confirmation page" → redirect to
//      https://raqper.github.io/workshop?registered=1
//   8. Paste the link (https://buy.stripe.com/…) into registrationUrl below.
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
  /** TODO: paste the live Stripe Payment Link here. null shows "Registration opens soon". */
  registrationUrl: null as string | null,
  /** Sent to Stripe as client_reference_id so payments can be matched to this cohort. */
  cohortId: "workshop-dec-2026",
  /** TODO: public contact email for "notify me" / waitlist. null falls back to LinkedIn. */
  contactEmail: null as string | null,
  /** TODO: confirm the refund policy wording. */
  refundPolicy: "Full refund up to 7 days before the first session.",
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

export type RegisterState = "open" | "soon" | "soldOut";

export function getRegisterState(): RegisterState {
  if (workshop.soldOut) return "soldOut";
  if (workshop.registrationUrl) return "open";
  return "soon";
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
      return "This cohort is full. Join the waitlist to hear about the next one.";
    case "open":
      return `Secure checkout by Stripe. Maximum ${workshop.seats} seats.`;
    default:
      return `Registration opens soon. Maximum ${workshop.seats} seats.`;
  }
}

/** Stripe Payment Link URL with the email prefilled and the cohort reference attached. */
export function buildCheckoutUrl(email?: string): string | null {
  if (!workshop.registrationUrl) return null;
  const url = new URL(workshop.registrationUrl);
  url.searchParams.set("client_reference_id", workshop.cohortId);
  if (email) url.searchParams.set("prefilled_email", email);
  return url.toString();
}

/** Where "notify me" and the waitlist go: email if set, otherwise LinkedIn. */
export function getNotifyLink(subject: string): { href: string; label: string; external: boolean } {
  if (workshop.contactEmail) {
    return {
      href: `mailto:${workshop.contactEmail}?subject=${encodeURIComponent(subject)}`,
      label: "Email me to get notified",
      external: false,
    };
  }
  return { href: LINKEDIN_URL, label: "Message me on LinkedIn to get notified", external: true };
}

/** Short facts shown as a strip under the hero. */
export const facts = [
  { label: "Format", value: `${workshop.days} live sessions` },
  { label: "Duration", value: `${workshop.hours} hours` },
  { label: "Where", value: "Online, Google Meet" },
  { label: "Language", value: workshop.language },
];

export const personas = [
  {
    title: "You design in Figma, but AI feels out of reach",
    body: "You've used chat tools, but never connected AI to your files or your design system.",
  },
  {
    title: "Code sounds scary",
    body: "Terminal, Git, React: you'll learn just enough to use them with confidence, step by step.",
  },
  {
    title: "You want proof, not notes",
    body: "You leave with a real project on GitHub that you can show in your portfolio.",
  },
];

export const requirementsLine =
  "You'll need Figma (Professional plan) and Claude (Pro plan), a free GitHub account and a laptop where you can install software. Plans are your own and not included.";

export const outcomes = [
  { title: "A proper Figma library for AI", body: "Tokens and components built so AI can read them." },
  { title: "Docs AI understands", body: "Clear documentation generated from your own file." },
  { title: "Coded components", body: "React components that match Figma, in Storybook." },
  { title: "A screen from your vibe coding", body: "Built with Claude on your system, published on GitHub." },
];

export type Day = { id: string; label: string; title: string; when: string; bullets: string[] };

export const days: Day[] = [
  {
    id: "day-1",
    label: "01",
    title: "Make it AI-ready",
    when: "Friday · 17:00–20:00",
    bullets: ["AI basics, in plain English", "Connect Claude to Figma", "Design tokens with AI"],
  },
  {
    id: "day-2",
    label: "02",
    title: "Make it real",
    when: "Saturday · 09:00–12:30",
    bullets: ["Components and docs", "From Figma to code", "Your first Storybook"],
  },
  {
    id: "day-3",
    label: "03",
    title: "Ship it and build with it",
    when: "Sunday · 09:00–12:30",
    bullets: ["Audit and improve with AI", "Publish on GitHub", "Vibe code a real screen"],
  },
];

export const formatCallout = "Live sessions · Hands-on practice · Certificate of participation";

export const instructor = {
  name: "Raquel Pereira",
  bio: "Designer since 2017, focused on AI-ready design systems. I teach design systems courses and speak at Friends of Figma and Into Design Systems events. This workshop is the workflow I use every day.",
};

// ── Testimonials ─────────────────────────────────────────────────────────────
// TODO: replace the three placeholders with real quotes from past students
// (max 3), then set testimonialsReady to true. While false, the section only
// renders on the local dev server, so placeholder quotes never go live.
// photo: an imported image URL, or null to show initials.

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  course: string;
  photo: string | null;
};

export const testimonialsReady = false;

export const testimonials: Testimonial[] = [
  {
    quote: "Placeholder quote. One or two sentences about what changed in their work after the course.",
    name: "Student name",
    role: "Product designer, Company",
    course: "Design systems course, 2025",
    photo: null,
  },
  {
    quote: "Placeholder quote. Something specific they built or learned, in their own words.",
    name: "Student name",
    role: "UX/UI designer, Company",
    course: "Design systems course, 2025",
    photo: null,
  },
  {
    quote: "Placeholder quote. How the teaching felt: pace, support, clarity.",
    name: "Student name",
    role: "Junior designer, Company",
    course: "Design systems course, 2026",
    photo: null,
  },
];

export const faq = [
  {
    q: "Do I need to know how to code?",
    a: "No. Code fundamentals help, but every new concept is explained when you need it, and Claude does most of the typing.",
  },
  {
    q: "How do the sessions work?",
    a: "Three live sessions on Google Meet, with demos followed by hands-on practice. You'll get the calendar invitation and a setup guide before the workshop.",
  },
  {
    q: "How do I pay, and will I get an invoice?",
    a: "Checkout is handled by Stripe (card, Apple Pay, Google Pay, MB WAY, Multibanco). Add your NIF or company tax ID at checkout and it will appear on your invoice.",
  },
  {
    q: "Do I get a certificate?",
    a: "Yes. Everyone who attends at least two of the three sessions receives a certificate of participation, with a link you can add to your LinkedIn profile.",
  },
  {
    q: "What if I miss a session?",
    a: "Each practical block has a ready-made checkpoint, so you can catch up and keep building.",
  },
];
