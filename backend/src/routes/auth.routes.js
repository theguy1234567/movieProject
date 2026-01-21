import { Router } from "express";
import { registerUser, login, logout } from "../controller/auth.controller.js";
import { validate } from "../middleware/validator.middleware.js";
import { userRegValidator, userLoginValidator } from "../validators/index.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();
router.route("/register").post(userRegValidator(), validate, registerUser);
router.route("/login").post(userLoginValidator(), validate, login);
//secure routes
router.route("/logout").post(verifyJWT, logout);

export default router;
