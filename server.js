
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

io.on('connect', socket => {
  console.log(`connect ${socket.id}`);

  socket.ultraHighUniqueAttribute = "UNIQUE ATTRIBUTE for socket " + socket.id + " (very unique)";
  console.log(`connect [${socket.ultraHighUniqueAttribute}]`);

  socket.emit('hello', 1, '2', {
    hello: 'you'
  });

  socket.on('disconnect', () => {
    console.log(`disconnect ${socket.id}`);
    console.log(`disconnect [${socket.ultraHighUniqueAttribute}]`);
  });
});

server.listen(port, () => console.log(`server listening on port ${port}`));
