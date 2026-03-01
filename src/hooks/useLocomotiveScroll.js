// hooks/useLocomotiveScroll.js
import { useEffect, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";

const useLocomotiveScroll = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    // Create scroll instance
    const scroller = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
    });

    // Cleanup on unmount
    return () => {
      scroller.destroy();
    };
  }, []); // Empty array = run once

  return scrollRef;
};

export default useLocomotiveScroll;
