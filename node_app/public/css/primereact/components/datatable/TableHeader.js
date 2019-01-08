'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TableHeader = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _HeaderCell = require('./HeaderCell');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TableHeader = exports.TableHeader = function (_Component) {
    _inherits(TableHeader, _Component);

    function TableHeader() {
        _classCallCheck(this, TableHeader);

        return _possibleConstructorReturn(this, (TableHeader.__proto__ || Object.getPrototypeOf(TableHeader)).apply(this, arguments));
    }

    _createClass(TableHeader, [{
        key: 'createHeaderCells',
        value: function createHeaderCells(root, column, i) {
            var _this2 = this;

            var children = _react2.default.Children.toArray(root.props.children);

            return _react2.default.Children.map(children, function (column, i) {
                return _react2.default.createElement(_HeaderCell.HeaderCell, _extends({ key: i }, column.props, { onSort: _this2.props.onSort,
                    sortField: _this2.props.sortField, sortOrder: _this2.props.sortOrder, multiSortMeta: _this2.props.multiSortMeta,
                    resizableColumns: _this2.props.resizableColumns, onColumnResizeStart: _this2.props.onColumnResizeStart,
                    onFilter: _this2.props.onFilter, onHeaderCheckboxClick: _this2.props.onHeaderCheckboxClick, headerCheckboxSelected: _this2.props.headerCheckboxSelected,
                    reorderableColumns: _this2.props.reorderableColumns, onDragStart: _this2.props.onColumnDragStart, onDragOver: _this2.props.onColumnDragOver,
                    onDragLeave: _this2.props.onColumnDragLeave, onDrop: _this2.props.onColumnDrop, filters: _this2.props.filters }));
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var content = void 0;
            if (this.props.columnGroup) {
                var rows = _react2.default.Children.toArray(this.props.columnGroup.props.children);
                content = rows.map(function (row, i) {
                    return _react2.default.createElement(
                        'tr',
                        { key: i, className: 'ui-state-default' },
                        _this3.createHeaderCells(row)
                    );
                });
            } else {
                content = _react2.default.createElement(
                    'tr',
                    { className: 'ui-state-default' },
                    this.createHeaderCells(this)
                );
            }

            return _react2.default.createElement(
                'thead',
                { className: 'ui-datatable-thead' },
                content
            );
        }
    }]);

    return TableHeader;
}(_react.Component);