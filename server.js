const { App } = require("uWebSockets.js");
const { Server } = require("socket.io");
const { serveDir } = require("uwebsocket-serve");
const { resolve } = require("path");

const port = process.env.PORT || 3000;

const app = new App();

const serveStatic = serveDir(resolve(__dirname, 'public'));

app.get('/*', serveStatic);

const io = new Server();

io.attachApp(app);

io.on("connection", (socket) => {
  console.log(`connect ${socket.id}`);

  socket.on("disconnect", (reason) => {
    console.log(`disconnect ${socket.id} due to ${reason}`);
  });
});

app.listen(port, (token) => {
  if (token) {
    console.log(`server listening at http://localhost:${port}`);
  } else {
    console.warn("port already in use");
  }
});
