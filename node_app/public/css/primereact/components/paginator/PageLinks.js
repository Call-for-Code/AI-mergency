'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PageLinks = undefined;

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

var PageLinks = exports.PageLinks = function (_Component) {
    _inherits(PageLinks, _Component);

    function PageLinks() {
        _classCallCheck(this, PageLinks);

        return _possibleConstructorReturn(this, (PageLinks.__proto__ || Object.getPrototypeOf(PageLinks)).apply(this, arguments));
    }

    _createClass(PageLinks, [{
        key: 'onPageLinkClick',
        value: function onPageLinkClick(event, pageLink) {
            if (this.props.onClick) {
                this.props.onClick({
                    originalEvent: event,
                    value: pageLink
                });
            }

            event.preventDefault();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var elements = this.props.value.map(function (pageLink, i) {
                var pageClassName = (0, _classnames2.default)('ui-paginator-page ui-paginator-element ui-state-default ui-corner-all', {
                    'ui-state-active': pageLink - 1 === _this2.props.page
                });

                return _react2.default.createElement(
                    'a',
                    { key: pageLink, className: pageClassName, onClick: function onClick(e) {
                            return _this2.onPageLinkClick(e, pageLink);
                        } },
                    pageLink
                );
            });

            return _react2.default.createElement(
                'span',
                { className: 'ui-paginator-pages' },
                elements
            );
        }
    }]);

    return PageLinks;
}(_react.Component);

PageLinks.defaultProps = {
    value: null,
    page: null,
    links: null
};
PageLinks.propsTypes = {
    value: _propTypes2.default.array,
    page: _propTypes2.default.number,
    onClick: _propTypes2.default.func
};