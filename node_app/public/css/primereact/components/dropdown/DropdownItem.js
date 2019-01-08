'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DropdownItem = undefined;

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

var DropdownItem = exports.DropdownItem = function (_Component) {
    _inherits(DropdownItem, _Component);

    function DropdownItem(props) {
        _classCallCheck(this, DropdownItem);

        var _this = _possibleConstructorReturn(this, (DropdownItem.__proto__ || Object.getPrototypeOf(DropdownItem)).call(this, props));

        _this.onClick = _this.onClick.bind(_this);
        return _this;
    }

    _createClass(DropdownItem, [{
        key: 'onClick',
        value: function onClick(event) {
            if (this.props.onClick) {
                this.props.onClick({
                    originalEvent: event,
                    option: this.props.option
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var className = (0, _classnames2.default)('ui-dropdown-item ui-corner-all', {
                'ui-state-highlight': this.props.selected,
                'ui-dropdown-item-empty': !this.props.label || this.props.label.length === 0
            });
            var content = this.props.template ? this.props.template(this.props.option) : this.props.label;

            return _react2.default.createElement(
                'li',
                { className: className, onClick: this.onClick },
                content
            );
        }
    }]);

    return DropdownItem;
}(_react.Component);

DropdownItem.defaultProps = {
    option: null,
    label: null,
    template: null,
    selected: false,
    onClick: null
};
DropdownItem.propTypes = {
    option: _propTypes2.default.object,
    label: _propTypes2.default.any,
    template: _propTypes2.default.func,
    selected: _propTypes2.default.bool,
    onClick: _propTypes2.default.func
};