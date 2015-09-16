var app = require('./server');

function start() {
  var port = process.env.PORT || 8080;
  app.listen(port);
  console.log("server pid %s listening on port %s in %s mode", process.pid, port, process.env.NODE_ENV);
}

if (require.main === module) {
  start();
}
