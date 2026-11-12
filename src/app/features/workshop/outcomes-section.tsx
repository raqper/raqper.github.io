import { outcomes } from "@/app/data/workshop-data";
import { BALANCE, PRETTY, SectionHeading, SectionShell } from "./section-heading";

export function OutcomesSection() {
  return (
    <SectionShell
      id="outcomes"
      labelledBy="outcomes-title"
      background="linear-gradient(180deg, #0a001c 0%, #0f0028 60%, #0a001c 100%)"
    >
      <SectionHeading id="outcomes-title" eyebrow="What you'll build" title="Real work you can show" star="goldSparkle" />
      <ul className="mt-8 md:mt-12 grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
        {outcomes.map((item, i) => (
          <li key={item.title} className="rounded-xl border border-[#2e1a6a] bg-[#1c0048]/60 p-4 md:p-6">
            <span className="text-[#9b82e0] tracking-[-0.05em]" style={{ fontFamily: "var(--font-sans)", fontSize: "13px" }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3
              className={`mt-3 md:mt-6 text-[#edeaf5] tracking-[-0.03em] ${BALANCE}`}
              style={{ fontFamily: "var(--font-expanded)", fontSize: "clamp(15px, 1.5vw, 20px)", fontWeight: 600, lineHeight: 1.25 }}
            >
              {item.title}
            </h3>
            <p className={`mt-2 text-white/80 tracking-[-0.02em] ${PRETTY}`} style={{ fontFamily: "var(--font-sans)", fontSize: "14px", lineHeight: 1.5 }}>
              {item.body}
            </p>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
