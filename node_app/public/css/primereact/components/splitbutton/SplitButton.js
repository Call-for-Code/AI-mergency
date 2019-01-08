'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SplitButton = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Button = require('../button/Button');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _DomHandler = require('../utils/DomHandler');

var _DomHandler2 = _interopRequireDefault(_DomHandler);

var _SplitButtonItem = require('./SplitButtonItem');

var _SplitButtonPanel = require('./SplitButtonPanel');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SplitButton = exports.SplitButton = function (_Component) {
    _inherits(SplitButton, _Component);

    function SplitButton(props) {
        _classCallCheck(this, SplitButton);

        var _this = _possibleConstructorReturn(this, (SplitButton.__proto__ || Object.getPrototypeOf(SplitButton)).call(this, props));

        _this.onDropdownButtonClick = _this.onDropdownButtonClick.bind(_this);
        return _this;
    }

    _createClass(SplitButton, [{
        key: 'onDropdownButtonClick',
        value: function onDropdownButtonClick(event) {
            if (this.documentClickListener) {
                this.dropdownClick = true;
            }

            if (this.panel.element.offsetParent) this.hide();else this.show();
        }
    }, {
        key: 'show',
        value: function show() {
            this.panel.element.style.zIndex = String(_DomHandler2.default.generateZIndex());
            this.alignPanel();
            _DomHandler2.default.fadeIn(this.panel.element, 250);
            this.panel.element.style.display = 'block';
            this.bindDocumentListener();
        }
    }, {
        key: 'hide',
        value: function hide() {
            this.panel.element.style.display = 'none';
            this.unbindDocumentListener();
        }
    }, {
        key: 'alignPanel',
        value: function alignPanel() {
            if (this.props.appendTo) {
                _DomHandler2.default.absolutePosition(this.panel.element, this.container);
                this.panel.element.style.minWidth = _DomHandler2.default.getWidth(this.container) + 'px';
            } else {
                _DomHandler2.default.relativePosition(this.panel.element, this.container);
            }
        }
    }, {
        key: 'bindDocumentListener',
        value: function bindDocumentListener() {
            var _this2 = this;

            if (!this.documentClickListener) {
                this.documentClickListener = function () {
                    if (_this2.dropdownClick) _this2.dropdownClick = false;else _this2.hide();
                };

                document.addEventListener('click', this.documentClickListener);
            }
        }
    }, {
        key: 'unbindDocumentListener',
        value: function unbindDocumentListener() {
            if (this.documentClickListener) {
                document.removeEventListener('click', this.documentClickListener);
                this.documentClickListener = null;
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.unbindDocumentListener();
        }
    }, {
        key: 'renderItems',
        value: function renderItems() {
            if (this.props.model) {
                return this.props.model.map(function (menuitem, index) {
                    return _react2.default.createElement(_SplitButtonItem.SplitButtonItem, { menuitem: menuitem, key: index });
                });
            } else {
                return null;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var className = (0, _classnames2.default)('ui-splitbutton ui-buttonset ui-widget', this.props.className, { 'ui-state-disabled': this.props.disabled });
            var items = this.renderItems();

            return _react2.default.createElement(
                'div',
                { id: this.props.id, className: className, style: this.props.style, ref: function ref(el) {
                        _this3.container = el;
                    } },
                _react2.default.createElement(_Button.Button, { type: 'button', icon: this.props.icon, label: this.props.label, onClick: this.props.onClick, disabled: this.props.disabled, cornerStyleClass: 'ui-corner-left', tabIndex: this.props.tabIndex }),
                _react2.default.createElement(_Button.Button, { type: 'button', className: 'ui-splitbutton-menubutton', icon: 'pi pi-caret-down', onClick: this.onDropdownButtonClick, disabled: this.props.disabled, cornerStyleClass: 'ui-corner-right' }),
                _react2.default.createElement(
                    _SplitButtonPanel.SplitButtonPanel,
                    { ref: function ref(el) {
                            return _this3.panel = el;
                        }, appendTo: this.props.appendTo,
                        menuStyle: this.props.menuStyle, menuClassName: this.props.menuClassName },
                    items
                )
            );
        }
    }]);

    return SplitButton;
}(_react.Component);

SplitButton.defaultProps = {
    id: null,
    label: null,
    icon: null,
    model: null,
    disabled: null,
    style: null,
    className: null,
    menuStyle: null,
    menuClassName: null,
    tabIndex: null,
    onClick: null,
    appendTo: null
};
SplitButton.propsTypes = {
    id: _propTypes2.default.string,
    label: _propTypes2.default.string,
    icon: _propTypes2.default.string,
    model: _propTypes2.default.array,
    disabled: _propTypes2.default.bool,
    style: _propTypes2.default.object,
    className: _propTypes2.default.string,
    menustyle: _propTypes2.default.object,
    menuClassName: _propTypes2.default.string,
    tabIndex: _propTypes2.default.string,
    onClick: _propTypes2.default.func,
    appendTo: _propTypes2.default.object
};