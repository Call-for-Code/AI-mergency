'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SlideMenu = exports.SlideMenuSub = undefined;

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

var SlideMenuSub = exports.SlideMenuSub = function (_Component) {
    _inherits(SlideMenuSub, _Component);

    function SlideMenuSub(props) {
        _classCallCheck(this, SlideMenuSub);

        var _this = _possibleConstructorReturn(this, (SlideMenuSub.__proto__ || Object.getPrototypeOf(SlideMenuSub)).call(this, props));

        _this.state = {
            activeItem: null
        };
        return _this;
    }

    _createClass(SlideMenuSub, [{
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

            if (item.items) {
                this.setState({
                    activeItem: item
                });
                this.props.onForward();
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
                return _react2.default.createElement(SlideMenuSub, { model: item.items, index: this.props.index + 1, menuWidth: this.props.menuWidth, effectDuration: this.props.effectDuration,
                    onForward: this.props.onForward, parentActive: item === this.state.activeItem });
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
                { key: item.label + '_' + index, className: className, style: item.style },
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
        key: 'renderItems',
        value: function renderItems() {
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
            var className = (0, _classnames2.default)({ 'ui-slidemenu-rootlist': this.props.root, 'ui-submenu-list': !this.props.root, 'ui-active-submenu': this.props.parentActive });
            var style = {
                width: this.props.menuWidth + 'px',
                left: this.props.root ? -1 * this.props.level * this.props.menuWidth + 'px' : this.props.menuWidth + 'px',
                transitionProperty: this.props.root ? 'left' : 'none',
                transitionDuration: this.props.effectDuration + 'ms',
                transitionTimingFunction: this.props.easing
            };
            var items = this.renderItems();

            return _react2.default.createElement(
                'ul',
                { className: className, style: style },
                items
            );
        }
    }]);

    return SlideMenuSub;
}(_react.Component);

SlideMenuSub.defaultProps = {
    model: null,
    level: 0,
    easing: 'ease-out',
    effectDuration: 250,
    menuWidth: 190,
    parentActive: false,
    onForward: null
};
SlideMenuSub.propsTypes = {
    model: _propTypes2.default.any,
    level: _propTypes2.default.number,
    easing: _propTypes2.default.string,
    effectDuration: _propTypes2.default.number,
    menuWidth: _propTypes2.default.number,
    parentActive: _propTypes2.default.bool,
    onForward: _propTypes2.default.func
};

var SlideMenu = exports.SlideMenu = function (_Component2) {
    _inherits(SlideMenu, _Component2);

    function SlideMenu(props) {
        _classCallCheck(this, SlideMenu);

        var _this4 = _possibleConstructorReturn(this, (SlideMenu.__proto__ || Object.getPrototypeOf(SlideMenu)).call(this, props));

        _this4.state = {
            level: 0
        };
        _this4.onMenuClick = _this4.onMenuClick.bind(_this4);
        _this4.navigateBack = _this4.navigateBack.bind(_this4);
        _this4.navigateForward = _this4.navigateForward.bind(_this4);
        return _this4;
    }

    _createClass(SlideMenu, [{
        key: 'onMenuClick',
        value: function onMenuClick(event) {
            this.selfClick = true;
        }
    }, {
        key: 'navigateForward',
        value: function navigateForward() {
            this.setState({
                level: this.state.level + 1
            });
        }
    }, {
        key: 'navigateBack',
        value: function navigateBack() {
            this.setState({
                level: this.state.level - 1
            });
        }
    }, {
        key: 'renderBackward',
        value: function renderBackward() {
            var _this5 = this;

            var className = (0, _classnames2.default)('ui-slidemenu-backward ui-widget-header ui-corner-all', { 'ui-helper-hidden': this.state.level === 0 });

            return _react2.default.createElement(
                'div',
                { ref: function ref(el) {
                        return _this5.backward = el;
                    }, className: className, onClick: this.navigateBack },
                _react2.default.createElement('span', { className: 'ui-slidemenu-backward-icon pi pi-fw pi-caret-left' }),
                _react2.default.createElement(
                    'span',
                    null,
                    this.props.backLabel
                )
            );
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.props.popup) {
                this.bindDocumentClickListener();
            }
        }
    }, {
        key: 'toggle',
        value: function toggle(event) {
            if (this.props.popup) {
                this.selfClick = true;

                if (this.container.offsetParent) this.hide(event);else this.show(event);
            }
        }
    }, {
        key: 'show',
        value: function show(event) {
            var _this6 = this;

            if (this.props.autoZIndex) {
                this.container.style.zIndex = String(this.props.baseZIndex + _DomHandler2.default.generateZIndex());
            }
            this.container.style.display = 'block';

            setTimeout(function () {
                _DomHandler2.default.addClass(_this6.container, 'ui-menu-overlay-visible');
                _DomHandler2.default.removeClass(_this6.container, 'ui-menu-overlay-hidden');
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
            var _this7 = this;

            if (this.container) {
                _DomHandler2.default.addClass(this.container, 'ui-menu-overlay-hidden');
                _DomHandler2.default.removeClass(this.container, 'ui-menu-overlay-visible');

                setTimeout(function () {
                    if (_this7.container) {
                        _this7.container.style.display = 'none';
                        _DomHandler2.default.removeClass(_this7.container, 'ui-menu-overlay-hidden');
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
            var _this8 = this;

            if (!this.documentClickListener) {
                this.documentClickListener = function (event) {
                    if (!_this8.selfClick && _this8.container.offsetParent) {
                        _this8.hide(event);
                    }

                    _this8.selfClick = false;
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
            var _this9 = this;

            if (!this.documentResizeListener) {
                this.documentResizeListener = function (event) {
                    if (_this9.container.offsetParent) {
                        _this9.hide(event);
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
            var _this10 = this;

            var className = (0, _classnames2.default)('ui-slidemenu ui-widget ui-widget-content ui-corner-all', { 'ui-slidemenu-dynamic ui-menu-overlay ui-shadow': this.props.popup });
            var backward = this.renderBackward();

            return _react2.default.createElement(
                'div',
                { id: this.props.id, className: className, style: this.props.style, ref: function ref(el) {
                        return _this10.container = el;
                    }, onClick: this.onMenuClick },
                _react2.default.createElement(
                    'div',
                    { className: 'ui-slidemenu-wrapper', style: { height: this.props.viewportHeight + 'px' } },
                    _react2.default.createElement(
                        'div',
                        { className: 'ui-slidemenu-content', ref: function ref(el) {
                                return _this10.slideMenuContent = el;
                            } },
                        _react2.default.createElement(SlideMenuSub, { model: this.props.model, root: true, index: 0, menuWidth: this.props.menuWidth, effectDuration: this.props.effectDuration,
                            level: this.state.level, parentActive: this.state.level === 0, onForward: this.navigateForward })
                    ),
                    backward
                )
            );
        }
    }]);

    return SlideMenu;
}(_react.Component);

SlideMenu.defaultProps = {
    id: null,
    model: null,
    popup: false,
    style: null,
    className: null,
    easing: 'ease-out',
    effectDuration: 250,
    backLabel: 'Back',
    menuWidth: 190,
    viewportHeight: 175,
    autoZIndex: true,
    baseZIndex: 0,
    onShow: null,
    onHide: null
};
SlideMenu.propsTypes = {
    id: _propTypes2.default.string,
    model: _propTypes2.default.array,
    popup: _propTypes2.default.bool,
    style: _propTypes2.default.object,
    className: _propTypes2.default.string,
    easing: _propTypes2.default.string,
    effectDuration: _propTypes2.default.number,
    backLabel: _propTypes2.default.string,
    menuWidth: _propTypes2.default.number,
    viewportHeight: _propTypes2.default.number,
    autoZIndex: _propTypes2.default.bool,
    baseZIndex: _propTypes2.default.number,
    onShow: _propTypes2.default.func,
    onHide: _propTypes2.default.func
};