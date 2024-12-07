import defaultImage from "../assets/default-accommodation.png";

const AccommodationPhoto = ({ images, title, classes }) => {

  return (
    <>
      {
        <img
          className={classes}
          src={
            images?.length > 0
              ? `${import.meta.env.VITE_BACKEND_URL}/${images[0]}`
              : defaultImage
          }
          alt={
            images?.length > 0
              ? `${title}'s photo`
              : "Default accommodation photo"
          }
        ></img>
      }
    </>
  );
};

export default AccommodationPhoto;
