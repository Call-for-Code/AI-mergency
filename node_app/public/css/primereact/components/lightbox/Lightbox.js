'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Lightbox = undefined;

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

var Lightbox = exports.Lightbox = function (_Component) {
    _inherits(Lightbox, _Component);

    function Lightbox() {
        _classCallCheck(this, Lightbox);

        var _this = _possibleConstructorReturn(this, (Lightbox.__proto__ || Object.getPrototypeOf(Lightbox)).call(this));

        _this.state = { visible: false, currentImage: null };
        return _this;
    }

    _createClass(Lightbox, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            document.addEventListener('click', function (event) {
                if (!_this2.preventDocumentClickListener && _this2.state.visible) {
                    _this2.hide(event);
                }
                _this2.preventDocumentClickListener = false;
            });
        }
    }, {
        key: 'onImageClick',
        value: function onImageClick(event, image, i) {
            this.index = i;
            this.setState({ loading: true });
            this.content.style.width = 32 + 'px';
            this.content.style.height = 32 + 'px';
            this.show();
            this.displayImage(image);
            this.preventDocumentClickListener = true;
            event.preventDefault();
        }
    }, {
        key: 'onLinkClick',
        value: function onLinkClick(event) {
            this.show();
            this.preventDocumentClickListener = true;
            event.preventDefault();
        }
    }, {
        key: 'show',
        value: function show() {
            this.mask = document.createElement('div');
            this.mask.style.zIndex = String(_DomHandler2.default.generateZIndex());
            _DomHandler2.default.addMultipleClasses(this.mask, 'ui-widget-overlay ui-dialog-mask');
            document.body.appendChild(this.mask);
            this.zindex = String(_DomHandler2.default.generateZIndex());
            this.center();
            this.setState({ visible: true });
        }
    }, {
        key: 'center',
        value: function center() {
            var elementWidth = _DomHandler2.default.getOuterWidth(this.panel);
            var elementHeight = _DomHandler2.default.getOuterHeight(this.panel);
            var x = void 0,
                y = void 0;
            if (elementWidth === 0 && elementHeight === 0) {
                this.panel.style.visibility = 'hidden';
                this.panel.style.display = 'block';
                elementWidth = _DomHandler2.default.getOuterWidth(this.panel);
                elementHeight = _DomHandler2.default.getOuterHeight(this.panel);
                this.panel.style.display = 'none';
                this.panel.style.visibility = 'visible';
            }
            var viewport = _DomHandler2.default.getViewport();
            x = (viewport.width - elementWidth) / 2;
            y = (viewport.height - elementHeight) / 2;

            this.panel.style.left = x + 'px';
            this.panel.style.top = y + 'px';
        }
    }, {
        key: 'hide',
        value: function hide(event) {
            this.index = null;
            this.setState({ currentImage: null });
            this.panel.style.left = 'auto';
            this.panel.style.top = 'auto';

            if (this.mask) {
                document.body.removeChild(this.mask);
                this.mask = null;
            }

            event.preventDefault();
            this.setState({ visible: false });
        }
    }, {
        key: 'displayImage',
        value: function displayImage(image) {
            var _this3 = this;

            setTimeout(function () {
                _this3.setState({ currentImage: image });
                _this3.center();
            }, 1000);
        }
    }, {
        key: 'prev',
        value: function prev() {
            this.setState({ loading: true });
            this.img.style.display = 'none';
            if (this.index > 0) {
                this.displayImage(this.props.images[--this.index]);
            }
        }
    }, {
        key: 'next',
        value: function next() {
            this.setState({ loading: true });
            this.img.style.display = 'none';
            if (this.index <= this.props.images.length - 1) {
                this.displayImage(this.props.images[++this.index]);
            }
        }
    }, {
        key: 'onImageLoad',
        value: function onImageLoad(event) {
            var _this4 = this;

            var image = event.target;
            image.style.visibility = 'hidden';
            image.style.display = 'block';
            var imageWidth = _DomHandler2.default.getOuterWidth(image);
            var imageHeight = _DomHandler2.default.getOuterHeight(image);
            image.style.display = 'none';
            image.style.visibility = 'visible';

            this.content.style.width = imageWidth + 'px';
            this.content.style.height = imageHeight + 'px';
            this.panel.style.left = parseInt(this.panel.style.left, 10) + (_DomHandler2.default.getOuterWidth(this.panel) - imageWidth) / 2 + 'px';
            this.panel.style.top = parseInt(this.panel.style.top, 10) + (_DomHandler2.default.getOuterHeight(this.panel) - imageHeight) / 2 + 'px';

            setTimeout(function () {
                _DomHandler2.default.fadeIn(image, 500);
                image.style.display = 'block';
                _this4.setState({ loading: false });
            }, parseInt(this.props.effectDuration, 10));
        }
    }, {
        key: 'render',
        value: function render() {
            var _this5 = this;

            var images;
            var contentText, contentFrame;

            var leftButton = (0, _classnames2.default)('ui-state-default ui-lightbox-nav-left ui-corner-right', { 'ui-helper-hidden': !(this.props.images && this.props.images.length && this.index !== 0 && this.state.currentImage) });
            var rightButton = (0, _classnames2.default)('ui-state-default ui-lightbox-nav-right ui-corner-left', { 'ui-helper-hidden': !(this.props.images && this.props.images.length && this.index < this.props.images.length - 1 && this.state.currentImage) });
            var containerClassName = (0, _classnames2.default)('ui-lightbox ui-widget ui-helper-hidden ui-corner-all ui-shadow', { 'ui-lightbox-loading': this.state.loading });

            if (this.props.type === 'images') {
                images = _react2.default.createElement(
                    'div',
                    { style: this.props.style, className: this.props.className },
                    this.props.images && this.props.images.map(function (image, index) {
                        var imageItem = _react2.default.createElement(
                            'a',
                            { href: image.source, onClick: function onClick(event) {
                                    return _this5.onImageClick(event, image, index);
                                }, key: index, ref: function ref(el) {
                                    return _this5.image = el;
                                }, style: { marginLeft: 4 } },
                            _react2.default.createElement('img', { src: image.thumbnail, title: image.title, alt: image.alt })
                        );
                        return imageItem;
                    })
                );
            }
            if (this.props.type === 'content') {
                contentText = this.props.children && this.props.children.map(function (child, index) {
                    return child.type === 'a' && _react2.default.createElement(
                        'span',
                        { style: _this5.props.style, className: _this5.props.className,
                            onClick: _this5.onLinkClick.bind(_this5), key: index },
                        child
                    );
                });
                contentFrame = this.props.children && this.props.children.map(function (child, index) {
                    return child.type !== 'a' && _react2.default.createElement(
                        'span',
                        { key: index },
                        child
                    );
                });
            }
            return _react2.default.createElement(
                'div',
                { id: this.props.id },
                images,
                contentText,
                _react2.default.createElement(
                    'div',
                    { className: containerClassName,
                        style: { transitionProperty: 'all', transitionDuration: this.props.effectDuration, transitionTimingFunction: this.props.easing, display: this.state.visible ? 'block' : 'none',
                            zIndex: this.zindex }, ref: function ref(el) {
                            return _this5.panel = el;
                        }, onClick: function onClick() {
                            return _this5.preventDocumentClickListener = true;
                        } },
                    _react2.default.createElement(
                        'div',
                        { className: 'ui-lightbox-content-wrapper' },
                        _react2.default.createElement(
                            'a',
                            { className: leftButton, style: { zIndex: this.zindex ? this.zindex + 1 : null }, onClick: this.prev.bind(this) },
                            _react2.default.createElement('span', { className: 'ui-lightbox-nav-icon pi pi-chevron-left' })
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'ui-lightbox-content ui-corner-all', ref: function ref(el) {
                                    return _this5.content = el;
                                },
                                style: { transitionDuration: this.props.effectDuration, transitionTimingFunction: this.props.easing } },
                            _react2.default.createElement('img', { ref: function ref(el) {
                                    return _this5.img = el;
                                }, src: this.state.currentImage ? this.state.currentImage.source : '',
                                onLoad: this.onImageLoad.bind(this), alt: '' }),
                            contentFrame
                        ),
                        _react2.default.createElement(
                            'a',
                            { className: rightButton, style: { zIndex: this.zindex ? this.zindex + 1 : null }, onClick: this.next.bind(this) },
                            _react2.default.createElement('span', { className: 'ui-lightbox-nav-icon pi pi-chevron-right' })
                        )
                    )
                )
            );
        }
    }]);

    return Lightbox;
}(_react.Component);

Lightbox.defaultProps = {
    id: null,
    images: null,
    type: 'images',
    style: null,
    className: null,
    easing: 'ease-out',
    effectDuration: '500ms'
};
Lightbox.propTypes = {
    id: _propTypes2.default.string,
    images: _propTypes2.default.array,
    type: _propTypes2.default.string,
    style: _propTypes2.default.object,
    className: _propTypes2.default.string,
    easing: _propTypes2.default.string,
    effectDuration: _propTypes2.default.string
};