import axios from "axios";

// Point this to your backend
const api = axios.create({
  baseURL: "http://localhost:5002/api", 
});

export default api;
