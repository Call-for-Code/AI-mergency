'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ListBoxHeader = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _InputText = require('../inputtext/InputText');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ListBoxHeader = exports.ListBoxHeader = function (_Component) {
    _inherits(ListBoxHeader, _Component);

    function ListBoxHeader() {
        _classCallCheck(this, ListBoxHeader);

        var _this = _possibleConstructorReturn(this, (ListBoxHeader.__proto__ || Object.getPrototypeOf(ListBoxHeader)).call(this));

        _this.onFilter = _this.onFilter.bind(_this);
        return _this;
    }

    _createClass(ListBoxHeader, [{
        key: 'onFilter',
        value: function onFilter(event) {
            if (this.props.onFilter) {
                this.props.onFilter({
                    originalEvent: event,
                    query: event.target.value
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'ui-widget-header ui-corner-all ui-listbox-header ui-helper-clearfix' },
                _react2.default.createElement(
                    'div',
                    { className: 'ui-listbox-filter-container' },
                    _react2.default.createElement(_InputText.InputText, { type: 'text', role: 'textbox', value: this.props.filter, onChange: this.onFilter, disabled: this.props.disabled }),
                    _react2.default.createElement('span', { className: 'ui-listbox-filter-icon pi pi-search' })
                )
            );
        }
    }]);

    return ListBoxHeader;
}(_react.Component);

ListBoxHeader.defaultProps = {
    filter: null,
    disabled: false,
    onFilter: null
};
ListBoxHeader.propTypes = {
    filter: _propTypes2.default.string,
    disabled: _propTypes2.default.bool,
    onFilter: _propTypes2.default.func
};