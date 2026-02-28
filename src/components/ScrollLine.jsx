import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ScrollLine.scss";

gsap.registerPlugin(ScrollTrigger);

const ScrollLine = () => {
  const linePathRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const path = linePathRef.current;
    if (!path) return;

    const pathLength = path.getTotalLength();

    // Initial state — hidden
    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    // 1. Draw the line as .about scrolls into view
    gsap.to(path, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: ".about",
        start: "top bottom",
        end: "bottom center",
        scrub: 1,
        markers: false,
      },
    });

    // 2. Fade the entire container out once .about is done
    gsap.to(containerRef.current, {
      autoAlpha: 0,
      ease: "none",
      scrollTrigger: {
        trigger: ".about",
        start: "bottom center",
        end: "bottom top",
        scrub: 1,
        markers: false,
      },
    });

    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  useEffect(() => {
    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="line-container" ref={containerRef}>
      <svg
        className="drawing-line"
        viewBox="0 0 100 1000"
        preserveAspectRatio="none"
      >
        <path
          ref={linePathRef}
          className="line-path"
          d="M80 0 C90 300, 60 600, 30 900 L20 1000"
          stroke="#9d6b53"
          strokeWidth="4"
          fill="none"
        />
      </svg>
    </div>
  );
};

export default ScrollLine;
