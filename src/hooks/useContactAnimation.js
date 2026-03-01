// hooks/useContactAnimation.js
import { useEffect } from "react";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(CustomEase, ScrollTrigger);
CustomEase.create("main", "0.65, 0.01, 0.05, 0.99");

const useContactAnimation = () => {
  useEffect(() => {
    // ── Selectors matching Contact.jsx exactly ──
    // .contact              → section wrapper
    // .contact-eyebrow      → "Get in touch"
    // .contact-title        → "Say hello." h2
    // .contact-note         → "Fill in the blanks"
    // .contact-form         → the whole form block
    // .form-sentence        → conversational sentence paragraph
    // .sentence-block       → the message + email blocks
    // .form-bottom          → info + submit row
    // .contact-info         → address/hours/handle
    // .submit-btn           → send button
    // .contact-footer       → brand + copy + socials

    const section = document.querySelector(".contact");
    const eyebrow = document.querySelector(".contact-eyebrow");
    const title = document.querySelector(".contact-title");
    const note = document.querySelector(".contact-note");
    const sentence = document.querySelector(".form-sentence");
    const blocks = document.querySelectorAll(".sentence-block");
    const formBottom = document.querySelector(".form-bottom");

    if (!section) return;

    // ── Initial states ──
    gsap.set(eyebrow, { opacity: 0, y: 16 });
    gsap.set(title, { opacity: 0, clipPath: "inset(0 0 100% 0)", y: 30 });
    gsap.set(note, { opacity: 0, x: 20 });
    gsap.set(sentence, { opacity: 0, y: 30 });
    gsap.set(blocks, { opacity: 0, y: 20 });
    gsap.set(formBottom, { opacity: 0, y: 20 });

    // ── 1. Header entry ──
    const headerTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 75%",
        toggleActions: "play none none none",
        id: "contact-header",
      },
    });

    headerTl
      // Eyebrow up
      .to(eyebrow, { opacity: 1, y: 0, duration: 0.6, ease: "main" })
      // Title clips up
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
      // Note slides in from right
      .to(note, { opacity: 1, x: 0, duration: 0.55, ease: "main" }, "<+=0.1");

    // ── 2. Form entry ──
    // First sentence line fades up, then each .sentence-block staggers in
    const formTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".contact-form",
        start: "top 80%",
        toggleActions: "play none none none",
        id: "contact-form",
      },
    });

    formTl
      // "Hi, my name is..." first line
      .to(sentence, { opacity: 1, y: 0, duration: 0.8, ease: "main" })
      // "My message is:" and "You can reach me at" stagger in
      .to(
        blocks,
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.7,
          ease: "main",
        },
        "<+=0.2",
      )
      // Bottom row: info + submit
      .to(
        formBottom,
        { opacity: 1, y: 0, duration: 0.7, ease: "main" },
        "<+=0.2",
      );

    // ── Cleanup ──
    return () => {
      [headerTl, formTl].forEach((tl) => tl.kill());
      ["contact-header", "contact-form"].forEach((id) => {
        ScrollTrigger.getById(id)?.kill();
      });
      gsap.set([eyebrow, title, note, sentence, blocks, formBottom], {
        clearProps: "all",
      });
    };
  }, []);
};

export default useContactAnimation;
