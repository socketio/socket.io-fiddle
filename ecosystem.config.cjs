module.exports = {
  apps : [{
    script    : "worker.js",
    instances : "max",
    exec_mode : "cluster"
  }]
}
