import { Link } from "react-router";

export function HobbiesFooter() {
  return (
    <footer className="py-12 px-6 md:px-10" style={{ background: "#f5f0e8" }}>
      <div className="max-w-[1400px] mx-auto flex flex-wrap items-center justify-between gap-4">
        <Link to="/career" className="text-[#0a0a0a]/70 hover:text-[#0a0a0a] text-sm">
          Career
        </Link>
        <span className="text-[#0a0a0a]/40 text-sm">© Raquel Pereira</span>
      </div>
    </footer>
  );
}
