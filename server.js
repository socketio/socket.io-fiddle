import { default as express } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cluster from "cluster";
import { setupMaster, setupWorker } from "@socket.io/sticky";
import { createClient } from "redis";
import { createAdapter } from "@socket.io/redis-adapter";

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  const httpServer = createServer();

  setupMaster(httpServer, {
    loadBalancingMethod: "least-connection", // either "random", "round-robin" or "least-connection"
  });

  const port = process.env.PORT || 3000;

  httpServer.listen(port, () => {
    console.log(`server listening at http://localhost:${port}`);
  });

  for (let i = 0; i < 3; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  console.log(`Worker ${process.pid} started`);

  const app = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer, {});

  app.use(express.static("public"));

  const pubClient = createClient({ host: "localhost", port: 6379 });
  const subClient = pubClient.duplicate();

  await Promise.all([pubClient.connect(), subClient.connect()]);

  io.adapter(createAdapter(pubClient, subClient));
  setupWorker(io);

  io.on("connection", (socket) => {
    console.log(`connect ${socket.id}`);

    socket.on("disconnect", (reason) => {
      console.log(`disconnect ${socket.id} due to ${reason}`);
    });
  });
}
