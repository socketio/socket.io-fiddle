
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  pingTimeout: 5000,
  pingInterval: 5000,
  path: '/ws/'
});
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

io.of('/my-namespace').on('connection', socket => {
  console.log(`connect ${socket.id}`);

  socket.emit('hello', 1, '2', {
    hello: 'you'
  });

  socket.on('disconnect', () => {
    console.log(`disconnect ${socket.id}`);
  });
});

server.listen(port, () => console.log(`server listening on port ${port}`));
