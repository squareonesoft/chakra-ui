function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { chakra, forwardRef, layoutPropNames, omitThemingProps, useMultiStyleConfig } from "@chakra-ui/system";
import { callAll, split, __DEV__ } from "@chakra-ui/utils";
import * as React from "react";
import { useRadioGroupContext } from "./radio-group";
import { useRadio } from "./use-radio";

/**
 * Radio component is used in forms when a user needs to select a single value from
 * several options.
 *
 * @see Docs https://chakra-ui.com/radio
 */
export var Radio = /*#__PURE__*/forwardRef((props, ref) => {
  var _props$name;

  var group = useRadioGroupContext();
  var {
    onChange: onChangeProp,
    value: valueProp
  } = props;
  var styles = useMultiStyleConfig("Radio", _extends({}, group, props));
  var ownProps = omitThemingProps(props);

  var {
    spacing = "0.5rem",
    children,
    isFullWidth,
    isDisabled = group == null ? void 0 : group.isDisabled,
    isFocusable = group == null ? void 0 : group.isFocusable
  } = ownProps,
      rest = _objectWithoutPropertiesLoose(ownProps, ["spacing", "children", "isFullWidth", "isDisabled", "isFocusable"]);

  var isChecked = props.isChecked;

  if ((group == null ? void 0 : group.value) != null && valueProp != null) {
    isChecked = group.value === valueProp;
  }

  var onChange = onChangeProp;

  if (group != null && group.onChange && valueProp != null) {
    onChange = callAll(group.onChange, onChangeProp);
  }

  var name = (_props$name = props == null ? void 0 : props.name) != null ? _props$name : group == null ? void 0 : group.name;
  var {
    getInputProps,
    getCheckboxProps,
    getLabelProps,
    getRootProps,
    htmlProps
  } = useRadio(_extends({}, rest, {
    isChecked,
    isFocusable,
    isDisabled,
    onChange,
    name
  }));
  var [layoutProps, otherProps] = split(htmlProps, layoutPropNames);
  var checkboxProps = getCheckboxProps(otherProps);
  var inputProps = getInputProps({}, ref);
  var labelProps = getLabelProps();
  var rootProps = Object.assign({}, layoutProps, getRootProps());

  var rootStyles = _extends({
    width: isFullWidth ? "full" : undefined,
    display: "inline-flex",
    alignItems: "center",
    verticalAlign: "top"
  }, styles.container);

  var checkboxStyles = _extends({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0
  }, styles.control);

  var labelStyles = _extends({
    userSelect: "none",
    marginStart: spacing
  }, styles.label);

  return /*#__PURE__*/React.createElement(chakra.label, _extends({
    className: "chakra-radio"
  }, rootProps, {
    __css: rootStyles
  }), /*#__PURE__*/React.createElement("input", _extends({
    className: "chakra-radio__input"
  }, inputProps)), /*#__PURE__*/React.createElement(chakra.span, _extends({
    className: "chakra-radio__control"
  }, checkboxProps, {
    __css: checkboxStyles
  })), children && /*#__PURE__*/React.createElement(chakra.span, _extends({
    className: "chakra-radio__label"
  }, labelProps, {
    __css: labelStyles
  }), children));
});

if (__DEV__) {
  Radio.displayName = "Radio";
}
//# sourceMappingURL=radio.js.map