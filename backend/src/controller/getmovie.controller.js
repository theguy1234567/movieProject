import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";
import dotenv from "dotenv";
dotenv.config();

export const getMovies = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API}`,
  );

  const data = await response.json();

  return res
    .status(200)

    .json(new ApiResponse(200, data, `Movie id :${id}`));
});
