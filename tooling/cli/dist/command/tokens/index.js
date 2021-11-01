"use strict";

exports.__esModule = true;
exports.generateThemeTypings = generateThemeTypings;

var _util = require("util");

var _fs = require("fs");

var _child_process = require("child_process");

var _path = _interopRequireDefault(require("path"));

var _ora = _interopRequireDefault(require("ora"));

var _resolveOutputPath = require("./resolve-output-path");

exports.themeInterfaceDestination = _resolveOutputPath.themeInterfaceDestination;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var writeFileAsync = (0, _util.promisify)(_fs.writeFile);

function runTemplateWorker(_x) {
  return _runTemplateWorker.apply(this, arguments);
}

function _runTemplateWorker() {
  _runTemplateWorker = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
    var themeFile, worker;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            themeFile = _ref.themeFile;
            worker = (0, _child_process.fork)(_path["default"].join(__dirname, "..", "..", "scripts", "read-theme-file.worker.js"), [themeFile], {
              stdio: ["pipe", "pipe", "pipe", "ipc"],
              cwd: process.cwd()
            });
            return _context.abrupt("return", new Promise(function (resolve, reject) {
              worker.on("message", function (message) {
                var errMessage = message == null ? void 0 : message.err;

                if (errMessage) {
                  reject(new Error(errMessage));
                }

                return resolve(String(message));
              });
              worker.on("error", reject);
            }));

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _runTemplateWorker.apply(this, arguments);
}

function generateThemeTypings(_x2) {
  return _generateThemeTypings.apply(this, arguments);
}

function _generateThemeTypings() {
  _generateThemeTypings = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref2) {
    var themeFile, out, spinner, template, outPath;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            themeFile = _ref2.themeFile, out = _ref2.out;
            spinner = (0, _ora["default"])("Generating chakra theme typings").start();
            _context2.prev = 2;
            _context2.next = 5;
            return runTemplateWorker({
              themeFile: themeFile
            });

          case 5:
            template = _context2.sent;
            _context2.next = 8;
            return (0, _resolveOutputPath.resolveOutputPath)(out);

          case 8:
            outPath = _context2.sent;
            spinner.info();
            spinner.text = "Write file \"" + outPath + "\"...";
            _context2.next = 13;
            return writeFileAsync(outPath, template, "utf8");

          case 13:
            spinner.succeed("Done");
            _context2.next = 20;
            break;

          case 16:
            _context2.prev = 16;
            _context2.t0 = _context2["catch"](2);
            spinner.fail("An error occurred");
            console.error(_context2.t0.message);

          case 20:
            _context2.prev = 20;
            spinner.stop();
            return _context2.finish(20);

          case 23:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 16, 20, 23]]);
  }));
  return _generateThemeTypings.apply(this, arguments);
}
//# sourceMappingURL=index.js.map