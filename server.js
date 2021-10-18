const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:4000", "http://localhost:5000"]
  }
});
const port = process.env.PORT || 3000;

io.on("connection", socket => {
  console.log(`connect ${socket.id}`);

  socket.on("disconnect", (reason) => {
    console.log(`disconnect ${socket.id} due to ${reason}`);
  });
});

setInterval(() => {
  io.emit("ping", new Date);
}, 1000);

httpServer.listen(port, () => console.log(`server listening at http://localhost:${port}`));
