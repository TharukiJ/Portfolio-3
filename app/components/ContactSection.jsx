"use client";
import { useState, useRef, useEffect } from "react";

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
  const [animActive, setAnimActive] = useState(false);
  const [hasTyped, setHasTyped] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitText, setSubmitText] = useState("await send()");
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const nameRef = useRef(null);
  const messageRef = useRef(null);

  // Intersection Observer to trigger typing animation when scrolled into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimActive(true);
            if (!hasTyped) {
              setHasTyped(true);
              setTimeout(() => {
                if (titleRef.current) {
                  humanType(titleRef.current, false);
                }
              }, 600);
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasTyped]);

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
    <section id="contact" className={`contact section-padding reveal ${animActive ? "active" : ""}`} ref={sectionRef}>
      <div className="section-header-modern">
        <div className="section-title-group">
          <h2 className="section-title-main">GET IN</h2>
          <h2 className="section-title-sub">TOUCH</h2>
          <div className="section-executing-functions">READY TO COLLABORATE [NOW]</div>
        </div>
      </div>
      <div
        className={`contact-card anim-fade-up ${animActive ? "anim-active" : ""}`}
        id="contact-main-card"
      >
        <div className="contact-header">
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
