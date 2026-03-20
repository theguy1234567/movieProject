const Api_key = import.meta.env.VITE_TMDB_API;
const Base_url = "https://api.themoviedb.org/3";

export const getPopularMovies = async (page) => {
  const res = await fetch(
    `${Base_url}/movie/popular?api_key=${Api_key}&page=${page}`,
  );
  return res.json();
};
