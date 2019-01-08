'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MultiSelect = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _DomHandler = require('../utils/DomHandler');

var _DomHandler2 = _interopRequireDefault(_DomHandler);

var _ObjectUtils = require('../utils/ObjectUtils');

var _ObjectUtils2 = _interopRequireDefault(_ObjectUtils);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _MultiSelectPanel = require('./MultiSelectPanel');

var _MultiSelectItem = require('./MultiSelectItem');

var _MultiSelectHeader = require('./MultiSelectHeader');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MultiSelect = exports.MultiSelect = function (_Component) {
    _inherits(MultiSelect, _Component);

    function MultiSelect(props) {
        _classCallCheck(this, MultiSelect);

        var _this = _possibleConstructorReturn(this, (MultiSelect.__proto__ || Object.getPrototypeOf(MultiSelect)).call(this, props));

        _this.state = {
            filter: ''
        };

        _this.onClick = _this.onClick.bind(_this);
        _this.onPanelClick = _this.onPanelClick.bind(_this);
        _this.onOptionClick = _this.onOptionClick.bind(_this);
        _this.onFocus = _this.onFocus.bind(_this);
        _this.onBlur = _this.onBlur.bind(_this);
        _this.onFilter = _this.onFilter.bind(_this);
        _this.onCloseClick = _this.onCloseClick.bind(_this);
        _this.onToggleAll = _this.onToggleAll.bind(_this);
        return _this;
    }

    _createClass(MultiSelect, [{
        key: 'onOptionClick',
        value: function onOptionClick(event) {
            var optionValue = this.getOptionValue(event.option);
            var selectionIndex = this.findSelectionIndex(optionValue);
            var newValue = void 0;

            if (selectionIndex !== -1) newValue = this.props.value.filter(function (val, i) {
                return i !== selectionIndex;
            });else newValue = [].concat(_toConsumableArray(this.props.value || []), [optionValue]);

            this.updateModel(event.originalEvent, newValue);
        }
    }, {
        key: 'onClick',
        value: function onClick() {
            if (this.props.disabled) {
                return;
            }

            if (this.documentClickListener) {
                this.selfClick = true;
            }

            if (!this.panelClick) {
                if (this.panel.element.offsetParent) {
                    this.hide();
                } else {
                    this.focusInput.focus();
                    this.show();
                }
            }
        }
    }, {
        key: 'onToggleAll',
        value: function onToggleAll(event) {
            var newValue = void 0;

            if (event.checked) {
                newValue = [];
            } else {
                var options = this.hasFilter() ? this.filterOptions(this.props.options) : this.props.options;
                if (options) {
                    newValue = [];
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = options[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var option = _step.value;

                            newValue.push(this.getOptionValue(option));
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
            }

            this.updateModel(event.originalEvent, newValue);
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
        key: 'onFilter',
        value: function onFilter(event) {
            this.setState({ filter: event.query });
        }
    }, {
        key: 'onPanelClick',
        value: function onPanelClick() {
            this.panelClick = true;
        }
    }, {
        key: 'show',
        value: function show() {
            var _this2 = this;

            if (this.props.options && this.props.options.length) {
                this.panel.element.style.zIndex = String(_DomHandler2.default.generateZIndex());
                this.panel.element.style.display = 'block';

                setTimeout(function () {
                    _DomHandler2.default.addClass(_this2.panel.element, 'ui-input-overlay-visible');
                    _DomHandler2.default.removeClass(_this2.panel.element, 'ui-input-overlay-hidden');
                }, 1);

                this.alignPanel();
                this.bindDocumentClickListener();
            }
        }
    }, {
        key: 'hide',
        value: function hide() {
            var _this3 = this;

            _DomHandler2.default.addClass(this.panel.element, 'ui-input-overlay-hidden');
            _DomHandler2.default.removeClass(this.panel.element, 'ui-input-overlay-visible');
            this.unbindDocumentClickListener();
            this.clearClickState();

            setTimeout(function () {
                _this3.panel.element.style.display = 'none';
                _DomHandler2.default.removeClass(_this3.panel.element, 'ui-input-overlay-hidden');
            }, 150);
        }
    }, {
        key: 'alignPanel',
        value: function alignPanel() {
            if (this.props.appendTo) {
                _DomHandler2.default.absolutePosition(this.panel.element, this.container);
                this.panel.element.style.minWidth = _DomHandler2.default.getWidth(this.container) + 'px';
            } else {
                _DomHandler2.default.relativePosition(this.panel.element, this.container);
            }
        }
    }, {
        key: 'onCloseClick',
        value: function onCloseClick(event) {
            this.hide();
            event.preventDefault();
            event.stopPropagation();
        }
    }, {
        key: 'findSelectionIndex',
        value: function findSelectionIndex(value) {
            var index = -1;

            if (this.props.value) {
                for (var i = 0; i < this.props.value.length; i++) {
                    if (_ObjectUtils2.default.equals(this.props.value[i], value, this.props.dataKey)) {
                        index = i;
                        break;
                    }
                }
            }

            return index;
        }
    }, {
        key: 'isSelected',
        value: function isSelected(option) {
            return this.findSelectionIndex(this.getOptionValue(option)) !== -1;
        }
    }, {
        key: 'getLabel',
        value: function getLabel() {
            var label = void 0;

            if (this.props.value && this.props.value.length) {
                label = '';
                for (var i = 0; i < this.props.value.length; i++) {
                    if (i !== 0) {
                        label += ',';
                    }
                    label += this.findLabelByValue(this.props.value[i]);
                }
            } else {
                label = this.props.defaultLabel;
            }

            return label;
        }
    }, {
        key: 'findLabelByValue',
        value: function findLabelByValue(val) {
            var label = null;

            for (var i = 0; i < this.props.options.length; i++) {
                var option = this.props.options[i];
                var optionValue = this.getOptionValue(option);

                if (_ObjectUtils2.default.equals(optionValue, val)) {
                    label = this.getOptionLabel(option);
                    break;
                }
            }

            return label;
        }
    }, {
        key: 'onFocus',
        value: function onFocus() {
            _DomHandler2.default.addClass(this.container, 'ui-state-focus');
        }
    }, {
        key: 'onBlur',
        value: function onBlur() {
            _DomHandler2.default.removeClass(this.container, 'ui-state-focus');
        }
    }, {
        key: 'bindDocumentClickListener',
        value: function bindDocumentClickListener() {
            if (!this.documentClickListener) {
                this.documentClickListener = this.onDocumentClick.bind(this);
                document.addEventListener('click', this.documentClickListener);
            }
        }
    }, {
        key: 'unbindDocumentClickListener',
        value: function unbindDocumentClickListener() {
            if (this.documentClickListener) {
                document.removeEventListener('click', this.documentClickListener);
                this.documentClickListener = null;
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.unbindDocumentClickListener();
        }
    }, {
        key: 'onDocumentClick',
        value: function onDocumentClick() {
            if (!this.selfClick && !this.panelClick && this.panel.element.offsetParent) {
                this.hide();
            }

            this.clearClickState();
        }
    }, {
        key: 'clearClickState',
        value: function clearClickState() {
            this.selfClick = false;
            this.panelClick = false;
        }
    }, {
        key: 'filterOption',
        value: function filterOption(option) {
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
        key: 'isAllChecked',
        value: function isAllChecked(visibleOptions) {
            if (this.hasFilter()) return this.props.value && visibleOptions && visibleOptions.length && this.props.value.length === visibleOptions.length;else return this.props.value && this.props.options && this.props.value.length === this.props.options.length;
        }
    }, {
        key: 'filterOptions',
        value: function filterOptions(options) {
            var _this4 = this;

            return options.filter(function (option) {
                return _this4.filterOption(option);
            });
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
        key: 'renderHeader',
        value: function renderHeader(items) {
            return _react2.default.createElement(_MultiSelectHeader.MultiSelectHeader, { filter: this.props.filter, filterValue: this.state.filter, onFilter: this.onFilter,
                onClose: this.onCloseClick, onToggleAll: this.onToggleAll, allChecked: this.isAllChecked(items) });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this5 = this;

            var className = (0, _classnames2.default)('ui-multiselect ui-widget ui-state-default ui-corner-all', this.props.className, {
                'ui-state-disabled': this.props.disabled
            });
            var label = this.getLabel();
            var items = this.props.options;

            if (items) {
                if (this.hasFilter()) {
                    items = this.filterOptions(items);
                }

                items = items.map(function (option, index) {
                    var optionLabel = _this5.getOptionLabel(option);

                    return _react2.default.createElement(_MultiSelectItem.MultiSelectItem, { key: optionLabel + '_' + index, label: optionLabel, option: option, template: _this5.props.itemTemplate,
                        selected: _this5.isSelected(option), onClick: _this5.onOptionClick });
                });
            }

            var header = this.renderHeader(items);

            return _react2.default.createElement(
                'div',
                { id: this.props.id, className: className, onClick: this.onClick, ref: function ref(el) {
                        _this5.container = el;
                    }, style: this.props.style },
                _react2.default.createElement(
                    'div',
                    { className: 'ui-helper-hidden-accessible' },
                    _react2.default.createElement('input', { readOnly: true, type: 'text', onFocus: this.onFocus, onBlur: this.onBlur, ref: function ref(el) {
                            _this5.focusInput = el;
                        } })
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'ui-multiselect-label-container', title: 'Choose' },
                    _react2.default.createElement(
                        'label',
                        { className: 'ui-multiselect-label ui-corner-all' },
                        label
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'ui-multiselect-trigger ui-state-default ui-corner-right' },
                    _react2.default.createElement('span', { className: 'ui-multiselect-trigger-icon pi pi-caret-down ui-c' })
                ),
                _react2.default.createElement(
                    _MultiSelectPanel.MultiSelectPanel,
                    { ref: function ref(el) {
                            return _this5.panel = el;
                        }, header: header, appendTo: this.props.appendTo, onClick: this.onPanelClick,
                        scrollHeight: this.props.scrollHeight },
                    items
                )
            );
        }
    }]);

    return MultiSelect;
}(_react.Component);

MultiSelect.defaultProps = {
    id: null,
    value: null,
    options: null,
    optionLabel: null,
    style: null,
    className: null,
    scrollHeight: '200px',
    defaultLabel: 'Choose',
    disabled: false,
    filter: false,
    dataKey: null,
    appendTo: null,
    itemTemplate: null,
    onChange: null
};
MultiSelect.propTypes = {
    id: _propTypes2.default.string,
    value: _propTypes2.default.any,
    options: _propTypes2.default.array,
    optionLabel: _propTypes2.default.string,
    style: _propTypes2.default.object,
    className: _propTypes2.default.string,
    scrollHeight: _propTypes2.default.string,
    defaultLabel: _propTypes2.default.string,
    disabled: _propTypes2.default.bool,
    filter: _propTypes2.default.bool,
    dataKey: _propTypes2.default.string,
    appendTo: _propTypes2.default.object,
    itemTemplate: _propTypes2.default.func,
    onChange: _propTypes2.default.func
};