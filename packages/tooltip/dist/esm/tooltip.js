function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import { popperCSSVars } from "@chakra-ui/popper";
import { Portal } from "@chakra-ui/portal";
import { chakra, forwardRef, omitThemingProps, useStyleConfig, useTheme } from "@chakra-ui/system";
import { isString, omit, pick, __DEV__, getCSSVar } from "@chakra-ui/utils";
import { VisuallyHidden } from "@chakra-ui/visually-hidden";
import { AnimatePresence, motion, createDomMotionComponent } from "framer-motion";
import * as React from "react";
import { scale } from "./tooltip.transition";
import { useTooltip } from "./use-tooltip";
var StyledTooltip = chakra(createDomMotionComponent("div"));
/**
 * Tooltips display informative text when users hover, focus on, or tap an element.
 *
 * @see Docs     https://chakra-ui.com/components/tooltip
 * @see WAI-ARIA https://www.w3.org/TR/wai-aria-practices/#tooltip
 */

export var Tooltip = /*#__PURE__*/forwardRef((props, ref) => {
  var styles = useStyleConfig("Tooltip", props);
  var ownProps = omitThemingProps(props);
  var theme = useTheme();

  var {
    children,
    label,
    shouldWrapChildren,
    "aria-label": ariaLabel,
    hasArrow,
    bg,
    portalProps
  } = ownProps,
      rest = _objectWithoutPropertiesLoose(ownProps, ["children", "label", "shouldWrapChildren", "aria-label", "hasArrow", "bg", "portalProps"]);

  if (bg) {
    styles.bg = bg;
    styles[popperCSSVars.arrowBg.var] = getCSSVar(theme, "colors", bg);
  }

  var tooltip = useTooltip(_extends({}, rest, {
    direction: theme.direction
  }));
  var shouldWrap = isString(children) || shouldWrapChildren;
  var trigger;

  if (shouldWrap) {
    trigger = /*#__PURE__*/React.createElement(chakra.span, _extends({
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

  var tooltipProps = hasAriaLabel ? omit(_tooltipProps, ["role", "id"]) : _tooltipProps;
  var hiddenProps = pick(_tooltipProps, ["role", "id"]);
  /**
   * If the `label` is empty, there's no
   * point showing the tooltip. Let's simply return back the children
   */

  if (!label) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, children);
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, trigger, /*#__PURE__*/React.createElement(AnimatePresence, null, tooltip.isOpen && /*#__PURE__*/React.createElement(Portal, portalProps, /*#__PURE__*/React.createElement(chakra.div, _extends({}, tooltip.getTooltipPositionerProps(), {
    __css: {
      zIndex: styles.zIndex,
      pointerEvents: "none"
    }
  }), /*#__PURE__*/React.createElement(StyledTooltip, _extends({
    variants: scale
  }, tooltipProps, {
    initial: "exit",
    animate: "enter",
    exit: "exit",
    __css: styles
  }), label, hasAriaLabel && /*#__PURE__*/React.createElement(VisuallyHidden, hiddenProps, ariaLabel), hasArrow && /*#__PURE__*/React.createElement(chakra.div, {
    "data-popper-arrow": true,
    className: "chakra-tooltip__arrow-wrapper"
  }, /*#__PURE__*/React.createElement(chakra.div, {
    "data-popper-arrow-inner": true,
    className: "chakra-tooltip__arrow",
    __css: {
      bg: styles.bg
    }
  })))))));
});

if (__DEV__) {
  Tooltip.displayName = "Tooltip";
}
//# sourceMappingURL=tooltip.js.map