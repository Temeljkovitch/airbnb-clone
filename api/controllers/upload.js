const path = require("path");
const imageDownloader = require("image-downloader");

const uploadImageFromUrl = async (request, response) => {
  const { link } = request.body;

  const imageName = "photo" + Date.now() + ".jpg";

  await imageDownloader.image({
    url: link,
    dest: path.join(__dirname, ".." + "/uploads/" + imageName),
  });

  response.json(imageName);
};

module.exports = { uploadImageFromUrl };
