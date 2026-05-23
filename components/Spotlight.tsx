"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  color?: string;
};

export function Spotlight({
  children,
  className = "",
  color = "rgba(0, 109, 119, 0.18)",
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let rafId = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = node.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        node.style.setProperty("--mx", `${x}px`);
        node.style.setProperty("--my", `${y}px`);
        node.style.setProperty("--opacity", "1");
      });
    };
    const onLeave = () => {
      node.style.setProperty("--opacity", "0");
    };

    node.addEventListener("pointermove", onMove);
    node.addEventListener("pointerleave", onLeave);
    return () => {
      node.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        // CSS vars consumed by the radial overlay below
        ["--mx" as never]: "50%",
        ["--my" as never]: "50%",
        ["--opacity" as never]: "0",
        ["--spotlight" as never]: color,
      }}
      className={`relative ${className}`}
    >
      {children}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 transition-opacity duration-300"
        style={{
          opacity: "var(--opacity)",
          background:
            "radial-gradient(420px circle at var(--mx) var(--my), var(--spotlight), transparent 60%)",
        }}
      />
    </div>
  );
}
