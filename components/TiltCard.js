"use client";
import { useRef } from "react";

// Subtle 3D tilt that follows the pointer (mouse only; ignored on touch and reduced motion)
export default function TiltCard({ as: Tag = "div", className = "", children, max = 7, ...rest }) {
  const ref = useRef(null);
  const move = (e) => {
    if (e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current, r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--ry", `${(x - 0.5) * max * 2}deg`);
    el.style.setProperty("--rx", `${(0.5 - y) * max * 2}deg`);
    el.style.setProperty("--gx", `${x * 100}%`);
    el.style.setProperty("--gy", `${y * 100}%`);
    el.classList.add("active");
  };
  const reset = () => {
    const el = ref.current;
    el.style.setProperty("--rx", "0deg"); el.style.setProperty("--ry", "0deg");
    el.classList.remove("active");
  };
  return <Tag ref={ref} className={`tilt ${className}`} onPointerMove={move} onPointerLeave={reset} {...rest}>{children}</Tag>;
}
