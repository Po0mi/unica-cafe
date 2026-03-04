// Hero.jsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import "./hero.scss";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import coffeeImage from "../assets/coffeeDrink.webp";
import useHeroAnimation from "../hooks/useHeroAnimation";

// Register once at module level — not inside render
gsap.registerPlugin(ScrollToPlugin);

const Hero = () => {
  const scrollRef = useHeroAnimation();
  const [isVisible, setIsVisible] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    // Use requestAnimationFrame to defer the timer setup past the
    // first paint so it doesn't compete with LCP rendering
    const raf = requestAnimationFrame(() => {
      timerRef.current = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
    });

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timerRef.current);
    };
  }, []);

  // Stable reference — won't cause child re-renders if passed down
  const handleScrollToMenu = useCallback((e) => {
    e.preventDefault();
    const target = document.querySelector("#menu");
    if (!target) return;
    gsap.to(window, {
      scrollTo: { y: target, offsetY: 80 },
      duration: 1.2,
      ease: "power3.inOut",
    });
  }, []);

  return (
    <section className="hero" id="home" ref={scrollRef} data-scroll-container>
      <div className="hero-container">
        <div className="hero-wrapper"></div>
        <div className="hero-content">
          <h1
            className="hero-title"
            data-scroll
            data-scroll-speed="0.1"
            data-scroll-delay="2"
          >
            Unica's <br />
            <span>Cafe</span>
          </h1>

          <p className={`hero-description ${isVisible ? "visible" : ""}`}>
            Where every cup <br />
            feels like home.
          </p>
        </div>
        <a
          href="#menu"
          className="hero-cta-button"
          onClick={handleScrollToMenu}
        >
          Explore Menu →
        </a>
        <div className="hero-image-wrapper">
          {/* fetchpriority="high" tells the browser this is the LCP image —
              load it as early as possible, skip the normal queue */}
          <img
            src={coffeeImage}
            alt="coffee latte"
            className="hero-image"
            fetchpriority="high"
            loading="eager"
            decoding="async"
            width="800"
            height="1000"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
