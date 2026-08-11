"use client";

import { useEffect, useRef, useState } from "react";

function Counter({ value, suffix = "" }) {
  const [n, setN] = useState(0);
  const ref = useRef(null);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || done.current) return;
        done.current = true;

        const reduce = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;
        if (reduce || value <= 0) {
          setN(value);
          return;
        }

        const duration = 1100;
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setN(Math.round(value * eased));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="stat-value">
      {n}
      {suffix}
    </span>
  );
}

export default function Stats({ stats = [] }) {
  if (!stats.length) return null;

  return (
    <div className="stats">
      {stats.map((s) => (
        <div className="stat" key={s.label}>
          <Counter value={s.value} suffix={s.suffix} />
          <span className="stat-label">{s.label}</span>
        </div>
      ))}
    </div>
  );
}
