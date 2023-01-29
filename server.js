import { default as express } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { createAdapter } from "@socket.io/mongo-adapter";
import { MongoClient } from "mongodb";

const DB = "mydb";
const COLLECTION = "socket.io-adapter-events";

const mongoClient = new MongoClient("mongodb://mongo:27017/?replicaSet=rs0");

await mongoClient.connect();

try {
  await mongoClient.db(DB).createCollection(COLLECTION, {
    capped: true,
    size: 1e6
  });
} catch (e) {
  // collection already exists
}
const mongoCollection = mongoClient.db(DB).collection(COLLECTION);

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  adapter: createAdapter(mongoCollection)
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

setInterval(async () => {
  const sockets = await io.fetchSockets();
  console.log("fetchSockets()", sockets.length);
}, 5000);
