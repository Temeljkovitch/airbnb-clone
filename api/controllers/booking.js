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
  // Getting token from cookies
  const { token } = request.signedCookies;
  // Getting the payload from the token (id and email)
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  // Finding all accommodations from this user
  const accommodation = await Accommodation.find({ owner: payload.id });
  response.json(accommodation);
};

const getAccommodation = async (request, response) => {
  const { id } = request.params;
  const accommodation = await Accommodation.findById(id);
  response.status(200).json(accommodation);
};

const updateAccommodation = async (request, response) => {
  // Getting updated fields from the body
  const {
    id: accommodationId,
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
  // Checking if accommodation exists
  const accommodation = await Accommodation.findOne({ _id: accommodationId });
  // If it doesn't, throw error
  if (!accommodation) {
    throw new Error(`No accomodation with id ${accommodationId}`);
  }

  // Getting token from cookies
  const { token } = request.signedCookies;
  // Getting the payload from the token (id and email)
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  console.log(payload.id);

  // Checking permissions (user's id needs to be the same as the owner's id)
  if (payload.id !== accommodation.owner.toString()) {
    throw new Error(`Not authorized to access this route!`);
  }

  // Updating each field
  accommodation.title = title;
  accommodation.address = address;
  accommodation.description = description;
  accommodation.images = images;
  accommodation.amenities = amenities;
  accommodation.policies = policies;
  accommodation.checkIn = checkIn;
  accommodation.checkOut = checkOut;
  accommodation.numberOfGuests = numberOfGuests;

  // Saving alterations
  await accommodation.save();

  response.status(200).json({ msg: "Accommodation updated!" });
};

module.exports = {
  createAccommodation,
  getAllAccommodations,
  getAccommodation,
  updateAccommodation,
};
