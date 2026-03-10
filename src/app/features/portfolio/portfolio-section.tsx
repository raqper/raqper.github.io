import { useRef, useEffect, useState, useCallback } from "react";
import { ScrollReveal } from "@/app/components/scroll-reveal";
import {
  type UseCaseId,
  chipActiveStyles,
  accents,
  useCaseChips,
  allUseCases,
} from "./portfolio-data";
import { ALL_CARDS, CardRenderer } from "./card-renderer";

export interface PortfolioChipState {
  activeChip: UseCaseId | null;
  handleChipClick: (id: UseCaseId) => void;
}

export function PortfolioSection({ onChipStateChange, navProgressBarRef }: { onChipStateChange?: (state: PortfolioChipState) => void; navProgressBarRef?: React.RefObject<HTMLDivElement | null> }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [extraScroll, setExtraScroll] = useState(0);
  const extraScrollRef = useRef(0);
  const [activeChip, setActiveChip] = useState<UseCaseId | null>(null);
  const scrollActiveRef = useRef<UseCaseId | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const recalculate = useCallback(() => {
    if (!trackRef.current || isMobile) return;
    const viewportWidth = window.innerWidth;

    // Compute total width from children's layout positions (unaffected by transforms)
    const children = trackRef.current.children;
    let contentRight = 0;
    for (let i = 0; i < children.length; i++) {
      const child = children[i] as HTMLElement;
      const right = child.offsetLeft + child.offsetWidth;
      if (right > contentRight) contentRight = right;
    }
    const paddingRight = parseFloat(getComputedStyle(trackRef.current).paddingRight) || 0;
    const totalWidth = contentRight + paddingRight;

    const overflow = Math.max(0, totalWidth - viewportWidth);
    extraScrollRef.current = overflow;
    setExtraScroll(overflow);
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) { setExtraScroll(0); return; }
    recalculate();
    window.addEventListener("resize", recalculate);

    // Observe each child for size changes (media loading causes expansion).
    // The track's own box-model size doesn't change — only its overflow does.
    let ro: ResizeObserver | undefined;
    if (trackRef.current) {
      ro = new ResizeObserver(recalculate);
      Array.from(trackRef.current.children).forEach(child => ro!.observe(child));
    }

    return () => {
      window.removeEventListener("resize", recalculate);
      ro?.disconnect();
    };
  }, [recalculate, isMobile]);

  useEffect(() => {
    if (isMobile) return;
    const onScroll = () => {
      const es = extraScrollRef.current;
      if (!sectionRef.current || !trackRef.current || es <= 0) return;
      const { top } = sectionRef.current.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -top / es));
      trackRef.current.style.transform = `translateX(${-progress * es}px)`;

      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${progress})`;
      }
      if (navProgressBarRef?.current) {
        navProgressBarRef.current.style.transform = `scaleX(${progress})`;
      }

      if (progress > 0) {
        const targetX = window.innerWidth * 0.3;
        const cardElements = trackRef.current.children;
        let closestUseCaseId: UseCaseId | null = null;
        let closestDistance = Infinity;

        for (let i = 0; i < cardElements.length; i++) {
          const cardEl = cardElements[i] as HTMLElement;
          const useCaseId = cardEl.dataset.usecaseId as UseCaseId;
          if (!useCaseId) continue;

          const rect = cardEl.getBoundingClientRect();
          if (rect.right < 0 || rect.left > window.innerWidth) continue;

          const distance = Math.abs(rect.left - targetX);
          if (distance < closestDistance) {
            closestDistance = distance;
            closestUseCaseId = useCaseId;
          }
        }

        if (closestUseCaseId && closestUseCaseId !== scrollActiveRef.current) {
          scrollActiveRef.current = closestUseCaseId;
          setActiveChip(closestUseCaseId);
        }
      } else if (scrollActiveRef.current !== null) {
        scrollActiveRef.current = null;
        setActiveChip(null);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMobile]);

  const handleChipClick = useCallback((id: UseCaseId) => {
    setActiveChip(id);
    scrollActiveRef.current = id;

    if (isMobile) {
      document.getElementById(`uc-${id}`)?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    if (!sectionRef.current || !trackRef.current) return;

    // Compute current extraScroll from layout (same logic as recalculate)
    const children = trackRef.current.children;
    let contentRight = 0;
    for (let i = 0; i < children.length; i++) {
      const child = children[i] as HTMLElement;
      const right = child.offsetLeft + child.offsetWidth;
      if (right > contentRight) contentRight = right;
    }
    const paddingRight = parseFloat(getComputedStyle(trackRef.current).paddingRight) || 0;
    const totalWidth = contentRight + paddingRight;
    const viewportWidth = window.innerWidth;
    const currentExtraScroll = Math.max(0, totalWidth - viewportWidth);
    if (currentExtraScroll <= 0) return;

    // Sync ref and state, and force section height so the page is tall enough to scroll
    extraScrollRef.current = currentExtraScroll;
    setExtraScroll(currentExtraScroll);
    sectionRef.current.style.height = `${window.innerHeight + currentExtraScroll}px`;

    // Find the first card element for this use case
    const cardElements = Array.from(children) as HTMLElement[];
    const targetCard = cardElements.find((el) => el.dataset.usecaseId === id);
    if (!targetCard) return;

    const desiredScreenX = parseFloat(getComputedStyle(trackRef.current).paddingLeft) || 40;
    const translateX = Math.max(0, targetCard.offsetLeft - desiredScreenX);
    const targetProgress = Math.min(1, translateX / currentExtraScroll);

    const sectionTop = sectionRef.current.offsetTop;
    const targetScroll = sectionTop + targetProgress * currentExtraScroll;

    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  }, [isMobile]);

  // Expose chip state to parent (nav bar) — always provide fresh callback
  useEffect(() => {
    onChipStateChange?.({ activeChip, handleChipClick });
  }, [activeChip, handleChipClick, onChipStateChange]);

  const sectionHeight = !isMobile && extraScroll > 0
    ? `${window.innerHeight + extraScroll}px`
    : "auto";

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="relative"
      style={{
        background:
          "linear-gradient(180deg, #0c0024 0%, #0f0028 20%, #130032 38%, #1a0040 52%, #130032 68%, #0f0028 85%, #0f0028 100%)",
        height: sectionHeight,
      }}
    >

      <div className={`${!isMobile && extraScroll > 0 ? "sticky top-0 h-screen" : ""} overflow-hidden flex flex-col`}>
        {/* Spacer for fixed nav */}
        <div className="pt-16 md:pt-20 shrink-0" />

        {isMobile && (
          <div className="px-4 pt-6 pb-16 flex flex-col gap-10 relative z-10">
            {allUseCases.map((uc) => {
              const accent = accents[uc.id];
              const cards = ALL_CARDS.filter((c) => c.useCaseId === uc.id);
              return (
                <div key={uc.id} id={`uc-${uc.id}`}>
                  <div className="flex items-center gap-3 mb-4 px-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: accent }} />
                    <span
                      className="text-[#a89cc8] tracking-[-0.03em] uppercase"
                      style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.05em" }}
                    >
                      {uc.title}
                    </span>
                    <div className="flex-1 h-px" style={{ background: `${accent}25` }} />
                  </div>
                  <div className="flex flex-col gap-4">
                    {cards.map((card) => (
                      <ScrollReveal key={card.id} delay={0.03} duration={0.8} offsetY={20} blur={4}>
                        <div
                          className="rounded-2xl overflow-hidden"
                          style={{
                            minHeight: card.type === "overview" ? "360px" : "auto",
                            aspectRatio: card.type === "media" ? "16 / 9" : undefined,
                            background: card.type === "overview" || card.type === "impact"
                              ? "#130030"
                              : card.type === "media"
                                ? "transparent"
                                : "#1c0048",
                          }}
                        >
                          <CardRenderer card={card} />
                        </div>
                      </ScrollReveal>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {!isMobile && (
          <ScrollReveal
            className="flex-1 flex flex-col justify-center overflow-hidden relative z-10"
            delay={0.25}
            offsetY={0}
            blur={12}
            duration={1.6}
          >
            <div
              ref={trackRef}
              className="flex gap-5 will-change-transform relative py-4"
              style={{
                paddingLeft: "max(1.5rem, calc((100vw - 1400px) / 2 + 2.5rem))",
                paddingRight: "50vw",
              }}
            >
              {ALL_CARDS.map((card, index) => {
                const isFirstInGroup = index === 0 || ALL_CARDS[index - 1].useCaseId !== card.useCaseId;
                const isMedia = card.type === "media";
                const nonMediaHeight = "clamp(480px, 72vh, 720px)";

                return (
                  <div
                    key={card.id}
                    className="flex gap-5 shrink-0 items-center"
                    data-card-index={index}
                    data-usecase-id={card.useCaseId}
                  >
                    {isFirstInGroup && index !== 0 && (
                      <div
                        className="w-px shrink-0 self-stretch mx-3 opacity-20"
                        style={{ background: accents[card.useCaseId] }}
                      />
                    )}
                    <div
                      className="shrink-0 rounded-2xl transition-all duration-300 overflow-hidden"
                      style={{
                        width: (isMedia && card.id !== "nokia-media-pre-impact-2") ? "auto" : "clamp(569px, 57vw, 853px)",
                        height: (isMedia && card.id !== "nokia-media-pre-impact-2") ? "auto" : nonMediaHeight,
                        maxHeight: "clamp(480px, 72vh, 720px)",
                        aspectRatio: (isMedia && card.id !== "nokia-media-pre-impact-2") ? undefined : "1280 / 1080",
                        background:
                          card.type === "overview" || card.type === "impact"
                            ? "#130030"
                            : isMedia
                              ? "transparent"
                              : "#1c0048",
                      }}
                    >
                      <CardRenderer card={card} />
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
