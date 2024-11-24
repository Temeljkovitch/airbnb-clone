import React from "react";
import { useParams } from "react-router-dom";

const SingleBooking = () => {
  const { id } = useParams();
  return <div>{`${id}'s booking page`}</div>;
};

export default SingleBooking;
