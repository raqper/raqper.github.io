import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";

import raquelPortraitImg from "@/assets/raquel-portrait-2_v2.png";
const raquelPortrait = raquelPortraitImg;

const NAV_ITEMS = ["Experience", "Content", "Skills"];

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
    <section
      id="about"
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: "rgb(5 0 14)" }}
    >
      {/* Navigation — fixed on mobile (outside any filter/transform so it sticks to viewport), absolute on desktop */}
      <nav className="fixed top-0 left-0 right-0 z-20 px-6 md:px-10 py-4 lg:absolute bg-[rgb(5,0,14)] lg:bg-transparent">
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

        {/* Mobile hamburger — hidden when drawer is open so only the drawer's close button is shown */}
        {!drawerOpen && (
          <button
            type="button"
            className="lg:hidden flex flex-col justify-center gap-1.5 w-10 h-10 -mr-1 z-30 touch-manipulation active:opacity-80 transition-opacity"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
            aria-expanded={false}
          >
            <span className="block w-5 h-0.5 rounded-full bg-[#c4bade]" />
            <span className="block w-5 h-0.5 rounded-full bg-[#c4bade]" />
            <span className="block w-5 h-0.5 rounded-full bg-[#c4bade]" />
          </button>
        )}
        </div>
      </nav>
      {/* Spacer on mobile so hero content is not hidden under fixed nav */}
      <div className="h-[56px] shrink-0 lg:hidden" aria-hidden="true" />
      {/* Animated inner content — filter lives here so the section has no filter and fixed nav works */}
      <motion.div
        className="flex-1 flex flex-col min-h-0"
        initial={{ opacity: 0, filter: "blur(18px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 2.8, ease: [0.25, 0.1, 0.25, 1] }}
      >
      {/* Mobile slide-in drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Backdrop — tap to close */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setDrawerOpen(false)}
              aria-hidden="true"
            />
            {/* Drawer panel */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 z-50 w-[min(280px,85vw)] flex flex-col shadow-2xl"
              style={{
                background: "linear-gradient(180deg, #1a0038 0%, #1c0048 30%, #150030 100%)",
                borderLeft: "1px solid rgba(46,26,106,0.5)",
                boxShadow: "-8px 0 32px rgba(0,0,0,0.4)",
              }}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Header — aligns with main nav bar */}
              <div
                className="flex items-center justify-between shrink-0 px-6 py-4"
                style={{ borderBottom: "1px solid rgba(46,26,106,0.4)" }}
              >
                <span
                  className="text-[#a89cc8] tracking-[-0.02em]"
                  style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 500 }}
                >
                  Menu
                </span>
                <button
                  type="button"
                  className="flex items-center justify-center w-9 h-9 rounded-lg text-[#a89cc8] hover:text-[#edeaf5] hover:bg-white/5 transition-colors touch-manipulation"
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Close menu"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
              {/* Nav links — comfortable tap targets */}
              <nav className="flex flex-col px-4 pt-6 pb-8" aria-label="Main">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(item.toLowerCase());
                    }}
                    className="py-3.5 px-4 rounded-lg text-white hover:text-[#edeaf5] hover:bg-white/5 active:bg-white/10 transition-colors tracking-[-0.03em] touch-manipulation"
                    style={{ fontFamily: "var(--font-sans)", fontSize: "17px", fontWeight: 500 }}
                  >
                    {item}
                  </a>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

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

      {/* Hero Content — text and portrait inside same invisible container (max-w + padding) */}
      <div className="relative z-10 px-6 md:px-10 flex-1 flex flex-col justify-center">
        <div className="max-w-[1400px] mx-auto w-full my-auto flex flex-col md:flex-row md:items-center md:gap-8">
          <motion.div
            className="w-full md:max-w-[65%] shrink-0"
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
          {/* Portrait — inside same container so right padding matches left padding of text, desktop only */}
          <div
            className="hidden md:flex md:flex-1 md:justify-end md:items-center pb-[15vh] pointer-events-none"
            aria-hidden="true"
          >
            <div className="relative">
              <img
                src={raquelPortrait}
                alt=""
                className="select-none object-contain"
                style={{
                  maxHeight: "80vh",
                  width: "auto",
                  display: "block",
                }}
                draggable={false}
              />
              <div
                className="absolute top-0 left-0 right-0"
                style={{
                  height: "25%",
                  background: "linear-gradient(to bottom, rgb(5 0 14) 0%, transparent 100%)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
      </motion.div>
    </section>
  );
}
