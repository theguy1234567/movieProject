import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { searchMovies } from "../../services/searchMovies";

function Navbar() {
  const { user } = useContext(UserContext);
  const initial = user?.username?.charAt(0)?.toUpperCase() || "U";
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `rounded-full px-4 py-2 text-[12px] font-bold ${
      isActive ? "bg-white text-[#101721]" : "text-white/55"
    }`;

  useEffect(() => {
    const query = search.trim();

    if (query.length < 2) return;

    const timer = setTimeout(async () => {
      try {
        const data = await searchMovies(query);
        setSuggestions((data.results || []).slice(0, 5));
        setShowSuggestions(true);
      } catch (error) {
        console.log("Search failed", error);
        setSuggestions([]);
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [search]);

  const openMovie = (movie) => {
    setSearch("");
    setSuggestions([]);
    setShowSuggestions(false);
    navigate(`/dashboard/movies/${movie.id}`, {
      state: {
        movie,
      },
    });
  };

  return (
    <header className="px-[10px] pt-8">
      <div className="flex  justify-between bg-sky-500 p-10 rounded-2xl ">
        <Link to="/dashboard/main" className=" font-black tracking-tight">
          <h1 className="text-4xl rounded-b-3xl rounded-t-4xl font-bold font-mono bg-black  p-2">YAMW</h1>
        </Link>

        <div className="relative  hidden items-center rounded-full bg-[#08101c] p-1 md:flex">
          <nav className="flex items-center gap-1">
            <NavLink to="/dashboard/main" className={navLinkClass}>
              Movie
            </NavLink>
            <NavLink to="/dashboard/watchlist" className={navLinkClass}>
              My List
            </NavLink>
            <NavLink to="/dashboard/movies" className={navLinkClass}>
              Originals
            </NavLink>
          </nav>

          <div className="ml-1 flex w-44 items-center gap-2 rounded-full bg-white/8 px-3 py-2 text-xs text-white/45">
            <input
              value={search}
              onChange={(e) => {
                const value = e.target.value;
                setSearch(value);
                if (value.trim().length < 2) {
                  setSuggestions([]);
                  setShowSuggestions(false);
                }
              }}
              onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 120)}
              placeholder="Search"
              className="w-full bg-transparent text-white outline-none placeholder:text-white/45"
            />
            <span className="text-sm">⌕</span>
          </div>

          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute right-0 top-14 z-50 w-80 overflow-hidden rounded-2xl border border-white/10 bg-[#101721]/95 p-2 backdrop-blur-xl">
              {suggestions.map((movie) => (
                <button
                  key={movie.id}
                  type="button"
                  onMouseDown={() => openMovie(movie)}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left"
                >
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w92${movie.poster_path}`
                        : "https://placehold.co/92x138/111111/555?text=Movie"
                    }
                    alt={movie.title}
                    className="h-14 w-10 rounded-md object-cover"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-white">
                      {movie.title}
                    </p>
                    <p className="text-xs font-semibold text-white/45">
                      {movie.release_date?.slice(0, 4) || "Movie"}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/dashboard/profile"
            className="grid h-11 w-11 place-items-center rounded-full bg-white text-sm font-black text-[#101721]"
            aria-label="Open profile"
          >
            {initial}
          </Link>
          <div className="hidden leading-tight md:block">
            <p className="text-sm font-bold">{user?.username || "User"}</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
