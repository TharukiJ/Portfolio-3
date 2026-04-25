"use client";
import { useEffect, useRef, useState } from "react";

const CERTIFICATIONS = [
  {
    title: "PYTHON ",
    issuer: "PMI (PROJECT MANAGEMENT INSTITUTE)",
    skills: "Python, Data Analysis",
    id: "LI-PY-92837",
    link: "https://www.linkedin.com/learning/certificates/0ebefe00bcee57a02c0dcbd5c11c9ccf665c571b8c0306e7bd79673026fa75c9?u=76664938",
  },
  {
    title: "PYTHON CODE CHALLENGES FOR DATA ANALYSIS",
    issuer: "NASBA Continuing Professional Education (CPE)",
    skills: "Python",
    id: "AWS-SA-12345",
    link: "https://www.linkedin.com/learning/certificates/616287ff7465a2c202b0969f62c903ff69e6abcee4ddeadac8bd5bd2221a16da?u=76664938",
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

      <div className="cert-stack">
        {CERTIFICATIONS.map((cert, idx) => (
          <a
            key={idx}
            href={cert.link}
            target="_self"
            className="cert-card-modern"
          >
            <div className="cert-card-inner">
              <div className="cert-title-row">
                <h3 className="cert-modern-title">{cert.title}</h3>
              </div>

              <div className="cert-issuer-row">
                <span className="cert-modern-issuer">Issued by {cert.issuer}</span>
              </div>

              <div className="cert-tags-row">
                {cert.skills.split(',').map((skill, sIdx) => (
                  <span key={sIdx} className="cert-modern-tag">
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </div>
            <div className="cert-card-arrow">
              <i className="bx bx-chevron-right"></i>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
