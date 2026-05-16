import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";
import { User } from "../models/user.model.js";

export const getWatchlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user?._id).select("watchlist");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user.watchlist, "Watchlist fetched"));
});

export const addToWatchlist = asyncHandler(async (req, res) => {
  const { movieId, title, poster_path, vote_average, release_date, overview } =
    req.body;

  if (!movieId || !title) {
    throw new ApiError(400, "Movie id and title are required");
  }

  const user = await User.findById(req.user?._id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const parsedMovieId = Number(movieId);
  const alreadyExists = user.watchlist.some(
    (movie) => movie.movieId === parsedMovieId,
  );

  if (alreadyExists) {
    return res
      .status(200)
      .json(new ApiResponse(200, user.watchlist, "Movie already in watchlist"));
  }

  user.watchlist.push({
    movieId: parsedMovieId,
    title,
    poster_path,
    vote_average,
    release_date,
    overview,
  });

  await user.save({ validateBeforeSave: false });

  return res
    .status(201)
    .json(new ApiResponse(201, user.watchlist, "Movie added to watchlist"));
});

export const removeFromWatchlist = asyncHandler(async (req, res) => {
  const { movieId } = req.params;
  const user = await User.findById(req.user?._id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const parsedMovieId = Number(movieId);
  user.watchlist = user.watchlist.filter(
    (movie) => movie.movieId !== parsedMovieId,
  );

  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, user.watchlist, "Movie removed from watchlist"));
});

export const getWatchlistStatus = asyncHandler(async (req, res) => {
  const { movieId } = req.params;
  const user = await User.findById(req.user?._id).select("watchlist");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const parsedMovieId = Number(movieId);
  const inWatchlist = user.watchlist.some(
    (movie) => movie.movieId === parsedMovieId,
  );

  return res
    .status(200)
    .json(new ApiResponse(200, { inWatchlist }, "Watchlist status fetched"));
});
