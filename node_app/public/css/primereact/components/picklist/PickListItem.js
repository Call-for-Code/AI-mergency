'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PickListItem = undefined;

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

var PickListItem = exports.PickListItem = function (_Component) {
    _inherits(PickListItem, _Component);

    function PickListItem() {
        _classCallCheck(this, PickListItem);

        var _this = _possibleConstructorReturn(this, (PickListItem.__proto__ || Object.getPrototypeOf(PickListItem)).call(this));

        _this.onClick = _this.onClick.bind(_this);
        return _this;
    }

    _createClass(PickListItem, [{
        key: 'onClick',
        value: function onClick(event) {
            if (this.props.onClick) {
                this.props.onClick({
                    originalEvent: event,
                    value: this.props.value
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var content = this.props.template ? this.props.template(this.props.value) : this.props.value;
            var className = (0, _classnames2.default)('ui-picklist-item', this.props.className, { 'ui-state-highlight': this.props.selected });

            return _react2.default.createElement(
                'li',
                { className: className, onClick: this.onClick },
                content
            );
        }
    }]);

    return PickListItem;
}(_react.Component);

PickListItem.defaultProps = {
    value: null,
    className: null,
    template: null,
    selected: false,
    onClick: null
};
PickListItem.propsTypes = {
    value: _propTypes2.default.any,
    className: _propTypes2.default.string,
    template: _propTypes2.default.func,
    selected: _propTypes2.default.bool,
    onClick: _propTypes2.default.func
};