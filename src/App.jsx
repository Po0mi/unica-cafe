import React, { useState, useEffect } from "react";
import Navbar from "./layouts/navbar";
import Hero from "./components/hero";
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
      <main>
        <Hero />
      </main>
    </div>
  );
}

export default App;
