import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

//cors config
app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

//basic config to support jason files , url encoded and static images from PUBLIC folder
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import healthcheckRouter from "./routes/healthcheck.routes.js";
import authrouter from "./routes/auth.routes.js";

app.use("/api/v1/healthcheck", healthcheckRouter);
app.use("/api/v1/auth", authrouter);

app.get("/", (req, res) => {
  res.send("hello World!");
});

export default app;
