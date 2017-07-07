const express = require("express");
const app = express();
const fs = require("fs");
const server = require("https").createServer(
  {
    key: fs.readFileSync("./key.pem"),
    cert: fs.readFileSync("./cert.pem"),
  },
  app
);
const io = require("socket.io")(server);
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"));

io.on("connection", (socket) => {
  console.log(`connect ${socket.id}`);

  socket.on("disconnect", (reason) => {
    console.log(`disconnect ${socket.id} due to ${reason}`);
  });
});

server.listen(port, () =>
  console.log(`server listening at https://localhost:${port}`)
);
