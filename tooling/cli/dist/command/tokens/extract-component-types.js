"use strict";

exports.__esModule = true;
exports.extractComponentTypes = extractComponentTypes;
exports.printComponentTypes = printComponentTypes;

var _utils = require("@chakra-ui/utils");

var _extractPropertyPaths = require("./extract-property-paths");

function extractComponentTypes(theme) {
  var components = theme.components;

  if (!(0, _utils.isObject)(components)) {
    return {};
  }

  return Object.entries(components).reduce(function (allDefs, _ref) {
    var componentName = _ref[0],
        definition = _ref[1];

    if (definition) {
      var _definition$sizes, _definition$variants;

      allDefs[componentName] = {
        sizes: Object.keys((_definition$sizes = definition.sizes) != null ? _definition$sizes : {}),
        variants: Object.keys((_definition$variants = definition.variants) != null ? _definition$variants : {})
      };
    }

    return allDefs;
  }, {});
}

function escapeComponentName(componentName) {
  return componentName.match(/^[a-zA-Z0-9\-_]+$/) ? componentName : "\"" + componentName + "\"";
}

function printComponentTypes(componentTypes) {
  var types = Object.entries(componentTypes).map(function (_ref2) {
    var componentName = _ref2[0],
        unions = _ref2[1];
    return escapeComponentName(componentName) + ": {\n  " + (0, _extractPropertyPaths.printUnionMap)(unions) + "\n}";
  }).join("\n");
  return "components: {\n  " + types + "  \n}\n";
}
//# sourceMappingURL=extract-component-types.js.map