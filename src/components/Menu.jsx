import React, { useState, useRef, useEffect } from "react";
import useMenuAnimation from "../hooks/useMenuAnimation";
import "./Menu.scss";

const menuData = [
  {
    id: "beverages",
    index: "01",
    label: "Beverages",
    badge: "Espresso · Non-Coffee · Frappe",
    hasHotIced: true,
    subcategories: [
      {
        name: "Espresso",
        items: [
          { name: "Americano", hot: 85, iced: 115 },
          { name: "Cappuccino", hot: 105, iced: null },
          { name: "Hazelnut Latte", hot: 105, iced: 125 },
          { name: "Latte", hot: 105, iced: 145 },
          { name: "White Mocha Latte", hot: 125, iced: 150 },
          { name: "Mocha Latte", hot: 125, iced: 145 },
          { name: "Caramel Macchiato", hot: 125, iced: 150 },
          { name: "Spanish Latte", hot: 125, iced: 160 },
          { name: "Spanilo", hot: 125, iced: 165 },
          { name: "Salted Caramel", hot: 105, iced: 150 },
          { name: "Vanilla Latte", hot: 105, iced: 150 },
        ],
      },
      {
        name: "Non-Coffee",
        items: [
          { name: "Vanilla", hot: 105, iced: 125 },
          { name: "Salted Caramel", hot: 105, iced: 130 },
          { name: "Chocolate", hot: 115, iced: 135 },
          { name: "Matcha", hot: 115, iced: 150 },
          { name: "Strawberry Milk", hot: 105, iced: 150 },
          { name: "Blueberry Milk", hot: 105, iced: 150 },
        ],
      },
      {
        name: "Frappe",
        note: "Iced only",
        items: [
          { name: "Oreo Frappe", hot: null, iced: 160 },
          { name: "Choco Oreo Frappe", hot: null, iced: 195 },
          { name: "Chocolate Frappe", hot: null, iced: 185 },
          { name: "Matcha Frappe", hot: null, iced: 185 },
          { name: "Caramel Frappe", hot: null, iced: 175 },
          { name: "Mocha Frappe", hot: null, iced: 175 },
          { name: "White Mocha Frappe", hot: null, iced: 175 },
        ],
      },
    ],
  },
  {
    id: "food",
    index: "02",
    label: "Food",
    badge: "Rice · Pasta · Snacks · Burgers",
    subcategories: [
      {
        name: "Rice Meals",
        items: [
          { name: "Tocino", price: 120 },
          { name: "Chorizo", price: 105 },
          { name: "Corned Beef", price: 125 },
          { name: "Tapa", price: 120 },
          { name: "Hungarian Sausage", price: 115 },
          { name: "Liempo", price: 165 },
          { name: "Fried Chicken", price: 145 },
          { name: "Chicken Hotdog", price: 105 },
          { name: "Spam", price: 130 },
          { name: "Longganisa", price: 105 },
          { name: "Chicken Fillet", price: 110 },
          { name: "Chicken Ala King", price: 155 },
          { name: "Chicken Fillet w/ Cheese", price: 115 },
          { name: "Bacon", price: 178 },
          { name: "Bangus", price: 175 },
        ],
      },
      {
        name: "Add Ons",
        items: [
          { name: "Plain Rice", price: 15 },
          { name: "Garlic Rice", price: 35 },
          { name: "Java Rice", price: 30 },
          { name: "Egg", price: 15 },
        ],
      },
      {
        name: "Pasta",
        items: [
          { name: "Tuna Pesto", price: 170 },
          { name: "Chicken Alfredo", price: 170 },
          { name: "Carbonara", price: 170 },
        ],
      },
      {
        name: "Burgers & Sandwiches",
        items: [
          { name: "Bacon and Egg Sandwich", price: 150 },
          { name: "Burger & Fries", price: 155 },
        ],
      },
      {
        name: "Snacks",
        hasSingleOverload: true,
        items: [
          { name: "Nachos", single: 80, overload: 210 },
          { name: "French Fries", single: 65, overload: 195 },
          { name: "Chicken Pops", single: 75, overload: null },
          { name: "Chicken Pops & Fries", single: 130, overload: null },
          { name: "Chicken & Bacon Burrito", single: 110, overload: null },
          { name: "French Toast", single: 115, overload: null },
          { name: "Korean Garlic Bread", single: 90, overload: null },
        ],
      },
    ],
  },
  {
    id: "croffles",
    index: "03",
    label: "Croffles",
    badge: "Classic · Premium",
    subcategories: [
      {
        name: "Classic",
        items: [
          { name: "Plain", price: 90 },
          { name: "Chocolate", price: 100 },
          { name: "Nutella", price: 110 },
          { name: "Biscoff", price: 110 },
          { name: "Nutella Almond", price: 100 },
          { name: "Biscoff Almond", price: 115 },
        ],
      },
      {
        name: "Premium",
        items: [
          { name: "Oreo Cream", price: 125 },
          { name: "Blueberry Cream", price: 130 },
          { name: "Strawberry Cream", price: 130 },
          { name: "Biscoff Overload", price: 145 },
          { name: "Nutella Oreo", price: 145 },
          { name: "Nutella Banana", price: 150 },
        ],
      },
    ],
  },
];

// ── Single menu item row ──
const MenuItem = ({ item, hasHotIced, hasSingleOverload }) => {
  if (hasHotIced) {
    return (
      <div className="menu-item">
        <span className="item-name">{item.name}</span>
        <span className="item-dots" />
        <div className="item-prices">
          <span className="price">{item.hot ?? "—"}</span>
          <span className="price">{item.iced ?? "—"}</span>
        </div>
      </div>
    );
  }

  if (hasSingleOverload) {
    return (
      <div className="menu-item">
        <span className="item-name">{item.name}</span>
        <span className="item-dots" />
        <div className="item-prices">
          <span className="price">{item.single ?? "—"}</span>
          <span className="price muted">{item.overload ?? "—"}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="menu-item">
      <span className="item-name">{item.name}</span>
      <span className="item-dots" />
      <span className="price">{item.price}</span>
    </div>
  );
};

// ── Accordion item ──
const AccordionItem = ({ section, isOpen, onToggle }) => {
  const panelRef = useRef(null);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    if (isOpen) {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } else {
      panel.style.maxHeight = null;
    }
  }, [isOpen]);

  return (
    <div className={`accordion-item ${isOpen ? "open" : ""}`}>
      <button className="accordion-trigger" onClick={onToggle}>
        <span className="trigger-index">{section.index}</span>
        <span className="trigger-title">{section.label}</span>
        <span className="trigger-badge">{section.badge}</span>
        <div className="trigger-icon">
          <svg viewBox="0 0 12 12" fill="none">
            <line
              x1="6"
              y1="1"
              x2="6"
              y2="11"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <line
              x1="1"
              y1="6"
              x2="11"
              y2="6"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </button>

      <div className="accordion-panel" ref={panelRef}>
        <div className="accordion-panel-inner">
          {/* Hot / Iced column headers */}
          {section.hasHotIced && (
            <div className="column-headers">
              <span>Hot 8oz</span>
              <span>Iced 16oz</span>
            </div>
          )}

          <div className="subcategories">
            {section.subcategories.map((sub) => (
              <div className="subcategory" key={sub.name}>
                <div className="sub-header">
                  <span className="sub-name">{sub.name}</span>
                  {sub.note && <span className="sub-note">{sub.note}</span>}
                  <div className="sub-rule" />
                </div>

                {/* Single / Overload headers for snacks */}
                {sub.hasSingleOverload && (
                  <div className="column-headers sub">
                    <span>Single</span>
                    <span>Overload</span>
                  </div>
                )}

                {sub.items.map((item) => (
                  <MenuItem
                    key={item.name}
                    item={item}
                    hasHotIced={section.hasHotIced}
                    hasSingleOverload={sub.hasSingleOverload}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Main Menu component ──
const Menu = () => {
  const [openId, setOpenId] = useState(null);
  useMenuAnimation();
  const handleToggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="menu" id="menu">
      {/* Texture overlay */}
      <div className="menu-wrapper">
        <div className="menu-texture" />
      </div>

      <div className="menu-container">
        {/* Header */}
        <div className="menu-header">
          <div>
            <p className="menu-eyebrow">What we serve</p>
            <h2 className="menu-heading">Our Menu</h2>
          </div>
          <span className="menu-count">3 categories</span>
        </div>

        {/* Accordion */}
        <div className="accordion">
          {menuData.map((section) => (
            <AccordionItem
              key={section.id}
              section={section}
              isOpen={openId === section.id}
              onToggle={() => handleToggle(section.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu;
