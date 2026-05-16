import React, { useEffect, useState } from "react";
import { getAllMovies } from "../../services/getAll";
import Card from "./card";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      const data = await getAllMovies(page);
      setMovies(data.results || []);
      setLoading(false);
    };
    fetchMovies();
  }, [page]);

  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setPage((prev) => prev + 1);

  return (
    <main className="min-h-screen px-[10px] pb-[10px] text-white">
      <div className="w-full min-h-[calc(100vh-7rem)] rounded-b-[26px] bg-[#191919] px-7 py-10 text-white md:px-16">
        {/* Page header */}
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-accent/80">
              Browse
            </p>
            <h1 className="text-5xl font-black tracking-tight">Movies</h1>
            <p className="mt-3 max-w-lg text-sm font-medium leading-6 text-white/50">
              Explore the full catalog. Click any title to view details and add
              it to your list.
            </p>
          </div>

          {/* Pagination */}
          <div className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/5 px-4 py-3">
            <button
              onClick={handlePrev}
              disabled={page === 1}
              aria-label="Previous page"
              className="grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-white/8 text-white/70 transition-all duration-200 hover:border-white/25 hover:bg-white/15 hover:text-white disabled:pointer-events-none disabled:opacity-30"
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <div className="flex items-center gap-1.5 text-sm">
              <span className="text-white/45 font-semibold">Page</span>
              <span className="min-w-[28px] rounded-lg bg-white/10 px-2 py-0.5 text-center text-sm font-black text-white">
                {page}
              </span>
            </div>
            <button
              onClick={handleNext}
              aria-label="Next page"
              className="grid h-8 w-8 place-items-center rounded-full bg-white/90 text-black transition-all duration-200 hover:bg-white hover:scale-[1.05]"
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[2/3] animate-pulse rounded-xl bg-white/5"
              />
            ))}
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 animate-fade-in">
            {movies.map((movie) => (
              <Card key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default Movies;
