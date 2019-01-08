'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RowRadioButton = undefined;

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

var RowRadioButton = exports.RowRadioButton = function (_Component) {
    _inherits(RowRadioButton, _Component);

    function RowRadioButton(props) {
        _classCallCheck(this, RowRadioButton);

        var _this = _possibleConstructorReturn(this, (RowRadioButton.__proto__ || Object.getPrototypeOf(RowRadioButton)).call(this, props));

        _this.onClick = _this.onClick.bind(_this);
        return _this;
    }

    _createClass(RowRadioButton, [{
        key: 'onClick',
        value: function onClick(event) {
            if (this.props.onClick) {
                this.props.onClick({
                    originalEvent: event,
                    data: this.props.rowData
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var className = (0, _classnames2.default)('ui-radiobutton-box ui-widget ui-radiobutton-relative ui-state-default', { 'ui-state-active': this.props.selected });
            var iconClassName = (0, _classnames2.default)('ui-radiobutton-icon ui-clickable', { 'pi pi-circle-on': this.props.selected });

            return _react2.default.createElement(
                'div',
                { className: 'ui-radiobutton ui-widget' },
                _react2.default.createElement(
                    'div',
                    { className: 'ui-helper-hidden-accessible' },
                    _react2.default.createElement('input', { type: 'radio' })
                ),
                _react2.default.createElement(
                    'div',
                    { className: className, onClick: this.onClick },
                    _react2.default.createElement('span', { className: iconClassName })
                )
            );
        }
    }]);

    return RowRadioButton;
}(_react.Component);

RowRadioButton.defaultProps = {
    rowData: null,
    onClick: null,
    selected: false
};
RowRadioButton.propTypes = {
    rowData: _propTypes2.default.object,
    onClick: _propTypes2.default.func,
    selected: _propTypes2.default.bool
};