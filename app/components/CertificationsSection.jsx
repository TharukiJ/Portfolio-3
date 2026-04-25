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
    title: "AI and Digital Marketing Trends",
    issuer: "LINKEDIN LEARNING",
    skills: "Artificial Intelligence (AI),Digital Marketing,Marketing Strategy,AI for Marketing",
    link: "https://www.linkedin.com/learning/certificates/275028a7e0552187cf0a3a8247aedcb23332b639ce957ba69839af21d69f2499?u=76664938",
  }, {
    title: "Advanced code challenges in React",
    issuer: "LINKEDIN LEARNING",
    skills: "React.js",
    link: "https://www.linkedin.com/learning/certificates/9f34fc4cecd08e5c27fe66a578149237c16763dd6f85beedd436f47d4744370c?u=76664938",
  }, {
    title: " Programming Foundations: Version Control with Git",
    issuer: "Linkdhin Learning",
    skills: "GIT,Version control",
    link: "https://www.linkedin.com/learning/certificates/d0a8dedc04a3acff7e09aa8fce9840c0c002aa5e56adb3f53389654c64000834?u=76664938",
  }
  , {
    title: "C# Coding Exersice",
    issuer: "Linkdhin Learning",
    skills: "C#",
    link: "https://www.linkedin.com/learning/certificates/a7ff22a255468a4249e8e9d264f0c6b7e827219f294224846cb7b4c121dbf2bc?u=76664938",
  }, , {
    title: " Practice Exam 1 for GitHub Copilot",
    issuer: "Linkdhin Learning",
    skills: "GitHub Copilot,Artificial Intelligence (AI),AI Software Development,GitHub",
    link: "https://www.linkedin.com/learning/certificates/175acdadf82793ee16941da62309b3ebaac03abb8b08ca244dc046569a699835?u=76664938",
  }, , {
    title: "What Is Generative AI?",
    issuer: "Microsoft",
    skills: "Generative AI Tools,Generative AI",
    link: "https://www.linkedin.com/learning/certificates/f0c1f308f00aa8b15ccfb0c3902f35b8d31a86c92066e1d054c6cb0507c7c76d?u=76664938",
  }, , {
    title: "Succeeding in Web Development: Full Stack and Front End",
    issuer: "Linkdhin Learning",
    skills: "Full-Stack Development,Front-End Development",
    link: "https://www.linkedin.com/learning/certificates/ccceacd93ba62ba5b863b98465975d050552146dad7ccd582965e3590a192027?u=76664938",
  }, , {
    title: " ",
    issuer: "Linkdhin Learning",
    skills: "",
    link: "",
  }, , {
    title: " Modern Data Engineering Essentials",
    issuer: "pearson",
    skills: "Data Engineering",
    link: "https://www.linkedin.com/learning/certificates/5c3375f582e95ae780fd27a7a29137ac8a6c27b8e36d99c09b84c1add6a3cb6b?u=76664938",
  }, , {
    title: " ",
    issuer: "Linkdhin Learning",
    skills: "",
    link: "",
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
