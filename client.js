import { io } from "socket.io-client";
import { readFileSync } from "node:fs";

const port = process.env.PORT || 3000;
const socket = io(`https://localhost:${port}`, {
  rejectUnauthorized: true, // default value
  ca: readFileSync("./cert.pem"),
});

// with client-certificate authentication
// const socket = io(`https://localhost:${port}`, {
//   rejectUnauthorized: true, // default value
//   ca: readFileSync("./server-cert.pem"),
//   cert: readFileSync("./client-cert.pem"),
//   key: readFileSync("./client-key.pem"),
// });

socket.on("connect", () => {
  console.log(`connect ${socket.id}`);
});

socket.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});

socket.on("disconnect", (reason) => {
  console.log(`disconnect due to ${reason}`);
});
