'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Growl = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _GrowlMessage = require('./GrowlMessage');

var _DomHandler = require('../utils/DomHandler');

var _DomHandler2 = _interopRequireDefault(_DomHandler);

var _reactTransitionGroup = require('react-transition-group');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var messageIdx = 0;

var Growl = exports.Growl = function (_Component) {
    _inherits(Growl, _Component);

    function Growl(props) {
        _classCallCheck(this, Growl);

        var _this = _possibleConstructorReturn(this, (Growl.__proto__ || Object.getPrototypeOf(Growl)).call(this, props));

        _this.state = {
            messages: []
        };

        _this.onClose = _this.onClose.bind(_this);
        return _this;
    }

    _createClass(Growl, [{
        key: 'show',
        value: function show(value) {
            if (value) {
                var newMessages = void 0;

                if (Array.isArray(value)) {
                    for (var i = 0; i < value.length; i++) {
                        value[i].id = messageIdx++;
                        newMessages = [].concat(_toConsumableArray(this.state.messages), _toConsumableArray(value));
                    }
                } else {
                    value.id = messageIdx++;
                    newMessages = this.state.messages ? [].concat(_toConsumableArray(this.state.messages), [value]) : [value];
                }

                this.setState({
                    messages: newMessages
                });

                this.container.style.zIndex = String(this.props.baseZIndex + _DomHandler2.default.generateZIndex());
            }
        }
    }, {
        key: 'clear',
        value: function clear() {
            this.setState({
                messages: []
            });
        }
    }, {
        key: 'onClose',
        value: function onClose(message) {
            var newMessages = this.state.messages.filter(function (msg) {
                return msg.id !== message.id;
            });
            this.setState({
                messages: newMessages
            });

            if (this.props.onRemove) {
                this.props.onRemove(message);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var className = (0, _classnames2.default)('ui-growl ui-widget ui-growl-' + this.props.position, this.props.className);

            return _react2.default.createElement(
                'div',
                { ref: function ref(el) {
                        _this2.container = el;
                    }, id: this.props.id, className: className, style: this.props.style },
                _react2.default.createElement(
                    _reactTransitionGroup.TransitionGroup,
                    null,
                    this.state.messages.map(function (message, index) {
                        return _react2.default.createElement(
                            _reactTransitionGroup.CSSTransition,
                            { key: message.id, classNames: 'ui-growl',
                                timeout: { enter: 250, exit: 500 } },
                            _react2.default.createElement(_GrowlMessage.GrowlMessage, { message: message, onClick: _this2.props.onClick, onClose: _this2.onClose })
                        );
                    })
                )
            );
        }
    }]);

    return Growl;
}(_react.Component);

Growl.defaultProps = {
    id: null,
    className: null,
    style: null,
    baseZIndex: 0,
    position: 'topright',
    onClick: null,
    onRemove: null
};
Growl.propTypes = {
    id: _propTypes2.default.string,
    className: _propTypes2.default.string,
    style: _propTypes2.default.object,
    baseZIndex: _propTypes2.default.number,
    position: _propTypes2.default.string,
    onClick: _propTypes2.default.func,
    onRemove: _propTypes2.default.func
};