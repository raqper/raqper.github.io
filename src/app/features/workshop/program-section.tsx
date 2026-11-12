import { Check } from "lucide-react";
import { days, formatCallout, workshop } from "@/app/data/workshop-data";
import { BALANCE, PRETTY, SectionHeading, SectionShell } from "./section-heading";

export function ProgramSection() {
  return (
    <SectionShell
      id="program"
      labelledBy="program-title"
      background="linear-gradient(180deg, #0a001c 0%, rgb(5 0 14) 100%)"
    >
      <SectionHeading
        id="program-title"
        eyebrow="Programme"
        title="Three days, hands-on with AI"
        lead={`${workshop.hours} hours, live on Google Meet. Times are ${workshop.timezone}.`}
        star="sparkle"
      />
      <ol className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5">
        {days.map((day) => (
          <li key={day.id} className="flex flex-col rounded-xl border border-[#2e1a6a] bg-[#1c0048]/60 p-5 md:p-7">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[#9b82e0] tracking-[-0.05em]" style={{ fontFamily: "var(--font-sans)", fontSize: "14px" }}>
                Day {day.label}
              </span>
              <span
                className="rounded-full border px-2.5 py-1 bg-[#b08828]/15 text-[#d4a848] border-[#b08828]/30"
                style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 500, lineHeight: 1 }}
              >
                {day.when}
              </span>
            </div>
            <h3
              className={`mt-5 md:mt-8 text-[#edeaf5] tracking-[-0.03em] ${BALANCE}`}
              style={{ fontFamily: "var(--font-expanded)", fontSize: "clamp(20px, 1.8vw, 24px)", fontWeight: 600, lineHeight: 1.2 }}
            >
              {day.title}
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {day.bullets.map((b) => (
                <li key={b} className="flex gap-2.5">
                  <Check className="mt-[3px] h-4 w-4 shrink-0 text-[#d4a848]" aria-hidden />
                  <span className={`text-white/90 tracking-[-0.02em] ${PRETTY}`} style={{ fontFamily: "var(--font-sans)", fontSize: "15px", lineHeight: 1.45 }}>
                    {b}
                  </span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
      <p
        className="mt-6 md:mt-8 rounded-full border border-[#b08828]/30 bg-[#b08828]/10 px-5 py-3 text-center text-[#ede0a8] tracking-[-0.02em] md:inline-block"
        style={{ fontFamily: "var(--font-sans)", fontSize: "14px", fontWeight: 500 }}
      >
        {formatCallout}
      </p>
    </SectionShell>
  );
}
