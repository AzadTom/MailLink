import axios from "axios";

const api = axios.create({
  baseURL: "https://emailclient-flax.vercel.app",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
