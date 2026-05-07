import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true
  // only needed if using cookies
});

// Attach token automatically
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

// Optional: handle 401 globally
API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.status === 401) {
      console.log("Unauthorized - token missing/expired");
      // optional: logout user
      localStorage.removeItem("token");
    }
    return Promise.reject(err);
  }
);

export default API;