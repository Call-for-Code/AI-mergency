'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SplitButtonItem = undefined;

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

var SplitButtonItem = exports.SplitButtonItem = function (_Component) {
    _inherits(SplitButtonItem, _Component);

    function SplitButtonItem(props) {
        _classCallCheck(this, SplitButtonItem);

        var _this = _possibleConstructorReturn(this, (SplitButtonItem.__proto__ || Object.getPrototypeOf(SplitButtonItem)).call(this, props));

        _this.onClick = _this.onClick.bind(_this);
        return _this;
    }

    _createClass(SplitButtonItem, [{
        key: 'onClick',
        value: function onClick(e) {
            if (this.props.menuitem.command) {
                this.props.menuitem.command({ originalEvent: e, item: this.props.menuitem });
            }
            e.preventDefault();
        }
    }, {
        key: 'render',
        value: function render() {
            var className = (0, _classnames2.default)('ui-menuitem-link ui-corner-all', { 'ui-state-disabled': this.props.menuitem.disabled });
            var icon = this.props.menuitem.icon ? _react2.default.createElement('span', { className: (0, _classnames2.default)('ui-menuitem-icon', this.props.menuitem.icon) }) : null;
            var label = _react2.default.createElement(
                'span',
                { className: 'ui-menuitem-text' },
                this.props.menuitem.label
            );

            return _react2.default.createElement(
                'li',
                { className: 'ui-menuitem ui-widget ui-corner-all', role: 'menuitem' },
                _react2.default.createElement(
                    'a',
                    { href: this.props.menuitem.url || '#', className: className, target: this.props.menuitem.target, onClick: this.onClick },
                    icon,
                    label
                )
            );
        }
    }]);

    return SplitButtonItem;
}(_react.Component);

SplitButtonItem.defaultProps = {
    menuitem: null
};
SplitButtonItem.propsTypes = {
    menuitem: _propTypes2.default.any
};