export function CarouselArrow({
  direction,
  disabled,
  onClick,
}: {
  direction: "left" | "right";
  disabled: boolean;
  onClick: () => void;
}) {
  const isLeft = direction === "left";
  return (
    <button
      type="button"
      aria-label={isLeft ? "Scroll left" : "Scroll right"}
      onClick={onClick}
      disabled={disabled}
      className="flex items-center justify-center rounded-full transition-colors disabled:pointer-events-none disabled:opacity-25"
      style={{
        width: 40,
        height: 40,
        border: "1px solid rgba(10,10,10,0.15)",
        background: "transparent",
        cursor: disabled ? "default" : "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(10,10,10,0.35)";
        const svg = e.currentTarget.querySelector("svg");
        if (svg) (svg as SVGElement).style.stroke = "#0a0a0a";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(10,10,10,0.15)";
        const svg = e.currentTarget.querySelector("svg");
        if (svg) (svg as SVGElement).style.stroke = "rgba(10,10,10,0.5)";
      }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(10,10,10,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: isLeft ? "rotate(0deg)" : "rotate(180deg)", transition: "stroke 0.15s" }}>
        <path d="M15 18l-6-6 6-6" />
      </svg>
    </button>
  );
}
