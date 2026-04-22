"use client";

import { useEffect, useState } from "react";
import { MdToys } from "react-icons/md";

const loadingTexts = [
  "Unpacking the toys...",
  "Setting up the fun...",
  "Loading the joy...",
];

const PreLoader = ({ onFinish }) => {
  const [textIndex, setTextIndex] = useState(0);
  const [dots, setDots] = useState("");
  const [fadeOut, setFadeOut] = useState(false);

  // ── Cycle loading texts ──
  useEffect(() => {
    const t = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % loadingTexts.length);
    }, 800);
    return () => clearInterval(t);
  }, []);

  // ── Animate dots ──
  useEffect(() => {
    const t = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 400);
    return () => clearInterval(t);
  }, []);

  // ── Auto dismiss after 2.5s ──
  useEffect(() => {
    const dismiss = setTimeout(() => {
      setFadeOut(true);
      // wait for fade animation to finish then notify parent
      setTimeout(onFinish, 600);
    }, 2500);
    return () => clearTimeout(dismiss);
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-9999 flex flex-col items-center justify-center bg-base-100 transition-opacity duration-500
        ${fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"}`}
    >
      {/* ── Outer ring ── */}
      <div className="relative flex items-center justify-center">
        <div className="absolute w-36 h-36 rounded-full border-4 border-primary/10" />
        <div
          className="absolute w-36 h-36 rounded-full border-4 border-transparent border-t-primary"
          style={{ animation: "spin 1.2s linear infinite" }}
        />

        {/* ── Inner ring reverse ── */}
        <div
          className="absolute w-24 h-24 rounded-full border-4 border-transparent border-t-accent"
          style={{ animation: "spin 1.8s linear infinite reverse" }}
        />

        {/* ── Center logo ── */}
        <div
          className="relative z-10 w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30"
          style={{ animation: "logoPulse 2s ease-in-out infinite" }}
        >
          <MdToys size={34} className="text-white" />
        </div>

        {/* ── Orbiting dots ── */}
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="absolute w-3 h-3 rounded-full bg-accent"
            style={{
              animation: `orbit 2.4s linear infinite`,
              animationDelay: `${i * 0.6}s`,
              top: "50%",
              left: "50%",
            }}
          />
        ))}
      </div>

      {/* ── Brand ── */}
      <div className="mt-10 flex items-center gap-1">
        <span className="text-3xl font-black text-primary tracking-wide">
          Kidz
        </span>
        <span className="text-3xl font-black text-accent tracking-wide">
          Joy
        </span>
      </div>

      {/* ── Loading text ── */}
      <div className="mt-3 h-6 flex items-center">
        <p
          key={textIndex}
          className="text-sm font-semibold text-neutral/50"
          style={{ animation: "fadeInUp 0.4s ease-in-out" }}
        >
          {loadingTexts[textIndex]}
          <span className="inline-block w-5 text-left">{dots}</span>
        </p>
      </div>

      {/* ── Progress bar ── */}
      <div className="mt-6 w-48 h-1.5 bg-base-300 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
          style={{ animation: "progress 1.8s ease-in-out infinite" }}
        />
      </div>

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes orbit {
          0%   { transform: rotate(0deg)   translateX(68px) rotate(0deg);    opacity: 1;   }
          50%  { opacity: 0.3; }
          100% { transform: rotate(360deg) translateX(68px) rotate(-360deg); opacity: 1;   }
        }
        @keyframes progress {
          0%   { width: 0%;  margin-left: 0%;   }
          50%  { width: 70%; margin-left: 15%;  }
          100% { width: 0%;  margin-left: 100%; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0);   }
        }
        @keyframes logoPulse {
          0%, 100% { transform: scale(1);    }
          50%      { transform: scale(1.06); }
        }
      `}</style>
    </div>
  );
};

export default PreLoader;
