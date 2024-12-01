import { useEffect, useState, useContext } from "react";
import { customFetch } from "../utils/customFetch";
import { Link } from "react-router-dom";
import AccommodationPhoto from "../components/AccommodationPhoto";
import Loading from "../components/Loading";
import { UserContext } from "../utils/UserContext";

const Home = () => {
  const [accommodations, setAccommodations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { searchQuery } = useContext(UserContext);

  useEffect(() => {
    const fetchAccommodations = async () => {
      setIsLoading(true);
      try {
        const { data } = await customFetch("api/v1/accommodation");
        setAccommodations(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAccommodations();
  }, []);

  const filteredAccommodations = accommodations.filter((accommodation) =>
    `${accommodation.title} ${accommodation.address}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="mt-8 grid gap-6 gap-y-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {filteredAccommodations.length > 0 &&
        filteredAccommodations.map((accommodation) => (
          <Link
            key={accommodation._id}
            to={`/accommodation/${accommodation._id}`}
          >
            <div className=" mb-2 rounded-xl flex">
              <AccommodationPhoto
                {...accommodation}
                classes="rounded-2xl object-cover aspect-square"
              />
            </div>
            <div className="grid gap-y-1">
              <h2 className="font-semibold">{accommodation.address}</h2>
              <h3 className="text-sm leading-4 text-slate-500">
                {accommodation.title}
              </h3>
              <div>
                <span className="font-semibold">${accommodation.price}</span>{" "}
                per night
              </div>
            </div>
          </Link>
        ))}
    </section>
  );
};

export default Home;
