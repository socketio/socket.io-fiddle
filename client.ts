import { io, Socket } from "socket.io-client";

interface ServerToClientEvents {
  hello: () => void
}

const socket: Socket<ServerToClientEvents> = io("http://localhost:3000");

socket.on("connect", () => {
  console.log(`connect ${socket.id}`);
});

socket.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});

socket.on("disconnect", (reason) => {
  console.log(`disconnect due to ${reason}`);
});

socket.on("hello", () => {});

// OK
socket.hasListeners("hello");
// NOK TS2345: Argument of type '"unknown"' is not assignable to parameter of type 'ReservedOrUserEventNames '.
socket.hasListeners("unknown");
