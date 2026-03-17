import { type ReactNode } from "react";

interface LightboxProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export function Lightbox({ open, onClose, title, subtitle, children }: LightboxProps) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="relative max-w-4xl w-full flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-10 right-0 text-white/80 hover:text-white text-2xl"
          aria-label="Close"
        >
          ×
        </button>
        <div className="bg-[#1a0a0a] rounded-lg p-6 w-full">
          <p className="text-white text-lg font-medium">{title}</p>
          {subtitle && <p className="text-white/70 text-sm mt-1">{subtitle}</p>}
          <div className="mt-4 flex justify-center">{children}</div>
        </div>
      </div>
    </div>
  );
}
