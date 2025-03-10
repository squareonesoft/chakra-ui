function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import { CloseButton } from "@chakra-ui/close-button";
import { chakra, forwardRef, omitThemingProps, StylesProvider, useMultiStyleConfig, useStyles, useTheme } from "@chakra-ui/system";
import { cx, runIfFn, __DEV__ } from "@chakra-ui/utils";
import * as React from "react";
import { PopoverProvider, usePopoverContext } from "./popover-context";
import { PopoverTransition } from "./popover-transition";
import { usePopover } from "./use-popover";
export { usePopoverContext };

/**
 * Popover is used to bring attention to specific user interface elements,
 * typically to suggest an action or to guide users through a new experience.
 */
export var Popover = props => {
  var styles = useMultiStyleConfig("Popover", props);

  var _omitThemingProps = omitThemingProps(props),
      {
    children
  } = _omitThemingProps,
      rest = _objectWithoutPropertiesLoose(_omitThemingProps, ["children"]);

  var theme = useTheme();
  var context = usePopover(_extends({}, rest, {
    direction: theme.direction
  }));
  return /*#__PURE__*/React.createElement(PopoverProvider, {
    value: context
  }, /*#__PURE__*/React.createElement(StylesProvider, {
    value: styles
  }, runIfFn(children, {
    isOpen: context.isOpen,
    onClose: context.onClose,
    forceUpdate: context.forceUpdate
  })));
};

if (__DEV__) {
  Popover.displayName = "Popover";
}
/**
 * PopoverTrigger opens the popover's content. It must be an interactive element
 * such as `button` or `a`.
 */


export var PopoverTrigger = props => {
  // enforce a single child
  var child = React.Children.only(props.children);
  var {
    getTriggerProps
  } = usePopoverContext();
  return /*#__PURE__*/React.cloneElement(child, getTriggerProps(child.props, child.ref));
};

if (__DEV__) {
  PopoverTrigger.displayName = "PopoverTrigger";
}

export var PopoverContent = /*#__PURE__*/forwardRef((props, ref) => {
  var {
    rootProps
  } = props,
      contentProps = _objectWithoutPropertiesLoose(props, ["rootProps"]);

  var {
    getPopoverProps,
    getPopoverPositionerProps
  } = usePopoverContext();
  var styles = useStyles();

  var contentStyles = _extends({
    position: "relative",
    display: "flex",
    flexDirection: "column"
  }, styles.content);

  return /*#__PURE__*/React.createElement(chakra.div, _extends({}, getPopoverPositionerProps(rootProps), {
    __css: styles.popper,
    className: "chakra-popover__popper"
  }), /*#__PURE__*/React.createElement(PopoverTransition, _extends({}, getPopoverProps(contentProps, ref), {
    className: cx("chakra-popover__content", props.className),
    __css: contentStyles
  })));
});

if (__DEV__) {
  PopoverContent.displayName = "PopoverContent";
}

/**
 * PopoverHeader is the accessible header or label
 * for the popover's content and it is first announced by screenreaders.
 */
export var PopoverHeader = /*#__PURE__*/forwardRef((props, ref) => {
  var {
    getHeaderProps
  } = usePopoverContext();
  var styles = useStyles();
  return /*#__PURE__*/React.createElement(chakra.header, _extends({}, getHeaderProps(props, ref), {
    className: cx("chakra-popover__header", props.className),
    __css: styles.header
  }));
});

if (__DEV__) {
  PopoverHeader.displayName = "PopoverHeader";
}

/**
 * PopoverBody is the main content area for the popover. Should contain
 * at least one interactive element.
 */
export var PopoverBody = /*#__PURE__*/forwardRef((props, ref) => {
  var {
    getBodyProps
  } = usePopoverContext();
  var styles = useStyles();
  return /*#__PURE__*/React.createElement(chakra.div, _extends({}, getBodyProps(props, ref), {
    className: cx("chakra-popover__body", props.className),
    __css: styles.body
  }));
});

if (__DEV__) {
  PopoverBody.displayName = "PopoverBody";
}

export var PopoverFooter = props => {
  var styles = useStyles();
  return /*#__PURE__*/React.createElement(chakra.footer, _extends({}, props, {
    className: cx("chakra-popover__footer", props.className),
    __css: styles.footer
  }));
};

if (__DEV__) {
  PopoverFooter.displayName = "PopoverFooter";
}

export var PopoverCloseButton = props => {
  var {
    onClose
  } = usePopoverContext();
  var styles = useStyles();
  return /*#__PURE__*/React.createElement(CloseButton, _extends({
    size: "sm",
    onClick: onClose,
    className: cx("chakra-popover__close-btn", props.className),
    __css: styles.closeButton
  }, props));
};

if (__DEV__) {
  PopoverCloseButton.displayName = "PopoverCloseButton";
}

export var PopoverArrow = props => {
  var _ref;

  var {
    bg,
    bgColor,
    backgroundColor
  } = props;
  var {
    getArrowProps,
    getArrowInnerProps
  } = usePopoverContext();
  var styles = useStyles();
  var arrowBg = (_ref = bg != null ? bg : bgColor) != null ? _ref : backgroundColor;
  return /*#__PURE__*/React.createElement(chakra.div, _extends({}, getArrowProps(), {
    className: "chakra-popover__arrow-positioner"
  }), /*#__PURE__*/React.createElement(chakra.div, _extends({
    className: cx("chakra-popover__arrow", props.className)
  }, getArrowInnerProps(props), {
    __css: _extends({}, styles.arrow, {
      "--popper-arrow-bg": arrowBg ? "colors." + arrowBg + ", " + arrowBg : undefined
    })
  })));
};

if (__DEV__) {
  PopoverArrow.displayName = "PopoverArrow";
}
//# sourceMappingURL=popover.js.map