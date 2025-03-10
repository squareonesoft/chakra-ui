"use strict";

exports.__esModule = true;
exports.usePopper = usePopper;

var _reactUtils = require("@chakra-ui/react-utils");

var _core = require("@popperjs/core");

var _react = require("react");

var customModifiers = _interopRequireWildcard(require("./modifiers"));

var _popper = require("./popper.placement");

var _utils = require("./utils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function usePopper(props) {
  if (props === void 0) {
    props = {};
  }

  var _props = props,
      _props$enabled = _props.enabled,
      enabled = _props$enabled === void 0 ? true : _props$enabled,
      modifiers = _props.modifiers,
      _props$placement = _props.placement,
      placementProp = _props$placement === void 0 ? "bottom" : _props$placement,
      _props$strategy = _props.strategy,
      strategy = _props$strategy === void 0 ? "absolute" : _props$strategy,
      _props$arrowPadding = _props.arrowPadding,
      arrowPadding = _props$arrowPadding === void 0 ? 8 : _props$arrowPadding,
      _props$eventListeners = _props.eventListeners,
      eventListeners = _props$eventListeners === void 0 ? true : _props$eventListeners,
      offset = _props.offset,
      _props$gutter = _props.gutter,
      gutter = _props$gutter === void 0 ? 8 : _props$gutter,
      _props$flip = _props.flip,
      flip = _props$flip === void 0 ? true : _props$flip,
      _props$boundary = _props.boundary,
      boundary = _props$boundary === void 0 ? "clippingParents" : _props$boundary,
      _props$preventOverflo = _props.preventOverflow,
      preventOverflow = _props$preventOverflo === void 0 ? true : _props$preventOverflo,
      matchWidth = _props.matchWidth,
      _props$direction = _props.direction,
      direction = _props$direction === void 0 ? "ltr" : _props$direction;
  var reference = (0, _react.useRef)(null);
  var popper = (0, _react.useRef)(null);
  var instance = (0, _react.useRef)(null);
  var placement = (0, _popper.getPopperPlacement)(placementProp, direction);
  var cleanup = (0, _react.useRef)(function () {});
  var setupPopper = (0, _react.useCallback)(function () {
    if (!enabled || !reference.current || !popper.current) return; // If popper instance exists, destroy it so we can create a new one

    cleanup.current == null ? void 0 : cleanup.current();
    instance.current = (0, _core.createPopper)(reference.current, popper.current, {
      placement: placement,
      modifiers: [customModifiers.innerArrow, customModifiers.positionArrow, customModifiers.transformOrigin, _extends({}, customModifiers.matchWidth, {
        enabled: !!matchWidth
      }), _extends({
        name: "eventListeners"
      }, (0, _utils.getEventListenerOptions)(eventListeners)), {
        name: "arrow",
        options: {
          padding: arrowPadding
        }
      }, {
        name: "offset",
        options: {
          offset: offset != null ? offset : [0, gutter]
        }
      }, {
        name: "flip",
        enabled: !!flip,
        options: {
          padding: 8
        }
      }, {
        name: "preventOverflow",
        enabled: !!preventOverflow,
        options: {
          boundary: boundary
        }
      }].concat(modifiers != null ? modifiers : []),
      strategy: strategy
    }); // force update one-time to fix any positioning issues

    instance.current.forceUpdate();
    cleanup.current = instance.current.destroy;
  }, [placement, enabled, modifiers, matchWidth, eventListeners, arrowPadding, offset, gutter, flip, preventOverflow, boundary, strategy]);
  (0, _react.useEffect)(function () {
    return function () {
      /**
       * Fast refresh might call this function and tear down the popper
       * even if the reference still exists. This checks against that
       */
      if (!reference.current && !popper.current) {
        var _instance$current;

        (_instance$current = instance.current) == null ? void 0 : _instance$current.destroy();
        instance.current = null;
      }
    };
  }, []);
  var referenceRef = (0, _react.useCallback)(function (node) {
    reference.current = node;
    setupPopper();
  }, [setupPopper]);
  var getReferenceProps = (0, _react.useCallback)(function (props, ref) {
    if (props === void 0) {
      props = {};
    }

    if (ref === void 0) {
      ref = null;
    }

    return _extends({}, props, {
      ref: (0, _reactUtils.mergeRefs)(referenceRef, ref)
    });
  }, [referenceRef]);
  var popperRef = (0, _react.useCallback)(function (node) {
    popper.current = node;
    setupPopper();
  }, [setupPopper]);
  var getPopperProps = (0, _react.useCallback)(function (props, ref) {
    if (props === void 0) {
      props = {};
    }

    if (ref === void 0) {
      ref = null;
    }

    return _extends({}, props, {
      ref: (0, _reactUtils.mergeRefs)(popperRef, ref),
      style: _extends({}, props.style, {
        position: strategy,
        minWidth: "max-content",
        inset: "0 auto auto 0"
      })
    });
  }, [strategy, popperRef]);
  var getArrowProps = (0, _react.useCallback)(function (props, ref) {
    if (props === void 0) {
      props = {};
    }

    if (ref === void 0) {
      ref = null;
    }

    var _props2 = props,
        size = _props2.size,
        shadowColor = _props2.shadowColor,
        bg = _props2.bg,
        style = _props2.style,
        rest = _objectWithoutPropertiesLoose(_props2, ["size", "shadowColor", "bg", "style"]);

    return _extends({}, rest, {
      ref: ref,
      "data-popper-arrow": "",
      style: getArrowStyle(props)
    });
  }, []);
  var getArrowInnerProps = (0, _react.useCallback)(function (props, ref) {
    if (props === void 0) {
      props = {};
    }

    if (ref === void 0) {
      ref = null;
    }

    return _extends({}, props, {
      ref: ref,
      "data-popper-arrow-inner": ""
    });
  }, []);
  return {
    update: function update() {
      var _instance$current2;

      (_instance$current2 = instance.current) == null ? void 0 : _instance$current2.update();
    },
    forceUpdate: function forceUpdate() {
      var _instance$current3;

      (_instance$current3 = instance.current) == null ? void 0 : _instance$current3.forceUpdate();
    },
    transformOrigin: _utils.cssVars.transformOrigin.varRef,
    referenceRef: referenceRef,
    popperRef: popperRef,
    getPopperProps: getPopperProps,
    getArrowProps: getArrowProps,
    getArrowInnerProps: getArrowInnerProps,
    getReferenceProps: getReferenceProps
  };
}

function getArrowStyle(props) {
  var size = props.size,
      shadowColor = props.shadowColor,
      bg = props.bg,
      style = props.style;

  var computedStyle = _extends({}, style, {
    position: "absolute"
  });

  if (size) {
    computedStyle["--popper-arrow-size"] = size;
  }

  if (shadowColor) {
    computedStyle["--popper-arrow-shadow-color"] = shadowColor;
  }

  if (bg) {
    computedStyle["--popper-arrow-bg"] = bg;
  }

  return computedStyle;
}
//# sourceMappingURL=use-popper.js.map