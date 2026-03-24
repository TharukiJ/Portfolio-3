"use client";
import { useState, useEffect } from "react";
import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import SkillsSection from "./components/SkillsSection";
import ProjectsSection from "./components/ProjectsSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export default function Home() {
  const [preloaderComplete, setPreloaderComplete] = useState(false);

  // Fallback in case preloader unmounts instantly or encounters an issue
  useEffect(() => {
    let timer;
    if (!preloaderComplete) {
      timer = setTimeout(() => {
        setPreloaderComplete(true);
      }, 7000); // 7s timeout fallback
    }
    return () => clearTimeout(timer);
  }, [preloaderComplete]);

  return (
    <>
      <div className="noise-overlay"></div>
      
      {!preloaderComplete && <Preloader onComplete={() => setPreloaderComplete(true)} />}
      
      <Navbar />
      
      <main>
        <HeroSection isVisible={preloaderComplete} />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
