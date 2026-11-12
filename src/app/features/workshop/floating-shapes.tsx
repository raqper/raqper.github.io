import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";

// AI-generated star renders on pure black (Figma file "Workshop 3D renders").
// They are shown with mix-blend-mode: screen, so the black disappears on the dark page.
import fluffyStar from "@/assets/workshop/star-1.jpg";
import glassStar from "@/assets/workshop/star-2.jpg";
import sparkle from "@/assets/workshop/star-3.jpg";
import goldSparkle from "@/assets/workshop/star-4.jpg";
import violetStar from "@/assets/workshop/star-5.jpg";

export const STARS = { fluffyStar, glassStar, sparkle, goldSparkle, violetStar } as const;
export type StarName = keyof typeof STARS;

const EASE = [0.25, 0.1, 0.25, 1] as const;

/** Keyframes for the floating stars. Rendered once by the page. */
export function FloatingShapesStyles() {
  return (
    <style>{`
      /* Small inline stars: a gentle bob. */
      @keyframes workshopDrift {
        0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); }
        50% { transform: translate3d(0, -14px, 0) rotate(5deg); }
      }
      /* Hero stars: a slow loop on both axes, so they keep floating while the page is still. */
      @keyframes workshopOrbit {
        0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); }
        25% { transform: translate3d(var(--dx), calc(var(--dy) * -1), 0) rotate(var(--rot)); }
        50% { transform: translate3d(calc(var(--dx) * 0.3), calc(var(--dy) * -1.6), 0) rotate(0deg); }
        75% { transform: translate3d(calc(var(--dx) * -1), calc(var(--dy) * -0.7), 0) rotate(calc(var(--rot) * -1)); }
      }
      .workshop-star { mix-blend-mode: screen; user-select: none; pointer-events: none; }
      .workshop-drift { animation: workshopDrift var(--drift, 12s) ease-in-out infinite; animation-delay: var(--delay, 0s); }
      .workshop-orbit { animation: workshopOrbit var(--drift, 16s) ease-in-out infinite; animation-delay: var(--delay, 0s); will-change: transform; }
      @media (prefers-reduced-motion: reduce) {
        .workshop-drift, .workshop-orbit { animation: none; }
      }
    `}</style>
  );
}

type StarSpec = {
  name: StarName;
  className: string;
  /** Idle loop length and offset. */
  drift: string;
  delay: string;
  /** Idle loop amplitude in px (x, y) and degrees. */
  dx: number;
  dy: number;
  rot: number;
  /** Parallax distance in px over the first screen of scroll (negative = moves up faster). */
  depth: number;
  /** Extra rotation in degrees over the same scroll. */
  spin: number;
  /** How far the star follows the pointer, in px (desktop only). */
  pointer: number;
  rotate?: number;
};

// Desktop (md+): large stars on the right of the headline, layered by depth.
const DESKTOP: StarSpec[] = [
  {
    name: "glassStar",
    className: "right-[1%] top-[9%] w-[clamp(300px,34vw,560px)]",
    drift: "18s", delay: "0s", dx: 18, dy: 22, rot: 6,
    depth: -260, spin: -18, pointer: 26, rotate: -8,
  },
  {
    name: "fluffyStar",
    className: "hidden lg:block right-[22%] top-[52%] w-[clamp(190px,19vw,320px)]",
    drift: "15s", delay: "-4s", dx: 22, dy: 18, rot: 8,
    depth: -120, spin: 24, pointer: 14, rotate: 10,
  },
  {
    name: "sparkle",
    className: "right-[2%] bottom-[6%] w-[clamp(180px,19vw,320px)]",
    drift: "13s", delay: "-7s", dx: 16, dy: 26, rot: 10,
    depth: -360, spin: 30, pointer: 34,
  },
  {
    name: "goldSparkle",
    className: "hidden lg:block right-[37%] top-[13%] w-[clamp(90px,9vw,150px)]",
    drift: "11s", delay: "-2s", dx: 14, dy: 16, rot: 14,
    depth: -180, spin: -40, pointer: 20, rotate: 15,
  },
];

// Mobile: a compact cluster in the band between the nav and the text.
const MOBILE: StarSpec[] = [
  {
    name: "glassStar", className: "right-1 top-[60px] w-[158px]",
    drift: "18s", delay: "0s", dx: 8, dy: 10, rot: 6,
    depth: -80, spin: -12, pointer: 0, rotate: -8,
  },
  {
    name: "sparkle", className: "right-[150px] top-[104px] w-[88px]",
    drift: "13s", delay: "-5s", dx: 8, dy: 12, rot: 10,
    depth: -110, spin: 20, pointer: 0,
  },
  {
    name: "fluffyStar", className: "left-3 top-[88px] w-[102px]",
    drift: "15s", delay: "-3s", dx: 10, dy: 8, rot: 8,
    depth: -60, spin: 16, pointer: 0, rotate: 12,
  },
  {
    name: "goldSparkle", className: "left-[112px] top-[68px] w-[48px]",
    drift: "11s", delay: "-6s", dx: 6, dy: 8, rot: 14,
    depth: -90, spin: -30, pointer: 0,
  },
];

function Star({
  spec,
  progress,
  pointerX,
  pointerY,
  reduce,
}: {
  spec: StarSpec;
  progress: MotionValue<number>;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  reduce: boolean | null;
}) {
  const y = useTransform(progress, [0, 1], [0, reduce ? 0 : spec.depth]);
  const rotate = useTransform(progress, [0, 1], [0, reduce ? 0 : spec.spin]);
  const scale = useTransform(progress, [0, 1], [1, reduce ? 1 : 1 + Math.abs(spec.depth) / 2400]);
  const px = useTransform(pointerX, (v) => v * spec.pointer);
  const py = useTransform(pointerY, (v) => v * spec.pointer);

  return (
    <motion.div className={`absolute ${spec.className}`} style={{ y, rotate, scale }}>
      <motion.div style={{ x: px, y: py }}>
        <div
          className="workshop-orbit"
          style={{
            ["--drift" as string]: spec.drift,
            ["--delay" as string]: spec.delay,
            ["--dx" as string]: `${spec.dx}px`,
            ["--dy" as string]: `${spec.dy}px`,
            ["--rot" as string]: `${spec.rot}deg`,
          }}
        >
          <img
            src={STARS[spec.name]}
            alt=""
            draggable={false}
            className="workshop-star w-full h-auto"
            style={{ rotate: `${spec.rotate ?? 0}deg` }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

/** Normalised pointer position (-1…1) with a soft spring; stays at 0 on touch devices and with reduced motion. */
function usePointerDrift(enabled: boolean) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 40, damping: 18, mass: 0.8 });
  const y = useSpring(rawY, { stiffness: 40, damping: 18, mass: 0.8 });

  useEffect(() => {
    if (!enabled || !window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      rawX.set((e.clientX / window.innerWidth) * 2 - 1);
      rawY.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [enabled, rawX, rawY]);

  return { x, y };
}

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(() => window.matchMedia("(min-width: 768px)").matches);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => setIsDesktop(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return isDesktop;
}

/** Stars floating around the hero headline. */
export function HeroStars() {
  const reduce = useReducedMotion();
  const isDesktop = useIsDesktop();
  const { scrollY } = useScroll();
  const progress = useTransform(scrollY, [0, isDesktop ? 900 : 600], [0, 1], { clamp: true });
  const pointer = usePointerDrift(isDesktop && !reduce);
  const specs = isDesktop ? DESKTOP : MOBILE;

  return (
    <motion.div
      className="absolute inset-0 z-[1] pointer-events-none overflow-hidden"
      aria-hidden
      // Blend the whole layer at once: per-image blending is isolated by the motion wrappers.
      style={{ mixBlendMode: "screen" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
    >
      {specs.map((spec) => (
        <Star key={spec.name} spec={spec} progress={progress} pointerX={pointer.x} pointerY={pointer.y} reduce={reduce} />
      ))}
    </motion.div>
  );
}

/** A small star shown inline next to a section label. */
export function InlineStar({ name, className = "" }: { name: StarName; className?: string }) {
  return (
    <img
      src={STARS[name]}
      alt=""
      aria-hidden
      loading="lazy"
      draggable={false}
      className={`workshop-star workshop-drift inline-block h-auto ${className}`}
    />
  );
}
