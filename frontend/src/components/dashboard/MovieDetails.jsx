import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const fallbackMovie = location.state?.movie || null;
  const [movie, setMovie] = useState(fallbackMovie);
  const [inWatchlist, setInWatchlist] = useState(false);
  const [watchlistLoading, setWatchlistLoading] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/movies/${id}`);
        if (!res.ok) throw new Error("Movie fetch failed");
        const data = await res.json();
        setMovie(data.data || fallbackMovie);
      } catch (err) {
        console.log("Error fetching movie", err);
      }
    };
    fetchMovie();
  }, [id, fallbackMovie]);

  useEffect(() => {
    const checkWatchlistStatus = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/v1/watchlist/${id}/status`,
          { credentials: "include" },
        );
        const data = await res.json();
        setInWatchlist(Boolean(data.data?.inWatchlist));
      } catch (err) {
        console.log("Error checking watchlist status", err);
      }
    };
    checkWatchlistStatus();
  }, [id]);

  const handleWatchlist = async () => {
    if (!movie) return;
    setWatchlistLoading(true);
    try {
      const url = inWatchlist
        ? `http://localhost:3000/api/v1/watchlist/${movie.id}`
        : "http://localhost:3000/api/v1/watchlist";
      const options = inWatchlist
        ? { method: "DELETE", credentials: "include" }
        : {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              movieId: movie.id,
              title: movie.title,
              poster_path: movie.poster_path,
              vote_average: movie.vote_average,
              release_date: movie.release_date,
              overview: movie.overview,
            }),
          };
      const res = await fetch(url, options);
      if (res.ok) setInWatchlist((prev) => !prev);
    } catch (err) {
      console.log("Error updating watchlist", err);
    } finally {
      setWatchlistLoading(false);
    }
  };

  if (!movie) {
    return (
      <main className="min-h-screen px-[10px] pb-[10px] text-white">
        <div className="flex w-full min-h-[calc(100vh-7rem)] items-center justify-center rounded-b-[26px] bg-[#191919] text-white">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-accent" />
            <span className="text-sm font-semibold text-white/60">
              Loading movie details…
            </span>
          </div>
        </div>
      </main>
    );
  }

  const rating = Number(movie.vote_average || 0).toFixed(1);
  const year = movie.release_date?.slice(0, 4);

  return (
    <main className="min-h-screen px-[10px] pb-[10px] text-white">
      <section className="relative w-full min-h-[calc(100vh-7rem)] overflow-hidden rounded-b-[26px] bg-[#191919] text-white">
        {/* Backdrop */}
        <img
          src={
            movie.backdrop_path
              ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
              : `https://image.tmdb.org/t/p/original${movie.poster_path}`
          }
          alt={movie.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-y-0 left-0 w-3/4 bg-gradient-to-r from-black/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#191919]/90 to-transparent" />

        {/* Content */}
        <div className="relative z-10 grid min-h-[calc(100vh-7rem)] gap-10 px-7 py-10 md:grid-cols-[260px_1fr] md:items-center md:px-16">
          {/* Poster */}
          <div className="hidden md:block">
            <div className="relative w-full max-w-[260px] overflow-hidden rounded-2xl shadow-2xl shadow-black/70 ring-1 ring-white/10">
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "https://placehold.co/500x750/191919/555?text=No+Image"
                }
                alt={movie.title}
                className="w-full object-cover"
              />
            </div>
          </div>

          {/* Info */}
          <div className="max-w-3xl">
            {/* Back button */}
            <button
              onClick={() => navigate(-1)}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold text-white backdrop-blur transition-all duration-200 hover:border-white/35 hover:bg-white/18"
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
              Back
            </button>

            {/* Title */}
            <h1 className="text-4xl font-black leading-tight tracking-tight md:text-6xl">
              {movie.title}
            </h1>

            {/* Badges */}
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-1.5 text-sm font-black text-black shadow-md shadow-accent/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {rating} / 10
              </span>
              {year && (
                <span className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-bold text-white/80 backdrop-blur">
                  {year}
                </span>
              )}
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-bold text-white/80 backdrop-blur">
                Movie
              </span>
            </div>

            {/* Overview */}
            <p className="mt-6 max-w-2xl text-sm font-medium leading-7 text-white/72 md:text-base">
              {movie.overview}
            </p>

            {/* CTA */}
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={handleWatchlist}
                disabled={watchlistLoading}
                className={`inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-black shadow-lg transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-55 ${
                  inWatchlist
                    ? "border border-white/30 bg-white/10 text-white backdrop-blur hover:bg-white/18"
                    : "bg-white text-black shadow-white/10 hover:bg-white/90"
                }`}
              >
                {watchlistLoading ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Updating…
                  </>
                ) : inWatchlist ? (
                  <>
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    In My List
                  </>
                ) : (
                  <>
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
                    Add to My List
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
