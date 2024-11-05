const express = require("express");
const {
  createAccommodation,
  getAllAccommodations,
} = require("../controllers/booking");

const bookingRouter = express.Router();


bookingRouter.post("/accommodations", createAccommodation);
bookingRouter.get("/accommodations", getAllAccommodations);

module.exports = bookingRouter;
