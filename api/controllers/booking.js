const Booking = require("../models/Booking");
const UnauthorizedError = require("../errors/unauthorized");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const NotFoundError = require("../errors/notFound");

const createBooking = async (request, response) => {
  const { _id, checkIn, checkOut, numberOfGuests, price } = request.body;
  const { token } = request.signedCookies;
  if (!token) {
    throw new UnauthorizedError("Authentication invalid!");
  }
  const payload = jwt.verify(token, process.env.JWT_SECRET);

  const booking = await Booking.create({
    user: payload.id,
    accommodation: _id,
    checkIn,
    checkOut,
    numberOfGuests,
    price,
  });

  response.status(StatusCodes.CREATED).json({ booking });
};

const getAllUserBookings = async (request, response) => {
  const { token } = request.signedCookies;
  if (!token) {
    throw new UnauthorizedError("Authentication invalid!");
  }
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  const bookings = await Booking.find({ user: payload.id }).populate(
    "accommodation"
  );
  response.status(StatusCodes.OK).json(bookings);
};

const getSingleBooking = async (request, response) => {
  const { id } = request.params;
  // const booking = await Booking.findById(id).populate("accommodation");
  const booking = await Booking.findById(id).populate({
    path: "accommodation",
    populate: {
      path: "owner",
      select: "name",
    },
  });
  if (!booking) {
    throw new NotFoundError(`No item found with id: ${id}`);
  }
  response.status(StatusCodes.OK).json(booking);
};

module.exports = { createBooking, getAllUserBookings, getSingleBooking };
