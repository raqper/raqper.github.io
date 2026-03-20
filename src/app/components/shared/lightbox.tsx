import { type ReactNode } from "react";
import { createPortal } from "react-dom";

interface LightboxProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export function Lightbox({ open, onClose, title, subtitle, children }: LightboxProps) {
  if (!open) return null;
  return createPortal(
    <div
      className="fixed inset-0 flex flex-col items-center justify-center p-4 sm:p-6"
      style={{ zIndex: 2147483647, backgroundColor: "rgba(10, 10, 10, 0.72)" }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="relative w-full h-full max-h-full flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 z-10 text-white/80 text-2xl leading-none"
          aria-label="Close"
        >
          ×
        </button>
        <div className="bg-black/45 backdrop-blur-sm rounded-lg p-4 sm:p-6 w-full h-full border border-white/15">
          <p className="text-white text-lg font-medium">{title}</p>
          {subtitle && <p className="text-white/70 text-sm mt-1">{subtitle}</p>}
          <div className="mt-4 h-[calc(100%-2.25rem)] w-full flex items-center justify-center">{children}</div>
        </div>
      </div>
    </div>,
    document.body
  );
}
