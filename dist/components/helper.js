"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var asyncMiddleware = function asyncMiddleware(fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next))["catch"](next);
  };
};

var sendErrorsFromDB = function sendErrorsFromDB(res, dbErrors) {
  var errors = [];

  _lodash["default"].forIn(dbErrors.errors, function (error) {
    return errors.push(error.message);
  });

  return res.status(400).json({
    errors: errors
  });
};

var _default = {
  asyncMiddleware: asyncMiddleware,
  sendErrorsFromDB: sendErrorsFromDB
};
exports["default"] = _default;