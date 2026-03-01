// Hero.jsx
import React, { useState, useEffect } from "react";
import "./hero.scss";
import coffeeImage from "../assets/coffeeDrink.png";
import useHeroAnimation from "../hooks/useHeroAnimation";

const Hero = () => {
  const scrollRef = useHeroAnimation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
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
        <a href="#menu" className="hero-cta-button">
          Explore Menu →
        </a>
        <div className="hero-image-wrapper">
          <img src={coffeeImage} alt="coffee late" className="hero-image" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
