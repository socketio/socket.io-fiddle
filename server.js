const cluster = require("cluster");
const http = require("http");
const fs = require("fs");
const Server = require("socket.io");
const redisAdapter = require("socket.io-redis");
const numCPUs = require("os").cpus().length;
const { setupMaster, setupWorker } = require("@socket.io/sticky");

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  const httpServer = require("https").createServer({
    key: fs.readFileSync("./key.pem"),
    cert: fs.readFileSync("./cert.pem"),
  });
  // const httpServer = http.createServer();
  setupMaster(httpServer, {
    loadBalancingMethod: "least-connection", // either "random", "round-robin" or "least-connection"
  });
  httpServer.listen(3000);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  console.log(`Worker ${process.pid} started`);

  const express = require("express");
  const app = express();
  const httpServer = http.createServer(app);
  const io = new Server(httpServer);
  io.adapter(redisAdapter({ host: "localhost", port: 6379 }));
  setupWorker(io);

  app.use(express.static(__dirname + "/public"));

  io.on("connection", socket => {
    console.log(`connect ${socket.id}`);

    socket.on("disconnect", (reason) => {
      console.log(`disconnect ${socket.id} due to ${reason}`);
    });
  });
}
