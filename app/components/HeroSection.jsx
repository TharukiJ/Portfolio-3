"use client";
import { useEffect, useRef, useState } from "react";

export default function HeroSection({ isVisible }) {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const sphere1Ref = useRef(null);
  const sphere2Ref = useRef(null);
  const rainContainerRef = useRef(null);
  const [typedRole, setTypedRole] = useState("");

  // Role typing effect
  useEffect(() => {
    if (!isVisible) return;
    const roles = [
      "CREATIVE DEVELOPER",
      "FRONT END DEVELOPER",
      "UI UX DESIGNER",
      "PROJECT MANAGER",
    ];
    let roleIdx = 0;
    let charIdx = 0;
    let direction = 1; // 1 for typing, -1 for deleting
    let timer;

    const typeHero = () => {
      const current = roles[roleIdx];
      if (direction === 1) {
        setTypedRole(current.substring(0, charIdx + 1));
        charIdx++;
        if (charIdx === current.length) {
          direction = -1;
          timer = setTimeout(typeHero, 2000); // Pause at full word
          return;
        }
      } else {
        setTypedRole(current.substring(0, charIdx - 1));
        charIdx--;
        if (charIdx === 0) {
          direction = 1;
          roleIdx = (roleIdx + 1) % roles.length;
          timer = setTimeout(typeHero, 500); // Pause at empty
          return;
        }
      }
      const speed = direction === 1 ? 120 : 60;
      timer = setTimeout(typeHero, speed);
    };

    typeHero();
    return () => clearTimeout(timer);
  }, [isVisible]);

  // Floating background symbols and parallax
  useEffect(() => {
    if (!isVisible || !heroRef.current) return;

    // Scroll parallax exit effect
    const handleScroll = () => {
      const rect = heroRef.current.getBoundingClientRect();
      const heroHeight = heroRef.current.offsetHeight;
      const exitDistance = -rect.top;
      const progress = Math.min(Math.max(exitDistance / (heroHeight * 0.5), 0), 1);

      if (contentRef.current) {
        contentRef.current.style.opacity = 1 - progress;
        contentRef.current.style.transform = `translateY(${progress * -50}px)`;
        contentRef.current.style.pointerEvents = progress > 0.9 ? "none" : "";
      }

      if (sphere1Ref.current) sphere1Ref.current.style.opacity = 1 - progress;
      if (sphere2Ref.current) sphere2Ref.current.style.opacity = 1 - progress;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Mouse parallax for spheres
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;
      if (sphere1Ref.current) {
        sphere1Ref.current.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
      }
      if (sphere2Ref.current) {
        sphere2Ref.current.style.transform = `translate(calc(-50% + ${x * -1.2}px), calc(-50% + ${y * -1.2}px))`;
      }
    };
    heroRef.current.addEventListener("mousemove", handleMouseMove);

    // Floating Code Symbols
    let animationFrame;
    const rainContainer = rainContainerRef.current;
    if (rainContainer) {
      const symbols = ["{", "}", "<", ">", "/", ";", "[]", "()", "=>", "&&", "||", "!", "?;"];
      const particles = [];
      const count = window.innerWidth < 768 ? 20 : 45;

      for (let i = 0; i < count; i++) {
        const el = document.createElement("div");
        el.className = "floating-code-symbol";
        el.innerText = symbols[Math.floor(Math.random() * symbols.length)];

        const p = {
          el: el,
          x: Math.random() * 100,
          y: Math.random() * 100,
          vx: (Math.random() - 0.5) * 0.01,
          vy: (Math.random() - 0.5) * 0.01,
          size: 0.8 + Math.random() * 0.4,
        };
        rainContainer.appendChild(el);
        particles.push(p);
      }

      const animateRain = () => {
        particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < -5) p.x = 105;
          if (p.x > 105) p.x = -5;
          if (p.y < -5) p.y = 105;
          if (p.y > 105) p.y = -5;
          p.el.style.transform = `translate(${p.x}vw, ${p.y}vh) scale(${p.size})`;
        });
        animationFrame = requestAnimationFrame(animateRain);
      };
      animateRain();
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (heroRef.current) heroRef.current.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrame);
      if (rainContainer) rainContainer.innerHTML = "";
    };
  }, [isVisible]);

  return (
    <section id="home" className="hero section-padding" ref={heroRef}>
      <div className="hero-dark-bg">
        <div className="hero-grid-overlay"></div>
        <div id="code-rain-container" className="code-rain-container" ref={rainContainerRef}></div>
      </div>
      <div className="hero-container">
          <div className="hero-flex-container">
            {/* TEXT CONTENT (LEFT) */}
            <div className={`hero-content anim-slide-up ${isVisible ? "anim-active" : ""}`} ref={contentRef}>
              <h1 className="hero-title">
                <div className="code-line">
                  <span className="code-font syntax-bracket">console.log("</span>
                </div>
                <div className="hero-main-text">
                  <span className="hero-hello">Hello,</span>
                  <br />
                  <span className="hero-name">
                    <span className="hero-im">I'm</span><span className="hero-tharuki">Tharuki</span><span className="code-font syntax-bracket">");</span>
                  </span>
                </div>
              </h1>

              <div className="hero-subtitle code-font">
                <span className="keyword">const</span> <span className="variable">role</span> = <span className="string">"</span>
                <span id="typing-role" className="string">
                  {typedRole}
                </span>
                <span className="cursor">|</span>
                <span className="string">"</span>;
              </div>


            </div>

            {/* PERSONA IMAGE (RIGHT) */}
            <div className={`hero-image-container anim-slide-up ${isVisible ? "anim-active" : ""}`}>
              <div className="hero-image-wrapper">
                <img
                  src="/images/hero_person_transparent.png"
                  alt="Tharuki Jayasuriya"
                  className="hero-person-img"
                />
                <div className="image-accent-glow"></div>
              </div>
            </div>
          </div>
      </div>
      <div className="glow-sphere" ref={sphere1Ref}></div>
      <div className="glow-sphere secondary" ref={sphere2Ref}></div>
    </section>
  );
}
