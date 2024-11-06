const express = require("express");
const {
  createAccommodation,
  getAllAccommodations,
  getAccommodation,
  updateAccommodation,
} = require("../controllers/booking");

const bookingRouter = express.Router();

bookingRouter.post("/accommodations", createAccommodation);
bookingRouter.get("/accommodations", getAllAccommodations);
bookingRouter.get("/accommodations/:id", getAccommodation);
bookingRouter.put("/accommodations", updateAccommodation);

module.exports = bookingRouter;
