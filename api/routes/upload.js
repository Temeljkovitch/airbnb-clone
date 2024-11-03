const express = require("express");
const {
  uploadImageFromUrl,
  uploadImageFromDevice,
} = require("../controllers/upload");
const imagesMiddleware = require("../middleware/image");
const uploadRouter = express.Router();

uploadRouter.post("/uploadFromUrl", uploadImageFromUrl);
uploadRouter.post("/uploadFromDevice", imagesMiddleware, uploadImageFromDevice);

module.exports = uploadRouter;
