// ─────────────────────────────────────────────────────────────────────────────
// certificates.ts
// Certificates of participation, served at /workshop/certificate/:id.
//
// How to issue (after the last session):
//   1. For each attendee who joined at least 2 of the 3 sessions AND agreed at checkout
//      to have their certificate published, add a row to certificates.json:
//        { "id": "AIFD-2026-12-001", "name": "Full Name", "issued": "2026-12-13",
//          "course": "AI for designers: from prompt to product", "hours": 10,
//          "cohort": "December 2026" }
//      Use the "Name for your certificate" field from Stripe, exactly as typed.
//   2. Build and deploy. The build also writes a static page per certificate so
//      LinkedIn link previews work (scripts/publish-root-build.mjs).
//   3. Email each person their link: https://raqper.github.io/workshop/certificate/<id>
//      The page has "Download PDF" and "Add to LinkedIn" buttons.
//
// Attendees who did NOT agree to publication: add their row locally only, run the
// dev server, open their URL, "Download PDF", email the PDF, then remove the row.
// ─────────────────────────────────────────────────────────────────────────────

import data from "./certificates.json";

export type Certificate = {
  id: string;
  name: string;
  /** ISO date, e.g. "2026-12-13". */
  issued: string;
  course: string;
  hours: number;
  cohort: string;
};

export const SITE_URL = "https://raqper.github.io";
export const ISSUER = "Raquel Pereira";

/** Only on the local dev server, so the template can be previewed without real data. */
const DEV_SAMPLE: Certificate = {
  id: "AIFD-SAMPLE",
  name: "Alex Example",
  issued: "2026-12-13",
  course: "AI for designers: from prompt to product",
  hours: 10,
  cohort: "December 2026",
};

const certificates: Certificate[] = [...(data as Certificate[]), ...(import.meta.env.DEV ? [DEV_SAMPLE] : [])];

export function findCertificate(id: string | undefined): Certificate | null {
  if (!id) return null;
  const key = id.trim().toUpperCase();
  return certificates.find((c) => c.id.toUpperCase() === key) ?? null;
}

export function certificatePath(id: string) {
  return `/workshop/certificate/${id}`;
}

export function certificateUrl(id: string) {
  return `${SITE_URL}${certificatePath(id)}`;
}

export function formatIssued(iso: string) {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(new Date(`${iso}T12:00:00Z`));
}

/** LinkedIn "Add licence or certification" prefilled URL. */
export function linkedInAddUrl(cert: Certificate) {
  const [year, month] = cert.issued.split("-");
  const params = new URLSearchParams({
    startTask: "CERTIFICATION_NAME",
    name: `${cert.course} (Certificate of participation)`,
    organizationName: ISSUER,
    issueYear: year,
    issueMonth: String(Number(month)),
    certUrl: certificateUrl(cert.id),
    certId: cert.id,
  });
  return `https://www.linkedin.com/profile/add?${params.toString()}`;
}
