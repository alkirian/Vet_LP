import React from "react";
import { motion } from "motion/react";
import logoImg from "../assets/logo_ok.png";
import isologoImg from "../assets/isologo.png";

interface LogoProps {
  className?: string;
  color?: string; // e.g. '#0F2C59'
  showText?: boolean;
}

/**
 * Isologo component: The official high-resolution circular badge.
 */
export function Isologo({ className = "w-16 h-16" }: LogoProps) {
  return (
    <img
      src={isologoImg}
      alt="CVP Isologo"
      className={`${className} object-contain`}
    />
  );
}

/**
 * FullLogo component: Displays the entire logo including Isologo, veterinary cross, text titles, and divider line with paw icon.
 */
export function FullLogo({ className = "w-full max-w-xl" }: LogoProps) {
  return (
    <div className={`flex items-center justify-center p-5 bg-white/85 backdrop-blur-md rounded-3xl border border-brand-primary-light/50 shadow-xl shadow-slate-200/50 hover:shadow-slate-200/70 hover:scale-[1.01] transition-all duration-300 ${className}`}>
      <img
        src={logoImg}
        alt="Clínica Veterinaria Pedrense"
        className="w-full h-auto object-contain max-h-[6.875rem] sm:max-h-[8.125rem]"
      />
    </div>
  );
}

/**
 * PawIcon: Minimalist SVG representation of a dog/cat paw print.
 */
export function PawIcon({ className = "w-5 h-5", color = "currentColor" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 512 512" className={className} style={{ fill: color }} xmlns="http://www.w3.org/2000/svg">
      <path d="M256 224c-79.41 0-192 122.76-192 200.25 0 34.9 26.81 55.75 71.74 55.75 48.84 0 81.09-25.08 120.26-25.08 39.51 0 71.85 25.08 120.26 25.08 44.93 0 71.74-20.85 71.74-55.75C448 346.76 335.41 224 256 224zm-147.28-12.61c-10.4-34.65-42.44-57.09-71.56-50.13-29.12 6.96-44.29 40.69-33.89 75.34 10.4 34.65 42.44 57.09 71.56 50.13 29.12-6.96 44.29-40.69 33.89-75.34zm84.72-20.78c30.94-8.14 46.42-49.94 34.58-93.36s-46.52-72.01-77.46-63.87-46.42 49.94-34.58 93.36c11.84 43.42 46.53 72.02 77.46 63.87zm281.39-29.34c-29.12-6.96-61.15 15.48-71.56 50.13-10.4 34.65 4.77 68.38 33.89 75.34 29.12 6.96 61.15-15.48 71.56-50.13 10.4-34.65-4.77-68.38-33.89-75.34zm-156.27 29.34c30.94 8.14 65.62-20.45 77.46-63.87 11.84-43.42-3.64-85.21-34.58-93.36s-65.62 20.45-77.46 63.87c-11.84 43.42 3.64 85.22 34.58 93.36z" />
    </svg>
  );
}

/**
 * Decorative floating paw prints that drift and rotate gently in the background.
 */
export function FloatingPaws({ className = "text-brand-primary/5 dark:text-brand-primary/5" }: { className?: string }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Paw 1 */}
      <motion.div
        className={`absolute ${className}`}
        style={{ top: "12%", left: "8%" }}
        animate={{
          y: [0, -12, 0],
          rotate: [15, 25, 15],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <PawIcon className="w-12 h-12" />
      </motion.div>

      {/* Paw 2 */}
      <motion.div
        className={`absolute ${className}`}
        style={{ top: "35%", right: "12%" }}
        animate={{
          y: [0, 15, 0],
          rotate: [-10, -20, -10],
          scale: [0.9, 0.95, 0.9],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <PawIcon className="w-16 h-16" />
      </motion.div>

      {/* Paw 3 */}
      <motion.div
        className={`absolute ${className}`}
        style={{ bottom: "20%", left: "15%" }}
        animate={{
          y: [0, -10, 0],
          rotate: [5, -5, 5],
          scale: [1.1, 1.05, 1.1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      >
        <PawIcon className="w-14 h-14" />
      </motion.div>

      {/* Paw 4 */}
      <motion.div
        className={`absolute ${className}`}
        style={{ bottom: "45%", right: "25%" }}
        animate={{
          y: [0, 12, 0],
          rotate: [-15, -5, -15],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
      >
        <PawIcon className="w-10 h-10" />
      </motion.div>
    </div>
  );
}

/**
 * A beautiful, winding path of paws representing a pet's walk trail.
 */
export function WalkTrail({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute pointer-events-none overflow-hidden z-0 ${className}`}>
      <svg viewBox="0 0 800 200" className="w-full h-full opacity-10 text-brand-primary" fill="currentColor">
        {/* Curved dotted line for trail */}
        <path
          d="M 50 100 Q 200 40, 350 110 T 650 120"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="4 8"
          className="stroke-brand-primary/20"
        />
        {/* Paws placed along the curve direction */}
        <g transform="translate(100, 78) rotate(15) scale(0.7)">
          <path d="M12 14c-1.66 0-3 1.34-3 3 0 2 2 3.5 3 4.5 1-1 3-2.5 3-4.5 0-1.66-1.34-3-3-3zm-4.5-3c-.83 0-1.5-.67-1.5-1.5S6.67 8 7.5 8s1.5.67 1.5 1.5S8.33 11 7.5 11zm9 0c-.83 0-1.5-.67-1.5-1.5S15.67 8 16.5 8s1.5.67 1.5 1.5S18.33 11 17.5 11zm-7.3-5.2C10.2 5.8 11 5 12 5s1.8.8 1.8 1.8c0 1-.8 1.8-1.8 1.8s-1.8-.8-1.8-1.8z" />
        </g>
        <g transform="translate(220, 55) rotate(-10) scale(0.7)">
          <path d="M12 14c-1.66 0-3 1.34-3 3 0 2 2 3.5 3 4.5 1-1 3-2.5 3-4.5 0-1.66-1.34-3-3-3zm-4.5-3c-.83 0-1.5-.67-1.5-1.5S6.67 8 7.5 8s1.5.67 1.5 1.5S8.33 11 7.5 11zm9 0c-.83 0-1.5-.67-1.5-1.5S15.67 8 16.5 8s1.5.67 1.5 1.5S18.33 11 17.5 11zm-7.3-5.2C10.2 5.8 11 5 12 5s1.8.8 1.8 1.8c0 1-.8 1.8-1.8 1.8s-1.8-.8-1.8-1.8z" />
        </g>
        <g transform="translate(340, 95) rotate(20) scale(0.7)">
          <path d="M12 14c-1.66 0-3 1.34-3 3 0 2 2 3.5 3 4.5 1-1 3-2.5 3-4.5 0-1.66-1.34-3-3-3zm-4.5-3c-.83 0-1.5-.67-1.5-1.5S6.67 8 7.5 8s1.5.67 1.5 1.5S8.33 11 7.5 11zm9 0c-.83 0-1.5-.67-1.5-1.5S15.67 8 16.5 8s1.5.67 1.5 1.5S18.33 11 17.5 11zm-7.3-5.2C10.2 5.8 11 5 12 5s1.8.8 1.8 1.8c0 1-.8 1.8-1.8 1.8s-1.8-.8-1.8-1.8z" />
        </g>
        <g transform="translate(480, 115) rotate(5) scale(0.7)">
          <path d="M12 14c-1.66 0-3 1.34-3 3 0 2 2 3.5 3 4.5 1-1 3-2.5 3-4.5 0-1.66-1.34-3-3-3zm-4.5-3c-.83 0-1.5-.67-1.5-1.5S6.67 8 7.5 8s1.5.67 1.5 1.5S8.33 11 7.5 11zm9 0c-.83 0-1.5-.67-1.5-1.5S15.67 8 16.5 8s1.5.67 1.5 1.5S18.33 11 17.5 11zm-7.3-5.2C10.2 5.8 11 5 12 5s1.8.8 1.8 1.8c0 1-.8 1.8-1.8 1.8s-1.8-.8-1.8-1.8z" />
        </g>
        <g transform="translate(600, 115) rotate(-15) scale(0.7)">
          <path d="M12 14c-1.66 0-3 1.34-3 3 0 2 2 3.5 3 4.5 1-1 3-2.5 3-4.5 0-1.66-1.34-3-3-3zm-4.5-3c-.83 0-1.5-.67-1.5-1.5S6.67 8 7.5 8s1.5.67 1.5 1.5S8.33 11 7.5 11zm9 0c-.83 0-1.5-.67-1.5-1.5S15.67 8 16.5 8s1.5.67 1.5 1.5S18.33 11 17.5 11zm-7.3-5.2C10.2 5.8 11 5 12 5s1.8.8 1.8 1.8c0 1-.8 1.8-1.8 1.8s-1.8-.8-1.8-1.8z" />
        </g>
      </svg>
    </div>
  );
}
