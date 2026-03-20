import { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "motion/react";
import { Lightbox } from "@/app/components/shared/lightbox";
import { ANALOG_PHOTOS, LOCATIONS, type AnalogPhoto } from "@/app/features/hobbies/data/analog-data";

export function AnalogPhotos() {
  const [active, setActive] = useState<AnalogPhoto | null>(null);
  const [zStack, setZStack] = useState<number[]>(ANALOG_PHOTOS.map((p) => p.id));
  const [locationFilter, setLocationFilter] = useState<string>("All");
  const [isMobile, setIsMobile] = useState(false);
  const constraintsRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const bringToFront = useCallback((id: number) => {
    setZStack((prev) => [...prev.filter((z) => z !== id), id]);
  }, []);

  const handlePhotoClick = useCallback((photo: AnalogPhoto) => {
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
    <section id="film" className="relative w-full min-h-[78vh] md:min-h-screen overflow-hidden flex flex-col" style={{ background: "#f7f7f7" }}>
      {/* Location filters */}
      <div
        className="flex items-center gap-2 px-6 py-3 md:py-4 shrink-0 overflow-x-auto no-scrollbar"
        style={{ fontFamily: "var(--font-sans)", WebkitOverflowScrolling: "touch" }}
      >
        <div className="flex items-center gap-1.5 mx-auto">
          {LOCATIONS.map((loc) => (
            <button
              key={loc}
              type="button"
              onClick={() => setLocationFilter(loc)}
              className="px-3 py-1 rounded-full border text-xs font-medium transition-colors whitespace-nowrap flex-shrink-0"
              style={{
                backgroundColor: locationFilter === loc ? "#0a0a0a" : "transparent",
                borderColor: locationFilter === loc ? "#0a0a0a" : "rgba(10,10,10,0.2)",
                color: locationFilter === loc ? "#f7f7f7" : "#0a0a0a",
              }}
            >
              {loc}
            </button>
          ))}
        </div>
      </div>
      {/* Full-viewport drag zone */}
      <div
        ref={constraintsRef}
        className="relative w-full flex-1 min-h-[52vh] md:min-h-0"
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
              fontSize: "clamp(20px, 5vw, 72px)",
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

            {ANALOG_PHOTOS.map((photo) => {
              const zIndex = zStack.indexOf(photo.id);
              const visible = locationFilter === "All" || photo.filterGroup === locationFilter;
              return (
                <motion.div
                  key={photo.id}
                  drag={visible ? (isMobile ? "x" : true) : false}
                  dragConstraints={constraintsRef}
                  dragElastic={0.08}
                  dragMomentum={false}
                  onDragStart={() => handleDragStart(photo.id)}
                  onDragEnd={handleDragEnd}
                  whileDrag={{ scale: isMobile ? 1.02 : 1.05, cursor: "grabbing" }}
                  onClick={() => handlePhotoClick(photo)}
                  className="absolute cursor-grab active:cursor-grabbing"
                  style={{
                    left: `${photo.x}%`,
                    top: `${photo.y}%`,
                    zIndex: zIndex + 1,
                    rotate: photo.rotate,
                    width: `clamp(96px, 21vw, ${photo.w}px)`,
                    opacity: visible ? 1 : 0,
                    pointerEvents: visible ? "auto" : "none",
                    transition: "opacity 0.25s ease",
                    touchAction: isMobile ? "pan-y" : "none",
                  }}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: visible ? 1 : 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.25, delay: zIndex * 0.02 }}
                >
                  {/* Polaroid card — realistic frame */}
                  <div
                    style={{
                      background: "#fefcf9",
                      padding: "clamp(5px, 1.6vw, 8px) clamp(5px, 1.6vw, 8px) clamp(8px, 2.4vw, 12px)",
                      boxShadow:
                        "0 1px 2px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.08), 0 12px 32px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.04)",
                      boxSizing: "border-box",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        aspectRatio: `${photo.w} / ${photo.h}`,
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={photo.src}
                        alt={photo.label}
                        loading="lazy"
                        decoding="async"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                          pointerEvents: "none",
                          userSelect: "none",
                        }}
                        draggable={false}
                      />
                    </div>
                    <div style={{ marginTop: 4, paddingLeft: 2 }}>
                      <p
                        style={{
                          fontFamily: "var(--font-handwriting)",
                          fontSize: "clamp(10px, 2.4vw, 12px)",
                          fontWeight: 500,
                          letterSpacing: "0.02em",
                          color: "#1a2744",
                        }}
                      >
                        {photo.label}
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
      >
        {active && (
          <img
            src={active.src}
            alt={active.label}
            style={{
              width: "100%",
              height: "100%",
              maxHeight: "100%",
              objectFit: "contain",
              display: "block",
            }}
          />
        )}
      </Lightbox>
    </section>
  );
}
