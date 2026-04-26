"use client";
import { useEffect, useRef, useState } from "react";

const CERTIFICATIONS = [
  {
    title: "PYTHON",
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
    skills: "JavaScript",
    id: "LI-JS-99001",
    link: "https://www.linkedin.com/learning/certificates/fc8e63732385afb2b82c84ae7ca34e806fe1d0c7bfa0ab682b6128b64068abb6?u=76664938",
  },
  {
    title: "PMP PRACTICE EXAMS (1-4)",
    issuer: "PROJECT MANAGEMENT PROFESSIONAL (PMP)",
    skills: "Project Management, Project Management Trainee",
    multi: true,
    exams: [
      { name: "Exam 1", link: "https://www.linkedin.com/learning/certificates/dd968d52a40b9618bea04d87768d878360a667d5579a6c41adaf4f54d1c63946?u=76664938" },
      { name: "Exam 2", link: "https://www.linkedin.com/learning/certificates/960fdee2798fa6ee85ef9f291abafc682d7ddce0532a7f6f72dc76f660892200?u=76664938" },
      { name: "Exam 3", link: "https://www.linkedin.com/learning/certificates/bb533516be86a87b104a002ff16c5b45986dcea70f24a11d70f1557184b3a254?u=76664938" },
      { name: "Exam 4", link: "https://www.linkedin.com/learning/certificates/47c4e74fd6f485c76d7a918a38b4044a2051a9b49a6945f95209af348212044b?u=76664938" },
    ]
  },
  {
    title: "AI and Digital Marketing Trends",
    issuer: "LINKEDIN LEARNING",
    skills: "Artificial Intelligence (AI), Digital Marketing, Marketing Strategy",
    link: "https://www.linkedin.com/learning/certificates/275028a7e0552187cf0a3a8247aedcb23332b639ce957ba69839af21d69f2499?u=76664938",
  },
  {
    title: "Advanced code challenges in React",
    issuer: "LINKEDIN LEARNING",
    skills: "React.js",
    link: "https://www.linkedin.com/learning/certificates/9f34fc4cecd08e5c27fe66a578149237c16763dd6f85beedd436f47d4744370c?u=76664938",
  },
  {
    title: "Programming Foundations: Version Control with Git",
    issuer: "LINKEDIN LEARNING",
    skills: "GIT, Version control",
    link: "https://www.linkedin.com/learning/certificates/d0a8dedc04a3acff7e09aa8fce9840c0c002aa5e56adb3f53389654c64000834?u=76664938",
  },
  {
    title: "C# Coding Exercise",
    issuer: "LINKEDIN LEARNING",
    skills: "C#",
    link: "https://www.linkedin.com/learning/certificates/a7ff22a255468a4249e8e9d264f0c6b7e827219f294224846cb7b4c121dbf2bc?u=76664938",
  },
  {
    title: "Practice Exam 1 for GitHub Copilot",
    issuer: "LINKEDIN LEARNING",
    skills: "GitHub Copilot, Artificial Intelligence (AI), GitHub",
    link: "https://www.linkedin.com/learning/certificates/175acdadf82793ee16941da62309b3ebaac03abb8b08ca244dc046569a699835?u=76664938",
  },
  {
    title: "What Is Generative AI?",
    issuer: "MICROSOFT",
    skills: "Generative AI Tools, Generative AI",
    link: "https://www.linkedin.com/learning/certificates/f0c1f308f00aa8b15ccfb0c3902f35b8d31a86c92066e1d054c6cb0507c7c76d?u=76664938",
  },
  {
    title: "Succeeding in Web Development: Full Stack and Front End",
    issuer: "LINKEDIN LEARNING",
    skills: "Full-Stack Development, Front-End Development",
    link: "https://www.linkedin.com/learning/certificates/ccceacd93ba62ba5b863b98465975d050552146dad7ccd582965e3590a192027?u=76664938",
  },
  {
    title: "AI in Project Management",
    issuer: "LINKEDIN LEARNING",
    skills: "Artificial Intelligence (AI), AI for Project Management",
    link: "https://www.linkedin.com/learning/certificates/a0f1ff7aa0a3489a071771d23e738fa9648ab3235df8137cc3d2ae5401c7a102?u=76664938",
  },
  {
    title: "Modern Data Engineering Essentials",
    issuer: "PEARSON",
    skills: "Data Engineering",
    link: "https://www.linkedin.com/learning/certificates/5c3375f582e95ae780fd27a7a29137ac8a6c27b8e36d99c09b84c1add6a3cb6b?u=76664938",
  },
  {
    title: "Applied Machine Learning: Foundations",
    issuer: "LINKEDIN LEARNING",
    skills: "Machine Learning",
    link: "https://www.linkedin.com/learning/certificates/b47e3cb0c3d7672126869dbd7e15989c08014a1a66870269a74b0406b5bbf032?u=76664938",
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

  const getIssuerBadge = (issuer) => {
    const lower = issuer.toLowerCase();
    if (lower.includes("linkedin")) return <i className="bx bxl-linkedin"></i>;
    if (lower.includes("microsoft")) return <i className="bx bxl-microsoft"></i>;
    if (lower.includes("pmi")) return <i className="bx bx-shield-quarter"></i>;
    if (lower.includes("nasba")) return <i className="bx bx-award"></i>;
    if (lower.includes("pearson")) return <i className="bx bx-book-open"></i>;
    return <i className="bx bx-certification"></i>;
  };

  return (
    <section id="certifications" className={`certifications section-padding reveal ${animActive ? "active" : ""}`} ref={sectionRef}>
      <div className="section-header-modern">
        <div className="section-title-group">
          <h2 className="section-title-main">CERTIFICATION</h2>
          <h2 className="section-title-sub">& CREDENTIALS</h2>
          <div className="section-executing-functions">VERIFYING AUTHENTICITY [{CERTIFICATIONS.length}]</div>
        </div>
      </div>

      <div className="cert-stack">
        {CERTIFICATIONS.map((cert, idx) => (
          <a
            key={idx}
            href={cert.multi ? cert.exams[0].link : cert.link}
            target="_blank"
            rel="noopener noreferrer"
            className="cert-card-modern"
          >
            <div className="cert-issuer-badge">
              {getIssuerBadge(cert.issuer)}
            </div>

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

            <div className="cert-card-action">
              <span className="cert-verify-pill">VERIFY</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
