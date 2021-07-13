
const express = require("express");
const app = express();
const server = require("http").createServer(app);

const { createClient } = require("redis");
const { createAdapter } = require("@socket.io/redis-adapter");

const pubClient = createClient();
const subClient = createClient();
const adapter = createAdapter(pubClient, subClient);

const io = require("socket.io")(server, { adapter });
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"));

io.of(/.*/).on("connection", (socket) => {
  const namespace = socket.nsp;
  console.log(`connect ${socket.id} to ${socket.nsp.name}`);

  namespace.emit("new user", socket.id);
});

server.listen(port, () => console.log(`server listening at http://localhost:${port}`));
