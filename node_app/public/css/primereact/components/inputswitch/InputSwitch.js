'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.InputSwitch = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _DomHandler = require('../utils/DomHandler');

var _DomHandler2 = _interopRequireDefault(_DomHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InputSwitch = exports.InputSwitch = function (_Component) {
    _inherits(InputSwitch, _Component);

    function InputSwitch(props) {
        _classCallCheck(this, InputSwitch);

        var _this = _possibleConstructorReturn(this, (InputSwitch.__proto__ || Object.getPrototypeOf(InputSwitch)).call(this, props));

        _this.onClick = _this.onClick.bind(_this);
        _this.toggle = _this.toggle.bind(_this);
        _this.onFocus = _this.onFocus.bind(_this);
        _this.onBlur = _this.onBlur.bind(_this);
        return _this;
    }

    _createClass(InputSwitch, [{
        key: 'onClick',
        value: function onClick(event) {
            if (this.props.disabled) {
                return;
            }

            this.toggle(event);
            this.input.focus();
        }
    }, {
        key: 'toggle',
        value: function toggle(event) {
            if (this.props.onChange) {
                this.props.onChange({
                    originalEvent: event,
                    value: !this.props.checked
                });
            }
        }
    }, {
        key: 'onFocus',
        value: function onFocus(event) {
            _DomHandler2.default.addClass(this.container, 'ui-inputswitch-focus');

            if (this.props.onFocus) {
                this.props.onFocus(event);
            }
        }
    }, {
        key: 'onBlur',
        value: function onBlur(event) {
            _DomHandler2.default.removeClass(this.container, 'ui-inputswitch-focus');

            if (this.props.onBlur) {
                this.props.onBlur(event);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var className = (0, _classnames2.default)('ui-inputswitch ui-widget', this.props.className, {
                'ui-inputswitch-checked': this.props.checked,
                'ui-state-disabled': this.props.disabled
            });

            return _react2.default.createElement(
                'div',
                { ref: function ref(el) {
                        return _this2.container = el;
                    }, id: this.props.id, className: className, style: this.props.style, onClick: this.onClick, role: 'checkbox', 'aria-checked': this.props.checked },
                _react2.default.createElement(
                    'div',
                    { className: 'ui-helper-hidden-accessible' },
                    _react2.default.createElement('input', { ref: function ref(el) {
                            return _this2.input = el;
                        }, type: 'checkbox', id: this.props.inputId, name: this.props.name, checked: this.props.checked, onChange: this.toggle,
                        onFocus: this.onFocus, onBlur: this.onBlur, disabled: this.props.disabled })
                ),
                _react2.default.createElement('span', { className: 'ui-inputswitch-slider' })
            );
        }
    }]);

    return InputSwitch;
}(_react.Component);

InputSwitch.defaultProps = {
    id: null,
    style: null,
    className: null,
    inputId: null,
    name: null,
    checked: false,
    disabled: false,
    onChange: null
};
InputSwitch.propsTypes = {
    id: _propTypes2.default.string,
    style: _propTypes2.default.object,
    className: _propTypes2.default.string,
    inputId: _propTypes2.default.string,
    name: _propTypes2.default.string,
    checked: _propTypes2.default.bool,
    disabled: _propTypes2.default.bool,
    onChange: _propTypes2.default.func,
    onFocus: _propTypes2.default.func,
    onBlur: _propTypes2.default.func
};