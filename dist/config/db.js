"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var initConnection =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var uri, connection;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if ("prod" === 'dev') {
              _mongoose["default"].connect("mongodb://localhost:27017/".concat("ci-auth-db"), {
                useNewUrlParser: true,
                auth: {
                  user: "ci-auth-user",
                  password: "ciauthuser1606"
                }
              });
            } else {
              uri = "mongodb://@ds239128.mlab.com:39128/".concat("ci-auth-db");

              _mongoose["default"].connect(uri, {
                useNewUrlParser: true,
                auth: {
                  user: "ci-auth-user",
                  password: "ciauthuser1606"
                },
                server: {
                  socketOptions: {
                    keepAlive: 1
                  }
                }
              });
            }

            connection = _mongoose["default"].connection;
            connection.on('connected', function () {
              console.log('Connected to db');
            });
            connection.on('disconnected', function () {
              console.log('Disconnected to db');
            });
            connection.on('error', function (error) {
              console.log('Db connection error ', error);
              process.exit(1);
            });

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function initConnection() {
    return _ref.apply(this, arguments);
  };
}();

var _default = {
  initConnection: initConnection
}; // db.createUser(
//   {
//     user: "",
//     pwd: "",
//     roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
//   }
// )

exports["default"] = _default;