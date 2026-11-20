import { useEffect, type ReactNode } from "react";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/app/components/footer";
import { sellerComplete } from "@/app/data/workshop-data";

export type LegalSection = { id: string; title: string; content: ReactNode };

const SANS = { fontFamily: "var(--font-sans)" } as const;

/** Swap document title and description while a legal page is mounted. */
function usePageMeta(title: string, description: string) {
  useEffect(() => {
    // Arriving from a footer link keeps the old scroll position; start at the top unless a section is linked.
    if (!window.location.hash) window.scrollTo(0, 0);
    const previousTitle = document.title;
    document.title = title;
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousDescription = meta?.content;
    if (meta) meta.content = description;
    return () => {
      document.title = previousTitle;
      if (meta && previousDescription !== undefined) meta.content = previousDescription;
    };
  }, [title, description]);
}

/** Long-form legal page in the site's dark look: title, contents list, numbered sections. */
export function LegalPage({
  title,
  metaTitle,
  description,
  updated,
  intro,
  back,
  sections,
  footnote,
}: {
  title: string;
  metaTitle: string;
  description: string;
  updated: string;
  intro: ReactNode;
  back: { to: string; label: string };
  sections: LegalSection[];
  /** Small fold-out "Legal details" block at the very end, outside the numbered sections. */
  footnote?: ReactNode;
}) {
  usePageMeta(metaTitle, description);
  const all = sections;

  return (
    <main id="main-content" className="w-full min-h-screen overflow-x-hidden" style={{ background: "var(--p-bg-base)" }}>
      <div className="mx-auto w-full max-w-[820px] px-4 pb-20 pt-10 md:px-10 md:pt-16 text-[#edeaf5]">
        <Link
          to={back.to}
          className="inline-flex items-center gap-2 text-[#a89cc8] transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ede0a8] rounded"
          style={{ ...SANS, fontSize: "14px" }}
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          {back.label}
        </Link>

        <h1
          className="mt-6 tracking-[-0.04em] [text-wrap:balance]"
          style={{ fontFamily: "var(--font-expanded)", fontSize: "clamp(30px, 4.5vw, 52px)", fontWeight: 700, lineHeight: 1.08 }}
        >
          {title}
        </h1>
        <p className="mt-3 text-[#a89cc8]" style={{ ...SANS, fontSize: "14px" }}>
          Last updated {updated}
        </p>

        {!sellerComplete && import.meta.env.DEV && (
          <p className="mt-4 rounded-md border border-dashed border-[#d4a848]/60 px-3 py-2 text-[#d4a848]" style={{ ...SANS, fontSize: "13px" }}>
            Dev only: seller NIF, address or email still say TODO in workshop-data.ts. Fill them in before going live.
          </p>
        )}

        <div className="legal-prose mt-6 text-white/90" style={{ ...SANS, fontSize: "16px", lineHeight: 1.65 }}>
          {intro}
        </div>

        <nav aria-label="Contents" className="mt-8 rounded-xl border border-[#2e1a6a] bg-[#1c0048]/40 p-5">
          <p className="text-[#a89cc8]" style={{ ...SANS, fontSize: "13px" }}>
            Contents
          </p>
          <ol className="mt-2 grid gap-1 sm:grid-cols-2" style={{ ...SANS, fontSize: "14px" }}>
            {all.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="text-white/85 underline-offset-2 hover:text-[#ede0a8] hover:underline">
                  {i + 1}. {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <style>{`
          .legal-prose p + p, .legal-prose p + ul, .legal-prose ul + p { margin-top: 0.85em; }
          .legal-prose ul { list-style: disc; padding-left: 1.25em; }
          .legal-prose li + li { margin-top: 0.35em; }
          .legal-prose a { color: #ede0a8; text-decoration: underline; text-underline-offset: 2px; }
          .legal-prose strong { color: #fff; font-weight: 600; }
          .legal-section { scroll-margin-top: 24px; }
        `}</style>

        {all.map((s, i) => (
          <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className="legal-section mt-10 border-t border-[#2e1a6a] pt-8">
            <h2
              id={`${s.id}-title`}
              className="tracking-[-0.03em] [text-wrap:balance]"
              style={{ fontFamily: "var(--font-expanded)", fontSize: "clamp(20px, 2.2vw, 26px)", fontWeight: 700, lineHeight: 1.2 }}
            >
              {`${i + 1}. `}
              {s.title}
            </h2>
            <div className="legal-prose mt-3 text-white/90 [text-wrap:pretty]" style={{ ...SANS, fontSize: "16px", lineHeight: 1.65 }}>
              {s.content}
            </div>
          </section>
        ))}

        {footnote && (
          <details className="group mt-12 border-t border-[#2e1a6a] pt-6 text-[#a89cc8]">
            <summary
              className="inline-flex cursor-pointer list-none items-center gap-1.5 rounded hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ede0a8] [&::-webkit-details-marker]:hidden"
              style={{ ...SANS, fontSize: "13px", fontWeight: 600 }}
            >
              Legal details
              <span aria-hidden className="transition-transform group-open:rotate-90">
                ▸
              </span>
            </summary>
            <div className="legal-prose mt-4 text-white/75" style={{ ...SANS, fontSize: "14px", lineHeight: 1.6 }}>
              {footnote}
            </div>
          </details>
        )}
      </div>
      <Footer />
    </main>
  );
}
