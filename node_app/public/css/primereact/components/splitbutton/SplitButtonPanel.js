'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SplitButtonPanel = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SplitButtonPanel = exports.SplitButtonPanel = function (_Component) {
    _inherits(SplitButtonPanel, _Component);

    function SplitButtonPanel() {
        _classCallCheck(this, SplitButtonPanel);

        return _possibleConstructorReturn(this, (SplitButtonPanel.__proto__ || Object.getPrototypeOf(SplitButtonPanel)).apply(this, arguments));
    }

    _createClass(SplitButtonPanel, [{
        key: 'renderElement',
        value: function renderElement() {
            var _this2 = this;

            var className = (0, _classnames2.default)('ui-menu ui-menu-dynamic ui-widget ui-widget-content ui-corner-all ui-helper-clearfix ui-shadow', this.props.menuClassName);

            return _react2.default.createElement(
                'div',
                { className: className, style: this.props.menuStyle, ref: function ref(el) {
                        _this2.element = el;
                    } },
                _react2.default.createElement(
                    'ul',
                    { className: 'ui-menu-list ui-helper-reset' },
                    this.props.children
                )
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var element = this.renderElement();

            if (this.props.appendTo) {
                return _reactDom2.default.createPortal(element, this.props.appendTo);
            } else {
                return element;
            }
        }
    }]);

    return SplitButtonPanel;
}(_react.Component);

SplitButtonPanel.defaultProps = {
    appendTo: null,
    menuStyle: null,
    menuClassName: null
};
SplitButtonPanel.propTypes = {
    appendTo: _propTypes2.default.object,
    menustyle: _propTypes2.default.object,
    menuClassName: _propTypes2.default.string
};