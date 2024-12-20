const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  accommodation: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Accommodation"
  },
  checkIn: {
    type: Date,
    required: true,
  },
  checkOut: {
    type: Date,
    required: true,
  },
  numberOfGuests: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Booking", BookingSchema);
