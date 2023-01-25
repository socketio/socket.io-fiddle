import cluster from "node:cluster";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { cpus } from "node:os";
import { setupMaster, setupWorker } from "@socket.io/sticky";
import { createAdapter, setupPrimary } from "@socket.io/cluster-adapter";

const WORKERS_COUNT = cpus().length;
const port = process.env.PORT || 3000;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  const httpServer = createServer();

  // setup sticky sessions
  setupMaster(httpServer, {
    loadBalancingMethod: "least-connection",
  });

  // setup connections between the workers
  setupPrimary();

  // needed for packets containing buffers (you can ignore it if you only send plaintext objects)
  cluster.setupPrimary({
    serialization: "advanced",
  });

  httpServer.listen(port);

  for (let i = 0; i < WORKERS_COUNT; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  console.log(`Worker ${process.pid} started`);

  const httpServer = createServer();
  const io = new Server(httpServer);

  // use the cluster adapter
  io.adapter(createAdapter());

  // setup connection with the primary process
  setupWorker(io);

  io.on("connection", (socket) => {
    console.log(`connect ${socket.id}`);

    socket.on("disconnect", (reason) => {
      console.log(`disconnect ${socket.id} due to ${reason}`);
    });
  });
}
