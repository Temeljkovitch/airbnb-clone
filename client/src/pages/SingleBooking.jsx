import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { customFetch } from "../utils/customFetch";
import Loading from "../components/Loading";
import AccommodationPhoto from "../components/AccommodationPhoto";
import { getTotalDays } from "../utils/calculateTotalDays";
import { IoCalendarNumber } from "react-icons/io5";
import { FaMapMarkerAlt, FaMoon, FaUser, FaMoneyCheck } from "react-icons/fa";
import { FaUsers, FaHouse } from "react-icons/fa6";

const SingleBooking = () => {
  const { id } = useParams();
  const [singleBooking, setSingleBooking] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      setIsLoading(true);
      try {
        const { data } = await customFetch(`api/v1/booking/${id}`);
        setSingleBooking(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBooking();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <section className="my-8 mx-auto">
      <Link
        to={`/accommodation/${singleBooking.accommodation._id}`}
        className="bg-slate-100 shadow-md hover:shadow-lg duration-200 rounded-lg rounded-t-lg pb-4 grid gap-2 text-center"
      >
        <div>
          <AccommodationPhoto
            {...singleBooking.accommodation}
            classes="object-cover rounded-t-lg"
          />
        </div>
        <h1 className="text-lg font-semibold">Booking Information:</h1>
        <h2 className="flex items-center justify-center gap-2">
          <FaHouse /> {singleBooking.accommodation.title}
        </h2>
        <h2 className="flex items-center justify-center gap-2">
          <FaUser /> Hosted by {singleBooking.accommodation.owner.name}
        </h2>
        <h2 className="flex items-center justify-center gap-2">
          <FaMapMarkerAlt />
          {singleBooking.accommodation.address}
        </h2>
        <h3 className="flex items-center justify-center gap-2">
          <IoCalendarNumber />
          {`${new Date(singleBooking.checkIn).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })} - ${new Date(singleBooking.checkOut).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}`}
        </h3>
        <h3 className="flex items-center justify-center gap-2">
          <FaMoon />
          {getTotalDays(singleBooking.checkIn, singleBooking.checkOut)} night(s)
        </h3>
        <h3 className="flex items-center justify-center gap-2">
          <FaUsers /> {`${singleBooking.numberOfGuests} guest(s)`}
        </h3>
        <h3 className="flex items-center justify-center gap-2">
          <FaMoneyCheck /> {`$${singleBooking.price}`} total
        </h3>
      </Link>
    </section>
  );
};

export default SingleBooking;
