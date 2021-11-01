"use strict";

exports.__esModule = true;
exports.extractColorSchemeTypes = extractColorSchemeTypes;

var _utils = require("@chakra-ui/utils");

var colorHueKeys = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"];

function isColorHue(value) {
  if (!(0, _utils.isObject)(value)) {
    return false;
  }

  var keys = Object.keys(value);
  return colorHueKeys.every(function (key) {
    return keys.includes(key);
  });
}
/**
 * Extract color scheme names
 * by validating that every property of type ColorHue is in the object
 */


function extractColorSchemeTypes(theme) {
  var colors = theme.colors;

  if (!(0, _utils.isObject)(colors)) {
    return [];
  }

  return Object.entries(colors).reduce(function (allDefs, _ref) {
    var colorName = _ref[0],
        definition = _ref[1];

    if (isColorHue(definition)) {
      allDefs.push(colorName);
    }

    return allDefs;
  }, []);
}
//# sourceMappingURL=extract-color-schemes.js.map