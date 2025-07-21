import axios from "axios";

const api = axios.create({
  baseURL: "https://real-estate-82b6.onrender.com",
});

export default api;
