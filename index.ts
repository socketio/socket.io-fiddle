import { Server } from "socket.io";
import { createAdapter } from "@socket.io/redis-adapter";
import { RedisClient } from "redis";

const io = new Server(8080);
const pubClient = new RedisClient({ host: "localhost", port: 6379 });
const subClient = pubClient.duplicate();

io.adapter(createAdapter(pubClient, subClient));
