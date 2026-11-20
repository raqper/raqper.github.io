import { Link } from "react-router";
import { PRIVACY_PATH, TERMS_PATH } from "@/app/data/workshop-data";

const LINK =
  "text-[#a89cc8] underline-offset-2 transition-colors hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ede0a8] rounded";

export function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, rgb(5 0 14) 0%, rgb(5 0 14) 50%, #030008 100%)",
      }}
    >
      <div className="relative z-10 px-6 md:px-10 py-8">
        <div
          className="max-w-[1400px] mx-auto w-full flex flex-col gap-3 text-left md:flex-row md:items-center md:justify-between"
          style={{ fontFamily: "var(--font-sans)", fontSize: "14px", fontWeight: 400 }}
        >
          <p className="tracking-[-0.02em] text-white">© 2026 Raquel Pereira. All rights reserved.</p>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap gap-x-5 gap-y-2 tracking-[-0.02em]">
              <li>
                <Link to={TERMS_PATH} className={LINK}>
                  Workshop terms
                </Link>
              </li>
              <li>
                <Link to={PRIVACY_PATH} className={LINK}>
                  Privacy
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
