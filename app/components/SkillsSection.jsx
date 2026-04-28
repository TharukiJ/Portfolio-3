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
    <section id="skills" className={`skills-v9 section-padding reveal ${animActive ? "active" : ""}`} ref={sectionRef}>
      <div className="skills-container-v9">
        
        {/* Left Column: Heading */}
        <div className="skills-left-v9">
          <div className="section-header-modern">
            <div className="section-title-group">
              <h2 className="section-title-main">RUNTIME</h2>
              <h2 className="section-title-sub">SKILLS</h2>
              <div className="section-executing-functions">EXECUTING FUNCTIONS [12]</div>
            </div>
          </div>
        </div>
          
        {/* Right Column: Big Vertical Marquee + Dynamic Name Side-by-Side */}
        <div className="skills-right-v9">
          <div className="marquee-wrapper-v9">
            <div className="marquee-track-v9">
              {[...SKILLS, ...SKILLS].map((skill, idx) => (
                <div 
                  className="skill-card-v9" 
                  key={idx}
                  onMouseEnter={() => setActiveSkill(skill.name)}
                  onMouseLeave={() => setActiveSkill("")}
                >
                  <div className="icon-box-v9" style={{ backgroundColor: `${skill.color}15`, color: skill.color }}>
                    <i className={skill.icon}></i>
                  </div>
                </div>
              ))}
            </div>
            {/* Overlays */}
            <div className="track-fade-v9 top"></div>
            <div className="track-fade-v9 bottom"></div>
          </div>

          <div className={`skills-focus-v9 ${activeSkill ? "visible" : ""}`}>
             <span className="focus-name-v9">{activeSkill}</span>
             <div className="focus-accent-v9"></div>
          </div>
        </div>

      </div>
    </section>
  );
}
