import { default as express } from "express";
import { createServer } from "http";
import { Server } from "socket.io";

import { WebSocketServer, default as WebSocket } from "ws";

const proxy = new WebSocketServer({
  port: 3001
});

proxy.on("connection", async (ws, reqArg) => {
  console.log(`wss: got connection for wsc for https://${reqArg.headers.host}${reqArg.url}`);

  let wsc;
  try {
    wsc = new WebSocket(`ws://localhost:3000${reqArg.url}`);
  } catch (err) {
    console.log(err);
    ws.terminate();
    return;
  }

  ws.on("message", (message, isBinary) => {
    console.log("client to upstream", message);
    wsc.send(message, { binary: isBinary });
  });

  wsc.on("message", (message, isBinary) => {
    console.log("upstream to client", message);
    ws.send(message, { binary: isBinary });
  });

  ws.on("close", () => wsc.terminate());
  wsc.on("close", () => ws.terminate());
});

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  pingInterval: 2000
});

const port = process.env.PORT || 3000;

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log(`connect ${socket.id}`);

  socket.on("disconnect", (reason) => {
    console.log(`disconnect ${socket.id} due to ${reason}`);
  });
});

httpServer.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`);
});
