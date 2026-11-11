import type { ReactNode } from "react";

/** Eyebrow + H2 + lead, matching the career section headings. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  id,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  id?: string;
}) {
  return (
    <div className="max-w-[760px]">
      <p
        className="mb-4 text-[#a89cc8] tracking-[-0.05em]"
        style={{ fontFamily: "var(--font-sans)", fontSize: "14px" }}
      >
        {eyebrow}
      </p>
      <h2
        id={id}
        className="text-[#edeaf5] tracking-[-0.04em]"
        style={{
          fontFamily: "var(--font-expanded)",
          fontSize: "clamp(28px, 3.5vw, 48px)",
          fontWeight: 700,
          lineHeight: 1.1,
        }}
      >
        {title}
      </h2>
      {lead && (
        <p
          className="mt-4 text-white tracking-[-0.02em]"
          style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(14px, 1.2vw, 17px)", lineHeight: 1.55 }}
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
      className={`relative overflow-hidden border-t scroll-mt-20 ${className}`}
      style={{ borderColor: "rgba(46,26,106,0.25)", background }}
    >
      <div className="relative z-10 px-6 md:px-10 pt-16 pb-16 md:pt-24 md:pb-24">
        <div className="max-w-[1400px] mx-auto w-full">{children}</div>
      </div>
    </section>
  );
}
