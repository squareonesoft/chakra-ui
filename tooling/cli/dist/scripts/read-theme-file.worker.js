"use strict";

require("regenerator-runtime/runtime");

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var tsNode = _interopRequireWildcard(require("ts-node"));

var tsConfigPaths = _interopRequireWildcard(require("tsconfig-paths"));

var _moduleAlias = _interopRequireDefault(require("module-alias"));

var _utils = require("@chakra-ui/utils");

var _createThemeTypingsInterface = require("../command/tokens/create-theme-typings-interface");

var _config = require("../command/tokens/config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var bold = function bold(text) {
  return "\x1B[1m" + text + "\x1B[22m";
};

function importTheme(_x) {
  return _importTheme.apply(this, arguments);
}

function _importTheme() {
  _importTheme = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(path) {
    var _module$default;

    var module, theme;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return Promise.resolve("" + path).then(function (s) {
              return _interopRequireWildcard(require(s));
            });

          case 2:
            module = _context.sent;
            theme = (_module$default = module["default"]) != null ? _module$default : module.theme;

            if (theme) {
              _context.next = 6;
              break;
            }

            throw new Error("\n    Theme export not found in module: '" + path + "'.\n\n    A theme should have a " + bold("default") + " export or a " + bold("theme") + " named export.\n    Found the following exports: " + bold(Object.keys(module).join(", ")) + "\n  ");

          case 6:
            return _context.abrupt("return", theme);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _importTheme.apply(this, arguments);
}

function readTheme(_x2) {
  return _readTheme.apply(this, arguments);
}
/**
 * Reads the theme file, generates the typings interface and prints it to stdout
 */


function _readTheme() {
  _readTheme = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(themeFilePath) {
    var cwd, absoluteThemePath, absoluteThemeDir, tsConfig, aliases, defaultProject;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            cwd = process.cwd();
            absoluteThemePath = _path["default"].join(cwd, themeFilePath);
            absoluteThemeDir = _path["default"].dirname(absoluteThemePath);
            tsConfig = tsConfigPaths.loadConfig(absoluteThemeDir);

            if (tsConfig.resultType === "success") {
              tsNode.register({
                // use the TS projects own tsconfig file
                project: tsConfig.configFileAbsolutePath,
                compilerOptions: {
                  module: "CommonJS"
                }
              });
              /**
               * Replace the module aliases in the transpiled code,
               * because ts-node does not resolve them to relative require paths.
               *
               * 🚨 Note that only the first alias target will work
               * @example tsconfig.json
               * {
               *   "baseUrl": "src",
               *   "paths": {
               *     "@alias/*": ["target/*"]
               *   }
               * }
               */

              aliases = Object.keys(tsConfig.paths).reduce(function (acc, tsAlias) {
                // target/* -> target/
                var firstTarget = tsConfig.paths[tsAlias][0].replace(/\*$/, ""); // @alias/* -> @alias

                var jsAlias = tsAlias.replace(/\/\*$/, ""); // @alias = baseUrl/target/

                acc[jsAlias] = _path["default"].join(tsConfig.absoluteBaseUrl, firstTarget);
                return acc;
              }, {});

              _moduleAlias["default"].addAliases(aliases);
            } else {
              // it is a JS project
              defaultProject = _path["default"].join(__dirname, "..", "..", "bin", "tsconfig.json");
              tsNode.register({
                project: defaultProject
              });
            }

            _context2.prev = 5;
            _context2.next = 8;
            return _fs["default"].promises.stat(absoluteThemePath);

          case 8:
            return _context2.abrupt("return", importTheme(absoluteThemePath));

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](5);
            _context2.prev = 13;
            return _context2.abrupt("return", importTheme(require.resolve(themeFilePath, {
              paths: [cwd]
            })));

          case 17:
            _context2.prev = 17;
            _context2.t1 = _context2["catch"](13);
            throw new Error("Theme file or package not found \n" + _context2.t0 + " \n" + _context2.t1);

          case 20:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[5, 11], [13, 17]]);
  }));
  return _readTheme.apply(this, arguments);
}

function run() {
  return _run.apply(this, arguments);
}

function _run() {
  _run = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var themeFile, theme, template;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            themeFile = process.argv[2];

            if (themeFile) {
              _context3.next = 3;
              break;
            }

            throw new Error("No path to theme file provided.");

          case 3:
            _context3.next = 5;
            return readTheme(themeFile);

          case 5:
            theme = _context3.sent;

            if ((0, _utils.isObject)(theme)) {
              _context3.next = 8;
              break;
            }

            throw new Error("Theme not found in default or named `theme` export");

          case 8:
            _context3.next = 10;
            return (0, _createThemeTypingsInterface.createThemeTypingsInterface)(theme, {
              config: _config.themeKeyConfiguration
            });

          case 10:
            template = _context3.sent;

            if (process.send) {
              process.send(template);
            } else {
              process.stdout.write(template);
            }

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _run.apply(this, arguments);
}

run()["catch"](function (e) {
  if (process.send) {
    process.send({
      err: e.toString()
    });
  } else {
    process.stderr.write(e.message);
  }

  process.exit(1);
});
//# sourceMappingURL=read-theme-file.worker.js.map