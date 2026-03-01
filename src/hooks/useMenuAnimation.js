// hooks/useMenuAnimation.js
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const useMenuAnimation = () => {
  useEffect(() => {
    const section = document.querySelector(".menu");
    const eyebrow = document.querySelector(".menu-eyebrow");
    const heading = document.querySelector(".menu-heading");
    const count = document.querySelector(".menu-count");
    const accordionItems = document.querySelectorAll(".accordion-item");

    if (!section) return;

    gsap.set(eyebrow, { opacity: 0, y: 16 });
    gsap.set(heading, { opacity: 0, clipPath: "inset(0 0 100% 0)", y: 30 });
    gsap.set(count, { opacity: 0, x: 20 });
    gsap.set(accordionItems, { opacity: 0, y: 40 });

    const headerTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 75%",
        toggleActions: "play none none none",
        id: "menu-header",
      },
    });

    headerTl
      .to(eyebrow, { opacity: 1, y: 0, duration: 0.6, ease: "main" })
      .to(
        heading,
        {
          opacity: 1,
          y: 0,
          clipPath: "inset(0 0 0% 0)",
          duration: 1.0,
          ease: "main",
        },
        "<+=0.1",
      )
      .to(count, { opacity: 1, x: 0, duration: 0.6, ease: "main" }, "<+=0.1");

    const accordionTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".accordion",
        start: "top 80%",
        toggleActions: "play none none none",
        id: "menu-accordion",
      },
    });

    accordionTl.to(accordionItems, {
      opacity: 1,
      y: 0,
      stagger: 0.12,
      duration: 0.75,
      ease: "main",
    });

    return () => {
      headerTl.kill();
      accordionTl.kill();
      ScrollTrigger.getById("menu-header")?.kill();
      ScrollTrigger.getById("menu-accordion")?.kill();
      gsap.set([eyebrow, heading, count, accordionItems], {
        clearProps: "all",
      });
    };
  }, []);
};

export default useMenuAnimation;
