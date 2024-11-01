import { Link, useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { TbUpload } from "react-icons/tb";
import { useState } from "react";
import Amenities from "../components/Amenities";
import { amenitiesList } from "../data";
import { customFetch } from "../utils";

const Accommodations = () => {
  const { action } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [images, setImages] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [amenities, setAmenities] = useState([]);
  const [policies, setPolicies] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
    } catch (error) {
      console.log(error);
    }
  };

  const addImageFromUrl = async (event) => {
    event.preventDefault();
    try {
      const { data } = await customFetch.post("/api/v1/upload/uploadFromUrl", {
        link: imageUrl,
      });
      setImages((previous) => {
        return [...previous, data];
      });
      setImageUrl("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {action !== "new" && (
        <div className="text-center">
          <Link
            className="capitalize inline-flex items-center gap-1 bg-cyan-600 py-2 px-4 text-white rounded-full hover:shadow-md duration-300"
            to={"/account/accommodations/new"}
          >
            <FaPlus className="h-5 w-5" />
            Add new place
          </Link>
        </div>
      )}
      {action === "new" && (
        <div>
          <form onSubmit={handleSubmit}>
            {/* Title */}
            <h2 className="text-2xl mt-4">Title</h2>
            <p className="text-slate-500 text-sm">
              Think of something short and catchy!
            </p>
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Your title goes here..."
            />
            {/* Address */}
            <h2 className="text-2xl mt-4">Address</h2>
            <p className="text-slate-500 text-sm">
              Try to be as precise as possible.
            </p>
            <input
              type="text"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              placeholder="Your address goes here..."
            />
            {/* Description */}
            <h2 className="text-2xl mt-4">Description</h2>
            <p className="text-slate-500 text-sm">
              Describe to us how wonderful the place is!
            </p>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className="py-8"
              placeholder="You description goes here..."
            />
            {/* Amenities */}
            <h2 className="text-2xl mt-4">Amenities</h2>
            <p className="text-slate-500 text-sm">
              Select all the amenities your place has to offer.
            </p>
            <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              {amenitiesList.map((amenity) => {
                return (
                  <Amenities
                    selected={amenities}
                    onChange={(event) => setAmenities(event.target.value)}
                    key={amenity.id}
                    amenity={amenity}
                  />
                );
              })}
            </div>
            {/* Policies */}
            <h2 className="text-2xl mt-4">Policies</h2>
            <p className="text-slate-500 text-sm">
              Tell us about your policies.
            </p>
            <textarea
              className="py-8"
              value={policies}
              onChange={(event) => setPolicies(event.target.value)}
              placeholder="You policies goes here..."
            />
            {/* Images */}
            <h2 className="text-2xl mt-4">Photos</h2>
            <p className="text-slate-500 text-sm">
              The more photos the better!
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={imageUrl}
                onChange={(event) => setImageUrl(event.target.value)}
                placeholder="Add images from URL (.JPG)"
              />
              <button
                onClick={addImageFromUrl}
                className="bg-slate-200 px-4 rounded-md w-auto hover:bg-cyan-600 duration-300 hover:text-white"
              >
                Add&nbsp;Image
              </button>
            </div>
            <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {images.length > 0 &&
                images.map((image, index) => {
                  return (
                    <div key={index} className="rounded-md">
                      <img src={"http://localhost:4000/uploads/" + image} alt="" />
                    </div>
                  );
                })}
              <button className="flex items-center justify-center gap-2 border bg-transparent rounded-md p-8 text-2xl text-slate-600 hover:bg-cyan-600 duration-300 hover:text-white">
                <TbUpload />
                Upload
              </button>
            </div>
            {/* Check-in, Checkout and Number of Guests */}
            <h2 className="text-2xl mt-4">Check-in & Checkout</h2>
            <p className="text-slate-500 text-sm">
              What time can the guests arrive and leave?
            </p>
            <div className="grid gap-2 sm:grid-cols-3">
              <div>
                <h3 className="mt-2 ml-0.5">Check-in time:</h3>
                <input
                  type="text"
                  value={checkIn}
                  onChange={(event) => setCheckIn(event.target.value)}
                  placeholder="After 3:00 PM"
                />
              </div>
              <div>
                <h3 className="mt-2 ml-0.5">Checkout time:</h3>
                <input
                  type="text"
                  value={checkOut}
                  onChange={(event) => setCheckOut(event.target.value)}
                  placeholder="Before 11:00 AM"
                />
              </div>
              <div>
                <h3 className="mt-2 ml-0.5">Max number of guests:</h3>
                <input
                  type="number"
                  min={1}
                  value={numberOfGuests}
                  onChange={(event) => setNumberOfGuests(event.target.value)}
                />
              </div>
            </div>

            <div className="my-4">
              <button className="primary">Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Accommodations;
