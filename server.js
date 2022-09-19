import { default as express } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { createAdapter } from "@socket.io/postgres-adapter";
import pg from "pg";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {});

const port = process.env.PORT || 3000;

app.use(express.static("public"));

const pool = new pg.Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "changeit",
  port: 5432,
});

pool.query(`
  CREATE TABLE IF NOT EXISTS socket_io_attachments (
      id          bigserial UNIQUE,
      created_at  timestamptz DEFAULT NOW(),
      payload     bytea
  );
`);

pool.on("error", (err) => {
  console.error("Postgres error", err);
});

io.adapter(createAdapter(pool));

io.on("connection", async (socket) => {
  console.log(`connect ${socket.id}`);

  socket.on("disconnect", (reason) => {
    console.log(`disconnect ${socket.id} due to ${reason}`);
  });

  try {
    const sockets = await io.fetchSockets();

    socket.emit("count", sockets.length);
  } catch (e) {
    console.log(e);
  }
});

httpServer.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`);
});
