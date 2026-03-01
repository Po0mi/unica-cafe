// hooks/useAboutAnimation.js
import { useEffect } from "react";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(CustomEase, ScrollTrigger);
CustomEase.create("main", "0.65, 0.01, 0.05, 0.99");

const useAboutAnimation = () => {
  useEffect(() => {
    // ── Selectors matching About.jsx exactly ──
    // .about              → section wrapper (trigger)
    // .about-eyebrow      → "Who are we" label
    // .about-title h1     → "About" big outlined heading
    // .about-description p → body paragraph
    // .about-quote        → blockquote
    // .about-quote cite   → attribution line

    const section = document.querySelector(".about");
    const eyebrow = document.querySelector(".about-eyebrow");
    const title = document.querySelector(".about-title h1");
    const paragraph = document.querySelector(".about-description p");
    const quote = document.querySelector(".about-quote");
    const cite = document.querySelector(".about-quote cite");

    if (!section) return;

    // ── Initial states ──
    gsap.set(eyebrow, { opacity: 0, y: 20 });
    gsap.set(title, { opacity: 0, y: 60, clipPath: "inset(0 0 100% 0)" });
    gsap.set(paragraph, { opacity: 0, y: 30 });
    gsap.set(quote, { opacity: 0, x: -20 });
    gsap.set(cite, { opacity: 0 });

    // ── Main entry timeline — triggers when .about enters viewport ──
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 30%", // fires when top of section hits 75% of viewport
        end: "top 30%",
        toggleActions: "play none none none", // play once, don't reverse
      },
    });

    tl
      // 1. Eyebrow label slides up first
      .to(eyebrow, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "main",
      })

      // 2. "About" title clips up — same mechanic as hero
      .to(
        title,
        {
          opacity: 1,
          y: 0,
          clipPath: "inset(0 0 0% 0)",
          duration: 1.0,
          ease: "main",
        },
        "<+=0.1",
      )

      // 3. Paragraph fades up
      .to(
        paragraph,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "main",
        },
        "<+=0.2",
      )

      // 4. Quote slides in from left
      .to(
        quote,
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: "main",
        },
        "<+=0.15",
      )

      // 5. Citation fades in last
      .to(
        cite,
        {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        },
        "<+=0.2",
      );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
      gsap.set([eyebrow, title, paragraph, quote, cite], { clearProps: "all" });
    };
  }, []);
};

export default useAboutAnimation;
