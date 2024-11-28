const express = require("express");
const {
  getAllUserAccommodations,
  updateAccommodation,
  getAllAccommodations,
  getSingleAccommodation,
  createAccommodation,
  removeAccommodation,
} = require("../controllers/accommodation");

const accommodationRouter = express.Router();

accommodationRouter
  .route("/")
  .get(getAllAccommodations)
  .post(createAccommodation)
  .put(updateAccommodation);

accommodationRouter.get("/userAccommodations", getAllUserAccommodations);

accommodationRouter
  .route("/:id")
  .get(getSingleAccommodation)
  .delete(removeAccommodation);

module.exports = accommodationRouter;
