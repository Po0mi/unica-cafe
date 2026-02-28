import React, { useRef, useEffect, useState, useCallback } from "react";
import "./Gallery.scss";

const galleryData = [
  {
    id: 1,
    size: "wide",
    label: "Ambiance",
    title: "A space made\nfor staying.",
    image: "/src/assets/gallery-1.jpg", // replace with your actual images
    alt: "Cafe interior",
  },
  {
    id: 2,
    size: "tall",
    label: "Beverages",
    title: "Every cup,\ncarefully made.",
    image: "/src/assets/gallery-2.jpg",
    alt: "Coffee drinks",
  },
  {
    id: 3,
    size: "square",
    label: "Kitchen",
    title: "Good food,\nsimple moments.",
    image: "/src/assets/gallery-3.jpg",
    alt: "Food",
  },
  {
    id: 4,
    size: "tall",
    label: "Details",
    title: "The little things\nthat matter.",
    image: "/src/assets/gallery-4.jpg",
    alt: "Detail shot",
  },
  {
    id: 5,
    size: "wide",
    label: "Community",
    title: "A neighborhood\nfavorite.",
    image: "/src/assets/gallery-5.jpg",
    alt: "Community",
  },
  {
    id: 6,
    size: "square",
    label: "Croffles",
    title: "Our signature\nsweet treat.",
    image: "/src/assets/gallery-6.jpg",
    alt: "Croffles",
  },
  {
    id: 7,
    size: "tall",
    label: "Evening",
    title: "Stay a little\nlonger.",
    image: "/src/assets/gallery-7.jpg",
    alt: "Evening vibes",
  },
];

const Gallery = () => {
  const trackRef = useRef(null);
  const sectionRef = useRef(null);
  const cursorRef = useRef(null);

  const [progress, setProgress] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isCursorVisible, setIsCursorVisible] = useState(false);

  // drag state stored in refs to avoid re-renders
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // ── Progress bar update ──
  const handleScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    const pct = max > 0 ? (track.scrollLeft / max) * 100 : 0;
    setProgress(pct);
    setCurrentIndex(Math.round((pct / 100) * (galleryData.length - 1)) + 1);
  }, []);

  // ── Drag to scroll ──
  const handleMouseDown = useCallback((e) => {
    isDragging.current = true;
    startX.current = e.pageX - trackRef.current.offsetLeft;
    scrollLeft.current = trackRef.current.scrollLeft;
    trackRef.current.classList.add("dragging");
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    trackRef.current.scrollLeft = scrollLeft.current - walk;
  }, []);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
    trackRef.current?.classList.remove("dragging");
  }, []);

  // ── Custom cursor follow ──
  const handleMouseMoveGlobal = useCallback((e) => {
    if (cursorRef.current) {
      cursorRef.current.style.left = e.clientX + "px";
      cursorRef.current.style.top = e.clientY + "px";
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMoveGlobal);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMoveGlobal);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMoveGlobal, handleMouseUp]);

  return (
    <section className="gallery" id="gallery" ref={sectionRef}>
      {/* Texture overlay — matches hero-wrapper / about-wrapper */}
      <div className="gallery-wrapper">
        <div className="gallery-texture" />
      </div>

      {/* Custom drag cursor */}
      <div
        className={`gallery-cursor ${isCursorVisible ? "visible" : ""}`}
        ref={cursorRef}
      >
        <span>Drag</span>
      </div>

      <div className="gallery-container">
        {/* Header */}
        <div className="gallery-header">
          <div>
            <p className="gallery-eyebrow">A peek inside</p>
            <h2 className="gallery-title">Gallery</h2>
          </div>
          <span className="gallery-hint">
            <span className="hint-arrow">←→</span>
            Drag to explore
          </span>
        </div>

        {/* Progress */}
        <div className="gallery-progress">
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="progress-label">
            {String(currentIndex).padStart(2, "0")} /{" "}
            {String(galleryData.length).padStart(2, "0")}
          </span>
        </div>

        {/* Scroll track */}
        <div
          className="gallery-track"
          ref={trackRef}
          onScroll={handleScroll}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsCursorVisible(true)}
          onMouseLeave={() => {
            setIsCursorVisible(false);
            isDragging.current = false;
            trackRef.current?.classList.remove("dragging");
          }}
        >
          {galleryData.map((card) => (
            <div key={card.id} className={`gallery-card ${card.size}`}>
              <img src={card.image} alt={card.alt} draggable={false} />

              <div className="card-overlay">
                <span className="card-label">{card.label}</span>
                <h3 className="card-title">
                  {card.title.split("\n").map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < card.title.split("\n").length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </h3>
              </div>

              <span className="card-index">
                {String(card.id).padStart(2, "0")}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
