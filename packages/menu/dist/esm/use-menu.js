function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import { useClickable } from "@chakra-ui/clickable";
import { createDescendantContext } from "@chakra-ui/descendant";
import { useControllableState, useDisclosure, useFocusOnHide, useId, useIds, useOutsideClick, useShortcut, useUnmountEffect, useUpdateEffect } from "@chakra-ui/hooks";
import { usePopper } from "@chakra-ui/popper";
import { createContext, getValidChildren, mergeRefs } from "@chakra-ui/react-utils";
import { addItem, callAllHandlers, dataAttr, determineLazyBehavior, focus, getNextItemFromSearch, getOwnerDocument, isActiveElement, isArray, isHTMLElement, isString, normalizeEventKey, removeItem } from "@chakra-ui/utils";
import * as React from "react";
/* -------------------------------------------------------------------------------------------------
 * Create context to track descendants and their indices
 * -----------------------------------------------------------------------------------------------*/

export var [MenuDescendantsProvider, useMenuDescendantsContext, useMenuDescendants, useMenuDescendant] = createDescendantContext();
/* -------------------------------------------------------------------------------------------------
 * Create context to track menu state and logic
 * -----------------------------------------------------------------------------------------------*/

export var [MenuProvider, useMenuContext] = createContext({
  strict: false,
  name: "MenuContext"
});
/* -------------------------------------------------------------------------------------------------
 * useMenu hook
 * -----------------------------------------------------------------------------------------------*/

/**
 * React Hook to manage a menu
 *
 * It provides the logic and will be used with react context
 * to propagate its return value to all children
 */
export function useMenu(props) {
  if (props === void 0) {
    props = {};
  }

  var {
    id,
    closeOnSelect = true,
    closeOnBlur = true,
    autoSelect = true,
    isLazy,
    isOpen: isOpenProp,
    defaultIsOpen,
    onClose: onCloseProp,
    onOpen: onOpenProp,
    placement = "bottom-start",
    lazyBehavior = "unmount",
    direction,
    computePositionOnMount = false
  } = props,
      popperProps = _objectWithoutPropertiesLoose(props, ["id", "closeOnSelect", "closeOnBlur", "autoSelect", "isLazy", "isOpen", "defaultIsOpen", "onClose", "onOpen", "placement", "lazyBehavior", "direction", "computePositionOnMount"]);
  /**
   * Prepare the reference to the menu and disclosure
   */


  var menuRef = React.useRef(null);
  var buttonRef = React.useRef(null);
  /**
   * Context to register all menu item nodes
   */

  var descendants = useMenuDescendants();
  var focusMenu = React.useCallback(() => {
    focus(menuRef.current, {
      nextTick: true,
      selectTextIfInput: false
    });
  }, []);
  var focusFirstItem = React.useCallback(() => {
    var id = setTimeout(() => {
      var first = descendants.firstEnabled();
      if (first) setFocusedIndex(first.index);
    });
    timeoutIds.current.add(id);
  }, [descendants]);
  var focusLastItem = React.useCallback(() => {
    var id = setTimeout(() => {
      var last = descendants.lastEnabled();
      if (last) setFocusedIndex(last.index);
    });
    timeoutIds.current.add(id);
  }, [descendants]);
  var onOpenInternal = React.useCallback(() => {
    onOpenProp == null ? void 0 : onOpenProp();

    if (autoSelect) {
      focusFirstItem();
    } else {
      focusMenu();
    }
  }, [autoSelect, focusFirstItem, focusMenu, onOpenProp]);
  var {
    isOpen,
    onOpen,
    onClose,
    onToggle
  } = useDisclosure({
    isOpen: isOpenProp,
    defaultIsOpen,
    onClose: onCloseProp,
    onOpen: onOpenInternal
  });
  useOutsideClick({
    enabled: isOpen && closeOnBlur,
    ref: menuRef,
    handler: event => {
      var _buttonRef$current;

      if (!((_buttonRef$current = buttonRef.current) != null && _buttonRef$current.contains(event.target))) {
        onClose();
      }
    }
  });
  /**
   * Add some popper.js for dynamic positioning
   */

  var popper = usePopper(_extends({}, popperProps, {
    enabled: isOpen || computePositionOnMount,
    placement,
    direction
  }));
  var [focusedIndex, setFocusedIndex] = React.useState(-1);
  /**
   * Focus the button when we close the menu
   */

  useUpdateEffect(() => {
    if (!isOpen) {
      setFocusedIndex(-1);
    }
  }, [isOpen]);
  useFocusOnHide(menuRef, {
    focusRef: buttonRef,
    visible: isOpen,
    shouldFocus: true
  });
  /**
   * Generate unique ids for menu's list and button
   */

  var [buttonId, menuId] = useIds(id, "menu-button", "menu-list");
  var openAndFocusMenu = React.useCallback(() => {
    onOpen();
    focusMenu();
  }, [onOpen, focusMenu]);
  var timeoutIds = React.useRef(new Set([]));
  useUnmountEffect(() => {
    timeoutIds.current.forEach(id => clearTimeout(id));
    timeoutIds.current.clear();
  });
  var openAndFocusFirstItem = React.useCallback(() => {
    onOpen();
    focusFirstItem();
  }, [focusFirstItem, onOpen]);
  var openAndFocusLastItem = React.useCallback(() => {
    onOpen();
    focusLastItem();
  }, [onOpen, focusLastItem]);
  var refocus = React.useCallback(() => {
    var _menuRef$current, _descendants$item;

    var doc = getOwnerDocument(menuRef.current);
    var hasFocusWithin = (_menuRef$current = menuRef.current) == null ? void 0 : _menuRef$current.contains(doc.activeElement);
    var shouldRefocus = isOpen && !hasFocusWithin;
    if (!shouldRefocus) return;
    var node = (_descendants$item = descendants.item(focusedIndex)) == null ? void 0 : _descendants$item.node;

    if (node) {
      focus(node, {
        selectTextIfInput: false,
        preventScroll: false
      });
    }
  }, [isOpen, focusedIndex, descendants]);
  return {
    openAndFocusMenu,
    openAndFocusFirstItem,
    openAndFocusLastItem,
    onTransitionEnd: refocus,
    descendants,
    popper,
    buttonId,
    menuId,
    forceUpdate: popper.forceUpdate,
    orientation: "vertical",
    isOpen,
    onToggle,
    onOpen,
    onClose,
    menuRef,
    buttonRef,
    focusedIndex,
    closeOnSelect,
    closeOnBlur,
    autoSelect,
    setFocusedIndex,
    isLazy,
    lazyBehavior
  };
}

/**
 * React Hook to manage a menu button.
 *
 * The assumption here is that the `useMenu` hook is used
 * in a component higher up the tree, and its return value
 * is passed as `context` to this hook.
 */
export function useMenuButton(props, externalRef) {
  if (props === void 0) {
    props = {};
  }

  if (externalRef === void 0) {
    externalRef = null;
  }

  var menu = useMenuContext();
  var {
    onToggle,
    popper,
    openAndFocusFirstItem,
    openAndFocusLastItem
  } = menu;
  var onKeyDown = React.useCallback(event => {
    var eventKey = normalizeEventKey(event);
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
    ref: mergeRefs(menu.buttonRef, externalRef, popper.referenceRef),
    id: menu.buttonId,
    "data-active": dataAttr(menu.isOpen),
    "aria-expanded": menu.isOpen,
    "aria-haspopup": "menu",
    "aria-controls": menu.menuId,
    onClick: callAllHandlers(props.onClick, onToggle),
    onKeyDown: callAllHandlers(props.onKeyDown, onKeyDown)
  });
}

function isTargetMenuItem(target) {
  var _target$getAttribute;

  // this will catch `menuitem`, `menuitemradio`, `menuitemcheckbox`
  return isHTMLElement(target) && !!((_target$getAttribute = target.getAttribute("role")) != null && _target$getAttribute.startsWith("menuitem"));
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
export function useMenuList(props, ref) {
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

  var {
    focusedIndex,
    setFocusedIndex,
    menuRef,
    isOpen,
    onClose,
    menuId,
    isLazy,
    lazyBehavior
  } = menu;
  var descendants = useMenuDescendantsContext();
  /**
   * Hook that creates a keydown event handler that listens
   * to printable keyboard character press
   */

  var createTypeaheadHandler = useShortcut({
    preventDefault: event => event.key !== " " && isTargetMenuItem(event.target)
  });
  var onKeyDown = React.useCallback(event => {
    var eventKey = normalizeEventKey(event);
    var keyMap = {
      Tab: event => event.preventDefault(),
      Escape: onClose,
      ArrowDown: () => {
        var next = descendants.nextEnabled(focusedIndex);
        if (next) setFocusedIndex(next.index);
      },
      ArrowUp: () => {
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


    var onTypeahead = createTypeaheadHandler(character => {
      var nextItem = getNextItemFromSearch(descendants.values(), character, item => {
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

  var shouldRenderChildren = determineLazyBehavior({
    hasBeenSelected: hasBeenOpened.current,
    isLazy,
    lazyBehavior,
    isSelected: isOpen
  });
  return _extends({}, props, {
    ref: mergeRefs(menuRef, ref),
    children: shouldRenderChildren ? props.children : null,
    tabIndex: -1,
    role: "menu",
    id: menuId,
    style: _extends({}, props.style, {
      transformOrigin: "var(--popper-transform-origin)"
    }),
    "aria-orientation": "vertical",
    onKeyDown: callAllHandlers(props.onKeyDown, onKeyDown)
  });
}
/* -------------------------------------------------------------------------------------------------
 * useMenuPosition: Composes usePopper to position the menu
 * -----------------------------------------------------------------------------------------------*/

export function useMenuPositioner(props) {
  if (props === void 0) {
    props = {};
  }

  var {
    popper,
    isOpen
  } = useMenuContext();
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

export function useMenuItem(props, externalRef) {
  if (props === void 0) {
    props = {};
  }

  if (externalRef === void 0) {
    externalRef = null;
  }

  var {
    onMouseEnter: onMouseEnterProp,
    onMouseMove: onMouseMoveProp,
    onMouseLeave: onMouseLeaveProp,
    onClick: onClickProp,
    isDisabled,
    isFocusable,
    closeOnSelect
  } = props,
      htmlProps = _objectWithoutPropertiesLoose(props, ["onMouseEnter", "onMouseMove", "onMouseLeave", "onClick", "isDisabled", "isFocusable", "closeOnSelect"]);

  var menu = useMenuContext();
  var {
    setFocusedIndex,
    focusedIndex,
    closeOnSelect: menuCloseOnSelect,
    onClose,
    menuRef,
    isOpen,
    menuId
  } = menu;
  var ref = React.useRef(null);
  var id = menuId + "-menuitem-" + useId();
  /**
   * Register the menuitem's node into the domContext
   */

  var {
    index,
    register
  } = useMenuDescendant({
    disabled: isDisabled && !isFocusable
  });
  var onMouseEnter = React.useCallback(event => {
    onMouseEnterProp == null ? void 0 : onMouseEnterProp(event);
    if (isDisabled) return;
    setFocusedIndex(index);
  }, [setFocusedIndex, index, isDisabled, onMouseEnterProp]);
  var onMouseMove = React.useCallback(event => {
    onMouseMoveProp == null ? void 0 : onMouseMoveProp(event);

    if (ref.current && !isActiveElement(ref.current)) {
      onMouseEnter(event);
    }
  }, [onMouseEnter, onMouseMoveProp]);
  var onMouseLeave = React.useCallback(event => {
    onMouseLeaveProp == null ? void 0 : onMouseLeaveProp(event);
    if (isDisabled) return;
    setFocusedIndex(-1);
  }, [setFocusedIndex, isDisabled, onMouseLeaveProp]);
  var onClick = React.useCallback(event => {
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
  useUpdateEffect(() => {
    if (!isOpen) return;

    if (isFocused && !trulyDisabled && ref.current) {
      focus(ref.current, {
        nextTick: true,
        selectTextIfInput: false,
        preventScroll: false
      });
    } else if (menuRef.current && !isActiveElement(menuRef.current)) {
      focus(menuRef.current, {
        preventScroll: false
      });
    }
  }, [isFocused, trulyDisabled, menuRef, isOpen]);
  var clickableProps = useClickable({
    onClick,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    ref: mergeRefs(register, ref, externalRef),
    isDisabled,
    isFocusable
  });
  return _extends({}, htmlProps, clickableProps, {
    id,
    role: "menuitem",
    tabIndex: isFocused ? 0 : -1
  });
}
/* -------------------------------------------------------------------------------------------------
 * useMenuOption: Composes useMenuItem to provide a selectable/checkable menu item
 * -----------------------------------------------------------------------------------------------*/

export function useMenuOption(props, ref) {
  if (props === void 0) {
    props = {};
  }

  if (ref === void 0) {
    ref = null;
  }

  var {
    type = "radio",
    isChecked
  } = props,
      rest = _objectWithoutPropertiesLoose(props, ["type", "isChecked"]);

  var ownProps = useMenuItem(rest, ref);
  return _extends({}, ownProps, {
    role: "menuitem" + type,
    "aria-checked": isChecked
  });
}
/* -------------------------------------------------------------------------------------------------
 * useMenuOptionGroup: Manages the state of multiple selectable menuitem or menu option
 * -----------------------------------------------------------------------------------------------*/

export function useMenuOptionGroup(props) {
  if (props === void 0) {
    props = {};
  }

  var {
    children,
    type = "radio",
    value: valueProp,
    defaultValue,
    onChange: onChangeProp
  } = props,
      htmlProps = _objectWithoutPropertiesLoose(props, ["children", "type", "value", "defaultValue", "onChange"]);

  var isRadio = type === "radio";
  var fallback = isRadio ? "" : [];
  var [value, setValue] = useControllableState({
    defaultValue: defaultValue != null ? defaultValue : fallback,
    value: valueProp,
    onChange: onChangeProp
  });
  var onChange = React.useCallback(selectedValue => {
    if (type === "radio" && isString(value)) {
      setValue(selectedValue);
    }

    if (type === "checkbox" && isArray(value)) {
      var nextValue = value.includes(selectedValue) ? removeItem(value, selectedValue) : addItem(value, selectedValue);
      setValue(nextValue);
    }
  }, [value, setValue, type]);
  var validChildren = getValidChildren(children);
  var clones = validChildren.map(child => {
    /**
     * We've added an internal `id` to each `MenuItemOption`,
     * let's use that for type-checking.
     *
     * We can't rely on displayName or the element's type since
     * they can be changed by the user.
     */
    if (child.type.id !== "MenuItemOption") return child;

    var onClick = event => {
      onChange(child.props.value);
      child.props.onClick == null ? void 0 : child.props.onClick(event);
    };

    var isChecked = type === "radio" ? child.props.value === value : value.includes(child.props.value);
    return /*#__PURE__*/React.cloneElement(child, {
      type,
      onClick,
      isChecked
    });
  });
  return _extends({}, htmlProps, {
    children: clones
  });
}
export function useMenuState() {
  var {
    isOpen,
    onClose
  } = useMenuContext();
  return {
    isOpen,
    onClose
  };
}
//# sourceMappingURL=use-menu.js.map