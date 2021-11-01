"use strict";

exports.__esModule = true;
exports.initCLI = initCLI;

var _cliCheckNode = _interopRequireDefault(require("cli-check-node"));

var _cliWelcome = _interopRequireDefault(require("cli-welcome"));

var _updateNotifier = _interopRequireDefault(require("update-notifier"));

var _cliHandleUnhandled = _interopRequireDefault(require("cli-handle-unhandled"));

var pkgJSON = _interopRequireWildcard(require("../../package.json"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function initCLI() {
  return _initCLI.apply(this, arguments);
}

function _initCLI() {
  _initCLI = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            (0, _cliCheckNode["default"])("12");
            _context.next = 3;
            return (0, _cliHandleUnhandled["default"])();

          case 3:
            (0, _cliWelcome["default"])({
              title: "Chakra UI CLI",
              tagLine: "by chakra UI\n" + pkgJSON.description,
              bgColor: "#319795",
              color: "#FFFFFF",
              bold: true,
              clear: false,
              version: pkgJSON.version
            });
            (0, _updateNotifier["default"])({
              pkg: pkgJSON,
              shouldNotifyInNpmScript: true,
              updateCheckInterval: 1000 * 60 * 60 * 24 * 3 // 3 days

            }).notify({
              isGlobal: true
            });

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _initCLI.apply(this, arguments);
}
//# sourceMappingURL=init-cli.js.map