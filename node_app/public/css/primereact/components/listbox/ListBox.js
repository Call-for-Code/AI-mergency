'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ListBox = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ObjectUtils = require('../utils/ObjectUtils');

var _ObjectUtils2 = _interopRequireDefault(_ObjectUtils);

var _ListBoxItem = require('./ListBoxItem');

var _ListBoxHeader = require('./ListBoxHeader');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ListBox = exports.ListBox = function (_Component) {
    _inherits(ListBox, _Component);

    function ListBox() {
        _classCallCheck(this, ListBox);

        var _this = _possibleConstructorReturn(this, (ListBox.__proto__ || Object.getPrototypeOf(ListBox)).call(this));

        _this.state = {
            filter: ''
        };

        _this.onFilter = _this.onFilter.bind(_this);
        _this.onOptionClick = _this.onOptionClick.bind(_this);
        return _this;
    }

    _createClass(ListBox, [{
        key: 'onOptionClick',
        value: function onOptionClick(event) {
            if (this.props.disabled) {
                return;
            }

            if (this.props.multiple) this.onOptionClickMultiple(event.originalEvent, event.option);else this.onOptionClickSingle(event.originalEvent, event.option);

            this.optionTouched = false;
        }
    }, {
        key: 'onOptionTouchEnd',
        value: function onOptionTouchEnd(event, option) {
            if (this.props.disabled) {
                return;
            }

            this.optionTouched = true;
        }
    }, {
        key: 'onOptionClickSingle',
        value: function onOptionClickSingle(event, option) {
            var selected = this.isSelected(option);
            var valueChanged = false;
            var value = null;
            var metaSelection = this.optionTouched ? false : this.props.metaKeySelection;

            if (metaSelection) {
                var metaKey = event.metaKey || event.ctrlKey;

                if (selected) {
                    if (metaKey) {
                        value = null;
                        valueChanged = true;
                    }
                } else {
                    value = this.getOptionValue(option);
                    valueChanged = true;
                }
            } else {
                value = selected ? null : this.getOptionValue(option);
                valueChanged = true;
            }

            if (valueChanged) {
                this.updateModel(event, value);
            }
        }
    }, {
        key: 'onOptionClickMultiple',
        value: function onOptionClickMultiple(event, option) {
            var selected = this.isSelected(option);
            var valueChanged = false;
            var value = null;
            var metaSelection = this.optionTouched ? false : this.props.metaKeySelection;

            if (metaSelection) {
                var metaKey = event.metaKey || event.ctrlKey;

                if (selected) {
                    if (metaKey) value = this.removeOption(option);else value = [this.getOptionValue(option)];

                    valueChanged = true;
                } else {
                    value = metaKey ? this.props.value || [] : [];
                    value = [].concat(_toConsumableArray(value), [this.getOptionValue(option)]);
                    valueChanged = true;
                }
            } else {
                if (selected) value = this.removeOption(option);else value = [].concat(_toConsumableArray(this.props.value || []), [this.getOptionValue(option)]);

                valueChanged = true;
            }

            if (valueChanged) {
                this.props.onChange({
                    originalEvent: event,
                    value: value
                });
            }
        }
    }, {
        key: 'onFilter',
        value: function onFilter(event) {
            this.setState({ filter: event.query });
        }
    }, {
        key: 'updateModel',
        value: function updateModel(event, value) {
            if (this.props.onChange) {
                this.props.onChange({
                    originalEvent: event,
                    value: value
                });
            }
        }
    }, {
        key: 'removeOption',
        value: function removeOption(option) {
            var _this2 = this;

            return this.props.value.filter(function (val) {
                return !_ObjectUtils2.default.equals(val, _this2.getOptionValue(option), _this2.props.dataKey);
            });
        }
    }, {
        key: 'isSelected',
        value: function isSelected(option) {
            var selected = false;
            var optionValue = this.getOptionValue(option);

            if (this.props.multiple) {
                if (this.props.value) {
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
        key: 'filter',
        value: function filter(option) {
            var filterValue = this.state.filter.trim().toLowerCase();
            var optionLabel = this.getOptionLabel(option);

            return optionLabel.toLowerCase().indexOf(filterValue.toLowerCase()) > -1;
        }
    }, {
        key: 'hasFilter',
        value: function hasFilter() {
            return this.state.filter && this.state.filter.trim().length > 0;
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
        key: 'render',
        value: function render() {
            var _this3 = this;

            var className = (0, _classnames2.default)('ui-listbox ui-inputtext ui-widget ui-widget-content ui-corner-all', this.props.className, {
                'ui-state-disabled': this.props.disabled
            });
            var items = this.props.options;
            var header = void 0;

            if (this.props.options) {
                if (this.hasFilter()) {
                    items = items.filter(function (option) {
                        return _this3.filter(option);
                    });
                }

                items = items.map(function (option, index) {
                    var optionLabel = _this3.getOptionLabel(option);

                    return _react2.default.createElement(_ListBoxItem.ListBoxItem, { key: optionLabel, label: optionLabel, option: option, template: _this3.props.itemTemplate, selected: _this3.isSelected(option),
                        onClick: _this3.onOptionClick, onTouchEnd: function onTouchEnd(e) {
                            return _this3.onOptionTouchEnd(e, option, index);
                        } });
                });
            }

            if (this.props.filter) {
                header = _react2.default.createElement(_ListBoxHeader.ListBoxHeader, { filter: this.state.filter, onFilter: this.onFilter, disabled: this.props.disabled });
            }

            return _react2.default.createElement(
                'div',
                { id: this.props.id, className: className, style: this.props.style },
                header,
                _react2.default.createElement(
                    'div',
                    { className: 'ui-listbox-list-wrapper' },
                    _react2.default.createElement(
                        'ul',
                        { className: 'ui-listbox-list', style: this.props.listStyle },
                        items
                    )
                )
            );
        }
    }]);

    return ListBox;
}(_react.Component);

ListBox.defaultProps = {
    id: null,
    value: null,
    options: null,
    optionLabel: null,
    itemTemplate: null,
    style: null,
    listStyle: null,
    className: null,
    disabled: null,
    dataKey: null,
    multiple: false,
    metaKeySelection: false,
    filter: false,
    onChange: null
};
ListBox.propTypes = {
    id: _propTypes2.default.string,
    value: _propTypes2.default.any,
    options: _propTypes2.default.array,
    optionLabel: _propTypes2.default.string,
    itemTemplate: _propTypes2.default.func,
    style: _propTypes2.default.object,
    listStyle: _propTypes2.default.object,
    className: _propTypes2.default.string,
    dataKey: _propTypes2.default.string,
    multiple: _propTypes2.default.bool,
    metaKeySelection: _propTypes2.default.bool,
    filter: _propTypes2.default.bool,
    onChange: _propTypes2.default.func
};