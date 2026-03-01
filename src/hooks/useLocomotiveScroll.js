// hooks/useLocomotiveScroll.js
// ── DISABLED — Locomotive Scroll conflicts with GSAP ScrollTrigger ──
// Locomotive intercepts scroll events so ScrollTrigger's window scroll
// position never changes, causing all scroll-based triggers to fail.
//
// If you want smooth scrolling, use GSAP's native smooth scroll instead:
// ScrollTrigger.normalizeScroll(true) in main.jsx
//
// This hook now returns a ref that does nothing, so existing
// components that call useLocomotiveScroll() won't break.

import { useRef } from "react";

const useLocomotiveScroll = () => {
  const scrollRef = useRef(null);
  // No locomotive instance — native scroll used instead
  return scrollRef;
};

export default useLocomotiveScroll;
