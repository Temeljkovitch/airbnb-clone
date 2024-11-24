const express = require("express");
const {
  createAccommodation,
  getAllUserAccommodations,
  updateAccommodation,
  getAllAccommodations,
  getSingleAccommodation,
} = require("../controllers/accommodation");

const accommodationRouter = express.Router();

accommodationRouter
  .route("/")
  .get(getAllAccommodations)
  .post(createAccommodation)
  .put(updateAccommodation);

accommodationRouter.get("/userAccommodations", getAllUserAccommodations);
accommodationRouter.get("/:id", getSingleAccommodation);

module.exports = accommodationRouter;
