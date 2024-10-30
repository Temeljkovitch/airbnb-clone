const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please, provide a title!"],
  },
  location: {
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
    type: Date,
    required: [true, "Please, provide a check-in date!"],
  },
  checkOut: {
    type: Date,
    required: [true, "Please, provide a checkout date!"],
  },
  numberOfGuests: {
    type: Number,
    required: [true, "Please, provide the max number of guests!"],
  },
});

module.exports = mongoose.model("Room", RoomSchema);
