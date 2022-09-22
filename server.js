import { default as express } from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {});

const port = process.env.PORT || 3000;

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log(`connect ${socket.id}`);

  socket.on("join:room", (data) => {
    console.log(`Joined room: ${data.roomId}`);

    socket.join(data.roomId);
  });

  socket.on("text:insert", (data) => {
    console.log(`Text inserted: ${data.roomId}`);

    socket.to(data.roomId).emit("text:inserted", data);
  });

  socket.on("disconnect", (reason) => {
    console.log(`disconnect ${socket.id} due to ${reason}`);
  });
});

httpServer.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`);
});
