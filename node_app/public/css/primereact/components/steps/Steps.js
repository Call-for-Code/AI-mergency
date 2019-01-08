'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Steps = undefined;

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

var Steps = exports.Steps = function (_Component) {
    _inherits(Steps, _Component);

    function Steps() {
        _classCallCheck(this, Steps);

        return _possibleConstructorReturn(this, (Steps.__proto__ || Object.getPrototypeOf(Steps)).apply(this, arguments));
    }

    _createClass(Steps, [{
        key: 'itemClick',
        value: function itemClick(event, item, index) {
            if (this.props.readOnly || item.disabled) {
                event.preventDefault();
                return;
            }

            if (this.props.onSelect) {
                this.props.onSelect({
                    originalEvent: event,
                    item: item,
                    index: index
                });
            }

            if (!item.url) {
                event.preventDefault();
            }

            if (item.command) {
                item.command({
                    originalEvent: event,
                    item: item,
                    index: index
                });
            }
        }
    }, {
        key: 'renderItem',
        value: function renderItem(item, index) {
            var _this2 = this;

            var className = (0, _classnames2.default)('ui-steps-item', item.className, {
                'ui-state-highlight': index === this.props.activeIndex,
                'ui-state-default': index !== this.props.activeIndex,
                'ui-state-disabled': item.disabled || index !== this.props.activeIndex && this.props.readOnly });

            return _react2.default.createElement(
                'li',
                { key: item.label + '_' + index, className: className, style: item.style },
                _react2.default.createElement(
                    'a',
                    { href: item.url || '#', className: 'ui-menuitem-link', target: item.target, onClick: function onClick(event) {
                            return _this2.itemClick(event, item, index);
                        } },
                    _react2.default.createElement(
                        'span',
                        { className: 'ui-steps-number' },
                        index + 1
                    ),
                    _react2.default.createElement(
                        'span',
                        { className: 'ui-steps-title' },
                        item.label
                    )
                )
            );
        }
    }, {
        key: 'renderItems',
        value: function renderItems() {
            var _this3 = this;

            if (this.props.model) {
                var items = this.props.model.map(function (item, index) {
                    return _this3.renderItem(item, index);
                });

                return _react2.default.createElement(
                    'ul',
                    { role: 'tablist' },
                    items
                );
            } else {
                return null;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var className = (0, _classnames2.default)('ui-steps ui-widget ui-helper-clearfix', this.props.className, { 'ui-steps-readonly': this.props.readonly });
            var items = this.renderItems();

            return _react2.default.createElement(
                'div',
                { id: this.props.id, className: className, style: this.props.style },
                items
            );
        }
    }]);

    return Steps;
}(_react.Component);

Steps.defaultProps = {
    id: null,
    model: null,
    activeIndex: 0,
    readOnly: true,
    style: null,
    className: null,
    onSelect: null
};
Steps.propTypes = {
    id: _propTypes2.default.string,
    model: _propTypes2.default.array.isRequired,
    activeIndex: _propTypes2.default.number,
    readOnly: _propTypes2.default.bool,
    style: _propTypes2.default.object,
    className: _propTypes2.default.string,
    onSelect: _propTypes2.default.func
};