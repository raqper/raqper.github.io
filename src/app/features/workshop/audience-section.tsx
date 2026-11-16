import { Check } from "lucide-react";
import { personas, readiness, requirements, requirementsNote } from "@/app/data/workshop-data";
import { InlineStar, type StarName } from "./floating-shapes";
import { BALANCE, PRETTY, SectionHeading, SectionShell } from "./section-heading";

const CARD_STARS: StarName[] = ["fluffyStar", "glassStar", "sparkle"];

const SANS = { fontFamily: "var(--font-sans)" } as const;

function CheckList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="text-[#ede0a8] tracking-[-0.02em]" style={{ ...SANS, fontSize: "15px", fontWeight: 600 }}>
        {title}
      </h3>
      <ul className="mt-3 flex flex-col gap-2.5">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5">
            <Check className="mt-[3px] h-4 w-4 shrink-0 text-[#d4a848]" aria-hidden />
            <span className={`text-white/90 tracking-[-0.02em] ${PRETTY}`} style={{ ...SANS, fontSize: "15px", lineHeight: 1.45 }}>
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function AudienceSection() {
  return (
    <SectionShell id="for-you" labelledBy="for-you-title" background="linear-gradient(180deg, rgb(5 0 14) 0%, #0a001c 100%)">
      <SectionHeading
        id="for-you-title"
        eyebrow="Who it's for"
        title="Designers who want to feel confident using AI in their design workflow"
      />
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
              <p className={`mt-2 text-white/85 tracking-[-0.02em] ${PRETTY}`} style={{ ...SANS, fontSize: "15px", lineHeight: 1.55 }}>
                {p.body}
              </p>
            </div>
          </li>
        ))}
      </ul>

      {/* Entry criteria: what you need to know and what you need to bring. */}
      <div className="mt-5 md:mt-6 rounded-xl border border-[#b08828]/35 bg-[#b08828]/[0.07] p-5 md:p-7">
        <p className="text-[#a89cc8] tracking-[-0.05em]" style={{ ...SANS, fontSize: "14px" }}>
          Before you join
        </p>
        <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10">
          <CheckList title="You're ready if" items={readiness} />
          <CheckList title="You'll need" items={requirements} />
        </div>
        <p
          className={`mt-5 border-t border-[#b08828]/25 pt-4 text-[#ede0a8]/90 tracking-[-0.02em] ${PRETTY}`}
          style={{ ...SANS, fontSize: "14px", lineHeight: 1.5 }}
        >
          {requirementsNote}
        </p>
      </div>
    </SectionShell>
  );
}
