"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _nodemailer = _interopRequireDefault(require("nodemailer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var mailer = function mailer(req, email, token) {
  var transport = _nodemailer["default"].createTransport({
    service: 'Gmail',
    auth: {
      user: "admin@email.com",
      pass: "admin123"
    }
  });

  var emailToSend = {
    from: "admin@email.com",
    to: email,
    subject: 'Reset password',
    html: "\n    You are receiving this because you (or someone else) have requested the reset of the password for your account.\n    Please click on the following link, or paste this into your browser to complete the process:\n    <a href=\"http://".concat(req.headers.host, "/resetPassword/").concat(token, "\">link to reset</a>\n    If you did not request this, please ignore this email and your password will remain unchanged.\n    ")
  };
  transport.sendMail(emailToSend, function (err, info) {
    if (err) {
      return {
        error: err
      };
    }

    return {
      message: 'Email sent with success',
      information: info
    };
  });
};

var _default = mailer;
exports["default"] = _default;