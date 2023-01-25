import { default as express } from "express";
import { createServer } from "node:https";
import { readFileSync } from "node:fs";
import { Server } from "socket.io";

const app = express();
const httpsServer = createServer(
  {
    key: readFileSync("./key.pem"),
    cert: readFileSync("./cert.pem"),
  },
  app
);
// with client-certificate authentication
// const httpsServer = createServer(
//   {
//     key: readFileSync("./server-key.pem"),
//     cert: readFileSync("./server-cert.pem"),
//     ca: [
//       readFileSync("client-cert.pem")
//     ]
//   },
//   app
// );

const io = new Server(httpsServer, {});

const port = process.env.PORT || 3000;

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log(`connect ${socket.id}`);

  socket.on("disconnect", (reason) => {
    console.log(`disconnect ${socket.id} due to ${reason}`);
  });
});

httpsServer.listen(port, () =>
  console.log(`server listening at https://localhost:${port}`)
);
