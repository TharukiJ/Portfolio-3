"use client";
import { useEffect, useRef, useState } from "react";

const SKILLS = [
  { name: "React.js", icon: "bx bxl-react" },
  { name: "Next.js", icon: "bx bxl-visual-studio" }, // Vscode icon as placeholder or bxl-tailwind-css etc
  { name: "Node.js", icon: "bx bxl-nodejs" },
  { name: "Python", icon: "bx bxl-python" },
  { name: "FastAPI", icon: "bx bxs-zap" },
  { name: "SQL", icon: "bx bxs-data" },
  { name: "Java", icon: "bx bxl-java" },
  { name: "JavaScript", icon: "bx bxl-javascript" },
  { name: "TypeScript", icon: "bx bxl-typescript" },
  { name: "Tailwind", icon: "bx bxl-tailwind-css" },
  { name: "Git", icon: "bx bxl-git" },
  { name: "Firebase", icon: "bx bxl-firebase" },
];

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
    <section id="skills" className={`skills-v5 section-padding reveal ${animActive ? "active" : ""}`} ref={sectionRef}>
      <div className="skills-container-v5">

        {/* Left Column: Heading */}
        <div className="skills-left-v5">
          <div className="section-header-v5">
            <h2 className="skills-title-v5">
              RUNTIME<br />
              <span className="outline-text">SKILLS</span>
            </h2>
            <div className="skills-count-v5">EXECUTING FUNCTIONS [{SKILLS.length}]</div>
          </div>
        </div>

        {/* Right Column: 3D Vertical Scrolling */}
        <div className="skills-right-v5">
          <div className="vertical-3d-wrapper">
            <div className="vertical-marquee-v5">
              {/* Double items for seamless loop */}
              {[...SKILLS, ...SKILLS].map((skill, idx) => (
                <div 
                  className="skill-item-v5" 
                  key={idx}
                  style={{ "--idx": idx, "--total": SKILLS.length * 2 }}
                >
                  <div className="skill-icon-box-v5">
                    <i className={skill.icon}></i>
                  </div>
                  <span className="skill-name-v5">{skill.name}</span>
                </div>
              ))}
            </div>

            {/* Overlay for focus effect */}
            <div className="focus-overlay-v5"></div>
            {/* Glow backdrop */}
            <div className="skills-glow-v5"></div>
          </div>
        </div>

      </div>
    </section>
  );
}
