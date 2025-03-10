function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { CloseButton } from "@chakra-ui/close-button";
import { FocusLock } from "@chakra-ui/focus-lock";
import { Portal } from "@chakra-ui/portal";
import { chakra, forwardRef, StylesProvider, useMultiStyleConfig, useStyles } from "@chakra-ui/system";
import { fadeConfig } from "@chakra-ui/transition";
import { callAllHandlers, cx, __DEV__ } from "@chakra-ui/utils";
import { createContext } from "@chakra-ui/react-utils";
import { AnimatePresence, motion, usePresence, createDomMotionComponent } from "framer-motion";
import * as React from "react";
import { RemoveScroll } from "react-remove-scroll";
import { ModalTransition } from "./modal-transition";
import { useModal } from "./use-modal";
var [ModalContextProvider, useModalContext] = createContext({
  strict: true,
  name: "ModalContext",
  errorMessage: "useModalContext: `context` is undefined. Seems you forgot to wrap modal components in `<Modal />`"
});
export { ModalContextProvider, useModalContext };
/**
 * Modal provides context, theming, and accessibility properties
 * to all other modal components.
 *
 * It doesn't render any DOM node.
 */

export var Modal = props => {
  var {
    portalProps,
    children,
    autoFocus,
    trapFocus,
    initialFocusRef,
    finalFocusRef,
    returnFocusOnClose,
    blockScrollOnMount,
    allowPinchZoom,
    preserveScrollBarGap,
    motionPreset,
    lockFocusAcrossFrames
  } = props;
  var styles = useMultiStyleConfig("Modal", props);
  var modal = useModal(props);

  var context = _extends({}, modal, {
    autoFocus,
    trapFocus,
    initialFocusRef,
    finalFocusRef,
    returnFocusOnClose,
    blockScrollOnMount,
    allowPinchZoom,
    preserveScrollBarGap,
    motionPreset,
    lockFocusAcrossFrames
  });

  return /*#__PURE__*/React.createElement(ModalContextProvider, {
    value: context
  }, /*#__PURE__*/React.createElement(StylesProvider, {
    value: styles
  }, /*#__PURE__*/React.createElement(AnimatePresence, null, context.isOpen && /*#__PURE__*/React.createElement(Portal, portalProps, children))));
};
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

if (__DEV__) {
  Modal.displayName = "Modal";
}

var MotionDiv = chakra(createDomMotionComponent("div"));
/**
 * ModalContent is used to group modal's content. It has all the
 * necessary `aria-*` properties to indicate that it is a modal
 */

export var ModalContent = /*#__PURE__*/forwardRef((props, ref) => {
  var {
    className,
    children,
    containerProps: rootProps
  } = props,
      rest = _objectWithoutPropertiesLoose(props, ["className", "children", "containerProps"]);

  var {
    getDialogProps,
    getDialogContainerProps
  } = useModalContext();
  var dialogProps = getDialogProps(rest, ref);
  var containerProps = getDialogContainerProps(rootProps);

  var _className = cx("chakra-modal__content", className);

  var styles = useStyles();

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

  var {
    motionPreset
  } = useModalContext();
  return /*#__PURE__*/React.createElement(ModalFocusScope, null, /*#__PURE__*/React.createElement(chakra.div, _extends({}, containerProps, {
    className: "chakra-modal__content-container" // tabindex="-1" means that the element is not reachable via sequential keyboard navigation, @see #4686
    ,
    tabIndex: -1,
    __css: dialogContainerStyles
  }), /*#__PURE__*/React.createElement(ModalTransition, _extends({
    preset: motionPreset,
    className: _className
  }, dialogProps, {
    __css: dialogStyles
  }), children)));
});

if (__DEV__) {
  ModalContent.displayName = "ModalContent";
}

export function ModalFocusScope(props) {
  var {
    autoFocus,
    trapFocus,
    dialogRef,
    initialFocusRef,
    blockScrollOnMount,
    allowPinchZoom,
    finalFocusRef,
    returnFocusOnClose,
    preserveScrollBarGap,
    lockFocusAcrossFrames
  } = useModalContext();
  var [isPresent, safeToRemove] = usePresence();
  React.useEffect(() => {
    if (!isPresent && safeToRemove) {
      setTimeout(safeToRemove);
    }
  }, [isPresent, safeToRemove]);
  return /*#__PURE__*/React.createElement(FocusLock, {
    autoFocus: autoFocus,
    isDisabled: !trapFocus,
    initialFocusRef: initialFocusRef,
    finalFocusRef: finalFocusRef,
    restoreFocus: returnFocusOnClose,
    contentRef: dialogRef,
    lockFocusAcrossFrames: lockFocusAcrossFrames
  }, /*#__PURE__*/React.createElement(RemoveScroll, {
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
export var ModalOverlay = /*#__PURE__*/forwardRef((props, ref) => {
  var {
    className
  } = props,
      rest = _objectWithoutPropertiesLoose(props, ["className", "transition"]);

  var _className = cx("chakra-modal__overlay", className);

  var styles = useStyles();

  var overlayStyle = _extends({
    pos: "fixed",
    left: "0",
    top: "0",
    w: "100vw",
    h: "100vh"
  }, styles.overlay);

  var {
    motionPreset
  } = useModalContext();
  var motionProps = motionPreset === "none" ? {} : fadeConfig;
  return /*#__PURE__*/React.createElement(MotionDiv, _extends({}, motionProps, {
    __css: overlayStyle,
    ref: ref,
    className: _className
  }, rest));
});

if (__DEV__) {
  ModalOverlay.displayName = "ModalOverlay";
}

/**
 * ModalHeader
 *
 * React component that houses the title of the modal.
 *
 * @see Docs https://chakra-ui.com/modal
 */
export var ModalHeader = /*#__PURE__*/forwardRef((props, ref) => {
  var {
    className
  } = props,
      rest = _objectWithoutPropertiesLoose(props, ["className"]);

  var {
    headerId,
    setHeaderMounted
  } = useModalContext();
  /**
   * Notify us if this component was rendered or used
   * so we can append `aria-labelledby` automatically
   */

  React.useEffect(() => {
    setHeaderMounted(true);
    return () => setHeaderMounted(false);
  }, [setHeaderMounted]);

  var _className = cx("chakra-modal__header", className);

  var styles = useStyles();

  var headerStyles = _extends({
    flex: "0 1 auto"
  }, styles.header);

  return /*#__PURE__*/React.createElement(chakra.header, _extends({
    ref: ref,
    className: _className,
    id: headerId
  }, rest, {
    __css: headerStyles
  }));
});

if (__DEV__) {
  ModalHeader.displayName = "ModalHeader";
}

/**
 * ModalBody
 *
 * React component that houses the main content of the modal.
 *
 * @see Docs https://chakra-ui.com/modal
 */
export var ModalBody = /*#__PURE__*/forwardRef((props, ref) => {
  var {
    className
  } = props,
      rest = _objectWithoutPropertiesLoose(props, ["className"]);

  var {
    bodyId,
    setBodyMounted
  } = useModalContext();
  /**
   * Notify us if this component was rendered or used
   * so we can append `aria-describedby` automatically
   */

  React.useEffect(() => {
    setBodyMounted(true);
    return () => setBodyMounted(false);
  }, [setBodyMounted]);

  var _className = cx("chakra-modal__body", className);

  var styles = useStyles();
  return /*#__PURE__*/React.createElement(chakra.div, _extends({
    ref: ref,
    className: _className,
    id: bodyId
  }, rest, {
    __css: styles.body
  }));
});

if (__DEV__) {
  ModalBody.displayName = "ModalBody";
}

/**
 * ModalFooter houses the action buttons of the modal.
 * @see Docs https://chakra-ui.com/modal
 */
export var ModalFooter = /*#__PURE__*/forwardRef((props, ref) => {
  var {
    className
  } = props,
      rest = _objectWithoutPropertiesLoose(props, ["className"]);

  var _className = cx("chakra-modal__footer", className);

  var styles = useStyles();

  var footerStyles = _extends({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end"
  }, styles.footer);

  return /*#__PURE__*/React.createElement(chakra.footer, _extends({
    ref: ref
  }, rest, {
    __css: footerStyles,
    className: _className
  }));
});

if (__DEV__) {
  ModalFooter.displayName = "ModalFooter";
}
/**
 * ModalCloseButton is used closes the modal.
 *
 * You don't need to pass the `onClick` to it, it reads the
 * `onClose` action from the modal context.
 */


export var ModalCloseButton = /*#__PURE__*/forwardRef((props, ref) => {
  var {
    onClick,
    className
  } = props,
      rest = _objectWithoutPropertiesLoose(props, ["onClick", "className"]);

  var {
    onClose
  } = useModalContext();

  var _className = cx("chakra-modal__close-btn", className);

  var styles = useStyles();
  return /*#__PURE__*/React.createElement(CloseButton, _extends({
    ref: ref,
    __css: styles.closeButton,
    className: _className,
    onClick: callAllHandlers(onClick, event => {
      event.stopPropagation();
      onClose();
    })
  }, rest));
});

if (__DEV__) {
  ModalCloseButton.displayName = "ModalCloseButton";
}
//# sourceMappingURL=modal.js.map