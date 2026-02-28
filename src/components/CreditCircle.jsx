import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./CreditCircle.scss";

const CreditCircle = () => {
  const svgRef = useRef(null);
  const pathRef = useRef(null);
  const tp1Ref = useRef(null);
  const tp2Ref = useRef(null);

  useEffect(() => {
    // Generate a unique ID for the path to avoid conflicts
    const pathId = `credit-path-${Math.floor(Math.random() * 100000)}`;
    if (pathRef.current) {
      pathRef.current.setAttribute("id", pathId);
    }

    // Update hrefs of textPath elements to point to the new ID
    if (tp1Ref.current) {
      tp1Ref.current.setAttribute("href", `#${pathId}`);
    }
    if (tp2Ref.current) {
      tp2Ref.current.setAttribute("href", `#${pathId}`);
    }

    // Responsive font size
    const updateFontSize = () => {
      const fontSize = window.innerWidth < 500 ? "10px" : "14px";
      gsap.set([tp1Ref.current, tp2Ref.current], {
        fontSize,
        fill: "#9d6b53",
        letterSpacing: "0.5px",
        textTransform: "uppercase",
      });
    };

    updateFontSize();
    window.addEventListener("resize", updateFontSize);

    // Animation
    const duration = 21; // seconds per cycle

    gsap.to(tp1Ref.current, {
      attr: { startOffset: "100%" },
      duration,
      ease: "none",
      repeat: -1,
    });

    gsap.to(tp2Ref.current, {
      attr: { startOffset: "0%" },
      duration,
      ease: "none",
      repeat: -1,
    });

    // Cleanup
    return () => {
      window.removeEventListener("resize", updateFontSize);
      gsap.killTweensOf([tp1Ref.current, tp2Ref.current]);
    };
  }, []);

  // Base text – repeated to fill the circle
  const baseText = "2026 created by dan • ";
  const fullText = baseText.repeat(2); // adjust as needed

  return (
    <div className="credit-circle">
      <svg
        ref={svgRef}
        viewBox="0 0 240 240"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Circular path (center 120,120, radius 60) */}
        <path
          ref={pathRef}
          d="M 120,60 a 60,60 0 1,1 0,120 a 60,60 0 1,1 0,-120"
          fill="none"
          stroke="none"
        />
        <text>
          <textPath ref={tp1Ref} href="#temp" startOffset="0%">
            {fullText}
          </textPath>
          <textPath ref={tp2Ref} href="#temp" startOffset="-100%">
            {fullText}
          </textPath>
        </text>
      </svg>
    </div>
  );
};

export default CreditCircle;
