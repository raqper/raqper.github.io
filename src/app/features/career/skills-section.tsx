import { useState, useRef } from "react";
import { motion } from "motion/react";
import { ScrollReveal } from "@/app/components/scroll-reveal";
import { skills, toolLogos } from "@/app/data/skills-data";

export function SkillsSection() {
  const [expandedSkill, setExpandedSkill] = useState<
    string | null
  >(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-20 md:py-32 overflow-hidden"
      style={{ background: "linear-gradient(180deg, rgb(5 0 14) 0%, #0a001c 20%, #0f0028 60%, #0f0028 100%)" }}
    >
      {/* Subtle gradient accent glow */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] opacity-[0.04] pointer-events-none z-[1]"
        style={{
          background:
            "radial-gradient(circle, rgba(46,26,106,1) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto w-full">
        {/* Section Header */}
 <ScrollReveal className="pb-[28px]" offsetY={30} duration={1.4}>
            <p
              className="text-[#a89cc8] tracking-[-0.05em] mb-4"
              style={{ fontFamily: "var(--font-sans)", fontSize: "14px" }}
            >
              Skills
            </p>
            <h2
              className="text-[#edeaf5] tracking-[-0.04em]"
              style={{ fontFamily: "var(--font-expanded)", fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 700, lineHeight: 1.1 }}
            >
              Applying craft and leadership
            </h2>
            <p
              className="text-white tracking-[-0.02em] mt-4"
              style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(14px, 1.2vw, 17px)", lineHeight: 1.55 }}
            >
              Combining hands-on execution with strategic influence to align teams, systems, and product direction.
            </p>
          </ScrollReveal>

        {/* Tools Marquee */}
        <div className="marquee-tools-wrap relative overflow-hidden py-8 mb-6">
          <div className="marquee-tools-track flex items-center gap-14 w-max">
            {[...toolLogos, ...toolLogos].map((tool, i) => (
              <div
                key={`${tool.name}-${i}`}
                className="flex flex-col items-center gap-2"
                aria-hidden
              >
                <img
                  src={tool.src}
                  alt=""
                  className="h-8 w-auto object-contain"
                  draggable={false}
                />
                <span
                  className="text-white whitespace-nowrap"
                  style={{ fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.02em" }}
                >
                  {tool.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Skills List */}
        <div className="border-t border-[#2e1a6a]">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 25, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.9,
                delay: index * 0.08,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="border-b border-[#2e1a6a] group cursor-pointer hover:bg-[#1c0048]/50 transition-colors"
              onClick={() =>
                setExpandedSkill(
                  expandedSkill === skill.id ? null : skill.id,
                )
              }
            >
              <div className="flex items-center justify-between py-5 md:py-7">
                <div className="flex items-center gap-6 md:gap-10">
                  <span
                    className="text-[#2e1a6a] tracking-[-0.05em]"
                    style={{ fontFamily: "var(--font-sans)", fontSize: "14px" }}
                  >
                    {skill.id}
                  </span>
                  <h3
                    className="text-[#edeaf5] tracking-[-0.03em] group-hover:text-[#d4c8e8] transition-colors"
                    style={{ fontFamily: "var(--font-expanded)", fontSize: "clamp(18px, 2vw, 24px)", fontWeight: 600, lineHeight: "1.3" }}
                  >
                    {skill.name}
                  </h3>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    role="tag"
                    aria-label={`Category: ${skill.category}`}
                    className={`capitalize tracking-[-0.03em] px-2.5 py-1 rounded-full border ${
                      skill.category === "hard"
                        ? "bg-[#2e1a6a]/20 text-[#9b82e0] border-[#2e1a6a]/40"
                        : "bg-[#b08828]/15 text-[#d4a848] border-[#b08828]/30"
                    }`}
                    style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 500, lineHeight: "1" }}
                  >
                    {skill.category}
                  </span>
                  <svg
                    className={`w-5 h-5 text-[#a89cc8] transition-transform ${expandedSkill === skill.id ? "rotate-45" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </div>
              </div>
              {expandedSkill === skill.id && (
                <div className="pb-6 md:pb-8 pl-6 md:pl-16 pr-6">
                  <p
                    className="text-white max-w-full tracking-[-0.02em]"
                    style={{ fontFamily: "var(--font-sans)", fontSize: "16px", fontWeight: 400, lineHeight: "26px" }}
                  >
                    {skill.description}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
