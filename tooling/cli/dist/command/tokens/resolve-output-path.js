"use strict";

exports.__esModule = true;
exports.resolveOutputPath = resolveOutputPath;
exports.themeInterfaceDestination = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _util = require("util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var exists = (0, _util.promisify)(_fs["default"].exists);
var themeInterfaceDestination = ["node_modules", "@chakra-ui", "styled-system", "dist", "types", "theming.types.d.ts"];
/**
 * Finds the target file to override
 * In our case it is located in the @chakra-ui/styled-system package
 */

exports.themeInterfaceDestination = themeInterfaceDestination;

function resolveThemingDefinitionPath() {
  return _resolveThemingDefinitionPath.apply(this, arguments);
}
/**
 * Find the location of the default target file or resolve the given path
 */


function _resolveThemingDefinitionPath() {
  _resolveThemingDefinitionPath = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var baseDir, cwd, pathsToTry, triedPaths;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            baseDir = _path["default"].join("..", "..", "..");
            cwd = process.cwd();
            pathsToTry = [_path["default"].resolve.apply(_path["default"], [baseDir, ".."].concat(themeInterfaceDestination)), _path["default"].resolve.apply(_path["default"], [baseDir, "..", ".."].concat(themeInterfaceDestination)), _path["default"].resolve.apply(_path["default"], [cwd].concat(themeInterfaceDestination)), _path["default"].resolve.apply(_path["default"], [cwd, ".."].concat(themeInterfaceDestination)), _path["default"].resolve.apply(_path["default"], [cwd, "..", ".."].concat(themeInterfaceDestination))];
            _context2.next = 5;
            return Promise.all(pathsToTry.map( /*#__PURE__*/function () {
              var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(possiblePath) {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return exists(possiblePath);

                      case 2:
                        if (!_context.sent) {
                          _context.next = 4;
                          break;
                        }

                        return _context.abrupt("return", possiblePath);

                      case 4:
                        return _context.abrupt("return", "");

                      case 5:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function (_x2) {
                return _ref.apply(this, arguments);
              };
            }()));

          case 5:
            triedPaths = _context2.sent;
            return _context2.abrupt("return", triedPaths.find(Boolean));

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _resolveThemingDefinitionPath.apply(this, arguments);
}

function resolveOutputPath(_x) {
  return _resolveOutputPath.apply(this, arguments);
}

function _resolveOutputPath() {
  _resolveOutputPath = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(overridePath) {
    var themingDefinitionFilePath;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!overridePath) {
              _context3.next = 2;
              break;
            }

            return _context3.abrupt("return", _path["default"].resolve(process.cwd(), overridePath));

          case 2:
            _context3.next = 4;
            return resolveThemingDefinitionPath();

          case 4:
            themingDefinitionFilePath = _context3.sent;

            if (themingDefinitionFilePath) {
              _context3.next = 7;
              break;
            }

            throw new Error("Could not find @chakra-ui/styled-system in node_modules. Please provide `--out` parameter.");

          case 7:
            return _context3.abrupt("return", themingDefinitionFilePath);

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _resolveOutputPath.apply(this, arguments);
}
//# sourceMappingURL=resolve-output-path.js.map