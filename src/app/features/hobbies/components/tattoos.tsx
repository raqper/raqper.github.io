import { motion } from "motion/react";
import { CarouselArrow } from "@/app/components/shared/carousel-arrow";
import { SectionHeader } from "@/app/components/shared/section-header";
import { useCarouselScroll } from "@/app/hooks/use-carousel-scroll";

import tattoo1 from "@/assets/tattoo/tattoo1.jpg";
import tattoo2 from "@/assets/tattoo/tattoo2.jpg";
import tattoo3 from "@/assets/tattoo/tattoo3.jpg";
import tattoo4 from "@/assets/tattoo/tattoo4.jpg";
import tattoo5 from "@/assets/tattoo/tattoo5.jpg";
import tattoo6 from "@/assets/tattoo/tattoo6.jpg";
import tattoo7 from "@/assets/tattoo/tattoo7.jpg";
import tattoo8 from "@/assets/tattoo/tattoo8.jpg";
import tattoo9 from "@/assets/tattoo/tattoo9.jpg";
import tattoo10 from "@/assets/tattoo/tattoo10.jpg";
import tattoo11 from "@/assets/tattoo/tattoo11.jpg";
import tattoo12 from "@/assets/tattoo/tattoo12.jpg";
import tattoo13 from "@/assets/tattoo/tattoo13.jpg";
import tattoo14 from "@/assets/tattoo/tattoo14.jpg";
import tattoo15 from "@/assets/tattoo/tattoo15.jpg";
import tattoo16 from "@/assets/tattoo/tattoo16.jpg";

interface TattooItem {
  id: number;
  title: string;
  src: string;
}

// Ordered newest → oldest (tattoo16 is newest, tattoo1 is oldest)
const TATTOOS: TattooItem[] = [
  { id: 16, title: "Rock on", src: tattoo16 },
  { id: 15, title: "Swallow & flower", src: tattoo15 },
  { id: 14, title: "Bunny", src: tattoo14 },
  { id: 13, title: "Lightning bolt", src: tattoo13 },
  { id: 12, title: "Skull & rays", src: tattoo12 },
  { id: 11, title: "Botanical stamp", src: tattoo11 },
  { id: 10, title: "Orchid shoulder", src: tattoo10 },
  { id: 9, title: "Laurel wreath", src: tattoo9 },
  { id: 8, title: "Ouroboros", src: tattoo8 },
  { id: 7, title: "Starbursts", src: tattoo7 },
  { id: 6, title: "Four-leaf clover", src: tattoo6 },
  { id: 5, title: "Dagger", src: tattoo5 },
  { id: 4, title: "Tribal scorpion", src: tattoo4 },
  { id: 3, title: "Stick figure angel", src: tattoo3 },
  { id: 2, title: "Oni mask", src: tattoo2 },
  { id: 1, title: "Strength", src: tattoo1 },
];

export function Tattoos() {
  const { stripRef, atStart, atEnd, isDragging, scrollBy, scrollByRight, dragHandlers } = useCarouselScroll();

  return (
    <section id="tattoos" className="py-20" style={{ background: "#ffffff" }}>
      <div className="px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto">
          <SectionHeader title="Tattoos">
            <div className="flex items-center gap-2">
              <CarouselArrow direction="left" disabled={atStart} onClick={scrollBy} />
              <CarouselArrow direction="right" disabled={atEnd} onClick={scrollByRight} />
            </div>
          </SectionHeader>

          <div style={{ marginLeft: "calc(-50vw + 50%)", marginRight: "calc(-50vw + 50%)" }}>
            <div
              ref={stripRef}
              className="flex gap-4 overflow-x-auto overflow-y-hidden no-scrollbar snap-x snap-proximity"
              style={{
                paddingBottom: 16,
                paddingLeft: "max(24px, min(40px, 5.2vw), -660px + 48vw)",
                paddingRight: "max(24px, min(40px, 5.2vw), calc((100vw - 1400px) / 2 + 40px))",
                scrollPaddingInlineStart: "max(24px, min(40px, 5.2vw), -660px + 48vw)",
                cursor: isDragging ? "grabbing" : "grab",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                userSelect: "none",
              }}
              {...dragHandlers}
              onMouseLeave={dragHandlers.onMouseUp}
            >
              {TATTOOS.map((tattoo, i) => (
                <motion.div
                  key={tattoo.id}
                  className="relative overflow-hidden flex-shrink-0 snap-start group"
                  style={{
                    width: "clamp(260px, 22vw, 360px)",
                    aspectRatio: "3/4",
                  }}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.25, delay: i * 0.02 }}
                >
                  <img
                    src={tattoo.src}
                    alt={tattoo.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                  />

                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
