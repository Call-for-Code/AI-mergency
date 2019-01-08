'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Spinner = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _InputText = require('../inputtext/InputText');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Spinner = exports.Spinner = function (_Component) {
    _inherits(Spinner, _Component);

    function Spinner(props) {
        _classCallCheck(this, Spinner);

        var _this = _possibleConstructorReturn(this, (Spinner.__proto__ || Object.getPrototypeOf(Spinner)).call(this, props));

        if (Math.floor(_this.props.step) === 0) {
            _this.precision = _this.props.step.toString().split(/[,]|[.]/)[1].length;
        }

        var val = _this.props.value;
        if (val !== undefined && val != null) {
            _this.value = _this.updateValue(val);
        }

        _this.formatValue();
        _this.updateFilledState();

        _this.onInputKeyUp = _this.onInputKeyUp.bind(_this);
        _this.onInputKeyDown = _this.onInputKeyDown.bind(_this);
        _this.onInputKeyPress = _this.onInputKeyPress.bind(_this);
        _this.onInputBlur = _this.onInputBlur.bind(_this);
        _this.onChange = _this.onChange.bind(_this);

        _this.onUpButtonMouseLeave = _this.onUpButtonMouseLeave.bind(_this);
        _this.onUpButtonMouseDown = _this.onUpButtonMouseDown.bind(_this);
        _this.onUpButtonMouseUp = _this.onUpButtonMouseUp.bind(_this);
        _this.onUpButtonKeyDown = _this.onUpButtonKeyDown.bind(_this);
        _this.onUpButtonKeyUp = _this.onUpButtonKeyUp.bind(_this);

        _this.onDownButtonMouseLeave = _this.onDownButtonMouseLeave.bind(_this);
        _this.onDownButtonMouseDown = _this.onDownButtonMouseDown.bind(_this);
        _this.onDownButtonMouseUp = _this.onDownButtonMouseUp.bind(_this);
        _this.onDownButtonKeyDown = _this.onDownButtonKeyDown.bind(_this);
        _this.onDownButtonKeyUp = _this.onDownButtonKeyUp.bind(_this);
        return _this;
    }

    _createClass(Spinner, [{
        key: 'repeat',
        value: function repeat(interval, dir) {
            var _this2 = this;

            var i = interval || 500;

            this.clearTimer();
            this.timer = setTimeout(function () {
                _this2.repeat(40, dir);
            }, i);

            this.spin(dir);
        }
    }, {
        key: 'spin',
        value: function spin(dir) {
            var step = this.props.step * dir;
            var currentValue = this.value || 0;

            if (this.precision) this.value = parseFloat(this.toFixed(currentValue + step, this.precision));else this.value = currentValue + step;

            if (this.props.maxlength !== null && this.value.toString().length > this.props.maxlength) {
                this.value = currentValue;
            }

            if (this.props.min !== null && this.value < this.props.min) {
                this.value = this.props.min;
            }

            if (this.props.max !== null && this.value > this.props.max) {
                this.value = this.props.max;
            }

            this.formatValue();

            this.inputEl.value = this.valueAsString;

            if (this.props.onChange) {
                this.props.onChange({
                    value: this.value
                });
            }
        }
    }, {
        key: 'toFixed',
        value: function toFixed(value, precision) {
            var power = Math.pow(10, precision || 0);
            return String(Math.round(value * power) / power);
        }
    }, {
        key: 'updateValue',
        value: function updateValue(val) {
            if (this.precision) {
                return this.parseValue(parseFloat(val).toFixed(this.precision));
            } else {
                return val;
            }
        }
    }, {
        key: 'onUpButtonMouseDown',
        value: function onUpButtonMouseDown(event) {
            if (!this.props.disabled) {
                this.inputEl.focus();
                this.repeat(null, 1);
                this.updateFilledState();
                event.preventDefault();
            }
        }
    }, {
        key: 'onUpButtonMouseUp',
        value: function onUpButtonMouseUp(event) {
            if (!this.props.disabled) {
                this.clearTimer();
            }
        }
    }, {
        key: 'onUpButtonMouseLeave',
        value: function onUpButtonMouseLeave(event) {
            if (!this.props.disabled) {
                this.clearTimer();
            }
        }
    }, {
        key: 'onUpButtonKeyUp',
        value: function onUpButtonKeyUp(event) {
            if (!this.props.disabled) {
                this.clearTimer();
            }
        }
    }, {
        key: 'onUpButtonKeyDown',
        value: function onUpButtonKeyDown(event) {
            if (event.which === 32 || event.which === 13) {
                this.repeat(null, 1);
                this.updateFilledState();
            }
        }
    }, {
        key: 'onDownButtonMouseDown',
        value: function onDownButtonMouseDown(event, focusInput) {
            if (!this.props.disabled) {
                this.inputEl.focus();
                this.repeat(null, -1);
                this.updateFilledState();

                event.preventDefault();
            }
        }
    }, {
        key: 'onDownButtonMouseUp',
        value: function onDownButtonMouseUp(event) {
            if (!this.props.disabled) {
                this.clearTimer();
            }
        }
    }, {
        key: 'onDownButtonMouseLeave',
        value: function onDownButtonMouseLeave(event) {
            if (!this.props.disabled) {
                this.clearTimer();
            }
        }
    }, {
        key: 'onDownButtonKeyUp',
        value: function onDownButtonKeyUp(event) {
            if (!this.props.disabled) {
                this.clearTimer();
            }
        }
    }, {
        key: 'onDownButtonKeyDown',
        value: function onDownButtonKeyDown(event) {
            if (event.which === 32 || event.which === 13) {
                this.repeat(null, -1);
                this.updateFilledState();
            }
        }
    }, {
        key: 'onInputKeyDown',
        value: function onInputKeyDown(event) {
            if (event.which === 38) {
                this.spin(1);
                event.preventDefault();
            } else if (event.which === 40) {
                this.spin(-1);
                event.preventDefault();
            }
        }
    }, {
        key: 'onInputKeyPress',
        value: function onInputKeyPress(event) {
            var inputChar = String.fromCharCode(event.charCode);
            var keyPattern = /[0-9+-]/;
            if (!keyPattern.test(inputChar) && inputChar !== this.props.decimalSeparator) {
                event.preventDefault();
            }
        }
    }, {
        key: 'onInputKeyUp',
        value: function onInputKeyUp(event) {
            var _this3 = this;

            var inputValue = event.target.value;
            if (event.key === this.props.decimalSeparator && event.key === this.props.thousandSeparator) this.value = inputValue;else this.value = this.parseValue(inputValue);

            this.formatValue();
            setTimeout(function () {
                _this3.inputEl.value = _this3.valueAsString;
            }, 5000);

            if (this.props.onChange) {
                this.props.onChange({
                    value: this.value
                });
            }
            this.updateFilledState();
        }
    }, {
        key: 'onInputBlur',
        value: function onInputBlur(event) {
            var val = this.value;
            if (val !== undefined && val !== null) {
                this.value = this.updateValue(val);
            }

            this.formatValue();
            this.updateFilledState();

            if (this.inputEl.value !== this.valueAsString) {
                this.inputEl.value = this.valueAsString;

                if (this.props.onChange) {
                    this.props.onChange({
                        value: this.value
                    });
                }
            }
        }
    }, {
        key: 'parseValue',
        value: function parseValue(val) {
            var value = void 0;
            val = val.split(this.props.thousandSeparator).join('');
            if (val.trim() === '') {
                value = this.props.min !== null ? this.props.min : null;
            } else {
                if (this.precision) {
                    value = parseFloat(val.replace(',', '.'));
                } else {
                    value = parseInt(val, 10);
                }

                if (!isNaN(value)) {
                    if (this.props.max !== null && value > this.props.max) {
                        value = this.props.max;
                    }

                    if (this.props.min !== null && value < this.props.min) {
                        value = this.props.min;
                    }
                } else {
                    value = null;
                }
            }

            return value;
        }
    }, {
        key: 'formatValue',
        value: function formatValue() {
            if (this.value !== null && this.value !== undefined) {
                var textValue = String(this.value).replace('.', this.props.decimalSeparator);
                textValue = textValue.replace(/\B(?=(\d{3})+(?!\d))/g, this.props.thousandSeparator);
                this.valueAsString = textValue;
            } else {
                this.valueAsString = '';
            }
        }
    }, {
        key: 'onChange',
        value: function onChange() {
            if (this.props.onChange) {
                this.props.onChange({
                    value: this.value
                });
            }
        }
    }, {
        key: 'clearTimer',
        value: function clearTimer() {
            if (this.timer) {
                clearInterval(this.timer);
            }
        }
    }, {
        key: 'updateFilledState',
        value: function updateFilledState() {
            this.filled = this.value !== undefined && this.value != null;
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.inputEl.value = this.valueAsString;
        }
    }, {
        key: 'renderInputElement',
        value: function renderInputElement() {
            var _this4 = this;

            var className = (0, _classnames2.default)('ui-spinner-input', this.props.inputClassName);

            return _react2.default.createElement(_InputText.InputText, { ref: function ref(el) {
                    return _this4.inputEl = _reactDom2.default.findDOMNode(el);
                }, id: this.props.inputId, style: this.props.inputStyle, className: className,
                type: 'text', size: this.props.size, maxLength: this.props.maxlength, disabled: this.props.disabled, readOnly: this.props.readonly, name: this.props.name,
                onKeyDown: this.onInputKeyDown, onKeyUp: this.onInputKeyUp, onKeyPress: this.onInputKeyPress,
                onBlur: this.onInputBlur, onChange: this.onChange, onFocus: this.onInputFocus });
        }
    }, {
        key: 'renderUpButton',
        value: function renderUpButton() {
            var className = (0, _classnames2.default)("ui-spinner-button ui-spinner-up ui-corner-tr ui-button ui-widget ui-state-default", {
                'ui-state-disabled': this.props.disabled
            });

            return _react2.default.createElement(
                'button',
                { type: 'button', className: className, onMouseLeave: this.onUpButtonMouseLeave, onMouseDown: this.onUpButtonMouseDown, onMouseUp: this.onUpButtonMouseUp,
                    onKeyDown: this.onUpButtonKeyDown, onKeyUp: this.onUpButtonKeyUp, disabled: this.props.disabled },
                _react2.default.createElement('span', { className: 'ui-spinner-button-icon pi pi-caret-up' })
            );
        }
    }, {
        key: 'renderDownButton',
        value: function renderDownButton() {
            var className = (0, _classnames2.default)("ui-spinner-button ui-spinner-down ui-corner-br ui-button ui-widget ui-state-default", {
                'ui-state-disabled': this.props.disabled
            });

            return _react2.default.createElement(
                'button',
                { type: 'button', className: className, onMouseLeave: this.onDownButtonMouseLeave, onMouseDown: this.onDownButtonMouseDown, onMouseUp: this.onDownButtonMouseUp,
                    onKeyDown: this.onDownButtonKeyDown, onKeyUp: this.onDownButtonKeyUp, disabled: this.props.disabled },
                _react2.default.createElement('span', { className: 'ui-spinner-button-icon pi pi-caret-down' })
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var className = (0, _classnames2.default)("ui-spinner ui-widget ui-corner-all");
            var inputElement = this.renderInputElement();
            var upButton = this.renderUpButton();
            var downButton = this.renderDownButton();

            return _react2.default.createElement(
                'span',
                { id: this.props.id, className: className, style: this.props.style },
                inputElement,
                upButton,
                downButton
            );
        }
    }]);

    return Spinner;
}(_react.Component);

Spinner.defaultProps = {
    id: null,
    value: null,
    name: null,
    step: 1,
    min: null,
    max: null,
    disabled: false,
    readonly: false,
    maxlength: null,
    size: null,
    decimalSeparator: '.',
    thousandSeparator: ',',
    style: null,
    className: null,
    inputId: null,
    inputStyle: null,
    inputClassName: null,
    onChange: null
};
Spinner.propsTypes = {
    id: _propTypes2.default.string,
    value: _propTypes2.default.number,
    name: _propTypes2.default.string,
    step: _propTypes2.default.number,
    min: _propTypes2.default.number,
    max: _propTypes2.default.number,
    disabled: _propTypes2.default.bool,
    readonly: _propTypes2.default.bool,
    maxlength: _propTypes2.default.number,
    size: _propTypes2.default.number,
    decimalSeparator: _propTypes2.default.string,
    thousandSeparator: _propTypes2.default.string,
    style: _propTypes2.default.object,
    className: _propTypes2.default.string,
    inputId: _propTypes2.default.string,
    inputStyle: _propTypes2.default.object,
    inputClassName: _propTypes2.default.string,
    onChange: _propTypes2.default.func
};