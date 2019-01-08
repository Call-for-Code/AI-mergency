'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MultiSelectItem = undefined;

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

var MultiSelectItem = exports.MultiSelectItem = function (_Component) {
    _inherits(MultiSelectItem, _Component);

    function MultiSelectItem() {
        _classCallCheck(this, MultiSelectItem);

        var _this = _possibleConstructorReturn(this, (MultiSelectItem.__proto__ || Object.getPrototypeOf(MultiSelectItem)).call(this));

        _this.onClick = _this.onClick.bind(_this);
        return _this;
    }

    _createClass(MultiSelectItem, [{
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
        key: 'render',
        value: function render() {
            var className = (0, _classnames2.default)('ui-multiselect-item ui-corner-all', { 'ui-state-highlight': this.props.selected });
            var checkboxClassName = (0, _classnames2.default)('ui-chkbox-box ui-widget ui-corner-all ui-state-default', { 'ui-state-active': this.props.selected });
            var checkboxIcon = (0, _classnames2.default)('ui-chkbox-icon ui-c', { 'pi pi-check': this.props.selected });
            var content = this.props.template ? this.props.template(this.props.option) : this.props.label;

            return _react2.default.createElement(
                'li',
                { className: className, onClick: this.onClick },
                _react2.default.createElement(
                    'div',
                    { className: 'ui-chkbox ui-widget' },
                    _react2.default.createElement(
                        'div',
                        { className: 'ui-helper-hidden-accessible' },
                        _react2.default.createElement('input', { readOnly: 'readonly', type: 'checkbox' })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: checkboxClassName },
                        _react2.default.createElement('span', { className: checkboxIcon })
                    )
                ),
                _react2.default.createElement(
                    'label',
                    null,
                    content
                )
            );
        }
    }]);

    return MultiSelectItem;
}(_react.Component);

MultiSelectItem.defaultProps = {
    option: null,
    label: null,
    selected: false,
    template: null,
    onClick: null
};
MultiSelectItem.propTypes = {
    option: _propTypes2.default.object,
    label: _propTypes2.default.string,
    selected: _propTypes2.default.bool,
    template: _propTypes2.default.func,
    onClick: _propTypes2.default.func
};