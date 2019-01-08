'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ScrollPanel = undefined;

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

var ScrollPanel = exports.ScrollPanel = function (_Component) {
    _inherits(ScrollPanel, _Component);

    function ScrollPanel(props) {
        _classCallCheck(this, ScrollPanel);

        var _this = _possibleConstructorReturn(this, (ScrollPanel.__proto__ || Object.getPrototypeOf(ScrollPanel)).call(this, props));

        _this.moveBar = _this.moveBar.bind(_this);
        _this.onXBarMouseDown = _this.onXBarMouseDown.bind(_this);
        _this.onYBarMouseDown = _this.onYBarMouseDown.bind(_this);

        _this.onDocumentMouseMove = _this.onDocumentMouseMove.bind(_this);
        _this.onDocumentMouseUp = _this.onDocumentMouseUp.bind(_this);
        return _this;
    }

    _createClass(ScrollPanel, [{
        key: 'calculateContainerHeight',
        value: function calculateContainerHeight() {
            var containerStyles = getComputedStyle(this.container),
                xBarStyles = getComputedStyle(this.xBar),
                pureContainerHeight = _DomHandler2.default.getHeight(this.container) - parseInt(xBarStyles['height'], 10);

            if (containerStyles['max-height'] !== "none" && pureContainerHeight === 0) {
                if (this.content.offsetHeight + parseInt(xBarStyles['height'], 10) > parseInt(containerStyles['max-height'], 10)) {
                    this.container.style.height = containerStyles['max-height'];
                } else {
                    this.container.style.height = this.content.offsetHeight + parseFloat(containerStyles.paddingTop) + parseFloat(containerStyles.paddingBottom) + parseFloat(containerStyles.borderTopWidth) + parseFloat(containerStyles.borderBottomWidth) + "px";
                }
            }
        }
    }, {
        key: 'moveBar',
        value: function moveBar() {
            var _this2 = this;

            /* horizontal scroll */
            var totalWidth = this.content.scrollWidth;
            var ownWidth = this.content.clientWidth;
            var bottom = (this.container.clientHeight - this.xBar.clientHeight) * -1;

            this.scrollXRatio = ownWidth / totalWidth;

            /* vertical scroll */
            var totalHeight = this.content.scrollHeight;
            var ownHeight = this.content.clientHeight;
            var right = (this.container.clientWidth - this.yBar.clientWidth) * -1;

            this.scrollYRatio = ownHeight / totalHeight;

            this.requestAnimationFrame(function () {
                if (_this2.scrollXRatio >= 1) {
                    _DomHandler2.default.addClass(_this2.xBar, 'ui-scrollpanel-hidden');
                } else {
                    _DomHandler2.default.removeClass(_this2.xBar, 'ui-scrollpanel-hidden');
                    _this2.xBar.style.cssText = 'width:' + Math.max(_this2.scrollXRatio * 100, 10) + '%; left:' + _this2.content.scrollLeft / totalWidth * 100 + '%;bottom:' + bottom + 'px;';
                }

                if (_this2.scrollYRatio >= 1) {
                    _DomHandler2.default.addClass(_this2.yBar, 'ui-scrollpanel-hidden');
                } else {
                    _DomHandler2.default.removeClass(_this2.yBar, 'ui-scrollpanel-hidden');
                    _this2.yBar.style.cssText = 'height:' + Math.max(_this2.scrollYRatio * 100, 10) + '%; top: calc(' + _this2.content.scrollTop / totalHeight * 100 + '% - ' + _this2.xBar.clientHeight + 'px);right:' + right + 'px;';
                }
            });
        }
    }, {
        key: 'onYBarMouseDown',
        value: function onYBarMouseDown(e) {
            this.isYBarClicked = true;
            this.lastPageY = e.pageY;
            _DomHandler2.default.addClass(this.yBar, 'ui-scrollpanel-grabbed');
            _DomHandler2.default.addClass(document.body, 'ui-scrollpanel-grabbed');

            document.addEventListener('mousemove', this.onDocumentMouseMove);
            document.addEventListener('mouseup', this.onDocumentMouseUp);
            e.preventDefault();
        }
    }, {
        key: 'onXBarMouseDown',
        value: function onXBarMouseDown(e) {
            this.isXBarClicked = true;
            this.lastPageX = e.pageX;
            _DomHandler2.default.addClass(this.xBar, 'ui-scrollpanel-grabbed');
            _DomHandler2.default.addClass(document.body, 'ui-scrollpanel-grabbed');

            document.addEventListener('mousemove', this.onDocumentMouseMove);
            document.addEventListener('mouseup', this.onDocumentMouseUp);
            e.preventDefault();
        }
    }, {
        key: 'onDocumentMouseMove',
        value: function onDocumentMouseMove(e) {
            if (this.isXBarClicked) {
                this.onMouseMoveForXBar(e);
            } else if (this.isYBarClicked) {
                this.onMouseMoveForYBar(e);
            } else {
                this.onMouseMoveForXBar(e);
                this.onMouseMoveForYBar(e);
            }
        }
    }, {
        key: 'onMouseMoveForXBar',
        value: function onMouseMoveForXBar(e) {
            var _this3 = this;

            var deltaX = e.pageX - this.lastPageX;
            this.lastPageX = e.pageX;

            this.requestAnimationFrame(function () {
                _this3.content.scrollLeft += deltaX / _this3.scrollXRatio;
            });
        }
    }, {
        key: 'onMouseMoveForYBar',
        value: function onMouseMoveForYBar(e) {
            var _this4 = this;

            var deltaY = e.pageY - this.lastPageY;
            this.lastPageY = e.pageY;

            this.requestAnimationFrame(function () {
                _this4.content.scrollTop += deltaY / _this4.scrollYRatio;
            });
        }
    }, {
        key: 'onDocumentMouseUp',
        value: function onDocumentMouseUp(e) {
            _DomHandler2.default.removeClass(this.yBar, 'ui-scrollpanel-grabbed');
            _DomHandler2.default.removeClass(this.xBar, 'ui-scrollpanel-grabbed');
            _DomHandler2.default.removeClass(document.body, 'ui-scrollpanel-grabbed');

            document.removeEventListener('mousemove', this.onDocumentMouseMove);
            document.removeEventListener('mouseup', this.onDocumentMouseUp);
            this.isXBarClicked = false;
            this.isYBarClicked = false;
        }
    }, {
        key: 'requestAnimationFrame',
        value: function requestAnimationFrame(f) {
            var frame = window.requestAnimationFrame || this.timeoutFrame;
            frame(f);
        }
    }, {
        key: 'refresh',
        value: function refresh() {
            this.moveBar();
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.moveBar();
            this.moveBar = this.moveBar.bind(this);

            window.addEventListener('resize', this.moveBar);

            this.calculateContainerHeight();
            this.initialized = true;
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.initialized) {
                window.removeEventListener('resize', this.moveBar);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this5 = this;

            var className = (0, _classnames2.default)('ui-scrollpanel ui-widget ui-widget-content ui-corner-all', this.props.className);

            return _react2.default.createElement(
                'div',
                { ref: function ref(el) {
                        _this5.container = el;
                    }, id: this.props.id, className: className, style: this.props.style },
                _react2.default.createElement(
                    'div',
                    { className: 'ui-scrollpanel-wrapper' },
                    _react2.default.createElement(
                        'div',
                        { ref: function ref(el) {
                                _this5.content = el;
                            }, className: 'ui-scrollpanel-content', onScroll: this.moveBar, onMouseEnter: this.moveBar },
                        this.props.children
                    )
                ),
                _react2.default.createElement('div', { ref: function ref(el) {
                        _this5.xBar = el;
                    }, className: 'ui-scrollpanel-bar ui-scrollpanel-bar-x', onMouseDown: this.onXBarMouseDown }),
                _react2.default.createElement('div', { ref: function ref(el) {
                        _this5.yBar = el;
                    }, className: 'ui-scrollpanel-bar ui-scrollpanel-bar-y', onMouseDown: this.onYBarMouseDown })
            );
        }
    }]);

    return ScrollPanel;
}(_react.Component);

ScrollPanel.defaultProps = {
    id: null,
    style: null,
    className: null
};
ScrollPanel.propTypes = {
    id: _propTypes2.default.string,
    style: _propTypes2.default.object,
    className: _propTypes2.default.string
};