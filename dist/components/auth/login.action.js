"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _user = _interopRequireDefault(require("../users/user.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var login = function login(req, res) {
  var email = req.body.email || '';
  var password = req.body.password || '';

  _user["default"].findOne({
    email: email
  }, function (err, user) {
    if (err) {
      return res.status(400).send({
        message: err
      });
    } else if (user && _bcrypt["default"].compareSync(password, user.password)) {
      var payload = {
        id: user.id,
        email: user.email
      };
      var options = {
        algorithm: 'HS256',
        expiresIn: '1 day'
      };

      var token = _jsonwebtoken["default"].sign(payload, "authsecret123", options);

      var name = user.name,
          _email = user.email;
      res.json({
        name: name,
        email: _email,
        token: token
      });
    } else {
      return res.status(400).send({
        errors: 'Usuário/Senha inválidos'
      });
    }
  });
};

var _default = login;
exports["default"] = _default;