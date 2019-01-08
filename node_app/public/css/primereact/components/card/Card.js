'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Card = undefined;

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

var Card = exports.Card = function (_Component) {
    _inherits(Card, _Component);

    function Card() {
        _classCallCheck(this, Card);

        return _possibleConstructorReturn(this, (Card.__proto__ || Object.getPrototypeOf(Card)).apply(this, arguments));
    }

    _createClass(Card, [{
        key: 'renderHeader',
        value: function renderHeader() {
            return _react2.default.createElement(
                'div',
                { className: 'ui-card-header' },
                this.props.header
            );
        }
    }, {
        key: 'renderBody',
        value: function renderBody() {
            var title = void 0,
                subTitle = void 0,
                footer = void 0,
                children = void 0;

            if (this.props.title) {
                title = _react2.default.createElement(
                    'div',
                    { className: 'ui-card-title' },
                    this.props.title
                );
            }
            if (this.props.subTitle) {
                subTitle = _react2.default.createElement(
                    'div',
                    { className: 'ui-card-subtitle' },
                    this.props.subTitle
                );
            }
            if (this.props.footer) {
                footer = _react2.default.createElement(
                    'div',
                    { className: 'ui-card-footer' },
                    ' ',
                    this.props.footer
                );
            }
            if (this.props.children) {
                children = _react2.default.createElement(
                    'div',
                    { className: 'ui-card-content' },
                    ' ',
                    this.props.children,
                    ' '
                );
            }
            return _react2.default.createElement(
                'div',
                { className: 'ui-card-body' },
                title,
                subTitle,
                children,
                footer
            );
        }
    }, {
        key: 'render',
        value: function render() {

            var header = void 0,
                body = void 0;
            var className = (0, _classnames2.default)('ui-card ui-widget ui-widget-content ui-corner-all', this.props.className);

            if (this.props.header) {
                header = this.renderHeader();
            }
            body = this.renderBody();

            return _react2.default.createElement(
                'div',
                { className: className, style: this.props.style },
                header,
                body
            );
        }
    }]);

    return Card;
}(_react.Component);

Card.defaultProps = {
    id: null,
    header: null,
    footer: null,
    title: null,
    subTitle: null,
    style: null,
    className: null
};
Card.propTypes = {
    id: _propTypes2.default.string,
    header: _propTypes2.default.any,
    footer: _propTypes2.default.any,
    title: _propTypes2.default.string,
    subTitle: _propTypes2.default.string,
    style: _propTypes2.default.object,
    className: _propTypes2.default.string
};