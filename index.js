'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var ReactDOM = _interopDefault(require('react-dom'));

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
    return;
  }

  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var FeatureFlagsContext = React.createContext({});

function FeatureFlagsUI() {
  var _useState = React.useState(true),
      _useState2 = _slicedToArray(_useState, 2),
      isExpanded = _useState2[0],
      setIsExpanded = _useState2[1];

  var _useContext = React.useContext(FeatureFlagsContext),
      flags = _useContext.flags,
      setFlags = _useContext.setFlags;

  function onFlagChange(k) {
    setFlags(_objectSpread2({}, flags, _defineProperty({}, k, !flags[k])));
  }

  function render() {
    return React__default.createElement("div", {
      className: "FeatureFlagsRoot" + (isExpanded ? " -expanded" : "")
    }, React__default.createElement("div", {
      className: "title"
    }, React__default.createElement("button", {
      className: "toggleButton",
      type: "button",
      onClick: function onClick() {
        return setIsExpanded(function (b) {
          return !b;
        });
      }
    }, isExpanded ? "X" : "<")), Object.keys(flags).map(function (k) {
      return React__default.createElement("p", {
        key: k
      }, React__default.createElement("label", null, React__default.createElement("input", {
        type: "checkbox",
        checked: flags[k],
        onChange: function onChange() {
          return onFlagChange(k);
        }
      }), k));
    }));
  }

  return ReactDOM.createPortal(render(), document.body);
}

function FeatureFlagsStore(_ref) {
  var children = _ref.children,
      enableUI = _ref.enableUI;

  var _useState = React.useState({}),
      _useState2 = _slicedToArray(_useState, 2),
      flags = _useState2[0],
      setFlags = _useState2[1];

  return React__default.createElement(FeatureFlagsContext.Provider, {
    value: {
      flags: flags,
      setFlags: setFlags
    }
  }, children, enableUI && React__default.createElement(FeatureFlagsUI, null));
}

function useFeatureFlag(flagName, defaultValue) {
  var _useContext = React.useContext(FeatureFlagsContext),
      flags = _useContext.flags,
      setFlags = _useContext.setFlags;

  console.log("flags", flags);

  if (!(flagName in flags)) {
    setFlags(_objectSpread2({}, flags, _defineProperty({}, flagName, defaultValue)));
  }

  return [flagName in flags ? flags[flagName] : defaultValue, function (value) {
    console.log(flagName, value);
    setFlags(_objectSpread2({}, flags, _defineProperty({}, flagName, value)));
  }];
}

exports.FeatureFlagsContext = FeatureFlagsContext;
exports.FeatureFlagsStore = FeatureFlagsStore;
exports.FeatureFlagsUI = FeatureFlagsUI;
exports.useFeatureFlag = useFeatureFlag;
