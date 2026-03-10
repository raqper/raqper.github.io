import { useState, useRef, useCallback } from "react";
import { motion } from "motion/react";
import { Lightbox } from "@/app/components/shared/lightbox";

interface Photo {
  id: number;
  label: string;
  film: string;
  src: string;
  w: number;
  h: number;
  x: number;
  y: number;
  rotate: number;
}

const SEED_PHOTOS: Omit<Photo, "x" | "y" | "rotate">[] = [
  { id: 1, label: "Lisbon, 2023", film: "Kodak Portra 400", src: "https://picsum.photos/seed/analog1/400/540", w: 220, h: 300 },
  { id: 2, label: "Tokyo, 2022", film: "Fuji Superia 200", src: "https://picsum.photos/seed/analog2/540/360", w: 300, h: 200 },
  { id: 3, label: "Porto, 2024", film: "Ilford HP5", src: "https://picsum.photos/seed/analog3/400/540", w: 220, h: 300 },
  { id: 4, label: "Berlin, 2023", film: "Kodak Gold 200", src: "https://picsum.photos/seed/analog4/400/400", w: 240, h: 240 },
  { id: 5, label: "Kyoto, 2022", film: "Kodak Portra 800", src: "https://picsum.photos/seed/analog5/400/540", w: 220, h: 300 },
  { id: 6, label: "Alentejo, 2024", film: "Cinestill 800T", src: "https://picsum.photos/seed/analog6/540/360", w: 300, h: 200 },
  { id: 7, label: "Amsterdam, 2023", film: "Fuji Pro 400H", src: "https://picsum.photos/seed/analog7/400/400", w: 240, h: 240 },
  { id: 8, label: "Sintra, 2024", film: "Ilford Delta 3200", src: "https://picsum.photos/seed/analog8/400/540", w: 220, h: 300 },
];

// Deterministic scattered positions
const POSITIONS: { x: number; y: number; rotate: number }[] = [
  { x: 4, y: 3, rotate: -6 },
  { x: 30, y: 8, rotate: 4 },
  { x: 58, y: 2, rotate: -3 },
  { x: 14, y: 48, rotate: 5 },
  { x: 42, y: 42, rotate: -8 },
  { x: 68, y: 38, rotate: 2 },
  { x: 8, y: 72, rotate: -4 },
  { x: 50, y: 68, rotate: 7 },
];

const PHOTOS: Photo[] = SEED_PHOTOS.map((p, i) => ({
  ...p,
  x: POSITIONS[i].x,
  y: POSITIONS[i].y,
  rotate: POSITIONS[i].rotate,
}));

export function AnalogPhotos() {
  const [active, setActive] = useState<Photo | null>(null);
  const [zStack, setZStack] = useState<number[]>(PHOTOS.map((p) => p.id));
  const constraintsRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  const bringToFront = useCallback((id: number) => {
    setZStack((prev) => [...prev.filter((z) => z !== id), id]);
  }, []);

  const handlePhotoClick = useCallback((photo: Photo) => {
    if (!isDraggingRef.current) setActive(photo);
  }, []);

  const handleDragStart = useCallback((id: number) => {
    isDraggingRef.current = true;
    bringToFront(id);
  }, [bringToFront]);

  const handleDragEnd = useCallback(() => {
    setTimeout(() => {
      isDraggingRef.current = false;
    }, 100);
  }, []);

  return (
    <section id="film" className="relative w-full h-screen overflow-hidden" style={{ background: "#f7f7f7" }}>
      {/* Full-viewport drag zone */}
      <div
        ref={constraintsRef}
        className="relative w-full h-full"
        style={{
          overflow: "hidden",
        }}
      >
        {/* Background quote — visible while dragging photos */}
        <div
          className="absolute inset-0 z-0 flex flex-col items-center justify-center pointer-events-none px-6 text-center"
          aria-hidden
        >
          <p
            style={{
              fontFamily: "var(--font-expanded)",
              fontSize: "clamp(28px, 5vw, 72px)",
              fontWeight: 300,
              lineHeight: 1.25,
              letterSpacing: "-0.04em",
              color: "#0a0a0a",
              maxWidth: "min(1000px, 94vw)",
            }}
          >
            "The best thing about a picture is that it never changes, even when the people in it do."
          </p>
          <p
            style={{
              fontFamily: "var(--font-expanded)",
              fontSize: "clamp(14px, 2vw, 22px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "#0a0a0a",
              marginTop: 16,
            }}
          >
            Andy Warhol
          </p>
        </div>

            {PHOTOS.map((photo) => {
              const zIndex = zStack.indexOf(photo.id);
              return (
                <motion.div
                  key={photo.id}
                  drag
                  dragConstraints={constraintsRef}
                  dragElastic={0.08}
                  dragMomentum={false}
                  onDragStart={() => handleDragStart(photo.id)}
                  onDragEnd={handleDragEnd}
                  whileDrag={{ scale: 1.05, cursor: "grabbing" }}
                  onClick={() => handlePhotoClick(photo)}
                  className="absolute cursor-grab active:cursor-grabbing"
                  style={{
                    left: `${photo.x}%`,
                    top: `${photo.y}%`,
                    zIndex: zIndex + 1,
                    rotate: photo.rotate,
                    width: photo.w,
                  }}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: zIndex * 0.06 }}
                >
                  {/* Polaroid card — realistic frame */}
                  <div
                    style={{
                      background: "#fefcf9",
                      padding: "12px 12px 48px 12px",
                      boxShadow:
                        "0 1px 2px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.08), 0 12px 32px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.04)",
                      boxSizing: "border-box",
                    }}
                  >
                    <img
                      src={photo.src}
                      alt={photo.label}
                      loading="lazy"
                      style={{
                        width: "100%",
                        height: photo.h,
                        objectFit: "cover",
                        display: "block",
                        pointerEvents: "none",
                        userSelect: "none",
                      }}
                      draggable={false}
                    />
                    <div style={{ marginTop: 10, paddingLeft: 2 }}>
                      <p
                        style={{
                          fontFamily: "var(--font-handwriting)",
                          fontSize: "14px",
                          fontWeight: 500,
                          letterSpacing: "0.02em",
                          color: "#1a2744",
                        }}
                      >
                        {photo.label}
                      </p>
                      <p
                        style={{
                          fontFamily: "var(--font-handwriting)",
                          fontSize: "13px",
                          fontWeight: 400,
                          letterSpacing: "0.02em",
                          color: "#1a2744",
                          opacity: 0.85,
                          marginTop: 2,
                        }}
                      >
                        {photo.film}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
      </div>

      <Lightbox
        open={!!active}
        onClose={() => setActive(null)}
        title={active?.label ?? ""}
        subtitle={active?.film}
      >
        {active && (
          <img
            src={active.src}
            alt={active.label}
            style={{
              width: "100%",
              maxHeight: "60vh",
              objectFit: "contain",
              display: "block",
            }}
          />
        )}
      </Lightbox>
    </section>
  );
}
