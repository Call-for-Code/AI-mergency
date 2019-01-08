'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DataScroller = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DataScroller = exports.DataScroller = function (_Component) {
    _inherits(DataScroller, _Component);

    function DataScroller(props) {
        _classCallCheck(this, DataScroller);

        var _this = _possibleConstructorReturn(this, (DataScroller.__proto__ || Object.getPrototypeOf(DataScroller)).call(this, props));

        _this.state = {};
        _this.dataToRender = [];
        _this.value = _this.props.value;
        _this.first = 0;
        return _this;
    }

    _createClass(DataScroller, [{
        key: 'handleDataChange',
        value: function handleDataChange() {
            if (this.props.lazy) {
                this.dataToRender = this.value;
                this.setState({ dataToRender: this.dataToRender });
            } else {
                this.load();
            }
        }
    }, {
        key: 'load',
        value: function load() {
            if (this.props.lazy) {
                if (this.props.onLazyLoad) {
                    this.props.onLazyLoad(this.createLazyLoadMetadata());
                }

                this.first = this.first + this.props.rows;
            } else {
                if (this.value) {
                    for (var i = this.first; i < this.first + this.props.rows; i++) {
                        if (i >= this.value.length) {
                            break;
                        }

                        this.dataToRender.push(this.value[i]);
                    }

                    this.first = this.first + this.props.rows;
                    this.setState({ dataToRender: this.dataToRender });
                }
            }
        }
    }, {
        key: 'reset',
        value: function reset() {
            this.first = 0;
            this.dataToRender = [];
            this.setState({ dataToRender: this.dataToRender });
            this.load();
        }
    }, {
        key: 'isEmpty',
        value: function isEmpty() {
            return !this.dataToRender || this.dataToRender.length === 0;
        }
    }, {
        key: 'createLazyLoadMetadata',
        value: function createLazyLoadMetadata() {
            return {
                first: this.first,
                rows: this.props.rows
            };
        }
    }, {
        key: 'bindScrollListener',
        value: function bindScrollListener() {
            var _this2 = this;

            if (this.props.inline) {
                this.scrollFunction = function () {
                    var scrollTop = _this2.contentElement.scrollTop,
                        scrollHeight = _this2.contentElement.scrollHeight,
                        viewportHeight = _this2.contentElement.clientHeight;

                    if (scrollTop >= scrollHeight * _this2.props.buffer - viewportHeight) {
                        _this2.load();
                    }
                };

                this.contentElement.addEventListener('scroll', this.scrollFunction);
            } else {
                this.scrollFunction = function () {
                    var docBody = document.body,
                        docElement = document.documentElement,
                        scrollTop = window.pageYOffset || document.documentElement.scrollTop,
                        winHeight = docElement.clientHeight,
                        docHeight = Math.max(docBody.scrollHeight, docBody.offsetHeight, winHeight, docElement.scrollHeight, docElement.offsetHeight);

                    if (scrollTop >= docHeight * _this2.props.buffer - winHeight) {
                        _this2.load();
                    }
                };

                window.addEventListener('scroll', this.scrollFunction);
            }
        }
    }, {
        key: 'unbindScrollListener',
        value: function unbindScrollListener() {
            if (this.scrollFunction) {
                if (this.props.inline) {
                    this.contentElement.removeEventListener('scroll', this.scrollFunction);
                    this.contentElement = null;
                } else if (this.loader && this.isLoaded) {
                    this.loader.removeEventListener('click', this.scrollFunction);
                } else {
                    window.removeEventListener('scroll', this.scrollFunction);
                }
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this3 = this;

            if (this.props.lazy) {
                this.load();
            }

            if (this.props.loader) {
                this.scrollFunction = function () {
                    _this3.load();
                };
                this.loader = _reactDom2.default.findDOMNode(this.props.loader);
                this.loader.addEventListener('click', this.scrollFunction);
                this.isLoaded = true;
            } else {
                this.bindScrollListener();
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            var _this4 = this;

            var newValue = this.props.value;
            if (newValue && this.value !== newValue) {
                this.value = newValue;

                this.handleDataChange();
            }

            if (this.props.loader && !this.isLoaded) {
                this.unbindScrollListener();

                this.scrollFunction = function () {
                    _this4.load();
                };
                this.loader = _reactDom2.default.findDOMNode(this.props.loader);
                this.loader.addEventListener('click', this.scrollFunction);
                this.isLoaded = true;
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.scrollFunction) {
                this.unbindScrollListener();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this5 = this;

            var className = (0, _classnames2.default)('ui-datascroller ui-widget', this.props.className, {
                'ui-datascroller-inline': this.props.inline
            });

            var header = this.props.header && _react2.default.createElement(
                'div',
                { className: 'ui-datascroller-header ui-widget-header ui-corner-top' },
                ' ',
                this.props.header
            ),
                footer = this.props.footer && _react2.default.createElement(
                'div',
                { className: 'ui-datascroller-footer ui-widget-header ui-corner-bottom' },
                ' ',
                this.props.footer,
                ' '
            ),
                content = _react2.default.createElement(
                'div',
                { ref: function ref(el) {
                        return _this5.contentElement = _reactDom2.default.findDOMNode(el);
                    }, className: 'ui-datascroller-content ui-widget-content', style: { 'maxHeight': this.props.scrollHeight } },
                _react2.default.createElement(
                    'ul',
                    { className: 'ui-datascroller-list' },
                    this.state.dataToRender && this.state.dataToRender.map(function (val, i) {
                        var listItemContent = _this5.props.itemTemplate ? _this5.props.itemTemplate(val) : val;
                        return _react2.default.createElement(
                            'li',
                            { key: i + '_datascrollitem' },
                            listItemContent
                        );
                    })
                )
            );

            return _react2.default.createElement(
                'div',
                { id: this.props.id, className: className },
                header,
                content,
                footer
            );
        }
    }]);

    return DataScroller;
}(_react.Component);

DataScroller.defaultProps = {
    id: null,
    value: null,
    rows: 0,
    inline: false,
    scrollHeight: null,
    loader: null,
    buffer: 0.9,
    style: null,
    className: null,
    onLazyLoad: null,
    itemTemplate: null,
    header: null,
    footer: null,
    lazy: false
};
DataScroller.propsTypes = {
    id: _propTypes2.default.string,
    value: _propTypes2.default.array,
    rows: _propTypes2.default.number,
    inline: _propTypes2.default.bool,
    scrollHeight: _propTypes2.default.any,
    loader: _propTypes2.default.any,
    buffer: _propTypes2.default.number,
    style: _propTypes2.default.object,
    className: _propTypes2.default.string,
    onLazyLoad: _propTypes2.default.func,
    itemTemplate: _propTypes2.default.func,
    header: _propTypes2.default.string,
    footer: _propTypes2.default.string,
    lazy: _propTypes2.default.bool
};