function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { mergeRefs } from "@chakra-ui/react-utils";
import { createPopper } from "@popperjs/core";
import { useCallback, useEffect, useRef } from "react";
import * as customModifiers from "./modifiers";
import { getPopperPlacement } from "./popper.placement";
import { cssVars, getEventListenerOptions } from "./utils";
export function usePopper(props) {
  if (props === void 0) {
    props = {};
  }

  var {
    enabled = true,
    modifiers,
    placement: placementProp = "bottom",
    strategy = "absolute",
    arrowPadding = 8,
    eventListeners = true,
    offset,
    gutter = 8,
    flip = true,
    boundary = "clippingParents",
    preventOverflow = true,
    matchWidth,
    direction = "ltr"
  } = props;
  var reference = useRef(null);
  var popper = useRef(null);
  var instance = useRef(null);
  var placement = getPopperPlacement(placementProp, direction);
  var cleanup = useRef(() => {});
  var setupPopper = useCallback(() => {
    if (!enabled || !reference.current || !popper.current) return; // If popper instance exists, destroy it so we can create a new one

    cleanup.current == null ? void 0 : cleanup.current();
    instance.current = createPopper(reference.current, popper.current, {
      placement,
      modifiers: [customModifiers.innerArrow, customModifiers.positionArrow, customModifiers.transformOrigin, _extends({}, customModifiers.matchWidth, {
        enabled: !!matchWidth
      }), _extends({
        name: "eventListeners"
      }, getEventListenerOptions(eventListeners)), {
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
          boundary
        }
      }, // allow users override internal modifiers
      ...(modifiers != null ? modifiers : [])],
      strategy
    }); // force update one-time to fix any positioning issues

    instance.current.forceUpdate();
    cleanup.current = instance.current.destroy;
  }, [placement, enabled, modifiers, matchWidth, eventListeners, arrowPadding, offset, gutter, flip, preventOverflow, boundary, strategy]);
  useEffect(() => {
    return () => {
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
  var referenceRef = useCallback(node => {
    reference.current = node;
    setupPopper();
  }, [setupPopper]);
  var getReferenceProps = useCallback(function (props, ref) {
    if (props === void 0) {
      props = {};
    }

    if (ref === void 0) {
      ref = null;
    }

    return _extends({}, props, {
      ref: mergeRefs(referenceRef, ref)
    });
  }, [referenceRef]);
  var popperRef = useCallback(node => {
    popper.current = node;
    setupPopper();
  }, [setupPopper]);
  var getPopperProps = useCallback(function (props, ref) {
    if (props === void 0) {
      props = {};
    }

    if (ref === void 0) {
      ref = null;
    }

    return _extends({}, props, {
      ref: mergeRefs(popperRef, ref),
      style: _extends({}, props.style, {
        position: strategy,
        minWidth: "max-content",
        inset: "0 auto auto 0"
      })
    });
  }, [strategy, popperRef]);
  var getArrowProps = useCallback(function (props, ref) {
    if (props === void 0) {
      props = {};
    }

    if (ref === void 0) {
      ref = null;
    }

    var rest = _objectWithoutPropertiesLoose(props, ["size", "shadowColor", "bg", "style"]);

    return _extends({}, rest, {
      ref,
      "data-popper-arrow": "",
      style: getArrowStyle(props)
    });
  }, []);
  var getArrowInnerProps = useCallback(function (props, ref) {
    if (props === void 0) {
      props = {};
    }

    if (ref === void 0) {
      ref = null;
    }

    return _extends({}, props, {
      ref,
      "data-popper-arrow-inner": ""
    });
  }, []);
  return {
    update() {
      var _instance$current2;

      (_instance$current2 = instance.current) == null ? void 0 : _instance$current2.update();
    },

    forceUpdate() {
      var _instance$current3;

      (_instance$current3 = instance.current) == null ? void 0 : _instance$current3.forceUpdate();
    },

    transformOrigin: cssVars.transformOrigin.varRef,
    referenceRef,
    popperRef,
    getPopperProps,
    getArrowProps,
    getArrowInnerProps,
    getReferenceProps
  };
}

function getArrowStyle(props) {
  var {
    size,
    shadowColor,
    bg,
    style
  } = props;

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