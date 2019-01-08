'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SelectButtonItem = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _DomHandler = require('../utils/DomHandler');

var _DomHandler2 = _interopRequireDefault(_DomHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SelectButtonItem = exports.SelectButtonItem = function (_Component) {
    _inherits(SelectButtonItem, _Component);

    function SelectButtonItem(props) {
        _classCallCheck(this, SelectButtonItem);

        var _this = _possibleConstructorReturn(this, (SelectButtonItem.__proto__ || Object.getPrototypeOf(SelectButtonItem)).call(this, props));

        _this.state = {};
        _this.onClick = _this.onClick.bind(_this);
        _this.onFocus = _this.onFocus.bind(_this);
        _this.onBlur = _this.onBlur.bind(_this);
        return _this;
    }

    _createClass(SelectButtonItem, [{
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
        key: 'onFocus',
        value: function onFocus(event) {
            _DomHandler2.default.addClass(this.el, 'ui-state-focus');
        }
    }, {
        key: 'onBlur',
        value: function onBlur(event) {
            _DomHandler2.default.removeClass(this.el, 'ui-state-focus');
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var className = (0, _classnames2.default)('ui-button ui-widget ui-state-default ui-button-text-only', {
                'ui-state-active': this.props.selected,
                'ui-state-disabled': this.props.disabled
            });

            return _react2.default.createElement(
                'div',
                { ref: function ref(el) {
                        return _this2.el = el;
                    }, className: className, onClick: this.onClick },
                _react2.default.createElement(
                    'span',
                    { className: 'ui-button-text ui-c' },
                    this.props.label
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'ui-helper-hidden-accessible' },
                    _react2.default.createElement('input', { type: 'checkbox', checked: this.props.selected, onFocus: this.onFocus, onBlur: this.onBlur,
                        tabIndex: this.props.tabIndex, disabled: this.props.disabled, value: this.props.label })
                )
            );
        }
    }]);

    return SelectButtonItem;
}(_react.Component);

SelectButtonItem.defaultProps = {
    option: null,
    label: null,
    selected: null,
    tabIndex: null,
    onClick: null
};
SelectButtonItem.propTypes = {
    option: _propTypes2.default.object,
    label: _propTypes2.default.string,
    selected: _propTypes2.default.bool,
    tabIndex: _propTypes2.default.number,
    onClick: _propTypes2.default.func
};