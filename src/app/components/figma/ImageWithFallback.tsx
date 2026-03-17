import { useState } from "react";

const FALLBACK = "https://placehold.co/400x300/1a0a2e/edeaf5?text=Image";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}

export function ImageWithFallback({ src, alt, className, style }: ImageWithFallbackProps) {
  const [errored, setErrored] = useState(false);
  return (
    <img
      src={errored ? FALLBACK : src}
      alt={alt}
      className={className}
      style={style}
      onError={() => setErrored(true)}
    />
  );
}
