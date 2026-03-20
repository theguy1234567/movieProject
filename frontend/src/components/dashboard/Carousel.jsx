import React, { useEffect, useState } from "react";

function Carousel({ movies }) {
  const [current, setCurrent] = useState(0);
  const imageBaseUrl = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    if (!movies || movies.length === 0) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev === movies.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [movies]);

  if (!movies || movies.length === 0) return null;

  const movie = movies[current];

  return (
    <div className="relative w-full h-full rounded-3xl">
      {/* Background Image */}
      <img
        src={`${imageBaseUrl}${movie.backdrop_path}`}
        alt={movie.title}
        className="w-full h-full object-cover transition duration-700 rounded-3xl"
      />

      {/* Dark Overlay */}
      <div className="absolute  inset-0 bg-black/50 rounded-3xl"></div>

      {/* Movie Info */}
      <div className="absolute bottom-10 left-10 text-white max-w-xl">
        <h1 className="text-5xl font-bold mb-4">{movie.title}</h1>
        <p className="text-lg line-clamp-3">{movie.overview}</p>
      </div>

      {/* Buttons */}
      <button
        onClick={() =>
          setCurrent(current === 0 ? movies.length - 1 : current - 1)
        }
        className="absolute left-5 top-1/2 -translate-y-1/2 bg-black/60 text-white px-4 py-2 rounded-full"
      >
        <p>&larr;</p>
      </button>

      <button
        onClick={() =>
          setCurrent(current === movies.length - 1 ? 0 : current + 1)
        }
        className="absolute right-5 top-1/2 -translate-y-1/2 bg-black/60 text-white px-4 py-2 rounded-full"
      >
        <p>&rarr;</p>
      </button>
    </div>
  );
}

export default Carousel;
