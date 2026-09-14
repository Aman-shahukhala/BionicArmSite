import { useEffect, useRef } from 'react';

export function usePointToPointScroll(sectionIds: string[], enabled = true) {
  const isScrollingRef = useRef(false);
  const touchStartYRef = useRef(0);
  const lastScrollTimeRef = useRef(0);
  const rafIdRef = useRef<number>(0);

  useEffect(() => {
    if (!enabled) return;

    const getSectionOffsets = () => {
      return sectionIds
        .map((id) => {
          const el = document.getElementById(id);
          if (!el) return null;
          // getBoundingClientRect gives viewport-relative position;
          // adding scrollY converts to absolute document position,
          // regardless of positioned ancestor (offsetParent) differences.
          const top = el.getBoundingClientRect().top + window.scrollY;
          return { id, top, el };
        })
        .filter(Boolean) as { id: string; top: number; el: HTMLElement }[];
    };

    const getCurrentIndex = (direction?: 'up' | 'down') => {
      const sections = getSectionOffsets();
      if (sections.length === 0) return 0;
      const scrollY = window.scrollY;

      // Find the last section whose top we've scrolled past (or are at)
      let currentIdx = 0;
      for (let i = 0; i < sections.length; i++) {
        if (scrollY >= sections[i].top - 5) {
          currentIdx = i;
        }
      }

      // If we're mid-section and scrolling down, treat current as the section we're in
      // If scrolling up, same — just step back one from currentIdx
      return currentIdx;
    };

    const smoothScrollTo = (targetY: number, duration = 600) => {
      const startY = window.scrollY;
      const diff = targetY - startY;
      if (Math.abs(diff) < 2) {
        isScrollingRef.current = false;
        return;
      }

      isScrollingRef.current = true;
      lastScrollTimeRef.current = Date.now();
      cancelAnimationFrame(rafIdRef.current);

      const startTime = performance.now();

      // Smooth custom quartic easing (silky start, gentle deceleration landing)
      const easeOutQuart = (x: number): number => 1 - Math.pow(1 - x, 4);

      const animate = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutQuart(progress);

        window.scrollTo(0, startY + diff * eased);

        if (progress < 1) {
          rafIdRef.current = requestAnimationFrame(animate);
        } else {
          window.scrollTo(0, targetY);
          // Cooldown to absorb inertial tail events from trackpads
          setTimeout(() => {
            isScrollingRef.current = false;
          }, 150);
        }
      };

      rafIdRef.current = requestAnimationFrame(animate);
    };

    const scrollToSection = (index: number) => {
      const sections = getSectionOffsets();
      if (index < 0 || index >= sections.length) return;

      const target = sections[index];
      if (!target) return;

      smoothScrollTo(target.top, 600);
    };

    const handleWheel = (e: WheelEvent) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) return;

      e.preventDefault();

      const now = Date.now();
      if (isScrollingRef.current || now - lastScrollTimeRef.current < 650) {
        return;
      }

      if (Math.abs(e.deltaY) < 16) return;

      const currentIdx = getCurrentIndex();

      if (e.deltaY > 0) {
        scrollToSection(currentIdx + 1);
      } else {
        scrollToSection(currentIdx - 1);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartYRef.current - touchEndY;

      if (Math.abs(deltaY) < 35) return;

      const now = Date.now();
      if (isScrollingRef.current || now - lastScrollTimeRef.current < 650) return;

      const currentIdx = getCurrentIndex();
      if (deltaY > 0) {
        scrollToSection(currentIdx + 1);
      } else {
        scrollToSection(currentIdx - 1);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) return;

      const currentIdx = getCurrentIndex();

      if (['ArrowDown', 'PageDown', ' '].includes(e.key) || e.key.toLowerCase() === 's') {
        e.preventDefault();
        scrollToSection(currentIdx + 1);
      } else if (['ArrowUp', 'PageUp'].includes(e.key) || e.key.toLowerCase() === 'w') {
        e.preventDefault();
        scrollToSection(currentIdx - 1);
      } else if (e.key === 'Home') {
        e.preventDefault();
        scrollToSection(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        scrollToSection(sectionIds.length - 1);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      cancelAnimationFrame(rafIdRef.current);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [sectionIds, enabled]);
}
