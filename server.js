import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { Server } from "socket.io";
import { createClient } from "redis";
import { createAdapter } from "@socket.io/redis-streams-adapter";

const port = process.env.PORT || 3000;

const httpServer = createServer(async (req, res) => {
  if (req.url !== "/") {
    res.writeHead(404);
    res.end("Not found");
    return;
  }
  // reload the file every time
  const content = await readFile("index.html");

  res.writeHead(200, {
    "Content-Type": "text/html",
    "Content-Length": Buffer.byteLength(content),
  });
  res.end(content);
});

const redisClient = createClient({ url: "redis://localhost:6379" });
// const redisClient = createClient({ url: "redis://localhost:6389" }); // with Valkey

redisClient.on("error", (err) => {
  // ignore connection errors
})

await redisClient.connect();

const io = new Server(httpServer, {
  adapter: createAdapter(redisClient)
});

setInterval(async () => {
  try {
    const sockets = await io.fetchSockets();

    console.log(`# of connected sockets: cluster = ${sockets.length} local = ${io.of("/").sockets.size}`);
  } catch (e) {
    console.log("fetchSockets error");
  }
}, 5000)

io.on("connection", (socket) => {
  console.log(`connect ${socket.id}`);

  socket.on("disconnect", (reason) => {
    console.log(`disconnect ${socket.id} due to ${reason}`);
  });
});

httpServer.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`);
});
