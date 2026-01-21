import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import crypto from "crypto";

const userSchema = new Schema(
  {
    avatar: {
      type: {
        url: String,
        localPath: String,
      },
      default: {
        url: ``,
        localPath: "",
      },
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    fullname: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    refreshtoken: {
      type: String,
    },
    forgotpasswordtoken: {
      type: String,
    },
    forgotpasswordexpiry: {
      type: Date,
    },
    emailverificationtoken: {
      type: String,
    },
    emailverificationexpiry: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

//hashing password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//verifying password
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.genACCESSTOKEN = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

userSchema.methods.genREFRESHTOKEN = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};

userSchema.methods.genTEMPTOKEN = function () {
  const unhashedtoken = crypto.randomBytes(20).toString("hex");
  const hashedtoken = crypto
    .createHash("sha256")
    .update(unhashedtoken)
    .digest("hex");
  const tokenexpiry = new Date(Date.now() + 20 * 60 * 1000); // convert to Date
  return { unhashedtoken, hashedtoken, tokenexpiry };
};

export const User = mongoose.model("User", userSchema);
