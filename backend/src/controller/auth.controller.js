import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";
import {
  sendMail,
  verificationMail,
  forgotPasswordMail,
} from "../utils/mail.js";
import { cookie } from "express-validator";

const genACCandREFToken = async (userID) => {
  try {
    const user = await User.findById(userID);
    const accessToken = user.genACCESSTOKEN();
    const refreshToken = user.genREFRESHTOKEN();

    user.refreshtoken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "something went wrong while generating accesstoken"
    );
  }
};

//register
const registerUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  const existingEmail = User.findOne({ email });
  if (existingEmail) {
    throw new ApiError(409, "User with email already exists");
  }
  const existingUsername = User.findOne({ username });
  if (existingUsername) {
    throw new ApiError(409, "User with username already exists");
  }

  const user = await User.create({
    email,
    password,
    username,
    isEmailVerified: false,
  });

  const { unhashedtoken, hashedtoken, tokenexpiry } = user.genTEMPTOKEN();
  user.emailverificationtoken = hashedtoken;
  user.emailverificationexpiry = tokenexpiry;




  
  await user.save({ validateBeforeSave: false });

  await sendMail({
    email: user?.email,
    subject: "Plese verify you email",
    mailgenContent: verificationMail(
      user.username,
      `${req.protocol}://${req.get(
        "host"
      )}/api/v1/users/verify-email/${unhashedtoken}`
    ),
  });

  const createduser = await User.findById(user._id).select(
    "-password -refreshtoken -emailverificationtoken -emailverificationexpiry"
  );

  if (!createduser) {
    throw new ApiError(500, "something went wrong while registering the user");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user: createduser },
        "user registered and registration mail sent"
      )
    );
});

//login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    throw new ApiError(400, "Email is required");
  }
  if (!password) {
    throw new ApiError(400, "Password is required");
  }
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(400, "User does not exists");
  }
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(400, "Invalid Password");
  }

  const { accessToken, refreshToken } = await genACCandREFToken(user._id);
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshtoken -emailverificationtoken -emailverificationexpiry"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged in sucesfully"
      )
    );
});

const logout = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshtoken: "",
      },
    },
    {
      new: true,
    }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out!"));
});

export { registerUser, login, logout };
