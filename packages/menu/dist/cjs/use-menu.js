"use strict";

exports.__esModule = true;
exports.useMenu = useMenu;
exports.useMenuButton = useMenuButton;
exports.useMenuList = useMenuList;
exports.useMenuPositioner = useMenuPositioner;
exports.useMenuItem = useMenuItem;
exports.useMenuOption = useMenuOption;
exports.useMenuOptionGroup = useMenuOptionGroup;
exports.useMenuState = useMenuState;
exports.useMenuContext = exports.MenuProvider = exports.useMenuDescendant = exports.useMenuDescendants = exports.useMenuDescendantsContext = exports.MenuDescendantsProvider = void 0;

var _clickable = require("@chakra-ui/clickable");

var _descendant = require("@chakra-ui/descendant");

var _hooks = require("@chakra-ui/hooks");

var _popper = require("@chakra-ui/popper");

var _reactUtils = require("@chakra-ui/react-utils");

var _utils = require("@chakra-ui/utils");

var React = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/* -------------------------------------------------------------------------------------------------
 * Create context to track descendants and their indices
 * -----------------------------------------------------------------------------------------------*/
var _createDescendantCont = (0, _descendant.createDescendantContext)(),
    MenuDescendantsProvider = _createDescendantCont[0],
    useMenuDescendantsContext = _createDescendantCont[1],
    useMenuDescendants = _createDescendantCont[2],
    useMenuDescendant = _createDescendantCont[3];
/* -------------------------------------------------------------------------------------------------
 * Create context to track menu state and logic
 * -----------------------------------------------------------------------------------------------*/


exports.useMenuDescendant = useMenuDescendant;
exports.useMenuDescendants = useMenuDescendants;
exports.useMenuDescendantsContext = useMenuDescendantsContext;
exports.MenuDescendantsProvider = MenuDescendantsProvider;

var _createContext = (0, _reactUtils.createContext)({
  strict: false,
  name: "MenuContext"
}),
    MenuProvider = _createContext[0],
    useMenuContext = _createContext[1];
/* -------------------------------------------------------------------------------------------------
 * useMenu hook
 * -----------------------------------------------------------------------------------------------*/


exports.useMenuContext = useMenuContext;
exports.MenuProvider = MenuProvider;

/**
 * React Hook to manage a menu
 *
 * It provides the logic and will be used with react context
 * to propagate its return value to all children
 */
function useMenu(props) {
  if (props === void 0) {
    props = {};
  }

  var _props = props,
      id = _props.id,
      _props$closeOnSelect = _props.closeOnSelect,
      closeOnSelect = _props$closeOnSelect === void 0 ? true : _props$closeOnSelect,
      _props$closeOnBlur = _props.closeOnBlur,
      closeOnBlur = _props$closeOnBlur === void 0 ? true : _props$closeOnBlur,
      _props$autoSelect = _props.autoSelect,
      autoSelect = _props$autoSelect === void 0 ? true : _props$autoSelect,
      isLazy = _props.isLazy,
      isOpenProp = _props.isOpen,
      defaultIsOpen = _props.defaultIsOpen,
      onCloseProp = _props.onClose,
      onOpenProp = _props.onOpen,
      _props$placement = _props.placement,
      placement = _props$placement === void 0 ? "bottom-start" : _props$placement,
      _props$lazyBehavior = _props.lazyBehavior,
      lazyBehavior = _props$lazyBehavior === void 0 ? "unmount" : _props$lazyBehavior,
      direction = _props.direction,
      _props$computePositio = _props.computePositionOnMount,
      computePositionOnMount = _props$computePositio === void 0 ? false : _props$computePositio,
      popperProps = _objectWithoutPropertiesLoose(_props, ["id", "closeOnSelect", "closeOnBlur", "autoSelect", "isLazy", "isOpen", "defaultIsOpen", "onClose", "onOpen", "placement", "lazyBehavior", "direction", "computePositionOnMount"]);
  /**
   * Prepare the reference to the menu and disclosure
   */


  var menuRef = React.useRef(null);
  var buttonRef = React.useRef(null);
  /**
   * Context to register all menu item nodes
   */

  var descendants = useMenuDescendants();
  var focusMenu = React.useCallback(function () {
    (0, _utils.focus)(menuRef.current, {
      nextTick: true,
      selectTextIfInput: false
    });
  }, []);
  var focusFirstItem = React.useCallback(function () {
    var id = setTimeout(function () {
      var first = descendants.firstEnabled();
      if (first) setFocusedIndex(first.index);
    });
    timeoutIds.current.add(id);
  }, [descendants]);
  var focusLastItem = React.useCallback(function () {
    var id = setTimeout(function () {
      var last = descendants.lastEnabled();
      if (last) setFocusedIndex(last.index);
    });
    timeoutIds.current.add(id);
  }, [descendants]);
  var onOpenInternal = React.useCallback(function () {
    onOpenProp == null ? void 0 : onOpenProp();

    if (autoSelect) {
      focusFirstItem();
    } else {
      focusMenu();
    }
  }, [autoSelect, focusFirstItem, focusMenu, onOpenProp]);

  var _useDisclosure = (0, _hooks.useDisclosure)({
    isOpen: isOpenProp,
    defaultIsOpen: defaultIsOpen,
    onClose: onCloseProp,
    onOpen: onOpenInternal
  }),
      isOpen = _useDisclosure.isOpen,
      onOpen = _useDisclosure.onOpen,
      onClose = _useDisclosure.onClose,
      onToggle = _useDisclosure.onToggle;

  (0, _hooks.useOutsideClick)({
    enabled: isOpen && closeOnBlur,
    ref: menuRef,
    handler: function handler(event) {
      var _buttonRef$current;

      if (!((_buttonRef$current = buttonRef.current) != null && _buttonRef$current.contains(event.target))) {
        onClose();
      }
    }
  });
  /**
   * Add some popper.js for dynamic positioning
   */

  var popper = (0, _popper.usePopper)(_extends({}, popperProps, {
    enabled: isOpen || computePositionOnMount,
    placement: placement,
    direction: direction
  }));

  var _React$useState = React.useState(-1),
      focusedIndex = _React$useState[0],
      setFocusedIndex = _React$useState[1];
  /**
   * Focus the button when we close the menu
   */


  (0, _hooks.useUpdateEffect)(function () {
    if (!isOpen) {
      setFocusedIndex(-1);
    }
  }, [isOpen]);
  (0, _hooks.useFocusOnHide)(menuRef, {
    focusRef: buttonRef,
    visible: isOpen,
    shouldFocus: true
  });
  /**
   * Generate unique ids for menu's list and button
   */

  var _useIds = (0, _hooks.useIds)(id, "menu-button", "menu-list"),
      buttonId = _useIds[0],
      menuId = _useIds[1];

  var openAndFocusMenu = React.useCallback(function () {
    onOpen();
    focusMenu();
  }, [onOpen, focusMenu]);
  var timeoutIds = React.useRef(new Set([]));
  (0, _hooks.useUnmountEffect)(function () {
    timeoutIds.current.forEach(function (id) {
      return clearTimeout(id);
    });
    timeoutIds.current.clear();
  });
  var openAndFocusFirstItem = React.useCallback(function () {
    onOpen();
    focusFirstItem();
  }, [focusFirstItem, onOpen]);
  var openAndFocusLastItem = React.useCallback(function () {
    onOpen();
    focusLastItem();
  }, [onOpen, focusLastItem]);
  var refocus = React.useCallback(function () {
    var _menuRef$current, _descendants$item;

    var doc = (0, _utils.getOwnerDocument)(menuRef.current);
    var hasFocusWithin = (_menuRef$current = menuRef.current) == null ? void 0 : _menuRef$current.contains(doc.activeElement);
    var shouldRefocus = isOpen && !hasFocusWithin;
    if (!shouldRefocus) return;
    var node = (_descendants$item = descendants.item(focusedIndex)) == null ? void 0 : _descendants$item.node;

    if (node) {
      (0, _utils.focus)(node, {
        selectTextIfInput: false,
        preventScroll: false
      });
    }
  }, [isOpen, focusedIndex, descendants]);
  return {
    openAndFocusMenu: openAndFocusMenu,
    openAndFocusFirstItem: openAndFocusFirstItem,
    openAndFocusLastItem: openAndFocusLastItem,
    onTransitionEnd: refocus,
    descendants: descendants,
    popper: popper,
    buttonId: buttonId,
    menuId: menuId,
    forceUpdate: popper.forceUpdate,
    orientation: "vertical",
    isOpen: isOpen,
    onToggle: onToggle,
    onOpen: onOpen,
    onClose: onClose,
    menuRef: menuRef,
    buttonRef: buttonRef,
    focusedIndex: focusedIndex,
    closeOnSelect: closeOnSelect,
    closeOnBlur: closeOnBlur,
    autoSelect: autoSelect,
    setFocusedIndex: setFocusedIndex,
    isLazy: isLazy,
    lazyBehavior: lazyBehavior
  };
}

/**
 * React Hook to manage a menu button.
 *
 * The assumption here is that the `useMenu` hook is used
 * in a component higher up the tree, and its return value
 * is passed as `context` to this hook.
 */
function useMenuButton(props, externalRef) {
  if (props === void 0) {
    props = {};
  }

  if (externalRef === void 0) {
    externalRef = null;
  }

  var menu = useMenuContext();
  var onToggle = menu.onToggle,
      popper = menu.popper,
      openAndFocusFirstItem = menu.openAndFocusFirstItem,
      openAndFocusLastItem = menu.openAndFocusLastItem;
  var onKeyDown = React.useCallback(function (event) {
    var eventKey = (0, _utils.normalizeEventKey)(event);
    var keyMap = {
      Enter: openAndFocusFirstItem,
      ArrowDown: openAndFocusFirstItem,
      ArrowUp: openAndFocusLastItem
    };
    var action = keyMap[eventKey];

    if (action) {
      event.preventDefault();
      event.stopPropagation();
      action(event);
    }
  }, [openAndFocusFirstItem, openAndFocusLastItem]);
  return _extends({}, props, {
    ref: (0, _reactUtils.mergeRefs)(menu.buttonRef, externalRef, popper.referenceRef),
    id: menu.buttonId,
    "data-active": (0, _utils.dataAttr)(menu.isOpen),
    "aria-expanded": menu.isOpen,
    "aria-haspopup": "menu",
    "aria-controls": menu.menuId,
    onClick: (0, _utils.callAllHandlers)(props.onClick, onToggle),
    onKeyDown: (0, _utils.callAllHandlers)(props.onKeyDown, onKeyDown)
  });
}

function isTargetMenuItem(target) {
  var _target$getAttribute;

  // this will catch `menuitem`, `menuitemradio`, `menuitemcheckbox`
  return (0, _utils.isHTMLElement)(target) && !!((_target$getAttribute = target.getAttribute("role")) != null && _target$getAttribute.startsWith("menuitem"));
}
/* -------------------------------------------------------------------------------------------------
 * useMenuList
 * -----------------------------------------------------------------------------------------------*/


/**
 * React Hook to manage a menu list.
 *
 * The assumption here is that the `useMenu` hook is used
 * in a component higher up the tree, and its return value
 * is passed as `context` to this hook.
 */
function useMenuList(props, ref) {
  if (props === void 0) {
    props = {};
  }

  if (ref === void 0) {
    ref = null;
  }

  var menu = useMenuContext();

  if (!menu) {
    throw new Error("useMenuContext: context is undefined. Seems you forgot to wrap component within <Menu>");
  }

  var focusedIndex = menu.focusedIndex,
      setFocusedIndex = menu.setFocusedIndex,
      menuRef = menu.menuRef,
      isOpen = menu.isOpen,
      onClose = menu.onClose,
      menuId = menu.menuId,
      isLazy = menu.isLazy,
      lazyBehavior = menu.lazyBehavior;
  var descendants = useMenuDescendantsContext();
  /**
   * Hook that creates a keydown event handler that listens
   * to printable keyboard character press
   */

  var createTypeaheadHandler = (0, _hooks.useShortcut)({
    preventDefault: function preventDefault(event) {
      return event.key !== " " && isTargetMenuItem(event.target);
    }
  });
  var onKeyDown = React.useCallback(function (event) {
    var eventKey = (0, _utils.normalizeEventKey)(event);
    var keyMap = {
      Tab: function Tab(event) {
        return event.preventDefault();
      },
      Escape: onClose,
      ArrowDown: function ArrowDown() {
        var next = descendants.nextEnabled(focusedIndex);
        if (next) setFocusedIndex(next.index);
      },
      ArrowUp: function ArrowUp() {
        var prev = descendants.prevEnabled(focusedIndex);
        if (prev) setFocusedIndex(prev.index);
      }
    };
    var fn = keyMap[eventKey];

    if (fn) {
      event.preventDefault();
      fn(event);
      return;
    }
    /**
     * Typeahead: Based on current character pressed,
     * find the next item to be selected
     */


    var onTypeahead = createTypeaheadHandler(function (character) {
      var nextItem = (0, _utils.getNextItemFromSearch)(descendants.values(), character, function (item) {
        var _item$node$textConten, _item$node;

        return (_item$node$textConten = item == null ? void 0 : (_item$node = item.node) == null ? void 0 : _item$node.textContent) != null ? _item$node$textConten : "";
      }, descendants.item(focusedIndex));

      if (nextItem) {
        var index = descendants.indexOf(nextItem.node);
        setFocusedIndex(index);
      }
    });

    if (isTargetMenuItem(event.target)) {
      onTypeahead(event);
    }
  }, [descendants, focusedIndex, createTypeaheadHandler, onClose, setFocusedIndex]);
  var hasBeenOpened = React.useRef(false);

  if (isOpen) {
    hasBeenOpened.current = true;
  }

  var shouldRenderChildren = (0, _utils.determineLazyBehavior)({
    hasBeenSelected: hasBeenOpened.current,
    isLazy: isLazy,
    lazyBehavior: lazyBehavior,
    isSelected: isOpen
  });
  return _extends({}, props, {
    ref: (0, _reactUtils.mergeRefs)(menuRef, ref),
    children: shouldRenderChildren ? props.children : null,
    tabIndex: -1,
    role: "menu",
    id: menuId,
    style: _extends({}, props.style, {
      transformOrigin: "var(--popper-transform-origin)"
    }),
    "aria-orientation": "vertical",
    onKeyDown: (0, _utils.callAllHandlers)(props.onKeyDown, onKeyDown)
  });
}
/* -------------------------------------------------------------------------------------------------
 * useMenuPosition: Composes usePopper to position the menu
 * -----------------------------------------------------------------------------------------------*/


function useMenuPositioner(props) {
  if (props === void 0) {
    props = {};
  }

  var _useMenuContext = useMenuContext(),
      popper = _useMenuContext.popper,
      isOpen = _useMenuContext.isOpen;

  return popper.getPopperProps(_extends({}, props, {
    style: _extends({
      visibility: isOpen ? "visible" : "hidden"
    }, props.style)
  }));
}
/* -------------------------------------------------------------------------------------------------
 * useMenuItem: Hook for each menu item within the menu list.
   We also use it in `useMenuItemOption`
 * -----------------------------------------------------------------------------------------------*/


function useMenuItem(props, externalRef) {
  if (props === void 0) {
    props = {};
  }

  if (externalRef === void 0) {
    externalRef = null;
  }

  var _props2 = props,
      onMouseEnterProp = _props2.onMouseEnter,
      onMouseMoveProp = _props2.onMouseMove,
      onMouseLeaveProp = _props2.onMouseLeave,
      onClickProp = _props2.onClick,
      isDisabled = _props2.isDisabled,
      isFocusable = _props2.isFocusable,
      closeOnSelect = _props2.closeOnSelect,
      htmlProps = _objectWithoutPropertiesLoose(_props2, ["onMouseEnter", "onMouseMove", "onMouseLeave", "onClick", "isDisabled", "isFocusable", "closeOnSelect"]);

  var menu = useMenuContext();
  var setFocusedIndex = menu.setFocusedIndex,
      focusedIndex = menu.focusedIndex,
      menuCloseOnSelect = menu.closeOnSelect,
      onClose = menu.onClose,
      menuRef = menu.menuRef,
      isOpen = menu.isOpen,
      menuId = menu.menuId;
  var ref = React.useRef(null);
  var id = menuId + "-menuitem-" + (0, _hooks.useId)();
  /**
   * Register the menuitem's node into the domContext
   */

  var _useMenuDescendant = useMenuDescendant({
    disabled: isDisabled && !isFocusable
  }),
      index = _useMenuDescendant.index,
      register = _useMenuDescendant.register;

  var onMouseEnter = React.useCallback(function (event) {
    onMouseEnterProp == null ? void 0 : onMouseEnterProp(event);
    if (isDisabled) return;
    setFocusedIndex(index);
  }, [setFocusedIndex, index, isDisabled, onMouseEnterProp]);
  var onMouseMove = React.useCallback(function (event) {
    onMouseMoveProp == null ? void 0 : onMouseMoveProp(event);

    if (ref.current && !(0, _utils.isActiveElement)(ref.current)) {
      onMouseEnter(event);
    }
  }, [onMouseEnter, onMouseMoveProp]);
  var onMouseLeave = React.useCallback(function (event) {
    onMouseLeaveProp == null ? void 0 : onMouseLeaveProp(event);
    if (isDisabled) return;
    setFocusedIndex(-1);
  }, [setFocusedIndex, isDisabled, onMouseLeaveProp]);
  var onClick = React.useCallback(function (event) {
    onClickProp == null ? void 0 : onClickProp(event);
    if (!isTargetMenuItem(event.currentTarget)) return;
    /**
     * Close menu and parent menus, allowing the MenuItem
     * to override its parent menu's `closeOnSelect` prop.
     */

    if (closeOnSelect != null ? closeOnSelect : menuCloseOnSelect) {
      onClose();
    }
  }, [onClose, onClickProp, menuCloseOnSelect, closeOnSelect]);
  var isFocused = index === focusedIndex;
  var trulyDisabled = isDisabled && !isFocusable;
  (0, _hooks.useUpdateEffect)(function () {
    if (!isOpen) return;

    if (isFocused && !trulyDisabled && ref.current) {
      (0, _utils.focus)(ref.current, {
        nextTick: true,
        selectTextIfInput: false,
        preventScroll: false
      });
    } else if (menuRef.current && !(0, _utils.isActiveElement)(menuRef.current)) {
      (0, _utils.focus)(menuRef.current, {
        preventScroll: false
      });
    }
  }, [isFocused, trulyDisabled, menuRef, isOpen]);
  var clickableProps = (0, _clickable.useClickable)({
    onClick: onClick,
    onMouseEnter: onMouseEnter,
    onMouseMove: onMouseMove,
    onMouseLeave: onMouseLeave,
    ref: (0, _reactUtils.mergeRefs)(register, ref, externalRef),
    isDisabled: isDisabled,
    isFocusable: isFocusable
  });
  return _extends({}, htmlProps, clickableProps, {
    id: id,
    role: "menuitem",
    tabIndex: isFocused ? 0 : -1
  });
}
/* -------------------------------------------------------------------------------------------------
 * useMenuOption: Composes useMenuItem to provide a selectable/checkable menu item
 * -----------------------------------------------------------------------------------------------*/


function useMenuOption(props, ref) {
  if (props === void 0) {
    props = {};
  }

  if (ref === void 0) {
    ref = null;
  }

  var _props3 = props,
      _props3$type = _props3.type,
      type = _props3$type === void 0 ? "radio" : _props3$type,
      isChecked = _props3.isChecked,
      rest = _objectWithoutPropertiesLoose(_props3, ["type", "isChecked"]);

  var ownProps = useMenuItem(rest, ref);
  return _extends({}, ownProps, {
    role: "menuitem" + type,
    "aria-checked": isChecked
  });
}
/* -------------------------------------------------------------------------------------------------
 * useMenuOptionGroup: Manages the state of multiple selectable menuitem or menu option
 * -----------------------------------------------------------------------------------------------*/


function useMenuOptionGroup(props) {
  if (props === void 0) {
    props = {};
  }

  var _props4 = props,
      children = _props4.children,
      _props4$type = _props4.type,
      type = _props4$type === void 0 ? "radio" : _props4$type,
      valueProp = _props4.value,
      defaultValue = _props4.defaultValue,
      onChangeProp = _props4.onChange,
      htmlProps = _objectWithoutPropertiesLoose(_props4, ["children", "type", "value", "defaultValue", "onChange"]);

  var isRadio = type === "radio";
  var fallback = isRadio ? "" : [];

  var _useControllableState = (0, _hooks.useControllableState)({
    defaultValue: defaultValue != null ? defaultValue : fallback,
    value: valueProp,
    onChange: onChangeProp
  }),
      value = _useControllableState[0],
      setValue = _useControllableState[1];

  var onChange = React.useCallback(function (selectedValue) {
    if (type === "radio" && (0, _utils.isString)(value)) {
      setValue(selectedValue);
    }

    if (type === "checkbox" && (0, _utils.isArray)(value)) {
      var nextValue = value.includes(selectedValue) ? (0, _utils.removeItem)(value, selectedValue) : (0, _utils.addItem)(value, selectedValue);
      setValue(nextValue);
    }
  }, [value, setValue, type]);
  var validChildren = (0, _reactUtils.getValidChildren)(children);
  var clones = validChildren.map(function (child) {
    /**
     * We've added an internal `id` to each `MenuItemOption`,
     * let's use that for type-checking.
     *
     * We can't rely on displayName or the element's type since
     * they can be changed by the user.
     */
    if (child.type.id !== "MenuItemOption") return child;

    var onClick = function onClick(event) {
      onChange(child.props.value);
      child.props.onClick == null ? void 0 : child.props.onClick(event);
    };

    var isChecked = type === "radio" ? child.props.value === value : value.includes(child.props.value);
    return /*#__PURE__*/React.cloneElement(child, {
      type: type,
      onClick: onClick,
      isChecked: isChecked
    });
  });
  return _extends({}, htmlProps, {
    children: clones
  });
}

function useMenuState() {
  var _useMenuContext2 = useMenuContext(),
      isOpen = _useMenuContext2.isOpen,
      onClose = _useMenuContext2.onClose;

  return {
    isOpen: isOpen,
    onClose: onClose
  };
}
//# sourceMappingURL=use-menu.js.map