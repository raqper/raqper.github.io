import { ArrowUpRight } from "lucide-react";
import { getRegisterAction } from "@/app/data/workshop-data";

const BASE =
  "group shrink-0 inline-flex items-center justify-center gap-2.5 rounded-full border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ede0a8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a001c]";

const VARIANTS = {
  primary:
    "bg-[#ede0a8] text-[#0c0024] border-[#ede0a8] hover:bg-transparent hover:text-[#ede0a8] hover:shadow-[0_0_30px_rgba(237,224,168,0.15)]",
  ghost: "bg-transparent text-[#ede0a8] border-[#ede0a8]/50 hover:border-[#ede0a8] hover:bg-[#ede0a8]/10",
};

const SIZES = {
  lg: "px-8 py-4 text-[16px]",
  sm: "px-4 py-2 text-[13px]",
};

/** The one Register button: its label and target come from workshop-data. */
export function RegisterButton({
  size = "lg",
  variant = "primary",
  className = "",
}: {
  size?: keyof typeof SIZES;
  variant?: keyof typeof VARIANTS;
  className?: string;
}) {
  const action = getRegisterAction();
  return (
    <a
      href={action.href}
      {...(action.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
    >
      <span className="tracking-[-0.02em]" style={{ fontFamily: "var(--font-sans)", fontWeight: 600 }}>
        {action.label}
      </span>
      <ArrowUpRight
        className={`${size === "lg" ? "w-5 h-5" : "w-4 h-4"} group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform`}
        aria-hidden
      />
    </a>
  );
}

export function RegisterNote({ className = "" }: { className?: string }) {
  return (
    <p
      className={`text-[#a89cc8] tracking-[-0.02em] ${className}`}
      style={{ fontFamily: "var(--font-sans)", fontSize: "13px", lineHeight: 1.5 }}
    >
      {getRegisterAction().note}
    </p>
  );
}
