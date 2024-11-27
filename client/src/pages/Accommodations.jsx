import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { customFetch } from "../utils/customFetch";
import AccountNavbar from "../components/AccountNavbar";
import AccommodationPhoto from "../components/AccommodationPhoto";
import Loading from "../components/Loading";

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
                  <p className="text-sm mt-2">{accommodation.description}</p>
                </div>
              </Link>
            );
          })}
      </div>
    </section>
  );
};

export default Accommodations;
