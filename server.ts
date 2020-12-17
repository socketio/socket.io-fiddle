
import express = require('express');
import http = require('http');
import { Server, Socket } from 'socket.io';

const app = express();
const server = http.createServer(app);

const io = new Server(server);
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

io.on('connection', (socket: Socket) => {
  console.log(`connect ${socket.id}`);

  socket.emit('hello', 1, '2', {
    hello: 'you'
  });

  socket.on('disconnect', () => {
    console.log(`disconnect ${socket.id}`);
  });
});

server.listen(port, () => console.log(`server listening on port ${port}`));
