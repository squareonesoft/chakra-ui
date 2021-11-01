function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import { chakra, forwardRef, omitThemingProps, useStyleConfig } from "@chakra-ui/system";
import { mergeWith, __DEV__ } from "@chakra-ui/utils";
import * as React from "react";
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

export var SkipNavLink = /*#__PURE__*/forwardRef((props, ref) => {
  var styles = useStyleConfig("SkipLink", props);

  var _omitThemingProps = omitThemingProps(props),
      {
    id = fallbackId
  } = _omitThemingProps,
      rest = _objectWithoutPropertiesLoose(_omitThemingProps, ["id"]);

  var linkStyles = mergeWith({}, baseStyle, styles);
  return /*#__PURE__*/React.createElement(chakra.a, _extends({}, rest, {
    ref: ref,
    href: "#" + id,
    __css: linkStyles
  }));
});

if (__DEV__) {
  SkipNavLink.displayName = "SkipNavLink";
}

/**
 * Renders a div as the target for the link.
 */
export var SkipNavContent = /*#__PURE__*/forwardRef((props, ref) => {
  var {
    id = fallbackId
  } = props,
      rest = _objectWithoutPropertiesLoose(props, ["id"]);

  return /*#__PURE__*/React.createElement(chakra.div, _extends({
    ref: ref,
    id: id,
    tabIndex: -1,
    style: {
      outline: 0
    }
  }, rest));
});

if (__DEV__) {
  SkipNavContent.displayName = "SkipNavContent";
}
//# sourceMappingURL=index.js.map