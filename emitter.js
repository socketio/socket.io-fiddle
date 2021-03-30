const { createClient } = require("redis");
const { Emitter } = require("@socket.io/redis-emitter");

const pubClient = createClient();

const io = new Emitter(pubClient);

setInterval(() => {
  io.emit("ping", new Date());
}, 1000);
