const express = require("express");
const {
  createBooking,
  getAllBookings,
  getSingleBooking,
} = require("../controllers/booking");
const bookingRouter = express.Router();

bookingRouter.post("/", createBooking);
bookingRouter.get("/", getAllBookings);
bookingRouter.get("/:id", getSingleBooking);

module.exports = bookingRouter;
