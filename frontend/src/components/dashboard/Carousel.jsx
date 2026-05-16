import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Carousel({ movies, className = "" }) {
  const [current, setCurrent] = useState(0);
  const imageBaseUrl = "https://image.tmdb.org/t/p/original";
  const navigate = useNavigate();
  const movieCount = movies?.length || 0;

  const goNext = useCallback(
    () => setCurrent((prev) => (prev === movieCount - 1 ? 0 : prev + 1)),
    [movieCount],
  );

  useEffect(() => {
    if (movieCount === 0) return;
    const interval = setInterval(goNext, 4200);
    return () => clearInterval(interval);
  }, [movieCount, goNext]);

  if (!movies || movies.length === 0) {
    return (
      <div
        className={`w-full h-full animate-pulse rounded-[24px] bg-white/18 ${className}`}
      />
    );
  }

  const movie = movies[current];

  return (
    <section
      className={`relative w-full h-full overflow-hidden rounded-[24px] bg-[#7f98a6] ${className}`}
    >
      <img
        src={
          movie.backdrop_path
            ? `${imageBaseUrl}${movie.backdrop_path}`
            : "https://placehold.co/900x420/718892/ffffff?text=MovieVault"
        }
        alt={movie.title}
        className="absolute inset-0 w-full h-full object-cover opacity-80"
      />

      <div className="absolute inset-0 bg-white/12" />
      <div className="absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-black/50 to-transparent" />

      <div className="relative z-10 flex h-full flex-col justify-between p-8">
        <div>
          <h2 className="max-w-150px text-[100px] font-serif font-extrabold leading-tight text-white">
            {movie.title}
          </h2>
          <p className="mt-3 line-clamp-2 max-w-lg text-xl font-semibold leading-6 text-white/82">
            {movie.overview}
          </p>
        </div>

        <button
          onClick={() =>
            navigate(`/dashboard/movies/${movie.id}`, {
              state: { movie },
            })
          }
          className="flex w-fit items-center gap-2 rounded-full bg-[#07111d] px-4 py-2 text-xs font-bold text-white"
        >
          <span className="grid h-5 w-5 place-items-center rounded-full bg-white text-[10px] text-[#07111d]">
            ▶
          </span>
          Let Play Movie
        </button>
      </div>
    </section>
  );
}

export default Carousel;
