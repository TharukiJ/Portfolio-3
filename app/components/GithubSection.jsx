"use client";
import { useEffect, useRef, useState } from "react";

export default function GithubSection() {
  const sectionRef = useRef(null);
  const [animActive, setAnimActive] = useState(false);
  const [totalContributions, setTotalContributions] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch contribution data
    const fetchContributions = async () => {
      try {
        const response = await fetch("https://github-contributions-api.jogruber.de/v4/TharukiJ");
        const data = await response.json();
        if (data && data.total) {
          // Get total for the current year or most recent
          const currentYear = new Date().getFullYear().toString();
          setTotalContributions(data.total[currentYear] || 0);
        }
      } catch (error) {
        console.error("Error fetching contributions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContributions();

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
    <section id="github" className={`github-section section-padding reveal ${animActive ? "active" : ""}`} ref={sectionRef}>
      <div className="section-header-modern">
        <div className="section-title-group">
          <h2 className="section-title-main">GITHUB</h2>
          <h2 className="section-title-sub">ACTIVITY</h2>
          <div className="section-executing-functions">
            {loading ? "INITIALIZING FETCH..." : `CONTRIBUTIONS_LOADED [${totalContributions}]`}
          </div>
        </div>
      </div>

      <div className="github-content-grid">
        <div className="github-contribution-wrapper">
          <div className="github-stat-overlay">
            <span className="github-count-text">{totalContributions} Contributions in 2026</span>
          </div>
          <img
            src="https://ghchart.rshah.org/TharukiJ?year=2026"
            alt="TharukiJ GitHub Contribution Chart 2026"
            className="github-chart-img"
          />
        </div>

        <div className="skills-video-container">
          <video
            src="/ex.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="skills-small-video"
          />
        </div>
      </div>
    </section>
  );
}
