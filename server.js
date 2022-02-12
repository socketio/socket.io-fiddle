const express = require('express')
const http = require('http')
const { Server } = require('socket.io')

const APP_HOST = process.env.APP_HOST || 'localhost'
const APP_PORT = process.env.APP_PORT || 3000

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["PUT", "GET", "POST", "DELETE", "OPTIONS"],
  }
})

io.on('connect', socket => {
  console.log('New connection ' + socket.id)
  setTimeout(() => socket.emit('message', 'well hello there A'), 500) // STATEMENT A
  socket.emit('message', 'well hello there B') // STATEMENT B
})

server.listen(APP_PORT, APP_HOST, () => {
  console.log(`Listening on ${APP_HOST}:${APP_PORT}`)
})
