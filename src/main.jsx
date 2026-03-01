// src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { CustomEase } from "gsap/CustomEase";
import "./index.css";
import App from "./App.jsx";

// ── Register ALL plugins once here globally ──
// Never call registerPlugin or CustomEase.create in individual hooks
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, CustomEase);
CustomEase.create("main", "0.65, 0.01, 0.05, 0.99");

// ── Force ScrollTrigger to use window as scroller ──
// Fixes conflict with LocomotiveScroll in production
ScrollTrigger.defaults({ scroller: window });

// ── Refresh after full page load ──
// Fixes production issue where ScrollTrigger measures positions before
// images/fonts have loaded, making all trigger positions wrong
window.addEventListener("load", () => {
  ScrollTrigger.refresh();
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
