"use strict";

exports.__esModule = true;
exports.Tooltip = void 0;

var _popper = require("@chakra-ui/popper");

var _portal = require("@chakra-ui/portal");

var _system = require("@chakra-ui/system");

var _utils = require("@chakra-ui/utils");

var _visuallyHidden = require("@chakra-ui/visually-hidden");

var _framerMotion = require("framer-motion");

var React = _interopRequireWildcard(require("react"));

var _tooltip = require("./tooltip.transition");

var _useTooltip = require("./use-tooltip");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var StyledTooltip = (0, _system.chakra)(_framerMotion.createDomMotionComponent("div"));
/**
 * Tooltips display informative text when users hover, focus on, or tap an element.
 *
 * @see Docs     https://chakra-ui.com/components/tooltip
 * @see WAI-ARIA https://www.w3.org/TR/wai-aria-practices/#tooltip
 */

var Tooltip = /*#__PURE__*/(0, _system.forwardRef)(function (props, ref) {
  var styles = (0, _system.useStyleConfig)("Tooltip", props);
  var ownProps = (0, _system.omitThemingProps)(props);
  var theme = (0, _system.useTheme)();

  var children = ownProps.children,
      label = ownProps.label,
      shouldWrapChildren = ownProps.shouldWrapChildren,
      ariaLabel = ownProps["aria-label"],
      hasArrow = ownProps.hasArrow,
      bg = ownProps.bg,
      portalProps = ownProps.portalProps,
      rest = _objectWithoutPropertiesLoose(ownProps, ["children", "label", "shouldWrapChildren", "aria-label", "hasArrow", "bg", "portalProps"]);

  if (bg) {
    styles.bg = bg;
    styles[_popper.popperCSSVars.arrowBg["var"]] = (0, _utils.getCSSVar)(theme, "colors", bg);
  }

  var tooltip = (0, _useTooltip.useTooltip)(_extends({}, rest, {
    direction: theme.direction
  }));
  var shouldWrap = (0, _utils.isString)(children) || shouldWrapChildren;
  var trigger;

  if (shouldWrap) {
    trigger = /*#__PURE__*/React.createElement(_system.chakra.span, _extends({
      tabIndex: 0
    }, tooltip.getTriggerProps()), children);
  } else {
    /**
     * Ensure tooltip has only one child node
     */
    var child = React.Children.only(children);
    trigger = /*#__PURE__*/React.cloneElement(child, tooltip.getTriggerProps(child.props, child.ref));
  }

  var hasAriaLabel = !!ariaLabel;

  var _tooltipProps = tooltip.getTooltipProps({}, ref);

  var tooltipProps = hasAriaLabel ? (0, _utils.omit)(_tooltipProps, ["role", "id"]) : _tooltipProps;
  var hiddenProps = (0, _utils.pick)(_tooltipProps, ["role", "id"]);
  /**
   * If the `label` is empty, there's no
   * point showing the tooltip. Let's simply return back the children
   */

  if (!label) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, children);
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, trigger, /*#__PURE__*/React.createElement(_framerMotion.AnimatePresence, null, tooltip.isOpen && /*#__PURE__*/React.createElement(_portal.Portal, portalProps, /*#__PURE__*/React.createElement(_system.chakra.div, _extends({}, tooltip.getTooltipPositionerProps(), {
    __css: {
      zIndex: styles.zIndex,
      pointerEvents: "none"
    }
  }), /*#__PURE__*/React.createElement(StyledTooltip, _extends({
    variants: _tooltip.scale
  }, tooltipProps, {
    initial: "exit",
    animate: "enter",
    exit: "exit",
    __css: styles
  }), label, hasAriaLabel && /*#__PURE__*/React.createElement(_visuallyHidden.VisuallyHidden, hiddenProps, ariaLabel), hasArrow && /*#__PURE__*/React.createElement(_system.chakra.div, {
    "data-popper-arrow": true,
    className: "chakra-tooltip__arrow-wrapper"
  }, /*#__PURE__*/React.createElement(_system.chakra.div, {
    "data-popper-arrow-inner": true,
    className: "chakra-tooltip__arrow",
    __css: {
      bg: styles.bg
    }
  })))))));
});
exports.Tooltip = Tooltip;

if (_utils.__DEV__) {
  Tooltip.displayName = "Tooltip";
}
//# sourceMappingURL=tooltip.js.map