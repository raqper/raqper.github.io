export function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, rgb(5 0 14) 0%, rgb(5 0 14) 50%, #030008 100%)",
      }}
    >
      <div className="relative z-10 px-6 md:px-10 py-8">
        <div className="max-w-[1400px] mx-auto w-full text-left">
          <p
            className="tracking-[-0.02em] text-white"
            style={{ fontFamily: "var(--font-sans)", fontSize: "14px", fontWeight: 400 }}
          >
            © 2026 Raquel Pereira. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}