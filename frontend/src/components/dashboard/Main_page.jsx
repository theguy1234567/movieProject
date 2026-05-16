import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Carousel from "./Carousel.jsx";
import { getPopularMovies } from "../../services/getpopular.js";
import Card from "./card.jsx";
import { getNewRelases } from "../../services/getnew.js";

const categories = [
  "Trending",
  "Action",
  "Romance",
  "Animation",
  "Horror",
  "Special",
  "Drama",
];

function Main_page() {
  const [Popularmovies, setPopularMovies] = useState([]);
  const [Newmovies, setNewMovies] = useState([]);
  const dailySeed = new Date().toDateString();
  const dailyIndex =
    Popularmovies.length > 0
      ? [...dailySeed].reduce(
          (total, letter) => total + letter.charCodeAt(0),
          0,
        ) % Popularmovies.length
      : 0;
  const dailyMovie = Popularmovies[dailyIndex];

  useEffect(() => {
    const fetchPopularMovies = async () => {
      const data = await getPopularMovies(1);
      setPopularMovies(data.results.slice(1, 13));
    };
    const fetchNewMovies = async () => {
      const data = await getNewRelases(1);
      setNewMovies(data.results.slice(1, 7));
    };
    fetchNewMovies();
    fetchPopularMovies();
  }, []);

  return (
    <main className="min-h-screen px-[10px] pb-[10px] text-white">
      <div className="w-full rounded-b-[34px] mt-10  bg-sky-300/20 rounded-md pt-10 px-7 pb-8 text-white backdrop-blur-xl md:px-8">
        <section className="grid grid-cols-3 grid-rows-5 gap-4 h-[800px]">
          <div className="col-span-3 row-span-5">
            <Carousel movies={Popularmovies} />
          </div>
        </section>

        <section className="mt-6  grid gap-4 sm:grid-cols-2 lg:grid-cols-7">
          {categories.map((category) => (
            <Link
              key={category}
              to="/dashboard/movies"
              className="rounded-b-2xl rounded-t-4xl py-4 text-6xl  text-center bg-sky-500 hover:bg-sky-200 transition-all ease-in m-1"
            >
              <h1 className="text-4xl font-serif hover:text-black">
                {category}
              </h1>
            </Link>
          ))}
        </section>

        <section className="mt-7">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-black tracking-tight">
              Trending in Animation
            </h2>
            <Link
              to="/dashboard/movies"
              className="rounded-full bg-[#07111d] px-5 py-2 text-xs font-bold text-white"
            >
              View all
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {(Newmovies.length > 0 ? Newmovies : Popularmovies.slice(0, 6)).map(
              (movie) => (
                <Card key={movie.id} movie={movie} />
              ),
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

export default Main_page;
