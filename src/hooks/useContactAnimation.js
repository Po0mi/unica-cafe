// hooks/useContactAnimation.js
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const useContactAnimation = () => {
  useEffect(() => {
    const section = document.querySelector(".contact");
    const eyebrow = document.querySelector(".contact-eyebrow");
    const title = document.querySelector(".contact-title");
    const note = document.querySelector(".contact-note");
    const sentence = document.querySelector(".form-sentence");
    const blocks = document.querySelectorAll(".sentence-block");
    const formBottom = document.querySelector(".form-bottom");

    if (!section) return;

    gsap.set(eyebrow, { opacity: 0, y: 16 });
    gsap.set(title, { opacity: 0, clipPath: "inset(0 0 100% 0)", y: 30 });
    gsap.set(note, { opacity: 0, x: 20 });
    gsap.set(sentence, { opacity: 0, y: 30 });
    gsap.set(blocks, { opacity: 0, y: 20 });
    gsap.set(formBottom, { opacity: 0, y: 20 });

    const headerTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 75%",
        toggleActions: "play none none none",
        id: "contact-header",
      },
    });

    headerTl
      .to(eyebrow, { opacity: 1, y: 0, duration: 0.6, ease: "main" })
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
      .to(note, { opacity: 1, x: 0, duration: 0.55, ease: "main" }, "<+=0.1");

    const formTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".contact-form",
        start: "top 80%",
        toggleActions: "play none none none",
        id: "contact-form",
      },
    });

    formTl
      .to(sentence, { opacity: 1, y: 0, duration: 0.8, ease: "main" })
      .to(
        blocks,
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.7, ease: "main" },
        "<+=0.2",
      )
      .to(
        formBottom,
        { opacity: 1, y: 0, duration: 0.7, ease: "main" },
        "<+=0.2",
      );

    return () => {
      [headerTl, formTl].forEach((tl) => tl.kill());
      ScrollTrigger.getById("contact-header")?.kill();
      ScrollTrigger.getById("contact-form")?.kill();
      gsap.set([eyebrow, title, note, sentence, blocks, formBottom], {
        clearProps: "all",
      });
    };
  }, []);
};

export default useContactAnimation;
