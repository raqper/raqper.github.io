import { useRef, useState, useCallback, useEffect } from "react";

const DEFAULT_CARD_STEP = 280;

export type UseCarouselScrollOptions = {
  /** When set, arrow scroll distance = first matching card width + gap (responsive). */
  arrowStepCardSelector?: string;
  /** Flex gap between cards in px (e.g. Tailwind gap-4 = 16). */
  arrowStepGapPx?: number;
  /** Used when selector misses or before layout (should match desktop max card + gap). */
  fallbackArrowStepPx?: number;
};

export function useCarouselScroll(options?: UseCarouselScrollOptions) {
  const stripRef = useRef<HTMLDivElement>(null);
  const gapPx = options?.arrowStepGapPx ?? 16;
  const fallbackStep = options?.fallbackArrowStepPx ?? DEFAULT_CARD_STEP;
  const cardSelector = options?.arrowStepCardSelector;
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftStart, setScrollLeftStart] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = stripRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const maxScroll = scrollWidth - clientWidth;
    setAtStart(scrollLeft <= 2);
    setAtEnd(scrollLeft >= maxScroll - 2);
  }, []);

  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState);
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  const onMouseDown = (e: React.MouseEvent) => {
    if (!stripRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - (stripRef.current.offsetLeft ?? 0));
    setScrollLeftStart(stripRef.current.scrollLeft);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !stripRef.current) return;
    e.preventDefault();
    const x = e.pageX - (stripRef.current.offsetLeft ?? 0);
    const walk = (x - startX) * 1.4;
    stripRef.current.scrollLeft = scrollLeftStart - walk;
  };

  const onMouseUp = () => setIsDragging(false);

  const scrollBy = (delta: number) => {
    const el = stripRef.current;
    if (!el) return;
    el.scrollTo({ left: el.scrollLeft + delta, behavior: "smooth" });
  };

  const getArrowStep = useCallback(() => {
    if (!cardSelector) return DEFAULT_CARD_STEP;
    const el = stripRef.current;
    if (!el) return fallbackStep;
    const card = el.querySelector<HTMLElement>(cardSelector);
    if (!card) return fallbackStep;
    return Math.round(card.getBoundingClientRect().width) + gapPx;
  }, [cardSelector, gapPx, fallbackStep]);

  return {
    stripRef,
    atStart,
    atEnd,
    isDragging,
    scrollBy: () => scrollBy(-getArrowStep()),
    scrollByRight: () => scrollBy(getArrowStep()),
    dragHandlers: { onMouseDown, onMouseMove, onMouseUp },
  };
}
