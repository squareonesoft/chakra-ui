"use strict";

exports.__esModule = true;
exports.SkipNavContent = exports.SkipNavLink = void 0;

var _system = require("@chakra-ui/system");

var _utils = require("@chakra-ui/utils");

var React = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var fallbackId = "chakra-skip-nav";
var baseStyle = {
  userSelect: "none",
  border: "0",
  height: "1px",
  width: "1px",
  margin: "-1px",
  padding: "0",
  outline: "0",
  overflow: "hidden",
  position: "absolute",
  clip: "rect(0 0 0 0)",
  _focus: {
    clip: "auto",
    width: "auto",
    height: "auto"
  }
};
/**
 * Renders a link that remains hidden until focused to skip to the main content.
 */

var SkipNavLink = /*#__PURE__*/(0, _system.forwardRef)(function (props, ref) {
  var styles = (0, _system.useStyleConfig)("SkipLink", props);

  var _omitThemingProps = (0, _system.omitThemingProps)(props),
      _omitThemingProps$id = _omitThemingProps.id,
      id = _omitThemingProps$id === void 0 ? fallbackId : _omitThemingProps$id,
      rest = _objectWithoutPropertiesLoose(_omitThemingProps, ["id"]);

  var linkStyles = (0, _utils.mergeWith)({}, baseStyle, styles);
  return /*#__PURE__*/React.createElement(_system.chakra.a, _extends({}, rest, {
    ref: ref,
    href: "#" + id,
    __css: linkStyles
  }));
});
exports.SkipNavLink = SkipNavLink;

if (_utils.__DEV__) {
  SkipNavLink.displayName = "SkipNavLink";
}

/**
 * Renders a div as the target for the link.
 */
var SkipNavContent = /*#__PURE__*/(0, _system.forwardRef)(function (props, ref) {
  var _props$id = props.id,
      id = _props$id === void 0 ? fallbackId : _props$id,
      rest = _objectWithoutPropertiesLoose(props, ["id"]);

  return /*#__PURE__*/React.createElement(_system.chakra.div, _extends({
    ref: ref,
    id: id,
    tabIndex: -1,
    style: {
      outline: 0
    }
  }, rest));
});
exports.SkipNavContent = SkipNavContent;

if (_utils.__DEV__) {
  SkipNavContent.displayName = "SkipNavContent";
}
//# sourceMappingURL=index.js.map