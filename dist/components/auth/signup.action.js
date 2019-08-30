"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _helper = _interopRequireDefault(require("../helper"));

var _user = _interopRequireDefault(require("../users/user.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var emailRegex = /\S+@\S+\.\S+/;
var passwordRegex = /.{6,12}/;

var signup =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var name, email, password, confirmPassword, salt, passwordHash;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            name = req.body.name || '';
            email = req.body.email || '';
            password = req.body.password || '';
            confirmPassword = req.body.confirm_password || '';

            if (email.match(emailRegex)) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", res.status(400).send({
              errors: ['Email inválido!']
            }));

          case 6:
            if (password.match(passwordRegex)) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", res.status(400).send({
              errors: ['A senha deve conter entre 6 a 12 elementos!']
            }));

          case 8:
            salt = _bcrypt["default"].genSaltSync();
            passwordHash = _bcrypt["default"].hashSync(password, salt);

            if (_bcrypt["default"].compareSync(confirmPassword, passwordHash)) {
              _context.next = 12;
              break;
            }

            return _context.abrupt("return", res.status(400).send({
              errors: ['Senhas não conferem!']
            }));

          case 12:
            _user["default"].findOne({
              email: email
            }, function (err, user) {
              if (err) return _helper["default"].sendErrorsFromDB(res, err);else if (user) return res.status(400).send({
                errors: ['Email já cadastrado!']
              });
              var newUser = new _user["default"]({
                name: name,
                email: email,
                password: passwordHash
              });
              newUser.save(function (err) {
                if (err) return _helper["default"].sendErrorsFromDB(res, err);
                return res.status(200).send({
                  data: true,
                  messages: ['Registro realizado com sucesso!']
                });
              });
            });

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function signup(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = signup;
exports["default"] = _default;