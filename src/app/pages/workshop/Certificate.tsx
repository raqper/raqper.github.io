import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { Check, Download, Link2 } from "lucide-react";
import {
  certificateUrl,
  findCertificate,
  formatIssued,
  ISSUER,
  linkedInAddUrl,
  type Certificate as CertificateData,
} from "@/app/data/certificates";
import { STARS } from "@/app/features/workshop/floating-shapes";

const FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ede0a8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a001c]";

const PRIMARY = `inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-[#ede0a8] bg-[#ede0a8] px-6 text-[#0c0024] transition-all duration-300 hover:bg-transparent hover:text-[#ede0a8] ${FOCUS}`;
const SECONDARY = `inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-[#2e1a6a] px-6 text-[#edeaf5] transition-colors hover:border-[#9b82e0]/60 ${FOCUS}`;

/** Title, noindex and a print-only page setup while this route is mounted. */
function usePageSetup(cert: CertificateData | null) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = cert ? `${cert.name} · Certificate of participation` : "Certificate not found";
    const robots = document.createElement("meta");
    robots.name = "robots";
    robots.content = "noindex";
    document.head.appendChild(robots);
    return () => {
      document.title = previousTitle;
      robots.remove();
    };
  }, [cert]);
}

/** The certificate itself: A4 landscape, scales with its container, prints at 297×210mm. */
function CertificateSheet({ cert }: { cert: CertificateData }) {
  return (
    <div className="certificate-frame w-full [container-type:inline-size]">
      <article
        aria-label={`Certificate of participation for ${cert.name}`}
        className="certificate-sheet relative w-full overflow-hidden text-[#edeaf5]"
        style={{
          aspectRatio: "297 / 210",
          background:
            "radial-gradient(ellipse at 85% 10%, rgba(155,130,224,0.28) 0%, transparent 45%), radial-gradient(ellipse at 0% 100%, rgba(176,136,40,0.18) 0%, transparent 50%), linear-gradient(160deg, #1c0048 0%, #0f0028 55%, #05000e 100%)",
          borderRadius: "1.2cqw",
        }}
      >
        {/* Gold inner frame */}
        <div className="absolute pointer-events-none" style={{ inset: "2.2cqw", border: "0.12cqw solid rgba(212,168,72,0.55)", borderRadius: "0.6cqw" }} aria-hidden />

        {/* Stars */}
        <div className="absolute inset-0 pointer-events-none" style={{ mixBlendMode: "screen" }} aria-hidden>
          <img src={STARS.glassStar} alt="" className="absolute" style={{ right: "3cqw", top: "2.5cqw", width: "21cqw", rotate: "-8deg" }} />
          <img src={STARS.goldSparkle} alt="" className="absolute" style={{ right: "23cqw", top: "6cqw", width: "6cqw", rotate: "15deg" }} />
          <img src={STARS.sparkle} alt="" className="absolute" style={{ right: "6cqw", bottom: "15cqw", width: "9cqw" }} />
        </div>

        <div className="relative flex h-full flex-col" style={{ padding: "6.5cqw 7cqw 6cqw" }}>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "1.45cqw", letterSpacing: "0.12em", textTransform: "uppercase", color: "#d4a848", fontWeight: 600 }}>
            Certificate of participation
          </p>

          <p className="mt-[3.2cqw]" style={{ fontFamily: "var(--font-sans)", fontSize: "1.7cqw", color: "#a89cc8" }}>
            This certifies that
          </p>
          <h1
            className="mt-[0.8cqw] max-w-[62cqw] [text-wrap:balance]"
            style={{ fontFamily: "var(--font-expanded)", fontSize: "5.6cqw", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.04em" }}
          >
            {cert.name}
          </h1>
          <p className="mt-[2.4cqw] max-w-[60cqw]" style={{ fontFamily: "var(--font-sans)", fontSize: "1.7cqw", color: "#a89cc8", lineHeight: 1.5 }}>
            took part in the live online workshop
          </p>
          <p
            className="mt-[0.6cqw] max-w-[62cqw] [text-wrap:balance]"
            style={{ fontFamily: "var(--font-expanded)", fontSize: "3cqw", fontWeight: 300, lineHeight: 1.15, letterSpacing: "-0.03em" }}
          >
            {cert.course}
          </p>
          <p className="mt-[1.4cqw]" style={{ fontFamily: "var(--font-sans)", fontSize: "1.6cqw", color: "#ede0a8", fontWeight: 600 }}>
            {cert.hours} hours · {cert.cohort} · Live online
          </p>

          <div className="mt-auto grid grid-cols-3 items-end" style={{ gap: "3cqw" }}>
            <div>
              <p style={{ fontFamily: "var(--font-expanded)", fontSize: "2.4cqw", fontWeight: 300, letterSpacing: "-0.03em" }}>{ISSUER}</p>
              <div style={{ height: "0.1cqw", background: "rgba(237,234,245,0.4)", margin: "0.8cqw 0" }} />
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "1.25cqw", color: "#a89cc8" }}>Instructor</p>
            </div>
            <div>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "1.6cqw" }}>{formatIssued(cert.issued)}</p>
              <div style={{ height: "0.1cqw", background: "rgba(237,234,245,0.4)", margin: "0.8cqw 0" }} />
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "1.25cqw", color: "#a89cc8" }}>Date of issue</p>
            </div>
            <div>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "1.6cqw", fontVariantNumeric: "tabular-nums" }}>{cert.id}</p>
              <div style={{ height: "0.1cqw", background: "rgba(237,234,245,0.4)", margin: "0.8cqw 0" }} />
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "1.1cqw", color: "#a89cc8", lineHeight: 1.45 }}>
                Verify at raqper.github.io
                <br />
                {certificateUrl(cert.id).replace(/^https:\/\/[^/]+/, "")}
              </p>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

function PrintStyles() {
  return (
    <style>{`
      @media print {
        @page { size: A4 landscape; margin: 0; }
        html, body { background: #05000e !important; }
        body * { visibility: hidden; }
        .certificate-frame, .certificate-frame * { visibility: visible; }
        .certificate-frame {
          position: fixed; inset: 0; width: 297mm !important; height: 210mm; margin: 0;
          -webkit-print-color-adjust: exact; print-color-adjust: exact;
        }
        .certificate-sheet { border-radius: 0 !important; }
      }
    `}</style>
  );
}

export default function CertificatePage() {
  const { id } = useParams();
  const cert = findCertificate(id);
  const [copied, setCopied] = useState(false);
  usePageSetup(cert);

  const copyLink = async () => {
    if (!cert) return;
    const url = certificateUrl(cert.id);
    try {
      if (navigator.share && window.matchMedia("(pointer: coarse)").matches) {
        await navigator.share({ title: `${cert.name} · Certificate of participation`, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* share sheet dismissed or clipboard blocked: nothing to do */
    }
  };

  return (
    <main id="main-content" className="min-h-screen w-full overflow-x-hidden" style={{ background: "rgb(5 0 14)" }}>
      <PrintStyles />
      <div className="mx-auto w-full max-w-[1200px] px-4 py-6 md:px-10 md:py-10">
        <Link
          to="/workshop"
          className={`inline-flex min-h-[40px] items-center gap-2 rounded-full px-4 text-[#ede0a8] transition-colors hover:text-white ${FOCUS}`}
          style={{ background: "rgba(46,26,106,0.25)", border: "1px solid rgba(46,26,106,0.4)", fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 500 }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M19 12H5" />
            <path d="m12 19-7-7 7-7" />
          </svg>
          Workshop
        </Link>

        {cert ? (
          <>
            <div className="mt-6 md:mt-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-[#a89cc8]" style={{ fontFamily: "var(--font-sans)", fontSize: "14px" }}>
                  Verified certificate · issued by {ISSUER}
                </p>
                <h2
                  className="mt-1 text-[#edeaf5] tracking-[-0.04em] [text-wrap:balance]"
                  style={{ fontFamily: "var(--font-expanded)", fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 700, lineHeight: 1.1 }}
                >
                  {cert.name}
                </h2>
              </div>
              <div className="flex flex-col gap-2.5 sm:flex-row" style={{ fontFamily: "var(--font-sans)", fontSize: "15px", fontWeight: 600 }}>
                <a href={linkedInAddUrl(cert)} target="_blank" rel="noopener noreferrer" className={PRIMARY}>
                  Add to LinkedIn
                </a>
                <button type="button" onClick={() => window.print()} className={SECONDARY}>
                  <Download className="h-4 w-4" aria-hidden />
                  Download PDF
                </button>
                <button type="button" onClick={copyLink} className={SECONDARY} aria-live="polite">
                  {copied ? <Check className="h-4 w-4 text-[#d4a848]" aria-hidden /> : <Link2 className="h-4 w-4" aria-hidden />}
                  {copied ? "Link copied" : "Share link"}
                </button>
              </div>
            </div>

            <div className="mt-6 md:mt-8">
              <CertificateSheet cert={cert} />
            </div>

            <p className="mt-4 text-[#a89cc8]" style={{ fontFamily: "var(--font-sans)", fontSize: "13px", lineHeight: 1.5 }}>
              Download PDF opens your browser's print dialog: choose "Save as PDF". The layout is set to A4 landscape.
            </p>
          </>
        ) : (
          <div className="mt-16 max-w-[560px]">
            <h1
              className="text-[#edeaf5] tracking-[-0.04em]"
              style={{ fontFamily: "var(--font-expanded)", fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 700, lineHeight: 1.1 }}
            >
              Certificate not found
            </h1>
            <p className="mt-3 text-white/85" style={{ fontFamily: "var(--font-sans)", fontSize: "15px", lineHeight: 1.6 }}>
              We couldn't find a certificate with the ID <span className="text-[#ede0a8]">{id}</span>. Check the link in your email, or
              get in touch and I'll sort it out.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
