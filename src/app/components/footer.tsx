import { ScrollReveal } from "./scroll-reveal";

export function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, rgb(5 0 14) 0%, rgb(5 0 14) 50%, #030008 100%)",
      }}
    >
      <ScrollReveal className="relative z-10 px-6 md:px-10 py-8" offsetY={20} duration={1.0} blur={6}>
        <div className="max-w-[1400px] mx-auto w-full">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p
            className="tracking-[-0.02em] text-[#4c4878]"
            style={{ fontFamily: "var(--font-sans)", fontSize: "14px", fontWeight: 400 }}
          >© 2026 Raquel Pereira — All rights reserved.</p>
        </div>
        </div>
      </ScrollReveal>
    </footer>
  );
}