import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { Server } from "socket.io";

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

const io = new Server(httpServer, {});

io.on("connection", (socket) => {
  console.log(`connect ${socket.id}`);

  const a = "hello";
  const b = "world";

  socket.join(`${a} ${b}`);
  io.to(`${a} ${b}`).emit("hello");

  socket.on("disconnect", (reason) => {
    console.log(`disconnect ${socket.id} due to ${reason}`);
  });
});

httpServer.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`);
});
