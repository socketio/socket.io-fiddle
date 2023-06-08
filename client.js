import { io } from "socket.io-client";

const port = process.env.PORT || 3000;

const socket = io(`http://localhost:${port}`, {
  reconnectionDelay: 10000, // defaults to 1000
  reconnectionDelayMax: 10000 // defaults to 5000
});

socket.on("connect", () => {
  console.log(`connect ${socket.id}`);
  console.log("recovered?", socket.recovered);

  setTimeout(() => {
    if (socket.io.engine) {
      // close the low-level connection and trigger a reconnection
      socket.io.engine.close();
    }
  }, 10000);
});

socket.on("foo", (val) => {
  console.log("received", val);
});

socket.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});

socket.on("disconnect", (reason) => {
  console.log(`disconnect due to ${reason}`);
});
