import { Link } from "react-router-dom";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="px-[10px] pb-[10px] text-white">
      <div className="w-full rounded-b-[26px] border border-white/[0.07] border-t-0 bg-[#191919]/60 px-7 py-5 backdrop-blur md:px-16">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-accent text-xs font-black text-black">
              M
            </span>
            <span className="text-sm font-black tracking-tight text-white">
              MovieVault
            </span>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap gap-5 text-xs font-bold text-white/40">
            <Link
              to="/dashboard/main"
              className="transition-colors duration-200 hover:text-white"
            >
              Home
            </Link>
            <Link
              to="/dashboard/movies"
              className="transition-colors duration-200 hover:text-white"
            >
              Movies
            </Link>
            <Link
              to="/dashboard/watchlist"
              className="transition-colors duration-200 hover:text-white"
            >
              My List
            </Link>
            <Link
              to="/dashboard/profile"
              className="transition-colors duration-200 hover:text-white"
            >
              Profile
            </Link>
          </nav>

          {/* Copyright */}
          <p className="text-xs font-semibold text-white/28">
            © {year} MovieVault. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
