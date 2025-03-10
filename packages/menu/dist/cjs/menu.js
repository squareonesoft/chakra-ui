"use strict";

exports.__esModule = true;
exports.MenuDivider = exports.MenuIcon = exports.MenuCommand = exports.MenuGroup = exports.MenuOptionGroup = exports.MenuItemOption = exports.MenuItem = exports.MenuList = exports.MenuButton = exports.Menu = void 0;

var _system = require("@chakra-ui/system");

var _utils = require("@chakra-ui/utils");

var _framerMotion = require("framer-motion");

var React = _interopRequireWildcard(require("react"));

var _useMenu2 = require("./use-menu");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/**
 * Menu provides context, state, and focus management
 * to its sub-components. It doesn't render any DOM node.
 */
var Menu = function Menu(props) {
  var children = props.children;
  var styles = (0, _system.useMultiStyleConfig)("Menu", props);
  var ownProps = (0, _system.omitThemingProps)(props);

  var _useTheme = (0, _system.useTheme)(),
      direction = _useTheme.direction;

  var _useMenu = (0, _useMenu2.useMenu)(_extends({}, ownProps, {
    direction: direction
  })),
      descendants = _useMenu.descendants,
      ctx = _objectWithoutPropertiesLoose(_useMenu, ["descendants"]);

  var context = React.useMemo(function () {
    return ctx;
  }, [ctx]);
  var isOpen = context.isOpen,
      onClose = context.onClose,
      forceUpdate = context.forceUpdate;
  return /*#__PURE__*/React.createElement(_useMenu2.MenuDescendantsProvider, {
    value: descendants
  }, /*#__PURE__*/React.createElement(_useMenu2.MenuProvider, {
    value: context
  }, /*#__PURE__*/React.createElement(_system.StylesProvider, {
    value: styles
  }, (0, _utils.runIfFn)(children, {
    isOpen: isOpen,
    onClose: onClose,
    forceUpdate: forceUpdate
  }))));
};

exports.Menu = Menu;

if (_utils.__DEV__) {
  Menu.displayName = "Menu";
}

var StyledMenuButton = /*#__PURE__*/(0, _system.forwardRef)(function (props, ref) {
  var styles = (0, _system.useStyles)();
  return /*#__PURE__*/React.createElement(_system.chakra.button, _extends({
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

var MenuButton = /*#__PURE__*/(0, _system.forwardRef)(function (props, ref) {
  var children = props.children,
      As = props.as,
      rest = _objectWithoutPropertiesLoose(props, ["children", "as"]);

  var buttonProps = (0, _useMenu2.useMenuButton)(rest, ref);
  var Element = As || StyledMenuButton;
  return /*#__PURE__*/React.createElement(Element, _extends({}, buttonProps, {
    className: (0, _utils.cx)("chakra-menu__menu-button", props.className)
  }), /*#__PURE__*/React.createElement(_system.chakra.span, {
    __css: {
      pointerEvents: "none",
      flex: "1 1 auto",
      minW: 0
    }
  }, props.children));
});
exports.MenuButton = MenuButton;

if (_utils.__DEV__) {
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

var MotionDiv = "custom" in _framerMotion.motion ? _framerMotion.createDomMotionComponent("custom")(_system.chakra.div) : (0, _framerMotion.motion)(_system.chakra.div);
var MenuList = /*#__PURE__*/(0, _system.forwardRef)(function (props, ref) {
  var _props$zIndex, _styles$list;

  var rootProps = props.rootProps,
      rest = _objectWithoutPropertiesLoose(props, ["rootProps"]);

  var _useMenuContext = (0, _useMenu2.useMenuContext)(),
      isOpen = _useMenuContext.isOpen,
      onTransitionEnd = _useMenuContext.onTransitionEnd;

  var menulistProps = (0, _useMenu2.useMenuList)(rest, ref);
  var positionerProps = (0, _useMenu2.useMenuPositioner)(rootProps);
  var styles = (0, _system.useStyles)();
  return /*#__PURE__*/React.createElement(_system.chakra.div, _extends({}, positionerProps, {
    __css: {
      zIndex: (_props$zIndex = props.zIndex) != null ? _props$zIndex : (_styles$list = styles.list) == null ? void 0 : _styles$list.zIndex
    }
  }), /*#__PURE__*/React.createElement(MotionDiv, _extends({}, menulistProps, {
    /**
     * We could call this on either `onAnimationComplete` or `onUpdate`.
     * It seems the re-focusing works better with the `onUpdate`
     */
    onUpdate: onTransitionEnd,
    className: (0, _utils.cx)("chakra-menu__menu-list", menulistProps.className),
    variants: motionVariants,
    initial: false,
    animate: isOpen ? "enter" : "exit",
    __css: _extends({
      outline: 0
    }, styles.list)
  })));
});
exports.MenuList = MenuList;

if (_utils.__DEV__) {
  MenuList.displayName = "MenuList";
}

var StyledMenuItem = /*#__PURE__*/(0, _system.forwardRef)(function (props, ref) {
  var type = props.type,
      rest = _objectWithoutPropertiesLoose(props, ["type"]);

  var styles = (0, _system.useStyles)();
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

  return /*#__PURE__*/React.createElement(_system.chakra.button, _extends({
    ref: ref,
    type: btnType
  }, rest, {
    __css: buttonStyles
  }));
});
var MenuItem = /*#__PURE__*/(0, _system.forwardRef)(function (props, ref) {
  var icon = props.icon,
      _props$iconSpacing = props.iconSpacing,
      iconSpacing = _props$iconSpacing === void 0 ? "0.75rem" : _props$iconSpacing,
      command = props.command,
      _props$commandSpacing = props.commandSpacing,
      commandSpacing = _props$commandSpacing === void 0 ? "0.75rem" : _props$commandSpacing,
      children = props.children,
      rest = _objectWithoutPropertiesLoose(props, ["icon", "iconSpacing", "command", "commandSpacing", "children"]);

  var menuitemProps = (0, _useMenu2.useMenuItem)(rest, ref);
  var shouldWrap = icon || command;

  var _children = shouldWrap ? /*#__PURE__*/React.createElement("span", {
    style: {
      pointerEvents: "none",
      flex: "1 1 auto"
    }
  }, children) : children;

  return /*#__PURE__*/React.createElement(StyledMenuItem, _extends({}, menuitemProps, {
    className: (0, _utils.cx)("chakra-menu__menuitem", menuitemProps.className)
  }), icon && /*#__PURE__*/React.createElement(MenuIcon, {
    fontSize: "0.8em",
    marginEnd: iconSpacing
  }, icon), _children, command && /*#__PURE__*/React.createElement(MenuCommand, {
    marginStart: commandSpacing
  }, command));
});
exports.MenuItem = MenuItem;

if (_utils.__DEV__) {
  MenuItem.displayName = "MenuItem";
}

var CheckIcon = function CheckIcon(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 14 14",
    width: "1em",
    height: "1em"
  }, props), /*#__PURE__*/React.createElement("polygon", {
    fill: "currentColor",
    points: "5.5 11.9993304 14 3.49933039 12.5 2 5.5 8.99933039 1.5 4.9968652 0 6.49933039"
  }));
};

var MenuItemOption = /*#__PURE__*/(0, _system.forwardRef)(function (props, ref) {
  var icon = props.icon,
      _props$iconSpacing2 = props.iconSpacing,
      iconSpacing = _props$iconSpacing2 === void 0 ? "0.75rem" : _props$iconSpacing2,
      rest = _objectWithoutPropertiesLoose(props, ["icon", "iconSpacing"]);

  var optionProps = (0, _useMenu2.useMenuOption)(rest, ref);
  return /*#__PURE__*/React.createElement(StyledMenuItem, _extends({}, optionProps, {
    className: (0, _utils.cx)("chakra-menu__menuitem-option", rest.className)
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
exports.MenuItemOption = MenuItemOption;
MenuItemOption.id = "MenuItemOption";

if (_utils.__DEV__) {
  MenuItemOption.displayName = "MenuItemOption";
}

var MenuOptionGroup = function MenuOptionGroup(props) {
  var className = props.className,
      title = props.title,
      rest = _objectWithoutPropertiesLoose(props, ["className", "title"]);

  var ownProps = (0, _useMenu2.useMenuOptionGroup)(rest);
  return /*#__PURE__*/React.createElement(MenuGroup, _extends({
    title: title,
    className: (0, _utils.cx)("chakra-menu__option-group", className)
  }, ownProps));
};

exports.MenuOptionGroup = MenuOptionGroup;

if (_utils.__DEV__) {
  MenuOptionGroup.displayName = "MenuOptionGroup";
}

var MenuGroup = /*#__PURE__*/(0, _system.forwardRef)(function (props, ref) {
  var title = props.title,
      children = props.children,
      className = props.className,
      rest = _objectWithoutPropertiesLoose(props, ["title", "children", "className"]);

  var _className = (0, _utils.cx)("chakra-menu__group__title", className);

  var styles = (0, _system.useStyles)();
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    className: "chakra-menu__group",
    role: "group"
  }, title && /*#__PURE__*/React.createElement(_system.chakra.p, _extends({
    className: _className
  }, rest, {
    __css: styles.groupTitle
  }), title), children);
});
exports.MenuGroup = MenuGroup;

if (_utils.__DEV__) {
  MenuGroup.displayName = "MenuGroup";
}

var MenuCommand = /*#__PURE__*/(0, _system.forwardRef)(function (props, ref) {
  var styles = (0, _system.useStyles)();
  return /*#__PURE__*/React.createElement(_system.chakra.span, _extends({
    ref: ref
  }, props, {
    __css: styles.command,
    className: "chakra-menu__command"
  }));
});
exports.MenuCommand = MenuCommand;

if (_utils.__DEV__) {
  MenuCommand.displayName = "MenuCommand";
}

var MenuIcon = function MenuIcon(props) {
  var className = props.className,
      children = props.children,
      rest = _objectWithoutPropertiesLoose(props, ["className", "children"]);

  var child = React.Children.only(children);
  var clone = /*#__PURE__*/React.isValidElement(child) ? /*#__PURE__*/React.cloneElement(child, {
    focusable: "false",
    "aria-hidden": true,
    className: (0, _utils.cx)("chakra-menu__icon", child.props.className)
  }) : null;

  var _className = (0, _utils.cx)("chakra-menu__icon-wrapper", className);

  return /*#__PURE__*/React.createElement(_system.chakra.span, _extends({
    className: _className
  }, rest, {
    __css: {
      flexShrink: 0
    }
  }), clone);
};

exports.MenuIcon = MenuIcon;

if (_utils.__DEV__) {
  MenuIcon.displayName = "MenuIcon";
}

var MenuDivider = function MenuDivider(props) {
  var className = props.className,
      rest = _objectWithoutPropertiesLoose(props, ["className"]);

  var styles = (0, _system.useStyles)();
  return /*#__PURE__*/React.createElement(_system.chakra.hr, _extends({
    role: "separator",
    "aria-orientation": "horizontal",
    className: (0, _utils.cx)("chakra-menu__divider", className)
  }, rest, {
    __css: styles.divider
  }));
};

exports.MenuDivider = MenuDivider;

if (_utils.__DEV__) {
  MenuDivider.displayName = "MenuDivider";
}
//# sourceMappingURL=menu.js.map