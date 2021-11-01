"use strict";

exports.__esModule = true;
exports.printUnionMap = printUnionMap;
exports.extractPropertyPaths = extractPropertyPaths;

var _utils = require("@chakra-ui/utils");

function wrapWithQuotes(value) {
  return "\"" + value + "\"";
}

function printUnionType(values) {
  if (!values.length) {
    return "never";
  }

  return values.map(wrapWithQuotes).join(" | ");
}
/**
 * @example
 * { colors: ['red.500', 'green.500'] } => `colors: "red.500" | "green.500"`
 */


function printUnionMap(unions) {
  return Object.entries(unions).sort(function (_ref, _ref2) {
    var a = _ref[0];
    var b = _ref2[0];
    return a.localeCompare(b);
  }).map(function (_ref3) {
    var targetKey = _ref3[0],
        union = _ref3[1];
    return targetKey + ": " + printUnionType(union) + ";";
  }).join("\n");
}
/**
 * Extract recursively all property paths with a max depth
 */


function extractPropertyPaths(target, maxDepth) {
  if (maxDepth === void 0) {
    maxDepth = 1;
  }

  if (!(0, _utils.isObject)(target) && !Array.isArray(target) || !maxDepth) {
    return [];
  }

  return Object.entries(target).reduce(function (allPropertyPaths, _ref4) {
    var key = _ref4[0],
        value = _ref4[1];

    if ((0, _utils.isObject)(value)) {
      extractPropertyPaths(value, maxDepth - 1).forEach(function (childKey) {
        return (// e.g. gray.500
          allPropertyPaths.push(key + "." + childKey)
        );
      });
    } else {
      // e.g. transparent
      allPropertyPaths.push(key);
    }

    return allPropertyPaths;
  }, []);
}
//# sourceMappingURL=extract-property-paths.js.map