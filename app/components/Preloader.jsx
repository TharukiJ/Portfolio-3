"use client";
import { useEffect, useState, useRef } from "react";

export default function Preloader({ onComplete }) {
  const [lines, setLines] = useState([]);
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const audioCtxRef = useRef(null);
  const bootTerminalRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();

    const handleUserClick = () => {
      if (audioCtxRef.current?.state === "suspended") {
        audioCtxRef.current.resume();
      }
    };
    document.addEventListener("click", handleUserClick, { once: true });

    return () => {
      document.removeEventListener("click", handleUserClick);
    };
  }, []);

  const playTick = () => {
    try {
      if (!audioCtxRef.current) return;
      if (audioCtxRef.current.state === "suspended") audioCtxRef.current.resume();

      const oscillator = audioCtxRef.current.createOscillator();
      const gainNode = audioCtxRef.current.createGain();

      oscillator.type = "square";
      oscillator.frequency.setValueAtTime(600, audioCtxRef.current.currentTime);

      gainNode.gain.setValueAtTime(0.1, audioCtxRef.current.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.08);

      oscillator.connect(gainNode);
      gainNode.connect(audioCtxRef.current.destination);

      oscillator.start();
      oscillator.stop(audioCtxRef.current.currentTime + 0.08);
    } catch (e) {}
  };

  useEffect(() => {
    const bootSequence = [
      { text: 'System.out.println("INITIALIZING_JVM...")', accent: false },
      { text: "JVM VERSION 21.0.2+13-LTS", accent: false },
      { text: "LOADING_CLASS: THARUKI_JAYASURIYA...", accent: true },
      { text: "class Portfolio { public void init() { ... } }", accent: false },
      { text: "INSTANTIATING OBJECTS: PROJECT_CONTROLLER", accent: false },
      { text: "CHECKING_HEAP_MEMORY... [OK]", accent: false },
      { text: "GARBAGE_COLLECTOR: ACTIVE", accent: false },
      { text: "IMPORTING LIB: JAVA.UTIL.CREATIVITY", accent: true },
      { text: "SKILLSET_LOADED: NEXTJS, REACT, TYPESCRIPT", accent: false },
      { text: "MODE: FULL_STACK_DEVELOPER", accent: true },
      { text: "SCANNING ANNOTATIONS: @DEVELOPER", accent: false },
      { text: "ESTABLISHING SECURE_DATA_STREAM...", accent: false },
      { text: "COMPILING_BYTECODE_RESOURCES...", accent: true },
      { text: "CURRENT_STATUS: BUILDING_THE_FUTURE", accent: true },
      { text: "VERIFYING_SECURITY_POLICIES...", accent: false },
      { text: 'System.out.println("ACCESS_GRANTED");', accent: true },
      { text: "Portfolio.run();", accent: false },
    ];

    let lineIdx = 0;
    const totalLines = bootSequence.length;

    const bootInterval = setInterval(() => {
      if (lineIdx < totalLines) {
        playTick();
        setLines((prev) => [...prev, bootSequence[lineIdx]]);
        setProgress(Math.floor(((lineIdx + 1) / totalLines) * 100));

        if (bootTerminalRef.current) {
          bootTerminalRef.current.scrollTop = bootTerminalRef.current.scrollHeight;
        }

        lineIdx++;
      } else {
        clearInterval(bootInterval);

        setTimeout(() => {
          setIsFadingOut(true);
          onComplete && onComplete();
          setTimeout(() => {
            document.body.style.overflow = "";
            setIsVisible(false);
          }, 1200);
        }, 800);
      }
    }, 160);

    return () => clearInterval(bootInterval);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!isVisible) return null;

  const showBars = lines.some((l) => l?.text?.includes("LOADING_CLASS"));

  return (
    <div id="preloader" className={`preloader ${isFadingOut ? "fade-out" : ""}`}>
      <div className={`bg-vertical-text text-left ${showBars ? "visible" : ""}`}>THARUKI</div>
      <div className={`bg-vertical-text text-center ${showBars ? "visible" : ""}`}>JAYASURIYA</div>
      <div className={`bg-vertical-text text-right ${showBars ? "visible" : ""}`}>ENGINEER</div>

      <div className="preloader-terminal-container">
        <div className="preloader-icon code-font">&gt;_</div>
        <div id="boot-terminal" className="boot-terminal code-font" ref={bootTerminalRef}>
          {lines.map((line, i) => (
            line && (
              <div key={i} className="boot-line">
                <span className={line.accent ? "terminal-accent" : ""}>{line.text}</span>
              </div>
            )
          ))}
        </div>
        <div id="loader-percent" className="loader-percent-v3 code-font">
          {progress}%
        </div>
      </div>
    </div>
  );
}
