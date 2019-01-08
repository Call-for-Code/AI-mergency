'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PanelMenu = undefined;

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

var PanelMenuSub = function (_Component) {
    _inherits(PanelMenuSub, _Component);

    function PanelMenuSub(props) {
        _classCallCheck(this, PanelMenuSub);

        var _this = _possibleConstructorReturn(this, (PanelMenuSub.__proto__ || Object.getPrototypeOf(PanelMenuSub)).call(this, props));

        _this.state = {
            activeItem: null
        };
        return _this;
    }

    _createClass(PanelMenuSub, [{
        key: 'onItemClick',
        value: function onItemClick(event, item) {
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

            if (this.state.activeItem && this.state.activeItem === item) {
                this.setState({
                    activeItem: null
                });
            } else {
                this.setState({
                    activeItem: item
                });
            }
        }
    }, {
        key: 'renderSeparator',
        value: function renderSeparator(index) {
            return _react2.default.createElement('li', { key: 'separator_' + index, className: 'ui-menu-separator ui-widget-content' });
        }
    }, {
        key: 'renderIcon',
        value: function renderIcon(item) {
            var className = (0, _classnames2.default)('ui-menuitem-icon', item.icon);

            if (item.icon) {
                return _react2.default.createElement('span', { className: className });
            } else {
                return null;
            }
        }
    }, {
        key: 'renderSubmenuIcon',
        value: function renderSubmenuIcon(item, active) {
            var className = (0, _classnames2.default)('ui-panelmenu-icon pi pi-fw', { 'pi-caret-right': !active, 'pi-caret-down': active });

            if (item.items) {
                return _react2.default.createElement('span', { className: className });
            } else {
                return null;
            }
        }
    }, {
        key: 'renderSubmenu',
        value: function renderSubmenu(item, active) {
            var className = (0, _classnames2.default)({ 'ui-panelmenu-content-wrapper-collapsed': !active, 'ui-panelmenu-content-wrapper-expanded': active });

            if (item.items) {
                return _react2.default.createElement(PanelMenuSub, { model: item.items, className: className });
            } else {
                return null;
            }
        }
    }, {
        key: 'renderMenuitem',
        value: function renderMenuitem(item, index) {
            var _this2 = this;

            var active = this.state.activeItem === item;
            var className = (0, _classnames2.default)('ui-menuitem ui-corner-all', item.className, { 'ui-state-disabled': item.disabled });
            var icon = this.renderIcon(item, active);
            var submenuIcon = this.renderSubmenuIcon(item, active);
            var submenu = this.renderSubmenu(item, active);

            return _react2.default.createElement(
                'li',
                { key: item.label + '_' + index, className: className, style: item.style },
                _react2.default.createElement(
                    'a',
                    { href: item.url || '#', className: 'ui-menuitem-link ui-corner-all', target: item.target, onClick: function onClick(event) {
                            return _this2.onItemClick(event, item, index);
                        } },
                    submenuIcon,
                    icon,
                    _react2.default.createElement(
                        'span',
                        { className: 'ui-menuitem-text' },
                        item.label
                    )
                ),
                submenu
            );
        }
    }, {
        key: 'renderItem',
        value: function renderItem(item, index) {
            if (item.separator) return this.renderSeparator(index);else return this.renderMenuitem(item, index);
        }
    }, {
        key: 'renderMenu',
        value: function renderMenu() {
            var _this3 = this;

            if (this.props.model) {
                return this.props.model.map(function (item, index) {
                    return _this3.renderItem(item, index);
                });
            } else {
                return null;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var className = (0, _classnames2.default)('ui-submenu-list', this.props.className);
            var menu = this.renderMenu();

            return _react2.default.createElement(
                'ul',
                { className: className },
                menu
            );
        }
    }]);

    return PanelMenuSub;
}(_react.Component);

PanelMenuSub.defaultProps = {
    model: null,
    className: null
};
PanelMenuSub.propTypes = {
    model: _propTypes2.default.any,
    className: _propTypes2.default.string
};

var PanelMenu = exports.PanelMenu = function (_Component2) {
    _inherits(PanelMenu, _Component2);

    function PanelMenu(props) {
        _classCallCheck(this, PanelMenu);

        var _this4 = _possibleConstructorReturn(this, (PanelMenu.__proto__ || Object.getPrototypeOf(PanelMenu)).call(this));

        _this4.state = {
            activeItem: null
        };
        return _this4;
    }

    _createClass(PanelMenu, [{
        key: 'onItemClick',
        value: function onItemClick(event, item) {
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

            if (this.state.activeItem && this.state.activeItem === item) {
                this.setState({
                    activeItem: null
                });
            } else {
                this.setState({
                    activeItem: item
                });
            }
        }
    }, {
        key: 'renderPanelIcon',
        value: function renderPanelIcon(item) {
            var className = (0, _classnames2.default)('ui-menuitem-icon', item.icon);

            if (item.items) {
                return _react2.default.createElement('span', { className: className });
            } else {
                return null;
            }
        }
    }, {
        key: 'renderPanelToggleIcon',
        value: function renderPanelToggleIcon(item, active) {
            var className = (0, _classnames2.default)('ui-panelmenu-icon pi pi-fw', { 'pi-caret-right': !active, ' pi-caret-down': active });

            if (item.items) {
                return _react2.default.createElement('span', { className: className });
            } else {
                return null;
            }
        }
    }, {
        key: 'renderPanel',
        value: function renderPanel(item, index) {
            var _this5 = this;

            var active = this.state.activeItem === item;
            var className = (0, _classnames2.default)('ui-panelmenu-panel', item.className, { 'ui-state-disabled': item.disabled });
            var headerClassName = (0, _classnames2.default)('ui-widget ui-panelmenu-header ui-state-default', { 'ui-state-active': active });
            var toggleIcon = this.renderPanelToggleIcon(item, active);
            var itemIcon = this.renderPanelIcon(item);
            var contentWrapperClassName = (0, _classnames2.default)('ui-panelmenu-content-wrapper', { 'ui-panelmenu-content-wrapper-collapsed': !active, 'ui-panelmenu-content-wrapper-expanded': active });

            return _react2.default.createElement(
                'div',
                { key: item.label + '_' + index, className: className, style: item.style },
                _react2.default.createElement(
                    'div',
                    { className: headerClassName, style: item.style },
                    _react2.default.createElement(
                        'a',
                        { href: item.url || '#', className: 'ui-panelmenu-header-link ng-tns-c2-1 ng-star-inserted', onClick: function onClick(e) {
                                return _this5.onItemClick(e, item);
                            } },
                        toggleIcon,
                        itemIcon,
                        _react2.default.createElement(
                            'span',
                            { className: 'ui-menuitem-text' },
                            item.label
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: contentWrapperClassName },
                    _react2.default.createElement(
                        'div',
                        { className: 'ui-panelmenu-content ui-widget-content' },
                        _react2.default.createElement(PanelMenuSub, { model: item.items, className: 'ui-panelmenu-root-submenu' })
                    )
                )
            );
        }
    }, {
        key: 'renderPanels',
        value: function renderPanels() {
            var _this6 = this;

            if (this.props.model) {
                return this.props.model.map(function (item, index) {
                    return _this6.renderPanel(item, index);
                });
            } else {
                return null;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var className = (0, _classnames2.default)('ui-panelmenu ui-widget', this.props.className);
            var panels = this.renderPanels();

            return _react2.default.createElement(
                'div',
                { id: this.props.id, className: className, style: this.props.style },
                panels
            );
        }
    }]);

    return PanelMenu;
}(_react.Component);

PanelMenu.defaultProps = {
    id: null,
    model: null,
    style: null,
    className: null
};
PanelMenu.propTypes = {
    id: _propTypes2.default.string,
    model: _propTypes2.default.array,
    style: _propTypes2.default.object,
    className: _propTypes2.default.string
};