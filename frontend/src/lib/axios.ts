// lib/axios.ts
import axios from "axios";

const api = axios.create({
  // <--------------- For local use: Change it to your server DNS later --------------->
  baseURL: "https://vishnu1183.auxois-ray.ts.net",
  // baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
