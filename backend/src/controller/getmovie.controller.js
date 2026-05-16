import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";
import dotenv from "dotenv";
dotenv.config();

export const getMovies = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id || id === "undefined") {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Movie id is required"));
  }

  let response;

  try {
    response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API}`,
    );
  } catch (error) {
    return res
      .status(502)
      .json(new ApiResponse(502, null, "Unable to fetch movie details"));
  }

  const data = await response.json();

  if (!response.ok) {
    return res
      .status(response.status)
      .json(new ApiResponse(response.status, data, "Movie details not found"));
  }

  return res
    .status(200)

    .json(new ApiResponse(200, data, `Movie id :${id}`));
});
