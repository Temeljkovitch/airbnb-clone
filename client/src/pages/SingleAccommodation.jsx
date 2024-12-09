import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { customFetch } from "../utils/customFetch";
import { IoGridSharp, IoClose } from "react-icons/io5";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import ReserveCard from "../components/ReserveCard";

const SingleAccommodation = () => {
  const { id } = useParams();
  const [singleAccommodation, setSingleAccommodation] = useState("");
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const fetchAccommodation = async () => {
      try {
        const { data } = await customFetch(`api/v1/accommodation/${id}`);
        setSingleAccommodation(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAccommodation();
  }, [id]);

  if (showMore) {
    return (
      <section className="inset-0 absolute">
        <div className="bg-black p-8 grid gap-4">
          <button
            onClick={() => setShowMore(false)}
            className="fixed top-4 flex items-center text-white gap-0.5 px-4 py-1 rounded-xl bg-slate-700 hover:bg-slate-800 duration-200 "
          >
            <IoClose className="w-5 h-5" />
            Close
          </button>

          {singleAccommodation.images?.length > 0 &&
            singleAccommodation.images.map((image, index) => (
              <img
                key={index}
                src={`https://airbnb-clone-34rb.onrender.com/uploads/${image}`}
              />
            ))}
        </div>
      </section>
    );
  }

  return (
    <section className="mt-8">
      {/* Title */}
      <h1 className="text-3xl">{singleAccommodation.title}</h1>
      {/* Address */}
      <a
        className="inline-flex gap-1 mb-3 items-center my-2 underline"
        target="_blank"
        href={`https://maps.google.com/?q=${singleAccommodation.address}`}
      >
        <FaMapMarkerAlt className="w-5 h-5" />
        {singleAccommodation.address}
      </a>
      {/* Photos */}
      <div className="relative">
        <div className="grid grid-cols-4 gap-2 h-full rounded-xl overflow-hidden">
          {singleAccommodation.images?.length > 0 &&
            singleAccommodation.images
              .slice(0, 3)
              .map((image, index) => (
                <img
                  onClick={() => setShowMore(true)}
                  key={index}
                  src={`https://airbnb-clone-34rb.onrender.com/uploads/${image}`}
                  className={`w-full h-full object-cover cursor-pointer ${
                    index === 0 ? "col-span-3 row-span-2" : "col-span-1"
                  }`}
                />
              ))}
        </div>
        {singleAccommodation.images?.length > 0 && (
          <button
            onClick={() => setShowMore(true)}
            className="absolute bottom-2 right-2 flex items-center gap-1.5 text-sm bg-white bg-opacity-75 hover:bg-opacity-100 duration-200 px-3 py-1 rounded-2xl"
          >
            <IoGridSharp />
            Show all photos
          </button>
        )}
      </div>
      {/* ==== Details ==== */}
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-y-2 mt-4">
          {/* Description */}
          <div>
            <h1 className="text-xl mb-2 font-semibold">About this place</h1>
            <p className="text-slate-700">{singleAccommodation.description}</p>
          </div>
          {/* Things to know */}
          <div>
            <h1 className="text-xl mb-2 font-semibold">Things to know</h1>
            <div className="grid gap-y-2">
              <div>
                <h2 className="font-semibold">House rules</h2>
                <div className="text-slate-700">
                  Check-in after {singleAccommodation.checkIn}
                </div>
                <div className="text-slate-700">
                  Checkout before {singleAccommodation.checkOut}
                </div>
                <div className="text-slate-700">
                  {singleAccommodation.maxGuests} guest(s) maximum
                </div>
              </div>
              <div>
                <h2 className="font-semibold">Policies</h2>
                <p className="text-slate-700">{singleAccommodation.policies}</p>
              </div>
            </div>
          </div>
          {/* What this place offers */}
          <div>
            <h1 className="text-xl mb-2 font-semibold">
              What this place offers
            </h1>
            <ul>
              {singleAccommodation.amenities?.map((amenity, index) => {
                return (
                  <li key={index} className="flex items-center text-slate-700">
                    <MdOutlineKeyboardArrowRight />
                    {amenity}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        {/* Reserve Card */}
        <ReserveCard {...singleAccommodation} />
      </div>
    </section>
  );
};

export default SingleAccommodation;
