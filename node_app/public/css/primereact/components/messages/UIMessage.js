'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UIMessage = undefined;

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

var UIMessage = exports.UIMessage = function (_Component) {
    _inherits(UIMessage, _Component);

    function UIMessage(props) {
        _classCallCheck(this, UIMessage);

        var _this = _possibleConstructorReturn(this, (UIMessage.__proto__ || Object.getPrototypeOf(UIMessage)).call(this, props));

        _this.onClick = _this.onClick.bind(_this);
        _this.onClose = _this.onClose.bind(_this);
        return _this;
    }

    _createClass(UIMessage, [{
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
                event.stopPropagation();
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
                    { className: 'ui-messages-close', onClick: this.onClose },
                    _react2.default.createElement('i', { className: 'pi pi-times' })
                );
            } else {
                return null;
            }
        }
    }, {
        key: 'renderMessages',
        value: function renderMessages() {
            if (this.props.message) {
                return _react2.default.createElement(
                    'ul',
                    null,
                    _react2.default.createElement(
                        'li',
                        { key: this.props.message.id },
                        _react2.default.createElement(
                            'span',
                            { className: 'ui-messages-summary' },
                            this.props.message.summary
                        ),
                        _react2.default.createElement(
                            'span',
                            { className: 'ui-messages-detail' },
                            this.props.message.detail
                        )
                    )
                );
            } else {
                return null;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var className = 'ui-messages ui-widget ui-corner-all ui-messages-' + this.props.message.severity;
            var icon = (0, _classnames2.default)('ui-messages-icon pi ', {
                'pi-info-circle': this.props.message.severity === 'info',
                'pi-exclamation-triangle': this.props.message.severity === 'warn',
                'pi-times': this.props.message.severity === 'error',
                'pi-check': this.props.message.severity === 'success'
            });
            var closeIcon = this.renderCloseIcon();
            var messages = this.renderMessages();

            return _react2.default.createElement(
                'div',
                { ref: function ref(el) {
                        _this3.container = el;
                    }, className: className, onClick: this.onClick },
                _react2.default.createElement(
                    'div',
                    { className: 'ui-messages-wrapper' },
                    closeIcon,
                    _react2.default.createElement('span', { className: icon }),
                    messages
                )
            );
        }
    }]);

    return UIMessage;
}(_react.Component);

UIMessage.defaultProps = {
    message: null,
    onClose: null,
    onClick: null
};
UIMessage.propTypes = {
    message: _propTypes2.default.object,
    onClose: _propTypes2.default.func,
    onClick: _propTypes2.default.func
};