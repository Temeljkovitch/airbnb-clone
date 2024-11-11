const express = require("express");
const {
  createAccommodation,
  getAllUserAccommodations,
  getAccommodation,
  updateAccommodation,
  getAllAccommodations,
} = require("../controllers/booking");

const bookingRouter = express.Router();

bookingRouter.post("/accommodations", createAccommodation);
bookingRouter.get("/userAccommodations", getAllUserAccommodations);
bookingRouter.get("/accommodations", getAllAccommodations);
bookingRouter.get("/accommodations/:id", getAccommodation);
bookingRouter.put("/accommodations", updateAccommodation);

module.exports = bookingRouter;
