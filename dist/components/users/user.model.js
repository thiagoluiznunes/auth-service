"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var userSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: [true, 'Informe o nome.']
  },
  email: {
    type: String,
    required: [true, 'Informe o email.']
  },
  password: {
    type: String,
    required: [true, 'Informe a senha.']
  },
  userImage: {
    type: String
  },
  resetPasswordToken: {
    type: String
  }
});

var _default = _mongoose["default"].model('User', userSchema);

exports["default"] = _default;