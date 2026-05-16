const Api_key = import.meta.env.VITE_TMDB_API;
const Base_url = "https://api.themoviedb.org/3";

export const searchMovies = async (query) => {
  const res = await fetch(
    `${Base_url}/search/movie?api_key=${Api_key}&query=${encodeURIComponent(
      query,
    )}`,
  );
  return res.json();
};
