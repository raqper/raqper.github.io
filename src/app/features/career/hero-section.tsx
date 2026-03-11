import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import raquelPortrait from "@/assets/raquel-portrait-2_v2.png";

const NAV_ITEMS = ["Experience", "Content", "Skills", "Contact"];

export function HeroSection() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  const scrollTo = (id: string) => {
    setDrawerOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, drawerOpen ? 300 : 0);
  };

  return (
    <motion.section
      id="about"
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: "rgb(5 0 14)" }}
      initial={{ opacity: 0, filter: "blur(18px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 2.8, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-20 px-6 md:px-10 py-6">
        <div className="max-w-[1400px] mx-auto w-full flex items-center justify-between">
        {/* Career / Hobbies segmented toggle */}
        <div
          className="relative flex items-center rounded-full p-[3px]"
          style={{
            background: "rgba(46,26,106,0.25)",
            border: "1px solid rgba(46,26,106,0.4)",
          }}
        >
          <button
            className="relative z-10 rounded-full px-3.5 py-[4px] transition-colors"
            style={{
              background: "rgba(176,136,40,0.18)",
              fontFamily: "var(--font-sans)",
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              color: "#ede0a8",
            }}
            onClick={() => navigate("/career")}
          >
            Career
          </button>
          <button
            className="relative z-10 rounded-full px-3.5 py-[4px] transition-colors"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              color: "#635c8c",
            }}
            onClick={() => navigate("/hobbies")}
          >
            Hobbies
          </button>
        </div>

        {/* Desktop nav links */}
        <div className="hidden lg:flex gap-6 items-center">
          {NAV_ITEMS.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(item.toLowerCase());
              }}
              className="text-white tracking-[-0.03em] hover:text-[#edeaf5] transition-colors"
              style={{ fontFamily: "var(--font-sans)", fontSize: "14px" }}
            >
              {item}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden flex flex-col gap-[5px] p-2 z-30"
          onClick={() => setDrawerOpen(true)}
          aria-label="Open menu"
        >
          <span className="block w-5 h-px bg-[#9e96be]" />
          <span className="block w-5 h-px bg-[#9e96be]" />
          <span className="block w-3.5 h-px bg-[#9e96be]" />
        </button>
        </div>
      </nav>

      {/* Mobile slide-in drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setDrawerOpen(false)}
            />
            {/* Drawer panel */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 z-50 w-72 flex flex-col px-8 py-10 gap-8"
              style={{
                background: "#1c0048",
                borderLeft: "1px solid rgba(46,26,106,0.4)",
              }}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Close button */}
              <button
                className="self-end text-[#a89cc8] hover:text-[#edeaf5] transition-colors"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close menu"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
              {/* Nav links */}
              <nav className="flex flex-col gap-6 mt-4">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(item.toLowerCase());
                    }}
                    className="text-white hover:text-[#edeaf5] transition-colors tracking-[-0.03em]"
                    style={{ fontFamily: "var(--font-sans)", fontSize: "18px", fontWeight: 400 }}
                  >
                    {item}
                  </a>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Portrait — oval, right-aligned, desktop only */}
      <div
        className="absolute z-[1] pointer-events-none hidden md:flex items-center justify-end pb-[15vh]"
        aria-hidden="true"
        style={{
          top: 0,
          right: 0,
          bottom: 0,
          width: "50%",
        }}
      >
        <div
          className="relative"
          style={{ marginRight: "clamp(185px, 30vw, 80px)" }}
        >
          <img
            src={raquelPortrait}
            alt=""
            className="select-none object-contain"
            style={{
              maxHeight: "70vh",
              width: "auto",
            }}
            draggable={false}
          />
          {/* Top fade gradient */}
          <div
            className="absolute top-0 left-0 right-0"
            style={{
              height: "25%",
              background: "linear-gradient(to bottom, rgb(5 0 14) 0%, transparent 100%)",
            }}
          />
        </div>
      </div>

      {/* Mobile background glow (replaces portrait) */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none md:hidden"
        aria-hidden="true"
      >
        <div
          className="absolute top-0 right-0 w-[300px] h-[300px] opacity-[0.12]"
          style={{
            background: "radial-gradient(circle, rgba(46,26,106,1) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-1/4 left-0 w-[250px] h-[250px] opacity-[0.08]"
          style={{
            background: "radial-gradient(circle, rgba(176,136,40,0.8) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 px-6 md:px-10 flex-1 flex flex-col justify-center">
        <div className="max-w-[1400px] mx-auto w-full my-auto">
          <motion.div
            className="w-full md:max-w-[65%]"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2.4, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
          >
            <p
              className="text-[#edeaf5] tracking-[-0.03em] mb-4"
              style={{
                fontFamily: "var(--font-expanded)",
                fontSize: "clamp(14px, 1.6vw, 22px)",
                fontWeight: 700,
                lineHeight: 1.2,
              }}
            >
              Raquel Pereira
            </p>
            <h1
              className="text-white tracking-[-0.04em]"
              style={{
                fontFamily: "var(--font-expanded)",
                fontSize: "clamp(32px, 5.2vw, 86px)",
                fontWeight: 300,
                lineHeight: 1.05,
              }}
            >
              Reimagining design{" "}
              <br className="hidden xl:block" />
              systems, operations,{" "}
              <br className="hidden xl:block" />
              and products.
            </h1>
            <p
              className="text-white tracking-[-0.02em] mt-6 w-full"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(13px, 1.1vw, 16px)",
                fontWeight: 400,
                lineHeight: 1.7,
              }}
            >
              Since 2017, I've grown from focusing on product experiences to shaping design systems and processes with AI. <br></br>In parallel, I contribute to the design community through speaking, teaching, and organizing events.
            </p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-4">
              {["Lead Designer", "Teacher", "Design Advocate"].map(
                (item, index, arr) => (
                  <span key={item} className="contents">
                    <span
                      className="text-white shrink-0 tracking-[-0.02em]"
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "13px",
                        fontWeight: 700,
                      }}
                    >
                      {item}
                    </span>
                    {index < arr.length - 1 && (
                      <span
                        className="text-white/40 shrink-0"
                        style={{ fontFamily: "var(--font-sans)", fontSize: "13px" }}
                      >
                        ◇
                      </span>
                    )}
                  </span>
                ),
              )}
            </div>
          </motion.div>
        </div>
      </div>

    </motion.section>
  );
}
