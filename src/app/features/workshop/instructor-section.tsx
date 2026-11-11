import { Link } from "react-router";
import raquelPortrait from "@/assets/raquel-portrait-2_v2.png";
import { SectionShell } from "./section-heading";

export function InstructorSection() {
  return (
    <SectionShell
      id="instructor"
      labelledBy="instructor-title"
      background="linear-gradient(180deg, #0a001c 0%, rgb(5 0 14) 100%)"
    >
      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-10 md:gap-16 items-center">
        <div className="relative mx-auto w-full max-w-[360px] md:max-w-none">
          <img
            src={raquelPortrait}
            alt="Raquel Pereira"
            loading="lazy"
            className="w-full h-auto object-contain select-none"
            draggable={false}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-1/3"
            style={{ background: "linear-gradient(to bottom, transparent, rgb(5 0 14))" }}
            aria-hidden
          />
        </div>
        <div>
          <p className="mb-4 text-[#a89cc8] tracking-[-0.05em]" style={{ fontFamily: "var(--font-sans)", fontSize: "14px" }}>
            Your instructor
          </p>
          <h2
            id="instructor-title"
            className="text-[#edeaf5] tracking-[-0.04em]"
            style={{ fontFamily: "var(--font-expanded)", fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 700, lineHeight: 1.1 }}
          >
            Raquel Pereira
          </h2>
          <p className="mt-4 text-white tracking-[-0.02em]" style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(14px, 1.2vw, 17px)", lineHeight: 1.6 }}>
            Designer since 2017, now focused on AI-ready design systems and design operations. I teach design systems
            courses, speak at Friends of Figma and Into Design Systems events, and run hands-on sessions on Claude and
            Figma. This workshop is the workflow I use every day, broken down so you can follow it from your first
            prompt.
          </p>
          <Link
            to="/career"
            className="mt-6 inline-flex items-center gap-2 text-[#ede0a8] hover:text-white transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ede0a8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a001c]"
            style={{ fontFamily: "var(--font-sans)", fontSize: "15px", fontWeight: 600 }}
          >
            See my talks and experience
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
            </svg>
          </Link>
        </div>
      </div>
    </SectionShell>
  );
}
