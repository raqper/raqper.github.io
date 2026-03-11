import { useRef, useState, useCallback, useEffect } from "react";

const CARD_STEP = 280;

export function useCarouselScroll() {
  const stripRef = useRef<HTMLDivElement>(null);
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

  return {
    stripRef,
    atStart,
    atEnd,
    isDragging,
    scrollBy: () => scrollBy(-CARD_STEP),
    scrollByRight: () => scrollBy(CARD_STEP),
    dragHandlers: { onMouseDown, onMouseMove, onMouseUp },
  };
}
