"use client";
import { useEffect, useRef } from "react";
export function Entrance({
  children,
  className = "",
  delay = 0,
  effect = "quiet",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  effect?: "quiet" | "rise" | "settle";
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (
      !el ||
      effect === "quiet" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!document.documentElement.dataset.keyboard) {
            const frames =
              effect === "settle"
                ? [
                    { opacity: 0.65, transform: "scale(.985)" },
                    { opacity: 1, transform: "scale(1)" },
                  ]
                : [
                    { opacity: 0.65, transform: "translateY(16px)" },
                    { opacity: 1, transform: "translateY(0)" },
                  ];
            el.animate(frames, {
              duration: effect === "settle" ? 700 : 400,
              delay,
              easing: "cubic-bezier(.23,1,.32,1)",
              fill: "backwards",
            });
          }
          observer.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, effect]);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
