"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _helper = _interopRequireDefault(require("../helper"));

var _user = _interopRequireDefault(require("./user.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var emailRegex = /\S+@\S+\.\S+/;
var passwordRegex = /.{6,12}/;

var patchUser =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var authorization, token, body;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            authorization = 'authorization';
            token = req.body.token || req.query.token || req.headers[authorization];
            body = Object.entries(req.body);
            _context2.next = 5;
            return _jsonwebtoken["default"].verify(token, "authsecret123", function (err, decode) {
              if (err) return res.status(400).json(err);else if (decode) {
                var email = decode.email;

                _user["default"].findOne({
                  email: email
                },
                /*#__PURE__*/
                function () {
                  var _ref2 = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee(err, user) {
                    var i, value, salt, passwordHash;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            if (!err) {
                              _context.next = 4;
                              break;
                            }

                            return _context.abrupt("return", _helper["default"].sendErrorsFromDB(res, err));

                          case 4:
                            if (!user) {
                              _context.next = 27;
                              break;
                            }

                            i = 0;

                          case 6:
                            if (!(i < body.length)) {
                              _context.next = 24;
                              break;
                            }

                            value = body[i];

                            if (!(value[0] === 'email' && !value[1].match(emailRegex))) {
                              _context.next = 12;
                              break;
                            }

                            return _context.abrupt("return", res.status(400).send({
                              errors: ['Email inválido!']
                            }));

                          case 12:
                            if (!(value[0] === 'password' && !value[1].match(passwordRegex))) {
                              _context.next = 16;
                              break;
                            }

                            return _context.abrupt("return", res.status(400).send({
                              errors: ['A senha deve conter entre 6 a 12 elementos!']
                            }));

                          case 16:
                            if (!(value[0] === 'name' && value[1] === '')) {
                              _context.next = 20;
                              break;
                            }

                            return _context.abrupt("return", res.status(400).send({
                              errors: ['Nome de inválido']
                            }));

                          case 20:
                            if (value[0] === 'name') {
                              user.name = value[1];
                            } else if (value[0] === 'email' && value[1].match(emailRegex)) {
                              user.email = value[1];
                            } else if (value[0] === 'password' && value[1].match(passwordRegex)) {
                              salt = _bcrypt["default"].genSaltSync();
                              passwordHash = _bcrypt["default"].hashSync(value[1], salt);
                              user.password = passwordHash;
                            }

                          case 21:
                            i++;
                            _context.next = 6;
                            break;

                          case 24:
                            _context.next = 26;
                            return user.save();

                          case 26:
                            res.status(200).send(user);

                          case 27:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));

                  return function (_x3, _x4) {
                    return _ref2.apply(this, arguments);
                  };
                }());
              } else {
                return res.status(400).send('Error');
              }
            });

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function patchUser(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = patchUser;
exports["default"] = _default;