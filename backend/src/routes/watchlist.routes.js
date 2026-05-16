import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {
  addToWatchlist,
  getWatchlist,
  getWatchlistStatus,
  removeFromWatchlist,
} from "../controller/watchlist.controller.js";

const router = Router();

router.route("/").get(verifyJWT, getWatchlist).post(verifyJWT, addToWatchlist);
router.route("/:movieId").delete(verifyJWT, removeFromWatchlist);
router.route("/:movieId/status").get(verifyJWT, getWatchlistStatus);

export default router;
