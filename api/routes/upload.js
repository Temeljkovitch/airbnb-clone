const express = require("express");
const { uploadImageFromUrl } = require("../controllers/upload");
const uploadRouter = express.Router();

uploadRouter.post("/uploadFromUrl", uploadImageFromUrl);

module.exports = uploadRouter;
