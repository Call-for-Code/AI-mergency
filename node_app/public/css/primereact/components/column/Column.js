'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Column = undefined;

var _react = require('react');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Column = exports.Column = function (_Component) {
    _inherits(Column, _Component);

    function Column() {
        _classCallCheck(this, Column);

        return _possibleConstructorReturn(this, (Column.__proto__ || Object.getPrototypeOf(Column)).apply(this, arguments));
    }

    return Column;
}(_react.Component);

Column.defaultProps = {
    columnKey: null,
    field: null,
    sortField: null,
    header: null,
    body: null,
    footer: null,
    sortable: false,
    sortFunction: null,
    filter: false,
    filterMatchMode: 'startsWith',
    filterPlaceholder: null,
    filterType: 'text',
    filterMaxLength: null,
    filterElement: null,
    filterFunction: null,
    style: null,
    className: null,
    headerStyle: null,
    headerClassName: null,
    bodyStyle: null,
    bodyClassName: null,
    footerStyle: null,
    footerClassName: null,
    expander: false,
    frozen: false,
    selectionMode: null,
    colSpan: null,
    rowSpan: null,
    editor: null,
    editorValidator: null,
    rowReorder: false,
    rowReorderIcon: 'pi pi-bars'
};
Column.propsTypes = {
    columnKey: _propTypes2.default.string,
    field: _propTypes2.default.string,
    sortField: _propTypes2.default.string,
    header: _propTypes2.default.any,
    body: _propTypes2.default.any,
    footer: _propTypes2.default.any,
    sortable: _propTypes2.default.any,
    sortFunction: _propTypes2.default.func,
    filter: _propTypes2.default.bool,
    filterMatchMode: _propTypes2.default.string,
    filterPlaceholder: _propTypes2.default.string,
    filterType: _propTypes2.default.string,
    filterMaxLength: _propTypes2.default.number,
    filterElement: _propTypes2.default.object,
    filterFunction: _propTypes2.default.func,
    style: _propTypes2.default.object,
    className: _propTypes2.default.string,
    headerStyle: _propTypes2.default.object,
    headerClassName: _propTypes2.default.string,
    bodyStyle: _propTypes2.default.object,
    bodyClassName: _propTypes2.default.string,
    footerStyle: _propTypes2.default.object,
    footerClassName: _propTypes2.default.string,
    expander: _propTypes2.default.bool,
    frozen: _propTypes2.default.bool,
    selectionMode: _propTypes2.default.string,
    colSpan: _propTypes2.default.number,
    rowSpan: _propTypes2.default.number,
    editor: _propTypes2.default.func,
    editorValidator: _propTypes2.default.func,
    rowReorder: _propTypes2.default.bool,
    rowReorderIcon: _propTypes2.default.string
};