import { default as express } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { randomBytes } from "crypto";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {});

const port = process.env.PORT || 3000;

app.use(express.static("public"));

io.engine.generateId = () => randomBytes(8).toString("hex");

io.on("connection", (socket) => {
  console.log("Engine.IO id", socket.conn.id);
  console.log("Socket.IO id", socket.id);
  console.log(`connect ${socket.id}`);

  socket.on("disconnect", (reason) => {
    console.log(`disconnect ${socket.id} due to ${reason}`);
  });
});

httpServer.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`);
});
