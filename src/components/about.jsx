import React from "react";
import useAboutAnimation from "../hooks/useAboutAnimation";
import "./about.scss";

const About = () => {
  useAboutAnimation();
  return (
    <section className="about" id="about">
      <div className="about-container">
        <div className="about-wrapper"></div>
        <div className="about-content">
          <div className="about-description">
            <p>
              Unica’s Cafe is a cozy neighborhood cafe located in Cabatuan,
              Iloilo, offering a warm space where good food and good company
              come together. Known for its comforting drinks and thoughtfully
              prepared meals, the cafe is a favorite spot for casual hangouts,
              study sessions, and quiet breaks from the day. With a welcoming
              atmosphere and a focus on quality and consistency, Unica’s Cafe
              aims to be a place where locals can relax, connect, and enjoy
              simple moments over great coffee and food.
            </p>

            {/* ✨ New: Customer Quote */}
            <blockquote className="about-quote">
              “The best coffee in town – feels like home every time.”
              <cite>– Maria L., regular customer</cite>
            </blockquote>
          </div>
          <p className="about-eyebrow">Who we are</p>
          <div className="about-title">
            <h1>About</h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
