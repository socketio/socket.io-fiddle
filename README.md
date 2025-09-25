
# Socket.IO Fiddle

```
$ docker compose up -d
$ npm install
$ DEBUG=socket.io-adapter PORT=3000 node server.js
$ PORT=3001 node server.js
```

You can then open http://localhost:3000 and http://localhost:3001 in your browser to create client connections.

To stop the Redis server:

```
$ docker compose stop redis
```
