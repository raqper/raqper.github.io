// ─────────────────────────────────────────────────────────────────────────────
// workshop-data.ts
// Single source of truth for the /workshop page (December 2026 and January 2027 dates).
// Course content mirrors "Course Plan v5 | December edition" in Notion, but the
// public agenda is kept deliberately high level.
//
// Registration runs on ONE Stripe Payment Link (registrationUrl) for every date.
// Every "Get your ticket" button opens the in-page register sheet first (dates,
// price, promo code), and the sheet opens Stripe Checkout in a new tab, where
// people choose their dates. Raquel then emails the welcome note, the prep guide
// and the Meet link.
//
// Stripe Payment Link settings to keep in sync with this page (plink_1UcrrzEOBeFxHGnF…):
//   - Required dropdown "Your dates" (key `dates`), one option per open cohort
//     (values jan2027 / dec2026). Remove a cohort's option once it starts or fills up.
//   - Required dropdown "Country of residence (EU only)" with EU_COUNTRIES
//   - Quantity 1, limit 40 completed checkouts shared by all dates (raise it by hand after a refund)
//   - Promotion codes allowed. BLACKFRIDAY = 20% off, ends 31 Dec 2026 23:59 (see `promo`).
//   - Automatic tax off: €275 is the final price (VAT-exempt, art. 53 CIVA)
//   - No terms checkbox (removed 21 Nov). To unset it, consent_collection[terms_of_service]
//     and custom_text[terms_of_service_acceptance] must change in the same call, and the
//     empty unset only works via the Stripe CLI (the Dashboard and MCP tool refuse it).
//
// Legal pages: /workshop/terms (data/workshop-terms.ts) and /privacy (data/privacy.ts).
// Seller identity lives in `seller` below and feeds both.
//
// Recordings: sessions are recorded and shared with attendees. Raquel decided
// (27 Nov 2026) not to publish an availability period on the public pages; the
// privacy policy keeps a retention criterion, and attendees get the date by email.
// The certificate is a personal thank-you from Raquel, not an accredited
// qualification: never call it "verified", "official" or "accredited".
//
// Still TODO: student count for the instructor bio.
// ─────────────────────────────────────────────────────────────────────────────

// Testimonial avatars (192px, from each person's LinkedIn, used with their consent).
import melissaPhoto from "@/assets/workshop/testimonial-melissa.jpg";

export const WORKSHOP_PATH = "/workshop";

export const LINKEDIN_URL = "https://www.linkedin.com/in/raqper/";

export const TERMS_PATH = "/workshop/terms";
export const PRIVACY_PATH = "/privacy";

/**
 * Who sells the workshop, shown on /workshop/terms and /privacy.
 * Raquel decided (20 Nov 2026) not to publish her NIF or address: name, email and LinkedIn only.
 * The NIF still appears on each recibo verde she sends.
 */
export const seller = {
  name: "Raquel Pereira",
  email: "raqperfreelance@gmail.com" as string,
  linkedin: "https://www.linkedin.com/in/raqper/" as string,
};

/** True once every seller detail is filled in. The legal pages show a warning in dev until then. */
export const sellerComplete = !Object.values(seller).some((v) => v.startsWith("TODO"));

/** The 27 EU member states. Feeds the register sheet select and the Stripe dropdown. */
export const EU_COUNTRIES = [
  { code: "AT", name: "Austria" },
  { code: "BE", name: "Belgium" },
  { code: "BG", name: "Bulgaria" },
  { code: "HR", name: "Croatia" },
  { code: "CY", name: "Cyprus" },
  { code: "CZ", name: "Czechia" },
  { code: "DK", name: "Denmark" },
  { code: "EE", name: "Estonia" },
  { code: "FI", name: "Finland" },
  { code: "FR", name: "France" },
  { code: "DE", name: "Germany" },
  { code: "GR", name: "Greece" },
  { code: "HU", name: "Hungary" },
  { code: "IE", name: "Ireland" },
  { code: "IT", name: "Italy" },
  { code: "LV", name: "Latvia" },
  { code: "LT", name: "Lithuania" },
  { code: "LU", name: "Luxembourg" },
  { code: "MT", name: "Malta" },
  { code: "NL", name: "Netherlands" },
  { code: "PL", name: "Poland" },
  { code: "PT", name: "Portugal" },
  { code: "RO", name: "Romania" },
  { code: "SK", name: "Slovakia" },
  { code: "SI", name: "Slovenia" },
  { code: "ES", name: "Spain" },
  { code: "SE", name: "Sweden" },
] as const;

export const workshop = {
  title: "AI for designers: from prompt to product",
  shortTitle: "AI for designers",
  /** Short pitch: homepage card and meta description. */
  promise:
    "In three live sessions you go from your first prompt to vibe coding real screens from a component library, published on GitHub, with Claude and Figma.",
  /** Hero lead on /workshop. */
  heroLead:
    "Three live sessions to go from your first prompt to vibe coding real screens from a component library with Claude and Figma, and publishing them on GitHub. Made for junior and mid-level designers.",
  timezone: "GMT (Lisbon time)",
  format: "live online on Google Meet",
  language: "English",
  hours: 10,
  sessions: 3,
  /** Not shown on the site. Stripe stops selling after this many checkouts. */
  seats: 20,
  /** Full price in euros, one price for everyone. null hides the price. The promo price comes from `promo`. */
  price: 275 as number | null,
  currency: "EUR",
  /** Final price wording. Raquel is VAT-exempt (art. 53 CIVA), so no VAT is charged: never say "VAT included". */
  priceNote: "Final price, no VAT added",
  vatNote: "No VAT is charged: I'm exempt under article 53 of the Portuguese VAT Code (CIVA).",
  /** Stripe Payment Link, shared by every date. null shows "Registration opens soon". */
  registrationUrl: "https://book.stripe.com/eVq00jffK5MLgHkgnpgIo01" as string | null,
  refundPolicy:
    "Full refund if you cancel up to 3 days before your first session, or within 14 days of booking if that's later. After that, you can pass your seat to someone else.",
  /** Set to true when Stripe stops selling (40 checkouts): the sheet then offers the waitlist. */
  soldOut: false,
  tools: ["Claude", "Figma", "Code"],
} as const;

/** Hero eyebrow on /workshop. */
export const heroEyebrow = "Intensive online workshop";

export type Cohort = {
  id: string;
  /** Long form, used in the terms. */
  dates: string;
  /** Short form, used in chips and facts. */
  shortDates: string;
  schedule: { day: string; time: string }[];
  /** First session start (Lisbon time = UTC in winter). The cohort disappears from the page after this. */
  startsAt: string;
  /** Last day of the free-cancellation window (3 days before the first session). */
  refundUntil: string;
  prepOpens: string;
  /** Shown as a small "New" tag in the register sheet. */
  isNew?: boolean;
};

/** Every date on sale, in the order the register sheet shows them (newest first). */
export const cohorts: Cohort[] = [
  {
    id: "jan2027",
    dates: "29–31 January 2027",
    shortDates: "29–31 Jan",
    schedule: [
      { day: "Fri 29 Jan", time: "18:00–21:00" },
      { day: "Sat 30 Jan", time: "09:00–12:30" },
      { day: "Sun 31 Jan", time: "09:00–12:30" },
    ],
    startsAt: "2027-01-29T18:00:00Z",
    refundUntil: "Tue 26 Jan, 18:00 Lisbon time",
    prepOpens: "Fri 22 Jan",
    isNew: true,
  },
  {
    id: "dec2026",
    dates: "11–13 December 2026",
    shortDates: "11–13 Dec",
    schedule: [
      { day: "Fri 11 Dec", time: "18:00–21:00" },
      { day: "Sat 12 Dec", time: "09:00–12:30" },
      { day: "Sun 13 Dec", time: "09:00–12:30" },
    ],
    startsAt: "2026-12-11T18:00:00Z",
    refundUntil: "Tue 8 Dec, 18:00 Lisbon time",
    prepOpens: "Fri 4 Dec",
  },
];

/** Dates still on sale: a cohort drops off the page by itself once its first session starts. */
export function getOpenCohorts(now: Date = new Date()): Cohort[] {
  return cohorts.filter((c) => now < new Date(c.startsAt));
}

/** Open dates in calendar order, joined for chips and facts, e.g. "11–13 Dec · 29–31 Jan". */
export function getDatesLabel(format: "short" | "long" = "short", now: Date = new Date()): string {
  const open = [...getOpenCohorts(now)].sort((a, b) => a.startsAt.localeCompare(b.startsAt));
  const list = open.length ? open : cohorts.slice(0, 1);
  return list.map((c) => (format === "short" ? c.shortDates : c.dates)).join(format === "short" ? " · " : " or ");
}

/**
 * Black Friday campaign. The code lives in Stripe (promo_1UgM2dEOBeFxHGnF…, coupon RMIUXH3E,
 * 20% off, no redemption limit, expires 31 Dec 2026 23:59). After `endsAt` every promo element hides itself.
 * €275 is the lowest price of the 30 days before the offer (EU price-reduction rules): never show a higher "was" price.
 */
export const promo = {
  name: "Black Friday",
  code: "BLACKFRIDAY",
  percentOff: 20,
  endsAt: "2026-12-31T23:59:00Z",
  endsLabel: "31 Dec",
};

export function getActivePromo(now: Date = new Date()): typeof promo | null {
  return now < new Date(promo.endsAt) ? promo : null;
}

/** Price after the active promo, or null when there's no promo or no price. */
export function getPromoPrice(now: Date = new Date()): number | null {
  if (workshop.price === null || !getActivePromo(now)) return null;
  return Math.round(workshop.price * (1 - promo.percentOff / 100));
}

/** The Stripe link, with the promo code already applied while the offer runs. */
export function getCheckoutUrl(now: Date = new Date()): string | null {
  if (!workshop.registrationUrl) return null;
  const active = getActivePromo(now);
  return active ? `${workshop.registrationUrl}?prefilled_promo_code=${encodeURIComponent(active.code)}` : workshop.registrationUrl;
}

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
  if (!workshop.registrationUrl || getOpenCohorts().length === 0) return "soon";
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
      return "This workshop is full. Message me to join the waitlist.";
    case "open":
      return null;
    default:
      return "Registration opens soon.";
  }
}

/** Paid plans people buy themselves. Shown with an asterisk wherever tools are listed. */
export const toolsNote = "*Figma Professional and Claude Pro are paid plans, bought separately and not included in the workshop price.";

/**
 * Short facts shown as a strip under the hero. The dates have their own tiles (see the hero),
 * and during a promo the price lives in the hero price block, so the strip leaves both out.
 */
export const facts: { label: string; value: string }[] = [
  { label: "Format", value: `${workshop.sessions} sessions · ${workshop.hours} h` },
  ...(getPromoPrice() !== null
    ? []
    : [{ label: "Price", value: workshop.price !== null ? `${formatPrice(workshop.price)} · no VAT added` : "Announced soon" }]),
  { label: "Tools", value: "Figma Pro, Claude Pro and GitHub*" },
  { label: "Open to", value: "EU residents" },
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

/** The entry bar: what people must already know. Mirrors the readiness checkbox in the register sheet. */
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

export const outcomes = [
  { title: "A proper Figma library for AI", body: "Tokens and components built so AI can read them." },
  { title: "Docs AI understands", body: "Clear documentation generated from your own file." },
  { title: "Coded components", body: "React components that match Figma, in Storybook." },
  { title: "A screen from your vibe coding", body: "Built with Claude on your system, published on GitHub." },
];

/** Attendee-only extras, listed in the register sheet. */
export const extras = [
  "Pre-workshop prep, a week before",
  "Session recordings",
  "A personal certificate of participation",
];

/** Self-paced prep, shown as a full-width card above the days. */
export const prep = {
  label: "Before day 1",
  title: "Pre-workshop prep",
  when: "A week before day 1",
  body: "A self-paced setup guide that opens a week before your first session, so you have time to install and connect everything calmly.",
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
    when: "Friday · 18:00–21:00",
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
    when: "Saturday · 09:00–12:30",
    bullets: ["Working with Claude on components and documentation", "Bringing your library into code"],
  },
  {
    id: "day-3",
    label: "03",
    title: "Ship it and vibe code",
    when: "Sunday · 09:00–12:30",
    bullets: ["Reviewing and publishing your project on GitHub", "Generating screens from your library"],
  },
];

/** Small format notes under the agenda. */
export const formatNotes = [
  "Live on Google Meet",
  "Q&A in every session",
  "Session recordings for attendees",
];

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
    a: "Figma Professional and Claude Pro are paid plans you buy yourself (prices vary by country, and you can cancel after the workshop). They aren't included in the workshop price. You also need a free GitHub account and a laptop where you can install software. The pre-workshop prep opens a week before your first session, and setting everything up before day 1 is your responsibility.",
  },
  {
    q: "How do the sessions work?",
    a: "Three live sessions on Google Meet: Friday evening, then Saturday and Sunday morning, with short breaks. Each one mixes short demos with practice and has time for Q&A. I email you the Meet link on the Friday of your dates, and it's the same link for every session.",
  },
  {
    q: "What happens after I register?",
    a: "Stripe emails your receipt straight away, and I send you a welcome email within 24 hours. The pre-workshop prep opens a week before your first session, so you have time to set up calmly. On the Friday of your dates, by 12:00 Lisbon time, I email you the Google Meet link (the same link for all three sessions). After the workshop you get the session recordings and your certificate of participation.",
  },
  {
    q: "Are the sessions recorded?",
    a: "Yes. I record each session on Google Meet and share the recordings with attendees. Your camera is optional. They're there to help you revisit a step, not to replace joining live: the workshop is hands-on, so plan to join all three sessions.",
  },
  {
    q: "What if I miss a session or fall behind?",
    a: "If you miss part of a session, the recording helps you catch up, and you can bring your questions to the start of the next session.",
  },
  {
    q: "Can I use a company laptop or Windows?",
    a: "Yes, as long as you can install software on it. The pre-workshop prep walks you through every step, so live time is for building, not troubleshooting.",
  },
  {
    q: "Who can join?",
    a: "This edition is open to adults living in the European Union. If you live outside the EU, message me and I'll let you know about future editions.",
  },
  // Only while the offer runs.
  ...(getActivePromo()
    ? [
        {
          q: "Is there a discount?",
          a: `Until ${promo.endsLabel}, the code ${promo.code} takes ${promo.percentOff}% off: ${formatPrice(workshop.price)} becomes ${formatPrice(
            getPromoPrice(),
          )}. It works on both dates, and it's already applied when you book from this page. If you open the checkout another way, type it in the promotion code field.`,
        },
      ]
    : []),
  {
    q: "How do I pay, and do I get an invoice?",
    a: `Payment runs on secure Stripe checkout (card, Apple Pay or Google Pay). ${formatPrice(workshop.price) ?? "The price"} is the final price: ${workshop.vatNote.charAt(0).toLowerCase()}${workshop.vatNote.slice(1)} Every booking gets an official Portuguese invoice (recibo verde): add your NIF or VAT number at checkout and email me when you'd like it.`,
  },
  {
    q: "What's the refund policy?",
    a: `${workshop.refundPolicy} The full rules are in the workshop terms.`,
  },
  {
    q: "Is this an accredited course? Do I get a certificate?",
    a: "It's an independent workshop I run myself, not a school or an accredited course. As a thank you, everyone who attends at least two of the three sessions gets a personal certificate of participation from me. You're welcome to share it, and the experience, on LinkedIn.",
  },
];

/** Quotes from past students, shown with their consent. 1–4 entries. */
export type Testimonial = {
  /** One short line shown large at the top of the card. */
  highlight: string;
  /** The full quote, clamped on the card with a "Read more" toggle. */
  quote: string;
  name: string;
  role: string;
  /** Which course they took, shown after the role when set. */
  course?: string;
  /** Imported image URL; initials are shown without one. */
  photo?: string;
  linkedin?: string;
};

export const testimonials: Testimonial[] = [
  {
    highlight: "I was surprised by how much I learned in so little time.",
    quote:
      "Raquel is an excellent teacher and, above all, an excellent person. I kept avoiding design systems because I thought they were far too complex and technical for me, but she made the subject simple enough to reach every kind of student, whatever their experience or goals, with classes that were very practical, relevant and engaging. I was surprised by how much I learned in so little time. No question went unanswered, no doubt was too small, and her advice was always practical and applied to our own contexts and interests. It was one of the best courses I've ever invested in. Thank you so much for everything, Raquel!",
    name: "Melissa Fernandes",
    role: "User Experience Designer @ IBM",
    photo: melissaPhoto,
    linkedin: "https://www.linkedin.com/in/melissa-c-fernandes/",
  },
];
