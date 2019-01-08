'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MultiSelectHeader = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _InputText = require('../inputtext/InputText');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MultiSelectHeader = exports.MultiSelectHeader = function (_Component) {
    _inherits(MultiSelectHeader, _Component);

    function MultiSelectHeader() {
        _classCallCheck(this, MultiSelectHeader);

        var _this = _possibleConstructorReturn(this, (MultiSelectHeader.__proto__ || Object.getPrototypeOf(MultiSelectHeader)).call(this));

        _this.onFilter = _this.onFilter.bind(_this);
        _this.onToggleAll = _this.onToggleAll.bind(_this);
        return _this;
    }

    _createClass(MultiSelectHeader, [{
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
        key: 'onToggleAll',
        value: function onToggleAll(event) {
            if (this.props.onToggleAll) {
                this.props.onToggleAll({
                    originalEvent: event,
                    checked: this.props.allChecked
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var filterElement = void 0;
            var checkboxClassName = (0, _classnames2.default)('ui-chkbox-box ui-widget ui-corner-all ui-state-default', { 'ui-state-active': this.props.allChecked });
            var checkboxIcon = (0, _classnames2.default)('ui-chkbox-icon ui-clickable', { 'pi pi-check': this.props.allChecked });

            if (this.props.filter) {
                filterElement = _react2.default.createElement(
                    'div',
                    { className: 'ui-multiselect-filter-container' },
                    _react2.default.createElement(_InputText.InputText, { type: 'text', role: 'textbox', value: this.props.filterValue, onChange: this.onFilter,
                        className: 'ui-inputtext ui-widget ui-state-default ui-corner-all' }),
                    _react2.default.createElement('span', { className: 'ui-multiselect-filter-icon pi pi-search' })
                );
            }

            return _react2.default.createElement(
                'div',
                { className: 'ui-widget-header ui-corner-all ui-multiselect-header ui-helper-clearfix' },
                _react2.default.createElement(
                    'div',
                    { className: 'ui-chkbox ui-widget', onClick: this.onToggleAll },
                    _react2.default.createElement(
                        'div',
                        { className: 'ui-helper-hidden-accessible' },
                        _react2.default.createElement('input', { type: 'checkbox', readOnly: true })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: checkboxClassName },
                        _react2.default.createElement('span', { className: checkboxIcon })
                    )
                ),
                filterElement,
                _react2.default.createElement(
                    'a',
                    { className: 'ui-multiselect-close ui-corner-all', onClick: this.props.onClose },
                    _react2.default.createElement('span', { className: 'pi pi-times' })
                )
            );
        }
    }]);

    return MultiSelectHeader;
}(_react.Component);

MultiSelectHeader.defaultProps = {
    filter: false,
    filterValue: null,
    onFilter: null,
    onClose: null,
    onToggleAll: null,
    allChecked: false
};
MultiSelectHeader.propTypes = {
    filter: _propTypes2.default.bool,
    filterValue: _propTypes2.default.string,
    allChecked: _propTypes2.default.bool,
    onFilter: _propTypes2.default.func,
    onClose: _propTypes2.default.func,
    onToggleAll: _propTypes2.default.func
};