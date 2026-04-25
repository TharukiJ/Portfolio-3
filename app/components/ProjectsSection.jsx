"use client";
import { useEffect, useRef, useState } from "react";

const PROJECTS = [
  {
    title: "TECHZAZ EDR",
    category: "EDR PLATFORM",
    type: "main",
    desc: "A modern, high-performance EDR orchestration hub. Provides real-time monitoring and threat hunting.",
    bg: "/images/techzaz_dashboard.png",
    link: "https://techzazedr-frontend-production.up.railway.app/",
    tags: ["ANGULAR", "FASTAPI", "PYTHON"],
  },
  {
    title: "FLEX-SLOT CUSTOM",
    category: "BOOKING SYSTEM",
    type: "main",
    desc: "Customizable appointment scheduling system for flexible booking workflows.",
    bg: "/images/flex_slot_bg.png",
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
  const [activeStep, setActiveStep] = useState(0); // 0: Root, 1: Categories, 2: Projects, 3: Details
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

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

  const handleRootClick = () => {
    setActiveStep(1);
    setSelectedCategory(null);
    setSelectedProject(null);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setActiveStep(2);
    setSelectedProject(null);
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setActiveStep(3);
  };

  const reset = () => {
    setActiveStep(0);
    setSelectedCategory(null);
    setSelectedProject(null);
  };

  return (
    <section id="projects" className={`projects section-padding reveal ${animActive ? "active" : ""}`} ref={sectionRef}>
      <div className="section-header">
        <h2 className="section-title">PROJECT ARCHIVE</h2>
        {activeStep > 0 && (
          <button className="reset-btn code-font" onClick={reset}>
            <i className="bx bx-refresh"></i> RESET VIEW
          </button>
        )}
      </div>

      <div className="drilldown-container">
        {/* STEP 0: ROOT NODE */}
        <div 
          className={`drill-node yellow-node ${activeStep >= 1 ? "node-small node-left" : "node-large"}`}
          onClick={handleRootClick}
        >
          <div className="node-content">
            <span className="node-tag code-font">DIRECTORY</span>
            <h3 className="node-title">MY PROJECTS</h3>
            {activeStep === 0 && <p className="node-hint">Click to start exploration</p>}
          </div>
        </div>

        {/* STEP 1: CATEGORY BUTTONS */}
        {activeStep >= 1 && (
          <div className={`step-column category-column ${activeStep >= 2 ? "column-shrunk" : ""}`}>
            <div 
              className={`drill-node gray-node ${selectedCategory === 'main' ? "node-active" : ""} ${activeStep >= 2 ? "node-tiny" : ""}`}
              onClick={() => handleCategoryClick('main')}
            >
              <h4 className="node-title">MAIN PROJECTS</h4>
            </div>
            <div 
              className={`drill-node green-node ${selectedCategory === 'mini' ? "node-active" : ""} ${activeStep >= 2 ? "node-tiny" : ""}`}
              onClick={() => handleCategoryClick('mini')}
            >
              <h4 className="node-title">MINI PROJECTS</h4>
            </div>
          </div>
        )}

        {/* STEP 2: PROJECT BUTTONS */}
        {activeStep >= 2 && selectedCategory && (
          <div className={`step-column project-column ${activeStep >= 3 ? "column-shrunk" : ""}`}>
            {PROJECTS.filter(p => p.type === selectedCategory).map((p, idx) => (
              <div 
                key={idx}
                className={`drill-node project-node ${selectedProject?.title === p.title ? "node-active" : ""} ${activeStep >= 3 ? "node-tiny" : ""}`}
                onClick={() => handleProjectClick(p)}
              >
                <h4 className="node-title">{p.title}</h4>
              </div>
            ))}
          </div>
        )}

        {/* STEP 3: PROJECT DETAIL BOX - REDESIGNED */}
        {activeStep >= 3 && selectedProject && (
          <div className="project-detail-box-premium reveal-right">
            <div className="detail-top-bar">
              <span className="premium-badge code-font">IT COMPANY</span>
              <a href={selectedProject.link} className="premium-link-circle" target="_self">
                <i className="bx bx-up-arrow-alt"></i>
              </a>
            </div>
            
            <div className="premium-content-center">
              <div className="premium-logo-area">
                 {/* Large logo or background text placeholder */}
                 <div className="bg-text-overlay">{selectedProject.title}</div>
              </div>
              <h3 className="premium-title">{selectedProject.title}</h3>
              <p className="premium-desc">{selectedProject.desc}</p>
            </div>

            <div className="premium-tags-bottom">
              {selectedProject.tags.map(tag => (
                <span key={tag} className="premium-tag code-font">{tag}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
