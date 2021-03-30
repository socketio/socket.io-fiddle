
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"));

io.on("connection", socket => {
  console.log(`connect ${socket.id}`);

  socket.join(socket.handshake.query.token);
  socket.join(socket.handshake.query.token2);

  console.log(socket.rooms); // prints Set { '80kbwCCnnMQBHCuWAAAB', '123', "'456'" }

  socket.on("disconnect", (reason) => {
    console.log(`disconnect ${socket.id} due to ${reason}`);
  });
});

server.listen(port, () => console.log(`server listening at http://localhost:${port}`));

require("socket.io-client")("http://localhost:3000", {
  query: {
    token: "123",
    token2: "'456'"
  }
});
