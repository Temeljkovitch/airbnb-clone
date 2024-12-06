const jwt = require("jsonwebtoken");
const Accommodation = require("../models/Accommodation");
const Booking = require("../models/Booking");
const { StatusCodes } = require("http-status-codes");
const ForbiddenError = require("../errors/forbidden");
const NotFoundError = require("../errors/notFound");
const UnauthorizedError = require("../errors/unauthorized");

const createAccommodation = async (request, response) => {
  // Getting token from cookies
  const { token } = request.signedCookies;
  if (!token) {
    throw new UnauthorizedError("Authentication invalid!");
  }
  // Getting the payload from the token (id, name and email)
  const payload = jwt.verify(token, process.env.JWT_SECRET);

  if (payload.role !== "admin") {
    throw new UnauthorizedError("Only admins can create new accommodations!");
  }
  const {
    title,
    address,
    description,
    images,
    amenities,
    policies,
    checkIn,
    checkOut,
    maxGuests,
    price,
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
    maxGuests,
    price,
  });
  response.status(StatusCodes.CREATED).json({ accommodation });
};

const getAllUserAccommodations = async (request, response) => {
  // Getting token from cookies
  const { token } = request.signedCookies;
  if (!token) {
    throw new UnauthorizedError("Authentication invalid!");
  }
  // Getting the payload from the token (id, name and email)
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  // Finding all accommodations from this user
  const accommodation = await Accommodation.find({ owner: payload.id });
  response.status(StatusCodes.OK).json(accommodation);
};

const getAllAccommodations = async (request, response) => {
  // Finding all accommodations
  const accommodation = await Accommodation.find({});
  response.status(StatusCodes.OK).json(accommodation);
};

const getSingleAccommodation = async (request, response) => {
  const { id } = request.params;
  const accommodation = await Accommodation.findById(id);
  if (!accommodation) {
    throw new NotFoundError(`No item found with id: ${id}`);
  }
  response.status(StatusCodes.OK).json(accommodation);
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
    maxGuests,
    price,
  } = request.body;
  // Checking if accommodation exists
  const accommodation = await Accommodation.findOne({ _id: accommodationId });
  // If it doesn't, throw error
  if (!accommodation) {
    throw new NotFoundError(`No item found with id: ${accommodationId}`);
  }

  // Getting token from cookies
  const { token } = request.signedCookies;
  if (!token) {
    throw new UnauthorizedError("Authentication invalid!");
  }
  // Getting the payload from the token (id and email)
  const payload = jwt.verify(token, process.env.JWT_SECRET);

  // Checking permissions (user's id needs to be the same as the owner's id)
  if (payload.id !== accommodation.owner.toString()) {
    throw new ForbiddenError(
      "You don't have the required permissions to access this route!"
    );
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
  accommodation.maxGuests = maxGuests;
  accommodation.price = price;

  // Saving alterations
  await accommodation.save();

  response.status(StatusCodes.OK).json({ msg: "Accommodation updated!" });
};

const removeAccommodation = async (request, response) => {
  const { id: accommodationId } = request.params;
  const accommodation = await Accommodation.findByIdAndDelete({
    _id: accommodationId,
  });
  if (!accommodation) {
    throw new NotFoundError(`No item found with id: ${accommodationId}`);
  }
  await Booking.deleteMany({ accommodation: accommodationId });
  response.status(StatusCodes.OK).json({ msg: "Accommodation removed!" });
};

module.exports = {
  createAccommodation,
  getAllUserAccommodations,
  getAllAccommodations,
  getSingleAccommodation,
  updateAccommodation,
  removeAccommodation,
};
