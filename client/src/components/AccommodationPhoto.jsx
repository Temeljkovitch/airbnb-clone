import defaultImage from "../assets/default-accommodation.png";

const AccommodationPhoto = ({ images, title, classes }) => {
  return (
    <>
      {
        <img
          className={classes}
          src={
            images?.length > 0
              ? `http://localhost:4000/uploads/${images[0]}`
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
