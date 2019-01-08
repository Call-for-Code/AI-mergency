'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GrowlMessage = undefined;

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

var GrowlMessage = exports.GrowlMessage = function (_Component) {
    _inherits(GrowlMessage, _Component);

    function GrowlMessage(props) {
        _classCallCheck(this, GrowlMessage);

        var _this = _possibleConstructorReturn(this, (GrowlMessage.__proto__ || Object.getPrototypeOf(GrowlMessage)).call(this, props));

        _this.onClick = _this.onClick.bind(_this);
        _this.onClose = _this.onClose.bind(_this);
        return _this;
    }

    _createClass(GrowlMessage, [{
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.timeout) {
                clearTimeout(this.timeout);
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            if (!this.props.message.sticky) {
                this.timeout = setTimeout(function () {
                    _this2.onClose(null);
                }, this.props.message.life || 3000);
            }
        }
    }, {
        key: 'onClose',
        value: function onClose(event) {
            if (this.timeout) {
                clearTimeout(this.timeout);
            }

            if (this.props.onClose) {
                this.props.onClose(this.props.message);
            }

            if (event) {
                event.preventDefault();
            }
        }
    }, {
        key: 'onClick',
        value: function onClick() {
            if (this.props.onClick) {
                this.props.onClick(this.props.message);
            }
        }
    }, {
        key: 'renderCloseIcon',
        value: function renderCloseIcon() {
            if (this.props.message.closable !== false) {
                return _react2.default.createElement(
                    'a',
                    { className: 'ui-growl-icon-close pi pi-times', onClick: this.onClose },
                    _react2.default.createElement('span', null)
                );
            } else {
                return null;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var className = (0, _classnames2.default)('ui-growl-item-container ui-state-highlight ui-corner-all ui-shadow', {
                'ui-growl-message-info': this.props.message.severity === 'info',
                'ui-growl-message-warn': this.props.message.severity === 'warn',
                'ui-growl-message-error': this.props.message.severity === 'error',
                'ui-growl-message-success': this.props.message.severity === 'success'
            });

            var iconClassName = (0, _classnames2.default)('ui-growl-image pi', {
                'pi-info-circle': this.props.message.severity === 'info',
                'pi-exclamation-triangle': this.props.message.severity === 'warn',
                'pi-times': this.props.message.severity === 'error',
                'pi-check': this.props.message.severity === 'success'
            });

            var closeIcon = this.renderCloseIcon();

            return _react2.default.createElement(
                'div',
                { ref: function ref(el) {
                        _this3.element = el;
                    }, className: className, 'aria-live': 'polite', onClick: this.onClick },
                _react2.default.createElement(
                    'div',
                    { className: 'ui-growl-item ui-helper-clearfix' },
                    closeIcon,
                    _react2.default.createElement('span', { className: iconClassName }),
                    _react2.default.createElement(
                        'div',
                        { className: 'ui-growl-message' },
                        _react2.default.createElement(
                            'span',
                            { className: 'ui-growl-title' },
                            this.props.message.summary
                        ),
                        _react2.default.createElement(
                            'p',
                            null,
                            this.props.message.detail
                        )
                    )
                )
            );
        }
    }]);

    return GrowlMessage;
}(_react.Component);

GrowlMessage.defaultProps = {
    message: null,
    onClose: null,
    onClick: null
};
GrowlMessage.propTypes = {
    message: _propTypes2.default.object,
    onClose: _propTypes2.default.func,
    onClick: _propTypes2.default.func
};