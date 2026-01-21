import { User } from "../models/user.model.js";
import { ApiError } from "../utils/api-error.js";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/async-handler.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new ApiError(401, "Unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshtoken -emailverificationtoken -emailverificationexpiry"
    );
    if (!user) {
      throw new ApiError(401, "Invalid access token no user");
    }
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, "Invalid access token due to error");
  }
});
