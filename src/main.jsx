import { createRoot } from "react-dom/client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { CustomEase } from "gsap/CustomEase";
import "./index.css";
import App from "./App.jsx";

// Single source of truth — npm bundle only, no CDN
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, CustomEase);
CustomEase.create("main", "0.65, 0.01, 0.05, 0.99");
ScrollTrigger.normalizeScroll(true);
window.addEventListener("load", () => ScrollTrigger.refresh());

createRoot(document.getElementById("root")).render(<App />);
