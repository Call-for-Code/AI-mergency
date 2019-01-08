'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Menu = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _DomHandler = require('../utils/DomHandler');

var _DomHandler2 = _interopRequireDefault(_DomHandler);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Menu = exports.Menu = function (_Component) {
    _inherits(Menu, _Component);

    function Menu(props) {
        _classCallCheck(this, Menu);

        var _this = _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).call(this));

        _this.onMenuClick = _this.onMenuClick.bind(_this);
        return _this;
    }

    _createClass(Menu, [{
        key: 'onMenuClick',
        value: function onMenuClick() {
            if (this.documentClickListener) {
                this.selfClick = true;
            }
        }
    }, {
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

            if (this.props.popup) {
                this.hide(event);
            }
        }
    }, {
        key: 'toggle',
        value: function toggle(event) {
            if (this.props.popup) {
                if (this.documentClickListener) {
                    this.selfClick = true;
                }

                if (this.container.offsetParent) this.hide(event);else this.show(event);
            }
        }
    }, {
        key: 'show',
        value: function show(event) {
            var _this2 = this;

            this.container.style.zIndex = String(this.props.baseZIndex + _DomHandler2.default.generateZIndex());
            this.container.style.display = 'block';

            setTimeout(function () {
                _DomHandler2.default.addClass(_this2.container, 'ui-menu-overlay-visible');
                _DomHandler2.default.removeClass(_this2.container, 'ui-menu-overlay-hidden');
            }, 1);

            _DomHandler2.default.absolutePosition(this.container, event.currentTarget);
            this.bindDocumentListeners();

            if (this.props.onShow) {
                this.props.onShow(event);
            }
        }
    }, {
        key: 'hide',
        value: function hide(event) {
            var _this3 = this;

            if (this.container) {
                _DomHandler2.default.addClass(this.container, 'ui-menu-overlay-hidden');
                _DomHandler2.default.removeClass(this.container, 'ui-menu-overlay-visible');

                setTimeout(function () {
                    if (_this3.container) {
                        _this3.container.style.display = 'none';
                        _DomHandler2.default.removeClass(_this3.container, 'ui-menu-overlay-hidden');
                    }
                }, 150);
            }

            if (this.props.onHide) {
                this.props.onHide(event);
            }

            this.unbindDocumentListeners();
            this.selfClick = false;
        }
    }, {
        key: 'bindDocumentListeners',
        value: function bindDocumentListeners() {
            var _this4 = this;

            if (!this.documentClickListener) {
                this.documentClickListener = function (event) {
                    if (_this4.selfClick) _this4.selfClick = false;else _this4.hide(event);
                };

                document.addEventListener('click', this.documentClickListener);
            }

            if (!this.documentResizeListener) {
                this.documentResizeListener = function (event) {
                    if (_this4.container.offsetParent) {
                        _this4.hide(event);
                    }
                };

                window.addEventListener('resize', this.documentResizeListener);
            }
        }
    }, {
        key: 'unbindDocumentListeners',
        value: function unbindDocumentListeners() {
            if (this.documentClickListener) {
                document.removeEventListener('click', this.documentClickListener);
                this.documentClickListener = null;
            }

            if (this.documentResizeListener) {
                window.removeEventListener('resize', this.documentResizeListener);
                this.documentResizeListener = null;
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.unbindDocumentListeners();
        }
    }, {
        key: 'renderSubmenu',
        value: function renderSubmenu(submenu, index) {
            var _this5 = this;

            var className = (0, _classnames2.default)('ui-submenu-header ui-widget-header ui-corner-all', submenu.className, { 'ui-state-disabled': submenu.disabled });
            var items = submenu.items.map(function (item, index) {
                return _this5.renderMenuitem(item, index);
            });

            return _react2.default.createElement(
                _react2.default.Fragment,
                { key: submenu.label + '_' + index },
                _react2.default.createElement(
                    'li',
                    { className: className, style: submenu.style },
                    submenu.label
                ),
                items
            );
        }
    }, {
        key: 'renderSeparator',
        value: function renderSeparator(index) {
            return _react2.default.createElement('li', { key: 'separator_' + index, className: 'ui-menu-separator ui-widget-content' });
        }
    }, {
        key: 'renderMenuitem',
        value: function renderMenuitem(item, index) {
            var _this6 = this;

            var className = (0, _classnames2.default)('ui-menuitem ui-widget ui-corner-all', item.className, { 'ui-state-disabled': item.disabled });
            var iconClassName = (0, _classnames2.default)(item.icon, 'ui-menuitem-icon');
            var icon = item.icon ? _react2.default.createElement('span', { className: iconClassName }) : null;

            return _react2.default.createElement(
                'li',
                { key: item.label + '_' + index, className: className, style: item.style },
                _react2.default.createElement(
                    'a',
                    { href: item.url || '#', className: 'ui-menuitem-link ui-corner-all', target: item.target, onClick: function onClick(event) {
                            return _this6.itemClick(event, item);
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
        key: 'renderItem',
        value: function renderItem(item, index) {
            if (item.separator) {
                return this.renderSeparator(index);
            } else {
                if (item.items) return this.renderSubmenu(item, index);else return this.renderMenuitem(item, index);
            }
        }
    }, {
        key: 'renderMenu',
        value: function renderMenu() {
            var _this7 = this;

            return this.props.model.map(function (item, index) {
                return _this7.renderItem(item, index);
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this8 = this;

            if (this.props.model) {
                var className = (0, _classnames2.default)('ui-menu ui-widget ui-widget-content ui-corner-all ui-helper-clearfix', this.props.className, { 'ui-menu-dynamic ui-menu-overlay ui-shadow': this.props.popup });
                var menuitems = this.renderMenu();

                return _react2.default.createElement(
                    'div',
                    { id: this.props.id, className: className, style: this.props.style, ref: function ref(el) {
                            return _this8.container = el;
                        }, onClick: this.onMenuClick },
                    _react2.default.createElement(
                        'ul',
                        { className: 'ui-menu-list ui-helper-reset' },
                        menuitems
                    )
                );
            } else {
                return null;
            }
        }
    }]);

    return Menu;
}(_react.Component);

Menu.defaultProps = {
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
Menu.propTypes = {
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