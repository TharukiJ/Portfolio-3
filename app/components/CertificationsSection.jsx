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
    title: "JavaScript Code Challenges: Creating Web Apps",
    issuer: "LINKEDIN LEARNING",
    skills: "Java Script",
    id: "LI-JS-99001",
    link: "https://www.linkedin.com/learning/certificates/fc8e63732385afb2b82c84ae7ca34e806fe1d0c7bfa0ab682b6128b64068abb6?u=76664938",
  },
  {
    title: "PMP PRACTICE EXAMS (1-4)",
    issuer: "PROJECT MANAGEMENT PROFESSIONAL (PMP)",
    skills: "Project Management,Project Management Trainee",
    multi: true,
    exams: [
      { name: "Exam 1", link: "https://www.linkedin.com/learning/certificates/dd968d52a40b9618bea04d87768d878360a667d5579a6c41adaf4f54d1c63946?u=76664938" },
      { name: "Exam 2", link: "https://www.linkedin.com/learning/certificates/960fdee2798fa6ee85ef9f291abafc682d7ddce0532a7f6f72dc76f660892200?u=76664938" },
      { name: "Exam 3", link: "https://www.linkedin.com/learning/certificates/bb533516be86a87b104a002ff16c5b45986dcea70f24a11d70f1557184b3a254?u=76664938" },
      { name: "Exam 4", link: "https://www.linkedin.com/learning/certificates/47c4e74fd6f485c76d7a918a38b4044a2051a9b49a6945f95209af348212044b?u=76664938" },
    ]
  },
  {
    title: "",
    issuer: "",
    skills: "t",
    link: "#",
  }, {
    title: "",
    issuer: "",
    skills: "t",
    link: "#",
  }, {
    title: "",
    issuer: "",
    skills: "t",
    link: "#",
  }, {
    title: "",
    issuer: "",
    skills: "t",
    link: "#",
  }, {
    title: "",
    issuer: "",
    skills: "t",
    link: "#",
  }, {
    title: "",
    issuer: "",
    skills: "t",
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
          <div
            key={idx}
            className={`cert-card-modern ${cert.multi ? "multi-card" : ""}`}
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

              {/* Multi-exam links rendered as clean pills */}
              {cert.multi && (
                <div className="cert-multi-grid">
                  {cert.exams.map((exam, eIdx) => (
                    <a
                      key={eIdx}
                      href={exam.link}
                      className="exam-verify-btn"
                      target="_self"
                    >
                      {exam.name} <i className="bx bx-right-top-arrow-circle"></i>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {!cert.multi && (
              <a href={cert.link} className="cert-card-arrow" target="_self">
                <i className="bx bx-chevron-right"></i>
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
