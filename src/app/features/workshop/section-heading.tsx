import type { ReactNode } from "react";
import { InlineStar, type StarName } from "./floating-shapes";

/** Even line lengths for headings; no single-word last lines for body copy. */
export const BALANCE = "[text-wrap:balance]";
export const PRETTY = "[text-wrap:pretty]";

/** Eyebrow + H2 + lead, matching the career section headings. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  id,
  star,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  id?: string;
  star?: StarName;
}) {
  return (
    <div>
      <div className="mb-3 md:mb-4 flex items-center gap-2">
        {star && <InlineStar name={star} className="w-9 md:w-12 -ml-1" />}
        <p className="text-[#a89cc8] tracking-[-0.05em]" style={{ fontFamily: "var(--font-sans)", fontSize: "14px" }}>
          {eyebrow}
        </p>
      </div>
      <h2
        id={id}
        className={`max-w-[1040px] text-[#edeaf5] tracking-[-0.04em] ${BALANCE}`}
        style={{
          fontFamily: "var(--font-expanded)",
          fontSize: "clamp(26px, 3.5vw, 48px)",
          fontWeight: 700,
          lineHeight: 1.1,
        }}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={`mt-4 max-w-[680px] text-white tracking-[-0.02em] ${PRETTY}`}
          style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(15px, 1.2vw, 17px)", lineHeight: 1.55 }}
        >
          {lead}
        </p>
      )}
    </div>
  );
}

/** Standard section container used across the career look. */
export function SectionShell({
  id,
  children,
  background,
  className = "",
  labelledBy,
}: {
  id: string;
  children: ReactNode;
  background: string;
  className?: string;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`relative overflow-hidden border-t scroll-mt-16 ${className}`}
      style={{ borderColor: "rgba(46,26,106,0.25)", background }}
    >
      <div className="relative px-5 md:px-10 pt-12 pb-12 md:pt-24 md:pb-24">
        <div className="max-w-[1400px] mx-auto w-full">{children}</div>
      </div>
    </section>
  );
}
