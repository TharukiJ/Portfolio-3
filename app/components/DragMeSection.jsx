"use client";
import { useState, useEffect } from "react";

/* ── Doodle SVG icons ─────────────────────────────── */
const IconSparkle = () => (
  <svg viewBox="0 0 60 60" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <line x1="30" y1="5"  x2="30" y2="18"/><line x1="30" y1="42" x2="30" y2="55"/>
    <line x1="5"  y1="30" x2="18" y2="30"/><line x1="42" y1="30" x2="55" y2="30"/>
    <line x1="12" y1="12" x2="21" y2="21"/><line x1="39" y1="39" x2="48" y2="48"/>
    <line x1="48" y1="12" x2="39" y2="21"/><line x1="21" y1="39" x2="12" y2="48"/>
    <circle cx="30" cy="30" r="3" fill="currentColor" stroke="none"/>
  </svg>
);

const IconStar = () => (
  <svg viewBox="0 0 60 60" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="30,6 35,22 52,22 39,33 44,50 30,40 16,50 21,33 8,22 25,22"/>
  </svg>
);

const IconExclaim = () => (
  <svg viewBox="0 0 60 60" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="30" y1="8" x2="30" y2="38"/>
    <circle cx="30" cy="49" r="3.5" fill="currentColor" stroke="none"/>
    <line x1="8"  y1="14" x2="16" y2="20"/>
    <line x1="52" y1="14" x2="44" y2="20"/>
  </svg>
);

const IconSpeech = () => (
  <svg viewBox="0 0 60 60" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 12 Q10 8 14 8 L46 8 Q50 8 50 12 L50 34 Q50 38 46 38 L22 38 L14 48 L14 38 Q10 38 10 34 Z"/>
    <circle cx="22" cy="23" r="2.5" fill="currentColor" stroke="none"/>
    <circle cx="30" cy="23" r="2.5" fill="currentColor" stroke="none"/>
    <circle cx="38" cy="23" r="2.5" fill="currentColor" stroke="none"/>
  </svg>
);

const IconQuestion = () => (
  <svg viewBox="0 0 60 60" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="M20 20 Q20 10 30 10 Q40 10 40 20 Q40 29 30 33 L30 40"/>
    <circle cx="30" cy="50" r="3" fill="currentColor" stroke="none"/>
  </svg>
);

const IconBurst = () => (
  <svg viewBox="0 0 60 60" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    {Array.from({length: 12}, (_, i) => {
      const a = (i * 30) * Math.PI / 180;
      return <line key={i} x1={30 + 9*Math.cos(a)} y1={30 + 9*Math.sin(a)} x2={30 + 25*Math.cos(a)} y2={30 + 25*Math.sin(a)}/>;
    })}
  </svg>
);

const IconWaves = () => (
  <svg viewBox="0 0 60 60" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <path d="M8 18 Q18 12 28 18 Q38 24 48 18"/>
    <path d="M8 30 Q18 24 28 30 Q38 36 48 30"/>
    <path d="M8 42 Q18 36 28 42 Q38 48 48 42"/>
  </svg>
);

const IconCrown = () => (
  <svg viewBox="0 0 60 60" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 46 L8 24 L20 34 L30 8 L40 34 L52 24 L52 46 Z"/>
  </svg>
);

const IconZigzag = () => (
  <svg viewBox="0 0 60 60" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 22 L20 10 L30 28 L40 8 L52 22"/>
    <path d="M12 40 L22 30 L32 44 L42 28 L52 40"/>
  </svg>
);

const IconSun = () => (
  <svg viewBox="0 0 60 60" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    {[-80,-60,-40,-20,0,20,40,60,80].map((deg, i) => {
      const a = deg * Math.PI / 180;
      return <line key={i} x1="30" y1="52" x2={30 + 22*Math.sin(a)} y2={52 - 22*Math.cos(a)}/>;
    })}
    <line x1="6" y1="52" x2="54" y2="52" strokeWidth="1.5" strokeOpacity="0.5"/>
  </svg>
);

const IconShine = () => (
  <svg viewBox="0 0 60 60" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="20" y1="8"  x2="16" y2="22"/>
    <line x1="30" y1="5"  x2="30" y2="20"/>
    <line x1="40" y1="8"  x2="44" y2="22"/>
    <line x1="15" y1="34" x2="10" y2="44"/>
    <line x1="30" y1="38" x2="30" y2="50"/>
    <line x1="45" y1="34" x2="50" y2="44"/>
  </svg>
);

const IconSpeedLines = () => (
  <svg viewBox="0 0 60 60" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="8"  y1="18" x2="52" y2="18"/>
    <line x1="14" y1="27" x2="52" y2="27"/>
    <line x1="8"  y1="36" x2="52" y2="36"/>
    <line x1="18" y1="45" x2="52" y2="45"/>
    <line x1="14" y1="11" x2="40" y2="11"/>
  </svg>
);

const ICONS = [
  { id: "sparkle",    label: "Sparkle",     Icon: IconSparkle    },
  { id: "star",       label: "Star",        Icon: IconStar       },
  { id: "exclaim",    label: "Wow!",        Icon: IconExclaim    },
  { id: "speech",     label: "Chat",        Icon: IconSpeech     },
  { id: "question",   label: "Hmm?",        Icon: IconQuestion   },
  { id: "burst",      label: "Burst",       Icon: IconBurst      },
  { id: "waves",      label: "Waves",       Icon: IconWaves      },
  { id: "crown",      label: "Crown",       Icon: IconCrown      },
  { id: "zigzag",     label: "Energy",      Icon: IconZigzag     },
  { id: "sun",        label: "Sunburst",    Icon: IconSun        },
  { id: "shine",      label: "Shine",       Icon: IconShine      },
  { id: "speedlines", label: "Speed!",      Icon: IconSpeedLines },
];

/* ── Scattered positions for each icon (% based) ── */
const ICON_POSITIONS = [
  { left: "5%",  top: "15%", rotate: -12 },
  { left: "18%", top: "55%", rotate: 20 },
  { left: "30%", top: "25%", rotate: -5 },
  { left: "8%",  top: "75%", rotate: 15 },
  { left: "45%", top: "60%", rotate: -18 },
  { left: "55%", top: "20%", rotate: 10 },
  { left: "40%", top: "80%", rotate: -8 },
  { left: "65%", top: "50%", rotate: 22 },
  { left: "22%", top: "40%", rotate: -25 },
  { left: "75%", top: "72%", rotate: 6 },
  { left: "50%", top: "40%", rotate: -14 },
  { left: "68%", top: "30%", rotate: 18 },
];

/* ── DoodleSource Component ─────────────────────── */
export function DoodleSource() {
  return (
    <div className="doodle-playground">
      {/* Drag Me instruction at top-right */}
      <div className="dragme-instruction-topright">
        <svg className="dragme-arrow-curved" width="50" height="50" viewBox="0 0 60 60" fill="none">
          <path d="M10 10C15 35 45 35 45 50" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M38 42L45 52L52 44" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="dragme-text">Drag me</span>
      </div>

      {/* Icons scattered across the entire section */}
      {ICONS.map(({ id, label, Icon }, idx) => {
        const pos = ICON_POSITIONS[idx];
        return (
          <div
            key={id}
            draggable
            title={label}
            className="dragme-item-scattered"
            style={{
              left: pos.left,
              top: pos.top,
              transform: `rotate(${pos.rotate}deg)`,
            }}
            onDragStart={(e) => {
              e.dataTransfer.setData("dragme-icon", id);
              e.dataTransfer.effectAllowed = "copy";
            }}
          >
            <Icon />
          </div>
        );
      })}
    </div>
  );
}

/* ── DoodleOverlay Component ────────────────────── */
export function DoodleOverlay() {
  const [dropped, setDropped] = useState([]);

  useEffect(() => {
    const onOver = (e) => e.preventDefault();
    const onDrop = (e) => {
      e.preventDefault();
      const id = e.dataTransfer.getData("dragme-icon");
      if (!id) return;
      
      const x = e.clientX;
      const y = e.clientY + window.scrollY;
      
      setDropped((prev) => [...prev, { id, uid: Date.now(), x, y }]);
    };
    
    window.addEventListener("dragover", onOver);
    window.addEventListener("drop", onDrop);
    return () => {
      window.removeEventListener("dragover", onOver);
      window.removeEventListener("drop", onDrop);
    };
  }, []);

  const removeDropped = (uid) =>
    setDropped((prev) => prev.filter((d) => d.uid !== uid));

  return (
    <div className="dragme-overlay">
      {dropped.map(({ id, uid, x, y }) => {
        const match = ICONS.find((i) => i.id === id);
        if (!match) return null;
        const { Icon } = match;
        return (
          <div
            key={uid}
            className="dragme-dropped"
            style={{ left: x, top: y }}
            onDoubleClick={() => removeDropped(uid)}
            title="Double-click to remove"
          >
            <Icon />
          </div>
        );
      })}
    </div>
  );
}

/* ── Default export for backward compatibility ───── */
export default function DragMeSection() {
  return (
    <>
      <DoodleSource />
      <DoodleOverlay />
    </>
  );
}
