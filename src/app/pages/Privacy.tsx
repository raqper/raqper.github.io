import { LegalPage, type LegalSection } from "@/app/features/legal/legal-page";
import { seller, TERMS_PATH, workshop } from "@/app/data/workshop-data";

// Site-wide privacy policy (GDPR, Regulation (EU) 2016/679).
// Keep it in sync with what the site and the workshop actually collect.
// This site sets no cookies and runs no analytics: if that changes, update section 6.

const UPDATED = "20 November 2026";
const email = <a href={`mailto:${seller.email}`}>{seller.email}</a>;

const sections: LegalSection[] = [
  {
    id: "controller",
    title: "Who is responsible for your data",
    content: (
      <p>
        I am: {seller.name}, {email}. I'm the data controller for this website and for the workshops I
        sell on it.
      </p>
    ),
  },
  {
    id: "what-i-collect",
    title: "What I collect and why",
    content: (
      <>
        <p>
          <strong>When you book a workshop.</strong> Stripe collects your name, email, billing address, country and payment
          details on its checkout page. I receive your name, email, address, country and (if you add one) your NIF or VAT
          number. I never see your card details. I use this to run the workshop you booked, send you the prep
          guide and the Meet link, and issue your invoice. Legal basis: performing our contract and my legal obligations
          (tax and invoicing).
        </p>
        <p>
          <strong>During the workshop.</strong> Sessions run on Google Meet and are recorded. Recordings include the image
          (if your camera is on), voice, name and chat messages of the people taking part. I keep them until{" "}
          {workshop.recordingsUntil} so attendees can catch up, then delete them. Legal basis: my legitimate interest in
          giving attendees a way to catch up. You can keep your camera off and use a display name.
        </p>
        <p>
          <strong>Certificates and testimonials.</strong> I publish your certificate page or a quote from you only with
          your consent, and remove it if you ask. Legal basis: consent.
        </p>
        <p>
          <strong>When you message me</strong> by email or LinkedIn, I use what you send to reply. Legal basis: my
          legitimate interest in answering you.
        </p>
      </>
    ),
  },
  {
    id: "who-processes",
    title: "Who helps me process it",
    content: (
      <>
        <p>I use a few providers, each with its own privacy policy:</p>
        <ul>
          <li>
            <strong>Stripe</strong>: payments and receipts.
          </li>
          <li>
            <strong>Google</strong>: email, Google Meet, recordings (Google Workspace), and the fonts on this website (Google
            Fonts, which receives your IP address when the page loads).
          </li>
          <li>
            <strong>GitHub Pages</strong>: hosts this website and keeps standard server logs, such as IP addresses.
          </li>
          <li>
            <strong>Notion</strong>: hosts the pre-workshop guide you open by link.
          </li>
        </ul>
        <p>
          Some of these providers are based in the United States. Transfers rely on the EU–US Data Privacy Framework or the
          European Commission's standard contractual clauses. I don't sell your data or use it for advertising.
        </p>
      </>
    ),
  },
  {
    id: "how-long",
    title: "How long I keep it",
    content: (
      <ul>
        <li>Invoices and payment records: 10 years, as Portuguese tax law requires.</li>
        <li>Recordings: until {workshop.recordingsUntil}.</li>
        <li>Booking details and emails: up to 2 years after the workshop, unless you ask me to delete them sooner.</li>
        <li>Published certificates and testimonials: until you withdraw your consent.</li>
      </ul>
    ),
  },
  {
    id: "your-rights",
    title: "Your rights",
    content: (
      <p>
        You can ask to access, correct, delete or move your data, object to or restrict how I use it, and withdraw consent
        at any time. Email me at {email}. If you think I'm not handling your data properly, you can complain to the
        Portuguese data protection authority,{" "}
        <a href="https://www.cnpd.pt" target="_blank" rel="noopener noreferrer">
          CNPD
        </a>
        , or the authority in your own EU country.
      </p>
    ),
  },
  {
    id: "cookies",
    title: "Cookies",
    content: (
      <p>
        This website doesn't set cookies and doesn't use analytics or tracking, so there's no cookie banner. Stripe's
        checkout runs on Stripe's own site and uses its own cookies for security and fraud prevention.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes",
    content: (
      <p>
        I'll update this page if anything changes. Last updated {UPDATED}. The workshop's terms of sale are on the{" "}
        <a href={TERMS_PATH}>workshop terms</a> page.
      </p>
    ),
  },
];

export default function Privacy() {
  return (
    <LegalPage
      title="Privacy policy"
      metaTitle="Privacy policy · Raquel Pereira"
      description="How Raquel Pereira handles personal data on raqper.github.io and in her workshops."
      updated={UPDATED}
      back={{ to: "/career", label: "Back to the site" }}
      intro={<p>This page explains what personal data I collect on this website and in my workshops, why, and what your rights are.</p>}
      sections={sections}
    />
  );
}
