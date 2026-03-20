import React from "react";
import { useNavigate } from "react-router-dom";

function Card({ movie }) {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
  const navigate = useNavigate();

  return (
    <div
      className="bg-blue-800 rounded-xl overflow-hidden  shadow-lg hover:scale-105 transition duration-300 cursor-pointer"
      onClick={() => navigate(`/dashboard/movies/${movie.id}`)}
    >
      <img
        src={
          movie.poster_path
            ? `${imageBaseUrl}${movie.poster_path}`
            : "https://via.placeholder.com/500x750?text=No+Image"
        }
        alt={movie.title}
        className="w-full h-[300px] object-cover"
      />

      <div className="p-3">
        <h2 className="text-white font-semibold text-lg ">{movie.title}</h2>
        <p className="text-gray-400 text-sm">⭐ {movie.vote_average}</p>
      </div>
    </div>
  );
}

export default Card;
