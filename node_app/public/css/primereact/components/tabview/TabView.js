'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TabView = exports.TabPanel = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _UniqueComponentId = require('../utils/UniqueComponentId');

var _UniqueComponentId2 = _interopRequireDefault(_UniqueComponentId);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TabPanel = exports.TabPanel = function (_Component) {
    _inherits(TabPanel, _Component);

    function TabPanel() {
        _classCallCheck(this, TabPanel);

        return _possibleConstructorReturn(this, (TabPanel.__proto__ || Object.getPrototypeOf(TabPanel)).apply(this, arguments));
    }

    return TabPanel;
}(_react.Component);

TabPanel.defaultProps = {
    header: null,
    leftIcon: null,
    rightIcon: null,
    disabled: false,
    headerStyle: null,
    headerClassName: null,
    contentStyle: null,
    contentClassName: null
};
TabPanel.propTypes = {
    header: _propTypes2.default.string,
    leftIcon: _propTypes2.default.string,
    rightIcon: _propTypes2.default.string,
    disabled: _propTypes2.default.bool,
    headerStyle: _propTypes2.default.object,
    headerClassName: _propTypes2.default.string,
    contentStyle: _propTypes2.default.object,
    contentClassName: _propTypes2.default.string
};

var TabView = exports.TabView = function (_Component2) {
    _inherits(TabView, _Component2);

    function TabView(props) {
        _classCallCheck(this, TabView);

        var _this2 = _possibleConstructorReturn(this, (TabView.__proto__ || Object.getPrototypeOf(TabView)).call(this, props));

        if (!_this2.props.onTabChange) {
            _this2.state = {
                activeIndex: _this2.props.activeIndex
            };
        }

        _this2.id = _this2.props.id || (0, _UniqueComponentId2.default)();
        return _this2;
    }

    _createClass(TabView, [{
        key: 'isSelected',
        value: function isSelected(index) {
            var activeIndex = this.props.onTabChange ? this.props.activeIndex : this.state.activeIndex;

            return activeIndex === index;
        }
    }, {
        key: 'onTabHeaderClick',
        value: function onTabHeaderClick(event, tab, index) {
            if (!tab.props.disabled) {
                if (this.props.onTabChange) {
                    this.props.onTabChange({ originalEvent: event, index: index });
                } else {
                    this.setState({
                        activeIndex: index
                    });
                }
            }

            event.preventDefault();
        }
    }, {
        key: 'renderTabHeader',
        value: function renderTabHeader(tab, index) {
            var _this3 = this;

            var selected = this.isSelected(index);
            var className = (0, _classnames2.default)(tab.props.headerClassName, 'ui-state-default ui-corner-top', { 'ui-tabview-selected ui-state-active': selected, 'ui-state-disabled': tab.props.disabled });
            var id = this.id + '_header_' + index;
            var ariaControls = this.id + '_content_' + index;

            return _react2.default.createElement(
                'li',
                { className: className, style: tab.props.headerStyle, role: 'presentation' },
                _react2.default.createElement(
                    'a',
                    { role: 'tab', href: '#' + ariaControls, onClick: function onClick(event) {
                            return _this3.onTabHeaderClick(event, tab, index);
                        }, id: id, 'aria-controls': ariaControls, 'aria-selected': selected },
                    tab.props.leftIcon && _react2.default.createElement('span', { className: (0, _classnames2.default)('ui-tabview-left-icon ', tab.props.leftIcon) }),
                    _react2.default.createElement(
                        'span',
                        { className: 'ui-tabview-title' },
                        tab.props.header
                    ),
                    tab.props.rightIcon && _react2.default.createElement('span', { className: (0, _classnames2.default)('ui-tabview-right-icon ', tab.props.rightIcon) })
                )
            );
        }
    }, {
        key: 'renderTabHeaders',
        value: function renderTabHeaders() {
            var _this4 = this;

            return _react2.default.Children.map(this.props.children, function (tab, index) {
                return _this4.renderTabHeader(tab, index);
            });
        }
    }, {
        key: 'renderNavigator',
        value: function renderNavigator() {
            var headers = this.renderTabHeaders();

            return _react2.default.createElement(
                'ul',
                { className: 'ui-tabview-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all', role: 'tablist' },
                headers
            );
        }
    }, {
        key: 'renderContent',
        value: function renderContent() {
            var _this5 = this;

            var contents = _react2.default.Children.map(this.props.children, function (tab, index) {
                var selected = _this5.isSelected(index);
                var className = (0, _classnames2.default)(tab.props.contentClassName, 'ui-tabview-panel ui-widget-content', { 'ui-helper-hidden': !selected });
                var id = _this5.id + '_content_' + index;
                var ariaLabelledBy = _this5.id + '_header_' + index;

                return _react2.default.createElement(
                    'div',
                    { id: id, 'aria-labelledby': ariaLabelledBy, 'aria-hidden': !selected, className: className, style: tab.props.contentStyle, role: 'tabpanel' },
                    selected && tab.props.children
                );
            });

            return _react2.default.createElement(
                'div',
                { className: 'ui-tabview-panels' },
                contents
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var className = (0, _classnames2.default)('ui-tabview ui-widget ui-widget-content ui-corner-all ui-tabview-top', this.props.className);
            var navigator = this.renderNavigator();
            var content = this.renderContent();

            return _react2.default.createElement(
                'div',
                { id: this.props.id, className: className, style: this.props.style },
                navigator,
                content
            );
        }
    }]);

    return TabView;
}(_react.Component);

TabView.defaultProps = {
    id: null,
    activeIndex: 0,
    style: null,
    className: null,
    onTabChange: null
};
TabView.propTypes = {
    id: _propTypes2.default.string,
    activeIndex: _propTypes2.default.number,
    style: _propTypes2.default.object,
    className: _propTypes2.default.string,
    onTabChange: _propTypes2.default.func
};