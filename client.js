import { io } from "socket.io-client";
import { cpus } from "node:os";
import cluster from "node:cluster";

const WORKERS_COUNT = cpus().length;
const port = process.env.PORT || 3000;

if (cluster.isMaster) {
  for (let i = 0; i < WORKERS_COUNT; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  console.log(`Worker ${process.pid} started`);

  const socket = io(`http://localhost:${port}`);

  socket.on("connect", () => {
    console.log(`connect ${socket.id}`);
  });

  socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  });

  socket.on("disconnect", (reason) => {
    console.log(`disconnect due to ${reason}`);
  });
}



