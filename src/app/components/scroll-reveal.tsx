import { type ReactNode } from "react";
import { motion } from "motion/react";

interface ScrollRevealProps {
  children: ReactNode;
  /** Delay in seconds before animation starts */
  delay?: number;
  /** Duration of the reveal animation */
  duration?: number;
  /** Vertical offset the element travels from (positive = from below) */
  offsetY?: number;
  /** Blur amount in pixels at start */
  blur?: number;
  /** How much of the element must be visible to trigger (0-1) */
  amount?: number;
  /** Additional className for the wrapper */
  className?: string;
  /** Additional inline style */
  style?: React.CSSProperties;
}

export function ScrollReveal({
  children,
  delay = 0,
  duration = 1.6,
  offsetY = 24,
  blur = 6,
  amount = 0.15,
  className = "",
  style,
}: ScrollRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: offsetY, filter: `blur(${blur}px)` }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
