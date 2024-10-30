import { Link, useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";

const Accommodations = () => {
  const { action } = useParams();
  console.log(action);
  return (
    <div>
      {action !== "new" && (
        <div className="text-center">
          <Link
            className="capitalize inline-flex items-center gap-1 bg-cyan-600 py-2 px-4 text-white rounded-full"
            to={"/account/accommodations/new"}
          >
            <FaPlus className="h-5 w-5" />
            Add new place
          </Link>
        </div>
      )}
      {action === "new" && (
        <div>
          <form>
            <h2 className="text-2xl mt-4">Title</h2>
            <p className="text-gray-500 text-sm">
              Think of something short and catchy!
            </p>
            <input className="!rounded-md" type="text" placeholder="Your title goes here" />
            <h2 className="text-2xl mt-4">Address</h2>
            <p className="text-gray-500 text-sm">
              Try to be as precise as possible!
            </p>
            <input className="!rounded-md" type="text" placeholder="Your address goes here" />
            <h2 className="text-2xl mt-4">Photos</h2>
            <p className="text-gray-500 text-sm">
              The more photos the better!
            </p>
            <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              <button className="border bg-transparent rounded-md p-8 text-2xl text-gray-600">
                +
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Accommodations;
