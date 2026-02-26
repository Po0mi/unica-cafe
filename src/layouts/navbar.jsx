import React, { useState, useEffect } from "react";
import { useToggle } from "../hooks/useToggle";
import { useClickOutside } from "../hooks/useClickOutside";
import { useScrollPosition } from "../hooks/useScrollPosition";
import { useActiveSection } from "../hooks/useActiveSection";
import logo from "../assets/logo.png"; // Your logo image
import "./navbar.scss";

/**
 * Navbar Component - The navigation bar at the top of the page
 *
 * WHAT IT DOES:
 * - Stays fixed at the top even when you scroll
 * - Changes from transparent to white background when you scroll down
 * - Has a hamburger menu that appears on mobile phones
 * - Closes the mobile menu when you click outside it
 * - Highlights which section you're currently viewing
 *
 * @component
 */
const Navbar = () => {
  // ===== 1. STATE MANAGEMENT =====
  // State: remembers if we're on mobile or desktop (true = mobile, false = desktop)
  const [isMobile, setIsMobile] = useState(false);

  // ===== 2. CUSTOM HOOKS =====
  // Hook #1: Tracks how far we've scrolled down the page (0 = top, 100 = 100px scrolled)
  const scrollPosition = useScrollPosition();

  // Hook #2: Manages the mobile menu open/close state
  // isMenuOpen: true when menu is open, false when closed
  // toggleMenu: function to open/close the menu
  // closeMenu: function to close the menu
  const {
    isOpen: isMenuOpen,
    toggle: toggleMenu,
    close: closeMenu,
  } = useToggle();

  // Hook #3: Detects when we click outside the menu and closes it
  // menuRef gets attached to the menu container
  const menuRef = useClickOutside(closeMenu);

  // Hook #4: Tells us which section is currently visible on screen
  // Returns: 'home', 'features', 'specs', or 'gallery'
  const sections = ["home", "features", "Specs", "Gallery"];
  const activeSection = useActiveSection(sections);

  // ===== 3. EFFECTS =====
  /**
   * Effect #1: Checks if we're on mobile or desktop
   * Runs when component first loads and whenever window is resized
   */
  useEffect(() => {
    // Function that checks screen width
    const checkMobile = () => {
      // If screen width is 768px or less, we're on mobile
      setIsMobile(window.innerWidth <= 768);
    };

    // Check immediately when component loads
    checkMobile();

    // Also check whenever window is resized
    window.addEventListener("resize", checkMobile);

    // Cleanup: remove event listener when component is removed
    return () => window.removeEventListener("resize", checkMobile);
  }, []); // Empty [] means this runs once when component loads

  /**
   * Effect #2: Prevents scrolling of the background when mobile menu is open
   * Better user experience on mobile
   */
  useEffect(() => {
    if (isMenuOpen && isMobile) {
      // Menu is open on mobile: prevent background scrolling
      document.body.style.overflow = "hidden";
    } else {
      // Menu is closed: allow scrolling again
      document.body.style.overflow = "unset";
    }

    // Cleanup: make sure scrolling is enabled when component is removed
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen, isMobile]); // Re-run when menu state or mobile state changes

  // ===== 4. DATA =====
  // Navigation links - add more here if needed
  const navLinks = [
    { href: "#home", label: "Home", id: "home" },
    { href: "#about", label: "About", id: "about" },
    { href: "#Menu", label: "Menu", id: "menu" },
    { href: "#Gallery", label: "Gallery", id: "gallery" },
    { href: "#Contact", label: "Contact", id: "contact" },
  ];

  /**
   * Function: Handles smooth scrolling when clicking a link
   * @param {Event} e - The click event
   * @param {string} href - Where to scroll to (e.g., "#home")
   */
  const handleSmoothScroll = (e, href) => {
    e.preventDefault(); // Stop the default jump-to-link behavior
    const element = document.querySelector(href); // Find the section
    if (element) {
      element.scrollIntoView({
        behavior: "smooth", // Smooth scrolling animation
        block: "start", // Align to top of section
      });
    }
    closeMenu(); // Close mobile menu after clicking
  };

  // ===== 5. RENDER (What shows on screen) =====
  return (
    /**
     * The navbar container
     * If scrolled more than 50px, add "scrolled" class for white background
     */
    <nav className={`navbar ${scrollPosition > 50 ? "scrolled" : ""}`}>
      <div className="navbar-container" ref={menuRef}>
        {/* LOGO - clicks go to home */}
        <a
          href="#home"
          className="navbar-logo"
          onClick={(e) => handleSmoothScroll(e, "#home")}
        >
          <img src={logo} alt="Apple Logo" />
          <h1>Unica's Cafe</h1>
        </a>

        {/* MOBILE VIEW: Show hamburger menu */}
        {isMobile ? (
          <>
            {/* Hamburger button - three lines that turn into X when open */}
            <button
              className={`hamburger ${isMenuOpen ? "open" : ""}`}
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>

            {/* Mobile menu dropdown - slides down when open */}
            <div className={`mobile-menu ${isMenuOpen ? "open" : ""}`}>
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`nav-link ${activeSection === link.id ? "active" : ""}`}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* DESKTOP VIEW: Show links horizontally */}
            <div className="desktop-menu">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`nav-link ${activeSection === link.id ? "active" : ""}`}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
