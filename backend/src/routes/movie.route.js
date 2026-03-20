import { Router } from "express";
import { getMovies } from "../controller/getmovie.controller.js";
const router = Router();

router.get("/:id", getMovies);

export default router;
