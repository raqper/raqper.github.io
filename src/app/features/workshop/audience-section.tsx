import { Check } from "lucide-react";
import { audience } from "@/app/data/workshop-data";
import { SectionHeading, SectionShell } from "./section-heading";

function List({ title, items, tone }: { title: string; items: readonly string[]; tone: "gold" | "purple" }) {
  return (
    <div className="rounded-xl border border-[#2e1a6a] bg-[#1c0048]/60 p-6 md:p-8">
      <h3
        className="text-[#edeaf5] tracking-[-0.03em]"
        style={{ fontFamily: "var(--font-expanded)", fontSize: "clamp(18px, 1.8vw, 22px)", fontWeight: 600 }}
      >
        {title}
      </h3>
      <ul className="mt-5 flex flex-col gap-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <Check className={`mt-1 h-4 w-4 shrink-0 ${tone === "gold" ? "text-[#d4a848]" : "text-[#9b82e0]"}`} aria-hidden />
            <span className="text-white/90 tracking-[-0.02em]" style={{ fontFamily: "var(--font-sans)", fontSize: "15px", lineHeight: 1.55 }}>
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
    <SectionShell
      id="for-you"
      labelledBy="for-you-title"
      background="linear-gradient(180deg, #0a001c 0%, rgb(5 0 14) 100%)"
    >
      <SectionHeading
        id="for-you-title"
        eyebrow="Is it for you"
        title="Built for designers starting out with AI"
        lead="No prior AI or coding experience needed. If you can build a frame in Figma, you can follow along."
      />
      <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <List title="You'll feel at home if" items={audience.fit} tone="gold" />
        <List title="What you need" items={audience.requirements} tone="purple" />
      </div>
      <p className="mt-6 text-[#a89cc8] tracking-[-0.02em] max-w-[880px]" style={{ fontFamily: "var(--font-sans)", fontSize: "14px", lineHeight: 1.55 }}>
        {audience.note}
      </p>
    </SectionShell>
  );
}
