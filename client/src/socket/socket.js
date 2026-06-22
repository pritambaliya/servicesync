import { io } from "socket.io-client";

const socket = io(
  "https://servicesync-server.onrender.com",
  {
    withCredentials: true,
  }
);

export default socket;