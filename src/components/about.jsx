import React, { memo } from "react";
import useAboutAnimation from "../hooks/useAboutAnimation";
import "./about.scss";

// memo prevents re-renders if a parent re-renders but About's props haven't changed
const About = memo(() => {
  useAboutAnimation();

  return (
    <section className="about" id="about">
      <div className="about-container">
        {/* aria-hidden keeps the texture overlay out of the accessibility tree */}
        <div className="about-wrapper" aria-hidden="true"></div>
        <div className="about-content">
          <div className="about-description">
            <p>
              Unica's Cafe is a cozy neighborhood cafe located in Cabatuan,
              Iloilo, offering a warm space where good food and good company
              come together. Known for its comforting drinks and thoughtfully
              prepared meals, the cafe is a favorite spot for casual hangouts,
              study sessions, and quiet breaks from the day. With a welcoming
              atmosphere and a focus on quality and consistency, Unica's Cafe
              aims to be a place where locals can relax, connect, and enjoy
              simple moments over great coffee and food.
            </p>

            <blockquote className="about-quote">
              "The best coffee in town – feels like home every time."
              <cite>– Maria L., regular customer</cite>
            </blockquote>
          </div>
          <div className="about-title">
            {/* h2 is semantically correct here — h1 is reserved for the hero title */}
            <h2>About</h2>
          </div>
        </div>
      </div>
    </section>
  );
});

About.displayName = "About";

export default About;
