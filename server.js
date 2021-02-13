
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "null"
  }
});
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"));

io.on("connection", socket => {
  console.log(`connect ${socket.id}`);

  socket.on("ping", (cb) => {
    console.log("ping received");
    cb();
  });

  socket.on("disconnect", (reason) => {
    console.log(`disconnect ${socket.id} due to ${reason}`);
  });
});

server.listen(port, () => console.log(`server listening at http://localhost:${port}`));
