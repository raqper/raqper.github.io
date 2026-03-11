import { ScrollReveal } from "@/app/components/scroll-reveal";

export function HobbiesFooter() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: "#ffffff",
      }}
    >
      <ScrollReveal className="relative z-10 px-6 md:px-10 py-8" offsetY={20} duration={1.0} blur={6}>
        <div className="max-w-[1400px] mx-auto w-full">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p
              className="tracking-[-0.02em]"
              style={{ fontFamily: "var(--font-sans)", fontSize: "14px", fontWeight: 400, color: "rgba(10,10,10,0.5)" }}
            >
              © 2026 Raquel Pereira — All rights reserved.
            </p>
          </div>
        </div>
      </ScrollReveal>
    </footer>
  );
}
