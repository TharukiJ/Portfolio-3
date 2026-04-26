"use client";
import { useEffect, useRef, useState } from "react";

const PROJECTS = [
  {
    title: "TECHZAZ EDR",
    category: "EDR PLATFORM",
    type: "main",
    desc: "A modern, high-performance Endpoint Detection and Response orchestration hub. Built with a decoupled architecture, it provides real-time monitoring, threat hunting, and fleet management for the TechzazEDR ecosystem.",


    bg: "/images/techzaz_dashboard.png",
    link: "https://techzazedrdashboard-frontend-production.up.railway.app/",

    tags: ["ANGULAR", "FASTAPI", "PYTHON", "FIREBASE", "GSAP", "FIRESTORE"],
  },
  {
    title: "FLEX-SLOT CUSTOM",
    category: "BOOKING SYSTEM",
    type: "main",
    desc: "Customizable appointment scheduling system for flexible booking workflows.",
    bg: "/images/flex_slot_premium.png",
    link: "https://flex-slot-custom.vercel.app/",
    tags: ["SUPABASE", "NEXT.JS", "CLERK"],
  },
  {
    title: "IT WADURA",
    category: "TECH SOLUTIONS",
    type: "main",
    desc: "Enterprise-grade technology consultancy platform for digital transformation.",
    bg: "/images/it_wadura_bg.png",
    link: "https://www.itwadura.com/",
    tags: ["WORDPRESS", "AWS", "PHP"],
  },
  {
    title: "REAL-TIME CHAT",
    category: "MESSAGING APP",
    type: "main",
    desc: "A sleek, modern real-time messaging web application. Features live typing indicators, instant message delivery, and secure authentication to keep conversations private and fast.",
    bg: "/images/chat_app_bg.png",
    link: "https://real-time-chat-app-six-rho.vercel.app/",
    tags: ["REACT", "NODE.JS", "SOCKET.IO", "CSS"],
  },
  {
    title: "OK MEME STUDIO",
    category: "CREATIVE TOOL",
    type: "mini",
    desc: "Interactive web studio for creating dynamic memes with custom typography.",
    bg: "/images/meme_studio_bg.png",
    link: "https://ok-meme-studio-h43vthffx-tharukijs-projects.vercel.app/",
    tags: ["REACT", "CANVAS API"],
  },
  {
    title: "SEO-LENS",
    category: "SEO ANALYTICS",
    type: "mini",
    desc: "Comprehensive SEO auditing tool for website performance and rankings.",
    bg: "/images/seo_lens_bg.png",
    link: "https://seo-lens-ud2o.vercel.app/",
    tags: ["REACT", "NEXT.JS", "SEO API"],
  },
  {
    title: "FLUX-AUDIT",
    category: "FINANCIAL DASHBOARD",
    type: "mini",
    desc: "Specialized financial auditing platform for transaction tracking.",
    bg: "/images/flux_audit_bg.png",
    link: "https://flux-audit-roan.vercel.app/",
    tags: ["TYPESCRIPT", "D3.JS"],
  },

];

export default function ProjectsSection() {
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
    <section id="projects" className={`projects reveal ${animActive ? "active" : ""}`} ref={sectionRef}>
      <div className="selected-work-header">
        <div className="selected-work-title-group">
          <h2 className="selected-work-title-main">SELECTED</h2>
          <h2 className="selected-work-title-sub">WORK</h2>
          <div className="executing-functions">EXECUTING FUNCTIONS [{PROJECTS.length}]</div>
        </div>
      </div>

      <div className="projects-grid-modern">
        {PROJECTS.map((project, idx) => (
          <a 
            key={idx} 
            href={project.link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="project-card-premium"
            style={{ backgroundImage: `url(${project.bg})` }}
          >
            <div className="project-card-overlay">
              <div className="project-card-top">
                <span className="project-type-badge">{project.category}</span>
                <div className="project-arrow-btn">
                  <i className="bx bx-right-arrow-alt"></i>
                </div>
              </div>

              <div className="project-card-body">
                <h3 className="project-card-title">{project.title}</h3>
                <p className="project-card-desc">{project.desc}</p>
                <div className="project-card-footer">
                  {project.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="project-stack-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
