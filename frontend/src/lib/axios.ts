// lib/axios.ts
import axios from "axios";

const api = axios.create({
  // If your backend is on the same domain

  // TODO: Change it to your server DNS later
  baseURL: "https://vishnu1183.auxois-ray.ts.net",
  // baseURL: "localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
