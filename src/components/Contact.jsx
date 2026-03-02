import React, { useState, useRef } from "react";
import useContactAnimation from "../hooks/useContactAnimation";
import emailjs from "@emailjs/browser";
import "./Contact.scss";

const Contact = () => {
  const [fields, setFields] = useState({
    name: "",
    intent: "",
    message: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" });

  useContactAnimation();
  const messageRef = useRef(null);
  const formRef = useRef(null);

  // Format current time for the email template
  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));

    // Auto-grow textarea
    if (name === "message" && messageRef.current) {
      messageRef.current.style.height = "auto";
      messageRef.current.style.height = messageRef.current.scrollHeight + "px";
    }

    // Clear status when user starts typing again
    if (submitStatus.message) {
      setSubmitStatus({ type: "", message: "" });
    }
  };

  const getInputWidth = (value, minChars = 10) => {
    const len = Math.max(value.length, minChars);
    return `${len * 0.55}em`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: "", message: "" });

    // Basic validation
    if (!fields.name || !fields.intent || !fields.message || !fields.email) {
      setSubmitStatus({
        type: "error",
        message: "Please fill in all fields",
      });
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(fields.email)) {
      setSubmitStatus({
        type: "error",
        message: "Please enter a valid email address",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Prepare template parameters matching your custom template
      const templateParams = {
        name: fields.name, // For {{name}} in template
        email: fields.email, // For {{email}} in template
        intent: fields.intent, // For {{intent}} in template
        message: fields.message, // For {{message}} in template
        time: getCurrentTime(), // For {{time}} in template
        to_name: "Unica's Cafe Team", // Who the email is addressed to
        reply_to: fields.email, // Set reply-to as the sender's email
      };

      console.log("Sending with params:", templateParams); // For debugging

      // Using your provided credentials
      const result = await emailjs.send(
        "service_yzkgjhm", // Your Service ID
        "template_ba6ei21", // Your Template ID
        templateParams,
        "gL2IeAdmyzx77E6Qw", // Your Public Key
      );

      console.log("Email sent successfully:", result.text);

      setSubmitStatus({
        type: "success",
        message: "Message sent successfully! We'll get back to you soon.",
      });

      // Clear form
      setFields({
        name: "",
        intent: "",
        message: "",
        email: "",
      });

      // Reset textarea height
      if (messageRef.current) {
        messageRef.current.style.height = "auto";
      }
    } catch (error) {
      console.error("Email sending failed:", error);
      console.error("Error details:", error.text || error.message);
      setSubmitStatus({
        type: "error",
        message: "Failed to send message. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
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

        {/* Status message */}
        {submitStatus.message && (
          <div className={`status-message ${submitStatus.type}`}>
            {submitStatus.message}
          </div>
        )}

        {/* Conversational form */}
        <form className="contact-form" onSubmit={handleSubmit} ref={formRef}>
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
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
                  disabled={isSubmitting}
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
                Open daily · 11am – 9pm
              </a>
              <a className="info-item" href="#">
                @unicascafecab
              </a>
            </div>
            <button
              className={`submit-btn ${isSubmitting ? "submitting" : ""}`}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send message"}
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="contact-footer">
          <span className="footer-brand">Unica's Cafe</span>
          <span className="footer-copy">© 2026 · Created by Dan</span>
          <div className="footer-socials">
            <a
              className="social-link"
              href="https://www.facebook.com/profile.php?id=61586858335568"
            >
              Facebook
            </a>
            <a
              className="social-link"
              href="https://www.instagram.com/unicascafecab?fbclid=IwY2xjawQRN8tleHRuA2FlbQIxMABicmlkETFWbmJNZTVEc3RScG4wYm41c3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHnZQgBwzeD1nHrLhdUiPyU-1IgA9E2NvjkIj_Ext8Rqib-1jwr_PVgQ4vpbu_aem_dhpRZbap0y0jhkgPyRYgFw"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
