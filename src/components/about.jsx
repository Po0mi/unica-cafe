import React from "react";
import "./about.scss";
// import espresso from "../assets/coffee-espresso.png"; // not used currently

const About = () => {
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
            <a
              href="https://www.google.com/maps/search/?api=1&query=Unica's+Cafe+Cabatuan+Iloilo"
              target="_blank"
              rel="noopener noreferrer"
              className="about-button"
            >
              Find us on Google Maps
            </a>
          </div>
          <div className="about-title">
            <h1>About</h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
