import defaultImage from "../assets/default-accommodation.png";

const AccommodationPhoto = ({ images, title, classes }) => {

  return (
    <>
      {
        <img
          className={classes}
          src={
            images?.length > 0
              ? `https://airbnb-clone-34rb.onrender.com/uploads/${images[0]}`
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
