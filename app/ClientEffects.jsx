"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ClientEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;

    const updateProgress = () => {
      const full = document.body.scrollHeight - window.innerHeight;
      const ratio = full > 0 ? (window.scrollY / full) * 100 : 0;
      root.style.setProperty("--progress", `${ratio}%`);
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateProgress);
    };
  }, []);

  useEffect(() => {
    const revealTargets = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealTargets.forEach((el) => observer.observe(el));

    // Route change直後にファーストビューを確実に表示
    requestAnimationFrame(() => {
      revealTargets.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.9) {
          el.classList.add("show");
          observer.unobserve(el);
        }
      });
    });

    return () => {
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
