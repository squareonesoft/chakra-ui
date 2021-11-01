"use strict";

exports.__esModule = true;
exports.extractPropertyKeys = extractPropertyKeys;

var _utils = require("@chakra-ui/utils");

/**
 * Extract textStyles keys
 */
function extractPropertyKeys(theme, themePropertyName) {
  var themeProperty = theme[themePropertyName];

  if (!(0, _utils.isObject)(themeProperty)) {
    return [];
  }

  return Object.keys(themeProperty);
}
//# sourceMappingURL=extract-property-keys.js.map