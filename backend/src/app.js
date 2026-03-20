import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

//cors config
app.use(
  cors({
    origin: "http://localhost:5173", //rocess.env.CORS_ORIGIN?.split(",") ||//
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

//basic config to support jason files , url encoded and static images from PUBLIC folder
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import healthcheckRouter from "./routes/healthcheck.routes.js";
import authrouter from "./routes/auth.routes.js";

import movierouter from "./routes/movie.route.js";
app.use("/api/v1/healthcheck", healthcheckRouter);
app.use("/api/v1/auth", authrouter);
app.use("/api/movies", movierouter);

app.get("/", (req, res) => {
  res.send("hello World!");
});

export default app;
