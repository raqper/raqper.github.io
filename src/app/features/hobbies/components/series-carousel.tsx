import { motion } from "motion/react";
import { CarouselArrow } from "@/app/components/shared/carousel-arrow";
import { SectionHeader } from "@/app/components/shared/section-header";
import { useCarouselScroll } from "@/app/hooks/use-carousel-scroll";

interface Series {
  id: number;
  title: string;
  year: string;
  genre: string;
  rating: number;
  bg: [string, string];
  note: string;
}

const SERIES: Series[] = [
  { id: 1, title: "Severance", year: "2022", genre: "Sci-fi · Thriller", rating: 10, bg: ["#c8c0d8", "#b8b0c8"], note: "The most unsettling workplace drama ever made." },
  { id: 2, title: "Shogun", year: "2024", genre: "Historical · Drama", rating: 10, bg: ["#d4c8b0", "#c4b8a0"], note: "Visually and narratively perfect. Japan through western eyes." },
  { id: 3, title: "The Bear", year: "2022", genre: "Drama · Comedy", rating: 9, bg: ["#b8c8b8", "#a8b8a8"], note: "Anxiety as a love language." },
  { id: 4, title: "Dark", year: "2017", genre: "Sci-fi · Mystery", rating: 10, bg: ["#bcc0d0", "#acb0c0"], note: "The best time-travel story ever told." },
  { id: 5, title: "Succession", year: "2018", genre: "Drama · Satire", rating: 9, bg: ["#d0c8bc", "#c0b8ac"], note: "Shakespearean tragedy dressed as a boardroom." },
  { id: 6, title: "Twin Peaks: The Return", year: "2017", genre: "Mystery · Surreal", rating: 10, bg: ["#c0c0cc", "#b0b0bc"], note: "Television as art. Nothing before or since." },
  { id: 7, title: "Fleabag", year: "2016", genre: "Comedy · Drama", rating: 10, bg: ["#d4b8b8", "#c4a8a8"], note: "Breaking the fourth wall has never felt so intimate." },
  { id: 8, title: "Mindhunter", year: "2017", genre: "Crime · Thriller", rating: 9, bg: ["#c4c4c8", "#b4b4b8"], note: "Fincher's precision applied to the birth of criminal profiling." },
];

export function SeriesCarousel() {
  const { stripRef, atStart, atEnd, isDragging, scrollBy, scrollByRight, dragHandlers } = useCarouselScroll();

  return (
    <section id="series" className="py-20 overflow-hidden" style={{ background: "#ffffff" }}>
      <div className="px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto">
          <SectionHeader title="Top series">
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
              {SERIES.map((s, i) => {
                const [c1, c2] = s.bg;
                return (
                  <motion.div
                    key={s.id}
                    className="flex-shrink-0"
                    style={{ width: "clamp(260px, 22vw, 360px)" }}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: i * 0.06 }}
                  >
                    <div
                      className="relative overflow-hidden"
                      style={{
                        width: "100%",
                        aspectRatio: "3/4",
                        background: `linear-gradient(145deg, ${c1} 0%, ${c2} 100%)`,
                      }}
                    />
                    <div style={{ marginTop: 10 }}>
                      <p
                        style={{
                          fontFamily: "var(--font-expanded)",
                          fontSize: "15px",
                          fontWeight: 400,
                          letterSpacing: "-0.02em",
                          color: "#0a0a0a",
                          lineHeight: 1.2,
                        }}
                      >
                        {s.title}
                      </p>
                      <p
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: "11px",
                          color: "rgba(10,10,10,0.4)",
                          letterSpacing: "0.02em",
                          marginTop: 3,
                        }}
                      >
                        {s.genre}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="mt-10">
            <div style={{ height: 1, background: "rgba(10,10,10,0.08)" }} />
          </div>
        </div>
      </div>
    </section>
  );
}
