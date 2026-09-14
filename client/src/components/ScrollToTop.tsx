import { useLayoutEffect } from "react";
import { useLocation } from "wouter";

/**
 * Scrolls the window (and any overflowing page containers) back to the top
 * whenever the client-side URL changes.
 */
export function ScrollToTop() {
  const [location] = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    const main = document.querySelector("main");
    if (main instanceof HTMLElement && main.scrollTop) {
      main.scrollTop = 0;
    }
  }, [location]);

  return null;
}
