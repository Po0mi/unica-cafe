import React from "react";
import "./Gallery.scss";

// ── Import all images — Vite requires static imports for src/assets ──
import Drink from "../assets/Drink.jpg";
// Swap placeholders with your actual photos when ready:
// import Gallery1 from "../assets/gallery-1.jpg";
// import Gallery2 from "../assets/gallery-2.jpg";
// import Gallery3 from "../assets/gallery-3.jpg";
// import Gallery4 from "../assets/gallery-4.jpg";
// import Gallery5 from "../assets/gallery-5.jpg";

// ── Data — 3 spreads ──
const spreads = [
  {
    id: 1,
    type: "photo-gap-stack", // portrait left | gap | landscape + caption
    left: {
      image: Drink, // swap → Gallery1
      alt: "Cafe interior",
      index: "01",
    },
    right: {
      image: Drink, // swap → Gallery2
      alt: "Coffee drinks",
      index: "02",
    },
    caption: {
      range: "01 — 02",
      label: "Ambiance · Beverages",
      title: "A space made\nfor staying.",
      desc: "Where warm light meets the smell of fresh coffee — every corner of Unica's is designed to make you feel at home.",
    },
    gapLabel: "Ambiance",
  },
  {
    id: 2,
    type: "quote-gap-photo", // pull quote | gap | square photo
    quote: {
      text: '"The best coffee in town — feels like home every time."',
      attr: "— Maria L., regular customer",
    },
    right: {
      image: Drink, // swap → Gallery3
      alt: "Food",
      index: "03",
    },
    gapLabel: "Community",
  },
  {
    id: 3,
    type: "stack-gap-portrait", // landscape + caption | gap | tall portrait
    left: {
      image: Drink, // swap → Gallery4
      alt: "Croffles",
      index: "04",
    },
    right: {
      image: Drink, // swap → Gallery5
      alt: "Barista",
      index: "05",
    },
    caption: {
      range: "04 — 05",
      label: "Croffles · Kitchen",
      title: "Our signature\nsweet treat.",
      desc: "Crispy on the outside, soft in the middle — the croffle is Unica's most loved creation.",
    },
    gapLabel: "Kitchen",
  },
];

// ── Helpers ──
const MultiLine = ({ text }) =>
  text.split("\n").map((line, i, arr) => (
    <React.Fragment key={i}>
      {line}
      {i < arr.length - 1 && <br />}
    </React.Fragment>
  ));

const GapCol = ({ label }) => (
  <div className="spread-gap">
    <span className="gap-label">{label}</span>
  </div>
);

const Caption = ({ data, align = "left" }) => (
  <div
    className={`spread-caption ${align === "right" ? "spread-caption--right" : ""}`}
  >
    <span className="caption-range">{data.range}</span>
    <span className="caption-label">{data.label}</span>
    <h3 className="caption-title">
      <MultiLine text={data.title} />
    </h3>
    {data.desc && <p className="caption-desc">{data.desc}</p>}
  </div>
);

const Photo = ({ src, alt, index, variant }) => (
  <div className={`spread-photo spread-photo--${variant}`}>
    <img src={src} alt={alt} draggable={false} />
    <span className="photo-index">{index}</span>
  </div>
);

// ── Component ──
const Gallery = () => (
  <section className="gallery" id="gallery">
    {/* Texture overlay */}
    <div className="gallery-wrapper">
      <div className="gallery-texture" />
    </div>

    <div className="gallery-container">
      {/* Header */}
      <div className="gallery-header">
        <div>
          <p className="gallery-eyebrow">A peek inside</p>
          <h2 className="gallery-title">Gallery</h2>
        </div>
        <span className="gallery-count">5 photos</span>
      </div>

      {/* Spreads */}
      <div className="spreads">
        {/* ── Spread 1: portrait | gap | landscape + caption ── */}
        <div className="spread spread--1">
          <Photo
            src={spreads[0].left.image}
            alt={spreads[0].left.alt}
            index={spreads[0].left.index}
            variant="portrait"
          />
          <GapCol label={spreads[0].gapLabel} />
          <Photo
            src={spreads[0].right.image}
            alt={spreads[0].right.alt}
            index={spreads[0].right.index}
            variant="landscape"
          />
          <Caption data={spreads[0].caption} />
        </div>

        {/* ── Spread 2: pull quote | gap | square photo ── */}
        <div className="spread spread--2">
          <div className="pull-quote-block">
            <p className="pull-quote">{spreads[1].quote.text}</p>
            <p className="pull-attr">{spreads[1].quote.attr}</p>
          </div>
          <GapCol label={spreads[1].gapLabel} />
          <Photo
            src={spreads[1].right.image}
            alt={spreads[1].right.alt}
            index={spreads[1].right.index}
            variant="square"
          />
        </div>

        {/* ── Spread 3: landscape + caption | gap | tall portrait ── */}
        <div className="spread spread--3">
          <Photo
            src={spreads[2].left.image}
            alt={spreads[2].left.alt}
            index={spreads[2].left.index}
            variant="landscape"
          />
          <Caption data={spreads[2].caption} />
          <GapCol label={spreads[2].gapLabel} />
          <Photo
            src={spreads[2].right.image}
            alt={spreads[2].right.alt}
            index={spreads[2].right.index}
            variant="portrait"
          />
        </div>
      </div>
    </div>
  </section>
);

export default Gallery;
