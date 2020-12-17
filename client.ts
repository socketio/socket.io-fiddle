
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000', {
  extraHeaders: {
    "authorization": "basic 1234"
  }
});

socket.on('connect', () => {
  console.log(`connect ${socket.id}`);
});

socket.on('disconnect', () => {
  console.log(`disconnect ${socket.id}`);
});

socket.on('hello', (a, b, c) => {
  console.log(a, b, c);
});
