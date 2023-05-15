"use strict";

(function() {

  const socket = io();

  for (let i = 1; i <= 20; i++) {
    const namespace = `/namespace${i}`;
    const s = io(namespace);

    s.on("connect", () => {
      console.log(`connected to ${namespace}`);
    });
  }

  socket.on("connect", () => {
    console.log(`connect ${socket.id}`);
  });

  socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  });

  socket.on("disconnect", (reason) => {
    console.log(`disconnect due to ${reason}`);
  });

})();
