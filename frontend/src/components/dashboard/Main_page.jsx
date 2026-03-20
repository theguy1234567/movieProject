import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "./Carousel.jsx";
import Movies from "./Movies.jsx";
import { getPopularMovies } from "../../services/getpopular.js";
import Card from "./card.jsx";
import { getNewRelases } from "../../services/getnew.js";
function Main_page() {
  const [Popularmovies, setPopularMovies] = useState([]);
  const [Newmovies, setNewMovies] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      const data = await getPopularMovies(page);
      setPopularMovies(data.results.slice(1, 11));
    };
    const fetchNewMovies = async () => {
      const data = await getNewRelases(page);
      setNewMovies(data.results.slice(1, 11));
    };
    fetchNewMovies();
    fetchPopularMovies();
  }, [page]);

  return (
    <>
      <div className=" min-h-screen bg-gradient-to-b m-10 rounded-3xl shadow-2xl from-amber-200 to-yellow-300 p-10">
        <div className="carousel bg-amber-700 h-[550px] rounded-2xl">
          <Carousel movies={Popularmovies} />
        </div>
        <h1 className="text-6xl font-extralight mt-5">Popular Movies</h1>
        <div className="Movies bg-amber-700  grid grid-rows-1  grid-cols-10   gap-2  rounded-2xl p-10">
          {Popularmovies.map((movie) => (
            <Card key={movie.id} movie={movie} />
          ))}
        </div>
        <div className="flex justify-center gap-5 mt-6">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            className="bg-black text-white px-4 py-2 rounded"
          >
            Previous
          </button>

          <span className="text-xl font-bold">{page}</span>

          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="bg-black text-white px-4 py-2 rounded"
          >
            Next
          </button>
        </div>
        <h1 className="text-6xl font-extralight mt-5">New Realeases</h1>
        <div className="Movies bg-amber-700 h-[550px] grid grid-rows-1  grid-cols-10   gap-2   rounded-2xl p-10">
          {Newmovies.map((movie) => (
            <Card key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </>
  );
}
export default Main_page;
