'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ProgressSpinner = undefined;

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

var ProgressSpinner = exports.ProgressSpinner = function (_Component) {
    _inherits(ProgressSpinner, _Component);

    function ProgressSpinner() {
        _classCallCheck(this, ProgressSpinner);

        return _possibleConstructorReturn(this, (ProgressSpinner.__proto__ || Object.getPrototypeOf(ProgressSpinner)).apply(this, arguments));
    }

    _createClass(ProgressSpinner, [{
        key: 'render',
        value: function render() {
            var spinnerClass = (0, _classnames2.default)('ui-progress-spinner', this.props.className);

            return _react2.default.createElement(
                'div',
                { id: this.props.id, style: this.props.style, className: spinnerClass },
                _react2.default.createElement(
                    'svg',
                    { className: 'ui-progress-spinner-svg', viewBox: '25 25 50 50', style: { animationDuration: this.props.animationDuration } },
                    _react2.default.createElement('circle', { className: 'ui-progress-spinner-circle', cx: '50', cy: '50', r: '20', fill: this.props.fill,
                        strokeWidth: this.props.strokeWidth, strokeMiterlimit: '10' })
                )
            );
        }
    }]);

    return ProgressSpinner;
}(_react.Component);

ProgressSpinner.defaultProps = {
    id: null,
    style: null,
    className: null,
    strokeWidth: "2",
    fill: "none",
    animationDuration: "2s"
};
ProgressSpinner.propTypes = {
    id: _propTypes2.default.string,
    style: _propTypes2.default.object,
    className: _propTypes2.default.string,
    strokeWidth: _propTypes2.default.string,
    fill: _propTypes2.default.string,
    animationDuration: _propTypes2.default.string
};