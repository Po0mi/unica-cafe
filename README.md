# Unica's Cafe — Official Website

> *"Where every cup feels like home."*

A warm, editorial-style cafe website built for **Unica's Cafe** in Cabatuan, Iloilo, Philippines. Designed with a shibui-inspired aesthetic — restraint, intentionality, and quiet elegance — using oversized typography, a terracotta palette, and smooth GSAP animations.

---

## Preview

| Section | Description |
|---|---|
| Hero | Oversized editorial typography with coffee cup imagery |
| About | Description, customer quote, outlined background title |
| Menu | Accordion-style with subcategories and pricing |
| Gallery | Horizontal drag-to-scroll photo strip |
| Contact | Conversational fill-in-the-blank form |

---

## Tech Stack

- **React** — component-based UI
- **Vite** — build tool and dev server
- **SCSS** — styling with nested BEM-light conventions
- **GSAP** + **ScrollTrigger** — animations and scroll-linked effects
- **CustomEase** — consistent easing across all transitions (`0.65, 0.01, 0.05, 0.99`)

---

## Project Structure

```
src/
├── assets/
│   ├── logo.png
│   ├── cement-texture.jpg
│   └── gallery-1.jpg ... gallery-7.jpg
│
├── components/
│   ├── Navbar/
│   │   ├── Navbar.jsx
│   │   └── navbar.scss
│   ├── Hero/
│   │   ├── Hero.jsx
│   │   └── Hero.scss
│   ├── About/
│   │   ├── About.jsx
│   │   └── About.scss
│   ├── Menu/
│   │   ├── Menu.jsx
│   │   └── Menu.scss
│   ├── Gallery/
│   │   ├── Gallery.jsx
│   │   └── Gallery.scss
│   ├── Contact/
│   │   ├── Contact.jsx
│   │   └── Contact.scss
│   └── ScrollLine/
│       ├── ScrollLine.jsx
│       └── ScrollLine.scss
│
├── hooks/
│   ├── useToggle.js
│   ├── useClickOutside.js
│   ├── useScrollPosition.js
│   └── useActiveSection.js
│
├── App.jsx
├── App.scss
└── main.jsx
```

---

## Getting Started

### Prerequisites

- Node.js `v18+`
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/unicas-cafe.git

# Navigate into the project
cd unicas-cafe

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Runs the app at `http://localhost:5173`

### Build

```bash
npm run build
```

Outputs to `/dist` — ready for deployment.

---

## Design System

### Colors

| Token | Hex | Usage |
|---|---|---|
| Background | `#968d7e` | All section backgrounds |
| Terracotta | `#9d6b53` | Primary text, borders, accents |
| Transparent | `transparent` | Outlined text stroke |

### Typography

| Font | Weight | Usage |
|---|---|---|
| Playfair Display | 400, 700, 700 Italic | Headings, hero, contact title |
| Funnel Sans | 300, 400, 500 | Body text, labels, UI elements |

### Easing

All transitions use a single custom ease for consistency:

```js
CustomEase.create("main", "0.65, 0.01, 0.05, 0.99");
```

### Texture

A `cement-texture.jpg` overlay is applied at `opacity: 0.2` with `mix-blend-mode: multiply` across all sections to give the site its tactile, printed quality.

---

## Components

### Navbar
Fixed navigation with active section tracking via `useActiveSection`. Desktop shows a right-aligned vertical link list. Mobile shows a minimal dropdown that animates with GSAP.

### Hero
Full-viewport section with oversized "Unica's Cafe" title, a floating coffee cup image, tagline, and an "Explore Menu" CTA. The cup spans into the About section for visual continuity.

### About
Left-aligned description text, a customer blockquote, and a giant outlined "About" title as a background watermark. Features the `ScrollLine` component — an SVG path that draws itself on scroll and fades out at the end of the section.

### Menu
Three accordion categories — Beverages, Food, and Croffles — with subcategory grids, dotted leader lines between item names and prices, and column headers for Hot/Iced and Single/Overload pricing variants.

### Gallery
Horizontal drag-to-scroll strip with varying card widths (tall, wide, square), a live progress bar counter, a custom terracotta drag cursor, and hover overlays revealing the category label and italic title.

### Contact
Conversational fill-in-the-blank form that reads as a natural sentence. Inputs grow dynamically as the user types. Includes cafe info, a sweep-animation send button, and a site footer.

### ScrollLine
SVG path drawn via `strokeDashoffset` animation tied to scroll progress through the About section. Fades out when the section ends so it doesn't bleed into the Menu.

---

## Custom Hooks

| Hook | Purpose |
|---|---|
| `useToggle` | Boolean open/close state with toggle and close helpers |
| `useClickOutside` | Fires a callback when a click occurs outside a ref element |
| `useScrollPosition` | Returns current window scroll Y position |
| `useActiveSection` | Tracks which section ID is currently in the viewport |

---

## Deployment

This site can be deployed to:

- **Vercel** — `npm run build` then drag `/dist` into Vercel dashboard, or connect the GitHub repo
- **Netlify** — same process, set build command to `npm run build` and publish directory to `dist`
- **GitHub Pages** — install `gh-pages`, add deploy script to `package.json`

---

## Credits

- **Design & Development** — Dan (CPU Information Technology, 4th Year)
- **Client** — Unica's Cafe, Cabatuan, Iloilo
- **Fonts** — [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) + [Funnel Sans](https://fonts.google.com/specimen/Funnel+Sans) via Google Fonts
- **Animation** — [GSAP](https://greensock.com/gsap/) by GreenSock

---

## License

This project was built as a commissioned website for Unica's Cafe. All rights reserved. Not for redistribution.

---

*Built with ☕ and attention to detail.*
