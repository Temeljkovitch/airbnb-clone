const express = require("express");
const { getCurrentUser, updateUserData } = require("../controllers/user");

const userRouter = express.Router();

userRouter.get("/", getCurrentUser);
userRouter.patch("/", updateUserData);

module.exports = userRouter;
