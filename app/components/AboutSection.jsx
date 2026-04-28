"use client";
import { useEffect, useRef, useState } from "react";

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
      const punctuationPause =
        char === ";" || char === "{" || char === "}" || char === "," ? 200 : 0;
      await new Promise((resolve) => setTimeout(resolve, randomDelay + punctuationPause));
    }
    i++;
  }
};

export default function AboutSection() {
  const sectionRef = useRef(null);
  const terminalBodyRef = useRef(null);
  const [animActive, setAnimActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimActive(true);
            setTimeout(() => {
              const terminalBody = terminalBodyRef.current;
              if (terminalBody) {
                const lines = terminalBody.querySelectorAll(":scope > div");
                const animateLines = async () => {
                  for (let line of lines) {
                    if (line.classList.contains("terminal-line") && line.querySelector('.cursor')) continue;
                    const isCode = line.innerHTML.includes("<span");
                    await humanType(line, isCode);
                    await new Promise((resolve) => setTimeout(resolve, isCode ? 200 : 500));
                  }
                };
                animateLines();
              }
            }, 600);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className={`about section-padding reveal ${animActive ? "active" : ""}`} ref={sectionRef}>
      <div className="section-header-modern">
        <div className="section-title-group">
          <h2 className="section-title-main">BIOGRAPHY</h2>
          <h2 className="section-title-sub">& STORY</h2>
          <div className="section-executing-functions">RECONSTRUCTING NARRATIVE [2026]</div>
        </div>
      </div>
      <div className="about-grid">
        <div className={`about-info anim-slide-left ${animActive ? "anim-active" : ""}`}>
          <div className="about-text">
            <p>
              <strong>I’m a computer science student</strong> with a strong passion for building modern digital experiences
              where design meets functionality. I enjoy transforming ideas into polished, user-centered
              products through thoughtful development and creative problem-solving.
            </p>
            <p>
              For me, development is more than writing code. It is about creating meaningful digital
              experiences through structure, design, and detail. I enjoy transforming concepts into
              modern, user-focused products that are clean, scalable, and intuitive.
            </p>

            <div className="stats-container">
              <div className="stat-item">
                <h3 className="stat-num">
                  <span className="count" data-target="3">3</span>+
                </h3>
                <p className="stat-label">
                  Projects<br />Built
                </p>
              </div>
              <div className="stat-item">
                <h3 className="stat-num">CS</h3>
                <p className="stat-label">
                  Student<br />Developer
                </p>
              </div>
              <div className="stat-item">
                <h3 className="stat-num">
                  <span className="infinity-pulse">∞</span>
                </h3>
                <p className="stat-label">
                  Learning<br />by Building
                </p>
              </div>
              <div className="stat-item">
                <h3 className="stat-num">
                  <i className="bx bxs-map"></i>
                </h3>
                <p className="stat-label">
                  Sri Lanka<br />Based
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Terminal Card */}
        <div className={`terminal-card anim-slide-right ${animActive ? "anim-active" : ""}`}>
          <div className="terminal-header">
            <div className="dot dot-red"></div>
            <div className="dot dot-yellow"></div>
            <div className="dot dot-green"></div>
            <div className="terminal-title">guest@user: ~</div>
          </div>
          <div className="terminal-body code-font" ref={terminalBodyRef}>
            <div className="terminal-line" style={{ opacity: 0, visibility: "hidden" }}>
              <span className="prompt">$</span> <span className="command">print("about me")</span>
            </div>
            <div className="terminal-output text-white" style={{ opacity: 0, visibility: "hidden" }}>
              Tharuki Ramasha Jayasuriya
            </div>
            <div className="terminal-line" style={{ opacity: 0, visibility: "hidden" }}>
              <span className="prompt">$</span> <span className="command">show --about-me</span>
            </div>
            <div className="terminal-output" style={{ opacity: 0, visibility: "hidden" }}>
              <span className="code-keyword">class</span> <span className="code-type">Developer</span> {"{"}
              <br />  <span className="code-type">String</span> role = <span className="code-string">"Creative Developer"</span>;
              <br />  <span className="code-type">String</span>[] building = {"{"}<span className="code-string">"UI/UX Experiences"</span>, <span className="code-string">"Frontend Interfaces"</span>, <span className="code-string">"Full-Stack Products"</span>{"}"};
              <br />  <span className="code-type">String</span> passion = <span className="code-string">"Designing bold, intuitive, and human-centered web experiences"</span>;
              <br />  <span className="code-type">String</span> status = <span className="code-string">"Ready for the next big opportunity"</span>;
              <br />{"}"}
            </div>
            <div className="terminal-line">
              <span className="prompt">$</span> <span className="cursor"></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
