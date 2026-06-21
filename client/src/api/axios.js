import axios from "axios";

const API = axios.create({
  baseURL: "https://servicesync-server.onrender.com",
  withCredentials: true
});

API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");

    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.status === 401) {
      console.log("Unauthorized - token missing/expired");
      localStorage.removeItem("token");
    }
    return Promise.reject(err);
  }
);

export default API;
