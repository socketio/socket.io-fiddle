
const express = require('express');
const session = require('express-session');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

const sessionMiddleware = session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }});
app.use(sessionMiddleware);

app.get('/', function(req, res, next) {
  if (req.session.views) {
    req.session.views++
    res.setHeader('Content-Type', 'text/html')
    res.write(`
      <p>views from Express session: ${req.session.views}</p>
      <p>expires in: ${req.session.cookie.maxAge / 1000}</p>
      <p>socket.io connections (from Express session): ${req.session.connections}</p>
      <script src="/socket.io/socket.io.js"></script>
      <script src="/main.js"></script>
    `);
    res.end()
  } else {
    req.session.views = 1
    req.session.connections = 0
    res.end('welcome to the session demo. refresh!')
  }
});

io.on('connect', onConnect);
server.listen(port, () => console.log('server listening on port ' + port));

io.use((socket, next) => {
  sessionMiddleware(socket.request, socket.request.res, next);
});

function onConnect(socket){
  console.log('connect ' + socket.id);
  const session = socket.request.session;
  console.log(session)
  session.connections++;
  session.save();
  socket.emit('session', session);

  socket.on('disconnect', () => console.log('disconnect ' + socket.id));
}
