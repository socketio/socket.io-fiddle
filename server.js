
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"));

io.on("connection", socket => {
  console.log(`connect ${socket.id}`);

  socket.on("disconnect", (reason) => {
    console.log(`disconnect ${socket.id} due to ${reason}`);
  });

  // socket.on('message', (...args) => {
  //   console.log(args);  // [ 'foobar', [Function] ]
  // });

  socket.on('message', (msg, cb) => {
    console.log(msg);  // 'foobar'
    cb();
  });
});

server.listen(port, () => console.log(`server listening at http://localhost:${port}`));
