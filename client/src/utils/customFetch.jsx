import axios from "axios";

// const url = "http://localhost:4000";
const url = "https://airbnb-clone-34rb.onrender.com";

export const customFetch = axios.create({
  baseURL: url,
  withCredentials: true,
});
