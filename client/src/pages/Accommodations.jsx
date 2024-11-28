import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { customFetch } from "../utils/customFetch";
import AccountNavbar from "../components/AccountNavbar";
import AccommodationPhoto from "../components/AccommodationPhoto";
import Loading from "../components/Loading";
import { FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const Accommodations = () => {
  const [accommodations, setAccommodations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserAccommodations = async () => {
      setIsLoading(true);
      try {
        const { data } = await customFetch(
          "api/v1/accommodation/userAccommodations"
        );
        setAccommodations(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserAccommodations();
  }, []);

  const removeAccommodation = async (accommodationId) => {
    try {
      await customFetch.delete(`api/v1/accommodation/${accommodationId}`);

      const newAccommodations = accommodations.filter(
        (accommodation) => accommodation._id !== accommodationId
      );
      setAccommodations(newAccommodations);
      toast.success("Accommodation removed successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section>
      <AccountNavbar />
      <div className="text-center">
        <Link
          className="capitalize inline-flex items-center gap-1 bg-cyan-600 py-2 px-4 text-white rounded-full hover:shadow-md duration-200"
          to={"/account/accommodations/new"}
        >
          <FaPlus className="h-5 w-5" />
          Add new place
        </Link>
      </div>
      <div className="mt-4 ">
        {accommodations.length > 0 &&
          accommodations.map((accommodation) => {
            return (
              <Link
                key={accommodation._id}
                to={`/account/accommodations/${accommodation._id}`}
                className="mt-4 flex cursor-pointer gap-4 bg-slate-100 p-4 rounded-2xl shadow-md hover:shadow-lg duration-200"
              >
                <div className="shrink-0">
                  <AccommodationPhoto
                    {...accommodation}
                    classes="w-40 h-40 object-cover rounded-xl"
                  />
                </div>
                <div>
                  <h2 className="text-xl">{accommodation.title}</h2>
                  <div className="grid grid-cols-8">
                    <p className="text-sm mt-2 col-span-7">
                      {accommodation.description}
                    </p>
                    <FaTrashAlt
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        removeAccommodation(accommodation._id);
                      }}
                      className="w-5 h-5 self-center justify-self-end hover:scale-110 duration-200"
                    />
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    </section>
  );
};

export default Accommodations;
