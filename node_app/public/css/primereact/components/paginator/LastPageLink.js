'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LastPageLink = undefined;

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

var LastPageLink = exports.LastPageLink = function (_Component) {
    _inherits(LastPageLink, _Component);

    function LastPageLink() {
        _classCallCheck(this, LastPageLink);

        return _possibleConstructorReturn(this, (LastPageLink.__proto__ || Object.getPrototypeOf(LastPageLink)).apply(this, arguments));
    }

    _createClass(LastPageLink, [{
        key: 'render',
        value: function render() {
            var className = (0, _classnames2.default)('ui-paginator-last ui-paginator-element ui-state-default ui-corner-all', { 'ui-state-disabled': this.props.disabled });

            return _react2.default.createElement(
                'a',
                { className: className, onClick: this.props.onClick, tabIndex: this.props.disabled ? -1 : null },
                _react2.default.createElement('span', { className: 'ui-paginator-icon pi pi-step-forward' })
            );
        }
    }]);

    return LastPageLink;
}(_react.Component);

LastPageLink.defaultProps = {
    disabled: false,
    onClick: null
};
LastPageLink.propsTypes = {
    disabled: _propTypes2.default.bool,
    onClick: _propTypes2.default.func
};