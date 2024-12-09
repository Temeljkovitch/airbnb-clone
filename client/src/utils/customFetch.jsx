import axios from "axios";

export const customFetch = axios.create({
  baseURL: "https://airbnb-clone-34rb.onrender.com/",
  withCredentials: true,
});
