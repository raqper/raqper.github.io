import { useEffect } from "react";
import { useLocation } from "react-router";

/** Scroll to #section when arriving with a hash (e.g. /career#content, /workshop#program). */
export function useScrollToHash() {
  const { hash } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const id = decodeURIComponent(hash.slice(1));
    // Sections render after the hero; retry briefly until the target exists and layout has settled.
    let tries = 0;
    const timer = window.setInterval(() => {
      const el = document.getElementById(id);
      tries += 1;
      if (el) {
        el.scrollIntoView({ block: "start" });
        if (tries >= 3) window.clearInterval(timer);
      } else if (tries > 30) {
        window.clearInterval(timer);
      }
    }, 100);
    return () => window.clearInterval(timer);
  }, [hash]);
}
