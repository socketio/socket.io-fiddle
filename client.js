
const socket = require("socket.io-client")("http://localhost:3000");

socket.on("connect", () => {
  console.log(`connect ${socket.id}`);
});

socket.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});

socket.on("disconnect", (reason) => {
  console.log(`disconnect due to ${reason}`);
});

socket.on("test", (data) => {
  console.log("got", data)
})
