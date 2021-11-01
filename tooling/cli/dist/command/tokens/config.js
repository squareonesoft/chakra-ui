"use strict";

exports.__esModule = true;
exports.themeKeyConfiguration = void 0;
var themeKeyConfiguration = [{
  key: "borders"
}, {
  key: "breakpoints",
  filter: function filter(value) {
    return Number.isNaN(Number(value));
  }
}, {
  key: "colors",
  maxScanDepth: 3
}, {
  key: "fonts"
}, {
  key: "fontSizes"
}, {
  key: "fontWeights"
}, {
  key: "letterSpacings"
}, {
  key: "lineHeights"
}, {
  key: "radii"
}, {
  key: "shadows"
}, {
  key: "sizes",
  maxScanDepth: 2
}, {
  key: "space",
  flatMap: function flatMap(value) {
    return [value, "-" + value];
  }
}, {
  key: "transition"
}, {
  key: "zIndices"
}];
exports.themeKeyConfiguration = themeKeyConfiguration;
//# sourceMappingURL=config.js.map