import React from "react";
import "./hero.scss";
import coffeeImage from "../assets/coffee-drink.png"; // Your hero image

/**
 * Hero Component - The first thing users see when they visit the page
 *
 * WHAT IT DOES:
 * - Takes up the full screen (100vh)
 * - Showcases Unica's Cafe branding
 * - Has a catchy headline and description
 * - Includes buttons to take action
 *
 * @component
 */
const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="hero-container">
        <div className="hero-wrapper"></div>
        <div className="heroLine"></div>
        <div className="hero-content">
          {/* <div className="hero-eyebrow">Unica's Cafe</div> */}

          <h1 className="hero-title">
            Unica's <br />
            <span>Cafe</span>
          </h1>

          <p className="hero-description">
            Where every cup <br />
            feels like home.
          </p>
        </div>

        <div className="hero-image-wrapper">
          <img
            src={coffeeImage}
            alt="Cup of coffee on a cozy table"
            className="hero-image"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
