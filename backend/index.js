// import dotenv from "dotenv";
// import express from "express";
// import cookieParser from "cookie-parser";
// import connectDB from "./config/database.js";
// import userRoute from "./routes/userRoute.js";
// import messageRoute from "./routes/messageRoute.js";
// import cors from "cors";

// import http from "http";
// import { Server } from "socket.io";

// dotenv.config();
// const app = express();

// // ✅ middlewares
// app.use(cookieParser());
// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true
// }));
// app.use(express.json());

// const PORT = process.env.PORT || 5000;

// // ✅ routes
// app.use("/api/v1/user", userRoute);
// app.use("/api/v1/message", messageRoute);

// // ✅ CREATE HTTP SERVER
// const server = http.createServer(app);

// // ✅ SOCKET SETUP
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5173",
//     credentials: true,
//   },
// });

// // ✅ store online users
// let onlineUsers = [];

// // ✅ SOCKET CONNECTION
// io.on("connection", (socket) => {
//   console.log("User connected:", socket.id);

//   const userId = socket.handshake.query.userId;

//   // ✅ add user to online list (avoid duplicates)
//   if (userId && !onlineUsers.some(u => u.userId === userId)) {
//     onlineUsers.push({ userId, socketId: socket.id });
//   }

//   // ✅ send online users to all clients
//   io.emit("getOnlineUsers", onlineUsers);

//   // ✅ REAL-TIME MESSAGE HANDLER
//   socket.on("sendMessage", ({ senderId, receiverId, message }) => {
//     const receiver = onlineUsers.find(
//       (user) => user.userId === receiverId
//     );

//     if (receiver) {
//       io.to(receiver.socketId).emit("receiveMessage", message);
//     }
//   });

//   // ✅ disconnect
//   socket.on("disconnect", () => {
//     console.log("User disconnected:", socket.id);

//     onlineUsers = onlineUsers.filter(
//       (user) => user.socketId !== socket.id
//     );

//     io.emit("getOnlineUsers", onlineUsers);
//   });
// });

// // ❗ IMPORTANT: use server.listen
// server.listen(PORT, () => {
//   connectDB();
//   console.log(`Server listen at port ${PORT}`);
// });
import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import connectDB from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

dotenv.config();
const app = express();

app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);

const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

let onlineUsers = [];

export const getReceiverSocketId = (receiverId) => {
  const user = onlineUsers.find(u => u.userId === receiverId);
  return user?.socketId;
}

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  const userId = socket.handshake.query.userId;

  if (userId && !onlineUsers.some(u => u.userId === userId)) {
    onlineUsers.push({ userId, socketId: socket.id });
  }

  // ✅ send only userIds
  io.emit("getOnlineUsers", onlineUsers.map(u => u.userId));

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    onlineUsers = onlineUsers.filter(u => u.socketId !== socket.id);
    // ✅ send only userIds
    io.emit("getOnlineUsers", onlineUsers.map(u => u.userId));
  });
});

server.listen(PORT, () => {
  connectDB();
  console.log(`Server listen at port ${PORT}`);
});