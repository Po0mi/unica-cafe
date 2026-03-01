// hooks/useGalleryAnimation.js
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const useGalleryAnimation = () => {
  useEffect(() => {
    const section = document.querySelector(".gallery");
    const eyebrow = document.querySelector(".gallery-eyebrow");
    const title = document.querySelector(".gallery-title");
    const count = document.querySelector(".gallery-count");

    if (!section) return;

    gsap.set(eyebrow, { opacity: 0, y: 16 });
    gsap.set(title, { opacity: 0, clipPath: "inset(0 0 100% 0)", y: 30 });
    gsap.set(count, { opacity: 0, x: 16 });

    const headerTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 75%",
        toggleActions: "play none none none",
        id: "gallery-header",
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
      .to(count, { opacity: 1, x: 0, duration: 0.5, ease: "main" }, "<+=0.1");

    const spread1Left = document.querySelector(
      ".spread--1 .spread-photo--portrait",
    );
    const spread1Right = document.querySelector(
      ".spread--1 .spread-photo--landscape",
    );
    const spread1Caption = document.querySelector(".spread--1 .spread-caption");

    gsap.set(spread1Left, { opacity: 0, x: -50 });
    gsap.set(spread1Right, { opacity: 0, x: 50 });
    gsap.set(spread1Caption, { opacity: 0, y: 24 });

    const spread1Tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".spread--1",
        start: "top 80%",
        toggleActions: "play none none none",
        id: "gallery-spread-1",
      },
    });
    spread1Tl
      .to(spread1Left, { opacity: 1, x: 0, duration: 1.0, ease: "main" })
      .to(
        spread1Right,
        { opacity: 1, x: 0, duration: 1.0, ease: "main" },
        "<+=0.15",
      )
      .to(
        spread1Caption,
        { opacity: 1, y: 0, duration: 0.7, ease: "main" },
        "<+=0.2",
      );

    const spread2Quote = document.querySelector(".spread--2 .pull-quote-block");
    const spread2Photo = document.querySelector(
      ".spread--2 .spread-photo--square",
    );

    gsap.set(spread2Quote, { opacity: 0, x: -40 });
    gsap.set(spread2Photo, { opacity: 0, x: 40 });

    const spread2Tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".spread--2",
        start: "top 80%",
        toggleActions: "play none none none",
        id: "gallery-spread-2",
      },
    });
    spread2Tl
      .to(spread2Quote, { opacity: 1, x: 0, duration: 0.9, ease: "main" })
      .to(
        spread2Photo,
        { opacity: 1, x: 0, duration: 1.0, ease: "main" },
        "<+=0.15",
      );

    const spread3Left = document.querySelector(
      ".spread--3 .spread-photo--landscape",
    );
    const spread3Caption = document.querySelector(".spread--3 .spread-caption");
    const spread3Right = document.querySelector(
      ".spread--3 .spread-photo--portrait",
    );

    gsap.set(spread3Left, { opacity: 0, x: -50 });
    gsap.set(spread3Caption, { opacity: 0, y: 24 });
    gsap.set(spread3Right, { opacity: 0, x: 50 });

    const spread3Tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".spread--3",
        start: "top 80%",
        toggleActions: "play none none none",
        id: "gallery-spread-3",
      },
    });
    spread3Tl
      .to(spread3Left, { opacity: 1, x: 0, duration: 1.0, ease: "main" })
      .to(
        spread3Right,
        { opacity: 1, x: 0, duration: 1.0, ease: "main" },
        "<+=0.15",
      )
      .to(
        spread3Caption,
        { opacity: 1, y: 0, duration: 0.7, ease: "main" },
        "<+=0.15",
      );

    document.querySelectorAll(".spread-gap").forEach((gap, i) => {
      gsap.set(gap, { opacity: 0 });
      gsap.to(gap, {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: gap.closest(".spread"),
          start: "top 80%",
          toggleActions: "play none none none",
          id: `gallery-gap-${i}`,
        },
      });
    });

    document.querySelectorAll(".spread-photo img").forEach((img, i) => {
      gsap.to(img, {
        y: -30,
        ease: "none",
        scrollTrigger: {
          trigger: img.closest(".spread-photo"),
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
          id: `gallery-parallax-${i}`,
        },
      });
    });

    return () => {
      [headerTl, spread1Tl, spread2Tl, spread3Tl].forEach((tl) => tl.kill());
      [
        "gallery-header",
        "gallery-spread-1",
        "gallery-spread-2",
        "gallery-spread-3",
        "gallery-gap-0",
        "gallery-gap-1",
        "gallery-gap-2",
        "gallery-parallax-0",
        "gallery-parallax-1",
        "gallery-parallax-2",
        "gallery-parallax-3",
        "gallery-parallax-4",
      ].forEach((id) => ScrollTrigger.getById(id)?.kill());
      gsap.set(
        [
          eyebrow,
          title,
          count,
          spread1Left,
          spread1Right,
          spread1Caption,
          spread2Quote,
          spread2Photo,
          spread3Left,
          spread3Caption,
          spread3Right,
        ],
        { clearProps: "all" },
      );
    };
  }, []);
};

export default useGalleryAnimation;
