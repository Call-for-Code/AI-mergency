'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SelectButton = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ObjectUtils = require('../utils/ObjectUtils');

var _ObjectUtils2 = _interopRequireDefault(_ObjectUtils);

var _SelectButtonItem = require('./SelectButtonItem');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SelectButton = exports.SelectButton = function (_Component) {
    _inherits(SelectButton, _Component);

    function SelectButton(props) {
        _classCallCheck(this, SelectButton);

        var _this = _possibleConstructorReturn(this, (SelectButton.__proto__ || Object.getPrototypeOf(SelectButton)).call(this, props));

        _this.state = {};
        _this.onOptionClick = _this.onOptionClick.bind(_this);
        return _this;
    }

    _createClass(SelectButton, [{
        key: 'onOptionClick',
        value: function onOptionClick(event) {
            var _this2 = this;

            if (this.props.disabled) {
                return;
            }

            var selected = this.isSelected(event.option);
            var optionValue = this.getOptionValue(event.option);
            var newValue = void 0;

            if (this.props.multiple) {
                var currentValue = this.props.value ? [].concat(_toConsumableArray(this.props.value)) : [];

                if (selected) newValue = currentValue.filter(function (val) {
                    return !_ObjectUtils2.default.equals(val, optionValue, _this2.props.dataKey);
                });else newValue = [].concat(_toConsumableArray(currentValue), [optionValue]);
            } else {
                if (selected) newValue = null;else newValue = optionValue;
            }

            if (this.props.onChange) {
                this.props.onChange({
                    originalEvent: event.originalEvent,
                    value: newValue
                });
            }
        }
    }, {
        key: 'getOptionValue',
        value: function getOptionValue(option) {
            return this.props.optionLabel ? option : option.value;
        }
    }, {
        key: 'getOptionLabel',
        value: function getOptionLabel(option) {
            return this.props.optionLabel ? _ObjectUtils2.default.resolveFieldData(option, this.props.optionLabel) : option.label;
        }
    }, {
        key: 'isSelected',
        value: function isSelected(option) {
            var selected = false;
            var optionValue = this.getOptionValue(option);

            if (this.props.multiple) {
                if (this.props.value && this.props.value.length) {
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = this.props.value[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var val = _step.value;

                            if (_ObjectUtils2.default.equals(val, optionValue, this.props.dataKey)) {
                                selected = true;
                                break;
                            }
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }
                        } finally {
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }
                }
            } else {
                selected = _ObjectUtils2.default.equals(this.props.value, optionValue, this.props.dataKey);
            }

            return selected;
        }
    }, {
        key: 'renderItems',
        value: function renderItems() {
            var _this3 = this;

            if (this.props.options && this.props.options.length) {
                return this.props.options.map(function (option, index) {
                    var optionLabel = _this3.getOptionLabel(option);

                    return _react2.default.createElement(_SelectButtonItem.SelectButtonItem, { key: optionLabel, label: optionLabel, option: option, onClick: _this3.onOptionClick,
                        selected: _this3.isSelected(option), tabIndex: _this3.props.tabIndex, disabled: _this3.props.disabled });
                });
            } else {
                return null;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var className = (0, _classnames2.default)('ui-selectbutton ui-buttonset ui-widget ui-corner-all ui-buttonset-3', this.props.className);
            var items = this.renderItems();

            return _react2.default.createElement(
                'div',
                { id: this.props.id },
                _react2.default.createElement(
                    'div',
                    { className: className, style: this.props.style },
                    items
                )
            );
        }
    }]);

    return SelectButton;
}(_react.Component);

SelectButton.defaultProps = {
    id: null,
    value: null,
    options: null,
    optionLabel: null,
    tabIndex: null,
    multiple: null,
    disabled: null,
    style: null,
    className: null,
    dataKey: null,
    onChange: null
};
SelectButton.propTypes = {
    id: _propTypes2.default.string,
    value: _propTypes2.default.any,
    options: _propTypes2.default.array,
    optionLabel: _propTypes2.default.string,
    tabIndex: _propTypes2.default.string,
    multiple: _propTypes2.default.bool,
    disabled: _propTypes2.default.bool,
    style: _propTypes2.default.object,
    className: _propTypes2.default.string,
    dataKey: _propTypes2.default.string,
    onChange: _propTypes2.default.func
};