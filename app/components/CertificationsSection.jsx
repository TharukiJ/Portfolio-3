"use client";
import { useEffect, useRef, useState } from "react";

const CERTIFICATIONS = [
  {
    title: "PYTHON CODE CHALLENGES FOR DATA ANALYSIS",
    issuer: "LINKEDIN LEARNING",
    date: "APR 2026",
    id: "LI-PY-92837",
    link: "https://www.linkedin.com/learning/certificates/0ebefe00bcee57a02c0dcbd5c11c9ccf665c571b8c0306e7bd79673026fa75c9?u=76664938",
  },
  {
    title: "AWS CERTIFIED SOLUTIONS ARCHITECT",
    issuer: "AMAZON WEB SERVICES",
    date: "2025",
    id: "AWS-SA-12345",
    link: "#",
  },
  {
    title: "META FRONT-END DEVELOPER PROFESSIONAL",
    issuer: "META / COURSERA",
    date: "2024",
    id: "META-FE-67890",
    link: "#",
  },
  {
    title: "GOOGLE CYBERSECURITY PROFESSIONAL",
    issuer: "GOOGLE / COURSERA",
    date: "2024",
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
      <div className="section-header">
        <h2 className="section-title">CERTIFICATION & CREDENTIALS</h2>
      </div>

      <div className="cert-grid">
        {CERTIFICATIONS.map((cert, idx) => (
          <div key={idx} className="cert-card">
            <div className="cert-accent-bar"></div>
            <div className="cert-header">
              <span className="cert-date code-font">{cert.date}</span>
              <a href={cert.link} className="cert-external-link" aria-label="Verify Certificate">
                <i className="bx bx-badge-check"></i>
              </a>
            </div>
            <h3 className="cert-title">{cert.title}</h3>
            <div className="cert-footer">
              <span className="cert-issuer">{cert.issuer}</span>
              <span className="cert-id code-font">{cert.id}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
