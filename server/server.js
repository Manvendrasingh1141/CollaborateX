const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const boardsRoutes = require("./routes/boards");


const authRoutes = require("./routes/auth");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/", authRoutes);
app.use("/api/boards", boardsRoutes);

// Create HTTP server
const server = http.createServer(app);

// Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Store rooms
const rooms = {};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Join room
  socket.on("joinRoom", ({ roomId, username }) => {
    socket.join(roomId);

    socket.username = username;
    socket.roomId = roomId;

    if (!rooms[roomId]) rooms[roomId] = [];
    rooms[roomId].push({ id: socket.id, username });

    // System message
    io.to(roomId).emit("message", {
      username: "System",
      text: `${username} joined the room`,
    });

    // Update user count
    io.to(roomId).emit("userCount", rooms[roomId].length);
  });

  // Send message
  socket.on("message", ({ roomId, text }) => {
    if (!socket.username) return;

    io.to(roomId).emit("message", {
      username: socket.username,
      text,
    });
  });

  // Typing indicator
  socket.on("typing", ({ roomId }) => {
    socket.to(roomId).emit("typing", socket.username);
  });

  socket.on("stopTyping", ({ roomId }) => {
    socket.to(roomId).emit("stopTyping");
  });

  // Whiteboard draw
  socket.on("draw", ({ roomId, drawData }) => {
    socket.to(roomId).emit("draw", drawData);
  });

  // Disconnect
  socket.on("disconnect", () => {
    const roomId = socket.roomId;

    if (roomId && rooms[roomId]) {
      rooms[roomId] = rooms[roomId].filter((u) => u.id !== socket.id);

      // System message
      io.to(roomId).emit("message", {
        username: "System",
        text: `${socket.username} left the room`,
      });

      // Update user count after disconnect
      io.to(roomId).emit("userCount", rooms[roomId].length);
    }

    console.log("User disconnected:", socket.id);
  });
});

// MongoDB + server start
mongoose
  .connect(
    "mongodb+srv://manvendrasinghshekhawat:%40CollaborateX_584@collaboratex.oqrjc1u.mongodb.net/CollaborateX"
  )
  .then(() => {
    console.log("MongoDB Connected");
    server.listen(3001, () => {
      console.log("Server running on port 3001");
    });
  })
  .catch(console.error);
