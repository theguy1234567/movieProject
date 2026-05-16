import React, { useEffect, useState } from "react";
import Card from "./card";
import { Link } from "react-router-dom";

export default function Watchlist() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/v1/watchlist", {
          credentials: "include",
        });
        const data = await res.json();
        setMovies(data.data || []);
      } catch (err) {
        console.log("Error fetching watchlist", err);
      } finally {
        setLoading(false);
      }
    };
    fetchWatchlist();
  }, []);

  return (
    <main className="min-h-screen px-[10px] pb-[10px] text-white">
      <div className="w-full min-h-[calc(100vh-7rem)] rounded-b-[26px] bg-[#191919] px-7 py-10 text-white md:px-16">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-accent/80">
              Saved
            </p>
            <h1 className="text-5xl font-black tracking-tight">My List</h1>
            <p className="mt-3 max-w-lg text-sm font-medium leading-6 text-white/50">
              Movies you've saved to watch later.
            </p>
          </div>
          {!loading && movies.length > 0 && (
            <div className="flex items-center gap-2 rounded-2xl border border-white/[0.07] bg-white/5 px-5 py-3">
              <span className="text-2xl font-black text-white">
                {movies.length}
              </span>
              <span className="text-sm font-semibold text-white/45">
                {movies.length === 1 ? "movie saved" : "movies saved"}
              </span>
            </div>
          )}
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[2/3] animate-pulse rounded-xl bg-white/5"
              />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && movies.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.03] py-20 text-center">
            <div className="mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-white/8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white/30"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-black text-white">Nothing saved yet</h2>
            <p className="mt-2 max-w-xs text-sm text-white/45">
              Open any movie and hit "Add to My List" to save it here.
            </p>
            <Link
              to="/dashboard/movies"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-2.5 text-sm font-black text-black shadow-md shadow-accent/20 transition-all duration-200 hover:scale-[1.03]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Browse Movies
            </Link>
          </div>
        )}

        {/* Movie grid */}
        {!loading && movies.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 animate-fade-in">
            {movies.map((movie) => (
              <Card
                key={movie.movieId}
                movie={{ ...movie, id: movie.movieId }}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
