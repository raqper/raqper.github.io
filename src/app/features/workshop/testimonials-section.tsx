import { useId, useState } from "react";
import { testimonials, type Testimonial } from "@/app/data/workshop-data";
import { PRETTY, SectionHeading, SectionShell } from "./section-heading";

const SANS = { fontFamily: "var(--font-sans)" } as const;

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-3.5 w-3.5 fill-current">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

/** Compact card: who, a one-line highlight, then the full quote clamped with a Read more toggle. */
function TestimonialCard({ item }: { item: Testimonial }) {
  const [open, setOpen] = useState(false);
  const quoteId = useId();

  return (
    <figure className="flex h-full flex-col rounded-2xl border border-[#2e1a6a] bg-[#1c0048]/60 p-5">
      <figcaption className="flex items-center gap-3">
        {item.photo ? (
          <img
            src={item.photo}
            alt=""
            width={44}
            height={44}
            loading="lazy"
            className="h-11 w-11 shrink-0 rounded-full border border-[#2e1a6a] object-cover"
          />
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
          {item.linkedin ? (
            <a
              href={item.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#edeaf5] underline-offset-2 hover:text-[#ede0a8] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ede0a8] rounded"
              style={{ ...SANS, fontSize: "15px", fontWeight: 600 }}
            >
              {item.name}
              <LinkedInIcon />
              <span className="sr-only">(LinkedIn profile, opens in a new tab)</span>
            </a>
          ) : (
            <span className="block text-[#edeaf5]" style={{ ...SANS, fontSize: "15px", fontWeight: 600 }}>
              {item.name}
            </span>
          )}
          <span className="block text-[#a89cc8]" style={{ ...SANS, fontSize: "13px", lineHeight: 1.4 }}>
            {item.role}
            {item.course ? ` · ${item.course}` : ""}
          </span>
        </span>
      </figcaption>

      <p
        className={`mt-4 text-[#ede0a8] tracking-[-0.03em] ${PRETTY}`}
        style={{ fontFamily: "var(--font-expanded)", fontSize: "17px", fontWeight: 600, lineHeight: 1.35 }}
      >
        “{item.highlight}”
      </p>

      <blockquote
        id={quoteId}
        className={`mt-3 text-white/80 tracking-[-0.02em] ${PRETTY} ${open ? "" : "line-clamp-5"}`}
        style={{ ...SANS, fontSize: "14px", lineHeight: 1.6 }}
      >
        {item.quote}
      </blockquote>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={quoteId}
        onClick={() => setOpen((v) => !v)}
        className="mt-2 self-start rounded text-[#d4a848] hover:text-[#ede0a8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ede0a8]"
        style={{ ...SANS, fontSize: "13px", fontWeight: 600 }}
      >
        {open ? "Show less" : "Read more"}
      </button>
    </figure>
  );
}

/** Up to four consented quotes. Four aligned columns on large screens, a swipeable row below. */
export function TestimonialsSection() {
  const items = testimonials.slice(0, 4);
  if (items.length === 0) return null;

  return (
    <SectionShell
      id="testimonials"
      labelledBy="testimonials-title"
      background="linear-gradient(180deg, #0a001c 0%, #0f0028 60%, #0a001c 100%)"
    >
      <SectionHeading id="testimonials-title" eyebrow="Past students" title="What people say after learning with me" star="violetStar" />
      <ul
        aria-label="Testimonials"
        className="-mx-5 mt-8 flex snap-x snap-mandatory items-start gap-4 overflow-x-auto px-5 pb-2 md:mt-10 lg:mx-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0 lg:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, i) => (
          <li key={`${item.name}-${i}`} className="w-[85%] max-w-[340px] shrink-0 snap-start sm:w-[320px] lg:w-auto lg:max-w-none">
            <TestimonialCard item={item} />
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
