// hooks/useAboutAnimation.js
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const useAboutAnimation = () => {
  useEffect(() => {
    const section = document.querySelector(".about");
    const eyebrow = document.querySelector(".about-eyebrow");
    const title = document.querySelector(".about-title h1");
    const paragraph = document.querySelector(".about-description p");
    const quote = document.querySelector(".about-quote");
    const cite = document.querySelector(".about-quote cite");

    if (!section) return;

    gsap.set(eyebrow, { opacity: 0, y: 20 });
    gsap.set(title, { opacity: 0, y: 60, clipPath: "inset(0 0 100% 0)" });
    gsap.set(paragraph, { opacity: 0, y: 30 });
    gsap.set(quote, { opacity: 0, x: -20 });
    gsap.set(cite, { opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 75%",
        toggleActions: "play none none none",
        id: "about-entry",
      },
    });

    tl.to(eyebrow, { opacity: 1, y: 0, duration: 0.6, ease: "main" })
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
      .to(
        paragraph,
        { opacity: 1, y: 0, duration: 0.8, ease: "main" },
        "<+=0.2",
      )
      .to(quote, { opacity: 1, x: 0, duration: 0.7, ease: "main" }, "<+=0.15")
      .to(cite, { opacity: 1, duration: 0.5, ease: "power2.out" }, "<+=0.2");

    gsap.to(title, {
      y: -60,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.2,
        id: "about-parallax",
      },
    });

    return () => {
      tl.kill();
      ScrollTrigger.getById("about-entry")?.kill();
      ScrollTrigger.getById("about-parallax")?.kill();
      gsap.set([eyebrow, title, paragraph, quote, cite], { clearProps: "all" });
    };
  }, []);
};

export default useAboutAnimation;
