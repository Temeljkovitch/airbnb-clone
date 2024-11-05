const mongoose = require("mongoose");

const AccommodationSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: [true, "Please, provide a title!"],
  },
  address: {
    type: String,
    required: [true, "Please, provide a location!"],
  },
  description: {
    type: String,
    required: [true, "Please, provide a description!"],
  },
  images: {
    type: [String],
    required: true,
  },
  amenities: {
    type: [String],
    required: true,
  },
  policies: {
    type: String,
    required: true,
  },
  checkIn: {
    type: String,
    required: [true, "Please, provide a check-in date!"],
  },
  checkOut: {
    type: String,
    required: [true, "Please, provide a checkout date!"],
  },
  numberOfGuests: {
    type: Number,
    required: [true, "Please, provide the max number of guests!"],
  },
});

module.exports = mongoose.model("Accommodation", AccommodationSchema);
