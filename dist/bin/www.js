"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalizePort = normalizePort;
exports.onError = onError;
exports.server = void 0;

require("babel-polyfill");

var _app = _interopRequireDefault(require("../app"));

var _debug = _interopRequireDefault(require("debug"));

var _http = _interopRequireDefault(require("http"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _debug["default"])('mock-json-server:server');
var port = normalizePort(process.env.PORT || process.argv[2] || '3000');

_app["default"].set('port', port);

var server = _http["default"].createServer(_app["default"]);

exports.server = server;
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val) {
  if (process.env.NODE_ENV === 'test') {
    return 3001;
  }

  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port; // handle specific listen errors with friendly messages

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;

    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;

    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  (0, _debug["default"])('Listening on ' + bind);
}