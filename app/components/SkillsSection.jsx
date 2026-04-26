"use client";
import { useEffect, useRef, useState } from "react";

export default function SkillsSection() {
  const sectionRef = useRef(null);
  const [animActive, setAnimActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimActive(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className={`skills section-padding reveal ${animActive ? "active" : ""}`} ref={sectionRef}>
      <div className="section-header-modern">
        <div className="section-title-group">
          <h2 className="section-title-main">RUNTIME</h2>
          <h2 className="section-title-sub">SKILLS</h2>
          <div className="section-executing-functions">PARSING CAPABILITIES [6]</div>
        </div>
      </div>

      <div className="skills-marquee-full">
        <div className="marquee-container side-marquee">
          <div className="marquee-content">
            {/* Set 1 */}
            <div className="marquee-item">
              <i className="bx bxl-react"></i>
              <span>React</span>
            </div>
            <div className="marquee-item">
              <i className="bx bxl-typescript"></i>
              <span>TypeScript</span>
            </div>
            <div className="marquee-item">
              <i className="bx bxl-javascript"></i>
              <span>JavaScript</span>
            </div>
            <div className="marquee-item">
              <i className="bx bxl-nodejs"></i>
              <span>Node.js</span>
            </div>
            <div className="marquee-item">
              <i className="bx bxl-java"></i>
              <span>Java</span>
            </div>
            <div className="marquee-item">
              <i className="bx bxs-data"></i>
              <span>MySQL</span>
            </div>
            {/* Set 2 */}
            <div className="marquee-item">
              <i className="bx bxl-react"></i>
              <span>React</span>
            </div>
            <div className="marquee-item">
              <i className="bx bxl-typescript"></i>
              <span>TypeScript</span>
            </div>
            <div className="marquee-item">
              <i className="bx bxl-javascript"></i>
              <span>JavaScript</span>
            </div>
            <div className="marquee-item">
              <i className="bx bxl-nodejs"></i>
              <span>Node.js</span>
            </div>
            <div className="marquee-item">
              <i className="bx bxl-java"></i>
              <span>Java</span>
            </div>
            <div className="marquee-item">
              <i className="bx bxs-data"></i>
              <span>MySQL</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
