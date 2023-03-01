import { default as express } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { createAdapter } from "@socket.io/cluster-adapter";
import { setupWorker } from "@socket.io/sticky";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {});

io.adapter(createAdapter());

setupWorker(io);

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log(`connect ${socket.id}`);

  socket.on("disconnect", (reason) => {
    console.log(`disconnect ${socket.id} due to ${reason}`);
  });
});
