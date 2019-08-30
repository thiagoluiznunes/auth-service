"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _mailer = _interopRequireDefault(require("./mailer.action"));

var _helper = _interopRequireDefault(require("../helper"));

var _user = _interopRequireDefault(require("../users/user.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var emailRegex = /\S+@\S+\.\S+/;

var forgotPassword = function forgotPassword(req, res) {
  var email = req.body.email || '';

  if (!email.match(emailRegex)) {
    return res.status(400).send({
      errors: ['Email invalid!']
    });
  }

  _user["default"].findOne({
    email: email
  }, function (err, user) {
    if (err) {
      return _helper["default"].sendErrorsFromDB(res, err);
    } else if (user) {
      var token = _jsonwebtoken["default"].sign(user.toJSON(), "authsecret123", {
        expiresIn: '5 minute'
      });

      user.resetPasswordToken = token;
      user.save(function (err) {
        if (err) {
          return _helper["default"].sendErrorsFromDB(res, err);
        }

        res.status(200).send('Token updated');
        (0, _mailer["default"])(req, email, token);
      });
    } else {
      return res.status(400).send({
        errors: ['Email not found']
      });
    }
  });
};

var _default = forgotPassword;
exports["default"] = _default;