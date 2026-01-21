import { body } from "express-validator";

const userRegValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),
    body("username")
      .trim()
      .notEmpty()
      .withMessage("Username is required")
      .isLowercase()
      .withMessage("Username should only have lowercase")
      .isLength({ min: 5 })
      .withMessage("Username must be atleast 5 chars long"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("password is required")
      .isLength({ min: 5 })
      .withMessage("password must be atleast 5 chars long"),
  ];
};

const userLoginValidator = () => {
  return [
    body("email")
      .isEmail()
      .withMessage("Email not valid")
      .notEmpty()
      .withMessage("Email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ];
};

export { userRegValidator, userLoginValidator };
