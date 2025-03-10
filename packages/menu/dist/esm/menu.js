function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import { chakra, forwardRef, omitThemingProps, StylesProvider, useMultiStyleConfig, useStyles, useTheme } from "@chakra-ui/system";
import { cx, runIfFn, __DEV__ } from "@chakra-ui/utils";
import { motion, createDomMotionComponent } from "framer-motion";
import * as React from "react";
import { MenuDescendantsProvider, MenuProvider, useMenu, useMenuButton, useMenuContext, useMenuItem, useMenuList, useMenuOption, useMenuOptionGroup, useMenuPositioner } from "./use-menu";

/**
 * Menu provides context, state, and focus management
 * to its sub-components. It doesn't render any DOM node.
 */
export var Menu = props => {
  var {
    children
  } = props;
  var styles = useMultiStyleConfig("Menu", props);
  var ownProps = omitThemingProps(props);
  var {
    direction
  } = useTheme();

  var _useMenu = useMenu(_extends({}, ownProps, {
    direction
  })),
      {
    descendants
  } = _useMenu,
      ctx = _objectWithoutPropertiesLoose(_useMenu, ["descendants"]);

  var context = React.useMemo(() => ctx, [ctx]);
  var {
    isOpen,
    onClose,
    forceUpdate
  } = context;
  return /*#__PURE__*/React.createElement(MenuDescendantsProvider, {
    value: descendants
  }, /*#__PURE__*/React.createElement(MenuProvider, {
    value: context
  }, /*#__PURE__*/React.createElement(StylesProvider, {
    value: styles
  }, runIfFn(children, {
    isOpen,
    onClose,
    forceUpdate
  }))));
};

if (__DEV__) {
  Menu.displayName = "Menu";
}

var StyledMenuButton = /*#__PURE__*/forwardRef((props, ref) => {
  var styles = useStyles();
  return /*#__PURE__*/React.createElement(chakra.button, _extends({
    ref: ref
  }, props, {
    __css: _extends({
      display: "inline-flex",
      appearance: "none",
      alignItems: "center",
      outline: 0
    }, styles.button)
  }));
});
/**
 * The trigger for the menu list. Must be a direct child of `Menu`.
 */

export var MenuButton = /*#__PURE__*/forwardRef((props, ref) => {
  var {
    as: As
  } = props,
      rest = _objectWithoutPropertiesLoose(props, ["children", "as"]);

  var buttonProps = useMenuButton(rest, ref);
  var Element = As || StyledMenuButton;
  return /*#__PURE__*/React.createElement(Element, _extends({}, buttonProps, {
    className: cx("chakra-menu__menu-button", props.className)
  }), /*#__PURE__*/React.createElement(chakra.span, {
    __css: {
      pointerEvents: "none",
      flex: "1 1 auto",
      minW: 0
    }
  }, props.children));
});

if (__DEV__) {
  MenuButton.displayName = "MenuButton";
}

var motionVariants = {
  enter: {
    visibility: "visible",
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1]
    }
  },
  exit: {
    transitionEnd: {
      visibility: "hidden"
    },
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.1,
      easings: "easeOut"
    }
  }
}; // @future: only call `motion(chakra.div)` when we drop framer-motion v3 support

var MotionDiv = "custom" in motion ? motion.custom(chakra.div) : motion(chakra.div);
export var MenuList = /*#__PURE__*/forwardRef((props, ref) => {
  var _props$zIndex, _styles$list;

  var {
    rootProps
  } = props,
      rest = _objectWithoutPropertiesLoose(props, ["rootProps"]);

  var {
    isOpen,
    onTransitionEnd
  } = useMenuContext();
  var menulistProps = useMenuList(rest, ref);
  var positionerProps = useMenuPositioner(rootProps);
  var styles = useStyles();
  return /*#__PURE__*/React.createElement(chakra.div, _extends({}, positionerProps, {
    __css: {
      zIndex: (_props$zIndex = props.zIndex) != null ? _props$zIndex : (_styles$list = styles.list) == null ? void 0 : _styles$list.zIndex
    }
  }), /*#__PURE__*/React.createElement(MotionDiv, _extends({}, menulistProps, {
    /**
     * We could call this on either `onAnimationComplete` or `onUpdate`.
     * It seems the re-focusing works better with the `onUpdate`
     */
    onUpdate: onTransitionEnd,
    className: cx("chakra-menu__menu-list", menulistProps.className),
    variants: motionVariants,
    initial: false,
    animate: isOpen ? "enter" : "exit",
    __css: _extends({
      outline: 0
    }, styles.list)
  })));
});

if (__DEV__) {
  MenuList.displayName = "MenuList";
}

var StyledMenuItem = /*#__PURE__*/forwardRef((props, ref) => {
  var {
    type
  } = props,
      rest = _objectWithoutPropertiesLoose(props, ["type"]);

  var styles = useStyles();
  /**
   * Given another component, use its type if present
   * Else, use no type to avoid invalid html, e.g. <a type="button" />
   * Else, fall back to "button"
   */

  var btnType = rest.as ? type != null ? type : undefined : "button";

  var buttonStyles = _extends({
    textDecoration: "none",
    color: "inherit",
    userSelect: "none",
    display: "flex",
    width: "100%",
    alignItems: "center",
    textAlign: "start",
    flex: "0 0 auto",
    outline: 0
  }, styles.item);

  return /*#__PURE__*/React.createElement(chakra.button, _extends({
    ref: ref,
    type: btnType
  }, rest, {
    __css: buttonStyles
  }));
});
export var MenuItem = /*#__PURE__*/forwardRef((props, ref) => {
  var {
    icon,
    iconSpacing = "0.75rem",
    command,
    commandSpacing = "0.75rem",
    children
  } = props,
      rest = _objectWithoutPropertiesLoose(props, ["icon", "iconSpacing", "command", "commandSpacing", "children"]);

  var menuitemProps = useMenuItem(rest, ref);
  var shouldWrap = icon || command;

  var _children = shouldWrap ? /*#__PURE__*/React.createElement("span", {
    style: {
      pointerEvents: "none",
      flex: "1 1 auto"
    }
  }, children) : children;

  return /*#__PURE__*/React.createElement(StyledMenuItem, _extends({}, menuitemProps, {
    className: cx("chakra-menu__menuitem", menuitemProps.className)
  }), icon && /*#__PURE__*/React.createElement(MenuIcon, {
    fontSize: "0.8em",
    marginEnd: iconSpacing
  }, icon), _children, command && /*#__PURE__*/React.createElement(MenuCommand, {
    marginStart: commandSpacing
  }, command));
});

if (__DEV__) {
  MenuItem.displayName = "MenuItem";
}

var CheckIcon = props => /*#__PURE__*/React.createElement("svg", _extends({
  viewBox: "0 0 14 14",
  width: "1em",
  height: "1em"
}, props), /*#__PURE__*/React.createElement("polygon", {
  fill: "currentColor",
  points: "5.5 11.9993304 14 3.49933039 12.5 2 5.5 8.99933039 1.5 4.9968652 0 6.49933039"
}));

export var MenuItemOption = /*#__PURE__*/forwardRef((props, ref) => {
  var {
    icon,
    iconSpacing = "0.75rem"
  } = props,
      rest = _objectWithoutPropertiesLoose(props, ["icon", "iconSpacing"]);

  var optionProps = useMenuOption(rest, ref);
  return /*#__PURE__*/React.createElement(StyledMenuItem, _extends({}, optionProps, {
    className: cx("chakra-menu__menuitem-option", rest.className)
  }), /*#__PURE__*/React.createElement(MenuIcon, {
    fontSize: "0.8em",
    marginEnd: iconSpacing,
    opacity: props.isChecked ? 1 : 0
  }, icon || /*#__PURE__*/React.createElement(CheckIcon, null)), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: "1 1 auto"
    }
  }, optionProps.children));
});
MenuItemOption.id = "MenuItemOption";

if (__DEV__) {
  MenuItemOption.displayName = "MenuItemOption";
}

export var MenuOptionGroup = props => {
  var {
    className,
    title
  } = props,
      rest = _objectWithoutPropertiesLoose(props, ["className", "title"]);

  var ownProps = useMenuOptionGroup(rest);
  return /*#__PURE__*/React.createElement(MenuGroup, _extends({
    title: title,
    className: cx("chakra-menu__option-group", className)
  }, ownProps));
};

if (__DEV__) {
  MenuOptionGroup.displayName = "MenuOptionGroup";
}

export var MenuGroup = /*#__PURE__*/forwardRef((props, ref) => {
  var {
    title,
    children,
    className
  } = props,
      rest = _objectWithoutPropertiesLoose(props, ["title", "children", "className"]);

  var _className = cx("chakra-menu__group__title", className);

  var styles = useStyles();
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    className: "chakra-menu__group",
    role: "group"
  }, title && /*#__PURE__*/React.createElement(chakra.p, _extends({
    className: _className
  }, rest, {
    __css: styles.groupTitle
  }), title), children);
});

if (__DEV__) {
  MenuGroup.displayName = "MenuGroup";
}

export var MenuCommand = /*#__PURE__*/forwardRef((props, ref) => {
  var styles = useStyles();
  return /*#__PURE__*/React.createElement(chakra.span, _extends({
    ref: ref
  }, props, {
    __css: styles.command,
    className: "chakra-menu__command"
  }));
});

if (__DEV__) {
  MenuCommand.displayName = "MenuCommand";
}

export var MenuIcon = props => {
  var {
    className,
    children
  } = props,
      rest = _objectWithoutPropertiesLoose(props, ["className", "children"]);

  var child = React.Children.only(children);
  var clone = /*#__PURE__*/React.isValidElement(child) ? /*#__PURE__*/React.cloneElement(child, {
    focusable: "false",
    "aria-hidden": true,
    className: cx("chakra-menu__icon", child.props.className)
  }) : null;

  var _className = cx("chakra-menu__icon-wrapper", className);

  return /*#__PURE__*/React.createElement(chakra.span, _extends({
    className: _className
  }, rest, {
    __css: {
      flexShrink: 0
    }
  }), clone);
};

if (__DEV__) {
  MenuIcon.displayName = "MenuIcon";
}

export var MenuDivider = props => {
  var {
    className
  } = props,
      rest = _objectWithoutPropertiesLoose(props, ["className"]);

  var styles = useStyles();
  return /*#__PURE__*/React.createElement(chakra.hr, _extends({
    role: "separator",
    "aria-orientation": "horizontal",
    className: cx("chakra-menu__divider", className)
  }, rest, {
    __css: styles.divider
  }));
};

if (__DEV__) {
  MenuDivider.displayName = "MenuDivider";
}
//# sourceMappingURL=menu.js.map