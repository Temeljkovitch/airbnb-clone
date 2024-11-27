const express = require("express");
const {
  createBooking,
  getSingleBooking,
  getAllUserBookings,
} = require("../controllers/booking");
const bookingRouter = express.Router();

bookingRouter.post("/", createBooking);
bookingRouter.get("/userBookings", getAllUserBookings);
bookingRouter.get("/:id", getSingleBooking);

module.exports = bookingRouter;
