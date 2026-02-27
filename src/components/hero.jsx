import React from "react";
import "./hero.scss";
import coffeeImage from "../assets/coffeeDrink.png"; // Your hero image
// import circle from "../assets/half-cut.png";

const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="hero-container">
        <div className="hero-wrapper"></div>
        {/* <div className="circle-image-wrapper">
          <img src={circle} alt="circle" className="circle" />
        </div> */}
        <div className="hero-content">
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
          <img src={coffeeImage} alt="coffee late" className="hero-image" />
        </div>

        {/* Created by credit - 2026 */}
        <div className="credit">
          <p>2026 created by dan</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
