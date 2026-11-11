import { glossary, takeaways } from "@/app/data/workshop-data";
import { SectionHeading, SectionShell } from "./section-heading";

export function TakeawaysSection() {
  return (
    <SectionShell
      id="takeaways"
      labelledBy="takeaways-title"
      background="linear-gradient(180deg, rgb(5 0 14) 0%, #0a001c 30%, #0f0028 70%, #0a001c 100%)"
    >
      <SectionHeading id="takeaways-title" eyebrow="What you leave with" title="Real work, not just notes" />
      <ul className="mt-10 md:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
        {takeaways.map((item, i) => (
          <li key={item.title} className="rounded-xl border border-[#2e1a6a] bg-[#1c0048]/60 p-5 md:p-6">
            <span className="text-[#9b82e0] tracking-[-0.05em]" style={{ fontFamily: "var(--font-sans)", fontSize: "14px" }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3
              className="mt-4 text-[#edeaf5] tracking-[-0.03em]"
              style={{ fontFamily: "var(--font-expanded)", fontSize: "clamp(17px, 1.5vw, 20px)", fontWeight: 600, lineHeight: 1.25 }}
            >
              {item.title}
            </h3>
            <p className="mt-2 text-white/85 tracking-[-0.02em]" style={{ fontFamily: "var(--font-sans)", fontSize: "14px", lineHeight: 1.55 }}>
              {item.body}
            </p>
          </li>
        ))}
      </ul>

      {/* Beginner glossary */}
      <div className="mt-16 md:mt-24">
        <SectionHeading
          eyebrow="No jargon left behind"
          title="Words you'll understand by Sunday"
          lead="Each one is explained in plain English the first time we use it."
        />
        <dl className="mt-8 md:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-[#2e1a6a]">
          {glossary.map((g) => (
            <div key={g.term} className="flex flex-col gap-1 border-b border-[#2e1a6a] py-4 sm:pr-6">
              <dt className="text-[#ede0a8] tracking-[-0.02em]" style={{ fontFamily: "var(--font-sans)", fontSize: "15px", fontWeight: 600 }}>
                {g.term}
              </dt>
              <dd className="text-white/85 tracking-[-0.02em]" style={{ fontFamily: "var(--font-sans)", fontSize: "14px", lineHeight: 1.5 }}>
                {g.meaning}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </SectionShell>
  );
}
