'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MultiSelectPanel = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MultiSelectPanel = exports.MultiSelectPanel = function (_Component) {
    _inherits(MultiSelectPanel, _Component);

    function MultiSelectPanel() {
        _classCallCheck(this, MultiSelectPanel);

        return _possibleConstructorReturn(this, (MultiSelectPanel.__proto__ || Object.getPrototypeOf(MultiSelectPanel)).apply(this, arguments));
    }

    _createClass(MultiSelectPanel, [{
        key: 'renderElement',
        value: function renderElement() {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                { className: 'ui-multiselect-panel ui-widget-content ui-corner-all ui-helper-hidden ui-input-overlay ui-shadow',
                    ref: function ref(el) {
                        return _this2.element = el;
                    }, onClick: this.props.onClick },
                this.props.header,
                _react2.default.createElement(
                    'div',
                    { className: 'ui-multiselect-items-wrapper', style: { maxHeight: this.props.scrollHeight } },
                    _react2.default.createElement(
                        'ul',
                        { className: 'ui-multiselect-items ui-multiselect-list ui-widget-content ui-widget ui-corner-all ui-helper-reset' },
                        this.props.children
                    )
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

    return MultiSelectPanel;
}(_react.Component);

MultiSelectPanel.defaultProps = {
    appendTo: null,
    header: null,
    onClick: null,
    scrollHeight: null
};
MultiSelectPanel.propTypes = {
    appendTo: _propTypes2.default.object,
    header: _propTypes2.default.element,
    onClick: _propTypes2.default.func,
    scrollHeight: _propTypes2.default.string
};