import { useNavigate } from "react-router";

export function HobbiesNav() {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-20 px-6 md:px-10 py-4 lg:absolute bg-white lg:bg-transparent">
      <div className="max-w-[1400px] mx-auto w-full flex items-center justify-between">
        {/* Career / Hobbies toggle — same pill style as Career page */}
        <div
          className="relative flex items-center rounded-full p-[3px]"
          style={{
            background: "rgba(10,10,10,0.08)",
            border: "1px solid rgba(10,10,10,0.12)",
          }}
        >
          <button
            type="button"
            className="relative z-10 rounded-full px-3.5 py-[4px] transition-colors"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              color: "rgba(10,10,10,0.5)",
            }}
            onClick={() => navigate("/career")}
          >
            Career
          </button>
          <button
            type="button"
            className="relative z-10 rounded-full px-3.5 py-[4px] transition-colors"
            style={{
              background: "#0a0a0a",
              fontFamily: "var(--font-sans)",
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              color: "#f5f0e8",
            }}
            onClick={() => navigate("/hobbies")}
          >
            Hobbies
          </button>
        </div>
      </div>
    </nav>
  );
}
