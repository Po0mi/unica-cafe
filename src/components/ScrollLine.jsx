import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ScrollLine.scss";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * ScrollLine Component
 *
 * WHAT IT DOES:
 * - Creates a self-drawing line that animates as the user scrolls.
 * - The line starts hidden and gradually reveals itself from top to bottom.
 * - The animation is triggered when the ".about" section enters the viewport.
 *
 * HOW IT WORKS:
 * 1. Uses GSAP's ScrollTrigger to link the line drawing to scroll progress.
 * 2. The line is an SVG path with `strokeDasharray` and `strokeDashoffset`
 *    set to its total length, making it invisible initially.
 * 3. As the user scrolls from the start point (".about" top hits bottom of viewport)
 *    to the end point (".about" top hits center of viewport), the `strokeDashoffset`
 *    animates to 0, revealing the line.
 *
 * CUSTOMIZATION:
 * - Modify the SVG path's `d` attribute to change the line shape.
 * - Adjust ScrollTrigger `start` and `end` values to control when drawing happens.
 * - Change `stroke`, `strokeWidth`, or add filters in SCSS for styling.
 *
 * @component
 */
const ScrollLine = () => {
  const linePathRef = useRef(null);

  useEffect(() => {
    // Ensure we're in the browser (for SSR compatibility)
    if (typeof window === "undefined") return;

    const path = linePathRef.current;
    if (!path) return;

    // Get the total length of the path (used for dasharray/offset)
    const pathLength = path.getTotalLength();
    console.log("Path length:", pathLength); // Useful for debugging

    // Set initial state: line is hidden (dashoffset equals full length)
    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    // Create the scroll-triggered animation
    gsap.to(path, {
      strokeDashoffset: 0, // Draw the line (offset becomes 0)
      ease: "none",
      scrollTrigger: {
        trigger: ".about", // Element that triggers the animation
        start: "top bottom", // Start when top of .about hits bottom of viewport
        end: "top center", // End when top of .about hits center of viewport
        scrub: 1, // Link animation to scroll with 1s lag
        markers: false, // Set to true to visualize trigger points (debug)
      },
    });

    // Refresh ScrollTrigger to ensure correct start/end calculations
    ScrollTrigger.refresh();

    // Cleanup on component unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Handle window resize: recalculate ScrollTrigger positions
  useEffect(() => {
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="line-container">
      <svg
        className="drawing-line"
        viewBox="0 0 100 1000"
        preserveAspectRatio="none"
      >
        {/* 
          SVG path definition:
          - Starts at top center (50,0)
          - First curve to the right then left, creating an S-shape
          - Ends at bottom center (50,1000)
          Modify the `d` attribute to change the line style.
        */}
        <path
          ref={linePathRef}
          className="line-path"
          d="M50 0 
             C50 250, 70 400, 30 600 
             C10 800, 50 900, 50 1000"
          stroke="#9d6b53"
          strokeWidth="4"
          fill="none"
        />
      </svg>
    </div>
  );
};

export default ScrollLine;
