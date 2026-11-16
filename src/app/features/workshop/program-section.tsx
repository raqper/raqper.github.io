import type { ReactNode } from "react";
import { Check, MessagesSquare, Users, Video } from "lucide-react";
import { days, formatNotes, prep, workshop } from "@/app/data/workshop-data";
import { BALANCE, PRETTY, SectionHeading, SectionShell } from "./section-heading";

const SANS = { fontFamily: "var(--font-sans)" } as const;
const NOTE_ICONS = [Video, MessagesSquare, Users];

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {items.map((b) => (
        <li key={b} className="flex gap-2.5">
          <Check className="mt-[3px] h-4 w-4 shrink-0 text-[#d4a848]" aria-hidden />
          <span className={`text-white/90 tracking-[-0.02em] ${PRETTY}`} style={{ ...SANS, fontSize: "15px", lineHeight: 1.45 }}>
            {b}
          </span>
        </li>
      ))}
    </ul>
  );
}

function DateChip({ children }: { children: ReactNode }) {
  return (
    <span
      className="shrink-0 rounded-full border px-2.5 py-1 bg-[#b08828]/15 text-[#d4a848] border-[#b08828]/30"
      style={{ ...SANS, fontSize: "11px", fontWeight: 500, lineHeight: 1 }}
    >
      {children}
    </span>
  );
}

export function ProgramSection() {
  return (
    <SectionShell
      id="program"
      labelledBy="program-title"
      background="linear-gradient(180deg, #0a001c 0%, rgb(5 0 14) 100%)"
    >
      <SectionHeading
        id="program-title"
        eyebrow="Agenda"
        title="Three sessions, hands-on with AI"
        lead={`${workshop.hours} hours over ${workshop.sessions} live sessions on Google Meet, in ${workshop.language}. Times are ${workshop.timezone}.`}
        star="sparkle"
      />

      {/* Pre-workshop prep: full width, set apart from the live days. */}
      <div className="mt-8 md:mt-12 rounded-xl border border-[#b08828]/40 bg-[#b08828]/[0.07] p-5 md:p-7 md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-10">
        <div>
          <div className="flex items-center justify-between gap-3 md:justify-start">
            <span className="text-[#d4a848] tracking-[-0.05em]" style={{ ...SANS, fontSize: "14px" }}>
              {prep.label}
            </span>
            <DateChip>{prep.when}</DateChip>
          </div>
          <h3
            className={`mt-4 md:mt-6 text-[#edeaf5] tracking-[-0.03em] ${BALANCE}`}
            style={{ fontFamily: "var(--font-expanded)", fontSize: "clamp(20px, 1.8vw, 24px)", fontWeight: 600, lineHeight: 1.2 }}
          >
            {prep.title}
          </h3>
          <p className={`mt-2 max-w-[520px] text-white/85 tracking-[-0.02em] ${PRETTY}`} style={{ ...SANS, fontSize: "15px", lineHeight: 1.55 }}>
            {prep.body}
          </p>
        </div>
        <div className="mt-5 md:mt-0 md:self-end">
          <Bullets items={prep.bullets} />
        </div>
      </div>

      <ol className="mt-3 md:mt-5 grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5">
        {days.map((day) => (
          <li key={day.id} className="flex flex-col rounded-xl border border-[#2e1a6a] bg-[#1c0048]/60 p-5 md:p-7">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[#9b82e0] tracking-[-0.05em]" style={{ ...SANS, fontSize: "14px" }}>
                Day {day.label}
              </span>
              <DateChip>{day.when}</DateChip>
            </div>
            <h3
              className={`mt-5 md:mt-8 text-[#edeaf5] tracking-[-0.03em] ${BALANCE}`}
              style={{ fontFamily: "var(--font-expanded)", fontSize: "clamp(20px, 1.8vw, 24px)", fontWeight: 600, lineHeight: 1.2 }}
            >
              {day.title}
            </h3>
            <div className="mt-4">
              <Bullets items={day.bullets} />
            </div>
          </li>
        ))}
      </ol>

      <ul className="mt-6 md:mt-8 flex flex-wrap gap-x-6 gap-y-2.5">
        {formatNotes.map((note, i) => {
          const Icon = NOTE_ICONS[i % NOTE_ICONS.length];
          return (
            <li key={note} className="flex items-center gap-2 text-[#a89cc8] tracking-[-0.02em]" style={{ ...SANS, fontSize: "14px" }}>
              <Icon className="h-4 w-4 text-[#9b82e0]" aria-hidden />
              {note}
            </li>
          );
        })}
      </ul>
    </SectionShell>
  );
}
