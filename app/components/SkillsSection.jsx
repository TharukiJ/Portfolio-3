"use client";
import { useEffect, useRef, useState } from "react";

const SKILLS = [
  { name: "React.js", icon: "bx bxl-react", color: "#61DAFB" },
  { name: "Next.js", icon: "bx bxl-visual-studio", color: "#ffffff" }, 
  { name: "Node.js", icon: "bx bxl-nodejs", color: "#339933" },
  { name: "Python", icon: "bx bxl-python", color: "#3776AB" },
  { name: "FastAPI", icon: "bx bxs-zap", color: "#05998B" },
  { name: "SQL", icon: "bx bxs-data", color: "#4479A1" },
  { name: "Java", icon: "bx bxl-java", color: "#007396" },
  { name: "JavaScript", icon: "bx bxl-javascript", color: "#F7DF1E" },
  { name: "TypeScript", icon: "bx bxl-typescript", color: "#3178C6" },
  { name: "Tailwind", icon: "bx bxl-tailwind-css", color: "#06B6D4" },
  { name: "Git", icon: "bx bxl-git", color: "#F05032" },
  { name: "Firebase", icon: "bx bxl-firebase", color: "#FFCA28" },
];

export default function SkillsSection() {
  const sectionRef = useRef(null);
  const [animActive, setAnimActive] = useState(false);
  const [activeSkill, setActiveSkill] = useState("");

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
    <section id="skills" className={`skills-v7 section-padding reveal ${animActive ? "active" : ""}`} ref={sectionRef}>
      <div className="skills-container-v7">
        
        {/* Left Side: Dynamic Info */}
        <div className="skills-info-v7">
          <div className="section-header-v7">
            <h2 className="skills-title-v7">
              RUNTIME<br />
              <span className="outline-text">SKILLS</span>
            </h2>
          </div>
          
          <div className="skill-focus-v7">
            <span className="focus-name-v7">{activeSkill || "Technologies"}</span>
            <div className="focus-line-v7"></div>
          </div>
        </div>

        {/* Right Side: Straight Vertical Marquee */}
        <div className="skills-track-v7">
          <div className="marquee-vertical-v7">
            {/* Doubled for seamless scroll */}
            {[...SKILLS, ...SKILLS].map((skill, idx) => (
              <div 
                className="skill-card-v7" 
                key={idx}
                onMouseEnter={() => setActiveSkill(skill.name)}
                onMouseLeave={() => setActiveSkill("")}
              >
                <div className="icon-wrapper-v7" style={{ backgroundColor: `${skill.color}15`, color: skill.color }}>
                  <i className={skill.icon}></i>
                </div>
              </div>
            ))}
          </div>
          
          {/* Fading Overlays */}
          <div className="track-overlay-top"></div>
          <div className="track-overlay-bottom"></div>
        </div>
      </div>
    </section>
  );
}
