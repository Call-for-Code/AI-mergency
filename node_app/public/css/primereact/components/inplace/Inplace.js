'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Inplace = exports.InplaceContent = exports.InplaceDisplay = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Button = require('../button/Button');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InplaceDisplay = exports.InplaceDisplay = function (_Component) {
    _inherits(InplaceDisplay, _Component);

    function InplaceDisplay() {
        _classCallCheck(this, InplaceDisplay);

        return _possibleConstructorReturn(this, (InplaceDisplay.__proto__ || Object.getPrototypeOf(InplaceDisplay)).apply(this, arguments));
    }

    _createClass(InplaceDisplay, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                _react2.default.Fragment,
                null,
                this.props.children
            );
        }
    }]);

    return InplaceDisplay;
}(_react.Component);

var InplaceContent = exports.InplaceContent = function (_Component2) {
    _inherits(InplaceContent, _Component2);

    function InplaceContent() {
        _classCallCheck(this, InplaceContent);

        return _possibleConstructorReturn(this, (InplaceContent.__proto__ || Object.getPrototypeOf(InplaceContent)).apply(this, arguments));
    }

    _createClass(InplaceContent, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                _react2.default.Fragment,
                null,
                this.props.children
            );
        }
    }]);

    return InplaceContent;
}(_react.Component);

var Inplace = exports.Inplace = function (_Component3) {
    _inherits(Inplace, _Component3);

    function Inplace(props) {
        _classCallCheck(this, Inplace);

        var _this3 = _possibleConstructorReturn(this, (Inplace.__proto__ || Object.getPrototypeOf(Inplace)).call(this, props));

        if (!_this3.props.onToggle) {
            _this3.state = {
                active: false
            };
        }

        _this3.open = _this3.open.bind(_this3);
        _this3.close = _this3.close.bind(_this3);
        return _this3;
    }

    _createClass(Inplace, [{
        key: 'open',
        value: function open(event) {
            if (this.props.disabled) {
                return;
            }

            if (this.props.onOpen) {
                this.props.onOpen(event);
            }
            if (this.props.onToggle) {
                this.props.onToggle({
                    originalEvent: event,
                    value: true
                });
            } else {
                this.setState({
                    active: true
                });
            }
        }
    }, {
        key: 'close',
        value: function close(event) {
            if (this.props.onClose) {
                this.props.onClose(event);
            }

            if (this.props.onToggle) {
                this.props.onToggle({
                    originalEvent: event,
                    value: false
                });
            } else {
                this.setState({
                    active: false
                });
            }
        }
    }, {
        key: 'isActive',
        value: function isActive() {
            return this.props.onToggle ? this.props.active : this.state.active;
        }
    }, {
        key: 'renderDisplay',
        value: function renderDisplay(content) {
            var className = (0, _classnames2.default)('ui-inplace-display', { 'ui-state-disabled': this.props.disabled });

            return _react2.default.createElement(
                'div',
                { className: className, onClick: this.open },
                content
            );
        }
    }, {
        key: 'renderCloseButton',
        value: function renderCloseButton() {
            if (this.props.closable) {
                return _react2.default.createElement(_Button.Button, { type: 'button', icon: 'pi pi-times', onClick: this.close });
            } else {
                return null;
            }
        }
    }, {
        key: 'renderContent',
        value: function renderContent(content) {
            var closeButton = this.renderCloseButton();

            return _react2.default.createElement(
                'div',
                { className: 'ui-inplace-content' },
                content,
                closeButton
            );
        }
    }, {
        key: 'renderChildren',
        value: function renderChildren() {
            var _this4 = this;

            var active = this.isActive();

            return _react2.default.Children.map(this.props.children, function (child, i) {
                if (active && child.type === InplaceContent) {
                    return _this4.renderContent(child);
                } else if (!active && child.type === InplaceDisplay) {
                    return _this4.renderDisplay(child);
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var className = (0, _classnames2.default)('ui-inplace ui-widget', this.props.className);

            return _react2.default.createElement(
                'div',
                { className: className },
                this.renderChildren()
            );
        }
    }]);

    return Inplace;
}(_react.Component);

Inplace.defaultProps = {
    style: null,
    className: null,
    active: false,
    closable: false,
    disabled: false,
    onOpen: null,
    onClose: null,
    onToggle: null
};
Inplace.propTypes = {
    style: _propTypes2.default.object,
    className: _propTypes2.default.string,
    active: _propTypes2.default.bool,
    closable: _propTypes2.default.bool,
    disabled: _propTypes2.default.bool,
    onOpen: _propTypes2.default.func,
    onClose: _propTypes2.default.func,
    onToggle: _propTypes2.default.func
};