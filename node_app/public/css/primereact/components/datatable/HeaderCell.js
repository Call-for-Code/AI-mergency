'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.HeaderCell = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _InputText = require('../inputtext/InputText');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _RowCheckbox = require('./RowCheckbox');

var _DomHandler = require('../utils/DomHandler');

var _DomHandler2 = _interopRequireDefault(_DomHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HeaderCell = exports.HeaderCell = function (_Component) {
    _inherits(HeaderCell, _Component);

    function HeaderCell(props) {
        _classCallCheck(this, HeaderCell);

        var _this = _possibleConstructorReturn(this, (HeaderCell.__proto__ || Object.getPrototypeOf(HeaderCell)).call(this, props));

        _this.onClick = _this.onClick.bind(_this);
        _this.onFilterInput = _this.onFilterInput.bind(_this);
        _this.onMouseDown = _this.onMouseDown.bind(_this);
        _this.onResizerMouseDown = _this.onResizerMouseDown.bind(_this);
        return _this;
    }

    _createClass(HeaderCell, [{
        key: 'onClick',
        value: function onClick(e) {
            if (this.props.sortable) {
                var targetNode = e.target;
                if (_DomHandler2.default.hasClass(targetNode, 'ui-sortable-column') || _DomHandler2.default.hasClass(targetNode, 'ui-column-title') || _DomHandler2.default.hasClass(targetNode, 'ui-sortable-column-icon')) {
                    this.props.onSort({
                        originalEvent: e,
                        sortField: this.props.field,
                        sortFunction: this.props.sortFunction,
                        sortable: this.props.sortable
                    });
                }
            }
        }
    }, {
        key: 'onFilterInput',
        value: function onFilterInput(e) {
            var _this2 = this;

            if (this.props.filter && this.props.onFilter) {
                if (this.filterTimeout) {
                    clearTimeout(this.filterTimeout);
                }

                var filterValue = e.target.value;
                this.filterTimeout = setTimeout(function () {
                    _this2.props.onFilter({
                        value: filterValue,
                        field: _this2.props.field,
                        matchMode: _this2.props.filterMatchMode
                    });
                    _this2.filterTimeout = null;
                }, this.filterDelay);
            }
        }
    }, {
        key: 'onResizerMouseDown',
        value: function onResizerMouseDown(event) {
            if (this.props.resizableColumns && this.props.onColumnResizeStart) {
                this.props.onColumnResizeStart({
                    originalEvent: event,
                    columnEl: event.target.parentElement
                });
            }
        }
    }, {
        key: 'onMouseDown',
        value: function onMouseDown(event) {
            if (this.props.reorderableColumns) {
                if (event.target.nodeName !== 'INPUT') this.el.draggable = true;else if (event.target.nodeName === 'INPUT') this.el.draggable = false;
            }
        }
    }, {
        key: 'getMultiSortMetaData',
        value: function getMultiSortMetaData() {
            if (this.props.multiSortMeta) {
                for (var i = 0; i < this.props.multiSortMeta.length; i++) {
                    if (this.props.multiSortMeta[i].field === this.props.field) {
                        return this.props.multiSortMeta[i];
                    }
                }
            }

            return null;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var multiSortMetaData = this.getMultiSortMetaData();
            var singleSorted = this.props.field === this.props.sortField;
            var multipleSorted = multiSortMetaData !== null;
            var sortOrder = 0;
            var resizer = this.props.resizableColumns && _react2.default.createElement('span', { className: 'ui-column-resizer ui-clickable', onMouseDown: this.onResizerMouseDown });
            var sortIconElement = void 0,
                filterElement = void 0,
                headerCheckbox = void 0;

            if (singleSorted) sortOrder = this.props.sortOrder;else if (multipleSorted) sortOrder = multiSortMetaData.order;

            var sorted = this.props.sortable && (singleSorted || multipleSorted);
            var className = (0, _classnames2.default)('ui-state-default ui-unselectable-text', { 'ui-sortable-column': this.props.sortable,
                'ui-state-active': sorted,
                'ui-resizable-column': this.props.resizableColumns,
                'ui-selection-column': this.props.selectionMode }, this.props.headerClassName || this.props.className);

            if (this.props.sortable) {
                var sortIcon = sorted ? sortOrder < 0 ? 'pi-sort-down' : 'pi-sort-up' : 'pi-sort';
                sortIconElement = _react2.default.createElement('span', { className: (0, _classnames2.default)('ui-sortable-column-icon pi pi-fw', sortIcon) });
            }

            if (this.props.filter) {
                filterElement = this.props.filterElement || _react2.default.createElement(_InputText.InputText, { onInput: this.onFilterInput, type: this.props.filterType, defaultValue: this.props.filters && this.props.filters[this.props.field] ? this.props.filters[this.props.field].value : null,
                    className: 'ui-column-filter', placeholder: this.props.filterPlaceholder, maxLength: this.props.filterMaxLength });
            }

            if (this.props.selectionMode === 'multiple') {
                headerCheckbox = _react2.default.createElement(_RowCheckbox.RowCheckbox, { onClick: this.props.onHeaderCheckboxClick, selected: this.props.headerCheckboxSelected });
            }

            return _react2.default.createElement(
                'th',
                { ref: function ref(el) {
                        return _this3.el = el;
                    },
                    className: className, style: this.props.headerStyle || this.props.style, onClick: this.onClick, onMouseDown: this.onMouseDown,
                    colSpan: this.props.colSpan, rowSpan: this.props.rowSpan,
                    onDragStart: this.props.onDragStart, onDragOver: this.props.onDragOver, onDragLeave: this.props.onDragLeave, onDrop: this.props.onDrop },
                resizer,
                _react2.default.createElement(
                    'span',
                    { className: 'ui-column-title' },
                    this.props.header
                ),
                sortIconElement,
                filterElement,
                headerCheckbox
            );
        }
    }]);

    return HeaderCell;
}(_react.Component);