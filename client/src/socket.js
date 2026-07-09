
import { io } from "socket.io-client";

export const socket = io(import.meta.env.VITE_BACKEND_URL || "http://localhost:3001", {
  autoConnect: false, 
});

export const connectSocket = (roomId, username) => {
  if (!socket.connected) {
    socket.connect(); 
    socket.emit("joinRoom", { roomId, username });
  }
};
