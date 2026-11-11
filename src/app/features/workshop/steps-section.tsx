import { motion } from "motion/react";
import { steps } from "@/app/data/workshop-data";
import { DriftingShape } from "./floating-shapes";
import { SectionHeading, SectionShell } from "./section-heading";

export function StepsSection() {
  return (
    <SectionShell
      id="steps"
      labelledBy="steps-title"
      background="linear-gradient(180deg, rgb(5 0 14) 0%, #0a001c 30%, #0f0028 70%, #0a001c 100%)"
    >
      <DriftingShape variant="b" className="-top-6 right-[2%] w-[220px] lg:w-[280px]" />
      <SectionHeading
        id="steps-title"
        eyebrow="The workflow"
        title="Eight steps, from setup to vibe coding"
        lead="The same checklist I use on real projects. You do every step yourself, with Claude doing the heavy lifting and you making the decisions."
      />
      <ol className="mt-10 md:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
        {steps.map((step, index) => (
          <motion.li
            key={step.id}
            initial={{ opacity: 0, y: 25, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: (index % 4) * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col rounded-xl border border-[#2e1a6a] bg-[#1c0048]/60 p-5 md:p-6"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-[#9b82e0] tracking-[-0.05em]" style={{ fontFamily: "var(--font-sans)", fontSize: "14px" }}>
                {step.id}
              </span>
              <span
                className={`rounded-full border px-2.5 py-1 ${
                  step.day.startsWith("Before")
                    ? "bg-[#2e1a6a]/20 text-[#9b82e0] border-[#2e1a6a]/40"
                    : "bg-[#b08828]/15 text-[#d4a848] border-[#b08828]/30"
                }`}
                style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 500, lineHeight: 1 }}
              >
                {step.day}
              </span>
            </div>
            <h3
              className="mt-6 text-[#edeaf5] tracking-[-0.03em]"
              style={{ fontFamily: "var(--font-expanded)", fontSize: "clamp(18px, 1.6vw, 22px)", fontWeight: 600, lineHeight: 1.25 }}
            >
              {step.title}
            </h3>
            <p className="mt-2 text-white/85 tracking-[-0.02em]" style={{ fontFamily: "var(--font-sans)", fontSize: "14px", lineHeight: 1.55 }}>
              {step.body}
            </p>
          </motion.li>
        ))}
      </ol>
    </SectionShell>
  );
}
