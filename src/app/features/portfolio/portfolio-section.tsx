import { useRef, useEffect, useState, useCallback } from "react";
import { ScrollReveal } from "@/app/components/scroll-reveal";
import {
  type UseCaseId,
  accents,
  allUseCases,
} from "./portfolio-data";
import { ALL_CARDS, CardRenderer } from "./card-renderer";

export interface PortfolioChipState {
  activeChip: UseCaseId | null;
  handleChipClick: (id: UseCaseId) => void;
}

const cardsByUseCase = new Map<UseCaseId, typeof ALL_CARDS>();
const introCard = ALL_CARDS.find((card) => card.type === "intro");
for (const useCase of allUseCases) {
  cardsByUseCase.set(
    useCase.id,
    ALL_CARDS.filter((card) => card.useCaseId === useCase.id && card.type !== "intro")
  );
}

/* ── Measure how many px the track overflows the viewport ── */
function measureTrackOverflow(
  trackElement: HTMLDivElement,
  viewportWidth: number
): number {
  const children = trackElement.children;
  let contentRight = 0;
  for (let i = 0; i < children.length; i++) {
    const child = children[i] as HTMLElement;
    const right = child.offsetLeft + child.offsetWidth;
    if (right > contentRight) contentRight = right;
  }
  const paddingRight =
    parseFloat(getComputedStyle(trackElement).paddingRight) || 0;
  return Math.max(0, contentRight + paddingRight - viewportWidth);
}

/* ── Lock / unlock body vertical scroll ── */
function lockBodyScroll() {
  document.documentElement.style.overflow = "hidden";
}
function unlockBodyScroll() {
  document.documentElement.style.overflow = "";
}

export function PortfolioSection({ onChipStateChange, navProgressBarRef }: { onChipStateChange?: (state: PortfolioChipState) => void; navProgressBarRef?: React.RefObject<HTMLDivElement | null> }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const trackAlignRef = useRef<HTMLDivElement>(null);

  // Current horizontal offset (accumulated from wheel deltas)
  const offsetRef = useRef(0);
  // Maximum horizontal offset (track overflow)
  const maxOffsetRef = useRef(0);
  // Whether this section currently owns scroll (body locked)
  const lockedRef = useRef(false);

  const [activeChip, setActiveChip] = useState<UseCaseId | null>(null);
  const scrollActiveRef = useRef<UseCaseId | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* ── Apply current offset to track + progress bar + active chip ── */
  const applyOffset = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const max = maxOffsetRef.current;
    const offset = offsetRef.current;
    const progress = max > 0 ? offset / max : 0;

    track.style.transform = `translateX(${-offset}px)`;

    if (navProgressBarRef?.current) {
      navProgressBarRef.current.style.transform = `scaleX(${progress})`;
    }

    // Determine which use-case chip is closest to the 30% viewport mark
    if (progress > 0) {
      const targetX = window.innerWidth * 0.3;
      let closestUseCaseId: UseCaseId | null = null;
      let closestDistance = Infinity;

      for (let i = 0; i < track.children.length; i++) {
        const cardEl = track.children[i] as HTMLElement;
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
  }, [navProgressBarRef]);

  /* ── Recalculate track overflow on resize / media load ── */
  const recalculate = useCallback(() => {
    if (!trackRef.current || isMobile) return;
    const overflow = measureTrackOverflow(trackRef.current, window.innerWidth);
    maxOffsetRef.current = overflow;
    // Clamp current offset if content shrank
    if (offsetRef.current > overflow) {
      offsetRef.current = overflow;
      applyOffset();
    }
  }, [isMobile, applyOffset]);

  useEffect(() => {
    if (isMobile) {
      // Reset everything on mobile
      maxOffsetRef.current = 0;
      offsetRef.current = 0;
      scrollActiveRef.current = null;
      setActiveChip(null);
      if (lockedRef.current) {
        unlockBodyScroll();
        lockedRef.current = false;
      }
      if (navProgressBarRef?.current) {
        navProgressBarRef.current.style.transform = "scaleX(0)";
      }
      return;
    }

    recalculate();
    window.addEventListener("resize", recalculate);

    let ro: ResizeObserver | undefined;
    if (trackRef.current) {
      ro = new ResizeObserver(recalculate);
      ro.observe(trackRef.current);
      Array.from(trackRef.current.children).forEach(child => ro!.observe(child));
    }

    return () => {
      window.removeEventListener("resize", recalculate);
      ro?.disconnect();
      if (lockedRef.current) {
        unlockBodyScroll();
        lockedRef.current = false;
      }
    };
  }, [recalculate, isMobile, navProgressBarRef]);

  /* ── Wheel handler: intercept scroll, drive horizontal offset ── */
  useEffect(() => {
    if (isMobile) return;
    const section = sectionRef.current;
    if (!section) return;

    // Track whether the user has scrolled past the section (exited downward)
    let exitedDown = false;

    const onWheel = (e: WheelEvent) => {
      const max = maxOffsetRef.current;
      if (max <= 0) return;

      const rect = section.getBoundingClientRect();

      // Section top must be at or above viewport top, and section must still be visible
      const sectionCoversViewport = rect.top <= 1 && rect.bottom > 0;
      // Also activate when the section is approaching the top (within 10px)
      const sectionAtTop = rect.top >= 0 && rect.top <= 10;
      const sectionActive = sectionCoversViewport || sectionAtTop;

      // If the user scrolled past the section downward, mark it
      if (rect.bottom <= 0) {
        exitedDown = true;
        if (lockedRef.current) {
          unlockBodyScroll();
          lockedRef.current = false;
        }
        return;
      }

      // If user exited down and is scrolling back up, only re-engage
      // when the section bottom is near the viewport bottom (scrolling back into it)
      // and offset is at max (meaning they need to reverse through horizontal content)
      if (exitedDown) {
        if (sectionCoversViewport && offsetRef.current >= max) {
          // User scrolled back up into the section - re-engage
          exitedDown = false;
        } else {
          // Still past the section or not ready to re-engage
          return;
        }
      }

      if (!sectionActive) {
        if (lockedRef.current) {
          unlockBodyScroll();
          lockedRef.current = false;
        }
        return;
      }

      // Use whichever axis has larger delta (vertical wheel → horizontal)
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (delta === 0) return;

      const current = offsetRef.current;

      // Scrolling down/right → increase offset
      if (delta > 0 && current < max) {
        e.preventDefault();
        offsetRef.current = Math.min(max, current + delta);
        applyOffset();
        if (!lockedRef.current) {
          lockBodyScroll();
          lockedRef.current = true;
        }
        return;
      }

      // Scrolling up/left → decrease offset
      if (delta < 0 && current > 0) {
        e.preventDefault();
        offsetRef.current = Math.max(0, current + delta);
        applyOffset();
        if (!lockedRef.current) {
          lockBodyScroll();
          lockedRef.current = true;
        }
        return;
      }

      // At boundary (offset=0 scrolling up, or offset=max scrolling down) → release
      if (lockedRef.current) {
        unlockBodyScroll();
        lockedRef.current = false;
      }
      // Mark exit direction
      if (delta > 0 && current >= max) {
        exitedDown = true;
      }
    };

    // Must be non-passive to allow preventDefault
    window.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", onWheel);
      if (lockedRef.current) {
        unlockBodyScroll();
        lockedRef.current = false;
      }
    };
  }, [isMobile, applyOffset]);

  /* ── Touch handler: same logic for mobile-like swipe on desktop ── */
  useEffect(() => {
    if (isMobile) return;
    const section = sectionRef.current;
    if (!section) return;

    let touchStartY = 0;
    let touchStartOffset = 0;

    const onTouchStart = (e: TouchEvent) => {
      const max = maxOffsetRef.current;
      if (max <= 0) return;
      const rect = section.getBoundingClientRect();
      if (rect.top > window.innerHeight * 0.5 || rect.bottom <= 0) return;
      touchStartY = e.touches[0].clientY;
      touchStartOffset = offsetRef.current;
    };

    const onTouchMove = (e: TouchEvent) => {
      const max = maxOffsetRef.current;
      if (max <= 0) return;
      const rect = section.getBoundingClientRect();
      if (rect.top > window.innerHeight * 0.5 || rect.bottom <= 0) return;

      const deltaY = touchStartY - e.touches[0].clientY;
      const newOffset = Math.min(max, Math.max(0, touchStartOffset + deltaY));

      if (newOffset !== offsetRef.current) {
        if (newOffset > 0 && newOffset < max) {
          e.preventDefault();
        }
        offsetRef.current = newOffset;
        applyOffset();
        if (!lockedRef.current && newOffset > 0 && newOffset < max) {
          lockBodyScroll();
          lockedRef.current = true;
        }
      }

      // At boundaries, release
      if ((newOffset === 0 && deltaY < 0) || (newOffset === max && deltaY > 0)) {
        if (lockedRef.current) {
          unlockBodyScroll();
          lockedRef.current = false;
        }
      }
    };

    const onTouchEnd = () => {
      // Keep lock state - it will be released on next scroll boundary
    };

    section.addEventListener("touchstart", onTouchStart, { passive: true });
    section.addEventListener("touchmove", onTouchMove, { passive: false });
    section.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      section.removeEventListener("touchstart", onTouchStart);
      section.removeEventListener("touchmove", onTouchMove);
      section.removeEventListener("touchend", onTouchEnd);
    };
  }, [isMobile, applyOffset]);


  /* ── Chip click → animate horizontal offset ── */
  const handleChipClick = useCallback((id: UseCaseId) => {
    setActiveChip(id);
    scrollActiveRef.current = id;

    if (isMobile) {
      document.getElementById(`uc-${id}`)?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    if (!trackRef.current || !sectionRef.current) return;

    const max = measureTrackOverflow(trackRef.current, window.innerWidth);
    if (max <= 0) return;
    maxOffsetRef.current = max;

    // First scroll the page so the section is at the top
    const rect = sectionRef.current.getBoundingClientRect();
    if (rect.top > 1) {
      window.scrollTo({ top: sectionRef.current.offsetTop, behavior: "smooth" });
    }

    // Find the first card element for this use case (skip intro)
    const cardElements = Array.from(trackRef.current.children) as HTMLElement[];
    const targetCard = cardElements.find(
      (el) => el.dataset.usecaseId === id && el.dataset.cardType !== "intro"
    );
    if (!targetCard) return;

    const alignLeft = trackAlignRef.current?.getBoundingClientRect().left ?? 40;
    const trackLeft = trackRef.current.getBoundingClientRect().left;
    const targetOffset = Math.min(
      max,
      Math.max(0, targetCard.offsetLeft + trackLeft - alignLeft)
    );

    // Animate to target offset
    const start = offsetRef.current;
    const distance = targetOffset - start;
    const duration = Math.min(800, Math.abs(distance) * 0.5 + 200);
    const startTime = performance.now();

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      offsetRef.current = start + distance * easeOutCubic(t);
      applyOffset();
      if (t < 1) requestAnimationFrame(animate);
    };

    if (!lockedRef.current) {
      lockBodyScroll();
      lockedRef.current = true;
    }
    requestAnimationFrame(animate);
  }, [isMobile, applyOffset]);

  // Expose chip state to parent (nav bar) - always provide fresh callback
  useEffect(() => {
    onChipStateChange?.({ activeChip, handleChipClick });
  }, [activeChip, handleChipClick, onChipStateChange]);

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="relative"
      style={{
        background:
          "linear-gradient(180deg, #0c0024 0%, #0f0028 20%, #130032 38%, #1a0040 52%, #130032 68%, #0f0028 85%, #0f0028 100%)",
        height: isMobile ? undefined : "100vh",
      }}
    >
      <div className="overflow-hidden flex flex-col h-full">
        {/* Spacer for fixed nav */}
        <div className="pt-36 md:pt-28 shrink-0" />

        {isMobile && (
          <div className="px-4 pt-6 pb-16 flex flex-col gap-10 relative z-10 overflow-x-hidden w-full max-w-full">
            {introCard && (
              <ScrollReveal>
                <div
                  className="rounded-2xl overflow-hidden w-full max-w-full"
                  style={{
                    background: "#130030",
                    border: "1px solid rgba(176,136,40,0.15)",
                  }}
                >
                  <CardRenderer card={introCard} onCaseClick={handleChipClick} />
                </div>
              </ScrollReveal>
            )}
            {allUseCases.map((uc) => {
              const accent = accents[uc.id];
              const cards = cardsByUseCase.get(uc.id) ?? [];
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
                    {cards.map((card) => {
                      const isNokiaCompareCard = card.id === "nokia-media-pre-impact-2";
                      return (
                      <ScrollReveal key={card.id}>
                        <div
                          className={`rounded-2xl overflow-hidden w-full max-w-full${
                            card.type === "media"
                              ? isNokiaCompareCard
                                ? " flex h-full min-h-0 flex-col"
                                : " flex items-center justify-center"
                              : ""
                          }`}
                          style={{
                            height: isNokiaCompareCard ? "clamp(360px, 95vw, 520px)" : undefined,
                            minHeight:
                              card.type === "overview"
                                ? "360px"
                                : isNokiaCompareCard
                                  ? "clamp(360px, 95vw, 520px)"
                                  : "auto",
                            aspectRatio:
                              card.type === "media" && !isNokiaCompareCard
                                ? "16 / 9"
                                : undefined,
                            background:
                              card.type === "overview" || card.type === "impact" || card.type === "intro"
                                ? "#130030"
                                : card.type === "media"
                                  ? "transparent"
                                  : "#1c0048",
                          }}
                        >
                          <CardRenderer card={card} onCaseClick={handleChipClick} />
                        </div>
                      </ScrollReveal>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {!isMobile && (
          <div className="flex-1 flex flex-col justify-center overflow-hidden relative z-10">
            <div className="px-4 sm:px-6 md:px-10 w-full">
              <div
                ref={trackAlignRef}
                className="max-w-[1400px] mx-auto w-full overflow-visible"
              >
                <div
                  ref={trackRef}
                  className="flex gap-5 will-change-transform relative pb-4"
                  style={{ paddingRight: "50vw" }}
                >
              {ALL_CARDS.map((card, index) => {
                const isFirstInGroup = index === 0 || ALL_CARDS[index - 1].useCaseId !== card.useCaseId;
                const isMedia = card.type === "media";
                const isIntro = card.type === "intro";
                const isLearnings = card.type === "learnings";
                const isPrototypeFlowStep = card.type === "prototypeFlowStep";
                const isNokiaCompareCard = card.id === "nokia-media-pre-impact-2";
                const nonMediaHeight = "clamp(440px, calc(100vh - 9.5rem), 760px)";
                const cardWidth = isIntro
                  ? "clamp(640px, 64vw, 960px)"
                  : isPrototypeFlowStep
                    ? "clamp(880px, 78vw, 1152px)"
                  : isMedia
                    ? "auto"
                    : "clamp(569px, 57vw, 853px)";
                const cardHeight = isMedia
                  ? isNokiaCompareCard
                    ? nonMediaHeight
                    : "auto"
                  : nonMediaHeight;
                const cardMaxHeight = nonMediaHeight;

                return (
                  <div
                    key={card.id}
                    className="flex gap-5 shrink-0 items-center"
                    data-card-index={index}
                    data-usecase-id={card.useCaseId}
                    data-card-type={card.type}
                  >
                    {isFirstInGroup && index !== 0 && (
                      <div
                        className="w-px shrink-0 self-stretch mx-3 opacity-20"
                        style={{ background: accents[card.useCaseId] }}
                      />
                    )}
                    <div
                      className={`shrink-0 rounded-2xl transition-all duration-300 overflow-hidden${
                        isMedia
                          ? isNokiaCompareCard
                            ? " flex flex-col"
                            : " flex items-center justify-center"
                          : ""
                      }`}
                      style={{
                        width: cardWidth,
                        height: cardHeight,
                        maxHeight: cardMaxHeight,
                        aspectRatio: isMedia
                          ? isNokiaCompareCard
                            ? "16 / 9"
                            : undefined
                          : isIntro || isLearnings || isPrototypeFlowStep
                            ? undefined
                            : "1280 / 1080",
                        background:
                          card.type === "overview" || card.type === "impact" || card.type === "intro"
                            ? "#130030"
                            : isMedia
                              ? "transparent"
                              : "#1c0048",
                        border: isIntro ? "1px solid rgba(176,136,40,0.15)" : undefined,
                      }}
                    >
                      <CardRenderer card={card} onCaseClick={handleChipClick} />
                    </div>
                  </div>
                );
              })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
