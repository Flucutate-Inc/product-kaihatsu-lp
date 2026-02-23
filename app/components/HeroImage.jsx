"use client";

import { useMemo, useState } from "react";

export default function HeroImage({ src, fallbackSrc, alt = "" }) {
  const initialSrc = useMemo(() => {
    return src || fallbackSrc || "";
  }, [src, fallbackSrc]);

  const [currentSrc, setCurrentSrc] = useState(initialSrc);

  if (!currentSrc) {
    return null;
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      loading="eager"
      onError={() => {
        if (fallbackSrc && currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        }
      }}
    />
  );
}
