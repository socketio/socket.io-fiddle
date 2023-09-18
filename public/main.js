"use strict";

(function() {

  const socket = io();

  socket.on("connect", () => {
    console.log(`connect ${socket.id}`);
  });

  socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  });

  socket.on("disconnect", (reason) => {
    console.log(`disconnect due to ${reason}`);
  });

  function myListener() {
    console.log("got ping!");
    socket.removeListener("ping", myListener);
  }

  socket.on("ping", myListener);

})();
