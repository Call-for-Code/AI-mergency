'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RowsPerPageDropdown = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Dropdown = require('../dropdown/Dropdown');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RowsPerPageDropdown = exports.RowsPerPageDropdown = function (_Component) {
    _inherits(RowsPerPageDropdown, _Component);

    function RowsPerPageDropdown() {
        _classCallCheck(this, RowsPerPageDropdown);

        return _possibleConstructorReturn(this, (RowsPerPageDropdown.__proto__ || Object.getPrototypeOf(RowsPerPageDropdown)).apply(this, arguments));
    }

    _createClass(RowsPerPageDropdown, [{
        key: 'render',
        value: function render() {
            if (this.props.options) {
                var options = this.props.options.map(function (opt, i) {
                    return { label: opt, value: opt };
                });

                return _react2.default.createElement(_Dropdown.Dropdown, { value: this.props.value, options: options, onChange: this.props.onChange });
            } else {
                return null;
            }
        }
    }]);

    return RowsPerPageDropdown;
}(_react.Component);

RowsPerPageDropdown.defaultProps = {
    options: null,
    value: null,
    onChange: null
};
RowsPerPageDropdown.propsTypes = {
    options: _propTypes2.default.array,
    value: _propTypes2.default.number,
    onChange: _propTypes2.default.func
};