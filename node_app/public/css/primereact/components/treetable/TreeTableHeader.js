'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TreeTableHeader = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TreeTableHeaderCell = require('./TreeTableHeaderCell');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TreeTableHeader = exports.TreeTableHeader = function (_Component) {
    _inherits(TreeTableHeader, _Component);

    function TreeTableHeader() {
        _classCallCheck(this, TreeTableHeader);

        return _possibleConstructorReturn(this, (TreeTableHeader.__proto__ || Object.getPrototypeOf(TreeTableHeader)).apply(this, arguments));
    }

    _createClass(TreeTableHeader, [{
        key: 'createHeaderCell',
        value: function createHeaderCell() {
            var _this2 = this;

            return _react2.default.Children.map(this.props.columns, function (column, i) {
                return _react2.default.createElement(_TreeTableHeaderCell.TreeTableHeaderCell, _extends({ key: 'headerCol_' + i }, column.props, { onSort: _this2.props.onSort,
                    sortField: _this2.props.sortField, sortOrder: _this2.props.sortOrder, multiSortMeta: _this2.props.multiSortMeta }));
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var content = _react2.default.createElement(
                'tr',
                null,
                this.createHeaderCell(this)
            );

            return _react2.default.createElement(
                'thead',
                null,
                content
            );
        }
    }]);

    return TreeTableHeader;
}(_react.Component);