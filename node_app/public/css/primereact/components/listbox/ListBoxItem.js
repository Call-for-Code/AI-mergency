'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ListBoxItem = undefined;

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

var ListBoxItem = exports.ListBoxItem = function (_Component) {
    _inherits(ListBoxItem, _Component);

    function ListBoxItem() {
        _classCallCheck(this, ListBoxItem);

        var _this = _possibleConstructorReturn(this, (ListBoxItem.__proto__ || Object.getPrototypeOf(ListBoxItem)).call(this));

        _this.onClick = _this.onClick.bind(_this);
        _this.onTouchEnd = _this.onTouchEnd.bind(_this);
        return _this;
    }

    _createClass(ListBoxItem, [{
        key: 'onClick',
        value: function onClick(event) {
            if (this.props.onClick) {
                this.props.onClick({
                    originalEvent: event,
                    option: this.props.option
                });
            }

            event.preventDefault();
        }
    }, {
        key: 'onTouchEnd',
        value: function onTouchEnd(event) {
            if (this.props.onTouchEnd) {
                this.props.onTouchEnd({
                    originalEvent: event,
                    option: this.props.option
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var className = (0, _classnames2.default)('ui-listbox-item ui-corner-all', { 'ui-state-highlight': this.props.selected });
            var content = this.props.template ? this.props.template(this.props.option) : this.props.label;

            return _react2.default.createElement(
                'li',
                { className: className, onClick: this.onClick, onTouchEnd: this.onTouchEnd },
                content
            );
        }
    }]);

    return ListBoxItem;
}(_react.Component);

ListBoxItem.defaultProps = {
    option: null,
    label: null,
    selected: false,
    onClick: null,
    onTouchEnd: null,
    template: null
};
ListBoxItem.propTypes = {
    option: _propTypes2.default.any,
    label: _propTypes2.default.string,
    selected: _propTypes2.default.bool,
    onClick: _propTypes2.default.func,
    onTouchEnd: _propTypes2.default.func,
    template: _propTypes2.default.func
};