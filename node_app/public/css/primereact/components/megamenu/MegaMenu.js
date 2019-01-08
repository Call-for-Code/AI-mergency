'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MegaMenu = undefined;

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

var MegaMenu = exports.MegaMenu = function (_Component) {
    _inherits(MegaMenu, _Component);

    function MegaMenu(props) {
        _classCallCheck(this, MegaMenu);

        var _this = _possibleConstructorReturn(this, (MegaMenu.__proto__ || Object.getPrototypeOf(MegaMenu)).call(this));

        _this.state = {
            activeItem: null
        };
        _this.onMenuClick = _this.onMenuClick.bind(_this);
        _this.onLeafClick = _this.onLeafClick.bind(_this);
        return _this;
    }

    _createClass(MegaMenu, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.bindDocumentClickListener();
        }
    }, {
        key: 'onMenuClick',
        value: function onMenuClick() {
            this.selfClick = true;

            if (this.props.autoZIndex) {
                this.container.style.zIndex = String(this.props.baseZIndex + _DomHandler2.default.generateZIndex());
            }
        }
    }, {
        key: 'onLeafClick',
        value: function onLeafClick(event, item) {
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

            this.setState({
                activeItem: null
            });
        }
    }, {
        key: 'bindDocumentClickListener',
        value: function bindDocumentClickListener() {
            var _this2 = this;

            if (!this.documentClickListener) {
                this.documentClickListener = function (event) {
                    if (!_this2.selfClick) {
                        _this2.setState({
                            activeItem: null
                        });
                    }

                    _this2.selfClick = false;
                };

                document.addEventListener('click', this.documentClickListener);
            }
        }
    }, {
        key: 'unbindDocumentClickListener',
        value: function unbindDocumentClickListener() {
            if (this.documentClickListener) {
                document.removeEventListener('click', this.documentClickListener);
                this.documentClickListener = null;
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.unbindDocumentClickListener();
        }
    }, {
        key: 'onCategoryMouseEnter',
        value: function onCategoryMouseEnter(event, item) {
            if (item.disabled) {
                event.preventDefault();
                return;
            }

            if (this.state.activeItem) {
                this.setState({
                    activeItem: item
                });
            }
        }
    }, {
        key: 'onCategoryClick',
        value: function onCategoryClick(event, item) {
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
                    item: this.props.item
                });
            }

            if (item.items) {
                if (this.state.activeItem) {
                    this.setState({
                        activeItem: null
                    });
                } else {
                    this.setState({
                        activeItem: item
                    });
                }
            }

            event.preventDefault();
        }
    }, {
        key: 'getColumnClassName',
        value: function getColumnClassName(category) {
            var length = category.items ? category.items.length : 0;
            var columnClass = void 0;

            switch (length) {
                case 2:
                    columnClass = 'ui-g-6';
                    break;

                case 3:
                    columnClass = 'ui-g-4';
                    break;

                case 4:
                    columnClass = 'ui-g-3';
                    break;

                case 6:
                    columnClass = 'ui-g-2';
                    break;

                default:
                    columnClass = 'ui-g-12';
                    break;
            }

            return columnClass;
        }
    }, {
        key: 'renderSeparator',
        value: function renderSeparator(index) {
            return _react2.default.createElement('li', { key: 'separator_' + index, className: 'ui-menu-separator ui-widget-content' });
        }
    }, {
        key: 'renderSubmenuIcon',
        value: function renderSubmenuIcon(item) {
            if (item.items) {
                var className = (0, _classnames2.default)('ui-submenu-icon pi pi-fw', { 'pi-caret-down': this.props.orientation === 'horizontal', 'pi-caret-right': this.props.orientation === 'vertical' });

                return _react2.default.createElement('span', { className: className });
            } else {
                return null;
            }
        }
    }, {
        key: 'renderSubmenuItem',
        value: function renderSubmenuItem(item, index) {
            var _this3 = this;

            if (item.separator) {
                return _react2.default.createElement('li', { key: 'separator_' + index, className: 'ui-menu-separator ui-widget-content' });
            } else {
                var className = (0, _classnames2.default)('ui-menuitem ui-corner-all', item.className, { 'ui-state-disabled': item.disabled });
                var iconClassName = (0, _classnames2.default)(item.icon, 'ui-menuitem-icon');
                var icon = item.icon ? _react2.default.createElement('span', { className: iconClassName }) : null;

                return _react2.default.createElement(
                    'li',
                    { key: item.label + '_' + index, className: className, style: item.style },
                    _react2.default.createElement(
                        'a',
                        { href: item.url || '#', className: 'ui-menuitem-link ui-corner-all', target: item.target, onClick: function onClick(event) {
                                return _this3.onLeafClick(event, item);
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
        }
    }, {
        key: 'renderSubmenu',
        value: function renderSubmenu(submenu) {
            var _this4 = this;

            var className = (0, _classnames2.default)('ui-widget-header ui-megamenu-submenu-header ui-corner-all', submenu.className, { 'ui-state-disabled': submenu.disabled });
            var items = submenu.items.map(function (item, index) {
                return _this4.renderSubmenuItem(item, index);
            });

            return _react2.default.createElement(
                _react2.default.Fragment,
                { key: submenu.label },
                _react2.default.createElement(
                    'li',
                    { className: className, style: submenu.style },
                    submenu.label
                ),
                items
            );
        }
    }, {
        key: 'renderSubmenus',
        value: function renderSubmenus(column) {
            var _this5 = this;

            return column.map(function (submenu, index) {
                return _this5.renderSubmenu(submenu, index);
            });
        }
    }, {
        key: 'renderColumn',
        value: function renderColumn(category, column, index, columnClassName) {
            var submenus = this.renderSubmenus(column);

            return _react2.default.createElement(
                'div',
                { key: category.label + '_column_' + index, className: columnClassName },
                _react2.default.createElement(
                    'ul',
                    { className: 'ui-megamenu-submenu' },
                    submenus
                )
            );
        }
    }, {
        key: 'renderColumns',
        value: function renderColumns(category) {
            var _this6 = this;

            if (category.items) {
                var columnClassName = this.getColumnClassName(category);

                return category.items.map(function (column, index) {
                    return _this6.renderColumn(category, column, index, columnClassName);
                });
            } else {
                return null;
            }
        }
    }, {
        key: 'renderCategoryPanel',
        value: function renderCategoryPanel(category) {
            if (category.items) {
                var columns = this.renderColumns(category);

                return _react2.default.createElement(
                    'div',
                    { className: 'ui-megamenu-panel ui-widget-content ui-corner-all ui-shadow' },
                    _react2.default.createElement(
                        'div',
                        { className: 'ui-g' },
                        columns
                    )
                );
            } else {
                return null;
            }
        }
    }, {
        key: 'renderCategory',
        value: function renderCategory(category, index) {
            var _this7 = this;

            var className = (0, _classnames2.default)('ui-menuitem ui-corner-all', { 'ui-menuitem-active': category === this.state.activeItem, 'ui-state-disabled': category.disabled }, category.className);
            var iconClassName = (0, _classnames2.default)(category.icon, 'ui-menuitem-icon');
            var icon = category.icon ? _react2.default.createElement('span', { className: iconClassName }) : null;
            var submenuIcon = this.renderSubmenuIcon(category);
            var panel = this.renderCategoryPanel(category);

            return _react2.default.createElement(
                'li',
                { key: category.label + '_' + index, className: className, style: category.style, onMouseEnter: function onMouseEnter(event) {
                        return _this7.onCategoryMouseEnter(event, category);
                    } },
                _react2.default.createElement(
                    'a',
                    { href: category.url || '#', className: 'ui-menuitem-link ui-corner-all', target: category.target, onClick: function onClick(event) {
                            return _this7.onCategoryClick(event, category);
                        } },
                    icon,
                    _react2.default.createElement(
                        'span',
                        { className: 'ui-menuitem-text' },
                        category.label
                    ),
                    submenuIcon
                ),
                panel
            );
        }
    }, {
        key: 'renderMenu',
        value: function renderMenu() {
            var _this8 = this;

            if (this.props.model) {
                return this.props.model.map(function (item, index) {
                    return _this8.renderCategory(item, index, true);
                });
            } else {
                return null;
            }
        }
    }, {
        key: 'renderCustomContent',
        value: function renderCustomContent() {
            if (this.props.children) {
                return _react2.default.createElement(
                    'div',
                    { className: 'ui-megamenu-custom' },
                    this.props.children
                );
            } else {
                return null;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this9 = this;

            var className = (0, _classnames2.default)('ui-megamenu ui-widget ui-widget-content ui-corner-all', { 'ui-megamenu-horizontal': this.props.orientation === 'horizontal', 'ui-megamenu-vertical': this.props.orientation === 'vertical' }, this.props.className);
            var menu = this.renderMenu();
            var customContent = this.renderCustomContent();

            return _react2.default.createElement(
                'div',
                { id: this.props.id, className: className, style: this.props.style, onClick: this.onMenuClick, ref: function ref(el) {
                        return _this9.container = el;
                    } },
                _react2.default.createElement(
                    'ul',
                    { className: 'ui-megamenu-root-list' },
                    menu
                ),
                customContent
            );
        }
    }]);

    return MegaMenu;
}(_react.Component);

MegaMenu.defaultProps = {
    id: null,
    model: null,
    style: null,
    className: null,
    orientation: 'horizontal',
    autoZIndex: true,
    baseZIndex: 0
};
MegaMenu.propTypes = {
    id: _propTypes2.default.string,
    model: _propTypes2.default.array,
    style: _propTypes2.default.object,
    className: _propTypes2.default.string,
    orientation: _propTypes2.default.string,
    autoZIndex: _propTypes2.default.bool,
    baseZIndex: _propTypes2.default.number
};