import axios from "axios";

const API = axios.create({
  baseURL: "https://social-media-app-51w2.onrender.com/api",
});

export default API;