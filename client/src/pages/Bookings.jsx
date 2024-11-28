import { useEffect, useState } from "react";
import AccountNavbar from "../components/AccountNavbar";
import { customFetch } from "../utils/customFetch";
import { Link } from "react-router-dom";
import AccommodationPhoto from "../components/AccommodationPhoto";
import { getTotalDays } from "../utils/calculateTotalDays";
import Loading from "../components/Loading";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      setIsLoading(true);
      try {
        const { data } = await customFetch("api/v1/booking/userBookings");
        setBookings(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBookings();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (bookings.length === 0) {
    return (
      <section>
        <AccountNavbar />
        <div className="mt-8 grid text-center items-center justify-center gap-4">
          <h1 className="text-lg font-semibold">No trips booked.</h1>
          <h2>
            Time to take the suitcase out of the closet and start planning your
            next escape!
          </h2>
          <Link
            className="bg-cyan-600 mx-auto w-max py-2 px-5 mt-2 text-white rounded-2xl hover:bg-cyan-700 duration-200"
            to={"/"}
          >
            Start looking
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section>
      <AccountNavbar />
      <div className="grid gap-4">
        {bookings.length > 0 &&
          bookings.map((booking) => {
            return (
              <Link
                to={`/account/bookings/${booking._id}`}
                className=" flex gap-4 bg-slate-100 shadow-md rounded-2xl hover:shadow-lg duration-200"
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
                  <h4>{`${booking.numberOfGuests} guest(s)`}</h4>
                  <h4>
                    Total:{" "}
                    <span className="font-semibold">${booking.price}</span>
                  </h4>
                </div>
              </Link>
            );
          })}
      </div>
    </section>
  );
};

export default Bookings;
