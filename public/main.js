"use strict";

(function() {

  const socket = io({
    autoConnect: false
  });

  socket.on("connect", () => {
    statusSpan.innerText = "Connected";
    toggleBtn.innerText = "Disconnect";
    console.log(`connect ${socket.id}`);
  });

  socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  });

  socket.on("disconnect", (reason) => {
    statusSpan.innerText = "Disconnected";
    toggleBtn.innerText = "Connect";
    console.log(`disconnect due to ${reason}`);
  });

  const statusSpan = document.getElementById("connection-status");
  const toggleBtn = document.getElementById("connection-toggle");

  statusSpan.innerText = "Disconnected";
  toggleBtn.innerText = "Connect";

  toggleBtn.addEventListener("click", () => {
    if (socket.connected) {
      socket.disconnect();
    } else {
      socket.connect();
    }
  });

})();
