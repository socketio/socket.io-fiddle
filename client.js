// for the following to work, you'll have to answer "localhost" at the Common Name question when running generate.sh
// > Common Name (e.g. server FQDN or YOUR name) []:localhost
const fs = require("fs");
const socket = require("socket.io-client")("https://localhost:3000", {
  rejectUnauthorized: true, // default value
  ca: fs.readFileSync("./cert.pem"),
});

socket.on("connect", () => {
  console.log(`connect ${socket.id}`);
});

socket.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});

socket.on("disconnect", (reason) => {
  console.log(`disconnect due to ${reason}`);
});
