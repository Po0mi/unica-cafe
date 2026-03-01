// hooks/useMenuAnimation.js
import { useEffect } from "react";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(CustomEase, ScrollTrigger);
CustomEase.create("main", "0.65, 0.01, 0.05, 0.99");

const useMenuAnimation = () => {
  useEffect(() => {
    // ── Selectors matching Menu.jsx exactly ──
    // .menu                → section wrapper (trigger)
    // .menu-eyebrow        → "What we serve" label
    // .menu-heading        → "Our Menu" h2
    // .menu-count          → "3 categories" span
    // .accordion-item      → each of the 3 accordion rows

    const section = document.querySelector(".menu");
    const eyebrow = document.querySelector(".menu-eyebrow");
    const heading = document.querySelector(".menu-heading");
    const count = document.querySelector(".menu-count");
    const accordionItems = document.querySelectorAll(".accordion-item");

    if (!section) return;

    // ── Initial states ──
    gsap.set(eyebrow, { opacity: 0, y: 16 });
    gsap.set(heading, { opacity: 0, clipPath: "inset(0 0 100% 0)", y: 30 });
    gsap.set(count, { opacity: 0, x: 20 });
    gsap.set(accordionItems, { opacity: 0, y: 40 });

    // ── 1. Header entry — fires when .menu top hits 75% viewport ──
    const headerTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 75%",
        toggleActions: "play none none none",
        id: "menu-header",
      },
    });

    headerTl
      // Eyebrow slides up
      .to(eyebrow, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "main",
      })

      // Heading clips up — same as hero / about
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

      // Count slides in from right
      .to(
        count,
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "main",
        },
        "<+=0.1",
      );

    // ── 2. Accordion items stagger up ──
    // Triggers slightly after header so they feel sequential
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
      stagger: 0.12, // each row staggers 0.12s after the last
      duration: 0.75,
      ease: "main",
    });

    // ── Cleanup — kill only this hook's ScrollTriggers by ID ──
    return () => {
      headerTl.kill();
      accordionTl.kill();
      ["menu-header", "menu-accordion", "menu-parallax"].forEach((id) => {
        ScrollTrigger.getById(id)?.kill();
      });
      gsap.set([eyebrow, heading, count, accordionItems], {
        clearProps: "all",
      });
    };
  }, []);
};

export default useMenuAnimation;
