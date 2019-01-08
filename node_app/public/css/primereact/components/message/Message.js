'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Message = undefined;

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

var Message = exports.Message = function (_Component) {
    _inherits(Message, _Component);

    function Message() {
        _classCallCheck(this, Message);

        return _possibleConstructorReturn(this, (Message.__proto__ || Object.getPrototypeOf(Message)).apply(this, arguments));
    }

    _createClass(Message, [{
        key: 'render',
        value: function render() {
            var className = (0, _classnames2.default)('ui-message ui-widget ui-corner-all', {
                'ui-message-info': this.props.severity === 'info',
                'ui-message-warn': this.props.severity === 'warn',
                'ui-message-error': this.props.severity === 'error',
                'ui-message-success': this.props.severity === 'success',
                'ui-message-icon-only': !this.props.text
            });

            var icon = (0, _classnames2.default)('ui-message-icon pi pi-fw', {
                'pi-info-circle': this.props.severity === 'info',
                'pi-exclamation-triangle': this.props.severity === 'warn',
                'pi-times': this.props.severity === 'error',
                'pi-check': this.props.severity === 'success'
            });

            return _react2.default.createElement(
                'div',
                { id: this.props.id, 'aria-live': 'polite', className: className, style: this.props.style },
                _react2.default.createElement('span', { className: icon }),
                _react2.default.createElement(
                    'span',
                    { className: 'ui-message-text' },
                    this.props.text
                )
            );
        }
    }]);

    return Message;
}(_react.Component);

Message.defaultProps = {
    id: null,
    className: null,
    style: null,
    text: null,
    severity: 'info'
};
Message.propTypes = {
    id: _propTypes2.default.string,
    className: _propTypes2.default.string,
    style: _propTypes2.default.object,
    text: _propTypes2.default.string,
    severity: _propTypes2.default.string
};