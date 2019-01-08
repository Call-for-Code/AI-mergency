'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BreadCrumb = undefined;

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

var BreadCrumb = exports.BreadCrumb = function (_Component) {
    _inherits(BreadCrumb, _Component);

    function BreadCrumb() {
        _classCallCheck(this, BreadCrumb);

        return _possibleConstructorReturn(this, (BreadCrumb.__proto__ || Object.getPrototypeOf(BreadCrumb)).apply(this, arguments));
    }

    _createClass(BreadCrumb, [{
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
        }
    }, {
        key: 'renderHome',
        value: function renderHome() {
            var _this2 = this;

            if (this.props.home) {
                var className = (0, _classnames2.default)('ui-breadcrumb-home', this.props.home.className, { 'ui-state-disabled': this.props.home.disabled });

                return _react2.default.createElement(
                    'li',
                    { className: className, style: this.props.home.style },
                    _react2.default.createElement(
                        'a',
                        { href: this.props.home.url || '#', className: 'ui-menuitem-link', target: this.props.home.target, onClick: function onClick(event) {
                                return _this2.itemClick(event, _this2.props.home);
                            } },
                        _react2.default.createElement('span', { className: this.props.home.icon })
                    )
                );
            } else {
                return null;
            }
        }
    }, {
        key: 'renderSeparator',
        value: function renderSeparator() {
            return _react2.default.createElement('li', { className: 'ui-breadcrumb-chevron pi pi-chevron-right' });
        }
    }, {
        key: 'renderMenuitem',
        value: function renderMenuitem(item, index) {
            var _this3 = this;

            var className = (0, _classnames2.default)(item.className, { 'ui-state-disabled': item.disabled });

            return _react2.default.createElement(
                'li',
                { role: 'menuitem', className: className, style: item.style },
                _react2.default.createElement(
                    'a',
                    { href: item.url || '#', className: 'ui-menuitem-link', target: item.target, onClick: function onClick(event) {
                            return _this3.itemClick(event, item);
                        } },
                    _react2.default.createElement(
                        'span',
                        { 'class': 'ui-menuitem-text' },
                        item.label
                    )
                )
            );
        }
    }, {
        key: 'renderMenuitems',
        value: function renderMenuitems() {
            var _this4 = this;

            if (this.props.model) {
                var items = this.props.model.map(function (item, index) {
                    var menuitem = _this4.renderMenuitem(item, index);
                    var separator = index === _this4.props.model.length - 1 ? null : _this4.renderSeparator();

                    return _react2.default.createElement(
                        _react2.default.Fragment,
                        { key: item.label + '_' + index },
                        menuitem,
                        separator
                    );
                });

                return items;
            } else {
                return null;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var className = (0, _classnames2.default)('ui-breadcrumb ui-widget ui-widget-header ui-helper-clearfix ui-corner-all', this.props.className);
            var home = this.renderHome();
            var items = this.renderMenuitems();
            var separator = this.renderSeparator();

            return _react2.default.createElement(
                'div',
                { id: this.props.id, className: className, style: this.props.style },
                _react2.default.createElement(
                    'ul',
                    null,
                    home,
                    separator,
                    items
                )
            );
        }
    }]);

    return BreadCrumb;
}(_react.Component);

BreadCrumb.defaultProps = {
    id: null,
    model: null,
    home: null,
    style: null,
    className: null
};
BreadCrumb.propTypes = {
    id: _propTypes2.default.string,
    model: _propTypes2.default.array,
    home: _propTypes2.default.any,
    style: _propTypes2.default.object,
    className: _propTypes2.default.string
};