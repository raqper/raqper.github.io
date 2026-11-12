import { personas, requirementsLine } from "@/app/data/workshop-data";
import { InlineStar, type StarName } from "./floating-shapes";
import { BALANCE, PRETTY, SectionHeading, SectionShell } from "./section-heading";

const CARD_STARS: StarName[] = ["fluffyStar", "glassStar", "sparkle"];

export function AudienceSection() {
  return (
    <SectionShell id="for-you" labelledBy="for-you-title" background="linear-gradient(180deg, rgb(5 0 14) 0%, #0a001c 100%)">
      <SectionHeading id="for-you-title" eyebrow="Who it's for" title="Designers taking their first real steps with AI" />
      <ul className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5">
        {personas.map((p, i) => (
          <li key={p.title} className="relative flex gap-4 md:flex-col rounded-xl border border-[#2e1a6a] bg-[#1c0048]/60 p-5 md:p-6">
            <InlineStar name={CARD_STARS[i % CARD_STARS.length]} className="w-12 md:w-16 shrink-0 self-start" />
            <div>
              <h3
                className={`text-[#edeaf5] tracking-[-0.03em] ${BALANCE}`}
                style={{ fontFamily: "var(--font-expanded)", fontSize: "clamp(17px, 1.6vw, 20px)", fontWeight: 600, lineHeight: 1.25 }}
              >
                {p.title}
              </h3>
              <p className={`mt-2 text-white/85 tracking-[-0.02em] ${PRETTY}`} style={{ fontFamily: "var(--font-sans)", fontSize: "15px", lineHeight: 1.55 }}>
                {p.body}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <p className={`mt-5 md:mt-6 text-[#a89cc8] tracking-[-0.02em] max-w-[760px] lg:max-w-none ${PRETTY}`} style={{ fontFamily: "var(--font-sans)", fontSize: "14px", lineHeight: 1.55 }}>
        {requirementsLine}
      </p>
    </SectionShell>
  );
}
