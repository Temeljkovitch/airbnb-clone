const jwt = require("jsonwebtoken");
const Accommodation = require("../models/Accommodation");

const createAccommodation = async (request, response) => {
  const { token } = request.signedCookies;
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  const {
    title,
    address,
    description,
    images,
    amenities,
    policies,
    checkIn,
    checkOut,
    numberOfGuests,
  } = request.body;
  const accommodation = await Accommodation.create({
    owner: payload.id,
    title,
    address,
    description,
    images,
    amenities,
    policies,
    checkIn,
    checkOut,
    numberOfGuests,
  });
  response.status(201).json({ accommodation });
};

const getAllAccommodations = async (request, response) => {
  const { token } = request.signedCookies;
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  const accommodation = await Accommodation.findOne({ owner: payload.id });
  if (!accommodation) {
    throw new Error("No Accommodations found!");
  }
  response.json(accommodation);
};

module.exports = { createAccommodation, getAllAccommodations };
