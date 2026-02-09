import { useCallback, useEffect, useState } from "react";

/**
 * Returns the id of the section currently in view (by comparing scroll position to section tops).
 * sectionIds: ordered list of section element ids.
 * scrollContainerRef: ref attached to the scrollable main content element.
 */
export function useScrollSpy(
  sectionIds: string[],
  scrollContainerRef: React.RefObject<HTMLElement | null>
): string | null {
  const [activeId, setActiveId] = useState<string | null>(sectionIds[0] ?? null);

  const updateActive = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el || sectionIds.length === 0) return;

    const containerTop = el.scrollTop;
    const containerHeight = el.clientHeight;
    const center = containerTop + containerHeight / 2;

    let current: string | null = null;
    for (const id of sectionIds) {
      const section = document.getElementById(id);
      if (!section) continue;
      const rect = section.getBoundingClientRect();
      const parent = el.getBoundingClientRect();
      const sectionTop = rect.top - parent.top + containerTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      if (center >= sectionTop && center <= sectionBottom) {
        current = id;
        break;
      }
      if (center >= sectionTop) current = id;
    }
    setActiveId(current ?? sectionIds[0] ?? null);
  }, [sectionIds, scrollContainerRef]);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    updateActive();
    el.addEventListener("scroll", updateActive, { passive: true });
    const obs = new ResizeObserver(updateActive);
    obs.observe(el);
    return () => {
      el.removeEventListener("scroll", updateActive);
      obs.disconnect();
    };
  }, [updateActive, scrollContainerRef]);

  return activeId;
}
