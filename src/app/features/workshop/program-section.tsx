import { useState } from "react";
import { program, workshop } from "@/app/data/workshop-data";
import { DriftingShape } from "./floating-shapes";
import { SectionHeading, SectionShell } from "./section-heading";

const FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ede0a8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f0028]";

export function ProgramSection() {
  const [open, setOpen] = useState<string | null>(program[0].id);

  return (
    <SectionShell
      id="program"
      labelledBy="program-title"
      background="linear-gradient(180deg, #0a001c 0%, #0f0028 40%, #0a001c 100%)"
    >
      <DriftingShape variant="a" className="top-10 -right-10 w-[240px] lg:w-[300px]" />
      <SectionHeading
        id="program-title"
        eyebrow="Programme"
        title="Three live sessions, one design system"
        lead={`${workshop.hours} hours in total, ${workshop.format}. Times are ${workshop.timezone}. Every term is explained the moment you first need it.`}
      />

      <div className="mt-10 md:mt-14 border-t border-[#2e1a6a]">
        {program.map((day) => {
          const isOpen = open === day.id;
          const panelId = `${day.id}-panel`;
          return (
            <div key={day.id} className="border-b border-[#2e1a6a]">
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? null : day.id)}
                  className={`group w-full flex items-center justify-between gap-4 py-5 md:py-7 text-left hover:bg-[#1c0048]/40 transition-colors ${FOCUS}`}
                >
                  <span className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 md:gap-10">
                    <span className="text-[#9b82e0] tracking-[-0.05em]" style={{ fontFamily: "var(--font-sans)", fontSize: "14px" }}>
                      {day.label}
                    </span>
                    <span
                      className="text-[#edeaf5] tracking-[-0.03em] group-hover:text-[#d4c8e8] transition-colors"
                      style={{ fontFamily: "var(--font-expanded)", fontSize: "clamp(18px, 2vw, 24px)", fontWeight: 600, lineHeight: 1.3 }}
                    >
                      {day.title}
                    </span>
                  </span>
                  <span className="flex items-center gap-4">
                    <span
                      className="hidden sm:inline rounded-full border px-2.5 py-1 bg-[#b08828]/15 text-[#d4a848] border-[#b08828]/30"
                      style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 500, lineHeight: 1 }}
                    >
                      {day.when}
                    </span>
                    <svg
                      className={`w-5 h-5 shrink-0 text-[#a89cc8] transition-transform ${isOpen ? "rotate-45" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  </span>
                </button>
              </h3>
              <div id={panelId} hidden={!isOpen} className="pb-8 md:pb-10 md:pl-[88px]">
                <p className="sm:hidden mb-4 text-[#d4a848]" style={{ fontFamily: "var(--font-sans)", fontSize: "13px" }}>
                  {day.when}
                </p>
                <ul className="flex flex-col">
                  {day.blocks.map((block) => (
                    <li
                      key={block.time}
                      className={`grid grid-cols-[56px_1fr] md:grid-cols-[72px_220px_1fr] gap-x-4 gap-y-1 py-3 border-t border-[#2e1a6a]/50 first:border-t-0 ${
                        block.isBreak ? "opacity-60" : ""
                      }`}
                    >
                      <span className="text-[#a89cc8] tabular-nums" style={{ fontFamily: "var(--font-sans)", fontSize: "14px" }}>
                        {block.time}
                      </span>
                      <span className="text-[#edeaf5] tracking-[-0.02em]" style={{ fontFamily: "var(--font-sans)", fontSize: "15px", fontWeight: 600 }}>
                        {block.title}
                      </span>
                      {block.detail && (
                        <span
                          className="col-start-2 md:col-start-3 text-white/85 tracking-[-0.02em]"
                          style={{ fontFamily: "var(--font-sans)", fontSize: "14px", lineHeight: 1.55 }}
                        >
                          {block.detail}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-[#d4a848] tracking-[-0.02em]" style={{ fontFamily: "var(--font-sans)", fontSize: "14px", lineHeight: 1.55 }}>
                  <span style={{ fontWeight: 600 }}>Stretch task for mid-level:</span> {day.stretch}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </SectionShell>
  );
}
