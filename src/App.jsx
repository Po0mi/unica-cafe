import React, { useState, useEffect } from "react";
import Navbar from "./layouts/navbar";
import Hero from "./components/hero";
import About from "./components/about";
import ScrollLine from "./components/ScrollLine"; // Import the scroll line component
import CreditCircle from "./components/CreditCircle";
import Menu from "./components/Menu";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
// Import more sections as we create them:
// import Features from "./components/sections/features/Features";
// import HowItWorks from "./components/sections/howitworks/HowItWorks";
// import Testimonials from "./components/sections/testimonials/Testimonials";
// import Pricing from "./components/sections/pricing/Pricing";
// import FAQ from "./components/sections/faq/FAQ";
// import Footer from "./components/layouts/footer/Footer";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Navbar />
      <ScrollLine /> {/* The self-drawing line - independent component */}
      <main>
        <Hero />
        <About />
        <CreditCircle />
        <Menu />
        <Gallery />
        <Contact />
        {/* More sections will go here */}
      </main>
    </div>
  );
}

export default App;
