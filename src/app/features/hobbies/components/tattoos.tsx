import { useState } from "react";
import { motion } from "motion/react";
import { CarouselArrow } from "@/app/components/shared/carousel-arrow";
import { SectionHeader } from "@/app/components/shared/section-header";
import { Lightbox } from "@/app/components/shared/lightbox";
import { useCarouselScroll } from "@/app/hooks/use-carousel-scroll";

interface TattooItem {
  id: number;
  type: "skin" | "flash";
  title: string;
  detail: string;
  artist?: string;
  year?: string;
}

const TATTOOS: TattooItem[] = [
  { id: 1, type: "skin", title: "Sleeve fragment", detail: "Upper arm", artist: "Studio Ghibli Ink", year: "2021" },
  { id: 2, type: "flash", title: "Snake flash", detail: "Flash design" },
  { id: 3, type: "flash", title: "Botanical study", detail: "Flash design" },
  { id: 4, type: "skin", title: "Ribcage piece", detail: "Side rib", artist: "Blackwork Collective", year: "2022" },
  { id: 5, type: "flash", title: "Moth study", detail: "Flash design" },
  { id: 6, type: "skin", title: "Ankle wrap", detail: "Left ankle", artist: "Fine Line Studio", year: "2023" },
  { id: 7, type: "flash", title: "Koi draft", detail: "Flash design" },
  { id: 8, type: "skin", title: "Shoulder blade", detail: "Back shoulder", artist: "Blackwork Collective", year: "2024" },
];

const PALETTE_SKIN = ["#c4b8a8", "#b0a090"];
const PALETTE_FLASH = ["#e8e0d4", "#d4c8b8"];

export function Tattoos() {
  const [active, setActive] = useState<TattooItem | null>(null);
  const { stripRef, atStart, atEnd, isDragging, scrollBy, scrollByRight, dragHandlers } = useCarouselScroll();

  return (
    <section id="tattoos" className="py-20 overflow-hidden" style={{ background: "#ffffff" }}>
      <div className="px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto">
          <SectionHeader title="Tattoos">
            <div className="flex items-center gap-2">
              <CarouselArrow direction="left" disabled={atStart} onClick={scrollBy} />
              <CarouselArrow direction="right" disabled={atEnd} onClick={scrollByRight} />
            </div>
          </SectionHeader>

          <div>
            <div
              ref={stripRef}
              className="flex gap-4 overflow-x-auto overflow-y-hidden"
              style={{
                paddingBottom: 16,
                cursor: isDragging ? "grabbing" : "grab",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                userSelect: "none",
              }}
              {...dragHandlers}
              onMouseLeave={dragHandlers.onMouseUp}
            >
              {TATTOOS.map((tattoo, i) => {
                const isSkin = tattoo.type === "skin";
                const [c1, c2] = isSkin ? PALETTE_SKIN : PALETTE_FLASH;
                return (
                  <motion.div
                    key={tattoo.id}
                    className="relative overflow-hidden cursor-pointer flex-shrink-0 group"
                    style={{
                      width: "clamp(260px, 22vw, 360px)",
                      aspectRatio: "3/4",
                      background: `linear-gradient(145deg, ${c1} 0%, ${c2} 100%)`,
                      border: isSkin ? "none" : "1.5px solid rgba(10,10,10,0.15)",
                    }}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: i * 0.06 }}
                    onClick={() => setActive(tattoo)}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        fontFamily: "var(--font-sans)",
                        fontSize: "9px",
                        fontWeight: 600,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "rgba(10,10,10,0.35)",
                        border: "1px solid rgba(10,10,10,0.2)",
                        padding: "2px 6px",
                      }}
                    >
                      {isSkin ? "On skin" : "Flash"}
                    </div>

                    <motion.div
                      className="absolute inset-0 flex flex-col justify-end p-4"
                      style={{ background: "rgba(10,10,10,0)" }}
                      whileHover={{ background: "rgba(10,10,10,0.55)" }}
                      transition={{ duration: 0.25 }}
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 500, color: "#f5f0e8", letterSpacing: "-0.01em" }}>
                          {tattoo.title}
                        </p>
                        <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "rgba(245,240,232,0.6)", letterSpacing: "0.02em", marginTop: 2 }}>
                          {tattoo.detail}{tattoo.year ? ` · ${tattoo.year}` : ""}
                        </p>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <Lightbox
        open={!!active}
        onClose={() => setActive(null)}
        title={active?.title ?? ""}
        subtitle={active ? `${active.detail}${active.artist ? ` · ${active.artist}` : ""}${active.year ? ` · ${active.year}` : ""}` : undefined}
      >
        {active && (
          <div
            style={{
              width: "100%",
              aspectRatio: "4/3",
              background: `linear-gradient(145deg, ${active.type === "skin" ? "#c4b8a8, #b0a090" : "#e8e0d4, #d4c8b8"})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(10,10,10,0.3)" }}>
              photo placeholder
            </span>
          </div>
        )}
      </Lightbox>
    </section>
  );
}
