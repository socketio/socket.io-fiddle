import { io } from "socket.io-client";

const port = process.env.PORT || 3000;

const socket = io(`http://localhost:${port}`);

socket.on("connect", () => {
  console.log(`connect ${socket.id}`);
});

socket.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});

socket.on("disconnect", (reason) => {
  console.log(`disconnect due to ${reason}`);
});

socket.on("count", (count) => {
  console.log(`there are ${count} connected clients`);
});
