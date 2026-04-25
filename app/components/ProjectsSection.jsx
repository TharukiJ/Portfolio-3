"use client";
import { useEffect, useRef, useState } from "react";

const PROJECTS = [
  {
    title: "TECHZAZ EDR",
    category: "EDR PLATFORM",
    desc: "A modern, high-performance Endpoint Detection and Response orchestration hub. Built with a decoupled architecture, it provides real-time monitoring, threat hunting, and fleet management for the TechzazEDR ecosystem.",
    bg: "/images/techzaz_dashboard.png",
    link: "https://techzazedr-frontend-production.up.railway.app/",
    tags: ["ANGULAR", "FASTAPI", "PYTHON", "FIREBASE", "GSAP", "FIRESTORE"],
  },
  {
    title: "OK MEME STUDIO",
    category: "CREATIVE TOOL",
    desc: "A fun, interactive web studio for creating dynamic memes. Built with canvas manipulation, drag-and-drop elements, and custom typography to bring internet humor to life in a clean UI.",
    bg: "/images/meme_studio_bg.png",
    link: "https://ok-meme-studio-h43vthffx-tharukijs-projects.vercel.app/",
    tags: ["REACT", "CANVAS API", "TAILWIND", "VERCEL"],
  },
  {
    title: "SEO-LENS",
    category: "SEO ANALYTICS",
    desc: "A comprehensive SEO auditing tool designed to provide deep insights into website performance, keyword rankings, and technical health for optimized search visibility.",
    bg: "/images/seo_lens_bg.png",
    link: "https://seo-lens-ud2o.vercel.app/",
    tags: ["REACT", "NEXT.JS", "TAILWIND", "SEO API"],
  },
  {
    title: "FLUX-AUDIT",
    category: "FINANCIAL DASHBOARD",
    desc: "A specialized financial auditing platform that streamlines transaction tracking and compliance monitoring with intuitive data visualization and automated reporting.",
    bg: "/images/flux_audit_bg.png",
    link: "https://flux-audit-roan.vercel.app/",
    tags: ["TYPESCRIPT", "D3.JS", "NODE.JS", "POSTGRES"],
  },
  {
    title: "FLEX-SLOT CUSTOM",
    category: "BOOKING SYSTEM",
    desc: "A highly customizable appointment scheduling and slot management system designed for businesses requiring flexible booking workflows and real-time availability.",
    bg: "/images/flex_slot_bg.png",
    link: "https://flex-slot-custom.vercel.app/",
    tags: ["SUPABASE", "NEXT.JS", "CLERK", "PRISMA"],
  },
  {
    title: "IT WADURA",
    category: "TECH SOLUTIONS",
    desc: "An enterprise-grade technology consultancy platform providing managed IT services, cloud infrastructure solutions, and digital transformation strategies for global clients.",
    bg: "/images/it_wadura_bg.png",
    link: "https://www.itwadura.com/",
    tags: ["WORDPRESS", "PHP", "AWS", "UI/UX"],
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
      { threshold: 0.12 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" className={`projects section-padding reveal ${animActive ? "active" : ""}`} ref={sectionRef}>
      <div className="section-header">
        <h2 className="section-title">FEATURED PROJECTS</h2>
      </div>
      <div className={`projects-grid stagger-container ${animActive ? "active" : ""}`}>
        {PROJECTS.map((p, idx) => (
          <article key={idx} className="project-card-v2 reveal-item">
            <div className="project-card-bg" style={{ backgroundImage: `url('${p.bg}')` }}></div>
            <div className="project-card-overlay"></div>
            <div className="project-card-inner">
              <div className="project-card-top">
                <span className="project-category code-font">{p.category}</span>
                <a href={p.link} className="project-ext-link" aria-label="View Project">
                  <i className="bx bx-link-external"></i>
                </a>
              </div>
              <div className="project-card-body">
                <h3 className="project-title-v2">{p.title}</h3>
                <p className="project-desc-v2">{p.desc}</p>
                <div className="project-tags code-font">
                  {p.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
