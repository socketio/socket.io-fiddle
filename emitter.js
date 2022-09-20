import { createClient } from "redis";
import { Emitter } from "@socket.io/redis-emitter";

const pubClient = createClient();

await pubClient.connect();

const io = new Emitter(pubClient);

setInterval(() => {
  io.emit("ping", new Date().toISOString());
}, 1000);
