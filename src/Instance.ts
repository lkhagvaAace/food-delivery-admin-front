import axios from "axios";
export const instance = axios.create({
  baseURL: "https://food-delivery-back-1.onrender.com/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
