"use strict";

exports.__esModule = true;
exports.useRadio = useRadio;

var _formControl = require("@chakra-ui/form-control");

var _hooks = require("@chakra-ui/hooks");

var _reactUtils = require("@chakra-ui/react-utils");

var _utils = require("@chakra-ui/utils");

var _visuallyHidden = require("@chakra-ui/visually-hidden");

var _react = require("react");

var _radioGroup = require("./radio-group");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function useRadio(props) {
  if (props === void 0) {
    props = {};
  }

  var _props = props,
      defaultIsChecked = _props.defaultIsChecked,
      _props$defaultChecked = _props.defaultChecked,
      defaultChecked = _props$defaultChecked === void 0 ? defaultIsChecked : _props$defaultChecked,
      isCheckedProp = _props.isChecked,
      isFocusable = _props.isFocusable,
      isDisabledProp = _props.isDisabled,
      isReadOnlyProp = _props.isReadOnly,
      isRequiredProp = _props.isRequired,
      onChange = _props.onChange,
      isInvalidProp = _props.isInvalid,
      name = _props.name,
      value = _props.value,
      idProp = _props.id,
      dataRadioGroup = _props["data-radiogroup"],
      htmlProps = _objectWithoutPropertiesLoose(_props, ["defaultIsChecked", "defaultChecked", "isChecked", "isFocusable", "isDisabled", "isReadOnly", "isRequired", "onChange", "isInvalid", "name", "value", "id", "data-radiogroup"]);

  var uuid = (0, _hooks.useId)(undefined, "radio");
  var formControl = (0, _formControl.useFormControlContext)();
  var group = (0, _radioGroup.useRadioGroupContext)();
  var isWithinRadioGroup = !!group || !!dataRadioGroup;
  var isWithinFormControl = !!formControl;
  var id = isWithinFormControl && !isWithinRadioGroup ? formControl.id : uuid;
  id = idProp != null ? idProp : id;
  var isDisabled = isDisabledProp != null ? isDisabledProp : formControl == null ? void 0 : formControl.isDisabled;
  var isReadOnly = isReadOnlyProp != null ? isReadOnlyProp : formControl == null ? void 0 : formControl.isReadOnly;
  var isRequired = isRequiredProp != null ? isRequiredProp : formControl == null ? void 0 : formControl.isRequired;
  var isInvalid = isInvalidProp != null ? isInvalidProp : formControl == null ? void 0 : formControl.isInvalid;

  var _useBoolean = (0, _hooks.useBoolean)(),
      isFocused = _useBoolean[0],
      setFocused = _useBoolean[1];

  var _useBoolean2 = (0, _hooks.useBoolean)(),
      isHovered = _useBoolean2[0],
      setHovering = _useBoolean2[1];

  var _useBoolean3 = (0, _hooks.useBoolean)(),
      isActive = _useBoolean3[0],
      setActive = _useBoolean3[1];

  var ref = (0, _react.useRef)(null);

  var _useState = (0, _react.useState)(Boolean(defaultChecked)),
      isCheckedState = _useState[0],
      setChecked = _useState[1];

  var _useControllableProp = (0, _hooks.useControllableProp)(isCheckedProp, isCheckedState),
      isControlled = _useControllableProp[0],
      isChecked = _useControllableProp[1];

  (0, _utils.warn)({
    condition: !!defaultIsChecked,
    message: 'The "defaultIsChecked" prop has been deprecated and will be removed in a future version. ' + 'Please use the "defaultChecked" prop instead, which mirrors default React checkbox behavior.'
  });
  var handleChange = (0, _react.useCallback)(function (event) {
    if (isReadOnly || isDisabled) {
      event.preventDefault();
      return;
    }

    if (!isControlled) {
      setChecked(event.target.checked);
    }

    onChange == null ? void 0 : onChange(event);
  }, [isControlled, isDisabled, isReadOnly, onChange]);
  var onKeyDown = (0, _react.useCallback)(function (event) {
    if (event.key === " ") {
      setActive.on();
    }
  }, [setActive]);
  var onKeyUp = (0, _react.useCallback)(function (event) {
    if (event.key === " ") {
      setActive.off();
    }
  }, [setActive]);
  var getCheckboxProps = (0, _react.useCallback)(function (props, ref) {
    if (props === void 0) {
      props = {};
    }

    if (ref === void 0) {
      ref = null;
    }

    return _extends({}, props, {
      ref: ref,
      "data-active": (0, _utils.dataAttr)(isActive),
      "data-hover": (0, _utils.dataAttr)(isHovered),
      "data-disabled": (0, _utils.dataAttr)(isDisabled),
      "data-invalid": (0, _utils.dataAttr)(isInvalid),
      "data-checked": (0, _utils.dataAttr)(isChecked),
      "data-focus": (0, _utils.dataAttr)(isFocused),
      "data-readonly": (0, _utils.dataAttr)(isReadOnly),
      "aria-hidden": true,
      onMouseDown: (0, _utils.callAllHandlers)(props.onMouseDown, setActive.on),
      onMouseUp: (0, _utils.callAllHandlers)(props.onMouseUp, setActive.off),
      onMouseEnter: (0, _utils.callAllHandlers)(props.onMouseEnter, setHovering.on),
      onMouseLeave: (0, _utils.callAllHandlers)(props.onMouseLeave, setHovering.off)
    });
  }, [isActive, isHovered, isDisabled, isInvalid, isChecked, isFocused, isReadOnly, setActive.on, setActive.off, setHovering.on, setHovering.off]);

  var _ref = formControl != null ? formControl : {},
      onFocus = _ref.onFocus,
      onBlur = _ref.onBlur;

  var getInputProps = (0, _react.useCallback)(function (props, forwardedRef) {
    if (props === void 0) {
      props = {};
    }

    if (forwardedRef === void 0) {
      forwardedRef = null;
    }

    var trulyDisabled = isDisabled && !isFocusable;
    return _extends({}, props, {
      id: id,
      ref: (0, _reactUtils.mergeRefs)(forwardedRef, ref),
      type: "radio",
      name: name,
      value: value,
      onChange: (0, _utils.callAllHandlers)(props.onChange, handleChange),
      onBlur: (0, _utils.callAllHandlers)(onBlur, props.onBlur, setFocused.off),
      onFocus: (0, _utils.callAllHandlers)(onFocus, props.onFocus, setFocused.on),
      onKeyDown: (0, _utils.callAllHandlers)(props.onKeyDown, onKeyDown),
      onKeyUp: (0, _utils.callAllHandlers)(props.onKeyUp, onKeyUp),
      checked: isChecked,
      disabled: trulyDisabled,
      readOnly: isReadOnly,
      required: isRequired,
      "aria-invalid": (0, _utils.ariaAttr)(isInvalid),
      "aria-disabled": (0, _utils.ariaAttr)(trulyDisabled),
      "aria-required": (0, _utils.ariaAttr)(isRequired),
      "data-readonly": (0, _utils.dataAttr)(isReadOnly),
      style: _visuallyHidden.visuallyHiddenStyle
    });
  }, [isDisabled, isFocusable, id, name, value, handleChange, onBlur, setFocused, onFocus, onKeyDown, onKeyUp, isChecked, isReadOnly, isRequired, isInvalid]);

  var getLabelProps = function getLabelProps(props, ref) {
    if (props === void 0) {
      props = {};
    }

    if (ref === void 0) {
      ref = null;
    }

    return _extends({}, props, {
      ref: ref,
      onMouseDown: (0, _utils.callAllHandlers)(props.onMouseDown, stop),
      onTouchStart: (0, _utils.callAllHandlers)(props.onTouchStart, stop),
      "data-disabled": (0, _utils.dataAttr)(isDisabled),
      "data-checked": (0, _utils.dataAttr)(isChecked),
      "data-invalid": (0, _utils.dataAttr)(isInvalid)
    });
  };

  var getRootProps = function getRootProps(props, ref) {
    if (ref === void 0) {
      ref = null;
    }

    return _extends({}, props, {
      ref: ref,
      "data-disabled": (0, _utils.dataAttr)(isDisabled),
      "data-checked": (0, _utils.dataAttr)(isChecked),
      "data-invalid": (0, _utils.dataAttr)(isInvalid)
    });
  };

  return {
    state: {
      isInvalid: isInvalid,
      isFocused: isFocused,
      isChecked: isChecked,
      isActive: isActive,
      isHovered: isHovered,
      isDisabled: isDisabled,
      isReadOnly: isReadOnly,
      isRequired: isRequired
    },
    getCheckboxProps: getCheckboxProps,
    getInputProps: getInputProps,
    getLabelProps: getLabelProps,
    getRootProps: getRootProps,
    htmlProps: htmlProps
  };
}
/**
 * Prevent `onBlur` being fired when the checkbox label is touched
 */


function stop(event) {
  event.preventDefault();
  event.stopPropagation();
}
//# sourceMappingURL=use-radio.js.map