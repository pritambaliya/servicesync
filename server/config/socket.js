import { Server } from "socket.io";

let io;

export const initSocket = (server) => {

  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {

    console.log("User Connected");

    // JOIN CHAT ROOM
    socket.on("join_chat", (chatId) => {

      socket.join(chatId);

      console.log(
        `User joined chat: ${chatId}`
      );

    });

    // SEND MESSAGE
    socket.on("send_message", (data) => {

      socket.to(data.chatId).emit(
        "receive_message",
        data
      );

    });

    socket.on("disconnect", () => {

      console.log("User Disconnected");

    });

  });

  return io;
};

export const getIO = () => {

  if (!io) {
    throw new Error(
      "Socket.io not initialized"
    );
  }

  return io;
};