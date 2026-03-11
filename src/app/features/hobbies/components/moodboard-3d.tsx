import { useRef, useState } from "react";
import { motion } from "motion/react";
import { SectionHeader } from "@/app/components/shared/section-header";

interface MoodCard {
  id: number;
  title: string;
  tag: string;
  bg: [string, string];
  size: "large" | "medium" | "small";
}

const CARDS: MoodCard[] = [
  { id: 1, title: "Wabi-sabi", tag: "Philosophy", bg: ["#d4c8b4", "#b8aa96"], size: "large" },
  { id: 2, title: "Brutalist type", tag: "Typography", bg: ["#2b2b2b", "#1a1a1a"], size: "medium" },
  { id: 3, title: "Grain & texture", tag: "Material", bg: ["#c8bfb0", "#a89e90"], size: "small" },
  { id: 4, title: "Negative space", tag: "Composition", bg: ["#e8e4dc", "#d0ccc4"], size: "medium" },
  { id: 5, title: "Sumi-e ink", tag: "Technique", bg: ["#3a3530", "#1e1a16"], size: "small" },
  { id: 6, title: "Analog warmth", tag: "Mood", bg: ["#d8c4a8", "#c0a888"], size: "large" },
];

function TiltCard({ card }: { card: MoodCard }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = (e.clientX - rect.left) / rect.width;
    const cy = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (cy - 0.5) * -18, y: (cx - 0.5) * 18 });
    setGlare({ x: cx * 100, y: cy * 100 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  const isDark = card.bg[0].startsWith("#2") || card.bg[0].startsWith("#3") || card.bg[0].startsWith("#1");

  const sizeMap = {
    large: { gridColumn: "span 2", aspectRatio: "16/9" },
    medium: { gridColumn: "span 1", aspectRatio: "4/3" },
    small: { gridColumn: "span 1", aspectRatio: "1/1" },
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative overflow-hidden cursor-pointer"
      style={{
        ...sizeMap[card.size],
        perspective: 1000,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y,
        scale: hovered ? 1.02 : 1,
      }}
    >
      {/* Card face */}
      <div
        style={{
          width: "100%",
          height: "100%",
          background: `linear-gradient(135deg, ${card.bg[0]} 0%, ${card.bg[1]} 100%)`,
          position: "relative",
          overflow: "hidden",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Glare layer */}
        {hovered && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.18) 0%, transparent 60%)`,
              pointerEvents: "none",
              zIndex: 2,
            }}
          />
        )}

        {/* Noise texture */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E")`,
            backgroundSize: "256px 256px",
            opacity: 0.8,
            mixBlendMode: "overlay",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "clamp(16px, 3%, 28px)",
            zIndex: 3,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "10px",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: isDark ? "rgba(245,240,232,0.45)" : "rgba(10,10,10,0.35)",
              border: `1px solid ${isDark ? "rgba(245,240,232,0.15)" : "rgba(10,10,10,0.12)"}`,
              padding: "3px 8px",
              display: "inline-block",
              alignSelf: "flex-start",
            }}
          >
            {card.tag}
          </span>

          <h3
            style={{
              fontFamily: "var(--font-expanded)",
              fontSize: "clamp(18px, 2.5vw, 32px)",
              fontWeight: 300,
              letterSpacing: "-0.03em",
              lineHeight: 1,
              color: isDark ? "#f5f0e8" : "#0a0a0a",
            }}
          >
            {card.title}
          </h3>
        </div>
      </div>
    </motion.div>
  );
}

export function Moodboard3D() {
  return (
    <section id="moodboard" className="py-20" style={{ background: "#f5f0e8" }}>
      <div className="px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto">

          <SectionHeader title="3D inspirations">
            <p
              className="hidden md:block max-w-[240px] text-right"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "13px",
                fontWeight: 400,
                lineHeight: 1.6,
                color: "rgba(10,10,10,0.4)",
                letterSpacing: "-0.01em",
              }}
            >
              Hover to tilt. Creations & references that shape my aesthetic.
            </p>
          </SectionHeader>

          {/* 3D tilt grid */}
          <div
            className="grid gap-3"
            style={{
              gridTemplateColumns: "repeat(3, 1fr)",
              perspective: "1200px",
            }}
          >
            {CARDS.map((card) => (
              <TiltCard key={card.id} card={card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
