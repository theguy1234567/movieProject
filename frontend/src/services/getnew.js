const Api_key = import.meta.env.VITE_TMDB_API;

export const getNewRelases = async (page) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${Api_key}&page=${page}`,
  );
  return res.json();
};
