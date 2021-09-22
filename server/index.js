const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
app.use(cors());
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (serverSocket) => {
  serverSocket.emit("welcome", { data: "Welcome to electron chat" });
  //? broadcast the event to the namspace
  console.log(serverSocket.id);
  io.of("/").emit("messageFromServer", {
    message: `${serverSocket.id} has joined`,
  });
  //? listen for messageFromClient event in the main namespace
  serverSocket.on("disconnect", () => {
    console.log(`${serverSocket.id} has disconnected`);
  });

});

httpServer.listen(4000, () => {
  console.log("Server running on 4000");
});
