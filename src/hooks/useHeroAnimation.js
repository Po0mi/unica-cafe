// hooks/useHeroTitleAnimation.js
import { useEffect } from "react";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);
CustomEase.create("main", "0.65, 0.01, 0.05, 0.99");

const useHeroTitleAnimation = () => {
  useEffect(() => {
    // ── Selectors ──
    const titleEl = document.querySelector(".hero-title");
    const cafeSpan = document.querySelector(".hero-title span");
    const heroBtn = document.querySelector(".hero-cta-button");
    const imageWrap = document.querySelector(".hero-image-wrapper");
    const image = document.querySelector(".hero-image-wrapper .hero-image");

    // ── Initial states ──
    gsap.set(titleEl, { clipPath: "inset(0 0 100% 0)", y: 30 });
    gsap.set(cafeSpan, { y: 20 });
    gsap.set(heroBtn, { opacity: 0, x: 24 });

    // Image wrapper: starts below + slightly scaled down + invisible
    gsap.set(imageWrap, {
      opacity: 0,
      y: 80,
      scale: 0.92,
      transformOrigin: "bottom center",
    });

    // Image itself: starts with a slight warm tint, clears on reveal
    gsap.set(image, { filter: "saturate(0.7) brightness(0.9)" });

    // ── Timeline ──
    const tl = gsap.timeline({ delay: 0.4 });

    tl
      // 1. Title clips up — "Unica's" reveals first
      .to(titleEl, {
        clipPath: "inset(0 0 0% 0)",
        y: 0,
        duration: 1.0,
        ease: "main",
      })

      // 2. "Cafe" span settles in
      .to(
        cafeSpan,
        {
          y: 0,
          duration: 0.8,
          ease: "main",
        },
        "<+=0.13",
      )

      // 3. Image wrapper rises into frame while scaling up
      //    Starts after title begins so it doesn't compete
      .to(
        imageWrap,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.3,
          ease: "main",
        },
        "<+=0.2",
      )

      // 4. Image desaturation clears as it settles
      .to(
        image,
        {
          filter: "saturate(1) brightness(1)",
          duration: 0.8,
          ease: "power2.out",
        },
        "<+=0.3",
      )

      // 5. CTA button slides in from right last
      .to(
        heroBtn,
        {
          opacity: 1,
          x: 0,
          duration: 0.65,
          ease: "main",
        },
        "<+=0.1",
      );

    // ── Cleanup ──
    return () => {
      tl.kill();
      gsap.set([titleEl, cafeSpan, heroBtn, imageWrap, image], {
        clearProps: "all",
      });
    };
  }, []);
};

export default useHeroTitleAnimation;
