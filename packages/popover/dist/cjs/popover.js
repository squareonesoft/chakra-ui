"use strict";

exports.__esModule = true;
exports.PopoverArrow = exports.PopoverCloseButton = exports.PopoverFooter = exports.PopoverBody = exports.PopoverHeader = exports.PopoverContent = exports.PopoverTrigger = exports.Popover = void 0;

var _closeButton = require("@chakra-ui/close-button");

var _system = require("@chakra-ui/system");

var _utils = require("@chakra-ui/utils");

var React = _interopRequireWildcard(require("react"));

var _popoverContext = require("./popover-context");

exports.usePopoverContext = _popoverContext.usePopoverContext;

var _popoverTransition = require("./popover-transition");

var _usePopover = require("./use-popover");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/**
 * Popover is used to bring attention to specific user interface elements,
 * typically to suggest an action or to guide users through a new experience.
 */
var Popover = function Popover(props) {
  var styles = (0, _system.useMultiStyleConfig)("Popover", props);

  var _omitThemingProps = (0, _system.omitThemingProps)(props),
      children = _omitThemingProps.children,
      rest = _objectWithoutPropertiesLoose(_omitThemingProps, ["children"]);

  var theme = (0, _system.useTheme)();
  var context = (0, _usePopover.usePopover)(_extends({}, rest, {
    direction: theme.direction
  }));
  return /*#__PURE__*/React.createElement(_popoverContext.PopoverProvider, {
    value: context
  }, /*#__PURE__*/React.createElement(_system.StylesProvider, {
    value: styles
  }, (0, _utils.runIfFn)(children, {
    isOpen: context.isOpen,
    onClose: context.onClose,
    forceUpdate: context.forceUpdate
  })));
};

exports.Popover = Popover;

if (_utils.__DEV__) {
  Popover.displayName = "Popover";
}
/**
 * PopoverTrigger opens the popover's content. It must be an interactive element
 * such as `button` or `a`.
 */


var PopoverTrigger = function PopoverTrigger(props) {
  // enforce a single child
  var child = React.Children.only(props.children);

  var _usePopoverContext = (0, _popoverContext.usePopoverContext)(),
      getTriggerProps = _usePopoverContext.getTriggerProps;

  return /*#__PURE__*/React.cloneElement(child, getTriggerProps(child.props, child.ref));
};

exports.PopoverTrigger = PopoverTrigger;

if (_utils.__DEV__) {
  PopoverTrigger.displayName = "PopoverTrigger";
}

var PopoverContent = /*#__PURE__*/(0, _system.forwardRef)(function (props, ref) {
  var rootProps = props.rootProps,
      contentProps = _objectWithoutPropertiesLoose(props, ["rootProps"]);

  var _usePopoverContext2 = (0, _popoverContext.usePopoverContext)(),
      getPopoverProps = _usePopoverContext2.getPopoverProps,
      getPopoverPositionerProps = _usePopoverContext2.getPopoverPositionerProps;

  var styles = (0, _system.useStyles)();

  var contentStyles = _extends({
    position: "relative",
    display: "flex",
    flexDirection: "column"
  }, styles.content);

  return /*#__PURE__*/React.createElement(_system.chakra.div, _extends({}, getPopoverPositionerProps(rootProps), {
    __css: styles.popper,
    className: "chakra-popover__popper"
  }), /*#__PURE__*/React.createElement(_popoverTransition.PopoverTransition, _extends({}, getPopoverProps(contentProps, ref), {
    className: (0, _utils.cx)("chakra-popover__content", props.className),
    __css: contentStyles
  })));
});
exports.PopoverContent = PopoverContent;

if (_utils.__DEV__) {
  PopoverContent.displayName = "PopoverContent";
}

/**
 * PopoverHeader is the accessible header or label
 * for the popover's content and it is first announced by screenreaders.
 */
var PopoverHeader = /*#__PURE__*/(0, _system.forwardRef)(function (props, ref) {
  var _usePopoverContext3 = (0, _popoverContext.usePopoverContext)(),
      getHeaderProps = _usePopoverContext3.getHeaderProps;

  var styles = (0, _system.useStyles)();
  return /*#__PURE__*/React.createElement(_system.chakra.header, _extends({}, getHeaderProps(props, ref), {
    className: (0, _utils.cx)("chakra-popover__header", props.className),
    __css: styles.header
  }));
});
exports.PopoverHeader = PopoverHeader;

if (_utils.__DEV__) {
  PopoverHeader.displayName = "PopoverHeader";
}

/**
 * PopoverBody is the main content area for the popover. Should contain
 * at least one interactive element.
 */
var PopoverBody = /*#__PURE__*/(0, _system.forwardRef)(function (props, ref) {
  var _usePopoverContext4 = (0, _popoverContext.usePopoverContext)(),
      getBodyProps = _usePopoverContext4.getBodyProps;

  var styles = (0, _system.useStyles)();
  return /*#__PURE__*/React.createElement(_system.chakra.div, _extends({}, getBodyProps(props, ref), {
    className: (0, _utils.cx)("chakra-popover__body", props.className),
    __css: styles.body
  }));
});
exports.PopoverBody = PopoverBody;

if (_utils.__DEV__) {
  PopoverBody.displayName = "PopoverBody";
}

var PopoverFooter = function PopoverFooter(props) {
  var styles = (0, _system.useStyles)();
  return /*#__PURE__*/React.createElement(_system.chakra.footer, _extends({}, props, {
    className: (0, _utils.cx)("chakra-popover__footer", props.className),
    __css: styles.footer
  }));
};

exports.PopoverFooter = PopoverFooter;

if (_utils.__DEV__) {
  PopoverFooter.displayName = "PopoverFooter";
}

var PopoverCloseButton = function PopoverCloseButton(props) {
  var _usePopoverContext5 = (0, _popoverContext.usePopoverContext)(),
      onClose = _usePopoverContext5.onClose;

  var styles = (0, _system.useStyles)();
  return /*#__PURE__*/React.createElement(_closeButton.CloseButton, _extends({
    size: "sm",
    onClick: onClose,
    className: (0, _utils.cx)("chakra-popover__close-btn", props.className),
    __css: styles.closeButton
  }, props));
};

exports.PopoverCloseButton = PopoverCloseButton;

if (_utils.__DEV__) {
  PopoverCloseButton.displayName = "PopoverCloseButton";
}

var PopoverArrow = function PopoverArrow(props) {
  var _ref;

  var bg = props.bg,
      bgColor = props.bgColor,
      backgroundColor = props.backgroundColor;

  var _usePopoverContext6 = (0, _popoverContext.usePopoverContext)(),
      getArrowProps = _usePopoverContext6.getArrowProps,
      getArrowInnerProps = _usePopoverContext6.getArrowInnerProps;

  var styles = (0, _system.useStyles)();
  var arrowBg = (_ref = bg != null ? bg : bgColor) != null ? _ref : backgroundColor;
  return /*#__PURE__*/React.createElement(_system.chakra.div, _extends({}, getArrowProps(), {
    className: "chakra-popover__arrow-positioner"
  }), /*#__PURE__*/React.createElement(_system.chakra.div, _extends({
    className: (0, _utils.cx)("chakra-popover__arrow", props.className)
  }, getArrowInnerProps(props), {
    __css: _extends({}, styles.arrow, {
      "--popper-arrow-bg": arrowBg ? "colors." + arrowBg + ", " + arrowBg : undefined
    })
  })));
};

exports.PopoverArrow = PopoverArrow;

if (_utils.__DEV__) {
  PopoverArrow.displayName = "PopoverArrow";
}
//# sourceMappingURL=popover.js.map