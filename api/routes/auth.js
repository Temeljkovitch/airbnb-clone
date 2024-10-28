const express = require("express");
const { register, login, getCurrentUser } = require("../controllers/auth");
const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/profile", getCurrentUser);

module.exports = authRouter;
