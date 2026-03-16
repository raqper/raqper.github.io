import { motion } from "motion/react";
import { CarouselArrow } from "@/app/components/shared/carousel-arrow";
import { SectionHeader } from "@/app/components/shared/section-header";
import { useCarouselScroll } from "@/app/hooks/use-carousel-scroll";

interface Series {
  id: number;
  title: string;
  year: string;
  genre: string;
  image: string;
}

// High-res poster URLs (original_untouched) for crisp display on smaller cards
const SERIES: Series[] = [
  { id: 1, title: "The Leftovers", year: "2014", genre: "Drama · Sci-Fi · Thriller", image: "https://static.tvmaze.com/uploads/images/original_untouched/503/1259794.jpg" },
  { id: 2, title: "Westworld", year: "2016", genre: "Drama · Sci-Fi · Western", image: "https://static.tvmaze.com/uploads/images/original_untouched/445/1113927.jpg" },
  { id: 3, title: "Severance", year: "2022", genre: "Drama · Sci-Fi · Mystery", image: "https://static.tvmaze.com/uploads/images/original_untouched/548/1371406.jpg" },
  { id: 4, title: "The Handmaid's Tale", year: "2017", genre: "Drama · Sci-Fi", image: "https://static.tvmaze.com/uploads/images/original_untouched/562/1406667.jpg" },
  { id: 5, title: "Dark", year: "2017", genre: "Drama · Sci-Fi · Mystery", image: "https://static.tvmaze.com/uploads/images/original_untouched/504/1262352.jpg" },
  { id: 6, title: "Mr Robot", year: "2015", genre: "Drama · Crime · Thriller", image: "https://static.tvmaze.com/uploads/images/original_untouched/211/528026.jpg" },
  { id: 7, title: "Six Feet Under", year: "2001", genre: "Drama · Comedy", image: "https://static.tvmaze.com/uploads/images/original_untouched/2/5480.jpg" },
  { id: 8, title: "Dexter", year: "2006", genre: "Drama · Crime · Mystery", image: "https://static.tvmaze.com/uploads/images/original_untouched/498/1246067.jpg" },
  { id: 9, title: "Euphoria", year: "2019", genre: "Drama · Crime · Thriller", image: "https://static.tvmaze.com/uploads/images/original_untouched/601/1504779.jpg" },
  { id: 10, title: "True Detective", year: "2014", genre: "Drama · Crime · Thriller", image: "https://static.tvmaze.com/uploads/images/original_untouched/490/1226764.jpg" },
  { id: 11, title: "Fargo", year: "2014", genre: "Drama · Comedy · Crime", image: "https://static.tvmaze.com/uploads/images/original_untouched/487/1219631.jpg" },
  { id: 12, title: "Black Mirror", year: "2011", genre: "Drama · Sci-Fi · Thriller", image: "https://static.tvmaze.com/uploads/images/original_untouched/564/1411764.jpg" },
  { id: 13, title: "Mindhunter", year: "2017", genre: "Drama · Crime · Thriller", image: "https://static.tvmaze.com/uploads/images/original_untouched/501/1253490.jpg" },
  { id: 14, title: "Stranger Things", year: "2016", genre: "Drama · Horror · Sci-Fi", image: "https://static.tvmaze.com/uploads/images/original_untouched/595/1489169.jpg" },
  { id: 15, title: "Big Little Lies", year: "2017", genre: "Drama · Comedy · Mystery", image: "https://static.tvmaze.com/uploads/images/original_untouched/196/490640.jpg" },
  { id: 16, title: "Sharp Objects", year: "2018", genre: "Drama · Mystery", image: "https://static.tvmaze.com/uploads/images/original_untouched/156/391025.jpg" },
  { id: 17, title: "The Sopranos", year: "1999", genre: "Drama · Crime", image: "https://static.tvmaze.com/uploads/images/original_untouched/4/11341.jpg" },
  { id: 18, title: "Breaking Bad", year: "2008", genre: "Drama · Crime · Thriller", image: "https://static.tvmaze.com/uploads/images/original_untouched/501/1253519.jpg" },
  { id: 19, title: "Better Call Saul", year: "2015", genre: "Drama · Crime · Legal", image: "https://static.tvmaze.com/uploads/images/original_untouched/501/1253515.jpg" },
  { id: 20, title: "Game of Thrones", year: "2011", genre: "Drama · Adventure · Fantasy", image: "https://static.tvmaze.com/uploads/images/original_untouched/498/1245274.jpg" },
  { id: 21, title: "Peaky Blinders", year: "2013", genre: "Drama · Crime · History", image: "https://static.tvmaze.com/uploads/images/original_untouched/48/122213.jpg" },
  { id: 22, title: "Mad Men", year: "2007", genre: "Drama", image: "https://static.tvmaze.com/uploads/images/original_untouched/2/5589.jpg" },
  { id: 23, title: "Curb Your Enthusiasm", year: "2000", genre: "Comedy", image: "https://static.tvmaze.com/uploads/images/original_untouched/500/1250735.jpg" },
  { id: 24, title: "Rick and Morty", year: "2013", genre: "Comedy · Adventure · Sci-Fi", image: "https://static.tvmaze.com/uploads/images/original_untouched/477/1194843.jpg" },
  { id: 25, title: "Downton Abbey", year: "2010", genre: "Drama · Family · Romance", image: "https://static.tvmaze.com/uploads/images/original_untouched/1/4601.jpg" },
  { id: 26, title: "Shameless", year: "2011", genre: "Drama · Comedy · Family", image: "https://static.tvmaze.com/uploads/images/original_untouched/486/1215661.jpg" },
  { id: 27, title: "The Mandalorian", year: "2019", genre: "Action · Adventure · Sci-Fi", image: "https://static.tvmaze.com/uploads/images/original_untouched/501/1253498.jpg" },
  { id: 28, title: "Andor", year: "2022", genre: "Sci-Fi · Thriller · Espionage", image: "https://static.tvmaze.com/uploads/images/original_untouched/564/1411766.jpg" },
  { id: 29, title: "Shogun", year: "2024", genre: "Drama · Adventure · History", image: "https://static.tvmaze.com/uploads/images/original_untouched/506/1265637.jpg" },
  { id: 30, title: "The Office", year: "2005", genre: "Comedy", image: "https://static.tvmaze.com/uploads/images/original_untouched/481/1204342.jpg" },
  { id: 31, title: "Silicon Valley", year: "2014", genre: "Comedy", image: "https://static.tvmaze.com/uploads/images/original_untouched/215/538434.jpg" },
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
              className="flex gap-3 overflow-x-auto overflow-y-hidden"
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
              {SERIES.map((s, i) => (
                  <motion.div
                    key={s.id}
                    className="flex-shrink-0"
                    style={{ width: "clamp(140px, 12vw, 200px)" }}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: i * 0.06 }}
                  >
                    <div
                      className="relative overflow-hidden bg-neutral-200"
                      style={{
                        width: "100%",
                        aspectRatio: "3/4",
                      }}
                    >
                      <img
                        src={s.image}
                        alt={s.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div style={{ marginTop: 6 }}>
                      <p
                        style={{
                          fontFamily: "var(--font-expanded)",
                          fontSize: "12px",
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
                          fontSize: "10px",
                          color: "rgba(10,10,10,0.4)",
                          letterSpacing: "0.02em",
                          marginTop: 2,
                        }}
                      >
                        {s.genre}
                      </p>
                    </div>
                  </motion.div>
              ))}
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
