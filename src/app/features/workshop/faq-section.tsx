import { faq } from "@/app/data/workshop-data";
import { PRETTY, SectionHeading, SectionShell } from "./section-heading";

export function FaqSection() {
  return (
    <SectionShell
      id="faq"
      labelledBy="faq-title"
      background="linear-gradient(180deg, rgb(5 0 14) 0%, #0a001c 40%, #0f0028 100%)"
    >
      <SectionHeading id="faq-title" eyebrow="FAQ" title="Questions, answered" />
      <div className="mt-8 md:mt-14 border-t border-[#2e1a6a]">
        {faq.map((item) => (
          <details key={item.q} className="group border-b border-[#2e1a6a]">
            <summary
              className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 md:py-6 hover:bg-[#1c0048]/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ede0a8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f0028] [&::-webkit-details-marker]:hidden"
            >
              <span
                className="text-[#edeaf5] tracking-[-0.03em]"
                style={{ fontFamily: "var(--font-expanded)", fontSize: "clamp(16px, 1.6vw, 20px)", fontWeight: 600, lineHeight: 1.3 }}
              >
                {item.q}
              </span>
              <svg
                className="h-5 w-5 shrink-0 text-[#a89cc8] transition-transform group-open:rotate-45"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </summary>
            <p className={`pb-6 pr-10 text-white/90 tracking-[-0.02em] max-w-[880px] ${PRETTY}`} style={{ fontFamily: "var(--font-sans)", fontSize: "15px", lineHeight: 1.6 }}>
              {item.a}
            </p>
          </details>
        ))}
      </div>
    </SectionShell>
  );
}
