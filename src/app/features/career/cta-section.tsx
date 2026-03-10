import { ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "@/app/components/scroll-reveal";

type CtaVariant = "career" | "portfolio";

const CTA_COPY: Record<CtaVariant, { heading: string; body: string; buttonLabel: string }> = {
  career: {
    heading: "Exploring opportunities",
    body: "Interested in working together? Let's connect on LinkedIn. If you'd like to see my portfolio for a role, I'll send you a magic link.",
    buttonLabel: "Connect on LinkedIn",
  },
  portfolio: {
    heading: "Let's talk",
    body: "Thanks for taking the time to review my work! If you'd like to discuss a role, let's talk more.",
    buttonLabel: "Connect on LinkedIn",
  },
};

export function CtaSection({ variant = "career" }: { variant?: CtaVariant }) {
  const copy = CTA_COPY[variant];

  return (
    <section
      id="contact"
      className="relative pt-10 pb-24 md:pt-16 md:pb-40 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0f0028 0%, #0a001c 40%, rgb(5 0 14) 100%)",
      }}
    >
      {/* Subtle decorative lines */}
      <div className="absolute inset-0 z-[1]">
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: "linear-gradient(to right, transparent, rgba(46,26,106,0.2) 50%, transparent)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background: "linear-gradient(to right, transparent, rgba(176,136,40,0.15) 50%, transparent)",
          }}
        />
      </div>

      <div className="relative z-10 px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto w-full">
        <ScrollReveal offsetY={35} duration={1.4} blur={10}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between items-start gap-10 md:gap-16">
            <div>
              <p
                className="text-[#a89cc8] tracking-[-0.05em] mb-4"
                style={{ fontFamily: "var(--font-sans)", fontSize: "14px" }}
              >
                Contact
              </p>
              <h2
                className="text-[#edeaf5] tracking-[-0.04em]"
                style={{ fontFamily: "var(--font-expanded)", fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 700, lineHeight: 1.1 }}
              >
                {copy.heading}
              </h2>
              <p
                className="text-white tracking-[-0.02em] mt-4"
                style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(14px, 1.2vw, 17px)", lineHeight: 1.55 }}
              >
                {copy.body}
              </p>
            </div>

            <a
              href="https://www.linkedin.com/in/"
              target="_blank"
              rel="noopener noreferrer"
              className="group shrink-0 inline-flex items-center gap-3 bg-[#ede0a8] text-[#0c0024] px-8 py-4 rounded-full border border-[#ede0a8] hover:bg-transparent hover:text-[#ede0a8] transition-all duration-300 hover:shadow-[0_0_30px_rgba(237,224,168,0.15)]"
            >
              <span
                className="tracking-[-0.02em]"
                style={{ fontFamily: "var(--font-sans)", fontSize: "16px", fontWeight: 600 }}
              >
                {copy.buttonLabel}
              </span>
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
