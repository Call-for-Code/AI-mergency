'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Panel = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DomHandler = require('../utils/DomHandler');

var _DomHandler2 = _interopRequireDefault(_DomHandler);

var _UniqueComponentId = require('../utils/UniqueComponentId');

var _UniqueComponentId2 = _interopRequireDefault(_UniqueComponentId);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Panel = exports.Panel = function (_Component) {
    _inherits(Panel, _Component);

    function Panel(props) {
        _classCallCheck(this, Panel);

        var _this = _possibleConstructorReturn(this, (Panel.__proto__ || Object.getPrototypeOf(Panel)).call(this, props));

        if (!_this.props.onToggle) {
            _this.state = {
                collapsed: _this.props.collapsed
            };
        }

        _this.toggle = _this.toggle.bind(_this);
        _this.id = _this.props.id || (0, _UniqueComponentId2.default)();
        return _this;
    }

    _createClass(Panel, [{
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            var _this2 = this;

            var collapsed = this.props.onToggle ? this.props.collapsed : this.state.collapsed;

            if (this.props.toggleable && !collapsed && this.expanding) {
                _DomHandler2.default.addClass(this.contentWrapper, 'ui-panel-content-wrapper-expanding');

                setTimeout(function () {
                    _DomHandler2.default.removeClass(_this2.contentWrapper, 'ui-panel-content-wrapper-expanding');
                    _this2.expanding = false;
                }, 500);
            }
        }
    }, {
        key: 'toggle',
        value: function toggle(event) {
            if (this.props.toggleable) {
                var collapsed = this.props.onToggle ? this.props.collapsed : this.state.collapsed;

                if (collapsed) this.expand(event);else this.collapse(event);

                if (this.props.onToggle) {
                    this.props.onToggle({
                        originalEvent: event,
                        value: !collapsed
                    });
                }
            }

            event.preventDefault();
        }
    }, {
        key: 'expand',
        value: function expand(event) {
            if (!this.props.onToggle) {
                this.setState({ collapsed: false });
            }

            this.expanding = true;

            if (this.props.onExpand) {
                this.props.onExpand(event);
            }
        }
    }, {
        key: 'collapse',
        value: function collapse(event) {
            if (!this.props.onToggle) {
                this.setState({ collapsed: true });
            }

            if (this.props.onCollapse) {
                this.props.onCollapse(event);
            }
        }
    }, {
        key: 'renderToggleIcon',
        value: function renderToggleIcon(collapsed) {
            if (this.props.toggleable) {
                var id = this.id + '_label';
                var ariaControls = this.id + '_content';

                return _react2.default.createElement(
                    'a',
                    { href: '#' + ariaControls, className: 'ui-panel-titlebar-icon ui-panel-titlebar-toggler ui-corner-all ui-state-default', onClick: this.toggle,
                        id: id, 'aria-controls': ariaControls, 'aria-expanded': !collapsed, role: 'tab' },
                    _react2.default.createElement('span', { className: (0, _classnames2.default)('pi', { 'pi-plus': collapsed, 'pi-minus': !collapsed }) })
                );
            } else {
                return null;
            }
        }
    }, {
        key: 'renderHeader',
        value: function renderHeader(collapsed) {
            if (this.props.header || this.props.toggleable) {
                var toggleIcon = this.renderToggleIcon(collapsed);

                return _react2.default.createElement(
                    'div',
                    { className: 'ui-panel-titlebar ui-widget-header ui-helper-clearfix ui-corner-all' },
                    _react2.default.createElement(
                        'span',
                        { className: 'ui-panel-title' },
                        this.props.header
                    ),
                    toggleIcon
                );
            } else {
                return null;
            }
        }
    }, {
        key: 'renderContent',
        value: function renderContent(collapsed) {
            var _this3 = this;

            var className = (0, _classnames2.default)('ui-panel-content-wrapper', {
                'ui-panel-content-wrapper-collapsed': collapsed,
                'ui-panel-content-wrapper-expanded': !collapsed
            });
            var id = this.id + '_content';
            var ariaLabelledBy = this.id + '_label';

            return _react2.default.createElement(
                'div',
                { ref: function ref(el) {
                        return _this3.contentWrapper = el;
                    }, className: className, id: id, 'aria-labelledby': ariaLabelledBy, 'aria-hidden': collapsed },
                _react2.default.createElement(
                    'div',
                    { className: 'ui-panel-content ui-widget-content' },
                    this.props.children
                )
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var className = (0, _classnames2.default)('ui-panel ui-widget ui-widget-content ui-corner-all', this.props.className);
            var collapsed = this.props.toggleable ? this.props.onToggle ? this.props.collapsed : this.state.collapsed : false;
            var header = this.renderHeader(collapsed);
            var content = this.renderContent(collapsed);

            return _react2.default.createElement(
                'div',
                { id: this.props.id, className: className, style: this.props.style },
                header,
                content
            );
        }
    }]);

    return Panel;
}(_react.Component);

Panel.defaultProps = {
    id: null,
    header: null,
    toggleable: null,
    style: null,
    className: null,
    collapsed: null,
    onExpand: null,
    onCollapse: null,
    onToggle: null
};
Panel.propTypes = {
    id: _propTypes2.default.string,
    header: _propTypes2.default.any,
    toggleable: _propTypes2.default.bool,
    style: _propTypes2.default.object,
    className: _propTypes2.default.string,
    collapsed: _propTypes2.default.bool,
    onExpand: _propTypes2.default.func,
    onCollapse: _propTypes2.default.func,
    onToggle: _propTypes2.default.func
};