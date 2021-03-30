
const express = require("express");
const app = express();
const server = require("http").createServer(app);

const { createClient } = require("redis");
const { createAdapter } = require("socket.io-redis");

const pubClient = createClient();
const subClient = createClient();
const adapter = createAdapter({ pubClient, subClient });

const io = require("socket.io")(server, { adapter });
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"));

io.on("connection", socket => {
  console.log(`connect ${socket.id}`);

  socket.on("disconnect", (reason) => {
    console.log(`disconnect ${socket.id} due to ${reason}`);
  });
});

server.listen(port, () => console.log(`server listening at http://localhost:${port}`));
