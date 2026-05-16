import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { searchMovies } from "../../services/searchMovies";

const trendingMovies = [
  {
    title: "Dune: Part Two",
    image: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
    year: "2024",
    badge: "New",
  },
  {
    title: "Inside Out 2",
    image: "https://image.tmdb.org/t/p/w500/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg",
    year: "2024",
    badge: "New",
  },
  {
    title: "Bad Boys",
    image: "https://image.tmdb.org/t/p/w500/oGythE98MYleE6mZlGs5oBGkux1.jpg",
    year: "2024",
  },
  {
    title: "Planet of the Apes",
    image: "https://image.tmdb.org/t/p/w500/gKkl37BQuKTanygYQG1pyYgLVgf.jpg",
    year: "2024",
  },
  {
    title: "Deadpool",
    image: "https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
    year: "2024",
  },
  {
    title: "Civil War",
    image: "https://image.tmdb.org/t/p/w500/sh7Rg8Er3tFcN9BpKIPOMvALgZd.jpg",
    year: "2024",
  },
];

function Homepage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

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
    <main className="min-h-screen px-[10px] py-[10px] text-white">
      <section className="relative w-full min-h-[calc(100vh-3rem)] overflow-hidden rounded-[26px] bg-[#191919]">
        <img
          src="https://image.tmdb.org/t/p/original/6ELCZlTA5lGUops70hKdB83WJxH.jpg"
          alt="Movie backdrop"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-y-0 left-0 w-3/4 bg-gradient-to-r from-black/78 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/70 to-transparent" />

        <header className="relative z-10 flex items-center gap-4 px-6 py-5 md:px-12">
          <Link
            to="/"
            className="flex items-center gap-2.5 transition-opacity duration-200 hover:opacity-85"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full bg-accent text-sm font-black text-black shadow-lg shadow-accent/20">
              M
            </span>
            <span className="hidden text-[15px] font-black tracking-tight text-white md:block">
              MovieVault
            </span>
          </Link>

          <nav className="ml-4 hidden items-center gap-1 md:flex">
            {[
              { label: "Home", href: "/", active: true },
              { label: "My List", href: "/dashboard/watchlist" },
              { label: "Movies", href: "/dashboard/movies" },
            ].map(({ label, href, active }) => (
              <Link
                key={label}
                to={href}
                className={`rounded-full px-4 py-2 text-sm font-bold transition-all duration-200 ${
                  active
                    ? "text-white"
                    : "text-white/60 hover:bg-white/10 hover:text-white"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="relative ml-auto hidden md:block">
            <div className="flex w-72 items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2.5 text-sm text-white/50 backdrop-blur transition-colors duration-200 hover:border-white/25 hover:bg-white/15">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                />
              </svg>
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
                onFocus={() =>
                  suggestions.length > 0 && setShowSuggestions(true)
                }
                onBlur={() => setTimeout(() => setShowSuggestions(false), 120)}
                placeholder="Search movies..."
                className="w-full bg-transparent text-white outline-none placeholder:text-white/50"
              />
            </div>

            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute right-0 top-12 z-50 w-80 overflow-hidden rounded-2xl border border-white/10 bg-[#222]/95 p-2 backdrop-blur-xl">
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

          <Link
            to="/login"
            className="rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-sm font-bold text-white backdrop-blur transition-all duration-200 hover:border-white/40 hover:bg-white/18"
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="hidden rounded-full bg-white px-5 py-2.5 text-sm font-bold text-black transition-all duration-200 hover:scale-[1.03] hover:bg-white/90 sm:inline-flex"
          >
            Sign Up
          </Link>
        </header>

        <div className="relative z-10 flex min-h-[520px] items-center px-7 md:min-h-[620px] md:px-20">
          <div className="max-w-2xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-accent/90">
              Your Movie Destination
            </p>
            <h1 className="text-5xl font-black leading-tight tracking-tight md:text-7xl">
              Movies For
              <br />
              Every Mood
            </h1>
            <p className="mt-5 max-w-xl text-sm font-medium leading-7 text-white/72 md:text-base">
              Browse trending titles, discover new releases, and save your
              favorites to a personal watchlist - all in one place.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/dashboard/movies"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-black text-black shadow-lg shadow-accent/25 transition-all duration-200 hover:scale-[1.03] hover:shadow-accent/40 active:scale-[0.98]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
                Explore Movies
              </Link>
              <Link
                to="/register"
                className="rounded-full border border-white/30 bg-white/10 px-7 py-3 text-sm font-black text-white backdrop-blur transition-all duration-200 hover:border-white/50 hover:bg-white/18 active:scale-[0.98]"
              >
                Get Started Free
              </Link>
            </div>
          </div>
        </div>

        <section id="trending" className="relative z-10 px-7 pb-12 md:px-20">
          <div className="mb-5 flex items-center gap-3">
            <span className="block h-5 w-1 rounded-full bg-accent" />
            <h2 className="text-lg font-black tracking-tight">Trending Now</h2>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {trendingMovies.map((movie) => (
              <Link
                key={movie.title}
                to="/dashboard/movies"
                className="group w-40 shrink-0"
              >
                <div className="relative aspect-[2/3] overflow-hidden rounded-xl bg-black/30 ring-1 ring-white/10 transition-all duration-300 group-hover:ring-white/30">
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                  />
                  {movie.badge && (
                    <span className="absolute right-2 top-2 rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-black text-black">
                      {movie.badge}
                    </span>
                  )}
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
                <p className="mt-2.5 truncate text-[13px] font-bold transition-colors duration-200 group-hover:text-accent">
                  {movie.title}
                </p>
                <p className="mt-0.5 text-[11px] font-semibold text-white/40">
                  {movie.year}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

export default Homepage;
