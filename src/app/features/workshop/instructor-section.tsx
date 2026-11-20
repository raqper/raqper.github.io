import { Link } from "react-router";
import { instructor } from "@/app/data/workshop-data";
// Square, face-centred crop of src/assets/raquel-portrait-2_v2.png (the original is a tall pill shape).
import raquelAvatar from "@/assets/workshop/raquel-avatar.jpg";
import { PRETTY, SectionShell } from "./section-heading";

export function InstructorSection() {
  return (
    <SectionShell id="instructor" labelledBy="instructor-title" background="linear-gradient(180deg, rgb(5 0 14) 0%, #0a001c 100%)">
      <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12 rounded-2xl border border-[#2e1a6a] bg-[#1c0048]/50 p-5 md:p-10">
        <div className="relative h-[132px] w-[132px] md:h-[200px] md:w-[200px] shrink-0 overflow-hidden rounded-full border border-[#2e1a6a] bg-[#130032]">
          <img
            src={raquelAvatar}
            alt={instructor.name}
            width={480}
            height={480}
            loading="lazy"
            draggable={false}
            className="h-full w-full object-cover object-center select-none"
          />
        </div>
        <div className="min-w-0">
          <p className="mb-2 text-[#a89cc8] tracking-[-0.05em]" style={{ fontFamily: "var(--font-sans)", fontSize: "14px" }}>
            Your instructor
          </p>
          <h2
            id="instructor-title"
            className="text-[#edeaf5] tracking-[-0.04em]"
            style={{ fontFamily: "var(--font-expanded)", fontSize: "clamp(24px, 3vw, 40px)", fontWeight: 700, lineHeight: 1.1 }}
          >
            {instructor.name}
          </h2>
          <p
            className={`mt-3 w-full text-white/90 tracking-[-0.02em] ${PRETTY}`}
            style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(15px, 1.15vw, 17px)", lineHeight: 1.6 }}
          >
            {instructor.bio}
          </p>
          <Link
            to="/career#content"
            className="mt-4 inline-flex min-h-[44px] items-center gap-2 text-[#ede0a8] hover:text-white transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ede0a8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a001c]"
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
