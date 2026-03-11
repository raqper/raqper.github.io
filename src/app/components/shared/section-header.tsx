interface SectionHeaderProps {
  title: string;
  children?: React.ReactNode;
}

export function SectionHeader({ title, children }: SectionHeaderProps) {
  return (
    <div className="flex items-end justify-between gap-4 mb-12">
      <div>
        <h2
          style={{
            fontFamily: "var(--font-expanded)",
            fontSize: "clamp(28px, 4vw, 56px)",
            fontWeight: 300,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            color: "#0a0a0a",
          }}
        >
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}
