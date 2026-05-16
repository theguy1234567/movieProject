import React from "react";
import { useNavigate } from "react-router-dom";

function Card({ movie }) {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
  const navigate = useNavigate();
  const movieId = movie.id || movie.movieId;
  const rating = Number(movie.vote_average || 0).toFixed(1);

  return (
    <article
      className="group w-full cursor-pointer"
      onClick={() => {
        if (!movieId) return;
        navigate(`/dashboard/movies/${movieId}`, {
          state: { movie: { ...movie, id: movieId } },
        });
      }}
    >
      {/* Poster */}
      <div className="relative aspect-[2/3] overflow-hidden rounded-xl bg-white/5 ring-1 ring-white/8 transition-all duration-300 group-hover:ring-white/20">
        <img
          src={
            movie.poster_path
              ? `${imageBaseUrl}${movie.poster_path}`
              : "https://placehold.co/500x750/191919/555?text=No+Image"
          }
          alt={movie.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 p-3">
          <div />
          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1 rounded-full bg-sky-500 px-2.5 py-1 text-[11px] font-black text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {rating}
            </span>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="mt-3 px-0.5">
        <h2 className="truncate text-[13px] font-bold leading-snug text-white transition-colors duration-200 group-hover:text-accent">
          {movie.title}
        </h2>
        <p className="mt-0.5 flex items-center gap-1 text-[11px] font-semibold text-white/45">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3 text-sky-500/70"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          {rating} / 10
        </p>
      </div>
    </article>
  );
}

export default Card;
