import { motion } from "motion/react";
import { HobbiesNav } from "./hobbies-nav";

import hero3d1 from "@/assets/hobbies-3d-1.png";
import hero3d2 from "@/assets/hobbies-3d-2.png";
import hero3d3 from "@/assets/hobbies-3d-3.png";
import hero3d4 from "@/assets/hobbies-3d-4.png";
import hero3d5 from "@/assets/hobbies-3d-5.png";
import hero3d6 from "@/assets/hobbies-3d-6.png";
import hero3d7 from "@/assets/hobbies-3d-7.png";
import hero3d8 from "@/assets/hobbies-3d-8.png";

const HERO_IMAGES = [hero3d1, hero3d2, hero3d3, hero3d4, hero3d5, hero3d6, hero3d7, hero3d8];
const HERO_IMAGES_LOOP = [...HERO_IMAGES, ...HERO_IMAGES];

export function HobbiesHero() {
  return (
    <motion.section
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: "#ffffff" }}
      initial={{ opacity: 0, filter: "blur(18px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 2.8, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <HobbiesNav />

      {/* Brutalist grid lines (vertical only) */}
      <div className="absolute inset-0 z-[0] pointer-events-none" aria-hidden>
        <div className="absolute left-[33.33%] top-0 bottom-0 w-px" style={{ background: "rgba(10,10,10,0.06)" }} />
        <div className="absolute left-[66.66%] top-0 bottom-0 w-px" style={{ background: "rgba(10,10,10,0.06)" }} />
      </div>

      {/* CSS keyframes for vertical marquee */}
      <style>{`
        @keyframes marqueeUp {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
      `}</style>

      {/* 3D images — right side, vertical marquee */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none hidden md:block overflow-hidden"
        aria-hidden
      >
        <div
          className="absolute top-0"
          style={{ width: "50%", right: "-8%" }}
        >
          <motion.div
            className="flex flex-col items-center"
            style={{
              gap: "clamp(16px, 2vw, 32px)",
              animation: "marqueeUp 80s linear infinite",
              willChange: "transform",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2.4, ease: [0.25, 0.1, 0.25, 1], delay: 0.5 }}
          >
            {HERO_IMAGES_LOOP.map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                loading="lazy"
                style={{
                  width: "clamp(240px, 32vw, 480px)",
                  height: "auto",
                  objectFit: "contain",
                }}
                draggable={false}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Left-side gradient so text stays readable */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none md:hidden"
        style={{
          background: "linear-gradient(to right, #ffffff 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute inset-0 z-[2] pointer-events-none hidden md:block"
        style={{
          background: "linear-gradient(to right, #ffffff 0%, rgba(255,255,255,0.97) 35%, rgba(255,255,255,0.6) 50%, transparent 72%)",
        }}
      />

      {/* Hero content — left-aligned, Career page skeleton */}
      <div className="relative z-10 px-6 md:px-10 flex-1 flex flex-col justify-center">
        <div className="max-w-[1400px] mx-auto w-full my-auto">
          <motion.div
            className="w-full md:max-w-[65%]"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2.4, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
          >
            <p
              className="mb-4"
              style={{
                fontFamily: "var(--font-expanded)",
                fontSize: "clamp(14px, 1.6vw, 22px)",
                fontWeight: 700,
                lineHeight: 1.2,
                letterSpacing: "-0.03em",
                color: "#0a0a0a",
              }}
            >
              raqper
            </p>
            <h1
              className="tracking-[-0.04em]"
              style={{
                fontFamily: "var(--font-expanded)",
                fontSize: "clamp(32px, 5.2vw, 86px)",
                fontWeight: 300,
                lineHeight: 1.05,
                color: "#0a0a0a",
              }}
            >
              Having fun with tattoos, analogs, trips, 3D, and series.
            </h1>
            <p
              className="mt-6 w-full"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(13px, 1.1vw, 16px)",
                fontWeight: 400,
                lineHeight: 1.7,
                letterSpacing: "-0.02em",
                color: "#0a0a0a",
              }}
            >
              Outside of design, I recharge through analog photography, doing tattoos, exploring new places, experimenting with 3D art, binge-watching great series, and spending time with my three lady cats.
            </p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-4">
              {["Tattoo Artist", "Photographer", "Cat Lady"].map(
                (item, index, arr) => (
                  <span key={item} className="contents">
                    <span
                      className="shrink-0 tracking-[-0.02em]"
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "13px",
                        fontWeight: 700,
                        color: "#0a0a0a",
                      }}
                    >
                      {item}
                    </span>
                    {index < arr.length - 1 && (
                      <span
                        className="shrink-0"
                        style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "rgba(10,10,10,0.4)" }}
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
