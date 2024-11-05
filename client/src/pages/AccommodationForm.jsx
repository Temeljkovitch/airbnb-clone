import { useState } from "react";
import { TbUpload } from "react-icons/tb";
import Amenities from "../components/Amenities";
import { amenitiesList } from "../data";
import FormSection from "../components/FormSection";
import { customFetch } from "../utils";
import { Navigate, useParams } from "react-router-dom";
import AccountNavbar from "../components/AccountNavbar";

const AccommodationForm = () => {
  const { id } = useParams();
  console.log(id);
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
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await customFetch.post("/api/v1/booking/accommodations", {
        title,
        address,
        images,
        description,
        amenities,
        policies,
        checkIn,
        checkOut,
        numberOfGuests,
      });
      setRedirect(true);
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

  const uploadImageFromDevice = async (event) => {
    try {
      const files = event.target.files;
      const data = new FormData();

      // Appending each file to the FormData object
      for (let i = 0; i < files.length; i++) {
        data.append("images", files[i]);
      }
      // Sending the form data to the server
      const { data: fileNames } = await customFetch.post(
        "/api/v1/upload/uploadFromDevice",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setImages((previous) => {
        return [...previous, ...fileNames];
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleAmenitiesCheckbox = (event) => {
    const { name, checked } = event.target;
    setAmenities(
      (previous) =>
        checked
          ? [...previous, name] // Add amenity if checked
          : previous.filter((item) => item !== name) // Remove amenity if unchecked
    );
  };

  if (redirect) {
    return <Navigate to={"/account/accommodations"} />;
  }

  return (
    <div>
      <AccountNavbar />
      <form onSubmit={handleSubmit}>
        {/* ==== Title ==== */}
        <FormSection
          title="Title"
          subTitle="Think of something short and catchy!"
        >
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Your title goes here..."
          />
        </FormSection>
        {/* ==== Address ==== */}
        <FormSection
          title="Address"
          subTitle="Try to be as precise as possible."
        >
          <input
            type="text"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            placeholder="Your address goes here..."
          />
        </FormSection>
        {/* ==== Description ==== */}
        <FormSection
          title="Description"
          subTitle="Describe us how wonderful the place is!."
        >
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="py-8"
            placeholder="You description goes here..."
          />
        </FormSection>
        {/* ==== Description ==== */}
        <FormSection
          title="Amenities"
          subTitle="Select all the amenities your place has to offer."
        >
          <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {amenitiesList.map((amenity) => {
              return (
                <Amenities
                  handleAmenitiesCheckbox={handleAmenitiesCheckbox}
                  key={amenity.id}
                  amenity={amenity}
                />
              );
            })}
          </div>
        </FormSection>
        {/* ==== Policies ==== */}
        <FormSection title="Policies" subTitle="Tell us about your policies.">
          <textarea
            className="py-8"
            value={policies}
            onChange={(event) => setPolicies(event.target.value)}
            placeholder="You policies goes here..."
          />
        </FormSection>
        {/* ==== Images ==== */}
        <FormSection title="Photos" subTitle="The more photos the better!">
          {/* Upload from URL */}
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
          {/* List of images */}
          <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {images.length > 0 &&
              images.map((image, index) => {
                return (
                  <div className="h-32 flex" key={index}>
                    <img
                      className="w-full object-cover rounded-md"
                      src={"http://localhost:4000/uploads/" + image}
                    />
                  </div>
                );
              })}
            {/* Upload from device */}
            <label className="h-32 flex items-center justify-center gap-2 cursor-pointer border bg-transparent rounded-md p-8 text-2xl text-slate-600 hover:bg-cyan-600 duration-300 hover:text-white">
              <input
                type="file"
                multiple
                className="hidden"
                onChange={uploadImageFromDevice}
              />
              <TbUpload />
              Upload
            </label>
          </div>
        </FormSection>
        {/* ==== Check-in, Checkout and Number of Guests ==== */}
        <FormSection
          title="Check-in & Checkout"
          subTitle="What time can the guests arrive and leave?"
        >
          <div className="grid gap-2 sm:grid-cols-3">
            <div>
              <h3 className="mt-2 ml-0.5">Check-in time:</h3>

              <input
                type="time"
                value={checkIn}
                onChange={(event) => setCheckIn(event.target.value)}
                placeholder="After 3:00 PM"
              />
            </div>
            <div>
              <h3 className="mt-2 ml-0.5">Checkout time:</h3>
              <input
                type="time"
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
        </FormSection>

        <div className="my-4">
          <button className="primary !rounded-md">Save</button>
        </div>
      </form>
    </div>
  );
};

export default AccommodationForm;
