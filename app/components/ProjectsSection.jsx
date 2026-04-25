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
    title: "REAL-TIME CHAT",
    category: "MESSAGING APP",
    desc: "A sleek, modern real-time messaging web application. Features live typing indicators, instant message delivery, and secure authentication to keep conversations private and fast.",
    bg: "/images/chat_app_bg.png",
    link: "https://real-time-chat-aouqhx3qv-tharukijs-projects.vercel.app/",
    tags: ["REACT", "NODE.JS", "SOCKET.IO", "CSS"],
  },
  {
    title: "OK MEME STUDIO",
    category: "CREATIVE TOOL",
    desc: "A fun, interactive web studio for creating dynamic memes. Built with canvas manipulation, drag-and-drop elements, and custom typography to bring internet humor to life in a clean UI.",
    bg: "/images/meme_studio_bg.png",
    link: "https://ok-meme-studio-h43vthffx-tharukijs-projects.vercel.app/",
    tags: ["REACT", "CANVAS API", "TAILWIND", "VERCEL"],
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
