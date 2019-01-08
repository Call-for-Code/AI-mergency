'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Tooltip = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _DomHandler = require('../utils/DomHandler');

var _DomHandler2 = _interopRequireDefault(_DomHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tooltip = exports.Tooltip = function (_Component) {
    _inherits(Tooltip, _Component);

    function Tooltip() {
        _classCallCheck(this, Tooltip);

        var _this = _possibleConstructorReturn(this, (Tooltip.__proto__ || Object.getPrototypeOf(Tooltip)).call(this));

        _this.handleLoad = _this.handleLoad.bind(_this);
        return _this;
    }

    _createClass(Tooltip, [{
        key: 'onMouseEnter',
        value: function onMouseEnter(event) {
            if (this.props.tooltipEvent === 'hover') {
                if (this.props.onBeforeShow) {
                    this.props.onBeforeShow(event);
                }

                if (this.hideTimeout) {
                    clearTimeout(this.hideTimeout);
                    this.destroy();
                }

                this.activate(event);
            }
        }
    }, {
        key: 'onMouseLeave',
        value: function onMouseLeave(event) {
            if (this.props.tooltipEvent === 'hover') {
                this.deactivate();
            }
        }
    }, {
        key: 'onFocus',
        value: function onFocus(event) {
            if (this.props.tooltipEvent === 'focus') {
                this.activate(event);
            }
        }
    }, {
        key: 'onBlur',
        value: function onBlur(event) {
            if (this.props.tooltipEvent === 'focus') {
                this.deactivate();
            }
        }
    }, {
        key: 'activate',
        value: function activate(event) {
            var _this2 = this;

            if (this.props.onBeforeShow) {
                this.props.onBeforeShow(event);
            }

            this.active = true;
            if (this.hideTimeout) {
                clearTimeout(this.hideTimeout);
            }

            if (this.props.showDelay) this.showTimeout = setTimeout(function () {
                _this2.show();
            }, this.props.showDelay);else this.show();
        }
    }, {
        key: 'deactivate',
        value: function deactivate() {
            var _this3 = this;

            this.active = false;
            if (this.showTimeout) {
                clearTimeout(this.showTimeout);
            }

            if (this.hideDelay) this.hideTimeout = setTimeout(function () {
                _this3.hide();
            }, this.props.hideDelay);else this.hide();
        }
    }, {
        key: 'create',
        value: function create() {
            this.container = document.createElement('div');

            var tooltipArrow = document.createElement('div');
            tooltipArrow.className = 'ui-tooltip-arrow';
            this.container.appendChild(tooltipArrow);

            this.tooltipText = document.createElement('div');
            this.tooltipText.className = 'ui-tooltip-text ui-shadow ui-corner-all';

            this.updateText();

            if (this.props.positionStyle) {
                this.container.style.position = this.props.positionStyle;
            }

            this.container.appendChild(this.tooltipText);

            if (this.props.appendTo === 'body') document.body.appendChild(this.container);else if (this.props.appendTo === 'target') _DomHandler2.default.appendChild(this.container, this.element);else _DomHandler2.default.appendChild(this.container, this.props.appendTo);

            this.container.style.display = 'inline-block';
        }
    }, {
        key: 'show',
        value: function show() {
            if (!this.props.title || this.props.disabled) {
                return;
            }

            this.create();
            this.align();
            if (this.props.tooltipClassName) {
                this.container.className = this.container.className + ' ' + this.props.tooltipClassName;
            }
            _DomHandler2.default.fadeIn(this.container, 250);
            this.container.style.zIndex = String(_DomHandler2.default.generateZIndex());
            this.bindDocumentResizeListener();
        }
    }, {
        key: 'hide',
        value: function hide() {
            this.destroy();
        }
    }, {
        key: 'updateText',
        value: function updateText() {
            if (this.props.escape) {
                this.tooltipText.innerHTML = '';
                this.tooltipText.appendChild(document.createTextNode(this.props.title));
            } else {
                this.tooltipText.innerHTML = this.props.title;
            }
        }
    }, {
        key: 'align',
        value: function align() {
            var position = this.props.tooltipPosition;

            switch (position) {
                case 'top':
                    this.alignTop();
                    if (this.isOutOfBounds()) {
                        this.alignBottom();
                    }
                    break;

                case 'bottom':
                    this.alignBottom();
                    if (this.isOutOfBounds()) {
                        this.alignTop();
                    }
                    break;

                case 'left':
                    this.alignLeft();
                    if (this.isOutOfBounds()) {
                        this.alignRight();

                        if (this.isOutOfBounds()) {
                            this.alignTop();

                            if (this.isOutOfBounds()) {
                                this.alignBottom();
                            }
                        }
                    }
                    break;

                case 'right':
                    this.alignRight();
                    if (this.isOutOfBounds()) {
                        this.alignLeft();

                        if (this.isOutOfBounds()) {
                            this.alignTop();

                            if (this.isOutOfBounds()) {
                                this.alignBottom();
                            }
                        }
                    }
                    break;

                default:
                    break;
            }
        }
    }, {
        key: 'getHostOffset',
        value: function getHostOffset() {
            var offset = this.element.getBoundingClientRect();
            var targetLeft = offset.left + _DomHandler2.default.getWindowScrollLeft();
            var targetTop = offset.top + _DomHandler2.default.getWindowScrollTop();

            return { left: targetLeft, top: targetTop };
        }
    }, {
        key: 'alignRight',
        value: function alignRight() {
            this.preAlign();
            this.container.className = 'ui-tooltip ui-widget ui-tooltip-right';
            var hostOffset = this.getHostOffset();
            var left = hostOffset.left + _DomHandler2.default.getOuterWidth(this.element);
            var top = hostOffset.top + (_DomHandler2.default.getOuterHeight(this.element) - _DomHandler2.default.getOuterHeight(this.container)) / 2;
            this.container.style.left = left + 'px';
            this.container.style.top = top + 'px';
        }
    }, {
        key: 'alignLeft',
        value: function alignLeft() {
            this.preAlign();
            this.container.className = 'ui-tooltip ui-widget ui-tooltip-left';
            var hostOffset = this.getHostOffset();
            var left = hostOffset.left - _DomHandler2.default.getOuterWidth(this.container);
            var top = hostOffset.top + (_DomHandler2.default.getOuterHeight(this.element) - _DomHandler2.default.getOuterHeight(this.container)) / 2;
            this.container.style.left = left + 'px';
            this.container.style.top = top + 'px';
        }
    }, {
        key: 'alignTop',
        value: function alignTop() {
            this.preAlign();
            this.container.className = 'ui-tooltip ui-widget ui-tooltip-top';
            var hostOffset = this.getHostOffset();
            var left = hostOffset.left + (_DomHandler2.default.getOuterWidth(this.element) - _DomHandler2.default.getOuterWidth(this.container)) / 2;
            var top = hostOffset.top - _DomHandler2.default.getOuterHeight(this.container);
            this.container.style.left = left + 'px';
            this.container.style.top = top + 'px';
        }
    }, {
        key: 'alignBottom',
        value: function alignBottom() {
            this.preAlign();
            this.container.className = 'ui-tooltip ui-widget ui-tooltip-bottom';
            var hostOffset = this.getHostOffset();
            var left = hostOffset.left + (_DomHandler2.default.getOuterWidth(this.element) - _DomHandler2.default.getOuterWidth(this.container)) / 2;
            var top = hostOffset.top + _DomHandler2.default.getOuterHeight(this.element);
            this.container.style.left = left + 'px';
            this.container.style.top = top + 'px';
        }
    }, {
        key: 'preAlign',
        value: function preAlign() {
            this.container.style.left = -999 + 'px';
            this.container.style.top = -999 + 'px';
        }
    }, {
        key: 'isOutOfBounds',
        value: function isOutOfBounds() {
            var offset = this.container.getBoundingClientRect();
            var targetTop = offset.top;
            var targetLeft = offset.left;
            var width = _DomHandler2.default.getOuterWidth(this.container);
            var height = _DomHandler2.default.getOuterHeight(this.container);
            var viewport = _DomHandler2.default.getViewport();

            return targetLeft + width > viewport.width || targetLeft < 0 || targetTop < 0 || targetTop + height > viewport.height;
        }
    }, {
        key: 'bindDocumentResizeListener',
        value: function bindDocumentResizeListener() {
            var _this4 = this;

            this.documentResizeListener = function () {
                _this4.hide();
            };

            window.addEventListener('resize', this.documentResizeListener);
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
        key: 'destroy',
        value: function destroy() {
            this.unbindDocumentResizeListener();

            if (this.container && this.container.parentElement) {
                if (this.props.appendTo === 'body') document.body.removeChild(this.container);else if (this.props.appendTo === 'target') this.element.removeChild(this.container);else _DomHandler2.default.removeChild(this.container, this.props.appendTo);
            }
            this.container = null;
        }
    }, {
        key: 'bindMouseEvents',
        value: function bindMouseEvents(selector) {
            var _this5 = this;

            var elements = document.querySelectorAll(selector);
            if (!elements) return;

            if (this.props.tooltipEvent === 'hover') {
                var _loop = function _loop(i) {
                    elements[i].addEventListener("mouseenter", function (e) {
                        _this5.element = elements[i];_this5.onMouseEnter(e);
                    });
                    elements[i].addEventListener("mouseleave", function (e) {
                        return _this5.onMouseLeave(e);
                    });
                };

                for (var i = 0; i < elements.length; i++) {
                    _loop(i);
                }
            } else if (this.props.tooltipEvent === 'focus') {
                var _loop2 = function _loop2(i) {
                    elements[i].addEventListener("focus", function (e) {
                        _this5.element = elements[i];_this5.onFocus(e);
                    });
                    elements[i].addEventListener("blur", function (e) {
                        return _this5.onBlur(e);
                    });
                };

                for (var i = 0; i < elements.length; i++) {
                    _loop2(i);
                }
            }
        }
    }, {
        key: 'handleLoad',
        value: function handleLoad() {
            var selectors = this.props.for;

            if (selectors instanceof Array) {
                for (var i = 0; i < selectors.length; i++) {
                    this.bindMouseEvents(selectors[i]);
                }
            } else {
                this.bindMouseEvents(selectors);
            }

            document.body.removeEventListener('mouseover', this.handleLoad);
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            document.body.addEventListener('mouseover', this.handleLoad);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.destroy();
        }
    }, {
        key: 'render',
        value: function render() {
            return null;
        }
    }]);

    return Tooltip;
}(_react.Component);

Tooltip.defaultProps = {
    for: null,
    title: null,
    tooltipPosition: 'right',
    tooltipEvent: 'hover',
    appendTo: 'body',
    positionStyle: null,
    tooltipClassName: null,
    tooltipDisabled: false,
    escape: true,
    hideDelay: null,
    showDelay: null,
    onBeforeShow: null
};
Tooltip.propTypes = {
    for: _propTypes2.default.any,
    title: _propTypes2.default.string,
    tooltipPosition: _propTypes2.default.string,
    tooltipEvent: _propTypes2.default.string,
    appendTo: _propTypes2.default.string,
    positionstyle: _propTypes2.default.object,
    tooltipClassName: _propTypes2.default.string,
    tooltipDisabled: _propTypes2.default.bool,
    escape: _propTypes2.default.bool,
    hideDelay: _propTypes2.default.number,
    showDelay: _propTypes2.default.number,
    onBeforeShow: _propTypes2.default.func
};