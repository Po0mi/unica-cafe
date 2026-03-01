// hooks/useNavbarAnimation.js
import { useEffect } from "react";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);
CustomEase.create("main", "0.65, 0.01, 0.05, 0.99");

const useNavbarAnimation = () => {
  useEffect(() => {
    // ── Selectors matching your Navbar.jsx exactly ──
    // .navbar          → the <nav> element
    // .navbar-logo     → logo anchor
    // .nav-link        → desktop nav links (rendered when !isMobile)
    // .hamburger       → mobile hamburger button (rendered when isMobile)

    const navbar = document.querySelector(".navbar");
    const logo = document.querySelector(".navbar-logo");
    const navLinks = document.querySelectorAll(".nav-link");
    const hamburger = document.querySelector(".hamburger");

    // ── Initial states ──
    gsap.set(navbar, { opacity: 0 });
    gsap.set(logo, { opacity: 0, y: -12 });
    gsap.set(navLinks, { opacity: 0, y: -10 });
    gsap.set(hamburger, { opacity: 0, y: -10 });

    // ── Entry timeline — starts after hero title begins revealing ──
    // Delay is synced with hero: title starts at 0.4s, cup at ~0.9s
    // Navbar comes in at ~1.1s to feel sequential not simultaneous
    const tl = gsap.timeline({ delay: 1.1 });

    tl
      // 1. Navbar container fades in (bg, border)
      .to(navbar, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      })

      // 2. Logo slides down into place
      .to(
        logo,
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: "main",
        },
        "<+=0.05",
      )

      // 3. Desktop nav links stagger in from top
      .to(
        navLinks,
        {
          opacity: 1,
          y: 0,
          stagger: 0.07,
          duration: 0.5,
          ease: "main",
        },
        "<+=0.08",
      )

      // 4. Mobile hamburger (only visible on mobile, safe to target both)
      .to(
        hamburger,
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: "main",
        },
        "<",
      );

    return () => {
      tl.kill();
      gsap.set([navbar, logo, navLinks, hamburger], { clearProps: "all" });
    };
  }, []);
};

export default useNavbarAnimation;
