"use strict";

exports.__esModule = true;
exports.main = main;

require("regenerator-runtime/runtime");

var _glob = _interopRequireDefault(require("glob"));

var _path = _interopRequireDefault(require("path"));

var _util = require("util");

var _fs = require("fs");

var docgen = _interopRequireWildcard(require("react-docgen-typescript"));

var _mkdirp = _interopRequireDefault(require("mkdirp"));

var _styledSystem = require("@chakra-ui/styled-system");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var globAsync = (0, _util.promisify)(_glob["default"]);

var excludedPropNames = _styledSystem.propNames.concat(["as", "apply", "sx", "__css", "css"]);

var rootDir = _path["default"].join(__dirname, "..", "..", "..", "..");

var sourcePath = _path["default"].join(rootDir, "packages");

var outputPath = _path["default"].join(__dirname, "..", "components");

var tsConfigPath = _path["default"].join(sourcePath, "..", "tsconfig.json");

function main() {
  return _main.apply(this, arguments);
}

function _main() {
  _main = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var componentFiles, parsedInfo, componentInfo;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return findComponentFiles();

          case 2:
            componentFiles = _context.sent;

            if (!componentFiles.length) {
              _context.next = 6;
              break;
            }

            _context.next = 6;
            return (0, _mkdirp["default"])(outputPath);

          case 6:
            log("Parsing files for component types...");
            parsedInfo = parseInfo(componentFiles);
            log("Extracting component info...");
            componentInfo = extractComponentInfo(parsedInfo);
            log("Writing component info files...");
            writeComponentInfoFiles(componentInfo);
            log("Writing index files...");
            writeIndexCJS(componentInfo);
            writeIndexESM(componentInfo);
            log("Processed " + componentInfo.length + " components");

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _main.apply(this, arguments);
}

if (require.main === module) {
  // run main function if called via cli
  main()["catch"](console.error);
}
/**
 * Find all TypeScript files which could contain component definitions
 */


function findComponentFiles() {
  return _findComponentFiles.apply(this, arguments);
}
/**
 * Parse files with react-doc-gen-typescript
 */


function _findComponentFiles() {
  _findComponentFiles = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var tsFiles;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return globAsync("react/**/src/**/*.@(ts|tsx)", {
              cwd: sourcePath
            });

          case 2:
            tsFiles = _context2.sent;
            return _context2.abrupt("return", tsFiles.filter(function (f) {
              return !f.includes("stories");
            }));

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _findComponentFiles.apply(this, arguments);
}

function parseInfo(filePaths) {
  var _docgen$withCustomCon = docgen.withCustomConfig(tsConfigPath, {
    shouldRemoveUndefinedFromOptional: true,
    propFilter: function propFilter(prop, component) {
      var _prop$parent$fileName, _prop$parent, _prop$parent$fileName2, _prop$parent2;

      var isStyledSystemProp = excludedPropNames.includes(prop.name);
      var isHTMLElementProp = (_prop$parent$fileName = (_prop$parent = prop.parent) == null ? void 0 : _prop$parent.fileName.includes("node_modules")) != null ? _prop$parent$fileName : false;
      var isHook = component.name.startsWith("use");
      var isTypeScriptNative = (_prop$parent$fileName2 = (_prop$parent2 = prop.parent) == null ? void 0 : _prop$parent2.fileName.includes("node_modules/typescript")) != null ? _prop$parent$fileName2 : false;
      return isHook && !isTypeScriptNative || !(isStyledSystemProp || isHTMLElementProp);
    }
  }),
      parse = _docgen$withCustomCon.parse;

  return filePaths.flatMap(function (file) {
    var absoluteFilePath = _path["default"].join(sourcePath, file);

    return parse(absoluteFilePath);
  });
}
/**
 * Extract meta data of component docs
 */


function extractComponentInfo(docs) {
  return docs.reduce(function (acc, def) {
    if (!Object.keys(def.props || {}).length) {
      return acc;
    }

    function createUniqueName(displayName) {
      var existing = acc.filter(function (prev) {
        return String(prev.def.displayName).toLowerCase() === displayName.toLowerCase();
      });

      if (!existing.length) {
        return displayName;
      }

      return "" + displayName + existing.length;
    }

    var exportName = createUniqueName(def.displayName);
    var fileName = exportName + ".json";
    acc.push({
      def: def,
      displayName: def.displayName,
      fileName: fileName,
      exportName: exportName,
      importPath: "../components/" + fileName
    });
    return acc;
  }, []);
}
/**
 * Write component info as JSON to disk
 */


function writeComponentInfoFiles(componentInfo) {
  for (var _iterator = _createForOfIteratorHelperLoose(componentInfo), _step; !(_step = _iterator()).done;) {
    var info = _step.value;

    var filePath = _path["default"].join(outputPath, info.fileName);

    var content = JSON.stringify(info.def);
    (0, _fs.writeFileSync)(filePath, content);
  }
}
/**
 * Create and write the index file in CJS format
 */


function writeIndexCJS(componentInfo) {
  var cjsIndexFilePath = _path["default"].join(__dirname, "index.js");

  var cjsExports = componentInfo.map(function (_ref) {
    var displayName = _ref.displayName,
        importPath = _ref.importPath;
    return "module.exports['" + displayName + "'] = require('" + importPath + "')";
  });
  (0, _fs.writeFileSync)(cjsIndexFilePath, cjsExports.join("\n"));
}
/**
 * Create and write the index file in ESM format
 */


function writeIndexESM(componentInfo) {
  var esmIndexFilePath = _path["default"].join(__dirname, "..", "esm", "index.js");

  var esmPropImports = componentInfo.map(function (_ref2) {
    var exportName = _ref2.exportName,
        importPath = _ref2.importPath;
    return "import " + exportName + "Import from '" + importPath + "'";
  }).join("\n");
  var esmPropExports = componentInfo.map(function (_ref3) {
    var exportName = _ref3.exportName;
    return "export const " + exportName + " = " + exportName + "Import";
  }).join("\n");
  (0, _fs.writeFileSync)(esmIndexFilePath, esmPropImports + "\n" + esmPropExports);
}

function log() {
  var _console;

  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  (_console = console).info.apply(_console, ["[props-docs]"].concat(args));
}
//# sourceMappingURL=build.js.map