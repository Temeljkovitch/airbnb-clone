import { Link, useParams } from "react-router-dom";
import AccommodationForm from "./AccommodationForm";
import { FaPlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { customFetch } from "../utils";
import AccountNavbar from "../components/AccountNavbar";

const Accommodations = () => {
  const [accommodations, setAccommodations] = useState([]);

  useEffect(() => {
    customFetch("api/v1/booking/accommodations").then(({ data }) => {
      setAccommodations([data]);
    });
  }, []);

  return (
    <div>
      <AccountNavbar />
      <div className="text-center">
        <Link
          className="capitalize inline-flex items-center gap-1 bg-cyan-600 py-2 px-4 text-white rounded-full hover:shadow-md duration-300"
          to={"/account/accommodations/new"}
        >
          <FaPlus className="h-5 w-5" />
          Add new place
        </Link>
        <div className="mt-4">
          {accommodations.length > 0 &&
            accommodations.map((accommodation) => {
              return (
                <Link
                  to={"/account/accommodations/" + accommodation._id}
                  key={accommodation._id}
                  className="flex cursor-pointer gap-4 bg-slate-100 p-4 rounded-2xl"
                >
                  <div className="w-32 h-32 bg-slate-300 grow shrink-0">
                    {accommodation.images.length > 0 && (
                      <img
                        src={
                          "http://localhost:4000/uploads/" +
                          accommodation.images[0]
                        }
                        alt={`${accommodation.title}'s photo`}
                      />
                    )}
                  </div>
                  <div className="grow shrink">
                    <h2 className="text-xl">{accommodation.title}</h2>
                    <p className="text-sm mt-2">{accommodation.description}</p>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Accommodations;
