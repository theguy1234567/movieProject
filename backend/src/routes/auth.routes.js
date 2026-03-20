import { Router } from "express";
import {
  registerUser,
  login,
  logout,
  verifyEmail,
  refreshAccessToken,
  forgotPassword,
  resetForgotPassword,
  getCurrUser,
  resendEmailVerification,
  changeCurrentPassword,
} from "../controller/auth.controller.js";
import { validate } from "../middleware/validator.middleware.js";
import {
  userRegValidator,
  userLoginValidator,
  userChangeCurrPasswordValidator,
  userForgotPasswordValidator,
  userResetForgotPasswordValidator,
} from "../validators/index.js";
import { verifyJWT } from "../middleware/auth.middleware.js";


//unsecure routes
const router = Router();
router.route("/register").post(userRegValidator(), validate, registerUser);
router.route("/login").post(userLoginValidator(), validate, login);
router.route("/verify-email/:verificationToken").get(verifyEmail);
router.route("/refresh-token").post(refreshAccessToken);

router
  .route("/forgot-password")
  .post(userForgotPasswordValidator(), validate, forgotPassword);
router
  .route("/reset-password/:resetToken")
  .post(userResetForgotPasswordValidator(), validate, resetForgotPassword);

//secure routes
router.route("/logout").post(verifyJWT, logout);
router.route("/current-user").post(verifyJWT, getCurrUser);


router
  .route("/change-password")
  .post(
    verifyJWT,
    userChangeCurrPasswordValidator(),
    validate,
    changeCurrentPassword,
  );
router
  .route("/resend-email-verification")
  .post(verifyJWT, resendEmailVerification);

export default router;
