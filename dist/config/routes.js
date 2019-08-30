"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _auth = _interopRequireDefault(require("../components/auth/auth.routes"));

var _users = _interopRequireDefault(require("../components/users/users.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var init = function init(app) {
  app.use('/api/v1/auth', _auth["default"]);
  app.use('/api/v1/users', _users["default"]);
};

var _default = {
  init: init
};
exports["default"] = _default;