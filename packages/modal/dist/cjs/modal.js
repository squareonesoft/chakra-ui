"use strict";

exports.__esModule = true;
exports.ModalFocusScope = ModalFocusScope;
exports.ModalCloseButton = exports.ModalFooter = exports.ModalBody = exports.ModalHeader = exports.ModalOverlay = exports.ModalContent = exports.Modal = exports.useModalContext = exports.ModalContextProvider = void 0;

var _closeButton = require("@chakra-ui/close-button");

var _focusLock = require("@chakra-ui/focus-lock");

var _portal = require("@chakra-ui/portal");

var _system = require("@chakra-ui/system");

var _transition = require("@chakra-ui/transition");

var _utils = require("@chakra-ui/utils");

var _reactUtils = require("@chakra-ui/react-utils");

var _framerMotion = require("framer-motion");

var React = _interopRequireWildcard(require("react"));

var _reactRemoveScroll = require("react-remove-scroll");

var _modalTransition = require("./modal-transition");

var _useModal = require("./use-modal");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var _createContext = (0, _reactUtils.createContext)({
  strict: true,
  name: "ModalContext",
  errorMessage: "useModalContext: `context` is undefined. Seems you forgot to wrap modal components in `<Modal />`"
}),
    ModalContextProvider = _createContext[0],
    useModalContext = _createContext[1];

exports.useModalContext = useModalContext;
exports.ModalContextProvider = ModalContextProvider;

/**
 * Modal provides context, theming, and accessibility properties
 * to all other modal components.
 *
 * It doesn't render any DOM node.
 */
var Modal = function Modal(props) {
  var portalProps = props.portalProps,
      children = props.children,
      autoFocus = props.autoFocus,
      trapFocus = props.trapFocus,
      initialFocusRef = props.initialFocusRef,
      finalFocusRef = props.finalFocusRef,
      returnFocusOnClose = props.returnFocusOnClose,
      blockScrollOnMount = props.blockScrollOnMount,
      allowPinchZoom = props.allowPinchZoom,
      preserveScrollBarGap = props.preserveScrollBarGap,
      motionPreset = props.motionPreset,
      lockFocusAcrossFrames = props.lockFocusAcrossFrames;
  var styles = (0, _system.useMultiStyleConfig)("Modal", props);
  var modal = (0, _useModal.useModal)(props);

  var context = _extends({}, modal, {
    autoFocus: autoFocus,
    trapFocus: trapFocus,
    initialFocusRef: initialFocusRef,
    finalFocusRef: finalFocusRef,
    returnFocusOnClose: returnFocusOnClose,
    blockScrollOnMount: blockScrollOnMount,
    allowPinchZoom: allowPinchZoom,
    preserveScrollBarGap: preserveScrollBarGap,
    motionPreset: motionPreset,
    lockFocusAcrossFrames: lockFocusAcrossFrames
  });

  return /*#__PURE__*/React.createElement(ModalContextProvider, {
    value: context
  }, /*#__PURE__*/React.createElement(_system.StylesProvider, {
    value: styles
  }, /*#__PURE__*/React.createElement(_framerMotion.AnimatePresence, null, context.isOpen && /*#__PURE__*/React.createElement(_portal.Portal, portalProps, children))));
};

exports.Modal = Modal;
Modal.defaultProps = {
  lockFocusAcrossFrames: true,
  returnFocusOnClose: true,
  scrollBehavior: "outside",
  trapFocus: true,
  autoFocus: true,
  blockScrollOnMount: true,
  allowPinchZoom: false,
  motionPreset: "scale"
};

if (_utils.__DEV__) {
  Modal.displayName = "Modal";
}

var MotionDiv = (0, _system.chakra)(_framerMotion.createDomMotionComponent("div"));
/**
 * ModalContent is used to group modal's content. It has all the
 * necessary `aria-*` properties to indicate that it is a modal
 */

var ModalContent = /*#__PURE__*/(0, _system.forwardRef)(function (props, ref) {
  var className = props.className,
      children = props.children,
      rootProps = props.containerProps,
      rest = _objectWithoutPropertiesLoose(props, ["className", "children", "containerProps"]);

  var _useModalContext = useModalContext(),
      getDialogProps = _useModalContext.getDialogProps,
      getDialogContainerProps = _useModalContext.getDialogContainerProps;

  var dialogProps = getDialogProps(rest, ref);
  var containerProps = getDialogContainerProps(rootProps);

  var _className = (0, _utils.cx)("chakra-modal__content", className);

  var styles = (0, _system.useStyles)();

  var dialogStyles = _extends({
    display: "flex",
    flexDirection: "column",
    position: "relative",
    width: "100%",
    outline: 0
  }, styles.dialog);

  var dialogContainerStyles = _extends({
    display: "flex",
    width: "100vw",
    height: "100vh",
    "@supports(height: -webkit-fill-available)": {
      height: "-webkit-fill-available"
    },
    position: "fixed",
    left: 0,
    top: 0
  }, styles.dialogContainer);

  var _useModalContext2 = useModalContext(),
      motionPreset = _useModalContext2.motionPreset;

  return /*#__PURE__*/React.createElement(ModalFocusScope, null, /*#__PURE__*/React.createElement(_system.chakra.div, _extends({}, containerProps, {
    className: "chakra-modal__content-container" // tabindex="-1" means that the element is not reachable via sequential keyboard navigation, @see #4686
    ,
    tabIndex: -1,
    __css: dialogContainerStyles
  }), /*#__PURE__*/React.createElement(_modalTransition.ModalTransition, _extends({
    preset: motionPreset,
    className: _className
  }, dialogProps, {
    __css: dialogStyles
  }), children)));
});
exports.ModalContent = ModalContent;

if (_utils.__DEV__) {
  ModalContent.displayName = "ModalContent";
}

function ModalFocusScope(props) {
  var _useModalContext3 = useModalContext(),
      autoFocus = _useModalContext3.autoFocus,
      trapFocus = _useModalContext3.trapFocus,
      dialogRef = _useModalContext3.dialogRef,
      initialFocusRef = _useModalContext3.initialFocusRef,
      blockScrollOnMount = _useModalContext3.blockScrollOnMount,
      allowPinchZoom = _useModalContext3.allowPinchZoom,
      finalFocusRef = _useModalContext3.finalFocusRef,
      returnFocusOnClose = _useModalContext3.returnFocusOnClose,
      preserveScrollBarGap = _useModalContext3.preserveScrollBarGap,
      lockFocusAcrossFrames = _useModalContext3.lockFocusAcrossFrames;

  var _usePresence = (0, _framerMotion.usePresence)(),
      isPresent = _usePresence[0],
      safeToRemove = _usePresence[1];

  React.useEffect(function () {
    if (!isPresent && safeToRemove) {
      setTimeout(safeToRemove);
    }
  }, [isPresent, safeToRemove]);
  return /*#__PURE__*/React.createElement(_focusLock.FocusLock, {
    autoFocus: autoFocus,
    isDisabled: !trapFocus,
    initialFocusRef: initialFocusRef,
    finalFocusRef: finalFocusRef,
    restoreFocus: returnFocusOnClose,
    contentRef: dialogRef,
    lockFocusAcrossFrames: lockFocusAcrossFrames
  }, /*#__PURE__*/React.createElement(_reactRemoveScroll.RemoveScroll, {
    removeScrollBar: !preserveScrollBarGap,
    allowPinchZoom: allowPinchZoom,
    enabled: blockScrollOnMount,
    forwardProps: true
  }, props.children));
}

/**
 * ModalOverlay renders a backdrop behind the modal. It is
 * also used as a wrapper for the modal content for better positioning.
 *
 * @see Docs https://chakra-ui.com/modal
 */
var ModalOverlay = /*#__PURE__*/(0, _system.forwardRef)(function (props, ref) {
  var className = props.className,
      transition = props.transition,
      rest = _objectWithoutPropertiesLoose(props, ["className", "transition"]);

  var _className = (0, _utils.cx)("chakra-modal__overlay", className);

  var styles = (0, _system.useStyles)();

  var overlayStyle = _extends({
    pos: "fixed",
    left: "0",
    top: "0",
    w: "100vw",
    h: "100vh"
  }, styles.overlay);

  var _useModalContext4 = useModalContext(),
      motionPreset = _useModalContext4.motionPreset;

  var motionProps = motionPreset === "none" ? {} : _transition.fadeConfig;
  return /*#__PURE__*/React.createElement(MotionDiv, _extends({}, motionProps, {
    __css: overlayStyle,
    ref: ref,
    className: _className
  }, rest));
});
exports.ModalOverlay = ModalOverlay;

if (_utils.__DEV__) {
  ModalOverlay.displayName = "ModalOverlay";
}

/**
 * ModalHeader
 *
 * React component that houses the title of the modal.
 *
 * @see Docs https://chakra-ui.com/modal
 */
var ModalHeader = /*#__PURE__*/(0, _system.forwardRef)(function (props, ref) {
  var className = props.className,
      rest = _objectWithoutPropertiesLoose(props, ["className"]);

  var _useModalContext5 = useModalContext(),
      headerId = _useModalContext5.headerId,
      setHeaderMounted = _useModalContext5.setHeaderMounted;
  /**
   * Notify us if this component was rendered or used
   * so we can append `aria-labelledby` automatically
   */


  React.useEffect(function () {
    setHeaderMounted(true);
    return function () {
      return setHeaderMounted(false);
    };
  }, [setHeaderMounted]);

  var _className = (0, _utils.cx)("chakra-modal__header", className);

  var styles = (0, _system.useStyles)();

  var headerStyles = _extends({
    flex: "0 1 auto"
  }, styles.header);

  return /*#__PURE__*/React.createElement(_system.chakra.header, _extends({
    ref: ref,
    className: _className,
    id: headerId
  }, rest, {
    __css: headerStyles
  }));
});
exports.ModalHeader = ModalHeader;

if (_utils.__DEV__) {
  ModalHeader.displayName = "ModalHeader";
}

/**
 * ModalBody
 *
 * React component that houses the main content of the modal.
 *
 * @see Docs https://chakra-ui.com/modal
 */
var ModalBody = /*#__PURE__*/(0, _system.forwardRef)(function (props, ref) {
  var className = props.className,
      rest = _objectWithoutPropertiesLoose(props, ["className"]);

  var _useModalContext6 = useModalContext(),
      bodyId = _useModalContext6.bodyId,
      setBodyMounted = _useModalContext6.setBodyMounted;
  /**
   * Notify us if this component was rendered or used
   * so we can append `aria-describedby` automatically
   */


  React.useEffect(function () {
    setBodyMounted(true);
    return function () {
      return setBodyMounted(false);
    };
  }, [setBodyMounted]);

  var _className = (0, _utils.cx)("chakra-modal__body", className);

  var styles = (0, _system.useStyles)();
  return /*#__PURE__*/React.createElement(_system.chakra.div, _extends({
    ref: ref,
    className: _className,
    id: bodyId
  }, rest, {
    __css: styles.body
  }));
});
exports.ModalBody = ModalBody;

if (_utils.__DEV__) {
  ModalBody.displayName = "ModalBody";
}

/**
 * ModalFooter houses the action buttons of the modal.
 * @see Docs https://chakra-ui.com/modal
 */
var ModalFooter = /*#__PURE__*/(0, _system.forwardRef)(function (props, ref) {
  var className = props.className,
      rest = _objectWithoutPropertiesLoose(props, ["className"]);

  var _className = (0, _utils.cx)("chakra-modal__footer", className);

  var styles = (0, _system.useStyles)();

  var footerStyles = _extends({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end"
  }, styles.footer);

  return /*#__PURE__*/React.createElement(_system.chakra.footer, _extends({
    ref: ref
  }, rest, {
    __css: footerStyles,
    className: _className
  }));
});
exports.ModalFooter = ModalFooter;

if (_utils.__DEV__) {
  ModalFooter.displayName = "ModalFooter";
}
/**
 * ModalCloseButton is used closes the modal.
 *
 * You don't need to pass the `onClick` to it, it reads the
 * `onClose` action from the modal context.
 */


var ModalCloseButton = /*#__PURE__*/(0, _system.forwardRef)(function (props, ref) {
  var onClick = props.onClick,
      className = props.className,
      rest = _objectWithoutPropertiesLoose(props, ["onClick", "className"]);

  var _useModalContext7 = useModalContext(),
      onClose = _useModalContext7.onClose;

  var _className = (0, _utils.cx)("chakra-modal__close-btn", className);

  var styles = (0, _system.useStyles)();
  return /*#__PURE__*/React.createElement(_closeButton.CloseButton, _extends({
    ref: ref,
    __css: styles.closeButton,
    className: _className,
    onClick: (0, _utils.callAllHandlers)(onClick, function (event) {
      event.stopPropagation();
      onClose();
    })
  }, rest));
});
exports.ModalCloseButton = ModalCloseButton;

if (_utils.__DEV__) {
  ModalCloseButton.displayName = "ModalCloseButton";
}
//# sourceMappingURL=modal.js.map