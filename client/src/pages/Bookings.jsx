import { useEffect, useState } from "react";
import AccountNavbar from "../components/AccountNavbar";
import { customFetch } from "../utils/customFetch";
import { Link } from "react-router-dom";
import AccommodationPhoto from "../components/AccommodationPhoto";
import { getTotalDays } from "../utils/calculateTotalDays";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    customFetch("api/v1/booking").then(({ data }) => {
      setBookings(data);
    });
  }, []);

  return (
    <div>
      <AccountNavbar />
      <div className="grid lg:grid-cols-2 gap-4 sm:grid-cols-1">
        {bookings.length > 0 &&
          bookings.map((booking) => {
            return (
              <Link
                to={`/account/bookings/${booking._id}`}
                className=" flex gap-4 bg-slate-200 rounded-2xl hover:shadow-md duration-200"
                key={booking._id}
              >
                <AccommodationPhoto
                  {...booking.accommodation}
                  classes="w-40 h-40 object-cover rounded-xl"
                />
                <div className="p-2 flex flex-col gap-1">
                  <h2 className="text-lg font-semibold">
                    {booking.accommodation.title}
                  </h2>
                  <h3 className="text-slate-700">
                    {`${new Date(booking.checkIn).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })} to ${new Date(booking.checkOut).toLocaleDateString(
                      "en-US",
                      { day: "numeric", month: "long", year: "numeric" }
                    )}`}
                  </h3>
                  <h4>
                    {getTotalDays(booking.checkIn, booking.checkOut)} night(s)
                  </h4>
                  <h4>Total: ${booking.price}</h4>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default Bookings;
