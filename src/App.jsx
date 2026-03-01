import React, { useState, useEffect } from "react";
import Navbar from "./layouts/navbar";
import Hero from "./components/hero";
import About from "./components/about";
import ScrollLine from "./components/ScrollLine";
import CreditCircle from "./components/CreditCircle";
import Menu from "./components/Menu";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";

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
