import React from "react";
import { useState, useEffect } from "react";
import { getAllMovies } from "../../services/getAll";
import Card from "./card";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await getAllMovies(page);
      setMovies(data.results);
    };

    fetchMovies();
  }, [page]);

  return (
    <div className="min-h-screen p-10 bg-black text-white">
      <h1 className="text-4xl mb-6">All Movies</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <Card key={movie.id} movie={movie} />
        ))}
      </div>

      <div className="flex justify-center gap-5 mt-10">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          className="bg-white text-black px-4 py-2 rounded"
        >
          Previous
        </button>

        <span>{page}</span>

        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="bg-white text-black px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Movies;
