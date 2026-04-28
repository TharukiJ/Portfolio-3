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
              {/* Using double items for a full 360 loop */}
              {[...SKILLS, ...SKILLS].map((skill, idx) => (
                <div 
                  className="skill-item-v5" 
                  key={idx}
                  style={{ "--idx": idx, "--total": SKILLS.length * 2 }}
                >
                  <div className="skill-icon-box-v5" style={{ color: skill.color, borderColor: `${skill.color}33` }}>
                    <i className={skill.icon}></i>
                  </div>
                  <span className="skill-name-v5">{skill.name}</span>
                </div>
              ))}
            </div>
            
            {/* Glow backdrop */}
            <div className="skills-glow-v5"></div>
          </div>
        </div>

      </div>
    </section>
  );
}
