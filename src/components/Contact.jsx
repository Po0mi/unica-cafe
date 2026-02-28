import React, { useState, useRef } from "react";
import "./Contact.scss";

const Contact = () => {
  const [fields, setFields] = useState({
    name: "",
    intent: "",
    message: "",
    email: "",
  });

  const messageRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));

    // Auto-grow textarea
    if (name === "message" && messageRef.current) {
      messageRef.current.style.height = "auto";
      messageRef.current.style.height = messageRef.current.scrollHeight + "px";
    }
  };

  const getInputWidth = (value, minChars = 10) => {
    const len = Math.max(value.length, minChars);
    return `${len * 0.55}em`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // hook up your email service here (e.g. EmailJS / Formspree)
    console.log("Submitted:", fields);
  };

  return (
    <section className="contact" id="contact">
      {/* Texture overlay — matches hero-wrapper / about-wrapper */}
      <div className="contact-wrapper">
        <div className="contact-texture" />
      </div>

      <div className="contact-container">
        {/* Header */}
        <div className="contact-header">
          <div>
            <p className="contact-eyebrow">Get in touch</p>
            <h2 className="contact-title">Say hello.</h2>
          </div>
          <span className="contact-note">Fill in the blanks</span>
        </div>

        {/* Conversational form */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <p className="form-sentence">
            {/* Line 1: name + intent */}
            <span className="sentence-text">Hi, my name is </span>
            <span className="sentence-field">
              <input
                className="inline-input"
                type="text"
                name="name"
                value={fields.name}
                onChange={handleChange}
                placeholder="your name"
                style={{ width: getInputWidth(fields.name, 10) }}
                autoComplete="off"
              />
            </span>
            <span className="sentence-text"> and I'd like to </span>
            <span className="sentence-field">
              <input
                className="inline-input"
                type="text"
                name="intent"
                value={fields.intent}
                onChange={handleChange}
                placeholder="ask about reservations"
                style={{ width: getInputWidth(fields.intent, 22) }}
                autoComplete="off"
              />
            </span>
            <span className="sentence-text">.</span>

            {/* Line 2: message */}
            <span className="sentence-block">
              <span className="sentence-text">My message is: </span>
              <textarea
                className="inline-textarea"
                name="message"
                value={fields.message}
                onChange={handleChange}
                placeholder="write something here..."
                rows={1}
                ref={messageRef}
              />
            </span>

            {/* Line 3: email */}
            <span className="sentence-block">
              <span className="sentence-text">You can reach me at </span>
              <span className="sentence-field">
                <input
                  className="inline-input"
                  type="email"
                  name="email"
                  value={fields.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  style={{ width: getInputWidth(fields.email, 20) }}
                  autoComplete="off"
                />
              </span>
              <span className="sentence-text">.</span>
            </span>
          </p>

          {/* Bottom row */}
          <div className="form-bottom">
            <div className="contact-info">
              <a className="info-item" href="#">
                Cabatuan, Iloilo, Philippines
              </a>
              <a className="info-item" href="#">
                Open daily · 7am – 9pm
              </a>
              <a className="info-item" href="#">
                @unicascafe
              </a>
            </div>
            <button className="submit-btn" type="submit">
              Send message
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="contact-footer">
          <span className="footer-brand">Unica's Cafe</span>
          <span className="footer-copy">© 2026 · Created by Dan</span>
          <div className="footer-socials">
            <a className="social-link" href="#">
              Facebook
            </a>
            <a className="social-link" href="#">
              Instagram
            </a>
            <a className="social-link" href="#">
              TikTok
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
