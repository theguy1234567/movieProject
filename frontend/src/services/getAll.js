const Api_key = import.meta.env.VITE_TMDB_API;
const Base_url = "https://api.themoviedb.org/3";

export const getAllMovies = async (page = 1) => {
  const res = await fetch(
    `${Base_url}/discover/movie?api_key=${Api_key}&page=${page}`,
  );
  return res.json();
};
