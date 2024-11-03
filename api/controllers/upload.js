const path = require("path");
const imageDownloader = require("image-downloader");
const fs = require("fs");

const uploadImageFromUrl = async (request, response) => {
  const { link } = request.body;

  const imageName = "photo-" + Date.now() + ".jpg";

  await imageDownloader.image({
    url: link,
    dest: path.join(__dirname, ".." + "/uploads/" + imageName),
  });

  response.status(200).json(imageName);
};

const uploadImageFromDevice = (request, response) => {
  const fileNames = request.files.map((file) => file.filename);
  response.status(200).json(fileNames);
};

module.exports = { uploadImageFromUrl, uploadImageFromDevice };
