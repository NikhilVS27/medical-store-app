import axios from "axios";

const API = axios.create({
  baseURL: "https://medical-store-app-40j3.onrender.com",
});

export default API;