"use client";

import { useEffect } from "react";

export default function useSectionReveal(containerRef) {
  useEffect(() => {
    const container = containerRef.current;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!container || preference.matches || !("IntersectionObserver" in window) || !Element.prototype.animate) return;

    const elements = Array.from(container.querySelectorAll("[data-reveal]"));
    const animations = new Map();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return;
        observer.unobserve(target);
        const animation = target.animate([
          { opacity: 0, translate: "0 24px" },
          { opacity: 1, translate: "0 0" },
        ], {
          duration: 650,
          delay: Math.min(Number(target.dataset.revealDelay) || 0, 420),
          easing: "cubic-bezier(.22, 1, .36, 1)",
          fill: "backwards",
        });
        animations.set(target, animation);
        target.style.removeProperty("opacity");
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -24px 0px" });

    elements.forEach((element) => {
      element.style.opacity = "0";
      observer.observe(element);
    });

    const revealFocused = (event) => {
      const element = event.target.closest("[data-reveal]");
      if (!element) return;
      observer.unobserve(element);
      animations.get(element)?.cancel();
      element.style.removeProperty("opacity");
    };
    const restore = () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
      elements.forEach((element) => element.style.removeProperty("opacity"));
    };
    const onPreferenceChange = () => { if (preference.matches) restore(); };
    container.addEventListener("focusin", revealFocused);
    preference.addEventListener("change", onPreferenceChange);
    return () => {
      restore();
      container.removeEventListener("focusin", revealFocused);
      preference.removeEventListener("change", onPreferenceChange);
    };
  }, [containerRef]);
}
