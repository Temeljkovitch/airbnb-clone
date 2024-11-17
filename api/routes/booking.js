const express = require("express");
const {
  createAccommodation,
  getAllUserAccommodations,
  updateAccommodation,
  getAllAccommodations,
  getSingleAccommodation,
} = require("../controllers/booking");

const bookingRouter = express.Router();

bookingRouter.post("/accommodations", createAccommodation);
bookingRouter.get("/userAccommodations", getAllUserAccommodations);
bookingRouter.get("/accommodations", getAllAccommodations);
bookingRouter.get("/accommodations/:id", getSingleAccommodation);
bookingRouter.put("/accommodations", updateAccommodation);

module.exports = bookingRouter;
