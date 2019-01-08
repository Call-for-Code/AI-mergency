'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AutoCompletePanel = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _ObjectUtils = require('../utils/ObjectUtils');

var _ObjectUtils2 = _interopRequireDefault(_ObjectUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AutoCompletePanel = exports.AutoCompletePanel = function (_Component) {
    _inherits(AutoCompletePanel, _Component);

    function AutoCompletePanel() {
        _classCallCheck(this, AutoCompletePanel);

        return _possibleConstructorReturn(this, (AutoCompletePanel.__proto__ || Object.getPrototypeOf(AutoCompletePanel)).apply(this, arguments));
    }

    _createClass(AutoCompletePanel, [{
        key: 'renderElement',
        value: function renderElement() {
            var _this2 = this;

            var items = void 0;

            if (this.props.suggestions) {
                items = this.props.suggestions.map(function (suggestion, index) {
                    var itemContent = _this2.props.itemTemplate ? _this2.props.itemTemplate(suggestion) : _this2.props.field ? _ObjectUtils2.default.resolveFieldData(suggestion, _this2.props.field) : suggestion;

                    return _react2.default.createElement(
                        'li',
                        { key: index + '_item', className: 'ui-autocomplete-list-item ui-corner-all', onClick: function onClick(e) {
                                return _this2.props.onItemClick(e, suggestion);
                            } },
                        itemContent
                    );
                });
            }

            return _react2.default.createElement(
                'div',
                { ref: function ref(el) {
                        return _this2.element = el;
                    }, className: 'ui-autocomplete-panel ui-widget-content ui-corner-all ui-input-overlay ui-shadow', style: { maxHeight: this.props.scrollHeight } },
                _react2.default.createElement(
                    'ul',
                    { className: 'ui-autocomplete-items ui-autocomplete-list ui-widget-content ui-widget ui-corner-all ui-helper-reset' },
                    items
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

    return AutoCompletePanel;
}(_react.Component);

AutoCompletePanel.defaultProps = {
    suggestions: null,
    field: null,
    appendTo: null,
    itemTemplate: null,
    onItemClick: null,
    scrollHeight: '200px'
};
AutoCompletePanel.propTypes = {
    suggestions: _propTypes2.default.array,
    field: _propTypes2.default.string,
    appendTo: _propTypes2.default.any,
    itemTemplate: _propTypes2.default.func,
    onItemClick: _propTypes2.default.func,
    scrollHeight: _propTypes2.default.string
};