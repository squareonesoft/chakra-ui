"use strict";

exports.__esModule = true;
exports.createThemeTypingsInterface = createThemeTypingsInterface;

var _utils = require("@chakra-ui/utils");

var _extractPropertyPaths = require("./extract-property-paths");

var _extractComponentTypes = require("./extract-component-types");

var _extractColorSchemes = require("./extract-color-schemes");

var _extractPropertyKeys = require("./extract-property-keys");

var _formatWithPrettier = require("../../utils/format-with-prettier");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function createThemeTypingsInterface(_x, _x2) {
  return _createThemeTypingsInterface.apply(this, arguments);
}

function _createThemeTypingsInterface() {
  _createThemeTypingsInterface = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(theme, _ref) {
    var config, unions, textStyles, layerStyles, colorSchemes, componentTypes, template;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            config = _ref.config;
            unions = config.reduce(function (allUnions, _ref2) {
              var key = _ref2.key,
                  maxScanDepth = _ref2.maxScanDepth,
                  _ref2$filter = _ref2.filter,
                  filter = _ref2$filter === void 0 ? function () {
                return true;
              } : _ref2$filter,
                  _ref2$flatMap = _ref2.flatMap,
                  flatMap = _ref2$flatMap === void 0 ? function (value) {
                return value;
              } : _ref2$flatMap;
              var target = theme[key];

              if ((0, _utils.isObject)(target) || Array.isArray(target)) {
                allUnions[key] = (0, _extractPropertyPaths.extractPropertyPaths)(target, maxScanDepth).filter(filter).flatMap(flatMap);
              } else {
                allUnions[key] = [];
              }

              return allUnions;
            }, {});
            textStyles = (0, _extractPropertyKeys.extractPropertyKeys)(theme, "textStyles");
            layerStyles = (0, _extractPropertyKeys.extractPropertyKeys)(theme, "layerStyles");
            colorSchemes = (0, _extractColorSchemes.extractColorSchemeTypes)(theme);
            componentTypes = (0, _extractComponentTypes.extractComponentTypes)(theme);
            template = // language=ts
            "// regenerate by running\n// npx @chakra-ui/cli tokens path/to/your/theme.(js|ts)\nexport interface ThemeTypings {\n  " + (0, _extractPropertyPaths.printUnionMap)(_extends({}, unions, {
              textStyles: textStyles,
              layerStyles: layerStyles,
              colorSchemes: colorSchemes
            })) + "\n  " + (0, _extractComponentTypes.printComponentTypes)(componentTypes) + "\n}\n\n";
            return _context.abrupt("return", (0, _formatWithPrettier.formatWithPrettierIfAvailable)(template));

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _createThemeTypingsInterface.apply(this, arguments);
}
//# sourceMappingURL=create-theme-typings-interface.js.map