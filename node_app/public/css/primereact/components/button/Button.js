'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Button = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Button = exports.Button = function (_Component) {
    _inherits(Button, _Component);

    function Button() {
        _classCallCheck(this, Button);

        return _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).apply(this, arguments));
    }

    _createClass(Button, [{
        key: 'renderIcon',
        value: function renderIcon() {
            if (this.props.icon) {
                var className = (0, _classnames2.default)(this.props.icon, 'ui-c', {
                    'ui-button-icon-left': this.props.iconPos !== 'right',
                    'ui-button-icon-right': this.props.iconPos === 'right'
                });

                return _react2.default.createElement('span', { className: className });
            } else {
                return null;
            }
        }
    }, {
        key: 'renderLabel',
        value: function renderLabel() {
            var buttonLabel = this.props.label || 'ui-btn';

            return _react2.default.createElement(
                'span',
                { className: 'ui-button-text ui-c' },
                buttonLabel
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var className = (0, _classnames2.default)('ui-button ui-widget ui-state-default', this.props.cornerStyleClass, this.props.className, {
                'ui-button-icon-only': this.props.icon && !this.props.label,
                'ui-button-text-icon-left': this.props.icon && this.props.label && this.props.iconPos === 'left',
                'ui-button-text-icon-right': this.props.icon && this.props.label && this.props.iconPos === 'right',
                'ui-button-text-only': !this.props.icon && this.props.label,
                'ui-state-disabled': this.props.disabled
            });
            var icon = this.renderIcon();
            var label = this.renderLabel();

            var buttonProps = Object.assign({}, this.props);
            delete buttonProps.iconPos;
            delete buttonProps.icon;
            delete buttonProps.label;
            delete buttonProps.cornerStyleClass;

            return _react2.default.createElement(
                'button',
                _extends({}, buttonProps, { className: className }),
                this.props.iconPos === 'left' && icon,
                label,
                this.props.iconPos === 'right' && icon,
                this.props.children
            );
        }
    }]);

    return Button;
}(_react.Component);

Button.defaultProps = {
    label: null,
    icon: null,
    iconPos: 'left',
    cornerStyleClass: 'ui-corner-all'
};
Button.propTypes = {
    label: _propTypes2.default.string,
    icon: _propTypes2.default.string,
    iconPos: _propTypes2.default.string,
    cornerStyleClass: _propTypes2.default.string
};