'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TieredMenu = undefined;

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

var TieredMenuSub = function (_Component) {
    _inherits(TieredMenuSub, _Component);

    function TieredMenuSub(props) {
        _classCallCheck(this, TieredMenuSub);

        var _this = _possibleConstructorReturn(this, (TieredMenuSub.__proto__ || Object.getPrototypeOf(TieredMenuSub)).call(this, props));

        _this.state = {
            activeItem: null
        };
        return _this;
    }

    _createClass(TieredMenuSub, [{
        key: 'onItemMouseEnter',
        value: function onItemMouseEnter(event, item) {
            if (item.disabled) {
                event.preventDefault();
                return;
            }

            if (this.props.root) {
                if (this.state.activeItem || this.props.popup) {
                    this.setState({
                        activeItem: item
                    });
                }
            } else {
                this.setState({
                    activeItem: item
                });
            }
        }
    }, {
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

            if (this.props.root) {
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
            }

            if (!item.items) {
                this.props.onLeafClick(event);
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
        value: function renderSubmenuIcon(item) {
            if (item.items) {
                return _react2.default.createElement('span', { className: 'ui-submenu-icon pi pi-fw pi-caret-right' });
            } else {
                return null;
            }
        }
    }, {
        key: 'renderSubmenu',
        value: function renderSubmenu(item) {
            if (item.items) {
                return _react2.default.createElement(TieredMenuSub, { model: item.items, resetMenu: item !== this.state.activeItem, onLeafClick: this.props.onLeafClick, popup: this.props.popup });
            } else {
                return null;
            }
        }
    }, {
        key: 'renderMenuitem',
        value: function renderMenuitem(item, index) {
            var _this2 = this;

            var className = (0, _classnames2.default)('ui-menuitem ui-widget ui-corner-all', { 'ui-menuitem-active': this.state.activeItem === item, 'ui-state-disabled': item.disabled }, item.className);
            var icon = this.renderIcon(item);
            var submenuIcon = this.renderSubmenuIcon(item);
            var submenu = this.renderSubmenu(item);

            return _react2.default.createElement(
                'li',
                { key: item.label + '_' + index, className: className, style: item.style, onMouseEnter: function onMouseEnter(event) {
                        return _this2.onItemMouseEnter(event, item);
                    } },
                _react2.default.createElement(
                    'a',
                    { href: item.url || '#', className: 'ui-menuitem-link ui-corner-all', target: item.target, onClick: function onClick(event) {
                            return _this2.onItemClick(event, item, index);
                        } },
                    icon,
                    _react2.default.createElement(
                        'span',
                        { className: 'ui-menuitem-text' },
                        item.label
                    ),
                    submenuIcon
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
            var className = (0, _classnames2.default)({ 'ui-widget-content ui-corner-all ui-shadow ui-submenu-list': !this.props.root });
            var submenu = this.renderMenu();

            return _react2.default.createElement(
                'ul',
                { className: className },
                submenu
            );
        }
    }], [{
        key: 'getDerivedStateFromProps',
        value: function getDerivedStateFromProps(nextProps, prevState) {
            if (nextProps.resetMenu === true) {
                return {
                    activeItem: null
                };
            }

            return null;
        }
    }]);

    return TieredMenuSub;
}(_react.Component);

TieredMenuSub.defaultProps = {
    model: null,
    root: false,
    className: null,
    popup: false,
    resetMenu: false,
    onLeafClick: null
};
TieredMenuSub.propTypes = {
    model: _propTypes2.default.any,
    root: _propTypes2.default.bool,
    className: _propTypes2.default.string,
    popup: _propTypes2.default.bool,
    resetMenu: _propTypes2.default.bool,
    onLeafClick: _propTypes2.default.func
};

var TieredMenu = exports.TieredMenu = function (_Component2) {
    _inherits(TieredMenu, _Component2);

    function TieredMenu(props) {
        _classCallCheck(this, TieredMenu);

        var _this4 = _possibleConstructorReturn(this, (TieredMenu.__proto__ || Object.getPrototypeOf(TieredMenu)).call(this));

        _this4.state = {
            resetMenu: false
        };
        _this4.onMenuClick = _this4.onMenuClick.bind(_this4);
        _this4.onLeafClick = _this4.onLeafClick.bind(_this4);
        _this4.onMenuMouseEnter = _this4.onMenuMouseEnter.bind(_this4);
        return _this4;
    }

    _createClass(TieredMenu, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.bindDocumentClickListener();
        }
    }, {
        key: 'toggle',
        value: function toggle(event) {
            if (this.props.popup) {
                this.targetClick = true;

                this.setState({
                    resetMenu: true
                });

                if (this.container.offsetParent) this.hide(event);else this.show(event);
            }
        }
    }, {
        key: 'onMenuClick',
        value: function onMenuClick() {
            this.selfClick = true;

            this.setState({
                resetMenu: false
            });

            if (!this.props.popup && this.props.autoZIndex) {
                this.container.style.zIndex = String(this.props.baseZIndex + _DomHandler2.default.generateZIndex());
            }
        }
    }, {
        key: 'onMenuMouseEnter',
        value: function onMenuMouseEnter() {
            this.setState({
                resetMenu: false
            });
        }
    }, {
        key: 'show',
        value: function show(event) {
            var _this5 = this;

            if (this.props.autoZIndex) {
                this.container.style.zIndex = String(this.props.baseZIndex + _DomHandler2.default.generateZIndex());
            }
            this.container.style.display = 'block';

            setTimeout(function () {
                _DomHandler2.default.addClass(_this5.container, 'ui-menu-overlay-visible');
                _DomHandler2.default.removeClass(_this5.container, 'ui-menu-overlay-hidden');
            }, 1);

            _DomHandler2.default.absolutePosition(this.container, event.currentTarget);
            this.bindDocumentResizeListener();

            if (this.props.onShow) {
                this.props.onShow(event);
            }
        }
    }, {
        key: 'hide',
        value: function hide(event) {
            var _this6 = this;

            if (this.container) {
                _DomHandler2.default.addClass(this.container, 'ui-menu-overlay-hidden');
                _DomHandler2.default.removeClass(this.container, 'ui-menu-overlay-visible');

                setTimeout(function () {
                    if (_this6.container) {
                        _this6.container.style.display = 'none';
                        _DomHandler2.default.removeClass(_this6.container, 'ui-menu-overlay-hidden');
                    }
                }, 150);
            }

            if (this.props.onHide) {
                this.props.onHide(event);
            }

            this.unbindDocumentResizeListener();
        }
    }, {
        key: 'bindDocumentClickListener',
        value: function bindDocumentClickListener() {
            var _this7 = this;

            if (!this.documentClickListener) {
                this.documentClickListener = function (event) {
                    if (!_this7.targetClick && !_this7.selfClick) {
                        if (_this7.props.popup) {
                            _this7.hide(event);
                        }

                        _this7.setState({
                            resetMenu: true
                        });
                    }

                    _this7.selfClick = false;
                    _this7.targetClick = false;
                };

                document.addEventListener('click', this.documentClickListener);
            }
        }
    }, {
        key: 'onLeafClick',
        value: function onLeafClick(event) {
            this.setState({
                resetMenu: true
            });

            event.stopPropagation();
        }
    }, {
        key: 'bindDocumentResizeListener',
        value: function bindDocumentResizeListener() {
            var _this8 = this;

            if (!this.documentResizeListener) {
                this.documentResizeListener = function (event) {
                    if (_this8.container.offsetParent) {
                        _this8.hide(event);
                    }
                };

                window.addEventListener('resize', this.documentResizeListener);
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
        key: 'unbindDocumentResizeListener',
        value: function unbindDocumentResizeListener() {
            if (this.documentResizeListener) {
                window.removeEventListener('resize', this.documentResizeListener);
                this.documentResizeListener = null;
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.unbindDocumentClickListener();
            this.unbindDocumentResizeListener();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this9 = this;

            var className = (0, _classnames2.default)('ui-tieredmenu ui-widget ui-widget-content ui-corner-all', { 'ui-tieredmenu-dynamic ui-menu-overlay ui-shadow': this.props.popup }, this.props.className);

            return _react2.default.createElement(
                'div',
                { id: this.props.id, className: className, style: this.props.style, ref: function ref(el) {
                        return _this9.container = el;
                    }, onClick: this.onMenuClick, onMouseEnter: this.onMenuMouseEnter },
                _react2.default.createElement(TieredMenuSub, { model: this.props.model, root: true, resetMenu: this.state.resetMenu, onLeafClick: this.onLeafClick, popup: this.props.popup })
            );
        }
    }]);

    return TieredMenu;
}(_react.Component);

TieredMenu.defaultProps = {
    id: null,
    model: null,
    popup: false,
    style: null,
    className: null,
    autoZIndex: true,
    baseZIndex: 0,
    onShow: null,
    onHide: null
};
TieredMenu.propTypes = {
    id: _propTypes2.default.string,
    model: _propTypes2.default.array,
    popup: _propTypes2.default.bool,
    style: _propTypes2.default.object,
    className: _propTypes2.default.string,
    autoZIndex: _propTypes2.default.bool,
    baseZIndex: _propTypes2.default.number,
    onShow: _propTypes2.default.func,
    onHide: _propTypes2.default.func
};