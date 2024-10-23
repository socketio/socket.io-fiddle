import { io } from "socket.io-client";

const port = process.env.PORT || 3000;

const socket = io(`http://localhost:${port}`);

socket.on("connect", () => {
  console.log(`connect ${socket.id}`);

  setTimeout(() => {
    socket.emit("event", "hello");
    socket.disconnect();
  }, 500);
});

socket.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});

socket.on("disconnect", (reason) => {
  console.log(`disconnect due to ${reason}`);
});
