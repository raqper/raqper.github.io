import { type ReactNode } from "react";

interface SectionHeaderProps {
  title: string;
  children?: ReactNode;
}

export function SectionHeader({ title, children }: SectionHeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
      <h2
        className="text-2xl font-light tracking-tight"
        style={{ fontFamily: "var(--font-expanded)", color: "#0a0a0a" }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}
