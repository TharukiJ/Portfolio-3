"use client";
import { useEffect, useRef, useState } from "react";

const ROLES = [
  { l1: "UI/UX", l2: "DESIGNER" },
  { l1: "FRONTEND", l2: "DESIGNER" },
  { l1: "FULL-STACK", l2: "DEVELOPER" }
];

export default function HeroSection({ isVisible }) {
  const heroRef = useRef(null);
  const [animActive, setAnimActive] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => setAnimActive(true), 100);
    }
  }, [isVisible]);

  useEffect(() => {
    if (!animActive) return;

    const interval = setInterval(() => {
      setIsExiting(true);
      setTimeout(() => {
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
        setIsExiting(false);
      }, 600);
    }, 4000);

    return () => clearInterval(interval);
  }, [animActive]);

  const splitText = (text, startDelay = 0) => {
    return text.split("").map((char, i) => (
      <span
        key={i}
        className="char"
        style={{ transitionDelay: `${startDelay + i * 0.03}s` }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <section id="home" className={`hero-v4 ${animActive ? "active" : ""}`} ref={heroRef}>
      <div className="mesh-glows">
        <div className="glow glow-1"></div>
        <div className="glow glow-2"></div>
        <div className="glow glow-3"></div>
      </div>

      <div className="hero-v4-container">
        <div className="hero-v4-main-grid">
          
          <div className="hero-col hero-col-left">
            <span className="hero-label anim-slide-left">HELLO, I'M</span>
            <h1 className="hero-name-v4 anim-slide-left-delayed">
              Tharuki<br />Jayasuriya
            </h1>
            <div className="hero-socials-v4 anim-fade-in">
              <a href="https://www.linkedin.com/in/tharuki-jayasuriya" target="_blank" rel="noopener noreferrer" className="social-link"><i className='bx bxl-linkedin'></i></a>
              <a href="https://github.com/TharukiJ" target="_blank" rel="noopener noreferrer" className="social-link"><i className='bx bxl-github'></i></a>
              <a href="https://www.instagram.com/tharuk_yy?igsh=Zjl3MmM4OHJsbjRz&utm_source=qr" target="_blank" rel="noopener noreferrer" className="social-link"><i className='bx bxl-instagram'></i></a>
            </div>
          </div>

          <div className="hero-col hero-col-center">
            <div className="hero-img-wrapper-v4 anim-scale-up">
              <img
                src="/images/hero_person_transparent.png"
                alt="Tharuki Jayasuriya"
                className="hero-main-img-v4"
              />
              <div className="img-backdrop-glow"></div>
            </div>
          </div>

          <div className="hero-col hero-col-right">
            <span className="hero-label anim-slide-right">CREATIVE</span>
            <div className={`hero-role-v4 ${isExiting ? "exiting" : "entering"}`}>
              <div className="role-lines-v4">
                <h2 className="role-word-v4 role-gradient">
                  {splitText(ROLES[roleIndex].l1)}
                </h2>
                <h2 className="role-word-v4 role-black-v4">
                  {splitText(ROLES[roleIndex].l2, ROLES[roleIndex].l1.length * 0.03)}
                </h2>
              </div>
            </div>
          </div>

        </div>

        <div className="hero-v4-footer">
          <div className="hero-actions anim-fade-in">
            <a href="/tharuki.jayasuriya CV.pdf" download="tharuki.jayasuriya CV.pdf" className="resume-btn-v4">
              RESUME <i className='bx bx-right-arrow-alt'></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
