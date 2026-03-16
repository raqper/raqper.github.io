interface CarouselArrowProps {
  direction: "left" | "right";
  disabled?: boolean;
  onClick: () => void;
}

export function CarouselArrow({ direction, disabled, onClick }: CarouselArrowProps) {
  const isLeft = direction === "left";
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={isLeft ? "Previous" : "Next"}
      className="w-10 h-10 flex items-center justify-center rounded-full border border-[#0a0a0a]/20 text-[#0a0a0a] hover:bg-[#0a0a0a]/5 disabled:opacity-40 disabled:pointer-events-none"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        {isLeft ? (
          <path d="M15 18l-6-6 6-6" />
        ) : (
          <path d="M9 18l6-6-6-6" />
        )}
      </svg>
    </button>
  );
}
