"use client";
import { useState, useRef } from "react";

const humanType = async (element, isCode = false) => {
  const fullContent = element.getAttribute("data-original") || element.innerHTML.trim();
  if (!element.getAttribute("data-original")) {
    element.setAttribute("data-original", fullContent);
  }
  element.innerHTML = "";
  element.style.opacity = "1";
  element.style.visibility = "visible";

  let currentHTML = "";
  let i = 0;
  let isTag = false;

  while (i < fullContent.length) {
    const char = fullContent[i];

    if (char === "<") isTag = true;
    currentHTML += char;
    if (char === ">") isTag = false;

    if (!isTag) {
      element.innerHTML = currentHTML;
      const baseDelay = isCode ? 10 : 40;
      const variance = isCode ? 15 : 60;
      const randomDelay = baseDelay + Math.random() * variance;
      await new Promise((resolve) => setTimeout(resolve, randomDelay));
    }
    i++;
  }
};

export default function ContactSection() {
  const [collapsed, setCollapsed] = useState(true);
  const [hasTyped, setHasTyped] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitText, setSubmitText] = useState("await send()");
  const titleRef = useRef(null);
  const nameRef = useRef(null);
  const messageRef = useRef(null);

  const handleCardClick = () => {
    if (collapsed) {
      setCollapsed(false);
      if (!hasTyped) {
        setHasTyped(true);
        setTimeout(() => {
          if (titleRef.current) {
            humanType(titleRef.current, false);
          }
        }, 800);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const message = messageRef.current.value;

    const subject = encodeURIComponent(`Collaboration Inquiry from ${name}`);
    const body = encodeURIComponent(`Hello Tharuki,\n\n${message}\n\n---\nName: ${name}`);
    const mailtoLink = `mailto:tharuki.fbacc@gmail.com?subject=${subject}&body=${body}`;

    setIsSubmitting(true);
    setSubmitText("redirecting...");

    setTimeout(() => {
      window.location.href = mailtoLink;
      setSubmitText("Opening Mail...");

      // Reset form
      if (nameRef.current) nameRef.current.value = "";
      if (messageRef.current) messageRef.current.value = "";

      setTimeout(() => {
        setSubmitText("await send()");
        setIsSubmitting(false);
      }, 4000);
    }, 800);
  };

  return (
    <section id="contact" className="contact section-padding">
      <div
        className={`contact-card ${collapsed ? "contact-collapsed" : ""}`}
        id="contact-main-card"
        onClick={handleCardClick}
      >
        <div className="contact-header">
          <h2 className="section-title" id="typing-contact-title" ref={titleRef}>
            LET’S.CONNECT()
          </h2>
          <p>
            Open to collaborations, project ideas, and new opportunities. Whether you want to discuss a
            build, share an idea, or simply connect, my inbox is always open.
          </p>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="code-font">
              const name =
            </label>
            <input type="text" id="name" ref={nameRef} placeholder="'Your Name'" required />
          </div>
          <div className="form-group">
            <label htmlFor="message" className="code-font">
              const message =
            </label>
            <textarea
              id="message"
              rows={4}
              ref={messageRef}
              placeholder="'How can we collaborate?'"
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary submit-btn" disabled={isSubmitting}>
            {isSubmitting && submitText === "redirecting..." ? (
              <>
                <i className="bx bx-loader-alt bx-spin"></i> {submitText}
              </>
            ) : isSubmitting && submitText === "Opening Mail..." ? (
              <>
                <i className="bx bx-check"></i> {submitText}
              </>
            ) : (
              submitText
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
