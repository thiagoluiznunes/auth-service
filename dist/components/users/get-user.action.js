"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _helper = require("../helper");

var _user = _interopRequireDefault(require("./user.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getUser =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var authorization, token;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            authorization = 'authorization';
            token = req.body.token || req.query.token || req.headers[authorization];
            _context.next = 4;
            return _jsonwebtoken["default"].verify(token, "authsecret123", function (err, decode) {
              if (err) return res.status(400).json(err);else if (decode) {
                var email = decode.email;

                _user["default"].findOne({
                  email: email
                }, function (err, user) {
                  if (err) return (0, _helper.sendErrorsFromDB)(res, err);else if (user) res.status(200).send(user);
                });
              } else {
                return res.status(400).send('Error');
              }
            });

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getUser(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = getUser;
exports["default"] = _default;