const express = require("express");
const usersRouter = express.Router();

const {
  ctrlWrapper,
  authMiddleware,
  signupValidation,
  loginValidation,
} = require("../../middlewares");

const {
  getCurrentUser,
  signup,
  login,
  logout,
} = require("../../controllers/auth");

usersRouter.get("/current-user", authMiddleware, ctrlWrapper(getCurrentUser));
usersRouter.get("/logout", authMiddleware, ctrlWrapper(logout));

usersRouter.post("/signup", signupValidation, ctrlWrapper(signup));
usersRouter.post("/login", loginValidation, ctrlWrapper(login));

module.exports = usersRouter;
