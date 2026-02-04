import axios from "axios";

const api = axios.create({
  baseURL: "https://mail-link-olzw.vercel.app",
  // baseURL:"http://localhost:3001",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
