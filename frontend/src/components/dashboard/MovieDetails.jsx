import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/movies/${id}`);
        const data = await res.json();
        setMovie(data.data); // because of ApiResponse
      } catch (err) {
        console.log("Error fetching movie", err);
      }
    };

    fetchMovie();
  }, [id]);

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-amber-200 to-yellow-300">
        <h1 className="text-3xl font-bold">Loading Movie...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b m-10 rounded-3xl shadow-2xl from-amber-200 to-yellow-300 p-10">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 bg-black text-white px-4 py-2 rounded-xl"
      >
        ← Back
      </button>

      {/* Main Card */}
      <div className="bg-amber-700 rounded-2xl p-10 flex gap-10">
        {/* Poster */}
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-[350px] rounded-2xl shadow-2xl"
        />

        {/* Movie Info */}
        <div className="text-white">
          <h1 className="text-5xl font-extralight">{movie.title}</h1>

          <p className="mt-4 text-lg">⭐ {movie.vote_average} / 10</p>

          <p className="mt-2">📅 Release Date: {movie.release_date}</p>

          <p className="mt-6 text-lg leading-relaxed max-w-2xl">
            {movie.overview}
          </p>

          {/* Genres */}
          <div className="flex gap-3 mt-6 flex-wrap">
            {movie.genres?.map((genre) => (
              <span
                key={genre.id}
                className="bg-black px-3 py-1 rounded-full text-sm"
              >
                {genre.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
