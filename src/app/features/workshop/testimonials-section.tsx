import { testimonials, testimonialsReady, type Testimonial } from "@/app/data/workshop-data";
import { PRETTY, SectionHeading, SectionShell } from "./section-heading";

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <figure className="flex h-full flex-col justify-between gap-6 rounded-xl border border-[#2e1a6a] bg-[#1c0048]/60 p-5 md:p-7">
      <blockquote
        className={`text-[#edeaf5] tracking-[-0.02em] ${PRETTY}`}
        style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(15px, 1.2vw, 17px)", lineHeight: 1.6 }}
      >
        <span aria-hidden className="mr-0.5 text-[#d4a848]">“</span>
        {item.quote}
        <span aria-hidden className="ml-0.5 text-[#d4a848]">”</span>
      </blockquote>
      <figcaption className="flex items-center gap-3">
        {item.photo ? (
          <img src={item.photo} alt="" loading="lazy" className="h-11 w-11 shrink-0 rounded-full object-cover border border-[#2e1a6a]" />
        ) : (
          <span
            aria-hidden
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#2e1a6a] bg-[#130032] text-[#ede0a8]"
            style={{ fontFamily: "var(--font-expanded)", fontSize: "14px", fontWeight: 600 }}
          >
            {initials(item.name)}
          </span>
        )}
        <span className="min-w-0">
          <span className="block text-[#edeaf5]" style={{ fontFamily: "var(--font-sans)", fontSize: "15px", fontWeight: 600 }}>
            {item.name}
          </span>
          <span className="block text-[#a89cc8]" style={{ fontFamily: "var(--font-sans)", fontSize: "13px", lineHeight: 1.4 }}>
            {item.role} · {item.course}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

/** Up to three quotes from past students. Hidden in production until testimonialsReady is true. */
export function TestimonialsSection() {
  if (!testimonialsReady && !import.meta.env.DEV) return null;
  const items = testimonials.slice(0, 3);
  if (items.length === 0) return null;

  return (
    <SectionShell
      id="testimonials"
      labelledBy="testimonials-title"
      background="linear-gradient(180deg, #0a001c 0%, #0f0028 60%, #0a001c 100%)"
    >
      <SectionHeading id="testimonials-title" eyebrow="Past students" title="What people say after learning with me" star="violetStar" />
      {!testimonialsReady && (
        <p className="mt-4 inline-block rounded-md border border-dashed border-[#d4a848]/50 px-3 py-1.5 text-[#d4a848]" style={{ fontFamily: "var(--font-sans)", fontSize: "12px" }}>
          Dev preview: placeholder quotes, hidden on the live site until testimonialsReady is true.
        </p>
      )}
      {/* Mobile: swipeable row. md+: three columns. */}
      <ul className="-mx-5 mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 md:mx-0 md:mt-12 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0 md:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((item, i) => (
          <li key={`${item.name}-${i}`} className="w-[85%] shrink-0 snap-start md:w-auto">
            <TestimonialCard item={item} />
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
