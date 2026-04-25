"use client";
import { useEffect, useRef, useState } from "react";

const CERTIFICATIONS = [
  {
    title: "PYTHON CODE CHALLENGES FOR DATA ANALYSIS",
    issuer: "PMI (PROJECT MANAGEMENT INSTITUTE)",
    skills: "Python, Data Analysis, Pandas, NumPy",
    id: "LI-PY-92837",
    link: "https://www.linkedin.com/learning/certificates/0ebefe00bcee57a02c0dcbd5c11c9ccf665c571b8c0306e7bd79673026fa75c9?u=76664938",
  },
  {
    title: "AWS CERTIFIED SOLUTIONS ARCHITECT",
    issuer: "AMAZON WEB SERVICES",
    skills: "Cloud Architecture, EC2, S3, RDS, Serverless",
    id: "AWS-SA-12345",
    link: "#",
  },
  {
    title: "META FRONT-END DEVELOPER PROFESSIONAL",
    issuer: "META / COURSERA",
    skills: "React, JavaScript, HTML5, CSS3, UX/UI",
    id: "META-FE-67890",
    link: "#",
  },
  {
    title: "GOOGLE CYBERSECURITY PROFESSIONAL",
    issuer: "GOOGLE / COURSERA",
    skills: "Network Security, SIEM Tools, Python, Risk Management",
    id: "GCP-SEC-11223",
    link: "#",
  },
];

export default function CertificationsSection() {
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
    <section id="certifications" className={`certifications section-padding reveal ${animActive ? "active" : ""}`} ref={sectionRef}>
      <div className="cert-section-header">
        <h2 className="cert-section-label">CERTIFICATION & CREDENTIALS</h2>
      </div>

      <div className="cert-pill-list">
        {CERTIFICATIONS.map((cert, idx) => (
          <a
            key={idx}
            href={cert.link}
            target="_self"
            className="cert-pill-link"
          >
            <div className="cert-pill-content">
              <div className="cert-pill-left">
                <span className="cert-accent-dot"></span>
                <div className="cert-info-stack">
                  <div className="cert-title-row">
                    <span className="cert-pill-title">{cert.title}</span>
                    <span className="cert-pill-divider">·</span>
                    <span className="cert-pill-issuer">{cert.issuer}</span>
                  </div>
                  <div className="cert-skills-row">
                    {cert.skills.split(',').map((skill, sIdx) => (
                      <span key={sIdx} className="cert-skill-item">
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="cert-pill-right">
                <i className="bx bx-up-arrow-alt cert-arrow-icon"></i>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
