import { LegalPage, type LegalSection } from "@/app/features/legal/legal-page";
import {
  formatPrice,
  PRIVACY_PATH,
  seller,
  WORKSHOP_PATH,
  workshop,
} from "@/app/data/workshop-data";

// Terms for the December 2026 workshop. Written to EU/Portuguese consumer rules
// (Directive 2011/83/EU and Decreto-Lei 24/2014 on distance contracts,
// Lei 144/2015 on consumer dispute resolution, DL 156/2005 on the complaints book).
// Change the date in UPDATED whenever the wording changes.

const UPDATED = "20 November 2026";
const price = formatPrice(workshop.price) ?? "the advertised price";
const email = <a href={`mailto:${seller.email}`}>{seller.email}</a>;

const sections: LegalSection[] = [
  {
    id: "who-i-am",
    title: "Who I am",
    content: (
      <>
        <p>
          The workshop is run and sold by me, <strong>{seller.name}</strong>.
        </p>
        <ul>
          <li>Email: {email}</li>
          <li>
            LinkedIn:{" "}
            <a href={seller.linkedin} target="_blank" rel="noopener noreferrer">
              linkedin.com/in/raqper
            </a>
          </li>
        </ul>
        <p>{workshop.vatNote}</p>
      </>
    ),
  },
  {
    id: "what-you-buy",
    title: "What you're buying",
    content: (
      <>
        <p>
          One seat at the live online workshop <strong>{workshop.title}</strong>, held in {workshop.language} on Google Meet:
        </p>
        <ul>
          {workshop.schedule.map((s) => (
            <li key={s.day}>
              {s.day}, {s.time}, {workshop.timezone}
            </li>
          ))}
        </ul>
        <p>
          Your seat includes the three live sessions, the pre-workshop prep (available from Fri 4 Dec), the session
          recordings until {workshop.recordingsUntil} and a personal certificate of participation. The full description is on the <a href={WORKSHOP_PATH}>workshop page</a>.
        </p>
        <p>
          <strong>Not included:</strong> the paid tools you need (Figma Professional and Claude Pro), which you buy from
          each provider at their prices, a free GitHub account, and a laptop where you can install software.
        </p>
      </>
    ),
  },
  {
    id: "who-can-book",
    title: "Who can book",
    content: (
      <>
        <p>To book you must:</p>
        <ul>
          <li>live in a member state of the European Union,</li>
          <li>be at least 18 years old, and</li>
          <li>meet the level described on the workshop page (components with variants and variables in Figma).</li>
        </ul>
        <p>
          If you book from outside the EU, I'll cancel your booking and refund you in full. One ticket is for one person.
          You can pass your seat to someone else before the first session: email me their name and email address.
        </p>
      </>
    ),
  },
  {
    id: "price-payment",
    title: "Price, payment and invoice",
    content: (
      <>
        <p>
          The price is <strong>{price}</strong>. It's the final price, with no fees added. {workshop.vatNote}
        </p>
        <p>
          You pay in full when you book, through Stripe's secure checkout. The contract starts when your payment is
          confirmed and Stripe emails your receipt. I issue an official Portuguese invoice (recibo verde) for every booking
          and email it to you when you ask for it ({email}). Add your NIF, or your company's VAT number, in the optional field at
          checkout. If the invoice should be in your company's name, tell me the name when you ask for it.
        </p>
      </>
    ),
  },
  {
    id: "cancellation",
    title: "Cancelling, refunds and your right of withdrawal",
    content: (
      <>
        <p>
          <strong>Full refund if you cancel by {workshop.refundUntil}, or within 14 days of booking if that's later.</strong>{" "}
          No reason needed. If your 14 days run into the workshop, cancelling after it starts gets you back the part for the
          sessions you haven't had yet. Once all three sessions have happened, you can no longer cancel.
        </p>
        <p>
          After that, there's no refund, including for sessions you miss, but you can pass your seat to someone else before
          the first session.
        </p>
        <p>
          <strong>How to cancel.</strong> Send me a clear statement by email ({email}). You can use the model form under "Legal
          details" at the end of these terms, but you don't have to. I refund you within 14 days of receiving it, to the payment method you
          used, at no cost to you.
        </p>
      </>
    ),
  },
  {
    id: "changes-by-me",
    title: "If I change or cancel the workshop",
    content: (
      <p>
        If I have to move a session (for example, because I'm ill), I'll tell you as early as I can. If the new date
        doesn't work for you, you can choose a full refund instead. If I cancel the workshop, I refund you in full. I'm not
        responsible for other costs, such as the tool plans you bought.
      </p>
    ),
  },
  {
    id: "recordings",
    title: "Recordings",
    content: (
      <p>
        I record the sessions on Google Meet and say so at the start of each one. Your camera is optional, and you can
        use a display name. I share the recordings with registered attendees until {workshop.recordingsUntil}, then I
        delete them. They're for your personal use: please don't download, share or publish them. See the{" "}
        <a href={PRIVACY_PATH}>privacy policy</a> for how recordings are handled.
      </p>
    ),
  },
  {
    id: "your-setup",
    title: "Your setup",
    content: (
      <p>
        Setting up your laptop and accounts before the first session is your responsibility. The pre-workshop prep walks
        you through every step. Live time is for building together, so I can't troubleshoot individual setups during the
        sessions.
      </p>
    ),
  },
  {
    id: "materials",
    title: "Materials and intellectual property",
    content: (
      <p>
        The slides, guides and the Figma practice file are mine and are for your personal
        learning. Please don't resell, republish or teach from them. The practice file is an unofficial educational
        exercise and isn't connected to any brand. What you build during the workshop is yours.
      </p>
    ),
  },
  {
    id: "conduct",
    title: "Code of conduct",
    content: (
      <p>
        Be kind and respectful to everyone in the group. Harassment, discrimination or disruptive behaviour isn't
        tolerated. If it happens, I may remove someone from the sessions, and in serious cases they won't get a refund.
      </p>
    ),
  },
  {
    id: "certificate",
    title: "Certificate of participation",
    content: (
      <p>
        If you attend at least two of the three sessions, you get a personal certificate of participation from me as a
        thank-you. It isn't an accredited qualification. I only publish your certificate page with your consent.
      </p>
    ),
  },
  {
    id: "liability",
    title: "Liability",
    content: (
      <p>
        I prepare and teach the workshop with care. I'm not responsible for outages or changes in third-party tools and
        services (such as Google Meet, Figma, Claude or GitHub), for your internet connection, or for decisions you make
        based on the content. Nothing in these terms limits your rights as a consumer under the law.
      </p>
    ),
  },
  {
    id: "complaints",
    title: "Complaints and disputes",
    content: (
      <p>If something isn't right, email me first ({email}). I'll reply as quickly as I can.</p>
    ),
  },
  {
    id: "law",
    title: "Applicable law",
    content: (
      <p>
        These terms are governed by Portuguese law. If you live in another EU country, you keep the protection of the
        mandatory consumer rules of that country.
      </p>
    ),
  },
  {
    id: "changes-to-terms",
    title: "Changes to these terms",
    content: (
      <p>
        I may update these terms for future editions. The version that applies to you is the one shown when you booked.
        Last updated {UPDATED}.
      </p>
    ),
  },
];

/** Kept on purpose, folded away under "Legal details": EU law requires the model withdrawal form
 *  (Directive 2011/83/EU, Annex I(B)) and Portuguese law requires naming a dispute resolution body (Lei 144/2015). */
const legalDetails = (
  <>
    <p>
      <strong>Model withdrawal form.</strong> Only if you want to cancel; a plain email works too.
    </p>
    <div className="mt-2 rounded-lg border border-[#2e1a6a] bg-[#0a001c]/50 p-4">
      <p>
        To: {seller.name}, {seller.email}
      </p>
      <p>
        I hereby give notice that I withdraw from my contract for the provision of the following service: {workshop.title}{" "}
        ({workshop.dates}).
      </p>
      <ul>
        <li>Booked on:</li>
        <li>Name:</li>
        <li>Email used to book:</li>
        <li>Address:</li>
        <li>Date:</li>
        <li>Signature (only if you send this form on paper)</li>
      </ul>
    </div>
    <p className="mt-4">
      <strong>Consumer disputes.</strong> If we can't solve a dispute together, you can contact the{" "}
      <a href="https://www.cniacc.pt" target="_blank" rel="noopener noreferrer">
        CNIACC
      </a>{" "}
      or another consumer arbitration centre listed at{" "}
      <a href="https://www.consumidor.gov.pt" target="_blank" rel="noopener noreferrer">
        consumidor.gov.pt
      </a>
      .
    </p>
  </>
);

export default function WorkshopTerms() {
  return (
    <LegalPage
      title="Workshop terms"
      metaTitle={`Workshop terms · ${workshop.shortTitle} · Raquel Pereira`}
      description={`Terms of sale for the live online workshop ${workshop.title}: price, cancellation, withdrawal, recordings and complaints.`}
      updated={UPDATED}
      back={{ to: WORKSHOP_PATH, label: "Back to the workshop" }}
      intro={
        <p>
          These are the terms for booking the live online workshop <strong>{workshop.title}</strong> ({workshop.dates}).
          You accept them when you book. They're written in plain English. If anything is unclear, email me before you
          book.
        </p>
      }
      sections={sections}
      footnote={legalDetails}
    />
  );
}
