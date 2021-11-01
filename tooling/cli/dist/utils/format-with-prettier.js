"use strict";

exports.__esModule = true;
exports.formatWithPrettierIfAvailable = formatWithPrettierIfAvailable;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createFormatFileWithPrettier = function createFormatFileWithPrettier(prettier) {
  return /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(content) {
      var prettierConfig;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return prettier.resolveConfig(process.cwd());

            case 2:
              prettierConfig = _context.sent;
              return _context.abrupt("return", prettier.format(String(content), _extends({}, prettierConfig, {
                parser: "typescript"
              })));

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();
};

function formatWithPrettierIfAvailable(_x2) {
  return _formatWithPrettierIfAvailable.apply(this, arguments);
}

function _formatWithPrettierIfAvailable() {
  _formatWithPrettierIfAvailable = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(content) {
    var prettier;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            // eslint-disable-next-line global-require
            prettier = require("prettier");
            _context2.next = 7;
            break;

          case 4:
            _context2.prev = 4;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", content);

          case 7:
            return _context2.abrupt("return", createFormatFileWithPrettier(prettier)(content));

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 4]]);
  }));
  return _formatWithPrettierIfAvailable.apply(this, arguments);
}
//# sourceMappingURL=format-with-prettier.js.map