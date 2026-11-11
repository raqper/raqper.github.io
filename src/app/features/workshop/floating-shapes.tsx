import { motion } from "motion/react";

// Placeholder renders reused from the hobbies page (purple glass, on-palette).
// TODO: swap for the workshop renders (workshop-3d-N.webp, ≤200 KB each) when ready.
import shapeA from "@/assets/hobbies-3d-1.png";
import shapeB from "@/assets/hobbies-3d-7.png";

const SHAPES = [shapeA, shapeB, shapeA, shapeB];
const SHAPES_LOOP = [...SHAPES, ...SHAPES];

const EASE = [0.25, 0.1, 0.25, 1] as const;

/**
 * Keyframes for both layers. Motion stops for people who prefer reduced motion.
 * Rendered once by the page.
 */
export function FloatingShapesStyles() {
  return (
    <style>{`
      @keyframes workshopMarqueeUp {
        0% { transform: translateY(0); }
        100% { transform: translateY(-50%); }
      }
      @keyframes workshopDrift {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        50% { transform: translateY(-18px) rotate(6deg); }
      }
      .workshop-marquee { animation: workshopMarqueeUp 90s linear infinite; will-change: transform; }
      .workshop-drift { animation: workshopDrift 14s ease-in-out infinite; }
      @media (prefers-reduced-motion: reduce) {
        .workshop-marquee, .workshop-drift { animation: none; }
      }
    `}</style>
  );
}

/** Hero layer: a vertical marquee of 3D renders on the right (md+), one static shape on mobile. */
export function HeroShapes() {
  return (
    <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden" aria-hidden>
      {/* Desktop marquee */}
      <div className="absolute top-0 hidden md:block" style={{ width: "46%", right: "-6%" }}>
        <motion.div
          className="workshop-marquee flex flex-col items-center"
          style={{ gap: "clamp(16px, 2vw, 32px)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.4, ease: EASE, delay: 0.5 }}
        >
          {SHAPES_LOOP.map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              loading={i < 2 ? "eager" : "lazy"}
              draggable={false}
              style={{ width: "clamp(240px, 30vw, 460px)", height: "auto", objectFit: "contain" }}
            />
          ))}
        </motion.div>
      </div>

      {/* Mobile: one static, cropped shape behind the text */}
      <img
        src={shapeA}
        alt=""
        draggable={false}
        className="md:hidden absolute -top-10 -right-24 w-[300px] opacity-40"
      />

      {/* Legibility gradients over the shapes */}
      <div
        className="absolute inset-0 md:hidden"
        style={{ background: "linear-gradient(to bottom, rgba(5,0,14,0.2) 0%, rgb(5 0 14) 75%)" }}
      />
      <div
        className="absolute inset-0 hidden md:block"
        style={{
          background:
            "linear-gradient(to right, rgb(5 0 14) 0%, rgba(5,0,14,0.96) 38%, rgba(5,0,14,0.55) 56%, transparent 76%)",
        }}
      />
      <div
        className="absolute inset-x-0 top-0 h-32 hidden md:block"
        style={{ background: "linear-gradient(to bottom, rgb(5 0 14) 35%, transparent)" }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-40"
        style={{ background: "linear-gradient(to bottom, transparent, rgb(5 0 14))" }}
      />
    </div>
  );
}

/** A single shape drifting beside a section heading (xl+ only, in the empty right gutter). */
export function DriftingShape({
  variant = "a",
  className = "",
}: {
  variant?: "a" | "b";
  className?: string;
}) {
  return (
    <img
      src={variant === "a" ? shapeA : shapeB}
      alt=""
      aria-hidden
      loading="lazy"
      draggable={false}
      className={`workshop-drift pointer-events-none absolute hidden xl:block opacity-70 ${className}`}
    />
  );
}
