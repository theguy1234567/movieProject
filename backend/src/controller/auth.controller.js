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
import jwt from "jsonwebtoken";

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
      "something went wrong while generating accesstoken",
    );
  }
};

//register
const registerUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    throw new ApiError(409, "User with email already exists from controller");
  }
  const existingUsername = await User.findOne({ username });
  if (existingUsername) {
    throw new ApiError(
      409,
      "User with username already exists from controller",
    );
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
        "host",
      )}/api/v1/users/verify-email/${unhashedtoken}`,
    ),
  });

  const createduser = await User.findById(user._id).select(
    "-password -refreshtoken -emailverificationtoken -emailverificationexpiry",
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
        "user registered and registration mail sent",
      ),
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
    "-password -refreshtoken -emailverificationtoken -emailverificationexpiry",
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
        "User logged in sucesfully",
      ),
    );
});

//logout
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
    },
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
//get curr_user
const getCurrUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "user fetched successfully"));
});

const verifyEmail = asyncHandler(async (req, res) => {
  const { verificationToken } = req.params;
  if (!verificationToken) {
    throw new ApiError(400, "email verification token is missing");
  }
  let hashedToken = crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");

  const user = await User.findOne({
    emailverificationtoken: hashedToken,
    emailverificationexpiry: { $gt: Date.now() },
  });
  if (!user) {
    throw new ApiError(400, "token is invalid or expiried");
  }
  user.emailverificationtoken = undefined;
  user.emailverificationexpiry = undefined;
  user.isEmailVerified = true;
  await user.save({ validateBeforeSave: false });
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        isEmailVerified: true,
      },
      "Email is verified",
    ),
  );
});

const resendEmailVerification = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user?._id);
  if (!user) {
    throw new ApiError(404, "User does not exist");
  }
  if (user.isEmailVerified) {
    throw new ApiError(409, "Email already verified");
  }
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
        "host",
      )}/api/v1/users/verify-email/${unhashedtoken}`,
    ),
  });
  return res.status(200).json(new ApiResponse(200, {}, "Mail has been sent "));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incommingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;
  if (!incommingRefreshToken) {
    throw new ApiError(401, "Unauthorized access");
  }

  try {
    const decoedRefreshToken = jwt.verify(
      incommingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET,
    );
    const user = await User.findById(decoedRefreshToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh TOkenn");
    }
    if (incommingRefreshToken !== user?.refreshtoken) {
      throw new ApiError(401, "Refresh token is expired");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };
    const { accessToken, refreshToken: newRefreshToken } =
      await genACCandREFToken(user._id);
    user.refreshtoken = newRefreshToken;
    await user.save();

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access token refreshed",
        ),
      );
  } catch (error) {
    throw new ApiError(401, "Invalid RefreshToken");
  }
});

//this forgot password will only return  the mail , the password changing is handeled seperately
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User does not exit");
  }

  const { unhashedtoken, hashedtoken, tokenexpiry } = user.genTEMPTOKEN();
  user.forgotpasswordtoken = hashedtoken;
  user.forgotpasswordexpiry = tokenexpiry;

  await user.save({ validateBeforeSave: false });

  //sending the email
  await sendMail({
    email: user?.email,
    subject: "Password reset Req",
    mailgenContent: forgotPasswordMail(
      user.username,
      `${process.env.FORGOT_PASSWORD_REDIRECT_URL}/${unhashedtoken}`,
    ),
  });

  return (
    res.status(200),
    json(
      new ApiResponse(
        200,
        {},
        "Password reset mail has been sent on your mail ID",
      ),
    )
  );
});
const resetForgotPassword = asyncHandler(async (req, res) => {
  const { resetToken } = req.params;
  const { newPassword } = req.body;
  let hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const user = await User.findOne({
    forgotpasswordtoken: hashedToken,
    forgotpasswordexpiry: { $gt: Date.now() },
  });
  if (!user) {
    throw new ApiError(409, "TOken is invalid or expired");
  }
  user.forgotpasswordexpiry = undefined;
  user.forgotpasswordtoken = undefined;
  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password reset Successfully"));
});
const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user?._id);

  const isPassValid = await user.isPasswordCorrect(oldPassword);

  if (!isPassValid) {
    throw new ApiError(400, "Invalid old Password");
  }
  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});

export {
  registerUser,
  login,
  logout,
  getCurrUser,
  verifyEmail,
  resendEmailVerification,
  refreshAccessToken,
  forgotPassword,
  resetForgotPassword,
  changeCurrentPassword,
};
