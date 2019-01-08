'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TabMenu = undefined;

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

var TabMenu = exports.TabMenu = function (_Component) {
    _inherits(TabMenu, _Component);

    function TabMenu(props) {
        _classCallCheck(this, TabMenu);

        var _this = _possibleConstructorReturn(this, (TabMenu.__proto__ || Object.getPrototypeOf(TabMenu)).call(this, props));

        if (!_this.props.onTabChange) {
            _this.state = {
                activeItem: props.activeItem
            };
        }
        return _this;
    }

    _createClass(TabMenu, [{
        key: 'itemClick',
        value: function itemClick(event, item) {
            if (item.disabled) {
                event.preventDefault();
                return;
            }

            if (!item.url) {
                event.preventDefault();
            }

            if (item.command) {
                item.command({
                    originalEvent: event,
                    item: item
                });
            }

            if (this.props.onTabChange) {
                this.props.onTabChange({
                    originalEvent: event,
                    value: item
                });
            } else {
                this.setState({
                    activeItem: item
                });
            }
        }
    }, {
        key: 'renderMenuItem',
        value: function renderMenuItem(item, index) {
            var _this2 = this;

            var activeItem = this.props.onTabChange ? this.props.activeItem : this.state.activeItem;
            var className = (0, _classnames2.default)('ui-tabmenuitem ui-state-default ui-corner-top', item.className, { 'ui-state-active': activeItem ? activeItem === item : index === 0, 'ui-state-disabled': item.disabled });
            var iconClassName = (0, _classnames2.default)(item.icon, 'ui-menuitem-icon');
            var icon = item.icon ? _react2.default.createElement('span', { className: iconClassName }) : null;

            return _react2.default.createElement(
                'li',
                { key: item.label + '_' + index, className: className, style: item.style },
                _react2.default.createElement(
                    'a',
                    { href: item.url || '#', className: 'ui-menuitem-link ui-corner-all', target: item.target, onClick: function onClick(event) {
                            return _this2.itemClick(event, item);
                        } },
                    icon,
                    _react2.default.createElement(
                        'span',
                        { className: 'ui-menuitem-text' },
                        item.label
                    )
                )
            );
        }
    }, {
        key: 'renderItems',
        value: function renderItems() {
            var _this3 = this;

            return this.props.model.map(function (item, index) {
                return _this3.renderMenuItem(item, index);
            });
        }
    }, {
        key: 'render',
        value: function render() {
            if (this.props.model) {
                var className = (0, _classnames2.default)('ui-tabmenu ui-widget ui-widget-content ui-corner-all', this.props.className);
                var items = this.renderItems();

                return _react2.default.createElement(
                    'div',
                    { id: this.props.id, className: className, style: this.props.style },
                    _react2.default.createElement(
                        'ul',
                        { className: 'ui-tabmenu-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all', role: 'tablist' },
                        items
                    )
                );
            } else {
                return null;
            }
        }
    }]);

    return TabMenu;
}(_react.Component);

TabMenu.defaultProps = {
    id: null,
    model: null,
    activeItem: null,
    style: null,
    className: null,
    onTabChange: null
};
TabMenu.propTypes = {
    id: _propTypes2.default.string,
    model: _propTypes2.default.array,
    activeItem: _propTypes2.default.any,
    style: _propTypes2.default.any,
    className: _propTypes2.default.string,
    onTabChange: _propTypes2.default.func
};